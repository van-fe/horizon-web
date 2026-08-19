import { computed, ref, watch } from 'vue';
import {
  clampPaginationPage,
  getPaginationPageCount,
  getPaginationRange,
  normalizePaginationPageSize,
  resolvePaginationLayout,
} from '@aurora/core';
import type { PaginationProps } from '../composables/useProps';

export interface PaginationControllerEvents {
  updatePageSize: (pageSize: number) => void;
  updateCurrentPage: (page: number) => void;
  pageSizeChange: (pageSize: number) => void;
  pageChange: (page: number) => void;
  change: (page: number, pageSize: number) => void;
}

export function usePaginationController(
  props: PaginationProps,
  events: PaginationControllerEvents,
) {
  const pageSize = ref(normalizePaginationPageSize(props.pageSize));
  const pageCount = computed(() => getPaginationPageCount(props.total, pageSize.value));
  const currentPage = ref(clampPaginationPage(props.currentPage, pageCount.value));
  const layout = computed(() => resolvePaginationLayout(props.layout, props.type));
  const range = computed(() => getPaginationRange(currentPage.value, pageSize.value, props.total));

  function fitCurrentPage(value: number = currentPage.value) {
    currentPage.value = clampPaginationPage(value, pageCount.value);
  }

  watch(pageCount, () => fitCurrentPage());
  watch(pageSize, value => {
    events.updatePageSize(value);
    events.pageSizeChange(value);
  });
  watch(currentPage, value => {
    events.updateCurrentPage(value);
    events.pageChange(value);
  });
  watch(
    [pageSize, currentPage],
    ([nextPageSize, nextPage]) => events.change(nextPage, nextPageSize),
    { flush: 'post' },
  );
  watch(
    () => props.pageSize,
    value => {
      pageSize.value = normalizePaginationPageSize(value);
    },
  );
  watch(
    () => props.currentPage,
    value => fitCurrentPage(value),
  );

  return {
    currentPage,
    fitCurrentPage,
    layout,
    pageCount,
    pageSize,
    range,
  };
}
