import type { TagProps } from '~/components/Tag/src/composables/useProps';
import { isString, isUndefined } from '@nio-fe/shared';

export const useTagSlots = {
  /**
   * 默认文本内容
   */
  default: () => true,
  /**
   * 前缀 `icon` 插槽
   */
  icon: (currentColor?: string) => isString(currentColor) || isUndefined(currentColor),
  /**
   * 头像插槽
   */
  avatar: () => true,
  /**
   * `tooltip` 的内容插槽
   * @version 2.0.12-beta.1
   */
  tooltipContent: () => true,
};

export const useTagGroupSlots = {
  /**
   * 默认插槽，用于设置 `n-tag`
   */
  default: () => true,
  /**
   * 创建标签文字插槽
   * @param currentTags 当前已存在的标签
   */
  createText: (currentTags: TagProps[]) => Array.isArray(currentTags),
  /**
   * 创建插槽
   * @param currentTags 当前已存在的标签
   */
  create: (currentTags: TagProps[]) => Array.isArray(currentTags),
  /**
   * 头部追加，不会参与省略计算
   * @version 2.1.0
   */
  prepend: () => true,
  /**
   * 尾部追加，不会参与省略计算
   * @version 2.1.0
   */
  append: () => true,
  /**
   * 前缀，会参与省略计算
   * @version 2.1.0
   */
  prefix: () => true,
  /**
   * 后缀，会参与省略计算
   * @version 2.1.0
   */
  suffix: () => true,
};

export type TagSlots = typeof useTagSlots;
export type TagGroupSlots = typeof useTagGroupSlots;
