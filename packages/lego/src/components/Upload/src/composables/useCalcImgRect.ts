import type { UploadImgProps } from './useProps';
import type { Ref } from 'vue';
import { ref, watchEffect } from 'vue';

const DEFAULT_SIZES = {
  square: {
    large: {
      width: 80,
      height: 80,
      iconSize: 32,
    },
    medium: {
      width: 64,
      height: 64,
      iconSize: 24,
    },
    small: {
      width: 48,
      height: 48,
      iconSize: 16,
    },
  },
  rectangle: {
    large: {
      width: 120,
      height: 80,
      iconSize: 32,
    },
    medium: {
      width: 96,
      height: 64,
      iconSize: 24,
    },
    small: {
      width: 72,
      height: 48,
      iconSize: 16,
    },
  },
};

export const useCalcImgRect = (
  size: Ref<UploadImgProps['size']>,
  proportion: Ref<UploadImgProps['proportion']>,
) => {
  const rect = ref({
    width: 0,
    height: 0,
  });

  const iconSize = ref(0);

  watchEffect(() => {
    const { width, height, iconSize: isize } = DEFAULT_SIZES[proportion.value][size.value!];

    rect.value = {
      width,
      height,
    };

    iconSize.value = isize;
  });

  const setUnit = (rec: typeof rect.value) => ({
    width: `${rec.width}px`,
    height: `${rec.height}px`,
  });

  return {
    rect,
    iconSize,
    setUnit,
  };
};
