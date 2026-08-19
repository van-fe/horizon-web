import type {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
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
  AutoCompleteCommandMap,
  AutoCompleteCommonProps,
  AutoCompleteOpenChangeDetails,
  AutoCompleteOption,
  AutoCompleteSelectDetails,
  PopoverPlacement,
} from '@aurora/core';
import {
  AUTO_COMPLETE_DEFAULTS,
  AutoCompleteController,
  normalizeAutoCompleteValue,
  resolveAutoCompleteOptionHeight,
} from '@aurora/core';
import type { PortalTarget, PositionerInstance, WebPlacement } from '@aurora/horizon-core';
import {
  createAutoCompleteInputScheduler,
  createDismissableLayer,
  createPositioner,
  getSelectComboboxAria,
  getSelectListboxAria,
  getSelectOptionAria,
  resolvePortalContainer,
} from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { useFormFieldControl } from '../Form/context';
import { Input } from '../Input';
import type { InputHandle } from '../Input';

type AutoCompleteDescription = Exclude<ReactNode, undefined>;
type AutoCompleteInputElement = HTMLInputElement | HTMLTextAreaElement;

export interface AutoCompleteOptionData extends AutoCompleteOption<AutoCompleteDescription> {}

export interface AutoCompleteHandle extends AutoCompleteCommandMap {
  /** 输入元素。 @en Native input element. */
  readonly input: HTMLInputElement | null;
  /** 重新计算面板位置。 @en Recomputes popup position. */
  updatePosition(): Promise<void>;
}

export interface AutoCompleteProps
  extends
    Omit<AutoCompleteCommonProps<ReactNode>, 'options' | 'tooltipHideAfter' | 'tooltipShowAfter'>,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      'children' | 'defaultValue' | 'onBlur' | 'onChange' | 'onFocus' | 'onSelect' | 'prefix'
    > {
  /** 建议项。 @en Suggestion options. */
  options?: readonly AutoCompleteOptionData[];
  /** Portal 容器。 @en Portal destination. */
  portalContainer?: PortalTarget;
  /** 空状态内容。 @en Empty-state content. */
  emptyContent?: ReactNode;
  /** 加载状态内容。 @en Loading-state content. */
  loadingContent?: ReactNode;
  /** 面板头部。 @en Popup header. */
  panelHeader?: ReactNode;
  /** 面板底部。 @en Popup footer. */
  panelFooter?: ReactNode;
  /** 输入前缀。 @en Input prefix. */
  prefix?: ReactNode;
  /** 输入后缀。 @en Input suffix. */
  suffix?: ReactNode;
  /** 自定义建议项。 @en Custom suggestion renderer. */
  renderOption?: (
    option: AutoCompleteOptionData,
    state: { index: number; active: boolean; selected: boolean },
  ) => ReactNode;
  /** 输入值变化。 @en Called when the input value changes. */
  onValueChange?: (value: string) => void;
  /** 面板状态变化。 @en Called when popup state changes. */
  onOpenChange?: (open: boolean, details: AutoCompleteOpenChangeDetails) => void;
  /** 搜索文字变化。 @en Called when debounced search text changes. */
  onSearch?: (value: string) => void;
  /** 选择变化。 @en Called when a suggestion changes the value. */
  onChange?: (value: string, details: AutoCompleteSelectDetails<AutoCompleteOptionData>) => void;
  /** 选中建议项。 @en Called when a suggestion is selected. */
  onSelect?: (value: string, details: AutoCompleteSelectDetails<AutoCompleteOptionData>) => void;
  /** 列表到达底部。 @en Called when keyboard navigation or scrolling reaches the end. */
  onOptionListReachBottom?: (event: KeyboardEvent<HTMLInputElement> | Event) => void;
  /** 清空输入。 @en Called after the input is cleared. */
  onClear?: () => void;
  /** 输入框聚焦。 @en Input focus callback. */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /** 输入框失焦。 @en Input blur callback. */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** 是否必填。 @en Whether a value is required. */
  required?: boolean;
  /** 是否处于错误状态。 @en Whether the field is invalid. */
  invalid?: boolean;
  /** 原生表单字段名。 @en Native form field name. */
  name?: string;
  /** 面板附加 class。 @en Additional popup class. */
  panelClassName?: string;
  /** 面板附加样式。 @en Additional popup style. */
  panelStyle?: CSSProperties;
}

function normalizeWebPlacement(placement: PopoverPlacement): WebPlacement {
  if (placement === 'auto' || placement === 'auto-start' || placement === 'auto-end') {
    return 'bottom-start';
  }
  return placement;
}

export const AutoComplete = forwardRef<AutoCompleteHandle, AutoCompleteProps>(function AutoComplete(
  {
    value,
    defaultValue = AUTO_COMPLETE_DEFAULTS.defaultValue,
    open,
    defaultOpen = AUTO_COMPLETE_DEFAULTS.defaultOpen,
    disabled = AUTO_COMPLETE_DEFAULTS.disabled,
    clearable = AUTO_COMPLETE_DEFAULTS.clearable,
    trigger = AUTO_COMPLETE_DEFAULTS.trigger,
    placement = AUTO_COMPLETE_DEFAULTS.placement,
    portal = AUTO_COMPLETE_DEFAULTS.portal,
    inputVariant = AUTO_COMPLETE_DEFAULTS.inputVariant,
    size,
    placeholder,
    destroyOnHide = AUTO_COMPLETE_DEFAULTS.destroyOnHide,
    fitInputWidth = AUTO_COMPLETE_DEFAULTS.fitInputWidth,
    hoverShowDelay = AUTO_COMPLETE_DEFAULTS.hoverShowDelay,
    hoverHideDelay = AUTO_COMPLETE_DEFAULTS.hoverHideDelay,
    hidePanelWhenEmptyList = AUTO_COMPLETE_DEFAULTS.hidePanelWhenEmptyList,
    loading = AUTO_COMPLETE_DEFAULTS.loading,
    selectedOptionOrderToTop = AUTO_COMPLETE_DEFAULTS.selectedOptionOrderToTop,
    optionListMaxHeight = AUTO_COMPLETE_DEFAULTS.optionListMaxHeight,
    descriptionPosition = AUTO_COMPLETE_DEFAULTS.descriptionPosition,
    inputEmitFrequency = AUTO_COMPLETE_DEFAULTS.inputEmitFrequency,
    expandPanelByChildren = AUTO_COMPLETE_DEFAULTS.expandPanelByChildren,
    options = AUTO_COMPLETE_DEFAULTS.options,
    portalContainer = 'body',
    emptyContent,
    loadingContent,
    panelHeader,
    panelFooter,
    prefix,
    suffix,
    renderOption,
    onValueChange,
    onOpenChange,
    onSearch,
    onChange,
    onSelect,
    onOptionListReachBottom,
    onClear,
    onFocus,
    onBlur,
    required,
    invalid,
    name,
    panelClassName,
    panelStyle,
    className,
    style,
    onMouseEnter,
    onMouseLeave,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const classes = useMemo(
    () => new ComponentClassBlock('auto-complete', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const optionClasses = useMemo(
    () => new ComponentClassBlock('auto-complete-option', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const reactId = useId().replaceAll(':', '');
  const listboxId = `${reactId}-listbox`;
  const inputRef = useRef<InputHandle>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const positionerRef = useRef<PositionerInstance>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [portalTarget, setPortalTarget] = useState<Element>();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [draftValue, setDraftValue] = useState(
    normalizeAutoCompleteValue(value === undefined ? defaultValue : value),
  );
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [, forceRender] = useReducer(count => count + 1, 0);
  const controlledValueRef = useRef(value !== undefined);
  const controlledOpenRef = useRef(open !== undefined);
  const onReachEndEventRef = useRef<KeyboardEvent<HTMLInputElement> | Event | undefined>(undefined);
  const resolvedDisabled = disabled || formField?.disabled === true;
  const resolvedInvalid = invalid || formField?.invalid === true;
  const currentValue = normalizeAutoCompleteValue(value === undefined ? uncontrolledValue : value);
  const currentOpen = !resolvedDisabled && (open === undefined ? uncontrolledOpen : open);
  const currentOpenRef = useRef(currentOpen);
  const currentValueRef = useRef(currentValue);
  const formFieldRef = useRef(formField);
  const callbackRef = useRef({
    onValueChange,
    onOpenChange,
    onSearch,
    onChange,
    onSelect,
    onOptionListReachBottom,
  });
  controlledValueRef.current = value !== undefined;
  controlledOpenRef.current = open !== undefined;
  currentOpenRef.current = currentOpen;
  currentValueRef.current = currentValue;
  formFieldRef.current = formField;
  callbackRef.current = {
    onValueChange,
    onOpenChange,
    onSearch,
    onChange,
    onSelect,
    onOptionListReachBottom,
  };

  const controllerRef = useRef<AutoCompleteController<AutoCompleteDescription>>(null);
  if (!controllerRef.current) {
    controllerRef.current = new AutoCompleteController<AutoCompleteDescription>({
      value: currentValue,
      open: currentOpen,
      disabled: resolvedDisabled,
      loading,
      hidePanelWhenEmptyList,
      selectedOptionOrderToTop,
      options,
      idPrefix: `${reactId}-option`,
      onValueChange: nextValue => {
        if (controlledValueRef.current) setDraftValue(currentValueRef.current);
        else {
          setUncontrolledValue(nextValue);
          setDraftValue(nextValue);
        }
        callbackRef.current.onValueChange?.(nextValue);
        formFieldRef.current?.notify('change');
      },
      onOpenChange: (nextOpen, details) => {
        if (!controlledOpenRef.current) setUncontrolledOpen(nextOpen);
        callbackRef.current.onOpenChange?.(nextOpen, details);
        forceRender();
      },
      onSearch: nextValue => callbackRef.current.onSearch?.(nextValue),
      onSelect: (nextValue, details) => {
        const publicDetails = details as AutoCompleteSelectDetails<AutoCompleteOptionData>;
        callbackRef.current.onChange?.(nextValue, publicDetails);
        callbackRef.current.onSelect?.(nextValue, publicDetails);
      },
      onReachEnd: () => {
        const event = onReachEndEventRef.current;
        if (event) callbackRef.current.onOptionListReachBottom?.(event);
      },
      onHighlightChange: forceRender,
    });
  }
  const controller = controllerRef.current!;

  const schedulerRef = useRef(
    createAutoCompleteInputScheduler({
      delay: inputEmitFrequency,
      onCommit: nextValue => controller.input(nextValue),
    }),
  );

  useEffect(() => {
    const previous = schedulerRef.current;
    previous.destroy();
    schedulerRef.current = createAutoCompleteInputScheduler({
      delay: inputEmitFrequency,
      onCommit: nextValue => controller.input(nextValue),
    });
    return () => schedulerRef.current.destroy();
  }, [controller, inputEmitFrequency]);

  useLayoutEffect(() => {
    controller.setOptions({
      options,
      disabled: resolvedDisabled,
      loading,
      hidePanelWhenEmptyList,
      selectedOptionOrderToTop,
    });
    controller.syncState({ value: currentValue, open: currentOpen, disabled: resolvedDisabled });
    forceRender();
  }, [
    controller,
    currentOpen,
    currentValue,
    hidePanelWhenEmptyList,
    loading,
    options,
    resolvedDisabled,
    selectedOptionOrderToTop,
  ]);

  useEffect(
    () => () => {
      if (hoverTimerRef.current !== null) clearTimeout(hoverTimerRef.current);
    },
    [],
  );

  useLayoutEffect(() => {
    if (value !== undefined) setDraftValue(normalizeAutoCompleteValue(value));
  }, [value]);

  useLayoutEffect(() => {
    setPortalTarget(
      resolvePortalContainer(portalContainer, inputRef.current?.input?.ownerDocument),
    );
  }, [portalContainer]);

  const previousOptionsLengthRef = useRef(options.length);
  useLayoutEffect(() => {
    const previousLength = previousOptionsLengthRef.current;
    previousOptionsLengthRef.current = options.length;
    const input = inputRef.current?.input;
    if (
      previousLength === 0 &&
      options.length > 0 &&
      input?.ownerDocument.activeElement === input &&
      !currentOpen
    ) {
      controller.syncState({ open: false, disabled: resolvedDisabled });
      controller.open('options-change');
    }
  }, [controller, currentOpen, options.length, resolvedDisabled]);

  useLayoutEffect(() => {
    const input = inputRef.current?.input;
    const panel = panelRef.current;
    if (!currentOpen || !input || !panel) return;
    if (fitInputWidth === true) panel.style.width = `${input.getBoundingClientRect().width}px`;
    else if (fitInputWidth === 'fit-content')
      panel.style.minWidth = `${input.getBoundingClientRect().width}px`;
    const positioner = createPositioner(input, panel, {
      placement: normalizeWebPlacement(placement),
      distance: 4,
      flip: true,
      shift: true,
    });
    positionerRef.current = positioner;
    return () => {
      positioner.destroy();
      if (positionerRef.current === positioner) positionerRef.current = null;
    };
  }, [currentOpen, fitInputWidth, placement, portalTarget]);

  useEffect(() => {
    const input = inputRef.current?.input;
    if (!currentOpen || !panelRef.current || !input) return;
    const layer = createDismissableLayer({
      node: panelRef.current,
      branches: [input.closest(`.${classes.block}`)],
      onDismiss: reason => {
        controller.syncState({ open: currentOpenRef.current });
        controller.close(reason);
      },
    });
    return () => layer.destroy();
  }, [classes.block, controller, currentOpen]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      get input() {
        return inputRef.current?.input instanceof HTMLInputElement ? inputRef.current.input : null;
      },
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      open: () => {
        controller.syncState({ open: currentOpenRef.current });
        controller.open('imperative');
      },
      close: () => {
        controller.syncState({ open: currentOpenRef.current });
        controller.close('imperative');
      },
      clear: () => {
        schedulerRef.current.cancel();
        controller.syncState({ value: currentValue });
        if (controller.clear()) onClear?.();
        inputRef.current?.focus();
      },
      async updatePosition() {
        await positionerRef.current?.update();
      },
    }),
    [controller, currentValue, onClear],
  );

  const visibleOptions = controller.visibleOptions;
  const highlightedIndex = controller.snapshot.highlightedIndex;
  const selectedIndex = visibleOptions.findIndex(option => option.value === currentValue);
  const aria = getSelectComboboxAria({
    listboxId,
    open: currentOpen,
    activeOptionId: currentOpen ? visibleOptions[highlightedIndex]?.id : undefined,
    disabled: resolvedDisabled,
    invalid: resolvedInvalid,
    required,
    labelledBy: formField?.labelId,
  });

  function requestOpen(reason: 'trigger' | 'focus' | 'keyboard' | 'options-change'): void {
    controller.syncState({ open: currentOpen, disabled: resolvedDisabled });
    controller.open(reason);
  }

  function handleKeyDown(event: KeyboardEvent<AutoCompleteInputElement>): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!currentOpen) requestOpen('keyboard');
      onReachEndEventRef.current = event as KeyboardEvent<HTMLInputElement>;
      controller.syncState({ open: currentOpen || controller.snapshot.open });
      controller.navigate(event.key === 'ArrowDown' ? 1 : -1);
      forceRender();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (!currentOpen) requestOpen('keyboard');
      else if (controller.select() !== undefined) inputRef.current?.focus();
    } else if (event.key === 'Escape' && currentOpen) {
      event.preventDefault();
      controller.close('escape');
    }
  }

  function clearValue(): void {
    schedulerRef.current.cancel();
    controller.syncState({ value: currentValue });
    if (controller.clear()) onClear?.();
    inputRef.current?.focus();
  }

  function selectOption(index: number): void {
    controller.highlight(index);
    controller.select(index);
    inputRef.current?.focus();
  }

  function scheduleHover(openPanel: boolean): void {
    if (trigger !== 'hover' || resolvedDisabled) return;
    if (hoverTimerRef.current !== null) clearTimeout(hoverTimerRef.current);
    const delay = openPanel ? hoverShowDelay : hoverHideDelay;
    hoverTimerRef.current = setTimeout(() => {
      hoverTimerRef.current = null;
      controller.syncState({ open: currentOpenRef.current, disabled: resolvedDisabled });
      if (openPanel) controller.open('trigger');
      else controller.close('trigger');
    }, delay);
  }

  const panel =
    currentOpen || !destroyOnHide ? (
      <div
        aria-busy={loading || undefined}
        className={cls(classes.e('panel'), panelClassName)}
        hidden={!currentOpen}
        ref={panelRef}
        style={panelStyle}
      >
        {panelHeader !== undefined ? (
          <div className={classes.e('panel-header')}>{panelHeader}</div>
        ) : null}
        <div
          {...getSelectListboxAria(listboxId)}
          className={classes.e('listbox')}
          onScroll={event => {
            const target = event.currentTarget;
            if (target.scrollTop + target.clientHeight >= target.scrollHeight - 1) {
              onOptionListReachBottom?.(event.nativeEvent);
            }
          }}
          ref={listboxRef}
          style={{
            maxHeight:
              typeof optionListMaxHeight === 'number'
                ? `${optionListMaxHeight}px`
                : optionListMaxHeight,
            height: expandPanelByChildren ? 'auto' : undefined,
          }}
        >
          {loading ? (
            <div className={classes.e('loading')} role="status">
              {loadingContent ?? config.spinLabels.loading}
            </div>
          ) : visibleOptions.length === 0 ? (
            <div className={classes.e('empty')}>{emptyContent ?? config.selectLabels.empty}</div>
          ) : (
            visibleOptions.map((option, index) => {
              const active = index === highlightedIndex;
              const selected = index === selectedIndex;
              return (
                <div
                  {...getSelectOptionAria({ selected })}
                  className={cls(
                    optionClasses.block,
                    optionClasses.is('focus', active),
                    optionClasses.is('active', selected),
                    optionClasses.is(`description-${descriptionPosition}`),
                  )}
                  id={option.id}
                  key={option.id}
                  onMouseDown={event => {
                    event.preventDefault();
                    selectOption(index);
                  }}
                  onMouseEnter={() => {
                    controller.highlight(index);
                    forceRender();
                  }}
                  style={{ minHeight: resolveAutoCompleteOptionHeight(descriptionPosition) }}
                >
                  <div className={optionClasses.e('inner')}>
                    <div className={optionClasses.e('content-wrapper')}>
                      {renderOption?.(option, { index, active, selected }) ?? (
                        <>
                          <div className={optionClasses.e('content')}>{option.label}</div>
                          {option.description !== undefined ? (
                            <div className={optionClasses.e('description')}>
                              {option.description}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {panelFooter !== undefined ? (
          <div className={classes.e('panel-footer')}>{panelFooter}</div>
        ) : null}
      </div>
    ) : null;

  const renderedPanel = panel && portal && portalTarget ? createPortal(panel, portalTarget) : panel;

  return (
    <div
      {...nativeProps}
      className={cls(classes.block, className)}
      onMouseEnter={event => {
        onMouseEnter?.(event);
        scheduleHover(true);
      }}
      onMouseLeave={event => {
        onMouseLeave?.(event);
        scheduleHover(false);
      }}
      style={style}
    >
      <Input
        className={classes.e('field')}
        clearable={clearable}
        disabled={resolvedDisabled}
        inputProps={{
          ...aria,
          'aria-label': formField?.labelId
            ? undefined
            : (placeholder ?? config.selectLabels.placeholder),
          autoComplete: 'off',
          id: formField?.controlId,
        }}
        onBlur={event => {
          onBlur?.(event as FocusEvent<HTMLInputElement>);
          formField?.notify('blur');
        }}
        onClear={clearValue}
        onCompositionEnd={event => {
          controller.endComposition();
          const nextValue = event.currentTarget.value || event.data;
          setDraftValue(nextValue);
          schedulerRef.current.schedule(nextValue);
        }}
        onCompositionStart={() => controller.startComposition()}
        onFocus={event => {
          onFocus?.(event as FocusEvent<HTMLInputElement>);
          requestOpen('focus');
        }}
        onInput={nextValue => {
          setDraftValue(nextValue);
          schedulerRef.current.schedule(nextValue);
          if (!currentOpen) requestOpen('options-change');
        }}
        onKeyDown={handleKeyDown}
        onValueChange={nextValue => setDraftValue(nextValue)}
        placeholder={placeholder}
        prefix={prefix}
        ref={inputRef}
        size={size ?? config.size}
        status={resolvedInvalid ? 'error' : undefined}
        suffix={suffix}
        value={draftValue}
        variant={inputVariant}
      />
      {name ? <input name={name} type="hidden" value={currentValue} /> : null}
      {renderedPanel}
    </div>
  );
});

export const HAutoComplete = AutoComplete;
export type {
  AutoCompleteDescriptionPosition,
  AutoCompleteFitInputWidth,
  AutoCompleteOpenReason,
  AutoCompleteTrigger,
} from '@aurora/core';
