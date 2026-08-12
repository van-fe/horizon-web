import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  ContainerCommandMap,
  ContainerEventMap,
  ContainerRegionMap,
  LayoutRegionCommandMap,
  LayoutRegionEventMap,
  LayoutRegionMap,
} from './contract';
import {
  asideApiContract,
  containerApiContract,
  footerApiContract,
  headerApiContract,
  mainApiContract,
} from './contract';

const regionContract = {
  emits: createManifestFields<LayoutRegionEventMap>({}),
  slots: createManifestFields<LayoutRegionMap>({
    content: { type: 'content', description: { zh: '区域内容', en: 'Region content' } },
  }),
  exposes: createManifestFields<LayoutRegionCommandMap>({}),
};

export const containerManifest = createComponentManifest({
  name: 'Container',
  category: 'basic',
  description: { zh: '组合页面级布局区域。', en: 'Composes page-level layout regions.' },
  semantics: ['horizontal and vertical direction', 'automatic region inference', 'nested shells'],
  accessibility: ['semantic section', 'preserves region landmarks'],
  testVectors: ['automatic direction', 'explicit direction', 'nested container'],
  contract: {
    props: createPropManifestFields(containerApiContract, {
      direction: {
        type: 'ContainerDirection',
        description: { zh: '排列方向', en: 'Layout direction' },
      },
    }),
    emits: createManifestFields<ContainerEventMap>({}),
    slots: createManifestFields<ContainerRegionMap>({
      content: { type: 'content', description: { zh: '布局区域', en: 'Layout regions' } },
    }),
    exposes: createManifestFields<ContainerCommandMap>({}),
  },
});

export const headerManifest = createComponentManifest({
  name: 'Header',
  category: 'basic',
  description: { zh: '页面布局顶部区域。', en: 'Header region within a page layout.' },
  semantics: ['header landmark', 'fixed flex basis'],
  accessibility: ['semantic header element'],
  testVectors: ['default height', 'numeric height', 'CSS height'],
  contract: {
    props: createPropManifestFields(headerApiContract, {
      height: { type: 'ContainerDimension', description: { zh: '区域高度', en: 'Region height' } },
    }),
    ...regionContract,
  },
});

export const asideManifest = createComponentManifest({
  name: 'Aside',
  category: 'basic',
  description: { zh: '页面布局侧边区域。', en: 'Aside region within a page layout.' },
  semantics: ['aside landmark', 'scrollable fixed flex basis'],
  accessibility: ['semantic aside element'],
  testVectors: ['default width', 'numeric width', 'CSS width'],
  contract: {
    props: createPropManifestFields(asideApiContract, {
      width: { type: 'ContainerDimension', description: { zh: '区域宽度', en: 'Region width' } },
    }),
    ...regionContract,
  },
});

export const mainManifest = createComponentManifest({
  name: 'Main',
  category: 'basic',
  description: { zh: '页面布局主内容区域。', en: 'Main content region within a page layout.' },
  semantics: ['main landmark', 'flexible scroll area'],
  accessibility: ['semantic main element', 'one primary main per page'],
  testVectors: ['content', 'overflow', 'nested shell'],
  contract: {
    props: createPropManifestFields(mainApiContract, {}),
    ...regionContract,
  },
});

export const footerManifest = createComponentManifest({
  name: 'Footer',
  category: 'basic',
  description: { zh: '页面布局底部区域。', en: 'Footer region within a page layout.' },
  semantics: ['footer landmark', 'fixed flex basis'],
  accessibility: ['semantic footer element'],
  testVectors: ['default height', 'numeric height', 'CSS height'],
  contract: {
    props: createPropManifestFields(footerApiContract, {
      height: { type: 'ContainerDimension', description: { zh: '区域高度', en: 'Region height' } },
    }),
    ...regionContract,
  },
});
