import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { AlertCommandMap, AlertEventMap, AlertRegionMap } from './contract';
import { alertApiContract } from './contract';

export const alertManifest = createComponentManifest({
  name: 'Alert',
  category: 'feedback',
  description: { zh: '展示重要的页面内提示信息。', en: 'Displays important inline feedback.' },
  semantics: ['status', 'title', 'description', 'actions', 'dismissal'],
  accessibility: ['alert or status role', 'live region', 'keyboard dismissal'],
  testVectors: ['type', 'content', 'actions', 'close', 'size'],
  contract: {
    props: createPropManifestFields(alertApiContract, {
      title: { type: 'string', description: { zh: '标题', en: 'Title' } },
      description: { type: 'string', description: { zh: '描述', en: 'Description' } },
      type: { type: 'AlertType', description: { zh: '类型', en: 'Type' } },
      closable: { type: 'boolean', description: { zh: '可关闭', en: 'Closable' } },
      primaryButtonText: {
        type: 'string',
        description: { zh: '主操作文本', en: 'Primary action text' },
      },
      defaultButtonText: {
        type: 'string',
        description: { zh: '次操作文本', en: 'Default action text' },
      },
      showIcon: { type: 'boolean', description: { zh: '显示图标', en: 'Show icon' } },
      size: { type: 'AlertSize', description: { zh: '尺寸', en: 'Size' } },
      onPrimary: {
        type: 'AlertActionHandler',
        description: { zh: '主操作', en: 'Primary action' },
      },
      onDefault: {
        type: 'AlertActionHandler',
        description: { zh: '次操作', en: 'Default action' },
      },
      rounded: { type: 'boolean', description: { zh: '圆角', en: 'Rounded' } },
    }),
    emits: createManifestFields<AlertEventMap>({
      close: { type: 'unknown', description: { zh: '关闭事件', en: 'Close event' } },
    }),
    slots: createManifestFields<AlertRegionMap>({
      content: { type: 'content', description: { zh: '提示内容', en: 'Alert content' } },
    }),
    exposes: createManifestFields<AlertCommandMap>({}),
  },
});
