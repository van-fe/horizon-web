import type { PropType } from 'vue';
import { defineComponent, getCurrentInstance } from 'vue';
import type { LocaleNumberFormatterOptions } from '@aurora/locale';
import { useNamespace } from '@aurora/shared';

export default defineComponent({
  name: `${useNamespace()}NumberLocale`,
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    option: {
      type: Object as PropType<LocaleNumberFormatterOptions>,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance()!;
    return () => (
      <div class="horizon-web-number-locale">{proxy!.$root?.n(Number(props.value), props.option)}</div>
    );
  },
});
