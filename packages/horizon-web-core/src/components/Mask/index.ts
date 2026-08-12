export interface MaskRootStyle {
  /** 根透明度。 @en Root opacity. */
  opacity: 0 | 1;
  /** 根指针事件策略。 @en Root pointer-events policy. */
  pointerEvents: 'auto' | 'none';
  /** 根层级。 @en Root stacking level. */
  zIndex: number;
}

/**
 * 解析遮罩根节点的可见性与指针交互样式。
 * @param visible 是否显示遮罩
 * @param zIndex 根层级
 * @paramEn visible Whether the mask is visible.
 * @paramEn zIndex Root stacking level.
 * @en Resolves visibility and pointer-interaction styles for a mask root.
 */
export function resolveMaskRootStyle(visible: boolean, zIndex: number): MaskRootStyle {
  return {
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    zIndex,
  };
}
