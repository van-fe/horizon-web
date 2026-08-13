import { describe, expect, it, vi } from 'vitest';
import { CommandPaletteController, filterCommandPaletteCommands, isCommandPaletteHotkey } from '..';

const commands = [
  { id: 'disabled', label: 'Disabled', disabled: true },
  { id: 'open', label: 'Open file', keywords: ['document'] },
  { id: 'save', label: 'Save file' },
];

describe('CommandPalette Core', () => {
  it('filters without mutating input and detects the exact hotkey', () => {
    expect(filterCommandPaletteCommands(commands, 'DOCUMENT').map(command => command.id)).toEqual([
      'open',
    ]);
    expect(commands).toHaveLength(3);
    expect(isCommandPaletteHotkey({ key: 'K', metaKey: true })).toBe(true);
    expect(isCommandPaletteHotkey({ key: 'k', ctrlKey: true, repeat: true })).toBe(false);
    expect(isCommandPaletteHotkey({ key: 'k', ctrlKey: true, shiftKey: true })).toBe(false);
  });

  it('skips disabled commands, resets search and preserves enabled active ids', () => {
    const onSearch = vi.fn();
    const controller = new CommandPaletteController({ commands, onSearch });
    expect(controller.snapshot().activeCommand?.id).toBe('open');
    expect(controller.move(1).activeCommand?.id).toBe('save');
    expect(controller.move(1).activeCommand?.id).toBe('open');
    controller.setActiveIndex(0);
    expect(controller.snapshot().activeCommand?.id).toBe('open');
    expect(controller.setQuery('save').activeCommand?.id).toBe('save');
    expect(onSearch).toHaveBeenCalledWith('save');
    expect(controller.reset().query).toBe('');
  });

  it('deduplicates async execution and reports success and rejection', async () => {
    let release!: () => void;
    const onSelect = vi.fn();
    const onError = vi.fn();
    const pending = {
      id: 'pending',
      label: 'Pending',
      perform: () => new Promise<void>(resolve => (release = resolve)),
    };
    const controller = new CommandPaletteController({ commands: [pending], onSelect, onError });
    const first = controller.execute();
    await expect(controller.execute()).resolves.toEqual({ status: 'ignored' });
    release();
    await expect(first).resolves.toEqual({ status: 'completed' });
    expect(onSelect).toHaveBeenCalledWith(pending);

    const error = new Error('failed');
    controller.setOptions({
      commands: [{ id: 'bad', label: 'Bad', perform: () => Promise.reject(error) }],
      onError,
    });
    await expect(controller.execute()).resolves.toEqual({ status: 'rejected', error });
    expect(onError).toHaveBeenCalledWith(error, expect.objectContaining({ id: 'bad' }));
    controller.destroy();
    await expect(controller.execute()).resolves.toEqual({ status: 'ignored' });
  });
});
