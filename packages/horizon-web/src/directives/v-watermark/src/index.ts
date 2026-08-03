import type { DirectiveBinding, App } from 'vue';
import { createApp } from 'vue';
import { defineDirective } from '@aurora/utils';
import type { WatermarkOptions } from './composables/useOptions';
import { useWatermarkOptions } from './composables/useOptions';
import Watermark from '~/components/Watermark/src/Watermark';
import { transOptions } from './utils/base';

const INS = Symbol('HWatermark');
const DOM_WRAP = Symbol('HWatermark_DomWrap');

export interface WatermarkElement extends HTMLElement {
  [INS]?: App<Element>;
  [DOM_WRAP]?: HTMLElement;
}

const watermarkFunc = (
  el: WatermarkElement,
  binding: DirectiveBinding<string | string[] | Partial<WatermarkOptions>>,
) => {
  const resOptions = transOptions(binding.value);

  if (!resOptions.global) {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
  }
  el[INS]?.unmount();
  el[DOM_WRAP]?.remove();
  el[INS] = createApp(Watermark, { ...resOptions, container: el });
  el[DOM_WRAP] = document.createElement('div');
  el[INS].mount(el[DOM_WRAP]);
  el.appendChild(el[DOM_WRAP]);
};

export default defineDirective<WatermarkElement, typeof useWatermarkOptions | string | string[]>({
  name: 'watermark',
  options: useWatermarkOptions,
  desc: '`v-watermark` 是 `watermark` 组件的指令使用方式',
  mounted: watermarkFunc,
  updated: watermarkFunc,
  unmounted(el) {
    el[INS]?.unmount();
    el[DOM_WRAP]?.remove();
  },
});
