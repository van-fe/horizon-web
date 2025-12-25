import { computed, defineComponent, provide, ref, toRefs, watch } from 'vue';
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

export default defineComponent({
  name: `${useNamespace()}Pagination`,
  desc: '采用分页的形式分隔长列表，每次只加载一个页面',
  props: usePaginationProps,
  emits: usePaginationEmits,
  slots: usePaginationSlots,
  exposes: usePaginationExposes,
  setup(
    props: PaginationProps,
    { emit, slots }: HorizonWebSetupContext<PaginationEmits, PaginationSlots, PaginationExposes>,
  ) {
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

    const pageSize = ref(Math.abs(props.pageSize));
    const pages = computed(() => Math.ceil(props.total / pageSize.value));
    const currentPage = ref(Math.min(Math.max(1, props.currentPage), Math.max(pages.value, 1)));

    watch(pages, () => {
      fitCurrentPage();
    });

    watch(pageSize, val => {
      emit('update:pageSize', val);
      emit('changeSize', val);
      emit('sizeChange', val);
    });

    watch(currentPage, val => {
      emit('update:currentPage', val);
      emit('change', val);
      emit('currentChange', val);
    });

    watch(
      [pageSize, currentPage],
      ([pageSize, currentPage]) => {
        emit('modify', currentPage, pageSize);
      },
      {
        flush: 'post',
      },
    );

    watch(
      () => props.pageSize,
      val => {
        pageSize.value = val;
      },
    );

    watch(
      () => props.currentPage,
      val => {
        fitCurrentPage(val);
      },
    );

    provide(HPaginationPropsInjectKey, props);
    provide(HPaginationEmitInjectKey, emit);
    provide(HPaginationSlotsInjectKey, slots);

    const layoutComponents = computed(() => {
      switch (props.type) {
        case 'simple':
          return ['total', 'pager'];
        case 'simplest':
          return ['simplest-pager'];
        default:
          return Array.isArray(props.layout)
            ? props.layout
            : props.layout.replace(/\s/g, '').split(',');
      }
    });

    const range = computed(
      () =>
        `${Math.max(0, (currentPage.value - 1) * pageSize.value + 1)}-${Math.min(
          currentPage.value * pageSize.value,
          Math.max(props.total, 1),
        )}`,
    );

    function onCurrentPageUpdate(currCurrentPage: number) {
      if (currCurrentPage !== currentPage.value) {
        fitCurrentPage(currCurrentPage);
      }
    }

    function fitCurrentPage(value: number = currentPage.value) {
      currentPage.value = Math.min(Math.max(1, value), Math.max(pages.value, 1));
    }

    return () => (
      <div
        v-show={props.hideOnSinglePage ? pages.value > 1 : true}
        class={cls(
          classHelper.block,
          classHelper.m(sizeRef.value),
          classHelper.m(props.align),
          classHelper.is('disabled', props.disabled),
        )}
      >
        {slots.prefix?.()}
        {layoutComponents.value.includes('total') && <Total range={range.value} />}
        {layoutComponents.value.includes('pager') && (
          <Pager v-model:currentPage={currentPage.value} pages={pages.value} />
        )}
        {layoutComponents.value.includes('simplest-pager') && (
          <SimplestPager
            v-model:currentPage={currentPage.value}
            pages={pages.value}
            size={childSizeRef.value}
          />
        )}
        {layoutComponents.value.includes('sizes') && <Sizes v-model:pageSize={pageSize.value} />}
        {layoutComponents.value.includes('jumper') && (
          <Jumper
            currentPage={currentPage.value}
            pages={pages.value}
            size={childSizeRef.value}
            onUpdate:currentPage={onCurrentPageUpdate}
          />
        )}
        {slots.suffix?.()}
      </div>
    );
  },
});
