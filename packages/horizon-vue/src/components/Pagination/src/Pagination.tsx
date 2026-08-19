import { computed, defineComponent, provide, ref, toRefs } from 'vue';
import { PAGINATION_DEFAULT_LABELS } from '@aurora/core';
import { focusPaginationItem } from '@aurora/horizon-core';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { usePaginationProps } from './composables/useProps';
import { usePaginationEmits } from './composables/useEmits';
import { usePaginationSlots } from './composables/useSlots';
import { usePaginationExposes } from './composables/useExposes';
import type { PaginationProps } from './composables/useProps';
import type { PaginationEmits } from './composables/useEmits';
import type { PaginationSlots } from './composables/useSlots';
import type { PaginationExposes } from './composables/useExposes';
import {
  HPaginationEmitInjectKey,
  HPaginationPropsInjectKey,
  HPaginationSlotsInjectKey,
} from './utils/injectKeys';
import Total from './components/Total';
import Pager from './components/Pager';
import Sizes from './components/Sizes';
import Jumper from './components/Jumper';
import SimplestPager from '~/components/Pagination/src/components/SimplestPager';
import useSize from '~/utils/useSize';
import { usePaginationController } from './hooks/usePaginationController';

export default defineComponent({
  name: `${useNamespace()}Pagination`,
  desc: '采用分页的形式分隔长列表，每次只加载一个页面',
  descLocales: { en: 'Control the maximum number of page buttons through `pager-count`' },
  props: usePaginationProps,
  emits: usePaginationEmits,
  slots: usePaginationSlots,
  exposes: usePaginationExposes,
  setup(
    props: PaginationProps,
    {
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<PaginationEmits, PaginationSlots, PaginationExposes>,
  ) {
    const rootRef = ref<HTMLElement | null>(null);
    const { size } = toRefs(props);
    const classHelper = new ComponentClassBlock('pagination');
    const sizeRef = useSize(size, 'medium');
    const childSizeRef = computed<'small' | 'medium'>(() => {
      const sizeMap: Record<string, 'small' | 'medium'> = {
        medium: 'small',
        large: 'medium',
      };
      return sizeMap[sizeRef.value] || 'small';
    });

    const controller = usePaginationController(props, {
      updatePageSize: value => emit('update:pageSize', value),
      updateCurrentPage: value => emit('update:currentPage', value),
      pageSizeChange: value => emit('sizeChange', value),
      pageChange: value => emit('currentChange', value),
      change: (page, pageSize) => emit('modify', page, pageSize),
    });

    provide(HPaginationPropsInjectKey, props);
    provide(HPaginationEmitInjectKey, emit);
    provide(HPaginationSlotsInjectKey, slots);

    function onCurrentPageUpdate(currCurrentPage: number) {
      if (currCurrentPage !== controller.currentPage.value) {
        controller.fitCurrentPage(currCurrentPage);
      }
    }

    expose({ focus: (page?: number) => void focusPaginationItem(rootRef.value, page) });

    return () => (
      <nav
        ref={rootRef}
        aria-label={PAGINATION_DEFAULT_LABELS.navigation}
        v-show={props.hideOnSinglePage ? controller.pageCount.value > 1 : true}
        class={cls(
          classHelper.block,
          classHelper.m(sizeRef.value),
          classHelper.m(props.align),
          classHelper.is('disabled', props.disabled),
        )}
      >
        {slots.prefix?.()}
        {controller.layout.value.includes('total') && <Total range={controller.range.value.text} />}
        {controller.layout.value.includes('pager') && (
          <Pager
            v-model:currentPage={controller.currentPage.value}
            pages={controller.pageCount.value}
          />
        )}
        {controller.layout.value.includes('simplest-pager') && (
          <SimplestPager
            v-model:currentPage={controller.currentPage.value}
            pages={controller.pageCount.value}
            size={childSizeRef.value}
          />
        )}
        {controller.layout.value.includes('sizes') && (
          <Sizes v-model:pageSize={controller.pageSize.value} />
        )}
        {controller.layout.value.includes('jumper') && (
          <Jumper
            currentPage={controller.currentPage.value}
            pages={controller.pageCount.value}
            size={childSizeRef.value}
            onUpdate:currentPage={onCurrentPageUpdate}
          />
        )}
        {slots.suffix?.()}
      </nav>
    );
  },
});
