import { parse } from 'yaml';
import type { Board, Repository, Review, Todo } from './rules.ts';

type Parsed =
  | { readonly ok: true; readonly data: Record<string, unknown> }
  | { readonly ok: false; readonly error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
}

function yamlRecord(source: string): Parsed {
  try {
    const data: unknown = parse(source);
    return isRecord(data) ? { ok: true, data } : { ok: false, error: 'is not a YAML mapping' };
  } catch (e) {
    return {
      ok: false,
      error: `has invalid YAML (${e instanceof Error ? e.message.split('\n')[0] : String(e)})`,
    };
  }
}

export function parseFrontmatter(source: string): Parsed {
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(source);
  return match ? yamlRecord(match[1] ?? '') : { ok: false, error: 'has no frontmatter' };
}

// Backlog.md's own pattern for a numbered checklist item (structured-sections.ts), so the board and
// this check always count the same items.
function acceptance(source: string): boolean[] {
  const block = /<!-- AC:BEGIN -->([\s\S]*?)<!-- AC:END -->/.exec(source)?.[1] ?? '';
  return [...block.matchAll(/^- \[([ x])\] #\d+ .+$/gm)].map((m) => m[1] === 'x');
}

const LIST_KEYS = ['labels', 'dependencies', 'references', 'documentation'] as const;

export function parseTask(path: string, source: string): Todo {
  const fm = parseFrontmatter(source);
  const data = fm.ok ? fm.data : {};
  const malformed = fm.ok ? [] : [`task file ${fm.error}`];
  for (const key of LIST_KEYS) {
    const value = data[key];
    if (value !== undefined && (!Array.isArray(value) || strings(value).length !== value.length)) {
      malformed.push(`${key} must be a list of strings`);
    }
  }
  const id = text(data['id']);
  if (id === undefined) malformed.push('has no id');
  return {
    id: id ?? path,
    path,
    status: text(data['status']) ?? '',
    kind: text(data['type']),
    keys: Object.keys(data),
    labels: strings(data['labels']),
    dependencies: strings(data['dependencies']),
    references: strings(data['references']),
    documentation: strings(data['documentation']),
    acceptance: acceptance(source),
    malformed,
  };
}

export function parseReview(id: string, source: string | undefined): Review {
  if (source === undefined) return { state: 'missing' };
  const fm = parseFrontmatter(source);
  if (!fm.ok) return { state: 'invalid', reason: fm.error };
  const task = text(fm.data['task']);
  if (task !== id) return { state: 'invalid', reason: `says task: ${task ?? 'nothing'}, not ${id}` };
  const years = fm.data['years_checked'] ?? [];
  if (!Array.isArray(years) || !years.every((y) => Number.isInteger(y))) {
    return { state: 'invalid', reason: 'years_checked must be a list of whole years' };
  }
  return { state: 'recorded', passed: fm.data['verdict'] === 'passed', yearsChecked: new Set(years).size };
}

export function parseStatus(source: string): string | undefined {
  const fm = parseFrontmatter(source);
  return fm.ok ? text(fm.data['status']) : undefined;
}

// package.json's repository, in any form npm writes it, as a GitHub owner and name.
export function parseRepository(value: unknown): Repository | undefined {
  const raw = isRecord(value) ? text(value['url']) : text(value);
  if (raw === undefined) return undefined;
  const cleaned = raw
    .replace(/^git\+/, '')
    .replace(/\/+$/, '')
    .replace(/\.git$/, '');
  const match = /^https:\/\/github\.com\/([^/]+)\/([^/]+)$/.exec(cleaned);
  return match?.[1] !== undefined && match[2] !== undefined ? { owner: match[1], name: match[2] } : undefined;
}

export function parseBoard(configSource: string, packageSource: string): { board: Board; dir: string } {
  const config = yamlRecord(configSource);
  const data = config.ok ? config.data : {};
  const pkg: unknown = JSON.parse(packageSource);
  return {
    board: {
      statuses: strings(data['statuses']),
      defaultStatus: text(data['default_status']),
      types: strings(data['types']),
      repository: parseRepository(isRecord(pkg) ? pkg['repository'] : undefined),
    },
    dir: text(data['backlog_directory']) ?? 'backlog',
  };
}
