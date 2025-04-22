import * as Vue from 'vue';
import { createApp } from 'vue';
import { NIcon, NIconSVG } from '@nio-fe/icon';
import { NTableV2 } from '@nio-fe/lego-table-v2';
import '@nio-fe/lego-table-v2/dist/style.css';
import App from './App.vue';
import { router } from './routes';
import './styles/index.scss';
import './styles/forward.scss';
import { setCssVariableUseVersion } from '@nio-fe/shared';
import Lego from '@nio-fe/lego';
import LegoPad from '@nio-fe/lego-pad';
import DeprecatedTips from '~/components/Common/DeprecatedTips.vue';
import VersionTips from '~/components/Common/VersionTips.vue';
import CopyBtn from '~/components/Common/CopyBtn.vue';

setCssVariableUseVersion(false);

const app = createApp(App)
  .component('NIcon', NIcon)
  .component('NIconSVG', NIconSVG)
  .component('NTableV2', NTableV2)
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
