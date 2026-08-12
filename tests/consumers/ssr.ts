import { createElement } from 'react';
import { renderToString as renderReact } from 'react-dom/server';
import { createSSRApp, h } from 'vue';
import { renderToString as renderVue } from 'vue/server-renderer';
import { Button, Mask, Spin } from '@aurora/horizon-web-react';
import { HButton } from '@aurora/horizon-web-vue/es/components/Button';
import { HMask } from '@aurora/horizon-web-vue/es/components/Mask';
import { HSpin } from '@aurora/horizon-web-vue/es/components/Spin';

const reactHtml = renderReact(createElement(Button, null, 'React SSR'));
if (!reactHtml.includes('React SSR')) throw new Error('React SSR consumer failed.');

const reactMaskHtml = renderReact(createElement(Mask, { visible: false }, 'React Mask SSR'));
if (!reactMaskHtml.includes('React Mask SSR')) throw new Error('React Mask SSR consumer failed.');

const reactSpinHtml = renderReact(createElement(Spin, { spinning: false }, 'React Spin SSR'));
if (!reactSpinHtml.includes('React Spin SSR')) throw new Error('React Spin SSR consumer failed.');

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

console.info('Vue and React SSR consumers verified.');
