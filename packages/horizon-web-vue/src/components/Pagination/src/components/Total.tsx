import { defineComponent, inject } from 'vue';
import { localeInjectKey } from '~/injectedKeys';
import { defaultLocale } from '~/provides/localable';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { HPaginationPropsInjectKey } from '../utils/injectKeys';
import { formatPaginationLabel, PAGINATION_DEFAULT_LABELS } from '@aurora/core';

export default defineComponent({
  name: `${useNamespace()}PaginationTotal`,
  props: {
    range: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('pagination');
    const locale = inject(localeInjectKey, defaultLocale);
    const parentProps = inject(HPaginationPropsInjectKey)!;

    return () => (
      <div class={classHelper.e('total')}>
        {formatPaginationLabel(
          parentProps.showRange && parentProps.type === 'default'
            ? (locale.value?.langService.td().horizonWeb.pagination.rangeTotal ??
                PAGINATION_DEFAULT_LABELS.rangeTotal)
            : (locale.value?.langService.td().horizonWeb.pagination.total ??
                PAGINATION_DEFAULT_LABELS.total),
          { total: parentProps.total, range: props.range },
        )}
      </div>
    );
  },
});
