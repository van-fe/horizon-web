import { defineComponent, ref } from 'vue';
import { AIcon } from '@aurora/icon';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import HPopover from '~/components/Popover/src/Popover';
import HButton from '~/components/Button/src/Button';
import useLocaleLang from '~/utils/useLocaleLang';
import clickOutside from '~/directives/v-click-outside';
import { usePopconfirmProps } from './composables/useProps';
import { usePopconfirmEmits } from './composables/useEmits';
import { usePopconfirmSlots } from './composables/useSlots';
import { usePopconfirm } from './hooks/usePopconfirm';

export default defineComponent({
  name: `${useNamespace()}Popconfirm`,
  desc: '点击元素后显示确认气泡',
  descLocales: { en: 'A confirmation popover for potentially destructive actions.' },
  props: usePopconfirmProps,
  emits: usePopconfirmEmits,
  slots: usePopconfirmSlots,
  directives: { clickOutside },
  setup(props, { slots, emit }) {
    const c = new ComponentClassBlock('popconfirm');
    const popover = ref<{ switchVisible: (value: boolean) => void }>();
    const state = usePopconfirm(props, emit as any);
    const confirmLabel = useLocaleLang('global.confirm', 'Confirm');
    const cancelLabel = useLocaleLang('global.cancel', 'Cancel');
    const syncVisible = (value: boolean) => {
      state.setVisible(value);
      popover.value?.switchVisible?.(value);
    };

    return () => (
      <HPopover
        ref={popover}
        trigger="manual"
        visible={state.visible.value}
        disabled={props.disabled}
        placement={props.placement}
        popperClass={c.block}
        onHide={() => state.visible.value && state.setVisible(false)}
      >
        {{
          reference: () => (
            <span onClick={() => syncVisible(!state.visible.value)}>{slots.reference?.()}</span>
          ),
          popper: () => (
            <div
              v-click-outside={() => state.setVisible(false)}
              role="alertdialog"
              aria-modal="false"
              aria-label={props.title}
            >
              <div class={c.e('body')}>
                <span class={c.e('icon')}>
                  {slots.icon?.() ?? <AIcon name="warning_filled" size="20" />}
                </span>
                <span class={c.e('content')}>{slots.default?.() ?? props.title}</span>
              </div>
              <div class={c.e('footer')}>
                <HButton size="small" plain {...props.cancelButtonProps} onClick={state.cancel}>
                  {props.cancelText || cancelLabel.value}
                </HButton>
                <HButton
                  size="small"
                  loading={state.loading.value}
                  {...props.confirmButtonProps}
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
