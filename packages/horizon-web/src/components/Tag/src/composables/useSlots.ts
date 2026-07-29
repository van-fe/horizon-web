import type { SlotsType, VNode } from 'vue';
import type { TagProps } from './useProps';

export const useTagSlots = Object as SlotsType<{
  /**
   * 默认文本内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 前缀 `icon` 插槽
   * @param currentColor 当前颜色
   * @paramEn currentColor The current color value.
    * @en Custom content for the icon slot.
   */
  icon?: (currentColor?: string) => VNode[];
  /**
   * 头像插槽
    * @en Custom content for the avatar slot.
   */
  avatar?: {};
  /**
   * `tooltip` 的内容插槽
    * @en Custom content for the tooltip content slot.
   */
  tooltipContent?: {};
}>;

export const useTagGroupSlots = Object as SlotsType<{
  /**
   * 默认插槽，用于设置 `n-tag`
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 创建标签文字插槽
   * @param currentTags 当前已存在的标签
   * @paramEn currentTags The current tags value.
    * @en Custom content for the create text slot.
   */
  createText?: (currentTags: TagProps[]) => VNode[];
  /**
   * 创建插槽
   * @param currentTags 当前已存在的标签
   * @paramEn currentTags The current tags value.
    * @en Custom content for the create slot.
   */
  create?: (currentTags: TagProps[]) => VNode[];
  /**
   * 头部追加，不会参与省略计算
    * @en Custom content for the prepend slot.
   */
  prepend?: {};
  /**
   * 尾部追加，不会参与省略计算
    * @en Custom content for the append slot.
   */
  append?: {};
  /**
   * 前缀，会参与省略计算
    * @en Custom content for the prefix slot.
   */
  prefix?: {};
  /**
   * 后缀，会参与省略计算
    * @en Custom content for the suffix slot.
   */
  suffix?: {};
}>;

export type TagSlots = typeof useTagSlots;
export type TagGroupSlots = typeof useTagGroupSlots;
