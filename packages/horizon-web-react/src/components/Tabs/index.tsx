import type {
  DragEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  AdaptComponentApiShape,
  ComponentEventHandlers,
  TabCommonProps,
  TabEventMap,
  TabsCommandMap,
  TabsCommonProps,
  TabsEventMap,
  TabsExtraRegionContext,
  TabsKey,
} from '@aurora/core';
import {
  isTabsActivationKey,
  isTabsNavigationKey,
  reorderTabsKeys,
  resolveTabsCloseValue,
  resolveTabsNavigationIndex,
  TAB_DEFAULTS,
  TABS_DEFAULTS,
} from '@aurora/core';
import { focusTabsItem, scrollTabsViewport } from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type { TabsKey, TabsSize, TabsVariant } from '@aurora/core';

type TabsReactEvents = AdaptComponentApiShape<
  TabsEventMap,
  { change: 'onChange'; add: 'onAdd'; close: 'onClose'; sort: 'onSort' }
>;
type TabReactEvents = AdaptComponentApiShape<TabEventMap, { click: 'onClick'; close: 'onClose' }>;

export type TabsProps = TabsCommonProps &
  ComponentEventHandlers<TabsReactEvents> &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onChange'> & {
    /** 页签条目。 @en Composed tab items. */
    children?: ReactNode;
    /** 额外操作。 @en Extra actions. */
    extra?: ReactNode | ((context: TabsExtraRegionContext) => ReactNode);
  };

export type TabProps = TabCommonProps<ReactNode, ReactNode> &
  ComponentEventHandlers<TabReactEvents> &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'draggable' | 'onClick'> & {
    /** 自定义页签内容。 @en Custom tab content. */
    children?:
      | ReactNode
      | ((context: { active: boolean; activeKey: TabsKey | undefined }) => ReactNode);
  };

export interface TabsHandle extends TabsCommandMap {
  /** 页签根元素。 @en Tabs root element. */
  readonly root: HTMLDivElement | null;
}

interface TabsContextValue {
  activeKey: TabsKey | undefined;
  classes: ComponentClassBlock;
  draggable: boolean;
  onDrop: (target: TabsKey) => void;
  onDragStart: (key: TabsKey) => void;
  requestClose: (key: TabsKey) => void;
  requestSelect: (key: TabsKey) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function tabElements(children: ReactNode): ReactElement<TabProps>[] {
  return Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> =>
      isValidElement<TabProps>(child) && child.type === Tab,
  );
}

export const Tabs = forwardRef<TabsHandle, TabsProps>(function Tabs(
  {
    value,
    defaultValue,
    size = TABS_DEFAULTS.size,
    draggable = TABS_DEFAULTS.draggable,
    scrollable = TABS_DEFAULTS.scrollable,
    focusable = TABS_DEFAULTS.focusable,
    arrow = TABS_DEFAULTS.arrow,
    variant = TABS_DEFAULTS.variant,
    underline = TABS_DEFAULTS.underline,
    indicator = TABS_DEFAULTS.indicator,
    editable = TABS_DEFAULTS.editable,
    beforeChange,
    children,
    extra,
    onChange,
    onAdd,
    onClose,
    onSort,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('tabs', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [uncontrolledKey, setUncontrolledKey] = useState<TabsKey | undefined>(defaultValue);
  const activeKey = value ?? uncontrolledKey;
  const activeRef = useRef(activeKey);
  activeRef.current = activeKey;
  const requestVersion = useRef(0);
  const dragKey = useRef<TabsKey | undefined>(undefined);
  const items = tabElements(children);
  const itemMap = new Map(items.map(item => [item.props.value, item]));
  const incomingKeys = items.map(item => item.props.value);
  const [orderedKeys, setOrderedKeys] = useState<TabsKey[]>(incomingKeys);

  useEffect(() => {
    setOrderedKeys(current => [
      ...current.filter(key => incomingKeys.includes(key)),
      ...incomingKeys.filter(key => !current.includes(key)),
    ]);
  }, [incomingKeys.join('\u0000')]);

  useImperativeHandle(
    ref,
    () => ({
      focus: key => void focusTabsItem(rootRef.current, key),
      get root() {
        return rootRef.current;
      },
    }),
    [],
  );

  useLayoutEffect(() => {
    if (!indicator || variant !== 'line') return;
    const selected = rootRef.current?.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"]',
    );
    if (!selected || !listRef.current) return;
    listRef.current.style.setProperty('--h-tabs-indicator-width', `${selected.offsetWidth}px`);
    listRef.current.style.setProperty('--h-tabs-indicator-left', `${selected.offsetLeft}px`);
    if (focusable) selected.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeKey, focusable, indicator, orderedKeys, size, variant]);

  async function requestSelect(key: TabsKey): Promise<void> {
    if (activeRef.current === key) return;
    const version = ++requestVersion.current;
    const previous = activeRef.current;
    if (beforeChange && (await beforeChange(key)) === false) return;
    if (version !== requestVersion.current || activeRef.current !== previous) return;
    if (value === undefined) setUncontrolledKey(key);
    onChange?.(key);
  }

  function requestClose(key: TabsKey): void {
    const next = resolveTabsCloseValue(activeKey, key, orderedKeys);
    if (next !== activeKey && next !== undefined) {
      if (value === undefined) setUncontrolledKey(next);
      onChange?.(next);
    }
    onClose?.(key);
  }

  function drop(target: TabsKey): void {
    const currentIndex = orderedKeys.indexOf(dragKey.current!);
    const targetIndex = orderedKeys.indexOf(target);
    if (currentIndex < 0 || targetIndex < 0 || currentIndex === targetIndex) return;
    const next = reorderTabsKeys(orderedKeys, currentIndex, targetIndex);
    setOrderedKeys(next);
    onSort?.(currentIndex, targetIndex, next);
  }

  function onNavigationKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (!isTabsNavigationKey(event.key)) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]:not([aria-disabled="true"])'),
    );
    const current = tabs.indexOf(
      (event.target as HTMLElement).closest('[role="tab"]') as HTMLElement,
    );
    const nextIndex = resolveTabsNavigationIndex(current, event.key, tabs.length);
    if (nextIndex === undefined) return;
    event.preventDefault();
    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  }

  const orderedItems = orderedKeys.flatMap(key => itemMap.get(key) ?? []);
  const showArrows = arrow && scrollable && orderedItems.length > 4;
  const extraContent = typeof extra === 'function' ? extra({ size }) : extra;
  const addButton = editable ? (
    <button
      aria-label="Add tab"
      className={cls(classes.e('icon-outer'), classes.em('icon-outer', 'add'))}
      onClick={() => onAdd?.()}
      type="button"
    >
      ＋
    </button>
  ) : null;

  return (
    <TabsContext.Provider
      value={{
        activeKey,
        classes,
        draggable,
        onDrop: drop,
        onDragStart: key => {
          dragKey.current = key;
        },
        requestClose,
        requestSelect: key => void requestSelect(key),
      }}
    >
      <div
        {...nativeProps}
        aria-orientation="horizontal"
        className={cls(
          classes.block,
          classes.m(variant),
          classes.m(size, variant !== 'page'),
          classes.m('underline', variant === 'line' && underline),
          className,
        )}
        onKeyDown={onNavigationKeyDown}
        ref={rootRef}
        role="tablist"
      >
        <div className={classes.e('nav')}>
          <div className={classes.e('nav-wrap')} ref={viewportRef}>
            <div className={classes.e('nav-list')} ref={listRef}>
              {orderedItems}
              {indicator && variant === 'line' ? (
                <div
                  className={classes.e('indicator')}
                  style={{
                    transform: 'translate3d(var(--h-tabs-indicator-left, 0px), 0, 0)',
                    width: 'var(--h-tabs-indicator-width, 0px)',
                  }}
                />
              ) : null}
            </div>
            {!showArrows ? addButton : null}
          </div>
          <div className={classes.e('extra-outer')}>
            <div className={classes.e('default-actions')}>
              {showArrows ? addButton : null}
              {showArrows ? (
                <div className={classes.e('arrow')}>
                  <button
                    aria-label="Scroll tabs backward"
                    className={classes.e('icon-outer')}
                    onClick={() => scrollTabsViewport(viewportRef.current, 'left')}
                    type="button"
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Scroll tabs forward"
                    className={classes.e('icon-outer')}
                    onClick={() => scrollTabsViewport(viewportRef.current, 'right')}
                    type="button"
                  >
                    ›
                  </button>
                </div>
              ) : null}
            </div>
            {extraContent ? <div className={classes.e('extra')}>{extraContent}</div> : null}
          </div>
        </div>
      </div>
    </TabsContext.Provider>
  );
});

export function Tab({
  value,
  label,
  icon = TAB_DEFAULTS.icon,
  iconSize,
  disabled = TAB_DEFAULTS.disabled,
  closable = TAB_DEFAULTS.closable,
  draggable = TAB_DEFAULTS.draggable,
  children,
  onClick,
  onClose,
  className,
  ...nativeProps
}: TabProps): ReactElement {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be rendered inside Tabs.');
  const tabsContext = context;
  const active = tabsContext.activeKey === value;

  function activate(): void {
    if (disabled) return;
    onClick?.(value);
    tabsContext.requestSelect(value);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (!isTabsActivationKey(event.key)) return;
    event.preventDefault();
    activate();
  }

  function close(event: MouseEvent): void {
    event.stopPropagation();
    onClose?.(value);
    tabsContext.requestClose(value);
  }

  const content =
    typeof children === 'function'
      ? children({ active, activeKey: tabsContext.activeKey })
      : children;
  const canDrag = tabsContext.draggable && draggable && !disabled;

  return (
    <div
      {...nativeProps}
      aria-disabled={disabled}
      aria-selected={active}
      className={cls(
        context.classes.e('tab'),
        context.classes.em('tab', 'active', active),
        context.classes.em('tab', 'disabled', disabled),
        className,
      )}
      data-tab-key={value}
      draggable={canDrag}
      onClick={activate}
      onDragOver={event => {
        if (canDrag) event.preventDefault();
      }}
      onDragStart={(event: DragEvent<HTMLDivElement>) => {
        context.onDragStart(value);
        event.dataTransfer.effectAllowed = 'move';
      }}
      onDrop={() => {
        if (canDrag) context.onDrop(value);
      }}
      onKeyDown={onKeyDown}
      role="tab"
      tabIndex={disabled ? -1 : active ? 0 : -1}
    >
      <div className={context.classes.e('tab-inner')}>
        {icon ? (
          <span className={context.classes.e('icon')} style={{ fontSize: iconSize }}>
            {icon}
          </span>
        ) : null}
        {content ?? <span className={context.classes.e('tab-text')}>{label}</span>}
        {closable ? (
          <button
            aria-label={`Close ${typeof label === 'string' || typeof label === 'number' ? label : 'tab'}`}
            className={cls(context.classes.e('icon'), context.classes.e('close'))}
            onClick={close}
            type="button"
          >
            ×
          </button>
        ) : null}
      </div>
    </div>
  );
}
