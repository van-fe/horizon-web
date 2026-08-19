import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { CommandPaletteController } from '@aurora/core';
import { createCommandPaletteHotkeyController } from '@aurora/horizon-core';
import type { CommandPaletteItem, CommandPaletteProps } from '../composables/useProps';

export function useCommandPalette(
  props: CommandPaletteProps,
  emit: (event: string, ...args: any[]) => void,
) {
  const input = ref<HTMLInputElement>();
  const version = ref(0);
  const controller = new CommandPaletteController<CommandPaletteItem>();
  const refresh = () => (version.value += 1);
  const syncOptions = () => {
    controller.setOptions({
      commands: props.commands,
      filter: props.filter,
      onSearch: query => emit('search', query),
      onSelect: command => emit('select', command),
      onError: (error, command) => emit('error', error, command),
      onPendingChange: refresh,
    });
    refresh();
  };
  syncOptions();
  const snapshot = computed(() => {
    void version.value;
    return controller.snapshot();
  });
  const query = computed(() => snapshot.value.query);
  const activeIndex = computed(() => snapshot.value.activeIndex);
  const filtered = computed(() => snapshot.value.commands);
  const pendingCommand = computed(() => snapshot.value.pendingCommand);

  function setQuery(value: string) {
    controller.setQuery(value);
    refresh();
  }
  function requestVisible(visible: boolean) {
    emit('update:visible', visible);
  }
  async function execute(command = snapshot.value.activeCommand) {
    const result = await controller.execute(command);
    refresh();
    if (result.status === 'completed' && props.closeOnSelect) requestVisible(false);
    return result;
  }
  function setActiveIndex(index: number) {
    controller.setActiveIndex(index);
    refresh();
  }
  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      controller.move(event.key === 'ArrowDown' ? 1 : -1);
      refresh();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      void execute();
    }
  }

  let hotkey: ReturnType<typeof createCommandPaletteHotkeyController> | undefined;
  onMounted(() => {
    hotkey = createCommandPaletteHotkeyController(input.value?.ownerDocument ?? document, {
      enabled: props.hotkey,
      onToggle: () => requestVisible(!props.visible),
    });
  });
  onBeforeUnmount(() => {
    hotkey?.destroy();
    controller.destroy();
  });
  watch(() => [props.commands, props.filter] as const, syncOptions);
  watch(
    () => props.hotkey,
    enabled => hotkey?.update(enabled),
  );
  watch(
    () => props.visible,
    visible => {
      if (!visible) return;
      controller.reset();
      refresh();
      void nextTick(() => input.value?.focus());
    },
    { immediate: true },
  );
  return {
    query,
    activeIndex,
    input,
    filtered,
    pendingCommand,
    setQuery,
    requestVisible,
    execute,
    setActiveIndex,
    onKeydown,
    focus: () => input.value?.focus(),
  };
}
