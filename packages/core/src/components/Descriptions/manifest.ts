import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  DescriptionItemCommandMap,
  DescriptionItemEventMap,
  DescriptionItemRegionMap,
  DescriptionsCommandMap,
  DescriptionsEventMap,
  DescriptionsRegionMap,
} from './contract';
import { descriptionItemApiContract, descriptionsApiContract } from './contract';

const responsiveFields = {
  xs: { type: 'number', description: { zh: '超小容器值', en: 'Extra-small container value' } },
  sm: { type: 'number', description: { zh: '小容器值', en: 'Small container value' } },
  md: { type: 'number', description: { zh: '中容器值', en: 'Medium container value' } },
  lg: { type: 'number', description: { zh: '大容器值', en: 'Large container value' } },
  xl: { type: 'number', description: { zh: '超大容器值', en: 'Extra-large container value' } },
} as const;

export const descriptionsManifest = createComponentManifest({
  name: 'Descriptions',
  category: 'basic',
  description: { zh: '成组展示只读字段。', en: 'Displays grouped read-only fields.' },
  semantics: ['read-only fields', 'responsive grid', 'label alignment', 'bordered layout'],
  accessibility: ['description list semantics', 'structured labels and values'],
  testVectors: ['horizontal', 'vertical', 'responsive columns', 'spans', 'custom regions'],
  contract: {
    props: createPropManifestFields(descriptionsApiContract, {
      title: { type: 'string', description: { zh: '标题', en: 'Section title' } },
      border: { type: 'boolean', description: { zh: '显示边框', en: 'Shows borders' } },
      size: { type: 'DescriptionSize', description: { zh: '间距尺寸', en: 'Spacing size' } },
      type: { type: 'DescriptionType', description: { zh: '排列类型', en: 'Layout type' } },
      column: { type: 'number', description: { zh: '默认列数', en: 'Default columns' } },
      labelPosition: {
        type: 'DescriptionLabelPosition',
        description: { zh: '标签位置', en: 'Label position' },
      },
      labelClass: { type: 'string', description: { zh: '标签类名', en: 'Label class name' } },
      valueClass: { type: 'string', description: { zh: '值类名', en: 'Value class name' } },
      ...responsiveFields,
    }),
    emits: createManifestFields<DescriptionsEventMap>({}),
    slots: createManifestFields<DescriptionsRegionMap>({
      content: { type: 'content', description: { zh: '描述项', en: 'Description items' } },
      title: { type: 'content', description: { zh: '自定义标题', en: 'Custom title' } },
    }),
    exposes: createManifestFields<DescriptionsCommandMap>({}),
  },
});

export const descriptionItemManifest = createComponentManifest({
  name: 'DescriptionItem',
  category: 'basic',
  description: { zh: '展示一个只读字段。', en: 'Displays one read-only field.' },
  semantics: ['label and value', 'grid span', 'responsive span'],
  accessibility: ['term and description semantics'],
  testVectors: ['fallback content', 'custom regions', 'column span', 'row span'],
  contract: {
    props: createPropManifestFields(descriptionItemApiContract, {
      label: { type: 'string', description: { zh: '标签', en: 'Label' } },
      value: { type: 'string', description: { zh: '值', en: 'Value' } },
      spanCol: { type: 'number', description: { zh: '跨列数', en: 'Column span' } },
      spanRow: { type: 'number', description: { zh: '跨行数', en: 'Row span' } },
      ...responsiveFields,
    }),
    emits: createManifestFields<DescriptionItemEventMap>({}),
    slots: createManifestFields<DescriptionItemRegionMap>({
      content: { type: 'content', description: { zh: '自定义值', en: 'Custom value' } },
      label: { type: 'content', description: { zh: '自定义标签', en: 'Custom label' } },
    }),
    exposes: createManifestFields<DescriptionItemCommandMap>({}),
  },
});
