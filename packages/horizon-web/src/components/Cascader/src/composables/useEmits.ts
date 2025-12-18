import type { ModelValueType, NCascaderExtendOption, NCascaderOption } from '../utils/types';
import { isBoolean, isDefined, isNil, isObject, isString, isUndefined } from '@aurora/utils';

export const useCascaderEmits = {
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
   * @deprecated dropdownVisibleChange
   * 下拉面板显隐切换时通知
   * @param visible 是否显示
   */
  panelVisibleChange: (visible: boolean) => isBoolean(visible),
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
  input: (inputValue: string) => isString(inputValue),
  /**
   * 更新 `options`，一般是异步获取时会更改 `options`
   * @param options
   */
  'update:options': (options: NCascaderOption[]) => Array.isArray(options),
  /**
   * 搜索输入框改变时通知
   * @param searchValue 搜索的文字
   */
  search: (searchValue: string) => isString(searchValue),
  /**
   * 选中或取消选中时触发
   * @param selectOrDeselect `true` 表示选中 `false` 表示取消选中，如果是 `undefined` 则代表是由用户传入更改的
   * @param option 被选中的 option 内容，如果 option === undefined，则代表选择的数据并非是 options 中已有的
   */
  change: (selectOrDeselect?: boolean, option?: NCascaderExtendOption) =>
    (isBoolean(selectOrDeselect) || isUndefined(selectOrDeselect)) &&
    (isObject(option) || isUndefined(option)),
  /**
   * 清空时触发
   */
  clear: () => true,
  /**
   * 选中某项时触发
   * @param valuePath 从父节点的 `cascader.options.*.value` 到当前选项的路径
   * @param option `cascader.options` 任一子元素
   * @version 2.4.6
   */
  select: (valuePath?: Array<string | number>, option?: NCascaderExtendOption) =>
    (Array.isArray(valuePath) || isNil(valuePath)) && (isDefined(option) || isNil(option)),
  /**
   * 多选模式下，选中取消项时触发
   * @param valuePath 从父节点的 `cascader.options.*.value` 到当前选项的路径
   * @param option `cascader.options` 任一子元素
   */
  deselect: (valuePath?: Array<string | number>, option?: NCascaderExtendOption) =>
    (Array.isArray(valuePath) || isNil(valuePath)) && (isDefined(option) || isNil(option)),
  /**
   * 当选中的 `option` 发生变更时触发
   * @param modelValue modelValue 值
   * @param selectOrDeselect 是选中还是取消选中，如果是 `undefined` 则代表是由用户传入更改的
   * @param option `cascader.options` 任一子元素，如果是多选+父子关联且选择了父节点，那这里只会抛出最后一个子节点的数据
   * @version 2.4.6
   */
  modify: (
    modelValue: ModelValueType,
    selectOrDeselect?: boolean,
    option?: NCascaderExtendOption,
  ) =>
    (Array.isArray(modelValue) || isNil(modelValue)) &&
    (isUndefined(selectOrDeselect) || isBoolean(selectOrDeselect)) &&
    (isDefined(option) || isNil(option)),
  /**
   * 点击确定时触发
   * @param modelValue modelValue 值
   * @deprecated confirm
   */
  confirmEnter: (modelValue: ModelValueType) => Array.isArray(modelValue) || isNil(modelValue),
  /**
   * 点击确定时触发
   * @param modelValue modelValue 值
   * @version 2.5.1
   */
  confirm: (modelValue: ModelValueType) => Array.isArray(modelValue) || isNil(modelValue),
  /**
   * 点击取消时触发
   * @param modelValue modelValue 值
   * @deprecated cancel
   */
  confirmCancel: (modelValue: ModelValueType) => Array.isArray(modelValue) || isNil(modelValue),
  /**
   * 点击取消时触发
   * @param modelValue modelValue 值
   * @version 2.5.1
   */
  cancel: (modelValue: ModelValueType) => Array.isArray(modelValue) || isNil(modelValue),
  /**
   * 在子面板触底时抛出此事件，可以做分页加载
   * @param evt 滚动事件或者键盘事件，如果为 undefined，则是虚拟滚动抛出的事件
   * @param parent 当前触底滚动面板的所属父级，如果为 nil 则为根节点
   * @version 2.12.13
   */
  panelReachBottom: (evt: Event | undefined, parent: NCascaderOption | null | undefined) =>
    (evt instanceof Event || isNil(evt)) && (isObject(parent) || isNil(parent)),
  /**
   * 点击时触发
   * @param evt 点击事件
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const useCascaderSearchPanelEmits = {
  /**
   * 提交确认
   */
  confirm: () => true,
};

export type CascaderEmits = typeof useCascaderEmits;
export type CascaderSearchPanelEmits = typeof useCascaderSearchPanelEmits;
