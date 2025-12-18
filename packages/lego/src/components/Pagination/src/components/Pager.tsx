import { computed, defineComponent, inject, withKeys } from 'vue';
import { cls, ComponentClassBlock, isNumber, useNamespace } from '@nio-fe/shared';
import { IconArrowLeft, IconArrowRight, IconToggleLeft, IconToggleRight } from '@nio-fe/icon';
import {
  NPaginationEmitInjectKey,
  NPaginationPropsInjectKey,
  NPaginationSlotsInjectKey,
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
    const parentProps = inject(NPaginationPropsInjectKey)!;
    const parentEmits = inject(NPaginationEmitInjectKey)!;
    const parentSlots = inject(NPaginationSlotsInjectKey)!;

    const currentPage = computed(() => props.currentPage!);

    function onPickPage(page: number | 'prev' | 'next') {
      if (parentProps.disabled) return false;

      if (page === 'prev') {
        emit('update:currentPage', Math.max(2, currentPage.value - (parentProps.pagerCount - 2)));
      } else if (page === 'next') {
        emit(
          'update:currentPage',
          Math.min(props.pages - 1, currentPage.value + (parentProps.pagerCount - 2)),
        );
      } else {
        if (page === currentPage.value) {
          parentEmits('clickCurrentPage', page);
        }

        emit('update:currentPage', page);
      }
    }

    function prevPage() {
      if (parentProps.disabled) return false;
      if (currentPage.value > 1) {
        onPickPage(currentPage.value - 1);
        parentEmits('clickPrevPage', currentPage.value - 1);
      }
    }

    function nextPage() {
      if (parentProps.disabled) return false;
      if (currentPage.value < props.pages) {
        onPickPage(currentPage.value + 1);
        parentEmits('clickNextPage', currentPage.value + 1);
      }
    }

    const pagesList = computed<Array<number | 'prev' | 'next'>>(() => {
      if (props.pages <= 1) {
        return [1];
      }

      const pages = new Set([1, props.pages, currentPage.value]);

      let left = 1;
      let right = 1;
      let current = 'left';
      while (pages.size < Math.min(parentProps.pagerCount, props.pages)) {
        if (current === 'left') {
          const temp = currentPage.value - left;
          temp > 1 && pages.add(temp);
          left++;
          current = 'right';
        } else {
          const temp = currentPage.value + right;
          temp < props.pages && pages.add(temp);
          right++;
          current = 'left';
        }
      }

      const res: Array<number | 'prev' | 'next'> = [...pages].sort((a, b) => a - b);

      if (res.length < props.pages) {
        for (let i = 1; i < res.length; i++) {
          const current = res[i];
          const prev = res[i - 1];
          if (isNumber(current) && isNumber(prev) && current - 1 !== prev) {
            if (current > currentPage.value) {
              res[i - 1] = 'next';
            } else {
              res[i] = 'prev';
            }
          }
        }
      }

      return res;
    });

    return () => (
      <div class={cls(classHelper.e('pager'))}>
        <div
          class={cls(
            classHelper.em('pager', 'item'),
            classHelper.is('prev'),
            classHelper.is('disabled', currentPage.value <= 1 || parentProps.disabled),
          )}
          tabindex={0}
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
            tabindex={0}
            data-num={num}
            onClick={() => onPickPage(num)}
            onKeyup={withKeys(() => onPickPage(num), ['enter'])}
          >
            {num === 'prev' ? (
              <div class={classHelper.em('pager', 'advance')}>
                <div class={cls(classHelper.em('pager', 'advance'), classHelper.is('origin'))}>
                  ...
                </div>
                <div class={cls(classHelper.em('pager', 'advance'), classHelper.is('icon'))}>
                  <IconToggleLeft size={12} />
                </div>
              </div>
            ) : num === 'next' ? (
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
          tabindex={0}
          onClick={nextPage}
          onKeyup={withKeys(nextPage, ['enter'])}
        >
          {parentSlots.next?.() ?? <IconArrowRight size={12} />}
        </div>
      </div>
    );
  },
});
