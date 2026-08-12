import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  ListCommandMap,
  ListEventMap,
  ListItemCommandMap,
  ListItemEventMap,
  ListItemRegionMap,
  ListRegionMap,
} from './contract';
import { listApiContract, listItemApiContract } from './contract';

export const listManifest = createComponentManifest({
  name: 'List',
  category: 'basic',
  description: {
    zh: '连续展示结构相同的数据项目。',
    en: 'Displays a continuous collection of structured items.',
  },
  semantics: ['collection', 'header and footer', 'alternating rows', 'bounded height'],
  accessibility: ['list semantics', 'structured list items'],
  testVectors: ['data renderer', 'custom content', 'sizes', 'zebra', 'border and split'],
  contract: {
    props: createPropManifestFields(listApiContract, {
      data: { type: 'readonly Item[]', description: { zh: '列表数据', en: 'Source items' } },
      zebra: { type: 'boolean', description: { zh: '斑马纹', en: 'Alternating rows' } },
      border: { type: 'boolean', description: { zh: '外边框', en: 'Outer border' } },
      split: { type: 'boolean', description: { zh: '项目分割线', en: 'Item separators' } },
      maxHeight: { type: 'number', description: { zh: '最大高度', en: 'Maximum height' } },
      size: { type: 'ListSize', description: { zh: '项目尺寸', en: 'Item size' } },
    }),
    emits: createManifestFields<ListEventMap>({}),
    slots: createManifestFields<ListRegionMap>({
      content: { type: 'content', description: { zh: '列表内容', en: 'List content' } },
      header: { type: 'content', description: { zh: '列表头部', en: 'List header' } },
      footer: { type: 'content', description: { zh: '列表尾部', en: 'List footer' } },
      item: { type: 'ListItemRegionContext', description: { zh: '数据项目', en: 'Data item' } },
    }),
    exposes: createManifestFields<ListCommandMap>({}),
  },
});

export const listItemManifest = createComponentManifest({
  name: 'ListItem',
  category: 'basic',
  description: {
    zh: '列表中的单个结构化内容项。',
    en: 'A structured content item within a list.',
  },
  semantics: ['title', 'subtitle', 'description', 'leading content', 'actions'],
  accessibility: ['list item semantics'],
  testVectors: ['fallback content', 'custom regions', 'title sizes', 'bold title'],
  contract: {
    props: createPropManifestFields(listItemApiContract, {
      title: { type: 'string', description: { zh: '标题', en: 'Title' } },
      titleSize: { type: 'ListSize', description: { zh: '标题尺寸', en: 'Title size' } },
      subtitle: { type: 'string', description: { zh: '副标题', en: 'Subtitle' } },
      titleBold: { type: 'boolean', description: { zh: '标题加粗', en: 'Bold title' } },
      describe: { type: 'string', description: { zh: '描述', en: 'Description' } },
    }),
    emits: createManifestFields<ListItemEventMap>({}),
    slots: createManifestFields<ListItemRegionMap>({
      content: { type: 'content', description: { zh: '主体内容', en: 'Body content' } },
      title: { type: 'content', description: { zh: '自定义标题', en: 'Custom title' } },
      leading: { type: 'content', description: { zh: '左侧内容', en: 'Leading content' } },
      description: { type: 'content', description: { zh: '自定义描述', en: 'Custom description' } },
      actions: { type: 'content', description: { zh: '操作区', en: 'Actions' } },
    }),
    exposes: createManifestFields<ListItemCommandMap>({}),
  },
});
