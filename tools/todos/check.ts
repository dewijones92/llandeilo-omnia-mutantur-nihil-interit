import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { parseBoard, parseReview, parseStatus, parseTask } from './files.ts';
import { checkTodos, type Evidence } from './rules.ts';

const REVIEWS_DIR = 'docs/reviews';
const TASK_DIRS = ['tasks', 'completed'];

interface Source {
  readonly label: string;
  readonly isFile: (path: string) => boolean;
  readonly read: (path: string) => string | undefined;
  readonly list: (dir: string) => string[];
}

function diskSource(root: string): Source {
  const isFile = (p: string) => existsSync(join(root, p)) && statSync(join(root, p)).isFile();
  return {
    label: 'working tree',
    isFile,
    read: (p) => (isFile(p) ? readFileSync(join(root, p), 'utf8') : undefined),
    list: (dir) =>
      existsSync(join(root, dir)) ? readdirSync(join(root, dir)).map((f) => `${dir}/${f}`) : [],
  };
}

// The pre-push hook checks the commits being pushed, so an uncommitted drag on the board cannot block them.
function commitSource(root: string, ref: string): Source {
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 << 20 });
  const files = new Set(git('ls-tree', '-r', '--name-only', '-z', ref).split('\0').filter(Boolean));
  return {
    label: `commit ${ref}`,
    isFile: (p) => files.has(p),
    read: (p) => (files.has(p) ? git('show', `${ref}:${p}`) : undefined),
    list: (dir) =>
      [...files].filter((f) => f.startsWith(`${dir}/`) && !f.slice(dir.length + 1).includes('/')),
  };
}

const { values } = parseArgs({ options: { ref: { type: 'string' } } });
const root = process.cwd();
const source = values.ref === undefined ? diskSource(root) : commitSource(root, values.ref);

if (values.ref !== undefined && !source.isFile('backlog.config.yml')) {
  console.log(`todos: no board at ${source.label}, nothing to check`);
  process.exit(0);
}

const { board, dir } = parseBoard(
  source.read('backlog.config.yml') ?? '',
  source.read('package.json') ?? '{}',
);

const todos = TASK_DIRS.flatMap((sub) => source.list(`${dir}/${sub}`))
  .filter((path) => path.endsWith('.md') && source.isFile(path))
  .map((path) => parseTask(path, source.read(path) ?? ''));

const reviewPath = (id: string) => `${REVIEWS_DIR}/${id}.md`;
const evidence: Evidence = {
  fileExists: source.isFile,
  researchStatus: (p) => {
    const text = source.read(p);
    return text === undefined ? undefined : parseStatus(text);
  },
  reviewPath,
  review: (id) => parseReview(id, source.read(reviewPath(id))),
};

const problems = checkTodos(board, todos, evidence);
for (const p of problems) console.error(`todos: ${p.where}: ${p.message}`);
console.log(`todos: ${todos.length} tasks, ${problems.length} problems (${source.label})`);
if (problems.length > 0) process.exit(1);
