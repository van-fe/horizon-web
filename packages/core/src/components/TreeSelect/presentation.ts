import type { TreeNormalizedData } from '../Tree';
import type { TreeNormalizedNode, TreeOption, TreeValue } from '../Tree';
import type { TreeSelectReserveKeyword, TreeSelectTagData } from './contract';

export interface TreeSelectTagOptions {
  disabled?: boolean;
  checkStrictly?: boolean;
  previousLabels?: ReadonlyMap<TreeValue, string>;
}

/** 依据 Tree 的规范化结果生成 renderer 可消费的标签数据。 @en Creates renderer-consumable tag data from normalized Tree output. */
export function createTreeSelectTags<Option extends TreeOption>(
  tree: TreeNormalizedData<Option>,
  values: readonly TreeValue[],
  options: TreeSelectTagOptions = {},
): TreeSelectTagData<Option>[] {
  return values.map(value => {
    const node = tree.byValue.get(value);
    const label = node?.stringLabel ?? options.previousLabels?.get(value) ?? '';
    return {
      value,
      label,
      fullPathLabel: node?.fullPathLabel ?? label,
      disabled: options.disabled === true || node?.disabled === true,
      removable:
        options.disabled !== true &&
        node?.disabled !== true &&
        (node === undefined || options.checkStrictly === true || !node.passingDisabled),
      node,
    };
  });
}

export interface TreeSelectSummaryOptions {
  text?: string;
  singularText: string;
  pluralText: string;
}

/** 生成多选统计文字，renderer 负责提供本地化词条。 @en Formats a multiple-selection summary with renderer-provided locale text. */
export function formatTreeSelectSummary(count: number, options: TreeSelectSummaryOptions): string {
  if (count <= 0) return '';
  if (options.text) return `${options.text} (${count})`;
  return count === 1 ? options.singularText : `${options.pluralText} (${count})`;
}

export interface TreeSelectDisplayOptions extends Partial<TreeSelectSummaryOptions> {
  multiple?: boolean;
  filterable?: boolean;
  filterValue?: string;
  useStatistic?: boolean;
  previousLabels?: ReadonlyMap<TreeValue, string>;
}

/** 计算触发器的纯文本展示值。 @en Resolves the trigger's plain-text display value. */
export function resolveTreeSelectDisplay<Option extends TreeOption>(
  tree: TreeNormalizedData<Option>,
  values: readonly TreeValue[],
  options: TreeSelectDisplayOptions = {},
): string | undefined {
  const filter = options.filterValue ?? '';
  if (options.multiple) {
    if (options.useStatistic && values.length > 0)
      return formatTreeSelectSummary(values.length, {
        text: options.text,
        singularText: options.singularText ?? '',
        pluralText: options.pluralText ?? '',
      });
    if (options.filterable && filter && values.length === 0) return filter;
    return values.length > 0 ? ' ' : '';
  }
  if (options.filterable && filter && values.length === 0) return filter;
  const value = values[0];
  if (value === undefined) return '';
  return tree.byValue.get(value)?.stringLabel ?? options.previousLabels?.get(value);
}

/** 根据关键词保留策略计算一次选择后的输入与过滤值。 @en Resolves input and filter values after selection according to keyword-retention policy. */
export function resolveTreeSelectKeywordAfterSelection(
  policy: TreeSelectReserveKeyword,
  checked: boolean,
  inputValue: string,
  filterValue: string,
): { inputValue: string; filterValue: string } {
  if (policy === false || (policy === 'reserve-deselect' && checked))
    return { inputValue: '', filterValue: '' };
  if (policy === 'reserve-special') return { inputValue: '', filterValue };
  return { inputValue, filterValue };
}

/** 按选择顺序返回仍存在于树中的规范化节点。 @en Returns normalized nodes that still exist, preserving selection order. */
export function getTreeSelectSelectedNodes<Option extends TreeOption>(
  tree: TreeNormalizedData<Option>,
  values: readonly TreeValue[],
): TreeNormalizedNode<Option>[] {
  return values.flatMap(value => {
    const node = tree.byValue.get(value);
    return node ? [node] : [];
  });
}
