import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';
import type { Ref } from 'vue';
export const useScrollbarExposes = {
  /**
   * 触发滚动事件
   */
  handleScroll: Function as ExposeType<() => void>,
  /**
   * 滚动到具体的坐标
   * @param positionOrToLeft left: 距左px, top：距顶px 或 距左px
   * @param toTop 距顶部(可选)
   */
  scrollTo: Function as ExposeType<
    (positionOrToLeft: ScrollToOptions | number, toTop?: number) => void
  >,
  /**
   * 设置滚动距顶px
   * @param top 距顶部px
   */
  setScrollTop: Function as ExposeType<(top: number) => void>,
  /**
   * 设置滚动距左px
   * @param left 距左px
   */
  setScrollLeft: Function as ExposeType<(left: number) => void>,
  /**
   * 更新滚动条的状态
   */
  update: Function as ExposeType<() => void>,
  /**
   * 包裹容器的 `ref` 对象
   */
  wrapRef: Object as ExposeType<Ref<HTMLElement | null>>,
  /**
   * 容器视窗的 `ref` 对象
   */
  viewRef: Object as ExposeType<Ref<HTMLElement | null>>,
};

export type ScrollbarExposes = ExtractExposeTypes<typeof useScrollbarExposes>;
