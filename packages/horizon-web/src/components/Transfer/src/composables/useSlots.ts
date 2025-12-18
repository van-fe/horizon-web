import type { SlotsType } from 'vue';
import type { TransferDataProps } from '~/components/Transfer/src/composables/useProps';

export const useTransferSlots = Object as SlotsType<{
  /**
   * 左侧列表头部的内容
   */
  leftHeader?: {};
  /**
   * 右侧列表头部的内容
   */
  rightHeader?: {};
  /**
   * 左侧列表底部的内容
   */
  leftFooter?: { filterData: TransferDataProps[]; type: string };
  /**
   * 右侧列表底部的内容
   */
  rightFooter?: { filterData: TransferDataProps[]; type: string };
  /**
   * 左侧列表筛选
   */
  leftFilter?: {};
  /**
   * 左侧列表空数据
   */
  leftEmpty?: {};
  /**
   * 右侧列表空数据
   */
  rightEmpty?: {};
  /**
   * 双栏之前的自定义区域
   */
  control?: {};
  /**
   * 自定义单个Item
   */
  item?: { item?: any; type: string };
  /**
   * 自定义左侧 body 渲染内容
   */
  leftBody?: { data: TransferDataProps[] };
  /**
   * 自定义右侧 body 渲染内容
   */
  rightBody?: { data: TransferDataProps[] };
}>;

export const useTransferPanelSlots = Object as SlotsType<{
  /**
   * 头部内容
   */
  header?: {};
  /**
   * 底部内容
   */
  footer?: {};
  /**
   * 筛选内容
   */
  filter?: {};
  /**
   * 主体内容
   */
  body?: {};
  /**
   * 面包屑内容
   */
  breadcrumb?: {};
  /**
   * 面包屑内容
   */
  breadcrumbItem?: {};
  /**
   * 自定义单个Item
   */
  item?: { item?: any; type: string };
  /**
   * 空数据内容
   */
  empty?: {};
}>;

export type TransferSlots = typeof useTransferSlots;
export type TransferPanelSlots = typeof useTransferPanelSlots;
