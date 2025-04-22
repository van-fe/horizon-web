import type { TransferDataProps, CheckboxUnionType } from './useProps';
import { isObject, isString } from '@nio-fe/shared';

export const useTransferV2Emits = {
  /**
   * @param value 选中key值
   */
  'update:modelValue': (value: CheckboxUnionType | CheckboxUnionType[]) => value,
  /**
   * 失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 选项在两栏之间转移时触发
   * @param value 选中key值
   * @version 3.0.0
   */
  change: (
    targetKeys: CheckboxUnionType[],
    direction: 'left' | 'right',
    moveKeys: CheckboxUnionType[],
  ) => isObject(targetKeys) || isString(direction) || isObject(moveKeys),
  /**
   * left栏选中项发生变化时触发
   * @param value 选中key值
   * @version 3.0.0
   */
  leftCheckChange: (value: CheckboxUnionType[]) => value,
  /**
   * right栏选中项发生变化时触发
   * @param value 选中key值
   * @version 3.0.0
   */
  rightCheckChange: (value: CheckboxUnionType[]) => value,
  /**
   * 搜索框内容时改变时触发
   * @param value 搜索框内容
   * @version 3.0.0
   */
  search: (value: string) => value,
};
export type TransferV2Emits = typeof useTransferV2Emits;

export const useTransferV2PanelEmits = {
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

export type TransferV2PanelEmits = typeof useTransferV2PanelEmits;
