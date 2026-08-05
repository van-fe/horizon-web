import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { Ref } from 'vue';
import type { HCarouselTarget } from './useProps';

export const useCarouselExposes = {
  /**
   * 当前激活项索引
   * @en Current active slide index.
   */
  activeIndex: Object as ExposeType<Readonly<Ref<number>>>,
  /**
   * 切换到指定索引或名称的轮播项；数字名称可使用 `{ name }` 明确指定
   * @param target 目标索引、名称或显式目标对象
   * @paramEn target Target index, name, or explicit target object.
   * @en Activates a slide by index or name. Use `{ name }` for numeric names.
   */
  setActiveItem: Function as ExposeType<(target: HCarouselTarget) => void>,
  /**
   * 切换到上一项
   * @en Activates the previous slide.
   */
  prev: Function as ExposeType<() => void>,
  /**
   * 切换到下一项
   * @en Activates the next slide.
   */
  next: Function as ExposeType<() => void>,
  /**
   * 暂停自动轮播
   * @en Pauses automatic rotation.
   */
  pause: Function as ExposeType<() => void>,
  /**
   * 恢复自动轮播
   * @en Resumes automatic rotation.
   */
  play: Function as ExposeType<() => void>,
};

export type CarouselExposes = ExtractExposeTypes<typeof useCarouselExposes>;
