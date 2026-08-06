import type { PropType } from 'vue';
import { defineComponent, getCurrentInstance } from 'vue';
import type { LocaleSupportLang } from '@aurora/locale';
import { useNamespace } from '@aurora/utils';

export default defineComponent({
  name: `${useNamespace()}LangLocale`,
  props: {
    value: {
      type: String,
      required: true,
    },
    lang: {
      type: String as PropType<LocaleSupportLang>,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance()!;
    return () => (
      <div class="horizon-web-lang-locale">{proxy!.$root!.t(props.value, props.lang)}</div>
    );
  },
});
