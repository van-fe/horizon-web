import type { LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import {
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
  NOptionGroupPropsInjectKey,
  NSelectAddOptionInjectKey,
  NSelectRemoveOptionInjectKey,
  NSelectVisibleOptionsInjectKey,
} from './utils/injectKeys';
import type { OptionProps } from './composables/useProps';
import { useOptionGroupProps } from './composables/useProps';
import type { OptionGroupSlots } from './composables/useSlots';
import { useOptionGroupSlots } from './composables/useSlots';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import { nanoid } from 'nanoid';

export default defineComponent({
  name: `${useNamespace()}OptionGroup`,
  props: useOptionGroupProps,
  slots: useOptionGroupSlots,
  setup(props, { slots, attrs }: LegoSetupContext<{}, OptionGroupSlots>) {
    const classHelper = new ComponentClassBlock('select-option-group');

    const { label: labelRef } = toRefs(props);

    const uuid = nanoid();

    let isMounted = false;

    const optionGroupDomRef = ref<HTMLDivElement>();

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

    provide(NSelectAddOptionInjectKey, selfAddOption);
    provide(NSelectRemoveOptionInjectKey, selfRemoveOption);
    provide(NOptionGroupPropsInjectKey, props);

    const addOption = inject(NSelectAddOptionInjectKey);
    const removeOption = inject(NSelectRemoveOptionInjectKey);
    const visibleOptions = inject(NSelectVisibleOptionsInjectKey);

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
          <NTooltip overflow={true}>
            {{
              content: () => labelRef.value,
              default: () => <div class={classHelper.e('title')}>{labelRef.value}</div>,
            }}
          </NTooltip>
        )}
        {slots.default?.()}
        {!labelRef?.value && <div class={classHelper.e('divider')} />}
      </div>
    );
  },
});
