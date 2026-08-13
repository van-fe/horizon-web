import type { CommandPaletteCommand, CommandPaletteFilter } from './contract';
import {
  filterCommandPaletteCommands,
  getFirstEnabledCommandIndex,
  moveCommandPaletteActiveIndex,
} from './algorithms';

export interface CommandPaletteControllerOptions<Command extends CommandPaletteCommand> {
  commands?: readonly Command[];
  filter?: CommandPaletteFilter<Command>;
  onSearch?: (query: string) => void;
  onSelect?: (command: Command) => void;
  onError?: (error: unknown, command: Command) => void;
  onPendingChange?: (pending: boolean, command?: Command) => void;
}

export interface CommandPaletteSnapshot<Command extends CommandPaletteCommand> {
  query: string;
  commands: readonly Command[];
  activeIndex: number;
  activeCommand?: Command;
  pendingCommand?: Command;
}

export type CommandPaletteExecutionResult =
  | { status: 'completed' }
  | { status: 'ignored' }
  | { status: 'rejected'; error: unknown };

export class CommandPaletteController<
  Command extends CommandPaletteCommand = CommandPaletteCommand,
> {
  #options: CommandPaletteControllerOptions<Command>;
  #query = '';
  #filtered: Command[] = [];
  #activeIndex = -1;
  #pending?: Command;
  #destroyed = false;

  constructor(options: CommandPaletteControllerOptions<Command> = {}) {
    this.#options = options;
    this.#recompute();
  }

  setOptions(options: CommandPaletteControllerOptions<Command>): void {
    this.#options = options;
    this.#recompute();
  }

  snapshot(): CommandPaletteSnapshot<Command> {
    return {
      query: this.#query,
      commands: this.#filtered,
      activeIndex: this.#activeIndex,
      activeCommand: this.#filtered[this.#activeIndex],
      pendingCommand: this.#pending,
    };
  }

  reset(): CommandPaletteSnapshot<Command> {
    this.#query = '';
    this.#recompute();
    return this.snapshot();
  }

  setQuery(query: string): CommandPaletteSnapshot<Command> {
    this.#query = query;
    this.#recompute();
    this.#options.onSearch?.(query);
    return this.snapshot();
  }

  setActiveIndex(index: number): CommandPaletteSnapshot<Command> {
    const command = this.#filtered[index];
    if (command && !command.disabled) this.#activeIndex = index;
    return this.snapshot();
  }

  move(delta: -1 | 1): CommandPaletteSnapshot<Command> {
    this.#activeIndex = moveCommandPaletteActiveIndex(this.#filtered, this.#activeIndex, delta);
    return this.snapshot();
  }

  async execute(
    command = this.#filtered[this.#activeIndex],
  ): Promise<CommandPaletteExecutionResult> {
    if (this.#destroyed || !command || command.disabled || this.#pending)
      return { status: 'ignored' };
    this.#pending = command;
    this.#options.onPendingChange?.(true, command);
    try {
      await command.perform?.();
      if (this.#destroyed) return { status: 'ignored' };
      this.#options.onSelect?.(command);
      return { status: 'completed' };
    } catch (error) {
      if (this.#destroyed) return { status: 'ignored' };
      this.#options.onError?.(error, command);
      return { status: 'rejected', error };
    } finally {
      if (!this.#destroyed) {
        this.#pending = undefined;
        this.#options.onPendingChange?.(false, command);
      }
    }
  }

  destroy(): void {
    this.#destroyed = true;
    this.#pending = undefined;
  }

  #recompute(): void {
    const activeId = this.#filtered[this.#activeIndex]?.id;
    this.#filtered = filterCommandPaletteCommands(
      this.#options.commands ?? [],
      this.#query,
      this.#options.filter,
    );
    const retained = activeId
      ? this.#filtered.findIndex(command => command.id === activeId && !command.disabled)
      : -1;
    this.#activeIndex = retained >= 0 ? retained : getFirstEnabledCommandIndex(this.#filtered);
  }
}
