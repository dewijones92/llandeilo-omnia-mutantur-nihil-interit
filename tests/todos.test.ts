import { describe, expect, it } from 'vitest';
import {
  checkTodos,
  classifyLink,
  COLUMNS,
  KINDS,
  type Board,
  type Evidence,
  type Review,
  type Todo,
} from '../tools/todos/rules.ts';

const base = 'https://github.com/o/r/blob/main/';
const repo = { owner: 'o', name: 'r' };
const board: Board = { statuses: [...COLUMNS], defaultStatus: 'Idea', types: [...KINDS], repository: repo };

const note = 'docs/research/note.md';
const other = 'docs/research/other.md';

function todo(over: Partial<Todo> = {}): Todo {
  return {
    id: 'T-001',
    path: 'docs/todos/tasks/t-001.md',
    status: 'Agreed',
    kind: 'code',
    keys: ['id', 'title', 'status', 'labels', 'type'],
    labels: ['agreed'],
    dependencies: [],
    references: [],
    documentation: [],
    acceptance: [true],
    malformed: [],
    ...over,
  };
}

interface Stubs {
  readonly research?: Readonly<Record<string, string>>;
  readonly review?: Review;
  readonly files?: readonly string[];
}

function evidence(over: Stubs = {}): Evidence {
  const files = new Set(over.files ?? [note, other]);
  return {
    fileExists: (p) => files.has(p),
    researchStatus: (p) => over.research?.[p],
    review: () => over.review ?? { state: 'recorded', passed: true, yearsChecked: 2 },
    reviewPath: (id) => `docs/reviews/${id}.md`,
  };
}

const messages = (todos: Todo[], ev: Evidence = evidence(), b: Board = board) =>
  checkTodos(b, todos, ev).map((p) => p.message);

const reviewed = { [note]: 'reviewed', [other]: 'reviewed' };

describe('todo gates', () => {
  it('passes a well-formed agreed task', () => {
    expect(messages([todo()])).toEqual([]);
  });

  it('exempts an Idea from every gate, even with no type or label', () => {
    expect(messages([todo({ status: 'Idea', kind: undefined, labels: [] })])).toEqual([]);
  });

  it('needs the agreed label once out of Idea', () => {
    expect(messages([todo({ labels: [] })])).toEqual(['needs the "agreed" label (Dewi agreed it)']);
  });

  it('needs a known type once out of Idea', () => {
    expect(messages([todo({ kind: 'feature' })])).toEqual([
      'needs a type, one of content, look, research, code',
    ]);
  });

  it('rejects a status that is not a board column', () => {
    expect(messages([todo({ status: 'Blocked' })])).toEqual(['status "Blocked" is not a board column']);
  });

  it('needs a reviewed research note from Research verified, for researched kinds', () => {
    const t = todo({ status: 'Research verified', kind: 'content', documentation: [base + note] });
    expect(messages([t], evidence({ research: { [note]: 'draft' } }))).toEqual([
      `${note} is "draft", not "reviewed"`,
    ]);
    expect(messages([t], evidence({ research: reviewed }))).toEqual([]);
    expect(messages([{ ...t, documentation: [] }])).toEqual([
      'needs a docs/research/ note linked in its references',
    ]);
  });

  it('counts a research note linked in references, which the board can edit', () => {
    const t = todo({ status: 'Research verified', kind: 'content', references: [base + note] });
    expect(messages([t], evidence({ research: { [note]: 'draft' } }))).toEqual([
      `${note} is "draft", not "reviewed"`,
    ]);
    expect(messages([t], evidence({ research: reviewed }))).toEqual([]);
  });

  it('checks every linked research note, not just the first', () => {
    const t = todo({ status: 'Building', kind: 'research', documentation: [base + note, base + other] });
    const ev = evidence({ research: { [note]: 'reviewed', [other]: 'draft' } });
    expect(messages([t], ev)).toEqual([`${other} is "draft", not "reviewed"`]);
  });

  it('does not ask code or look tasks for research', () => {
    expect(messages([todo({ status: 'Building', kind: 'code' })])).toEqual([]);
    expect(messages([todo({ status: 'Building', kind: 'look' })])).toEqual([]);
  });

  it('keeps the research gate at every later status, not only the one it starts at', () => {
    const t = todo({ status: 'Review', kind: 'research', documentation: [base + note] });
    expect(messages([t], evidence({ research: { [note]: 'draft' } }))).toEqual([
      `${note} is "draft", not "reviewed"`,
    ]);
  });

  it('needs every acceptance criterion ticked to be Done', () => {
    expect(messages([todo({ status: 'Done', acceptance: [true, false, false] })])).toEqual([
      '2 acceptance criteria not ticked',
    ]);
    expect(messages([todo({ status: 'Done', acceptance: [] })])).toEqual(['has no acceptance criteria']);
  });

  it('does not ask for acceptance or review before Done', () => {
    const t = todo({ status: 'Review', acceptance: [false] });
    expect(messages([t], evidence({ review: { state: 'missing' } }))).toEqual([]);
  });

  it('needs a passed review record to be Done', () => {
    const done = todo({ status: 'Done' });
    expect(messages([done], evidence({ review: { state: 'missing' } }))).toEqual([
      'needs a review record at docs/reviews/T-001.md',
    ]);
    expect(
      messages([done], evidence({ review: { state: 'invalid', reason: 'has no frontmatter' } })),
    ).toEqual(['docs/reviews/T-001.md: has no frontmatter']);
    expect(
      messages([done], evidence({ review: { state: 'recorded', passed: false, yearsChecked: 0 } })),
    ).toEqual(['docs/reviews/T-001.md does not say verdict: passed']);
  });

  it('needs two years checked on screen for look and content, and none for code', () => {
    const shots = (yearsChecked: number): Review => ({ state: 'recorded', passed: true, yearsChecked });
    expect(messages([todo({ status: 'Done', kind: 'look' })], evidence({ review: shots(1) }))).toEqual([
      'docs/reviews/T-001.md lists 1 distinct years_checked; a look change needs ≥2',
    ]);
    const content = todo({ status: 'Done', kind: 'content', documentation: [base + note] });
    expect(messages([content], evidence({ review: shots(1), research: reviewed }))).toEqual([
      'docs/reviews/T-001.md lists 1 distinct years_checked; a content change needs ≥2',
    ]);
    expect(messages([content], evidence({ review: shots(2), research: reviewed }))).toEqual([]);
    expect(messages([todo({ status: 'Done', kind: 'code' })], evidence({ review: shots(0) }))).toEqual([]);
  });
});

describe('todo links', () => {
  const kind = (ref: string) => classifyLink(ref, repo).kind;

  it('maps a canonical link to its repo path, ignoring #anchors, ?queries and owner case', () => {
    expect(classifyLink(base + 'docs/a.md', repo)).toEqual({ kind: 'repo', path: 'docs/a.md' });
    expect(classifyLink(base + 'docs/a.md#pottery', repo)).toEqual({ kind: 'repo', path: 'docs/a.md' });
    expect(classifyLink(base + 'docs/a.md?plain=1', repo)).toEqual({ kind: 'repo', path: 'docs/a.md' });
    expect(classifyLink('https://github.com/O/R/blob/main/docs/a.md', repo)).toEqual({
      kind: 'repo',
      path: 'docs/a.md',
    });
    expect(classifyLink(base + 'docs/a%20b.md', repo)).toEqual({ kind: 'repo', path: 'docs/a b.md' });
  });

  it('treats other sites and other repos as web links', () => {
    expect(kind('https://coflein.gov.uk/x')).toBe('web');
    expect(kind('https://github.com/o/r-fork/blob/main/docs/a.md')).toBe('web');
    expect(kind('https://github.com/other/r/blob/main/docs/a.md')).toBe('web');
    expect(kind('https://github.com/o')).toBe('web');
  });

  it('treats issues, pull requests, Actions and the repo page as web links', () => {
    for (const path of ['issues/12', 'pull/3/files', 'actions/runs/1', '', 'wiki']) {
      expect(kind(`https://github.com/o/r/${path}`), path).toBe('web');
    }
  });

  it('accepts any case in the host, owner and name, but not in the route', () => {
    expect(classifyLink('https://GitHub.com/O/r/blob/main/docs/a.md', repo)).toEqual({
      kind: 'repo',
      path: 'docs/a.md',
    });
    expect(kind('https://github.com/o/r/BLOB/MAIN/docs/a.md')).toBe('bad');
  });

  it('rejects an encoded path separator and a trailing-dot host', () => {
    expect(kind(base + 'docs%2Fresearch%2Fnote.md')).toBe('bad');
    expect(kind(base + 'docs%5Cnote.md')).toBe('bad');
    expect(kind('https://github.com./o/r/blob/main/docs/a.md')).toBe('bad');
  });

  it('rejects any other link into this repo, naming the canonical URL', () => {
    const wrong = [
      'https://github.com/o/r/blob/dev/docs/a.md',
      'https://github.com/o/r/blob/67ceaf9/docs/a.md',
      'http://github.com/o/r/blob/main/docs/a.md',
      'https://www.github.com/o/r/blob/main/docs/a.md',
      'https://github.com/o/r/tree/main/docs/a.md',
      'https://raw.githubusercontent.com/o/r/main/docs/a.md',
    ];
    for (const ref of wrong) {
      expect(classifyLink(ref, repo)).toEqual({
        kind: 'bad',
        reason: `${ref} is not a plain link to a file on main; write ${base}docs/a.md`,
      });
    }
  });

  it('rejects links that climb or wander, however they are spelt', () => {
    for (const ref of [
      base + 'docs/../x.md',
      base + 'docs/%2e%2e/x.md',
      base + 'docs/%2E%2E/x.md',
      base + 'docs/./a.md',
      base + 'docs%2F..%2Fx.md',
      base + 'docs//a.md',
      base + 'docs/',
      base,
      base + '%E0%A4%A',
      'https://[bad',
      'docs//a.md',
      './docs/a.md',
      '/etc/passwd',
    ]) {
      expect(kind(ref), ref).toBe('bad');
    }
  });

  it('calls a relative path bare', () => {
    expect(classifyLink('docs/a.md', repo)).toEqual({ kind: 'bare', path: 'docs/a.md' });
  });

  it('counts nothing as this repo when the repository is unknown', () => {
    expect(classifyLink(base + 'docs/a.md', undefined)).toEqual({ kind: 'web' });
  });

  it('rejects a bare path, because the board cannot open it', () => {
    expect(messages([todo({ references: ['docs/research/note.md'] })])).toEqual([
      `links to docs/research/note.md as a bare path; write ${base}docs/research/note.md so the board can open it`,
    ]);
  });

  it('rejects links to missing files and non-canonical ones, but not web links', () => {
    const t = todo({
      references: [base + 'docs/gone.md', 'https://coflein.gov.uk/x', base + 'docs/../x.md'],
    });
    expect(messages([t])).toEqual([
      'links to missing docs/gone.md',
      `${base}docs/../x.md is not a plain link to a file on main; write ${base}x.md`,
    ]);
  });

  it('checks links on Ideas too', () => {
    expect(messages([todo({ status: 'Idea', references: [base + 'docs/gone.md'] })])).toEqual([
      'links to missing docs/gone.md',
    ]);
  });

  it('does not count a ../ link as a research note', () => {
    const t = todo({
      status: 'Research verified',
      kind: 'content',
      documentation: [base + 'docs/research/../x.md'],
    });
    expect(messages([t], evidence({ research: reviewed }))).toEqual([
      `${base}docs/research/../x.md is not a plain link to a file on main; write ${base}docs/x.md`,
      'needs a docs/research/ note linked in its references',
    ]);
  });

  it('accepts a research note linked to a section', () => {
    const t = todo({
      status: 'Research verified',
      kind: 'content',
      documentation: [base + note + '#pottery'],
    });
    expect(messages([t], evidence({ research: reviewed }))).toEqual([]);
  });
});

describe('todo integrity', () => {
  it('reports what the parser found malformed', () => {
    expect(messages([todo({ malformed: ['labels must be a list of strings'] })])).toEqual([
      'labels must be a list of strings',
    ]);
  });

  it('rejects a frontmatter key the board would drop', () => {
    expect(messages([todo({ keys: ['id', 'agreed_on'] })])).toEqual([
      'frontmatter key "agreed_on" would be dropped by the board',
    ]);
  });

  it('rejects unknown dependencies and duplicate ids', () => {
    expect(messages([todo({ dependencies: ['T-099'] })])).toEqual(['depends on unknown T-099']);
    expect(messages([todo(), todo()])).toEqual(['duplicate id T-001']);
  });

  it('checks integrity on Ideas too', () => {
    expect(messages([todo({ status: 'Idea', dependencies: ['T-099'] })])).toEqual([
      'depends on unknown T-099',
    ]);
  });

  it('fails when the columns are reordered, so a gate cannot silently move', () => {
    const swapped: Board = {
      ...board,
      statuses: ['Idea', 'Agreed', 'Researching', 'Building', 'Research verified', 'Review', 'Done'],
    };
    expect(messages([], evidence(), swapped)).toEqual([
      'statuses [Idea, Agreed, Researching, Building, Research verified, Review, Done] must be [Idea, Agreed, Researching, Research verified, Building, Review, Done]',
    ]);
  });

  it('fails when the repository is unknown, so link checks cannot silently switch off', () => {
    expect(messages([], evidence(), { ...board, repository: undefined })).toEqual([
      'repository.url must be https://github.com/<owner>/<repo>',
    ]);
  });

  it('fails when the default column or the kinds drift', () => {
    expect(messages([], evidence(), { ...board, defaultStatus: 'Done', types: ['content', 'code'] })).toEqual(
      [
        'default_status "Done" must be "Idea"',
        'types [content, code] must be [content, look, research, code]',
      ],
    );
  });
});
