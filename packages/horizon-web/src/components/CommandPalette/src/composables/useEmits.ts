import type { CommandPaletteItem } from './useProps';
export const useCommandPaletteEmits = {
  /** 可见状态变化 @en Emitted when visibility changes. @param value 是否显示 @paramEn value Whether visible. */ 'update:visible':
    (value: boolean) => typeof value === 'boolean',
  /** 执行命令 @en Emitted when a command executes. @param command 命令 @paramEn command Executed command. */ select:
    (command: CommandPaletteItem) => Boolean(command),
  /** 搜索内容变化 @en Emitted when search changes. @param query 查询内容 @paramEn query Search query. */ search:
    (query: string) => typeof query === 'string',
};
export type CommandPaletteEmits = typeof useCommandPaletteEmits;
