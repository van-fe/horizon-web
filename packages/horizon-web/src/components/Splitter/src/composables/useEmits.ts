const isSizes = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every(item => typeof item === 'number' && Number.isFinite(item));

export const useSplitterEmits = {
  /**
   * 更新各面板尺寸
   * @param sizes 面板尺寸百分比
   * @paramEn sizes Panel sizes as percentages.
   * @en Emitted when controlled panel sizes change.
   */
  'update:modelValue': (sizes: number[]) => isSizes(sizes),
  /**
   * 调整尺寸时触发
   * @param sizes 面板尺寸百分比
   * @paramEn sizes Panel sizes as percentages.
   * @en Emitted while panels are resized.
   */
  resize: (sizes: number[]) => isSizes(sizes),
  /**
   * 开始拖拽时触发
   * @param index 分隔条索引
   * @paramEn index Separator index.
   * @en Emitted when pointer resizing starts.
   */
  resizeStart: (index: number) => Number.isInteger(index) && index >= 0,
  /**
   * 拖拽结束时触发
   * @param sizes 面板尺寸百分比
   * @paramEn sizes Panel sizes as percentages.
   * @en Emitted when pointer resizing ends.
   */
  resizeEnd: (sizes: number[]) => isSizes(sizes),
  /**
   * 面板折叠或恢复时触发
   * @param index 面板索引
   * @paramEn index Panel index.
   * @param collapsed 是否已折叠
   * @paramEn collapsed Whether the panel is collapsed.
   * @en Emitted when a panel is collapsed or restored.
   */
  collapse: (index: number, collapsed: boolean) =>
    Number.isInteger(index) && index >= 0 && typeof collapsed === 'boolean',
};

export type SplitterEmits = typeof useSplitterEmits;
