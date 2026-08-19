import { isCommandPaletteHotkey } from '@aurora/core';

export interface CommandPaletteHotkeyControllerOptions {
  enabled?: boolean;
  onToggle(event: KeyboardEvent): void;
}

export interface CommandPaletteHotkeyController {
  update(enabled: boolean): void;
  destroy(): void;
}

/**
 * 管理 Command/Ctrl+K 全局监听与销毁。
 * @en Manages the global Command/Ctrl+K listener and its cleanup.
 */
export function createCommandPaletteHotkeyController(
  document: Document,
  options: CommandPaletteHotkeyControllerOptions,
): CommandPaletteHotkeyController {
  let enabled = options.enabled ?? true;
  let destroyed = false;
  const onKeydown = (event: KeyboardEvent) => {
    if (!enabled || !isCommandPaletteHotkey(event)) return;
    event.preventDefault();
    options.onToggle(event);
  };
  document.addEventListener('keydown', onKeydown);
  return {
    update(nextEnabled) {
      enabled = nextEnabled;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      document.removeEventListener('keydown', onKeydown);
    },
  };
}
