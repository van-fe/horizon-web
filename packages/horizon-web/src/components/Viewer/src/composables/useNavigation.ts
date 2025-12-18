import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import type { NViewerSource } from './useProps';

export default function useNavigation(imagesRef: Ref<NViewerSource[]>, loopRef: Ref<boolean>) {
  const currentIndexRef = ref(0);
  const loadingPreviewRef = ref(true);

  const goToImg = (index: number) => {
    if (currentIndexRef.value === index) {
      return;
    }
    if (imagesRef.value?.[currentIndexRef.value]?.cover !== imagesRef.value?.[index]?.cover) {
      loadingPreviewRef.value = true;
    }
    currentIndexRef.value = index;
  };

  const goToPrevious = () => {
    if (currentIndexRef.value <= 0) {
      if (loopRef.value) {
        goToImg(imagesRef.value.length - 1);
      }
      return;
    }
    goToImg(currentIndexRef.value - 1);
  };

  const goToNext = () => {
    if (currentIndexRef.value >= imagesRef.value.length - 1) {
      if (loopRef.value) {
        goToImg(0);
      }
      return;
    }
    goToImg(currentIndexRef.value + 1);
  };

  const previewDisabledRef = computed(() => {
    return loopRef.value ? false : currentIndexRef.value === 0;
  });

  const nextDisabledRef = computed(() => {
    return loopRef.value ? false : currentIndexRef.value === imagesRef.value.length - 1;
  });

  return {
    currentIndexRef,
    loadingPreviewRef,
    goToImg,
    goToPrevious,
    goToNext,
    previewDisabledRef,
    nextDisabledRef,
  };
}
