import type { Directive, DirectiveBinding } from 'vue';

enum LegoLocaleDirectionEnum {
  Ltr = 'ltr',
  Rtl = 'rtl',
}

function checkValue(value: LegoLocaleDirectionEnum): boolean {
  return Object.values(LegoLocaleDirectionEnum).includes(value);
}

function addStyleToElement(el: HTMLElement, value: LegoLocaleDirectionEnum): void {
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
