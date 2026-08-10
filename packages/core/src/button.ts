export type ButtonAsyncState = 'disabled' | 'loading' | 'none';

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

export type ButtonAsyncResult =
  | { status: 'completed' }
  | { status: 'ignored' }
  | { status: 'rejected'; error: unknown };

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

export class ButtonAsyncActionGuard {
  private running = false;

  public get pending(): boolean {
    return this.running;
  }

  public async run(action: () => unknown | PromiseLike<unknown>): Promise<ButtonAsyncResult> {
    if (this.running) return { status: 'ignored' };

    this.running = true;
    try {
      await action();
      return { status: 'completed' };
    } catch (error) {
      return { status: 'rejected', error };
    } finally {
      this.running = false;
    }
  }
}
