import { computed, shallowRef } from 'vue';
import { nanoid } from 'nanoid';
import type { BaseTreeData, BaseTreeWithLevelData, ExtendTreeData } from './types';

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

export default class Tree<T extends BaseTreeData, F extends ExtendTreeData<T>> {
  public originTreeData: T[] = [];
  public flattenTreeData = shallowRef<F[]>([]);
  public transformedTreeData = shallowRef<F[]>([]);
  public flattenTreeDataMapping = computed(
    () => new Map<string | number, F>(this.flattenTreeData.value.map(item => [item._uuid, item])),
  );

  public fieldMapping: Partial<Record<keyof F, keyof F & string>> = {
    ...originalFieldMapping,
  } as Partial<Record<keyof F, keyof F & string>>;
  private readonly uuidTransform?: (option: F, instance: this) => string | number;

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

  public getOptionValue<Data extends object, Key extends keyof Data>(
    option: Data,
    key: Key,
  ): Data[Key] {
    return option[this.fieldMapping[key] as unknown as Key] as Data[Key];
  }

  public setTreeData(treeData: T[], parent: F | null = null, level = 0) {
    this.originTreeData = treeData;
    this.initTransformedTreeData();
    this.transformTreeData(parent, level);
  }

  public initTransformedTreeData() {
    this.flattenTreeData.value = [];
    this.transformedTreeData.value = [];
  }

  public getInfoByValue(value: string | number) {
    return this.flattenTreeData.value.find(curr => curr.value === value);
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
    if (checkedNodesUuid.some(uuid => uuid === node._uuid)) return true;

    // judge the parent and child relationship
    if (!checkStrictly) {
      function recursionAction(curr: F) {
        if (curr.transformedChildren.length === 0)
          return checkedNodesUuid.some(uuid => uuid === curr._uuid);

        let count = 0;

        for (const item of curr.transformedChildren) {
          if (recursionAction(item)) {
            count++;
          }
        }

        return curr.transformedChildren.length === count;
      }

      return recursionAction(node);
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
      const curr = this.flattenTreeData.value.find(item => item._uuid === uuid);
      if (curr?.paths.some(item => item._uuid === node._uuid)) {
        return true;
      }
    }

    return false;
  }

  private transformTreeData(parent: F | null = null, level = 0) {
    const action = (options: T[], parent: F | null, level: number) => {
      const res: F[] = [];

      let index = 0;
      let prev: F | null = null;

      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        const path = (parent?.path ?? []).concat(this.getOptionValue(opt, 'value'));
        const stringLabel =
          typeof this.getOptionValue(opt, 'label') === 'function'
            ? (this.getOptionValue(opt, 'stringLabel')! as string)
            : (this.getOptionValue(opt, 'label') as string);
        const labels = (parent?.labels ?? []).concat(stringLabel);

        const children = this.getOptionValue(opt, 'children') as T[];

        const isLeaf =
          this.getOptionValue(opt, 'isLeaf') ?? (!Array.isArray(children) || children.length === 0);

        const transformOpt = {
          ...opt,
          label: this.getOptionValue(opt, 'label'),
          value: this.getOptionValue(opt, 'value'),
          disabled: this.getOptionValue(opt, 'disabled'),
          children: this.getOptionValue(opt, 'children'),
          groupLabel: this.getOptionValue(opt, 'groupLabel'),
          originOption: {
            ...opt,
            label: this.getOptionValue(opt, 'label'),
            value: this.getOptionValue(opt, 'value'),
            disabled: this.getOptionValue(opt, 'disabled'),
            children: this.getOptionValue(opt, 'children'),
            groupLabel: this.getOptionValue(opt, 'groupLabel'),
            isLeaf: this.getOptionValue(opt, 'isLeaf'),
            stringLabel: this.getOptionValue(opt, 'stringLabel'),
          },
          paths: [] as F[],
          labels,
          stringLabel,
          path,
          uuidPath: [] as string[],
          parent,
          level,
          transformedChildren: [] as F[],
          isLeaf,
          isRoot: parent === null,
          isGroupLabel: !!this.getOptionValue(opt, 'groupLabel'),
          passingDisabled: parent?.passingDisabled || this.getOptionValue(opt, 'disabled') || false,
          index,
          _index: index,
          __context: {
            prev,
            next: null,
          },
        } as unknown as F;

        transformOpt._uuid = this.uuidTransform ? this.uuidTransform(transformOpt, this) : nanoid();
        transformOpt.uuidPath = (parent?.uuidPath ?? []).concat(transformOpt._uuid);
        transformOpt.paths = [...(parent?.paths || []), transformOpt];
        transformOpt.fullPathLabel = transformOpt.paths.map(node => node.stringLabel!).join(' / ');

        this.flattenTreeData.value.push(transformOpt);

        if (children && Array.isArray(children)) {
          transformOpt.transformedChildren = action(children, transformOpt, level + 1);
        }

        index > 0 && (res.at(-1)!.__context.next = transformOpt);

        res.push(transformOpt);

        prev = transformOpt;

        if (!transformOpt.isGroupLabel) {
          index++;
        }
      }

      return res;
    };

    this.transformedTreeData.value = action(this.originTreeData, parent, level);
  }

  public getBaseTreeDataWithLevel(treeRoot: ExtendTreeData): BaseTreeWithLevelData {
    const childrenKey = this.fieldMapping.children as string;

    const res = {
      ...treeRoot.originOption,
      level: treeRoot.level,
      [childrenKey]: [] as BaseTreeWithLevelData[],
    };

    for (const node of this.getOptionValue(treeRoot, 'transformedChildren') ?? []) {
      (res[childrenKey as keyof typeof res]! as BaseTreeWithLevelData[]).push(
        this.getBaseTreeDataWithLevel(node),
      );
    }

    return res;
  }

  public getBaseTreeTargetByValue<T extends BaseTreeData>(
    treeRoots: T[] | undefined,
    value: string | number,
  ): false | T {
    if (Array.isArray(treeRoots)) {
      for (const node of treeRoots) {
        if (this.getOptionValue(node, 'value') === value) return node;

        const res = this.getBaseTreeTargetByValue<T>(
          this.getOptionValue(node, 'children') as T[] | undefined,
          value,
        );

        if (res) {
          return res;
        }
      }
    }

    return false;
  }

  public setBaseTreeTargetByValue<T extends BaseTreeData>(
    treeRoots: T[] | undefined,
    value: string | number,
    data: Partial<T>,
  ) {
    if (Array.isArray(treeRoots)) {
      for (const node of treeRoots) {
        if (this.getOptionValue(node, 'value') === value) {
          Object.assign(node, data);
        }

        this.setBaseTreeTargetByValue(this.getOptionValue(node, 'children'), value, data);
      }
    }
  }

  public deleteNodeByValue<T extends BaseTreeData>(
    treeRoots: T[] | undefined,
    value: string | number,
  ): T[] {
    if (Array.isArray(treeRoots)) {
      for (let i = 0; i < treeRoots.length; i++) {
        if (this.getOptionValue(treeRoots[i], 'value') === value) {
          return treeRoots.splice(i, 1);
        }

        const res = this.deleteNodeByValue(this.getOptionValue(treeRoots[i], 'children'), value);
        if (res.length) {
          return res as T[];
        }
      }
    }

    return [];
  }
}
