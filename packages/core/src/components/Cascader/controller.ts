import type {
  CascaderModelValue,
  CascaderNormalizedOption,
  CascaderOption,
  CascaderValuePath,
} from './contract';
import {
  collectSelectableCascaderLeaves,
  getCascaderDescendantSelectionState,
  looselyEqualCascaderValues,
  normalizeCascaderModelValue,
} from './algorithms';

export type CascaderSelectionStatus =
  | 'selected'
  | 'deselected'
  | 'unchanged'
  | 'disabled'
  | 'unselectable'
  | 'branch'
  | 'limit';

export interface CascaderSelectionResult<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> {
  /** 选择结果状态。 @en Selection result status. */
  status: CascaderSelectionStatus;
  /** 目标选项是否在暂存选择中。 @en Whether the target is staged as selected. */
  selected: boolean;
  /** 目标规范化选项。 @en Target normalized option. */
  option: CascaderNormalizedOption<Option>;
  /** 当前暂存模型值。 @en Current staged model value. */
  value: CascaderModelValue;
  /** 此次变化是否已提交。 @en Whether this change was committed. */
  committed: boolean;
}

export interface CascaderSelectionControllerOptions {
  /** 受控模型值。 @en Controlled model value. */
  value?: CascaderModelValue;
  /** 非受控初始模型值。 @en Initial uncontrolled model value. */
  defaultValue?: CascaderModelValue;
  /** 启用多选。 @en Enables multiple selection. */
  multiple?: boolean;
  /** 多选数量限制。 @en Multiple-selection limit. */
  multipleLimit?: number;
  /** 父子选择互不关联。 @en Makes parent and child selection independent. */
  checkStrictly?: boolean;
  /** 选择需要显式确认。 @en Requires explicit selection confirmation. */
  needConfirm?: boolean;
  /** 模型值变化回调。 @en Model-value change callback. */
  onValueChange?: (value: CascaderModelValue) => void;
}

/** 框架无关的 Cascader 单选、多选与暂存确认控制器。 @en Framework-neutral Cascader single, multiple and staged-confirmation controller. */
export class CascaderSelectionController {
  private committed: CascaderValuePath[];
  private staged: CascaderValuePath[];
  private controlled: boolean;
  private multiple: boolean;
  private multipleLimit: number;
  private checkStrictly: boolean;
  private needConfirm: boolean;
  private onValueChange?: CascaderSelectionControllerOptions['onValueChange'];

  constructor(options: CascaderSelectionControllerOptions = {}) {
    this.controlled = options.value !== undefined;
    this.committed = normalizeCascaderModelValue(options.value ?? options.defaultValue);
    this.staged = this.committed.map(path => path.slice());
    this.multiple = options.multiple ?? false;
    this.multipleLimit = options.multipleLimit ?? Number.POSITIVE_INFINITY;
    this.checkStrictly = options.checkStrictly ?? false;
    this.needConfirm = options.needConfirm ?? false;
    this.onValueChange = options.onValueChange;
    this.enforceModeAndLimit();
  }

  public get value(): CascaderModelValue {
    return this.toModelValue(this.committed);
  }

  public get pendingValue(): CascaderModelValue {
    return this.toModelValue(this.staged);
  }

  public setOptions(options: CascaderSelectionControllerOptions): void {
    if (options.multiple !== undefined) this.multiple = options.multiple;
    if (options.multipleLimit !== undefined) this.multipleLimit = options.multipleLimit;
    if (options.checkStrictly !== undefined) this.checkStrictly = options.checkStrictly;
    if (options.needConfirm !== undefined) this.needConfirm = options.needConfirm;
    if (Object.hasOwn(options, 'onValueChange')) this.onValueChange = options.onValueChange;
    if (Object.hasOwn(options, 'value')) {
      this.controlled = options.value !== undefined;
      if (options.value !== undefined) this.syncValue(options.value);
    }
    this.enforceModeAndLimit();
  }

  public syncValue(value: CascaderModelValue): void {
    this.committed = normalizeCascaderModelValue(value);
    this.staged = this.committed.map(path => path.slice());
    this.enforceModeAndLimit();
  }

  public begin(): void {
    this.staged = this.committed.map(path => path.slice());
  }

  public select<Option extends CascaderOption<unknown>>(
    option: CascaderNormalizedOption<Option>,
  ): CascaderSelectionResult<Option> {
    const currentIndex = this.findPath(this.staged, option.path);
    if (option.disabled || (!this.checkStrictly && option.passingDisabled)) {
      return this.result('disabled', currentIndex >= 0, option, false);
    }
    if (!option.selectable) return this.result('unselectable', currentIndex >= 0, option, false);
    if (!this.checkStrictly && !option.isLeaf) {
      return this.result('branch', currentIndex >= 0, option, false);
    }

    let status: CascaderSelectionStatus;
    let selected: boolean;
    if (this.multiple) {
      if (currentIndex >= 0) {
        this.staged.splice(currentIndex, 1);
        status = 'deselected';
        selected = false;
      } else if (this.staged.length >= this.multipleLimit) {
        return this.result('limit', false, option, false);
      } else {
        this.staged.push(option.path.slice());
        status = 'selected';
        selected = true;
      }
    } else if (currentIndex >= 0 && this.staged.length === 1) {
      status = 'unchanged';
      selected = true;
    } else {
      this.staged = [option.path.slice()];
      status = 'selected';
      selected = true;
    }

    const committed = !this.needConfirm;
    if (committed) this.commitStaged();
    return this.result(status, selected, option, committed);
  }

  /**
   * 在父子关联的多选模式中批量切换分支下的可选叶子节点。
   * @en Toggles selectable descendant leaves for linked multiple selection.
   * @param option 目标分支。
   * @paramEn option Target branch.
   */
  public toggleBranch<Option extends CascaderOption<unknown>>(
    option: CascaderNormalizedOption<Option>,
  ): CascaderSelectionResult<Option> {
    if (!this.multiple || this.checkStrictly || option.isLeaf) return this.select(option);
    if (option.disabled || option.passingDisabled) {
      return this.result('disabled', false, option, false);
    }
    if (!option.selectable) return this.result('unselectable', false, option, false);
    const leaves = collectSelectableCascaderLeaves(option, false);
    const selectionState = getCascaderDescendantSelectionState(option, this.staged, false);
    const deselect = selectionState === 'all';
    if (deselect) {
      this.staged = this.staged.filter(
        path => !leaves.some(leaf => looselyEqualCascaderValues(path, leaf.path)),
      );
    } else {
      const additions = leaves.filter(leaf => this.findPath(this.staged, leaf.path) < 0);
      if (this.staged.length + additions.length > this.multipleLimit) {
        return this.result('limit', false, option, false);
      }
      this.staged.push(...additions.map(leaf => leaf.path.slice()));
    }
    const committed = !this.needConfirm;
    if (committed) this.commitStaged();
    return this.result(deselect ? 'deselected' : 'selected', !deselect, option, committed);
  }

  public confirm(): CascaderModelValue {
    return this.commitStaged();
  }

  public cancel(): CascaderModelValue {
    this.begin();
    return this.pendingValue;
  }

  public clear(): CascaderModelValue {
    this.staged = [];
    if (!this.needConfirm) this.commitStaged();
    return this.pendingValue;
  }

  private result<Option extends CascaderOption<unknown>>(
    status: CascaderSelectionStatus,
    selected: boolean,
    option: CascaderNormalizedOption<Option>,
    committed: boolean,
  ): CascaderSelectionResult<Option> {
    return { status, selected, option, value: this.pendingValue, committed };
  }

  private commitStaged(): CascaderModelValue {
    const next = this.staged.map(path => path.slice());
    const value = this.toModelValue(next);
    if (!this.controlled) this.committed = next;
    this.onValueChange?.(value);
    return value;
  }

  private enforceModeAndLimit(): void {
    const limit = this.multiple ? this.multipleLimit : 1;
    this.committed = this.committed.slice(0, Math.max(0, limit));
    this.staged = this.staged.slice(0, Math.max(0, limit));
  }

  private findPath(paths: readonly CascaderValuePath[], path: CascaderValuePath): number {
    return paths.findIndex(candidate => looselyEqualCascaderValues(candidate, path));
  }

  private toModelValue(paths: readonly CascaderValuePath[]): CascaderModelValue {
    const cloned = paths.map(path => path.slice());
    return this.multiple ? cloned : cloned[0];
  }
}
