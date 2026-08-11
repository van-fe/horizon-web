import { defineComponent, ref, useId, watch } from 'vue';
import { AIcon } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { focusPopconfirmAction } from '@aurora/horizon-web-core';
import HPopover from '~/components/Popover/src/Popover';
import type { PopoverExposes } from '~/components/Popover/src/composables/useExposes';
import HButton from '~/components/Button/src/Button';
import useLocaleLang from '~/utils/useLocaleLang';
import clickOutside from '~/directives/v-click-outside';
import { usePopconfirmProps } from './composables/useProps';
import { usePopconfirmEmits } from './composables/useEmits';
import type { PopconfirmEmits } from './composables/useEmits';
import { usePopconfirmSlots } from './composables/useSlots';
import type { PopconfirmSlots } from './composables/useSlots';
import { usePopconfirmExposes } from './composables/useExposes';
import type { PopconfirmExposes } from './composables/useExposes';
import { usePopconfirm } from './hooks/usePopconfirm';

export default defineComponent({
  name: `${useNamespace()}Popconfirm`,
  desc: '点击元素后显示确认气泡',
  descLocales: { en: 'A confirmation popover for potentially destructive actions.' },
  props: usePopconfirmProps,
  emits: usePopconfirmEmits,
  slots: usePopconfirmSlots,
  exposes: usePopconfirmExposes,
  directives: { clickOutside },
  setup(
    props,
    {
      slots,
      emit,
      expose,
    }: HorizonWebSetupContext<PopconfirmEmits, PopconfirmSlots, PopconfirmExposes>,
  ) {
    const c = new ComponentClassBlock('popconfirm');
    const popover = ref<PopoverExposes>();
    const triggerWrapper = ref<HTMLElement>();
    const dialog = ref<HTMLElement>();
    const contentId = `${useId()}-content`;
    const state = usePopconfirm(props, emit);
    const confirmLabel = useLocaleLang('global.confirm', 'Confirm');
    const cancelLabel = useLocaleLang('global.cancel', 'Cancel');
    const focusTrigger = () => {
      const reference = triggerWrapper.value ?? popover.value?.referenceDom;
      const target = reference?.querySelector<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (target ?? reference)?.focus?.();
    };
    const focusDialog = () => {
      const ownerWindow = dialog.value?.ownerDocument.defaultView;
      const focus = () => {
        if (state.visible.value && dialog.value) focusPopconfirmAction(dialog.value, 'cancel');
      };
      if (ownerWindow) {
        ownerWindow.requestAnimationFrame(() => ownerWindow.requestAnimationFrame(focus));
      } else focus();
    };

    watch(
      state.visible,
      (visible, wasVisible) => {
        if (visible) focusDialog();
        else if (wasVisible) focusTrigger();
      },
      { immediate: true, flush: 'post' },
    );

    expose({ open: state.open, close: () => state.close('imperative') });

    return () => (
      <HPopover
        ref={popover}
        trigger="manual"
        visible={state.visible.value}
        disabled={props.disabled}
        placement={props.placement}
        popperClass={c.block}
      >
        {{
          reference: () => (
            <span ref={triggerWrapper} onClick={state.toggle}>
              {slots.reference?.()}
            </span>
          ),
          popper: () => (
            <div
              ref={dialog}
              v-click-outside={() => state.close('outside-pointer')}
              role="alertdialog"
              aria-modal="false"
              aria-labelledby={contentId}
              aria-busy={state.loading.value || undefined}
              onKeydown={(event: KeyboardEvent) => {
                if (event.key !== 'Escape') return;
                event.preventDefault();
                state.close('escape');
              }}
            >
              <div class={c.e('body')}>
                <span class={c.e('icon')}>
                  {slots.icon?.() ?? <AIcon name="warning_filled" size="20" />}
                </span>
                <span id={contentId} class={c.e('content')}>
                  {slots.default?.() ?? props.title}
                </span>
              </div>
              <div class={c.e('footer')}>
                <HButton
                  size="small"
                  plain
                  {...props.cancelButtonProps}
                  data-popconfirm-action="cancel"
                  onClick={state.cancel}
                >
                  {props.cancelText || cancelLabel.value}
                </HButton>
                <HButton
                  size="small"
                  {...props.confirmButtonProps}
                  data-popconfirm-action="confirm"
                  loading={state.loading.value || props.confirmButtonProps.loading}
                  onClick={state.confirm}
                >
                  {props.confirmText || confirmLabel.value}
                </HButton>
              </div>
            </div>
          ),
        }}
      </HPopover>
    );
  },
});
