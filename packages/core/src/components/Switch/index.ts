export type SwitchChangeReason =
  | 'toggle'
  | 'disabled'
  | 'readonly'
  | 'pending'
  | 'guard-rejected'
  | 'guard-error';

export type SwitchSize = 'small' | 'medium' | 'large';
export type SwitchLabelPosition = 'top' | 'left' | 'right';
export type SwitchStatusPosition = 'outside' | 'inside';

export interface SwitchCommonProps {
  value?: boolean;
  defaultValue?: boolean;
  beforeChange?: SwitchBeforeChange;
  disabled?: boolean;
  readOnly?: boolean;
  labelPosition?: SwitchLabelPosition;
  status?: boolean;
  statusPosition?: SwitchStatusPosition;
  size?: SwitchSize;
}

export const SWITCH_DEFAULTS = Object.freeze({
  defaultValue: false,
  disabled: false,
  readOnly: false,
  labelPosition: 'top',
  status: false,
  statusPosition: 'outside',
  size: 'medium',
} as const);

export type SwitchBeforeChange =
  | boolean
  | ((nextValue: boolean) => boolean | undefined | PromiseLike<boolean | undefined>);

export interface SwitchStateInput {
  value: boolean;
  disabled?: boolean;
  readonly?: boolean;
  pending?: boolean;
}

export interface SwitchState {
  value: boolean;
  disabled: boolean;
  readonly: boolean;
  pending: boolean;
  interactive: boolean;
}

export type SwitchChangeResult =
  | { accepted: true; value: boolean; reason: 'toggle' }
  | {
      accepted: false;
      value: boolean;
      reason: Exclude<SwitchChangeReason, 'toggle'>;
      error?: unknown;
    };

export type SwitchChangeResolution = SwitchChangeResult | Promise<SwitchChangeResult>;

export function isControlledValue(value: boolean | undefined): value is boolean {
  return value !== undefined;
}

export function resolveControllableValue(
  value: boolean | undefined,
  defaultValue = false,
): boolean {
  return isControlledValue(value) ? value : defaultValue;
}

export function getSwitchState(input: SwitchStateInput): SwitchState {
  const state = {
    value: input.value,
    disabled: input.disabled ?? false,
    readonly: input.readonly ?? false,
    pending: input.pending ?? false,
  };

  return {
    ...state,
    interactive: !state.disabled && !state.readonly && !state.pending,
  };
}

export function resolveSwitchChange(
  input: SwitchStateInput & { beforeChange?: SwitchBeforeChange },
): SwitchChangeResolution {
  const state = getSwitchState(input);
  if (state.disabled) return { accepted: false, value: state.value, reason: 'disabled' };
  if (state.readonly) return { accepted: false, value: state.value, reason: 'readonly' };
  if (state.pending) return { accepted: false, value: state.value, reason: 'pending' };

  const nextValue = !state.value;
  if (input.beforeChange === undefined || input.beforeChange === true) {
    return { accepted: true, value: nextValue, reason: 'toggle' };
  }
  if (input.beforeChange === false) {
    return { accepted: false, value: state.value, reason: 'guard-rejected' };
  }

  try {
    const accepted = input.beforeChange(nextValue);
    if (typeof accepted === 'object' && accepted !== null && 'then' in accepted) {
      return Promise.resolve(accepted)
        .then(result =>
          result === false
            ? { accepted: false as const, value: state.value, reason: 'guard-rejected' as const }
            : { accepted: true as const, value: nextValue, reason: 'toggle' as const },
        )
        .catch(error => ({
          accepted: false as const,
          value: state.value,
          reason: 'guard-error' as const,
          error,
        }));
    }

    return accepted === false
      ? { accepted: false, value: state.value, reason: 'guard-rejected' }
      : { accepted: true, value: nextValue, reason: 'toggle' };
  } catch (error) {
    return { accepted: false, value: state.value, reason: 'guard-error', error };
  }
}
export { switchManifest } from './manifest';
