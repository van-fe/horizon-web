import type {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type { TooltipChangeDetails, TooltipTrigger } from '@aurora/core';
import { TooltipOpenController } from '@aurora/core';
import type { PortalTarget, PositionerInstance, WebPlacement } from '@aurora/horizon-web-core';
import {
  createDismissableLayer,
  createPositioner,
  resolvePortalContainer,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type TooltipSize = 'small' | 'medium' | 'large';
export type TooltipTheme = 'dark' | 'light';

export interface TooltipHandle {
  /** 重新计算浮层位置。@en Recompute the floating position. */
  update(): Promise<void>;
  /** 立即打开。@en Open immediately. */
  open(): void;
  /** 立即关闭。@en Close immediately. */
  close(): void;
}

export interface TooltipProps {
  /** 唯一触发元素。@en The single trigger element. */
  children: ReactElement;
  /** 浮层内容。@en Tooltip content. */
  content: ReactNode;
  /** 触发方式。@en Interaction used to open the tooltip. */
  trigger?: TooltipTrigger;
  /** 受控打开状态。@en Controlled open state. */
  open?: boolean;
  /** 非受控初始状态。@en Initial uncontrolled open state. */
  defaultOpen?: boolean;
  /** 打开状态变化回调。@en Called when the open state changes. */
  onOpenChange?: (open: boolean, details: TooltipChangeDetails) => void;
  /** 是否禁用。@en Whether the tooltip is disabled. */
  disabled?: boolean;
  /** 鼠标是否可以进入浮层。@en Whether pointer interaction may enter the tooltip. */
  enterable?: boolean;
  /** 延迟显示毫秒数。@en Delay before opening in milliseconds. */
  showAfter?: number;
  /** 延迟隐藏毫秒数。@en Delay before closing in milliseconds. */
  hideAfter?: number;
  /** 浮层位置。@en Preferred floating placement. */
  placement?: WebPlacement;
  /** 主轴间距。@en Main-axis distance. */
  distance?: number;
  /** 交叉轴偏移。@en Cross-axis offset. */
  skidding?: number;
  /** 空间不足时是否翻转。@en Whether placement flips when space is insufficient. */
  flip?: boolean;
  /** 备选位置。@en Alternative placements. */
  fallbackPlacements?: WebPlacement[];
  /** 是否在视口内平移。@en Whether the floating element shifts into the viewport. */
  shift?: boolean;
  /** 是否显示箭头。@en Whether the arrow is rendered. */
  arrow?: boolean;
  /** 尺寸。@en Tooltip size. */
  size?: TooltipSize;
  /** 主题。@en Tooltip theme. */
  theme?: TooltipTheme;
  /** 是否使用 Portal。@en Whether the floating content uses a portal. */
  portal?: boolean;
  /** Portal 容器。@en Portal destination. */
  portalContainer?: PortalTarget;
  /** 自定义浮层类名。@en Class name applied to the floating element. */
  className?: string;
  /** 自定义浮层样式。@en Style applied to the floating element. */
  style?: CSSProperties;
  /** CSS 层级。@en Floating z-index. */
  zIndex?: number;
}

type TriggerProps = HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> };

function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

function callHandler<Event>(handler: ((event: Event) => void) | undefined, event: Event): void {
  handler?.(event);
}

export const Tooltip = forwardRef<TooltipHandle, TooltipProps>(function Tooltip(
  {
    children,
    content,
    trigger = 'hover',
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    enterable = false,
    showAfter = 200,
    hideAfter = 200,
    placement = 'top',
    distance = 12,
    skidding = 0,
    flip = true,
    fallbackPlacements,
    shift = true,
    arrow = true,
    size = 'medium',
    theme = 'dark',
    portal = true,
    portalContainer = 'body',
    className,
    style,
    zIndex = 1000,
  },
  forwardedRef,
): ReactElement {
  if (!isValidElement(children)) throw new Error('Tooltip requires one valid React element child.');
  const config = useHorizonWebConfig();
  const classHelper = useMemo(
    () => new ComponentClassBlock('tooltip', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const tooltipId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const positionerRef = useRef<PositionerInstance | null>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [resolvedPortal, setResolvedPortal] = useState<Element | undefined>();
  const controlledRef = useRef(open !== undefined);
  const onOpenChangeRef = useRef(onOpenChange);
  controlledRef.current = open !== undefined;
  onOpenChangeRef.current = onOpenChange;
  const currentOpen = !disabled && (open ?? uncontrolledOpen);
  const controllerRef = useRef<TooltipOpenController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new TooltipOpenController({
      open: currentOpen,
      disabled,
      showDelay: showAfter,
      hideDelay: hideAfter,
      onOpenChange: (nextOpen, details) => {
        if (!controlledRef.current) setUncontrolledOpen(nextOpen);
        onOpenChangeRef.current?.(nextOpen, details);
      },
    });
  }
  const controller = controllerRef.current;

  useEffect(() => {
    controller.setOptions({ disabled, showDelay: showAfter, hideDelay: hideAfter });
  }, [controller, disabled, hideAfter, showAfter]);

  useEffect(() => () => controller.destroy(), [controller]);

  useEffect(() => {
    controller.syncOpen(currentOpen);
  }, [controller, currentOpen]);

  useLayoutEffect(() => {
    setResolvedPortal(
      resolvePortalContainer(portalContainer, triggerRef.current?.ownerDocument),
    );
  }, [portalContainer]);

  useLayoutEffect(() => {
    if (!currentOpen || !triggerRef.current || !floatingRef.current) return;
    const instance = createPositioner(triggerRef.current, floatingRef.current, {
      placement,
      distance,
      skidding,
      flip,
      fallbackPlacements,
      shift,
      arrowElement: arrowRef.current,
      hideWhenReferenceHidden: true,
    });
    positionerRef.current = instance;
    return () => {
      instance.destroy();
      if (positionerRef.current === instance) positionerRef.current = null;
    };
  }, [currentOpen, distance, fallbackPlacements, flip, placement, shift, skidding]);

  useEffect(() => {
    if (!currentOpen || !floatingRef.current) return;
    return createDismissableLayer({
      node: floatingRef.current,
      branches: [triggerRef.current],
      dismissOnOutsidePointer: trigger === 'click' || trigger === 'contextmenu',
      onDismiss: reason => controller.closeImmediately(reason),
    }).destroy;
  }, [controller, currentOpen, trigger]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      async update() {
        await positionerRef.current?.update();
      },
      open() {
        controller.openImmediately();
      },
      close() {
        controller.closeImmediately();
      },
    }),
    [controller],
  );

  const child = children as ReactElement<TriggerProps>;
  const childProps = child.props;
  const triggerElement = cloneElement(child, {
    'aria-describedby': currentOpen ? tooltipId : childProps['aria-describedby'],
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      assignRef(childProps.ref, node);
    },
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      callHandler(childProps.onMouseEnter, event);
      if (!event.defaultPrevented && trigger === 'hover') {
        controller.syncOpen(currentOpen);
        controller.requestOpen('hover');
      }
    },
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      callHandler(childProps.onMouseLeave, event);
      if (!event.defaultPrevented && trigger === 'hover') controller.requestClose('hover');
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      callHandler(childProps.onFocus, event);
      if (!event.defaultPrevented && trigger === 'focus') {
        controller.syncOpen(currentOpen);
        controller.requestOpen('focus');
      }
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      callHandler(childProps.onBlur, event);
      if (!event.defaultPrevented && trigger === 'focus') controller.requestClose('focus');
    },
    onClick: (event: MouseEvent<HTMLElement>) => {
      callHandler(childProps.onClick, event);
      if (!event.defaultPrevented && trigger === 'click') {
        controller.syncOpen(currentOpen);
        controller.toggle('click');
      }
    },
    onContextMenu: (event: MouseEvent<HTMLElement>) => {
      callHandler(childProps.onContextMenu, event);
      if (!event.defaultPrevented && trigger === 'contextmenu') {
        event.preventDefault();
        controller.syncOpen(currentOpen);
        controller.toggle('contextmenu');
      }
    },
  });

  const floatingElement = currentOpen ? (
    <div
      className={cls(classHelper.block, classHelper.m(size), classHelper.m(theme), className)}
      id={tooltipId}
      onMouseEnter={() => enterable && controller.cancelClose()}
      onMouseLeave={() => enterable && controller.requestClose(trigger)}
      ref={floatingRef}
      role="tooltip"
      style={{ ...style, zIndex }}
    >
      <div className={classHelper.e('content')}>{content}</div>
      {arrow && <div className={classHelper.e('arrow')} data-popper-arrow ref={arrowRef} />}
    </div>
  ) : null;

  return (
    <>
      {triggerElement}
      {floatingElement && portal && resolvedPortal
        ? createPortal(floatingElement, resolvedPortal)
        : floatingElement}
    </>
  );
});

export const HTooltip = Tooltip;
