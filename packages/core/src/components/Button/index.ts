export type ButtonAsyncState = 'disabled' | 'loading' | 'none';
export type ButtonVariant = 'primary' | 'normal' | 'danger';
export type ButtonSize = 'huge' | 'large' | 'medium' | 'small';
export type ButtonBorderStyle = 'solid' | 'dashed' | 'dotted';
export type ButtonTarget = '_blank' | '_self' | '_parent' | '_top';

export interface ButtonCommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  round?: boolean;
  plain?: boolean;
  ghost?: boolean;
  text?: boolean;
  link?: boolean;
  block?: boolean;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  autoFit?: boolean;
  borderStyle?: ButtonBorderStyle;
  href?: string;
  target?: ButtonTarget;
  replace?: boolean;
  asyncState?: ButtonAsyncState;
}

export const BUTTON_DEFAULTS = Object.freeze({
  variant: 'primary',
  size: 'medium',
  round: false,
  plain: false,
  ghost: false,
  text: false,
  link: false,
  block: false,
  active: false,
  loading: false,
  disabled: false,
  autoFit: false,
  borderStyle: 'solid',
  target: '_self',
  replace: false,
  asyncState: 'none',
} as const satisfies Required<Omit<ButtonCommonProps, 'href'>>);

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
export { buttonManifest } from './manifest';
