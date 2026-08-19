import type { ToRefs } from 'vue';
import { computed } from 'vue';
import type { TreeSelectController } from '@aurora/core';
import type { TreeSelectProps } from '../composables/useProps';
import type { HTreeSelectContext } from './types';
import type { HTreeData } from '~/components/Tree/src/utils/types';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: HTreeSelectContext,
  controlPopperVisible: (status: boolean) => void,
  whetherInputCanFocus: () => void,
  controller: TreeSelectController<HTreeData>,
  syncSnapshot: () => void,
) {
  const needConfirm = computed(() => props.needConfirm.value);

  function confirmHandle(hidePopper = true) {
    const snapshot = controller.snapshot;
    if (!snapshot.needConfirm || snapshot.disabled) return snapshot.value;
    const value = controller.confirm();
    syncSnapshot();

    hidePopper && controlPopperVisible(false);

    if (!hidePopper) {
      whetherInputCanFocus();
    }

    context.emit('confirm');
    return value;
  }

  function cancelHandle() {
    const snapshot = controller.snapshot;
    if (!snapshot.needConfirm || snapshot.disabled) return snapshot.value;
    const value = controller.cancel();
    syncSnapshot();
    controlPopperVisible(false);
    context.emit('cancel');
    return value;
  }

  return {
    needConfirm,
    confirmHandle,
    cancelHandle,
  };
}
