import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

type PackageManifest = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
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
});
