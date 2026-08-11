import type { ExtractPropTypes, PropType } from 'vue';
import type { AvatarCommonProps, AvatarFit, AvatarSize, AvatarType } from '@aurora/core';
import { AVATAR_DEFAULTS, isAvatarFit, isAvatarSize, isAvatarType } from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export const useAvatarProps = declarePropType({
  /**
   * 设置头像的大小
   * @en Configuration for size.
   */
  size: {
    type: [String, Number] as PropType<AvatarSize>,
    required: false,
    validator: isAvatarSize,
  },
  /**
   * 设置头像的图标类型，参考 Icon 组件
   * @en Configuration for icon.
   */
  icon: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 图片头像资源
   * 当type是work时，为文字头像内容
   * @en Configuration for src.
   */
  src: {
    type: [String, Array] as PropType<AvatarCommonProps['src']>,
    required: false,
    default: '',
  },
  /**
   * 当展示类型为图片的时候，设置图片如何适应容器框
   * object-fit属性值
   * @en Configuration for fit.
   */
  fit: {
    type: String as PropType<AvatarFit>,
    required: false,
    default: AVATAR_DEFAULTS.fit,
    validator: isAvatarFit,
  },
  /**
   * 头像类型
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<AvatarType>,
    required: false,
    default: AVATAR_DEFAULTS.type,
    validator: isAvatarType,
  },
  /**
   * 未设置src时，随机头像组
   * @en Configuration for random src.
   */
  randomSrc: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
  /**
   * 兜底默认头像
   * @en Configuration for default.
   */
  default: {
    type: String,
    default: AVATAR_DEFAULTS.fallbackSrc,
  },
});

export type AvatarProps = ExtractPropTypes<typeof useAvatarProps>;
