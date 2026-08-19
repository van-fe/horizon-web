import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { defineComponent, nextTick, reactive } from 'vue';
import HCommandPalette from '..';
import { useCommandPaletteProps } from '../src/composables/useProps';
import { useCommandPalette } from '../src/hooks/useCommandPalette';
describe('CommandPalette', () => {
  test('publishes shared defaults and validators', () => {
    expect((useCommandPaletteProps.commands.default as () => unknown[])()).toEqual([]);
    expect(useCommandPaletteProps.commands.validator?.([{ id: 'open', label: 'Open' }])).toBe(true);
    expect(useCommandPaletteProps.commands.validator?.([{ label: 'Missing id' }])).toBe(false);
    expect(useCommandPaletteProps.filter.validator?.(() => true)).toBe(true);
    expect(useCommandPaletteProps.filter.validator?.('invalid')).toBe(false);
  });
  test('filters and executes through the hook', async () => {
    const perform = vi.fn();
    const emit = vi.fn();
    let state!: ReturnType<typeof useCommandPalette>;
    const host = mount(
      defineComponent({
        setup() {
          state = useCommandPalette(
            reactive({
              visible: true,
              hotkey: false,
              closeOnSelect: true,
              commands: [{ id: 'save', label: 'Save', perform }],
            }) as any,
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

  test('renders placeholder and empty fallbacks while emitting native search input', async () => {
    const onSearch = vi.fn();
    const wrapper = mount(HCommandPalette, {
      props: {
        visible: true,
        commands: [{ id: 'open', label: 'Open file' }],
        placeholder: 'Search actions',
        emptyText: 'Nothing here',
        onSearch,
      },
      attachTo: document.body,
    });
    await nextTick();
    const input = document.body.querySelector('.h-command-palette__input') as HTMLInputElement;
    expect(input.placeholder).toBe('Search actions');
    input.value = 'missing';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();

    expect(onSearch).toHaveBeenCalledWith('missing');
    expect(document.body.querySelector('.h-command-palette__empty')?.textContent).toBe(
      'Nothing here',
    );
    wrapper.unmount();
  });

  test('renders command and empty slots with their public scope', async () => {
    const slotCalls: Array<{ id: string; active: boolean }> = [];
    const wrapper = mount(HCommandPalette, {
      props: { visible: true, commands: [{ id: 'save', label: 'Save' }] },
      slots: {
        command: (scope?: any) => {
          const { command, active } = scope ?? { command: { id: '' }, active: false };
          slotCalls.push({ id: command.id, active });
          return <span class="command-slot">{`${command.id}:${active}`}</span>;
        },
        empty: () => <span class="empty-slot">No custom matches</span>,
      },
      attachTo: document.body,
    });
    await nextTick();
    expect(document.body.querySelector('.command-slot')?.textContent).toBe('save:true');
    expect(slotCalls).toContainEqual({ id: 'save', active: true });

    const input = document.body.querySelector('.h-command-palette__input') as HTMLInputElement;
    input.value = 'missing';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(document.body.querySelector('.empty-slot')?.textContent).toBe('No custom matches');
    wrapper.unmount();
  });

  test('uses custom filtering and keyboard navigation but skips disabled execution', async () => {
    const first = vi.fn();
    const disabled = vi.fn();
    const filter = vi.fn((query: string, command: { id: string }) => command.id.startsWith(query));
    const onSelect = vi.fn();
    const wrapper = mount(HCommandPalette, {
      props: {
        visible: true,
        closeOnSelect: false,
        filter,
        commands: [
          { id: 'alpha', label: 'First', perform: first },
          { id: 'beta', label: 'Second', disabled: true, perform: disabled },
        ],
        onSelect,
      },
      attachTo: document.body,
    });
    await nextTick();
    const input = document.body.querySelector('.h-command-palette__input') as HTMLInputElement;
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await nextTick();
    expect(document.body.querySelectorAll('[role="option"]')[0].getAttribute('aria-selected')).toBe(
      'true',
    );
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await nextTick();
    expect(first).toHaveBeenCalledOnce();
    expect(disabled).not.toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'alpha' }));

    input.value = 'alp';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(filter).toHaveBeenCalledWith('alp', expect.objectContaining({ id: 'alpha' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await nextTick();
    expect(first).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'alpha' }));
    expect(wrapper.emitted('update:visible')).toBeUndefined();
    wrapper.unmount();
  });

  test('global hotkey follows hotkey and visible props', async () => {
    const onUpdate = vi.fn();
    const wrapper = mount(HCommandPalette, {
      props: { visible: false, commands: [], hotkey: true, 'onUpdate:visible': onUpdate },
    });

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }),
    );
    expect(onUpdate).toHaveBeenCalledWith(true);

    await wrapper.setProps({ hotkey: false });
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }),
    );
    expect(onUpdate).toHaveBeenCalledOnce();
  });

  test('renders command metadata and wraps keyboard navigation in both directions', async () => {
    const onSelect = vi.fn();
    const wrapper = mount(HCommandPalette, {
      props: {
        visible: true,
        commands: [
          {
            id: 'open',
            label: 'Open file',
            description: 'Open a local document',
            shortcut: '⌘O',
          },
          { id: 'save', label: 'Save file' },
        ],
        onSelect,
      },
      attachTo: document.body,
    });
    await nextTick();
    const input = document.body.querySelector('.h-command-palette__input') as HTMLInputElement;
    const options = Array.from(
      document.body.querySelectorAll<HTMLButtonElement>('.h-command-palette__item'),
    );
    expect(options[0].querySelector('small')?.textContent).toBe('Open a local document');
    expect(options[0].querySelector('kbd')?.textContent).toBe('⌘O');

    options[1].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await nextTick();
    expect(options[1].getAttribute('aria-selected')).toBe('true');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await nextTick();
    expect(options[0].getAttribute('aria-selected')).toBe('true');

    input.value = 'missing';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(document.body.querySelector('.h-command-palette__empty')?.textContent?.trim()).not.toBe(
      '',
    );
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await nextTick();
    expect(onSelect).not.toHaveBeenCalled();

    await wrapper.setProps({ visible: false });
    await wrapper.setProps({ visible: true });
    await nextTick();
    await nextTick();
    expect(input.value).toBe('');
    expect(document.activeElement).toBe(input);
    wrapper.unmount();
  });

  test('deduplicates pending execution and reports rejection without closing', async () => {
    let release!: () => void;
    const perform = vi.fn(() => new Promise<void>(resolve => (release = resolve)));
    const onSelect = vi.fn();
    const onError = vi.fn();
    const wrapper = mount(HCommandPalette, {
      props: {
        visible: true,
        commands: [{ id: 'sync', label: 'Synchronize', perform }],
        onSelect,
        onError,
      },
      attachTo: document.body,
    });
    await nextTick();
    const option = document.body.querySelector('[role="option"]') as HTMLButtonElement;
    option.click();
    option.click();
    await nextTick();
    expect(perform).toHaveBeenCalledOnce();
    expect(option.getAttribute('aria-busy')).toBe('true');
    release();
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledOnce());
    expect(wrapper.emitted('update:visible')?.at(-1)).toEqual([false]);
    const closeEvents = wrapper.emitted('update:visible')?.length ?? 0;

    const error = new Error('failed');
    await wrapper.setProps({
      visible: true,
      commands: [{ id: 'bad', label: 'Bad command', perform: () => Promise.reject(error) }],
    });
    await nextTick();
    (document.body.querySelector('[role="option"]') as HTMLButtonElement).click();
    await vi.waitFor(() =>
      expect(onError).toHaveBeenCalledWith(error, expect.objectContaining({ id: 'bad' })),
    );
    expect(wrapper.emitted('update:visible')).toHaveLength(closeEvents);
    wrapper.unmount();
  });

  test('exposes open close and focus while keeping ids unique across instances', async () => {
    const firstUpdate = vi.fn();
    const first = mount(HCommandPalette, {
      props: {
        visible: true,
        commands: [{ id: 'one', label: 'One' }],
        'onUpdate:visible': firstUpdate,
      },
      attachTo: document.body,
    });
    const second = mount(HCommandPalette, {
      props: { visible: true, commands: [{ id: 'two', label: 'Two' }] },
      attachTo: document.body,
    });
    await nextTick();
    await nextTick();
    const inputs = Array.from(
      document.body.querySelectorAll<HTMLInputElement>('[role="combobox"]'),
    );
    const lists = Array.from(document.body.querySelectorAll<HTMLElement>('[role="listbox"]'));
    expect(new Set(lists.map(list => list.id)).size).toBe(2);
    expect(
      inputs.every(
        input =>
          input.getAttribute('aria-controls') ===
          input.closest('.h-dialog')?.querySelector('[role="listbox"]')?.id,
      ),
    ).toBe(true);
    expect(inputs[0].getAttribute('aria-activedescendant')).toBe(
      lists[0].querySelector('[role="option"]')?.id,
    );

    second.unmount();
    (first.vm as any).close();
    (first.vm as any).open();
    (first.vm as any).focus();
    expect(firstUpdate.mock.calls).toEqual([[false], [true]]);
    expect(document.activeElement).toBe(inputs[0]);
    first.unmount();
  });
});
