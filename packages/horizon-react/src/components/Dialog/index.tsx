import type {
  CSSProperties,
  HTMLAttributes,
  PointerEvent as ReactPointerEvent,
  ReactElement,
  ReactNode,
} from 'react';
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
  DialogCommandMap,
  DialogCommonProps,
  DialogOpenChangeDetails,
  DialogOpenReason,
} from '@aurora/core';
import { DIALOG_DEFAULTS, DialogController } from '@aurora/core';
import type { DialogInteractionLayer, PortalTarget } from '@aurora/horizon-core';
import { createDialogInteractionLayer, resolvePortalContainer } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Button, type ButtonProps } from '../Button';

type SharedDialogProps = Omit<
  DialogCommonProps<Partial<ButtonProps>, Partial<ButtonProps>>,
  'iconColor' | 'iconName' | 'title'
>;

export interface DialogClassNames {
  header?: string;
  body?: string;
  footer?: string;
  mask?: string;
  wrapper?: string;
}

export type DialogProps = SharedDialogProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'title'> & {
    /** 对话框正文。 @en Dialog body content. */
    children?: ReactNode;
    /** 标题内容。 @en Dialog title content. */
    title?: ReactNode;
    /** 标题前图标。 @en Icon displayed before the title. */
    icon?: ReactNode;
    /** 自定义底部操作区。 @en Custom footer actions. */
    footer?: ReactNode;
    /** 无可见标题时的可访问名称。 @en Accessible name when no visible title exists. */
    ariaLabel?: string;
    /** Portal 容器。 @en Portal destination. */
    portalContainer?: PortalTarget;
    /** 是否使用 Portal。 @en Whether to render through a Portal. */
    portal?: boolean;
    /** 内置区域 class。 @en Classes for built-in regions. */
    classNames?: DialogClassNames;
    onOpenChange?: (open: boolean, details: DialogOpenChangeDetails) => void;
    onOk?: () => void;
    onCancel?: () => void;
    onOpen?: () => void;
    onOpened?: () => void;
    onClose?: () => void;
    onClosed?: () => void;
    onCloseIconClick?: () => void;
    onMaskClick?: () => void;
    onClosePendingChange?: (pending: boolean) => void;
  };

export interface DialogHandle extends DialogCommandMap {
  /** 聚焦对话框。 @en Focuses the dialog. */
  focus(): void;
  /** 对话框元素。 @en Dialog element. */
  readonly dialog: HTMLDivElement | null;
}

let nextDialogZIndex = 2000;

function toCssUnit(value: string | number | undefined): string | undefined {
  return typeof value === 'number' ? `${value}px` : value;
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

export const Dialog = forwardRef<DialogHandle, DialogProps>(function Dialog(
  {
    children,
    title,
    icon,
    footer,
    open,
    defaultOpen = DIALOG_DEFAULTS.defaultOpen,
    top,
    size = DIALOG_DEFAULTS.size,
    mask = DIALOG_DEFAULTS.mask,
    maskClose = DIALOG_DEFAULTS.maskClose,
    escClose = DIALOG_DEFAULTS.escClose,
    closeButton = DIALOG_DEFAULTS.closeButton,
    okButtonProps = DIALOG_DEFAULTS.okButtonProps,
    okText,
    cancelButtonProps = DIALOG_DEFAULTS.cancelButtonProps,
    cancelText,
    beforeClose,
    destroyOnClose = DIALOG_DEFAULTS.destroyOnClose,
    zIndex,
    lockScroll = DIALOG_DEFAULTS.lockScroll,
    draggable = DIALOG_DEFAULTS.draggable,
    portal = true,
    portalContainer = 'body',
    ariaLabel,
    classNames,
    onOpenChange,
    onOk,
    onCancel,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    onCloseIconClick,
    onMaskClick,
    onClosePendingChange,
    className,
    style,
    ...nativeProps
  },
  forwardedRef,
): ReactElement | null {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('dialog', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<DialogInteractionLayer | null>(null);
  const controlledRef = useRef(open !== undefined);
  const callbacksRef = useRef({
    onCancel,
    onClose,
    onClosed,
    onCloseIconClick,
    onClosePendingChange,
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
  const [layerZIndex, setLayerZIndex] = useState(zIndex ?? nextDialogZIndex);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<
    { pointerId: number; x: number; y: number; ox: number; oy: number } | undefined
  >(undefined);
  controlledRef.current = open !== undefined;
  callbacksRef.current = {
    onCancel,
    onClose,
    onClosed,
    onCloseIconClick,
    onClosePendingChange,
    onMaskClick,
    onOk,
    onOpen,
    onOpened,
    onOpenChange,
  };
  const currentOpen = open ?? uncontrolledOpen;
  const previousOpen = useRef(false);
  const controllerRef = useRef<DialogController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new DialogController({
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
    setPortalElement(resolvePortalContainer(portalContainer, dialogRef.current?.ownerDocument));
    setPortalReady(true);
  }, [portalContainer]);

  const requestClose = useCallback(
    (reason: DialogOpenReason = 'imperative') => {
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
      setLayerZIndex(zIndex ?? ++nextDialogZIndex);
      callbacksRef.current.onOpen?.();
      queueMicrotask(() => callbacksRef.current.onOpened?.());
    } else {
      callbacksRef.current.onClose?.();
      setDragOffset({ x: 0, y: 0 });
      queueMicrotask(() => callbacksRef.current.onClosed?.());
    }
  }, [currentOpen, zIndex]);

  useEffect(() => {
    if (!currentOpen || !dialogRef.current || (portal && !portalReady)) return;
    const dialog = dialogRef.current;
    const layer = createDialogInteractionLayer(dialog, {
      dismissOnEscape: escClose,
      dismissOnOutsidePointer: Boolean(mask && maskClose),
      initialFocus: dialog,
      lockScroll,
      onDismiss(reason) {
        if (reason === 'outside-pointer') {
          callbacksRef.current.onMaskClick?.();
          requestClose('mask');
        } else requestClose('escape');
      },
    });
    layerRef.current = layer;
    layer.activate();
    return () => {
      layer.deactivate();
      if (layerRef.current === layer) layerRef.current = null;
    };
  }, [
    currentOpen,
    escClose,
    lockScroll,
    mask,
    maskClose,
    portal,
    portalElement,
    portalReady,
    requestClose,
  ]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      open: requestOpen,
      close: () => requestClose('imperative'),
      focus: () => dialogRef.current?.focus(),
      get dialog() {
        return dialogRef.current;
      },
    }),
    [requestClose, requestOpen],
  );

  const handleDragStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable || event.button !== 0 || !currentOpen) return;
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      ox: dragOffset.x,
      oy: dragOffset.y,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const handleDragMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setDragOffset({ x: drag.ox + event.clientX - drag.x, y: drag.oy + event.clientY - drag.y });
  };
  const handleDragEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = undefined;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  if (destroyOnClose && !currentOpen) return null;

  const resolvedOkProps: Partial<ButtonProps> =
    typeof okButtonProps === 'object' ? okButtonProps : {};
  const resolvedCancelProps: Partial<ButtonProps> =
    typeof cancelButtonProps === 'object' ? cancelButtonProps : {};
  const { onClick: onOkButtonClick, ...okButtonRest } = resolvedOkProps;
  const { onClick: onCancelButtonClick, ...cancelButtonRest } = resolvedCancelProps;
  const dialogStyle: CSSProperties = {
    zIndex: layerZIndex + 1,
    top: top === undefined ? undefined : toCssUnit(top),
    transform:
      top === undefined
        ? `translate(${dragOffset.x}px, calc(-50% + ${dragOffset.y}px))`
        : `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
  };
  const content = (
    <div
      {...nativeProps}
      className={cls(classes.block, className)}
      style={{ ...style, zIndex: layerZIndex }}
    >
      {mask && currentOpen ? (
        <div className={cls(classes.e('mask'), classNames?.mask)} style={{ zIndex: layerZIndex }} />
      ) : null}
      <div
        aria-busy={closePending || undefined}
        aria-label={title ? undefined : ariaLabel || config.dialogLabels.dialog}
        aria-labelledby={title ? titleId : undefined}
        aria-modal="true"
        className={cls(
          classes.e('container'),
          classes.m(size),
          classes.m('center'),
          classNames?.wrapper,
        )}
        hidden={!currentOpen}
        ref={dialogRef}
        role="dialog"
        style={dialogStyle}
        tabIndex={-1}
      >
        <div className={classes.e('inner')}>
          {icon ? <div className={classes.e('icon-box')}>{icon}</div> : null}
          <div className={cls(classes.e('main'), icon ? classes.em('main', 'icon-offset') : '')}>
            {title ? (
              <div
                className={cls(
                  classes.e('header'),
                  classes.em('header', 'draggable', draggable),
                  classes.em('header', 'moving', Boolean(dragRef.current)),
                  classNames?.header,
                )}
                onPointerCancel={handleDragEnd}
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
              >
                <div className={classes.e('default-title')}>
                  <div className={classes.em('default-title', 'text')} id={titleId}>
                    {title}
                  </div>
                  {closeButton ? (
                    <Button
                      aria-label={config.dialogLabels.close}
                      className={classes.e('header-close')}
                      icon={<CloseIcon />}
                      size="small"
                      text
                      variant="normal"
                      onClick={event => {
                        event.stopPropagation();
                        callbacksRef.current.onCloseIconClick?.();
                        requestClose('close-button');
                      }}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className={cls(classes.e('body'), classNames?.body)}>{children}</div>
            {footer !== undefined || okButtonProps || cancelButtonProps ? (
              <div className={cls(classes.e('footer'), classNames?.footer)}>
                {footer !== undefined ? (
                  footer
                ) : (
                  <div className={classes.e('default-footer')}>
                    {cancelButtonProps ? (
                      <Button
                        plain
                        variant="normal"
                        {...cancelButtonRest}
                        onClick={event => {
                          onCancelButtonClick?.(event);
                          if (event.defaultPrevented) return;
                          callbacksRef.current.onCancel?.();
                          requestClose('cancel');
                        }}
                      >
                        {cancelText || config.dialogLabels.cancel}
                      </Button>
                    ) : null}
                    {okButtonProps ? (
                      <Button
                        {...okButtonRest}
                        onClick={event => {
                          onOkButtonClick?.(event);
                          if (!event.defaultPrevented) callbacksRef.current.onOk?.();
                        }}
                      >
                        {okText || config.dialogLabels.ok}
                      </Button>
                    ) : null}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return portal && portalElement ? createPortal(content, portalElement) : content;
});

export const HDialog = Dialog;
