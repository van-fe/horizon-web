import type { SlotsType } from 'vue';
export const useAnchorSlots = Object as SlotsType<{
  /**
   * `n-anchor-link` 内容
   */
  default?: {},
}>

export const useAnchorLinkSlots = Object as SlotsType<{
  /**
   * 展示的内容
   */
  default?: {},
  /**
   * 自定义 `AnchorLink` 中的渲染内容，优先级比 `props.title` 低（若只使用该插槽，则不会有“title的数字后缀”和“Tooltip提示”）
   */
  title?: {},
}>

export type AnchorSlots = typeof useAnchorSlots;
export type AnchorLinkSlots = typeof useAnchorLinkSlots;
