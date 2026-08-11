import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';
import { declarePropType, isString } from '@aurora/utils';
import { tinycolor } from '@aurora/colors';

export const useMaskProps = declarePropType({
  /**
   * 默认值：default
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<
      'default' | 'weak' | 'strong' | 'inverse' | 'transparent' | 'customize'
    >,
    default: 'default',
    require: true,
    validator(v: string) {
      if (['default', 'weak', 'strong', 'inverse', 'transparent', 'customize'].includes(v)) {
        return true;
      } else {
        return false;
      }
    },
  },
  /**
   * 是否展示遮罩层
    * @en Configuration for value.
   */
  value: {
    type: Boolean,
    default: true,
    require: true,
  },
  /**
   * 设置遮罩层为绝对定位
    * @en Configuration for absolute.
   */
  absolute: {
    type: Boolean,
    default: false,
    require: false,
  },
  /**
   * 设置透明度
    * @en Configuration for opacity.
   */
  opacity: {
    type: [Number, String],
    default: 1,
  },
  /**
   * 遮罩层颜色
    * @en Configuration for color.
   */
  color: {
    type: String as PropType<'rgba(-,-,-,-)' | 'rgb(-,-,-)'>,
    validator(value: unknown): boolean {
      return (isString(value) && tinycolor(value).isValid) || true;
    },
  },
  /**
   * 层级
    * @en Configuration for z index.
   */
  zIndex: {
    type: Number,
    default: 1,
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
    default: false,
  },
  /**
   * 是否使内部容器占满父容器
    * @en Configuration for content full size.
   */
  contentFullSize: {
    type: Boolean,
    default: false,
  },
});

export type MaskProps = ExtractPropTypes<typeof useMaskProps>;
