import type { SlotsType } from 'vue';

export const useAutoCompleteSlots = Object as SlotsType<{
  /**
   * 当为空时展示的插槽
    * @en Custom content for the empty slot.
   */
  empty?: {};
  /**
   * 自定义 `option` 面板中的顶部内容
    * @en Custom content for the panel header render slot.
   */
  panelHeaderRender?: {};
  /**
   * 自定义 `option` 面板中的底部内容
    * @en Custom content for the panel footer render slot.
   */
  panelFooterRender?: {};
  /**
   * 自定义选择器渲染
    * @en Custom content for the picker slot.
   */
  picker?: {};
  /**
   * 自定义选择器内部渲染
    * @en Custom content for the picker inner slot.
   */
  pickerInner?: {};
  /**
   * 自定义选择器最外部渲染
    * @en Custom content for the picker container slot.
   */
  pickerContainer?: {};
}>;

export type AutoCompleteSlots = typeof useAutoCompleteSlots;
