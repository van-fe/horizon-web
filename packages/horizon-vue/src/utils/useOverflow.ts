import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core';
import { unrefElement } from '@vueuse/core';

export default function <T extends MaybeElement = MaybeElement>(
  domRef: MaybeComputedElementRef<T>,
  scale: number | number[] = 1,
) {
  const dom = unrefElement(domRef);

  const rect = dom?.getBoundingClientRect();

  !Array.isArray(scale) && (scale = [scale, scale]);
  scale.length === 1 && scale.push(scale[0]);

  if (dom && rect) {
    // Because of the feature of dom precision, the height must have 1px redundancy
    return (
      dom.scrollWidth * scale[0] > Math.ceil(rect.width) ||
      dom.scrollHeight * scale[1] > Math.ceil(rect.height) + 1
    );
  }

  return false;
}
