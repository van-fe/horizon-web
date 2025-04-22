import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';
import type { ModelValueSingleType } from '../utils/types';
import type { VNode, Ref } from 'vue';

export const useCascaderExposes = {
  /**
   * 确认方法
   * @deprecated confirmHandle
   */
  enterHandle: Function as ExposeType<() => void>,
  /**
   * 确认方法
   * @version 2.4.0
   */
  confirmHandle: Function as ExposeType<() => void>,
  /**
   * 取消方法
   */
  cancelHandle: Function as ExposeType<() => void>,
  /**
   * 确认操作
   * @deprecated confirmHandle / cancelHandle
   */
  exposeConfirm: Object as ExposeType<{
    enterHandle: () => void;
    confirmHandle: () => void;
    cancelHandle: () => void;
  }>,
  /**
   * 聚焦某个选项
   * @param optionValue 需要聚焦选项的 `value` 路径
   * @version 2.4.0
   */
  focusOption: Function as ExposeType<(valuePath: ModelValueSingleType[]) => void>,
  /**
   * 改变面板的显隐
   * @param status 是否显示
   * @version 2.4.0
   */
  changePanelVisible: Function as ExposeType<(status: boolean) => void>,
  /**
   * 设置是否可输入
   * @version 2.4.0
   */
  setInputAble: Function as ExposeType<() => void>,
  /**
   * 使用 自定义 `select` 时(如：`selectRender\default slot`)，可以使用该方法触发输入事件，可以配合 `filter` 参数使用，达到过滤效果
   * @param value input 值，如果为 `null` 即清空
   */
  inputChange: Function as ExposeType<(value: string | null) => void>,
  /**
   * 清除选中项
   * @version 2.12.15-alpha.3
   */
  clear: Function as ExposeType<() => void>,
  /**
   * 渲染的选中项标签
   * @version 2.12.15-alpha.3
   */
  renderedModelValueTags: Object as ExposeType<Ref<Array<VNode | JSX.Element>>>,
  /**
   * 聚焦
   * @version 2.12.15-alpha.3
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 失焦
   * @version 2.12.15-alpha.3
   */
  blur: Function as ExposeType<() => void>,
};

export const useCascaderPanelsExposes = {
  /**
   * 键盘操作事件处理
   */
  keyboardEventDeal: Function as ExposeType<(evt: KeyboardEvent) => void>,
  /**
   * 聚焦某个选项
   */
  focusOption: Function as ExposeType<(valuePath: ModelValueSingleType[]) => void>,
};

export type CascaderExposes = ExtractExposeTypes<typeof useCascaderExposes>;
export type CascaderPanelsExposes = ExtractExposeTypes<typeof useCascaderPanelsExposes>;
