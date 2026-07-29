import type { TransferDataProps, CheckboxUnionType } from './useProps';
import { isObject, isString } from '@aurora/utils';

export const useTransferEmits = {
  /**
   * @param value 选中key值
   * @paramEn value The value value.
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: CheckboxUnionType | CheckboxUnionType[]) => value,
  /**
   * 失焦时触发
   * @param evt 失焦事件
   * @paramEn evt The evt value.
    * @en Emitted when blur changes.
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 选项在两栏之间转移时触发
   * @param value 选中key值
   * @paramEn value The value value.
    * @en Emitted when change changes.
   */
  change: (
    targetKeys: CheckboxUnionType[],
    direction: 'left' | 'right',
    moveKeys: CheckboxUnionType[],
  ) => isObject(targetKeys) || isString(direction) || isObject(moveKeys),
  /**
   * left栏选中项发生变化时触发
   * @param value 选中key值
   * @paramEn value The value value.
    * @en Emitted when left check change changes.
   */
  leftCheckChange: (value: CheckboxUnionType[]) => value,
  /**
   * right栏选中项发生变化时触发
   * @param value 选中key值
   * @paramEn value The value value.
    * @en Emitted when right check change changes.
   */
  rightCheckChange: (value: CheckboxUnionType[]) => value,
  /**
   * 搜索框内容时改变时触发
   * @param value 搜索框内容
   * @paramEn value The value value.
    * @en Emitted when search changes.
   */
  search: (value: string) => value,
};
export type TransferEmits = typeof useTransferEmits;

export const useTransferPanelEmits = {
  /**
   *
   * @param value 选中key值
   * @paramEn value The value value.
   * @returns
    * @en Emitted when transfer changes.
   */
  transfer: (value: CheckboxUnionType[]) => value,
  /**
   *
   * @param value 删除key值
   * @paramEn value The value value.
   * @returns
    * @en Emitted when remove changes.
   */
  remove: (value: CheckboxUnionType[]) => value,
  /**
   * @param isExpandRoot 是否展开根节点
   * @paramEn isExpandRoot The is expand root value.
   * @param value 展开的对象
   * @paramEn value The value value.
   * @returns
    * @en Emitted when expand changes.
   */
  expand: (isExpandRoot: boolean, value?: TransferDataProps) => value,
};

export type TransferPanelEmits = typeof useTransferPanelEmits;
