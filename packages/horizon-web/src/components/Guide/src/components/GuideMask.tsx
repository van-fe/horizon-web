import type { PropType } from 'vue';
import { computed, defineComponent, inject, onMounted, shallowRef, watch } from 'vue';
import { ComponentClassBlock, useNamespace, getElement, cls, cssVariable } from '@aurora/utils';
import type { HGuideCollectedItems } from '../utils/injectedKeys';
import { useElementBounding, useWindowSize } from '@vueuse/core';
import { HGuidePropsInjectKey } from '../utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}GuideMask`,
  props: {
    currentItem: {
      type: Object as PropType<HGuideCollectedItems>,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('guide');

    const { width: windowWidth, height: windowHeight } = useWindowSize();

    const parentProps = inject(HGuidePropsInjectKey);

    const currentTargetElement = shallowRef<HTMLElement | null>(
      getElement(props.currentItem?.props.target) ?? null,
    );
    const currentTarget = useElementBounding(currentTargetElement, { immediate: false });

    const radius = 4;

    watch(
      () => props.currentItem,
      () => {
        setCurrentTarget();
      },
    );

    const path = computed(() => {
      let path = `M0 0H${windowWidth.value}V${windowHeight.value}H0V0Z`;

      if (currentTargetElement.value) {
        // x0y0 左上角 x1y1 右上角 x2y2右下角 x3y3 左下角
        const x0 =
          currentTarget.x.value -
          (props.currentItem?.props.maskTriggerPadding ?? parentProps?.maskTriggerPadding ?? 0);
        const y0 =
          currentTarget.y.value -
          (props.currentItem?.props.maskTriggerPadding ?? parentProps?.maskTriggerPadding ?? 0);

        const x1 =
          currentTarget.width.value +
          currentTarget.x.value +
          (props.currentItem?.props.maskTriggerPadding ?? parentProps?.maskTriggerPadding ?? 0);
        const y1 = y0;

        const x2 = x1;
        const y2 =
          currentTarget.height.value +
          currentTarget.y.value +
          (props.currentItem?.props.maskTriggerPadding ?? parentProps?.maskTriggerPadding ?? 0);

        const x3 = x0;
        const y3 = y2;

        // M 移动到坐标
        // Q 贝塞尔曲线，x0 y0 x1 y1: x0 y0 代表参考坐标，即尖角；x1 y1 代表终点坐标
        path += `M${x0} ${y0 + radius}Q${x0} ${y0} ${x0 + radius} ${y0}H${
          x1 - radius
        }Q${x1} ${y1} ${x1} ${y1 + radius}V${y2 - radius}Q${x2} ${y2} ${x2 - radius} ${y2}H${
          x3 + radius
        }Q${x3} ${y3} ${x3} ${y3 - radius}V${x0 + radius}Z`;
      }

      return path;
    });

    function setCurrentTarget() {
      currentTargetElement.value = getElement(props.currentItem?.props.target) ?? null;
      currentTarget.update();
    }

    // Populate the initial path before the SVG's first render so its cutout does not
    // transition from the viewport origin when the guide opens.
    setCurrentTarget();

    onMounted(() => {
      setCurrentTarget();
    });

    return () => (
      <svg
        class={cls(
          classHelper.e('mask'),
          props.currentItem?.props.maskClass ?? parentProps?.maskClass,
        )}
        width="100%"
        height="100%"
        viewBox={`0 0 ${windowWidth.value} ${windowHeight.value}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill={cssVariable('guide-bg--mask')}
          d={path.value}
          style={props.currentItem?.props.maskStyle ?? parentProps?.maskStyle}
        ></path>
      </svg>
    );
  },
});
