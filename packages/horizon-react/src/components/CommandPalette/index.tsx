import type { HTMLAttributes, KeyboardEvent, ReactElement, ReactNode } from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  CommandPaletteCommand as CoreCommandPaletteCommand,
  CommandPaletteCommandMap,
  CommandPaletteCommonProps,
  CommandPaletteOpenReason,
  CommandPaletteSnapshot,
} from '@aurora/core';
import { COMMAND_PALETTE_DEFAULTS, CommandPaletteController } from '@aurora/core';
import { createCommandPaletteHotkeyController } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Dialog } from '../Dialog';

export interface CommandPaletteCommand extends CoreCommandPaletteCommand {
  keywords?: readonly string[];
  perform?: () => void | Promise<void>;
}

type SharedProps = CommandPaletteCommonProps<CommandPaletteCommand>;

export interface CommandPaletteProps
  extends
    Omit<SharedProps, 'open'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onError' | 'onSelect'> {
  /** 受控打开状态。@en Controlled open state. */
  open?: boolean;
  /** 打开状态变化。@en Called when the open state changes. */
  onOpenChange?: (open: boolean, reason: CommandPaletteOpenReason) => void;
  /** 命令执行成功。@en Called after a command executes successfully. */
  onSelect?: (command: CommandPaletteCommand) => void;
  /** 搜索内容变化。@en Called when the search query changes. */
  onSearch?: (query: string) => void;
  /** 命令执行失败。@en Called when command execution fails. */
  onError?: (error: unknown, command: CommandPaletteCommand) => void;
  /** 自定义命令内容。@en Custom command content. */
  renderCommand?: (
    command: CommandPaletteCommand,
    context: { active: boolean; pending: boolean },
  ) => ReactNode;
  /** 自定义无结果内容。@en Custom empty-result content. */
  renderEmpty?: ReactNode | (() => ReactNode);
}

export interface CommandPaletteHandle extends CommandPaletteCommandMap {
  /** 搜索输入。@en Search input element. */
  readonly input: HTMLInputElement | null;
}

const emptySnapshot: CommandPaletteSnapshot<CommandPaletteCommand> = {
  query: '',
  commands: [],
  activeIndex: -1,
};

export const CommandPalette = forwardRef<CommandPaletteHandle, CommandPaletteProps>(
  function CommandPalette(
    {
      open,
      defaultOpen = COMMAND_PALETTE_DEFAULTS.defaultOpen,
      commands = COMMAND_PALETTE_DEFAULTS.commands,
      placeholder,
      emptyText,
      hotkey = COMMAND_PALETTE_DEFAULTS.hotkey,
      closeOnSelect = COMMAND_PALETTE_DEFAULTS.closeOnSelect,
      filter,
      onOpenChange,
      onSelect,
      onSearch,
      onError,
      renderCommand,
      renderEmpty,
      className,
      ...nativeProps
    },
    forwardedRef,
  ): ReactElement {
    const config = useHorizonWebConfig();
    const classes = useMemo(
      () => new ComponentClassBlock('command-palette', config.namespace.toLowerCase()),
      [config.namespace],
    );
    const listId = `${useId().replaceAll(':', '')}-command-palette-list`;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const callbacksRef = useRef({ onError, onOpenChange, onSearch, onSelect });
    const controlledRef = useRef(open !== undefined);
    const openRef = useRef(open ?? defaultOpen);
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [snapshot, setSnapshot] =
      useState<CommandPaletteSnapshot<CommandPaletteCommand>>(emptySnapshot);
    const controllerRef = useRef<CommandPaletteController<CommandPaletteCommand> | null>(null);
    callbacksRef.current = { onError, onOpenChange, onSearch, onSelect };
    controlledRef.current = open !== undefined;
    const currentOpen = open ?? uncontrolledOpen;
    openRef.current = currentOpen;

    if (!controllerRef.current) {
      controllerRef.current = new CommandPaletteController<CommandPaletteCommand>();
    }
    const controller: CommandPaletteController<CommandPaletteCommand> = controllerRef.current;

    const sync = useCallback(() => setSnapshot(controller.snapshot()), [controller]);
    const requestOpen = useCallback((nextOpen: boolean, reason: CommandPaletteOpenReason) => {
      if (nextOpen === openRef.current) return;
      if (!controlledRef.current) setUncontrolledOpen(nextOpen);
      callbacksRef.current.onOpenChange?.(nextOpen, reason);
    }, []);

    useEffect(() => {
      controller.setOptions({
        commands,
        filter,
        onSearch: query => callbacksRef.current.onSearch?.(query),
        onSelect: command => callbacksRef.current.onSelect?.(command),
        onError: (error, command) => callbacksRef.current.onError?.(error, command),
        onPendingChange: sync,
      });
      sync();
    }, [commands, controller, filter, sync]);

    useEffect(() => {
      if (!currentOpen) return;
      setSnapshot(controller.reset());
      const frame = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }, [controller, currentOpen]);

    useEffect(() => {
      const ownerDocument = inputRef.current?.ownerDocument ?? document;
      const hotkeyController = createCommandPaletteHotkeyController(ownerDocument, {
        enabled: hotkey,
        onToggle: () => requestOpen(!openRef.current, 'hotkey'),
      });
      return () => hotkeyController.destroy();
    }, [hotkey, requestOpen]);

    useEffect(() => () => controller.destroy(), [controller]);

    useImperativeHandle(
      forwardedRef,
      () => ({
        open: () => requestOpen(true, 'imperative'),
        close: () => requestOpen(false, 'imperative'),
        focus: () => inputRef.current?.focus(),
        get input() {
          return inputRef.current;
        },
      }),
      [requestOpen],
    );

    const setQuery = (query: string) => setSnapshot(controller.setQuery(query));
    const setActiveIndex = (index: number) => setSnapshot(controller.setActiveIndex(index));
    const execute = async (command?: CommandPaletteCommand) => {
      if (command) controller.setActiveIndex(snapshot.commands.indexOf(command));
      const result = await controller.execute();
      sync();
      if (result.status === 'completed' && closeOnSelect) requestOpen(false, 'select');
    };
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        setSnapshot(controller.move(event.key === 'ArrowDown' ? 1 : -1));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        void execute();
      }
    };

    return (
      <Dialog
        ariaLabel={config.commandPaletteLabels.dialog}
        cancelButtonProps={false}
        closeButton={false}
        destroyOnClose
        okButtonProps={false}
        open={currentOpen}
        size="small"
        title=""
        onOpenChange={(nextOpen, details) =>
          requestOpen(nextOpen, details.reason === 'escape' ? 'escape' : 'outside-pointer')
        }
      >
        <div {...nativeProps} className={cls(classes.block, className)}>
          <input
            aria-activedescendant={
              snapshot.activeIndex >= 0 ? `${listId}-option-${snapshot.activeIndex}` : undefined
            }
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded="true"
            aria-haspopup="listbox"
            className={classes.e('input')}
            placeholder={placeholder || config.commandPaletteLabels.placeholder}
            ref={inputRef}
            role="combobox"
            value={snapshot.query}
            onChange={event => setQuery(event.currentTarget.value)}
            onKeyDown={onKeyDown}
          />
          <div className={classes.e('list')} id={listId} role="listbox">
            {snapshot.commands.length ? (
              snapshot.commands.map((command, index) => {
                const active = index === snapshot.activeIndex;
                const pending = snapshot.pendingCommand?.id === command.id;
                return (
                  <button
                    aria-busy={pending || undefined}
                    aria-selected={active}
                    className={cls(classes.e('item'), classes.is('active', active))}
                    disabled={command.disabled}
                    id={`${listId}-option-${index}`}
                    key={command.id}
                    role="option"
                    type="button"
                    onClick={() => void execute(command)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    {renderCommand?.(command, { active, pending }) ?? (
                      <>
                        <span>
                          <strong>{command.label}</strong>
                          {command.description ? <small>{command.description}</small> : null}
                        </span>
                        {command.shortcut ? <kbd>{command.shortcut}</kbd> : null}
                      </>
                    )}
                  </button>
                );
              })
            ) : (
              <div className={classes.e('empty')}>
                {typeof renderEmpty === 'function'
                  ? renderEmpty()
                  : (renderEmpty ?? emptyText ?? config.commandPaletteLabels.empty)}
              </div>
            )}
          </div>
        </div>
      </Dialog>
    );
  },
);

export const HCommandPalette = CommandPalette;
