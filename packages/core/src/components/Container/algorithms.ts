import type { ContainerDirection, ContainerRegion } from './contract';

/** 解析容器方向；显式方向优先，否则 Header/Footer 使容器纵向排列。 @en Resolves container direction; an explicit value wins, otherwise Header/Footer select vertical layout. */
export function resolveContainerDirection(
  direction: ContainerDirection | undefined,
  directChildRegions: readonly ContainerRegion[],
): ContainerDirection {
  if (direction) return direction;
  return directChildRegions.some(region => region === 'header' || region === 'footer')
    ? 'vertical'
    : 'horizontal';
}

/** 将数字尺寸转换为像素值，并保留字符串尺寸。 @en Converts numeric dimensions to pixels and preserves string dimensions. */
export function resolveContainerDimension(value: string | number | undefined): string | undefined {
  if (typeof value === 'number') return `${value}px`;
  return value || undefined;
}
