import { defineComponent, provide, toRefs, ref, watchEffect, onMounted } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import { useCollapseProps } from './composables/useProps';
import type { CollapseProps } from './composables/useProps';
import { useCollapseEmits } from './composables/useEmits';
import type { CollapseSlots } from './composables/useSlots';
import { useCollapseSlots } from './composables/useSlots';
import type { CollapseEmits } from './composables/useEmits';
import type { LegoSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, generatorInjectedKeyName, useNamespace } from '@aurora/utils';
import useSize from '~/utils/useSize';

export interface CollapseProvidesData {
  activeKeys: Ref<string | number | undefined | (string | number)[]>;
  accordionProp: Ref<boolean>;
  expandAllProp: Ref<boolean>;
  changeExpandItem: (itemName: string | number) => void;
  handleExpandAll: (itemName: string | number) => void;
}

export const injectedKey = Symbol(
  generatorInjectedKeyName('collapse', 'provides'),
) as InjectionKey<CollapseProvidesData>;

export default defineComponent({
  name: `${useNamespace()}Collapse`,
  desc: '通过折叠面板收纳内容区域',
  props: useCollapseProps,
  emits: useCollapseEmits,
  slots: useCollapseSlots,
  setup(props: CollapseProps, { emit, slots }: LegoSetupContext<CollapseEmits, CollapseSlots>) {
    const {
      activeKey: activeKeyProp,
      accordion: accordionProp,
      filled: filledProp,
      expandIconPosition: expandIconPositionProp,
      border: borderProp,
      size,
      expandAll: expandAllProp,
    } = toRefs(props);
    // global size
    const sizeRef = useSize(size, 'medium');

    const classHelper = new ComponentClassBlock('collapse');
    const activeKeys = ref<string | number | undefined | (string | number)[]>([]);

    const handleAccordionExpandItem = (itemName: string | number) => {
      activeKeys.value = activeKeys.value === itemName ? undefined : itemName;
    };
    const handleExpandItem = (itemName: string | number, oldActiveKeys: (string | number)[]) => {
      activeKeys.value = oldActiveKeys.includes(itemName)
        ? oldActiveKeys.filter(name => name !== itemName)
        : [...oldActiveKeys, itemName];
    };
    const changeExpandItem = (itemName: string | number) => {
      if (accordionProp.value) {
        handleAccordionExpandItem(itemName);
      } else {
        handleExpandItem(itemName, activeKeys.value as (string | number)[]);
      }
      emit('change', activeKeys.value);
      emit('update:activeKey', activeKeys.value);
    };

    watchEffect(() => {
      if (accordionProp.value) {
        activeKeys.value = activeKeyProp?.value ?? undefined;
      } else {
        activeKeys.value = Array.isArray(activeKeyProp?.value) ? activeKeyProp?.value : [];
      }
    });

    const collapseMounted = ref(false);
    const handleExpandAll = (itemName: string | number) => {
      if (!collapseMounted.value && !(activeKeys.value as (string | number)[]).includes(itemName)) {
        activeKeys.value = [...(activeKeys.value as (string | number)[]), itemName];
      }
    };
    onMounted(() => {
      collapseMounted.value = true;
    });

    provide(injectedKey, {
      activeKeys,
      accordionProp,
      changeExpandItem,
      expandAllProp,
      handleExpandAll,
    });

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.m('filled', filledProp.value),
          classHelper.m('border', borderProp.value),
          classHelper.m(expandIconPositionProp.value),
          classHelper.m(sizeRef.value),
        )}
      >
        {slots?.default?.()}
      </div>
    );
  },
});
