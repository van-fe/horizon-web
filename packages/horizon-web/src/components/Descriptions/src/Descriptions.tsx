import type { ComputedRef } from 'vue';
import {
  defineComponent,
  provide,
  reactive,
  toRefs,
  watchEffect,
  ref,
  inject,
  computed,
  cloneVNode,
  watch,
} from 'vue';
import { useDescriptionsProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { DescriptionsSlots } from './composables/useSlots';
import { useDescriptionsSlots } from './composables/useSlots';
import {
  ComponentClassBlock,
  sizeAdapter,
  useNamespace,
  getSymbolNodeChildren,
} from '@aurora/utils';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { HApplicationSizeType } from '~/components/Application/src/composables/useProps';
import { useElementSize, useDebounceFn } from '@vueuse/core';

export default defineComponent({
  name: `${useNamespace()}Descriptions`,
  desc: '成组展示多个只读字段，一般用于详情页的信息展示',
  props: useDescriptionsProps,
  slots: useDescriptionsSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, DescriptionsSlots>) {
    const {
      title: titleProp,
      border: borderProp,
      type: typeProp,
      column: columnProp,
      labelPosition: labelPositionProp,
      xs: xsProp,
      sm: smProp,
      md: mdProp,
      lg: lgProp,
      xl: xlProp,
      labelClass: labelClassProp,
      valueClass: valueClassProp,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('descriptions');
    const labelWidth = ref('auto');
    const descriptionItemObj = reactive<{ labelWidthArr: number[]; itemLen: number }>({
      labelWidthArr: [],
      itemLen: 0,
    });
    const setLabelWidth = (val: number | string) => {
      if (typeof val === 'string') {
        labelWidth.value = val;
      } else {
        descriptionItemObj.labelWidthArr.push(val);
        if (descriptionItemObj.labelWidthArr.length === descriptionItemObj.itemLen) {
          const maxLength = Math.max(...descriptionItemObj.labelWidthArr);
          labelWidth.value = maxLength ? `${maxLength}px` : 'auto';
        }
      }
    };

    const columnNum = ref(columnProp.value);

    const size = ref();

    const provideObj = reactive({
      type: typeProp.value,
      labelPosition: labelPositionProp.value,
      labelWidth: labelWidth.value,
      column: columnNum.value,
      size: size.value,
      labelClass: labelClassProp.value,
      valueClass: valueClassProp.value,
      setLabelWidth,
    });
    watchEffect(() => {
      provideObj.type = typeProp.value;
      provideObj.labelPosition = labelPositionProp.value;
      provideObj.labelWidth = labelWidth.value;
      provideObj.column =  columnNum.value;
      provideObj.size = size.value;
      provideObj.labelClass = labelClassProp.value;
      provideObj.valueClass = valueClassProp.value;
    });
    provide('HDescriptions', provideObj);

    const getNeedRenderedItems = (defaultSlots: any) => {
      const result = defaultSlots
        ? getSymbolNodeChildren(defaultSlots).map(curr => cloneVNode(curr))
        : [];
      descriptionItemObj.labelWidthArr = [];
      descriptionItemObj.itemLen = result.filter(
        (VNode: any) => VNode.type?.name === `${useNamespace()}DescriptionItem`,
      ).length;

      return result;
    };

    // global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(
      () =>
        sizeAdapter(props.size, {
          middle: 'medium',
        }) || globalSize.value,
    ) as ComputedRef<HApplicationSizeType>;

    // 响应式
    const descriptionsRef = ref<HTMLElement | null>(null);

    const { width } = useElementSize(descriptionsRef);



    const _changeColNum = () => {
      if (width.value < 456) {
        columnNum.value = xsProp.value || columnProp.value;
        size.value = 'xs';
      } else if (width.value < 760) {
        columnNum.value = smProp.value || columnProp.value;
        size.value = 'sm';
      } else if (width.value < 1176) {
        columnNum.value = mdProp.value || columnProp.value;
        size.value = 'md';
      } else if (width.value < 1656) {
        columnNum.value = lgProp.value || columnProp.value;
        size.value = 'lg';
      } else {
        columnNum.value = xlProp.value || columnProp.value;
        size.value = 'xl';
      }
    };
    const changeColNum = useDebounceFn(_changeColNum, 50);

    watch(() => width.value, () => {
      changeColNum();
    });

    return () => {
      const defaultSlotsArr = getNeedRenderedItems(slots.default);
      return (
        <div
          ref={descriptionsRef}
          class={[
            classHelper.block,
            classHelper.m(typeProp.value),
            typeProp.value === 'vertical' && classHelper.e(`col-${columnNum.value}`),
          ]}
        >
          {(titleProp.value || slots.title) && (
            <div class={[classHelper.e('title'), classHelper.e(`title--${sizeRef.value}`)]}>
              {slots.title ? slots.title() : titleProp.value}
            </div>
          )}
          <div
            class={[
              classHelper.e('content'),
              classHelper.m(sizeRef.value),
              borderProp.value && classHelper.m('border'),
            ]}
            style={{ 'grid-template-columns': `repeat(${columnNum.value}, 1fr)` }}
          >
            {...defaultSlotsArr}
          </div>
        </div>
      );
    };
  },
});
