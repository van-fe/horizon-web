import type { App, Plugin } from 'vue';
import version from './version.json';

const PAD_INSTALLED_KEY = Symbol('LEGO_PAD_INSTALLED_KEY');

export default function makeInstaller(plugins: Plugin[] = []) {
  const install = (app: App) => {
    if (app[PAD_INSTALLED_KEY]) return app;

    app[PAD_INSTALLED_KEY] = true;
    plugins.forEach(plugin => app.use(plugin));

    return app;
  };

  return {
    install,
    version: version.version,
  };
}

declare module '@vue/runtime-core' {
  interface App {
    [PAD_INSTALLED_KEY]: boolean;
  }
}
