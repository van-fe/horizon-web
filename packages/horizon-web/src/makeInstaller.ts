import type { App, Plugin } from 'vue';
import type { LocalOptionType } from '@aurora/locale-vue';
import provides from '~/provides';
import version from './version.json';
import methodsRegister from './methods';

export interface HorizonWebOption {
  locale?: LocalOptionType;
  /**
   * 是否让 css 变量中存在版本号
   */
  cssVariableUseVersion?: boolean;
  /**
   * css 变量使用版本的存储的 key
   */
  cssVariableUseVersionStoreKey?: string;
}

export function defineOption(option: HorizonWebOption): HorizonWebOption {
  return option;
}

const INSTALLED_KEY = Symbol('INSTALLED_KEY');

export default function makeInstaller(plugins: Plugin[] = []) {
  const install = (app: App, options?: HorizonWebOption) => {
    if (app[INSTALLED_KEY]) return app;

    app[INSTALLED_KEY] = true;
    plugins.forEach(plugin => app.use(plugin, options));

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
