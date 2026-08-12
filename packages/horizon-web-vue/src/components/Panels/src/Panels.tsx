import type { VNode, ComponentOptions } from 'vue';
import { defineComponent, h, toRefs, ref, watch } from 'vue';
import type { PanelDescriptor, PanelsKey } from '@aurora/core';
import { isPanelsKey, resolvePanelsTransitionDirection } from '@aurora/core';
import type { PanelProps } from './composables/useProps';
import { usePanelsProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  flattenVNodes,
  slotVNodes,
  getBooleanProp,
  ComponentClassBlock,
  useNamespace,
} from '@aurora/utils';
import type { PanelsSlots } from './composables/useSlots';
import { usePanelsSlots } from './composables/useSlots';
import { usePanelsExposes } from './composables/useExposes';
import HTransition from '~/components/Transition/src/Transition';
import type { TransitionProps } from '~/components/Transition/src/composables/useProps';

export default defineComponent({
  name: `${useNamespace()}Panels`,
  desc: 'Panels 组件用来显示可切换的更多内容，可以单独使用，也常常结合 `radio`, `tabs` 等组件一起使用',
  descLocales: {
    en: 'Displays one keyed panel from a switchable content collection.',
  },
  props: usePanelsProps,
  slots: usePanelsSlots,
  exposes: usePanelsExposes,
  setup(props, { slots }: HorizonWebSetupContext<{}, PanelsSlots>) {
    const {
      modelValue: modelValueRef,
      animated: animatedRef,
      vertical: verticalRef,
    } = toRefs(props);
    const cls = new ComponentClassBlock('panels');

    let panels: VNode[] = [];
    const transitionNameRef = ref<TransitionProps['name']>();

    const getPanels = () => {
      const vNodes = slotVNodes(slots.default);
      panels = flattenVNodes(vNodes).filter(panel => {
        const props = panel.props as PanelProps | null;
        if (!props) {
          return false;
        }

        return (
          (panel.type as ComponentOptions).name === 'HPanel' &&
          isPanelsKey(props.name) &&
          !getBooleanProp(props.disabled)
        );
      });
    };

    // 监听modelValue，根据切换方向和是否垂直模式，附加不同的动画效果
    watch(modelValueRef, (newVal, oldVal) => {
      const descriptors = panels.map(panel => panel.props as PanelDescriptor);
      transitionNameRef.value = `slide-${resolvePanelsTransitionDirection(
        descriptors,
        oldVal as PanelsKey,
        newVal as PanelsKey,
        verticalRef.value,
      )}`;
    });

    const getActivePanel = () => {
      let panel = panels.find(vNode => (vNode.props as PanelProps).name === modelValueRef.value);
      panel = (
        <div class={cls.e('panel')} key={String(modelValueRef.value)} role="tabpanel">
          {panel}
        </div>
      );
      if (animatedRef.value) {
        const activePanel = panel;
        panel = h(HTransition, { name: transitionNameRef.value }, { default: () => activePanel });
      }
      return panel;
    };

    return () => {
      getPanels();

      return <div class={cls.block}>{getActivePanel()}</div>;
    };
  },
});
