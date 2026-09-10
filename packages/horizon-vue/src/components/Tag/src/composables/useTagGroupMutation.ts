import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { createTagMutationController, type TagId } from '@aurora/core';
import type { TagGroupProps } from './useProps';

interface UseTagGroupMutationOptions {
  props: TagGroupProps;
  createTagId: symbol;
  onMutated: () => void;
  emitCreated: (value: string) => void;
  emitEdited: (value: string, oldValue: string, id: TagId | undefined) => void;
  emitClosed: (id: TagId | undefined) => void;
}

/** Adapts the Core Tag mutation authority to Vue pending state and result event ordering. */
export function useTagGroupMutation(options: UseTagGroupMutationOptions) {
  const isLoading = ref(false);
  const controller = createTagMutationController({
    beforeCreate: options.props.beforeCreate,
    beforeEdit: options.props.beforeEdit,
    beforeClose: options.props.beforeClose,
  });
  const unsubscribe = controller.subscribe(() => {
    isLoading.value = controller.getState().pending;
  });

  watch(
    () =>
      [options.props.beforeCreate, options.props.beforeEdit, options.props.beforeClose] as const,
    ([beforeCreate, beforeEdit, beforeClose]) => {
      controller.update({ beforeCreate, beforeEdit, beforeClose });
    },
  );

  function onEdit(
    newValue: string,
    oldValue: string | undefined,
    id: TagId | undefined,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const mutation =
        id === options.createTagId
          ? controller.create(newValue)
          : controller.edit(newValue, oldValue!, id);
      void mutation.then(result => {
        options.onMutated();
        if (result.status !== 'accepted') {
          reject(result.status);
          return;
        }
        // Preserve Vue's established ordering: release child wait state before the result event.
        resolve();
        void nextTick(() => {
          if (id === options.createTagId) options.emitCreated(newValue);
          else options.emitEdited(newValue, oldValue!, id);
        });
      });
    });
  }

  function onClose(id: TagId | undefined): Promise<void> {
    // Unguarded closes stay synchronous so Select observes the child close event immediately.
    if (!options.props.beforeClose) {
      options.emitClosed(id);
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      void controller.close(id).then(result => {
        if (result.status !== 'accepted') {
          reject(result.status);
          return;
        }
        resolve();
        void nextTick(() => options.emitClosed(id));
      });
    });
  }

  onBeforeUnmount(() => {
    unsubscribe();
    controller.destroy();
  });

  return { isLoading, onClose, onEdit };
}
