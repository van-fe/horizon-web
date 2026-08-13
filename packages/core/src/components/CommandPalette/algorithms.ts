import type { CommandPaletteCommand, CommandPaletteFilter } from './contract';

export function normalizeCommandPaletteQuery(query: string): string {
  return query.trim().toLocaleLowerCase();
}

export function defaultCommandPaletteFilter(
  query: string,
  command: CommandPaletteCommand,
): boolean {
  const needle = normalizeCommandPaletteQuery(query);
  if (!needle) return true;
  return [command.label, command.description, ...(command.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase()
    .includes(needle);
}

export function filterCommandPaletteCommands<Command extends CommandPaletteCommand>(
  commands: readonly Command[],
  query: string,
  filter?: CommandPaletteFilter<Command>,
): Command[] {
  const needle = normalizeCommandPaletteQuery(query);
  if (!needle) return [...commands];
  return commands.filter(command => (filter ?? defaultCommandPaletteFilter)(needle, command));
}

export function moveCommandPaletteActiveIndex<Command extends CommandPaletteCommand>(
  commands: readonly Command[],
  currentIndex: number,
  delta: -1 | 1,
): number {
  if (!commands.some(command => !command.disabled)) return -1;
  let index = currentIndex;
  for (let count = 0; count < commands.length; count += 1) {
    index = (index + delta + commands.length) % commands.length;
    if (!commands[index]?.disabled) return index;
  }
  return -1;
}

export function getFirstEnabledCommandIndex(commands: readonly CommandPaletteCommand[]): number {
  return commands.findIndex(command => !command.disabled);
}

export function isCommandPaletteHotkey(event: {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  repeat?: boolean;
}): boolean {
  return Boolean(
    !event.altKey &&
    !event.shiftKey &&
    !event.repeat &&
    (event.ctrlKey || event.metaKey) &&
    event.key.toLocaleLowerCase() === 'k',
  );
}
