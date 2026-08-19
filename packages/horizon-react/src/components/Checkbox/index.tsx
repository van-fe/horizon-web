import type {
  CSSProperties,
  FocusEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
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
  AdaptComponentApiShape,
  CheckboxCommandMap,
  CheckboxCommonProps,
  CheckboxEventMap,
  CheckboxGroupCommonProps,
  CheckboxGroupEventMap,
  CheckboxLabelRegionContext,
  CheckboxValue,
  ChoiceValue,
  ComponentEventHandlers,
} from '@aurora/core';
import {
  CHECKBOX_DEFAULTS,
  CHECKBOX_GROUP_DEFAULTS,
  getCheckboxChecked,
  toggleCheckboxValue,
} from '@aurora/core';
import { syncCheckboxIndeterminate } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { useFormFieldControl } from '../Form/context';

export type {
  CheckboxChangeDetails,
  CheckboxValue,
  CheckboxVariant,
  ChoiceSize,
  ChoiceValue,
} from '@aurora/core';

type CheckboxReactEventMap = AdaptComponentApiShape<
  CheckboxEventMap<FocusEvent<HTMLInputElement>, MouseEvent<HTMLInputElement>>,
  { change: 'onChange'; blur: 'onBlur'; click: 'onClick' }
>;

type CheckboxReactCallbacks = ComponentEventHandlers<CheckboxReactEventMap>;

type CheckboxGroupReactEventMap = AdaptComponentApiShape<
  CheckboxGroupEventMap<FocusEvent<HTMLInputElement>>,
  { change: 'onChange'; blur: 'onBlur' }
>;

type CheckboxGroupReactCallbacks = ComponentEventHandlers<CheckboxGroupReactEventMap>;

export interface CheckboxHandle extends CheckboxCommandMap {
  focus: () => void;
  readonly input: HTMLInputElement | null;
}

export type CheckboxProps = CheckboxCommonProps &
  CheckboxReactCallbacks & {
    /** 标签内容或按状态渲染标签。@en Label content or a state-aware label renderer. */
    children?: ReactNode | ((context: CheckboxLabelRegionContext) => ReactNode);
    /** 根元素类名。@en Class name applied to the root element. */
    className?: string;
    /** 根元素样式。@en Style applied to the root element. */
    style?: CSSProperties;
    /** 原生输入属性。@en Native input attributes. */
    inputProps?: Omit<
      InputHTMLAttributes<HTMLInputElement>,
      | 'checked'
      | 'defaultChecked'
      | 'disabled'
      | 'onBlur'
      | 'onChange'
      | 'onClick'
      | 'readOnly'
      | 'type'
      | 'value'
    >;
  };

interface CheckboxGroupContextValue {
  value: readonly ChoiceValue[];
  disabled: boolean;
  readOnly: boolean;
  size: NonNullable<CheckboxGroupCommonProps['size']>;
  commit: (value: readonly ChoiceValue[]) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

function renderLabel(
  children: CheckboxProps['children'],
  context: CheckboxLabelRegionContext,
): ReactNode {
  return typeof children === 'function' ? children(context) : (children ?? String(context.value));
}

export const Checkbox = forwardRef<CheckboxHandle, CheckboxProps>(function Checkbox(
  {
    value,
    defaultValue = CHECKBOX_DEFAULTS.defaultValue,
    optionValue = CHECKBOX_DEFAULTS.optionValue,
    trueValue,
    falseValue,
    disabled = CHECKBOX_DEFAULTS.disabled,
    readOnly = CHECKBOX_DEFAULTS.readOnly,
    bordered = CHECKBOX_DEFAULTS.bordered,
    indeterminate = CHECKBOX_DEFAULTS.indeterminate,
    size,
    variant = CHECKBOX_DEFAULTS.variant,
    fill = CHECKBOX_DEFAULTS.fill,
    children,
    onChange,
    onBlur,
    onClick,
    className,
    style,
    inputProps,
  },
  ref,
): ReactElement | null {
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const group = useContext(CheckboxGroupContext);
  const classHelper = useMemo(
    () =>
      new ComponentClassBlock(
        variant === 'button' ? 'checkbox-button' : 'checkbox',
        config.namespace.toLowerCase(),
      ),
    [config.namespace, variant],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState<CheckboxValue>(defaultValue);
  const currentValue = group?.value ?? value ?? uncontrolledValue;
  const currentDisabled = (group?.disabled ?? false) || disabled || formField?.disabled === true;
  const currentReadOnly = (group?.readOnly ?? false) || readOnly;
  const currentSize = group?.size ?? size ?? CHECKBOX_DEFAULTS.size;
  const checked = getCheckboxChecked(currentValue, optionValue, trueValue);
  const labelContext = { checked, value: optionValue } satisfies CheckboxLabelRegionContext;

  useEffect(() => syncCheckboxIndeterminate(inputRef.current, indeterminate), [indeterminate]);

  function requestToggle(): void {
    if (currentDisabled || currentReadOnly) return;
    const result = toggleCheckboxValue(currentValue, optionValue, trueValue, falseValue);
    if (group) group.commit(result.value as readonly ChoiceValue[]);
    else if (value === undefined) setUncontrolledValue(result.value);
    onChange?.(result.value, { checked: result.checked, optionValue });
    formField?.notify('change');
  }

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      toggle: requestToggle,
      get input() {
        return inputRef.current;
      },
    }),
    [
      currentDisabled,
      currentReadOnly,
      currentValue,
      falseValue,
      group,
      onChange,
      optionValue,
      trueValue,
      value,
    ],
  );

  if (currentReadOnly && !checked) return null;

  const rootStyle = fill
    ? ({ ...style, backgroundColor: fill, borderColor: fill } satisfies CSSProperties)
    : style;
  const rootClass = cls(
    classHelper.block,
    classHelper.m('checked', checked),
    classHelper.m('checked-disabled', variant === 'button' && checked && currentDisabled),
    classHelper.m('disabled', currentDisabled && !(variant === 'button' && checked)),
    classHelper.m('viewable', currentReadOnly),
    classHelper.m('border', variant === 'checkbox' && bordered),
    classHelper.m('indeterminate', variant === 'checkbox' && indeterminate),
    classHelper.m(currentSize, variant === 'button' || bordered),
    className,
  );

  if (currentReadOnly) {
    return (
      <span className={rootClass} style={rootStyle}>
        <span className={classHelper.e('label')}>{renderLabel(children, labelContext)}</span>
      </span>
    );
  }

  return (
    <label className={rootClass} htmlFor={formField?.controlId ?? inputId} style={rootStyle}>
      {variant === 'checkbox' && (
        <span
          aria-hidden="true"
          className={cls(classHelper.e('icon'), classHelper.e('indicator'))}
        />
      )}
      <input
        {...inputProps}
        aria-describedby={formField?.describedBy ?? inputProps?.['aria-describedby']}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-invalid={formField?.invalid || undefined}
        checked={checked}
        className={classHelper.e('original')}
        data-focus-visible-proxy
        disabled={currentDisabled}
        id={formField?.controlId ?? inputId}
        onBlur={event => {
          onBlur?.(event);
          group?.onBlur?.(event);
          formField?.notify('blur');
        }}
        onChange={requestToggle}
        onClick={onClick}
        readOnly={currentReadOnly}
        ref={inputRef}
        type="checkbox"
        value={String(trueValue ?? optionValue)}
      />
      <span className={classHelper.e('label')}>{renderLabel(children, labelContext)}</span>
    </label>
  );
});

export type CheckboxButtonProps = Omit<CheckboxProps, 'bordered' | 'indeterminate' | 'variant'>;

export const CheckboxButton = forwardRef<CheckboxHandle, CheckboxButtonProps>(
  function CheckboxButton(props, ref) {
    return <Checkbox {...props} ref={ref} variant="button" />;
  },
);

export type CheckboxGroupProps = CheckboxGroupCommonProps &
  CheckboxGroupReactCallbacks & {
    /** 多选项。@en Checkbox options. */
    children?: ReactNode;
    /** 根元素类名。@en Class name applied to the group. */
    className?: string;
  };

export function CheckboxGroup({
  value,
  defaultValue = CHECKBOX_GROUP_DEFAULTS.defaultValue,
  disabled = CHECKBOX_GROUP_DEFAULTS.disabled,
  readOnly = CHECKBOX_GROUP_DEFAULTS.readOnly,
  size = CHECKBOX_GROUP_DEFAULTS.size,
  children,
  onChange,
  onBlur,
  className,
}: CheckboxGroupProps): ReactElement {
  const config = useHorizonWebConfig();
  const classHelper = useMemo(
    () => new ComponentClassBlock('checkbox-group', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const [uncontrolledValue, setUncontrolledValue] = useState<readonly ChoiceValue[]>(defaultValue);
  const currentValue = value ?? uncontrolledValue;
  const context = useMemo<CheckboxGroupContextValue>(
    () => ({
      value: currentValue,
      disabled,
      readOnly,
      size,
      onBlur,
      commit: nextValue => {
        if (value === undefined) setUncontrolledValue(nextValue);
        onChange?.(nextValue);
      },
    }),
    [currentValue, disabled, onBlur, onChange, readOnly, size, value],
  );

  return (
    <CheckboxGroupContext.Provider value={context}>
      <div className={cls(classHelper.block, className)} role="group">
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

export const HCheckbox = Checkbox;
export const HCheckboxButton = CheckboxButton;
export const HCheckboxGroup = CheckboxGroup;
