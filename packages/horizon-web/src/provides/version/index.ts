import type { App } from 'vue';
import versions from '../../version.json';

export default function versionProvide(app: App) {
  console.info(`Thanks for using Horizon Web, the current version is ${versions.version}.`);
  console.info(
    'If you have any problem or feature request, please go to https://github.com/van-fe/horizon-web/issues',
  );

  return app;
}
