import { normalizeTree, TreeSelectionController } from '../Tree';
import type {
  TreeFieldMap,
  TreeNormalizedData,
  TreeOption,
  TreeSelectionResult,
  TreeStateReason,
  TreeValue,
} from '../Tree';
import type {
  TreeSelectFilterChangeDetails,
  TreeSelectFilterReason,
  TreeSelectModelValue,
  TreeSelectOpenChangeDetails,
  TreeSelectOpenReason,
  TreeSelectValueChangeDetails,
  TreeSelectValueReason,
} from './contract';
import { createTreeSelectTags } from './presentation';

/** 受控值提案的处理方式。 @en How proposals are handled while the value is controlled. */
export type TreeSelectControlledPolicy = 'strict' | 'optimistic';
/** 未确认暂存值在关闭过程中的处理方式。 @en How an unconfirmed draft is handled across closing. */
export type TreeSelectDismissBehavior = 'reset-immediate' | 'reset-on-open' | 'preserve';
/** 清空或移除标签是否绕过确认会话。 @en Whether clear or tag removal bypasses the confirmation session. */
export type TreeSelectDirectOperationBehavior = 'commit' | 'session';

export interface TreeSelectControllerOptions<Option extends TreeOption = TreeOption> {
  value?: TreeSelectModelValue;
  defaultValue?: TreeSelectModelValue;
  initialValue?: TreeSelectModelValue;
  open?: boolean;
  defaultOpen?: boolean;
  filterValue?: string;
  defaultFilterValue?: string;
  pendingValue?: TreeSelectModelValue;
  treeData?: readonly Option[];
  fieldMap?: TreeFieldMap;
  disabled?: boolean;
  multiple?: boolean;
  multipleLimit?: number;
  checkStrictly?: boolean;
  parentEffectDisabledChild?: boolean;
  needConfirm?: boolean;
  controlledPolicy?: TreeSelectControlledPolicy;
  dismissBehavior?: TreeSelectDismissBehavior;
  clearBehavior?: TreeSelectDirectOperationBehavior;
  removeBehavior?: TreeSelectDirectOperationBehavior;
  onValueChange?: (value: TreeSelectModelValue, details: TreeSelectValueChangeDetails) => void;
  onPendingValueChange?: (
    value: TreeSelectModelValue,
    details: TreeSelectValueChangeDetails,
  ) => void;
  onOpenChange?: (open: boolean, details: TreeSelectOpenChangeDetails) => void;
  onFilterValueChange?: (value: string, details: TreeSelectFilterChangeDetails) => void;
  onConfirm?: (value: TreeSelectModelValue) => void;
  onCancel?: (value: TreeSelectModelValue) => void;
  onClear?: (value: TreeSelectModelValue) => void;
}

export interface TreeSelectSnapshot<Option extends TreeOption = TreeOption> {
  value: TreeSelectModelValue;
  pendingValue: TreeSelectModelValue;
  values: TreeValue[];
  pendingValues: TreeValue[];
  open: boolean;
  filterValue: string;
  disabled: boolean;
  multiple: boolean;
  needConfirm: boolean;
  controlled: boolean;
  tree: TreeNormalizedData<Option>;
}

export interface TreeSelectInteractionResult<
  Option extends TreeOption = TreeOption,
> extends TreeSelectionResult<Option> {
  committed: boolean;
  value: TreeSelectModelValue;
  pendingValue: TreeSelectModelValue;
}

export interface TreeSelectStageResult {
  changed: boolean;
  committed: boolean;
  reason: TreeSelectValueReason;
  value: TreeSelectModelValue;
  pendingValue: TreeSelectModelValue;
  values: TreeValue[];
  pendingValues: TreeValue[];
}

/** 将 Tree 的规范化与选择控制器组合为 TreeSelect 的值、确认、面板和过滤状态机。 @en Composes Tree normalization and selection with TreeSelect value, confirmation, popup and filter state. */
export class TreeSelectController<Option extends TreeOption = TreeOption> {
  private options: TreeSelectControllerOptions<Option>;
  private tree: TreeNormalizedData<Option>;
  private selection: TreeSelectionController<Option>;
  private committedValues: TreeValue[];
  private pendingValues: TreeValue[];
  private committedModelValue: TreeSelectModelValue;
  private openState: boolean;
  private filterState: string;
  private controlled: boolean;
  private openControlled: boolean;
  private destroyed = false;

  public constructor(options: TreeSelectControllerOptions<Option> = {}) {
    this.options = { ...options };
    this.controlled = Object.hasOwn(options, 'value');
    this.openControlled = Object.hasOwn(options, 'open');
    this.committedModelValue = this.controlled ? options.value : options.defaultValue;
    this.committedValues = this.limitValues(normalizeTreeSelectValue(this.committedModelValue));
    this.pendingValues = this.limitValues(
      normalizeTreeSelectValue(
        Object.hasOwn(options, 'pendingValue') ? options.pendingValue : this.committedModelValue,
      ),
    );
    this.openState = options.open ?? options.defaultOpen ?? false;
    this.filterState = options.filterValue ?? options.defaultFilterValue ?? '';
    this.tree = normalizeTree(options.treeData ?? [], options.fieldMap);
    this.selection = this.createSelection();
    this.committedModelValue = this.normalizeModelShape(this.committedModelValue);
    if (options.disabled) this.openState = false;
  }

  public get snapshot(): Readonly<TreeSelectSnapshot<Option>> {
    return {
      value: cloneTreeSelectModelValue(this.committedModelValue),
      pendingValue: this.serialize(this.pendingValues),
      values: this.committedValues.slice(),
      pendingValues: this.pendingValues.slice(),
      open: this.openState,
      filterValue: this.filterState,
      disabled: this.options.disabled ?? false,
      multiple: this.options.multiple ?? false,
      needConfirm: this.options.needConfirm ?? false,
      controlled: this.controlled,
      tree: this.tree,
    };
  }

  /** 更新行为参数；传入 value 字段时 renderer 切换或保持受控模式。 @en Updates behavior options; supplying the value field switches or keeps the renderer in controlled mode. */
  public setOptions(options: TreeSelectControllerOptions<Option>): void {
    const previousMultiple = this.options.multiple ?? false;
    const previousLimit = this.options.multipleLimit ?? Number.POSITIVE_INFINITY;
    const wasDisabled = this.options.disabled ?? false;
    this.options = { ...this.options, ...options };
    if (Object.hasOwn(options, 'treeData') || Object.hasOwn(options, 'fieldMap'))
      this.setTreeData(this.options.treeData ?? [], this.options.fieldMap);
    if (Object.hasOwn(options, 'value')) {
      this.controlled = true;
      this.syncValue(options.value);
    }
    if (Object.hasOwn(options, 'pendingValue')) this.syncPendingValue(options.pendingValue);
    if (Object.hasOwn(options, 'open')) {
      this.openControlled = true;
      this.syncOpen(options.open ?? false);
    }
    if (Object.hasOwn(options, 'filterValue')) this.syncFilterValue(options.filterValue ?? '');
    this.selection.setOptions({
      multiple: this.options.multiple ?? false,
      multipleLimit: this.options.multipleLimit,
      checkStrictly: this.options.checkStrictly,
      parentEffectDisabledChild: this.options.parentEffectDisabledChild,
    });
    this.selection.sync(this.pendingValues);
    this.pendingValues = this.selection.selectedValues;
    this.committedValues = this.limitValues(this.committedValues);
    if (
      previousMultiple !== (this.options.multiple ?? false) ||
      previousLimit !== (this.options.multipleLimit ?? Number.POSITIVE_INFINITY)
    ) {
      const converged = this.serialize(this.committedValues);
      this.applyFormalProposal(converged, 'mode-change');
    }
    if (!wasDisabled && this.options.disabled) this.setOpen(false, 'disabled');
  }

  /** 切换回非受控值模式，并从给定值重新建立会话。 @en Switches back to uncontrolled value mode and rebuilds the session from the supplied value. */
  public setUncontrolledValue(value: TreeSelectModelValue): void {
    this.controlled = false;
    this.syncValue(value);
  }

  public setTreeData(treeData: readonly Option[], fieldMap?: TreeFieldMap): void {
    this.tree = normalizeTree(treeData, fieldMap);
    this.selection.setTree(this.tree);
    this.selection.sync(this.pendingValues);
    this.pendingValues = this.selection.selectedValues;
    this.committedValues = this.limitValues(this.committedValues);
  }

  public syncValue(value: TreeSelectModelValue): void {
    this.committedModelValue = cloneTreeSelectModelValue(value);
    this.committedValues = this.limitValues(normalizeTreeSelectValue(value));
    this.committedModelValue = this.normalizeModelShape(this.committedModelValue);
    this.resetPending();
  }

  /** 静默同步暂存值，供 renderer 从外部状态恢复确认会话。 @en Silently synchronizes the draft so renderers can restore a confirmation session from external state. */
  public syncPendingValue(value: TreeSelectModelValue): void {
    this.selection.sync(this.limitValues(normalizeTreeSelectValue(value)));
    this.pendingValues = this.selection.selectedValues;
  }

  public syncOpen(open: boolean): void {
    this.openState = Boolean(open && !this.options.disabled);
    if (!this.openState && this.dismissBehavior === 'reset-immediate') this.resetPending();
  }

  /** 切换回非受控面板模式。 @en Switches the popup back to uncontrolled mode. */
  public setUncontrolledOpen(open: boolean): void {
    this.openControlled = false;
    this.syncOpen(open);
  }

  public syncFilterValue(value: string): void {
    this.filterState = value;
  }

  public setOpen(open: boolean, reason: TreeSelectOpenReason = 'imperative'): boolean {
    if (this.destroyed || (open && this.options.disabled) || open === this.openState) return false;
    const appliesOptimistically = !this.openControlled || this.controlledPolicy === 'optimistic';
    if (appliesOptimistically) {
      this.openState = open;
      if (open) {
        if (this.dismissBehavior !== 'preserve') this.begin();
      } else {
        if (this.dismissBehavior === 'reset-immediate') this.resetPending();
        this.commitFilter('', 'close');
      }
    }
    this.options.onOpenChange?.(open, { reason });
    return true;
  }

  public begin(): void {
    this.resetPending();
  }

  public select(
    value: TreeValue,
    reason: TreeStateReason = 'pointer',
  ): TreeSelectInteractionResult<Option> {
    if (this.destroyed || this.options.disabled)
      return this.decorate(this.selection.set(value, false, reason), false);
    const result = this.selection.toggle(value, reason);
    const stage = this.acceptPending(result.values, 'select');
    if (stage.committed && !(this.options.multiple ?? false)) this.setOpen(false, 'select');
    return this.decorate(result, stage.committed);
  }

  public setSelected(
    value: TreeValue,
    selected: boolean,
    reason: TreeStateReason = 'imperative',
  ): TreeSelectInteractionResult<Option> {
    if (this.destroyed || this.options.disabled)
      return this.decorate(this.selection.set(value, false, reason), false);
    const result = this.selection.set(value, selected, reason);
    const stage = this.acceptPending(result.values, 'select');
    return this.decorate(result, stage.committed);
  }

  /** 接收 Tree renderer 已计算完成的选中值，不重复执行 Tree 勾选算法。 @en Accepts values already resolved by a Tree renderer without repeating Tree selection algorithms. */
  public stageValues(
    values: readonly TreeValue[],
    reason: TreeSelectValueReason = 'select',
  ): TreeSelectStageResult {
    if (this.destroyed || this.options.disabled) return this.stageResult(false, false, reason);
    this.selection.sync(this.limitValues(values));
    const next = this.selection.selectedValues;
    const changed = !equalTreeSelectValues(this.pendingValues, next);
    this.pendingValues = next;
    const committed = !(this.options.needConfirm ?? false) && changed;
    this.options.onPendingValueChange?.(this.serialize(this.pendingValues), {
      reason,
      committed,
    });
    if (committed) {
      this.applyFormalProposal(this.serialize(this.pendingValues), reason);
      if (!(this.options.multiple ?? false) && reason === 'select') this.setOpen(false, 'select');
    }
    return this.stageResult(changed, committed, reason);
  }

  public confirm(): TreeSelectModelValue {
    if (this.destroyed || this.options.disabled || !this.options.needConfirm)
      return cloneTreeSelectModelValue(this.committedModelValue);
    const proposed = this.serialize(this.pendingValues);
    this.applyFormalProposal(proposed, 'confirm');
    this.options.onConfirm?.(proposed);
    this.setOpen(false, 'confirm');
    return proposed;
  }

  public cancel(): TreeSelectModelValue {
    const value = cloneTreeSelectModelValue(this.committedModelValue);
    if (!this.destroyed && !this.options.disabled && this.options.needConfirm) {
      if (this.dismissBehavior === 'reset-immediate') this.resetPending();
      this.options.onCancel?.(value);
      this.setOpen(false, 'cancel');
    }
    return value;
  }

  /** 清空选择；commit 模式会保留 initialValue 的原始值形状。 @en Clears selection; commit mode preserves the original initialValue shape. */
  public clear(): TreeSelectStageResult {
    if (this.destroyed || this.options.disabled) return this.stageResult(false, false, 'clear');
    const retained =
      (this.options.multiple ?? false)
        ? createTreeSelectTags(this.tree, this.pendingValues, {
            checkStrictly: this.options.checkStrictly,
          })
            .filter(tag => !tag.removable)
            .map(tag => tag.value)
        : [];
    const fallback =
      retained.length > 0 ? retained : cloneTreeSelectModelValue(this.options.initialValue);
    this.selection.sync(this.limitValues(normalizeTreeSelectValue(fallback)));
    const next = this.selection.selectedValues;
    const changed = !equalTreeSelectValues(this.pendingValues, next);
    this.pendingValues = next;
    const direct = (this.options.clearBehavior ?? 'commit') === 'commit';
    if (direct) this.applyFormalProposal(fallback, 'clear');
    else
      this.options.onPendingValueChange?.(this.serialize(this.pendingValues), {
        reason: 'clear',
        committed: false,
      });
    this.commitFilter('', 'clear');
    const result = this.stageResult(changed, direct, 'clear');
    this.options.onClear?.(direct ? fallback : result.pendingValue);
    return result;
  }

  /** 移除一个值；默认直接提交，renderer 也可把它放入确认会话。 @en Removes one value; direct commit is the default, while renderers may keep it in the confirmation session. */
  public removeValue(value: TreeValue): TreeSelectStageResult {
    if (this.destroyed || this.options.disabled) return this.stageResult(false, false, 'remove');
    const source =
      (this.options.removeBehavior ?? 'commit') === 'commit'
        ? this.committedValues
        : this.pendingValues;
    const next = source.filter(item => item !== value);
    const changed = next.length !== source.length;
    if (!changed) return this.stageResult(false, false, 'remove');
    this.selection.sync(next);
    this.pendingValues = this.selection.selectedValues;
    const direct = (this.options.removeBehavior ?? 'commit') === 'commit';
    if (direct) this.applyFormalProposal(this.serialize(this.pendingValues), 'remove');
    else
      this.options.onPendingValueChange?.(this.serialize(this.pendingValues), {
        reason: 'remove',
        committed: false,
      });
    return this.stageResult(true, direct, 'remove');
  }

  public setFilterValue(value: string, reason: TreeSelectFilterReason = 'input'): boolean {
    if (this.destroyed || value === this.filterState) return false;
    return this.commitFilter(value, reason);
  }

  public destroy(): void {
    this.destroyed = true;
  }

  private get controlledPolicy(): TreeSelectControlledPolicy {
    return this.options.controlledPolicy ?? 'strict';
  }

  private get dismissBehavior(): TreeSelectDismissBehavior {
    return this.options.dismissBehavior ?? 'reset-immediate';
  }

  private createSelection(): TreeSelectionController<Option> {
    const selection = new TreeSelectionController<Option>({
      defaultValue: this.pendingValues,
      multiple: this.options.multiple ?? false,
      multipleLimit: this.options.multipleLimit,
      checkStrictly: this.options.checkStrictly,
      parentEffectDisabledChild: this.options.parentEffectDisabledChild,
    });
    selection.setTree(this.tree);
    this.pendingValues = selection.selectedValues;
    this.committedValues = this.limitValues(this.committedValues);
    return selection;
  }

  private acceptPending(
    values: readonly TreeValue[],
    reason: TreeSelectValueReason,
  ): TreeSelectStageResult {
    const previous = this.pendingValues;
    this.pendingValues = values.slice();
    const changed = !equalTreeSelectValues(previous, this.pendingValues);
    const committed = !(this.options.needConfirm ?? false) && changed;
    this.options.onPendingValueChange?.(this.serialize(this.pendingValues), { reason, committed });
    if (committed) this.applyFormalProposal(this.serialize(this.pendingValues), reason);
    return this.stageResult(changed, committed, reason);
  }

  private resetPending(): void {
    this.pendingValues = this.committedValues.slice();
    this.selection.sync(this.pendingValues);
    this.pendingValues = this.selection.selectedValues;
  }

  private applyFormalProposal(value: TreeSelectModelValue, reason: TreeSelectValueReason): void {
    const proposedValues = this.limitValues(normalizeTreeSelectValue(value));
    const changed =
      !equalTreeSelectValues(this.committedValues, proposedValues) ||
      !equalTreeSelectModelShape(this.committedModelValue, value);
    if (!changed) return;
    if (!this.controlled || this.controlledPolicy === 'optimistic') {
      this.committedValues = proposedValues;
      this.committedModelValue = cloneTreeSelectModelValue(value);
    }
    this.options.onValueChange?.(cloneTreeSelectModelValue(value), { reason, committed: true });
  }

  private commitFilter(value: string, reason: TreeSelectFilterReason): boolean {
    if (value === this.filterState) return false;
    this.filterState = value;
    this.options.onFilterValueChange?.(value, { reason });
    return true;
  }

  private limitValues(values: readonly TreeValue[]): TreeValue[] {
    const limit = this.options.multiple
      ? (this.options.multipleLimit ?? Number.POSITIVE_INFINITY)
      : 1;
    return values.slice(0, Math.max(0, limit));
  }

  private serialize(values: readonly TreeValue[]): TreeSelectModelValue {
    return this.options.multiple ? values.slice() : values[0];
  }

  private normalizeModelShape(value: TreeSelectModelValue): TreeSelectModelValue {
    const normalized = normalizeTreeSelectValue(value);
    if (
      normalized.length === this.committedValues.length &&
      equalTreeSelectValues(normalized, this.committedValues)
    )
      return cloneTreeSelectModelValue(value);
    return this.serialize(this.committedValues);
  }

  private decorate(
    result: TreeSelectionResult<Option>,
    committed: boolean,
  ): TreeSelectInteractionResult<Option> {
    return {
      ...result,
      committed,
      value: cloneTreeSelectModelValue(this.committedModelValue),
      pendingValue: this.serialize(this.pendingValues),
    };
  }

  private stageResult(
    changed: boolean,
    committed: boolean,
    reason: TreeSelectValueReason,
  ): TreeSelectStageResult {
    return {
      changed,
      committed,
      reason,
      value: cloneTreeSelectModelValue(this.committedModelValue),
      pendingValue: this.serialize(this.pendingValues),
      values: this.committedValues.slice(),
      pendingValues: this.pendingValues.slice(),
    };
  }
}

/** 将公开模型值规范化为稳定数组。 @en Normalizes the public model value into a stable array. */
export function normalizeTreeSelectValue(value: TreeSelectModelValue): TreeValue[] {
  if (value == null) return [];
  return Array.isArray(value) ? value.slice() : [value];
}

/** 比较两个规范化模型值，保持选择顺序语义。 @en Compares normalized model values while preserving selection-order semantics. */
export function equalTreeSelectValues(
  left: readonly TreeValue[],
  right: readonly TreeValue[],
): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

/** 复制模型值，避免数组引用穿透 Core 状态。 @en Clones model values so arrays cannot mutate Core state by reference. */
export function cloneTreeSelectModelValue(value: TreeSelectModelValue): TreeSelectModelValue {
  return Array.isArray(value) ? value.slice() : value;
}

function equalTreeSelectModelShape(
  left: TreeSelectModelValue,
  right: TreeSelectModelValue,
): boolean {
  if (Array.isArray(left) || Array.isArray(right))
    return Array.isArray(left) && Array.isArray(right) && equalTreeSelectValues(left, right);
  return left === right;
}
