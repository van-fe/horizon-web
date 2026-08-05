import { defineComponent, inject, toRefs, ref, nextTick, onBeforeUnmount, watchEffect } from 'vue';
import { useDescriptionItemProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { DescriptionItemSlots } from './composables/useSlots';
import { useDescriptionItemSlots } from './composables/useSlots';
import { useIntersectionObserver } from '@vueuse/core';

export type observerReturnType = {
  isSupported: boolean | undefined;
  stop: () => void;
};

export default defineComponent({
  name: `${useNamespace()}DescriptionItem`,
  desc: "描述列表中的单个只读字段",
  descLocales: { en: "A single read-only field within Descriptions." },
  props: useDescriptionItemProps,
  slots: useDescriptionItemSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, DescriptionItemSlots>) {
    const {
      label: labelProp,
      value: valueProp,
      spanCol: spanColProp,
      spanRow: spanRowProp,
      xs: xsProp,
      sm: smProp,
      md: mdProp,
      lg: lgProp,
      xl: xlProp,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('descriptions');
    const injectProp = inject<{
      labelPosition: string;
      type: string;
      labelWidth: string;
      column: number;
      size: string;
      labelClass: string;
      valueClass: string;
      setLabelWidth: (val: number | string) => void;
    }>('HDescriptions');
    const labelRef = ref<HTMLElement | null>(null);

    const { stop } = useIntersectionObserver(labelRef, () => {
      setClientWidth();
    });

    const setClientWidth = () => {
      nextTick(() => {
        const clientWidth = labelRef.value?.getBoundingClientRect().width;
        injectProp?.type === 'vertical' &&
          clientWidth &&
          injectProp?.setLabelWidth(Math.ceil(clientWidth));
      });
    };

    const spanColRef = ref(spanColProp.value);

    watchEffect(() => {
      // spanColRef 根据 injectProp?.size 响应式变化
      switch (injectProp?.size) {
        case 'xs':
          spanColRef.value = xsProp?.value ?? spanColProp.value;
          break;
        case 'sm':
          spanColRef.value = smProp?.value ?? spanColProp.value;
          break;
        case 'md':
          spanColRef.value = mdProp?.value ?? spanColProp.value;
          break;
        case 'lg':
          spanColRef.value = lgProp?.value ?? spanColProp.value;
          break;
        case 'xl':
          spanColRef.value = xlProp?.value ?? spanColProp.value;
          break;
        default:
          spanColRef.value = spanColProp.value;
          break;
      }
    });

    onBeforeUnmount(() => {
      stop();
    });

    return () => {
      return (
        <div
          class={[
            classHelper.e('item'),
            injectProp?.labelPosition === 'top' && classHelper.e('item--vertical'),
            injectProp?.labelPosition === 'top' && classHelper.e('item--top'),
          ]}
          style={{
            display: injectProp?.labelPosition === 'left' ? 'flex' : 'block',
            'grid-column': `span ${spanColRef.value}`,
            'grid-row': `span ${spanRowProp.value}`,
          }}
        >
          <div
            ref={labelRef}
            class={[classHelper.e('label'), injectProp?.labelClass]}
            style={{
              width: injectProp?.labelPosition === 'left' ? injectProp?.labelWidth : 'auto',
            }}
          >
            {slots.label?.() ?? labelProp.value}
          </div>
          <div class={[classHelper.e('value'), injectProp?.valueClass]}>
            {slots.default?.() ?? valueProp.value}
          </div>
        </div>
      );
    };
  },
});
