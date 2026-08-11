import type {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type {
  AdaptComponentApiShape,
  ComponentEventHandlers,
  PopContentCommonProps,
  PopoverCommandMap,
  PopoverCommonProps,
  PopoverEventMap,
  PopoverMaskOptions,
  PopoverTheme,
} from '@aurora/core';
import { POP_CONTENT_DEFAULTS, POPOVER_DEFAULTS, TooltipOpenController } from '@aurora/core';
import type {
  PopoverPositionerOptions,
  PortalTarget,
  PositionerInstance,
} from '@aurora/horizon-web-core';
import {
  createPopoverDismissableLayer,
  createPopoverPositioner,
  resolvePortalContainer,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type {
  PopoverArrowOptions,
  PopoverHideEvent,
  PopoverPlacement,
  PopoverStrategy,
  PopoverTheme,
  PopoverTrigger,
} from '@aurora/core';

type ReactPopoverMask = PopoverMaskOptions<CSSProperties, string, PortalTarget>;
type ReactPopoverEvents = AdaptComponentApiShape<
  PopoverEventMap<ReactMouseEvent<HTMLElement>>,
  {
    openChange: 'onOpenChange';
    show: 'onShow';
    hide: 'onHide';
    enterReference: 'onEnterReference';
    leaveReference: 'onLeaveReference';
    click: 'onClick';
  }
>;

type TriggerProps = HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> };

export type PopoverProps = PopoverCommonProps<ReactPopoverMask> &
  ComponentEventHandlers<ReactPopoverEvents> &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    'children' | 'content' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'
  > & {
    /** 唯一触发元素。 @en The single trigger element. */
    children: ReactElement;
    /** 浮层内容。 @en Floating content. */
    content: ReactNode;
    /** Portal 容器。 @en Portal destination. */
    portalContainer?: PortalTarget;
    /** 触发元素 class。 @en Class applied to the trigger element. */
    referenceClassName?: string;
  };

export interface PopoverHandle extends PopoverCommandMap {
  /** 触发元素。 @en Reference element. */
  readonly reference: HTMLElement | null;
  /** 浮层元素。 @en Floating element. */
  readonly floating: HTMLDivElement | null;
}

export type PopContentProps = PopContentCommonProps & HTMLAttributes<HTMLDivElement>;

const PopoverThemeContext = createContext<PopoverTheme | undefined>(undefined);

function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

function callHandler<Event>(handler: ((event: Event) => void) | undefined, event: Event): void {
  handler?.(event);
}

export const Popover = forwardRef<PopoverHandle, PopoverProps>(function Popover(
  {
    children,
    content,
    trigger = POPOVER_DEFAULTS.trigger,
    open,
    defaultOpen = POPOVER_DEFAULTS.defaultOpen,
    placement = POPOVER_DEFAULTS.placement,
    skidding = POPOVER_DEFAULTS.skidding,
    distance = POPOVER_DEFAULTS.distance,
    flip = POPOVER_DEFAULTS.flip,
    arrow = POPOVER_DEFAULTS.arrow,
    arrowOptions = POPOVER_DEFAULTS.arrowOptions,
    destroyOnHide = POPOVER_DEFAULTS.destroyOnHide,
    portal = POPOVER_DEFAULTS.portal,
    resizeObserve = POPOVER_DEFAULTS.resizeObserve,
    referenceOverflowObserve = POPOVER_DEFAULTS.referenceOverflowObserve,
    sameWidth = POPOVER_DEFAULTS.sameWidth,
    setMinWidth = POPOVER_DEFAULTS.setMinWidth,
    sameHeight = POPOVER_DEFAULTS.sameHeight,
    showDelay = POPOVER_DEFAULTS.showDelay,
    hideDelay = POPOVER_DEFAULTS.hideDelay,
    fallbackPlacements,
    zIndex = 1000,
    hideEvent = POPOVER_DEFAULTS.hideEvent,
    disabled = POPOVER_DEFAULTS.disabled,
    mask,
    stopPropagation = POPOVER_DEFAULTS.stopPropagation,
    theme = POPOVER_DEFAULTS.theme,
    preventOverflow = POPOVER_DEFAULTS.preventOverflow,
    mainAxisCheck = POPOVER_DEFAULTS.mainAxisCheck,
    strategy = POPOVER_DEFAULTS.strategy,
    portalContainer = 'body',
    referenceClassName,
    onOpenChange,
    onShow,
    onHide,
    onEnterReference,
    onLeaveReference,
    onClick,
    className,
    style,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  if (!isValidElement(children)) throw new Error('Popover requires one valid React element child.');
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('popover', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const floatingId = useId();
  const referenceRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const positionerRef = useRef<PositionerInstance | null>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [resolvedPortal, setResolvedPortal] = useState<Element>();
  const [resolvedMaskPortal, setResolvedMaskPortal] = useState<Element>();
  const controlledRef = useRef(open !== undefined);
  const callbackRef = useRef({ onOpenChange, onShow, onHide });
  controlledRef.current = open !== undefined;
  callbackRef.current = { onOpenChange, onShow, onHide };
  const currentOpen = !disabled && (open ?? uncontrolledOpen);
  const previousOpen = useRef(currentOpen);
  const controllerRef = useRef<TooltipOpenController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new TooltipOpenController({
      open: currentOpen,
      disabled,
      showDelay,
      hideDelay,
      onOpenChange: (nextOpen, details) => {
        if (!controlledRef.current) setUncontrolledOpen(nextOpen);
        callbackRef.current.onOpenChange?.(nextOpen, details);
      },
    });
  }
  const controller = controllerRef.current;

  useEffect(() => {
    controller.setOptions({ disabled, showDelay, hideDelay });
  }, [controller, disabled, hideDelay, showDelay]);

  useEffect(() => () => controller.destroy(), [controller]);

  useEffect(() => {
    controller.syncOpen(currentOpen);
    if (previousOpen.current === currentOpen) return;
    previousOpen.current = currentOpen;
    if (currentOpen) callbackRef.current.onShow?.();
    else callbackRef.current.onHide?.();
  }, [controller, currentOpen]);

  useLayoutEffect(() => {
    const ownerDocument = referenceRef.current?.ownerDocument;
    setResolvedPortal(resolvePortalContainer(portalContainer, ownerDocument));
    setResolvedMaskPortal(resolvePortalContainer(mask?.target ?? portalContainer, ownerDocument));
  }, [mask?.target, portalContainer]);

  useLayoutEffect(() => {
    if (!currentOpen || !referenceRef.current || !floatingRef.current) return;
    const options: PopoverPositionerOptions = {
      placement,
      distance,
      skidding,
      flip,
      fallbackPlacements,
      shift: preventOverflow || mainAxisCheck,
      arrowElement: arrowRef.current,
      hideWhenReferenceHidden: referenceOverflowObserve,
      autoUpdate: true,
      observeResize: resizeObserve,
      sameWidth,
      setMinWidth,
      sameHeight,
      strategy,
    };
    const positioner = createPopoverPositioner(referenceRef.current, floatingRef.current, options);
    positionerRef.current = positioner;
    return () => {
      positioner.destroy();
      if (positionerRef.current === positioner) positionerRef.current = null;
    };
  }, [
    currentOpen,
    distance,
    fallbackPlacements,
    flip,
    mainAxisCheck,
    placement,
    preventOverflow,
    referenceOverflowObserve,
    resizeObserve,
    sameHeight,
    sameWidth,
    setMinWidth,
    skidding,
    strategy,
  ]);

  useEffect(() => {
    if (!currentOpen || trigger !== 'click' || !floatingRef.current) return;
    return createPopoverDismissableLayer({
      floating: floatingRef.current,
      reference: referenceRef.current,
      eventName: hideEvent,
      onDismiss: reason => {
        controller.closeImmediately(reason);
        if (reason === 'escape') referenceRef.current?.focus();
      },
    });
  }, [controller, currentOpen, hideEvent, trigger]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      open: () => controller.openImmediately(),
      close: () => controller.closeImmediately(),
      async updatePosition() {
        await positionerRef.current?.update();
      },
      get reference() {
        return referenceRef.current;
      },
      get floating() {
        return floatingRef.current;
      },
    }),
    [controller],
  );

  const child = children as ReactElement<TriggerProps>;
  const childProps = child.props;
  const triggerElement = cloneElement(child, {
    'aria-controls': currentOpen ? floatingId : childProps['aria-controls'],
    'aria-expanded': currentOpen,
    'aria-haspopup': childProps['aria-haspopup'] ?? 'dialog',
    className: cls(childProps.className, referenceClassName),
    ref: (node: HTMLElement | null) => {
      referenceRef.current = node;
      assignRef(childProps.ref, node);
    },
    onMouseEnter: (event: ReactMouseEvent<HTMLElement>) => {
      callHandler(childProps.onMouseEnter, event);
      onEnterReference?.(event);
      if (!event.defaultPrevented && trigger === 'hover') {
        controller.syncOpen(currentOpen);
        controller.requestOpen('hover');
      }
    },
    onMouseLeave: (event: ReactMouseEvent<HTMLElement>) => {
      callHandler(childProps.onMouseLeave, event);
      onLeaveReference?.(event);
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
    onClick: (event: ReactMouseEvent<HTMLElement>) => {
      callHandler(childProps.onClick, event);
      if (event.defaultPrevented || trigger !== 'click') return;
      if (stopPropagation) event.stopPropagation();
      onClick?.(event);
      controller.syncOpen(currentOpen);
      if (currentOpen) controller.closeImmediately('click');
      else controller.openImmediately('click');
    },
  });

  const shouldRender = currentOpen || !destroyOnHide;
  const floatingElement = shouldRender ? (
    <PopoverThemeContext.Provider value={theme}>
      <div
        {...nativeProps}
        aria-modal={mask?.enable || undefined}
        className={cls(classes.e('popper'), className)}
        hidden={!currentOpen}
        id={floatingId}
        ref={floatingRef}
        role="dialog"
        style={{ ...style, zIndex }}
        onMouseEnter={() => trigger === 'hover' && controller.cancelClose()}
        onMouseLeave={() => trigger === 'hover' && controller.requestClose('hover')}
      >
        {content}
        {arrow ? (
          <div
            className={cls(classes.e('arrow'), classes.is(theme))}
            data-popper-arrow
            ref={arrowRef}
            style={{ height: arrowOptions.size, width: arrowOptions.size }}
          />
        ) : null}
      </div>
    </PopoverThemeContext.Provider>
  ) : null;
  const maskElement =
    mask?.enable && currentOpen ? (
      <div
        className={cls(classes.e('mask'), mask.className)}
        style={{ ...mask.style, zIndex: zIndex - 1 }}
      />
    ) : null;

  return (
    <>
      {triggerElement}
      {maskElement && resolvedMaskPortal
        ? createPortal(maskElement, resolvedMaskPortal)
        : maskElement}
      {floatingElement && portal && resolvedPortal
        ? createPortal(floatingElement, resolvedPortal)
        : floatingElement}
    </>
  );
});

export const PopContent = forwardRef<HTMLDivElement, PopContentProps>(function PopContent(
  { theme, className, children, ...nativeProps },
  forwardedRef,
): ReactElement {
  const inheritedTheme = useContext(PopoverThemeContext);
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('popover', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const resolvedTheme = theme ?? inheritedTheme ?? POP_CONTENT_DEFAULTS.theme;
  return (
    <div
      {...nativeProps}
      className={cls(classes.e('popcontent'), classes.is(resolvedTheme), className)}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
});

export const HPopover = Popover;
export const HPopContent = PopContent;
