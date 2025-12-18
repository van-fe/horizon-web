import type { SlotsType } from 'vue';

export const useAutoCompleteSlots = Object as SlotsType<{
  /**
   * 当为空时展示的插槽
   */
  empty?: {};
  /**
   * 自定义 `option` 面板中的顶部内容
   */
  panelHeaderRender?: {};
  /**
   * 自定义 `option` 面板中的底部内容
   */
  panelFooterRender?: {};
  /**
   * 自定义选择器渲染
   */
  picker?: {};
  /**
   * 自定义选择器内部渲染
   */
  pickerInner?: {};
  /**
   * 自定义选择器最外部渲染
   */
  pickerContainer?: {};
}>;

export type AutoCompleteSlots = typeof useAutoCompleteSlots;
