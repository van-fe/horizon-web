import { createElement } from 'react';
import { renderToString as renderReact } from 'react-dom/server';
import { createSSRApp, h } from 'vue';
import { renderToString as renderVue } from 'vue/server-renderer';
import { Button, Mask } from '@aurora/horizon-web-react';
import { HButton } from '@aurora/horizon-web-vue/es/components/Button';
import { HMask } from '@aurora/horizon-web-vue/es/components/Mask';

const reactHtml = renderReact(createElement(Button, null, 'React SSR'));
if (!reactHtml.includes('React SSR')) throw new Error('React SSR consumer failed.');

const reactMaskHtml = renderReact(createElement(Mask, { visible: false }, 'React Mask SSR'));
if (!reactMaskHtml.includes('React Mask SSR')) throw new Error('React Mask SSR consumer failed.');

const vueHtml = await renderVue(createSSRApp({ render: () => h(HButton, null, () => 'Vue SSR') }));
if (!vueHtml.includes('Vue SSR')) throw new Error('Vue SSR consumer failed.');

const vueMaskHtml = await renderVue(
  createSSRApp({ render: () => h(HMask, { value: false }, () => 'Vue Mask SSR') }),
);
if (!vueMaskHtml.includes('Vue Mask SSR')) throw new Error('Vue Mask SSR consumer failed.');

console.info('Vue and React SSR consumers verified.');
