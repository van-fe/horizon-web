import type { ExtractPropTypes, PropType } from 'vue';
import type { WatermarkContentStyle } from '../utils/types';

export const useWatermarkProps = {
  /**
   * 全局模式（全局模式下，水印内容为“fixed”定位，且会挂在到body标签下面；非全局模式下，水印内容为“absolute”定位）
    * @en Configuration for global.
   */
  global: {
    type: Boolean,
    default: false,
  },
  /**
   * 挂载水印内容的外层容器（若有设置“container”，则水印将作为子元素挂载到“container”下面；否则，将作为兄弟节点挂载到“默认插槽”内容之后）
   * PS：使用“v-watermark”指令时，若处于非全局模式，”container“的值将固定为”绑定该指令的元素“
    * @en Configuration for container.
   */
  container: {
    type: Object as PropType<HTMLElement>,
  },
  /**
   * 水印文本内容（单行文本水印内容，值为字符串；多行文本水印内容，值为字符串数组）
    * @en Configuration for content.
   */
  content: {
    type: [String, Array] as PropType<string | string[]>,
    default: 'watermark',
  },
  /**
   * 水印图片内容（值为图片的URL地址，优先级比`content`高，支持base64格式，建议传入"2 or 3"倍图）
    * @en Configuration for image.
   */
  image: {
    type: String,
  },
  /**
   * 单个水印内容的宽度，单位为px
    * @en Configuration for width.
   */
  width: {
    type: Number,
    default: 120,
  },
  /**
   * 单个水印内容的高度，单位为px
    * @en Configuration for height.
   */
  height: {
    type: Number,
    default: 64,
  },
  /**
   * 单个水印内容的旋转角度，单位为deg
    * @en Configuration for rotate.
   */
  rotate: {
    type: Number,
    default: -15,
  },
  /**
   * 水印整体的“z-index”层级
    * @en Configuration for z index.
   */
  zIndex: {
    type: Number,
    default: 99999,
  },
  /**
   * 水印文本内容的样式
    * @en Configuration for content style.
   */
  contentStyle: {
    type: Object as PropType<WatermarkContentStyle>,
    default: () => ({
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      fontFamily: 'sans-serif',
      color: 'rgba(115, 117, 122, 1)',
    }),
  },
  /**
   * 多行文本时，各行文本之间的间距，单位为px
    * @en Configuration for line gap.
   */
  lineGap: {
    type: Number,
    default: 5,
  },
  /**
   * 各水印内容在水平(x)和垂直方向(y)的padding（[x, y]），单位为px
    * @en Configuration for gap.
   */
  gap: {
    type: Object as PropType<[number, number]>,
    default: () => [100, 60],
  },
  /**
   * 水印整体距离容器左上角的偏移量，单位为px
    * @en Configuration for offset.
   */
  offset: {
    type: Object as PropType<[number, number]>,
    default: () => [0, 0],
  },
  /**
   * 水印整体的不透明度，取值范围：0 ～ 1
    * @en Configuration for opacity.
   */
  opacity: {
    type: Number,
    default: 0.1,
  },
};

export type WatermarkProps = ExtractPropTypes<typeof useWatermarkProps>;
