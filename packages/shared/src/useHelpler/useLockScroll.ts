import { ref } from 'vue';

const visibleModalAmount = ref(0);

export function useLockScroll(isModalVisible = true) {
  visibleModalAmount.value += isModalVisible ? 1 : -1;

  if (visibleModalAmount.value > 0) {
    document.body.dataset.popupParentHidden = '';
  } else {
    visibleModalAmount.value = 0;
    document.body.dataset.popupParentHidden = undefined;
    delete document.body.dataset.popupParentHidden;
  }
}
