import { describe, expect, it } from 'vitest';
import {
  parseBoard,
  parseFrontmatter,
  parseRepository,
  parseReview,
  parseStatus,
  parseTask,
} from '../tools/todos/files.ts';

const task = (frontmatter: string, body = '') => `---\n${frontmatter}\n---\n\n${body}`;
const ac = (lines: string) => `## Acceptance Criteria\n<!-- AC:BEGIN -->\n${lines}\n<!-- AC:END -->\n`;

describe('parseFrontmatter', () => {
  it('reads a mapping, and reports a missing, broken or non-mapping one', () => {
    expect(parseFrontmatter('---\na: 1\n---\nbody')).toEqual({ ok: true, data: { a: 1 } });
    expect(parseFrontmatter('no frontmatter')).toEqual({ ok: false, error: 'has no frontmatter' });
    expect(parseFrontmatter('\n---\na: 1\n---')).toEqual({ ok: false, error: 'has no frontmatter' });
    expect(parseFrontmatter('---\n- a\n---')).toEqual({ ok: false, error: 'is not a YAML mapping' });
    expect(parseFrontmatter('---\na: 1\n---b: 2\n---\n')).toEqual({ ok: true, data: { a: 1, '---b': 2 } });
    const broken = parseFrontmatter('---\na: [1\n---');
    expect(broken.ok ? '' : broken.error).toMatch(/^has invalid YAML/);
  });
});

describe('parseTask', () => {
  it('reads the fields the gates use', () => {
    const t = parseTask(
      'p.md',
      task(
        'id: T-004\nstatus: Agreed\ntype: content\nlabels:\n  - agreed\ndependencies: [T-001]\nreferences: []\ndocumentation:\n  - x',
      ),
    );
    expect(t).toMatchObject({
      id: 'T-004',
      status: 'Agreed',
      kind: 'content',
      labels: ['agreed'],
      dependencies: ['T-001'],
      documentation: ['x'],
      malformed: [],
    });
    expect(t.keys).toEqual(['id', 'status', 'type', 'labels', 'dependencies', 'references', 'documentation']);
  });

  it('counts only the checklist items the board shows, and only lower-case x as ticked', () => {
    const body = ac(
      '- [x] #1 done\n- [ ] #2 open\n- [X] #3 upper case\n- [x] unnumbered\n  - [x] #4 indented',
    );
    expect(parseTask('p.md', task('id: T-1', body)).acceptance).toEqual([true, false]);
  });

  it('stops the acceptance block at its first end marker', () => {
    const body = '<!-- AC:BEGIN -->\n- [x] #1 in\n<!-- AC:END -->\n- [ ] #2 out\n<!-- AC:END -->\n';
    expect(parseTask('p.md', task('id: T-1', body)).acceptance).toEqual([true]);
  });

  it('ignores checklists outside the acceptance block', () => {
    const body = '<!-- DOD:BEGIN -->\n- [ ] #1 dod\n<!-- DOD:END -->\n' + ac('- [x] #1 ok');
    expect(parseTask('p.md', task('id: T-1', body)).acceptance).toEqual([true]);
  });

  it('reports a list field that is not a list of strings, or a missing id', () => {
    const t = parseTask(
      'p.md',
      task('references: docs/a.md\nlabels: [1, agreed]\ndependencies: T-1\ndocumentation: {a: 1}'),
    );
    expect(t.malformed).toEqual([
      'labels must be a list of strings',
      'dependencies must be a list of strings',
      'references must be a list of strings',
      'documentation must be a list of strings',
      'has no id',
    ]);
    expect(t.id).toBe('p.md');
  });

  it('reports a task file with no readable frontmatter', () => {
    expect(parseTask('p.md', 'just text').malformed).toEqual(['task file has no frontmatter', 'has no id']);
  });
});

describe('parseReview', () => {
  const review = (fm: string) => parseReview('T-003', task(fm));

  it('is missing when there is no file', () => {
    expect(parseReview('T-003', undefined)).toEqual({ state: 'missing' });
  });

  it('counts distinct whole years', () => {
    expect(review('task: T-003\nverdict: passed\nyears_checked: [1282, 1282, 1858]')).toEqual({
      state: 'recorded',
      passed: true,
      yearsChecked: 2,
    });
    expect(review('task: T-003\nverdict: changes-needed')).toEqual({
      state: 'recorded',
      passed: false,
      yearsChecked: 0,
    });
    expect(review('task: T-003\nverdict: maybe')).toMatchObject({ state: 'recorded', passed: false });
  });

  it('rejects a record for another task, non-year entries, or no frontmatter', () => {
    expect(review('task: T-004\nverdict: passed')).toEqual({
      state: 'invalid',
      reason: 'says task: T-004, not T-003',
    });
    expect(review('verdict: passed')).toEqual({ state: 'invalid', reason: 'says task: nothing, not T-003' });
    expect(review('task: T-003\nyears_checked: [1282, noon]')).toEqual({
      state: 'invalid',
      reason: 'years_checked must be a list of whole years',
    });
    expect(review('task: T-003\nyears_checked: [1282.5]')).toEqual({
      state: 'invalid',
      reason: 'years_checked must be a list of whole years',
    });
    expect(review('task: T-003\nyears_checked: 1282')).toEqual({
      state: 'invalid',
      reason: 'years_checked must be a list of whole years',
    });
    expect(parseReview('T-003', 'text')).toEqual({ state: 'invalid', reason: 'has no frontmatter' });
  });
});

describe('parseStatus', () => {
  it('reads a research note status, or nothing', () => {
    expect(parseStatus(task('title: x\nstatus: reviewed'))).toBe('reviewed');
    expect(parseStatus(task('title: x'))).toBeUndefined();
    expect(parseStatus('no frontmatter')).toBeUndefined();
  });
});

describe('parseBoard', () => {
  const pkg = JSON.stringify({ repository: { type: 'git', url: 'https://github.com/o/r' } });

  it('reads the columns, default, types, folder and link base', () => {
    const config =
      'statuses: ["Idea", "Done"]\ndefault_status: "Idea"\ntypes: ["code"]\nbacklog_directory: "docs/todos"';
    expect(parseBoard(config, pkg)).toEqual({
      board: {
        statuses: ['Idea', 'Done'],
        defaultStatus: 'Idea',
        types: ['code'],
        repository: { owner: 'o', name: 'r' },
      },
      dir: 'docs/todos',
    });
  });

  it('gives an empty board, which then fails its checks, when the config is unreadable', () => {
    const { board, dir } = parseBoard(': [', '{}');
    expect(board.statuses).toEqual([]);
    expect(board.repository).toBeUndefined();
    expect(dir).toBe('backlog');
  });
});

describe('parseRepository', () => {
  it('reads a GitHub repository in any form npm writes it', () => {
    const want = { owner: 'o', name: 'r' };
    for (const url of [
      'https://github.com/o/r',
      'git+https://github.com/o/r.git',
      'https://github.com/o/r/',
      'https://github.com/o/r.git',
    ]) {
      expect(parseRepository({ type: 'git', url }), url).toEqual(want);
    }
    expect(parseRepository('https://github.com/o/r')).toEqual(want);
  });

  it('gives nothing for a missing or non-GitHub repository', () => {
    for (const value of [
      undefined,
      {},
      { url: 7 },
      'https://gitlab.com/o/r',
      'https://github.com/o',
      'http://github.com/o/r',
      'https://github.com/o/r/tree/main',
    ]) {
      expect(parseRepository(value)).toBeUndefined();
    }
  });
});
