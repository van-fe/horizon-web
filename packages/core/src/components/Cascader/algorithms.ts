import type {
  CascaderFieldMap,
  CascaderFilterFunction,
  CascaderFilterSortFunction,
  CascaderModelValue,
  CascaderNormalizedOption,
  CascaderOption,
  CascaderShowStrategy,
  CascaderValue,
  CascaderValuePath,
} from './contract';

const DEFAULT_FIELD_MAP: Required<CascaderFieldMap> = {
  value: 'value',
  label: 'label',
  stringLabel: 'stringLabel',
  disabled: 'disabled',
  children: 'children',
  isLeaf: 'isLeaf',
  groupLabel: 'groupLabel',
  selectable: 'selectable',
};

export interface CascaderNormalizedTree<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> {
  roots: CascaderNormalizedOption<Option>[];
  flat: CascaderNormalizedOption<Option>[];
  byId: Map<number, CascaderNormalizedOption<Option>>;
}

function readMappedField(object: unknown, path: string): unknown {
  let value = object;
  for (const key of path.split('.')) {
    if (typeof value !== 'object' || value === null) return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

function writeMappedField(object: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  let target = object;
  for (const key of keys.slice(0, -1)) {
    const current = target[key];
    const copy =
      typeof current === 'object' && current !== null && !Array.isArray(current)
        ? { ...(current as Record<string, unknown>) }
        : {};
    target[key] = copy;
    target = copy;
  }
  target[keys.at(-1)!] = value;
}

/**
 * 将任意字段映射的选项树规范化为稳定节点结构。
 * @en Normalizes an option tree with arbitrary field mappings into stable nodes.
 * @param options 原始选项树。
 * @paramEn options Original option tree.
 * @param fieldMap 字段映射。
 * @paramEn fieldMap Field mapping.
 */
export function normalizeCascaderOptions<Option extends CascaderOption<unknown>>(
  options: readonly Option[],
  fieldMap: CascaderFieldMap = {},
): CascaderNormalizedTree<Option> {
  const fields = { ...DEFAULT_FIELD_MAP, ...fieldMap };
  const roots: CascaderNormalizedOption<Option>[] = [];
  const flat: CascaderNormalizedOption<Option>[] = [];
  const byId = new Map<number, CascaderNormalizedOption<Option>>();
  let id = 0;
  const frames = options
    .slice()
    .reverse()
    .map((option, reverseIndex) => ({
      option,
      parent: null as CascaderNormalizedOption<Option> | null,
      target: roots,
      index: options.length - reverseIndex - 1,
    }));

  while (frames.length > 0) {
    const { option, parent, target, index } = frames.pop()!;
    const value = readMappedField(option, fields.value);
    if (typeof value !== 'string' && (typeof value !== 'number' || !Number.isFinite(value))) {
      throw new TypeError('Cascader option value must be a string or finite number.');
    }
    const label = readMappedField(option, fields.label) as Option['label'];
    const explicitStringLabel = readMappedField(option, fields.stringLabel);
    const stringLabel =
      typeof label === 'string'
        ? label
        : typeof explicitStringLabel === 'string'
          ? explicitStringLabel
          : String(value);
    const rawChildren = readMappedField(option, fields.children);
    const childOptions = Array.isArray(rawChildren) ? (rawChildren as Option[]) : [];
    const disabled = readMappedField(option, fields.disabled) === true;
    const explicitLeaf = readMappedField(option, fields.isLeaf);
    const node: CascaderNormalizedOption<Option> = {
      id: id++,
      value,
      label,
      stringLabel,
      disabled,
      passingDisabled: Boolean(parent?.passingDisabled || disabled),
      selectable: readMappedField(option, fields.selectable) !== false,
      groupLabel: readMappedField(option, fields.groupLabel),
      isLeaf: typeof explicitLeaf === 'boolean' ? explicitLeaf : childOptions.length === 0,
      isRoot: parent === null,
      level: parent ? parent.level + 1 : 0,
      index,
      parent,
      children: [],
      path: parent ? [...parent.path, value] : [value],
      labelPath: parent ? [...parent.labelPath, stringLabel] : [stringLabel],
      originOption: option,
    };
    target.push(node);
    flat.push(node);
    byId.set(node.id, node);
    for (let childIndex = childOptions.length - 1; childIndex >= 0; childIndex--) {
      frames.push({
        option: childOptions[childIndex],
        parent: node,
        target: node.children,
        index: childIndex,
      });
    }
  }

  return { roots, flat, byId };
}

/**
 * 查找完整值路径对应的节点。
 * @en Finds the node addressed by a complete value path.
 * @param roots 规范化根节点。
 * @paramEn roots Normalized root nodes.
 * @param path 完整值路径。
 * @paramEn path Complete value path.
 * @param loose 是否使用宽松值比较。
 * @paramEn loose Whether to use loose value comparison.
 */
export function findCascaderOptionByPath<Option extends CascaderOption<unknown>>(
  roots: readonly CascaderNormalizedOption<Option>[],
  path: readonly CascaderValue[],
  loose = false,
): CascaderNormalizedOption<Option> | undefined {
  let siblings = roots;
  let node: CascaderNormalizedOption<Option> | undefined;
  for (const value of path) {
    node = siblings.find(item =>
      loose ? looselyEqualCascaderValues(item.value, value) : item.value === value,
    );
    if (!node) return undefined;
    siblings = node.children;
  }
  return node;
}

/**
 * 按完整值路径不可变地替换目标选项的子节点。
 * @en Immutably replaces a target option's children by its complete value path.
 * @param options 原始选项树。
 * @paramEn options Original option tree.
 * @param path 目标完整值路径。
 * @paramEn path Complete target value path.
 * @param children 新子节点。
 * @paramEn children New child options.
 * @param fieldMap 字段映射。
 * @paramEn fieldMap Field mapping.
 */
export function replaceCascaderOptionChildren<Option extends CascaderOption<unknown>>(
  options: readonly Option[],
  path: readonly CascaderValue[],
  children: readonly Option[],
  fieldMap: CascaderFieldMap = {},
): Option[] {
  if (path.length === 0) return options.slice();
  const fields = { ...DEFAULT_FIELD_MAP, ...fieldMap };
  const replace = (siblings: readonly Option[], level: number): [Option[], boolean] => {
    let changed = false;
    const result = siblings.map(option => {
      if (readMappedField(option, fields.value) !== path[level]) return option;
      if (level === path.length - 1) {
        const clone = { ...option } as Option & Record<string, unknown>;
        writeMappedField(clone, fields.children, children.slice());
        changed = true;
        return clone;
      }
      const currentChildren = readMappedField(option, fields.children);
      if (!Array.isArray(currentChildren)) return option;
      const [nextChildren, childChanged] = replace(currentChildren as Option[], level + 1);
      if (!childChanged) return option;
      const clone = { ...option } as Option & Record<string, unknown>;
      writeMappedField(clone, fields.children, nextChildren);
      changed = true;
      return clone;
    });
    return [result, changed];
  };
  return replace(options, 0)[0];
}

/**
 * 将单选或多选值统一为值路径数组，并复制输入路径。
 * @en Normalizes single or multiple values into copied value paths.
 * @param value 单选或多选模型值。
 * @paramEn value Single or multiple model value.
 */
export function normalizeCascaderModelValue(value: CascaderModelValue): CascaderValuePath[] {
  if (!Array.isArray(value) || value.length === 0) return [];
  return Array.isArray(value[0])
    ? (value as CascaderValuePath[]).map(path => path.slice())
    : [(value as CascaderValuePath).slice()];
}

function isEmptyCascaderValue(value: unknown): boolean {
  return value == null || (Array.isArray(value) && value.length === 0);
}

function stripContext(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripContext);
  if (typeof value !== 'object' || value === null) return value;
  const result: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    if (key !== '_ctx') result[key] = stripContext(child);
  }
  return result;
}

function deepLooseEqual(left: unknown, right: unknown): boolean {
  if (left === right) return true;
  if (left == null || right == null) return left == right;
  if (typeof left !== 'object' && typeof right !== 'object') return String(left) === String(right);
  if (Array.isArray(left) || Array.isArray(right)) {
    return (
      Array.isArray(left) &&
      Array.isArray(right) &&
      left.length === right.length &&
      left.every((value, index) => deepLooseEqual(value, right[index]))
    );
  }
  if (typeof left !== 'object' || typeof right !== 'object') return false;
  const leftObject = stripContext(left) as Record<string, unknown>;
  const rightObject = stripContext(right) as Record<string, unknown>;
  const leftKeys = Object.keys(leftObject);
  const rightKeys = Object.keys(rightObject);
  return (
    leftKeys.length === rightKeys.length &&
    leftKeys.every(key =>
      Object.hasOwn(rightObject, key) ? deepLooseEqual(leftObject[key], rightObject[key]) : false,
    )
  );
}

/**
 * 使用 Cascader 的宽松数值/字符串规则比较值。
 * @en Compares values with Cascader's loose string/number semantics.
 * @param left 左侧值。
 * @paramEn left Left value.
 * @param right 右侧值。
 * @paramEn right Right value.
 */
export function looselyEqualCascaderValues(left: unknown, right: unknown): boolean {
  if (isEmptyCascaderValue(left) && isEmptyCascaderValue(right)) return true;
  return deepLooseEqual(left, right);
}

/** 默认按路径末级标签进行不区分大小写的包含过滤。 @en Default case-insensitive contains filter on the last path label. */
export const defaultCascaderFilter: CascaderFilterFunction = (input, paths) =>
  paths.at(-1)?.label.toLowerCase().includes(input.toLowerCase()) ?? false;

export interface FilterCascaderOptionsConfig<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> {
  input: string;
  checkStrictly?: boolean;
  filter?: CascaderFilterFunction<CascaderNormalizedOption<Option>>;
  sort?: CascaderFilterSortFunction<CascaderNormalizedOption<Option>>;
  limit?: number;
}

/**
 * 过滤、排序并限制扁平选项列表，且不修改输入数组。
 * @en Filters, sorts and limits a flat option list without mutating it.
 * @param options 扁平选项列表。
 * @paramEn options Flat option list.
 * @param config 过滤、排序与限制配置。
 * @paramEn config Filter, sort and limit configuration.
 */
export function filterCascaderOptions<Option extends CascaderOption<unknown>>(
  options: readonly CascaderNormalizedOption<Option>[],
  config: FilterCascaderOptionsConfig<Option>,
): CascaderNormalizedOption<Option>[] {
  const input = config.input.trim();
  const filter = config.filter ?? defaultCascaderFilter;
  let result = options.filter(option => config.checkStrictly || option.isLeaf);
  if (input) {
    result = result.filter(option =>
      filter(
        input,
        collectCascaderPath(option).map(pathOption => ({
          label: pathOption.labelPath.join(' / '),
          value: pathOption.value,
          option: pathOption,
        })),
      ),
    );
  }
  if (config.sort) result.sort((left, right) => config.sort!(left, right, input));
  const limit = config.limit ?? 50;
  return result.slice(0, Math.max(0, limit));
}

/**
 * 收集根节点到当前节点的节点路径。
 * @en Collects the node path from the root to a node.
 * @param option 当前选项。
 * @paramEn option Current option.
 */
export function collectCascaderPath<Option extends CascaderOption<unknown>>(
  option: CascaderNormalizedOption<Option>,
): CascaderNormalizedOption<Option>[] {
  const result: CascaderNormalizedOption<Option>[] = [];
  let current: CascaderNormalizedOption<Option> | null = option;
  while (current) {
    result.push(current);
    current = current.parent;
  }
  return result.reverse();
}

/**
 * 解析选中项展示标签。
 * @en Resolves a selected option's display label.
 * @param option 已匹配的规范化选项。
 * @paramEn option Matched normalized option.
 * @param valuePath 原始值路径。
 * @paramEn valuePath Original value path.
 * @param strategy 标签展示策略。
 * @paramEn strategy Label display strategy.
 * @param separator 路径分隔符。
 * @paramEn separator Path separator.
 */
export function getCascaderDisplayLabel(
  option: Pick<CascaderNormalizedOption, 'labelPath' | 'stringLabel'> | undefined,
  valuePath: readonly CascaderValue[],
  strategy: CascaderShowStrategy,
  separator: string,
): string {
  if (strategy === 'leaf') return option?.stringLabel ?? String(valuePath.at(-1) ?? '');
  return (option?.labelPath ?? valuePath.map(String)).join(` ${separator} `);
}

/**
 * 保留多选集合的前 N 项且不修改输入。
 * @en Keeps the first N selected values without mutating the input.
 * @param paths 已选择路径。
 * @paramEn paths Selected paths.
 * @param limit 最大保留数量。
 * @paramEn limit Maximum retained count.
 */
export function limitCascaderSelection(
  paths: readonly CascaderValuePath[],
  limit: number,
): CascaderValuePath[] {
  if (limit === Number.POSITIVE_INFINITY) return paths.map(path => path.slice());
  return paths.slice(0, Math.max(0, limit)).map(path => path.slice());
}

/**
 * 收集分支下所有可选择的叶子节点。
 * @en Collects every selectable descendant leaf below a branch.
 * @param node 目标分支或叶子。
 * @paramEn node Target branch or leaf.
 * @param checkStrictly 是否忽略祖先禁用传递。
 * @paramEn checkStrictly Whether inherited disabled state is ignored.
 */
export function collectSelectableCascaderLeaves<Option extends CascaderOption<unknown>>(
  node: CascaderNormalizedOption<Option>,
  checkStrictly = false,
): CascaderNormalizedOption<Option>[] {
  const result: CascaderNormalizedOption<Option>[] = [];
  const stack = [node];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if ((!checkStrictly && current.passingDisabled) || !current.selectable) continue;
    if (current.isLeaf) {
      if (!current.disabled) result.push(current);
      continue;
    }
    for (let index = current.children.length - 1; index >= 0; index--) {
      stack.push(current.children[index]);
    }
  }
  return result;
}

export type CascaderDescendantSelectionState = 'all' | 'none' | 'indeterminate';

/**
 * 计算分支下可选择叶子的整体选中状态。
 * @en Computes aggregate selection state for selectable descendant leaves.
 * @param node 目标分支或叶子。
 * @paramEn node Target branch or leaf.
 * @param selectedPaths 已选择值路径。
 * @paramEn selectedPaths Selected value paths.
 * @param checkStrictly 是否忽略祖先禁用传递。
 * @paramEn checkStrictly Whether inherited disabled state is ignored.
 */
export function getCascaderDescendantSelectionState<Option extends CascaderOption<unknown>>(
  node: CascaderNormalizedOption<Option>,
  selectedPaths: readonly CascaderValuePath[],
  checkStrictly = false,
): CascaderDescendantSelectionState {
  const leaves = collectSelectableCascaderLeaves(node, checkStrictly);
  if (leaves.length === 0) return 'none';
  const selectedCount = leaves.filter(leaf =>
    selectedPaths.some(path => looselyEqualCascaderValues(path, leaf.path)),
  ).length;
  if (selectedCount === 0) return 'none';
  return selectedCount === leaves.length ? 'all' : 'indeterminate';
}
