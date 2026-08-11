/**
 * 判断当前滚动距离是否达到显示阈值。
 * @en Determines whether the current scroll offset reaches the visibility threshold.
 * @param scrollOffset 当前滚动距离。
 * @paramEn scrollOffset Current scroll offset.
 * @param visibilityHeight 显示阈值。
 * @paramEn visibilityHeight Visibility threshold.
 */
export function resolveBacktopVisibility(scrollOffset: number, visibilityHeight: number): boolean {
  return Math.max(0, scrollOffset) >= Math.max(0, visibilityHeight);
}

/**
 * 返回缓入缓出的三次曲线进度。
 * @en Returns an eased cubic progress value.
 * @param progress 原始进度。
 * @paramEn progress Raw progress.
 */
export function resolveBacktopEasedProgress(progress: number): number {
  const value = Math.min(1, Math.max(0, progress));
  return value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
}

/**
 * 计算滚动动画当前帧的偏移。
 * @en Computes the scroll offset for the current animation frame.
 * @param startOffset 动画开始时的滚动距离。
 * @paramEn startOffset Scroll offset at animation start.
 * @param progress 动画进度。
 * @paramEn progress Animation progress.
 */
export function resolveBacktopScrollOffset(startOffset: number, progress: number): number {
  return Math.max(0, startOffset) * (1 - resolveBacktopEasedProgress(progress));
}
