import type { ComponentRendererPropDefinitions, CommandPaletteCommandMap } from '@aurora/core';

export const useCommandPaletteExposes = {
  open: Function,
  close: Function,
  focus: Function,
} satisfies ComponentRendererPropDefinitions<CommandPaletteCommandMap>;

export type CommandPaletteExposes = CommandPaletteCommandMap;
