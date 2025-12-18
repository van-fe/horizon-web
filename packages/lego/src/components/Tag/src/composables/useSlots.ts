import type { SlotsType, VNode } from 'vue';
import type { TagProps } from '../composables/useProps';

export const useTagSlots = Object as SlotsType<{
  /**
   * 默认文本内容
   */
  default?: {};
  /**
   * 前缀 `icon` 插槽
   * @param currentColor 当前颜色
   */
  icon?: (currentColor?: string) => VNode[];
  /**
   * 头像插槽
   */
  avatar?: {};
  /**
   * `tooltip` 的内容插槽
   * @version 2.0.12-beta.1
   */
  tooltipContent?: {};
}>;

export const useTagGroupSlots = Object as SlotsType<{
  /**
   * 默认插槽，用于设置 `n-tag`
   */
  default?: {};
  /**
   * 创建标签文字插槽
   * @param currentTags 当前已存在的标签
   */
  createText?: (currentTags: TagProps[]) => VNode[];
  /**
   * 创建插槽
   * @param currentTags 当前已存在的标签
   */
  create?: (currentTags: TagProps[]) => VNode[];
  /**
   * 头部追加，不会参与省略计算
   * @version 2.1.0
   */
  prepend?: {};
  /**
   * 尾部追加，不会参与省略计算
   * @version 2.1.0
   */
  append?: {};
  /**
   * 前缀，会参与省略计算
   * @version 2.1.0
   */
  prefix?: {};
  /**
   * 后缀，会参与省略计算
   * @version 2.1.0
   */
  suffix?: {};
}>;

export type TagSlots = typeof useTagSlots;
export type TagGroupSlots = typeof useTagGroupSlots;
