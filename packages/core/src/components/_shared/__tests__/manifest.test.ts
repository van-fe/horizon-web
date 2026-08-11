import { describe, expect, it } from 'vitest';
import {
  adaptManifestFields,
  buttonManifest,
  createReactComponentManifest,
  createVueComponentManifest,
  selectManifest,
  switchManifest,
  tooltipManifest,
} from '../..';

describe('component manifests', () => {
  it('publishes complete renderer-free metadata for every MVP component', () => {
    for (const manifest of [buttonManifest, switchManifest, tooltipManifest, selectManifest]) {
      expect(manifest.name).toMatch(/^[A-Z]/);
      expect(manifest.description.zh).not.toBe('');
      expect(manifest.description.en).not.toBe('');
      expect(manifest.semantics.length).toBeGreaterThan(0);
      expect(manifest.accessibility.length).toBeGreaterThan(0);
      expect(manifest.testVectors.length).toBeGreaterThan(0);
    }
  });

  it('creates isolated renderer API documents', () => {
    const vue = createVueComponentManifest(buttonManifest, {
      props: [],
      emits: [],
      slots: [],
      exposes: [],
    });
    const react = createReactComponentManifest(buttonManifest, {
      props: [],
      callbacks: [],
      renderers: [],
      ref: [],
    });
    expect(vue).toMatchObject({ renderer: 'vue', componentName: 'HButton' });
    expect(react).toMatchObject({ renderer: 'react', componentName: 'Button' });
    expect('callbacks' in vue.api).toBe(false);
    expect('emits' in react.api).toBe(false);
  });

  it('adapts renderer names without mutating the common contract', () => {
    const common = buttonManifest.contract.props;
    const vueProps = adaptManifestFields(common, {
      rename: { variant: 'type' },
      omit: ['asyncState'],
      extend: [
        { name: 'debounceType', type: 'ButtonAsyncState', description: { zh: '防抖状态', en: 'Debounce state' } },
      ],
    });
    expect(vueProps.some(field => field.name === 'type')).toBe(true);
    expect(vueProps.some(field => field.name === 'asyncState')).toBe(false);
    expect(common.some(field => field.name === 'variant')).toBe(true);
  });
});
