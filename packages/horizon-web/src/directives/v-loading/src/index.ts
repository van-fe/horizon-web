import type { App, DirectiveBinding } from 'vue';
import { LoadingService } from './service';
import { defineDirective } from '@aurora/shared';
import type { LoadingOptions } from './composables/useOptions';
import { useLoadingOptions } from './composables/useOptions';
import { useSensor } from '~/utils/useSensor';
import { LoadingInstance, LoadingTimer, LoadingIsShow } from './utils/utils';

export interface LoadingElement extends HTMLElement {
  [LoadingInstance]?: {
    instance: App<Element>;
    close: () => void;
  };
  [LoadingTimer]?: ReturnType<typeof setTimeout>;
  [LoadingIsShow]?: boolean;
}

const createInstance = (el: LoadingElement, options: DirectiveBinding<Partial<LoadingOptions>>) => {
  if (el[LoadingIsShow] === true) {
    loadingClose(el);
  }

  const value = options.value;
  const delay = typeof value === 'object' ? value.delay ?? -1 : -1;

  el[LoadingIsShow] = true;

  if (delay > -1) {
    el[LoadingTimer] = setTimeout(() => {
      el[LoadingInstance] = LoadingService(el, options.value);
    }, delay);
  } else {
    el[LoadingInstance] = LoadingService(el, options.value);
  }
};

export function loadingClose(el: LoadingElement) {
  const instance = el[LoadingInstance];

  if (instance) {
    instance?.close();
  }

  if (el[LoadingTimer]) {
    clearTimeout(el[LoadingTimer]);
    el[LoadingTimer] = void 0;
  }

  el[LoadingInstance] = void 0;
}

export default defineDirective<LoadingElement, typeof useLoadingOptions | boolean>({
  name: 'loading',
  options: useLoadingOptions,
  desc: '用于页面和区块的加载中状态,页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑',
  mounted(el, binding) {
    useSensor('v-loading', binding.value, 'directive');

    const value = binding.value;

    if ((typeof value === 'boolean' && value) || (typeof value === 'object' && value.isShow)) {
      createInstance(el, binding);
    }
  },
  updated(el, binding) {
    const value = binding.value;

    if ((typeof value === 'boolean' && !value) || (typeof value === 'object' && !value.isShow)) {
      loadingClose(el);
    } else {
      createInstance(el, binding);
    }
  },
  unmounted(el: LoadingElement) {
    loadingClose(el);
  },
});
