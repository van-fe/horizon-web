import { reactive } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useButtonAction } from '../src/composables/useButtonAction';
import type { ButtonEmits } from '../src/composables/useEmits';
import type { ButtonProps } from '../src/composables/useProps';

function createProps(overrides: Partial<ButtonProps> = {}): ButtonProps {
  return reactive({
    active: false,
    autofocus: false,
    autoFit: false,
    block: false,
    borderStyle: 'solid',
    disabled: false,
    ghost: false,
    link: false,
    loading: false,
    nativeType: 'button',
    plain: false,
    replace: false,
    round: false,
    tag: 'button',
    target: '_self',
    text: false,
    type: 'primary',
    ...overrides,
  }) as ButtonProps;
}

describe('useButtonAction', () => {
  it('guards duplicate async actions and reports successful completion', async () => {
    let finish!: () => void;
    const action = vi.fn(() => new Promise<void>(resolve => (finish = resolve)));
    const emit = vi.fn() as HorizonWebSetupContext<ButtonEmits>['emit'];
    const props = createProps({ debounceFn: action, debounceType: 'loading' });
    const { onClick, state } = useButtonAction(props, undefined, emit);
    const event = new MouseEvent('click', { cancelable: true });

    onClick(event);
    onClick(event);
    expect(action).toHaveBeenCalledOnce();
    expect(state.value.loading).toBe(true);

    finish();
    await Promise.resolve();
    await Promise.resolve();
    expect(emit).toHaveBeenCalledWith('debounceFinished');
    expect(state.value.loading).toBe(false);
  });

  it('warns for an unavailable router and preserves the click fallback', () => {
    const emit = vi.fn() as HorizonWebSetupContext<ButtonEmits>['emit'];
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const props = createProps({ to: '/settings' });
    const { onClick } = useButtonAction(props, undefined, emit);
    const event = new MouseEvent('click');

    onClick(event);

    expect(warn).toHaveBeenCalledOnce();
    expect(emit).toHaveBeenCalledWith('click', event);
    warn.mockRestore();
  });

  it('reports rejected actions through the renderer event without leaking rejection', async () => {
    const emit = vi.fn() as HorizonWebSetupContext<ButtonEmits>['emit'];
    const error = new Error('failed');
    const props = createProps({ debounceFn: () => Promise.reject(error) });
    const { onClick } = useButtonAction(props, undefined, emit);

    onClick(new MouseEvent('click', { cancelable: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(emit).toHaveBeenCalledWith('debounceError', error);
  });
});
