import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import {
  ref,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  toRefs,
  nextTick,
} from 'vue';
import type { SelectCollectedOptionData } from './utils/injectKeys';
import {
  HOptionGroupPropsInjectKey,
  HSelectAddOptionInjectKey,
  HSelectRemoveOptionInjectKey,
  HSelectVisibleOptionsInjectKey,
} from './utils/injectKeys';
import type { OptionProps } from './composables/useProps';
import { useOptionGroupProps } from './composables/useProps';
import type { OptionGroupSlots } from './composables/useSlots';
import { useOptionGroupSlots } from './composables/useSlots';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import { nanoid } from 'nanoid';

export default defineComponent({
  name: `${useNamespace()}OptionGroup`,
  props: useOptionGroupProps,
  slots: useOptionGroupSlots,
  setup(props, { slots, attrs }: HorizonWebSetupContext<{}, OptionGroupSlots>) {
    const classHelper = new ComponentClassBlock('select-option-group');

    const { label: labelRef } = toRefs(props);

    const uuid = nanoid();

    let isMounted = false;

    const optionGroupDomRef = ref<HTMLDivElement | null>(null);

    const optionList = reactive(
      new Map<OptionProps['value'], SelectCollectedOptionData<'option'>>(),
    );

    function selfAddOption<T extends 'option' | 'option-group'>(
      option: SelectCollectedOptionData<T>,
    ) {
      optionList.set(option.props.value, {
        ...option,
        parentProps: props,
      } as SelectCollectedOptionData<'option'>);

      if (isMounted) {
        addOption?.(option);
      }
    }

    function selfRemoveOption(value: OptionProps['value']) {
      optionList.delete(value);

      if (isMounted) {
        removeOption?.(value);
      }
    }

    provide(HSelectAddOptionInjectKey, selfAddOption);
    provide(HSelectRemoveOptionInjectKey, selfRemoveOption);
    provide(HOptionGroupPropsInjectKey, props);

    const addOption = inject(HSelectAddOptionInjectKey);
    const removeOption = inject(HSelectRemoveOptionInjectKey);
    const visibleOptions = inject(HSelectVisibleOptionsInjectKey);

    const isVisible = computed(
      () =>
        Array.from(optionList.values()).filter(val =>
          visibleOptions?.value.some(curr => curr.props.value === val.props.value),
        ).length > 0,
    );

    onMounted(() => {
      addOption?.({
        type: 'option-group',
        props: {
          ...props,
          value: uuid,
        },
        slots: undefined,
        attrs,
        el: optionGroupDomRef,
        active: computed(() => false),
        disabled: computed(() => props.disabled),
        children: optionList,
      } satisfies SelectCollectedOptionData<'option-group'>);

      void nextTick(() => {
        isMounted = true;
      });
    });

    onBeforeUnmount(() => {
      removeOption?.(uuid);
    });

    return () => (
      <div
        ref={optionGroupDomRef}
        v-show={isVisible.value}
        class={cls(classHelper.block, classHelper.has('title', !!labelRef.value))}
      >
        {labelRef?.value && (
          <HTooltip overflow={true}>
            {{
              content: () => labelRef.value,
              default: () => <div class={classHelper.e('title')}>{labelRef.value}</div>,
            }}
          </HTooltip>
        )}
        {slots.default?.()}
        {!labelRef?.value && <div class={classHelper.e('divider')} />}
      </div>
    );
  },
});
