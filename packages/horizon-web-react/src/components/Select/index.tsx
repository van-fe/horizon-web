import type {
  ChangeEvent,
  CSSProperties,
  FocusEventHandler,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import {
  Children,
  Fragment,
  forwardRef,
  isValidElement,
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
  SelectChangeDetails,
  SelectOpenChangeDetails,
  SelectOption as CoreSelectOption,
  SelectValue,
} from '@aurora/core';
import { defaultSelectFilter, isSelectValueEqual, SelectController } from '@aurora/core';
import type { PortalTarget, PositionerInstance, WebPlacement } from '@aurora/horizon-web-core';
import {
  createDismissableLayer,
  createPositioner,
  createSelectDomAdapter,
  getSelectComboboxAria,
  getSelectListboxAria,
  getSelectOptionAria,
  resolvePortalContainer,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { useFormFieldControl } from '../Form/context';

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOptionData extends Omit<CoreSelectOption<SelectValue>, 'id'> {
  id?: string;
}

export interface OptionProps extends SelectOptionData {
  children?: ReactNode;
}

export interface OptionGroupProps {
  label: string;
  children?: ReactNode;
}

export interface SelectHandle {
  focus(): void;
  blur(): void;
  open(): void;
  close(): void;
  clear(): void;
  updatePosition(): Promise<void>;
}

export interface SelectProps {
  /** 受控选中值。@en Controlled selected value. */
  value?: SelectValue;
  /** 非受控初始值。@en Initial uncontrolled value. */
  defaultValue?: SelectValue;
  /** 选择变化回调。@en Called when the selected value changes. */
  onChange?: (value: SelectValue | undefined, details: SelectChangeDetails<SelectValue>) => void;
  /** 受控面板状态。@en Controlled popup state. */
  open?: boolean;
  /** 非受控初始面板状态。@en Initial uncontrolled popup state. */
  defaultOpen?: boolean;
  /** 面板状态变化回调。@en Called when the popup state changes. */
  onOpenChange?: (open: boolean, details: SelectOpenChangeDetails) => void;
  /** 数据形式的选项。@en Options supplied as data. */
  options?: readonly SelectOptionData[];
  /** 声明式 Option 或 OptionGroup。@en Declarative Option or OptionGroup children. */
  children?: ReactNode;
  /** 是否允许输入筛选。@en Whether text filtering is enabled. */
  filterable?: boolean;
  /** 自定义筛选。@en Custom option filter. */
  filter?: (input: string, option: CoreSelectOption<SelectValue>) => boolean;
  /** 占位文字。@en Placeholder text. */
  placeholder?: string;
  /** 空状态内容。@en Empty-state content. */
  emptyContent?: ReactNode;
  /** 是否禁用。@en Whether the select is disabled. */
  disabled?: boolean;
  /** 是否可清空。@en Whether the value can be cleared. */
  clearable?: boolean;
  /** 是否必填。@en Whether a value is required. */
  required?: boolean;
  /** 是否处于错误状态。@en Whether the field is invalid. */
  invalid?: boolean;
  /** 表单字段名。@en Native form field name. */
  name?: string;
  /** 尺寸。@en Component size. */
  size?: SelectSize;
  /** 面板位置。@en Popup placement. */
  placement?: WebPlacement;
  /** 是否通过 Portal 渲染。@en Whether the popup uses a portal. */
  portal?: boolean;
  /** Portal 容器。@en Portal destination. */
  portalContainer?: PortalTarget;
  /** 面板头部。@en Popup header. */
  panelHeader?: ReactNode;
  /** 面板底部。@en Popup footer. */
  panelFooter?: ReactNode;
  /** 自定义选项渲染。@en Custom option renderer. */
  renderOption?: (
    option: SelectOptionData,
    state: { selected: boolean; active: boolean },
  ) => ReactNode;
  /** 根元素类名。@en Root class name. */
  className?: string;
  /** 根元素样式。@en Root style. */
  style?: CSSProperties;
  /** 失焦回调。@en Blur callback. */
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLButtonElement>;
  /** 聚焦回调。@en Focus callback. */
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLButtonElement>;
}

interface NormalizedOption {
  core: CoreSelectOption<SelectValue>;
  source: SelectOptionData;
  content?: ReactNode;
}

export function Option(_props: OptionProps): ReactElement | null {
  return null;
}

export function OptionGroup(_props: OptionGroupProps): ReactElement | null {
  return null;
}

export const HOption = Option;
export const HOptionGroup = OptionGroup;

function textLabel(value: ReactNode, fallback: SelectValue): string {
  return typeof value === 'string' || typeof value === 'number'
    ? String(value)
    : typeof fallback === 'symbol'
      ? (fallback.description ?? '')
      : typeof fallback === 'object'
        ? ''
        : String(fallback);
}

function normalizeChildren(
  children: ReactNode,
  group?: string,
  counter: { value: number } = { value: 0 },
): NormalizedOption[] {
  const normalized: NormalizedOption[] = [];
  Children.forEach(children, child => {
    if (!isValidElement(child)) return;
    if (child.type === Option) {
      const props = child.props as OptionProps;
      const label = props.label ?? textLabel(props.children, props.value);
      const id = props.id ?? `option-${counter.value++}`;
      normalized.push({
        core: {
          id,
          value: props.value,
          label,
          description: props.description,
          disabled: props.disabled,
          group,
          keywords: props.keywords,
        },
        source: { ...props, id, label, group },
        content: props.children,
      });
    } else if (child.type === OptionGroup) {
      const props = child.props as OptionGroupProps;
      normalized.push(...normalizeChildren(props.children, props.label, counter));
    }
  });
  return normalized;
}

function normalizeData(options: readonly SelectOptionData[] = []): NormalizedOption[] {
  return options.map((option, index) => {
    const id = option.id ?? `option-${index}`;
    return { core: { ...option, id }, source: { ...option, id } };
  });
}

export const Select = forwardRef<SelectHandle, SelectProps>(function Select(
  {
    value,
    defaultValue,
    onChange,
    open,
    defaultOpen = false,
    onOpenChange,
    options,
    children,
    filterable = false,
    filter = defaultSelectFilter,
    placeholder,
    emptyContent,
    disabled = false,
    clearable = false,
    required = false,
    invalid = false,
    name,
    size = 'medium',
    placement = 'bottom-start',
    portal = true,
    portalContainer = 'body',
    panelHeader,
    panelFooter,
    renderOption,
    className,
    style,
    onBlur,
    onFocus,
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const formFieldRef = useRef(formField);
  formFieldRef.current = formField;
  const classHelper = useMemo(
    () => new ComponentClassBlock('select', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const reactId = useId().replaceAll(':', '');
  const listboxId = `${reactId}-listbox`;
  const normalizedOptions = useMemo(
    () => (options ? normalizeData(options) : normalizeChildren(children)),
    [children, options],
  );
  const coreOptions = useMemo(
    () => normalizedOptions.map(option => option.core),
    [normalizedOptions],
  );
  const [, forceRender] = useReducer(count => count + 1, 0);
  const [uncontrolledValue, setUncontrolledValue] = useState<SelectValue | undefined>(defaultValue);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [inputValue, setInputValue] = useState('');
  const [portalTarget, setPortalTarget] = useState<Element>();
  const triggerRef = useRef<HTMLInputElement | HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const positionerRef = useRef<PositionerInstance | null>(null);
  const controlledValueRef = useRef(value !== undefined);
  const controlledOpenRef = useRef(open !== undefined);
  const onChangeRef = useRef(onChange);
  const onOpenChangeRef = useRef(onOpenChange);
  controlledValueRef.current = value !== undefined;
  controlledOpenRef.current = open !== undefined;
  onChangeRef.current = onChange;
  onOpenChangeRef.current = onOpenChange;
  const currentValue = value ?? uncontrolledValue;
  const resolvedDisabled = disabled || formField?.disabled === true;
  const resolvedInvalid = invalid || formField?.invalid === true;
  const currentOpen = !resolvedDisabled && (open ?? uncontrolledOpen);
  const currentValueRef = useRef(currentValue);
  const currentOpenRef = useRef(currentOpen);
  currentValueRef.current = currentValue;
  currentOpenRef.current = currentOpen;

  const controllerRef = useRef<SelectController<SelectValue> | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new SelectController({
      value: currentValue,
      open: currentOpen,
      disabled: resolvedDisabled,
      inputValue,
      options: coreOptions,
      filter,
      onChange: (nextValue, details) => {
        if (!controlledValueRef.current) setUncontrolledValue(nextValue);
        onChangeRef.current?.(nextValue, details);
        formFieldRef.current?.notify('change');
        forceRender();
      },
      onOpenChange: (nextOpen, details) => {
        if (!controlledOpenRef.current) setUncontrolledOpen(nextOpen);
        onOpenChangeRef.current?.(nextOpen, details);
        forceRender();
      },
      onInputValueChange: nextInput => {
        setInputValue(nextInput);
        forceRender();
      },
      onHighlightChange: forceRender,
    });
  }
  const controller = controllerRef.current;

  useLayoutEffect(() => {
    controller.setOptions({ options: coreOptions, filter, disabled: resolvedDisabled });
    controller.syncState({
      value: currentValue,
      open: currentOpen,
      inputValue,
      disabled: resolvedDisabled,
    });
  }, [controller, coreOptions, currentOpen, currentValue, filter, inputValue, resolvedDisabled]);

  useEffect(() => () => controller.destroy(), [controller]);

  useLayoutEffect(() => {
    setPortalTarget(resolvePortalContainer(portalContainer, triggerRef.current?.ownerDocument));
  }, [portalContainer]);

  useLayoutEffect(() => {
    if (!currentOpen || !triggerRef.current || !panelRef.current) return;
    const positioner = createPositioner(triggerRef.current, panelRef.current, {
      placement,
      distance: 4,
      flip: true,
      shift: true,
    });
    positionerRef.current = positioner;
    return () => {
      positioner.destroy();
      if (positionerRef.current === positioner) positionerRef.current = null;
    };
  }, [currentOpen, placement, portalTarget]);

  useEffect(() => {
    if (!currentOpen || !panelRef.current) return;
    return createDismissableLayer({
      node: panelRef.current,
      branches: [triggerRef.current],
      onDismiss: reason => {
        controller.syncState({ open: currentOpenRef.current });
        controller.close(reason);
      },
    }).destroy;
  }, [controller, currentOpen]);

  useEffect(() => {
    if (!currentOpen || !triggerRef.current || !listboxRef.current) return;
    const adapter = createSelectDomAdapter({
      trigger: triggerRef.current,
      listbox: listboxRef.current,
      getOpen: () => currentOpenRef.current,
      getActiveOptionId: () => {
        const activeValue = controller.snapshot.highlightedValue;
        const index = coreOptions.findIndex(option =>
          activeValue === undefined ? false : isSelectValueEqual(option.value, activeValue),
        );
        return index < 0 ? undefined : `${reactId}-option-${index}`;
      },
      onOpen: () => controller.open('keyboard'),
      onClose: reason => controller.close(reason),
      onNavigate: intent => {
        if (intent === 'first' || intent === 'last') controller.highlightBoundary(intent);
        else controller.highlight(intent === 'next' ? 1 : -1);
        adapter.sync();
      },
      onSelect: () => {
        controller.selectHighlighted();
        controller.close('select');
      },
    });
    adapter.sync();
    return adapter.destroy;
  }, [controller, coreOptions, currentOpen, reactId]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      focus: () => triggerRef.current?.focus(),
      blur: () => triggerRef.current?.blur(),
      open: () => {
        controller.syncState({ open: currentOpenRef.current });
        controller.open();
      },
      close: () => {
        controller.syncState({ open: currentOpenRef.current });
        controller.close();
      },
      clear: () => {
        controller.syncState({ value: currentValueRef.current });
        controller.clear('imperative');
      },
      async updatePosition() {
        await positionerRef.current?.update();
      },
    }),
    [controller],
  );

  const selectedIndex = normalizedOptions.findIndex(option =>
    currentValue === undefined ? false : isSelectValueEqual(option.core.value, currentValue),
  );
  const selected = normalizedOptions[selectedIndex];
  const visibleOptions = normalizedOptions.filter(option => filter(inputValue, option.core));
  const activeValue = controller.snapshot.highlightedValue;
  const aria = getSelectComboboxAria({
    listboxId,
    open: currentOpen,
    activeOptionId: (() => {
      if (!currentOpen || activeValue === undefined) return undefined;
      const index = normalizedOptions.findIndex(option =>
        isSelectValueEqual(option.core.value, activeValue),
      );
      return index < 0 ? undefined : `${reactId}-option-${index}`;
    })(),
    disabled: resolvedDisabled,
    invalid: resolvedInvalid,
    required,
  });

  function requestOpen(): void {
    controller.syncState({ open: currentOpen });
    controller.open('trigger');
  }

  function handleClosedKeyDown(event: React.KeyboardEvent): void {
    if (currentOpen || !['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    requestOpen();
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      controller.highlight(event.key === 'ArrowDown' ? 1 : -1);
    }
  }

  function pick(option: NormalizedOption, event: MouseEvent): void {
    event.preventDefault();
    controller.syncState({ value: currentValue, open: currentOpen });
    controller.select(option.core.value, 'select');
    controller.close('select');
    if (inputValue) controller.setInputValue('');
    triggerRef.current?.focus();
  }

  const panel = currentOpen ? (
    <div className={classHelper.e('panel')} ref={panelRef}>
      {panelHeader && <div className={classHelper.e('panel-header')}>{panelHeader}</div>}
      <div
        {...getSelectListboxAria(listboxId)}
        className={classHelper.e('listbox')}
        ref={listboxRef}
      >
        {visibleOptions.length === 0 ? (
          <div className={classHelper.e('empty')}>{emptyContent ?? config.selectLabels.empty}</div>
        ) : (
          visibleOptions.map((option, visibleIndex) => {
            const index = normalizedOptions.indexOf(option);
            const selectedOption =
              currentValue !== undefined && isSelectValueEqual(currentValue, option.core.value);
            const active =
              activeValue !== undefined && isSelectValueEqual(activeValue, option.core.value);
            const showGroup =
              option.core.group &&
              option.core.group !== visibleOptions[visibleIndex - 1]?.core.group;
            return (
              <Fragment key={option.core.id}>
                {showGroup && (
                  <div className={`${classHelper.block}-option-group__title`} role="presentation">
                    {option.core.group}
                  </div>
                )}
                <div
                  {...getSelectOptionAria({
                    selected: selectedOption,
                    disabled: option.core.disabled,
                  })}
                  className={cls(
                    `${classHelper.block}-option`,
                    classHelper.is('active', selectedOption),
                    classHelper.is('focus', active),
                    classHelper.is('disabled', option.core.disabled),
                  )}
                  id={`${reactId}-option-${index}`}
                  onMouseDown={event => !option.core.disabled && pick(option, event)}
                  onMouseEnter={() => {
                    if (option.core.disabled) return;
                    controller.highlightValue(option.core.value);
                  }}
                >
                  <div className={`${classHelper.block}-option__inner`}>
                    <span className={`${classHelper.block}-option__content`}>
                      {renderOption?.(option.source, { selected: selectedOption, active }) ??
                        option.content ??
                        option.core.label}
                    </span>
                    {option.core.description && (
                      <span className={`${classHelper.block}-option__description`}>
                        {option.core.description}
                      </span>
                    )}
                  </div>
                </div>
              </Fragment>
            );
          })
        )}
      </div>
      {panelFooter && <div className={classHelper.e('panel-footer')}>{panelFooter}</div>}
    </div>
  ) : null;

  const renderedPanel = panel && portal && portalTarget ? createPortal(panel, portalTarget) : panel;
  const displayValue = selected?.content ?? selected?.core.label;
  const sharedTriggerProps = {
    ...aria,
    'aria-describedby': formField?.describedBy,
    'aria-label': formField?.labelId ? undefined : (placeholder ?? config.selectLabels.placeholder),
    'aria-labelledby': formField?.labelId,
    'aria-invalid': resolvedInvalid || undefined,
    disabled: resolvedDisabled,
    id: formField?.controlId,
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLButtonElement>) => {
      onBlur?.(event);
      formField?.notify('blur');
    },
    onFocus,
    onKeyDown: handleClosedKeyDown,
  };

  return (
    <div
      className={cls(
        classHelper.block,
        classHelper.m(size),
        classHelper.is('disabled', resolvedDisabled),
        classHelper.is('open', currentOpen),
        classHelper.is('invalid', resolvedInvalid),
        className,
      )}
      style={style}
    >
      {filterable ? (
        <input
          {...sharedTriggerProps}
          className={classHelper.e('trigger')}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            controller.setInputValue(event.target.value);
            if (!currentOpen) requestOpen();
          }}
          onClick={() => !currentOpen && requestOpen()}
          placeholder={selected ? undefined : (placeholder ?? config.selectLabels.placeholder)}
          ref={node => {
            triggerRef.current = node;
          }}
          type="text"
          value={currentOpen ? inputValue : textLabel(displayValue, currentValue ?? '')}
        />
      ) : (
        <button
          {...sharedTriggerProps}
          className={classHelper.e('trigger')}
          onClick={() => {
            controller.syncState({ open: currentOpen });
            controller.toggle('trigger');
          }}
          ref={node => {
            triggerRef.current = node;
          }}
          type="button"
        >
          <span className={cls(classHelper.e('value'), classHelper.is('placeholder', !selected))}>
            {displayValue ?? placeholder ?? config.selectLabels.placeholder}
          </span>
          <span aria-hidden="true" className={classHelper.e('arrow')}>
            ▾
          </span>
        </button>
      )}
      {clearable && currentValue !== undefined && !resolvedDisabled && (
        <button
          aria-label={config.selectLabels.clear}
          className={classHelper.e('clear')}
          onClick={() => {
            controller.syncState({ value: currentValue });
            controller.clear();
          }}
          type="button"
        >
          ×
        </button>
      )}
      {name && <input name={name} type="hidden" value={String(currentValue ?? '')} />}
      {renderedPanel}
    </div>
  );
});

export const HSelect = Select;
