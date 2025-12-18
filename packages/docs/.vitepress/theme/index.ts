import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { LegoProvides } from '@nio-fe/lego';
import * as components from '@nio-fe/lego/es/components';
import * as directives from '@nio-fe/lego/es/directives';
import '@nio-fe/lego/src/styles/index-basic-no-font.scss';
import DemoBlock from '../components/DemoBlock.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    app.use(LegoProvides);

    Object.values(components).forEach(component => {
      app.component(component.name, component);
    });

    Object.values(directives).forEach(directive => {
      app.use(directive);
    });

    app.component('DemoBlock', DemoBlock);
  },
} satisfies Theme;