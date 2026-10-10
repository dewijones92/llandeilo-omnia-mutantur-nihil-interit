type Child = Node | string | null | undefined | false;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<Record<string, string | number | boolean>> = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('aria-') && typeof value === 'boolean') {
      el.setAttribute(key, String(value));
      continue;
    }
    if (value === undefined || value === false) continue;
    if (key === 'class') el.className = String(value);
    else el.setAttribute(key, value === true ? '' : String(value));
  }
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child);
  }
  return el;
}

/** Makes everything behind a modal card unreachable (focus and clicks), or reachable again. */
export function setInert(behind: readonly HTMLElement[], inert: boolean, by: string): void {
  for (const el of behind) el.inert = inert;
  console.info(`dewidebug ${by} behind inert=${String(inert)} (${behind.map((e) => e.id).join(', ')})`);
}
