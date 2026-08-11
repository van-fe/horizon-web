import type { SlotsType } from 'vue';
import type { AdaptComponentApiShape, PopconfirmRegionMap } from '@aurora/core';

type PopconfirmVueSlots = AdaptComponentApiShape<
  PopconfirmRegionMap,
  { trigger: 'reference'; content: 'default' }
>;

export const usePopconfirmSlots = Object as SlotsType<{
  /** 触发元素 @en Trigger element. */ reference?: PopconfirmVueSlots['reference'];
  /** 自定义提示内容 @en Custom confirmation content. */ default?: PopconfirmVueSlots['default'];
  /** 自定义图标 @en Custom icon. */ icon?: PopconfirmVueSlots['icon'];
}>;
export type PopconfirmSlots = typeof usePopconfirmSlots;
