import type { Ref, SlotsType } from 'vue';
import type { HCascaderExtendOption, HCascaderFilterPathData } from '../utils/types';

export const useCascaderSlots = Object as SlotsType<{
  /**
   * 自定义触发器完整展示内容，相当于直接使用 `cascaderPanel`
   * @param visible 是否显示
   * @paramEn visible The visible value.
   * @en Custom content for the default slot.
   */
  default?: { visible: Ref<boolean> };
  /**
   * 自定义 `select` 中被选中的项目
   * @param value 每个选项的经转义后的对象
   * @paramEn value The value value.
   * @en Custom content for the tag render slot.
   */
  tagRender?: HCascaderExtendOption;
  /**
   * 自定义 完整 `select` 渲染内容
   * @en Custom content for the select render slot.
   */
  selectRender?: {};
  /**
   * 自定义 `cascaderPanel` 选项渲染内容
   * @param props 当前子元素
   * @paramEn props The props value.
   * @en Custom content for the item render slot.
   */
  itemRender?: HCascaderExtendOption;
  /**
   * 自定义 `cascaderPanel` 中搜索场景下渲染内容
   * @param data 当前渲染的子选项
   * @paramEn data The data value.
   * @en Content slot for search panel render.
   */
  searchPanelRender: { paths: HCascaderFilterPathData[]; inputValue: string };
  /**
   * 自定义 `cascaderPanel` 空列表渲染内容
   * @en Custom content for the empty slot.
   */
  empty?: {};
  /**
   * 自定义 `cascaderPanel` 确认选中渲染内容
   * @param handler 确认和取消的操作方法
   * @paramEn handler The handler value.
   * @en Content slot for confirm render.
   */
  confirmRender: {
    cancelHandle: () => void;
    confirmHandle: () => void;
  };
  /**
   * 自定义面板中的顶部内容
   * @en Custom content for the panel header render slot.
   */
  panelHeaderRender?: {};
  /**
   * 自定义面板中的底部内容
   * @en Custom content for the panel footer render slot.
   */
  panelFooterRender?: {};
  /**
   * 自定义 `panelConfirmLeft` 渲染
   * @en Custom content for the panel confirm left slot.
   */
  panelConfirmLeft?: {};
}>;

export type CascaderSlots = typeof useCascaderSlots;
