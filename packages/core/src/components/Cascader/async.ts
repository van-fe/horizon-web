import type { CascaderNormalizedOption, CascaderOption } from './contract';

export type CascaderDynamicLoadResult<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> =
  | { status: 'loaded'; option: CascaderNormalizedOption<Option>; children: readonly Option[] }
  | { status: 'deduplicated'; option: CascaderNormalizedOption<Option> }
  | { status: 'stale'; option: CascaderNormalizedOption<Option> }
  | { status: 'rejected'; option: CascaderNormalizedOption<Option>; error: unknown };

export type CascaderDynamicLoader<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> = (
  option: CascaderNormalizedOption<Option>,
) => PromiseLike<readonly Option[]> | readonly Option[];

/** 框架无关的动态子节点加载协调器。 @en Framework-neutral coordinator for loading dynamic child options. */
export class CascaderDynamicLoadController<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> {
  private generation = 0;
  private destroyed = false;
  private readonly pending = new Map<number, Promise<CascaderDynamicLoadResult<Option>>>();

  public get pendingIds(): readonly number[] {
    return [...this.pending.keys()];
  }

  /**
   * 同一节点加载期间去重，并忽略失效代次或销毁后的结果。
   * @en Deduplicates an in-flight node and ignores stale-generation or post-destroy results.
   * @param option 待加载节点。
   * @paramEn option Node to load.
   * @param loader 加载方法。
   * @paramEn loader Loader function.
   */
  public load(
    option: CascaderNormalizedOption<Option>,
    loader: CascaderDynamicLoader<Option>,
  ): Promise<CascaderDynamicLoadResult<Option>> {
    if (this.destroyed) return Promise.resolve({ status: 'stale', option });
    if (this.pending.has(option.id)) {
      return Promise.resolve({ status: 'deduplicated', option });
    }
    const generation = this.generation;
    let resolveRequest!: (result: CascaderDynamicLoadResult<Option>) => void;
    const request = new Promise<CascaderDynamicLoadResult<Option>>(resolve => {
      resolveRequest = resolve;
    });
    this.pending.set(option.id, request);

    const settle = (result: CascaderDynamicLoadResult<Option>): void => {
      resolveRequest(result);
      if (this.pending.get(option.id) === request) this.pending.delete(option.id);
    };
    const resolveResult = (children: readonly Option[]): CascaderDynamicLoadResult<Option> =>
      this.destroyed || generation !== this.generation
        ? { status: 'stale', option }
        : { status: 'loaded', option, children };
    const rejectResult = (error: unknown): CascaderDynamicLoadResult<Option> =>
      this.destroyed || generation !== this.generation
        ? { status: 'stale', option }
        : { status: 'rejected', option, error };

    try {
      const loaded = loader(option);
      void Promise.resolve(loaded).then(
        children => settle(resolveResult(children)),
        error => settle(rejectResult(error)),
      );
    } catch (error) {
      settle(rejectResult(error));
    }
    return request;
  }

  /** 使所有在途结果失效。 @en Invalidates every in-flight result. */
  public invalidate(): void {
    this.generation += 1;
    this.pending.clear();
  }

  /** 销毁协调器并忽略后续结果。 @en Destroys the coordinator and ignores later results. */
  public destroy(): void {
    this.destroyed = true;
    this.invalidate();
  }
}
