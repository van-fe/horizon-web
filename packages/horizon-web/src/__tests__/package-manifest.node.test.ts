import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

type PackageManifest = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  exports?: Record<string, string | Record<string, string>>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  style?: string;
};

const manifest = JSON.parse(
  readFileSync(resolve(__dirname, '../../package.json'), 'utf8'),
) as PackageManifest;

describe('Horizon Web package manifest', () => {
  test('requires the host to provide one compatible Vue runtime', () => {
    expect(manifest.peerDependencies?.vue).toBe('^3.5.0');
    expect(manifest.dependencies?.vue).toBeUndefined();
    expect(manifest.devDependencies?.vue).toBeDefined();
  });

  test('keeps Vue Router host-provided and optional', () => {
    expect(manifest.peerDependencies?.['vue-router']).toBe('^4.4.5');
    expect(manifest.dependencies?.['vue-router']).toBeUndefined();
    expect(manifest.peerDependenciesMeta?.['vue-router']?.optional).toBe(true);
  });

  test('publishes explicit module, type, component, and style entry points', () => {
    expect(manifest.exports?.['.']).toEqual({
      types: './es/index.d.ts',
      import: './es/index.js',
      require: './lib/index.js',
      default: './es/index.js',
    });
    expect(manifest.exports?.['./components/*']).toEqual({
      types: './es/components/*/index.d.ts',
      import: './es/components/*/index.js',
      require: './lib/components/*/index.js',
      default: './es/components/*/index.js',
    });
    expect(manifest.exports?.['./styles']).toEqual({
      sass: './es/styles/index.scss',
      style: './es/styles/index.css',
      default: './es/styles/index.css',
    });
    expect(manifest.exports?.['./styles/base']).toEqual({
      sass: './es/styles/base.scss',
      style: './es/styles/base.css',
      default: './es/styles/base.css',
    });
    expect(manifest.exports?.['./es/*']).toBe('./es/*');
    expect(manifest.exports?.['./lib/*']).toBe('./lib/*');
    expect(manifest.exports?.['./dist/*']).toBe('./dist/*');
    expect(manifest.style).toBe('es/styles/index.css');
  });

  test('points every stable exact export at a generated file', () => {
    const exactExportTargets = [
      './es/index.d.ts',
      './es/index.js',
      './lib/index.js',
      './es/styles/index.scss',
      './es/styles/index.css',
      './es/styles/base.scss',
      './es/styles/base.css',
    ];

    for (const target of exactExportTargets) {
      expect(() => readFileSync(resolve(__dirname, '../..', target), 'utf8')).not.toThrow();
    }
  });
});
