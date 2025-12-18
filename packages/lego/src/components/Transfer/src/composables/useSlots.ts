import type { SlotsType } from 'vue';
import type { TransferDataProps } from '../composables/useProps';

export const useTransferSlots = Object as SlotsType<{
  /**
   * 左侧列表头部的内容
   */
  leftHeader?: {},
  /**
   * 右侧列表头部的内容
   */
  rightHeader?: {},
  /**
   * 左侧列表底部的内容
   */
  leftFooter?: { filterData: TransferDataProps[]; type: string },
  /**
   * 右侧列表底部的内容
   */
  rightFooter?: { filterData: TransferDataProps[]; type: string },
  /**
   * 左侧列表筛选
   */
  leftFilter?: {},
  /**
   * 左侧列表空数据
   */
  leftEmpty?: {},
  /**
   * 右侧列表空数据
   */
  rightEmpty?: {},
  /**
   * 双栏之前的自定义区域
   */
  control?: {},
  /**
   * 自定义单个Item
   */
  item?: { item?: any; type: string },
  /**
   * 自定义左侧body渲染内容
   */
  leftBody?: { data: TransferDataProps[] },
  /**
   * 自定义右侧body渲染内容
   */
  rightBody?: { data: TransferDataProps[] },
}>;

export type TransferSlots = typeof useTransferSlots;
