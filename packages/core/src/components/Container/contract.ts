import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const CONTAINER_DIRECTIONS = ['horizontal', 'vertical'] as const;

export type ContainerDirection = (typeof CONTAINER_DIRECTIONS)[number];
export type ContainerDimension = string | number;
export type ContainerRegion = 'header' | 'aside' | 'main' | 'footer' | 'other';

export interface ContainerCommonProps {
  /** 子区域排列方向；未设置时根据直接子区域推断。 @en Region direction; inferred from direct child regions when omitted. */
  direction?: ContainerDirection;
}

export interface HeaderCommonProps {
  /** 顶部区域高度。 @en Header region height. */
  height?: ContainerDimension;
}

export interface AsideCommonProps {
  /** 侧边区域宽度。 @en Aside region width. */
  width?: ContainerDimension;
}

export type MainCommonProps = EmptyComponentApi;

export interface FooterCommonProps {
  /** 底部区域高度。 @en Footer region height. */
  height?: ContainerDimension;
}

export type ContainerEventMap = EmptyComponentApi;

export interface ContainerRegionMap {
  /** 页面布局区域。 @en Page layout regions. */
  content: EmptyComponentApi;
}

export interface LayoutRegionMap {
  /** 区域内容。 @en Region content. */
  content: EmptyComponentApi;
}

export type ContainerCommandMap = EmptyComponentApi;
export type LayoutRegionEventMap = EmptyComponentApi;
export type LayoutRegionCommandMap = EmptyComponentApi;

export const CONTAINER_DEFAULTS = Object.freeze({} as const satisfies ContainerCommonProps);
export const HEADER_DEFAULTS = Object.freeze({} as const satisfies HeaderCommonProps);
export const ASIDE_DEFAULTS = Object.freeze({} as const satisfies AsideCommonProps);
export const MAIN_DEFAULTS = Object.freeze({} as const satisfies MainCommonProps);
export const FOOTER_DEFAULTS = Object.freeze({} as const satisfies FooterCommonProps);

export function isContainerDirection(value: unknown): value is ContainerDirection {
  return CONTAINER_DIRECTIONS.includes(value as ContainerDirection);
}

export function isContainerDimension(value: unknown): value is ContainerDimension {
  return (typeof value === 'number' && Number.isFinite(value)) || typeof value === 'string';
}

export const containerApiContract = defineComponentApiContract<
  ContainerCommonProps,
  ContainerEventMap,
  ContainerRegionMap,
  ContainerCommandMap
>({
  defaults: CONTAINER_DEFAULTS,
  validators: { direction: isContainerDirection },
});

export const headerApiContract = defineComponentApiContract<
  HeaderCommonProps,
  LayoutRegionEventMap,
  LayoutRegionMap,
  LayoutRegionCommandMap
>({
  defaults: HEADER_DEFAULTS,
  validators: { height: isContainerDimension },
});

export const asideApiContract = defineComponentApiContract<
  AsideCommonProps,
  LayoutRegionEventMap,
  LayoutRegionMap,
  LayoutRegionCommandMap
>({
  defaults: ASIDE_DEFAULTS,
  validators: { width: isContainerDimension },
});

export const mainApiContract = defineComponentApiContract<
  MainCommonProps,
  LayoutRegionEventMap,
  LayoutRegionMap,
  LayoutRegionCommandMap
>({ defaults: MAIN_DEFAULTS });

export const footerApiContract = defineComponentApiContract<
  FooterCommonProps,
  LayoutRegionEventMap,
  LayoutRegionMap,
  LayoutRegionCommandMap
>({
  defaults: FOOTER_DEFAULTS,
  validators: { height: isContainerDimension },
});
