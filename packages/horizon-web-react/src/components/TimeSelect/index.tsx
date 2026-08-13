import type { CSSProperties, FocusEventHandler, ReactElement, ReactNode } from 'react';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import type {
  SelectOpenChangeDetails,
  TimeSelectCommonProps,
  TimeSelectOption,
} from '@aurora/core';
import { createTimeSelectOptions, TIME_SELECT_DEFAULTS } from '@aurora/core';
import type { PortalTarget, WebPlacement } from '@aurora/horizon-web-core';
import { formatTimeSelectLabel } from '@aurora/horizon-web-core';
import type { SelectHandle, SelectSize } from '../Select';
import { Select } from '../Select';

export interface TimeSelectProps extends Omit<TimeSelectCommonProps, 'defaultValue' | 'value'> {
  /** 受控值。@en Controlled value. */
  value?: string;
  /** 非受控初始值。@en Initial uncontrolled value. */
  defaultValue?: string;
  /** 值变化回调。@en Called when the selected time changes. */
  onChange?: (value: string | undefined) => void;
  /** 面板显隐回调。@en Called when popup visibility changes. */
  onOpenChange?: (open: boolean, details: SelectOpenChangeDetails) => void;
  /** 聚焦回调。@en Focus callback. */
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLButtonElement>;
  /** 失焦回调。@en Blur callback. */
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLButtonElement>;
  /** 尺寸。@en Component size. */
  size?: SelectSize;
  /** 占位文字。@en Placeholder text. */
  placeholder?: string;
  /** 面板位置。@en Popup placement. */
  placement?: WebPlacement;
  /** 是否通过 Portal 渲染。@en Whether the popup uses a portal. */
  portal?: boolean;
  /** Portal 容器。@en Portal destination. */
  portalContainer?: PortalTarget;
  /** 空状态内容。@en Empty-state content. */
  emptyContent?: ReactNode;
  /** 面板头部。@en Popup header. */
  panelHeader?: ReactNode;
  /** 面板底部。@en Popup footer. */
  panelFooter?: ReactNode;
  /** 自定义选项。@en Custom option renderer. */
  renderOption?: (
    option: TimeSelectOption,
    state: { selected: boolean; active: boolean },
  ) => ReactNode;
  /** 表单字段名。@en Native form field name. */
  name?: string;
  /** 是否必填。@en Whether a value is required. */
  required?: boolean;
  /** 是否无效。@en Whether the field is invalid. */
  invalid?: boolean;
  /** 根元素类名。@en Root class name. */
  className?: string;
  /** 根元素样式。@en Root style. */
  style?: CSSProperties;
}

export interface TimeSelectHandle {
  focus(): void;
  blur(): void;
  clear(): void;
  open(): void;
  close(): void;
  updatePosition(): Promise<void>;
}

export const TimeSelect = forwardRef<TimeSelectHandle, TimeSelectProps>(function TimeSelect(
  {
    value,
    defaultValue,
    onChange,
    disabled = TIME_SELECT_DEFAULTS.disabled,
    editable = TIME_SELECT_DEFAULTS.editable,
    clearable = TIME_SELECT_DEFAULTS.clearable,
    start = TIME_SELECT_DEFAULTS.start,
    end = TIME_SELECT_DEFAULTS.end,
    step = TIME_SELECT_DEFAULTS.step,
    includeEndTime = TIME_SELECT_DEFAULTS.includeEndTime,
    minTime,
    maxTime,
    format = TIME_SELECT_DEFAULTS.format,
    renderOption,
    ...selectProps
  },
  forwardedRef,
): ReactElement {
  const selectRef = useRef<SelectHandle>(null);
  const options = useMemo(
    () =>
      createTimeSelectOptions({
        start,
        end,
        step,
        includeEndTime,
        minTime,
        maxTime,
        format: minutes => formatTimeSelectLabel(minutes, format),
      }),
    [end, format, includeEndTime, maxTime, minTime, start, step],
  );

  useImperativeHandle(
    forwardedRef,
    () => ({
      focus: () => selectRef.current?.focus(),
      blur: () => selectRef.current?.blur(),
      clear: () => selectRef.current?.clear(),
      open: () => selectRef.current?.open(),
      close: () => selectRef.current?.close(),
      updatePosition: () => selectRef.current!.updatePosition(),
    }),
    [],
  );

  return (
    <Select
      {...selectProps}
      clearable={clearable}
      defaultValue={defaultValue ?? undefined}
      disabled={disabled}
      filterable={editable}
      options={options}
      ref={selectRef}
      renderOption={
        renderOption
          ? (option, state) =>
              renderOption(
                {
                  value: String(option.value),
                  label: String(option.label),
                  disabled: Boolean(option.disabled),
                },
                state,
              )
          : undefined
      }
      value={value ?? undefined}
      onChange={nextValue => onChange?.(typeof nextValue === 'string' ? nextValue : undefined)}
    />
  );
});

export const HTimeSelect = TimeSelect;
