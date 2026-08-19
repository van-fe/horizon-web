import type {
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  TreeCommandMap,
  TreeCommonProps,
  TreeExpandDetails,
  TreeFieldMap,
  TreeNormalizedNode,
  TreeNavigationKey,
  TreeOption as CoreTreeOption,
  TreeSelectDetails,
  TreeStateReason,
  TreeValue,
} from '@aurora/core';
import {
  addTreeChildren,
  deleteTreeNode,
  filterTree,
  getTreeAriaState,
  getVisibleTreeNodes,
  normalizeTree,
  reduceTreeNavigation,
  replaceTreeNode,
  TREE_DEFAULTS,
  TreeExpansionController,
  TreeSelectionController,
} from '@aurora/core';
import { focusActiveTreeitem } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { useFormFieldControl } from '../Form/context';
import { Input } from '../Input';
import { LoadingIcon } from '../_shared/LoadingIcon';
import { useTreeDrag } from './useTreeDrag';
import { useTreeDynamicLoad } from './useTreeDynamicLoad';

export type {
  TreeBeforeDrop,
  TreeFieldMap,
  TreeFilterMethod,
  TreeNormalizedNode,
  TreeSize,
  TreeValue,
} from '@aurora/core';

export interface TreeOption extends CoreTreeOption<ReactNode, ReactNode> {
  groupLabel?: ReactNode;
}

export interface TreeNodeRenderContext {
  node: TreeNormalizedNode<TreeOption>;
  expanded: boolean;
  checked: boolean;
  indeterminate: boolean;
  loading: boolean;
}

export interface TreeExpandCallbackDetails extends TreeExpandDetails<TreeOption> {
  nativeEvent?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;
}

export interface TreeSelectCallbackDetails extends TreeSelectDetails<TreeOption> {
  nativeEvent?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;
}

type RendererOwnedProps =
  | 'defaultExpandValues'
  | 'expandIcon'
  | 'expandWrapperByChildren'
  | 'filterInputValue'
  | 'foldIcon'
  | 'prefixIcon'
  | 'tooltipHideAfter'
  | 'tooltipShowAfter'
  | 'useVirtualScroll'
  | 'virtualScrollBuffer';

export interface TreeProps
  extends
    Omit<TreeCommonProps<TreeOption>, RendererOwnedProps | 'treeData'>,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      | 'children'
      | 'contextMenu'
      | 'defaultValue'
      | 'draggable'
      | 'onClick'
      | 'onContextMenu'
      | 'onSelect'
    > {
  /** 层级节点数据。 @en Hierarchical node data. */
  treeData?: readonly TreeOption[];
  /** React 非受控初始展开值。 @en Initial uncontrolled expanded values. */
  defaultExpandedValues?: readonly TreeValue[];
  /** 非受控初始筛选文字。 @en Initial uncontrolled filter text. */
  defaultFilterValue?: string;
  /** 筛选输入框原生属性。 @en Native attributes for the filter input. */
  filterInputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'onChange' | 'placeholder' | 'value'
  >;
  /** 自定义节点内容。 @en Custom node renderer. */
  renderNode?: (context: TreeNodeRenderContext) => ReactNode;
  /** 自定义空状态。 @en Custom empty-state content. */
  renderEmpty?: ReactNode | (() => ReactNode);
  /** 展开值变化。 @en Called when expanded values change. */
  onExpandedValuesChange?: (values: TreeValue[]) => void;
  /** 选择值变化。 @en Called when selected values change. */
  onSelectedValuesChange?: (values: TreeValue[]) => void;
  /** 筛选值变化。 @en Called when filter text changes. */
  onFilterValueChange?: (value: string) => void;
  /** 树数据因加载、拖放或 ref 命令变化。 @en Called when loading, dropping, or ref commands change tree data. */
  onTreeDataChange?: (data: readonly TreeOption[]) => void;
  /** 展开状态变化。 @en Called after a node expansion changes. */
  onExpand?: (values: TreeValue[], value: TreeValue, details: TreeExpandCallbackDetails) => void;
  /** 选择状态变化。 @en Called after node selection changes. */
  onSelect?: (values: TreeValue[], value: TreeValue, details: TreeSelectCallbackDetails) => void;
  /** 节点点击。 @en Called when a node is clicked. */
  onNodeClick?: (event: MouseEvent<HTMLElement>, value: TreeValue, node: TreeOption) => void;
  /** 节点右键。 @en Called when a node is context-clicked. */
  onNodeContextMenu?: (event: MouseEvent<HTMLElement>, value: TreeValue, node: TreeOption) => void;
  /** 可见节点变化。 @en Called when visible nodes change. */
  onVisibleNodesChange?: (nodes: TreeNormalizedNode<TreeOption>[]) => void;
  /** 动态加载失败。 @en Called when dynamic loading rejects. */
  onLoadError?: (error: unknown, node: TreeNormalizedNode<TreeOption>) => void;
  /** 异步放置失败。 @en Called when an asynchronous drop rejects. */
  onDropError?: (error: unknown) => void;
  /** 原生滚动到顶。 @en Called when native scrolling reaches the top. */
  onReachTop?: () => void;
  /** 原生滚动到底。 @en Called when native scrolling reaches the bottom. */
  onReachBottom?: () => void;
}

export interface TreeHandle extends TreeCommandMap<TreeOption> {
  /** Tree 根元素。 @en Tree root element. */
  readonly element: HTMLDivElement | null;
  /** 聚焦指定节点或首个可用节点。 @en Focuses a value or the first enabled node. */
  focus(value?: TreeValue): void;
}

function dimension(value: number | string | undefined): number | string | undefined {
  return typeof value === 'number' ? `${value}px` : value;
}

function collection(nodes: TreeNormalizedNode<TreeOption>[]) {
  return { values: nodes.map(node => node.value), nodes };
}

function valueToken(value: TreeValue): string {
  return `${typeof value}:${String(value)}`;
}

function readOptionField(
  option: TreeOption,
  fieldMap: TreeFieldMap | undefined,
  field: 'prefixIcon' | 'prefixIconClassName',
): unknown {
  const path = fieldMap?.[field] ?? field;
  let value: unknown = option;
  for (const key of path.split('.')) {
    if (typeof value !== 'object' || value === null) return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

export const Tree = forwardRef<TreeHandle, TreeProps>(function Tree(
  {
    treeData,
    defaultTreeData = TREE_DEFAULTS.defaultTreeData,
    size,
    disabled = TREE_DEFAULTS.disabled,
    filterable = TREE_DEFAULTS.filterable,
    filterToHideChildren = TREE_DEFAULTS.filterToHideChildren,
    filterMethod,
    filterValue,
    defaultFilterValue = '',
    hideFilterInput = TREE_DEFAULTS.hideFilterInput,
    expandFilteredTree = TREE_DEFAULTS.expandFilteredTree,
    fieldMap,
    height,
    maxHeight,
    expandValues,
    defaultExpandedValues,
    expandOnClickNode = TREE_DEFAULTS.expandOnClickNode,
    checkStrictly = TREE_DEFAULTS.checkStrictly,
    multiple = TREE_DEFAULTS.multiple,
    multipleLimit = TREE_DEFAULTS.multipleLimit,
    selectedValues,
    defaultSelectedValues,
    checkOnClickNode = TREE_DEFAULTS.checkOnClickNode,
    checkOnClickLeaf = TREE_DEFAULTS.checkOnClickLeaf,
    stress = TREE_DEFAULTS.stress,
    emptyText,
    dynamicLoad,
    isDefaultExpandAll = TREE_DEFAULTS.isDefaultExpandAll,
    isDefaultExpandParent = TREE_DEFAULTS.isDefaultExpandParent,
    searchInputPlaceholder,
    indent = TREE_DEFAULTS.indent,
    tooltip = TREE_DEFAULTS.tooltip,
    parentEffectDisabledChild = TREE_DEFAULTS.parentEffectDisabledChild,
    showCheckbox = TREE_DEFAULTS.showCheckbox,
    showRadio = TREE_DEFAULTS.showRadio,
    draggable = TREE_DEFAULTS.draggable,
    draggableIcon,
    undraggableIcon = TREE_DEFAULTS.undraggableIcon,
    draggableIconAlwaysVisible = TREE_DEFAULTS.draggableIconAlwaysVisible,
    dragOnHandler = TREE_DEFAULTS.dragOnHandler,
    dragToLeaf = TREE_DEFAULTS.dragToLeaf,
    beforeDrop,
    showLine = TREE_DEFAULTS.showLine,
    filterInputProps,
    renderNode,
    renderEmpty,
    onExpandedValuesChange,
    onSelectedValuesChange,
    onFilterValueChange,
    onTreeDataChange,
    onExpand,
    onSelect,
    onNodeClick,
    onNodeContextMenu,
    onVisibleNodesChange,
    onLoadError,
    onDropError,
    onReachTop,
    onReachBottom,
    className,
    style,
    onKeyDown,
    onScroll,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const classes = useMemo(
    () => new ComponentClassBlock('tree', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const itemClasses = useMemo(
    () => new ComponentClassBlock('tree-item', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const generatedId = useId().replaceAll(':', '');
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<TreeValue, HTMLDivElement>());
  const [uncontrolledData, setUncontrolledData] = useState<readonly TreeOption[]>(defaultTreeData);
  const runtimeData = treeData ?? uncontrolledData;
  const [uncontrolledFilter, setUncontrolledFilter] = useState(defaultFilterValue);
  const [focusedValue, setFocusedValue] = useState<TreeValue>();
  const currentFilter = filterValue === undefined ? uncontrolledFilter : filterValue;
  const resolvedDisabled = disabled || formField?.disabled === true;
  const resolvedSize = size ?? config.size;
  const tree = useMemo(() => normalizeTree(runtimeData, fieldMap), [fieldMap, runtimeData]);
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState<readonly TreeValue[]>(
    () =>
      defaultExpandedValues ??
      (isDefaultExpandAll ? tree.flat.filter(node => !node.isLeaf).map(node => node.value) : []),
  );
  const [uncontrolledSelected, setUncontrolledSelected] = useState<readonly TreeValue[]>(
    defaultSelectedValues ?? [],
  );
  const currentExpanded = expandValues ?? uncontrolledExpanded;
  const currentSelected = selectedValues ?? uncontrolledSelected;
  const createExpansion = useCallback(() => {
    const controller = new TreeExpansionController<TreeOption>({
      value: currentExpanded,
      defaultExpandParent: isDefaultExpandParent,
    });
    controller.setTree(tree);
    return controller;
  }, [currentExpanded, isDefaultExpandParent, tree]);
  const createSelection = useCallback(() => {
    const controller = new TreeSelectionController<TreeOption>({
      value: currentSelected,
      multiple,
      multipleLimit,
      checkStrictly,
      parentEffectDisabledChild,
    });
    controller.setTree(tree);
    return controller;
  }, [checkStrictly, currentSelected, multiple, multipleLimit, parentEffectDisabledChild, tree]);
  const expansion = useMemo(createExpansion, [createExpansion]);
  const selection = useMemo(createSelection, [createSelection]);

  const commitData = useCallback(
    (next: readonly TreeOption[]) => {
      if (treeData === undefined) setUncontrolledData(next);
      onTreeDataChange?.(next);
      formField?.notify('change');
    },
    [formField, onTreeDataChange, treeData],
  );
  const { load, loadingValues } = useTreeDynamicLoad({
    data: runtimeData,
    fieldMap,
    loader: dynamicLoad,
    commitData,
    onError: onLoadError,
  });
  const { draggingValue, dropValue } = useTreeDrag({
    rootRef,
    enabled: draggable && !resolvedDisabled,
    dragOnHandler,
    dragToLeaf,
    data: runtimeData,
    tree,
    fieldMap,
    beforeDrop,
    commitData,
    onError: onDropError,
  });

  const filtered = useMemo(
    () =>
      currentFilter
        ? filterTree(tree, currentFilter, {
            method: filterMethod,
            filterToHideChildren,
            expand: expandFilteredTree,
          })
        : undefined,
    [currentFilter, expandFilteredTree, filterMethod, filterToHideChildren, tree],
  );
  const renderedExpandedValues = useMemo(() => {
    const values = new Set(expansion.expandedValues);
    filtered?.expandValues.forEach(value => values.add(value));
    return values;
  }, [expansion, filtered]);
  const visibleNodes = useMemo(
    () =>
      getVisibleTreeNodes(
        tree.flat,
        renderedExpandedValues,
        filtered ? new Set(filtered.included) : undefined,
      ),
    [filtered, renderedExpandedValues, tree.flat],
  );
  const checkStates = useMemo(() => selection.getCheckStates(), [selection]);

  useEffect(() => onVisibleNodesChange?.(visibleNodes), [onVisibleNodesChange, visibleNodes]);

  useEffect(() => {
    if (focusedValue !== undefined && visibleNodes.some(node => node.value === focusedValue))
      return;
    setFocusedValue(
      visibleNodes.find(node => !node.disabled && (checkStrictly || !node.passingDisabled))?.value,
    );
  }, [checkStrictly, focusedValue, visibleNodes]);

  function commitExpanded(values: TreeValue[]): void {
    if (expandValues === undefined) setUncontrolledExpanded(values);
    onExpandedValuesChange?.(values);
  }

  function commitSelected(values: TreeValue[]): void {
    if (selectedValues === undefined) setUncontrolledSelected(values);
    onSelectedValuesChange?.(values);
  }

  async function requestExpansion(
    node: TreeNormalizedNode<TreeOption>,
    expanded: boolean,
    reason: Exclude<TreeStateReason, 'filter'>,
    nativeEvent?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ): Promise<void> {
    if (resolvedDisabled || node.disabled || node.isLeaf) return;
    const transition = createExpansion();
    const result = transition.set(node.value, expanded, reason);
    if (result.changed) {
      commitExpanded(result.values);
      onExpand?.(result.values, node.value, {
        expanded: result.expanded,
        node,
        reason,
        nativeEvent,
      });
    }
    if (expanded && dynamicLoad && node.children.length === 0) await load(node);
  }

  function requestSelection(
    node: TreeNormalizedNode<TreeOption>,
    reason: Exclude<TreeStateReason, 'filter'>,
    nativeEvent?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ): void {
    if (resolvedDisabled) return;
    const result = createSelection().toggle(node.value, reason);
    if (result.status === 'selected' || result.status === 'deselected') {
      commitSelected(result.values);
      onSelect?.(result.values, node.value, {
        checked: result.selected,
        node,
        allCheckedValues: result.allCheckedValues,
        halfCheckedValues: result.halfCheckedValues,
        reason,
        nativeEvent,
      });
      formField?.notify('change');
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    onKeyDown?.(event);
    if (event.defaultPrevented || resolvedDisabled) return;
    if (event.target instanceof HTMLInputElement && event.target.dataset.treeFilter === 'true')
      return;
    const command = reduceTreeNavigation(
      tree.flat,
      { focusedValue, expandedValues: renderedExpandedValues },
      event.key as TreeNavigationKey,
      {
        visibleNodes,
        isDisabled: node =>
          resolvedDisabled || node.disabled || (!checkStrictly && node.passingDisabled),
      },
    );
    if (command.type === 'none') return;
    event.preventDefault();
    if (command.type === 'focus') {
      setFocusedValue(command.value);
      queueMicrotask(() => focusActiveTreeitem(rootRef.current, valueToken(command.value)));
      return;
    }
    const node = tree.byValue.get(command.value);
    if (!node) return;
    if (command.type === 'expand' || command.type === 'collapse')
      void requestExpansion(node, command.type === 'expand', 'keyboard', event);
    else requestSelection(node, 'keyboard', event);
  }

  useImperativeHandle(
    ref,
    () => ({
      get element() {
        return rootRef.current;
      },
      focus: value => {
        const target = value ?? focusedValue ?? visibleNodes.find(node => !node.disabled)?.value;
        if (target !== undefined) {
          setFocusedValue(target);
          queueMicrotask(() => focusActiveTreeitem(rootRef.current, valueToken(target)));
        }
      },
      getSelectedNodes: () =>
        collection(tree.flat.filter(node => checkStates.get(node.value)?.checked)),
      getPartSelectedNodes: () =>
        collection(tree.flat.filter(node => checkStates.get(node.value)?.indeterminate)),
      getUnselectedNodes: () =>
        collection(
          tree.flat.filter(node => {
            const state = checkStates.get(node.value);
            return !state?.checked && !state?.indeterminate;
          }),
        ),
      setSelectedStatus: (values, selected) => {
        const transition = createSelection();
        values.forEach(value => transition.set(value, selected, 'imperative'));
        commitSelected(transition.selectedValues);
      },
      clearSelectedValues: () => {
        createSelection().clear('imperative');
        commitSelected([]);
      },
      getExpandNodes: () =>
        collection(
          expansion.expandedValues.flatMap(value => {
            const node = tree.byValue.get(value);
            return node ? [node] : [];
          }),
        ),
      setExpandedStatus: (values, expanded) => {
        const transition = createExpansion();
        values.forEach(value => transition.set(value, expanded, 'imperative'));
        commitExpanded(transition.expandedValues);
      },
      setAllExpandedStatus: expanded => {
        const transition = createExpansion();
        transition.setAll(expanded, 'imperative');
        commitExpanded(transition.expandedValues);
      },
      getNodesByValue: values =>
        new Map(
          values.flatMap(value =>
            tree.byValue.has(value) ? [[value, tree.byValue.get(value)!]] : [],
          ),
        ),
      setNodeByValue: (data, value) =>
        commitData(
          value === undefined
            ? addTreeChildren(runtimeData, undefined, [data])
            : replaceTreeNode(runtimeData, value, data, fieldMap),
        ),
      addNodeChildrenByValue: (data, value) =>
        commitData(addTreeChildren(runtimeData, value, data, true, fieldMap)),
      deleteNodeByValue: value => commitData(deleteTreeNode(runtimeData, value, fieldMap).data),
      getVisibleItems: () => visibleNodes.slice(),
      scrollTo: value => {
        const target = value ?? selection.selectedValues[0];
        if (target !== undefined)
          itemRefs.current.get(target)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      },
    }),
    [
      checkStates,
      commitData,
      createExpansion,
      createSelection,
      expansion,
      fieldMap,
      focusedValue,
      runtimeData,
      selection,
      tree,
      visibleNodes,
    ],
  );

  const rootStyle: CSSProperties = {
    ...style,
    height: dimension(height),
    maxHeight: dimension(maxHeight),
    overflow: height !== undefined || maxHeight !== undefined ? 'auto' : style?.overflow,
  };
  const rootClassName = cls(
    classes.block,
    classes.m(resolvedSize, resolvedSize !== 'medium'),
    classes.is('multiple', multiple),
    classes.is('dragging', draggingValue !== undefined),
    className,
  );

  return (
    <div
      {...nativeProps}
      aria-describedby={formField?.describedBy ?? nativeProps['aria-describedby']}
      aria-disabled={resolvedDisabled || undefined}
      aria-invalid={formField?.invalid || undefined}
      aria-label={nativeProps['aria-label'] ?? config.treeLabels.tree}
      className={rootClassName}
      id={formField?.controlId ?? nativeProps.id ?? `${generatedId}-tree`}
      onKeyDown={handleKeyDown}
      onScroll={event => {
        onScroll?.(event);
        const element = event.currentTarget;
        if (element.scrollTop <= 0) onReachTop?.();
        if (element.scrollTop + element.clientHeight >= element.scrollHeight) onReachBottom?.();
      }}
      ref={rootRef}
      role="tree"
      style={rootStyle}
    >
      {filterable && !hideFilterInput && (
        <Input
          className={classes.e('filter')}
          disabled={resolvedDisabled}
          inputProps={
            {
              ...filterInputProps,
              'aria-label': filterInputProps?.['aria-label'] ?? config.treeLabels.search,
              'data-tree-filter': 'true',
            } as InputHTMLAttributes<HTMLInputElement>
          }
          onValueChange={value => {
            if (filterValue === undefined) setUncontrolledFilter(value);
            onFilterValueChange?.(value);
          }}
          placeholder={searchInputPlaceholder ?? config.treeLabels.search}
          value={currentFilter}
        />
      )}
      {visibleNodes.length === 0 ? (
        <div className={classes.e('empty')} role="status">
          {typeof renderEmpty === 'function'
            ? renderEmpty()
            : (renderEmpty ?? emptyText ?? config.treeLabels.empty)}
        </div>
      ) : (
        visibleNodes.map(node => {
          const expanded = renderedExpandedValues.has(node.value);
          const checkState = checkStates.get(node.value) ?? {
            checked: false,
            indeterminate: false,
          };
          const loading = loadingValues.has(node.value);
          const itemDisabled =
            resolvedDisabled || node.disabled || (!checkStrictly && node.passingDisabled);
          const prefixIcon = readOptionField(
            node.originOption,
            fieldMap,
            'prefixIcon',
          ) as ReactNode;
          const prefixIconClassName = readOptionField(
            node.originOption,
            fieldMap,
            'prefixIconClassName',
          ) as string | undefined;
          const context = {
            node,
            expanded,
            checked: checkState.checked,
            indeterminate: checkState.indeterminate,
            loading,
          } satisfies TreeNodeRenderContext;
          const aria = getTreeAriaState(node, {
            selected: checkState.checked,
            expanded,
            checked: multiple || showCheckbox || showRadio ? checkState.checked : undefined,
            indeterminate: checkState.indeterminate,
          });
          return (
            <div
              aria-checked={aria.checked}
              aria-disabled={itemDisabled || undefined}
              aria-expanded={aria.expanded}
              aria-level={aria.level}
              aria-posinset={node.index + 1}
              aria-selected={aria.selected}
              aria-setsize={(node.parent?.children ?? tree.roots).length}
              className={cls(
                itemClasses.block,
                itemClasses.is('disabled', itemDisabled),
                itemClasses.is('clickable', node.selectable),
                itemClasses.is('checked', checkState.checked),
                itemClasses.is('stress', stress),
                itemClasses.is('focus', focusedValue === node.value),
                itemClasses.is('draggable', draggable && node.draggable),
                itemClasses.is('draggable-whole', draggable && !dragOnHandler),
                itemClasses.is('dragging', draggingValue === node.value),
                itemClasses.is('drag-over', dropValue === valueToken(node.value)),
              )}
              data-tree-drop-zone
              data-tree-value={valueToken(node.value)}
              key={valueToken(node.value)}
              onClick={event => {
                setFocusedValue(node.value);
                event.currentTarget.focus();
                onNodeClick?.(event, node.value, node.originOption);
                if (expandOnClickNode && !node.isLeaf)
                  void requestExpansion(node, !expanded, 'pointer', event);
                if (checkOnClickNode || (checkOnClickLeaf && node.isLeaf))
                  requestSelection(node, 'pointer', event);
              }}
              onContextMenu={event => onNodeContextMenu?.(event, node.value, node.originOption)}
              onFocus={() => setFocusedValue(node.value)}
              ref={element => {
                if (element) itemRefs.current.set(node.value, element);
                else itemRefs.current.delete(node.value);
              }}
              style={{ paddingLeft: `${node.level * indent}px` }}
              tabIndex={focusedValue === node.value && !itemDisabled ? 0 : -1}
              title={tooltip ? node.stringLabel : undefined}
              role="treeitem"
            >
              {draggable && (
                <span
                  aria-hidden="true"
                  className={cls(
                    itemClasses.e('draggable-icon'),
                    itemClasses.is('always-visible', draggableIconAlwaysVisible),
                    itemClasses.is('disabled', !node.draggable),
                  )}
                  data-tree-drag-handle={node.draggable ? 'true' : undefined}
                >
                  {node.draggable
                    ? ((draggableIcon as ReactNode) ?? '⠿')
                    : (undraggableIcon as ReactNode) || null}
                </span>
              )}
              {loading ? (
                <LoadingIcon
                  className={itemClasses.e('loading-icon')}
                  namespace={config.namespace}
                />
              ) : !node.isLeaf ? (
                <button
                  aria-label={expanded ? config.treeLabels.collapse : config.treeLabels.expand}
                  className={cls(
                    itemClasses.e('expand-icon'),
                    itemClasses.e('icon'),
                    itemClasses.is('active', expanded),
                  )}
                  disabled={itemDisabled}
                  onClick={event => {
                    event.stopPropagation();
                    void requestExpansion(node, !expanded, 'pointer', event);
                  }}
                  tabIndex={-1}
                  type="button"
                >
                  <span aria-hidden="true">›</span>
                </button>
              ) : (
                <span aria-hidden="true" className={itemClasses.e('expand-icon')} />
              )}
              {prefixIcon != null && (
                <span className={cls(itemClasses.e('prefix-icon'), prefixIconClassName)}>
                  {prefixIcon}
                </span>
              )}
              {multiple && showCheckbox && (
                <span className={itemClasses.e('checkbox')} data-tree-interactive>
                  <input
                    aria-label={`${config.treeLabels.select} ${node.stringLabel}`}
                    checked={checkState.checked}
                    disabled={itemDisabled || !node.selectable}
                    onChange={() => requestSelection(node, 'pointer')}
                    onClick={event => event.stopPropagation()}
                    ref={element => {
                      if (element) element.indeterminate = checkState.indeterminate;
                    }}
                    tabIndex={-1}
                    type="checkbox"
                  />
                </span>
              )}
              {!multiple && showRadio && (
                <span className={itemClasses.e('radio')} data-tree-interactive>
                  <input
                    aria-label={`${config.treeLabels.select} ${node.stringLabel}`}
                    checked={checkState.checked}
                    disabled={itemDisabled || !node.selectable || (!checkStrictly && !node.isLeaf)}
                    name={`${generatedId}-tree-choice`}
                    onChange={() => requestSelection(node, 'pointer')}
                    onClick={event => event.stopPropagation()}
                    tabIndex={-1}
                    type="radio"
                  />
                </span>
              )}
              <span className={cls(itemClasses.e('content'), itemClasses.is('ellipsis', tooltip))}>
                {renderNode ? renderNode(context) : node.label}
              </span>
              {showLine && node.parent && (
                <span
                  aria-hidden="true"
                  className={itemClasses.e('parent-shown-line')}
                  style={{ left: `${Math.max(0, node.level * indent - indent / 2)}px` }}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
});
