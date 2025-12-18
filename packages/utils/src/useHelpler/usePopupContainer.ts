import { shallowRef } from 'vue';

const popupRootGetter = shallowRef<(triggerNode?: HTMLElement) => HTMLElement>();

export function usePopupContainerGetter() {
  return popupRootGetter;
}

export function resetPopupContainerGetter() {
  popupRootGetter.value = undefined;
}

export function setPopupContainerGetter(
  containerGetter: (triggerNode?: HTMLElement) => HTMLElement,
) {
  popupRootGetter.value = containerGetter;
}
