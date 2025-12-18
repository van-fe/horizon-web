import { createVNode, render } from 'vue';
import PopTooltip from '../components/PopTooltip';
import type { PopperPlacement, Rect } from '~/utils/popper';
import { createPopper } from '~/utils/popper';
import type { PopTooltipEl } from '..';
import type { TooltipOptions } from '../composables/useOptions';

export const generator = (el: PopTooltipEl, propsObj: Partial<TooltipOptions>) => {
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
    onMouseenter: () => {
      propsObj.visible = false;
      generator(el, propsObj);
    },
  });
  const { reference: referenceEl } = propsObj;
  render(node, el);
  if (!node?.el?.classList) return;
  el.tooltipEl = node.el;
  el.tooltipInstance = createPopper(el, node.el as HTMLElement, {
    placement: propsObj.placement as PopperPlacement,
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [propsObj.skidding || 0, propsObj.distance || 0],
        },
      },
      {
        name: 'arrow',
        options: {
          padding: ({ popper, placement }: { popper: Rect; placement: PopperPlacement }) => {
            switch (placement) {
              case 'top-start':
              case 'bottom-start':
                return { right: popper.width, left: 12 };
              case 'top-end':
              case 'bottom-end':
                return { right: popper.width, left: popper.width - 28 };
            }
          },
        },
      },
    ],
  });
  (referenceEl ?? document.body).appendChild(node.el as HTMLElement);
};
