import type { TransferDataProps, CheckboxUnionType } from './useProps';
export const useTransferEmits = {
  /**
   * @param value 选中key值
   */
  'update:modelValue': (value: CheckboxUnionType | CheckboxUnionType[]) => value,
  /**
   * 失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
};
export type TransferEmits = typeof useTransferEmits;

export const useTransferPanelEmits = {
  /**
   *
   * @param value 选中key值
   * @returns
   */
  transfer: (value: CheckboxUnionType[]) => value,
  /**
   *
   * @param value 删除key值
   * @returns
   */
  remove: (value: CheckboxUnionType[]) => value,
  /**
   * @param isExpandRoot 是否展开根节点
   * @param value 展开的对象
   * @returns
   */
  expand: (isExpandRoot: boolean, value?: TransferDataProps) => value,
};
export type TransferPanelEmits = typeof useTransferPanelEmits;
