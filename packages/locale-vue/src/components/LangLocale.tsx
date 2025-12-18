import type { PropType } from 'vue';
import { defineComponent, getCurrentInstance } from 'vue';
import type { LocaleSupportLangV2 } from '@nio-fe/locale';
import { useNamespace } from '@nio-fe/shared';

export default defineComponent({
  name: `${useNamespace()}LangLocale`,
  props: {
    value: {
      type: String,
      required: true,
    },
    lang: {
      type: String as PropType<LocaleSupportLangV2>,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance()!;
    return () => <div class="lego-date-locale">{proxy!.$root!.t(props.value, props.lang)}</div>;
  },
});
