import type { PropType } from 'vue';
import { defineComponent, getCurrentInstance } from 'vue';
import type { LocaleNumberFormatterOptions } from '@nio-fe/locale';
import { useNamespace } from '@nio-fe/shared';

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
      <div class="lego-number-locale">{proxy!.$root?.n(Number(props.value), props.option)}</div>
    );
  },
});
