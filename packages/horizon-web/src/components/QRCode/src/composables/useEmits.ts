export const useQRCodeEmits = {
  /** 请求刷新失效二维码 @en Emitted when refresh is requested. @param event 鼠标事件 @paramEn event Mouse event. */ refresh:
    (event: MouseEvent) => event instanceof MouseEvent,
  /** 二维码生成失败 @en Emitted when generation fails. @param error 错误对象 @paramEn error Generation error. */ error:
    (error: unknown) => Boolean(error),
};
export type QRCodeEmits = typeof useQRCodeEmits;
