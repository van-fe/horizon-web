import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { RateCommandMap, RateEventMap, RateRegionMap } from './contract';
import { rateApiContract } from './contract';

export const rateManifest = createComponentManifest({
  name: 'Rate',
  category: 'form',
  description: { zh: '通过图标选择或展示评分。', en: 'Selects or displays a rating with icons.' },
  semantics: ['controlled value', 'uncontrolled value', 'half step', 'tooltip', 'readonly'],
  accessibility: ['slider role', 'keyboard adjustment', 'disabled and readonly semantics'],
  testVectors: ['pointer', 'keyboard', 'half step', 'tooltip', 'disabled', 'readonly'],
  contract: {
    props: createPropManifestFields(rateApiContract, {
      value: { type: 'number', description: { zh: '受控值', en: 'Controlled value' } },
      defaultValue: { type: 'number', description: { zh: '初始值', en: 'Initial value' } },
      count: { type: 'number', description: { zh: '评分项数量', en: 'Item count' } },
      half: { type: 'boolean', description: { zh: '允许半分', en: 'Allows half steps' } },
      showTooltip: { type: 'boolean', description: { zh: '显示提示', en: 'Shows a tooltip' } },
      tooltip: {
        type: 'readonly RateTooltip[]',
        description: { zh: '提示文本', en: 'Tooltip labels' },
      },
      readOnly: { type: 'boolean', description: { zh: '只读', en: 'Read-only' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      size: { type: 'RateSize', description: { zh: '图标尺寸', en: 'Icon size' } },
      color: { type: 'string', description: { zh: '激活颜色', en: 'Active color' } },
      voidColor: { type: 'string', description: { zh: '空态颜色', en: 'Empty color' } },
      disabledColor: { type: 'string', description: { zh: '禁用颜色', en: 'Disabled color' } },
      gutter: { type: 'number', description: { zh: '图标间距', en: 'Icon gap' } },
    }),
    emits: createManifestFields<RateEventMap>({
      change: { type: 'number', description: { zh: '值变化', en: 'Value changed' } },
      blur: { type: 'unknown', description: { zh: '失焦', en: 'Blurred' } },
    }),
    slots: createManifestFields<RateRegionMap>({
      icon: { type: 'RateIconRegionContext', description: { zh: '评分图标', en: 'Rating icon' } },
    }),
    exposes: createManifestFields<RateCommandMap>({
      focus: {
        type: '() => void',
        description: { zh: '聚焦评分控件', en: 'Focuses the rating control' },
      },
    }),
  },
});
