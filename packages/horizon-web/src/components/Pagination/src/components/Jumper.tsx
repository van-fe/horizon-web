import { defineComponent, inject, nextTick, PropType, ref, withKeys } from 'vue';
import { ComponentClassBlock, isNumber, useNamespace } from '@aurora/utils';
import { defaultLocale, localeInjectKey } from '~/provides';
import { NPaginationEmitInjectKey, NPaginationPropsInjectKey } from '../utils/injectKeys';
import NInputNumber from '~/components/InputNumber/src/InputNumber';

export default defineComponent({
  name: `${useNamespace()}PaginationJumper`,
  props: {
    pages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
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
    const locale = inject(localeInjectKey, defaultLocale);
    const parentProps = inject(NPaginationPropsInjectKey)!;
    const parentEmits = inject(NPaginationEmitInjectKey)!;

    const inputNumberRef = ref<null | typeof NInputNumber>(null);

    const jumpTo = ref();

    function changeCurrentPage() {
      if (!jumpTo.value) return;

      if (jumpTo.value !== props.currentPage) {
        emit('update:currentPage', jumpTo.value);
        parentEmits('jump', jumpTo.value);
      }

      if (inputNumberRef.value) {
        inputNumberRef.value.clear?.();
        void nextTick(() => {
          inputNumberRef.value?.blur?.();
        });
      }
    }

    return () => (
      <div class={classHelper.e('jumper')}>
        {parentProps.label?.jumpPrefixText ??
          parentProps.label?.jump_prefix_text ??
          locale.value?.langService.td().horizon-web.pagination.goto}
        <NInputNumber
          ref={inputNumberRef}
          v-model={jumpTo.value}
          size={props.size}
          controls={false}
          placeholder=""
          disabled={parentProps.disabled}
          min={Math.min(1, props.pages)}
          max={Math.max(1, props.pages)}
          stepStrictly={true}
          precision={0}
          onBlur={changeCurrentPage}
          onKeyup={withKeys(changeCurrentPage, ['enter'])}
        />
        {parentProps.label?.jumpSuffixText ??
          parentProps.label?.jump_suffix_text ??
          locale.value?.langService.td().horizon-web.pagination.pageClassifier}
      </div>
    );
  },
});
