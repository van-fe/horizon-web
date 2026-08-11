import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { PopconfirmCommandMap, PopconfirmEventMap, PopconfirmRegionMap } from './contract';
import { popconfirmApiContract } from './contract';

export const popconfirmManifest = createComponentManifest({
  name: 'Popconfirm',
  category: 'overlay',
  description: {
    zh: '在执行高风险操作前显示确认浮层。',
    en: 'Displays a confirmation popover before a high-risk action.',
  },
  semantics: ['controlled open', 'confirmation guard', 'pending state', 'confirm', 'cancel'],
  accessibility: ['alertdialog ownership', 'expanded state', 'escape dismissal', 'focus return'],
  testVectors: ['controlled state', 'disabled', 'guard prevented', 'async deduplication', 'cancel'],
  contract: {
    props: createPropManifestFields(popconfirmApiContract, {
      title: { type: 'string', description: { zh: '确认标题', en: 'Confirmation title' } },
      open: { type: 'boolean', description: { zh: '受控打开状态', en: 'Controlled open state' } },
      defaultOpen: {
        type: 'boolean',
        description: { zh: '初始打开状态', en: 'Initial open state' },
      },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      placement: { type: 'PopconfirmPlacement', description: { zh: '浮层位置', en: 'Placement' } },
      confirmText: { type: 'string', description: { zh: '确认文字', en: 'Confirm label' } },
      cancelText: { type: 'string', description: { zh: '取消文字', en: 'Cancel label' } },
      confirmButtonProps: {
        type: 'unknown',
        description: { zh: '确认按钮参数', en: 'Confirm button options' },
      },
      cancelButtonProps: {
        type: 'unknown',
        description: { zh: '取消按钮参数', en: 'Cancel button options' },
      },
      beforeConfirm: {
        type: 'PopconfirmBeforeConfirm',
        description: { zh: '确认前守卫', en: 'Confirmation guard' },
      },
    }),
    emits: createManifestFields<PopconfirmEventMap>({
      openChange: {
        type: '[boolean, PopconfirmChangeDetails]',
        description: { zh: '打开状态变化', en: 'Open state changed' },
      },
      confirm: { type: 'unknown', description: { zh: '确认完成', en: 'Confirmation completed' } },
      cancel: { type: 'unknown', description: { zh: '取消确认', en: 'Confirmation cancelled' } },
    }),
    slots: createManifestFields<PopconfirmRegionMap>({
      trigger: { type: 'void', description: { zh: '触发元素', en: 'Trigger element' } },
      content: { type: 'void', description: { zh: '确认内容', en: 'Confirmation content' } },
      icon: { type: 'void', description: { zh: '状态图标', en: 'Status icon' } },
    }),
    exposes: createManifestFields<PopconfirmCommandMap>({
      open: { type: '() => void', description: { zh: '打开浮层', en: 'Opens the popover' } },
      close: { type: '() => void', description: { zh: '关闭浮层', en: 'Closes the popover' } },
    }),
  },
});
