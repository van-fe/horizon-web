import type { TagGuardResult, TagId } from './contract';

export type TagMutationState = Readonly<{
  pending: boolean;
  revision: number;
}>;

export type TagMutationResult =
  | { status: 'accepted' }
  | { status: 'rejected'; error?: unknown }
  | { status: 'ignored' }
  | { status: 'destroyed' };

export interface TagMutationControllerOptions {
  beforeCreate?: (content: string) => TagGuardResult;
  beforeEdit?: (content: string, oldValue: string, id?: TagId) => TagGuardResult;
  beforeClose?: (id?: TagId) => TagGuardResult;
}

export interface TagMutationController {
  getState(): TagMutationState;
  subscribe(listener: () => void): () => void;
  update(options: TagMutationControllerOptions): void;
  create(content: string): Promise<TagMutationResult>;
  edit(content: string, oldValue: string, id?: TagId): Promise<TagMutationResult>;
  close(id?: TagId): Promise<TagMutationResult>;
  destroy(): void;
}

/** Owns TagGroup mutation guards, duplicate suppression and stale-result cleanup. */
export function createTagMutationController(
  initialOptions: TagMutationControllerOptions = {},
): TagMutationController {
  let options = initialOptions;
  let state: TagMutationState = Object.freeze({ pending: false, revision: 0 });
  let destroyed = false;
  let generation = 0;
  const listeners = new Set<() => void>();

  const publish = (pending: boolean) => {
    state = Object.freeze({ pending, revision: state.revision + 1 });
    listeners.forEach(listener => listener());
  };
  const run = async (guard: (() => TagGuardResult) | undefined): Promise<TagMutationResult> => {
    if (destroyed) return { status: 'destroyed' };
    if (state.pending) return { status: 'ignored' };
    if (!guard) return { status: 'accepted' };
    const currentGeneration = ++generation;
    publish(true);
    try {
      const result = await guard();
      if (destroyed || currentGeneration !== generation) return { status: 'destroyed' };
      return result === false ? { status: 'rejected' } : { status: 'accepted' };
    } catch (error) {
      if (destroyed || currentGeneration !== generation) return { status: 'destroyed' };
      return { status: 'rejected', error };
    } finally {
      if (!destroyed && currentGeneration === generation) publish(false);
    }
  };

  return {
    getState: () => state,
    subscribe(listener) {
      if (destroyed) return () => undefined;
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update(nextOptions) {
      options = nextOptions;
    },
    create(content) {
      return run(options.beforeCreate ? () => options.beforeCreate?.(content) : undefined);
    },
    edit(content, oldValue, id) {
      return run(
        options.beforeEdit ? () => options.beforeEdit?.(content, oldValue, id) : undefined,
      );
    },
    close(id) {
      return run(options.beforeClose ? () => options.beforeClose?.(id) : undefined);
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      generation += 1;
      listeners.clear();
    },
  };
}
