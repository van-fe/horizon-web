import type { VNode, ComponentOptions } from 'vue';
import { defineComponent, toRefs, ref, watch } from 'vue';
import type { PanelProps } from './composables/useProps';
import { usePanelsProps } from './composables/useProps';
import type { LegoSetupContext } from '@nio-fe/shared';
import {
  flattenVNodes,
  slotVNodes,
  getBooleanProp,
  ComponentClassBlock,
  useNamespace,
} from '@nio-fe/shared';
import type { PanelsSlots } from './composables/useSlots';
import { usePanelsSlots } from './composables/useSlots';
import NTransition from '~/components/Transition/src/Transition';
import type { TransitionProps } from '~/components/Transition/src/composables/useProps';

export default defineComponent({
  name: `${useNamespace()}Panels`,
  desc: 'Panels 组件用来显示可切换的更多内容，可以单独使用，也常常结合 `radio`, `tabs` 等组件一起使用',
  props: usePanelsProps,
  slots: usePanelsSlots,
  setup(props, { slots }: LegoSetupContext<{}, PanelsSlots>) {
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
          (panel.type as ComponentOptions).name === 'NPanel' &&
          props.name &&
          !getBooleanProp(props.disabled)
        );
      });
    };

    // 监听modelValue，根据切换方向和是否垂直模式，附加不同的动画效果
    watch(modelValueRef, (newVal, oldVal) => {
      const newIndex = panels.findIndex(t => (t.props as PanelProps).name === newVal);
      const oldIndex = panels.findIndex(t => (t.props as PanelProps).name === oldVal);
      if (newIndex < oldIndex) {
        // 说明是从右切换到左，或者从下切换到上
        transitionNameRef.value = `slide-${verticalRef.value ? 'down' : 'right'}`;
      } else {
        transitionNameRef.value = `slide-${verticalRef.value ? 'up' : 'left'}`;
      }
    });

    const getActivePanel = () => {
      let panel = panels.find(vNode => (vNode.props as PanelProps).name === modelValueRef.value);
      panel = (
        <div class={cls.e('panel')} key={String(modelValueRef.value)} role="tabpanel">
          {panel}
        </div>
      );
      if (animatedRef.value) {
        panel = <NTransition name={transitionNameRef.value}>{panel}</NTransition>;
      }
      return panel;
    };

    return () => {
      getPanels();

      return <div class={cls.block}>{getActivePanel()}</div>;
    };
  },
});
