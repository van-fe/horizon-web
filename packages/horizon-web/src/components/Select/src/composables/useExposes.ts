import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { OptionProps } from './useProps';
import type { VNode } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

export const useSelectExposes = {
  /**
   手动处理确认操作，只有在 `need-confirm = true` 时有效
    * @en Controls confirm handle.
   */
  confirmHandle: Function as ExposeType<() => void>,
  /**
   * 手动处理取消操作，只有在 `need-confirm = true` 时有效
    * @en Controls cancel handle.
   */
  cancelHandle: Function as ExposeType<() => void>,
  /**
   * 设置 select 为输入状态
    * @en Controls set input able.
   */
  setInputAble: Function as ExposeType<() => void>,
  /**
   * 控制面板是否展示
    * @en Controls change panel visible.
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
  /**
   * 聚焦在某个选项上
    * @en Controls focus option.
   */
  focusOption: Function as ExposeType<(optionValue: OptionProps['value']) => void>,
  /**
   * 清空
    * @en Controls clear.
   */
  clear: Function as ExposeType<() => void>,
  /**
   * 已选标签列表
    * @en Controls rendered model value tags.
   */
  renderedModelValueTags: Object as ExposeType<Array<VNode | JSX.Element>>,
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

export const useSelectVirtualScrollListExposes = {
  /**
   * 滚动到指定索引
    * @en Controls scroll to index.
   */
  scrollToIndex: Function as ExposeType<(index: number, checkInViewport?: boolean) => void>,
  /**
   * 滚动到当前选中值
    * @en Controls scroll to active model value.
   */
  scrollToActiveModelValue: Function as ExposeType<() => void>,
};

export type SelectExposes = ExtractExposeTypes<typeof useSelectExposes>;
export type SelectVirtualScrollListExposes = ExtractExposeTypes<typeof useSelectVirtualScrollListExposes>;
