import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export interface HViewerLegend {
  /** 图注相对原始图片左上角的横轴位置 */
  x: number;
  /** 图注相对原始图片左上角的纵轴位置 */
  y: number;
  /** 图注标题 */
  label: string;
  /**
   * 图注点击事件，不设置说明图注不可点击
   * url是当前图片的地址
   */
  handler?: (url: string) => void;
}

export interface Source {
  /** 视频地址 */
  src: string;
  /** 视频类型，如 `video/mp4` */
  type?: string;
}
export interface HViewerSource {
  /** 资源的类型，图片或视频 */
  type: 'image' | 'video';
  /** 对于图片类型，表示大图地址；对于视频类型，表示视频的封面图片地址 */
  cover: string;
  /** 缩略图地址，如果不设置则取 `cover` */
  thumbnail?: string;
  /** 标题 */
  title?: string;
  /** 图注集合，仅对图片类型有效 */
  legends?: HViewerLegend[];
  /** 视频资源，是一个数组，如果传入多个会自动选择，仅对视频类型有效 */
  videoSources?: Source[];
}

export interface HViewerCustomToolItem {
  /** 图标名称 */
  iconName: string;
  /** 图标大小 */
  iconSize: string;
  /** 图标颜色 */
  iconColor: string;
  /** 按钮标题 */
  title: string;
  /** 按钮点击事件，会传入当前展示图片的url */
  handler: (url: string) => void;
}

export const useViewerProps = declarePropType({
  /** 控制显示隐藏 */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 资源列表 */
  sources: {
    type: Array as PropType<HViewerSource[]>,
    required: true,
    default: () => [],
  },
  /** 初始展示的图片序号 */
  initIndex: {
    type: Number,
    required: false,
    default: 0,
  },
  /** 是否支持循环切换 */
  loop: {
    type: Boolean,
    default: false,
  },
  /** 3秒无操作后自动隐藏工具栏 */
  autoHideTools: {
    type: Boolean,
    default: true,
  },
  /** CSS 层级 */
  zIndex: {
    type: Number,
    default: 1000,
  },
  /**
   * 自定义工具栏的按钮。内置按钮包括：
   * thumbnail: 切换显示隐藏缩略图
   * previous: 切换上一张
   * next: 切换下一张
   * current: 当前/总数
   * zoomOut: 缩小
   * zoomIn: 放大
   * ratio: 实时比例
   * 1:1: 切换自适应大小与实际大小
   * rotate: 旋转90°
   * legend: 切换显示隐藏图注，仅当存在图注时才会显示该按钮
   * download: 下载
   * split: 分割线
   * [CustomToolItem](#nviewercustomtoolitem): 自定义按钮
   */
  tools: {
    type: Array as PropType<
      (
        | 'thumbnail'
        | 'previous'
        | 'next'
        | 'current'
        | 'zoomOut'
        | 'zoomIn'
        | 'ratio'
        | '1:1'
        | 'rotate'
        | 'legend'
        | 'download'
        | 'split'
        | HViewerCustomToolItem
      )[]
    >,
    required: false,
  },
  /** 自定义下载函数，入参是当前图片或视频的地址 */
  downloadFn: {
    type: Function as PropType<(src: string) => void>,
    required: false,
  },
  /**
   * 是否允许点击遮罩关闭预览
   * @version 2.11.1
   */
  hideOnClickModal: {
    type: Boolean,
    default: false,
  },
});

export type ViewerProps = ExtractPropTypes<typeof useViewerProps>;
