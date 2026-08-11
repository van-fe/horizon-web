import type { FloatButtonBadge, FloatButtonShape } from './contract';

export interface FloatButtonBadgeLike {
  type?: string;
}

export interface FloatButtonBadgeLayout {
  /** 徽标对齐修正。 @en Badge alignment correction. */
  align?: 'fix-left';
  /** 顶部偏移。 @en Top offset. */
  top: number;
  /** 右侧偏移。 @en Right offset. */
  right: number;
}

/**
 * 解析悬浮按钮徽标布局。
 * @en Resolves floating-button badge layout.
 * @param badge 徽标开关或最小参数。
 * @paramEn badge Badge visibility or minimal options.
 * @param shape 按钮形状。
 * @paramEn shape Button shape.
 * @param hasIcon 是否展示图标。
 * @paramEn hasIcon Whether an icon is shown.
 * @param hasDescription 是否展示描述。
 * @paramEn hasDescription Whether a description is shown.
 */
export function resolveFloatButtonBadgeLayout(
  badge: FloatButtonBadge<FloatButtonBadgeLike>,
  shape: FloatButtonShape,
  hasIcon: boolean,
  hasDescription: boolean,
): FloatButtonBadgeLayout {
  if (shape === 'square') return { top: 0, right: 0 };
  const badgeType = typeof badge === 'boolean' ? undefined : badge.type;
  const dot = typeof badge === 'boolean' || badgeType === undefined || badgeType === 'dot';
  return {
    align: !dot && hasIcon !== hasDescription ? 'fix-left' : undefined,
    top: dot ? 5 : 3,
    right: dot ? 5 : 3,
  };
}

export interface FloatButtonStackItem {
  id: string;
  hasIconAndDescription: boolean;
}

export interface FloatButtonStackPosition {
  /** 是否位于堆叠中。 @en Whether the button belongs to the stack. */
  inStack: boolean;
  /** 堆叠索引。 @en Stack index. */
  index: number;
  /** 前置大尺寸按钮数量。 @en Number of preceding large buttons. */
  precedingLargeCount: number;
}

/**
 * 解析悬浮按钮在堆叠中的位置状态。
 * @en Resolves a floating button's position state within a stack.
 * @param items 堆叠条目。
 * @paramEn items Stack entries.
 * @param id 当前按钮标识。
 * @paramEn id Current button identity.
 */
export function resolveFloatButtonStackPosition(
  items: readonly FloatButtonStackItem[],
  id: string,
): FloatButtonStackPosition {
  const index = items.findIndex(item => item.id === id);
  return {
    inStack: index >= 0,
    index,
    precedingLargeCount:
      index < 0 ? 0 : items.slice(0, index).filter(item => item.hasIconAndDescription).length,
  };
}

export interface FloatButtonStackMetrics {
  baseBottom: number;
  gap: number;
  buttonSize: number;
  largeButtonSize: number;
}

/**
 * 根据堆叠位置计算底部偏移。
 * @en Computes the bottom offset from stack position state.
 * @param position 堆叠位置状态。
 * @paramEn position Stack position state.
 * @param metrics 尺寸与间距。
 * @paramEn metrics Size and spacing metrics.
 */
export function resolveFloatButtonStackBottomOffset(
  position: FloatButtonStackPosition,
  metrics: FloatButtonStackMetrics,
): number | undefined {
  if (!position.inStack) return undefined;
  return (
    metrics.baseBottom +
    (metrics.gap + metrics.buttonSize) * position.index +
    (metrics.largeButtonSize - metrics.buttonSize) * position.precedingLargeCount
  );
}

export interface FloatButtonPosition {
  x: number;
  y: number;
}

export interface FloatButtonViewport {
  width: number;
  height: number;
}

export interface FloatButtonDimensions {
  width: number;
  height: number;
}

/**
 * 将拖拽位置吸附到视口右侧，或在允许时吸附到底部。
 * @en Adsorbs a dragged position to the viewport right edge or, when enabled, the bottom edge.
 * @param position 拖拽结束位置。
 * @paramEn position Position at drag end.
 * @param viewport 视口尺寸。
 * @paramEn viewport Viewport dimensions.
 * @param size 按钮尺寸。
 * @paramEn size Button dimensions.
 * @param margin 吸附边距。
 * @paramEn margin Adsorption margin.
 * @param adsorbBottom 是否允许底部吸附。
 * @paramEn adsorbBottom Whether bottom adsorption is enabled.
 */
export function resolveFloatButtonAdsorbedPosition(
  position: FloatButtonPosition,
  viewport: FloatButtonViewport,
  size: FloatButtonDimensions,
  margin: number,
  adsorbBottom: boolean,
): FloatButtonPosition {
  const rightDistance = viewport.width - position.x;
  const bottomDistance = viewport.height - position.y;
  if (!adsorbBottom || rightDistance < bottomDistance) {
    return { x: viewport.width - margin - size.width, y: position.y };
  }
  return { x: position.x, y: viewport.height - margin - size.height };
}
