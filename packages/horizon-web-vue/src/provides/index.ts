import localizableProvide from './localable';
import versionProvide from './version';
import type { App } from 'vue';
import type { HorizonWebOption } from '~/makeInstaller';
export { default as localizableProvide, localeInjectKey, defaultLocale } from './localable';

export default {
  install(app: App, options?: HorizonWebOption) {
    localizableProvide(app, options);
    versionProvide(app);

    return app;
  },
};
