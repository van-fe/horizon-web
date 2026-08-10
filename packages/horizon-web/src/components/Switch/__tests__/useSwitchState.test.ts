import { reactive, ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useSwitchState } from '../src/composables/useSwitchState';
import type { SwitchEmits } from '../src/composables/useEmits';
import type { SwitchProps } from '../src/composables/useProps';

function createProps(overrides: Partial<SwitchProps> = {}): SwitchProps {
  return reactive({
    disabled: undefined,
    label: '',
    labelPosition: 'top',
    modelValue: false,
    readonly: false,
    status: false,
    statusOffText: '',
    statusOnText: '',
    statusPosition: 'outside',
    ...overrides,
  }) as SwitchProps;
}

describe('useSwitchState', () => {
  it('emits the existing Vue model and Form contracts synchronously', async () => {
    const emit = vi.fn() as HorizonWebSetupContext<SwitchEmits>['emit'];
    const formTrigger = vi.fn();
    const { onChange } = useSwitchState(createProps(), ref(undefined), formTrigger, emit);

    onChange();
    expect(emit).toHaveBeenNthCalledWith(1, 'update:modelValue', true);
    expect(emit).toHaveBeenNthCalledWith(2, 'change', true);

    await Promise.resolve();
    expect(formTrigger).toHaveBeenCalledWith('change');
  });

  it('guards duplicate asynchronous transitions', async () => {
    let finish!: (accepted: boolean) => void;
    const beforeChange = vi.fn(() => new Promise<boolean>(resolve => (finish = resolve)));
    const emit = vi.fn() as HorizonWebSetupContext<SwitchEmits>['emit'];
    const { onChange, pending } = useSwitchState(
      createProps({ beforeChange }),
      undefined,
      undefined,
      emit,
    );

    onChange();
    onChange();
    expect(beforeChange).toHaveBeenCalledOnce();
    expect(pending.value).toBe(true);

    finish(true);
    await vi.waitFor(() => expect(emit).toHaveBeenCalledWith('change', true));
    expect(pending.value).toBe(false);
  });

  it('honors Form disabled state', () => {
    const emit = vi.fn() as HorizonWebSetupContext<SwitchEmits>['emit'];
    const { onChange, state } = useSwitchState(createProps(), ref(true), undefined, emit);

    onChange();
    expect(state.value.interactive).toBe(false);
    expect(emit).not.toHaveBeenCalled();
  });
});
