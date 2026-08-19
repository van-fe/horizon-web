import type { SlotsType } from 'vue';
import type { AdaptComponentApiShape, TimeSelectRegionMap } from '@aurora/core';

type TimeSelectSlotMap = AdaptComponentApiShape<
  TimeSelectRegionMap,
  { panelHeader: 'panelHeaderRender'; panelFooter: 'panelFooterRender' }
>;

export const useTimeSelectSlots = Object as SlotsType<
  TimeSelectSlotMap & {
    /**
     * 空状态内容
     * @en Custom empty-state content.
     */
    empty?: {};
    /**
     * 下拉面板顶部内容
     * @en Custom content above the time options.
     */
    panelHeaderRender?: {};
    /**
     * 下拉面板底部内容
     * @en Custom content below the time options.
     */
    panelFooterRender?: {};
  }
>;

export type TimeSelectSlots = typeof useTimeSelectSlots;
