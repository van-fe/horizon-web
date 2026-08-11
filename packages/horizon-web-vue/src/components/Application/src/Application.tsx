import { defineComponent, inject, provide, ref, toRef, watch } from 'vue';
import type { ApplicationProps } from './composables/useProps';
import { useApplicationProps } from './composables/useProps';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import {
  GlobalSizeInjectedKey,
  HApplicationShowTimeZoneInjectedKey,
} from './utils/injectedKeys';
import type { ApplicationSlots } from './composables/useSlots';
import { useApplicationSlots } from './composables/useSlots';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  setNamespace,
  useNamespace,
  setPopupContainerGetter,
} from '@aurora/utils';

export default defineComponent({
  name: `${useNamespace()}Application`,
  desc: '被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到',
  descLocales: { en: "`Application` provides `locale` to its descendants. The demo keeps the selection local, so switching languages does not affect other examples on the documentation page. Open the date panel to compare month, weekday, and action labels." },
  props: useApplicationProps,
  slots: useApplicationSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, ApplicationSlots>) {
    const locale = inject(localeInjectKey, defaultLocale);

    const sizeRef = ref<ApplicationProps['size']>(props.size);

    provide(GlobalSizeInjectedKey, sizeRef);
    provide(HApplicationShowTimeZoneInjectedKey, toRef(props, 'showTimeZone'));

    watch(
      () => props.size,
      val => {
        sizeRef.value = val;
      },
    );

    watch(
      () => props.namespace,
      val => {
        val && setNamespace(val);
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.getPopupContainer,
      val => {
        val && setPopupContainerGetter(val);
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.locale,
      val => {
        if (val && locale.value) {
          locale.value.current = val;
        }
      },
      {
        immediate: true,
      },
    );

    return () => slots?.default?.();
  },
});
