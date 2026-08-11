import type { SlotsType } from 'vue';
import type { CommandPaletteItem } from './useProps';
export const useCommandPaletteSlots = Object as SlotsType<{
  /** 自定义命令项 @en Custom command item. */ command?: {
    command: CommandPaletteItem;
    active: boolean;
  };
  /** 自定义空状态 @en Custom empty state. */ empty?: {};
}>;
export type CommandPaletteSlots = typeof useCommandPaletteSlots;
