import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { HorizonWebProvides, defaultLocale } from '@aurora/horizon-web';
import { LocaleSupportLang } from '@aurora/locale';
import * as components from '../../../horizon-web/src/components';
import * as directives from '../../../horizon-web/src/directives';
import '../../../horizon-web/src/styles/index.scss';
import './tailwind.css';
import DemoBlock from '../components/DemoBlock.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    const getLocale = (path = typeof window === 'undefined' ? '/' : window.location.pathname) =>
      path === '/en' || path.startsWith('/en/')
        ? LocaleSupportLang.En
        : LocaleSupportLang.ZhCN;

    // VitePress toggles `dark` on <html>, while Horizon Web's design tokens
    // use `horizon-web-dark-mode`. Keep the component demos in sync with the
    // site appearance switch (including the initial system/localStorage state).
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const syncComponentTheme = () => {
        root.classList.toggle('horizon-web-dark-mode', root.classList.contains('dark'));
      };

      syncComponentTheme();
      const observer = new MutationObserver(syncComponentTheme);
      observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    }

    // Initialize the service with the route locale. This prevents a stale
    // locale from another demo/session from being visible during first render.
    app.use(HorizonWebProvides, { locale: { current: getLocale() } });

    // Keep Horizon Web's reactive locale in sync with VitePress's URL locale.
    const syncLocale = (path?: string) => {
      if (!defaultLocale.value) return;
      defaultLocale.value.current = getLocale(path);
    };

    syncLocale();
    router.onAfterRouteChange = async path => syncLocale(path);

    Object.values(components).forEach(component => {
      if (component.name) {
        app.component(component.name, component);
      }
    });

    Object.values(directives).forEach(directive => {
      app.use(directive);
    });

    app.component('DemoBlock', DemoBlock);
  },
} satisfies Theme;
