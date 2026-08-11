import type { DrawerPresetSize } from '@aurora/core';
import {
  DRAWER_PRESET_SIZES,
  isHorizontalDrawerPlacement,
  isVerticalDrawerPlacement,
  resolveDrawerPresetExtent,
} from '@aurora/core';
import type { DrawerResizeController } from '@aurora/horizon-web-core';
import { createDrawerResizeController } from '@aurora/horizon-web-core';
import { getUnitString } from '@aurora/utils';
import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import type { DrawerPlacement, DrawerSize } from './useProps';

function isPresetSize(size: DrawerSize): size is DrawerPresetSize {
  return DRAWER_PRESET_SIZES.includes(size as DrawerPresetSize);
}

export function useResponsiveSize(
  visible: Ref<boolean>,
  propSize: Ref<DrawerSize>,
  propPlacement: Ref<DrawerPlacement>,
  panelEl: Ref<HTMLElement | undefined>,
  sizeDraggable: Ref<boolean>,
) {
  const handleEl = ref<HTMLElement>();
  const viewportWidth = ref(typeof window === 'undefined' ? 0 : window.innerWidth);
  const resizedWidth = ref(480);
  const resizedHeight = ref(320);
  const moved = ref(false);
  let resizeController: DrawerResizeController | null = null;

  const isHorizontal = computed(() => isHorizontalDrawerPlacement(propPlacement.value));
  const isVertical = computed(() => isVerticalDrawerPlacement(propPlacement.value));
  const isSupportedSize = computed(() => isPresetSize(propSize.value));

  const sizeStyle = computed(() => ({
    width: isHorizontal.value
      ? isSupportedSize.value || moved.value
        ? `${resizedWidth.value}px`
        : getUnitString(propSize.value)
      : '100%',
    height: isVertical.value
      ? isSupportedSize.value || moved.value
        ? `${resizedHeight.value}px`
        : getUnitString(propSize.value)
      : '100%',
  }));

  const updatePresetSize = () => {
    if (!visible.value || !isPresetSize(propSize.value)) return;
    const extent = resolveDrawerPresetExtent(propSize.value, viewportWidth.value);
    if (isHorizontal.value) resizedWidth.value = extent;
    else resizedHeight.value = extent;
  };

  watch(visible, open => {
    if (open) return;
    if (isSupportedSize.value) {
      updatePresetSize();
      return;
    }
    resizedWidth.value = 480;
    resizedHeight.value = 320;
  });
  watch([viewportWidth, propSize, propPlacement, visible], updatePresetSize, { immediate: true });

  const destroyResizeController = () => {
    resizeController?.destroy();
    resizeController = null;
  };

  const setupResizeController = () => {
    destroyResizeController();
    if (!visible.value || !sizeDraggable.value || !handleEl.value || !panelEl.value) return;
    const resizePanel = handleEl.value.parentElement ?? panelEl.value;
    resizeController = createDrawerResizeController(handleEl.value, resizePanel, {
      placement: propPlacement.value,
      onResize: extent => {
        moved.value = true;
        if (isHorizontal.value) resizedWidth.value = extent;
        else if (isVertical.value) resizedHeight.value = extent;
      },
    });
  };

  watch([visible, sizeDraggable, propPlacement, handleEl, panelEl], setupResizeController, {
    flush: 'post',
  });

  const onViewportResize = () => {
    viewportWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', onViewportResize);
    onViewportResize();
    setupResizeController();
  });

  onBeforeUnmount(() => {
    destroyResizeController();
    window.removeEventListener('resize', onViewportResize);
  });

  return { sizeStyle, handleEl };
}
