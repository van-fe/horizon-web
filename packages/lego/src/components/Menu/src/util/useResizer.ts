import type { Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import { ref } from 'vue';

export default function (
  resizerDomRef: Ref<HTMLElement | null>,
  defaultWidth: number | string,
  collapseSwitch: (collapsed: boolean) => void,
) {
  let prevWidth = parseFloat(defaultWidth.toString());

  const width = ref(prevWidth);

  const { isDragging } = useDraggable(resizerDomRef, {
    onStart() {
      const rect = resizerDomRef.value!.parentElement!.getBoundingClientRect();
      prevWidth = rect.width;
    },
    onMove({ x }) {
      const rect = resizerDomRef.value!.parentElement!.getBoundingClientRect();
      const calWidth = prevWidth - ((rect?.x || 0) + prevWidth - x);

      if (calWidth >= 160 && calWidth <= 240) {
        width.value = calWidth;
      } else if (calWidth > 240) {
        width.value = 240;
      } else if (prevWidth === 72 && calWidth > 120) {
        width.value = 160;
        collapseSwitch(false);
      } else if (calWidth < 100) {
        collapseSwitch(true);
      } else {
        width.value = 160;
      }
    },
  });

  return {
    isDragging,
    width,
  };
}
