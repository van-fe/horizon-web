import { defineComponent, toRefs } from 'vue';
import { useListProps } from './composables/useProps';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { ListSlots } from './composables/useSlots';
import { useListSlots } from './composables/useSlots';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}List`,
  desc: '可承载文字、列表、图片、段落或复杂的图文组合，用一个连续的列来显示多行元素； 常用于具有相同构成及内容的模块批量展示',
  descLocales: { en: 'List and list-item components for displaying collections.' },
  props: useListProps,
  slots: useListSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, ListSlots>) {
    const { data, zebra, isBorder, border, split, size } = toRefs(props);
    const classHelper = new ComponentClassBlock('list');

    // global size
    const sizeRef = useSize(size, 'medium', { large: 'medium' });

    const renderListItems = (data: any[]) => {
      return data?.map((item, index) => slots.item?.({ item, index }));
    };

    const renderItems = () => {
      if (data.value && data.value?.length > 0) {
        return renderListItems(data.value);
      }
    };

    return () => (
      <HScrollbar maxHeight={props.maxHeight > 0 ? props.maxHeight : undefined}>
        <div
          class={cls(
            classHelper.block,
            classHelper.m(sizeRef.value),
            classHelper.is('zebra', zebra.value),
            classHelper.is('split', split.value),
            classHelper.is('border', isBorder.value ?? border.value),
          )}
        >
          {slots.header && <div class={classHelper.e('header')}>{slots.header()}</div>}
          {slots.default?.()}
          {renderItems()}
          {slots.footer && <div class={classHelper.e('footer')}>{slots.footer()}</div>}
        </div>
      </HScrollbar>
    );
  },
});
