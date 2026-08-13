import type { TreeNormalizedData } from './algorithms';
import { getTreeAncestors, isTreeDescendant } from './algorithms';
import type { TreeNormalizedNode, TreeOption, TreeValue } from './contract';

export type TreeStateReason = 'pointer' | 'keyboard' | 'imperative' | 'filter' | 'sync';
export interface TreeExpansionControllerOptions {
  value?: readonly TreeValue[];
  defaultValue?: readonly TreeValue[];
  defaultExpandAll?: boolean;
  defaultExpandParent?: boolean;
  onValueChange?: (values: TreeValue[], reason: TreeStateReason) => void;
}
export interface TreeExpansionResult {
  changed: boolean;
  expanded: boolean;
  values: TreeValue[];
  reason: TreeStateReason;
}

/** 框架无关的受控/非受控展开状态控制器。 @en Framework-neutral controlled/uncontrolled expansion controller. */
export class TreeExpansionController<Option extends TreeOption = TreeOption> {
  private values = new Set<TreeValue>();
  private controlled = false;
  private defaultExpandParent = true;
  private onValueChange?: TreeExpansionControllerOptions['onValueChange'];
  private tree?: TreeNormalizedData<Option>;

  constructor(options: TreeExpansionControllerOptions = {}) {
    this.controlled = options.value !== undefined;
    this.values = new Set(options.value ?? options.defaultValue);
    this.defaultExpandParent = options.defaultExpandParent ?? true;
    this.onValueChange = options.onValueChange;
  }
  public get expandedValues(): TreeValue[] {
    return [...this.values];
  }
  public isExpanded(value: TreeValue): boolean {
    return this.values.has(value);
  }
  public setTree(tree: TreeNormalizedData<Option>, defaultExpandAll = false): void {
    this.tree = tree;
    if (defaultExpandAll && this.values.size === 0)
      this.values = new Set(tree.flat.filter(node => !node.isLeaf).map(node => node.value));
    else this.sync(this.values);
  }
  public setOptions(options: TreeExpansionControllerOptions): void {
    if (options.defaultExpandParent !== undefined)
      this.defaultExpandParent = options.defaultExpandParent;
    if (Object.hasOwn(options, 'onValueChange')) this.onValueChange = options.onValueChange;
    if (Object.hasOwn(options, 'value')) {
      this.controlled = options.value !== undefined;
      if (options.value) this.sync(options.value);
    }
  }
  /** 同步外部值；受控 renderer 可用其确认或回滚乐观交互。 @en Syncs external values so controlled renderers can confirm or roll back optimistic interaction. */
  public sync(values: Iterable<TreeValue>): void {
    const next = new Set(values);
    if (this.defaultExpandParent && this.tree)
      for (const value of [...next]) {
        const node = this.tree.byValue.get(value);
        if (node)
          for (const ancestor of getTreeAncestors(node, false))
            if (!ancestor.isLeaf) next.add(ancestor.value);
      }
    this.values = next;
  }
  public toggle(value: TreeValue, reason: TreeStateReason = 'imperative'): TreeExpansionResult {
    return this.set(value, !this.values.has(value), reason);
  }
  public set(
    value: TreeValue,
    expanded: boolean,
    reason: TreeStateReason = 'imperative',
  ): TreeExpansionResult {
    const before = this.values.has(value);
    const node = this.tree?.byValue.get(value);
    if (expanded) {
      this.values.add(value);
      if (this.defaultExpandParent && node)
        for (const ancestor of getTreeAncestors(node, false))
          if (!ancestor.isLeaf) this.values.add(ancestor.value);
    } else {
      this.values.delete(value);
      if (node && this.tree)
        for (const candidate of this.tree.flat)
          if (candidate !== node && isTreeDescendant(candidate, node))
            this.values.delete(candidate.value);
    }
    const changed = before !== this.values.has(value);
    const values = this.expandedValues;
    if (changed) this.onValueChange?.(values, reason);
    return { changed, expanded: this.values.has(value), values, reason };
  }
  public setMany(
    values: Iterable<TreeValue>,
    expanded: boolean,
    reason: TreeStateReason = 'imperative',
  ): TreeValue[] {
    for (const value of values) this.set(value, expanded, reason);
    return this.expandedValues;
  }
  public setAll(expanded: boolean, reason: TreeStateReason = 'imperative'): TreeValue[] {
    const next = expanded
      ? (this.tree?.flat.filter(node => !node.isLeaf).map(node => node.value) ?? [])
      : [];
    const changed = next.length !== this.values.size || next.some(value => !this.values.has(value));
    this.values = new Set(next);
    if (changed) this.onValueChange?.(this.expandedValues, reason);
    return this.expandedValues;
  }
}

export type TreeSelectionStatus =
  | 'selected'
  | 'deselected'
  | 'unchanged'
  | 'disabled'
  | 'unselectable'
  | 'branch'
  | 'limit'
  | 'missing';
export interface TreeSelectionControllerOptions {
  value?: readonly TreeValue[];
  defaultValue?: readonly TreeValue[];
  multiple?: boolean;
  multipleLimit?: number;
  checkStrictly?: boolean;
  parentEffectDisabledChild?: boolean;
  onValueChange?: (values: TreeValue[], reason: TreeStateReason) => void;
}
export interface TreeCheckState {
  checked: boolean;
  indeterminate: boolean;
}
export interface TreeSelectionResult<Option extends TreeOption = TreeOption> {
  /** 操作结果；关联分支超过上限但至少加入一个叶节点时仍为 selected。 @en Operation result; a linked branch that partially fills the limit is still selected. */
  status: TreeSelectionStatus;
  /** 请求的最终方向；limit/disabled/unselectable/missing 时表示目标并未变为选中。 @en Requested final direction; false for limit, disabled, unselectable, or missing results. */
  selected: boolean;
  node?: TreeNormalizedNode<Option>;
  values: TreeValue[];
  allCheckedValues: TreeValue[];
  halfCheckedValues: TreeValue[];
  reason: TreeStateReason;
}

/** 严格或父子关联的受控/非受控选择控制器；关联模式内部仅存叶节点。 @en Controlled/uncontrolled strict or linked selection controller; linked mode stores leaves only. */
export class TreeSelectionController<Option extends TreeOption = TreeOption> {
  private values = new Set<TreeValue>();
  private controlled = false;
  private tree?: TreeNormalizedData<Option>;
  private multiple = false;
  private limit = Number.POSITIVE_INFINITY;
  private strict = false;
  private parentEffectsDisabled = false;
  private onValueChange?: TreeSelectionControllerOptions['onValueChange'];
  constructor(options: TreeSelectionControllerOptions = {}) {
    this.controlled = options.value !== undefined;
    this.values = new Set(options.value ?? options.defaultValue);
    this.multiple = options.multiple ?? false;
    this.limit = options.multipleLimit ?? Number.POSITIVE_INFINITY;
    this.strict = options.checkStrictly ?? false;
    this.parentEffectsDisabled = options.parentEffectDisabledChild ?? false;
    this.onValueChange = options.onValueChange;
  }
  public get selectedValues(): TreeValue[] {
    return [...this.values];
  }
  public setTree(tree: TreeNormalizedData<Option>): void {
    this.tree = tree;
    this.sync(this.values);
  }
  public setOptions(options: TreeSelectionControllerOptions): void {
    if (options.multiple !== undefined) this.multiple = options.multiple;
    if (options.multipleLimit !== undefined) this.limit = options.multipleLimit;
    if (options.checkStrictly !== undefined) this.strict = options.checkStrictly;
    if (options.parentEffectDisabledChild !== undefined)
      this.parentEffectsDisabled = options.parentEffectDisabledChild;
    if (Object.hasOwn(options, 'onValueChange')) this.onValueChange = options.onValueChange;
    if (Object.hasOwn(options, 'value')) {
      this.controlled = options.value !== undefined;
      if (options.value) this.sync(options.value);
    } else this.sync(this.values);
  }
  public sync(values: Iterable<TreeValue>): void {
    const requested = [...values];
    this.values.clear();
    if (!this.tree) {
      requested.slice(0, this.multiple ? this.limit : 1).forEach(value => this.values.add(value));
      return;
    }
    for (const value of requested) {
      const node = this.tree.byValue.get(value);
      if (!node) {
        if (this.values.size < (this.multiple ? this.limit : 1)) this.values.add(value);
        continue;
      }
      if (this.strict || node.isLeaf) {
        if (this.values.size < (this.multiple ? this.limit : 1)) this.values.add(value);
      } else this.applyLinked(node, true);
    }
  }
  public isSelected(value: TreeValue): boolean {
    return this.values.has(value);
  }
  public getCheckStates(): Map<TreeValue, TreeCheckState> {
    const result = new Map<TreeValue, TreeCheckState>();
    if (!this.tree) return result;
    if (this.strict) {
      for (const node of this.tree.flat)
        result.set(node.value, { checked: this.values.has(node.value), indeterminate: false });
      return result;
    }
    for (let index = this.tree.flat.length - 1; index >= 0; index--) {
      const node = this.tree.flat[index];
      if (node.isLeaf || node.children.length === 0)
        result.set(node.value, { checked: this.values.has(node.value), indeterminate: false });
      else {
        const checkable = node.children;
        const checked =
          checkable.length > 0 && checkable.every(child => result.get(child.value)?.checked);
        const indeterminate =
          !checked &&
          checkable.some(child => {
            const state = result.get(child.value);
            return state?.checked || state?.indeterminate;
          });
        result.set(node.value, { checked, indeterminate });
      }
    }
    return result;
  }
  public get allCheckedValues(): TreeValue[] {
    const states = this.getCheckStates();
    return (
      this.tree?.flat.filter(node => states.get(node.value)?.checked).map(node => node.value) ??
      this.selectedValues
    );
  }
  public get halfCheckedValues(): TreeValue[] {
    const states = this.getCheckStates();
    return (
      this.tree?.flat
        .filter(node => states.get(node.value)?.indeterminate)
        .map(node => node.value) ?? []
    );
  }
  public set(
    value: TreeValue,
    selected: boolean,
    reason: TreeStateReason = 'imperative',
  ): TreeSelectionResult<Option> {
    const node = this.tree?.byValue.get(value);
    if (!node) return this.result('missing', false, undefined, reason);
    if (node.disabled || (!this.strict && node.passingDisabled))
      return this.result(
        'disabled',
        this.getCheckStates().get(value)?.checked ?? false,
        node,
        reason,
      );
    if (!node.selectable) return this.result('unselectable', false, node, reason);
    const before = new Set(this.values);
    if (!this.multiple) {
      if (!this.strict && !node.isLeaf) return this.result('branch', false, node, reason);
      this.values.clear();
      this.values.add(value);
      selected = true;
    } else if (this.strict) {
      if (selected && !this.values.has(value) && this.values.size >= this.limit)
        return this.result('limit', false, node, reason);
      selected ? this.values.add(value) : this.values.delete(value);
    } else {
      const linked = this.applyLinked(node, selected);
      if (selected && linked.limited && !linked.changed)
        return this.result('limit', false, node, reason);
    }
    const changed =
      before.size !== this.values.size || [...before].some(item => !this.values.has(item));
    if (changed) this.onValueChange?.(this.selectedValues, reason);
    return this.result(
      changed ? (selected ? 'selected' : 'deselected') : 'unchanged',
      selected,
      node,
      reason,
    );
  }
  public toggle(
    value: TreeValue,
    reason: TreeStateReason = 'imperative',
  ): TreeSelectionResult<Option> {
    const state = this.getCheckStates().get(value);
    return this.set(value, !state?.checked, reason);
  }
  public clear(reason: TreeStateReason = 'imperative'): TreeValue[] {
    const changed = this.values.size > 0;
    this.values.clear();
    if (changed) this.onValueChange?.([], reason);
    return [];
  }
  private applyLinked(
    node: TreeNormalizedNode<Option>,
    selected: boolean,
  ): { changed: boolean; limited: boolean } {
    const leaves: TreeNormalizedNode<Option>[] = [];
    const stack = [node];
    while (stack.length) {
      const current = stack.pop()!;
      if ((!this.parentEffectsDisabled && current.passingDisabled) || !current.selectable) continue;
      if (current.isLeaf || current.children.length === 0) leaves.push(current);
      else stack.push(...current.children.slice().reverse());
    }
    let changed = false;
    let limited = false;
    for (const leaf of leaves) {
      if (!selected) {
        changed = this.values.delete(leaf.value) || changed;
      } else if (!this.values.has(leaf.value)) {
        if (this.values.size < this.limit) {
          this.values.add(leaf.value);
          changed = true;
        } else {
          limited = true;
        }
      }
    }
    return { changed, limited };
  }
  private result(
    status: TreeSelectionStatus,
    selected: boolean,
    node: TreeNormalizedNode<Option> | undefined,
    reason: TreeStateReason,
  ): TreeSelectionResult<Option> {
    return {
      status,
      selected,
      node,
      values: this.selectedValues,
      allCheckedValues: this.allCheckedValues,
      halfCheckedValues: this.halfCheckedValues,
      reason,
    };
  }
}
