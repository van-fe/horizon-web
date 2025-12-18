import type { SlotsType } from 'vue';
export const usePageHeaderSlots = Object as SlotsType<{
  /**
   * 默认插槽
   */
  default?: {};
  /**
   * 返回按钮插槽
   */
  icon?: {};
  /**
   * header插槽
   * @version 2.12.0
   */
  header?: {};
  /**
   * 标题插槽
   */
  title?: {};
  /**
   * 标题外部插槽
   * @version 2.12.0
   */
  titleOuter?: {};
  /**
   * 标签插槽
   */
  tags?: {};
  /**
   * 内容区域插槽
   */
  content?: {};
  /**
   * 额外内容插槽
   */
  extra?: {};
  /**
   * 面包屑插槽
   */
  breadcrumb?: {};
}>;

export type PageHeaderSlots = typeof usePageHeaderSlots;
