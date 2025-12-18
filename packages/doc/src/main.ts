import * as Vue from 'vue';
import { createApp } from 'vue';
import { NIcon, NIconSVG } from '@aurora/icon';
import { NTable } from '@aurora/horizon-web-table';
import '@aurora/horizon-web-table/dist/style.css';
import App from './App.vue';
import { router } from './routes';
import './styles/index.scss';
import './styles/forward.scss';
import { setCssVariableUseVersion } from '@aurora/shared';
import Lego from '@aurora/horizon-web';
import LegoPad from '@aurora/horizon-web-pad';
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
  .component('NIcon', NIcon)
  .component('NIconSVG', NIconSVG)
  .component('NTable', NTable)
  .component('DeprecatedTips', DeprecatedTips)
  .component('VersionTips', VersionTips)
  .component('CopyBtn', CopyBtn)
  .use(Lego)
  .use(LegoPad)
  .use(router);

app.mount('#app');
window.Vue = Vue;

declare global {
  interface Window {
    Vue: typeof Vue;
  }
}
