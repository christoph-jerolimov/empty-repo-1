// Fixed bottom-left swatch panel, hydrated as a React island. The server
// renders the default theme; the saved choice is adopted after hydration.
// (The layout's inline script already painted the saved colours, so nothing
// visibly changes at that point.)
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { THEMES, type Theme } from '../data/site';

const THEME_KEY = 'blueprint-theme';
const PANEL_KEY = 'blueprint-theme-panel';

const pad2 = (n: number) => String(n).padStart(2, '0');

function readStorage(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

function writeStorage(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch {}
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.style.setProperty('--bg', t.bg);
  root.style.setProperty('--ink', t.ink);
  if (t.bar) {
    root.style.setProperty('--bar', t.bar);
    root.dataset.bar = '';
  } else {
    root.style.removeProperty('--bar');
    delete root.dataset.bar;
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.bg);
}

const KEY_STEP: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

export default function ThemeChooser() {
  const [themeId, setThemeId] = useState(THEMES[0].id);
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
  const index = THEMES.indexOf(theme);

  // Adopt the saved choices once on the client.
  useEffect(() => {
    const saved = readStorage(THEME_KEY);
    if (THEMES.some((t) => t.id === saved)) setThemeId(saved!);
    setCollapsed(readStorage(PANEL_KEY) === 'collapsed');
    setHydrated(true);
  }, []);

  // Only paint once the saved theme is known, so the default never flashes.
  useEffect(() => {
    if (hydrated) applyTheme(theme);
  }, [hydrated, theme]);

  // The page keeps enough bottom padding to scroll clear of the panel.
  useEffect(() => {
    const panel = panelRef.current!;
    const reserve = () => {
      document.body.style.paddingBottom = `${Math.max(24, panel.offsetHeight + 32)}px`;
    };
    const observer = new ResizeObserver(reserve);
    observer.observe(panel);
    reserve();
    return () => observer.disconnect();
  }, []);

  function pick(id: string, focus = false) {
    setThemeId(id);
    writeStorage(THEME_KEY, id);
    if (focus) listRef.current?.querySelector<HTMLButtonElement>(`[data-id="${id}"]`)?.focus();
  }

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    writeStorage(PANEL_KEY, next ? 'collapsed' : 'open');
  }

  // Arrow keys move through the swatches, as in any radio group.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const step = KEY_STEP[e.key];
    if (!step) return;
    e.preventDefault();
    pick(THEMES[(index + step + THEMES.length) % THEMES.length].id, true);
  }

  return (
    <aside className={collapsed ? 'themes collapsed' : 'themes'} aria-label="Theme chooser" ref={panelRef}>
      <div className="themes-head">
        <span>Theme — {theme.name}</span>
        <span className="themes-tools">
          <span>{pad2(index + 1)} / {pad2(THEMES.length)}</span>
          <button
            type="button"
            className="themes-toggle"
            aria-expanded={!collapsed}
            aria-controls="theme-list"
            onClick={toggle}
          >
            {collapsed ? 'Show' : 'Hide'}
          </button>
        </span>
      </div>
      <div
        className="themes-list"
        id="theme-list"
        role="radiogroup"
        aria-label="Color theme"
        ref={listRef}
        onKeyDown={onKeyDown}
      >
        {THEMES.map((t) => {
          const active = t.id === theme.id;
          const style = { '--sw-bg': t.bg, '--sw-ink': t.ink, '--sw-bar': t.bar } as CSSProperties;
          return (
            <button
              key={t.id}
              type="button"
              className="swatch"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              title={t.name}
              aria-label={t.name}
              data-id={t.id}
              style={style}
              onClick={() => pick(t.id)}
            />
          );
        })}
      </div>
    </aside>
  );
}
