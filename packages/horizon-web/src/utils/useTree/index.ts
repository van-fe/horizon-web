import { computed, shallowRef, triggerRef } from 'vue';
import { nanoid } from 'nanoid';
import type { BaseTreeData, BaseTreeWithLevelData, ExtendTreeData } from './types';
import get from 'lodash/get';

const pathsCache = new WeakMap<ExtendTreeData, ExtendTreeData[]>();
const pathCache = new WeakMap<ExtendTreeData, Array<string | number>>();
const labelsCache = new WeakMap<ExtendTreeData, string[]>();
const uuidPathCache = new WeakMap<ExtendTreeData, Array<string | number>>();
const fullPathLabelCache = new WeakMap<ExtendTreeData, string>();

function collectFromSelfToRoot<Data>(
  node: ExtendTreeData,
  transform: (current: ExtendTreeData) => Data,
) {
  const result: Data[] = [];
  let current: ExtendTreeData | null = node;

  while (current) {
    result.push(transform(current));
    current = current.parent;
  }

  result.reverse();
  return result;
}

const lazyPathDescriptors: PropertyDescriptorMap = {
  paths: {
    configurable: true,
    enumerable: true,
    get(this: ExtendTreeData) {
      let result = pathsCache.get(this);

      if (!result) {
        result = collectFromSelfToRoot(this, node => node);
        pathsCache.set(this, result);
      }

      return result;
    },
    set(this: ExtendTreeData, value: ExtendTreeData[]) {
      pathsCache.set(this, value);
    },
  },
  path: {
    configurable: true,
    enumerable: true,
    get(this: ExtendTreeData) {
      let result = pathCache.get(this);

      if (!result) {
        result = collectFromSelfToRoot(this, node => node.value);
        pathCache.set(this, result);
      }

      return result;
    },
    set(this: ExtendTreeData, value: Array<string | number>) {
      pathCache.set(this, value);
    },
  },
  labels: {
    configurable: true,
    enumerable: true,
    get(this: ExtendTreeData) {
      let result = labelsCache.get(this);

      if (!result) {
        result = collectFromSelfToRoot(this, node => node.stringLabel!);
        labelsCache.set(this, result);
      }

      return result;
    },
    set(this: ExtendTreeData, value: string[]) {
      labelsCache.set(this, value);
    },
  },
  uuidPath: {
    configurable: true,
    enumerable: true,
    get(this: ExtendTreeData) {
      // `_uuid` is assigned by `uuidTransform` after the rest of the transformed
      // node has been created. Avoid caching an incomplete path if the callback
      // inspects this property.
      if (this._uuid === undefined) return [];

      let result = uuidPathCache.get(this);

      if (!result) {
        result = collectFromSelfToRoot(this, node => node._uuid);
        uuidPathCache.set(this, result);
      }

      return result;
    },
    set(this: ExtendTreeData, value: Array<string | number>) {
      uuidPathCache.set(this, value);
    },
  },
  fullPathLabel: {
    configurable: true,
    enumerable: true,
    get(this: ExtendTreeData) {
      let result = fullPathLabelCache.get(this);

      if (result === undefined) {
        result = collectFromSelfToRoot(this, node => node.stringLabel!).join(' / ');
        fullPathLabelCache.set(this, result);
      }

      return result;
    },
    set(this: ExtendTreeData, value: string) {
      fullPathLabelCache.set(this, value);
    },
  },
};

const originalFieldMapping: Record<keyof BaseTreeData, keyof BaseTreeData & string> = {
  label: 'label',
  value: 'value',
  stringLabel: 'stringLabel',
  disabled: 'disabled',
  children: 'children',
  isLeaf: 'isLeaf',
  groupLabel: 'groupLabel',
  selectable: 'selectable',
};

export interface TreeCheckboxStatus {
  checked: boolean;
  indeterminate: boolean;
}

export default class Tree<T extends BaseTreeData, F extends ExtendTreeData<T>> {
  public originTreeData: T[] = [];
  public flattenTreeData = shallowRef<F[]>([]);
  public transformedTreeData = shallowRef<F[]>([]);
  public flattenTreeDataMapping = computed(() => {
    const result = new Map<string | number, F>();

    for (const item of this.flattenTreeData.value) {
      result.set(item._uuid, item);
    }

    return result;
  });

  public fieldMapping: Partial<Record<keyof F, keyof F & string>> = {
    ...originalFieldMapping,
  } as Partial<Record<keyof F, keyof F & string>>;
  private readonly uuidTransform?: (option: F, instance: this) => string | number;
  private readonly nodeByUuid = new Map<string | number, F>();
  private readonly nodeByValue = new Map<string | number, F>();

  constructor(
    treeData: T[],
    fieldMapping: Partial<Record<keyof T, keyof T | string>>,
    uuidTransform?: (option: F, instance: Tree<T, F>) => string | number,
    parent: F | null = null,
    level = 0,
  ) {
    this.uuidTransform = uuidTransform;
    this.dealFieldMapping(fieldMapping);
    this.setTreeData(treeData, parent, level);
  }

  public dealFieldMapping(mappingSet: Partial<Record<keyof T, keyof T | string>>) {
    this.fieldMapping = {
      value: mappingSet?.value ?? 'value',
      label: mappingSet?.label ?? 'label',
      stringLabel: mappingSet?.stringLabel ?? 'stringLabel',
      disabled: mappingSet?.disabled ?? 'disabled',
      children: mappingSet?.children ?? 'children',
      isLeaf: mappingSet?.isLeaf ?? 'isLeaf',
      groupLabel: mappingSet?.groupLabel ?? 'groupLabel',
    } as Partial<Record<keyof F, keyof F & string>>;
  }

  public getOptionValue<Data extends object, Key extends keyof Data>(option: Data, key: Key) {
    return get(option, this.fieldMapping[key as keyof F]!) as Data[Key];
  }

  public setTreeData(treeData: T[], parent: F | null = null, level = 0) {
    this.originTreeData = treeData;
    this.initTransformedTreeData();
    this.transformTreeData(parent, level);
  }

  public initTransformedTreeData() {
    this.flattenTreeData.value = [];
    this.transformedTreeData.value = [];
    this.nodeByUuid.clear();
    this.nodeByValue.clear();
  }

  public getInfoByValue(value: string | number) {
    return this.nodeByValue.get(value);
  }

  public getInfoByPath(path: Array<string | number>) {
    if (path.length === 0) return undefined;

    let siblings = this.transformedTreeData.value;
    let current: F | undefined;

    for (const value of path) {
      current = siblings.find(node => node.value === value);

      if (!current) return undefined;
      siblings = current.transformedChildren;
    }

    return current;
  }

  /**
   * Judge whether the current node is checked for checkbox status
   * @param node current node
   * @param checkedNodesUuid already checked nodes' collection
   * @param checkStrictly whether check strictly
   */
  public isNodeCheckedForCheckbox(
    node: F,
    checkedNodesUuid: Array<string | number>,
    checkStrictly: boolean,
  ) {
    const checkedUuidSet = new Set(checkedNodesUuid);
    if (checkedUuidSet.has(node._uuid)) return true;

    // judge the parent and child relationship
    if (!checkStrictly) {
      const stack = [node];

      while (stack.length > 0) {
        const current = stack.pop()!;

        if (current.transformedChildren.length === 0) {
          if (!checkedUuidSet.has(current._uuid)) return false;
        } else {
          for (const child of current.transformedChildren) {
            stack.push(child);
          }
        }
      }

      return true;
    }

    return false;
  }

  /**
   * To check is current node's checkbox should display indeterminate status
   *
   * **ATTENTION**
   * 1. CheckStrictly must always be false, it should judge by your code
   * 2. For performance considerations, you should combine isNodeCheckedForCheckbox result
   * with current function's result to get checkboxes' indeterminate status. Otherwise, this function
   * will call isNodeCheckedForCheckbox and then in your each tree item will call it for twice.
   * @param node current node
   * @param checkedNodesUuid already checked nodes' uuid collection
   */
  public isNodeIndeterminateForCheckbox(node: F, checkedNodesUuid: Array<string | number>) {
    if (checkedNodesUuid.length === 0) return false;

    for (const uuid of checkedNodesUuid) {
      let current: F | null | undefined = this.nodeByUuid.get(uuid);

      while (current) {
        if (current._uuid === node._uuid) return true;
        current = current.parent;
      }
    }

    return false;
  }

  /**
   * Calculate every node's checkbox status in one post-order traversal.
   *
   * This is preferable to calling the per-node helpers while rendering a whole tree,
   * because parent checked and indeterminate states are shared by all consumers.
   */
  public getCheckboxStatus(
    checkedNodesUuid: Iterable<string | number>,
    checkStrictly: boolean,
    isNodeCheckable: (node: F) => boolean = () => true,
  ) {
    const checkedUuidSet = new Set(checkedNodesUuid);
    const result = new Map<string | number, TreeCheckboxStatus>();

    if (checkStrictly) {
      for (const node of this.flattenTreeData.value) {
        result.set(node._uuid, {
          checked: checkedUuidSet.has(node._uuid),
          indeterminate: false,
        });
      }

      return result;
    }

    const hasCheckableLeaf = new Map<string | number, boolean>();
    const stack = this.transformedTreeData.value
      .slice()
      .reverse()
      .map(node => ({ node, visited: false }));

    while (stack.length > 0) {
      const { node, visited } = stack.pop()!;

      if (!visited && node.transformedChildren.length > 0) {
        stack.push({ node, visited: true });

        for (let i = node.transformedChildren.length - 1; i >= 0; i--) {
          stack.push({ node: node.transformedChildren[i], visited: false });
        }

        continue;
      }

      if (node.transformedChildren.length === 0) {
        hasCheckableLeaf.set(node._uuid, isNodeCheckable(node));
        result.set(node._uuid, {
          checked: checkedUuidSet.has(node._uuid),
          indeterminate: false,
        });
        continue;
      }

      const checkableChildren = node.transformedChildren.filter(child =>
        hasCheckableLeaf.get(child._uuid),
      );
      const checked =
        checkedUuidSet.has(node._uuid) ||
        (checkableChildren.length > 0 &&
          checkableChildren.every(child => result.get(child._uuid)?.checked));
      const indeterminate =
        !checked &&
        checkableChildren.some(child => {
          const status = result.get(child._uuid);
          return status?.checked || status?.indeterminate;
        });

      hasCheckableLeaf.set(node._uuid, checkableChildren.length > 0);
      result.set(node._uuid, { checked, indeterminate });
    }

    return result;
  }

  private transformTreeData(parent: F | null = null, level = 0) {
    interface TransformFrame {
      options: T[];
      parent: F | null;
      level: number;
      result: F[];
      position: number;
      index: number;
      prev: F | null;
    }

    const roots: F[] = [];
    const stack: TransformFrame[] = [
      {
        options: this.originTreeData,
        parent,
        level,
        result: roots,
        position: 0,
        index: 0,
        prev: null,
      },
    ];

    while (stack.length > 0) {
      const frame = stack.at(-1)!;

      if (frame.position >= frame.options.length) {
        stack.pop();
        continue;
      }

      const opt = frame.options[frame.position++];
      const label = this.getOptionValue(opt, 'label');
      const value = this.getOptionValue(opt, 'value');
      const disabled = this.getOptionValue(opt, 'disabled');
      const children = this.getOptionValue(opt, 'children') as T[] | undefined;
      const groupLabel = this.getOptionValue(opt, 'groupLabel');
      const optionIsLeaf = this.getOptionValue(opt, 'isLeaf');
      const optionStringLabel = this.getOptionValue(opt, 'stringLabel');
      const stringLabel =
        typeof label === 'function' ? (optionStringLabel! as string) : (label as string);
      const isLeaf = optionIsLeaf ?? (!Array.isArray(children) || children.length === 0);

      const transformOpt = {
        ...opt,
        label,
        value,
        disabled,
        children,
        groupLabel,
        originOption: {
          ...opt,
          label,
          value,
          disabled,
          children,
          groupLabel,
          isLeaf: optionIsLeaf,
          stringLabel: optionStringLabel,
        },
        parent: frame.parent,
        level: frame.level,
        transformedChildren: [] as F[],
        stringLabel,
        isLeaf,
        isRoot: frame.parent === null,
        isGroupLabel: !!groupLabel,
        passingDisabled: frame.parent?.passingDisabled || disabled || false,
        index: frame.index,
        _index: frame.index,
        __context: {
          prev: frame.prev,
          next: null,
        },
      } as unknown as F;

      Object.defineProperties(transformOpt, lazyPathDescriptors);

      transformOpt._uuid = this.uuidTransform ? this.uuidTransform(transformOpt, this) : nanoid();

      if (this.nodeByUuid.has(transformOpt._uuid)) {
        throw new Error(
          `Tree uuidTransform must return a unique value. Received duplicate UUID: ${String(
            transformOpt._uuid,
          )}`,
        );
      }

      this.flattenTreeData.value.push(transformOpt);

      this.nodeByUuid.set(transformOpt._uuid, transformOpt);
      if (!this.nodeByValue.has(transformOpt.value)) {
        this.nodeByValue.set(transformOpt.value, transformOpt);
      }

      if (frame.index > 0) {
        frame.result.at(-1)!.__context.next = transformOpt;
      }

      frame.result.push(transformOpt);
      frame.prev = transformOpt;

      if (!transformOpt.isGroupLabel) {
        frame.index++;
      }

      if (Array.isArray(children) && children.length > 0) {
        stack.push({
          options: children,
          parent: transformOpt,
          level: frame.level + 1,
          result: transformOpt.transformedChildren,
          position: 0,
          index: 0,
          prev: null,
        });
      }
    }

    this.transformedTreeData.value = roots;

    // A custom uuid transform may read the computed mapping while construction
    // is in progress. The array is intentionally mutated in place, so explicitly
    // invalidate shallow-ref dependants once the complete tree is available.
    triggerRef(this.flattenTreeData);
  }

  public getAncestors(node: F, includeSelf = true) {
    const result: F[] = [];
    let current: F | null = includeSelf ? node : node.parent;

    while (current) {
      result.push(current);
      current = current.parent;
    }

    result.reverse();
    return result;
  }

  public isDescendantOf(node: F, ancestor: F, includeSelf = true) {
    let current: F | null = includeSelf ? node : node.parent;

    while (current) {
      if (current === ancestor) return true;
      current = current.parent;
    }

    return false;
  }

  public getBaseTreeDataWithLevel(treeRoot: ExtendTreeData): BaseTreeWithLevelData {
    const childrenKey = this.fieldMapping.children as string;
    const createNode = (node: ExtendTreeData) =>
      ({
        ...node.originOption,
        level: node.level,
        [childrenKey]: [] as BaseTreeWithLevelData[],
      }) as BaseTreeWithLevelData;
    const root = createNode(treeRoot);
    const stack = [{ source: treeRoot, target: root }];

    while (stack.length > 0) {
      const { source, target } = stack.pop()!;
      const targetChildren = target[childrenKey] as BaseTreeWithLevelData[];

      for (const child of source.transformedChildren) {
        const transformedChild = createNode(child);
        targetChildren.push(transformedChild);
        stack.push({ source: child, target: transformedChild });
      }
    }

    return root;
  }

  public getBaseTreeTargetByValue<Data extends BaseTreeData>(
    treeRoots: Data[] | undefined,
    value: string | number,
  ): false | Data {
    if (!Array.isArray(treeRoots)) return false;

    const stack = treeRoots.slice().reverse();

    while (stack.length > 0) {
      const node = stack.pop()!;
      if (this.getOptionValue(node, 'value') === value) return node;

      const children = this.getOptionValue(node, 'children') as Data[] | undefined;
      if (Array.isArray(children)) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }

    return false;
  }

  public setBaseTreeTargetByValue<Data extends BaseTreeData>(
    treeRoots: Data[] | undefined,
    value: string | number,
    data: Partial<Data>,
  ) {
    if (!Array.isArray(treeRoots)) return;

    const stack = treeRoots.slice().reverse();

    while (stack.length > 0) {
      const node = stack.pop()!;

      if (this.getOptionValue(node, 'value') === value) {
        Object.assign(node, data);
      }

      const children = this.getOptionValue(node, 'children') as Data[] | undefined;
      if (Array.isArray(children)) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }
  }

  public deleteNodeByValue<Data extends BaseTreeData>(
    treeRoots: Data[] | undefined,
    value: string | number,
  ): Data[] {
    if (!Array.isArray(treeRoots)) return [];

    const stack: Array<{ siblings: Data[]; index: number }> = [];

    for (let i = treeRoots.length - 1; i >= 0; i--) {
      stack.push({ siblings: treeRoots, index: i });
    }

    while (stack.length > 0) {
      const { siblings, index } = stack.pop()!;
      const node = siblings[index];

      if (this.getOptionValue(node, 'value') === value) {
        return siblings.splice(index, 1);
      }

      const children = this.getOptionValue(node, 'children') as Data[] | undefined;
      if (Array.isArray(children)) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push({ siblings: children, index: i });
        }
      }
    }

    return [];
  }
}
