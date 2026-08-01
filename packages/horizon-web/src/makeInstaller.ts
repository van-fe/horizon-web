import type { App, Plugin } from 'vue';
import type { LocalOptionType } from '@aurora/locale-vue';
import provides from '~/provides';
import version from './version.json';
import methodsRegister from './methods';

export interface HorizonWebOption {
  locale?: LocalOptionType;
}

export function defineOption(option: HorizonWebOption): HorizonWebOption {
  return option;
}

export interface HorizonWebInstaller {
  install: (app: App, options?: HorizonWebOption) => App;
  version: string;
}

const INSTALLED_KEY = Symbol('INSTALLED_KEY');

export default function makeInstaller(plugins: Plugin[] | (() => Plugin[]) = []): HorizonWebInstaller {
  const install = (app: App, options?: HorizonWebOption) => {
    if (app[INSTALLED_KEY]) return app;

    app[INSTALLED_KEY] = true;
    const resolvedPlugins = typeof plugins === 'function' ? plugins() : plugins;
    resolvedPlugins.forEach(plugin => app.use(plugin, options));

    app.use(provides, options);
    app.use(methodsRegister);

    return app;
  };

  return {
    install,
    version: version.version,
  };
}

declare module '@vue/runtime-core' {
  interface App {
    [INSTALLED_KEY]: boolean;
  }
}
