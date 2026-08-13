import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

describe('QRCode theme', () => {
  it('compiles the canonical stylesheet and publishes it', () => {
    const css = compile(resolve(packageRoot, 'styles/components/qr-code/index.scss')).css;
    const foundations = readFileSync(resolve(packageRoot, 'styles/foundations.scss'), 'utf8');
    const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8')) as {
      exports: Record<string, unknown>;
    };

    expect(css).toContain('.h-qrcode');
    expect(css).toContain('.h-qrcode__canvas');
    expect(css).toContain('.h-qrcode__icon');
    expect(css).toContain('.h-qrcode__mask');
    expect(css).toContain('overflow-wrap: anywhere');
    expect(foundations).toContain("@use './components/qr-code/variables' as qr-code;");
    expect(foundations).toContain("function.flatten-variables(qr-code.$values, 'qr-code')");
    expect(packageJson.exports['./styles/qr-code']).toBe('./styles/components/qr-code/index.scss');
  });
});
