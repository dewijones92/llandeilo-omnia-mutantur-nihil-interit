// node tools/gpu/lockdrift.ts: exits 1 and lists the differences when node_modules does not match
// package-lock.json by package versions. Content, not file times: a release's version-only bump of the
// lockfile is not drift, and a git checkout that merely touches the lockfile is not either.
import { existsSync, readFileSync } from 'node:fs';

type Packages = ReadonlyMap<string, unknown>;

const packagesOf = (lock: unknown): Packages | undefined => {
  const p: unknown = lock !== null && typeof lock === 'object' ? Reflect.get(lock, 'packages') : undefined;
  return p !== null && typeof p === 'object' ? new Map(Object.entries(p)) : undefined;
};
const field = (o: unknown, key: string): unknown =>
  o !== null && typeof o === 'object' ? Reflect.get(o, key) : undefined;

export function lockDrift(wanted: unknown, installed: unknown): string[] {
  const want = packagesOf(wanted);
  const have = packagesOf(installed);
  if (!want) return ['no package-lock.json packages'];
  if (!have) return ['no installed lockfile'];
  const drift: string[] = [];
  for (const [path, entry] of want) {
    if (path === '' || field(entry, 'link') === true) continue;
    const version = field(entry, 'version');
    const installedVersion = field(have.get(path), 'version');
    if (installedVersion === undefined) {
      const skippable =
        field(entry, 'optional') === true ||
        field(entry, 'devOptional') === true ||
        field(entry, 'os') !== undefined ||
        field(entry, 'cpu') !== undefined;
      if (!skippable) drift.push(`${path} missing`);
    } else if (installedVersion !== version) {
      drift.push(`${path} ${JSON.stringify(installedVersion)} -> ${JSON.stringify(version)}`);
    }
  }
  return drift;
}

const readJson = (path: string): unknown => {
  if (!existsSync(path)) return undefined;
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'));
    return parsed;
  } catch (err) {
    console.error(`dewidebug gpu lockdrift could not parse ${path}`, err);
    return undefined;
  }
};

if (process.argv[1]?.endsWith('lockdrift.ts')) {
  const drift = lockDrift(readJson('package-lock.json'), readJson('node_modules/.package-lock.json'));
  for (const d of drift.slice(0, 10)) console.log(d);
  if (drift.length > 10) console.log(`... and ${String(drift.length - 10)} more`);
  process.exit(drift.length > 0 ? 1 : 0);
}
