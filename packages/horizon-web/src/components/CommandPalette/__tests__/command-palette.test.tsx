import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { defineComponent, reactive } from 'vue';
import HCommandPalette from '../src/CommandPalette';
import { useCommandPalette } from '../src/hooks/useCommandPalette';
describe('CommandPalette', () => {
  test('filters and executes through the hook', async () => {
    const perform = vi.fn();
    const emit = vi.fn();
    let state!: ReturnType<typeof useCommandPalette>;
    const host = mount(
      defineComponent({
        setup() {
          state = useCommandPalette(
            reactive({ visible: true, hotkey: false, closeOnSelect: true, commands: [{ id: 'save', label: 'Save', perform }] }) as any,
            emit,
          );
          return () => null;
        },
      }),
    );
    state.setQuery('sav');
    await state.execute();
    expect(perform).toHaveBeenCalledOnce();
    expect(emit).toHaveBeenCalledWith('select', expect.objectContaining({ id: 'save' }));
    host.unmount();
  });

  test('filters and executes a command', async () => {
    const perform = vi.fn();
    const wrapper = mount(HCommandPalette, {
      props: {
        visible: true,
        commands: [
          { id: 'open', label: 'Open file', perform },
          { id: 'save', label: 'Save file' },
        ],
      },
      attachTo: document.body,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    const input = document.body.querySelector('.h-command-palette__input') as HTMLInputElement;
    input.value = 'open';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await wrapper.vm.$nextTick();
    (document.body.querySelector('.h-command-palette__item') as HTMLButtonElement).click();
    await wrapper.vm.$nextTick();
    expect(perform).toHaveBeenCalledOnce();
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ id: 'open' });
    wrapper.unmount();
  });
});
