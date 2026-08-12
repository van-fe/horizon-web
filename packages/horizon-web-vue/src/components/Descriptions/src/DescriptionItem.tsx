import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { resolveDescriptionResponsiveValue } from '@aurora/core';
import { createDescriptionsResizeController } from '@aurora/horizon-web-core';
import { useDescriptionItemProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { DescriptionItemSlots } from './composables/useSlots';
import { useDescriptionItemSlots } from './composables/useSlots';
import { DESCRIPTIONS_CONTEXT } from './context';

export default defineComponent({
  name: `${useNamespace()}DescriptionItem`,
  desc: '描述列表中的单个只读字段',
  descLocales: { en: 'A single read-only field within Descriptions.' },
  props: useDescriptionItemProps,
  slots: useDescriptionItemSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, DescriptionItemSlots>) {
    const classHelper = new ComponentClassBlock('descriptions');
    const context = inject(DESCRIPTIONS_CONTEXT);
    const labelRef = ref<HTMLElement | null>(null);
    const labelId = Symbol('description-label');
    const spanCol = computed(() =>
      context?.width.value === undefined
        ? props.spanCol
        : resolveDescriptionResponsiveValue(context.width.value, props.spanCol, props),
    );
    let labelObserver: ReturnType<typeof createDescriptionsResizeController> | undefined;
    onMounted(() => {
      if (labelRef.value)
        labelObserver = createDescriptionsResizeController(labelRef.value, {
          onResize: width => {
            if (context?.type.value === 'vertical')
              context.reportLabelWidth(labelId, Math.ceil(width));
          },
        });
    });
    watch(
      () => context?.type.value,
      type => {
        if (type === 'vertical') labelObserver?.update();
        else context?.reportLabelWidth(labelId);
      },
    );
    onBeforeUnmount(() => {
      labelObserver?.destroy();
      context?.reportLabelWidth(labelId);
    });
    return () => (
      <div
        class={[
          classHelper.e('item'),
          context?.labelPosition.value === 'top' && classHelper.e('item--vertical'),
          context?.labelPosition.value === 'top' && classHelper.e('item--top'),
        ]}
        role="listitem"
        style={{
          display: context?.labelPosition.value === 'left' ? 'flex' : 'block',
          gridColumn: `span ${spanCol.value}`,
          gridRow: `span ${props.spanRow}`,
        }}
      >
        <dt
          ref={labelRef}
          class={[classHelper.e('label'), context?.labelClass.value]}
          role="term"
          style={{
            width: context?.labelPosition.value === 'left' ? context.labelWidth.value : 'auto',
          }}
        >
          {slots.label?.() ?? props.label}
        </dt>
        <dd class={[classHelper.e('value'), context?.valueClass.value]} role="definition">
          {slots.default?.() ?? props.value}
        </dd>
      </div>
    );
  },
});
