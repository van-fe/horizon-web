import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollup } from 'rollup';
import { describe, expect, test } from 'vitest';

type PackageManifest = {
  name: string;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  sideEffects?: boolean | string[];
};

const workspaceRoot = resolve(__dirname, '../../../..');

function readManifest(packageDirectory: string): PackageManifest {
  return JSON.parse(
    readFileSync(resolve(workspaceRoot, 'packages', packageDirectory, 'package.json'), 'utf8'),
  ) as PackageManifest;
}

function readViteConfig(packageDirectory: string): string {
  return readFileSync(resolve(workspaceRoot, 'packages', packageDirectory, 'vite.config.ts'), 'utf8');
}

describe('runtime package tree-shaking contracts', () => {
  test('marks JavaScript-only runtime packages as side-effect free', () => {
    for (const packageDirectory of [
      'colors',
      'core',
      'horizon-web-core',
      'icon',
      'locale',
      'upload-adapters',
      'utils',
    ]) {
      expect(readManifest(packageDirectory).sideEffects, packageDirectory).toBe(false);
    }
  });

  test('preserves stylesheet side effects only in packages that publish styles', () => {
    expect(readManifest('horizon-web').sideEffects).toEqual([
      'dist/horizon-web-browser.iife.js',
      'dist/horizon-web-browser.mjs',
      'dist/horizon-web-browser.umd.js',
      '**/*.css',
      '**/*.scss',
    ]);
    expect(readManifest('horizon-web-react').sideEffects).toEqual(['**/*.css']);
    expect(readManifest('locale-react').sideEffects).toEqual(['**/*.css']);
    expect(readManifest('locale-vue').sideEffects).toEqual(['**/*.css']);
    expect(readManifest('theme').sideEffects).toEqual(['**/*.css', '**/*.scss']);
  });

  test('externalizes every renderer peer runtime from its library build', () => {
    const rendererPackages = [
      'horizon-web',
      'horizon-web-react',
      'icon',
      'locale-react',
      'locale-vue',
    ];

    for (const packageDirectory of rendererPackages) {
      const manifest = readManifest(packageDirectory);
      const viteConfig = readViteConfig(packageDirectory);

      for (const peerName of Object.keys(manifest.peerDependencies ?? {})) {
        if (manifest.peerDependenciesMeta?.[peerName]?.optional) continue;
        expect(viteConfig, `${manifest.name} must externalize ${peerName}`).toContain(
          `'${peerName}'`,
        );
      }
    }
  });

  test('keeps Aurora workspace dependencies external in the Vue renderer build', () => {
    expect(readViteConfig('horizon-web')).toContain('/@aurora\\//');
    expect(readViteConfig('locale-vue')).toContain('/@aurora\\//');
    expect(readViteConfig('utils')).toContain("'@aurora/core'");
    expect(readViteConfig('utils')).toContain("'@aurora/horizon-web-core'");
    expect(readViteConfig('utils')).toContain("'@aurora/theme'");
  });

  test('tree-shakes unrelated components from the public ESM entry', async () => {
    const virtualEntry = '\0horizon-web-tree-shaking-entry';
    const bundle = await rollup({
      input: virtualEntry,
      external: id =>
        id !== '@aurora/horizon-web' &&
        !id.startsWith('.') &&
        !id.startsWith('/') &&
        !id.startsWith('\0'),
      plugins: [
        {
          name: 'horizon-web-tree-shaking-entry',
          resolveId(id) {
            return id === virtualEntry ? virtualEntry : null;
          },
          load(id) {
            return id === virtualEntry
              ? "import { HButton } from '@aurora/horizon-web'; export { HButton };"
              : null;
          },
        },
        nodeResolve(),
      ],
      treeshake: true,
    });

    const generated = await bundle.generate({ format: 'es' });
    await bundle.close();
    const code = generated.output
      .filter(output => output.type === 'chunk')
      .map(output => output.code)
      .join('\n');

    expect(code).toContain('HButton');
    expect(code).not.toContain('HCalendar');
    expect(code).not.toContain('HDatePicker');
    expect(code).not.toContain('HTable');
  });
});
