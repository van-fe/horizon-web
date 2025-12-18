import { isBoolean, isDefined, isString, isUndefined } from '@aurora/utils';

export const useTagEmits = {
  /**
   * @param val 是否激活
   */
  'update:modelValue': (val: boolean) => isBoolean(val),
  /**
   * 点击时触发
   * @deprecated click
   */
  clickTag: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 点击时触发
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 点击关闭 `icon` 时触发
   * @deprecated close
   */
  closeTag: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 点击关闭 `icon` 时触发
   */
  close: (e: MouseEvent) => e instanceof MouseEvent,
};

export const useTagGroupEmits = {
  /**
   * 创建了标签后触发
   * @param content 创建标签的内容
   */
  created: (content: string) => isString(content),
  /**
   * 修改了标签后触发
   * @param newValue 修改标签的内容
   * @param oldValue 原值
   * @param id `tag` 的唯一识别符
   */
  edited: (newValue: string, oldValue: string, id: string | number | symbol | undefined) =>
    isString(newValue) && isString(oldValue) && (isDefined(id) || isUndefined(id)),
  /**
   * 关闭了标签后触发
   * @param id `tag` 的唯一识别符
   */
  closed: (id: string | number | symbol | undefined) => isDefined(id) || isUndefined(id),
  /**
   * 展开或收起后触发
   * @param isExpanded 是否展开
   */
  toggled: (isExpanded: boolean) => isBoolean(isExpanded),
  /**
   * 如果 `n-tag` 溢出时触发
   */
  exceeded: () => true,
};

export type TagEmits = typeof useTagEmits;
export type TagGroupEmits = typeof useTagGroupEmits;
