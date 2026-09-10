import { computed, ref, watch, type Ref } from 'vue';
import type { TagProps } from './useProps';

interface UseTagEditingOptions {
  uid: string;
  props: TagProps;
  contentRef: Ref<HTMLElement | null>;
  getParentEditable: () => boolean | undefined;
  isDisabled: () => boolean;
  onEditingNotice?: (uid: string, status: boolean) => void;
  onEditNotice?: (newValue: string, oldValue: string, id: TagProps['id']) => Promise<void>;
}

/** Owns the Vue editing draft and the child wait-state around TagGroup confirmation. */
export function useTagEditing(options: UseTagEditingOptions) {
  const isEditing = ref(false);
  const isWaitingForConfirm = ref(false);
  const inputValue = ref('');
  const inputPreValue = ref('');
  const isEditable = computed(() => options.getParentEditable() ?? options.props.editable);

  watch(isEditing, status => {
    options.onEditingNotice?.(options.uid, status);
  });

  function edit(presetContent?: string) {
    inputValue.value = presetContent ?? options.contentRef.value?.innerText ?? '';
    inputPreValue.value = inputValue.value;
    isEditing.value = true;
  }

  function onDoubleClick() {
    if (options.isDisabled() || isEditing.value || isWaitingForConfirm.value) return;
    if (isEditable.value) edit();
  }

  function onBlur() {
    if (isWaitingForConfirm.value) return;
    isEditing.value = false;

    const nextValue = inputValue.value.trim();
    if (!nextValue || inputValue.value === inputPreValue.value || !options.onEditNotice) return;

    isWaitingForConfirm.value = true;
    options
      .onEditNotice(nextValue, inputPreValue.value.trim(), options.props.id)
      .catch(() => undefined)
      .finally(() => {
        isWaitingForConfirm.value = false;
      });
  }

  return {
    edit,
    inputValue,
    isEditing,
    isWaitingForConfirm,
    onBlur,
    onDoubleClick,
  };
}
