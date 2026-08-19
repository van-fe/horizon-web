import type { AdaptComponentApiShape, PageHeaderRegionMap } from '@aurora/core';
import type { SlotsType } from 'vue';

type PageHeaderVueSlots = AdaptComponentApiShape<
  PageHeaderRegionMap,
  {
    body: 'default';
    backIcon: 'icon';
    titleContainer: 'titleOuter';
    description: 'content';
    actions: 'extra';
  }
>;

export const usePageHeaderSlots = Object as SlotsType<{
  /**
   * 默认插槽
   * @en Custom content for the default slot.
   */
  default?: PageHeaderVueSlots['default'];
  /**
   * 返回按钮插槽
   * @en Custom content for the icon slot.
   */
  icon?: PageHeaderVueSlots['icon'];
  /**
   * header插槽
   * @en Custom content for the header slot.
   */
  header?: PageHeaderVueSlots['header'];
  /**
   * 标题插槽
   * @en Custom content for the title slot.
   */
  title?: PageHeaderVueSlots['title'];
  /**
   * 标题外部插槽
   * @en Custom content for the title outer slot.
   */
  titleOuter?: PageHeaderVueSlots['titleOuter'];
  /**
   * 标签插槽
   * @en Custom content for the tags slot.
   */
  tags?: PageHeaderVueSlots['tags'];
  /**
   * 内容区域插槽
   * @en Custom content for the content slot.
   */
  content?: PageHeaderVueSlots['content'];
  /**
   * 额外内容插槽
   * @en Custom content for the extra slot.
   */
  extra?: PageHeaderVueSlots['extra'];
  /**
   * 面包屑插槽
   * @en Custom content for the breadcrumb slot.
   */
  breadcrumb?: PageHeaderVueSlots['breadcrumb'];
}>;

export type PageHeaderSlots = typeof usePageHeaderSlots;
