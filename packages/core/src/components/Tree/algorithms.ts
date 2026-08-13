import type {
  TreeFieldMap,
  TreeFilterMethod,
  TreeNormalizedNode,
  TreeOption,
  TreeValue,
} from './contract';
import { isTreeValue } from './contract';

export const TREE_DEFAULT_FIELD_MAP: Readonly<Required<TreeFieldMap>> = Object.freeze({
  value: 'value',
  label: 'label',
  stringLabel: 'stringLabel',
  disabled: 'disabled',
  children: 'children',
  isLeaf: 'isLeaf',
  groupLabel: 'groupLabel',
  selectable: 'selectable',
  prefixIcon: 'prefixIcon',
  draggable: 'draggable',
  prefixIconClassName: 'prefixIconClassName',
});

function readField(object: unknown, path: string): unknown {
  let value = object;
  for (const key of path.split('.')) {
    if (typeof value !== 'object' || value === null) return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

function writeField(object: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  let target = object;
  for (const key of keys.slice(0, -1)) {
    const source = target[key];
    const copy =
      typeof source === 'object' && source !== null && !Array.isArray(source)
        ? { ...(source as Record<string, unknown>) }
        : {};
    target[key] = copy;
    target = copy;
  }
  target[keys.at(-1)!] = value;
}

export interface TreeNormalizedData<Option extends TreeOption = TreeOption> {
  roots: TreeNormalizedNode<Option>[];
  flat: TreeNormalizedNode<Option>[];
  byValue: Map<TreeValue, TreeNormalizedNode<Option>>;
}

/** 将字段映射后的树规范化为稳定、可查询的纯数据结构。 @en Normalizes a field-mapped tree into a stable queryable structure. */
export function normalizeTree<Option extends TreeOption>(
  options: readonly Option[],
  fieldMap: TreeFieldMap = {},
): TreeNormalizedData<Option> {
  const fields = { ...TREE_DEFAULT_FIELD_MAP, ...fieldMap };
  const roots: TreeNormalizedNode<Option>[] = [];
  const flat: TreeNormalizedNode<Option>[] = [];
  const byValue = new Map<TreeValue, TreeNormalizedNode<Option>>();
  const stack = options
    .slice()
    .reverse()
    .map((option, reverseIndex) => ({
      option,
      parent: null as TreeNormalizedNode<Option> | null,
      target: roots,
      index: options.length - reverseIndex - 1,
    }));
  while (stack.length) {
    const { option, parent, target, index } = stack.pop()!;
    const value = readField(option, fields.value);
    if (!isTreeValue(value))
      throw new TypeError('Tree option value must be a string or finite number.');
    if (byValue.has(value))
      throw new Error(`Tree option value must be unique. Received: ${String(value)}`);
    const label = readField(option, fields.label) as Option['label'];
    const stringLabelField = readField(option, fields.stringLabel);
    const stringLabel =
      typeof label === 'string'
        ? label
        : typeof stringLabelField === 'string'
          ? stringLabelField
          : String(value);
    const sourceChildren = readField(option, fields.children);
    const childOptions = Array.isArray(sourceChildren) ? (sourceChildren as Option[]) : [];
    const disabled = readField(option, fields.disabled) === true;
    const explicitLeaf = readField(option, fields.isLeaf);
    const node: TreeNormalizedNode<Option> = {
      key: value,
      value,
      label,
      stringLabel,
      disabled,
      passingDisabled: Boolean(disabled || parent?.passingDisabled),
      selectable: readField(option, fields.selectable) !== false,
      draggable: readField(option, fields.draggable) !== false,
      isLeaf: typeof explicitLeaf === 'boolean' ? explicitLeaf : childOptions.length === 0,
      isRoot: parent === null,
      level: parent ? parent.level + 1 : 0,
      index,
      parent,
      children: [],
      path: parent ? [...parent.path, value] : [value],
      keyPath: parent ? [...parent.keyPath, value] : [value],
      labelPath: parent ? [...parent.labelPath, stringLabel] : [stringLabel],
      fullPathLabel: parent ? `${parent.fullPathLabel} / ${stringLabel}` : stringLabel,
      originOption: option,
    };
    target.push(node);
    flat.push(node);
    byValue.set(value, node);
    for (let childIndex = childOptions.length - 1; childIndex >= 0; childIndex--)
      stack.push({
        option: childOptions[childIndex],
        parent: node,
        target: node.children,
        index: childIndex,
      });
  }
  return { roots, flat, byValue };
}
export const normalizeTreeData = normalizeTree;
export function findTreeNodeByValue<Option extends TreeOption>(
  tree: TreeNormalizedData<Option>,
  value: TreeValue,
): TreeNormalizedNode<Option> | undefined {
  return tree.byValue.get(value);
}
export const findTreeNodeByKey = findTreeNodeByValue;

export function getTreeAncestors<Option extends TreeOption>(
  node: TreeNormalizedNode<Option>,
  includeSelf = true,
): TreeNormalizedNode<Option>[] {
  const result: TreeNormalizedNode<Option>[] = [];
  let current: TreeNormalizedNode<Option> | null = includeSelf ? node : node.parent;
  while (current) {
    result.push(current);
    current = current.parent;
  }
  return result.reverse();
}
export function isTreeDescendant<Option extends TreeOption>(
  node: TreeNormalizedNode<Option>,
  ancestor: TreeNormalizedNode<Option>,
  includeSelf = true,
): boolean {
  let current: TreeNormalizedNode<Option> | null = includeSelf ? node : node.parent;
  while (current) {
    if (current === ancestor) return true;
    current = current.parent;
  }
  return false;
}
export function findTreeNodeByPath<Option extends TreeOption>(
  roots: readonly TreeNormalizedNode<Option>[],
  path: readonly TreeValue[],
): TreeNormalizedNode<Option> | undefined {
  let siblings = roots;
  let current: TreeNormalizedNode<Option> | undefined;
  for (const value of path) {
    current = siblings.find(node => node.value === value);
    if (!current) return undefined;
    siblings = current.children;
  }
  return current;
}

type UpdateMode = 'replace' | 'append' | 'prepend';
function updateChildren<Option extends TreeOption>(
  options: readonly Option[],
  value: TreeValue | undefined,
  children: readonly Option[],
  mode: UpdateMode,
  fields: Required<TreeFieldMap>,
): [Option[], boolean] {
  if (value === undefined) {
    if (mode === 'replace') return [children.slice() as Option[], true];
    return [mode === 'append' ? [...options, ...children] : [...children, ...options], true] as [
      Option[],
      boolean,
    ];
  }
  let changed = false;
  const result = options.map(option => {
    if (readField(option, fields.value) === value) {
      const old = readField(option, fields.children);
      const existing = Array.isArray(old) ? (old as Option[]) : [];
      const next =
        mode === 'replace'
          ? children.slice()
          : mode === 'append'
            ? [...existing, ...children]
            : [...children, ...existing];
      const clone = { ...option } as Option & Record<string, unknown>;
      writeField(clone, fields.children, next);
      changed = true;
      return clone;
    }
    const old = readField(option, fields.children);
    if (!Array.isArray(old)) return option;
    const [next, childChanged] = updateChildren(old as Option[], value, children, mode, fields);
    if (!childChanged) return option;
    const clone = { ...option } as Option & Record<string, unknown>;
    writeField(clone, fields.children, next);
    changed = true;
    return clone;
  });
  return [result, changed];
}

/** 不可变地替换目标节点的子节点；value 未设置时替换根节点。 @en Immutably replaces target children, or roots when value is omitted. */
export function replaceTreeChildren<Option extends TreeOption>(
  options: readonly Option[],
  value: TreeValue | undefined,
  children: readonly Option[],
  fieldMap: TreeFieldMap = {},
): Option[] {
  return updateChildren(options, value, children, 'replace', {
    ...TREE_DEFAULT_FIELD_MAP,
    ...fieldMap,
  })[0];
}
export function addTreeChildren<Option extends TreeOption>(
  options: readonly Option[],
  value: TreeValue | undefined,
  children: readonly Option[],
  append = true,
  fieldMap: TreeFieldMap = {},
): Option[] {
  return updateChildren(options, value, children, append ? 'append' : 'prepend', {
    ...TREE_DEFAULT_FIELD_MAP,
    ...fieldMap,
  })[0];
}
export function replaceTreeNode<Option extends TreeOption>(
  options: readonly Option[],
  value: TreeValue,
  patch: Partial<Option>,
  fieldMap: TreeFieldMap = {},
): Option[] {
  const fields = { ...TREE_DEFAULT_FIELD_MAP, ...fieldMap };
  let changed = false;
  const visit = (siblings: readonly Option[]): Option[] =>
    siblings.map(option => {
      if (readField(option, fields.value) === value) {
        changed = true;
        return { ...option, ...patch };
      }
      const children = readField(option, fields.children);
      if (!Array.isArray(children)) return option;
      const next = visit(children as Option[]);
      if (!changed || next.every((child, index) => child === children[index])) return option;
      const clone = { ...option } as Option & Record<string, unknown>;
      writeField(clone, fields.children, next);
      return clone;
    });
  return visit(options);
}
export function deleteTreeNode<Option extends TreeOption>(
  options: readonly Option[],
  value?: TreeValue,
  fieldMap: TreeFieldMap = {},
): { data: Option[]; deleted: Option[] } {
  if (value === undefined) return { data: [], deleted: options.slice() };
  const fields = { ...TREE_DEFAULT_FIELD_MAP, ...fieldMap };
  let deleted: Option[] = [];
  const visit = (siblings: readonly Option[]): Option[] => {
    const index = siblings.findIndex(option => readField(option, fields.value) === value);
    if (index >= 0) {
      deleted = [siblings[index]];
      return [...siblings.slice(0, index), ...siblings.slice(index + 1)];
    }
    return siblings.map(option => {
      if (deleted.length) return option;
      const children = readField(option, fields.children);
      if (!Array.isArray(children)) return option;
      const next = visit(children as Option[]);
      if (
        next === children ||
        (next.length === children.length &&
          next.every((child, childIndex) => child === children[childIndex]))
      )
        return option;
      const clone = { ...option } as Option & Record<string, unknown>;
      writeField(clone, fields.children, next);
      return clone;
    });
  };
  return { data: visit(options), deleted };
}

export type TreeMovePosition = 'root' | 'child' | 'after';
export interface TreeMoveOptions {
  fromValue: TreeValue;
  toValue?: TreeValue;
  position: TreeMovePosition;
}
export interface TreeMoveResult<Option extends TreeOption> {
  status: 'moved' | 'missing-source' | 'missing-target' | 'descendant';
  data: Option[];
}
export function moveTreeNode<Option extends TreeOption>(
  options: readonly Option[],
  move: TreeMoveOptions,
  fieldMap: TreeFieldMap = {},
): TreeMoveResult<Option> {
  const normalized = normalizeTree(options, fieldMap);
  const source = normalized.byValue.get(move.fromValue);
  if (!source) return { status: 'missing-source', data: options.slice() };
  const target = move.toValue === undefined ? undefined : normalized.byValue.get(move.toValue);
  if (move.position !== 'root' && !target)
    return { status: 'missing-target', data: options.slice() };
  if (target && isTreeDescendant(target, source))
    return { status: 'descendant', data: options.slice() };
  const removed = deleteTreeNode(options, move.fromValue, fieldMap);
  if (move.position === 'root')
    return {
      status: 'moved',
      data: addTreeChildren(removed.data, undefined, removed.deleted, false, fieldMap),
    };
  if (move.position === 'child')
    return {
      status: 'moved',
      data: addTreeChildren(removed.data, target!.value, removed.deleted, false, fieldMap),
    };
  const parentValue = target!.parent?.value;
  const fields = { ...TREE_DEFAULT_FIELD_MAP, ...fieldMap };
  const parentOptions =
    parentValue === undefined
      ? removed.data
      : (readField(
          normalizeTree(removed.data, fieldMap).byValue.get(parentValue)?.originOption,
          fields.children,
        ) as Option[]);
  const targetIndex = parentOptions.findIndex(
    option => readField(option, fields.value) === target!.value,
  );
  const siblings = [
    ...parentOptions.slice(0, targetIndex + 1),
    ...removed.deleted,
    ...parentOptions.slice(targetIndex + 1),
  ];
  return {
    status: 'moved',
    data: replaceTreeChildren(removed.data, parentValue, siblings, fieldMap),
  };
}

export interface TreeFilterResult<Option extends TreeOption> {
  matches: TreeNormalizedNode<Option>[];
  included: TreeNormalizedNode<Option>[];
  expandValues: TreeValue[];
}
export function filterTree<Option extends TreeOption>(
  tree: TreeNormalizedData<Option>,
  input: string,
  options: {
    method?: TreeFilterMethod<Option>;
    filterToHideChildren?: boolean;
    expand?: boolean;
  } = {},
): TreeFilterResult<Option> {
  const query = input.trim();
  const method =
    options.method ??
    ((value, node) =>
      ((options.filterToHideChildren ?? true) ? node.stringLabel : node.fullPathLabel)
        .toLowerCase()
        .includes(value.toLowerCase()));
  if (!query) return { matches: tree.flat.slice(), included: tree.flat.slice(), expandValues: [] };
  const matches = tree.flat.filter(node => method(query, node));
  const includedSet = new Set<TreeNormalizedNode<Option>>();
  for (const match of matches)
    for (const ancestor of getTreeAncestors(match)) includedSet.add(ancestor);
  return {
    matches,
    included: tree.flat.filter(node => includedSet.has(node)),
    expandValues:
      options.expand === false
        ? []
        : tree.flat.filter(node => includedSet.has(node) && !node.isLeaf).map(node => node.value),
  };
}

export function getVisibleTreeNodes<Option extends TreeOption>(
  flat: readonly TreeNormalizedNode<Option>[],
  expandedValues: ReadonlySet<TreeValue>,
  included?: ReadonlySet<TreeNormalizedNode<Option>>,
): TreeNormalizedNode<Option>[] {
  const visible = new Set<TreeNormalizedNode<Option>>();
  return flat.filter(node => {
    if (included && !included.has(node)) return false;
    const shown =
      node.isRoot ||
      Boolean(node.parent && visible.has(node.parent) && expandedValues.has(node.parent.value));
    if (shown) visible.add(node);
    return shown;
  });
}
