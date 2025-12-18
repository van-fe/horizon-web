import { createVNode, cloneVNode, render } from 'vue';
import type { DirectiveBinding, VNode } from 'vue';
import { defineDirective, useZIndex, usePopupContainerGetter } from '@aurora/shared';
import { usePopper } from '~/utils/popper';
import Popconfirm from './components/Popconfirm';
import type { PopConfirmOptions } from './composables/useOptions';
import { usePopConfirmOptions } from './composables/useOptions';
import { useSensor } from '~/utils/useSensor';

const bindingValueSymbol = Symbol('popconfirm binding value');

export interface PopconfirmEl extends HTMLElement {
  popconfirmClick: (e: Event) => void;
  popconfirmNode: VNode;
  popconfirmInstance: any;
  container: HTMLElement;
  [bindingValueSymbol]: DirectiveBinding<Partial<PopConfirmOptions>>['value'] | string;
}

const popconfirmHandler = (el: PopconfirmEl, vNode: VNode, e: Event) => {
  let options: PopConfirmOptions = {
    title: undefined,
    placement: 'top',
    type: 'warning',
    iconName: undefined,
    iconSize: undefined,
    iconColor: undefined,
    okText: undefined,
    okButtonProps: {},
    cancelText: undefined,
    cancelButtonProps: {},
    toBody: true,
    zIndex: useZIndex().next(),
  };

  const bindingValue = el[bindingValueSymbol];

  if (typeof bindingValue === 'string') {
    options.title = bindingValue;
  } else if (typeof bindingValue === 'object') {
    options = { ...options, ...bindingValue };
  }
  // 如果存在 popper 实例则销毁
  if (el.popconfirmInstance) {
    el.popconfirmInstance.destroy();
  }

  let container: null | HTMLElement = document.createElement('div');

  function destroy() {
    if (container) {
      render(null, container);
      container.remove();
      container = null;
    }
    el.popconfirmInstance.destroy();
  }

  const popconfirmNode = createVNode(Popconfirm, {
    ...options,
    onCancel: (evt?: MouseEvent) => {
      evt?.stopPropagation();
      destroy();
    },
    onOk: (evt?: MouseEvent) => {
      evt?.stopPropagation();
      vNode.props?.onClick(e);
      destroy();
    },
  });

  let root = document.body;
  const popupContainerGetter = usePopupContainerGetter();

  if (popupContainerGetter.value) root = popupContainerGetter.value();
  else if (!options.toBody) root = el;

  el.popconfirmNode = popconfirmNode;
  el.container = container;
  root.appendChild(container);
  render(popconfirmNode, container);

  el.popconfirmInstance = usePopper(el, popconfirmNode.el as HTMLElement, {
    placement: options.placement,
    arrow: true,
    distance: 8,
    // flip
  });
};

export default defineDirective<PopconfirmEl, typeof usePopConfirmOptions | string>({
  name: 'popconfirm',
  options: usePopConfirmOptions,
  desc: '用于二次确认场景，会在点击元素上弹出浮层进行提示确认',
  created(el, binding, vNode) {
    useSensor('v-popconfirm', binding.value, 'directive');

    el[bindingValueSymbol] = binding.value;

    el.popconfirmClick = (e: Event) => {
      e.stopImmediatePropagation();
      popconfirmHandler(el, vNode, e);
    };
    el.addEventListener('click', el.popconfirmClick);
  },
  updated(el, binding) {
    el[bindingValueSymbol] = binding.value;
    if (!el.popconfirmNode) return;

    if (binding.value !== binding.oldValue) {
      if (typeof binding.value === 'string') {
        const cloned = cloneVNode(el.popconfirmNode, { title: binding.value });
        render(cloned, el.container);
      }
      if (typeof binding.value === 'object') {
        const cloned = cloneVNode(el.popconfirmNode, binding.value);
        render(cloned, el.container);
      }
    }
  },
  unmounted(el: PopconfirmEl) {
    el.removeEventListener('click', el.popconfirmClick);
  },
});
