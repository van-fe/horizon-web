import { computed, nextTick, ref, watch } from 'vue';
import type { MentionOption, MentionsProps } from '../composables/useProps';

export function useMentions(props: MentionsProps, emit: (event: string, ...args: any[]) => void) {
  const textarea = ref<HTMLTextAreaElement>();
  const cursor = ref(0);
  const activeIndex = ref(0);
  const query = ref<{ trigger: string; keyword: string; start: number }>();
  const visible = computed(() => Boolean(query.value));
  const filteredOptions = computed(() => {
    if (!query.value) return [];
    const keyword = query.value.keyword;
    return props.options.filter(option =>
      props.filter
        ? props.filter(keyword, option)
        : (option.label || option.value).toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
    );
  });

  function analyze(value: string, position: number) {
    const head = value.slice(0, position);
    let match: { trigger: string; keyword: string; start: number } | undefined;
    for (const trigger of props.triggers) {
      const index = head.lastIndexOf(trigger);
      if (index >= 0 && !/\s/.test(head.slice(index + trigger.length))) {
        if (!match || index > match.start)
          match = { trigger, keyword: head.slice(index + trigger.length), start: index };
      }
    }
    query.value = match;
    activeIndex.value = 0;
    if (match) emit('search', match.keyword, match.trigger);
  }

  function onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    cursor.value = target.selectionStart;
    emit('update:modelValue', target.value);
    analyze(target.value, cursor.value);
  }

  async function select(option: MentionOption) {
    if (option.disabled || !query.value) return;
    const tail = props.modelValue.slice(cursor.value);
    const value = `${props.modelValue.slice(0, query.value.start)}${query.value.trigger}${option.value}${props.split}${tail}`;
    const position =
      query.value.start + query.value.trigger.length + option.value.length + props.split.length;
    emit('update:modelValue', value);
    emit('select', option, query.value.trigger);
    query.value = undefined;
    await nextTick();
    textarea.value?.focus();
    textarea.value?.setSelectionRange(position, position);
  }

  function onKeydown(event: KeyboardEvent) {
    if (!visible.value) return;
    if (event.key === 'Escape') {
      query.value = undefined;
      return;
    }
    if (!filteredOptions.value.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      activeIndex.value =
        (activeIndex.value + delta + filteredOptions.value.length) % filteredOptions.value.length;
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      void select(filteredOptions.value[activeIndex.value]);
    }
  }

  watch(filteredOptions, list => {
    if (activeIndex.value >= list.length) activeIndex.value = 0;
  });
  return { textarea, visible, filteredOptions, activeIndex, onInput, onKeydown, select };
}
