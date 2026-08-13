import type { TreeBeforeDrop, TreeNormalizedNode, TreeOption } from './contract';
import type { TreeMoveOptions, TreeMovePosition, TreeMoveResult } from './algorithms';
import { moveTreeNode } from './algorithms';
import type { TreeFieldMap } from './contract';

export interface TreeDropContext<Option extends TreeOption = TreeOption> {
  source: TreeNormalizedNode<Option>;
  target?: TreeNormalizedNode<Option>;
  position: TreeMovePosition;
}
export interface TreeDropHit<Option extends TreeOption = TreeOption> {
  source: TreeNormalizedNode<Option>;
  target?: TreeNormalizedNode<Option>;
  overRoot?: boolean;
  overChildRegion?: boolean;
  dragToLeaf?: boolean;
}
/** 将 renderer 命中区归约为合法的树放置上下文。 @en Reduces renderer hit regions to a valid tree drop context. */
export function resolveTreeDropContext<Option extends TreeOption>(
  hit: TreeDropHit<Option>,
): TreeDropContext<Option> | undefined {
  const context: TreeDropContext<Option> = hit.overRoot
    ? { source: hit.source, position: 'root' }
    : hit.target
      ? {
          source: hit.source,
          target: hit.target,
          position: hit.overChildRegion ? 'child' : 'after',
        }
      : { source: hit.source, position: 'root' };
  return canDropTreeNode(context, hit.dragToLeaf) ? context : undefined;
}
export function resolveTreeDropArguments<Option extends TreeOption>(
  context: TreeDropContext<Option>,
): Parameters<TreeBeforeDrop<Option>> {
  if (context.position === 'root') return [context.source, null, null];
  if (context.position === 'child') return [context.source, context.target ?? null, null];
  return [context.source, context.target?.parent ?? null, context.target ?? null];
}
export function canDropTreeNode<Option extends TreeOption>(
  context: TreeDropContext<Option>,
  dragToLeaf = true,
): boolean {
  if (context.position === 'root') return true;
  if (!context.target || context.target.keyPath.includes(context.source.key)) return false;
  return context.position !== 'child' || dragToLeaf || !context.target.isLeaf;
}
export type TreeDropResult<Option extends TreeOption> =
  | TreeMoveResult<Option>
  | { status: 'vetoed' | 'stale' | 'pending' | 'rejected'; data: Option[]; error?: unknown };

/** 协调异步 beforeDrop，防止重复放置，并验证决议时节点仍然存在。 @en Coordinates async beforeDrop, blocks duplicate drops, and validates nodes again at resolution. */
export class TreeDropController<Option extends TreeOption = TreeOption> {
  private generation = 0;
  private active = false;
  private destroyed = false;
  public get pending(): boolean {
    return this.active;
  }
  public invalidate(): void {
    this.generation += 1;
    this.active = false;
  }
  public destroy(): void {
    this.destroyed = true;
    this.invalidate();
  }
  public async drop(
    data: readonly Option[],
    context: TreeDropContext<Option>,
    options: {
      beforeDrop?: TreeBeforeDrop<Option>;
      fieldMap?: TreeFieldMap;
      dragToLeaf?: boolean;
    } = {},
  ): Promise<TreeDropResult<Option>> {
    if (this.destroyed) return { status: 'stale', data: data.slice() };
    if (this.active) return { status: 'pending', data: data.slice() };
    if (!canDropTreeNode(context, options.dragToLeaf))
      return { status: 'descendant', data: data.slice() };
    this.active = true;
    const generation = this.generation;
    try {
      if (
        options.beforeDrop &&
        (await options.beforeDrop(...resolveTreeDropArguments(context))) === false
      )
        return { status: 'vetoed', data: data.slice() };
      if (this.destroyed || generation !== this.generation)
        return { status: 'stale', data: data.slice() };
      const move: TreeMoveOptions = {
        fromValue: context.source.value,
        toValue: context.target?.value,
        position: context.position,
      };
      return moveTreeNode(data, move, options.fieldMap);
    } catch (error) {
      return { status: 'rejected', data: data.slice(), error };
    } finally {
      if (generation === this.generation) this.active = false;
    }
  }
}
