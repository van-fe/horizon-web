import type { CSSProperties, KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  CascaderCommonProps,
  CascaderDynamicLoadResult,
  CascaderModelValue,
  CascaderNavigationKey,
  CascaderNavigationState,
  CascaderNormalizedOption,
  CascaderOption as CoreCascaderOption,
  CascaderSelectionResult,
  CascaderSearchParams,
  CascaderValuePath,
  PickerInputStatus,
  PopoverPlacement,
} from '@aurora/core';
import {
  CASCADER_DEFAULTS,
  CascaderDynamicLoadController,
  CascaderSelectionController,
  filterCascaderOptions,
  findCascaderOptionByPath,
  getCascaderDescendantSelectionState,
  getCascaderDisplayLabel,
  looselyEqualCascaderValues,
  normalizeCascaderModelValue,
  normalizeCascaderOptions,
  reduceCascaderFlatNavigation,
  reduceCascaderNavigation,
  replaceCascaderOptionChildren,
} from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Checkbox } from '../Checkbox';
import { Picker } from '../Picker';
import type { PickerHandle, PickerProps, PickerTriggerContext } from '../Picker';
import { useFormFieldControl } from '../Form/context';

export interface CascaderOption extends CoreCascaderOption<ReactNode> {
  children?: CascaderOption[];
  groupLabel?: ReactNode;
}

export interface CascaderRenderContext {
  option: CascaderNormalizedOption<CascaderOption>;
  selected: boolean;
  active: boolean;
  loading: boolean;
}

export interface CascaderTriggerContext extends Omit<
  PickerTriggerContext<CascaderModelValue>,
  'triggerProps'
> {
  labels: readonly string[];
  triggerProps: Omit<
    PickerTriggerContext<CascaderModelValue>['triggerProps'],
    'aria-controls' | 'aria-haspopup'
  > & {
    'aria-controls'?: string;
    'aria-haspopup': 'tree';
  };
}

export interface CascaderHandle {
  readonly input: HTMLInputElement | null;
  readonly popup: HTMLDivElement | null;
  focus(): void;
  blur(): void;
  open(): void;
  close(): void;
  clear(): void;
  confirm(): void;
  cancel(): void;
  focusOption(path: CascaderValuePath): void;
  updatePosition(): Promise<void>;
}

export interface CascaderProps
  extends
    Omit<CascaderCommonProps<CascaderOption>, 'defaultValue' | 'filter' | 'modelValue' | 'options'>,
    Pick<
      PickerProps<CascaderModelValue>,
      | 'arrow'
      | 'cancelButtonProps'
      | 'confirmButtonProps'
      | 'distance'
      | 'fitInputWidth'
      | 'hoverHideDelay'
      | 'hoverShowDelay'
      | 'inputProps'
      | 'inputStyle'
      | 'panelClassName'
      | 'panelStyle'
      | 'portal'
      | 'portalContainer'
      | 'size'
      | 'skidding'
    > {
  /** 受控选中值路径。 @en Controlled selected value path or paths. */
  value?: CascaderModelValue;
  /** 非受控初始选中值路径。 @en Initial uncontrolled selected value path or paths. */
  defaultValue?: CascaderModelValue;
  /** 受控面板状态。 @en Controlled popup state. */
  open?: boolean;
  /** 非受控初始面板状态。 @en Initial uncontrolled popup state. */
  defaultOpen?: boolean;
  /** 层级选项树。 @en Hierarchical option tree. */
  options: readonly CascaderOption[];
  /** 输入框占位文字。 @en Trigger placeholder. */
  placeholder?: string;
  /** 输入框状态。 @en Trigger validation state. */
  inputStatus?: PickerInputStatus;
  /** 弹出位置。 @en Popup placement. */
  placement?: PopoverPlacement;
  /** 支持搜索。 @en Enables search. */
  filterable?: boolean;
  /** 搜索配置。 @en Search configuration. */
  filter?: boolean | CascaderSearchParams<CascaderNormalizedOption<CascaderOption>>;
  /** 动态加载子节点。 @en Loads child options dynamically. */
  loadChildren?: (
    option: CascaderNormalizedOption<CascaderOption>,
  ) => readonly CascaderOption[] | PromiseLike<readonly CascaderOption[]>;
  /** 自定义触发器。 @en Custom trigger renderer. */
  renderTrigger?: (context: CascaderTriggerContext) => ReactNode;
  /** 自定义选项。 @en Custom option renderer. */
  renderOption?: (context: CascaderRenderContext) => ReactNode;
  /** 自定义选中值。 @en Custom selection renderer. */
  renderValue?: (
    options: readonly CascaderNormalizedOption<CascaderOption>[],
    labels: readonly string[],
  ) => ReactNode;
  /** 面板头部。 @en Panel header content. */
  panelHeader?: ReactNode;
  /** 面板底部。 @en Panel footer content. */
  panelFooter?: ReactNode;
  /** 空状态内容。 @en Empty state content. */
  emptyContent?: ReactNode;
  /** 确认按钮文字。 @en Confirm button text. */
  confirmText?: string;
  /** 取消按钮文字。 @en Cancel button text. */
  cancelText?: string;
  /** 根元素类名。 @en Root class name. */
  className?: string;
  /** 根元素样式。 @en Root style. */
  style?: CSSProperties;
  /** 值变化回调。 @en Called when committed selection changes. */
  onValueChange?: (value: CascaderModelValue) => void;
  /** 面板状态变化回调。 @en Called when popup state changes. */
  onOpenChange?: PickerProps<CascaderModelValue>['onOpenChange'];
  /** 单项选择状态变化。 @en Called after an option selection changes. */
  onChange?: (
    selected: boolean,
    option: CascaderNormalizedOption<CascaderOption>,
    result: CascaderSelectionResult<CascaderOption>,
  ) => void;
  /** 选择回调。 @en Called after selection. */
  onSelect?: (path: CascaderValuePath, option: CascaderNormalizedOption<CascaderOption>) => void;
  /** 取消选择回调。 @en Called after deselection. */
  onDeselect?: (path: CascaderValuePath, option: CascaderNormalizedOption<CascaderOption>) => void;
  /** 搜索回调。 @en Called after search text changes. */
  onSearch?: (value: string) => void;
  /** 动态选项变化回调。 @en Called when dynamically loaded options change. */
  onOptionsChange?: (options: readonly CascaderOption[]) => void;
  /** 动态加载失败回调。 @en Called when dynamic loading rejects. */
  onLoadError?: (error: unknown, option: CascaderNormalizedOption<CascaderOption>) => void;
  /** 确认回调。 @en Called after confirming staged selection. */
  onConfirm?: (value: CascaderModelValue, event?: MouseEvent<HTMLElement>) => void;
  /** 取消回调。 @en Called after cancelling staged selection. */
  onCancel?: (value: CascaderModelValue, event?: MouseEvent<HTMLElement>) => void;
  /** 清空回调。 @en Called after clearing selection. */
  onClear?: () => void;
}

function CascaderImplementation(
  {
    value,
    defaultValue,
    open,
    defaultOpen,
    options,
    trigger = CASCADER_DEFAULTS.trigger,
    expandTrigger = CASCADER_DEFAULTS.expandTrigger,
    clearable = CASCADER_DEFAULTS.clearable,
    disabled = false,
    multiple = CASCADER_DEFAULTS.multiple,
    multipleLimit = CASCADER_DEFAULTS.multipleLimit,
    checkStrictly = CASCADER_DEFAULTS.checkStrictly,
    expandStrictly = CASCADER_DEFAULTS.expandStrictly,
    showCheckedStrategy = CASCADER_DEFAULTS.showCheckedStrategy,
    pathSeparator = CASCADER_DEFAULTS.pathSeparator,
    needConfirm = CASCADER_DEFAULTS.needConfirm,
    filterable = CASCADER_DEFAULTS.filterable,
    filter = CASCADER_DEFAULTS.filter,
    filterMethod,
    filterMaxResult = CASCADER_DEFAULTS.filterMaxResult,
    filterResultSort,
    reserveKeyword = CASCADER_DEFAULTS.reserveKeyword,
    fieldMap,
    loadChildren,
    renderTrigger,
    renderOption,
    renderValue,
    panelHeader,
    panelFooter,
    emptyContent,
    inputProps,
    placeholder,
    confirmText,
    cancelText,
    className,
    style,
    onValueChange,
    onOpenChange,
    onChange,
    onSelect,
    onDeselect,
    onSearch,
    onOptionsChange,
    onLoadError,
    onConfirm,
    onCancel,
    onClear,
    ...pickerProps
  }: CascaderProps,
  forwardedRef: React.ForwardedRef<CascaderHandle>,
): ReactElement {
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const classes = useMemo(
    () => new ComponentClassBlock('cascader', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const panelClasses = useMemo(
    () => new ComponentClassBlock('cascader-panel', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const panelsClasses = useMemo(
    () => new ComponentClassBlock('cascader-panels', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const itemClasses = useMemo(
    () => new ComponentClassBlock('cascader-item', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const pickerRef = useRef<PickerHandle>(null);
  const baseId = useId().replaceAll(':', '');
  const controlledRef = useRef(value !== undefined);
  const callbackRef = useRef({ onValueChange, onOptionsChange, onLoadError });
  const [uncontrolledValue, setUncontrolledValue] = useState<CascaderModelValue>(defaultValue);
  const [runtimeOptions, setRuntimeOptions] = useState<readonly CascaderOption[]>(options);
  const runtimeOptionsRef = useRef<readonly CascaderOption[]>(options);
  const [search, setSearch] = useState('');
  const [expandedPath, setExpandedPath] = useState<CascaderValuePath>([]);
  const [navigation, setNavigation] = useState<CascaderNavigationState>({
    open: open ?? defaultOpen ?? false,
  });
  const [loadingIds, setLoadingIds] = useState<ReadonlySet<number>>(new Set());
  const [, forceRender] = useState(0);
  const mountedRef = useRef(true);
  const currentValue = value === undefined ? uncontrolledValue : value;
  controlledRef.current = value !== undefined;
  callbackRef.current = { onValueChange, onOptionsChange, onLoadError };

  const selectionRef = useRef<CascaderSelectionController>(null);
  if (!selectionRef.current) {
    selectionRef.current = new CascaderSelectionController({
      value,
      defaultValue,
      multiple,
      multipleLimit,
      checkStrictly,
      needConfirm,
      onValueChange: nextValue => {
        if (!controlledRef.current) setUncontrolledValue(nextValue);
        callbackRef.current.onValueChange?.(nextValue);
        formField?.notify('change');
      },
    });
  }
  const selection = selectionRef.current;
  const dynamicLoadRef = useRef(new CascaderDynamicLoadController<CascaderOption>());

  useEffect(() => {
    runtimeOptionsRef.current = options;
    setRuntimeOptions(options);
    setLoadingIds(new Set());
    dynamicLoadRef.current.invalidate();
  }, [options]);

  useEffect(() => {
    setLoadingIds(new Set());
    dynamicLoadRef.current.invalidate();
  }, [fieldMap, loadChildren]);

  useEffect(() => {
    selection.setOptions({ value, multiple, multipleLimit, checkStrictly, needConfirm });
    if (value === undefined && !looselyEqualCascaderValues(uncontrolledValue, selection.value)) {
      setUncontrolledValue(selection.value);
    }
    forceRender(count => count + 1);
  }, [checkStrictly, multiple, multipleLimit, needConfirm, selection, uncontrolledValue, value]);

  useEffect(() => {
    if (open === undefined) return;
    setNavigation(current =>
      current.open === open ? current : { ...current, open: Boolean(open) },
    );
    if (!open && needConfirm) {
      selection.cancel();
      forceRender(count => count + 1);
    }
  }, [needConfirm, open, selection]);

  useEffect(() => {
    const controller = new CascaderDynamicLoadController<CascaderOption>();
    dynamicLoadRef.current = controller;
    setLoadingIds(new Set());
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      controller.destroy();
    };
  }, []);

  const tree = useMemo(
    () => normalizeCascaderOptions(runtimeOptions, fieldMap),
    [fieldMap, runtimeOptions],
  );
  const selectedPaths = normalizeCascaderModelValue(
    needConfirm && navigation.open ? selection.pendingValue : currentValue,
  );
  const displayPaths = normalizeCascaderModelValue(currentValue);
  const selectedOptions = displayPaths
    .map(path => findCascaderOptionByPath(tree.roots, path, true))
    .filter((option): option is CascaderNormalizedOption<CascaderOption> => Boolean(option));
  const labels = displayPaths.map(path =>
    getCascaderDisplayLabel(
      findCascaderOptionByPath(tree.roots, path, true),
      path,
      showCheckedStrategy,
      pathSeparator,
    ),
  );
  const searchEnabled = filterable || Boolean(filter);
  const filterConfig = typeof filter === 'object' ? filter : undefined;
  const filteredOptions = useMemo(
    () =>
      filterCascaderOptions(tree.flat, {
        input: search,
        checkStrictly,
        filter: filterConfig?.filter ?? filterMethod,
        sort: filterConfig?.sort ?? filterResultSort,
        limit: filterConfig?.limit ?? filterMaxResult,
      }),
    [
      checkStrictly,
      filterConfig?.filter,
      filterConfig?.limit,
      filterConfig?.sort,
      filterMaxResult,
      filterMethod,
      filterResultSort,
      search,
      tree.flat,
    ],
  );
  const panels = useMemo(() => {
    const result: CascaderNormalizedOption<CascaderOption>[][] = [tree.roots];
    let siblings = tree.roots;
    for (const valuePart of expandedPath) {
      const option = siblings.find(item => item.value === valuePart);
      if (!option?.children.length) break;
      result.push(option.children);
      siblings = option.children;
    }
    return result;
  }, [expandedPath, tree.roots]);
  const activeOption =
    navigation.activeId === undefined ? undefined : tree.byId.get(navigation.activeId);
  const panelId = `${baseId}-cascader-tree`;
  const searching = searchEnabled && search.length > 0;

  useEffect(() => {
    if (!searching) return;
    setNavigation(current => {
      if (filteredOptions.some(option => option.id === current.activeId)) return current;
      const first = filteredOptions.find(
        option => !option.disabled && (checkStrictly || !option.passingDisabled),
      );
      return { ...current, activeId: first?.id };
    });
  }, [checkStrictly, filteredOptions, searching]);

  function isSelected(option: CascaderNormalizedOption<CascaderOption>): boolean {
    if (!option.isLeaf && !checkStrictly) {
      return getCascaderDescendantSelectionState(option, selectedPaths, false) === 'all';
    }
    return selectedPaths.some(path => looselyEqualCascaderValues(path, option.path));
  }

  function commitOption(option: CascaderNormalizedOption<CascaderOption>): void {
    const result =
      multiple && !checkStrictly && !option.isLeaf
        ? selection.toggleBranch(option)
        : selection.select(option);
    if (!['selected', 'deselected'].includes(result.status)) return;
    if (result.committed && controlledRef.current) selection.syncValue(currentValue);
    forceRender(count => count + 1);
    if (
      multiple &&
      (!reserveKeyword || (reserveKeyword === 'reserve-deselect' && result.selected))
    ) {
      setExpandedPath(option.parent?.path ?? []);
      setSearch('');
    }
    onChange?.(result.selected, option, result);
    if (result.selected) onSelect?.(option.path.slice(), option);
    else onDeselect?.(option.path.slice(), option);
    if (!multiple && result.committed) pickerRef.current?.close();
  }

  async function expandOption(option: CascaderNormalizedOption<CascaderOption>): Promise<void> {
    if (option.isLeaf) {
      commitOption(option);
      return;
    }
    setExpandedPath(option.path.slice());
    if (option.children.length || !loadChildren) return;
    setLoadingIds(current => new Set(current).add(option.id));
    const result: CascaderDynamicLoadResult<CascaderOption> = await dynamicLoadRef.current.load(
      option,
      loadChildren,
    );
    if (!mountedRef.current) return;
    if (result.status === 'loaded') {
      const next = replaceCascaderOptionChildren(
        runtimeOptionsRef.current,
        option.path,
        result.children,
        fieldMap,
      );
      runtimeOptionsRef.current = next;
      setRuntimeOptions(next);
      callbackRef.current.onOptionsChange?.(next);
    } else if (result.status === 'rejected') {
      callbackRef.current.onLoadError?.(result.error, option);
    }
    if (result.status === 'deduplicated' || result.status === 'stale') return;
    setLoadingIds(current => {
      const next = new Set(current);
      next.delete(option.id);
      return next;
    });
  }

  function handleOption(option: CascaderNormalizedOption<CascaderOption>): void {
    if (disabled || option.disabled || (!checkStrictly && option.passingDisabled)) return;
    if (option.isLeaf || checkStrictly || multiple) commitOption(option);
    if (!option.isLeaf && (!checkStrictly || !expandStrictly)) void expandOption(option);
  }

  function handleNavigation(event: KeyboardEvent<HTMLElement>): void {
    const key = event.key as CascaderNavigationKey;
    if (
      ![
        'ArrowDown',
        'ArrowUp',
        'ArrowLeft',
        'ArrowRight',
        'Home',
        'End',
        'Enter',
        'Escape',
      ].includes(key)
    )
      return;
    event.preventDefault();
    const result = searching
      ? reduceCascaderFlatNavigation(filteredOptions, navigation, key, checkStrictly)
      : reduceCascaderNavigation(tree.roots, navigation, key, checkStrictly);
    setNavigation(result.state);
    if (result.action === 'open') pickerRef.current?.open();
    if (result.action === 'close') {
      pickerRef.current?.close();
      pickerRef.current?.focus();
    }
    if (!searching && key === 'ArrowRight' && activeOption && !activeOption.isLeaf) {
      void expandOption(activeOption);
    }
    if (result.action === 'activate') {
      const option =
        result.state.activeId === undefined ? undefined : tree.byId.get(result.state.activeId);
      if (option) handleOption(option);
    }
  }

  function confirm(event?: MouseEvent<HTMLElement>): void {
    const nextValue = selection.confirm();
    if (controlledRef.current) selection.syncValue(currentValue);
    forceRender(count => count + 1);
    onConfirm?.(nextValue, event);
    if (!event) pickerRef.current?.close();
  }

  function cancel(event?: MouseEvent<HTMLElement>): void {
    const nextValue = selection.cancel();
    forceRender(count => count + 1);
    onCancel?.(nextValue, event);
    if (!event) pickerRef.current?.close();
  }

  function clear(): void {
    const nextValue = selection.clear();
    if (needConfirm) selection.confirm();
    if (controlledRef.current) selection.syncValue(currentValue);
    forceRender(count => count + 1);
    if (!controlledRef.current) setUncontrolledValue(nextValue);
    onClear?.();
  }

  useImperativeHandle(forwardedRef, () => ({
    get input() {
      return pickerRef.current?.input ?? null;
    },
    get popup() {
      return pickerRef.current?.popup ?? null;
    },
    focus: () => pickerRef.current?.focus(),
    blur: () => pickerRef.current?.blur(),
    open: () => pickerRef.current?.open(),
    close: () => pickerRef.current?.close(),
    clear,
    confirm: () => confirm(),
    cancel: () => cancel(),
    focusOption(path) {
      const option = findCascaderOptionByPath(tree.roots, path, true);
      if (option) {
        setExpandedPath(option.parent?.path ?? []);
        setNavigation({ open: true, activeId: option.id });
      }
    },
    async updatePosition() {
      await pickerRef.current?.updatePosition();
    },
  }));

  const displayValue = renderValue?.(selectedOptions, labels) ?? labels.join(', ');
  const panelContent = searching ? filteredOptions : undefined;
  const renderItem = (option: CascaderNormalizedOption<CascaderOption>): ReactElement => {
    const selected = isSelected(option);
    const descendantState =
      !option.isLeaf && !checkStrictly
        ? getCascaderDescendantSelectionState(option, selectedPaths, false)
        : selected
          ? 'all'
          : 'none';
    const active = activeOption?.id === option.id;
    const loading = loadingIds.has(option.id);
    const inheritedDisabled = !checkStrictly && option.passingDisabled;
    const optionDisabled = disabled || option.disabled || inheritedDisabled;
    return (
      <div
        aria-checked={
          multiple ? (descendantState === 'indeterminate' ? 'mixed' : selected) : undefined
        }
        aria-disabled={optionDisabled || !option.selectable || undefined}
        aria-expanded={!option.isLeaf ? expandedPath[option.level] === option.value : undefined}
        aria-level={option.level + 1}
        aria-selected={!multiple ? selected : undefined}
        className={cls(
          itemClasses.block,
          itemClasses.has('icon', !option.isLeaf),
          itemClasses.is('active', selected),
          itemClasses.is('disabled', optionDisabled || !option.selectable),
          itemClasses.is('focus', active),
        )}
        data-cascader-option-id={String(option.id)}
        id={`${baseId}-cascader-option-${option.id}`}
        key={option.id}
        role="treeitem"
        tabIndex={-1}
        onClick={() => handleOption(option)}
        onMouseEnter={() => {
          setNavigation({ open: true, activeId: option.id });
          if (expandTrigger === 'hover' && !option.isLeaf) void expandOption(option);
        }}
      >
        <span className={itemClasses.e('inner')}>
          {multiple ? (
            <span className={itemClasses.e('checkbox')} onClick={event => event.stopPropagation()}>
              <Checkbox
                disabled={optionDisabled || !option.selectable}
                indeterminate={descendantState === 'indeterminate'}
                inputProps={{ 'aria-hidden': true, tabIndex: -1 }}
                value={selected}
                onChange={() => handleOption(option)}
              >
                {''}
              </Checkbox>
            </span>
          ) : null}
          <span className={itemClasses.e('content-wrapper')}>
            <span className={itemClasses.e('content')}>
              {renderOption?.({ option, selected, active, loading }) ?? option.label}
            </span>
          </span>
          {!option.isLeaf ? (
            <span aria-hidden className={itemClasses.e('icon')}>
              {loading ? '…' : '›'}
            </span>
          ) : selected && !multiple ? (
            <span aria-hidden className={itemClasses.e('icon')}>
              ✓
            </span>
          ) : null}
        </span>
      </div>
    );
  };

  return (
    <div
      className={cls(classes.block, classes.is('inputable', searchEnabled), className)}
      style={style}
    >
      <Picker<CascaderModelValue>
        {...pickerProps}
        ref={pickerRef}
        arrow={pickerProps.arrow}
        cancelText={cancelText}
        clearable={clearable}
        clearValue={multiple ? [] : undefined}
        defaultOpen={defaultOpen}
        disabled={disabled}
        emptyContent={emptyContent ?? config.cascaderLabels.empty}
        fitInputWidth={pickerProps.fitInputWidth ?? 'fit-content'}
        formatValue={() => (searchEnabled && navigation.open ? search : displayValue)}
        inputProps={{
          ...inputProps,
          'aria-activedescendant':
            navigation.open && activeOption
              ? `${baseId}-cascader-option-${activeOption.id}`
              : undefined,
          'aria-autocomplete': searchEnabled ? 'list' : 'none',
          'aria-controls': navigation.open ? panelId : undefined,
          'aria-haspopup': 'tree',
        }}
        inputStatus={formField?.invalid ? 'error' : pickerProps.inputStatus}
        inputable={searchEnabled}
        needConfirm={needConfirm}
        open={open}
        panelFooter={panelFooter}
        panelHeader={panelHeader}
        placeholder={placeholder ?? config.cascaderLabels.placeholder}
        trigger={trigger}
        value={currentValue}
        confirmText={confirmText}
        onCancel={cancel}
        onClear={clear}
        onConfirm={confirm}
        onInput={event => {
          setSearch(event.currentTarget.value);
          onSearch?.(event.currentTarget.value);
        }}
        onKeyDown={handleNavigation}
        onOpenChange={(nextOpen, details) => {
          const resolvedOpen = open === undefined ? nextOpen : Boolean(open);
          setNavigation(current => ({
            ...current,
            open: resolvedOpen,
          }));
          if (nextOpen && resolvedOpen) selection.begin();
          if (!resolvedOpen) {
            if (needConfirm) selection.cancel();
            setSearch('');
          }
          onOpenChange?.(nextOpen, details);
        }}
        renderTrigger={
          renderTrigger
            ? context =>
                renderTrigger({
                  ...context,
                  labels,
                  triggerProps: {
                    ...context.triggerProps,
                    'aria-controls': navigation.open ? panelId : undefined,
                    'aria-haspopup': 'tree',
                  },
                })
            : undefined
        }
      >
        <div
          aria-multiselectable={multiple || undefined}
          className={panelsClasses.block}
          id={panelId}
          role="tree"
        >
          {(panelContent ? [panelContent] : panels).map((panel, panelIndex) => (
            <div
              aria-label={`${config.cascaderLabels.level} ${panelIndex + 1}`}
              className={panelClasses.block}
              key={panelContent ? 'search' : panelIndex}
              role="group"
              style={
                panelContent && filterConfig?.searchPanelWidth !== undefined
                  ? {
                      inlineSize:
                        typeof filterConfig.searchPanelWidth === 'number'
                          ? `${filterConfig.searchPanelWidth}px`
                          : filterConfig.searchPanelWidth,
                      maxInlineSize: '100%',
                    }
                  : undefined
              }
            >
              {panel.length ? (
                panel.map(option =>
                  option.groupLabel === undefined ? (
                    renderItem(option)
                  ) : (
                    <div
                      className={panelClasses.e('group-label')}
                      key={option.id}
                      role="presentation"
                    >
                      {option.groupLabel as ReactNode}
                    </div>
                  ),
                )
              ) : (
                <div className={panelClasses.e('empty')}>
                  {emptyContent ?? config.cascaderLabels.empty}
                </div>
              )}
            </div>
          ))}
        </div>
      </Picker>
    </div>
  );
}

export const Cascader = forwardRef(CascaderImplementation);
export const HCascader = Cascader;
