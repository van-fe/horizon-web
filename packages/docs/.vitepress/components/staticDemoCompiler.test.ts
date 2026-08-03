import { describe, expect, it } from 'vitest';
import { findImports, normalizePath } from './staticDemoCompiler';

describe('static demo compiler utilities', () => {
  it('finds static imports needed by the browser dependency registry', () => {
    expect(
      findImports(`
        import { ref } from 'vue'
        import tokens from './theme.json'
        export { HButton } from "@aurora/horizon-web"
      `),
    ).toEqual(['vue', './theme.json', '@aurora/horizon-web']);
  });

  it('resolves relative demo paths without Node path APIs', () => {
    expect(normalizePath('demos/components/Viewer/../../demo-assets.ts')).toBe(
      'demos/demo-assets.ts',
    );
    expect(normalizePath('en/features/tokens/demos/./theme.json')).toBe(
      'en/features/tokens/demos/theme.json',
    );
  });
});
