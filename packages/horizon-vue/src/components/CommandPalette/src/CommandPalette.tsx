import { defineComponent } from 'vue';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import HDialog from '~/components/Dialog/src/Dialog';
import useLocaleLang from '~/utils/useLocaleLang';
import { useCommandPaletteProps } from './composables/useProps';
import { useCommandPaletteEmits } from './composables/useEmits';
import { useCommandPaletteSlots } from './composables/useSlots';
import { useCommandPaletteExposes } from './composables/useExposes';
import { useCommandPalette } from './hooks/useCommandPalette';

let nextCommandPaletteId = 0;

export default defineComponent({
  name: `${useNamespace()}CommandPalette`,
  desc: '可搜索并通过键盘执行操作的命令面板',
  descLocales: { en: 'A searchable keyboard-first command palette.' },
  props: useCommandPaletteProps,
  emits: useCommandPaletteEmits,
  slots: useCommandPaletteSlots,
  exposes: useCommandPaletteExposes,
  setup(props, { slots, emit, expose }) {
    const c = new ComponentClassBlock('command-palette');
    const state = useCommandPalette(props, emit as any);
    const listId = `h-command-palette-${++nextCommandPaletteId}-list`;
    const placeholder = useLocaleLang('commandPalette.placeholder', 'Type a command…');
    const empty = useLocaleLang('commandPalette.empty', 'No commands found');
    expose({
      open: () => state.requestVisible(true),
      close: () => state.requestVisible(false),
      focus: state.focus,
    });
    return () => (
      <HDialog
        visible={props.visible}
        ariaLabel={String(placeholder.value)}
        title=""
        closeButton={false}
        okButtonProps={false}
        cancelButtonProps={false}
        size="small"
        onUpdate:visible={(value: boolean) => state.requestVisible(value)}
      >
        <div class={c.block}>
          <input
            ref={state.input}
            class={c.e('input')}
            value={state.query.value}
            placeholder={props.placeholder || String(placeholder.value)}
            aria-activedescendant={
              state.activeIndex.value >= 0
                ? `${listId}-option-${state.activeIndex.value}`
                : undefined
            }
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded="true"
            aria-haspopup="listbox"
            role="combobox"
            onInput={(event: Event) => state.setQuery((event.target as HTMLInputElement).value)}
            onKeydown={state.onKeydown}
          />
          <div id={listId} class={c.e('list')} role="listbox">
            {state.filtered.value.length ? (
              state.filtered.value.map((command, index) => (
                <button
                  type="button"
                  key={command.id}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={index === state.activeIndex.value}
                  disabled={command.disabled}
                  aria-busy={state.pendingCommand.value?.id === command.id || undefined}
                  class={[c.e('item'), c.is('active', index === state.activeIndex.value)]}
                  onMouseenter={() => state.setActiveIndex(index)}
                  onClick={() => void state.execute(command)}
                >
                  {slots.command?.({
                    command,
                    active: index === state.activeIndex.value,
                    pending: state.pendingCommand.value?.id === command.id,
                  }) ?? (
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
