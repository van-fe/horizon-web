import { defineComponent, toRefs } from 'vue';
import { useListProps } from './composables/useProps';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { ListSlots } from './composables/useSlots';
import { useListSlots } from './composables/useSlots';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import useSize from '~/utils/useSize';
import { resolveListMaxHeight } from '@aurora/core';

export default defineComponent({
  name: `${useNamespace()}List`,
  desc: '可承载文字、列表、图片、段落或复杂的图文组合，用一个连续的列来显示多行元素； 常用于具有相同构成及内容的模块批量展示',
  descLocales: { en: 'List and list-item components for displaying collections.' },
  props: useListProps,
  slots: useListSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, ListSlots>) {
    const { data, zebra, border, split, size } = toRefs(props);
    const classHelper = new ComponentClassBlock('list');

    // global size
    const sizeRef = useSize(size, 'medium', { large: 'medium' });

    const renderListItems = (data: unknown[]) => {
      return data?.map((item, index) => slots.item?.({ item, index }));
    };

    const renderItems = () => {
      if (data.value && data.value?.length > 0) {
        return renderListItems(data.value);
      }
    };

    return () => (
      <HScrollbar maxHeight={resolveListMaxHeight(props.maxHeight)}>
        <div
          role="list"
          class={cls(
            classHelper.block,
            classHelper.m(sizeRef.value),
            classHelper.is('zebra', zebra.value),
            classHelper.is('split', split.value),
            classHelper.is('border', border.value),
          )}
        >
          {slots.header && (
            <div class={classHelper.e('header')} role="presentation">
              {slots.header()}
            </div>
          )}
          {slots.default?.()}
          {renderItems()}
          {slots.footer && (
            <div class={classHelper.e('footer')} role="presentation">
              {slots.footer()}
            </div>
          )}
        </div>
      </HScrollbar>
    );
  },
});
