import type { PropType } from 'vue';
import { defineComponent, getCurrentInstance } from 'vue';
import type { DateLocaleAvailableShownType } from '@nio-fe/locale';
import { useNamespace } from '@nio-fe/shared';

export default defineComponent({
  name: `${useNamespace()}DateLocale`,
  props: {
    value: {
      type: [String, Number, Date],
      required: true,
    },
    type: {
      type: String as PropType<DateLocaleAvailableShownType>,
      required: true,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance()!;
    return () => <div class="lego-date-locale">{proxy!.$root?.d(props.value, props.type)}</div>;
  },
});
