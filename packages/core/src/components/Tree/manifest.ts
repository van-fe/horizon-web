import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { TreeCommandMap, TreeEventMap, TreeRegionMap } from './contract';
import { treeApiContract } from './contract';

export const treeManifest = createComponentManifest({
  name: 'Tree',
  category: 'navigation',
  description: {
    zh: '展示、筛选和操作层级数据。',
    en: 'Displays, filters, and operates on hierarchical data.',
  },
  semantics: [
    'field-mapped hierarchy',
    'controlled expansion and selection',
    'linked or strict checks',
    'filtering',
    'dynamic loading',
    'drag and drop',
  ],
  accessibility: [
    'tree and treeitem roles',
    'expanded state',
    'selected and mixed states',
    'roving keyboard focus',
  ],
  testVectors: [
    'field mapping',
    'immutable updates',
    'controlled rollback',
    'linked checks',
    'filter ancestors',
    'dynamic-load generations',
    'keyboard navigation',
    'drop veto and stale state',
  ],
  contract: {
    props: createPropManifestFields(treeApiContract, {
      treeData: { type: 'readonly TreeOption[]', description: { zh: '树数据', en: 'Tree data' } },
      defaultTreeData: {
        type: 'readonly TreeOption[]',
        description: { zh: '非受控树数据初值', en: 'Initial uncontrolled tree data' },
      },
      size: { type: 'TreeSize', description: { zh: '尺寸', en: 'Size' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      filterable: { type: 'boolean', description: { zh: '启用过滤', en: 'Filterable' } },
      filterToHideChildren: {
        type: 'boolean',
        description: { zh: '按当前标签过滤', en: 'Filter current labels' },
      },
      filterMethod: {
        type: 'TreeFilterMethod',
        description: { zh: '过滤方法', en: 'Filter method' },
      },
      filterValue: { type: 'string', description: { zh: '过滤值', en: 'Filter value' } },
      filterInputValue: {
        type: 'string',
        description: { zh: '外部过滤输入', en: 'External filter input' },
      },
      hideFilterInput: {
        type: 'boolean',
        description: { zh: '隐藏过滤输入', en: 'Hide filter input' },
      },
      expandFilteredTree: {
        type: 'boolean',
        description: { zh: '展开过滤结果', en: 'Expand filter results' },
      },
      fieldMap: { type: 'TreeFieldMap', description: { zh: '字段映射', en: 'Field mapping' } },
      height: { type: 'number | string', description: { zh: '高度', en: 'Height' } },
      maxHeight: { type: 'number | string', description: { zh: '最大高度', en: 'Maximum height' } },
      useVirtualScroll: { type: 'boolean', description: { zh: '虚拟滚动', en: 'Virtual scroll' } },
      virtualScrollBuffer: {
        type: 'number',
        description: { zh: '虚拟滚动缓冲', en: 'Virtual scroll buffer' },
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
        description: { zh: '受控展开值', en: 'Controlled expanded values' },
      },
      defaultExpandValues: {
        type: 'readonly TreeValue[]',
        description: { zh: '初始展开值', en: 'Initial expanded values' },
      },
      expandOnClickNode: {
        type: 'boolean',
        description: { zh: '点击展开', en: 'Expand on node click' },
      },
      checkStrictly: { type: 'boolean', description: { zh: '严格勾选', en: 'Strict checking' } },
      foldIcon: {
        type: 'unknown',
        description: { zh: '折叠图标语义', en: 'Collapsed icon semantic' },
      },
      expandIcon: {
        type: 'unknown',
        description: { zh: '展开图标语义', en: 'Expanded icon semantic' },
      },
      prefixIcon: {
        type: 'unknown',
        description: { zh: '前缀图标语义', en: 'Prefix icon semantic' },
      },
      multiple: { type: 'boolean', description: { zh: '多选', en: 'Multiple' } },
      multipleLimit: { type: 'number', description: { zh: '多选限制', en: 'Multiple limit' } },
      selectedValues: {
        type: 'readonly TreeValue[]',
        description: { zh: '受控选中值', en: 'Controlled selected values' },
      },
      defaultSelectedValues: {
        type: 'readonly TreeValue[]',
        description: { zh: '初始选中值', en: 'Initial selected values' },
      },
      checkOnClickNode: {
        type: 'boolean',
        description: { zh: '点击节点勾选', en: 'Check on node click' },
      },
      checkOnClickLeaf: {
        type: 'boolean',
        description: { zh: '点击叶节点勾选', en: 'Check on leaf click' },
      },
      stress: { type: 'boolean', description: { zh: '强调选中', en: 'Stress selected nodes' } },
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
        description: { zh: '自动展开父级', en: 'Expand ancestors automatically' },
      },
      searchInputPlaceholder: {
        type: 'string',
        description: { zh: '搜索占位文字', en: 'Search placeholder' },
      },
      indent: { type: 'number', description: { zh: '缩进', en: 'Indent' } },
      tooltip: { type: 'boolean', description: { zh: '显示提示', en: 'Show tooltip' } },
      parentEffectDisabledChild: {
        type: 'boolean',
        description: { zh: '父级影响禁用子级', en: 'Parent affects disabled descendants' },
      },
      showCheckbox: { type: 'boolean', description: { zh: '显示复选框', en: 'Show checkboxes' } },
      showRadio: { type: 'boolean', description: { zh: '显示单选框', en: 'Show radios' } },
      draggable: { type: 'boolean', description: { zh: '允许拖拽', en: 'Draggable' } },
      draggableIcon: {
        type: 'unknown',
        description: { zh: '拖拽图标语义', en: 'Drag icon semantic' },
      },
      undraggableIcon: {
        type: 'unknown',
        description: { zh: '禁止拖拽图标语义', en: 'Undraggable icon semantic' },
      },
      draggableIconAlwaysVisible: {
        type: 'boolean',
        description: { zh: '始终显示拖拽图标', en: 'Always show drag icon' },
      },
      dragOnHandler: { type: 'boolean', description: { zh: '仅手柄拖拽', en: 'Drag by handle' } },
      dragToLeaf: {
        type: 'boolean',
        description: { zh: '允许拖入叶节点', en: 'Allow dropping into leaves' },
      },
      beforeDrop: {
        type: 'TreeBeforeDrop',
        description: { zh: '放置前回调', en: 'Before-drop guard' },
      },
      showLine: { type: 'boolean', description: { zh: '显示连线', en: 'Show connector lines' } },
      expandWrapperByChildren: {
        type: 'boolean',
        description: { zh: '内容撑开容器', en: 'Children expand wrapper' },
      },
    }),
    emits: createManifestFields<TreeEventMap>({
      treeDataChange: {
        type: 'readonly TreeOption[]',
        description: { zh: '树数据变化', en: 'Tree data changed' },
      },
      expandValuesChange: {
        type: 'TreeValue[]',
        description: { zh: '展开值变化', en: 'Expanded values changed' },
      },
      selectedValuesChange: {
        type: 'TreeValue[]',
        description: { zh: '选中值变化', en: 'Selected values changed' },
      },
      visibleNodesChange: {
        type: 'TreeNormalizedNode[]',
        description: { zh: '可见节点变化', en: 'Visible nodes changed' },
      },
      filterValueChange: {
        type: 'string | undefined',
        description: { zh: '过滤值变化', en: 'Filter value changed' },
      },
      expand: {
        type: '[TreeValue[], TreeValue, TreeExpandDetails]',
        description: { zh: '节点展开变化', en: 'Node expansion changed' },
      },
      select: {
        type: '[TreeValue[], TreeValue, TreeSelectDetails]',
        description: { zh: '节点选择变化', en: 'Node selection changed' },
      },
      nodeClick: {
        type: '[unknown, TreeValue, TreeOption]',
        description: { zh: '节点点击', en: 'Node clicked' },
      },
      nodeContextMenu: {
        type: '[unknown, TreeValue, TreeOption]',
        description: { zh: '节点右键', en: 'Node context menu' },
      },
      reachTop: { type: 'void', description: { zh: '滚动到顶部', en: 'Reached top' } },
      reachBottom: { type: 'void', description: { zh: '滚动到底部', en: 'Reached bottom' } },
    }),
    slots: createManifestFields<TreeRegionMap>({
      treeNode: { type: 'TreeNodeRegionContext', description: { zh: '树节点', en: 'Tree node' } },
      empty: { type: 'void', description: { zh: '空状态', en: 'Empty state' } },
    }),
    exposes: createManifestFields<TreeCommandMap>({
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
        description: { zh: '设置全部展开', en: 'Sets all expansion' },
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
    }),
  },
});
