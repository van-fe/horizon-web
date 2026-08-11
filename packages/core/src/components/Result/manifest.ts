import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { ResultCommandMap, ResultEventMap, ResultRegionMap } from './contract';
import { resultApiContract } from './contract';

export const resultManifest = createComponentManifest({
  name: 'Result',
  category: 'feedback',
  description: {
    zh: '反馈操作结果或异常状态。',
    en: 'Communicates operation results or exceptional states.',
  },
  semantics: ['status', 'HTTP state', 'title', 'subtitle', 'actions'],
  accessibility: ['status ownership', 'descriptive image', 'named actions'],
  testVectors: ['icon state', 'HTTP state', 'custom regions', 'actions', 'size'],
  contract: {
    props: createPropManifestFields(resultApiContract, {
      title: { type: 'string', description: { zh: '标题', en: 'Title' } },
      subtitle: { type: 'string', description: { zh: '副标题', en: 'Subtitle' } },
      type: { type: 'ResultType', description: { zh: '类型', en: 'Type' } },
      size: { type: 'ResultSize', description: { zh: '尺寸', en: 'Size' } },
      primaryButton: { type: 'boolean', description: { zh: '主按钮', en: 'Primary button' } },
      primaryButtonText: {
        type: 'string',
        description: { zh: '主按钮文本', en: 'Primary button text' },
      },
      primaryButtonProps: {
        type: 'ButtonOptions',
        description: { zh: '主按钮配置', en: 'Primary button options' },
      },
      secondaryButton: { type: 'boolean', description: { zh: '次按钮', en: 'Secondary button' } },
      secondaryButtonText: {
        type: 'string',
        description: { zh: '次按钮文本', en: 'Secondary button text' },
      },
      secondaryButtonProps: {
        type: 'ButtonOptions',
        description: { zh: '次按钮配置', en: 'Secondary button options' },
      },
    }),
    emits: createManifestFields<ResultEventMap>({
      primaryClick: { type: 'unknown', description: { zh: '主按钮点击', en: 'Primary click' } },
      secondaryClick: { type: 'unknown', description: { zh: '次按钮点击', en: 'Secondary click' } },
    }),
    slots: createManifestFields<ResultRegionMap>({
      icon: { type: 'content', description: { zh: '图标', en: 'Icon' } },
      title: { type: 'content', description: { zh: '标题', en: 'Title' } },
      subtitle: { type: 'content', description: { zh: '副标题', en: 'Subtitle' } },
      extra: { type: 'content', description: { zh: '额外内容', en: 'Extra content' } },
    }),
    exposes: createManifestFields<ResultCommandMap>({}),
  },
});
