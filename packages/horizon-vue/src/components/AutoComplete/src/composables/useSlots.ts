import type { AutoCompleteRegionMap } from '@aurora/core';
import type { SlotsType } from 'vue';
import type { HAutoCompleteOption } from './useProps';

type AutoCompleteVueRegions = AutoCompleteRegionMap<HAutoCompleteOption>;

export const useAutoCompleteSlots = Object as SlotsType<{
  /** 空状态。 @en Empty-state content. */
  empty?: AutoCompleteVueRegions['empty'];
  /** 加载状态。 @en Loading-state content. */
  loading?: AutoCompleteVueRegions['loading'];
  /** 面板头部。 @en Popup header. */
  panelHeaderRender?: AutoCompleteVueRegions['panelHeader'];
  /** 面板底部。 @en Popup footer. */
  panelFooterRender?: AutoCompleteVueRegions['panelFooter'];
  /** 自定义建议项。 @en Custom suggestion content. */
  option?: (context: AutoCompleteVueRegions['option']) => unknown;
  /** 输入前缀。 @en Input prefix. */
  prefix?: AutoCompleteVueRegions['prefix'];
  /** 输入后缀。 @en Input suffix. */
  suffix?: AutoCompleteVueRegions['suffix'];
  /** 自定义选择器渲染。 @en Custom Picker content. */
  picker?: {};
  /** 自定义选择器内部渲染。 @en Custom inner Picker content. */
  pickerInner?: {};
  /** 自定义选择器容器。 @en Custom Picker container. */
  pickerContainer?: {};
}>;

export type AutoCompleteSlots = typeof useAutoCompleteSlots;
