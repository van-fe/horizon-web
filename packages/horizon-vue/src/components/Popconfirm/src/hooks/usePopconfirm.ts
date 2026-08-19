import type { PopconfirmOpenReason } from '@aurora/core';
import { PopconfirmController } from '@aurora/core';
import { computed, getCurrentInstance, onBeforeUnmount, ref, watch } from 'vue';
import type { PopconfirmProps } from '../composables/useProps';

interface PopconfirmEmit {
  (event: 'update:visible', value: boolean): void;
  (event: 'confirm', value: MouseEvent): void;
  (event: 'cancel', value: MouseEvent): void;
}

export function usePopconfirm(props: PopconfirmProps, emit: PopconfirmEmit) {
  const uncontrolledVisible = ref(false);
  const loading = ref(false);
  const isControlled = computed(() => props.visible !== undefined);
  const visible = computed(() =>
    isControlled.value ? Boolean(props.visible) : uncontrolledVisible.value,
  );
  const controller = new PopconfirmController<MouseEvent>({
    open: props.visible,
    disabled: props.disabled,
    beforeConfirm: props.beforeConfirm,
    onOpenChange(value) {
      if (!isControlled.value) uncontrolledVisible.value = value;
      emit('update:visible', value);
    },
    onPendingChange(value) {
      loading.value = value;
    },
    onConfirm(event) {
      emit('confirm', event);
    },
    onCancel(event) {
      emit('cancel', event);
    },
  });

  function syncController() {
    controller.setOptions({
      open: props.visible,
      disabled: props.disabled,
      beforeConfirm: props.beforeConfirm,
    });
    controller.syncOpen(visible.value);
  }

  function setVisible(value: boolean, reason: PopconfirmOpenReason = 'imperative') {
    syncController();
    return value ? controller.requestOpen(reason) : controller.requestClose(reason);
  }

  function toggle() {
    return setVisible(!visible.value, 'trigger');
  }

  async function confirm(event: MouseEvent) {
    syncController();
    const result = await controller.confirm(event);
    if (result.status === 'rejected') throw result.error;
    return result;
  }

  function cancel(event: MouseEvent) {
    syncController();
    return controller.cancel(event);
  }

  watch(
    () => [props.visible, props.disabled, props.beforeConfirm] as const,
    () => syncController(),
  );

  if (getCurrentInstance()) onBeforeUnmount(() => controller.syncOpen(false));

  return {
    visible,
    loading,
    setVisible,
    toggle,
    open: () => setVisible(true, 'imperative'),
    close: (reason: PopconfirmOpenReason = 'imperative') => setVisible(false, reason),
    confirm,
    cancel,
  };
}
