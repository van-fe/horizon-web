import { defineComponent, inject } from 'vue';
import { localeInjectKey } from '~/injectedKeys';
import { defaultLocale } from '~/provides/localable';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { NPaginationPropsInjectKey } from '../utils/injectKeys';

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
    const parentProps = inject(NPaginationPropsInjectKey)!;

    return () => (
      <div class={classHelper.e('total')}>
        {parentProps.showRange && parentProps.type === 'default'
          ? locale.value?.langService
              .td()
              .horizonWeb.pagination.rangeTotal.replace('{total}', parentProps.total.toString())
              .replace('{range}', props.range)
          : locale.value?.langService
              .td()
              .horizonWeb.pagination.total.replace('{total}', parentProps.total.toString())}
      </div>
    );
  },
});
