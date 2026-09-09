import type {
  CSSProperties,
  DependencyList,
  EffectCallback,
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
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  TagCommandMap,
  TagCommonProps,
  TagGroupCommandMap,
  TagGroupCommonProps,
  TagId,
  TagMutationController,
} from '@aurora/core';
import {
  canActivateTag,
  createTagMutationController,
  TAG_DEFAULTS,
  TAG_GROUP_DEFAULTS,
  toggleTagActive,
} from '@aurora/core';
import type {
  TagCollapseController,
  TagCloseVisibilityController,
  TagPressTracker,
} from '@aurora/horizon-core';
import {
  createTagCollapseController,
  createTagCloseVisibilityController,
  createTagPressTracker,
  observeTagResize,
} from '@aurora/horizon-core';
import { cls, ComponentClassBlock, createTagColorStyle } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Avatar } from '../Avatar';
import { Tooltip, type TooltipProps } from '../Tooltip';

export type { TagId, TagSize, TagTooltipRenderType, TagVariant } from '@aurora/core';

export interface TagHandle extends TagCommandMap {
  readonly element: HTMLSpanElement | null;
}

export interface TagProps
  extends
    Omit<TagCommonProps, 'pure' | 'tooltip'>,
    Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color' | 'id' | 'onClick'> {
  /** 标签内容。 @en Tag content. */
  children?: ReactNode;
  /** 图标内容。 @en Icon content. */
  icon?: ReactNode;
  /** 头像内容。 @en Avatar content. */
  avatarContent?: ReactNode;
  /** Tooltip 内容。 @en Tooltip content. */
  tooltipContent?: ReactNode;
  /** Tooltip 文字或启用状态。 @en Tooltip text or enablement. */
  tooltip?: string | boolean;
  /** Tooltip 原生参数。 @en Native React Tooltip options. */
  tooltipOptions?: Omit<
    TooltipProps,
    'children' | 'content' | 'disabled' | 'hideAfter' | 'showAfter'
  >;
  /** 只渲染 children。 @en Renders only children. */
  pure?: boolean;
  /** 激活状态提案。 @en Called with a proposed active state. */
  onActiveChange?: (active: boolean) => void;
  /** 标签操作。 @en Tag action. */
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  /** 关闭操作。 @en Close action. */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** @internal */
  __create?: boolean;
}

interface TagGroupContextValue {
  size?: TagCommonProps['size'];
  editable?: boolean;
  disabled?: boolean;
  pending: boolean;
  calculate(): void;
  edit(content: string, oldValue: string, id: TagId | undefined, create: boolean): Promise<boolean>;
  close(id?: TagId): Promise<boolean>;
}

const TagGroupContext = createContext<TagGroupContextValue | undefined>(undefined);

function getReactText(node: ReactNode): string {
  return Children.toArray(node)
    .map(child => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      if (isValidElement<{ children?: ReactNode }>(child))
        return getReactText(child.props.children);
      return '';
    })
    .join('');
}

function useIsomorphicLayoutEffect(effect: EffectCallback, dependencies: DependencyList) {
  // React does not run effects during SSR; useEffect avoids the server layout-effect warning.
  const useEffectHook = typeof document === 'undefined' ? useEffect : useLayoutEffect;
  useEffectHook(effect, dependencies);
}

export const Tag = forwardRef<TagHandle, TagProps>(function Tag(
  {
    id,
    active,
    variant = TAG_DEFAULTS.variant,
    size,
    bold = TAG_DEFAULTS.bold,
    clickable = TAG_DEFAULTS.clickable,
    closable = TAG_DEFAULTS.closable,
    editable = TAG_DEFAULTS.editable,
    disabled = TAG_DEFAULTS.disabled,
    plain = TAG_DEFAULTS.plain,
    round = TAG_DEFAULTS.round,
    avatar,
    equally = TAG_DEFAULTS.equally,
    showCloseDelay = TAG_DEFAULTS.showCloseDelay,
    color,
    background,
    loading = TAG_DEFAULTS.loading,
    tooltip,
    tooltipShowAfter = TAG_DEFAULTS.tooltipShowAfter,
    tooltipHideAfter = TAG_DEFAULTS.tooltipHideAfter,
    disableTransitions = TAG_DEFAULTS.disableTransitions,
    pure = TAG_DEFAULTS.pure,
    icon,
    avatarContent,
    tooltipContent,
    tooltipOptions,
    onActiveChange,
    onClick,
    onClose,
    onDoubleClick,
    onKeyDown,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    children,
    className,
    style,
    __create = false,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const group = useContext(TagGroupContext);
  const classes = useMemo(
    () => new ComponentClassBlock('tag', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pressTrackerRef = useRef<TagPressTracker | undefined>(undefined);
  const closeVisibilityRef = useRef<TagCloseVisibilityController | undefined>(undefined);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [showEqualClose, setShowEqualClose] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const previousValue = useRef('');
  const mountedRef = useRef(false);
  const effectiveSize = size ?? group?.size ?? TAG_DEFAULTS.size;
  const effectiveDisabled = group?.disabled ?? disabled;
  const effectiveEditable = group?.editable ?? editable;
  const interactive = canActivateTag({ active, clickable, disabled: effectiveDisabled });
  const activated = typeof active === 'boolean' && active;
  const showClose = closable && !effectiveDisabled && (!equally || showEqualClose);

  useImperativeHandle(
    forwardedRef,
    () => ({
      get element() {
        return rootRef.current;
      },
      edit(content) {
        const value = content ?? contentRef.current?.innerText ?? '';
        previousValue.current = value;
        setInputValue(value);
        setEditing(true);
      },
    }),
    [],
  );

  useIsomorphicLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!editing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editing]);

  useEffect(() => {
    closeVisibilityRef.current = createTagCloseVisibilityController({
      getDelay: () => showCloseDelay,
      onVisibleChange: setShowEqualClose,
      ownerWindow: rootRef.current?.ownerDocument.defaultView ?? undefined,
    });
    return () => {
      closeVisibilityRef.current?.destroy();
      closeVisibilityRef.current = undefined;
    };
  }, [showCloseDelay]);

  useEffect(() => {
    if (!contentRef.current || !group) return;
    return observeTagResize(contentRef.current, group.calculate).destroy;
  }, [group]);

  useEffect(
    () => () => {
      pressTrackerRef.current?.destroy();
    },
    [],
  );

  function startEdit(content?: string): void {
    if (effectiveDisabled || waiting || !effectiveEditable) return;
    const value = content ?? contentRef.current?.innerText ?? '';
    previousValue.current = value;
    setInputValue(value);
    setEditing(true);
  }

  async function commitEdit(): Promise<void> {
    if (waiting) return;
    setEditing(false);
    const nextValue = inputValue.trim();
    const oldValue = previousValue.current.trim();
    if (!nextValue || nextValue === oldValue || !group) return;
    setWaiting(true);
    await group.edit(nextValue, oldValue, id, __create);
    if (mountedRef.current) setWaiting(false);
  }

  function handleClick(event: MouseEvent<HTMLSpanElement>): void {
    closeVisibilityRef.current?.cancelPending();
    if (effectiveDisabled || !interactive) return;
    onClick?.(event);
    const nextActive = toggleTagActive(active);
    if (nextActive !== undefined) onActiveChange?.(nextActive);
  }

  async function handleClose(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    if (effectiveDisabled || waiting) return;
    if (group) {
      setWaiting(true);
      const accepted = await group.close(id);
      if (mountedRef.current) setWaiting(false);
      if (!accepted) return;
    }
    onClose?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>): void {
    onKeyDown?.(event);
    if (event.defaultPrevented || !interactive || (event.key !== 'Enter' && event.key !== ' '))
      return;
    event.preventDefault();
    rootRef.current?.click();
  }

  if (pure) return <>{children}</>;

  const colorStyle = createTagColorStyle({
    color,
    background,
    plain: plain || editing,
    disabled: effectiveDisabled,
    active: activated,
    hovered,
    pressed,
    clickable: interactive,
  });
  const root = (
    <span
      {...nativeProps}
      aria-busy={loading || waiting || undefined}
      aria-checked={typeof active === 'boolean' ? active : undefined}
      aria-disabled={effectiveDisabled || undefined}
      className={cls(
        classes.block,
        classes.m(variant || 'default', !color),
        classes.m(effectiveSize),
        classes.m('bold', bold),
        classes.m('round', round),
        classes.m('equally', equally),
        classes.is('active', activated),
        classes.is('loading', loading || waiting),
        classes.is('plain', plain || editing),
        classes.is('disabled', effectiveDisabled),
        classes.is('closable', closable),
        classes.is('clickable', interactive),
        classes.is('disable-transitions', disableTransitions),
        classes.is('show-close', showClose),
        classes.is('colorful', Boolean(color)),
        classes.is('colored', Boolean(color || variant)),
        classes.is('auto-fit-color', Boolean(color || clickable)),
        classes.is('editing', editing),
        className,
      )}
      onClick={handleClick}
      onDoubleClick={event => {
        onDoubleClick?.(event);
        if (!event.defaultPrevented) startEdit();
      }}
      onKeyDown={handleKeyDown}
      onMouseDown={event => {
        onMouseDown?.(event);
        if (event.defaultPrevented || effectiveDisabled || !rootRef.current) return;
        pressTrackerRef.current?.destroy();
        pressTrackerRef.current = createTagPressTracker(rootRef.current, setPressed);
      }}
      onMouseEnter={event => {
        onMouseEnter?.(event);
        setHovered(true);
        closeVisibilityRef.current?.enter(equally, clickable);
        if (contentRef.current) {
          setOverflowing(contentRef.current.scrollWidth > contentRef.current.clientWidth);
        }
      }}
      onMouseLeave={event => {
        onMouseLeave?.(event);
        setHovered(false);
        closeVisibilityRef.current?.leave();
      }}
      ref={rootRef}
      role={typeof active === 'boolean' ? 'checkbox' : interactive ? 'button' : undefined}
      style={{ ...colorStyle, ...style } as CSSProperties}
      tabIndex={
        interactive && !effectiveDisabled ? (nativeProps.tabIndex ?? 0) : nativeProps.tabIndex
      }
    >
      <span className={classes.e('inner')}>
        {editing ? (
          <span className={classes.e('input-wrapper')}>
            <span aria-hidden className={classes.e('input-opacity-content')}>
              {inputValue || ' '}
            </span>
            <input
              aria-label={config.tagLabels.create}
              className={classes.e('input')}
              onBlur={() => void commitEdit()}
              onChange={event => setInputValue(event.target.value)}
              onKeyUp={event => {
                if (event.key === 'Enter') event.currentTarget.blur();
                if (event.key === 'Escape') {
                  setEditing(false);
                  setInputValue(previousValue.current);
                }
              }}
              ref={inputRef}
              value={inputValue}
            />
          </span>
        ) : waiting ? (
          <span className={classes.e('content')}>{inputValue || children}</span>
        ) : (
          <>
            {(avatar || avatarContent) && (
              <span className={classes.e('avatar')}>
                {avatarContent ?? (
                  <Avatar
                    alt=""
                    size={effectiveSize === 'large' ? 24 : effectiveSize === 'small' ? 14 : 16}
                    src={avatar}
                  />
                )}
              </span>
            )}
            {icon && <span className={classes.e('icon')}>{icon}</span>}
            {children != null && (
              <span className={classes.e('content')} ref={contentRef}>
                {children}
              </span>
            )}
            {showClose && (
              <button
                aria-label={config.tagLabels.close}
                className={cls(classes.e('icon'), classes.e('close'))}
                onClick={event => void handleClose(event)}
                type="button"
              >
                ×
              </button>
            )}
          </>
        )}
        {(loading || waiting) && (
          <span aria-hidden className={classes.e('loading')}>
            ↻
          </span>
        )}
      </span>
    </span>
  );
  const tooltipDisabled = tooltip === false || (tooltipContent == null && !tooltip && !overflowing);
  return (
    <Tooltip
      {...tooltipOptions}
      content={tooltipContent ?? (typeof tooltip === 'string' ? tooltip : children)}
      disabled={tooltipDisabled}
      enterable
      hideAfter={tooltipHideAfter}
      showAfter={tooltipShowAfter}
    >
      {root}
    </Tooltip>
  );
});

export interface TagGroupHandle extends TagGroupCommandMap {
  readonly element: HTMLDivElement | null;
}

export interface TagGroupProps
  extends
    TagGroupCommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onToggle' | 'prefix'> {
  /** 标签列表。 @en Tag list. */
  children?: ReactNode;
  /** 折叠摘要 Tag 参数。 @en Collapsed-summary Tag props. */
  collapseTagProps?: Partial<TagProps>;
  /** 创建操作 Tag 参数。 @en Create-action Tag props. */
  createTagProps?: Partial<TagProps>;
  /** 创建文字 renderer。 @en Create-label renderer. */
  renderCreateText?: (tags: readonly TagCommonProps[]) => ReactNode;
  /** 创建操作 renderer。 @en Create-action renderer. */
  renderCreate?: (tags: readonly TagCommonProps[]) => ReactNode;
  /** 组前内容。 @en Content before the group. */
  prepend?: ReactNode;
  /** 组后内容。 @en Content after the group. */
  append?: ReactNode;
  /** 容器前置内容。 @en Leading container content. */
  prefix?: ReactNode;
  /** 容器后置内容。 @en Trailing container content. */
  suffix?: ReactNode;
  /** 浮层内部 class。 @en Floating content class name. */
  popperInnerClass?: string;
  /** 创建完成。 @en Called after a tag is created. */
  onCreated?: (content: string) => void;
  /** 编辑完成。 @en Called after a tag is edited. */
  onEdited?: (content: string, oldValue: string, id?: TagId) => void;
  /** 关闭完成。 @en Called after a tag is closed. */
  onClosed?: (id?: TagId) => void;
  /** 展开状态变化。 @en Called when expanded state changes. */
  onToggled?: (expanded: boolean) => void;
  /** 首次检测到溢出。 @en Called when overflow is first detected. */
  onExceeded?: () => void;
}

const CREATE_TAG_ID = Symbol('react-tag-create');

export const TagGroup = forwardRef<TagGroupHandle, TagGroupProps>(function TagGroup(
  {
    size = TAG_GROUP_DEFAULTS.size,
    editable,
    disabled,
    collapse = TAG_GROUP_DEFAULTS.collapse,
    expand = TAG_GROUP_DEFAULTS.expand,
    collapseUseTooltip = TAG_GROUP_DEFAULTS.collapseUseTooltip,
    tooltipRenderType = TAG_GROUP_DEFAULTS.tooltipRenderType,
    separator = TAG_GROUP_DEFAULTS.separator,
    useCreate = TAG_GROUP_DEFAULTS.useCreate,
    beforeCreate,
    beforeEdit,
    beforeClose,
    createText,
    maxTags = TAG_GROUP_DEFAULTS.maxTags,
    disableTransitions = TAG_GROUP_DEFAULTS.disableTransitions,
    fillUp = TAG_GROUP_DEFAULTS.fillUp,
    minDisplayed,
    tooltipShowAfter,
    tooltipHideAfter,
    collapseTagProps,
    createTagProps,
    renderCreateText,
    renderCreate,
    prepend,
    append,
    prefix,
    suffix,
    popperInnerClass,
    onCreated,
    onEdited,
    onClosed,
    onToggled,
    onExceeded,
    children,
    className,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('tag-group', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const createRef = useRef<TagHandle | null>(null);
  const mutationRef = useRef<TagMutationController | undefined>(undefined);
  const collapseRef = useRef<TagCollapseController | undefined>(undefined);
  const callbacksRef = useRef({ onCreated, onEdited, onClosed, onToggled, onExceeded });
  const items = Children.toArray(children);
  const itemCountRef = useRef(items.length);
  const minimumRef = useRef(minDisplayed);
  const visibleRef = useRef(minDisplayed ?? items.length);
  const [visibleCount, setVisibleCount] = useState(minDisplayed ?? items.length);
  const [collapsed, setCollapsed] = useState(collapse);
  const collapsedRef = useRef(collapse);
  const [pending, setPending] = useState(false);
  const [lines, setLines] = useState(1);
  const overflowRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    callbacksRef.current = { onCreated, onEdited, onClosed, onToggled, onExceeded };
    itemCountRef.current = items.length;
    minimumRef.current = minDisplayed;
    visibleRef.current = visibleCount;
    collapsedRef.current = collapsed;
  }, [
    collapsed,
    items.length,
    minDisplayed,
    onClosed,
    onCreated,
    onEdited,
    onExceeded,
    onToggled,
    visibleCount,
  ]);

  useIsomorphicLayoutEffect(() => {
    const controller = createTagMutationController({ beforeCreate, beforeEdit, beforeClose });
    mutationRef.current = controller;
    const unsubscribe = controller.subscribe(() => setPending(controller.getState().pending));
    return () => {
      unsubscribe();
      controller.destroy();
      if (mutationRef.current === controller) mutationRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    mutationRef.current?.update({ beforeCreate, beforeEdit, beforeClose });
  }, [beforeClose, beforeCreate, beforeEdit]);

  useIsomorphicLayoutEffect(() => {
    const controller = createTagCollapseController({
      getContainer: () => containerRef.current,
      getItemCount: () => itemCountRef.current,
      getVisibleCount: () => visibleRef.current,
      setVisibleCount: count => {
        visibleRef.current = count;
        setVisibleCount(count);
      },
      afterRender: () => undefined,
      getMinDisplayed: () => minimumRef.current,
      onLinesChange: setLines,
      onOverflowChange: overflowing => {
        if (overflowing && !overflowRef.current) callbacksRef.current.onExceeded?.();
        overflowRef.current = overflowing;
      },
    });
    collapseRef.current = controller;
    void controller.calculate();
    return () => {
      controller.destroy();
      if (collapseRef.current === controller) collapseRef.current = undefined;
    };
  }, []);

  const calculate = useCallback(() => {
    void collapseRef.current?.calculate();
  }, []);

  useEffect(() => {
    collapsedRef.current = collapse;
    setCollapsed(collapse);
    calculate();
  }, [calculate, collapse, fillUp, items.length, minDisplayed]);

  useEffect(() => {
    if (!containerRef.current) return;
    return observeTagResize(containerRef.current, calculate).destroy;
  }, [calculate]);

  const toggle = useCallback((nextExpanded?: boolean) => {
    const expanded = nextExpanded ?? collapsedRef.current;
    const nextCollapsed = !expanded;
    collapsedRef.current = nextCollapsed;
    setCollapsed(nextCollapsed);
    callbacksRef.current.onToggled?.(expanded);
  }, []);

  useImperativeHandle(
    forwardedRef,
    () => ({
      get element() {
        return rootRef.current;
      },
      toggle,
      calculate: async () => collapseRef.current?.calculate(),
    }),
    [toggle],
  );

  const edit = useCallback(
    async (content: string, oldValue: string, id: TagId | undefined, create: boolean) => {
      const result = create
        ? await mutationRef.current?.create(content)
        : await mutationRef.current?.edit(content, oldValue, id);
      calculate();
      if (result?.status !== 'accepted') return false;
      if (create) callbacksRef.current.onCreated?.(content);
      else callbacksRef.current.onEdited?.(content, oldValue, id);
      return true;
    },
    [calculate],
  );
  const close = useCallback(async (id?: TagId) => {
    const result = await mutationRef.current?.close(id);
    if (result?.status !== 'accepted') return false;
    callbacksRef.current.onClosed?.(id);
    return true;
  }, []);
  const context = useMemo<TagGroupContextValue>(
    () => ({ size, editable, disabled, pending, calculate, edit, close }),
    [calculate, close, disabled, edit, editable, pending, size],
  );
  const visibleItems = collapse && collapsed ? items.slice(0, visibleCount) : items;
  const hiddenItems = items.slice(visibleCount);
  const tagDescriptors = items.flatMap(item =>
    isValidElement<TagProps>(item) ? [item.props as TagCommonProps] : [],
  );
  const hiddenText = hiddenItems
    .map(item =>
      isValidElement<TagProps>(item) ? getReactText(item.props.children) : getReactText(item),
    )
    .filter(Boolean)
    .join(separator);
  const summary = hiddenItems.length ? (
    <Tag
      {...collapseTagProps}
      aria-label={config.tagLabels.expand}
      clickable={collapseUseTooltip || expand}
      disableTransitions={disableTransitions}
      onClick={() => {
        if (expand) toggle(true);
      }}
      tooltipHideAfter={tooltipHideAfter}
      tooltipShowAfter={tooltipShowAfter}
    >
      +{hiddenItems.length}
    </Tag>
  ) : null;
  const summaryWithTooltip =
    summary && collapseUseTooltip ? (
      <Tooltip
        content={
          <span className={cls(classes.e('popper-inner'), popperInnerClass)}>
            {tooltipRenderType === 'full' ? hiddenItems : hiddenText}
          </span>
        }
        hideAfter={tooltipHideAfter}
        showAfter={tooltipShowAfter}
      >
        {summary}
      </Tooltip>
    ) : (
      summary
    );

  return (
    <TagGroupContext.Provider value={context}>
      <div
        {...nativeProps}
        aria-busy={pending || undefined}
        className={cls(
          classes.block,
          classes.m(size),
          classes.m('collapse', minDisplayed === undefined && collapse && collapsed),
          classes.is('fill-up', fillUp),
          classes.is('collapsed', collapsed),
          classes.has('min-displayed', minDisplayed !== undefined),
          className,
        )}
        ref={rootRef}
        role={nativeProps.role ?? 'group'}
      >
        {prepend}
        <div className={classes.e('container')} ref={containerRef}>
          {prefix}
          {visibleItems}
          {summaryWithTooltip}
          {collapse && !collapsed && lines > 1 && (
            <Tag
              {...collapseTagProps}
              aria-label={config.tagLabels.collapse}
              clickable
              equally
              icon="▴"
              onClick={() => toggle(false)}
            />
          )}
          {renderCreate !== undefined
            ? renderCreate(tagDescriptors)
            : useCreate &&
              items.length < maxTags && (
                <Tag
                  {...createTagProps}
                  __create
                  className={cls(classes.e('create-tag', !pending), createTagProps?.className)}
                  clickable
                  editable={editable}
                  icon="＋"
                  id={CREATE_TAG_ID}
                  onClick={() => !pending && createRef.current?.edit('')}
                  plain
                  ref={createRef}
                >
                  {renderCreateText?.(tagDescriptors) ?? createText ?? config.tagLabels.create}
                </Tag>
              )}
          {suffix}
        </div>
        {append}
      </div>
    </TagGroupContext.Provider>
  );
});

export const HTag = Tag;
export const HTagGroup = TagGroup;
