import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { HorizonWebProvides } from '@aurora/horizon-web';
import * as components from '@aurora/horizon-web/src/components';
import * as directives from '@aurora/horizon-web/src/directives';
import '@aurora/horizon-web/src/styles/index.scss';
import './tailwind.css';
import DemoBlock from '../components/DemoBlock.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    app.use(HorizonWebProvides);

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