import { createComponentManifest } from '../_shared/manifest';

export const tooltipManifest = createComponentManifest({
  name: 'Tooltip',
  category: 'overlay',
  description: {
    zh: '为界面元素提供简短的上下文说明。',
    en: 'Provides short contextual help for an interface element.',
  },
  semantics: ['delayed open', 'delayed close', 'controlled open', 'trigger reason'],
  accessibility: ['tooltip role', 'aria-describedby ownership', 'Escape dismissal'],
  testVectors: ['hover delay', 'focus', 'click', 'controlled state', 'outside dismissal'],
  contract: {
    props: [
      { name: 'open', type: 'boolean', description: { zh: '受控打开状态', en: 'Controlled open state' } },
      { name: 'defaultOpen', type: 'boolean', defaultValue: 'false', description: { zh: '初始打开状态', en: 'Initial open state' } },
      { name: 'trigger', type: 'TooltipTrigger', defaultValue: 'hover', description: { zh: '触发方式', en: 'Trigger interaction' } },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: { zh: '是否禁用', en: 'Whether disabled' } },
      { name: 'showDelay', type: 'number', defaultValue: '0', description: { zh: '显示延迟', en: 'Open delay' } },
      { name: 'hideDelay', type: 'number', defaultValue: '0', description: { zh: '隐藏延迟', en: 'Close delay' } },
    ],
    emits: [
      { name: 'openChange', type: '{ open: boolean; reason: TooltipOpenReason }', description: { zh: '打开状态变化', en: 'Open state changed' } },
    ],
    slots: [
      { name: 'trigger', type: 'content', description: { zh: '触发元素', en: 'Trigger element' } },
      { name: 'content', type: 'content', description: { zh: '提示内容', en: 'Tooltip content' } },
    ],
    exposes: [
      { name: 'open', type: '() => void', description: { zh: '打开', en: 'Opens the tooltip' } },
      { name: 'close', type: '() => void', description: { zh: '关闭', en: 'Closes the tooltip' } },
      { name: 'update', type: '() => Promise<void>', description: { zh: '更新位置', en: 'Updates position' } },
    ],
  },
});
