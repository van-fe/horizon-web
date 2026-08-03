import defaults from './defaults';
import './components/globalComponents';
import versions from './version.json';
import type { App } from 'vue';
import type { HorizonWebOption } from './makeInstaller';

const install = (app: App, options?: HorizonWebOption) =>
  defaults.install(app, options);

export default install;
export const version = versions.version;

export * from './components';
export * from './directives';
export * from './methods';
export * from './locales';
export * from './components/globalTypes';
export * from './components/props';
export * from './components/emits';
export * from './components/slots';
export * from './components/exposes';
export { type HorizonWebOption, defineOption } from './makeInstaller';
export * from './globalMethods';
export * from './injectedKeys';
