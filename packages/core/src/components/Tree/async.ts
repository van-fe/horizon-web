import type { TreeNormalizedNode, TreeOption, TreeValue } from './contract';

export type TreeDynamicLoadResult<Option extends TreeOption = TreeOption> =
  | { status: 'loaded'; node: TreeNormalizedNode<Option>; children: readonly Option[] }
  | { status: 'deduplicated'; node: TreeNormalizedNode<Option> }
  | { status: 'stale'; node: TreeNormalizedNode<Option> }
  | { status: 'rejected'; node: TreeNormalizedNode<Option>; error: unknown };
export type TreeNodeLoader<Option extends TreeOption = TreeOption> = (
  node: TreeNormalizedNode<Option>,
) => PromiseLike<readonly Option[]> | readonly Option[];

/** 对同节点请求去重，并使 treeData/loader 代次变化或销毁后的结果失效。 @en Deduplicates per-node loads and invalidates results after data/loader generations or destruction. */
export class TreeDynamicLoadController<Option extends TreeOption = TreeOption> {
  private generation = 0;
  private destroyed = false;
  private pending = new Map<TreeValue, Promise<TreeDynamicLoadResult<Option>>>();
  public get pendingValues(): TreeValue[] {
    return [...this.pending.keys()];
  }
  public isLoading(value: TreeValue): boolean {
    return this.pending.has(value);
  }
  public load(
    node: TreeNormalizedNode<Option>,
    loader: TreeNodeLoader<Option>,
  ): Promise<TreeDynamicLoadResult<Option>> {
    if (this.destroyed) return Promise.resolve({ status: 'stale', node });
    if (this.pending.has(node.value)) return Promise.resolve({ status: 'deduplicated', node });
    const generation = this.generation;
    let resolveRequest!: (value: TreeDynamicLoadResult<Option>) => void;
    const request = new Promise<TreeDynamicLoadResult<Option>>(resolve => {
      resolveRequest = resolve;
    });
    this.pending.set(node.value, request);
    const settle = (result: TreeDynamicLoadResult<Option>) => {
      resolveRequest(result);
      if (this.pending.get(node.value) === request) this.pending.delete(node.value);
    };
    try {
      void Promise.resolve(loader(node)).then(
        children =>
          settle(
            this.destroyed || generation !== this.generation
              ? { status: 'stale', node }
              : { status: 'loaded', node, children },
          ),
        error =>
          settle(
            this.destroyed || generation !== this.generation
              ? { status: 'stale', node }
              : { status: 'rejected', node, error },
          ),
      );
    } catch (error) {
      settle(
        this.destroyed || generation !== this.generation
          ? { status: 'stale', node }
          : { status: 'rejected', node, error },
      );
    }
    return request;
  }
  public invalidateData(): void {
    this.invalidate();
  }
  public invalidateLoader(): void {
    this.invalidate();
  }
  public invalidate(): void {
    this.generation += 1;
    this.pending.clear();
  }
  public destroy(): void {
    this.destroyed = true;
    this.invalidate();
  }
}
