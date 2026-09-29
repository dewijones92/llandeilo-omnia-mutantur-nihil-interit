import { assertNever } from '../../src/domain/assert.ts';

export const COLUMNS = [
  'Idea',
  'Agreed',
  'Researching',
  'Research verified',
  'Building',
  'Review',
  'Done',
] as const;
type Column = (typeof COLUMNS)[number];

export const KINDS = ['content', 'look', 'research', 'code'] as const;
export type Kind = (typeof KINDS)[number];

const RESEARCHED: readonly Kind[] = ['content', 'research'];
const VISUAL: readonly Kind[] = ['content', 'look'];
const MIN_YEARS_CHECKED = 2;
const RESEARCH_DIR = 'docs/research/';
export const AGREED_LABEL = 'agreed';

// The frontmatter keys Backlog.md 1.53.0 writes back (src/markdown/serializer.ts). Any other key
// is silently dropped the next time the board saves the task, so it is rejected here instead.
const KNOWN_KEYS = new Set([
  'id',
  'title',
  'status',
  'assignee',
  'reporter',
  'created_date',
  'updated_date',
  'due_date',
  'labels',
  'milestone',
  'dependencies',
  'references',
  'documentation',
  'modified_files',
  'parent_task_id',
  'subtasks',
  'priority',
  'type',
  'project',
  'ordinal',
  'onStatusChange',
]);

export interface Todo {
  readonly id: string;
  readonly path: string;
  readonly status: string;
  readonly kind: string | undefined;
  readonly keys: readonly string[];
  readonly labels: readonly string[];
  readonly dependencies: readonly string[];
  readonly references: readonly string[];
  readonly documentation: readonly string[];
  readonly acceptance: readonly boolean[];
  readonly malformed: readonly string[];
}

export type Review =
  | { readonly state: 'missing' }
  | { readonly state: 'invalid'; readonly reason: string }
  | { readonly state: 'recorded'; readonly passed: boolean; readonly yearsChecked: number };

export interface Evidence {
  readonly fileExists: (repoPath: string) => boolean;
  readonly researchStatus: (repoPath: string) => string | undefined;
  readonly review: (id: string) => Review;
  readonly reviewPath: (id: string) => string;
}

export interface Repository {
  readonly owner: string;
  readonly name: string;
}

export interface Board {
  readonly statuses: readonly string[];
  readonly defaultStatus: string | undefined;
  readonly types: readonly string[];
  readonly repository: Repository | undefined;
}

const MAIN_BRANCH = 'main';

// Repo files are linked by this URL: the board only makes http(s) links clickable.
export const mainUrl = (repo: Repository, path: string) =>
  `https://github.com/${repo.owner}/${repo.name}/blob/${MAIN_BRANCH}/${path}`;

export interface Problem {
  readonly where: string;
  readonly message: string;
}

export type Link =
  | { readonly kind: 'repo'; readonly path: string }
  | { readonly kind: 'web' }
  | { readonly kind: 'bare'; readonly path: string }
  | { readonly kind: 'bad'; readonly reason: string };

function plainPath(path: string, ref: string, kind: 'repo' | 'bare'): Link {
  const segments = path.split('/');
  if (segments.some((seg) => seg === '..' || seg === '.' || seg === '')) {
    return { kind: 'bad', reason: `${ref} is not a plain repo path` };
  }
  return { kind, path };
}

const same = (a: string | undefined, b: string) => a?.toLowerCase() === b.toLowerCase();
const FILE_ROUTES = new Set(['blob', 'tree', 'raw']);
const GITHUB = 'https://github.com/';

export function classifyLink(ref: string, repo: Repository | undefined): Link {
  if (!/^https?:\/\//i.test(ref)) return plainPath(ref, ref, 'bare');
  let url: URL;
  try {
    url = new URL(ref);
  } catch {
    return { kind: 'bad', reason: `${ref} is not a valid URL` };
  }
  const host = url.hostname.replace(/\.$/, '');
  const onGitHub = host === 'github.com' || host === 'www.github.com';
  if (!onGitHub && host !== 'raw.githubusercontent.com') return { kind: 'web' };
  const [owner = '', name = '', ...after] = url.pathname.split('/').slice(1);
  if (repo === undefined || !same(owner, repo.owner) || !same(name, repo.name)) return { kind: 'web' };
  // Issues, pull requests, Actions and the repo page are ordinary web links; only file routes map to paths.
  if (onGitHub && !FILE_ROUTES.has((after[0] ?? '').toLowerCase())) return { kind: 'web' };
  const encoded = onGitHub ? after.slice(2) : after.slice(1);
  let segments: string[];
  try {
    segments = encoded.map((seg) => decodeURIComponent(seg));
  } catch {
    return { kind: 'bad', reason: `${ref} is not a valid URL` };
  }
  const path = segments.join('/');
  const fix = {
    kind: 'bad',
    reason: `${ref} is not a plain link to a file on main; write ${mainUrl(repo, path)}`,
  } as const;
  if (segments.some((seg) => seg.includes('/') || seg.includes('\\'))) return fix;
  // Compared as written, because new URL() quietly resolves ../ and %2e%2e. Only the host, owner and
  // name may differ in case; GitHub's routes, branches and paths are case-sensitive.
  const written = ref.split(/[?#]/)[0] ?? ref;
  const canonical =
    written.slice(0, GITHUB.length).toLowerCase() === GITHUB &&
    written.slice(GITHUB.length) === `${owner}/${name}/blob/${MAIN_BRANCH}/${encoded.join('/')}`;
  return canonical ? plainPath(path, ref, 'repo') : fix;
}

function repoPaths(refs: readonly string[], repo: Repository | undefined): string[] {
  return refs.flatMap((ref) => {
    const link = classifyLink(ref, repo);
    return link.kind === 'repo' ? [link.path] : [];
  });
}

interface Context {
  readonly todo: Todo;
  readonly kind: Kind;
  readonly evidence: Evidence;
  readonly repo: Repository | undefined;
}

type Check = (ctx: Context) => string[];

interface Gate {
  readonly from: Column;
  readonly kinds: readonly Kind[];
  readonly check: Check;
}

const agreedLabel: Check = ({ todo }) =>
  todo.labels.includes(AGREED_LABEL) ? [] : [`needs the "${AGREED_LABEL}" label (Dewi agreed it)`];

const researchReviewed: Check = ({ todo, evidence, repo }) => {
  // The board can edit references but only shows documentation, so a note may be linked in either.
  const notes = repoPaths([...todo.references, ...todo.documentation], repo).filter((p) =>
    p.startsWith(RESEARCH_DIR),
  );
  if (notes.length === 0) return [`needs a ${RESEARCH_DIR} note linked in its references`];
  return notes.flatMap((note) => {
    const status = evidence.researchStatus(note);
    return status === 'reviewed' ? [] : [`${note} is "${status ?? 'unknown'}", not "reviewed"`];
  });
};

const acceptanceTicked: Check = ({ todo }) => {
  if (todo.acceptance.length === 0) return ['has no acceptance criteria'];
  const open = todo.acceptance.filter((ticked) => !ticked).length;
  return open === 0 ? [] : [`${open} acceptance criteria not ticked`];
};

const reviewPassed: Check = ({ todo, kind, evidence }) => {
  const review = evidence.review(todo.id);
  const where = evidence.reviewPath(todo.id);
  switch (review.state) {
    case 'missing':
      return [`needs a review record at ${where}`];
    case 'invalid':
      return [`${where}: ${review.reason}`];
    case 'recorded': {
      const problems = review.passed ? [] : [`${where} does not say verdict: passed`];
      if (VISUAL.includes(kind) && review.yearsChecked < MIN_YEARS_CHECKED) {
        problems.push(
          `${where} lists ${review.yearsChecked} distinct years_checked; a ${kind} change needs ≥${MIN_YEARS_CHECKED}`,
        );
      }
      return problems;
    }
    default:
      return assertNever(review, 'review state');
  }
};

export const GATES: readonly Gate[] = [
  { from: 'Agreed', kinds: KINDS, check: agreedLabel },
  { from: 'Research verified', kinds: RESEARCHED, check: researchReviewed },
  { from: 'Done', kinds: KINDS, check: acceptanceTicked },
  { from: 'Done', kinds: KINDS, check: reviewPassed },
];

function isKind(value: string | undefined): value is Kind {
  return KINDS.some((k) => k === value);
}

const sameList = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((x, i) => x === b[i]);

// The gates are keyed to COLUMNS by position, so the board's columns must match them exactly, in order.
function checkBoard(board: Board): Problem[] {
  const where = 'backlog.config.yml';
  const problems: Problem[] = [];
  if (!sameList(board.statuses, COLUMNS)) {
    problems.push({
      where,
      message: `statuses [${board.statuses.join(', ')}] must be [${COLUMNS.join(', ')}]`,
    });
  }
  if (board.defaultStatus !== COLUMNS[0]) {
    problems.push({
      where,
      message: `default_status "${board.defaultStatus ?? ''}" must be "${COLUMNS[0]}"`,
    });
  }
  if (board.repository === undefined) {
    problems.push({
      where: 'package.json',
      message: 'repository.url must be https://github.com/<owner>/<repo>',
    });
  }
  if (!sameList([...board.types].sort(), [...KINDS].sort())) {
    problems.push({ where, message: `types [${board.types.join(', ')}] must be [${KINDS.join(', ')}]` });
  }
  return problems;
}

function checkLinks(todo: Todo, board: Board, evidence: Evidence): string[] {
  return [...todo.references, ...todo.documentation].flatMap((ref) => {
    const link = classifyLink(ref, board.repository);
    switch (link.kind) {
      case 'web':
        return [];
      case 'bad':
        return [link.reason];
      case 'bare':
        return [
          `links to ${ref} as a bare path; write ${board.repository ? mainUrl(board.repository, link.path) : 'a GitHub URL'} so the board can open it`,
        ];
      case 'repo':
        return evidence.fileExists(link.path) ? [] : [`links to missing ${link.path}`];
      default:
        return assertNever(link, 'link kind');
    }
  });
}

function checkTodo(todo: Todo, board: Board, ids: ReadonlySet<string>, evidence: Evidence): string[] {
  const problems = [...todo.malformed];
  for (const key of todo.keys) {
    if (!KNOWN_KEYS.has(key)) problems.push(`frontmatter key "${key}" would be dropped by the board`);
  }
  problems.push(...checkLinks(todo, board, evidence));
  for (const dep of todo.dependencies) {
    if (!ids.has(dep)) problems.push(`depends on unknown ${dep}`);
  }
  const rank = COLUMNS.findIndex((c) => c === todo.status);
  if (rank < 0) return [...problems, `status "${todo.status}" is not a board column`];
  if (rank === 0) return problems;
  if (!isKind(todo.kind)) return [...problems, `needs a type, one of ${KINDS.join(', ')}`];
  const ctx: Context = { todo, kind: todo.kind, evidence, repo: board.repository };
  for (const gate of GATES) {
    if (rank >= COLUMNS.indexOf(gate.from) && gate.kinds.includes(ctx.kind))
      problems.push(...gate.check(ctx));
  }
  return problems;
}

export function checkTodos(board: Board, todos: readonly Todo[], evidence: Evidence): Problem[] {
  const problems = checkBoard(board);
  const ids = new Set<string>();
  for (const todo of todos) {
    if (ids.has(todo.id)) problems.push({ where: todo.path, message: `duplicate id ${todo.id}` });
    ids.add(todo.id);
  }
  for (const todo of todos) {
    for (const message of checkTodo(todo, board, ids, evidence)) {
      problems.push({ where: `${todo.id} (${todo.path})`, message });
    }
  }
  return problems;
}
