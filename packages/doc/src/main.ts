import * as Vue from 'vue';
import { createApp } from 'vue';
import { AIcon } from '@aurora/icon';
import '@aurora/horizon-web-table/dist/style.css';
import App from './App.vue';
import { router } from './routes';
import './styles/index.scss';
import './styles/forward.scss';
import { setCssVariableUseVersion } from '@aurora/utils';
import HorizonWeb from '@aurora/horizon-web';
import DeprecatedTips from '~/components/Common/DeprecatedTips.vue';
import VersionTips from '~/components/Common/VersionTips.vue';
import CopyBtn from '~/components/Common/CopyBtn.vue';

// if (
//   getEnvAndRegion().env === 'prod' &&
//   !['localhost', '127.0.0.1'].some(curr => window.location.hostname.includes(curr))
// ) {
//   window.location.replace('https://design-system.nioint.com/');
// }

setCssVariableUseVersion(false);

const app = createApp(App)
  .component('AIcon', AIcon)
  .component('DeprecatedTips', DeprecatedTips)
  .component('VersionTips', VersionTips)
  .component('CopyBtn', CopyBtn)
  .use(HorizonWeb)
  .use(router);

app.mount('#app');
window.Vue = Vue;

declare global {
  interface Window {
    Vue: typeof Vue;
  }
}
