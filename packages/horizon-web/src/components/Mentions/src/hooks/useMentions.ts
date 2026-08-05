import { computed, nextTick, ref, watch } from 'vue';
import type { HMentionsOption, MentionsProps } from '../composables/useProps';

type MentionQuery = {
  trigger: string;
  keyword: string;
  start: number;
};

export function useMentions(props: MentionsProps, emit: (event: string, ...args: any[]) => void) {
  const textarea = ref<HTMLTextAreaElement>();
  const listbox = ref<HTMLElement>();
  const currentValue = ref(props.modelValue);
  const cursor = ref(0);
  const activeIndex = ref(-1);
  const query = ref<MentionQuery>();
  const focused = ref(false);
  const composing = ref(false);

  const visible = computed(
    () => Boolean(query.value) && focused.value && !composing.value && !props.disabled,
  );
  const filteredOptions = computed(() => {
    if (!query.value) return [];
    const keyword = query.value.keyword;
    return props.options.filter(option =>
      props.filter
        ? props.filter(keyword, option)
        : (option.label || option.value).toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
    );
  });

  function firstEnabledIndex(options = filteredOptions.value) {
    return options.findIndex(option => !option.disabled);
  }

  function close() {
    query.value = undefined;
    activeIndex.value = -1;
  }

  function analyze(value: string, position: number) {
    if (composing.value || props.disabled) {
      close();
      return;
    }

    const safePosition = Math.min(Math.max(position, 0), value.length);
    const head = value.slice(0, safePosition);
    let match: MentionQuery | undefined;

    for (const trigger of props.triggers) {
      if (!trigger) continue;
      const index = head.lastIndexOf(trigger);
      if (index < 0) continue;

      const keyword = head.slice(index + trigger.length);
      const containsSplit = Boolean(props.split && keyword.includes(props.split));
      if (/\s/.test(keyword) || containsSplit) continue;

      if (
        !match ||
        index > match.start ||
        (index === match.start && trigger.length > match.trigger.length)
      ) {
        match = { trigger, keyword, start: index };
      }
    }

    const queryChanged =
      match?.trigger !== query.value?.trigger ||
      match?.keyword !== query.value?.keyword ||
      match?.start !== query.value?.start;
    query.value = match;
    activeIndex.value = match ? firstEnabledIndex() : -1;
    if (match && queryChanged) emit('search', match.keyword, match.trigger);
  }

  function syncSelection(target: HTMLTextAreaElement) {
    currentValue.value = target.value;
    cursor.value = target.selectionStart ?? target.value.length;
    if (target.selectionStart !== target.selectionEnd) {
      close();
      return;
    }
    analyze(target.value, cursor.value);
  }

  function onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    focused.value = true;
    currentValue.value = target.value;
    cursor.value = target.selectionStart ?? target.value.length;
    emit('update:modelValue', target.value);
    if (!composing.value) analyze(target.value, cursor.value);
  }

  function onFocus(event: FocusEvent) {
    focused.value = true;
    syncSelection(event.target as HTMLTextAreaElement);
  }

  function onBlur() {
    focused.value = false;
    close();
  }

  function onSelectionChange(event: Event) {
    if (composing.value) return;
    syncSelection(event.target as HTMLTextAreaElement);
  }

  function onKeyup(event: KeyboardEvent) {
    if (composing.value || event.isComposing) return;
    if (
      visible.value &&
      filteredOptions.value.length > 0 &&
      ['ArrowDown', 'ArrowUp'].includes(event.key)
    )
      return;
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))
      return;
    syncSelection(event.target as HTMLTextAreaElement);
  }

  function onCompositionStart() {
    composing.value = true;
    close();
  }

  function onCompositionEnd(event: CompositionEvent) {
    composing.value = false;
    syncSelection(event.target as HTMLTextAreaElement);
  }

  async function select(option: HMentionsOption) {
    if (option.disabled || !query.value) return;

    const sourceValue = textarea.value?.value ?? currentValue.value;
    const sourceCursor = textarea.value?.selectionStart ?? cursor.value;
    const tail = sourceValue.slice(sourceCursor);
    const separator = props.split && tail.startsWith(props.split) ? '' : props.split;
    const value = `${sourceValue.slice(0, query.value.start)}${query.value.trigger}${option.value}${separator}${tail}`;
    const position =
      query.value.start + query.value.trigger.length + option.value.length + separator.length;

    currentValue.value = value;
    cursor.value = position;
    emit('update:modelValue', value);
    emit('select', option, query.value.trigger);
    close();

    await nextTick();
    textarea.value?.focus();
    textarea.value?.setSelectionRange(position, position);
  }

  async function activate(index: number) {
    if (filteredOptions.value[index]?.disabled) return;
    activeIndex.value = index;
    await nextTick();
    const activeOption = listbox.value?.querySelector<HTMLElement>(
      `[data-mention-index="${index}"]`,
    );
    activeOption?.scrollIntoView?.({ block: 'nearest' });
  }

  function moveActive(delta: 1 | -1) {
    const enabledIndexes = filteredOptions.value.flatMap((option, index) =>
      option.disabled ? [] : [index],
    );
    if (!enabledIndexes.length) {
      activeIndex.value = -1;
      return;
    }

    const currentEnabledIndex = enabledIndexes.indexOf(activeIndex.value);
    const nextEnabledIndex =
      currentEnabledIndex < 0
        ? delta > 0
          ? 0
          : enabledIndexes.length - 1
        : (currentEnabledIndex + delta + enabledIndexes.length) % enabledIndexes.length;
    void activate(enabledIndexes[nextEnabledIndex]);
  }

  function onKeydown(event: KeyboardEvent) {
    if (composing.value || event.isComposing) return;
    if (event.key === 'Escape' && visible.value) {
      event.preventDefault();
      close();
      return;
    }
    if (!visible.value || !filteredOptions.value.length) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveActive(event.key === 'ArrowDown' ? 1 : -1);
    } else if ((event.key === 'Enter' || event.key === 'Tab') && activeIndex.value >= 0) {
      event.preventDefault();
      void select(filteredOptions.value[activeIndex.value]);
    }
  }

  watch(
    () => props.modelValue,
    async value => {
      const changedExternally = value !== currentValue.value;
      currentValue.value = value;
      if (!changedExternally) return;

      close();
      await nextTick();
      const target = textarea.value;
      if (target && focused.value) {
        syncSelection(target);
      } else {
        cursor.value = Math.min(cursor.value, value.length);
      }
    },
  );
  watch(
    () => props.disabled,
    disabled => {
      if (disabled) close();
    },
  );
  watch(filteredOptions, options => {
    if (activeIndex.value < 0 || options[activeIndex.value]?.disabled) {
      activeIndex.value = firstEnabledIndex(options);
    } else if (activeIndex.value >= options.length) {
      activeIndex.value = firstEnabledIndex(options);
    }
  });

  return {
    textarea,
    listbox,
    currentValue,
    cursor,
    visible,
    filteredOptions,
    activeIndex,
    onInput,
    onFocus,
    onBlur,
    onSelectionChange,
    onKeydown,
    onKeyup,
    onCompositionStart,
    onCompositionEnd,
    activate,
    select,
  };
}
