import defaults from './defaults';
import './components/globalComponents';
import versions from './version.json';
export default defaults.install;
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
export { type LegoOption, defineOption } from './makeInstaller';
export * from './globalMethods';
export * from './injectedKeys';
