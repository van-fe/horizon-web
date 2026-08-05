import { AIcon } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, getBooleanProp, useNamespace, isVNodeEmpty } from '@aurora/utils';
import { cloneVNode, computed, defineComponent, inject, type VNodeRef, type VNode } from 'vue';
import type { SegmentedItemEmits } from './composables/useEmits';
import { useSegmentedItemEmits } from './composables/useEmits';
import type { HSegmentedValue } from './composables/useProps';
import { useSegmentedItemProps } from './composables/useProps';
import { useSegmentedItemSlots, type SegmentedItemSlots } from './composables/useSlots';
import { contextKey } from './constants';
import HTooltip from '~/components/Tooltip/src/Tooltip';

export default defineComponent({
  name: `${useNamespace()}SegmentedItem`,
  components: { AIcon, HTooltip },
  props: useSegmentedItemProps,
  slots: useSegmentedItemSlots,
  emits: useSegmentedItemEmits,
  setup(props, { slots, emit }: HorizonWebSetupContext<SegmentedItemEmits, SegmentedItemSlots>) {
    const ctx = inject(contextKey);
    if (!ctx) throw new Error('Please using <h-segmented-item /> in the <h-segmented />');

    const cls = new ComponentClassBlock('segmented');

    const value = computed<HSegmentedValue>(() => props.value);

    const onClick = () => {
      if (getBooleanProp(props.disabled)) return;

      emit('click', value.value);
      ctx.onClick?.(value.value);
    };

    const onKeydown = (evt: KeyboardEvent) => {
      if (evt.key !== 'Enter' && evt.key !== ' ') return;
      evt.preventDefault();
      onClick();
    };

    const isActivated = computed(() => ctx.activeKey.value === value.value);

    const addTab = ctx.createTab(value) as VNodeRef;

    return () => {
      const slotDefault = slots?.default?.({
        state: isActivated.value,
        activeKey: ctx.activeKey.value!,
      }) as VNode[] | VNode;
      const slotDefaults = Array.isArray(slotDefault) ? slotDefault : [slotDefault].filter(Boolean);

      return (
        <div
          ref={addTab}
          class={[
            cls.e('item'),
            isActivated.value && cls.em('item', 'active'),
            props.disabled && cls.em('item', 'disabled'),
          ]}
          role="tab"
          data-focus-visible-inset=""
          tabindex={props.disabled ? -1 : isActivated.value ? 0 : -1}
          aria-selected={isActivated.value}
          aria-disabled={getBooleanProp(props.disabled)}
          onClick={onClick}
          onKeydown={onKeydown}
        >
          <div class={cls.e('item-inner')}>
            {slots.icon
              ? cloneVNode(slots.icon()[0], { class: cls.e('icon') })
              : props.icon && (
                  <AIcon class={cls.e('icon')} name={props.icon} size={props.iconSize} />
                )}

            {isVNodeEmpty(slotDefaults)
              ? props.label !== undefined && (
                  <HTooltip content={String(props.label)} overflow={true}>
                    <div class={cls.e('item-text')}>{props.label}</div>
                  </HTooltip>
                )
              : slotDefaults}
          </div>
        </div>
      );
    };
  },
});
