import { isBoolean, isDefined, isString, isUndefined } from '@aurora/utils';

export const useTagEmits = {
  /**
   * @param val 是否激活
   * @paramEn val The val value.
   * @en Emitted when update:model value changes.
   */
  'update:modelValue': (val: boolean) => isBoolean(val),
  /**
   * 点击时触发
   * @en Emitted when click changes.
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 点击关闭 `icon` 时触发
   * @en Emitted when close changes.
   */
  close: (e: MouseEvent) => e instanceof MouseEvent,
};

export const useTagGroupEmits = {
  /**
   * 创建了标签后触发
   * @param content 创建标签的内容
   * @paramEn content The content value.
   * @en Emitted when created changes.
   */
  created: (content: string) => isString(content),
  /**
   * 修改了标签后触发
   * @param newValue 修改标签的内容
   * @paramEn newValue The new value value.
   * @param oldValue 原值
   * @paramEn oldValue The old value value.
   * @param id `tag` 的唯一识别符
   * @paramEn id The id value.
   * @en Emitted when edited changes.
   */
  edited: (newValue: string, oldValue: string, id: string | number | symbol | undefined) =>
    isString(newValue) && isString(oldValue) && (isDefined(id) || isUndefined(id)),
  /**
   * 关闭了标签后触发
   * @param id `tag` 的唯一识别符
   * @paramEn id The id value.
   * @en Emitted when closed changes.
   */
  closed: (id: string | number | symbol | undefined) => isDefined(id) || isUndefined(id),
  /**
   * 展开或收起后触发
   * @param isExpanded 是否展开
   * @paramEn isExpanded The is expanded value.
   * @en Emitted when toggled changes.
   */
  toggled: (isExpanded: boolean) => isBoolean(isExpanded),
  /**
   * 如果 `h-tag` 溢出时触发
   * @en Emitted when exceeded changes.
   */
  exceeded: () => true,
};

export type TagEmits = typeof useTagEmits;
export type TagGroupEmits = typeof useTagGroupEmits;
