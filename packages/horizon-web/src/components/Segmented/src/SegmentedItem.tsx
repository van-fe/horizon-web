import { AIcon } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, getBooleanProp, useNamespace, isVNodeEmpty } from '@aurora/utils';
import {
  cloneVNode,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  type VNodeRef,
  type VNode,
} from 'vue';
import type { SegmentedItemEmits } from './composables/useEmits';
import { useSegmentedItemEmits } from './composables/useEmits';
import type { HSegmentedValue } from './composables/useProps';
import { useSegmentedItemProps } from './composables/useProps';
import { useSegmentedItemSlots, type SegmentedItemSlots } from './composables/useSlots';
import { contextKey } from './constants';

export default defineComponent({
  name: `${useNamespace()}SegmentedItem`,
  components: { AIcon },
  props: useSegmentedItemProps,
  slots: useSegmentedItemSlots,
  emits: useSegmentedItemEmits,
  setup(props, { slots, emit }: HorizonWebSetupContext<SegmentedItemEmits, SegmentedItemSlots>) {
    const ctx = inject(contextKey);
    if (!ctx) throw new Error('Please using <h-segmented-item /> in the <h-segmented />');

    const cls = new ComponentClassBlock('segmented');

    const instance = getCurrentInstance();

    const key = computed(() => instance?.vnode.key as HSegmentedValue);

    const onClick = () => {
      if (getBooleanProp(props.disabled)) return;

      emit('click', key.value);
      ctx.onClick?.(key.value);
    };

    const isActivated = computed(() => ctx.activeKey.value === key.value);

    const addTab = ctx.createTab(key.value) as VNodeRef;

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
          tabindex={isActivated.value ? -1 : 0}
          aria-selected={isActivated.value}
          onClick={onClick}
        >
          <div class={cls.e('item-inner')}>
            {slots.icon
              ? cloneVNode(slots.icon()[0], { class: cls.e('icon') })
              : props.icon && (
                  <AIcon class={cls.e('icon')} name={props.icon} size={props.iconSize} />
                )}

            {isVNodeEmpty(slotDefaults)
              ? props.label && (
                  <div class={cls.e('item-text')} title={props.label as string}>
                    {props.label}
                  </div>
                )
              : slotDefaults}
          </div>
        </div>
      );
    };
  },
});
