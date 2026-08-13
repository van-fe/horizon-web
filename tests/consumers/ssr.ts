import { createElement } from 'react';
import { renderToString as renderReact } from 'react-dom/server';
import { createSSRApp, h } from 'vue';
import { renderToString as renderVue } from 'vue/server-renderer';
import {
  Button,
  DescriptionItem,
  Descriptions,
  List,
  ListItem,
  Mask,
  PageHeader,
  Panel,
  Panels,
  Spin,
  Time,
  Tree,
} from '@aurora/horizon-web-react';
import { HButton } from '@aurora/horizon-web-vue/es/components/Button';
import { HMask } from '@aurora/horizon-web-vue/es/components/Mask';
import { HSpin } from '@aurora/horizon-web-vue/es/components/Spin';
import { HTime } from '@aurora/horizon-web-vue/es/components/Time';
import {
  HDescriptionItem,
  HDescriptions,
} from '@aurora/horizon-web-vue/es/components/Descriptions';
import { HList, HListItem } from '@aurora/horizon-web-vue/es/components/List';
import { HPageHeader } from '@aurora/horizon-web-vue/es/components/PageHeader';
import { HPanel, HPanels } from '@aurora/horizon-web-vue/es/components/Panels';
import { HTree } from '@aurora/horizon-web-vue/es/components/Tree';

const reactHtml = renderReact(createElement(Button, null, 'React SSR'));
if (!reactHtml.includes('React SSR')) throw new Error('React SSR consumer failed.');

const reactMaskHtml = renderReact(createElement(Mask, { visible: false }, 'React Mask SSR'));
if (!reactMaskHtml.includes('React Mask SSR')) throw new Error('React Mask SSR consumer failed.');

const reactSpinHtml = renderReact(createElement(Spin, { spinning: false }, 'React Spin SSR'));
if (!reactSpinHtml.includes('React Spin SSR')) throw new Error('React Spin SSR consumer failed.');

const reactTimeHtml = renderReact(
  createElement(Time, { calculative: true, time: 10, endTime: 15 }, 'React Time SSR'),
);
if (!reactTimeHtml.includes('React Time SSR')) throw new Error('React Time SSR consumer failed.');

const reactTreeHtml = renderReact(
  createElement(Tree, {
    defaultTreeData: [{ value: 'ready', label: 'React Tree SSR' }],
  }),
);
if (!reactTreeHtml.includes('React Tree SSR')) throw new Error('React Tree SSR consumer failed.');

const reactDescriptionsHtml = renderReact(
  createElement(
    Descriptions,
    { title: 'React Descriptions SSR' },
    createElement(DescriptionItem, { label: 'Status', value: 'Ready' }),
  ),
);
if (!reactDescriptionsHtml.includes('React Descriptions SSR'))
  throw new Error('React Descriptions SSR consumer failed.');

const reactListHtml = renderReact(
  createElement(List, { header: 'React List SSR' }, createElement(ListItem, { title: 'Ready' })),
);
if (!reactListHtml.includes('React List SSR')) throw new Error('React List SSR consumer failed.');

const reactPageHeaderHtml = renderReact(
  createElement(PageHeader, { title: 'React PageHeader SSR', showBack: false }),
);
if (!reactPageHeaderHtml.includes('React PageHeader SSR'))
  throw new Error('React PageHeader SSR consumer failed.');

const reactPanelsHtml = renderReact(
  createElement(
    Panels,
    { value: 'ready' },
    createElement(Panel, { name: 'ready' }, 'React Panels SSR'),
  ),
);
if (!reactPanelsHtml.includes('React Panels SSR'))
  throw new Error('React Panels SSR consumer failed.');

const vueHtml = await renderVue(createSSRApp({ render: () => h(HButton, null, () => 'Vue SSR') }));
if (!vueHtml.includes('Vue SSR')) throw new Error('Vue SSR consumer failed.');

const vueMaskHtml = await renderVue(
  createSSRApp({ render: () => h(HMask, { value: false }, () => 'Vue Mask SSR') }),
);
if (!vueMaskHtml.includes('Vue Mask SSR')) throw new Error('Vue Mask SSR consumer failed.');

const vueSpinHtml = await renderVue(
  createSSRApp({ render: () => h(HSpin, { spinning: false }, () => 'Vue Spin SSR') }),
);
if (!vueSpinHtml.includes('Vue Spin SSR')) throw new Error('Vue Spin SSR consumer failed.');

const vueTimeHtml = await renderVue(
  createSSRApp({
    render: () => h(HTime, { calculative: true, time: 10, endTime: 15 }, () => 'Vue Time SSR'),
  }),
);
if (!vueTimeHtml.includes('Vue Time SSR')) throw new Error('Vue Time SSR consumer failed.');

const vueTreeHtml = await renderVue(
  createSSRApp({
    render: () => h(HTree, { treeData: [{ value: 'ready', label: 'Vue Tree SSR' }] }),
  }),
);
if (!vueTreeHtml.includes('Vue Tree SSR')) throw new Error('Vue Tree SSR consumer failed.');

const vueDescriptionsHtml = await renderVue(
  createSSRApp({
    render: () =>
      h(HDescriptions, { title: 'Vue Descriptions SSR' }, () => [
        h(HDescriptionItem, { label: 'Status', value: 'Ready' }),
      ]),
  }),
);
if (!vueDescriptionsHtml.includes('Vue Descriptions SSR'))
  throw new Error('Vue Descriptions SSR consumer failed.');

const vueListHtml = await renderVue(
  createSSRApp({
    render: () => h(HList, null, () => [h(HListItem, { title: 'Vue List SSR' })]),
  }),
);
if (!vueListHtml.includes('Vue List SSR')) throw new Error('Vue List SSR consumer failed.');

const vuePageHeaderHtml = await renderVue(
  createSSRApp({ render: () => h(HPageHeader, { title: 'Vue PageHeader SSR', icon: null }) }),
);
if (!vuePageHeaderHtml.includes('Vue PageHeader SSR'))
  throw new Error('Vue PageHeader SSR consumer failed.');

const vuePanelsHtml = await renderVue(
  createSSRApp({
    render: () =>
      h(HPanels, { modelValue: 'ready' }, () => [
        h(HPanel, { name: 'ready' }, () => 'Vue Panels SSR'),
      ]),
  }),
);
if (!vuePanelsHtml.includes('Vue Panels SSR')) throw new Error('Vue Panels SSR consumer failed.');

console.info('Vue and React SSR consumers verified.');
