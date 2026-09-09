import { describe, expect, it } from 'vitest';

import {
  componentManifests,
  findComponentManifest,
  getComponentApi,
  isComponentManifest,
  listComponents,
  searchComponentApi,
} from '../catalog.js';

describe('Aurora MCP component catalog', () => {
  it('discovers the Core manifests without duplicate component names', () => {
    const names = componentManifests.map(manifest => manifest.name);
    expect(names.length).toBeGreaterThan(50);
    expect(new Set(names).size).toBe(names.length);
    expect(names).toEqual([...names].sort((left, right) => left.localeCompare(right)));
  });

  it('validates manifest-shaped values defensively', () => {
    expect(isComponentManifest(null)).toBe(false);
    expect(isComponentManifest({ name: 'Broken' })).toBe(false);
    expect(isComponentManifest(componentManifests[0])).toBe(true);
  });

  it('lists localized components with category, query, and limit filters', () => {
    expect(listComponents()).toHaveLength(50);
    expect(listComponents({ query: 'select', category: 'form', limit: 1 })).toHaveLength(1);
    expect(listComponents({ query: 'missing component' })).toEqual([]);
    expect(listComponents({ query: 'button', locale: 'zh' })[0]?.description).not.toBe('');
  });

  it('resolves component names case-insensitively and localizes fields', () => {
    expect(findComponentManifest(' tree-select ')?.name).toBe('TreeSelect');
    expect(findComponentManifest('not-real')).toBeUndefined();

    const button = getComponentApi('button', 'zh');
    expect(button?.name).toBe('Button');
    expect(button?.api.props.length).toBeGreaterThan(0);
    expect(button?.api.props[0]?.description).not.toBe('');
    expect(getComponentApi('not-real')).toBeUndefined();
  });

  it('searches all API sections and supports focused searches', () => {
    const results = searchComponentApi({ query: 'disabled', limit: 200 });
    expect(results.some(result => result.kind === 'props')).toBe(true);

    const buttonProps = searchComponentApi({
      query: '',
      component: 'Button',
      kind: 'props',
      locale: 'zh',
      limit: 2,
    });
    expect(buttonProps).toHaveLength(2);
    expect(buttonProps.every(result => result.component === 'Button')).toBe(true);
    expect(searchComponentApi({ query: '', component: 'not-real' })).toEqual([]);
  });
});
