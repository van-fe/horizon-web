import type { AffixPosition } from './contract';

export interface AffixRect {
  top: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export interface AffixBoundary {
  top: number;
  bottom: number;
}

export interface AffixGeometryOptions {
  rect: AffixRect;
  boundary: AffixBoundary;
  position: AffixPosition;
  offset: number;
  marginLeft?: number;
  marginTop?: number;
}

export interface AffixGeometry {
  affixed: boolean;
  left: number;
  top: number;
  width: number;
}

/** 根据自然位置与边界计算固定状态和几何信息。 @en Resolves affixed state and geometry from the natural box and boundary. */
export function resolveAffixGeometry(options: AffixGeometryOptions): AffixGeometry {
  const { rect, boundary, position } = options;
  const offset = options.offset;
  const affixed =
    position === 'top' ? rect.top < boundary.top + offset : rect.bottom > boundary.bottom - offset;
  const top = position === 'top' ? boundary.top + offset : boundary.bottom - offset - rect.height;
  return {
    affixed,
    left: rect.left - (options.marginLeft ?? 0),
    top: top - (options.marginTop ?? 0),
    width: rect.width,
  };
}
