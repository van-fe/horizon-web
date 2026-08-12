import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export type PanelsKey = string | number;
export type PanelsTransitionDirection = 'left' | 'right' | 'up' | 'down';

export interface PanelsCommonProps {
  /** 当前显示面板。 @en Currently displayed panel. */
  value: PanelsKey;
  /** 是否启用切换动画。 @en Whether panel switching is animated. */
  animated?: boolean;
  /** 是否使用垂直方向动画。 @en Whether switching uses vertical motion. */
  vertical?: boolean;
}

export interface PanelCommonProps {
  /** 面板唯一标识。 @en Unique panel key. */
  name: PanelsKey;
  /** 是否禁用并隐藏面板。 @en Whether the panel is disabled and hidden. */
  disabled?: boolean;
}

export type PanelDescriptor = Pick<PanelCommonProps, 'name' | 'disabled'>;

export type PanelsEventMap = EmptyComponentApi;
export type PanelEventMap = EmptyComponentApi;

export interface PanelsRegionMap {
  /** 面板条目。 @en Composed panel items. */
  content: EmptyComponentApi;
}

export interface PanelRegionMap {
  /** 面板内容。 @en Panel content. */
  content: EmptyComponentApi;
}

export type PanelsCommandMap = EmptyComponentApi;
export type PanelCommandMap = EmptyComponentApi;

export const PANELS_DEFAULTS = Object.freeze({
  animated: false,
  vertical: false,
} as const satisfies Partial<PanelsCommonProps>);

export const PANEL_DEFAULTS = Object.freeze({
  disabled: false,
} as const satisfies Partial<PanelCommonProps>);

export function isPanelsKey(value: unknown): value is PanelsKey {
  return typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}

export function findEnabledPanelIndex(
  panels: readonly PanelDescriptor[],
  value: PanelsKey,
): number {
  return panels.findIndex(panel => !panel.disabled && panel.name === value);
}

export function resolvePanelsTransitionDirection(
  panels: readonly PanelDescriptor[],
  previous: PanelsKey,
  next: PanelsKey,
  vertical: boolean,
): PanelsTransitionDirection {
  const previousIndex = findEnabledPanelIndex(panels, previous);
  const nextIndex = findEnabledPanelIndex(panels, next);
  if (nextIndex < previousIndex) return vertical ? 'down' : 'right';
  return vertical ? 'up' : 'left';
}

export function resolveActivePanel<T extends PanelDescriptor>(
  panels: readonly T[],
  value: PanelsKey,
): T | undefined {
  return panels.find(panel => !panel.disabled && panel.name === value);
}

export const panelsApiContract = defineComponentApiContract<
  PanelsCommonProps,
  PanelsEventMap,
  PanelsRegionMap,
  PanelsCommandMap
>({
  defaults: PANELS_DEFAULTS,
  validators: { value: isPanelsKey },
});

export const panelApiContract = defineComponentApiContract<
  PanelCommonProps,
  PanelEventMap,
  PanelRegionMap,
  PanelCommandMap
>({
  defaults: PANEL_DEFAULTS,
  validators: { name: isPanelsKey },
});
