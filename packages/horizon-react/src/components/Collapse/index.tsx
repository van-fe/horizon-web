import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  AdaptComponentApiShape,
  CollapseCommandMap,
  CollapseCommonProps,
  CollapseEventMap,
  CollapseItemCommonProps,
  CollapseKey,
  CollapseValue,
  ComponentEventHandlers,
} from '@aurora/core';
import {
  COLLAPSE_DEFAULTS,
  COLLAPSE_ITEM_DEFAULTS,
  isCollapseItemActive,
  normalizeCollapseValue,
  resolveCollapseInitialValue,
  toggleCollapseValue,
} from '@aurora/core';
import { focusCollapseHeader } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type {
  CollapseDirective,
  CollapseIconPosition,
  CollapseKey,
  CollapseSize,
  CollapseValue,
} from '@aurora/core';

type CollapseReactEventMap = AdaptComponentApiShape<CollapseEventMap, { change: 'onChange' }>;
type CollapseReactCallbacks = ComponentEventHandlers<CollapseReactEventMap>;

export type CollapseProps = CollapseCommonProps &
  CollapseReactCallbacks &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onChange'> & {
    /** 面板条目。 @en Composed collapse items. */
    children?: ReactNode;
  };

export type CollapseItemProps = CollapseItemCommonProps<ReactNode, ReactNode> &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title'> & {
    /** 面板正文。 @en Panel body. */
    children?: ReactNode;
  };

export interface CollapseHandle extends CollapseCommandMap {
  /** 折叠面板根元素。 @en Collapse root element. */
  readonly root: HTMLDivElement | null;
}

interface CollapseContextValue {
  accordion: boolean;
  activeValue: CollapseValue;
  toggle: (key: CollapseKey) => void;
}

const CollapseContext = createContext<CollapseContextValue | null>(null);

function getDirectItems(children: ReactNode): Array<Pick<CollapseItemProps, 'name' | 'disabled'>> {
  return Children.toArray(children).flatMap(child =>
    isValidElement<CollapseItemProps>(child) && child.type === CollapseItem
      ? [{ name: child.props.name, disabled: child.props.disabled }]
      : [],
  );
}

function containsNestedCollapse(children: ReactNode): boolean {
  return Children.toArray(children).some(child => isValidElement(child) && child.type === Collapse);
}

export const Collapse = forwardRef<CollapseHandle, CollapseProps>(function Collapse(
  {
    value,
    defaultValue = COLLAPSE_DEFAULTS.defaultValue,
    accordion = COLLAPSE_DEFAULTS.accordion,
    border = COLLAPSE_DEFAULTS.border,
    filled = COLLAPSE_DEFAULTS.filled,
    expandIconPosition = COLLAPSE_DEFAULTS.expandIconPosition,
    size = COLLAPSE_DEFAULTS.size,
    expandAll = COLLAPSE_DEFAULTS.expandAll,
    children,
    onChange,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('collapse', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<CollapseValue>(() =>
    resolveCollapseInitialValue(defaultValue, getDirectItems(children), accordion, expandAll),
  );
  const activeValue = normalizeCollapseValue(value ?? uncontrolledValue, accordion);

  useImperativeHandle(
    ref,
    () => ({
      focus: key => void focusCollapseHeader(rootRef.current, key),
      get root() {
        return rootRef.current;
      },
    }),
    [],
  );

  function toggle(key: CollapseKey): void {
    const nextValue = toggleCollapseValue(activeValue, key, accordion);
    if (value === undefined) setUncontrolledValue(nextValue);
    onChange?.(nextValue);
  }

  return (
    <CollapseContext.Provider value={{ accordion, activeValue, toggle }}>
      <div
        {...nativeProps}
        className={cls(
          classes.block,
          classes.m('filled', filled),
          classes.m('border', border),
          classes.m(expandIconPosition),
          classes.m(size),
          className,
        )}
        ref={rootRef}
      >
        {children}
      </div>
    </CollapseContext.Provider>
  );
});

export function CollapseItem({
  name,
  title,
  disabled = COLLAPSE_ITEM_DEFAULTS.disabled,
  expandIcon,
  color,
  background,
  directive = COLLAPSE_ITEM_DEFAULTS.directive,
  children,
  className,
  style,
  ...nativeProps
}: CollapseItemProps): ReactElement {
  const context = useContext(CollapseContext);
  if (!context) throw new Error('CollapseItem must be rendered inside Collapse.');

  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('collapse-item', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const reactId = useId();
  const headerId = `${config.namespace.toLowerCase()}-collapse-header-${reactId}`;
  const panelId = `${config.namespace.toLowerCase()}-collapse-panel-${reactId}`;
  const active = isCollapseItemActive(context.activeValue, name, context.accordion);
  const nested = containsNestedCollapse(children);
  const body = (
    <div
      aria-labelledby={headerId}
      className={classes.e('body')}
      hidden={directive === 'show' && !active}
      id={panelId}
      role="region"
    >
      <div className={cls(classes.e('content'), classes.em('content', 'nest', nested))}>
        {children}
      </div>
    </div>
  );

  return (
    <div
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m('expand', active),
        classes.m('nest', nested),
        classes.m('disabled', disabled),
        className,
      )}
      data-collapse-key={name}
      style={{ ...style, borderBottomColor: color }}
    >
      <button
        aria-controls={panelId}
        aria-expanded={active}
        className={classes.e('header')}
        disabled={disabled}
        id={headerId}
        onClick={() => context.toggle(name)}
        style={{ backgroundColor: background }}
        type="button"
      >
        <span className={classes.e('header-title')}>{title}</span>
        <span
          aria-hidden="true"
          className={cls(classes.e('icon'), classes.em('icon', 'expand', active))}
        >
          {expandIcon ?? '⌄'}
        </span>
      </button>
      {directive === 'show' ? body : active ? body : null}
    </div>
  );
}
