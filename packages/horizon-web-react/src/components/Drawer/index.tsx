import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';
import {
  forwardRef,
  useCallback,
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
  DrawerCommandMap,
  DrawerCommonProps,
  DrawerOpenChangeDetails,
  DrawerOpenReason,
  DrawerPresetSize,
} from '@aurora/core';
import {
  DRAWER_DEFAULTS,
  DRAWER_PRESET_SIZES,
  DrawerController,
  isHorizontalDrawerPlacement,
  resolveDrawerLockScroll,
  resolveDrawerPresetExtent,
} from '@aurora/core';
import type { PortalTarget } from '@aurora/horizon-web-core';
import {
  createDialogInteractionLayer,
  createDrawerResizeController,
  resolvePortalContainer,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Button, type ButtonProps } from '../Button';

type SharedDrawerProps = Omit<
  DrawerCommonProps<Partial<ButtonProps>, Partial<ButtonProps>>,
  'footer' | 'header' | 'title'
>;

export interface DrawerClassNames {
  /** 遮罩层 class。 @en Mask class. */
  mask?: string;
  /** 面板 class。 @en Panel class. */
  container?: string;
  /** 头部 class。 @en Header class. */
  header?: string;
  /** 正文 class。 @en Body class. */
  body?: string;
  /** 底部 class。 @en Footer class. */
  footer?: string;
}

export type DrawerProps = SharedDrawerProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'title'> & {
    /** 抽屉正文。 @en Drawer body content. */
    children?: ReactNode;
    /** 内置头部标题。 @en Built-in header title. */
    title?: ReactNode;
    /** 完整头部内容，false 时隐藏。 @en Complete header content, or false to hide it. */
    header?: ReactNode | boolean;
    /** 完整底部内容，false 时隐藏。 @en Complete footer content, or false to hide it. */
    footer?: ReactNode | boolean;
    /** 无可见标题时的可访问名称。 @en Accessible name without a visible title. */
    ariaLabel?: string;
    /** Portal 容器。 @en Portal destination. */
    portalContainer?: PortalTarget;
    /** 是否使用 Portal。 @en Whether to use a Portal. */
    portal?: boolean;
    /** 浮层层级。 @en Floating z-index. */
    zIndex?: number;
    /** 内置区域 class。 @en Classes for built-in regions. */
    classNames?: DrawerClassNames;
    /** 打开状态请求变化。 @en Called when an open-state change is requested. */
    onOpenChange?: (open: boolean, details: DrawerOpenChangeDetails) => void;
    /** 确认操作。 @en Confirm action. */
    onOk?: () => void;
    /** 取消操作。 @en Cancel action. */
    onCancel?: () => void;
    /** 开始打开。 @en Opening started. */
    onOpen?: () => void;
    /** 打开完成。 @en Opening completed. */
    onOpened?: () => void;
    /** 开始关闭。 @en Closing started. */
    onClose?: () => void;
    /** 关闭完成。 @en Closing completed. */
    onClosed?: () => void;
    /** 点击遮罩层。 @en Mask clicked. */
    onMaskClick?: () => void;
    /** 点击头部关闭按钮。 @en Header close button clicked. */
    onIconClick?: () => void;
    /** 关闭守卫等待状态变化。 @en Close-guard pending state changed. */
    onClosePendingChange?: (pending: boolean) => void;
  };

export interface DrawerHandle extends DrawerCommandMap {
  /** 聚焦抽屉。 @en Focuses the drawer. */
  focus(): void;
  /** 抽屉面板元素。 @en Drawer panel element. */
  readonly drawer: HTMLDivElement | null;
}

let nextDrawerZIndex = 2000;

function toCssUnit(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

function isPresetSize(value: unknown): value is DrawerPresetSize {
  return DRAWER_PRESET_SIZES.includes(value as DrawerPresetSize);
}

function CloseIcon(): ReactElement {
  return (
    <svg aria-hidden="true" height="16" viewBox="0 0 24 24" width="16">
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

export const Drawer = forwardRef<DrawerHandle, DrawerProps>(function Drawer(
  {
    children,
    title,
    header = DRAWER_DEFAULTS.header,
    footer = DRAWER_DEFAULTS.footer,
    open,
    defaultOpen = DRAWER_DEFAULTS.defaultOpen,
    placement = DRAWER_DEFAULTS.placement,
    size = DRAWER_DEFAULTS.size,
    mask = DRAWER_DEFAULTS.mask,
    maskClosable = DRAWER_DEFAULTS.maskClosable,
    escClosable = DRAWER_DEFAULTS.escClosable,
    closable = DRAWER_DEFAULTS.closable,
    okButton = DRAWER_DEFAULTS.okButton,
    okButtonText,
    cancelButton = DRAWER_DEFAULTS.cancelButton,
    cancelButtonText,
    beforeClose,
    lockScroll,
    sizeDraggable = DRAWER_DEFAULTS.sizeDraggable,
    loading = DRAWER_DEFAULTS.loading,
    destroyOnClose = DRAWER_DEFAULTS.destroyOnClose,
    ariaLabel,
    portal = true,
    portalContainer = 'body',
    zIndex,
    classNames,
    onOpenChange,
    onOk,
    onCancel,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    onMaskClick,
    onIconClick,
    onClosePendingChange,
    className,
    style,
    ...nativeProps
  },
  forwardedRef,
): ReactElement | null {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('drawer', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const titleId = useId();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const resizeHandleRef = useRef<HTMLDivElement | null>(null);
  const controlledRef = useRef(open !== undefined);
  const callbacksRef = useRef({
    onCancel,
    onClose,
    onClosed,
    onClosePendingChange,
    onIconClick,
    onMaskClick,
    onOk,
    onOpen,
    onOpened,
    onOpenChange,
  });
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [closePending, setClosePending] = useState(false);
  const [portalElement, setPortalElement] = useState<Element>();
  const [portalReady, setPortalReady] = useState(false);
  const [layerZIndex, setLayerZIndex] = useState(zIndex ?? nextDrawerZIndex);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [resizedExtent, setResizedExtent] = useState<number>();
  controlledRef.current = open !== undefined;
  callbacksRef.current = {
    onCancel,
    onClose,
    onClosed,
    onClosePendingChange,
    onIconClick,
    onMaskClick,
    onOk,
    onOpen,
    onOpened,
    onOpenChange,
  };
  const currentOpen = open ?? uncontrolledOpen;
  const previousOpen = useRef(false);
  const controllerRef = useRef<DrawerController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new DrawerController({
      open,
      defaultOpen,
      beforeClose,
      onOpenChange: (nextOpen, details) => {
        if (!controlledRef.current) setUncontrolledOpen(nextOpen);
        callbacksRef.current.onOpenChange?.(nextOpen, details);
      },
      onClosePendingChange: pending => {
        setClosePending(pending);
        callbacksRef.current.onClosePendingChange?.(pending);
      },
    });
  }
  const controller = controllerRef.current;

  useEffect(() => {
    controller.setOptions({
      open,
      beforeClose,
      onOpenChange: (nextOpen, details) => {
        if (!controlledRef.current) setUncontrolledOpen(nextOpen);
        callbacksRef.current.onOpenChange?.(nextOpen, details);
      },
      onClosePendingChange: pending => {
        setClosePending(pending);
        callbacksRef.current.onClosePendingChange?.(pending);
      },
    });
    controller.syncOpen(currentOpen);
  }, [beforeClose, controller, currentOpen, open]);

  useLayoutEffect(() => {
    setPortalElement(resolvePortalContainer(portalContainer, drawerRef.current?.ownerDocument));
    setPortalReady(true);
  }, [portalContainer]);

  const requestClose = useCallback(
    (reason: DrawerOpenReason = 'imperative') => {
      controller.syncOpen(currentOpen);
      return controller.requestClose(reason);
    },
    [controller, currentOpen],
  );
  const requestOpen = useCallback(() => {
    controller.syncOpen(currentOpen);
    return controller.requestOpen('imperative');
  }, [controller, currentOpen]);

  useEffect(() => {
    if (previousOpen.current === currentOpen) return;
    previousOpen.current = currentOpen;
    if (currentOpen) {
      setLayerZIndex(zIndex ?? ++nextDrawerZIndex);
      callbacksRef.current.onOpen?.();
      queueMicrotask(() => callbacksRef.current.onOpened?.());
    } else {
      callbacksRef.current.onClose?.();
      setResizedExtent(undefined);
      queueMicrotask(() => callbacksRef.current.onClosed?.());
    }
  }, [currentOpen, zIndex]);

  useEffect(() => {
    if (!currentOpen || !drawerRef.current || (portal && !portalReady)) return;
    const drawer = drawerRef.current;
    const ownerWindow = drawer.ownerDocument.defaultView;
    const updateViewport = () => setViewportWidth(ownerWindow?.innerWidth ?? 1280);
    updateViewport();
    ownerWindow?.addEventListener('resize', updateViewport);
    const layer = createDialogInteractionLayer(drawer, {
      dismissOnEscape: escClosable,
      dismissOnOutsidePointer: false,
      initialFocus: drawer,
      lockScroll: resolveDrawerLockScroll(lockScroll, mask),
      onDismiss: () => requestClose('escape'),
    });
    layer.activate();
    return () => {
      ownerWindow?.removeEventListener('resize', updateViewport);
      layer.deactivate();
    };
  }, [currentOpen, escClosable, lockScroll, mask, portal, portalReady, requestClose]);

  useEffect(() => {
    const handle = resizeHandleRef.current;
    const drawer = drawerRef.current;
    if (!currentOpen || !sizeDraggable || !handle || !drawer) return;
    const resizeController = createDrawerResizeController(handle, drawer, {
      placement,
      maximum: () =>
        isHorizontalDrawerPlacement(placement)
          ? drawer.parentElement?.clientWidth || drawer.ownerDocument.documentElement.clientWidth
          : drawer.parentElement?.clientHeight || drawer.ownerDocument.documentElement.clientHeight,
      onResize: setResizedExtent,
    });
    return () => resizeController.destroy();
  }, [currentOpen, placement, sizeDraggable]);

  useEffect(() => setResizedExtent(undefined), [placement, size]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      open: requestOpen,
      close: () => requestClose('imperative'),
      focus: () => drawerRef.current?.focus(),
      get drawer() {
        return drawerRef.current;
      },
    }),
    [requestClose, requestOpen],
  );

  if (destroyOnClose && !currentOpen) return null;

  const horizontal = isHorizontalDrawerPlacement(placement);
  const presetExtent = isPresetSize(size)
    ? resolveDrawerPresetExtent(size, viewportWidth)
    : undefined;
  const extent = resizedExtent === undefined ? (presetExtent ?? toCssUnit(size)) : resizedExtent;
  const resolvedOkProps: Partial<ButtonProps> = typeof okButton === 'object' ? okButton : {};
  const resolvedCancelProps: Partial<ButtonProps> =
    typeof cancelButton === 'object' ? cancelButton : {};
  const { onClick: onOkButtonClick, ...okButtonRest } = resolvedOkProps;
  const { onClick: onCancelButtonClick, ...cancelButtonRest } = resolvedCancelProps;
  const headerVisible = header !== false;
  const footerVisible = footer !== false;
  const customHeader = header !== true ? header : undefined;
  const customFooter = footer !== true ? footer : undefined;
  const hasDefaultTitle = customHeader === undefined && Boolean(title);
  const ownerDocument = drawerRef.current?.ownerDocument;
  const bodyPortal =
    !portalElement ||
    portalElement === ownerDocument?.body ||
    portalElement === ownerDocument?.documentElement;
  const rootPosition = bodyPortal ? 'fixed' : 'absolute';
  const rootStyle: CSSProperties = { ...style, position: rootPosition, zIndex: layerZIndex };
  const panelStyle: CSSProperties = {
    zIndex: layerZIndex + 1,
    width: horizontal ? toCssUnit(extent) : '100%',
    height: horizontal ? '100%' : toCssUnit(extent),
    position: rootPosition,
  };
  const content = (
    <div {...nativeProps} className={cls(classes.block, className)} style={rootStyle}>
      {mask && currentOpen ? (
        <div
          className={cls(classes.e('mask'), classNames?.mask)}
          style={{ position: rootPosition, zIndex: layerZIndex }}
          onClick={() => {
            callbacksRef.current.onMaskClick?.();
            if (maskClosable) requestClose('mask');
          }}
        />
      ) : null}
      <div
        aria-busy={closePending || undefined}
        aria-label={hasDefaultTitle ? undefined : ariaLabel || config.drawerLabels.drawer}
        aria-labelledby={hasDefaultTitle ? titleId : undefined}
        aria-modal={mask || undefined}
        className={cls(classes.e('container'), classes.m(placement), classNames?.container)}
        hidden={!currentOpen}
        ref={drawerRef}
        role="dialog"
        style={panelStyle}
        tabIndex={-1}
      >
        <div className={classes.e('main')}>
          {headerVisible ? (
            <div
              className={cls(
                classes.e('header'),
                classes.em('header', 'customize'),
                classNames?.header,
              )}
            >
              {customHeader !== undefined ? (
                customHeader
              ) : (
                <>
                  <div className={classes.e('default-title')} id={title ? titleId : undefined}>
                    {title}
                  </div>
                  {closable ? (
                    <Button
                      aria-label={config.drawerLabels.close}
                      className={classes.e('closable')}
                      icon={<CloseIcon />}
                      size="small"
                      text
                      variant="normal"
                      onClick={event => {
                        event.stopPropagation();
                        callbacksRef.current.onIconClick?.();
                        requestClose('close-button');
                      }}
                    />
                  ) : null}
                </>
              )}
            </div>
          ) : null}
          <div className={cls(classes.e('body'), classNames?.body)}>{children}</div>
          {footerVisible ? (
            <div className={cls(classes.e('footer'), classNames?.footer)}>
              {customFooter !== undefined ? (
                customFooter
              ) : (
                <div className={classes.e('default-footer')}>
                  {cancelButton ? (
                    <Button
                      plain
                      size="medium"
                      variant="normal"
                      {...cancelButtonRest}
                      onClick={event => {
                        onCancelButtonClick?.(event);
                        if (event.defaultPrevented) return;
                        callbacksRef.current.onCancel?.();
                        requestClose('cancel');
                      }}
                    >
                      {cancelButtonText || config.drawerLabels.cancel}
                    </Button>
                  ) : null}
                  {okButton ? (
                    <Button
                      size="medium"
                      variant="primary"
                      {...okButtonRest}
                      loading={loading}
                      onClick={event => {
                        onOkButtonClick?.(event);
                        if (!event.defaultPrevented) callbacksRef.current.onOk?.();
                      }}
                    >
                      {okButtonText || config.drawerLabels.ok}
                    </Button>
                  ) : null}
                </div>
              )}
            </div>
          ) : null}
          {sizeDraggable ? (
            <div
              className={cls(classes.e('draggable'), classes.em('draggable', placement))}
              ref={resizeHandleRef}
            />
          ) : null}
        </div>
      </div>
    </div>
  );

  return portal && portalElement ? createPortal(content, portalElement) : content;
});

export const HDrawer = Drawer;
