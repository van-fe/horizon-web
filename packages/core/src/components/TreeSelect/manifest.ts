import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { TreeSelectCommandMap, TreeSelectEventMap, TreeSelectRegionMap } from './contract';
import { treeSelectApiContract } from './contract';

export const treeSelectManifest = createComponentManifest({
  name: 'TreeSelect',
  category: 'form',
  description: {
    zh: '在浮层树中选择一个或多个层级值。',
    en: 'Selects one or more hierarchical values from a popup tree.',
  },
  semantics: [
    'single or multiple value',
    'staged confirmation',
    'controlled or uncontrolled sessions',
    'tree filtering',
    'tag and summary presentation',
  ],
  accessibility: ['combobox ownership', 'tree semantics', 'keyboard popup', 'disabled values'],
  testVectors: [
    'field mapping',
    'unknown values',
    'controlled proposals',
    'confirmation dismissal',
    'multiple limit',
    'keyword retention',
  ],
  contract: {
    props: createPropManifestFields(treeSelectApiContract, {
      value: {
        type: 'TreeSelectModelValue',
        description: { zh: '受控选择值', en: 'Controlled value' },
      },
      defaultValue: {
        type: 'TreeSelectModelValue',
        description: { zh: '选择初值', en: 'Initial value' },
      },
      initialValue: {
        type: 'TreeSelectModelValue',
        description: { zh: '清空回退值', en: 'Clear fallback value' },
      },
      open: { type: 'boolean', description: { zh: '受控面板状态', en: 'Controlled popup state' } },
      defaultOpen: {
        type: 'boolean',
        description: { zh: '面板初始状态', en: 'Initial popup state' },
      },
      filterValue: {
        type: 'string',
        description: { zh: '受控过滤值', en: 'Controlled filter value' },
      },
      defaultFilterValue: {
        type: 'string',
        description: { zh: '过滤初值', en: 'Initial filter value' },
      },
      trigger: { type: 'PickerTrigger', description: { zh: '触发方式', en: 'Trigger mode' } },
      clearable: { type: 'boolean', description: { zh: '支持清空', en: 'Clearable' } },
      size: { type: 'ChoiceSize', description: { zh: '触发器尺寸', en: 'Trigger size' } },
      treeSize: { type: 'TreeSize', description: { zh: '树尺寸', en: 'Tree size' } },
      placeholder: { type: 'string', description: { zh: '占位文字', en: 'Placeholder' } },
      inputVariant: {
        type: 'PickerInputVariant',
        description: { zh: '输入框变体', en: 'Input variant' },
      },
      inputStatus: {
        type: 'PickerInputStatus',
        description: { zh: '输入框状态', en: 'Input status' },
      },
      placement: {
        type: 'PopoverPlacement',
        description: { zh: '浮层位置', en: 'Popup placement' },
      },
      flip: { type: 'boolean', description: { zh: '允许翻转', en: 'Allow flip' } },
      portal: { type: 'boolean', description: { zh: 'Portal 渲染', en: 'Portal rendering' } },
      hoverShowDelay: { type: 'number', description: { zh: '显示延迟', en: 'Show delay' } },
      hoverHideDelay: { type: 'number', description: { zh: '隐藏延迟', en: 'Hide delay' } },
      panelWidth: { type: 'string | number', description: { zh: '面板宽度', en: 'Panel width' } },
      popupClassName: { type: 'string', description: { zh: '浮层类名', en: 'Popup class' } },
      fitInputWidth: {
        type: 'PickerFitInputWidth',
        description: { zh: '输入框宽度策略', en: 'Input width strategy' },
      },
      fitContentInputMinWidth: {
        type: 'string | number',
        description: { zh: '自适应输入最小宽度', en: 'Fit-input minimum width' },
      },
      collapseTags: { type: 'boolean', description: { zh: '折叠标签', en: 'Collapse tags' } },
      collapseTagsTooltip: {
        type: 'boolean',
        description: { zh: '折叠提示', en: 'Collapsed-tag tooltip' },
      },
      maxCollapseTags: {
        type: 'number',
        description: { zh: '标签展示上限', en: 'Maximum visible tags' },
      },
      collapseTagsFillUp: { type: 'boolean', description: { zh: '标签填充', en: 'Fill tags' } },
      useStatistic: { type: 'boolean', description: { zh: '使用统计', en: 'Use summary' } },
      statisticText: { type: 'string', description: { zh: '统计文字', en: 'Summary text' } },
      needConfirm: {
        type: 'boolean',
        description: { zh: '需要确认', en: 'Requires confirmation' },
      },
      confirmText: { type: 'string', description: { zh: '确认文字', en: 'Confirm text' } },
      cancelText: { type: 'string', description: { zh: '取消文字', en: 'Cancel text' } },
      panelFilterable: { type: 'boolean', description: { zh: '面板过滤', en: 'Panel filtering' } },
      useBuiltInPanelFilter: {
        type: 'boolean',
        description: { zh: '内置过滤输入', en: 'Built-in filter input' },
      },
      panelInputPlaceholder: {
        type: 'string',
        description: { zh: '过滤占位文字', en: 'Filter placeholder' },
      },
      reserveKeyword: {
        type: 'TreeSelectReserveKeyword',
        description: { zh: '关键词保留策略', en: 'Keyword retention' },
      },
      inputDebounce: { type: 'number', description: { zh: '输入防抖间隔', en: 'Input debounce' } },
      treeData: { type: 'readonly TreeOption[]', description: { zh: '树数据', en: 'Tree data' } },
      defaultTreeData: {
        type: 'readonly TreeOption[]',
        description: { zh: '树数据初值', en: 'Initial tree data' },
      },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      filterable: { type: 'boolean', description: { zh: '支持过滤', en: 'Filterable' } },
      filterToHideChildren: {
        type: 'boolean',
        description: { zh: '过滤隐藏子级', en: 'Hide children when filtering' },
      },
      filterMethod: {
        type: 'TreeFilterMethod',
        description: { zh: '过滤方法', en: 'Filter method' },
      },
      filterInputValue: {
        type: 'string',
        description: { zh: '树过滤输入', en: 'Tree filter input' },
      },
      hideFilterInput: {
        type: 'boolean',
        description: { zh: '隐藏树输入', en: 'Hide tree input' },
      },
      expandFilteredTree: {
        type: 'boolean',
        description: { zh: '展开过滤结果', en: 'Expand filtered tree' },
      },
      fieldMap: { type: 'TreeFieldMap', description: { zh: '字段映射', en: 'Field mapping' } },
      height: { type: 'string | number', description: { zh: '高度', en: 'Height' } },
      maxHeight: { type: 'string | number', description: { zh: '最大高度', en: 'Maximum height' } },
      useVirtualScroll: { type: 'boolean', description: { zh: '虚拟滚动', en: 'Virtual scroll' } },
      virtualScrollBuffer: {
        type: 'number',
        description: { zh: '虚拟滚动缓冲', en: 'Virtual-scroll buffer' },
      },
      tooltipShowAfter: {
        type: 'number',
        description: { zh: '提示显示延迟', en: 'Tooltip show delay' },
      },
      tooltipHideAfter: {
        type: 'number',
        description: { zh: '提示隐藏延迟', en: 'Tooltip hide delay' },
      },
      expandValues: {
        type: 'readonly TreeValue[]',
        description: { zh: '展开值', en: 'Expanded values' },
      },
      defaultExpandValues: {
        type: 'readonly TreeValue[]',
        description: { zh: '展开初值', en: 'Initial expanded values' },
      },
      expandOnClickNode: {
        type: 'boolean',
        description: { zh: '点击展开', en: 'Expand on click' },
      },
      foldIcon: { type: 'unknown', description: { zh: '折叠图标', en: 'Collapsed icon' } },
      expandIcon: { type: 'unknown', description: { zh: '展开图标', en: 'Expanded icon' } },
      prefixIcon: { type: 'unknown', description: { zh: '前缀图标', en: 'Prefix icon' } },
      checkStrictly: { type: 'boolean', description: { zh: '严格勾选', en: 'Strict checking' } },
      multiple: { type: 'boolean', description: { zh: '多选', en: 'Multiple' } },
      multipleLimit: { type: 'number', description: { zh: '多选限制', en: 'Multiple limit' } },
      checkOnClickNode: {
        type: 'boolean',
        description: { zh: '点击节点勾选', en: 'Check on node click' },
      },
      checkOnClickLeaf: {
        type: 'boolean',
        description: { zh: '点击叶节点勾选', en: 'Check leaf on click' },
      },
      stress: { type: 'boolean', description: { zh: '强调选择', en: 'Stress selection' } },
      emptyText: { type: 'string', description: { zh: '空状态文字', en: 'Empty text' } },
      dynamicLoad: {
        type: 'TreeDynamicLoader',
        description: { zh: '动态加载', en: 'Dynamic loader' },
      },
      isDefaultExpandAll: {
        type: 'boolean',
        description: { zh: '默认全部展开', en: 'Expand all initially' },
      },
      isDefaultExpandParent: {
        type: 'boolean',
        description: { zh: '默认展开父级', en: 'Expand parents initially' },
      },
      searchInputPlaceholder: {
        type: 'string',
        description: { zh: '搜索占位文字', en: 'Search placeholder' },
      },
      indent: { type: 'number', description: { zh: '缩进', en: 'Indent' } },
      tooltip: { type: 'boolean', description: { zh: '显示提示', en: 'Show tooltip' } },
      parentEffectDisabledChild: {
        type: 'boolean',
        description: { zh: '父级影响禁用子级', en: 'Parent affects disabled children' },
      },
      showCheckbox: { type: 'boolean', description: { zh: '显示复选框', en: 'Show checkboxes' } },
      showRadio: { type: 'boolean', description: { zh: '显示单选框', en: 'Show radios' } },
      draggable: { type: 'boolean', description: { zh: '允许拖拽', en: 'Draggable' } },
      draggableIcon: { type: 'unknown', description: { zh: '拖拽图标', en: 'Drag icon' } },
      undraggableIcon: {
        type: 'unknown',
        description: { zh: '禁止拖拽图标', en: 'Undraggable icon' },
      },
      draggableIconAlwaysVisible: {
        type: 'boolean',
        description: { zh: '始终显示拖拽图标', en: 'Always show drag icon' },
      },
      dragOnHandler: { type: 'boolean', description: { zh: '仅手柄拖拽', en: 'Drag by handle' } },
      dragToLeaf: {
        type: 'boolean',
        description: { zh: '允许拖入叶节点', en: 'Drop into leaves' },
      },
      beforeDrop: {
        type: 'TreeBeforeDrop',
        description: { zh: '放置前守卫', en: 'Before-drop guard' },
      },
      showLine: { type: 'boolean', description: { zh: '显示连线', en: 'Show lines' } },
      expandWrapperByChildren: {
        type: 'boolean',
        description: { zh: '子级撑开容器', en: 'Children expand wrapper' },
      },
    }),
    emits: createManifestFields<TreeSelectEventMap>({
      treeDataChange: {
        type: 'readonly TreeOption[]',
        description: { zh: '树数据变化', en: 'Tree data changed' },
      },
      expandValuesChange: {
        type: 'TreeValue[]',
        description: { zh: '展开值变化', en: 'Expanded values changed' },
      },
      visibleNodesChange: {
        type: 'TreeNormalizedNode[]',
        description: { zh: '可见节点变化', en: 'Visible nodes changed' },
      },
      expand: {
        type: '[TreeValue[], TreeValue, TreeExpandDetails]',
        description: { zh: '展开变化', en: 'Expansion changed' },
      },
      select: {
        type: '[TreeValue[], TreeValue, TreeSelectDetails]',
        description: { zh: '选择变化', en: 'Selection changed' },
      },
      nodeClick: {
        type: '[unknown, TreeValue, TreeOption]',
        description: { zh: '节点点击', en: 'Node clicked' },
      },
      nodeContextMenu: {
        type: '[unknown, TreeValue, TreeOption]',
        description: { zh: '节点右键', en: 'Node context menu' },
      },
      reachTop: { type: 'void', description: { zh: '到达顶部', en: 'Reached top' } },
      reachBottom: { type: 'void', description: { zh: '到达底部', en: 'Reached bottom' } },
      valueChange: {
        type: '[TreeSelectModelValue, TreeSelectValueChangeDetails]',
        description: { zh: '值变化', en: 'Value changed' },
      },
      pendingValueChange: {
        type: '[TreeSelectModelValue, TreeSelectValueChangeDetails]',
        description: { zh: '暂存值变化', en: 'Draft value changed' },
      },
      openChange: {
        type: '[boolean, TreeSelectOpenChangeDetails]',
        description: { zh: '面板状态变化', en: 'Popup changed' },
      },
      filterValueChange: {
        type: '[string, TreeSelectFilterChangeDetails]',
        description: { zh: '过滤值变化', en: 'Filter changed' },
      },
      clear: { type: 'TreeSelectModelValue', description: { zh: '清空', en: 'Cleared' } },
      confirm: { type: 'TreeSelectModelValue', description: { zh: '确认', en: 'Confirmed' } },
      cancel: { type: 'TreeSelectModelValue', description: { zh: '取消', en: 'Cancelled' } },
      focus: { type: 'unknown', description: { zh: '聚焦', en: 'Focused' } },
      blur: { type: 'unknown', description: { zh: '失焦', en: 'Blurred' } },
      input: { type: 'string', description: { zh: '输入变化', en: 'Input changed' } },
    }),
    slots: createManifestFields<TreeSelectRegionMap>({
      trigger: {
        type: 'TreeSelectTriggerRegionContext',
        description: { zh: '触发器', en: 'Trigger' },
      },
      tag: { type: 'TreeSelectTagData', description: { zh: '标签', en: 'Tag' } },
      selection: {
        type: 'TreeSelectTriggerRegionContext',
        description: { zh: '选择区', en: 'Selection' },
      },
      treeNode: { type: 'TreeNormalizedNode', description: { zh: '树节点', en: 'Tree node' } },
      panelHeader: { type: 'void', description: { zh: '面板头部', en: 'Panel header' } },
      panelFooter: { type: 'void', description: { zh: '面板底部', en: 'Panel footer' } },
      empty: { type: 'void', description: { zh: '空状态', en: 'Empty state' } },
      confirm: {
        type: 'TreeSelectConfirmRegionContext',
        description: { zh: '确认区', en: 'Confirmation area' },
      },
    }),
    exposes: createManifestFields<TreeSelectCommandMap>({
      getSelectedNodes: {
        type: '() => TreeNodeCollection',
        description: { zh: '获取选中节点', en: 'Gets selected nodes' },
      },
      getPartSelectedNodes: {
        type: '() => TreeNodeCollection',
        description: { zh: '获取半选节点', en: 'Gets partially selected nodes' },
      },
      getUnselectedNodes: {
        type: '() => TreeNodeCollection',
        description: { zh: '获取未选节点', en: 'Gets unselected nodes' },
      },
      setSelectedStatus: {
        type: '(values, selected) => void',
        description: { zh: '设置选中状态', en: 'Sets selected state' },
      },
      clearSelectedValues: {
        type: '() => void',
        description: { zh: '清空选中', en: 'Clears selection' },
      },
      getExpandNodes: {
        type: '() => TreeNodeCollection',
        description: { zh: '获取展开节点', en: 'Gets expanded nodes' },
      },
      setExpandedStatus: {
        type: '(values, expanded) => void',
        description: { zh: '设置展开状态', en: 'Sets expanded state' },
      },
      setAllExpandedStatus: {
        type: '(expanded) => void',
        description: { zh: '设置全部展开', en: 'Sets all expanded' },
      },
      getNodesByValue: {
        type: '(values) => ReadonlyMap',
        description: { zh: '按值获取节点', en: 'Gets nodes by value' },
      },
      setNodeByValue: {
        type: '(data, value?) => void',
        description: { zh: '设置节点', en: 'Sets a node' },
      },
      addNodeChildrenByValue: {
        type: '(data, value?) => void',
        description: { zh: '添加子节点', en: 'Adds children' },
      },
      deleteNodeByValue: {
        type: '(value?) => void',
        description: { zh: '删除节点', en: 'Deletes a node' },
      },
      getVisibleItems: {
        type: '() => TreeNormalizedNode[]',
        description: { zh: '获取可见节点', en: 'Gets visible nodes' },
      },
      scrollTo: {
        type: '(value?) => void',
        description: { zh: '滚动到节点', en: 'Scrolls to a node' },
      },
      confirm: { type: '() => TreeSelectModelValue', description: { zh: '确认', en: 'Confirms' } },
      cancel: { type: '() => TreeSelectModelValue', description: { zh: '取消', en: 'Cancels' } },
      setOpen: {
        type: '(open) => void',
        description: { zh: '设置面板状态', en: 'Sets popup state' },
      },
      setFilterValue: {
        type: '(value) => void',
        description: { zh: '设置过滤值', en: 'Sets filter value' },
      },
      getPendingValue: {
        type: '() => TreeSelectModelValue',
        description: { zh: '获取暂存值', en: 'Gets draft value' },
      },
    }),
  },
});
