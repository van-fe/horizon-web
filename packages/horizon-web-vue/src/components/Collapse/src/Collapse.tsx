import { defineComponent, onMounted, provide, ref, toRefs, watchEffect } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import type { CollapseKey, CollapseValue } from '@aurora/core';
import {
  normalizeCollapseValue,
  resolveCollapseInitialValue,
  toggleCollapseValue,
} from '@aurora/core';
import { focusCollapseHeader } from '@aurora/horizon-web-core';
import { useCollapseProps } from './composables/useProps';
import type { CollapseProps } from './composables/useProps';
import { useCollapseEmits } from './composables/useEmits';
import type { CollapseSlots } from './composables/useSlots';
import { useCollapseSlots } from './composables/useSlots';
import type { CollapseEmits } from './composables/useEmits';
import { useCollapseExposes } from './composables/useExposes';
import type { CollapseExposes } from './composables/useExposes';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, generatorInjectedKeyName, useNamespace } from '@aurora/utils';
import useSize from '~/utils/useSize';

export interface CollapseProvidesData {
  activeKeys: Ref<CollapseValue>;
  accordionProp: Ref<boolean>;
  expandAllProp: Ref<boolean>;
  changeExpandItem: (itemName: CollapseKey) => void;
  handleExpandAll: (itemName: CollapseKey) => void;
}

export const injectedKey = Symbol(
  generatorInjectedKeyName('collapse', 'provides'),
) as InjectionKey<CollapseProvidesData>;

export default defineComponent({
  name: `${useNamespace()}Collapse`,
  desc: '通过折叠面板收纳内容区域',
  descLocales: { en: 'Collapsible panels for showing and hiding content.' },
  props: useCollapseProps,
  emits: useCollapseEmits,
  slots: useCollapseSlots,
  exposes: useCollapseExposes,
  setup(
    props: CollapseProps,
    { emit, expose, slots }: HorizonWebSetupContext<CollapseEmits, CollapseSlots, CollapseExposes>,
  ) {
    const rootRef = ref<HTMLElement | null>(null);
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
    const activeKeys = ref<CollapseValue>([]);

    const changeExpandItem = (itemName: CollapseKey) => {
      activeKeys.value = toggleCollapseValue(activeKeys.value, itemName, accordionProp.value);
      emit('change', activeKeys.value);
      emit('update:activeKey', activeKeys.value);
    };

    watchEffect(() => {
      activeKeys.value = normalizeCollapseValue(activeKeyProp?.value, accordionProp.value);
    });

    const collapseMounted = ref(false);
    const handleExpandAll = (itemName: CollapseKey) => {
      if (collapseMounted.value) return;
      activeKeys.value = resolveCollapseInitialValue(
        activeKeys.value,
        [{ name: itemName }],
        accordionProp.value,
        expandAllProp.value,
      );
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

    expose({ focus: (key?: CollapseKey) => void focusCollapseHeader(rootRef.value, key) });

    return () => (
      <div
        ref={rootRef}
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
