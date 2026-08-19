import { resolveDescriptionBreakpoint, resolveDescriptionResponsiveValue } from '@aurora/core';
import type { ComputedRef } from 'vue';
import {
  cloneVNode,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  toRef,
} from 'vue';
import { createDescriptionsResizeController } from '@aurora/horizon-core';
import { useDescriptionsProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { DescriptionsSlots } from './composables/useSlots';
import { useDescriptionsSlots } from './composables/useSlots';
import {
  ComponentClassBlock,
  getSymbolNodeChildren,
  sizeAdapter,
  useNamespace,
} from '@aurora/utils';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { HApplicationSizeType } from '~/components/Application/src/composables/useProps';
import { DESCRIPTIONS_CONTEXT } from './context';

export default defineComponent({
  name: `${useNamespace()}Descriptions`,
  desc: '成组展示多个只读字段，一般用于详情页的信息展示',
  descLocales: { en: 'Displays grouped read-only fields for detail views.' },
  props: useDescriptionsProps,
  slots: useDescriptionsSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, DescriptionsSlots>) {
    const classHelper = new ComponentClassBlock('descriptions');
    const rootRef = ref<HTMLElement | null>(null);
    const width = ref<number>();
    const labelWidths = new Map<symbol, number>();
    const labelWidth = ref('auto');
    const updateLabelWidth = () => {
      labelWidth.value = labelWidths.size ? `${Math.max(...labelWidths.values())}px` : 'auto';
    };
    const reportLabelWidth = (id: symbol, value?: number) => {
      if (value === undefined) labelWidths.delete(id);
      else labelWidths.set(id, value);
      updateLabelWidth();
    };
    const breakpoint = computed(() =>
      width.value === undefined ? undefined : resolveDescriptionBreakpoint(width.value),
    );
    const column = computed(() =>
      width.value === undefined
        ? props.column
        : resolveDescriptionResponsiveValue(width.value, props.column, props),
    );
    provide(DESCRIPTIONS_CONTEXT, {
      type: toRef(props, 'type'),
      labelPosition: toRef(props, 'labelPosition'),
      labelWidth,
      width,
      breakpoint,
      labelClass: toRef(props, 'labelClass'),
      valueClass: toRef(props, 'valueClass'),
      reportLabelWidth,
    });

    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const size = computed(
      () => sizeAdapter(props.size, { middle: 'medium' }) || globalSize.value,
    ) as ComputedRef<HApplicationSizeType>;
    let resizeController: ReturnType<typeof createDescriptionsResizeController> | undefined;
    onMounted(() => {
      if (rootRef.value)
        resizeController = createDescriptionsResizeController(rootRef.value, {
          onResize: value => (width.value = value),
        });
    });
    onBeforeUnmount(() => resizeController?.destroy());

    return () => {
      const items = slots.default
        ? getSymbolNodeChildren(slots.default).map(child => cloneVNode(child))
        : [];
      return (
        <div
          ref={rootRef}
          class={[
            classHelper.block,
            classHelper.m(props.type),
            props.type === 'vertical' && classHelper.e(`col-${column.value}`),
          ]}
        >
          {(props.title || slots.title) && (
            <div class={[classHelper.e('title'), classHelper.e(`title--${size.value}`)]}>
              {slots.title?.() ?? props.title}
            </div>
          )}
          <dl
            class={[
              classHelper.e('content'),
              classHelper.m(size.value),
              props.border && classHelper.m('border'),
            ]}
            role="list"
            style={{ gridTemplateColumns: `repeat(${column.value}, 1fr)` }}
          >
            {items}
          </dl>
        </div>
      );
    };
  },
});
