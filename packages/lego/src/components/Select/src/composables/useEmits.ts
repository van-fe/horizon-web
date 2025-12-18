import type { ModelValueType } from '../utils/types';
import type { OptionProps } from './useProps';
import { isObject, isBoolean, isDefined, isNil, isString, isUndefined } from '@nio-fe/shared';

export const useSelectEmits = {
  /**
   * modelValue 变更通知
   * @param value modelValue值
   */
  'update:modelValue': (value: ModelValueType) => isDefined(value) || isNil(value),
  /**
   * 下拉面板显隐切换时通知
   * @param visible 是否显示
   */
  dropdownVisibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * 聚焦时通知
   * @version 2.1.0
   */
  focus: () => true,
  /**
   * 失焦时通知
   * @version 2.1.0
   */
  blur: () => true,
  /**
   * 输入文字时触发
   * @param inputValue 输入的文字
   */
  input: (inputValue: string | null | undefined) => isString(inputValue) || isNil(inputValue),
  /**
   * 搜索输入框改变时通知
   * @param searchValue 搜索的文字
   */
  search: (searchValue: string) => isString(searchValue),
  /**
   * 在 `option` 列表滚动到底部时触发，可以做动态载入 `option` 的回调
   * @version 2.9.1 增加 keyword 传参
   * @param evt 滚动事件或者键盘事件，如果为 undefined，则是虚拟滚动抛出的事件
   * @param keyword 搜索字符串
   */
  optionListReachBottom: (evt?: Event, keyword?: string) =>
    (evt instanceof Event || isUndefined(evt)) && (isString(keyword) || isUndefined(keyword)),
  /**
   * 选中 option 或者 input 输入框内容发生变化时触发
   * @param inputValue 输入框内容发生变化的值
   * @param optionOrModelValue 是被选中的 `option` 的 `value`，或 `modelValue` 值，`change` 触发时机较 `update:modelValue` 晚，所以可以在 `change` 方法中获取的是更新之后的 `modelValue`
   */
  change: (
    inputValue: string | null | undefined | ModelValueType,
    optionOrModelValue: ModelValueType,
  ) =>
    (isString(inputValue) || isNil(inputValue)) &&
    (isDefined(optionOrModelValue) || isNil(optionOrModelValue)),
  /**
   * 清空时触发
   */
  clear: () => true,
  /**
   * 多选模式下，选中取消项时触发
   * @param value 取消 `option` 的 `value`
   */
  deselect: (value: OptionProps['value']) => isDefined(value),
  /**
   * 点击时触发
   * @param evt 鼠标点击事件
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 确认时触发
   * @version 2.12.15-alpha.3
   */
  confirm: () => true,
  /**
   * 取消时触发
   * @version 2.12.15-alpha.3
   */
  cancel: () => true,
};

export const useOptionEmits = {
  /**
   * option 被点击时触发
   * @param value option 传入的value
   * @param ext 被被点击 option 上的 { ...attrs, ...props }
   * @param evt 鼠标点击事件
   * @version 2.1.0 增加 evt 传出
   */
  click: (value: OptionProps['value'], ext: any, evt: MouseEvent) =>
    isObject(ext) && evt instanceof MouseEvent,
};

export const useVirtualScrollListEmits = {
  /**
   * 鼠标移入
   * @param e 鼠标事件
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标移出
   * @param e 鼠标事件
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 触底时触发
   */
  reachBottom: () => true,
};

export type SelectEmits = typeof useSelectEmits;
export type OptionEmits = typeof useOptionEmits;
export type VirtualScrollListEmits = typeof useVirtualScrollListEmits;
