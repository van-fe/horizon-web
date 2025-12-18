import type { App } from 'vue';
import versions from '../../version.json';

export default function versionProvide(app: App) {
  console.info(`Thanks for using Lego-web, the current version is ${versions.version}.`);
  console.info(
    'If you have any problem or feature request, please go to https://fx.nioint.com/pages/lego-web-issue-tracker/',
  );

  return app;
}
