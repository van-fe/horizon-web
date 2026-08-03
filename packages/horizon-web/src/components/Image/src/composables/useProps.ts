import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export interface HImageAction {
  /** 图标名称
   * @en Configuration for icon.
 */
  icon: string;
  /** 标题
   * @en Configuration for title.
 */
  title: string;
  /** 点击事件
   * @en Configuration for handler.
 */
  handler: (src: string) => void;
}
export const useImageProps = declarePropType({
  /** 图片的文件路径
   * @en Configuration for src.
 */
  src: {
    type: String,
    required: true,
  },
  /** 图片的备用文本描述，详见 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt)
   * @en Configuration for alt.
 */
  alt: {
    type: String,
    default: '',
  },
  /** 图片宽度
   * @en Configuration for width.
 */
  width: {
    type: [String, Number],
    required: false,
    default: 'auto',
  },
  /** 图片最大宽度
   * @en Configuration for max width.
 */
  maxWidth: {
    type: [String, Number],
    required: false,
    default: 'none',
  },
  /** 图片高度
   * @en Configuration for height.
 */
  height: {
    type: [String, Number],
    required: false,
    default: 'auto',
  },
  /** 图片最大高度
   * @en Configuration for max height.
 */
  maxHeight: {
    type: [String, Number],
    required: false,
    default: 'none',
  },
  /** 图片宽高比，详见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio)
   * @en Configuration for aspect ratio.
 */
  aspectRatio: {
    type: String,
    required: false,
    default: 'auto',
  },
  /** 图片如何适应内容框，详见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)
   * @en Configuration for object fit.
 */
  objectFit: {
    type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
    default: 'cover',
  },
  /** 圆角度数
   * @en Configuration for rounded.
 */
  rounded: {
    type: [String, Number],
    required: false,
    default: 0,
  },
  /** 是否启用加载完成的过渡动画
   * @en Configuration for animated.
 */
  animated: {
    type: Boolean,
    default: true,
  },
  /** 是否启用懒加载（仅当图片首次出现在可视区域时才加载图片）
   * @en Configuration for lazyload.
 */
  lazyload: {
    type: Boolean,
    default: false,
  },
  /** 图片标题
   * @en Configuration for title.
 */
  title: {
    type: String,
    default: '',
  },
  /** 是否以 tooltip 形式展示 `title` 字段
   * @en Configuration for show tooltip.
 */
  showTooltip: {
    type: Boolean,
    default: false,
  },
  /** 是否显示默认的占位图
   * @en Configuration for show placeholder.
 */
  showPlaceholder: {
    type: Boolean,
    default: true,
  },
  /** 是否显示默认的加载失败
   * @en Configuration for show error.
 */
  showError: {
    type: Boolean,
    default: true,
  },
  /** 是否启用图片查看器
   * @en Configuration for show viewer.
 */
  showViewer: {
    type: Boolean,
    default: false,
  },
  /** 图片查看器展示的大图链接，不传则自动取 `src`
   * @en Configuration for viewer src.
 */
  viewerSrc: {
    type: String,
    required: false,
  },
  /** 鼠标移上图片后是否显示操作按钮
   * @en Configuration for show actions.
 */
  showActions: {
    type: Boolean,
    default: false,
  },
  /** 操作按钮列表
   * @en Configuration for actions list.
 */
  actionsList: {
    type: Array as PropType<HImageAction[]>,
    default: () => [],
  },
  /**
   * 操作按钮的位置
   * auto: 根据图片大小自动设置
   * center: 按钮居中
   * bottom-right: 按钮位于右下角
    * @en Configuration for actions position.
   *  */
  actionsPosition: {
    type: String as PropType<'auto' | 'center' | 'bottom-right'>,
    default: 'auto',
  },
  /**
   * 操作按钮的类型
   * auto: 根据图片大小自动设置
   * icon: 图标类型
   * dropdown: 下拉菜单类型
    * @en Configuration for actions type.
   */
  actionsType: {
    type: String as PropType<'auto' | 'icon' | 'dropdown'>,
    default: 'auto',
  },
});

export const useImageListProps = {
  /** 图片之间的间距
   * @en Configuration for margin.
 */
  margin: {
    type: [String, Number],
    required: false,
    default: '8px',
  },
  /** 最多显示的图片数量，溢出的图片会默认显示 +{N}
   * @en Configuration for limit.
 */
  limit: {
    type: Number,
    default: Infinity,
  },
  /** 溢出文本的字体大小
   * @en Configuration for limit text size.
 */
  limitTextSize: {
    type: [String, Number],
    default: '14px',
  },
};

export type ImageProps = ExtractPropTypes<typeof useImageProps>;
export type ImageListProps = ExtractPropTypes<typeof useImageListProps>;
