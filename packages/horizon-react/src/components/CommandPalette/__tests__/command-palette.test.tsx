import { createElement as h, StrictMode, useRef, useState } from 'react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { CommandPaletteHandle } from '../index';
import { CommandPalette, HorizonWebProvider } from '../../../index';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React CommandPalette', () => {
  it('filters, skips disabled options and exposes the active option to the focused combobox', async () => {
    const onSearch = vi.fn();
    const onSelect = vi.fn();
    await render(
      h(CommandPalette, {
        defaultOpen: true,
        closeOnSelect: false,
        commands: [
          { id: 'disabled', label: 'Disabled', disabled: true },
          { id: 'open', label: 'Open file', description: 'Open a document', shortcut: '⌘O' },
          { id: 'save', label: 'Save file' },
        ],
        onSearch,
        onSelect,
      }),
    );
    const input = document.body.querySelector('[role="combobox"]') as HTMLInputElement;
    await vi.waitFor(() => expect(document.activeElement).toBe(input));
    expect(input.getAttribute('aria-controls')).toBe(
      document.body.querySelector('[role="listbox"]')?.id,
    );
    expect(
      document.getElementById(input.getAttribute('aria-activedescendant') ?? '')?.textContent,
    ).toContain('Open file');
    await dispatch(input, new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(
      document.getElementById(input.getAttribute('aria-activedescendant') ?? '')?.textContent,
    ).toContain('Save file');
    await dispatch(input, new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(
      document.getElementById(input.getAttribute('aria-activedescendant') ?? '')?.textContent,
    ).toContain('Open file');
    await dispatch(input, new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await dispatch(input, new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await dispatch(input, new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'save' }));

    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      setter?.call(input, 'open');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(onSearch).toHaveBeenCalledWith('open');
    expect(document.body.querySelectorAll('[role="option"]')).toHaveLength(1);
    expect(document.body.querySelector('small')?.textContent).toBe('Open a document');
    expect(document.body.querySelector('kbd')?.textContent).toBe('⌘O');
    await dispatch(
      document.body.querySelector('[role="option"]') as HTMLElement,
      new MouseEvent('mouseover', { bubbles: true }),
    );
  });

  it('deduplicates async commands, reports errors and keeps the palette open after rejection', async () => {
    let release!: () => void;
    const perform = vi.fn(() => new Promise<void>(resolve => (release = resolve)));
    const onSelect = vi.fn();
    const onError = vi.fn();
    await render(
      h(CommandPalette, {
        defaultOpen: true,
        commands: [{ id: 'sync', label: 'Synchronize', perform }],
        onError,
        onSelect,
      }),
    );
    const option = document.body.querySelector('[role="option"]') as HTMLButtonElement;
    await act(async () => {
      option.click();
      option.click();
    });
    await vi.waitFor(() => expect(option.getAttribute('aria-busy')).toBe('true'));
    expect(perform).toHaveBeenCalledOnce();
    await act(async () => release());
    await vi.waitFor(() => expect(onSelect).toHaveBeenCalledOnce());
    await vi.waitFor(() => expect(document.body.querySelector('[role="dialog"]')).toBeNull());

    const error = new Error('sync failed');
    await render(
      h(CommandPalette, {
        defaultOpen: true,
        key: 'rejected-command',
        commands: [{ id: 'bad', label: 'Bad command', perform: () => Promise.reject(error) }],
        onError,
      }),
    );
    await click(document.body.querySelector('[role="option"]') as HTMLElement);
    await vi.waitFor(() =>
      expect(onError).toHaveBeenCalledWith(error, expect.objectContaining({ id: 'bad' })),
    );
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();
  });

  it('honors controlled rejection, global hotkey cleanup, custom regions and unique list ids', async () => {
    const onOpenChange = vi.fn();
    const firstRef = { current: null as CommandPaletteHandle | null };
    await render(
      h(
        StrictMode,
        null,
        h(CommandPalette, {
          open: false,
          commands: [{ id: 'a', label: 'Alpha' }],
          onOpenChange,
          ref: firstRef,
        }),
        h(CommandPalette, {
          open: true,
          commands: [],
          renderEmpty: () => h('strong', { 'data-empty': true }, 'No actions'),
        }),
      ),
    );
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true }),
    );
    expect(onOpenChange).toHaveBeenCalledWith(true, 'hotkey');
    expect(document.body.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    firstRef.current?.open();
    expect(onOpenChange).toHaveBeenCalledWith(true, 'imperative');
    expect(document.body.querySelector('[data-empty]')?.textContent).toBe('No actions');

    const ids = Array.from(document.body.querySelectorAll('[role="listbox"]'), node => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    await render(h('div'));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });

  it('supports uncontrolled ref commands and provider labels', async () => {
    function Harness() {
      const ref = useRef<CommandPaletteHandle>(null);
      const [mounted, setMounted] = useState(true);
      const [hasInput, setHasInput] = useState(false);
      return h(
        HorizonWebProvider,
        { commandPaletteLabels: { dialog: 'Actions', placeholder: 'Find action', empty: 'Empty' } },
        h('button', { 'data-open': true, onClick: () => ref.current?.open() }, 'Open'),
        h('button', { 'data-close': true, onClick: () => ref.current?.close() }, 'Close'),
        h(
          'button',
          {
            'data-focus': true,
            onClick: () => {
              ref.current?.focus();
              setHasInput(Boolean(ref.current?.input));
            },
          },
          'Focus',
        ),
        h('output', { 'data-has-input': true }, String(hasInput)),
        mounted ? h(CommandPalette, { commands: [], ref }) : null,
        h('button', { 'data-unmount': true, onClick: () => setMounted(false) }, 'Unmount'),
      );
    }
    await render(h(Harness));
    await click(getContainer().querySelector('[data-open]') as HTMLElement);
    const input = document.body.querySelector('[role="combobox"]') as HTMLInputElement;
    expect(input.placeholder).toBe('Find action');
    expect(document.body.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe(
      'Actions',
    );
    expect(document.body.querySelector('.h-command-palette__empty')?.textContent).toBe('Empty');
    await click(getContainer().querySelector('[data-focus]') as HTMLElement);
    expect(document.activeElement).toBe(input);
    expect(getContainer().querySelector('[data-has-input]')?.textContent).toBe('true');
    await dispatch(document, new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await vi.waitFor(() => expect(document.body.querySelector('[role="dialog"]')).toBeNull());
    await click(getContainer().querySelector('[data-open]') as HTMLElement);
    await click(getContainer().querySelector('[data-close]') as HTMLElement);
    await vi.waitFor(() => expect(document.body.querySelector('[role="dialog"]')).toBeNull());
    await click(getContainer().querySelector('[data-unmount]') as HTMLElement);
  });

  it('supports custom filtering, item rendering, node empty content and persistent selection', async () => {
    const filter = vi.fn((query: string, command: { id: string }) => command.id.startsWith(query));
    const renderCommand = vi.fn(
      (command: { id: string }, context: { active: boolean; pending: boolean }) =>
        h(
          'span',
          { 'data-command': command.id },
          `${command.id}:${context.active}:${context.pending}`,
        ),
    );
    const onSelect = vi.fn();
    await render(
      h(CommandPalette, {
        defaultOpen: true,
        closeOnSelect: false,
        commands: [
          { id: 'alpha', label: 'Alpha' },
          { id: 'beta', label: 'Beta' },
        ],
        emptyText: 'Explicit empty',
        filter,
        placeholder: 'Explicit placeholder',
        renderCommand,
        onSelect,
      }),
    );
    const input = document.body.querySelector('[role="combobox"]') as HTMLInputElement;
    expect(input.placeholder).toBe('Explicit placeholder');
    expect(document.body.querySelector('[data-command="alpha"]')?.textContent).toBe(
      'alpha:true:false',
    );
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      setter?.call(input, 'bet');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(filter).toHaveBeenCalledWith('bet', expect.objectContaining({ id: 'beta' }));
    await click(document.body.querySelector('[role="option"]') as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'beta' }));
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();

    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      setter?.call(input, 'missing');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(document.body.querySelector('.h-command-palette__empty')?.textContent).toBe(
      'Explicit empty',
    );

    await render(
      h(CommandPalette, {
        defaultOpen: true,
        key: 'node-empty',
        commands: [],
        hotkey: false,
        renderEmpty: h('em', { 'data-node-empty': true }, 'Node empty'),
      }),
    );
    expect(document.body.querySelector('[data-node-empty]')?.textContent).toBe('Node empty');
  });

  it('reports outside dismissal and ignores repeated open requests', async () => {
    const onOpenChange = vi.fn();
    const ref = { current: null as CommandPaletteHandle | null };
    await render(
      h(CommandPalette, {
        defaultOpen: true,
        commands: [{ id: 'open', label: 'Open' }],
        onOpenChange,
        ref,
      }),
    );
    ref.current?.open();
    expect(onOpenChange).not.toHaveBeenCalled();
    await dispatch(
      document.body.querySelector('.h-dialog__mask') as HTMLElement,
      new PointerEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        button: 0,
        isPrimary: true,
        pointerId: 1,
      }),
    );
    await vi.waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false, 'outside-pointer'));
  });
});
