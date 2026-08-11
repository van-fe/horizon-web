import { createApp } from 'vue';
import type { App } from 'vue';
import HLoadingComponent from './components/Loading';
import type { Data, ExtractDirectiveOptionTypes } from '@aurora/utils';
import { useZIndex } from '@aurora/utils';
import type { LoadingOptions, useLoadingOptions } from './composables/useOptions';
import type { LoadingElement } from './index';
import { LoadingIsShow } from './utils/utils';

export const LoadingService = function (el: LoadingElement, options: Partial<LoadingOptions>) {
  let app: App<Element> | null = createApp(HLoadingComponent, options as Data);
  const root = document.createElement('div');
  const elPosition = window.getComputedStyle(el, null).getPropertyValue('position');
  if (!elPosition || elPosition === 'static') {
    el.style.position = 'relative';
  }

  const zIndexHandler = useZIndex();

  let opt: Partial<ExtractDirectiveOptionTypes<typeof useLoadingOptions>>;

  if (typeof options === 'boolean') {
    opt = {
      isShow: true,
      size: 'medium',
      fullscreen: false,
      zIndex: zIndexHandler.next(),
    };
  } else {
    opt = options;

    if (!opt.hasOwnProperty('zIndex')) {
      opt.zIndex = zIndexHandler.next();
    }
  }

  if (opt.fullscreen) {
    root.style.position = 'fixed';
    root.style.width = '100vw';
    root.style.top = '0';
    root.style.left = '0';
    root.style.height = '100vh';
    root.style.zIndex = opt.zIndex?.toString() ?? zIndexHandler.next().toString();
  }

  el.appendChild(root);
  app?.mount(root);

  return {
    instance: app,
    close: () => {
      el[LoadingIsShow] = false;
      el?.removeChild(root);
      app?.unmount();
      app = null;
    },
  };
};
