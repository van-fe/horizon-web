import localizableProvide from './localable';
import sensorProvider from './sensor';
import versionProvide from './version';
import type { App } from 'vue';
import type { LegoOption } from '~/makeInstaller';
import { isDefined, setCssVariableUseVersion } from '@aurora/shared';
export { default as localizableProvide, localeInjectKey, defaultLocale } from './localable';
export { sensorTracker, sensorInjectKey } from './sensor';

export default {
  install(app: App, options?: LegoOption) {
    localizableProvide(app, options);
    sensorProvider(app, options);
    versionProvide(app);

    if (isDefined(options?.cssVariableUseVersion)) {
      setCssVariableUseVersion(
        options!.cssVariableUseVersion,
        options?.cssVariableUseVersionStoreKey,
      );
    }

    return app;
  },
};
