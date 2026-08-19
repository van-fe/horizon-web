import type {
  CSSProperties,
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
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  PickerOpenChangeDetails,
  TreeCommandMap,
  TreeFieldMap,
  TreeNormalizedNode,
  TreeSelectCommonProps,
  TreeSelectModelValue,
  TreeSelectTagData,
  TreeValue,
} from '@aurora/core';
import {
  createTreeSelectTags,
  normalizeTree,
  normalizeTreeSelectValue,
  resolveTreeSelectDisplay,
  resolveTreeSelectKeywordAfterSelection,
  TREE_SELECT_DEFAULTS,
  TreeSelectController,
} from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { useFormFieldControl } from '../Form/context';
import { Picker } from '../Picker';
import type { PickerHandle, PickerProps, PickerTriggerContext } from '../Picker';
import { Tree } from '../Tree';
import type {
  TreeExpandCallbackDetails,
  TreeHandle,
  TreeNodeRenderContext,
  TreeOption,
  TreeProps,
  TreeSelectCallbackDetails,
} from '../Tree';

export type TreeSelectOption = TreeOption;

export interface TreeSelectTriggerContext extends Omit<
  PickerTriggerContext<TreeSelectModelValue>,
  'triggerProps'
> {
  selectedNodes: readonly TreeNormalizedNode<TreeSelectOption>[];
  tags: readonly TreeSelectTagData<TreeSelectOption>[];
  triggerProps: Omit<
    PickerTriggerContext<TreeSelectModelValue>['triggerProps'],
    'aria-controls' | 'aria-haspopup'
  > & {
    'aria-controls'?: string;
    'aria-haspopup': 'tree';
  };
}

type RendererOwnedProps =
  | 'collapseTagsFillUp'
  | 'defaultExpandValues'
  | 'expandIcon'
  | 'expandWrapperByChildren'
  | 'fitContentInputMinWidth'
  | 'filterInputValue'
  | 'flip'
  | 'foldIcon'
  | 'inputDebounce'
  | 'prefixIcon'
  | 'selectedValues'
  | 'tooltipHideAfter'
  | 'tooltipShowAfter'
  | 'useBuiltInPanelFilter'
  | 'useVirtualScroll'
  | 'virtualScrollBuffer';

export interface TreeSelectProps
  extends
    Omit<
      TreeSelectCommonProps<TreeSelectOption>,
      RendererOwnedProps | 'defaultTreeData' | 'filterValue' | 'treeData' | 'value'
    >,
    Pick<
      PickerProps<TreeSelectModelValue>,
      | 'arrow'
      | 'cancelButtonProps'
      | 'confirmButtonProps'
      | 'distance'
      | 'inputProps'
      | 'panelStyle'
      | 'portalContainer'
      | 'skidding'
    > {
  /** 受控选择值。 @en Controlled selected value. */
  value?: TreeSelectModelValue;
  /** 非受控选择初值。 @en Initial uncontrolled selected value. */
  defaultValue?: TreeSelectModelValue;
  /** 受控面板状态。 @en Controlled popup state. */
  open?: boolean;
  /** 非受控面板初始状态。 @en Initial uncontrolled popup state. */
  defaultOpen?: boolean;
  /** 受控过滤文字。 @en Controlled filter text. */
  filterValue?: string;
  /** 非受控过滤初值。 @en Initial uncontrolled filter text. */
  defaultFilterValue?: string;
  /** 受控树数据。 @en Controlled tree data. */
  treeData?: readonly TreeSelectOption[];
  /** 非受控树数据初值。 @en Initial uncontrolled tree data. */
  defaultTreeData?: readonly TreeSelectOption[];
  /** 受控展开值。 @en Controlled expanded values. */
  expandValues?: readonly TreeValue[];
  /** 非受控展开初值。 @en Initial uncontrolled expanded values. */
  defaultExpandedValues?: readonly TreeValue[];
  /** 自定义完整触发器。 @en Custom complete trigger. */
  renderTrigger?: (context: TreeSelectTriggerContext) => ReactNode;
  /** 自定义标签。 @en Custom selected tag. */
  renderTag?: (tag: TreeSelectTagData<TreeSelectOption>) => ReactNode;
  /** 自定义选择展示。 @en Custom selection display. */
  renderSelection?: (
    nodes: readonly TreeNormalizedNode<TreeSelectOption>[],
    tags: readonly TreeSelectTagData<TreeSelectOption>[],
  ) => ReactNode;
  /** 自定义树节点。 @en Custom tree node. */
  renderNode?: (context: TreeNodeRenderContext) => ReactNode;
  /** 面板头部。 @en Popup header. */
  panelHeader?: ReactNode;
  /** 面板底部。 @en Popup footer. */
  panelFooter?: ReactNode;
  /** 空状态内容。 @en Empty-state content. */
  emptyContent?: ReactNode;
  /** 根元素类名。 @en Root class name. */
  className?: string;
  /** 根元素样式。 @en Root style. */
  style?: CSSProperties;
  /** 值变化。 @en Called when the committed value changes. */
  onValueChange?: (value: TreeSelectModelValue) => void;
  /** 面板状态变化。 @en Called when popup state changes. */
  onOpenChange?: (open: boolean, details: PickerOpenChangeDetails) => void;
  /** 过滤文字变化。 @en Called when filter text changes. */
  onFilterValueChange?: (value: string) => void;
  /** 展开值变化。 @en Called when expanded values change. */
  onExpandedValuesChange?: (values: TreeValue[]) => void;
  /** 树数据变化。 @en Called when tree data changes. */
  onTreeDataChange?: (data: readonly TreeSelectOption[]) => void;
  /** 树节点展开。 @en Called after a node expansion changes. */
  onExpand?: TreeProps['onExpand'];
  /** 树节点选择。 @en Called after a node selection changes. */
  onSelect?: TreeProps['onSelect'];
  /** 树节点点击。 @en Called when a node is clicked. */
  onNodeClick?: TreeProps['onNodeClick'];
  /** 树节点右键。 @en Called when a node is context-clicked. */
  onNodeContextMenu?: TreeProps['onNodeContextMenu'];
  /** 动态加载失败。 @en Called when dynamic loading rejects. */
  onLoadError?: TreeProps['onLoadError'];
  /** 拖放失败。 @en Called when an asynchronous drop rejects. */
  onDropError?: TreeProps['onDropError'];
  /** 确认暂存选择。 @en Called after confirming staged selection. */
  onConfirm?: (value: TreeSelectModelValue, event?: MouseEvent<HTMLElement>) => void;
  /** 取消暂存选择。 @en Called after cancelling staged selection. */
  onCancel?: (value: TreeSelectModelValue, event?: MouseEvent<HTMLElement>) => void;
  /** 清空选择。 @en Called after clearing selection. */
  onClear?: (value: TreeSelectModelValue) => void;
}

export interface TreeSelectHandle extends TreeCommandMap<TreeSelectOption> {
  readonly input: HTMLInputElement | null;
  readonly popup: HTMLDivElement | null;
  focus(): void;
  blur(): void;
  open(): void;
  close(): void;
  clear(): void;
  confirm(): TreeSelectModelValue;
  cancel(): TreeSelectModelValue;
  setFilterValue(value: string): void;
  getPendingValue(): TreeSelectModelValue;
  updatePosition(): Promise<void>;
}

function valueToken(value: TreeValue): string {
  return `${typeof value}:${String(value)}`;
}

function TreeSelectImplementation(
  props: TreeSelectProps,
  forwardedRef: React.ForwardedRef<TreeSelectHandle>,
): ReactElement {
  const {
    value,
    defaultValue,
    initialValue = TREE_SELECT_DEFAULTS.initialValue,
    open,
    defaultOpen = TREE_SELECT_DEFAULTS.defaultOpen,
    filterValue,
    defaultFilterValue = '',
    treeData,
    defaultTreeData = [] as readonly TreeSelectOption[],
    fieldMap,
    disabled = TREE_SELECT_DEFAULTS.disabled,
    clearable = TREE_SELECT_DEFAULTS.clearable,
    trigger = TREE_SELECT_DEFAULTS.trigger,
    placement = TREE_SELECT_DEFAULTS.placement,
    portal = TREE_SELECT_DEFAULTS.portal,
    inputVariant = TREE_SELECT_DEFAULTS.inputVariant,
    inputStatus = TREE_SELECT_DEFAULTS.inputStatus,
    size = TREE_SELECT_DEFAULTS.size,
    treeSize,
    placeholder,
    multiple = TREE_SELECT_DEFAULTS.multiple,
    multipleLimit = TREE_SELECT_DEFAULTS.multipleLimit,
    checkStrictly = TREE_SELECT_DEFAULTS.checkStrictly,
    parentEffectDisabledChild = TREE_SELECT_DEFAULTS.parentEffectDisabledChild,
    needConfirm = TREE_SELECT_DEFAULTS.needConfirm,
    reserveKeyword = true,
    filterable = TREE_SELECT_DEFAULTS.filterable,
    filterMethod,
    filterToHideChildren = TREE_SELECT_DEFAULTS.filterToHideChildren,
    expandFilteredTree = TREE_SELECT_DEFAULTS.expandFilteredTree,
    expandValues,
    defaultExpandedValues,
    collapseTags = TREE_SELECT_DEFAULTS.collapseTags,
    collapseTagsTooltip = TREE_SELECT_DEFAULTS.collapseTagsTooltip,
    maxCollapseTags,
    useStatistic = TREE_SELECT_DEFAULTS.useStatistic,
    statisticText,
    panelWidth,
    popupClassName,
    panelFilterable,
    panelInputPlaceholder,
    hideFilterInput,
    searchInputPlaceholder,
    renderTrigger,
    renderTag,
    renderSelection,
    renderNode,
    panelHeader,
    panelFooter,
    emptyContent,
    arrow,
    cancelButtonProps,
    cancelText,
    confirmButtonProps,
    confirmText,
    distance,
    fitInputWidth,
    hoverHideDelay,
    hoverShowDelay,
    inputProps,
    panelStyle,
    portalContainer,
    skidding,
    className,
    style,
    onValueChange,
    onOpenChange,
    onFilterValueChange,
    onExpandedValuesChange,
    onTreeDataChange,
    onExpand,
    onSelect,
    onNodeClick,
    onNodeContextMenu,
    onLoadError,
    onDropError,
    onConfirm,
    onCancel,
    onClear,
    ...rest
  } = props;
  const valueControlled = Object.hasOwn(props, 'value');
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const classes = useMemo(
    () => new ComponentClassBlock('tree-select', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const generatedId = useId().replaceAll(':', '');
  const treeId = `${generatedId}-tree-select-tree`;
  const pickerRef = useRef<PickerHandle>(null);
  const treeRef = useRef<TreeHandle>(null);
  const previousLabels = useRef(new Map<TreeValue, string>());
  const [uncontrolledValue, setUncontrolledValue] = useState<TreeSelectModelValue>(defaultValue);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [uncontrolledFilter, setUncontrolledFilter] = useState(defaultFilterValue);
  const [uncontrolledTreeData, setUncontrolledTreeData] =
    useState<readonly TreeSelectOption[]>(defaultTreeData);
  const currentValue = valueControlled ? value : uncontrolledValue;
  const currentOpen = open === undefined ? uncontrolledOpen : open;
  const currentFilter = filterValue === undefined ? uncontrolledFilter : filterValue;
  const previousOpen = useRef(currentOpen);
  const [pendingValue, setPendingValue] = useState<TreeSelectModelValue>(currentValue);
  const runtimeData: readonly TreeSelectOption[] = treeData ?? uncontrolledTreeData;
  const normalizedTree = useMemo(
    () => normalizeTree<TreeSelectOption>(runtimeData, fieldMap),
    [fieldMap, runtimeData],
  );
  const committedValues = normalizeTreeSelectValue(currentValue);
  const stagedValues = normalizeTreeSelectValue(
    needConfirm && currentOpen ? pendingValue : currentValue,
  );

  useEffect(() => {
    if (!currentOpen || !needConfirm) setPendingValue(currentValue);
  }, [currentOpen, currentValue, needConfirm]);

  useEffect(() => {
    const wasOpen = previousOpen.current;
    previousOpen.current = currentOpen;
    if (wasOpen && !currentOpen && currentFilter) setFilter('');
  }, [currentFilter, currentOpen]);

  const tags = createTreeSelectTags<TreeSelectOption>(normalizedTree, committedValues, {
    checkStrictly,
    disabled: disabled || formField?.disabled,
    previousLabels: previousLabels.current,
  });
  useEffect(() => {
    for (const tag of tags) previousLabels.current.set(tag.value, tag.label);
  }, [tags]);
  const selectedNodes = tags.flatMap(tag => (tag.node ? [tag.node] : []));
  const display = resolveTreeSelectDisplay<TreeSelectOption>(normalizedTree, committedValues, {
    multiple,
    filterable,
    filterValue: currentOpen ? currentFilter : '',
    useStatistic,
    text: statisticText,
    singularText: config.treeSelectLabels.selection,
    pluralText: config.treeSelectLabels.selections,
    previousLabels: previousLabels.current,
  });

  function createSession(pending = pendingValue): TreeSelectController<TreeSelectOption> {
    return new TreeSelectController<TreeSelectOption>({
      value: currentValue,
      pendingValue: pending,
      open: currentOpen,
      filterValue: currentFilter,
      initialValue,
      treeData: runtimeData,
      fieldMap,
      disabled: disabled || formField?.disabled,
      multiple,
      multipleLimit,
      checkStrictly,
      parentEffectDisabledChild,
      needConfirm,
      controlledPolicy: valueControlled ? 'strict' : 'optimistic',
      dismissBehavior: 'reset-immediate',
      clearBehavior: 'commit',
      removeBehavior: 'commit',
      onValueChange: next => {
        if (!valueControlled) setUncontrolledValue(next);
        onValueChange?.(next);
        formField?.notify('change');
      },
      onClear: next => onClear?.(next),
    });
  }

  function requestOpen(nextOpen: boolean, details: PickerOpenChangeDetails): void {
    if (open === undefined) setUncontrolledOpen(nextOpen);
    const resolvedOpen = open === undefined ? nextOpen : Boolean(open);
    if (resolvedOpen !== currentOpen || !resolvedOpen) {
      setPendingValue(currentValue);
    }
    onOpenChange?.(nextOpen, details);
  }

  function stage(nextValues: readonly TreeValue[]): void {
    const session = createSession();
    const result = session.stageValues(nextValues);
    setPendingValue(result.pendingValue);
    if (!needConfirm && !multiple && result.changed) pickerRef.current?.close();
  }

  function applyKeyword(details: TreeSelectCallbackDetails): void {
    const keyword = resolveTreeSelectKeywordAfterSelection(
      reserveKeyword,
      details.checked,
      currentFilter,
      currentFilter,
    );
    setFilter(keyword.filterValue);
  }

  function clear(): TreeSelectModelValue {
    if (disabled || formField?.disabled) return currentValue;
    const session = createSession();
    const result = session.clear();
    setPendingValue(result.pendingValue);
    setFilter('');
    return result.pendingValue;
  }

  function remove(valueToRemove: TreeValue): void {
    const session = createSession();
    const result = session.removeValue(valueToRemove);
    setPendingValue(result.pendingValue);
  }

  function confirm(event?: MouseEvent<HTMLElement>): TreeSelectModelValue {
    if (!needConfirm || disabled || formField?.disabled) return currentValue;
    const session = createSession();
    const proposed = session.confirm();
    setPendingValue(currentValue);
    onConfirm?.(proposed, event);
    return proposed;
  }

  function cancel(event?: MouseEvent<HTMLElement>): TreeSelectModelValue {
    if (!needConfirm || disabled || formField?.disabled) return currentValue;
    const session = createSession();
    const committed = session.cancel();
    setPendingValue(currentValue);
    onCancel?.(committed, event);
    return committed;
  }

  function setFilter(next: string): void {
    if (next === currentFilter) return;
    if (filterValue === undefined && next !== currentFilter) setUncontrolledFilter(next);
    onFilterValueChange?.(next);
  }

  function commitTreeData(next: readonly TreeSelectOption[]): void {
    if (treeData === undefined) setUncontrolledTreeData(next);
    onTreeDataChange?.(next);
  }

  useImperativeHandle(forwardedRef, () => ({
    get input() {
      return pickerRef.current!.input;
    },
    get popup() {
      return pickerRef.current!.popup;
    },
    focus: () => pickerRef.current?.focus(),
    blur: () => pickerRef.current?.blur(),
    open: () => pickerRef.current?.open(),
    close: () => pickerRef.current?.close(),
    clear: () => void clear(),
    confirm: () => {
      const value = confirm();
      if (needConfirm && !disabled && !formField?.disabled) pickerRef.current?.close();
      return value;
    },
    cancel: () => {
      const value = cancel();
      if (needConfirm && !disabled && !formField?.disabled) pickerRef.current?.close();
      return value;
    },
    setFilterValue: setFilter,
    getPendingValue: () => pendingValue,
    updatePosition: async () => pickerRef.current?.updatePosition(),
    getSelectedNodes: () => treeRef.current!.getSelectedNodes(),
    getPartSelectedNodes: () => treeRef.current!.getPartSelectedNodes(),
    getUnselectedNodes: () => treeRef.current!.getUnselectedNodes(),
    setSelectedStatus: (values, selected) => treeRef.current?.setSelectedStatus(values, selected),
    clearSelectedValues: () => treeRef.current?.clearSelectedValues(),
    getExpandNodes: () => treeRef.current!.getExpandNodes(),
    setExpandedStatus: (values, expanded) => treeRef.current?.setExpandedStatus(values, expanded),
    setAllExpandedStatus: expanded => treeRef.current?.setAllExpandedStatus(expanded),
    getNodesByValue: values => treeRef.current!.getNodesByValue(values),
    setNodeByValue: (data, selectedValue) => treeRef.current?.setNodeByValue(data, selectedValue),
    addNodeChildrenByValue: (data, selectedValue) =>
      treeRef.current?.addNodeChildrenByValue(data, selectedValue),
    deleteNodeByValue: selectedValue => treeRef.current?.deleteNodeByValue(selectedValue),
    getVisibleItems: () => treeRef.current!.getVisibleItems(),
    scrollTo: selectedValue => treeRef.current?.scrollTo(selectedValue),
  }));

  const visibleTags =
    collapseTags && maxCollapseTags !== undefined ? tags.slice(0, maxCollapseTags) : tags;
  const hiddenTags = tags.slice(visibleTags.length);
  const selectionContent =
    renderSelection?.(selectedNodes, tags) ??
    (multiple ? (
      useStatistic ? (
        <span className={classes.e('summary')}>{display}</span>
      ) : (
        <span className={classes.e('values')}>
          {visibleTags.map(tag => (
            <span
              aria-disabled={tag.disabled || undefined}
              className={cls(classes.e('tag'), classes.is('disabled', tag.disabled))}
              key={valueToken(tag.value)}
            >
              <span>{renderTag?.(tag) ?? tag.fullPathLabel}</span>
              {tag.removable ? (
                <button
                  aria-label={`${config.treeSelectLabels.remove} ${tag.fullPathLabel}`}
                  className={classes.e('tag-remove')}
                  type="button"
                  onClick={event => {
                    event.stopPropagation();
                    remove(tag.value);
                  }}
                >
                  ×
                </button>
              ) : null}
            </span>
          ))}
          {hiddenTags.length ? (
            <span
              className={classes.e('tag')}
              title={
                collapseTagsTooltip
                  ? hiddenTags.map(tag => tag.fullPathLabel).join(', ')
                  : undefined
              }
            >
              +{hiddenTags.length}
            </span>
          ) : null}
        </span>
      )
    ) : null);

  const treeProps = rest as Omit<TreeProps, 'treeData'>;
  return (
    <Picker<TreeSelectModelValue>
      ref={pickerRef}
      arrow={arrow}
      cancelButtonProps={cancelButtonProps}
      cancelText={cancelText}
      clearable={clearable}
      clearValue={multiple ? [] : undefined}
      defaultOpen={defaultOpen}
      disabled={disabled}
      distance={distance}
      destroyOnHide={false}
      emptyContent={emptyContent ?? config.treeSelectLabels.empty}
      fitInputWidth={fitInputWidth ?? 'fit-content'}
      formatValue={() =>
        filterable && currentOpen ? currentFilter : multiple ? ' ' : (display ?? '')
      }
      hoverHideDelay={hoverHideDelay}
      hoverShowDelay={hoverShowDelay}
      inputProps={
        {
          ...inputProps,
          'aria-autocomplete': filterable ? 'list' : 'none',
          'aria-controls': currentOpen ? treeId : undefined,
          'aria-haspopup': 'tree',
        } as InputHTMLAttributes<HTMLInputElement>
      }
      inputStatus={formField?.invalid ? 'error' : inputStatus}
      inputStyle={inputVariant}
      inputable={filterable}
      needConfirm={needConfirm}
      open={open}
      panelClassName={cls(classes.e('panel'), popupClassName)}
      panelFooter={panelFooter}
      panelHeader={panelHeader}
      panelStyle={{
        ...panelStyle,
        inlineSize: panelWidth,
        maxInlineSize: '100%',
      }}
      placeholder={placeholder ?? config.treeSelectLabels.placeholder}
      placement={placement}
      portal={portal}
      portalContainer={portalContainer}
      prefix={selectionContent}
      size={size}
      skidding={skidding}
      trigger={trigger}
      value={currentValue}
      confirmText={confirmText}
      confirmButtonProps={confirmButtonProps}
      onCancel={event => cancel(event)}
      onClear={() => void clear()}
      onConfirm={event => confirm(event)}
      onInput={event => setFilter(event.currentTarget.value)}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        if (currentOpen && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          treeRef.current?.focus();
        }
      }}
      onOpenChange={requestOpen}
      renderTrigger={
        renderTrigger
          ? context =>
              renderTrigger({
                ...context,
                selectedNodes,
                tags,
                triggerProps: {
                  ...context.triggerProps,
                  'aria-controls': currentOpen ? treeId : undefined,
                  'aria-haspopup': 'tree',
                },
              })
          : undefined
      }
      className={cls(classes.block, classes.is('inputable', filterable), className)}
      style={style}
    >
      <Tree
        {...treeProps}
        ref={treeRef}
        id={treeId}
        aria-label={config.treeSelectLabels.tree}
        checkStrictly={checkStrictly}
        defaultExpandedValues={defaultExpandedValues}
        disabled={disabled}
        expandFilteredTree={expandFilteredTree}
        expandValues={expandValues}
        fieldMap={fieldMap as TreeFieldMap}
        filterMethod={filterMethod}
        filterToHideChildren={filterToHideChildren}
        filterValue={currentFilter}
        filterable={filterable || panelFilterable}
        hideFilterInput={hideFilterInput ?? !panelFilterable}
        multiple={multiple}
        multipleLimit={multipleLimit}
        parentEffectDisabledChild={parentEffectDisabledChild}
        renderEmpty={emptyContent}
        renderNode={renderNode}
        searchInputPlaceholder={panelInputPlaceholder ?? searchInputPlaceholder}
        selectedValues={stagedValues}
        size={treeSize}
        treeData={runtimeData}
        onExpandedValuesChange={onExpandedValuesChange}
        onTreeDataChange={commitTreeData}
        onExpand={(values, selectedValue, details: TreeExpandCallbackDetails) =>
          onExpand?.(values, selectedValue, details)
        }
        onLoadError={onLoadError}
        onFilterValueChange={setFilter}
        onDropError={onDropError}
        onNodeClick={onNodeClick}
        onNodeContextMenu={onNodeContextMenu}
        onSelect={(values, selectedValue, details) => {
          applyKeyword(details);
          onSelect?.(values, selectedValue, details);
        }}
        onSelectedValuesChange={values => stage(values)}
      />
    </Picker>
  );
}

export const TreeSelect = forwardRef(TreeSelectImplementation);
export const HTreeSelect = TreeSelect;
