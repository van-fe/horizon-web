import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { Ref } from 'vue';
export const useScrollbarExposes = {
  /**
   * 触发滚动事件
    * @en Controls handle scroll.
   */
  handleScroll: Function as ExposeType<() => void>,
  /**
   * 滚动到具体的坐标
   * @param positionOrToLeft left: 距左px, top：距顶px 或 距左px
   * @paramEn positionOrToLeft The position or to left value.
   * @param toTop 距顶部(可选)
   * @paramEn toTop The to top value.
    * @en Controls scroll to.
   */
  scrollTo: Function as ExposeType<
    (positionOrToLeft: ScrollToOptions | number, toTop?: number) => void
  >,
  /**
   * 设置滚动距顶px
   * @param top 距顶部px
   * @paramEn top The top value.
    * @en Controls set scroll top.
   */
  setScrollTop: Function as ExposeType<(top: number) => void>,
  /**
   * 设置滚动距左px
   * @param left 距左px
   * @paramEn left The left value.
    * @en Controls set scroll left.
   */
  setScrollLeft: Function as ExposeType<(left: number) => void>,
  /**
   * 更新滚动条的状态
    * @en Controls update.
   */
  update: Function as ExposeType<() => void>,
  /**
   * 包裹容器的 `ref` 对象
    * @en Controls wrap ref.
   */
  wrapRef: Object as ExposeType<Ref<HTMLElement | null>>,
  /**
   * 容器视窗的 `ref` 对象
    * @en Controls view ref.
   */
  viewRef: Object as ExposeType<Ref<HTMLElement | null>>,
};

export type ScrollbarExposes = ExtractExposeTypes<typeof useScrollbarExposes>;
