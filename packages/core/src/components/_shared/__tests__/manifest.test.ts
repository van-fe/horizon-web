import { describe, expect, it } from 'vitest';
import {
  adaptManifestFields,
  avatarApiContract,
  buttonManifest,
  createManifestFields,
  createPropManifestFields,
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
      override: { variant: { defaultValue: 'primary' } },
      extend: [
        {
          name: 'debounceType',
          type: 'ButtonAsyncState',
          description: { zh: '防抖状态', en: 'Debounce state' },
        },
      ],
    });
    expect(vueProps.some(field => field.name === 'type')).toBe(true);
    expect(vueProps.find(field => field.name === 'type')?.defaultValue).toBe('primary');
    expect(vueProps.some(field => field.name === 'asyncState')).toBe(false);
    expect(common.some(field => field.name === 'variant')).toBe(true);
  });

  it('derives field names and defaults from the typed API contract', () => {
    const props = createPropManifestFields(avatarApiContract, {
      size: { type: 'AvatarSize', description: { zh: '尺寸', en: 'Size' } },
      src: { type: 'string', description: { zh: '来源', en: 'Source' } },
      fit: { type: 'AvatarFit', description: { zh: '适应', en: 'Fit' } },
      type: { type: 'AvatarType', description: { zh: '类型', en: 'Type' } },
      fallbackSrc: { type: 'string', description: { zh: '兜底', en: 'Fallback' } },
    });
    const regions = createManifestFields<{ content: unknown }>({
      content: { type: 'content', description: { zh: '内容', en: 'Content' } },
    });

    expect(props.find(field => field.name === 'size')?.defaultValue).toBe('medium');
    expect(props.find(field => field.name === 'src')?.defaultValue).toBeUndefined();
    expect(regions).toEqual([
      { name: 'content', type: 'content', description: { zh: '内容', en: 'Content' } },
    ]);
  });
});
