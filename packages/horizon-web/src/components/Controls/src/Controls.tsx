import type { VNode, RendererElement, RendererNode } from 'vue';
import { computed, defineComponent, inject, onBeforeUnmount, provide, ref, toRefs } from 'vue';
import {
  cls,
  ComponentClassBlock,
  cssVariableKey,
  getSymbolNodeChildren,
  useNamespace,
} from '@aurora/shared';
import type { LegoSetupContext } from '@aurora/shared';
import type { ControlProps } from './composables/useProps';
import { useControlsProps } from './composables/useProps';
import { useControlsEmits } from './composables/useEmits';
import { useControlsSlots } from './composables/useSlots';
import type { ControlsEmits } from './composables/useEmits';
import type { ControlsSlots } from './composables/useSlots';
import { NControlsEmitInjectKey, NControlsPropsInjectKey } from './utils/injectKeys';
import { useResizeObserver } from '@vueuse/core';
import Ellipsis from './components/Ellipsis';
import { NHoverSwitchVisibleInjectKey } from '~/components/Hover/src/utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}Controls`,
  desc: '可以根据宽度自动控制显示的按钮数量',
  components: {
    Ellipsis,
  },
  props: useControlsProps,
  emits: useControlsEmits,
  slots: useControlsSlots,
  setup(props, { emit, slots }: LegoSetupContext<ControlsEmits, ControlsSlots>) {
    const classHelper = new ComponentClassBlock('controls');
    const { theme: themeRef, accessList: accessListProp } = toRefs(props);
    const maxAvailableAmount = ref(0);
    const controlsRef = ref<HTMLDivElement | null>(null);

    const { stop: resizeObserverStop } = useResizeObserver(controlsRef, entries => {
      const entry = entries[0];

      if (entry.contentRect.width === 0 && entry.contentRect.height === 0) {
        return;
      }

      const itemWidth = parseFloat(
        getComputedStyle(entry.target).getPropertyValue(cssVariableKey('controls-size--control')),
      );
      const marginValue = parseFloat(
        getComputedStyle(entry.target).getPropertyValue(
          cssVariableKey('controls-margin-x--control-siblings'),
        ),
      );

      setTimeout(() => {
        maxAvailableAmount.value = Math.floor(
          (entry.contentRect.width + marginValue) / (itemWidth + marginValue),
        );
      });
    });

    const hoverSwitchVisibleInject = inject(NHoverSwitchVisibleInjectKey, undefined);
    function onDropdownItemClick() {
      hoverSwitchVisibleInject?.(false);
    }

    const controlItemLength = ref(0);

    const getNeedRenderedItems = (slots: LegoSetupContext<{}, ControlsSlots>['slots']) => {
      const controlItems = slots.default
        ? (
            getSymbolNodeChildren(slots.default) as VNode<
              RendererNode,
              RendererElement,
              ControlProps
            >[]
          ).filter(
            curr =>
              (curr.props?.visible ?? true) &&
              (accessListProp.value?.includes(curr.props!.label) ?? true),
          )
        : [];

      controlItemLength.value = controlItems.length;

      return controlItems;
    };

    const shouldRenderDirectlyAmount = computed(() =>
      Math.max(
        maxAvailableAmount.value >= controlItemLength.value
          ? controlItemLength.value
          : maxAvailableAmount.value - 1,
        0,
      ),
    );

    onBeforeUnmount(() => {
      resizeObserverStop();
    });

    provide(NControlsPropsInjectKey, props);
    provide(NControlsEmitInjectKey, emit);

    return () => {
      const controlItems = getNeedRenderedItems(slots);

      return (
        <div ref={controlsRef} class={cls(classHelper.block, classHelper.m(themeRef.value))}>
          <div class={cls(classHelper.e('inner'))}>
            {controlItems.slice(0, shouldRenderDirectlyAmount.value)}
          </div>
          {controlItems.length > shouldRenderDirectlyAmount.value && (
            <Ellipsis
              items={controlItems.slice(shouldRenderDirectlyAmount.value)}
              onDropdownItemClick={onDropdownItemClick}
            />
          )}
        </div>
      );
    };
  },
});
