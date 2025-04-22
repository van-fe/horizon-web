export const usePageHeaderSlots = {
  /**
   * 默认插槽
   */
  default: () => true,
  /**
   * 返回按钮插槽
   */
  icon: () => true,
  /**
   * header插槽
   * @version 2.12.0
   */
  header: () => true,
  /**
   * 标题插槽
   */
  title: () => true,
  /**
   * 标题外部插槽
   * @version 2.12.0
   */
  titleOuter: () => true,
  /**
   * 标签插槽
   */
  tags: () => true,
  /**
   * 内容区域插槽
   */
  content: () => true,
  /**
   * 额外内容插槽
   */
  extra: () => true,
  /**
   * 面包屑插槽
   */
  breadcrumb: () => true,
};

export type PageHeaderSlots = typeof usePageHeaderSlots;
