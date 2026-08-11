import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardRefExoticComponent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
  Ref,
  RefAttributes,
} from 'react';
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  FloatButtonCommonProps,
  FloatButtonGroupCommandMap,
  FloatButtonGroupCommonProps,
  FloatButtonGroupExpansionDetails,
  FloatButtonShape,
  FloatButtonVariant,
} from '@aurora/core';
import {
  FLOAT_BUTTON_DEFAULTS,
  FLOAT_BUTTON_GROUP_DEFAULTS,
  FloatButtonGroupController,
  resolveFloatButtonAdsorbedPosition,
  resolveFloatButtonBadgeLayout,
  resolveFloatButtonStackPosition,
} from '@aurora/core';
import type { FloatButtonDragDetails } from '@aurora/horizon-web-core';
import { createFloatButtonDragController } from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Badge, type BadgeProps } from '../Badge';
import { Popover } from '../Popover';
import { Tooltip, type TooltipProps } from '../Tooltip';

export type FloatButtonTooltipOptions = Omit<TooltipProps, 'children'>;
export type FloatButtonBadgeOptions = Partial<BadgeProps>;

type SharedFloatButtonProps = FloatButtonCommonProps<
  ReactNode,
  ReactNode,
  FloatButtonTooltipOptions,
  FloatButtonBadgeOptions
>;
type NativeFloatButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'draggable' | 'onClick' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'shape' | 'type'
>;

export interface FloatButtonProps extends SharedFloatButtonProps, NativeFloatButtonProps {
  /** 图标区域。 @en Icon region. */
  icon?: ReactNode;
  /** 描述区域。 @en Description region. */
  description?: ReactNode;
  /** 无文字内容时的可访问名称。 @en Accessible name when no text content is present. */
  ariaLabel?: string;
  /** 按钮被激活。 @en Called when the action is activated. */
  onClick?: (event: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** 可见状态请求变化。 @en Called when a visibility change is requested. */
  onVisibleChange?: (visible: boolean) => void;
  /** 开始拖拽。 @en Called when dragging starts. */
  onDragStart?: () => void;
  /** 正在拖拽。 @en Called while dragging. */
  onDragging?: () => void;
  /** 结束拖拽。 @en Called when dragging ends. */
  onDragEnd?: () => void;
  /** @internal 折叠组的控制按钮。 @en Collapse control owned by a group. */
  collapseButton?: boolean;
}

interface FloatButtonImplementationProps extends FloatButtonProps {
  actionRef?: Ref<HTMLButtonElement | HTMLAnchorElement>;
}

export interface FloatButtonHandle {
  /** 显示悬浮按钮。 @en Shows the floating button. */
  show(): void;
  /** 隐藏悬浮按钮。 @en Hides the floating button. */
  hide(): void;
  /** 聚焦悬浮按钮。 @en Focuses the floating button. */
  focus(): void;
  /** 当前按钮元素。 @en Current action element. */
  readonly element: HTMLButtonElement | HTMLAnchorElement | null;
}

interface FloatButtonGroupContextValue {
  expanded: boolean;
  shape?: FloatButtonShape;
  useCollapse: boolean;
  variant?: FloatButtonVariant;
  visible: boolean;
}

const FloatButtonGroupContext = createContext<FloatButtonGroupContextValue | undefined>(undefined);

interface StackEntry {
  hasIconAndDescription: boolean;
  id: string;
}

const stackEntries: StackEntry[] = [];
const stackListeners = new Set<() => void>();

function notifyStack(): void {
  for (const listener of stackListeners) listener();
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
}

function setStackEntry(entry: StackEntry, enabled: boolean): void {
  const index = stackEntries.findIndex(item => item.id === entry.id);
  if (!enabled) {
    if (index >= 0) {
      stackEntries.splice(index, 1);
      notifyStack();
    }
    return;
  }
  if (index < 0) stackEntries.push(entry);
  else stackEntries[index] = entry;
  notifyStack();
}

function useStackPosition(id: string, enabled: boolean, hasIconAndDescription: boolean) {
  const [, refresh] = useState(0);
  useEffect(() => {
    const listener = () => refresh(value => value + 1);
    stackListeners.add(listener);
    return () => {
      stackListeners.delete(listener);
    };
  }, []);
  useEffect(() => {
    setStackEntry({ id, hasIconAndDescription }, enabled);
    return () => setStackEntry({ id, hasIconAndDescription }, false);
  }, [enabled, hasIconAndDescription, id]);
  return resolveFloatButtonStackPosition(stackEntries, id);
}

function DefaultExpandIcon(): ReactElement {
  return (
    <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20">
      <circle cx="5" cy="12" fill="currentColor" r="2" />
      <circle cx="12" cy="12" fill="currentColor" r="2" />
      <circle cx="19" cy="12" fill="currentColor" r="2" />
    </svg>
  );
}

function DefaultFoldIcon(): ReactElement {
  return (
    <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20">
      <path
        d="M5 5 19 19M19 5 5 19"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const FloatButtonImplementation = forwardRef<FloatButtonHandle, FloatButtonImplementationProps>(
  function FloatButton(
    {
      icon,
      description,
      tooltip,
      variant = FLOAT_BUTTON_DEFAULTS.variant,
      shape = FLOAT_BUTTON_DEFAULTS.shape,
      href,
      target = FLOAT_BUTTON_DEFAULTS.target,
      badge = FLOAT_BUTTON_DEFAULTS.badge,
      draggable = FLOAT_BUTTON_DEFAULTS.draggable,
      adsorbBottom = FLOAT_BUTTON_DEFAULTS.adsorbBottom,
      visible,
      defaultVisible = FLOAT_BUTTON_DEFAULTS.defaultVisible,
      ariaLabel,
      collapseButton = false,
      actionRef,
      disabled,
      onClick,
      onVisibleChange,
      onDragStart,
      onDragging,
      onDragEnd,
      className,
      style,
      ...nativeProps
    },
    forwardedRef,
  ): ReactElement {
    const config = useHorizonWebConfig();
    const classes = useMemo(
      () => new ComponentClassBlock('float-button', config.namespace.toLowerCase()),
      [config.namespace],
    );
    const stackId = useId();
    const group = useContext(FloatButtonGroupContext);
    const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
    const [uncontrolledVisible, setUncontrolledVisible] = useState(defaultVisible);
    const [dragged, setDragged] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState<{ left: number; top: number }>();
    const controlledRef = useRef(visible !== undefined);
    const propsRef = useRef({
      adsorbBottom,
      disabled,
      draggable,
      onDragEnd,
      onDragStart,
      onDragging,
    });
    controlledRef.current = visible !== undefined;
    propsRef.current = { adsorbBottom, disabled, draggable, onDragEnd, onDragStart, onDragging };
    const resolvedVisible = group?.visible ?? visible ?? uncontrolledVisible;
    const resolvedShape = group?.shape ?? shape;
    const resolvedVariant = group?.variant ?? variant;
    const stackEnabled =
      resolvedVisible && (!group || !group.useCollapse || collapseButton) && !dragged;
    const renderedVisible =
      resolvedVisible && (!group?.useCollapse || collapseButton || group.expanded);
    const hasIcon = icon !== undefined && icon !== null;
    const hasDescription = description !== undefined && description !== null;
    const stackPosition = useStackPosition(stackId, stackEnabled, hasIcon && hasDescription);

    useEffect(() => {
      if (resolvedVisible) return;
      setDragged(false);
      setPosition(undefined);
    }, [resolvedVisible]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;
      return createFloatButtonDragController(element, {
        disabled: () => !propsRef.current.draggable || Boolean(propsRef.current.disabled),
        onStart: () => {
          setDragged(true);
          setDragging(true);
          propsRef.current.onDragStart?.();
        },
        onMove: details => {
          setPosition(details.position);
          propsRef.current.onDragging?.();
        },
        onEnd: (details: FloatButtonDragDetails) => {
          setDragging(false);
          const ownerWindow = element.ownerDocument.defaultView;
          const rect = element.getBoundingClientRect();
          const adsorbed = resolveFloatButtonAdsorbedPosition(
            { x: details.position.left, y: details.position.top },
            {
              width: ownerWindow?.innerWidth ?? 0,
              height: ownerWindow?.innerHeight ?? 0,
            },
            { width: rect.width || 40, height: rect.height || 40 },
            24,
            propsRef.current.adsorbBottom,
          );
          setPosition({ left: adsorbed.x, top: adsorbed.y });
          propsRef.current.onDragEnd?.();
        },
      }).destroy;
    }, []);

    useImperativeHandle(
      forwardedRef,
      () => ({
        show() {
          if (!controlledRef.current) setUncontrolledVisible(true);
          onVisibleChange?.(true);
        },
        hide() {
          if (!controlledRef.current) setUncontrolledVisible(false);
          onVisibleChange?.(false);
        },
        focus() {
          elementRef.current?.focus();
        },
        get element() {
          return elementRef.current;
        },
      }),
      [onVisibleChange],
    );

    const badgeLayout = resolveFloatButtonBadgeLayout(
      badge,
      resolvedShape,
      hasIcon,
      hasDescription,
    );
    const badgeOptions: Partial<BadgeProps> =
      typeof badge === 'object' && badge !== null ? badge : {};
    const content = (
      <Badge
        {...badgeOptions}
        align={badgeOptions.align ?? badgeLayout.align}
        hidden={!badge || badgeOptions.hidden}
        offset={{
          top: `${badgeLayout.top}px`,
          right: `${badgeLayout.right}px`,
          ...(badgeOptions.offset ?? {}),
        }}
        type={typeof badge === 'boolean' ? 'dot' : badgeOptions.type}
      >
        <span
          className={cls(classes.e('inner'), classes.e('inner_all', hasIcon && hasDescription))}
        >
          {hasIcon && <span className={classes.e('icon')}>{icon}</span>}
          {hasDescription && <span className={classes.e('description')}>{description}</span>}
        </span>
      </Badge>
    );
    const stackStyle: CSSProperties = stackPosition.inStack
      ? {
          bottom: `calc(var(--h-float-button-spacing-bottom) + ((var(--h-float-button-spacing-gap) + var(--h-float-button-size)) * ${stackPosition.index}) + ((var(--h-float-button-size-large) - var(--h-float-button-size)) * ${stackPosition.precedingLargeCount}))`,
        }
      : {};
    const actionProps = {
      ...nativeProps,
      'aria-label': ariaLabel || (hasDescription ? undefined : config.floatButtonLabels.button),
      'aria-disabled': href && disabled ? true : undefined,
      className: cls(
        classes.block,
        classes.m(resolvedShape),
        classes.m(resolvedVariant),
        classes.is('draggable', dragged),
        classes.is('dragging', dragging),
        classes.is('static', Boolean(group?.useCollapse && !collapseButton)),
        className,
      ),
      onClick,
      ref: (element: HTMLButtonElement | HTMLAnchorElement | null) => {
        elementRef.current = element;
        assignRef(actionRef, element);
      },
      style: {
        ...stackStyle,
        ...(position && dragged ? { bottom: 'auto', left: position.left, top: position.top } : {}),
        display: renderedVisible ? undefined : 'none',
        ...style,
      },
    };
    const action = href ? (
      <a {...(actionProps as AnchorHTMLAttributes<HTMLAnchorElement>)} href={href} target={target}>
        {content}
      </a>
    ) : (
      <button
        {...(actionProps as ButtonHTMLAttributes<HTMLButtonElement>)}
        disabled={disabled}
        type="button"
      >
        {content}
      </button>
    );
    if (!tooltip) return action;
    const tooltipOptions: FloatButtonTooltipOptions =
      typeof tooltip === 'string' ? { content: tooltip } : tooltip;
    return (
      <Tooltip placement="left" size="small" {...tooltipOptions}>
        {action}
      </Tooltip>
    );
  },
);

export const FloatButton = FloatButtonImplementation as ForwardRefExoticComponent<
  FloatButtonProps & RefAttributes<FloatButtonHandle>
>;

const FloatButtonPopoverTrigger = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Omit<FloatButtonProps, 'actionRef'>
>(function FloatButtonPopoverTrigger(props, ref): ReactElement {
  return <FloatButtonImplementation {...props} actionRef={ref} />;
});

type SharedFloatButtonGroupProps = FloatButtonGroupCommonProps<
  ReactNode,
  FloatButtonTooltipOptions,
  FloatButtonBadgeOptions
>;

export interface FloatButtonGroupProps extends SharedFloatButtonGroupProps {
  /** 组内悬浮操作。 @en Floating actions in the group. */
  children?: ReactNode;
  /** 展开状态请求变化。 @en Called when an expansion change is requested. */
  onExpandedChange?: (expanded: boolean, details: FloatButtonGroupExpansionDetails) => void;
  /** 可见状态请求变化。 @en Called when a visibility change is requested. */
  onVisibleChange?: (visible: boolean) => void;
  /** 组已展开。 @en Called after the group expands. */
  onExpand?: () => void;
  /** 组已折叠。 @en Called after the group folds. */
  onFold?: () => void;
  /** 点击折叠按钮。 @en Called when the collapse action is clicked. */
  onClick?: () => void;
  /** 容器 class。 @en Group wrapper class. */
  className?: string;
}

export interface FloatButtonGroupHandle extends FloatButtonGroupCommandMap {}

export const FloatButtonGroup = forwardRef<FloatButtonGroupHandle, FloatButtonGroupProps>(
  function FloatButtonGroup(
    {
      children,
      variant,
      shape,
      useCollapse = FLOAT_BUTTON_GROUP_DEFAULTS.useCollapse,
      trigger = FLOAT_BUTTON_GROUP_DEFAULTS.trigger,
      expandIcon = <DefaultExpandIcon />,
      foldIcon = <DefaultFoldIcon />,
      expandTooltip,
      foldTooltip,
      badge,
      draggable = FLOAT_BUTTON_GROUP_DEFAULTS.draggable,
      adsorbBottom = FLOAT_BUTTON_GROUP_DEFAULTS.adsorbBottom,
      visible,
      defaultVisible = FLOAT_BUTTON_GROUP_DEFAULTS.defaultVisible,
      expanded,
      defaultExpanded = FLOAT_BUTTON_GROUP_DEFAULTS.defaultExpanded,
      onExpandedChange,
      onVisibleChange,
      onExpand,
      onFold,
      onClick,
      className,
    },
    forwardedRef,
  ): ReactElement {
    const config = useHorizonWebConfig();
    const classes = useMemo(
      () => new ComponentClassBlock('float-button-group', config.namespace.toLowerCase()),
      [config.namespace],
    );
    const callbacksRef = useRef({ onExpand, onExpandedChange, onFold, onVisibleChange });
    callbacksRef.current = { onExpand, onExpandedChange, onFold, onVisibleChange };
    const controllerRef = useRef<FloatButtonGroupController | null>(null);
    const [, refresh] = useState(0);
    if (!controllerRef.current) {
      controllerRef.current = new FloatButtonGroupController({
        defaultExpanded,
        defaultVisible,
        expanded,
        useCollapse,
        visible,
        onExpandedChange: (nextExpanded, details) => {
          refresh(value => value + 1);
          callbacksRef.current.onExpandedChange?.(nextExpanded, details);
          if (nextExpanded) callbacksRef.current.onExpand?.();
          else callbacksRef.current.onFold?.();
        },
        onVisibleChange: nextVisible => {
          refresh(value => value + 1);
          callbacksRef.current.onVisibleChange?.(nextVisible);
        },
      });
    }
    const controller = controllerRef.current;
    controller.setOptions({ expanded, useCollapse, visible });
    const state = controller.snapshot;

    useImperativeHandle(
      forwardedRef,
      () => ({
        show: () => {
          controller.show();
          refresh(value => value + 1);
        },
        hide: () => {
          controller.hide();
          refresh(value => value + 1);
        },
        expand: () => {
          controller.expand();
          refresh(value => value + 1);
        },
        fold: () => {
          controller.fold();
          refresh(value => value + 1);
        },
        toggle: () => {
          controller.toggle();
          refresh(value => value + 1);
        },
      }),
      [controller],
    );

    const contextValue = useMemo<FloatButtonGroupContextValue>(
      () => ({ expanded: state.expanded, shape, useCollapse, variant, visible: state.visible }),
      [shape, state.expanded, state.visible, useCollapse, variant],
    );
    const groupedContent = (
      <div className={cls(classes.e('container'), classes.em('container', shape ?? 'circle'))}>
        {children}
      </div>
    );
    const body = useCollapse ? (
      <Popover
        arrow={false}
        destroyOnHide={false}
        distance={0}
        onOpenChange={nextExpanded => {
          if (nextExpanded) controller.expand(trigger);
          else controller.fold(trigger);
          refresh(value => value + 1);
        }}
        open={state.expanded}
        placement="top"
        trigger={trigger}
        content={groupedContent}
      >
        <FloatButtonPopoverTrigger
          adsorbBottom={adsorbBottom}
          ariaLabel={
            state.expanded ? config.floatButtonLabels.fold : config.floatButtonLabels.expand
          }
          badge={badge}
          className={cls(classes.e('collapse-button'), classes.is('expanded', state.expanded))}
          collapseButton
          draggable={draggable}
          icon={state.expanded ? foldIcon : expandIcon}
          onClick={() => onClick?.()}
          tooltip={state.expanded ? foldTooltip : expandTooltip}
        />
      </Popover>
    ) : (
      children
    );

    return (
      <FloatButtonGroupContext.Provider value={contextValue}>
        <div className={cls(classes.block, className)}>{body}</div>
      </FloatButtonGroupContext.Provider>
    );
  },
);

export const HFloatButton = FloatButton;
export const HFloatButtonGroup = FloatButtonGroup;
export type {
  FloatButtonGroupTrigger,
  FloatButtonShape,
  FloatButtonTarget,
  FloatButtonVariant,
} from '@aurora/core';
