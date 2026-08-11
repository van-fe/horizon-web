import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useAnchorProps = declarePropType({
  /**
   * 组件尺寸
   *
   * medium：文字14px，导航整体宽度140px。距上24px，距左32px
   * small：文字12px，导航整体宽度120px。距上24px，距左32px
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
    required: false,
  },
  /**
   * 导航容器的最大高度，超出时会显示滚动条（优先级较高，单位为“px”，不包含margin）
    * @en Configuration for max height.
   */
  maxHeight: {
    type: Number,
    default: 750,
  },
  /**
   * 是否改变 `hash`
    * @en Configuration for change hash.
   */
  changeHash: {
    type: Boolean,
    default: true,
  },
  /**
   * 指定滚动容器
    * @en Configuration for scroll container.
   */
  scrollContainer: {
    type: [String, Object] as PropType<string | HTMLElement | Window>,
    required: false,
  },
  /**
   * 滚动行为的“平滑程度”（和 MDN文档 保持一致）
    * @en Configuration for scroll behavior.
   */
  scrollBehavior: {
    type: String as PropType<'smooth' | 'auto'>,
    default: 'smooth',
  },
  /**
   * 滚动的偏移量。即文档滚动结束时，锚点距离“滚动容器”顶部的距离。
   * 该值的类型为`number`时，单位固定为“px”，相对于“滚动容器”的顶部。（默认为：'start'，即 0 ）
    * @en Configuration for scroll offset.
   */
  scrollOffset: {
    type: [String, Number] as PropType<'start' | 'center' | 'end' | number>,
    default: 'start',
  },
  /**
   * 锚点区域边界的偏移量。即滚动内容距离“滚动容器”顶部达到指定偏移量时触发“当前高亮的Link”改变。
   * 该值的类型为`number`时，单位固定为“px”，相对于“滚动容器”的顶部。（默认为：5 ）
    * @en Configuration for bounds offset.
   */
  boundsOffset: {
    type: [String, Number] as PropType<'start' | 'center' | 'end' | number>,
    default: 5,
  },
  /**
   * 是否开启折叠模式
    * @en Configuration for use collapse.
   */
  useCollapse: {
    type: Boolean,
    default: false,
  },
  /**
   * 默认的折叠状态（仅在折叠模式下生效，默认处于非折叠状态）
    * @en Configuration for collapse.
   */
  collapse: {
    type: Boolean,
    default: false,
  },
  /**
   * 收起时的提示文本
   * 默认使用国际化
    * @en Configuration for collapse text.
   */
  collapseText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 是否显示左侧边线
    * @en Configuration for show line.
   */
  showLine: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示左侧边线上的“高亮”部分
    * @en Configuration for show highlight line.
   */
  showHighlightLine: {
    type: Boolean,
    default: true,
  },
  /**
   * 一级导航的“title”末尾是否展示数字后缀（表示其下面的二级导航的总个数）
    * @en Configuration for show title suffix.
   */
  showTitleSuffix: {
    type: Boolean,
    default: false,
  },
  /**
   * Tooltip的弹出方向（导航title溢出打点展示时，若处于hover状态则会弹出）
    * @en Configuration for placement.
   */
  placement: {
    type: String as PropType<
      'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'top' | 'bottom' | 'right' | 'left'
    >,
    default: 'left',
  },
  /**
   * 导航容器的样式对象（Anchor组件的默认定位方式为`relative`，通过该属性可自定义它的定位方式）
    * @en Configuration for style.
   */
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  /**
   * 是否开启“自动渲染”模式
    * @en Configuration for auto render.
   */
  autoRender: {
    type: Boolean,
    default: false,
  },
  /**
   * 自动渲染规则（数组索引表示导航级别，默认支持6级，也支持无限叠加）
   * 各级规则可以配置为字符串数组（该处的字符串实则为“CSS选择器”），例如: [['h1', 'h2'], 'h3', 'h4', 'h5']
    * @en Configuration for auto render rules.
   */
  autoRenderRules: {
    type: Array as PropType<(string | string[])[]>,
    default: () => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  /**
   * 可以覆盖 `h-anchor-link` 的 `target`
    * @en Configuration for link target.
   */
  linkTarget: {
    type: String as PropType<'_self' | '_blank' | '_parent' | '_top'>,
  },
});

export const useAnchorLinkProps = declarePropType({
  /**
   * 描述内容
    * @en Configuration for title.
   */
  title: {
    type: String,
  },
  /**
   * 锚点链接
    * @en Configuration for href.
   */
  href: {
    type: String,
  },
  /**
   * 该属性指定在何处显示链接的资源（和 MDN文档 保持一致）
    * @en Configuration for target.
   */
  target: {
    type: String as PropType<'_self' | '_blank' | '_parent' | '_top'>,
    default: '_self',
  },
});

export type AnchorProps = ExtractPropTypes<typeof useAnchorProps>;
export type AnchorLinkProps = ExtractPropTypes<typeof useAnchorLinkProps>;
