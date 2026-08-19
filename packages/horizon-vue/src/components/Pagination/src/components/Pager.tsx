import { computed, defineComponent, inject, withKeys } from 'vue';
import {
  getPaginationJumpTarget,
  getPaginationPagerItems,
  PAGINATION_DEFAULT_LABELS,
  resolvePaginationSelection,
} from '@aurora/core';
import type { PaginationPagerItem } from '@aurora/core';
import { cls, ComponentClassBlock, isNumber, useNamespace } from '@aurora/utils';
import { IconArrowLeft, IconArrowRight, IconToggleLeft, IconToggleRight } from '@aurora/icon';
import {
  HPaginationEmitInjectKey,
  HPaginationPropsInjectKey,
  HPaginationSlotsInjectKey,
} from '../utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}PaginationPager`,
  props: {
    currentPage: {
      type: Number,
    },
    pages: {
      type: Number,
      required: true,
    },
  },
  emits: {
    'update:currentPage': (currentPage: number) => isNumber(currentPage),
  },
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('pagination');
    const parentProps = inject(HPaginationPropsInjectKey)!;
    const parentEmits = inject(HPaginationEmitInjectKey)!;
    const parentSlots = inject(HPaginationSlotsInjectKey)!;

    const currentPage = computed(() => props.currentPage!);

    function onPickPage(page: PaginationPagerItem) {
      if (parentProps.disabled) return false;

      const requested =
        typeof page === 'number'
          ? page
          : getPaginationJumpTarget(
              currentPage.value,
              page === 'jump-prev' ? 'previous' : 'next',
              props.pages,
              parentProps.pagerCount,
            );
      const selection = resolvePaginationSelection(
        currentPage.value,
        requested,
        props.pages,
        parentProps.disabled,
      );
      if (!selection.accepted) {
        if (selection.reason === 'same' && typeof page === 'number') {
          parentEmits('clickCurrentPage', selection.page);
        }
        return false;
      }
      emit('update:currentPage', selection.page);
    }

    function prevPage() {
      if (parentProps.disabled) return false;
      if (currentPage.value > 1) {
        const page = currentPage.value - 1;
        onPickPage(page);
        parentEmits('clickPrevPage', page);
      }
    }

    function nextPage() {
      if (parentProps.disabled) return false;
      if (currentPage.value < props.pages) {
        const page = currentPage.value + 1;
        onPickPage(page);
        parentEmits('clickNextPage', page);
      }
    }

    const pagesList = computed(() =>
      getPaginationPagerItems(currentPage.value, props.pages, parentProps.pagerCount),
    );

    return () => (
      <div class={cls(classHelper.e('pager'))}>
        <div
          class={cls(
            classHelper.em('pager', 'item'),
            classHelper.is('prev'),
            classHelper.is('disabled', currentPage.value <= 1 || parentProps.disabled),
          )}
          role="button"
          aria-label={PAGINATION_DEFAULT_LABELS.previousPage}
          aria-disabled={currentPage.value <= 1 || parentProps.disabled}
          tabindex={currentPage.value <= 1 || parentProps.disabled ? -1 : 0}
          onClick={prevPage}
          onKeyup={withKeys(prevPage, ['enter'])}
        >
          {parentSlots.prev?.() ?? <IconArrowLeft size={12} />}
        </div>
        {pagesList.value.map(num => (
          <div
            class={cls(
              classHelper.em('pager', 'item'),
              classHelper.is('active', currentPage.value === num),
              classHelper.is('disabled', parentProps.disabled),
            )}
            role="button"
            aria-label={
              typeof num === 'number'
                ? PAGINATION_DEFAULT_LABELS.page.replace('{page}', String(num))
                : num === 'jump-prev'
                  ? PAGINATION_DEFAULT_LABELS.jumpPrevious
                  : PAGINATION_DEFAULT_LABELS.jumpNext
            }
            aria-current={currentPage.value === num ? 'page' : undefined}
            aria-disabled={parentProps.disabled}
            tabindex={parentProps.disabled ? -1 : 0}
            data-num={num === 'jump-prev' ? 'prev' : num === 'jump-next' ? 'next' : num}
            data-page={typeof num === 'number' ? num : undefined}
            onClick={() => onPickPage(num)}
            onKeyup={withKeys(() => onPickPage(num), ['enter'])}
          >
            {num === 'jump-prev' ? (
              <div class={classHelper.em('pager', 'advance')}>
                <div class={cls(classHelper.em('pager', 'advance'), classHelper.is('origin'))}>
                  ...
                </div>
                <div class={cls(classHelper.em('pager', 'advance'), classHelper.is('icon'))}>
                  <IconToggleLeft size={12} />
                </div>
              </div>
            ) : num === 'jump-next' ? (
              <div class={classHelper.em('pager', 'advance')}>
                <div class={cls(classHelper.em('pager', 'advance'), classHelper.is('origin'))}>
                  ...
                </div>
                <div class={cls(classHelper.em('pager', 'advance'), classHelper.is('icon'))}>
                  <IconToggleRight size={12} />
                </div>
              </div>
            ) : (
              num
            )}
          </div>
        ))}
        <div
          class={cls(
            classHelper.em('pager', 'item'),
            classHelper.is('next'),
            classHelper.is('disabled', currentPage.value >= props.pages || parentProps.disabled),
          )}
          role="button"
          aria-label={PAGINATION_DEFAULT_LABELS.nextPage}
          aria-disabled={currentPage.value >= props.pages || parentProps.disabled}
          tabindex={currentPage.value >= props.pages || parentProps.disabled ? -1 : 0}
          onClick={nextPage}
          onKeyup={withKeys(nextPage, ['enter'])}
        >
          {parentSlots.next?.() ?? <IconArrowRight size={12} />}
        </div>
      </div>
    );
  },
});
