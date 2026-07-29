export const useAvatarEmits = {
  /**
   * 图片类头像加载失败的回调， 返回 false 会关闭组件默认的 fallback 行为
   * @param evt Img标签 onError 原生事件
   * @paramEn evt The evt value.
    * @en Emitted when error changes.
   */
  error: (evt: Event) => evt instanceof Event,
};

export type AvatarEmits = typeof useAvatarEmits;
