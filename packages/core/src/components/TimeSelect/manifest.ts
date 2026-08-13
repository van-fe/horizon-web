import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { TimeSelectCommandMap, TimeSelectEventMap, TimeSelectRegionMap } from './contract';
import { timeSelectApiContract } from './contract';

export const timeSelectManifest = createComponentManifest({
  name: 'TimeSelect',
  category: 'form',
  description: {
    zh: '从固定时间间隔生成的选项中选择时间。',
    en: 'Selects a time from options generated at fixed intervals.',
  },
  semantics: ['fixed interval options', 'HH:mm value', 'formatted labels', 'selectable bounds'],
  accessibility: ['combobox relationship', 'disabled options', 'keyboard navigation'],
  testVectors: ['aligned range', 'unaligned included end', 'invalid step', 'minimum and maximum'],
  contract: {
    props: createPropManifestFields(timeSelectApiContract, {
      value: { type: 'TimeSelectValue', description: { zh: '受控值', en: 'Controlled value' } },
      defaultValue: { type: 'TimeSelectValue', description: { zh: '初始值', en: 'Initial value' } },
      disabled: { type: 'boolean', description: { zh: '是否禁用', en: 'Whether disabled' } },
      editable: { type: 'boolean', description: { zh: '是否可输入', en: 'Whether editable' } },
      clearable: { type: 'boolean', description: { zh: '是否可清空', en: 'Whether clearable' } },
      start: { type: 'string', description: { zh: '起始时间', en: 'Start time' } },
      end: { type: 'string', description: { zh: '结束时间', en: 'End time' } },
      step: { type: 'string', description: { zh: '时间步长', en: 'Time step' } },
      includeEndTime: {
        type: 'boolean',
        description: { zh: '包含结束时间', en: 'Includes end time' },
      },
      minTime: { type: 'string', description: { zh: '最小时间', en: 'Minimum time' } },
      maxTime: { type: 'string', description: { zh: '最大时间', en: 'Maximum time' } },
      format: { type: 'string', description: { zh: '展示格式', en: 'Display format' } },
    }),
    emits: createManifestFields<TimeSelectEventMap>({
      valueChange: {
        type: '[value: TimeSelectValue]',
        description: { zh: '值变化', en: 'Value changed' },
      },
      focus: { type: '[]', description: { zh: '获得焦点', en: 'Received focus' } },
      blur: { type: '[]', description: { zh: '失去焦点', en: 'Lost focus' } },
      clear: { type: '[]', description: { zh: '值被清空', en: 'Value cleared' } },
      openChange: {
        type: '[open: boolean]',
        description: { zh: '面板显隐变化', en: 'Popup visibility changed' },
      },
    }),
    slots: createManifestFields<TimeSelectRegionMap>({
      empty: { type: 'content', description: { zh: '空状态', en: 'Empty state' } },
      panelHeader: { type: 'content', description: { zh: '面板头部', en: 'Popup header' } },
      panelFooter: { type: 'content', description: { zh: '面板底部', en: 'Popup footer' } },
    }),
    exposes: createManifestFields<TimeSelectCommandMap>({
      focus: { type: '() => void', description: { zh: '聚焦', en: 'Focuses' } },
      blur: { type: '() => void', description: { zh: '失焦', en: 'Blurs' } },
      clear: { type: '() => void', description: { zh: '清空', en: 'Clears' } },
      open: { type: '() => void', description: { zh: '打开面板', en: 'Opens popup' } },
      close: { type: '() => void', description: { zh: '关闭面板', en: 'Closes popup' } },
    }),
  },
});
