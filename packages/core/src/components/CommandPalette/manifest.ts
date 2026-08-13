import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  CommandPaletteCommandMap,
  CommandPaletteEventMap,
  CommandPaletteRegionMap,
} from './contract';
import { commandPaletteApiContract } from './contract';

export const commandPaletteManifest = createComponentManifest({
  name: 'CommandPalette',
  category: 'overlay',
  description: {
    zh: '可搜索并通过键盘执行操作的命令面板。',
    en: 'A searchable keyboard-first command palette.',
  },
  semantics: [
    'search',
    'keyboard navigation',
    'global hotkey',
    'async command',
    'disabled command',
  ],
  accessibility: ['dialog', 'combobox', 'listbox', 'active descendant', 'focus restoration'],
  testVectors: [
    'empty',
    'custom filter',
    'disabled navigation',
    'async rejection',
    'hotkey cleanup',
  ],
  contract: {
    props: createPropManifestFields(commandPaletteApiContract, {
      open: { type: 'boolean', description: { zh: '受控打开状态', en: 'Controlled open state' } },
      defaultOpen: {
        type: 'boolean',
        description: { zh: '初始打开状态', en: 'Initial open state' },
      },
      commands: {
        type: 'readonly CommandPaletteCommand[]',
        description: { zh: '命令列表', en: 'Commands' },
      },
      placeholder: {
        type: 'string',
        description: { zh: '搜索占位文字', en: 'Search placeholder' },
      },
      emptyText: { type: 'string', description: { zh: '无结果文字', en: 'Empty-result text' } },
      hotkey: {
        type: 'boolean',
        description: { zh: '启用全局快捷键', en: 'Enables global hotkey' },
      },
      closeOnSelect: {
        type: 'boolean',
        description: { zh: '执行后关闭', en: 'Closes after execution' },
      },
      filter: {
        type: 'CommandPaletteFilter',
        description: { zh: '过滤函数', en: 'Filter function' },
      },
    }),
    emits: createManifestFields<CommandPaletteEventMap>({
      openChange: {
        type: '[open: boolean, reason: CommandPaletteOpenReason]',
        description: { zh: '打开状态变化', en: 'Open state changed' },
      },
      select: {
        type: '[command: CommandPaletteCommand]',
        description: { zh: '执行成功', en: 'Execution succeeded' },
      },
      search: { type: '[query: string]', description: { zh: '搜索变化', en: 'Search changed' } },
      error: {
        type: '[error: unknown, command: CommandPaletteCommand]',
        description: { zh: '执行失败', en: 'Execution failed' },
      },
    }),
    slots: createManifestFields<CommandPaletteRegionMap>({
      command: { type: 'content', description: { zh: '命令项', en: 'Command item' } },
      empty: { type: 'content', description: { zh: '无结果内容', en: 'Empty-result content' } },
    }),
    exposes: createManifestFields<CommandPaletteCommandMap>({
      open: { type: '() => void', description: { zh: '请求打开', en: 'Requests opening' } },
      close: { type: '() => void', description: { zh: '请求关闭', en: 'Requests closing' } },
      focus: { type: '() => void', description: { zh: '聚焦搜索', en: 'Focuses search' } },
    }),
  },
});
