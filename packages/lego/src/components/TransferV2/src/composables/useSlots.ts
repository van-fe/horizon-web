import { isObject } from '@nio-fe/shared';
import type { TransferDataProps } from '~/components/Transfer/src/composables/useProps';

export const useTransferV2Slots = {
  /**
   * 左侧列表头部的内容
   */
  leftHeader: () => true,
  /**
   * 右侧列表头部的内容
   */
  rightHeader: () => true,
  /**
   * 左侧列表底部的内容
   */
  leftFooter: (val: { filterData: TransferDataProps[]; type: string }) => isObject(val),
  /**
   * 右侧列表底部的内容
   */
  rightFooter: (val: { filterData: TransferDataProps[]; type: string }) => isObject(val),
  /**
   * 左侧列表筛选
   */
  leftFilter: () => true,
  /**
   * 左侧列表空数据
   */
  leftEmpty: () => true,
  /**
   * 右侧列表空数据
   */
  rightEmpty: () => true,
  /**
   * 双栏之前的自定义区域
   */
  control: () => true,
  /**
   * 自定义单个Item
   */
  item: (val: { item?: any; type: string }) => isObject(val),
  /**
   * 自定义body渲染内容
   */
  leftBody: (val: { data: TransferDataProps[] }) => true,
  rightBody: (val: { data: TransferDataProps[] }) => true,
};

export type TransferV2Slots = typeof useTransferV2Slots;
