import type { SlotsType } from 'vue';
export const usePageHeaderSlots = Object as SlotsType<{
  /**
   * 默认插槽
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 返回按钮插槽
    * @en Custom content for the icon slot.
   */
  icon?: {};
  /**
   * header插槽
    * @en Custom content for the header slot.
   */
  header?: {};
  /**
   * 标题插槽
    * @en Custom content for the title slot.
   */
  title?: {};
  /**
   * 标题外部插槽
    * @en Custom content for the title outer slot.
   */
  titleOuter?: {};
  /**
   * 标签插槽
    * @en Custom content for the tags slot.
   */
  tags?: {};
  /**
   * 内容区域插槽
    * @en Custom content for the content slot.
   */
  content?: {};
  /**
   * 额外内容插槽
    * @en Custom content for the extra slot.
   */
  extra?: {};
  /**
   * 面包屑插槽
    * @en Custom content for the breadcrumb slot.
   */
  breadcrumb?: {};
}>;

export type PageHeaderSlots = typeof usePageHeaderSlots;
