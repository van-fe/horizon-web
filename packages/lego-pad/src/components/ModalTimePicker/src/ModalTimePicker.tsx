import type { LegoComponentInstance } from '@nio-fe/shared';
import { ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { computed, defineComponent, Fragment, inject, ref } from 'vue';
import type { TimePickerExposes } from '@nio-fe/lego';
import {
  useTimePickerEmits,
  useTimePickerExposes,
  useTimePickerSlots,
  NDrawer,
  NTimePicker,
  NFormItemPropsInjectedKey,
  NFormItemSlotsInjectedKey,
  NButton,
} from '@nio-fe/lego';
import useLocaleLang from '@nio-fe/lego/es/utils/useLocaleLang';
import { NSuitPadIsPadModeInjectKey } from '~/components/SuitPad/src/utils/injectKeys';
import useEmits from '~/utils/useEmits';
import { useModalTimePickerProps } from './composables/useProps';
import { IconClose } from '@nio-fe/icon';
import { useModalTimePickerEmits } from './composables/useEmits';
import useExposes from '~/utils/useExposes';

export default defineComponent({
  name: `${useNamespace()}ModalTimePicker`,
  inheritAttrs: false,
  props: useModalTimePickerProps,
  emits: useModalTimePickerEmits,
  slots: useTimePickerSlots,
  exposes: useTimePickerExposes,
  setup(props, context) {
    const classHelper = new ComponentClassBlock('modal-time-picker');

    const timePickerDomRef =
      ref<LegoComponentInstance<typeof NTimePicker, TimePickerExposes>>();
    const bodyTimePickerDomRef =
      ref<LegoComponentInstance<typeof NTimePicker, TimePickerExposes>>();

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

    const emitsHandlers = useEmits(useTimePickerEmits, context.emit);

    const drawerVisible = ref(false);

    function handleClick(evt: MouseEvent) {
      drawerVisible.value = true;
      context.emit('click', evt);
    }

    useExposes(useTimePickerExposes, context.expose, bodyTimePickerDomRef);

    return () =>
      isPadModeInject?.value ? (
        <Fragment>
          <NTimePicker
            ref={timePickerDomRef}
            {...props}
            {...context.attrs}
            {...emitsHandlers}
            inputable={false}
            clearable={false}
            trigger="never"
            onClick={handleClick}
          >
            {{
              ...context.slots,
            }}
          </NTimePicker>
          <NDrawer
            v-model:visible={drawerVisible.value}
            class={classHelper.e('drawer')}
            {...drawerProps.value}
            onClosed={() => {
              timePickerDomRef.value?.blur();
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
                      <NButton
                        link={true}
                        onClick={() => {
                          timePickerDomRef.value?.clear();
                        }}
                      >
                        {useLocaleLang('global.clear').value}
                      </NButton>
                    )}
                  </div>
                </div>
              ),
              default: () => (
                <div class={classHelper.e('body')}>
                  <NTimePicker
                    ref={bodyTimePickerDomRef}
                    {...props}
                    {...context.attrs}
                    {...emitsHandlers}
                    showPopoverContentOnly
                    clearable={false}
                    fitInputWidth={false}
                    panelMinWidth="auto"
                    panelMaxWidth="auto"
                    optionListMaxHeight="calc(80vh - 100px)"
                    onCancel={() => {
                      drawerVisible.value = false;
                      emitsHandlers.onCancel();
                    }}
                    onConfirm={() => {
                      drawerVisible.value = false;
                      emitsHandlers.onConfirm();
                    }}
                  >
                    {{
                      panelConfirmLeft: () => undefined,
                      ...context.slots,
                    }}
                  </NTimePicker>
                </div>
              ),
            }}
          </NDrawer>
        </Fragment>
      ) : (
        <NTimePicker {...props} {...context.attrs} {...emitsHandlers}>
          {{
            ...context.slots,
          }}
        </NTimePicker>
      );
  },
});
