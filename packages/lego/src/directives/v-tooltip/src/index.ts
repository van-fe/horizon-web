import { defineDirective, useNamespace, usePopupContainerGetter } from '@nio-fe/shared';
import type { Placement } from '@popperjs/core';
import type { DirectiveBinding, VNode } from 'vue';
import { createVNode, render, watch } from 'vue';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import { usePopper } from '~/utils/popper';
import { useSensor } from '~/utils/useSensor';
import PopTooltip from './components/PopTooltip';
import { useTooltipOptions } from './composables/useOptions';

export interface TooltipBindingArgs {
  trigger?: string;
  placement?: Placement;
  distance?: number;
  visible?: boolean;
  skidding?: number;
  arrow?: boolean;
  flip?: boolean;
  disabled?: boolean;
  overflow?: boolean;
  popperClass?: string;
  content?: string;
  style?: unknown;
  reference?: HTMLElement;
  fallbackPlacements?: TooltipProps['fallbackPlacements'];
  size?: string;
  theme?: string;
}

export interface PopTooltipEl extends HTMLElement {
  tooltipInstance?: any;
  tooltipEl?: any;
  tooltipUnwatchHandler?: () => void;
}

const PLACEMENT_ARR: Placement[number][] = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'top',
  'bottom',
  'right-start',
  'right-end',
  'left-start',
  'left-end',
  'right',
  'left',
];

const TRIGGER_ARR = ['hover', 'click', 'focus', 'manual'];
const SIZE_ARR = ['medium', 'small'];
const THEME_ARR = ['dark', 'light'];

const getPropOptions = (el: PopTooltipEl, { value, modifiers }: DirectiveBinding) => {
  let optionObj: TooltipBindingArgs = {
    placement: 'top',
    visible: false,
    trigger: 'hover',
    arrow: true,
    disabled: false,
    skidding: 0,
    distance: 12,
    reference: document.body,
    flip: true,
  };
  if (typeof value === 'string') {
    optionObj.content = value;
  } else {
    optionObj = { ...optionObj, ...value };
  }
  if (!optionObj.content) {
    optionObj.disabled = true;
  }

  Object.keys(modifiers).forEach(key => {
    if (PLACEMENT_ARR.includes(key)) {
      optionObj.placement = key as Placement;
    }
    if (key === 'disabled') {
      optionObj[key] = true;
    }
    if (key === 'visible') {
      optionObj[key] = true;
    }
    if (key === 'overflow') {
      optionObj[key] = true;
    }
    if (TRIGGER_ARR.includes(key)) {
      optionObj.trigger = key;
    }
    if (SIZE_ARR.includes(key)) {
      optionObj.size = key;
    }
    if (THEME_ARR.includes(key)) {
      optionObj.theme = key;
    }
  });
  return optionObj;
};
const generateTooltip = (el: PopTooltipEl, propsObj: TooltipBindingArgs, vnode: VNode) => {
  if (propsObj.overflow) {
    const clientWidth = el.clientWidth;
    const scrollWidth = el.scrollWidth;
    propsObj.disabled = scrollWidth <= clientWidth;
  }
  if (propsObj.disabled) {
    propsObj.visible = false;
  }
  const node = createVNode(PopTooltip, {
    ...propsObj,
    mountNode: el,
    onMouseenter: () => {
      propsObj.visible = false;
      generateTooltip(el, propsObj, vnode);
    },
  });
  const { reference: referenceEl } = propsObj;
  !!el.parentElement && render(node, el);
  if (!node?.el?.classList) return;

  el.tooltipEl = node.el;
  el.tooltipInstance = usePopper(el, node.el as HTMLElement, {
    placement: propsObj.placement || 'top',
    distance: propsObj.distance,
    skidding: propsObj.skidding,
    arrow: propsObj.arrow,
    flip: propsObj.flip,
    fallbackPlacements: propsObj.fallbackPlacements,
    arrowOption: { padding: 3 },
  });

  let root = referenceEl ?? document.body;
  const popupContainerGetter = usePopupContainerGetter();
  if (popupContainerGetter.value) root = popupContainerGetter.value();
  root.appendChild(node.el as HTMLElement);
};
const useEvent = (el: PopTooltipEl, originObj: TooltipBindingArgs, vnode: VNode) => {
  el.onmouseenter = () => {
    if (originObj.trigger === 'hover') {
      originObj.visible = true;
      generateTooltip(el, originObj, vnode);
    }
  };
  el.onmouseleave = () => {
    if (originObj.trigger === 'hover') {
      originObj.visible = false;
      generateTooltip(el, originObj, vnode);
    }
  };
  el.onmousedown = () => {
    if (originObj.trigger === 'focus') {
      originObj.visible = true;
      generateTooltip(el, originObj, vnode);
    }
  };
  el.onmouseup = () => {
    if (originObj.trigger === 'focus') {
      originObj.visible = false;
      generateTooltip(el, originObj, vnode);
    }
  };
  el.onclick = () => {
    if (originObj.trigger === 'click') {
      originObj.visible = !originObj.visible;
    } else {
      originObj.visible = false;
    }
    generateTooltip(el, originObj, vnode);
  };
  el.oncontextmenu = event => {
    event.preventDefault();
    if (originObj.trigger === 'manual') {
      originObj.visible = !originObj.visible;
      generateTooltip(el, originObj, vnode);
    }
  };
};

export default defineDirective<PopTooltipEl, typeof useTooltipOptions>({
  name: 'tooltip',
  options: useTooltipOptions,
  desc: '`v-tooltip` 是 `tooltip` 组件的指令使用方式',
  mounted(el, binding, vnode) {
    useSensor('v-tooltip', binding.value, 'directive');

    const originObj = getPropOptions(el, binding);
    useEvent(el, originObj, vnode);
    generateTooltip(el, originObj, vnode);

    el.tooltipUnwatchHandler = watch(
      () => binding.instance?.$router?.currentRoute?.value,
      (value, oldValue) => {
        if (value?.fullPath !== oldValue?.fullPath) {
          el.tooltipInstance?.update?.();
        }
      },
    );
  },
  updated(el, binding, vnode, { dirs }) {
    const prevBinding = dirs?.find(({ dir }) => 'name' in dir && dir.name === 'tooltip');

    // 值和修饰符都没有变更的话，不更新
    if (
      JSON.stringify(binding?.value) === JSON.stringify(prevBinding?.value) &&
      JSON.stringify(binding?.modifiers) === JSON.stringify(prevBinding?.modifiers)
    )
      return;

    const originObj = getPropOptions(el, binding);
    useEvent(el, originObj, vnode);
    generateTooltip(el, originObj, vnode);
  },
  unmounted(el, { value }) {
    const referenceEl = value?.reference;
    const hasDirective = document.querySelectorAll(
      `.${useNamespace().toLowerCase()}-tooltip--directive`,
    ).length;
    hasDirective &&
      (referenceEl ?? document.body).contains(el.tooltipEl) &&
      (referenceEl ?? document.body).removeChild(el.tooltipEl);

    el.tooltipUnwatchHandler?.();
  },
  deep: true,
});
