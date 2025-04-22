import type { LegoComponentInstance } from '@nio-fe/shared';
import { ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { computed, defineComponent, Fragment, inject, ref } from 'vue';
import type { SelectExposes } from '@nio-fe/lego';
import {
  useSelectEmits,
  useSelectExposes,
  useSelectSlots,
  NDrawer,
  NFormItemPropsInjectedKey,
  NFormItemSlotsInjectedKey,
  NButton,
  NSelect,
  NEmpty,
} from '@nio-fe/lego';
import useLocaleLang from '@nio-fe/lego/es/utils/useLocaleLang';
import { NSuitPadIsPadModeInjectKey } from '~/components/SuitPad/src/utils/injectKeys';
import useEmits from '~/utils/useEmits';
import { useModalSelectProps } from './composables/useProps';
import { IconClose } from '@nio-fe/icon';
import { useModalSelectEmits } from './composables/useEmits';
import useExposes from '~/utils/useExposes';

export default defineComponent({
  name: `${useNamespace()}ModalSelect`,
  inheritAttrs: false,
  props: useModalSelectProps,
  emits: useModalSelectEmits,
  slots: useSelectSlots,
  exposes: useSelectExposes,
  setup(props, context) {
    const classHelper = new ComponentClassBlock('modal-select');

    const selectDomRef = ref<LegoComponentInstance<typeof NSelect, SelectExposes>>();
    const bodySelectDomRef = ref<LegoComponentInstance<typeof NSelect, SelectExposes>>();

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

    const emitsHandlers = useEmits(useSelectEmits, context.emit);

    const drawerVisible = ref(false);

    function handleClick(evt: MouseEvent) {
      drawerVisible.value = true;
      context.emit('click', evt);
    }

    useExposes(useSelectExposes, context.expose, bodySelectDomRef);

    return () =>
      isPadModeInject?.value ? (
        <Fragment>
          <NSelect
            ref={selectDomRef}
            {...props}
            {...context.attrs}
            {...emitsHandlers}
            clearable={false}
            trigger="never"
            filterOption={false}
            filterable={false}
            showSearch={false}
            allowCreate={false}
            showTagsInPanel={true}
            onClick={handleClick}
          >
            {{
              ...context.slots,
            }}
          </NSelect>
          <NDrawer
            v-model:visible={drawerVisible.value}
            class={classHelper.e('drawer')}
            {...drawerProps.value}
            onClosed={() => {
              selectDomRef.value?.blur();
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
                          selectDomRef.value?.clear();
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
                  <NSelect
                    ref={bodySelectDomRef}
                    {...props}
                    {...context.attrs}
                    {...emitsHandlers}
                    optionListMaxHeight="100%"
                    showPopoverContentOnly
                    clearable={false}
                    showSelectedIcon={!props.multiple}
                    showTagsInPanel={props.showSelectedTagsInPanel ?? props.multiple}
                    useBuildInPanelFilter={
                      props.useBuildInPanelFilter ||
                      props.filterable ||
                      props.allowCreate ||
                      props.showSearch ||
                      !!props.filterOption
                    }
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
                  </NSelect>
                </div>
              ),
            }}
          </NDrawer>
        </Fragment>
      ) : (
        <NSelect {...props} {...context.attrs} {...emitsHandlers}>
          {{
            ...context.slots,
          }}
        </NSelect>
      );
  },
});
