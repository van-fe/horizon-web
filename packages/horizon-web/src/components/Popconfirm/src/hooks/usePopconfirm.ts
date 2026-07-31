import { computed, ref, watch } from 'vue';
import type { PopconfirmProps } from '../composables/useProps';

export function usePopconfirm(
  props: PopconfirmProps,
  emit: (event: string, ...args: any[]) => void,
) {
  const uncontrolledVisible = ref(false);
  const loading = ref(false);
  const isControlled = computed(() => props.visible !== undefined);
  const visible = computed(() =>
    isControlled.value ? Boolean(props.visible) : uncontrolledVisible.value,
  );

  function setVisible(value: boolean) {
    if (props.disabled && value) return;
    if (!isControlled.value) uncontrolledVisible.value = value;
    emit('update:visible', value);
  }

  async function confirm(event: MouseEvent) {
    if (loading.value) return;
    loading.value = true;
    try {
      if ((await props.beforeConfirm?.()) === false) return;
      emit('confirm', event);
      setVisible(false);
    } finally {
      loading.value = false;
    }
  }

  function cancel(event: MouseEvent) {
    emit('cancel', event);
    setVisible(false);
  }

  watch(
    () => props.disabled,
    disabled => disabled && setVisible(false),
  );
  return { visible, loading, setVisible, confirm, cancel };
}
