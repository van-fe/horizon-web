import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { AnchorListItem } from '../utils/extra';

export const useAnchorExposes = {
  /**
   * 更新当前活动的链接
   * @param link 当前锚点
   * @paramEn link The link value.
   * @param needScroll 是否需要滚动到对应位置
   * @paramEn needScroll The need scroll value.
    * @en Controls update active link.
   */
  updateActiveLink: Function as ExposeType<(link: string, needScroll?: boolean) => void>,
  /**
   * 重新获取锚点节点（用于在“自动渲染”模式下重新获取锚点节点）
    * @en Controls refresh anchor list.
   */
  refreshAnchorList: Function as ExposeType<() => void>,
  /**
   * 重新获取 `props.scrollContainer` 所标记的对象
   * 仅对于 `props.scrollContainer` 是字符串时需要使用，且如果 `anchor` 挂载早于 `props.scrollContainer` 时，则需要使用此方法重新获取
    * @en Controls update scroll container.
   */
  updateScrollContainer: Function as ExposeType<() => void>,
  /**
   * 获取锚点列表
   * 在使用自动渲染时，可以使用这个方法获取锚点节点列表
   * @return AnchorListItem 锚点节点列表
    * @en Controls get anchor list.
   */
  getAnchorList: Function as ExposeType<() => AnchorListItem[]>,
};

export type AnchorExposes = ExtractExposeTypes<typeof useAnchorExposes>;
