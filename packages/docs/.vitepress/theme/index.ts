import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { HorizonWebProvides } from '@aurora/horizon-web';
import * as components from '@aurora/horizon-web/es/components';
import * as directives from '@aurora/horizon-web/es/directives';
import '@aurora/horizon-web/src/styles/index-basic-no-font.scss';
import DemoBlock from '../components/DemoBlock.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    app.use(HorizonWebProvides);

    Object.values(components).forEach(component => {
      app.component(component.name, component);
    });

    Object.values(directives).forEach(directive => {
      app.use(directive);
    });

    app.component('DemoBlock', DemoBlock);
  },
} satisfies Theme;