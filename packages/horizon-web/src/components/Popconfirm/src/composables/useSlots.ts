import type { SlotsType } from 'vue';
export const usePopconfirmSlots = Object as SlotsType<{
  /** 触发元素 @en Trigger element. */ reference?: {};
  /** 自定义提示内容 @en Custom confirmation content. */ default?: {};
  /** 自定义图标 @en Custom icon. */ icon?: {};
}>;
export type PopconfirmSlots = typeof usePopconfirmSlots;
