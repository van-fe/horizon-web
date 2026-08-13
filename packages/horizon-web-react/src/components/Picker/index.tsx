import type {
  ChangeEvent,
  CompositionEvent,
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type {
  PickerCommonProps,
  PickerInputStatus,
  PickerOpenChangeDetails,
  PickerOpenReason,
  PickerStatus,
  PickerValue,
} from '@aurora/core';
import { PickerController, PICKER_DEFAULTS, resolvePickerStatus } from '@aurora/core';
import type { PortalTarget, PositionerInstance } from '@aurora/horizon-web-core';
import {
  createPickerDismissableLayer,
  createPopoverPositioner,
  resolvePortalContainer,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Button } from '../Button';
import type { ButtonProps } from '../Button';
import { useFormFieldControl } from '../Form/context';
import { LoadingIcon } from '../_shared/LoadingIcon';

export type PickerSize = 'small' | 'medium' | 'large';

export interface PickerRenderContext<Value = PickerValue> {
  value: Value;
  open: boolean;
  status: PickerStatus;
  inputStatus: PickerInputStatus;
  close(): void;
  confirm(): void;
  cancel(): void;
}

export interface PickerTriggerContext<Value = PickerValue> extends PickerRenderContext<Value> {
  triggerProps: {
    'aria-controls'?: string;
    'aria-expanded': boolean;
    'aria-haspopup': 'dialog';
    'aria-invalid'?: boolean;
    'aria-labelledby'?: string;
    'aria-readonly': boolean;
    disabled: boolean;
    onBlur(event: FocusEvent<HTMLElement>): void;
    onClick(event: MouseEvent<HTMLElement>): void;
    onFocus(event: FocusEvent<HTMLElement>): void;
    onKeyDown(event: KeyboardEvent<HTMLElement>): void;
    ref(node: HTMLElement | null): void;
  };
}

export interface PickerHandle {
  readonly input: HTMLInputElement | null;
  readonly popup: HTMLDivElement | null;
  focus(): void;
  blur(): void;
  open(): void;
  close(): void;
  clear(): void;
  updatePosition(): Promise<void>;
}

export interface PickerProps<Value = PickerValue>
  extends
    Omit<
      PickerCommonProps<Value>,
      | 'confirmButtonOptions'
      | 'cancelButtonOptions'
      | 'portal'
      | 'inputVariant'
      | 'confirmText'
      | 'cancelText'
      | 'clearText'
    >,
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onInput' | 'prefix'> {
  /** 输入框视觉变体。 @en Trigger input visual variant. */
  inputStyle?: PickerCommonProps<Value>['inputVariant'];
  /** 值变化回调。 @en Called when the display value changes. */
  onValueChange?: (value: Value) => void;
  /** 面板状态变化回调。 @en Called when popup state changes. */
  onOpenChange?: (open: boolean, details: PickerOpenChangeDetails) => void;
  /** 展示值格式化。 @en Formats the value displayed by the trigger. */
  formatValue?: (value: Value) => ReactNode;
  /** 将输入文字转换为值。 @en Parses editable input text into a value. */
  parseInput?: (text: string) => Value;
  /** 清空后使用的值。 @en Value committed after clearing. */
  clearValue?: Value;
  /** 面板内容或渲染函数。 @en Popup content or render function. */
  children?: ReactNode | ((context: PickerRenderContext<Value>) => ReactNode);
  /** 完整触发器内容。 @en Complete custom trigger content. */
  renderTrigger?: (context: PickerTriggerContext<Value>) => ReactNode;
  /** 触发器前缀。 @en Trigger prefix content. */
  prefix?: ReactNode;
  /** 触发器后缀。 @en Trigger suffix content. */
  suffix?: ReactNode;
  /** 面板头部。 @en Popup header content. */
  panelHeader?: ReactNode;
  /** 面板底部。 @en Popup footer content. */
  panelFooter?: ReactNode;
  /** 加载状态内容。 @en Loading-state content. */
  loadingContent?: ReactNode;
  /** 空状态内容。 @en Empty-state content. */
  emptyContent?: ReactNode;
  /** Portal 容器。 @en Portal destination. */
  portalContainer?: PortalTarget;
  /** 是否通过 Portal 渲染。 @en Whether the popup renders through a portal. */
  portal?: boolean;
  /** 面板类名。 @en Popup class name. */
  panelClassName?: string;
  /** 面板样式。 @en Popup style. */
  panelStyle?: CSSProperties;
  /** 默认输入框的原生 ARIA 与数据属性。 @en Native ARIA and data attributes for the default input. */
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'defaultValue'
    | 'disabled'
    | 'onBlur'
    | 'onChange'
    | 'onClick'
    | 'onCompositionEnd'
    | 'onCompositionStart'
    | 'onFocus'
    | 'onInput'
    | 'onKeyDown'
    | 'placeholder'
    | 'readOnly'
    | 'ref'
    | 'value'
  >;
  /** 确认按钮文字。 @en Confirm button text. */
  confirmText?: string;
  /** 取消按钮文字。 @en Cancel button text. */
  cancelText?: string;
  /** 确认按钮属性。 @en Confirm button properties. */
  confirmButtonProps?: ButtonProps;
  /** 取消按钮属性。 @en Cancel button properties. */
  cancelButtonProps?: ButtonProps;
  /** 清空操作文字。 @en Clear action text. */
  clearText?: string;
  /** 确认回调。 @en Confirm callback. */
  onConfirm?: (event?: MouseEvent<HTMLElement>) => void;
  /** 取消回调。 @en Cancel callback. */
  onCancel?: (event?: MouseEvent<HTMLElement>) => void;
  /** 清空回调。 @en Clear callback. */
  onClear?: (event?: MouseEvent<HTMLElement>) => void;
  /** 输入事件。 @en Editable input callback. */
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** 聚焦回调。 @en Focus callback. */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /** 失焦回调。 @en Blur callback. */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** 键盘回调。 @en Keyboard callback. */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  /** 点击触发器回调。 @en Trigger click callback. */
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
}

function defaultFormatValue(value: PickerValue): string {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return '';
}

function defaultParseInput<Value>(value: string): Value {
  return value as Value;
}

function hasContent(content: ReactNode): boolean {
  return content !== undefined && content !== null && content !== false && content !== '';
}

function PickerImplementation<Value = PickerValue>(
  {
    value,
    defaultValue,
    open,
    defaultOpen = PICKER_DEFAULTS.defaultOpen,
    disabled = PICKER_DEFAULTS.disabled,
    loading = PICKER_DEFAULTS.loading,
    clearable = PICKER_DEFAULTS.clearable,
    trigger = PICKER_DEFAULTS.trigger,
    placement = PICKER_DEFAULTS.placement,
    distance = PICKER_DEFAULTS.distance,
    skidding,
    portal = PICKER_DEFAULTS.portal,
    portalContainer = 'body',
    inputable = PICKER_DEFAULTS.inputable,
    readonly = PICKER_DEFAULTS.readonly,
    inputStyle = PICKER_DEFAULTS.inputVariant,
    size,
    placeholder,
    arrow = PICKER_DEFAULTS.arrow,
    needConfirm = PICKER_DEFAULTS.needConfirm,
    confirmText,
    cancelText,
    confirmButtonProps,
    cancelButtonProps,
    clearText,
    confirmDisabled = PICKER_DEFAULTS.confirmDisabled,
    cancelDisabled = PICKER_DEFAULTS.cancelDisabled,
    showConfirmAction = PICKER_DEFAULTS.showConfirmAction,
    showCancelAction = PICKER_DEFAULTS.showCancelAction,
    showClearAction = PICKER_DEFAULTS.showClearAction,
    confirmAreaSize = PICKER_DEFAULTS.confirmAreaSize,
    destroyOnHide = PICKER_DEFAULTS.destroyOnHide,
    inputStatus = PICKER_DEFAULTS.inputStatus,
    panelStatus = PICKER_DEFAULTS.panelStatus,
    fitInputWidth = PICKER_DEFAULTS.fitInputWidth,
    hoverShowDelay = PICKER_DEFAULTS.hoverShowDelay,
    hoverHideDelay = PICKER_DEFAULTS.hoverHideDelay,
    canOpen = PICKER_DEFAULTS.canOpen,
    formatValue = defaultFormatValue as (value: Value) => ReactNode,
    parseInput = defaultParseInput,
    clearValue = '' as Value,
    children,
    renderTrigger,
    prefix,
    suffix,
    panelHeader,
    panelFooter,
    loadingContent,
    emptyContent,
    panelClassName,
    panelStyle,
    inputProps,
    onValueChange,
    onOpenChange,
    onConfirm,
    onCancel,
    onClear,
    onInput,
    onFocus,
    onBlur,
    onKeyDown,
    onClick,
    className,
    style,
    ...nativeProps
  }: PickerProps<Value>,
  forwardedRef: React.ForwardedRef<PickerHandle>,
): ReactElement {
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const classes = useMemo(
    () => new ComponentClassBlock('picker', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const popupId = `${useId().replaceAll(':', '')}-picker-popup`;
  const resolvedSize = size ?? config.size;
  const resolvedDisabled = disabled || formField?.disabled === true;
  const [uncontrolledValue, setUncontrolledValue] = useState<Value>(
    (defaultValue === undefined ? clearValue : defaultValue) as Value,
  );
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [, forceRender] = useReducer(count => count + 1, 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const positionerRef = useRef<PositionerInstance>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [portalTarget, setPortalTarget] = useState<Element>();
  const controlledValueRef = useRef(value !== undefined);
  const controlledOpenRef = useRef(open !== undefined);
  const currentValue = (value === undefined ? uncontrolledValue : value) as Value;
  const currentOpen = !resolvedDisabled && (open === undefined ? uncontrolledOpen : open);
  const currentValueRef = useRef(currentValue);
  const currentOpenRef = useRef(currentOpen);
  const formFieldRef = useRef(formField);
  const clearValueRef = useRef(clearValue);
  const callbackRef = useRef({ onValueChange, onOpenChange });
  controlledValueRef.current = value !== undefined;
  controlledOpenRef.current = open !== undefined;
  currentValueRef.current = currentValue;
  currentOpenRef.current = currentOpen;
  formFieldRef.current = formField;
  clearValueRef.current = clearValue;
  callbackRef.current = { onValueChange, onOpenChange };

  const controllerRef = useRef<PickerController<Value>>(null);
  if (!controllerRef.current) {
    controllerRef.current = new PickerController<Value>({
      value: currentValue,
      open: currentOpen,
      disabled: resolvedDisabled,
      readonly,
      trigger,
      canOpen,
      panelStatus,
      onValueChange: nextValue => {
        if (!controlledValueRef.current) setUncontrolledValue(nextValue);
        callbackRef.current.onValueChange?.(nextValue);
        formFieldRef.current?.notify('change');
      },
      onOpenChange: (nextOpen, details) => {
        if (!controlledOpenRef.current) setUncontrolledOpen(nextOpen);
        callbackRef.current.onOpenChange?.(nextOpen, details);
        forceRender();
      },
      onClear: () => clearValueRef.current,
    });
  }
  const controller = controllerRef.current;

  useLayoutEffect(() => {
    controller.setOptions({ disabled: resolvedDisabled, readonly, trigger, canOpen, panelStatus });
    controller.syncState({ value: currentValue, open: currentOpen, disabled: resolvedDisabled });
    forceRender();
  }, [
    canOpen,
    controller,
    currentOpen,
    currentValue,
    panelStatus,
    readonly,
    resolvedDisabled,
    trigger,
  ]);

  useEffect(
    () => () => {
      if (hoverTimerRef.current !== null) clearTimeout(hoverTimerRef.current);
    },
    [],
  );

  useLayoutEffect(() => {
    setPortalTarget(resolvePortalContainer(portalContainer, triggerRef.current?.ownerDocument));
  }, [portalContainer]);

  useLayoutEffect(() => {
    const input = triggerRef.current;
    const popup = popupRef.current;
    if (!currentOpen || !input || !popup) return;
    const positioner = createPopoverPositioner(input, popup, {
      placement,
      distance,
      skidding,
      flip: true,
      shift: true,
      arrowElement: arrow ? arrowRef.current : undefined,
      sameWidth: fitInputWidth === true,
      setMinWidth: fitInputWidth === 'fit-content',
      observeResize: true,
    });
    positionerRef.current = positioner;
    return () => {
      positioner.destroy();
      if (positionerRef.current === positioner) positionerRef.current = null;
    };
  }, [arrow, currentOpen, distance, fitInputWidth, placement, portalTarget, skidding]);

  useEffect(() => {
    const input = triggerRef.current;
    const popup = popupRef.current;
    if (!currentOpen || !input || !popup || trigger === 'hover') return;
    return createPickerDismissableLayer({
      floating: popup,
      reference: input,
      onDismiss: reason => {
        controller.syncState({ open: currentOpenRef.current });
        controller.close(reason);
        if (reason === 'escape') input.focus();
      },
    });
  }, [controller, currentOpen, trigger]);

  function requestOpen(reason: PickerOpenReason): void {
    controller.syncState({ value: currentValueRef.current, open: currentOpenRef.current });
    controller.open(reason);
  }

  function requestClose(reason: PickerOpenReason): void {
    controller.syncState({ value: currentValueRef.current, open: currentOpenRef.current });
    controller.close(reason);
  }

  function clear(event?: MouseEvent<HTMLElement>): void {
    controller.syncState({ value: currentValueRef.current, open: currentOpenRef.current });
    if (controller.clear().cleared) {
      onClear?.(event);
      inputRef.current?.focus();
    }
  }

  function confirm(event?: MouseEvent<HTMLElement>): void {
    onConfirm?.(event);
    requestClose('confirm');
  }

  function cancel(event?: MouseEvent<HTMLElement>): void {
    onCancel?.(event);
    requestClose('cancel');
  }

  function scheduleHover(nextOpen: boolean): void {
    if (trigger !== 'hover' || resolvedDisabled) return;
    if (hoverTimerRef.current !== null) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(
      () => {
        hoverTimerRef.current = null;
        if (nextOpen) requestOpen('hover');
        else requestClose('hover');
      },
      nextOpen ? hoverShowDelay : hoverHideDelay,
    );
  }

  useImperativeHandle(forwardedRef, () => ({
    get input() {
      return inputRef.current;
    },
    get popup() {
      return popupRef.current;
    },
    focus: () => triggerRef.current?.focus(),
    blur: () => triggerRef.current?.blur(),
    open: () => requestOpen('imperative'),
    close: () => requestClose('imperative'),
    clear: () => clear(),
    async updatePosition() {
      await positionerRef.current?.update();
    },
  }));

  const status = resolvePickerStatus(currentOpen, panelStatus);
  const context: PickerRenderContext<Value> = {
    value: currentValue,
    open: currentOpen,
    status,
    inputStatus,
    close: () => requestClose('imperative'),
    confirm: () => confirm(),
    cancel: () => cancel(),
  };
  const triggerProps: PickerTriggerContext<Value>['triggerProps'] = {
    'aria-controls': currentOpen ? popupId : undefined,
    'aria-expanded': currentOpen,
    'aria-haspopup': 'dialog',
    'aria-invalid': inputStatus === 'error' || formField?.invalid || undefined,
    'aria-labelledby': formField?.labelId,
    'aria-readonly': !inputable || readonly,
    disabled: resolvedDisabled,
    ref: node => {
      triggerRef.current = node;
    },
    onBlur: event => {
      controller.blur();
      if (event.currentTarget instanceof HTMLInputElement) {
        onBlur?.(event as FocusEvent<HTMLInputElement>);
      }
    },
    onClick: event => {
      if (event.currentTarget instanceof HTMLInputElement) {
        onClick?.(event as MouseEvent<HTMLInputElement>);
      }
      if (event.defaultPrevented || trigger !== 'click' || readonly) return;
      if (!currentOpen) requestOpen('trigger');
      else if (!inputable) requestClose('trigger');
    },
    onFocus: event => {
      controller.focus();
      if (event.currentTarget instanceof HTMLInputElement) {
        onFocus?.(event as FocusEvent<HTMLInputElement>);
      }
      if (inputable && trigger !== 'never') requestOpen('focus');
    },
    onKeyDown: event => {
      if (event.currentTarget instanceof HTMLInputElement) {
        onKeyDown?.(event as KeyboardEvent<HTMLInputElement>);
      }
      if (event.defaultPrevented) return;
      if (event.key === 'Escape' && currentOpen) {
        event.preventDefault();
        requestClose('escape');
      } else if ((event.key === 'ArrowDown' || event.key === 'Enter') && !currentOpen) {
        event.preventDefault();
        requestOpen('trigger');
      } else if (event.key === 'Enter' && currentOpen && needConfirm) {
        event.preventDefault();
        confirm();
      }
    },
  };
  const formattedValue = formatValue(currentValue);
  const inputValue =
    typeof formattedValue === 'string' || typeof formattedValue === 'number'
      ? String(formattedValue)
      : '';
  const renderedContent = typeof children === 'function' ? children(context) : children;
  const showClear = clearable && !resolvedDisabled && !readonly && inputValue.length > 0;
  const popup =
    currentOpen || !destroyOnHide ? (
      <div
        aria-busy={loading || panelStatus === 'loading' || undefined}
        aria-hidden={!currentOpen || undefined}
        className={cls(classes.em('pop-content', 'wrapper'), 'h-popover--popper', panelClassName)}
        hidden={!currentOpen}
        id={popupId}
        ref={popupRef}
        role="dialog"
        style={panelStyle}
        onMouseEnter={() => scheduleHover(true)}
        onMouseLeave={() => scheduleHover(false)}
      >
        <div className={classes.e('pop-content')}>
          <div className={classes.em('pop-content', 'center')}>
            {panelHeader ? (
              <div className={classes.em('pop-content', 'prefix')}>{panelHeader}</div>
            ) : null}
            <div className={classes.em('pop-content', 'container')}>
              <div className={classes.em('pop-content', 'inner')}>
                {loading || panelStatus === 'loading' ? (
                  <div className={classes.em('pop-content', 'empty')} role="status">
                    {loadingContent ?? config.spinLabels.loading}
                  </div>
                ) : panelStatus === 'empty' || !hasContent(renderedContent) ? (
                  <div className={classes.em('pop-content', 'empty')}>
                    {emptyContent ?? config.selectLabels.empty}
                  </div>
                ) : (
                  renderedContent
                )}
              </div>
            </div>
            {needConfirm ? (
              <div
                className={cls(
                  classes.em('pop-content', 'confirm-wrapper'),
                  classes.is(confirmAreaSize),
                )}
              >
                {showClearAction ? (
                  <Button link size="small" onClick={event => clear(event)}>
                    {clearText ?? config.selectLabels.clear}
                  </Button>
                ) : (
                  <i />
                )}
                <div className={classes.em('pop-content', 'confirm-wrapper-buttons')}>
                  {showCancelAction ? (
                    <Button
                      {...cancelButtonProps}
                      plain
                      size="small"
                      variant="normal"
                      disabled={cancelDisabled || cancelButtonProps?.disabled}
                      onClick={event => {
                        cancelButtonProps?.onClick?.(event);
                        if (!event.defaultPrevented) cancel(event);
                      }}
                    >
                      {cancelText ?? config.pickerLabels.cancel}
                    </Button>
                  ) : null}
                  {showConfirmAction ? (
                    <Button
                      {...confirmButtonProps}
                      size="small"
                      disabled={confirmDisabled || confirmButtonProps?.disabled}
                      onClick={event => {
                        confirmButtonProps?.onClick?.(event);
                        if (!event.defaultPrevented) confirm(event);
                      }}
                    >
                      {confirmText ?? config.pickerLabels.confirm}
                    </Button>
                  ) : null}
                </div>
              </div>
            ) : null}
            {panelFooter ? (
              <div className={classes.em('pop-content', 'suffix')}>{panelFooter}</div>
            ) : null}
          </div>
        </div>
        {arrow ? (
          <span
            aria-hidden
            className={cls(classes.em('pop-content', 'arrow'), 'h-popover__arrow', 'is-light')}
            data-popper-arrow
            ref={arrowRef}
          />
        ) : null}
      </div>
    ) : null;

  return (
    <div
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m(inputStyle),
        classes.is('disabled', resolvedDisabled),
        classes.is('readonly', readonly),
        className,
      )}
      style={style}
      onMouseEnter={() => scheduleHover(true)}
      onMouseLeave={() => scheduleHover(false)}
    >
      {renderTrigger?.({ ...context, triggerProps }) ?? (
        <div
          className={cls(
            classes.e('input'),
            classes.em('input', resolvedSize ?? 'medium'),
            classes.em('input', inputStyle),
            classes.is('active', currentOpen),
            classes.is('inputable', inputable),
            classes.is('disabled', resolvedDisabled),
            classes.is('readonly', !inputable || readonly),
            classes.is(inputStatus),
          )}
        >
          {prefix ? <span className={classes.em('input', 'prepend-icon')}>{prefix}</span> : null}
          <span className={classes.em('input', 'container')}>
            <input
              {...triggerProps}
              {...inputProps}
              className={cls(
                classes.em('input', 'inner'),
                classes.is('main'),
                inputProps?.className,
              )}
              data-focus-visible-proxy=""
              disabled={resolvedDisabled}
              id={formField?.controlId}
              placeholder={placeholder ?? config.selectLabels.placeholder}
              readOnly={!inputable || readonly}
              ref={node => {
                inputRef.current = node;
                triggerProps.ref(node);
              }}
              role="combobox"
              value={inputValue}
              onBlur={triggerProps.onBlur}
              onChange={event => {
                if (!inputable || readonly) return;
                controller.syncState({ value: currentValueRef.current });
                controller.input(parseInput(event.currentTarget.value));
                onInput?.(event);
              }}
              onClick={triggerProps.onClick}
              onCompositionEnd={(_event: CompositionEvent<HTMLInputElement>) =>
                controller.endComposition()
              }
              onCompositionStart={(_event: CompositionEvent<HTMLInputElement>) =>
                controller.startComposition()
              }
              onFocus={triggerProps.onFocus}
              onKeyDown={triggerProps.onKeyDown}
            />
            {typeof formattedValue !== 'string' && typeof formattedValue !== 'number'
              ? formattedValue
              : null}
            {suffix}
          </span>
          {showClear ? (
            <button
              aria-label={config.selectLabels.clear}
              className={cls(classes.em('input', 'icon'), classes.is('clear'))}
              type="button"
              onClick={event => {
                event.stopPropagation();
                clear(event);
              }}
            >
              ×
            </button>
          ) : null}
          {loading ? (
            <span className={cls(classes.em('input', 'icon'), classes.is('loading'))}>
              <LoadingIcon namespace={config.namespace} />
            </span>
          ) : (
            <span aria-hidden className={classes.em('input', 'append-icon')}>
              ▾
            </span>
          )}
        </div>
      )}
      {popup && portal && portalTarget ? createPortal(popup, portalTarget) : popup}
    </div>
  );
}

export const Picker = forwardRef(PickerImplementation) as <Value = PickerValue>(
  props: PickerProps<Value> & { ref?: React.Ref<PickerHandle> },
) => ReactElement;

export const HPicker = Picker;
