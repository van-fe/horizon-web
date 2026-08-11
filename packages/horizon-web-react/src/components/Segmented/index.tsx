import type {
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  SegmentedCommandMap,
  SegmentedCommonProps,
  SegmentedEventMap,
  SegmentedItemCommonProps,
  SegmentedItemEventMap,
  SegmentedItemRegionContext,
} from '@aurora/core';
import {
  nextSegmentedIndex,
  resolveSegmentedValue,
  SEGMENTED_DEFAULTS,
  SEGMENTED_ITEM_DEFAULTS,
} from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactEventHandler } from '../_shared/api';

export type SegmentedHandle = SegmentedCommandMap;

interface SegmentedContextValue {
  classes: ComponentClassBlock;
  selectedValue: SegmentedItemCommonProps['value'] | undefined;
  select: (value: SegmentedItemCommonProps['value']) => void;
}

const SegmentedContext = createContext<SegmentedContextValue | undefined>(undefined);

export interface SegmentedProps
  extends SegmentedCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** 分段选项。@en Segmented items. */
  children?: ReactNode;
  /** 选中值变化回调。@en Called when the selected value changes. */
  onChange?: ReactEventHandler<SegmentedEventMap, 'change'>;
}

export interface SegmentedItemProps
  extends
    SegmentedItemCommonProps,
    Omit<HTMLAttributes<HTMLButtonElement>, 'children' | 'onClick' | 'value'> {
  /** 选项内容或内容渲染器。@en Item content or renderer. */
  children?: ReactNode | ((context: SegmentedItemRegionContext) => ReactNode);
  /** 自定义图标。@en Custom item icon. */
  icon?: ReactNode;
  /** 点击回调。@en Called when the item is clicked. */
  onClick?: ReactEventHandler<SegmentedItemEventMap, 'click'>;
}

function focusableTabs(root: RefObject<HTMLDivElement | null>): HTMLElement[] {
  return Array.from(root.current?.querySelectorAll<HTMLElement>('[role="tab"]') ?? []).filter(
    item => item.getAttribute('aria-disabled') !== 'true',
  );
}

export const Segmented = forwardRef<SegmentedHandle, SegmentedProps>(function Segmented(
  {
    value,
    defaultValue,
    size = SEGMENTED_DEFAULTS.size,
    scrollable = SEGMENTED_DEFAULTS.scrollable,
    focusable = SEGMENTED_DEFAULTS.focusable,
    arrow = SEGMENTED_DEFAULTS.arrow,
    block = SEGMENTED_DEFAULTS.block,
    children,
    onChange,
    className,
    onKeyDown,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('segmented', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>();
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    resolveSegmentedValue(undefined, defaultValue),
  );
  const selectedValue = resolveSegmentedValue(value, uncontrolledValue);

  function focusSelected(): void {
    const tabs = focusableTabs(rootRef);
    (tabs.find(tab => tab.getAttribute('aria-selected') === 'true') ?? tabs[0])?.focus();
  }

  useImperativeHandle(ref, () => ({ focus: focusSelected }));

  useEffect(() => {
    if (!focusable) return;
    rootRef.current
      ?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [focusable, selectedValue]);

  useEffect(() => {
    const syncIndicator = (): void => {
      const selected = rootRef.current?.querySelector<HTMLElement>(
        '[role="tab"][aria-selected="true"]',
      );
      setIndicatorStyle(
        selected
          ? { transform: `translateX(${selected.offsetLeft}px)`, width: selected.offsetWidth }
          : undefined,
      );
    };
    syncIndicator();
    if (typeof ResizeObserver === 'undefined' || !rootRef.current) return;
    const observer = new ResizeObserver(syncIndicator);
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [children, selectedValue, size]);

  function select(nextValue: SegmentedItemCommonProps['value']): void {
    if (nextValue === selectedValue) return;
    if (value === undefined) setUncontrolledValue(nextValue);
    onChange?.(nextValue);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const tabs = focusableTabs(rootRef);
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');
    const currentIndex = tabs.indexOf(target ?? (document.activeElement as HTMLElement));
    const nextIndex = nextSegmentedIndex(currentIndex, tabs.length, event.key);
    if (nextIndex === undefined) return;
    event.preventDefault();
    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  }

  const context = { classes, selectedValue, select };

  return (
    <SegmentedContext.Provider value={context}>
      <div
        {...nativeProps}
        aria-orientation="horizontal"
        className={cls(classes.block, classes.m(size), classes.m('block', block), className)}
        onFocus={event => {
          if (event.target === event.currentTarget) focusSelected();
        }}
        onKeyDown={handleKeyDown}
        ref={rootRef}
        role="tablist"
        tabIndex={selectedValue === undefined ? 0 : undefined}
      >
        <div className={classes.e('nav')}>
          <div
            className={cls(classes.e('nav-wrap'), classes.is('scrollable', scrollable))}
            ref={wrapperRef}
          >
            <div className={classes.e('nav-list')}>
              {children}
              <div aria-hidden="true" className={classes.e('indicator')} style={indicatorStyle} />
            </div>
          </div>
          {arrow && scrollable ? (
            <div className={classes.e('extra-outer')}>
              <div className={classes.e('arrow')}>
                <button
                  aria-label="Scroll backward"
                  className={classes.e('icon-outer')}
                  onClick={() => wrapperRef.current?.scrollBy({ behavior: 'smooth', left: -160 })}
                  onKeyDown={event => event.stopPropagation()}
                  type="button"
                >
                  ‹
                </button>
                <button
                  aria-label="Scroll forward"
                  className={classes.e('icon-outer')}
                  onClick={() => wrapperRef.current?.scrollBy({ behavior: 'smooth', left: 160 })}
                  onKeyDown={event => event.stopPropagation()}
                  type="button"
                >
                  ›
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </SegmentedContext.Provider>
  );
});

export const SegmentedItem = forwardRef<HTMLButtonElement, SegmentedItemProps>(
  function SegmentedItem(
    {
      value,
      label,
      disabled = SEGMENTED_ITEM_DEFAULTS.disabled,
      children,
      icon,
      onClick,
      className,
      ...nativeProps
    },
    ref,
  ): ReactElement {
    const context = useContext(SegmentedContext);
    if (!context) throw new Error('SegmentedItem must be rendered inside Segmented.');
    const selected = context.selectedValue === value;
    const region = { selected, value } satisfies SegmentedItemRegionContext;
    return (
      <button
        {...nativeProps}
        aria-disabled={disabled}
        aria-selected={selected}
        className={cls(
          context.classes.e('item'),
          context.classes.em('item', 'active', selected),
          context.classes.em('item', 'disabled', disabled),
          className,
        )}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          onClick?.(value);
          context.select(value);
        }}
        ref={ref}
        role="tab"
        tabIndex={disabled ? -1 : selected ? 0 : -1}
        type="button"
      >
        <span className={context.classes.e('item-inner')}>
          {icon ? <span className={context.classes.e('icon')}>{icon}</span> : null}
          {typeof children === 'function' ? children(region) : (children ?? label)}
        </span>
      </button>
    );
  },
);

export const HSegmented = Segmented;
export const HSegmentedItem = SegmentedItem;
export type { SegmentedSize, SegmentedValue } from '@aurora/core';
