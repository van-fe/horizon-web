import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';
import { declarePropType, isString } from '@aurora/utils';
import { tinycolor } from '@aurora/colors';

export const useMaskProps = declarePropType({
  /**
   * 默认值：default
   * @version 2.2.0
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
   */
  value: {
    type: Boolean,
    default: true,
    require: true,
  },
  /**
   * 设置遮罩层为绝对定位
   */
  absolute: {
    type: Boolean,
    default: false,
    require: false,
  },
  /**
   * 设置透明度
   * @version 2.2.0 之后 默认值从 0.5 变为 1
   */
  opacity: {
    type: [Number, String],
    default: 1,
  },
  /**
   * 遮罩层颜色
   */
  color: {
    type: String as PropType<'rgba(-,-,-,-)' | 'rgb(-,-,-)'>,
    validator(value: unknown): boolean {
      return (isString(value) && tinycolor(value).isValid) || true;
    },
  },
  /**
   * 层级
   */
  zIndex: {
    type: Number,
    default: 1,
  },
  /**
   * 设置遮罩层的class
   * @version 2.2.0 之后由 Object 类型变为 String
   */
  scrimClass: {
    type: String,
  },
  /**
   * 设置遮罩层的style
   * @version 2.2.0
   */
  scrimStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 是否触发高斯模糊，若进行高斯模糊，必定会打开遮罩层
   */
  isFuzzification: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否使内部容器占满父容器
   * @version 1.6.5
   */
  contentFullSize: {
    type: Boolean,
    default: false,
  },
});

export type MaskProps = ExtractPropTypes<typeof useMaskProps>;
