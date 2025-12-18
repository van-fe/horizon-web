import { defineDirective } from '@aurora/utils';
import type { InfiniteScrollOptions } from './composables/useOptions';
import { useInfiniteScrollOptions } from './composables/useOptions';
import type { DirectiveBinding } from 'vue';
import { useSensor } from '~/utils/useSensor';

const scrollMethod = (
  el: HTMLElement,
  binding: DirectiveBinding<Partial<InfiniteScrollOptions>>,
) => {
  useSensor('v-infinite-scroll', binding.value, 'directive');
  const debounce = (fn: any, wait: number) => {
    let timeout: any = null;
    return () => {
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
    };
  };
  const callBack = () => {
    if (el.scrollHeight - (el.scrollTop + el.clientHeight) < (binding.value.distance || 10)) {
      // 判断是否触底
      // console.log('触底');
      const handler = binding.value.onReachBottom;
      handler?.();
    } else if (el.scrollTop <= 0 && binding.value.onReachTop) {
      // 判断是否触顶
      // console.log("触顶");
      const handler = binding.value.onReachTop;
      handler();
    }
  };
  if (!binding.value.block) {
    (el as any).scrollListener = debounce(callBack, binding.value.interval || 0);
    el.addEventListener('scroll', (el as any).scrollListener);
  } else {
    el.removeEventListener('scroll', (el as any).scrollListener);
  }
};

export default defineDirective<HTMLElement, typeof useInfiniteScrollOptions>({
  name: 'infinite-scroll',
  options: useInfiniteScrollOptions,
  desc: '用于处理元素在滚动到底部后的执行动作和执行时机',
  mounted: scrollMethod,
  updated: scrollMethod,
  deep: true, //监听对象内部的属性变化
});
