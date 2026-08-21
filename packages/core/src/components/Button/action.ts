import type { ButtonAsyncState } from './contract';

export type ButtonActionKind = 'blocked' | 'href' | 'route' | 'async' | 'press';

export interface ButtonActionInput {
  disabled?: boolean;
  loading?: boolean;
  pending?: boolean;
  href?: string;
  route?: unknown;
  canNavigateRoute?: boolean;
  hasAsyncAction?: boolean;
}

export interface ButtonStateInput {
  disabled?: boolean;
  loading?: boolean;
  pending?: boolean;
  asyncState?: ButtonAsyncState;
}

export interface ButtonState {
  disabled: boolean;
  loading: boolean;
  pending: boolean;
  interactive: boolean;
}

export interface ButtonActionState {
  pending: boolean;
}

export type ButtonAsyncResult =
  | { status: 'completed' }
  | { status: 'ignored' }
  | { status: 'rejected'; error: unknown }
  | { status: 'stale' };

export interface ButtonActionController {
  /** 返回当前异步动作状态。 @en Returns the current asynchronous action state. */
  getState(): Readonly<ButtonActionState>;
  /** 订阅动作状态变化。 @en Subscribes to action-state changes. */
  subscribe(listener: () => void): () => void;
  /** 执行一次受防重入保护的动作。 @en Runs one action protected against re-entry. */
  run(action: () => unknown | PromiseLike<unknown>): Promise<ButtonAsyncResult>;
  /** 重新激活已销毁的控制器。 @en Reactivates a destroyed controller for lifecycle replay. */
  activate(): void;
  /** 使进行中的结果失效并释放订阅。 @en Invalidates pending results and releases subscriptions. */
  destroy(): void;
}

export function resolveButtonAction(input: ButtonActionInput): ButtonActionKind {
  if (input.disabled || input.loading || input.pending) return 'blocked';
  if (input.href) return 'href';
  if (input.route !== undefined && input.canNavigateRoute) return 'route';
  if (input.hasAsyncAction) return 'async';
  return 'press';
}

export function getButtonState(input: ButtonStateInput): ButtonState {
  const pending = input.pending ?? false;
  const disabled = Boolean(input.disabled || (pending && input.asyncState === 'disabled'));
  const loading = Boolean(input.loading || (pending && input.asyncState === 'loading'));

  return {
    disabled,
    loading,
    pending,
    interactive: !disabled && !loading && !pending,
  };
}

/**
 * 创建框架无关的按钮异步动作控制器。
 * @en Creates a framework-free controller for guarded button actions.
 */
export function createButtonAction(): ButtonActionController {
  let active = true;
  let generation = 0;
  let pending = false;
  const listeners = new Set<() => void>();

  const notify = () => listeners.forEach(listener => listener());

  return {
    getState: () => ({ pending }),
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    async run(action) {
      if (!active || pending) return { status: 'ignored' };

      const requestGeneration = generation;
      pending = true;
      notify();

      try {
        await action();
        if (!active || requestGeneration !== generation) return { status: 'stale' };
        return { status: 'completed' };
      } catch (error) {
        if (!active || requestGeneration !== generation) return { status: 'stale' };
        return { status: 'rejected', error };
      } finally {
        if (active && requestGeneration === generation) {
          pending = false;
          notify();
        }
      }
    },
    activate() {
      if (active) return;
      active = true;
      pending = false;
      generation += 1;
      notify();
    },
    destroy() {
      if (!active) return;
      active = false;
      pending = false;
      generation += 1;
      listeners.clear();
    },
  };
}
