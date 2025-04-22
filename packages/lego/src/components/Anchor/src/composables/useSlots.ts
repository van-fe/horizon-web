export const useAnchorSlots = {
  /**
   * `n-anchor-link` 内容
   */
  default: () => true,
};

export const useAnchorLinkSlots = {
  /**
   * 展示的内容
   */
  default: () => true,
  /**
   * 自定义 `AnchorLink` 中的渲染内容，优先级比 `props.title` 低（若只使用该插槽，则不会有“title的数字后缀”和“Tooltip提示”）
   */
  title: () => true,
};

export type AnchorSlots = typeof useAnchorSlots;
export type AnchorLinkSlots = typeof useAnchorLinkSlots;
