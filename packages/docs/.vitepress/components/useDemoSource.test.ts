import { defineComponent, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useDemoSource } from './useDemoSource';

afterEach(() => vi.useRealTimers());

function mountDemoSource() {
  const compile = vi.fn();
  const loadOriginal = vi.fn();
  const source = ref('original');
  const component = defineComponent({
    setup() {
      return { ...useDemoSource({ source, compile, loadOriginal, delay: 250 }), source };
    },
    template: '<div />',
  });
  return { wrapper: mount(component), compile, loadOriginal };
}

describe('useDemoSource', () => {
  it('reloads the original demo when undo restores the initial source', async () => {
    vi.useFakeTimers();
    const { wrapper, compile, loadOriginal } = mountDemoSource();

    wrapper.vm.code = 'edited';
    await nextTick();
    vi.advanceTimersByTime(250);
    expect(compile).toHaveBeenCalledWith('edited');

    wrapper.vm.code = 'original';
    await nextTick();
    expect(loadOriginal).toHaveBeenCalledOnce();
  });

  it('resets edited source and cancels its pending compilation', async () => {
    vi.useFakeTimers();
    const { wrapper, compile, loadOriginal } = mountDemoSource();

    wrapper.vm.code = 'edited';
    await nextTick();
    wrapper.vm.reset();
    await nextTick();
    vi.runAllTimers();

    expect(wrapper.vm.code).toBe('original');
    expect(compile).not.toHaveBeenCalled();
    expect(loadOriginal).toHaveBeenCalledOnce();
  });
});
