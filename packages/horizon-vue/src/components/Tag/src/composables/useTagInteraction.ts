import { computed, inject, nextTick, onUnmounted, ref, type Ref } from 'vue';
import { canActivateTag, toggleTagActive } from '@aurora/core';
import {
  createTagCloseVisibilityController,
  createTagPressTracker,
  type TagPressTracker,
} from '@aurora/horizon-core';
import { HFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import type { TagProps } from './useProps';

interface UseTagInteractionOptions {
  props: TagProps;
  modelValue: Ref<boolean | undefined>;
  wrapperRef: Ref<HTMLElement | null>;
  isWaitingForConfirm: Ref<boolean>;
  getParentDisabled: () => boolean | undefined;
  onCloseNotice?: (id: TagProps['id']) => Promise<void>;
  onEnter?: () => void;
  emitClick: (event: MouseEvent) => void;
  emitClose: (event: MouseEvent) => void;
  emitActiveChange: (active: boolean) => void;
}

/** Binds framework-free Tag activation/press/close capabilities to Vue events and refs. */
export function useTagInteraction(options: UseTagInteractionOptions) {
  const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);
  const equallyShowClose = ref(false);
  const isHover = ref(false);
  const isPress = ref(false);
  const isDisabled = computed(() => options.getParentDisabled() ?? options.props.disabled ?? false);
  const isActivated = computed(() => options.modelValue.value ?? false);
  const isClickable = computed(() =>
    canActivateTag({
      active: options.modelValue.value,
      clickable: options.props.clickable,
      disabled: isDisabled.value,
    }),
  );
  const showClose = computed(
    () =>
      options.props.closable &&
      !isDisabled.value &&
      ((options.props.equally && equallyShowClose.value) || !options.props.equally),
  );

  const closeVisibility = createTagCloseVisibilityController({
    getDelay: () => options.props.showCloseDelay ?? 1000,
    onVisibleChange: visible => {
      equallyShowClose.value = visible;
    },
  });

  function onClick(event: MouseEvent) {
    closeVisibility.cancelPending();
    if (isDisabled.value || !isClickable.value) return;

    options.emitClick(event);
    const nextActive = toggleTagActive(options.modelValue.value);
    if (nextActive === undefined) return;

    options.emitActiveChange(nextActive);
    void nextTick(() => {
      formItemTrigger?.('change');
    });
  }

  function onClose(event: MouseEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (isDisabled.value) return;

    if (!options.onCloseNotice) {
      options.emitClose(event);
      return;
    }

    options.isWaitingForConfirm.value = true;
    options
      .onCloseNotice(options.props.id)
      .then(() => options.emitClose(event))
      .catch(() => undefined)
      .finally(() => {
        options.isWaitingForConfirm.value = false;
      });
  }

  function onMouseEnter() {
    isHover.value = true;
    closeVisibility.enter(options.props.equally ?? false, options.props.clickable ?? true);
    options.onEnter?.();
  }

  function onMouseLeave() {
    isHover.value = false;
    closeVisibility.leave();
  }

  let pressTracker: TagPressTracker | undefined;
  function onMouseDown() {
    if (!options.wrapperRef.value || isDisabled.value) return;
    pressTracker?.destroy();
    pressTracker = createTagPressTracker(options.wrapperRef.value, pressed => {
      isPress.value = pressed;
    });
  }

  onUnmounted(() => {
    pressTracker?.destroy();
    closeVisibility.destroy();
  });

  return {
    isActivated,
    isClickable,
    isDisabled,
    isHover,
    isPress,
    onClick,
    onClose,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    showClose,
  };
}
