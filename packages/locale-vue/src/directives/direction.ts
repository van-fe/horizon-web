import type { Directive, DirectiveBinding } from 'vue';

enum HorizonWebLocaleDirectionEnum {
  Ltr = 'ltr',
  Rtl = 'rtl',
}

function checkValue(value: HorizonWebLocaleDirectionEnum): boolean {
  return Object.values(HorizonWebLocaleDirectionEnum).includes(value);
}

function addStyleToElement(el: HTMLElement, value: HorizonWebLocaleDirectionEnum): void {
  el.style.direction = value;
}

function dealLifecycleEvents(el: HTMLElement, binding: DirectiveBinding): void {
  if (!checkValue(binding.value)) {
    console.error('You passing a error value to v-read-direction.');
    return;
  }

  addStyleToElement(el, binding.value);
}

const direction: Directive = {
  mounted: dealLifecycleEvents,
  updated: dealLifecycleEvents,
};

export default direction;
