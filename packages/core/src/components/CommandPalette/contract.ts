import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export interface CommandPaletteCommand {
  /** 稳定命令标识。@en Stable command identifier. */
  id: string;
  /** 命令名称。@en Command label. */
  label: string;
  /** 命令说明。@en Command description. */
  description?: string;
  /** 附加搜索关键词。@en Additional search keywords. */
  keywords?: readonly string[];
  /** 展示用快捷键。@en Display shortcut. */
  shortcut?: string;
  /** 禁止执行。@en Prevents execution. */
  disabled?: boolean;
  /** 命令分组。@en Command group. */
  group?: string;
  /** 执行命令。@en Executes the command. */
  perform?: () => void | PromiseLike<void>;
}

export type CommandPaletteFilter<Command extends CommandPaletteCommand = CommandPaletteCommand> = (
  query: string,
  command: Command,
) => boolean;

export interface CommandPaletteCommonProps<
  Command extends CommandPaletteCommand = CommandPaletteCommand,
> {
  /** 受控打开状态。@en Controlled open state. */
  open?: boolean;
  /** 非受控初始打开状态。@en Initial uncontrolled open state. */
  defaultOpen?: boolean;
  /** 可用命令。@en Available commands. */
  commands?: readonly Command[];
  /** 搜索占位文字。@en Search placeholder. */
  placeholder?: string;
  /** 无结果文字。@en Empty-result text. */
  emptyText?: string;
  /** 启用 Command/Ctrl+K。@en Enables Command/Ctrl+K. */
  hotkey?: boolean;
  /** 执行后请求关闭。@en Requests closing after execution. */
  closeOnSelect?: boolean;
  /** 自定义过滤函数。@en Custom command filter. */
  filter?: CommandPaletteFilter<Command>;
}

export type CommandPaletteOpenReason =
  | 'hotkey'
  | 'escape'
  | 'outside-pointer'
  | 'select'
  | 'imperative';

export interface CommandPaletteEventMap<
  Command extends CommandPaletteCommand = CommandPaletteCommand,
> {
  /** 打开状态变化。@en Open state changed. */
  openChange: [open: boolean, reason: CommandPaletteOpenReason];
  /** 命令执行成功。@en Command executed successfully. */
  select: [command: Command];
  /** 搜索内容变化。@en Search query changed. */
  search: [query: string];
  /** 命令执行失败。@en Command execution failed. */
  error: [error: unknown, command: Command];
}

export interface CommandPaletteRegionMap<
  Command extends CommandPaletteCommand = CommandPaletteCommand,
> {
  /** 命令项。@en Command item. */
  command: { command: Command; active: boolean; pending: boolean };
  /** 无结果内容。@en Empty-result content. */
  empty: EmptyComponentApi;
}

export interface CommandPaletteCommandMap {
  /** 请求打开。@en Requests opening. */
  open: () => void;
  /** 请求关闭。@en Requests closing. */
  close: () => void;
  /** 聚焦搜索输入。@en Focuses the search input. */
  focus: () => void;
}

export const COMMAND_PALETTE_DEFAULTS = Object.freeze({
  defaultOpen: false,
  commands: Object.freeze([]),
  placeholder: '',
  emptyText: '',
  hotkey: true,
  closeOnSelect: true,
} as const satisfies Required<Omit<CommandPaletteCommonProps, 'filter' | 'open'>>);

export function isCommandPaletteCommand(value: unknown): value is CommandPaletteCommand {
  if (!value || typeof value !== 'object') return false;
  const command = value as Partial<CommandPaletteCommand>;
  return (
    typeof command.id === 'string' && command.id.length > 0 && typeof command.label === 'string'
  );
}

export function isCommandPaletteCommands(
  value: unknown,
): value is readonly CommandPaletteCommand[] {
  return Array.isArray(value) && value.every(isCommandPaletteCommand);
}

export function isCommandPaletteFilter(value: unknown): value is CommandPaletteFilter {
  return typeof value === 'function';
}

export const commandPaletteApiContract = defineComponentApiContract<
  CommandPaletteCommonProps,
  CommandPaletteEventMap,
  CommandPaletteRegionMap,
  CommandPaletteCommandMap
>({
  defaults: COMMAND_PALETTE_DEFAULTS,
  validators: { commands: isCommandPaletteCommands, filter: isCommandPaletteFilter },
});
