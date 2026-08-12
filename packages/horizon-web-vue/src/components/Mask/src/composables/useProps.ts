import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';
import type { MaskVariant } from '@aurora/core';
import {
  isMaskColor,
  isMaskOpacity,
  isMaskVariant,
  isMaskZIndex,
  MASK_DEFAULTS,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export const useMaskProps = declarePropType({
  /**
   * 默认值：default
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<MaskVariant>,
    default: MASK_DEFAULTS.variant,
    validator: isMaskVariant,
  },
  /**
   * 是否展示遮罩层
   * @en Configuration for value.
   */
  value: {
    type: Boolean,
    default: MASK_DEFAULTS.visible,
  },
  /**
   * 设置遮罩层为绝对定位
   * @en Configuration for absolute.
   */
  absolute: {
    type: Boolean,
    default: MASK_DEFAULTS.absolute,
  },
  /**
   * 设置透明度
   * @en Configuration for opacity.
   */
  opacity: {
    type: [Number, String],
    default: MASK_DEFAULTS.opacity,
    validator: isMaskOpacity,
  },
  /**
   * 遮罩层颜色
   * @en Configuration for color.
   */
  color: {
    type: String,
    validator: isMaskColor,
  },
  /**
   * 层级
   * @en Configuration for z index.
   */
  zIndex: {
    type: Number,
    default: MASK_DEFAULTS.zIndex,
    validator: isMaskZIndex,
  },
  /**
   * 设置遮罩层的class
   * @en Configuration for scrim class.
   */
  scrimClass: {
    type: String,
  },
  /**
   * 设置遮罩层的style
   * @en Configuration for scrim style.
   */
  scrimStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 是否触发高斯模糊，若进行高斯模糊，必定会打开遮罩层
   * @en Configuration for is fuzzification.
   */
  isFuzzification: {
    type: Boolean,
    default: MASK_DEFAULTS.fuzzified,
  },
  /**
   * 是否使内部容器占满父容器
   * @en Configuration for content full size.
   */
  contentFullSize: {
    type: Boolean,
    default: MASK_DEFAULTS.contentFullSize,
  },
});

export type MaskProps = ExtractPropTypes<typeof useMaskProps>;
