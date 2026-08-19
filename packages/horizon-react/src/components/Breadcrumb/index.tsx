import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  AdaptComponentApiShape,
  BreadcrumbCommonProps,
  BreadcrumbEventMap,
  BreadcrumbItemCommonProps,
  BreadcrumbItemEventMap,
  BreadcrumbSize,
  ComponentEventHandlers,
} from '@aurora/core';
import {
  BREADCRUMB_DEFAULTS,
  BREADCRUMB_ITEM_DEFAULTS,
  calculateBreadcrumbCollapseCount,
  isBreadcrumbItemClickable,
  resolveBreadcrumbNavigation,
} from '@aurora/core';
import { measureBreadcrumbLayout } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Tooltip } from '../Tooltip';

export type { BreadcrumbDisplayType, BreadcrumbSize } from '@aurora/core';

export type BreadcrumbItemData<Route = unknown> = AdaptComponentApiShape<
  BreadcrumbItemCommonProps<Route>,
  { route: 'to' },
  'separator',
  { separator?: ReactNode }
>;

type BreadcrumbReactEventMap = AdaptComponentApiShape<
  BreadcrumbEventMap<BreadcrumbItemData, MouseEvent<HTMLElement>>,
  { itemClick: 'onItemClick' }
>;

type BreadcrumbReactCallbacks = ComponentEventHandlers<BreadcrumbReactEventMap>;

type BreadcrumbItemReactEventMap = AdaptComponentApiShape<
  BreadcrumbItemEventMap<MouseEvent<HTMLElement>>,
  { click: 'onClick' }
>;

type BreadcrumbItemReactCallbacks = ComponentEventHandlers<BreadcrumbItemReactEventMap>;

export type BreadcrumbProps = Omit<BreadcrumbCommonProps, 'items' | 'separator'> &
  BreadcrumbReactCallbacks &
  Omit<HTMLAttributes<HTMLElement>, 'children' | 'onClick' | 'title'> & {
    /** 数据驱动的层级条目。@en Data-driven hierarchy items. */
    items?: readonly BreadcrumbItemData[];
    /** 默认分隔内容。@en Default separator content. */
    separator?: ReactNode;
    /** 组合的层级条目。@en Composed hierarchy items. */
    children?: ReactNode;
  };

export type BreadcrumbItemProps = BreadcrumbItemData &
  BreadcrumbItemReactCallbacks & {
    /** 条目内容。@en Item content. */
    children?: ReactNode;
    /** 根元素类名。@en Class name applied to the item root. */
    className?: string;
    /** 根元素样式。@en Style applied to the item root. */
    style?: CSSProperties;
  };

interface BreadcrumbItemInternalProps extends BreadcrumbItemProps {
  sourceItem?: BreadcrumbItemData;
}

interface BreadcrumbContextValue {
  separator: ReactNode;
  title: boolean;
  size: BreadcrumbSize;
  onItemClick?: (item: BreadcrumbItemData, event: MouseEvent<HTMLElement>) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);
const BREADCRUMB_REACT_DEFAULT_ITEMS = BREADCRUMB_DEFAULTS.items as readonly BreadcrumbItemData[];

function getSemanticItem(props: BreadcrumbItemProps): BreadcrumbItemCommonProps {
  return {
    text: typeof props.children === 'string' ? props.children : undefined,
    title: props.title,
    route: props.to,
    replace: props.replace,
    size: props.size,
    clickable: props.clickable,
  };
}

const BreadcrumbItemImpl = forwardRef<HTMLSpanElement, BreadcrumbItemInternalProps>(
  function BreadcrumbItem(
    {
      text,
      separator,
      title,
      to,
      replace = BREADCRUMB_ITEM_DEFAULTS.replace,
      size,
      clickable = BREADCRUMB_ITEM_DEFAULTS.clickable,
      children,
      onClick,
      className,
      style,
      sourceItem,
    },
    ref,
  ): ReactElement {
    const config = useHorizonWebConfig();
    const parent = useContext(BreadcrumbContext);
    const classes = useMemo(
      () => new ComponentClassBlock('breadcrumb-item', config.namespace.toLowerCase()),
      [config.namespace],
    );
    const currentSize = size ?? parent?.size ?? BREADCRUMB_ITEM_DEFAULTS.size;
    const currentTitle = title ?? parent?.title ?? BREADCRUMB_ITEM_DEFAULTS.title;
    const content = children ?? text ?? '';
    const item = useMemo<BreadcrumbItemData>(
      () => ({ text, separator, title, to, replace, size, clickable }),
      [clickable, replace, separator, size, text, title, to],
    );
    const interactive = isBreadcrumbItemClickable(getSemanticItem({ ...item, children: content }));
    const routeHref = to === undefined ? undefined : config.resolveHref?.(to);
    const textClassName = cls(
      classes.e('text'),
      classes.e('link', interactive),
      classes.m(currentSize),
      classes.e('title', currentTitle),
    );

    function handleClick(event: MouseEvent<HTMLElement>): void {
      if (!interactive) return;
      onClick?.(event);
      parent?.onItemClick?.(sourceItem ?? item, event);
      if (event.defaultPrevented) return;

      const action = resolveBreadcrumbNavigation(
        { route: to, replace, clickable },
        Boolean(config.navigate),
      );
      if (action === 'push' || action === 'replace') {
        event.preventDefault();
        void config.navigate?.(to, { replace: action === 'replace' });
      } else if (to !== undefined && routeHref === undefined) {
        event.preventDefault();
        console.warn('BreadcrumbItem requires a navigation adapter for the `to` prop.');
      }
    }

    const trigger =
      to !== undefined ? (
        <a className={textClassName} href={routeHref} onClick={handleClick}>
          {content}
        </a>
      ) : interactive ? (
        <button className={textClassName} onClick={handleClick} type="button">
          {content}
        </button>
      ) : (
        <span className={textClassName}>{content}</span>
      );

    return (
      <span
        className={cls(classes.block, className)}
        data-breadcrumb-item=""
        ref={ref}
        style={style}
      >
        <Tooltip content={content}>{trigger}</Tooltip>
        <span aria-hidden="true" className={classes.e('suffix')}>
          {separator ?? parent?.separator}
        </span>
      </span>
    );
  },
);

export const BreadcrumbItem = BreadcrumbItemImpl as ForwardRefExoticComponent<
  BreadcrumbItemProps & RefAttributes<HTMLSpanElement>
>;

function normalizeChildren(children: ReactNode): ReactElement<BreadcrumbItemProps>[] {
  return Children.toArray(children).map((child, index) => {
    if (isValidElement<BreadcrumbItemProps>(child) && child.type === BreadcrumbItem) return child;
    return <BreadcrumbItem key={`breadcrumb-child-${index}`}>{child}</BreadcrumbItem>;
  });
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  {
    separator = BREADCRUMB_DEFAULTS.separator,
    title = BREADCRUMB_DEFAULTS.title,
    items = BREADCRUMB_REACT_DEFAULT_ITEMS,
    size = BREADCRUMB_DEFAULTS.size,
    displayType = BREADCRUMB_DEFAULTS.displayType,
    children,
    onItemClick,
    className,
    'aria-label': ariaLabel = 'Breadcrumb',
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('breadcrumb', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLElement | null>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const measuredWidthRef = useRef<number | undefined>(undefined);
  const collapseCountRef = useRef(0);
  const [collapseCount, setCollapseCount] = useState(0);
  collapseCountRef.current = collapseCount;

  const renderedItems = useMemo(
    () =>
      children !== undefined
        ? normalizeChildren(children)
        : items.map((item, index) => (
            <BreadcrumbItemImpl
              key={`${String(item.to ?? item.text ?? 'item')}-${index}`}
              {...item}
              sourceItem={item}
            />
          )),
    [children, items],
  );
  const measurementInputs = useMemo(
    () => ({ renderedItems, separator, size, title }),
    [renderedItems, separator, size, title],
  );
  const measuredInputsRef = useRef(measurementInputs);

  const contextValue = useMemo<BreadcrumbContextValue>(
    () => ({
      separator,
      title,
      size,
      onItemClick: (item, event) => {
        detailsRef.current?.removeAttribute('open');
        onItemClick?.(item, event);
      },
    }),
    [onItemClick, separator, size, title],
  );

  function assignRoot(node: HTMLElement | null): void {
    rootRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }

  function measureExpanded(): void {
    const root = rootRef.current;
    if (!root || displayType !== 'ellipsis' || renderedItems.length <= 2) return;
    measuredWidthRef.current = root.clientWidth;
    const nextCount = calculateBreadcrumbCollapseCount(measureBreadcrumbLayout(root));
    setCollapseCount(current => (current === nextCount ? current : nextCount));
  }

  useLayoutEffect(() => {
    if (displayType !== 'ellipsis' || renderedItems.length <= 2) {
      if (collapseCountRef.current !== 0) setCollapseCount(0);
      return;
    }
    if (measuredInputsRef.current !== measurementInputs) {
      measuredInputsRef.current = measurementInputs;
      if (collapseCount > 0) {
        setCollapseCount(0);
        return;
      }
    }
    const currentWidth = rootRef.current?.clientWidth;
    if (
      collapseCount > 0 &&
      currentWidth !== undefined &&
      measuredWidthRef.current !== undefined &&
      currentWidth !== measuredWidthRef.current
    ) {
      setCollapseCount(0);
      return;
    }
    if (collapseCount === 0) measureExpanded();
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root || displayType !== 'ellipsis' || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => {
      if (collapseCountRef.current === 0) measureExpanded();
      else setCollapseCount(0);
    });
    observer.observe(root);
    if (root.parentElement) observer.observe(root.parentElement);
    return () => observer.disconnect();
  }, [displayType, renderedItems]);

  const leadingItem = renderedItems[0];
  const trailingItems = renderedItems.slice(collapseCount + 1);
  const collapsedItems = renderedItems.slice(1, collapseCount + 1);

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <nav
        {...nativeProps}
        aria-label={ariaLabel}
        className={cls(classes.block, classes.m(size), classes.is(displayType), className)}
        ref={assignRoot}
      >
        {leadingItem}
        {collapseCount > 0 && (
          <BreadcrumbItem>
            <details className={classes.e('ellipsis-details')} ref={detailsRef}>
              <summary
                aria-label={config.breadcrumbLabels.collapsed}
                className={classes.e('ellipsis')}
              >
                …
              </summary>
              <div className={classes.e('ellipsis-menu')} data-breadcrumb-menu="">
                {collapsedItems.map(item =>
                  cloneElement(item, {
                    className: cls(item.props.className, classes.e('ellipsis-menu-entry')),
                    separator: null,
                  }),
                )}
              </div>
            </details>
          </BreadcrumbItem>
        )}
        {collapseCount === 0 ? renderedItems.slice(1) : trailingItems}
        {displayType === 'ellipsis' && renderedItems.length > 2 && (
          <div
            aria-hidden="true"
            className={classes.e('ellipsis-measure')}
            data-breadcrumb-ellipsis-measure=""
          >
            <BreadcrumbItem>
              <span className={classes.e('ellipsis-measure-glyph')}>…</span>
            </BreadcrumbItem>
          </div>
        )}
      </nav>
    </BreadcrumbContext.Provider>
  );
});
