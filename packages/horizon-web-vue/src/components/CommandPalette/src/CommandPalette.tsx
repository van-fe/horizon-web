import { defineComponent } from 'vue';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import HDialog from '~/components/Dialog/src/Dialog';
import useLocaleLang from '~/utils/useLocaleLang';
import { useCommandPaletteProps } from './composables/useProps';
import { useCommandPaletteEmits } from './composables/useEmits';
import { useCommandPaletteSlots } from './composables/useSlots';
import { useCommandPalette } from './hooks/useCommandPalette';

export default defineComponent({
  name: `${useNamespace()}CommandPalette`,
  desc: '可搜索并通过键盘执行操作的命令面板',
  descLocales: { en: 'A searchable keyboard-first command palette.' },
  props: useCommandPaletteProps,
  emits: useCommandPaletteEmits,
  slots: useCommandPaletteSlots,
  setup(props, { slots, emit }) {
    const c = new ComponentClassBlock('command-palette');
    const state = useCommandPalette(props, emit as any);
    const placeholder = useLocaleLang('commandPalette.placeholder', 'Type a command…');
    const empty = useLocaleLang('commandPalette.empty', 'No commands found');
    return () => (
      <HDialog
        visible={props.visible}
        title=" "
        closeButton={false}
        okButtonProps={false}
        cancelButtonProps={false}
        size="small"
        onUpdate:visible={(value: boolean) => emit('update:visible', value)}
      >
        <div class={c.block} role="combobox" aria-expanded="true" aria-haspopup="listbox">
          <input
            ref={state.input}
            class={c.e('input')}
            value={state.query.value}
            placeholder={props.placeholder || String(placeholder.value)}
            aria-controls="h-command-palette-list"
            onInput={(event: Event) => state.setQuery((event.target as HTMLInputElement).value)}
            onKeydown={state.onKeydown}
          />
          <div id="h-command-palette-list" class={c.e('list')} role="listbox">
            {state.filtered.value.length ? (
              state.filtered.value.map((command, index) => (
                <button
                  type="button"
                  key={command.id}
                  role="option"
                  aria-selected={index === state.activeIndex.value}
                  disabled={command.disabled}
                  class={[c.e('item'), c.is('active', index === state.activeIndex.value)]}
                  onMouseenter={() => (state.activeIndex.value = index)}
                  onClick={() => void state.execute(command)}
                >
                  {slots.command?.({ command, active: index === state.activeIndex.value }) ?? (
                    <>
                      <span>
                        <strong>{command.label}</strong>
                        {command.description && <small>{command.description}</small>}
                      </span>
                      {command.shortcut && <kbd>{command.shortcut}</kbd>}
                    </>
                  )}
                </button>
              ))
            ) : (
              <div class={c.e('empty')}>
                {slots.empty?.() ?? (props.emptyText || String(empty.value))}
              </div>
            )}
          </div>
        </div>
      </HDialog>
    );
  },
});
