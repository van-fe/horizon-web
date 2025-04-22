import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';

export const useAvatarProps = declarePropType({
  /**
   * 设置头像的大小
   */
  size: {
    type: [String, Number] as PropType<'mini' | 'small' | 'smedium' | 'medium' | 'large' | number>,
    required: false,
  },
  /**
   * 设置头像的图标类型，参考 Icon 组件
   */
  icon: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 图片头像资源
   * 当type是work时，为文字头像内容
   */
  src: {
    type: [String, Array] as PropType<string | string[]>,
    required: false,
    default: '',
  },
  /**
   * 当展示类型为图片的时候，设置图片如何适应容器框
   * object-fit属性值
   */
  fit: {
    type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
    required: false,
    default: 'fill',
  },
  /**
   * 头像类型
   */
  type: {
    type: String as PropType<'normal' | 'work'>,
    required: false,
    default: 'normal',
  },
  /**
   * 未设置src时，随机头像组
   */
  randomSrc: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
  /**
   * 兜底默认头像
   */
  default: {
    type: String,
    default: 'https://cdn-app.nio.com/lego/defaultAvatar.jpg',
  },
});

export type AvatarProps = ExtractPropTypes<typeof useAvatarProps>;
