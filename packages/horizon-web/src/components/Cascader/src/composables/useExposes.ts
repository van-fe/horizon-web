import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { ModelValueSingleType } from '../utils/types';
import type { VNode, Ref } from 'vue';
import { JSX } from 'vue/jsx-runtime';

export const useCascaderExposes = {
  /**
   * 确认方法
   * @deprecated confirmHandle
    * @en Controls enter handle.
   */
  enterHandle: Function as ExposeType<() => void>,
  /**
   * 确认方法
    * @en Controls confirm handle.
   */
  confirmHandle: Function as ExposeType<() => void>,
  /**
   * 取消方法
    * @en Controls cancel handle.
   */
  cancelHandle: Function as ExposeType<() => void>,
  /**
   * 确认操作
   * @deprecated confirmHandle / cancelHandle
    * @en Controls expose confirm.
   */
  exposeConfirm: Object as ExposeType<{
    enterHandle: () => void;
    confirmHandle: () => void;
    cancelHandle: () => void;
  }>,
  /**
   * 聚焦某个选项
   * @param optionValue 需要聚焦选项的 `value` 路径
   * @paramEn optionValue The option value value.
    * @en Controls focus option.
   */
  focusOption: Function as ExposeType<(valuePath: ModelValueSingleType[]) => void>,
  /**
   * 改变面板的显隐
   * @param status 是否显示
   * @paramEn status The status value.
    * @en Controls change panel visible.
   */
  changePanelVisible: Function as ExposeType<(status: boolean) => void>,
  /**
   * 设置是否可输入
    * @en Controls set input able.
   */
  setInputAble: Function as ExposeType<() => void>,
  /**
   * 使用 自定义 `select` 时(如：`selectRender\default slot`)，可以使用该方法触发输入事件，可以配合 `filter` 参数使用，达到过滤效果
   * @param value input 值，如果为 `null` 即清空
   * @paramEn value The value value.
    * @en Controls input change.
   */
  inputChange: Function as ExposeType<(value: string | null) => void>,
  /**
   * 清除选中项
    * @en Controls clear.
   */
  clear: Function as ExposeType<() => void>,
  /**
   * 渲染的选中项标签
    * @en Controls rendered model value tags.
   */
  renderedModelValueTags: Object as ExposeType<Ref<Array<VNode | JSX.Element>>>,
  /**
   * 聚焦
    * @en Controls focus.
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 失焦
    * @en Controls blur.
   */
  blur: Function as ExposeType<() => void>,
};

export const useCascaderPanelsExposes = {
  /**
   * 键盘操作事件处理
    * @en Controls keyboard event deal.
   */
  keyboardEventDeal: Function as ExposeType<(evt: KeyboardEvent) => void>,
  /**
   * 聚焦某个选项
    * @en Controls focus option.
   */
  focusOption: Function as ExposeType<(valuePath: ModelValueSingleType[]) => void>,
};

export type CascaderExposes = ExtractExposeTypes<typeof useCascaderExposes>;
export type CascaderPanelsExposes = ExtractExposeTypes<typeof useCascaderPanelsExposes>;
