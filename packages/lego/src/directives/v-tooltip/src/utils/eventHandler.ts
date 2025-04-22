import type { PopTooltipEl } from '../index';
import { generator } from './generator';
import type { TooltipOptions } from '../composables/useOptions';

export const eventHandler = (el: PopTooltipEl, originObj: Partial<TooltipOptions>) => {
  el.onmouseenter = () => {
    if (originObj.trigger === 'hover') {
      originObj.visible = true;
      generator(el, originObj);
    }
  };
  el.onmouseleave = () => {
    if (originObj.trigger === 'hover') {
      originObj.visible = false;
      generator(el, originObj);
    }
  };
  el.onmousedown = () => {
    if (originObj.trigger === 'focus') {
      originObj.visible = true;
      generator(el, originObj);
    }
  };
  el.onmouseup = () => {
    if (originObj.trigger === 'focus') {
      originObj.visible = false;
      generator(el, originObj);
    }
  };
  el.onclick = (e: any) => {
    if (originObj.trigger === 'click') {
      originObj.visible = !originObj.visible;
    } else {
      originObj.visible = false;
    }
    (e.target.tooltipInstance || originObj.visible) && generator(el, originObj);
  };
  el.oncontextmenu = () => {
    if (originObj.trigger === 'manual') {
      originObj.visible = !originObj.visible;
      generator(el, originObj);
    }
  };
};
