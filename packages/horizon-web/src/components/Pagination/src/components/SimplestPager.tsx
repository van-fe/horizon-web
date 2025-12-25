import { computed, defineComponent, inject, PropType, withKeys } from 'vue';
import { cls, ComponentClassBlock, isNumber, useNamespace } from '@aurora/utils';
import { IconArrowLeft, IconArrowRight } from '@aurora/icon';
import {
  HPaginationEmitInjectKey,
  HPaginationPropsInjectKey,
  HPaginationSlotsInjectKey,
} from '../utils/injectKeys';
import HInputNumber from '~/components/InputNumber/src/InputNumber';

export default defineComponent({
  name: `${useNamespace()}PaginationSimplestPager`,
  components: {
    HInputNumber,
  },
  props: {
    currentPage: {
      type: Number,
    },
    pages: {
      type: Number,
      required: true,
    },
    size: {
      type: String as PropType<'small' | 'medium'>,
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

    function onPickPage(page: number | null | string | undefined) {
      page = Number(page);
      if (page) {
        if (page === currentPage.value) {
          parentEmits('clickCurrentPage', page);
        }
        emit('update:currentPage', page);
      }
    }

    function prevPage() {
      if (currentPage.value > 1) {
        onPickPage(currentPage.value - 1);
        parentEmits('clickPrevPage', currentPage.value - 1);
      }
    }

    function nextPage() {
      if (currentPage.value < props.pages) {
        onPickPage(currentPage.value + 1);
        parentEmits('clickNextPage', currentPage.value + 1);
      }
    }

    return () => (
      <div class={classHelper.e('simplest-pager')}>
        <div
          class={cls(
            classHelper.em('simplest-pager', 'item'),
            classHelper.is('clickable'),
            classHelper.is('disabled', currentPage.value <= 1),
          )}
          tabindex={0}
          onClick={prevPage}
          onKeyup={withKeys(prevPage, ['enter'])}
        >
          {parentSlots.prev?.() ?? <IconArrowLeft size={12} />}
        </div>
        <div class={cls(classHelper.em('simplest-pager', 'item'))}>
          <HInputNumber
            modelValue={currentPage.value}
            controls={false}
            size={props.size}
            disabled={parentProps.disabled}
            min={1}
            max={Math.max(props.pages, 1)}
            stepStrictly={true}
            precision={0}
            onKeyup={withKeys(() => onPickPage(currentPage.value), ['enter'])}
            onUpdate:modelValue={onPickPage}
          />
        </div>
        <div class={cls(classHelper.em('simplest-pager', 'split'))}>/</div>
        <div class={cls(classHelper.em('simplest-pager', 'item'))}>{props.pages}</div>
        <div
          class={cls(
            classHelper.em('simplest-pager', 'item'),
            classHelper.is('clickable'),
            classHelper.is('disabled', currentPage.value >= props.pages),
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
