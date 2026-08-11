import type { ModelValueType, HCascaderExtendOption, HCascaderOption } from '../utils/types';
import { isBoolean, isDefined, isNil, isObject, isString, isUndefined } from '@aurora/utils';

export const useCascaderEmits = {
  /**
   * modelValue 变更通知
   * @param value modelValue值
   * @paramEn value The value value.
   * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: ModelValueType) => isDefined(value) || isNil(value),
  /**
   * 下拉面板显隐切换时通知
   * @param visible 是否显示
   * @paramEn visible The visible value.
   * @en Emitted when dropdown visible change changes.
   */
  dropdownVisibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * 聚焦时通知
   * @en Emitted when focus changes.
   */
  focus: () => true,
  /**
   * 失焦时通知
   * @en Emitted when blur changes.
   */
  blur: () => true,
  /**
   * 输入文字时触发
   * @param inputValue 输入的文字
   * @paramEn inputValue The input value value.
   * @en Emitted when input changes.
   */
  input: (inputValue: string) => isString(inputValue),
  /**
   * 更新 `options`，一般是异步获取时会更改 `options`
   * @param options
   * @en Emitted when update:options changes.
   */
  'update:options': (options: HCascaderOption[]) => Array.isArray(options),
  /**
   * 搜索输入框改变时通知
   * @param searchValue 搜索的文字
   * @paramEn searchValue The search value value.
   * @en Emitted when search changes.
   */
  search: (searchValue: string) => isString(searchValue),
  /**
   * 选中或取消选中时触发
   * @param selectOrDeselect `true` 表示选中 `false` 表示取消选中，如果是 `undefined` 则代表是由用户传入更改的
   * @paramEn selectOrDeselect The select or deselect value.
   * @param option 被选中的 option 内容，如果 option === undefined，则代表选择的数据并非是 options 中已有的
   * @paramEn option The option value.
   * @en Emitted when change changes.
   */
  change: (selectOrDeselect?: boolean, option?: HCascaderExtendOption) =>
    (isBoolean(selectOrDeselect) || isUndefined(selectOrDeselect)) &&
    (isObject(option) || isUndefined(option)),
  /**
   * 清空时触发
   * @en Emitted when clear changes.
   */
  clear: () => true,
  /**
   * 选中某项时触发
   * @param valuePath 从父节点的 `cascader.options.*.value` 到当前选项的路径
   * @paramEn valuePath The value path value.
   * @param option `cascader.options` 任一子元素
   * @paramEn option The option value.
   * @en Emitted when select changes.
   */
  select: (valuePath?: Array<string | number>, option?: HCascaderExtendOption) =>
    (Array.isArray(valuePath) || isNil(valuePath)) && (isDefined(option) || isNil(option)),
  /**
   * 多选模式下，选中取消项时触发
   * @param valuePath 从父节点的 `cascader.options.*.value` 到当前选项的路径
   * @paramEn valuePath The value path value.
   * @param option `cascader.options` 任一子元素
   * @paramEn option The option value.
   * @en Emitted when deselect changes.
   */
  deselect: (valuePath?: Array<string | number>, option?: HCascaderExtendOption) =>
    (Array.isArray(valuePath) || isNil(valuePath)) && (isDefined(option) || isNil(option)),
  /**
   * 当选中的 `option` 发生变更时触发
   * @param modelValue modelValue 值
   * @paramEn modelValue The model value value.
   * @param selectOrDeselect 是选中还是取消选中，如果是 `undefined` 则代表是由用户传入更改的
   * @paramEn selectOrDeselect The select or deselect value.
   * @param option `cascader.options` 任一子元素，如果是多选+父子关联且选择了父节点，那这里只会抛出最后一个子节点的数据
   * @paramEn option The option value.
   * @en Emitted when modify changes.
   */
  modify: (
    modelValue: ModelValueType,
    selectOrDeselect?: boolean,
    option?: HCascaderExtendOption,
  ) =>
    (Array.isArray(modelValue) || isNil(modelValue)) &&
    (isUndefined(selectOrDeselect) || isBoolean(selectOrDeselect)) &&
    (isDefined(option) || isNil(option)),
  /**
   * 点击确定时触发
   * @param modelValue modelValue 值
   * @paramEn modelValue The model value value.
   * @en Emitted when confirm changes.
   */
  confirm: (modelValue: ModelValueType) => Array.isArray(modelValue) || isNil(modelValue),
  /**
   * 点击取消时触发
   * @param modelValue modelValue 值
   * @paramEn modelValue The model value value.
   * @en Emitted when cancel changes.
   */
  cancel: (modelValue: ModelValueType) => Array.isArray(modelValue) || isNil(modelValue),
  /**
   * 在子面板触底时抛出此事件，可以做分页加载
   * @param evt 滚动事件或者键盘事件，如果为 undefined，则是虚拟滚动抛出的事件
   * @paramEn evt The evt value.
   * @param parent 当前触底滚动面板的所属父级，如果为 nil 则为根节点
   * @paramEn parent The parent value.
   * @en Emitted when panel reach bottom changes.
   */
  panelReachBottom: (evt: Event | undefined, parent: HCascaderOption | null | undefined) =>
    (evt instanceof Event || isNil(evt)) && (isObject(parent) || isNil(parent)),
  /**
   * 点击时触发
   * @param evt 点击事件
   * @paramEn evt The evt value.
   * @en Emitted when click changes.
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const useCascaderSearchPanelEmits = {
  /**
   * 提交确认
   * @en Emitted when confirm changes.
   */
  confirm: () => true,
};

export type CascaderEmits = typeof useCascaderEmits;
export type CascaderSearchPanelEmits = typeof useCascaderSearchPanelEmits;
