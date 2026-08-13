import type { TreeNormalizedNode, TreeOption, TreeValue } from './contract';
import { getVisibleTreeNodes } from './algorithms';

export type TreeNavigationKey =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Home'
  | 'End'
  | 'Enter'
  | ' ';
export interface TreeNavigationState {
  focusedValue?: TreeValue;
  expandedValues: ReadonlySet<TreeValue>;
}
export type TreeNavigationCommand =
  | { type: 'none' }
  | { type: 'focus'; value: TreeValue }
  | { type: 'expand'; value: TreeValue }
  | { type: 'collapse'; value: TreeValue }
  | { type: 'select'; value: TreeValue };

export interface TreeNavigationOptions<Option extends TreeOption = TreeOption> {
  /** renderer 已按过滤、展开等状态计算的可见顺序。 @en Renderer-computed visible order after filtering, expansion, and other state. */
  visibleNodes?: readonly TreeNormalizedNode<Option>[];
  /** 统一判断节点是否不可导航或选择。 @en Consistently determines whether a node is unavailable for navigation or selection. */
  isDisabled?: (node: TreeNormalizedNode<Option>) => boolean;
}

/** 将树键盘输入归约为 renderer 可执行的纯命令。 @en Reduces tree keyboard input to a renderer-executable pure command. */
export function reduceTreeNavigation<Option extends TreeOption>(
  flat: readonly TreeNormalizedNode<Option>[],
  state: TreeNavigationState,
  key: TreeNavigationKey,
  options: TreeNavigationOptions<Option> = {},
): TreeNavigationCommand {
  const isDisabled = options.isDisabled ?? (node => node.disabled);
  const suppliedVisible = options.visibleNodes;
  const visible = suppliedVisible ?? getVisibleTreeNodes(flat, state.expandedValues);
  const visibleValues = new Set(visible.map(node => node.value));
  const enabled = visible.filter(node => !isDisabled(node));
  if (!enabled.length) return { type: 'none' };
  const index = enabled.findIndex(node => node.value === state.focusedValue);
  const current = index >= 0 ? enabled[index] : undefined;
  if (key === 'Home') return { type: 'focus', value: enabled[0].value };
  if (key === 'End') return { type: 'focus', value: enabled.at(-1)!.value };
  if (key === 'ArrowDown')
    return {
      type: 'focus',
      value: enabled[Math.min(index < 0 ? 0 : index + 1, enabled.length - 1)].value,
    };
  if (key === 'ArrowUp')
    return {
      type: 'focus',
      value: enabled[Math.max(index < 0 ? enabled.length - 1 : index - 1, 0)].value,
    };
  if ((key === 'Enter' || key === ' ') && !current) return { type: 'none' };
  if (!current) return { type: 'focus', value: enabled[0].value };
  if (key === 'ArrowRight') {
    if (!current.isLeaf && !state.expandedValues.has(current.value))
      return { type: 'expand', value: current.value };
    const child = current.children.find(node => visibleValues.has(node.value) && !isDisabled(node));
    return child ? { type: 'focus', value: child.value } : { type: 'none' };
  }
  if (key === 'ArrowLeft') {
    if (!current.isLeaf && state.expandedValues.has(current.value))
      return { type: 'collapse', value: current.value };
    let ancestor = current.parent;
    while (ancestor && (!visibleValues.has(ancestor.value) || isDisabled(ancestor)))
      ancestor = ancestor.parent;
    return ancestor ? { type: 'focus', value: ancestor.value } : { type: 'none' };
  }
  if (key === 'Enter' || key === ' ') return { type: 'select', value: current.value };
  return { type: 'none' };
}

export interface TreeAriaState {
  role: 'treeitem';
  level: number;
  disabled: boolean;
  selected: boolean;
  expanded?: boolean;
  checked?: boolean | 'mixed';
}
export function getTreeAriaState<Option extends TreeOption>(
  node: TreeNormalizedNode<Option>,
  options: { selected: boolean; expanded?: boolean; checked?: boolean; indeterminate?: boolean },
): TreeAriaState {
  return {
    role: 'treeitem',
    level: node.level + 1,
    disabled: node.disabled,
    selected: options.selected,
    expanded: node.isLeaf ? undefined : (options.expanded ?? false),
    checked: options.indeterminate ? 'mixed' : options.checked,
  };
}
