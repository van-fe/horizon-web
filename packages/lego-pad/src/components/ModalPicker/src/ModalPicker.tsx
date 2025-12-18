import type { LegoComponentInstance } from '@nio-fe/shared';
import { ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { computed, defineComponent, Fragment, inject, ref } from 'vue';
import type { PickerExposes } from '@nio-fe/lego';
import {
  usePickerEmits,
  usePickerExposes,
  usePickerSlots,
  NPicker,
  NDrawer,
  NFormItemPropsInjectedKey,
  NFormItemSlotsInjectedKey,
  NButton,
} from '@nio-fe/lego';
import useLocaleLang from '@nio-fe/lego/es/utils/useLocaleLang';
import { NSuitPadIsPadModeInjectKey } from '~/components/SuitPad/src/utils/injectKeys';
import useEmits from '~/utils/useEmits';
import { useModalPickerProps } from './composables/useProps';
import { IconClose } from '@nio-fe/icon';
import useExposes from '~/utils/useExposes';

export default defineComponent({
  name: `${useNamespace()}ModalPicker`,
  inheritAttrs: false,
  props: useModalPickerProps,
  emits: usePickerEmits,
  slots: usePickerSlots,
  exposes: usePickerExposes,
  setup(props, context) {
    const classHelper = new ComponentClassBlock('modal-picker');

    const pickerDomRef = ref<LegoComponentInstance<typeof NPicker, PickerExposes>>();
    const bodyPickerDomRef = ref<LegoComponentInstance<typeof NPicker, PickerExposes>>();

    const isPadModeInject = inject(NSuitPadIsPadModeInjectKey, undefined);
    const formItemPropsInject = inject(NFormItemPropsInjectedKey, undefined);
    const formItemSlotsInject = inject(NFormItemSlotsInjectedKey, undefined);

    const drawerProps = computed(() => ({
      ...props.drawerProps,
      size: props.drawerProps.size ?? '80%',
      v2: props.drawerProps.v2 ?? true,
      placement: props.drawerProps.placement ?? 'bottom',
      footer: props.drawerProps.footer ?? false,
    }));

    const emitsHandlers = useEmits(usePickerEmits, context.emit);

    useExposes(usePickerExposes, context.expose, bodyPickerDomRef);

    const drawerVisible = ref(false);

    function handleClick(evt: MouseEvent) {
      drawerVisible.value = true;
      context.emit('click', evt);
    }

    return () =>
      isPadModeInject?.value ? (
        <Fragment>
          <NPicker
            ref={pickerDomRef}
            {...props}
            {...context.attrs}
            {...emitsHandlers}
            clearable={false}
            trigger="never"
            onClick={handleClick}
          >
            {{
              ...context.slots,
            }}
          </NPicker>
          <NDrawer
            v-model:visible={drawerVisible.value}
            class={classHelper.e('drawer')}
            {...drawerProps.value}
            onClosed={() => {
              pickerDomRef.value?.forceBlur();
            }}
          >
            {{
              header: () => (
                <div class={classHelper.e('header')}>
                  <div class={classHelper.e('close')}>
                    <NButton
                      icon={IconClose}
                      iconSize={20}
                      type="normal"
                      link={true}
                      onClick={() => (drawerVisible.value = false)}
                    />
                  </div>
                  <div class={classHelper.e('title')}>
                    {formItemSlotsInject?.label?.() ??
                      formItemPropsInject?.label ??
                      props.drawerProps.title}
                  </div>
                  <div class={classHelper.e('control')}>
                    {props.clearable && (
                      <NButton link={true} onClick={() => emitsHandlers.onClear()}>
                        {props.clearBtnText ?? useLocaleLang('global.clear').value}
                      </NButton>
                    )}
                  </div>
                </div>
              ),
              default: () => (
                <div class={classHelper.e('body')}>
                  <NPicker
                    ref={bodyPickerDomRef}
                    {...props}
                    {...context.attrs}
                    {...emitsHandlers}
                    showPopoverContentOnly
                    clearable={false}
                  >
                    {{
                      ...context.slots,
                      panelConfirmLeft: context.slots.panelConfirmLeft?.() ?? <Fragment />,
                    }}
                  </NPicker>
                </div>
              ),
            }}
          </NDrawer>
        </Fragment>
      ) : (
        <NPicker {...props} {...context.attrs} {...emitsHandlers}>
          {{
            ...context.slots,
          }}
        </NPicker>
      );
  },
});
