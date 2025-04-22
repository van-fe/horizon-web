import type { NAutoCompleteOptionWithUuid } from '../utils/typed';
import { isObject } from '@nio-fe/shared';

export const useAutoCompleteSlots = {
  default: (item: NAutoCompleteOptionWithUuid) => isObject(item),
  /**
   * 当为空时展示的插槽
   */
  empty: () => true,
  /**
   * 自定义 `option` 面板中的顶部内容
   */
  panelHeaderRender: () => true,
  /**
   * 自定义 `option` 面板中的底部内容
   */
  panelFooterRender: () => true,
  /**
   * 自定义选择器渲染
   */
  picker: () => true,
  /**
   * 自定义选择器内部渲染
   */
  pickerInner: () => true,
  /**
   * 自定义选择器最外部渲染
   */
  pickerContainer: () => true,
};

export type AutoCompleteSlots = typeof useAutoCompleteSlots;
