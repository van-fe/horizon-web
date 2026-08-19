import type { HTMLAttributes, MouseEvent, ReactElement, ReactNode } from 'react';
import {
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  PopconfirmChangeDetails,
  PopconfirmCommandMap,
  PopconfirmCommonProps,
  PopconfirmOpenReason,
} from '@aurora/core';
import { POPCONFIRM_DEFAULTS, PopconfirmController } from '@aurora/core';
import type { PortalTarget } from '@aurora/horizon-core';
import { focusPopconfirmAction } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Button, type ButtonProps } from '../Button';
import { Popover, type PopoverHandle } from '../Popover';

type TriggerElement = ReactElement<HTMLAttributes<HTMLElement>>;

export type PopconfirmProps = PopconfirmCommonProps<Partial<ButtonProps>, Partial<ButtonProps>> &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    'children' | 'content' | 'onChange' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'
  > & {
    /** 唯一触发元素。 @en The single trigger element. */
    children: TriggerElement;
    /** 自定义确认内容。 @en Custom confirmation content. */
    content?: ReactNode;
    /** 自定义状态图标。 @en Custom status icon. */
    icon?: ReactNode;
    /** Portal 容器。 @en Portal destination. */
    portalContainer?: PortalTarget;
    /** 是否使用 Portal。 @en Whether to render through a Portal. */
    portal?: boolean;
    /** CSS 层级。 @en Floating z-index. */
    zIndex?: number;
    /** 打开状态变化。 @en Reports requested open-state changes. */
    onOpenChange?: (open: boolean, details: PopconfirmChangeDetails) => void;
    /** 确认完成。 @en Called after confirmation succeeds. */
    onConfirm?: (event: MouseEvent<HTMLElement>) => void;
    /** 取消确认。 @en Called when confirmation is cancelled. */
    onCancel?: (event: MouseEvent<HTMLElement>) => void;
    /** 确认守卫失败。 @en Called when the confirmation guard rejects. */
    onConfirmError?: (error: unknown) => void;
  };

export interface PopconfirmHandle extends PopconfirmCommandMap {
  /** 触发元素。 @en Trigger element. */
  readonly trigger: HTMLElement | null;
  /** 确认浮层。 @en Confirmation dialog. */
  readonly dialog: HTMLDivElement | null;
}

function mapOpenReason(reason: string): PopconfirmOpenReason {
  if (reason === 'outside-pointer' || reason === 'escape' || reason === 'imperative') return reason;
  return 'trigger';
}

function WarningIcon(): ReactElement {
  return (
    <svg aria-hidden="true" height="20" viewBox="0 0 20 20" width="20">
      <path
        d="M10 1.75 18.25 17H1.75L10 1.75Zm0 4.1a.8.8 0 0 0-.8.8v4.7a.8.8 0 1 0 1.6 0v-4.7a.8.8 0 0 0-.8-.8Zm0 8.05a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const Popconfirm = forwardRef<PopconfirmHandle, PopconfirmProps>(function Popconfirm(
  {
    children,
    content,
    icon,
    title,
    open,
    defaultOpen = POPCONFIRM_DEFAULTS.defaultOpen,
    disabled = POPCONFIRM_DEFAULTS.disabled,
    placement = POPCONFIRM_DEFAULTS.placement,
    confirmText,
    cancelText,
    confirmButtonProps,
    cancelButtonProps,
    beforeConfirm,
    portal = true,
    portalContainer = 'body',
    zIndex = 1000,
    onOpenChange,
    onConfirm,
    onCancel,
    onConfirmError,
    className,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  if (!isValidElement(children)) throw new Error('Popconfirm requires one valid trigger element.');
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('popconfirm', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const contentId = useId();
  const popoverRef = useRef<PopoverHandle | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const controlledRef = useRef(open !== undefined);
  const callbacksRef = useRef({ onCancel, onConfirm, onConfirmError, onOpenChange });
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [pending, setPending] = useState(false);
  controlledRef.current = open !== undefined;
  callbacksRef.current = { onCancel, onConfirm, onConfirmError, onOpenChange };
  const currentOpen = !disabled && (open ?? uncontrolledOpen);
  const previousOpen = useRef(currentOpen);
  const controllerRef = useRef<PopconfirmController<MouseEvent<HTMLElement>> | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new PopconfirmController({
      open,
      defaultOpen,
      disabled,
      beforeConfirm,
      onOpenChange: (nextOpen, details) => {
        if (!controlledRef.current) setUncontrolledOpen(nextOpen);
        callbacksRef.current.onOpenChange?.(nextOpen, details);
      },
      onPendingChange: setPending,
      onConfirm: event => callbacksRef.current.onConfirm?.(event),
      onCancel: event => callbacksRef.current.onCancel?.(event),
    });
  }
  const controller = controllerRef.current;

  useEffect(() => {
    controller.setOptions({
      open,
      disabled,
      beforeConfirm,
      onOpenChange: (nextOpen, details) => {
        if (!controlledRef.current) setUncontrolledOpen(nextOpen);
        callbacksRef.current.onOpenChange?.(nextOpen, details);
      },
      onPendingChange: setPending,
      onConfirm: event => callbacksRef.current.onConfirm?.(event),
      onCancel: event => callbacksRef.current.onCancel?.(event),
    });
    controller.syncOpen(currentOpen);
  }, [beforeConfirm, controller, currentOpen, disabled, open]);

  useEffect(() => {
    if (previousOpen.current && !currentOpen) popoverRef.current?.reference?.focus();
    previousOpen.current = currentOpen;
  }, [currentOpen]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      open: () => controller.requestOpen('imperative'),
      close: () => controller.requestClose('imperative'),
      get trigger() {
        return popoverRef.current?.reference ?? null;
      },
      get dialog() {
        return dialogRef.current;
      },
    }),
    [controller],
  );

  const { onClick: onConfirmButtonClick, ...confirmButtonRest } = confirmButtonProps ?? {};
  const { onClick: onCancelButtonClick, ...cancelButtonRest } = cancelButtonProps ?? {};
  const handleConfirm = async (event: MouseEvent<HTMLElement>) => {
    onConfirmButtonClick?.(event);
    if (event.defaultPrevented) return;
    controller.syncOpen(currentOpen);
    const result = await controller.confirm(event);
    if (result.status === 'rejected') callbacksRef.current.onConfirmError?.(result.error);
  };
  const handleCancel = (event: MouseEvent<HTMLElement>) => {
    onCancelButtonClick?.(event);
    if (!event.defaultPrevented) {
      controller.syncOpen(currentOpen);
      controller.cancel(event);
    }
  };

  return (
    <Popover
      {...nativeProps}
      aria-busy={pending || undefined}
      aria-labelledby={contentId}
      arrow={false}
      className={cls(classes.block, className)}
      content={
        <div ref={dialogRef}>
          <div className={classes.e('body')}>
            <span className={classes.e('icon')}>{icon ?? <WarningIcon />}</span>
            <span className={classes.e('content')} id={contentId}>
              {content ?? title}
            </span>
          </div>
          <div className={classes.e('footer')}>
            <Button
              plain
              size="small"
              {...cancelButtonRest}
              data-popconfirm-action="cancel"
              onClick={handleCancel}
            >
              {cancelText || config.popconfirmLabels.cancel}
            </Button>
            <Button
              size="small"
              {...confirmButtonRest}
              data-popconfirm-action="confirm"
              loading={pending || Boolean(confirmButtonRest.loading)}
              onClick={handleConfirm}
            >
              {confirmText || config.popconfirmLabels.confirm}
            </Button>
          </div>
        </div>
      }
      disabled={disabled}
      onOpenChange={(nextOpen, details) => {
        if (nextOpen) controller.requestOpen(mapOpenReason(details.reason));
        else controller.requestClose(mapOpenReason(details.reason));
      }}
      onShow={() =>
        queueMicrotask(() => dialogRef.current && focusPopconfirmAction(dialogRef.current))
      }
      open={currentOpen}
      placement={placement}
      portal={portal}
      portalContainer={portalContainer}
      ref={popoverRef}
      role="alertdialog"
      trigger="click"
      zIndex={zIndex}
    >
      {children}
    </Popover>
  );
});

export const HPopconfirm = Popconfirm;
