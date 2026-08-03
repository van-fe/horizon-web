export const useWatermarkEmits = {
  /**
   * tampered事件（水印元素被“删除”或“篡改”时触发）
    * @en Emitted when tampered changes.
   */
  tampered: () => true,
};

export type WatermarkEmits = typeof useWatermarkEmits;
