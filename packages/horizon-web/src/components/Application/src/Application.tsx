import { defineComponent, inject, onBeforeUnmount, provide, ref, toRef, watch } from 'vue';
import type { ApplicationProps } from './composables/useProps';
import { useApplicationProps } from './composables/useProps';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import {
  GlobalSizeInjectedKey,
  NApplicationCompatibilityInjectedKey,
  NApplicationShowTimeZoneInjectedKey,
} from './utils/injectedKeys';
import type { ApplicationSlots } from './composables/useSlots';
import { useApplicationSlots } from './composables/useSlots';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  ComponentClassBlock,
  setNamespace,
  useNamespace,
  cssVariable,
  setPopupContainerGetter,
} from '@aurora/utils';

export default defineComponent({
  name: `${useNamespace()}Application`,
  desc: '被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到',
  props: useApplicationProps,
  slots: useApplicationSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, ApplicationSlots>) {
    const locale = inject(localeInjectKey, defaultLocale);

    const sizeRef = ref<ApplicationProps['size']>(props.size);
    const compatibilityRef = ref<ApplicationProps['compatibility']>(props.compatibility);

    provide(GlobalSizeInjectedKey, sizeRef);
    provide(NApplicationCompatibilityInjectedKey, compatibilityRef);
    provide(NApplicationShowTimeZoneInjectedKey, toRef(props, 'showTimeZone'));

    watch(
      () => props.size,
      val => {
        sizeRef.value = val;
      },
    );

    watch(
      () => props.compatibility,
      val => {
        compatibilityRef.value = val;
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

    let styleScript: HTMLStyleElement | null = null;

    function removeStyleScript() {
      if (styleScript) {
        document.head.removeChild(styleScript);
        styleScript = null;
      }
    }

    watch(
      () => props.useButtonSpacing,
      val => {
        removeStyleScript();

        if (val) {
          const buttonClassHelper = new ComponentClassBlock('button');
          const buttonGroupClassHelper = new ComponentClassBlock('button-group');
          styleScript = document.createElement('style');
          styleScript.textContent = `
.${buttonClassHelper.block} + .${buttonClassHelper.block}:not(.${buttonClassHelper.m('block')}) {
 margin-left: ${cssVariable('spacing-4')}; 
}
.${buttonGroupClassHelper.block} + .${buttonGroupClassHelper.block} {
 margin-left: ${cssVariable('spacing-4')}; 
}
`;

          document.head.appendChild(styleScript);
        }
      },
      {
        immediate: true,
      },
    );

    onBeforeUnmount(() => {
      removeStyleScript();
    });

    return () => slots?.default?.();
  },
});
