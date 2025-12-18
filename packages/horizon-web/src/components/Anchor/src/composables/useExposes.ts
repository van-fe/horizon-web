import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { AnchorListItem } from '../utils/extra';

export const useAnchorExposes = {
  /**
   * 更新当前活动的链接
   * @param link 当前锚点
   * @param needScroll 是否需要滚动到对应位置
   * @version 2.0.0-beta.2
   */
  updateActiveLink: Function as ExposeType<(link: string, needScroll?: boolean) => void>,
  /**
   * 重新获取锚点节点（用于在“自动渲染”模式下重新获取锚点节点）
   * @version 2.0.5
   */
  refreshAnchorList: Function as ExposeType<() => void>,
  /**
   * 重新获取 `props.scrollContainer` 所标记的对象
   * 仅对于 `props.scrollContainer` 是字符串时需要使用，且如果 `anchor` 挂载早于 `props.scrollContainer` 时，则需要使用此方法重新获取
   * @version 2.0.10
   */
  updateScrollContainer: Function as ExposeType<() => void>,
  /**
   * 获取锚点列表
   * 在使用自动渲染时，可以使用这个方法获取锚点节点列表
   * @return AnchorListItem 锚点节点列表
   * @version 2.9.1
   */
  getAnchorList: Function as ExposeType<() => AnchorListItem[]>,
};

export type AnchorExposes = ExtractExposeTypes<typeof useAnchorExposes>;
