import { computed, defineComponent, inject, provide, watch } from 'vue';
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
import {
  HApplicationContextInjectedKey,
  type HApplicationContext,
} from './applicationContext';

export default defineComponent({
  name: `${useNamespace()}Application`,
  desc: '被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到',
  descLocales: { en: "`Application` provides `locale` to its descendants. The demo keeps the selection local, so switching languages does not affect other examples on the documentation page. Open the date panel to compare month, weekday, and action labels." },
  props: useApplicationProps,
  slots: useApplicationSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, ApplicationSlots>) {
    const locale = inject(localeInjectKey, defaultLocale);
    const parentApplicationContext = inject(HApplicationContextInjectedKey, undefined);
    const applicationContext: HApplicationContext = {
      locale: computed(() => props.locale ?? parentApplicationContext?.locale.value),
      size: computed(() => props.size ?? parentApplicationContext?.size.value),
      namespace: computed(() => props.namespace ?? parentApplicationContext?.namespace.value),
      getPopupContainer: computed(
        () => props.getPopupContainer ?? parentApplicationContext?.getPopupContainer.value,
      ),
      showTimeZone: computed(
        () => props.showTimeZone ?? parentApplicationContext?.showTimeZone.value,
      ),
    };

    provide(HApplicationContextInjectedKey, applicationContext);
    provide(GlobalSizeInjectedKey, applicationContext.size);
    provide(HApplicationShowTimeZoneInjectedKey, applicationContext.showTimeZone);

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
