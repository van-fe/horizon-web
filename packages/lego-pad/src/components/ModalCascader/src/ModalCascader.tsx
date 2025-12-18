import type { LegoComponentInstance } from '@aurora/shared';
import { ComponentClassBlock, useNamespace } from '@aurora/shared';
import { computed, defineComponent, Fragment, inject, ref } from 'vue';
import type { CascaderExposes } from '@aurora/horizon-web';
import {
  useSelectExposes,
  useSelectSlots,
  NDrawer,
  NFormItemPropsInjectedKey,
  NFormItemSlotsInjectedKey,
  NButton,
  NCascader,
  useCascaderEmits,
  useCascaderExposes,
  NEmpty,
} from '@aurora/horizon-web';
import useLocaleLang from '@aurora/horizon-web/es/utils/useLocaleLang';
import { NSuitPadIsPadModeInjectKey } from '~/components/SuitPad/src/utils/injectKeys';
import useEmits from '~/utils/useEmits';
import { useModalCascaderProps } from './composables/useProps';
import { IconClose } from '@aurora/icon';
import { useModalCascaderEmits } from './composables/useEmits';
import useExposes from '~/utils/useExposes';

export default defineComponent({
  name: `${useNamespace()}ModalCascader`,
  inheritAttrs: false,
  props: useModalCascaderProps,
  emits: useModalCascaderEmits,
  slots: useSelectSlots,
  exposes: useSelectExposes,
  setup(props, context) {
    const classHelper = new ComponentClassBlock('modal-cascader');

    const cascaderDomRef = ref<LegoComponentInstance<typeof NCascader, CascaderExposes>>();
    const bodyCascaderDomRef = ref<LegoComponentInstance<typeof NCascader, CascaderExposes>>();

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

    const emitsHandlers = useEmits(useCascaderEmits, context.emit);

    const drawerVisible = ref(false);

    function handleClick(evt: MouseEvent) {
      drawerVisible.value = true;
      context.emit('click', evt);
    }

    useExposes(useCascaderExposes, context.expose, bodyCascaderDomRef);

    return () =>
      isPadModeInject?.value ? (
        <Fragment>
          <NCascader
            ref={cascaderDomRef}
            {...props}
            {...context.attrs}
            {...emitsHandlers}
            clearable={false}
            trigger="never"
            filterable={false}
            showTagsInPanel={true}
            onClick={handleClick}
          >
            {{
              ...context.slots,
            }}
          </NCascader>
          <NDrawer
            v-model:visible={drawerVisible.value}
            class={classHelper.e('drawer')}
            {...drawerProps.value}
            onClosed={() => {
              cascaderDomRef.value?.blur();
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
                          cascaderDomRef.value?.clear();
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
                  <NCascader
                    ref={bodyCascaderDomRef}
                    {...props}
                    {...context.attrs}
                    {...emitsHandlers}
                    maxHeight="100%"
                    showPopoverContentOnly
                    clearable={false}
                    showTagsInPanel={props.showSelectedTagsInPanel ?? props.multiple}
                    useBuildInPanelFilter={props.filterable || !!props.filter}
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
                      ...context.slots,
                      panelConfirmLeft: context.slots.panelConfirmLeft?.() ?? [],
                      empty: () =>
                        context.slots.empty?.() ?? (
                          <NEmpty>
                            {{
                              description: () =>
                                props.emptyText ??
                                (useLocaleLang('select.noData', 'no data').value as string),
                            }}
                          </NEmpty>
                        ),
                    }}
                  </NCascader>
                </div>
              ),
            }}
          </NDrawer>
        </Fragment>
      ) : (
        <NCascader
          {...props}
          {...context.attrs}
          {...emitsHandlers}
          data-pad={isPadModeInject?.value ?? false}
        >
          {{
            ...context.slots,
          }}
        </NCascader>
      );
  },
});
