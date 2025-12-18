import { getUnitString } from '@nio-fe/shared';
import { useDraggable, useWindowSize, type Position } from '@vueuse/core';
import { computed, reactive, ref, watch, type Ref } from 'vue';
import { type DrawerPlacement, type DrawerSize } from './useProps';

export interface ResponsiveLayout {
  cell: number;
  gutter: number;
  col: number;
  margin: number;
}

const sizes: Record<DrawerSize, ResponsiveLayout> = {
  small: { cell: 6, gutter: 16, col: 24, margin: 24 },
  medium: { cell: 8, gutter: 24, col: 24, margin: 24 },
  large: { cell: 12, gutter: 24, col: 24, margin: 24 },
};

export function useResponsiveSize(
  visible: Ref<boolean>,
  propSize: Ref<DrawerSize>,
  propPlacement: Ref<DrawerPlacement>,
) {
  const handleEl = ref<HTMLElement>();

  const { width } = useWindowSize();

  const isHorizontal = computed(
    () => propPlacement.value === 'left' || propPlacement.value === 'right',
  );
  const isVertical = computed(
    () => propPlacement.value === 'top' || propPlacement.value === 'bottom',
  );

  const isSupportedSize = computed(() => Object.keys(sizes).includes(propSize.value as string));

  const rw = ref(480);
  const rh = ref(320);

  const dCtx = reactive({ start: 0, distance: 0, moved: false });

  const sizeStyle = computed(() => {
    return {
      width: isHorizontal.value
        ? isSupportedSize.value || dCtx.moved
          ? `${rw.value}px`
          : getUnitString(propSize.value)
        : '100%',
      height: isVertical.value
        ? isSupportedSize.value || dCtx.moved
          ? `${rh.value}px`
          : getUnitString(propSize.value)
        : '100%',
    };
  });

  const resetSize = () => {
    if (!visible.value) {
      if (isSupportedSize.value) return onGutterResize();
      rw.value = 480;
      rh.value = 320;
    }
  };

  watch(visible, resetSize);

  const onStart = (_: Position, evt: PointerEvent) => {
    if (!dCtx.moved) dCtx.moved = true;

    if (isHorizontal.value) {
      dCtx.start = evt.clientX;
      rw.value = handleEl.value?.parentElement?.clientWidth ?? rw.value;
      dCtx.distance = rw.value;
    }

    if (isVertical.value) {
      dCtx.start = evt.clientY;
      rh.value = handleEl.value?.parentElement?.clientHeight ?? rh.value;
      dCtx.distance = rh.value;
    }
  };

  const onMove = (_: Position, evt: PointerEvent) => {
    if (isHorizontal.value) {
      const delta = evt.clientX - dCtx.start;
      rw.value = Math.max(
        8,
        propPlacement.value === 'left' ? dCtx.distance + delta : dCtx.distance - delta,
      );
    }

    if (isVertical.value) {
      const delta = evt.clientY - dCtx.start;
      rh.value = Math.max(
        8,
        propPlacement.value === 'top' ? dCtx.distance + delta : dCtx.distance - delta,
      );
    }
  };

  useDraggable(handleEl, {
    onStart,
    onMove,
    preventDefault: true,
    stopPropagation: true,
  });

  const onGutterResize = () => {
    if (!isSupportedSize.value || !visible.value) return;

    const grid = sizes[propSize.value];
    let unit = 0;

    if (width.value <= 1280) {
      unit = (1280 - grid.margin * 2 - grid.gutter * (grid.col - 1)) / grid.col;
    } else if (width.value <= 1440) {
      unit = (1440 - grid.margin * 2 - grid.gutter * (grid.col - 1)) / grid.col;
    } else {
      unit = (1920 - grid.margin * 2 - grid.gutter * (grid.col - 1)) / grid.col;
    }

    if (isHorizontal.value) {
      rw.value = unit * grid.cell + grid.gutter * (grid.cell - 1) + grid.margin;
    } else {
      rh.value = unit * grid.cell + grid.gutter * (grid.cell - 1) + grid.margin;
    }
  };

  watch([propSize, propPlacement, visible], onGutterResize, { immediate: true });

  return { sizeStyle, handleEl };
}
