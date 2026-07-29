import type { SlotsType } from 'vue';
import type { TransferDataProps } from '~/components/Transfer/src/composables/useProps';

export const useTransferSlots = Object as SlotsType<{
  /**
   * 左侧列表头部的内容
    * @en Custom content for the left header slot.
   */
  leftHeader?: {};
  /**
   * 右侧列表头部的内容
    * @en Custom content for the right header slot.
   */
  rightHeader?: {};
  /**
   * 左侧列表底部的内容
    * @en Custom content for the left footer slot.
   */
  leftFooter?: { filterData: TransferDataProps[]; type: string };
  /**
   * 右侧列表底部的内容
    * @en Custom content for the right footer slot.
   */
  rightFooter?: { filterData: TransferDataProps[]; type: string };
  /**
   * 左侧列表筛选
    * @en Custom content for the left filter slot.
   */
  leftFilter?: {};
  /**
   * 左侧列表空数据
    * @en Custom content for the left empty slot.
   */
  leftEmpty?: {};
  /**
   * 右侧列表空数据
    * @en Custom content for the right empty slot.
   */
  rightEmpty?: {};
  /**
   * 双栏之前的自定义区域
    * @en Custom content for the control slot.
   */
  control?: {};
  /**
   * 自定义单个Item
    * @en Custom content for the item slot.
   */
  item?: { item?: any; type: string };
  /**
   * 自定义左侧 body 渲染内容
    * @en Custom content for the left body slot.
   */
  leftBody?: { data: TransferDataProps[] };
  /**
   * 自定义右侧 body 渲染内容
    * @en Custom content for the right body slot.
   */
  rightBody?: { data: TransferDataProps[] };
}>;

export const useTransferPanelSlots = Object as SlotsType<{
  /**
   * 头部内容
    * @en Custom content for the header slot.
   */
  header?: {};
  /**
   * 底部内容
    * @en Custom content for the footer slot.
   */
  footer?: {};
  /**
   * 筛选内容
    * @en Custom content for the filter slot.
   */
  filter?: {};
  /**
   * 主体内容
    * @en Custom content for the body slot.
   */
  body?: {};
  /**
   * 面包屑内容
    * @en Custom content for the breadcrumb slot.
   */
  breadcrumb?: {};
  /**
   * 面包屑内容
    * @en Custom content for the breadcrumb item slot.
   */
  breadcrumbItem?: {};
  /**
   * 自定义单个Item
    * @en Custom content for the item slot.
   */
  item?: { item?: any; type: string };
  /**
   * 空数据内容
    * @en Custom content for the empty slot.
   */
  empty?: {};
}>;

export type TransferSlots = typeof useTransferSlots;
export type TransferPanelSlots = typeof useTransferPanelSlots;
