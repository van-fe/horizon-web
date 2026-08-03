import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';
export interface CommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  keywords?: string[];
  shortcut?: string;
  disabled?: boolean;
  group?: string;
  perform?: () => void | Promise<void>;
}
export const useCommandPaletteProps = declarePropType({
  /** 是否显示 @en Whether the palette is visible. */ visible: { type: Boolean, default: false },
  /** 命令列表 @en Available commands. */ commands: {
    type: Array as PropType<CommandPaletteItem[]>,
    default: () => [],
  },
  /** 搜索占位文字 @en Search placeholder. */ placeholder: { type: String },
  /** 无结果文字 @en Empty result text. */ emptyText: { type: String },
  /** 是否启用全局快捷键 Command/Ctrl+K @en Whether Command/Ctrl+K opens the palette. */ hotkey: {
    type: Boolean,
    default: true,
  },
  /** 执行后是否关闭 @en Whether to close after command execution. */ closeOnSelect: {
    type: Boolean,
    default: true,
  },
  /** 自定义过滤函数 @en Custom command filter. */ filter: {
    type: Function as PropType<(query: string, command: CommandPaletteItem) => boolean>,
  },
});
export type CommandPaletteProps = ExtractPropTypes<typeof useCommandPaletteProps>;
