import type {
  CSSProperties,
  FocusEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  AdaptComponentApiShape,
  ChoiceValue,
  ComponentEventHandlers,
  RadioCommandMap,
  RadioCommonProps,
  RadioEventMap,
  RadioGroupCommonProps,
  RadioGroupEventMap,
  RadioLabelRegionContext,
} from '@aurora/core';
import {
  RADIO_DEFAULTS,
  RADIO_GROUP_DEFAULTS,
  getRadioChecked,
  resolveRadioSelection,
} from '@aurora/core';
import { focusRadioInput } from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type { ChoiceSize, ChoiceValue, RadioVariant } from '@aurora/core';

type RadioReactEventMap = AdaptComponentApiShape<
  RadioEventMap<FocusEvent<HTMLInputElement>>,
  { change: 'onChange'; blur: 'onBlur' }
>;

type RadioReactCallbacks = ComponentEventHandlers<RadioReactEventMap>;

type RadioGroupReactEventMap = AdaptComponentApiShape<
  RadioGroupEventMap<FocusEvent<HTMLInputElement>>,
  { change: 'onChange'; blur: 'onBlur' }
>;

type RadioGroupReactCallbacks = ComponentEventHandlers<RadioGroupReactEventMap>;

export interface RadioHandle extends RadioCommandMap {
  readonly input: HTMLInputElement | null;
}

export type RadioProps = RadioCommonProps &
  RadioReactCallbacks & {
    /** 标签内容或按状态渲染标签。@en Label content or a state-aware label renderer. */
    children?: ReactNode | ((context: RadioLabelRegionContext) => ReactNode);
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
      | 'name'
      | 'onBlur'
      | 'onChange'
      | 'readOnly'
      | 'type'
      | 'value'
    >;
  };

interface RadioGroupContextValue {
  value: ChoiceValue | undefined;
  disabled: boolean;
  readOnly: boolean;
  size: NonNullable<RadioGroupCommonProps['size']>;
  name: string;
  commit: (value: ChoiceValue) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function renderLabel(
  children: RadioProps['children'],
  context: RadioLabelRegionContext,
): ReactNode {
  return typeof children === 'function' ? children(context) : (children ?? String(context.value));
}

export const Radio = forwardRef<RadioHandle, RadioProps>(function Radio(
  {
    value,
    defaultValue = RADIO_DEFAULTS.defaultValue,
    optionValue = RADIO_DEFAULTS.optionValue,
    disabled = RADIO_DEFAULTS.disabled,
    readOnly = RADIO_DEFAULTS.readOnly,
    bordered = RADIO_DEFAULTS.bordered,
    size,
    variant = RADIO_DEFAULTS.variant,
    fill = RADIO_DEFAULTS.fill,
    name,
    children,
    onChange,
    onBlur,
    className,
    style,
    inputProps,
  },
  ref,
): ReactElement | null {
  const config = useHorizonWebConfig();
  const group = useContext(RadioGroupContext);
  const generatedName = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<ChoiceValue>(defaultValue);
  const currentValue = group?.value ?? value ?? uncontrolledValue;
  const currentDisabled = (group?.disabled ?? false) || disabled;
  const currentReadOnly = (group?.readOnly ?? false) || readOnly;
  const currentSize = group?.size ?? size ?? RADIO_DEFAULTS.size;
  const currentName = group?.name ?? name ?? generatedName;
  const checked = getRadioChecked(currentValue, optionValue);
  const classHelper = useMemo(
    () =>
      new ComponentClassBlock(
        variant === 'button' ? 'radio-button' : 'radio',
        config.namespace.toLowerCase(),
      ),
    [config.namespace, variant],
  );
  const labelContext = { checked, value: optionValue } satisfies RadioLabelRegionContext;

  function requestSelection(): void {
    const result = resolveRadioSelection(
      currentValue,
      optionValue,
      currentDisabled,
      currentReadOnly,
    );
    if (!result.accepted) return;
    if (group) group.commit(result.value);
    else if (value === undefined) setUncontrolledValue(result.value);
    onChange?.(result.value);
  }

  useImperativeHandle(
    ref,
    () => ({
      focus: () => focusRadioInput(inputRef.current),
      get input() {
        return inputRef.current;
      },
    }),
    [],
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
    classHelper.m('border', variant === 'radio' && bordered),
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
    <label className={rootClass} style={rootStyle}>
      {variant === 'radio' && (
        <span className={classHelper.e('input')}>
          <input
            {...inputProps}
            checked={checked}
            className={classHelper.em('input', 'original')}
            data-focus-visible-proxy
            disabled={currentDisabled}
            name={currentName}
            onBlur={event => {
              onBlur?.(event);
              group?.onBlur?.(event);
            }}
            onChange={requestSelection}
            readOnly={currentReadOnly}
            ref={inputRef}
            type="radio"
            value={String(optionValue)}
          />
          <span aria-hidden="true" className={classHelper.em('input', 'cursor')} />
        </span>
      )}
      {variant === 'button' && (
        <input
          {...inputProps}
          checked={checked}
          className={classHelper.em('input', 'original')}
          data-focus-visible-proxy
          disabled={currentDisabled}
          name={currentName}
          onBlur={event => {
            onBlur?.(event);
            group?.onBlur?.(event);
          }}
          onChange={requestSelection}
          readOnly={currentReadOnly}
          ref={inputRef}
          type="radio"
          value={String(optionValue)}
        />
      )}
      <span className={classHelper.e('label')}>{renderLabel(children, labelContext)}</span>
    </label>
  );
});

export type RadioButtonProps = Omit<RadioProps, 'bordered' | 'variant'>;

export const RadioButton = forwardRef<RadioHandle, RadioButtonProps>(
  function RadioButton(props, ref) {
    return <Radio {...props} ref={ref} variant="button" />;
  },
);

export type RadioGroupProps = RadioGroupCommonProps &
  RadioGroupReactCallbacks & {
    /** 单选项。@en Radio options. */
    children?: ReactNode;
    /** 根元素类名。@en Class name applied to the group. */
    className?: string;
  };

export function RadioGroup({
  value,
  defaultValue = RADIO_GROUP_DEFAULTS.defaultValue,
  disabled = RADIO_GROUP_DEFAULTS.disabled,
  readOnly = RADIO_GROUP_DEFAULTS.readOnly,
  size = RADIO_GROUP_DEFAULTS.size,
  name,
  children,
  onChange,
  onBlur,
  className,
}: RadioGroupProps): ReactElement {
  const config = useHorizonWebConfig();
  const generatedName = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState<ChoiceValue>(defaultValue);
  const currentValue = value ?? uncontrolledValue;
  const classHelper = useMemo(
    () => new ComponentClassBlock('radio-group', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const context = useMemo<RadioGroupContextValue>(
    () => ({
      value: currentValue,
      disabled,
      readOnly,
      size,
      name: name ?? generatedName,
      onBlur,
      commit: nextValue => {
        if (value === undefined) setUncontrolledValue(nextValue);
        onChange?.(nextValue);
      },
    }),
    [currentValue, disabled, generatedName, name, onBlur, onChange, readOnly, size, value],
  );

  return (
    <RadioGroupContext.Provider value={context}>
      <div className={cls(classHelper.block, className)} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export const HRadio = Radio;
export const HRadioButton = RadioButton;
export const HRadioGroup = RadioGroup;
