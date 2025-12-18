import type { DirectiveBinding } from 'vue';
import type { TooltipOptions } from '../composables/useOptions';
import type { PopTooltipEl } from '..';
import { placementEnum, triggerEnum } from './utils';

export const getOptions = (
  el: PopTooltipEl,
  { value, modifiers }: DirectiveBinding<TooltipOptions | string>,
) => {
  let optionObj: Partial<TooltipOptions> = {
    placement: 'top',
    visible: false,
    trigger: 'hover',
    arrow: true,
    disabled: false,
    skidding: 0,
    distance: 12,
    reference: document.body,
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
    if (placementEnum.includes(key as (typeof placementEnum)[number])) {
      optionObj.placement = key as (typeof placementEnum)[number];
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

    if (triggerEnum.includes(key as (typeof triggerEnum)[number])) {
      optionObj.trigger = key as (typeof triggerEnum)[number];
    }
  });

  return optionObj;
};
