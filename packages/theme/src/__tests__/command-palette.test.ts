import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

describe('CommandPalette theme', () => {
  it('publishes one responsive and accessible stylesheet', () => {
    const css = compile(resolve(root, 'styles/components/command-palette/index.scss')).css;
    const foundations = readFileSync(resolve(root, 'styles/foundations.scss'), 'utf8');
    const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
      exports: Record<string, unknown>;
    };
    expect(css).toContain('.h-command-palette');
    expect(css).toContain('.h-command-palette__input:focus-visible');
    expect(css).toContain('.h-command-palette__item[aria-disabled=true]');
    expect(css).toContain('overflow-wrap: anywhere');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(foundations).toContain(
      "@use './components/command-palette/variables' as command-palette;",
    );
    expect(packageJson.exports['./styles/command-palette']).toBe(
      './styles/components/command-palette/index.scss',
    );
  });
});
