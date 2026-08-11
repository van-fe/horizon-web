import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CommandPaletteProps } from '../composables/useProps';

export function useCommandPalette(
  props: CommandPaletteProps,
  emit: (event: string, ...args: any[]) => void,
) {
  const query = ref('');
  const activeIndex = ref(0);
  const input = ref<HTMLInputElement>();
  const filtered = computed(() => {
    const needle = query.value.trim().toLocaleLowerCase();
    return props.commands.filter(
      command =>
        !needle ||
        (props.filter
          ? props.filter(needle, command)
          : [command.label, command.description, ...(command.keywords || [])]
              .filter(Boolean)
              .join(' ')
              .toLocaleLowerCase()
              .includes(needle)),
    );
  });
  function setQuery(value: string) {
    query.value = value;
    activeIndex.value = 0;
    emit('search', value);
  }
  function close() {
    emit('update:visible', false);
  }
  async function execute(command = filtered.value[activeIndex.value]) {
    if (!command || command.disabled) return;
    await command.perform?.();
    emit('select', command);
    if (props.closeOnSelect) close();
  }
  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (filtered.value.length)
        activeIndex.value =
          (activeIndex.value + (event.key === 'ArrowDown' ? 1 : -1) + filtered.value.length) %
          filtered.value.length;
    } else if (event.key === 'Enter') {
      event.preventDefault();
      void execute();
    }
  }
  function onGlobalKeydown(event: KeyboardEvent) {
    if (props.hotkey && (event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === 'k') {
      event.preventDefault();
      emit('update:visible', !props.visible);
    }
  }
  onMounted(() => document.addEventListener('keydown', onGlobalKeydown));
  onBeforeUnmount(() => document.removeEventListener('keydown', onGlobalKeydown));
  watch(
    () => props.visible,
    visible => {
      if (visible) {
        query.value = '';
        activeIndex.value = 0;
        void nextTick(() => input.value?.focus());
      }
    },
  );
  return { query, activeIndex, input, filtered, setQuery, close, execute, onKeydown };
}
