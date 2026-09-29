import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const CHECK = resolve('tools/todos/check.ts');
const TASK = 'docs/todos/tasks/t-001 - Probe.md';

const config = `statuses: ["Idea", "Agreed", "Researching", "Research verified", "Building", "Review", "Done"]
default_status: "Idea"
types: ["content", "look", "research", "code"]
backlog_directory: "docs/todos"
`;
const pkg = JSON.stringify({ repository: { type: 'git', url: 'https://github.com/o/r' } });
const card = (status: string) =>
  `---\nid: T-001\ntitle: Probe\nstatus: ${status}\nlabels:\n  - agreed\ntype: code\n---\n\n## Acceptance Criteria\n<!-- AC:BEGIN -->\n- [ ] #1 open\n<!-- AC:END -->\n`;

let repo = '';
const write = (path: string, text: string) => {
  mkdirSync(join(repo, path, '..'), { recursive: true });
  writeFileSync(join(repo, path), text);
};
const git = (...args: string[]) => execFileSync('git', args, { cwd: repo, encoding: 'utf8' });
const commit = (message: string) => {
  git('add', '-A');
  git('-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-qm', message);
};
const check = (...args: string[]) => {
  const run = spawnSync(process.execPath, [CHECK, ...args], { cwd: repo, encoding: 'utf8' });
  return { status: run.status, out: run.stdout + run.stderr };
};

describe('check.ts on a real git repo', () => {
  beforeAll(() => {
    repo = mkdtempSync(join(tmpdir(), 'todos-check-'));
    git('init', '-q');
    write('backlog.config.yml', config);
    write('package.json', pkg);
    write(TASK, card('Agreed'));
    git('add', '.');
    git('-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-qm', 'agreed card');
  });
  afterAll(() => {
    rmSync(repo, { recursive: true, force: true });
  });

  it('passes the committed card, from disk and from the commit', () => {
    expect(check()).toMatchObject({ status: 0 });
    expect(check('--ref', 'HEAD')).toMatchObject({ status: 0 });
  });

  it('checks the commit, not an uncommitted drag on the board', () => {
    write(TASK, card('Done'));
    const disk = check();
    expect(disk.status).toBe(1);
    expect(disk.out).toContain('1 acceptance criteria not ticked');
    expect(check('--ref', 'HEAD')).toMatchObject({ status: 0 });
    git('checkout', '-q', '--', TASK);
  });

  it('reads linked files and research status from the commit, not the disk', () => {
    const url = 'https://github.com/o/r/blob/main/docs/research/n.md';
    write('docs/research/n.md', '---\nstatus: draft\n---\n');
    write(
      TASK,
      card('Research verified')
        .replace('type: code', 'type: content')
        .replace('labels:', `references:\n  - ${url}\nlabels:`),
    );
    commit('draft note');
    write('docs/research/n.md', '---\nstatus: reviewed\n---\n');
    expect(check()).toMatchObject({ status: 0 });
    const pushed = check('--ref', 'HEAD');
    expect(pushed.status).toBe(1);
    expect(pushed.out).toContain('docs/research/n.md is "draft", not "reviewed"');
    git('checkout', '-q', '--', '.');
  });

  it('reports a link to a file that exists on disk but is not committed', () => {
    write(
      TASK,
      card('Agreed').replace(
        'labels:',
        'references:\n  - https://github.com/o/r/blob/main/docs/new.md\nlabels:',
      ),
    );
    commit('link to a file not yet committed');
    write('docs/new.md', 'x');
    expect(check()).toMatchObject({ status: 0 });
    const pushed = check('--ref', 'HEAD');
    expect(pushed.status).toBe(1);
    expect(pushed.out).toContain('links to missing docs/new.md');
    rmSync(join(repo, 'docs/new.md'));
    write(TASK, card('Agreed'));
    commit('back to a plain agreed card');
  });

  it('skips a pushed commit from before the board existed', () => {
    const empty = git('commit-tree', git('mktree').trim(), '-m', 'before the board').trim();
    const pushed = check('--ref', empty);
    expect(pushed).toMatchObject({ status: 0 });
    expect(pushed.out).toContain('no board at commit');
  });

  it('fails a commit that moved the card past its gates', () => {
    write(TASK, card('Done'));
    git('-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-qam', 'premature done');
    const pushed = check('--ref', 'HEAD');
    expect(pushed.status).toBe(1);
    expect(pushed.out).toContain('needs a review record at docs/reviews/T-001.md');
    expect(check('--ref', 'HEAD~1')).toMatchObject({ status: 0 });
  });
});
