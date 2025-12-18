import type { CSSProperties, Ref, ToRefs } from 'vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { NSegmentedValue, SegmentedProps } from './useProps';
import { useResize } from './useResize';
import { cssVariable } from '@nio-fe/shared';

export interface IndicatorOptions extends SegmentedProps {
  container: HTMLElement | undefined;
  wrapper: HTMLElement | undefined;
  root: HTMLElement | undefined;
}

export default function useResponsive(options: ToRefs<IndicatorOptions>) {
  const { wrapper, container, activeKey, size, root } = options as ToRefs<
    Required<IndicatorOptions>
  >;

  const indicatorStyle = ref<any>({});
  const items = ref<Map<NSegmentedValue, HTMLElement>>(new Map());
  const scrollable = ref(options.arrow.value);
  const keys = computed({
    get: () => Array.from(items.value.keys()),
    set: sorted => {
      const map = new Map<NSegmentedValue, HTMLElement>();
      sorted.forEach(key => {
        const el = items.value.get(key);
        if (el) map.set(key, el);
      });
      items.value = map;
    },
  });
  // 考虑初始化位置
  const translateX = ref(0);

  const firstViewport = computed(() => translateX.value === 0);

  const lastViewport = computed(() => {
    const maxTranslateX = getMaxTranslateX();
    return Math.abs(translateX.value) === getMaxTranslateX() && maxTranslateX !== 0;
  });

  const resetStyle = () => {
    indicatorStyle.value = {};
  };

  const updateListTranslate = () => {
    container.value!.style.transform = `translate3d(${translateX.value}px, 0, 0)`;
  };

  watch(translateX, updateListTranslate);

  const updateIndicatorStyle = (mounted = false) => {
    if (!items.value.size) return resetStyle();

    const el = items.value.get(activeKey.value!)!;
    if (!el) return resetStyle();

    const style: CSSProperties = {
      width: `${el.clientWidth}px`,
      transform: `translate3d(${el.offsetLeft}px, 0, 0)`,
      // fix note: 初始化时候无需动画，直接移动对应位置
      transition: mounted
        ? 'none'
        : `transform ${cssVariable('segmented-transition-time')} ${cssVariable(
            'segmented-transition-fn',
          )}`,
    };
    indicatorStyle.value = style;
  };

  const updateArrow = () => {
    if (!options.arrow.value) return;

    const maxTranslateX = getMaxTranslateX();
    scrollable.value = maxTranslateX !== 0;
  };

  const getMaxTranslateX = () => {
    if (!wrapper.value) return 0;
    return wrapper.value!.scrollWidth - wrapper.value!.clientWidth;
  };

  const updateActivateElement = async (mounted = false) => {
    if (!options.focusable.value) return;

    const el = items.value.get(activeKey.value!);
    if (!el) {
      translateX.value = 0;
      // 2024-04-25 更新：社区ui库调研后，当不存在 activeKey 时，默认不做选中，下次更新移除
      // activeKey.value = keys.value[0];
      return;
    }
    // 当前是否有滚动
    const maxTranslateX = getMaxTranslateX();
    if (maxTranslateX === 0) {
      translateX.value = 0;
      return;
    }

    const { clientWidth } = wrapper.value!;
    const { offsetLeft: elOffsetLeft, clientWidth: elWidth } = el;

    if (elOffsetLeft <= clientWidth / 2) {
      // 中线左边元素元素处理
      translateX.value = 0;
    } else {
      const leftDelta = elOffsetLeft - clientWidth / 2 + elWidth;
      translateX.value = -1 * Math.min(leftDelta, maxTranslateX);
    }
    const containerEl = container.value!;
    // 初始化时候无需动画，直接移动对应位置
    if (mounted) {
      containerEl.style.transition = 'none';
      // 这里等待一次dom更新，然后再添加动画
      await nextTick();
    }
    containerEl.style.transition = `transform ${cssVariable('segmented-transition-time')} ease`;
  };

  const createTab = (key: NSegmentedValue) => {
    return function addTab(el: Element | null) {
      if (el) {
        // 2024-04-25 更新：社区ui库调研后，当不存在 activeKey 时，默认不做选中，下次更新移除
        // if (isNil(activeKey.value)) activeKey.value = key;

        items.value.set(key, el as HTMLElement);
      } else items.value.delete(key);
    };
  };

  const onWheel = (e: Event) => {
    if (!options.scrollable.value) return;

    const evt = e as WheelEvent;
    const maxTranslateX = getMaxTranslateX();
    if (maxTranslateX === 0) return;

    evt.preventDefault();

    const { deltaX, deltaY } = evt;

    if (Math.abs(deltaX) > 0 && Math.abs(deltaY) > 0) return;

    const multiplier = Object.is(deltaY, -0)
      ? deltaX / Math.abs(deltaX)
      : deltaY / Math.abs(deltaY);

    const delta = Object.is(deltaY, -0) ? deltaX : deltaY;
    // 方向向右，deltaX 为正数，反之为负数
    if (multiplier < 0) {
      // 向左/下
      translateX.value = Math.min(translateX.value - delta, 0);
    } else {
      // 向右/上
      translateX.value = -1 * Math.min(Math.abs(translateX.value - delta), maxTranslateX);
    }
  };

  onMounted(() => {
    container.value?.addEventListener('wheel', onWheel, { passive: false });
    updateIndicatorStyle(true);
    updateActivateElement(true);
    updateArrow();
  });

  onBeforeUnmount(() => {
    container.value?.removeEventListener('wheel', onWheel);
  });

  const onRectChanged = () => {
    updateIndicatorStyle();
    updateArrow();
    updateActivateElement();
  };

  useResize({ root, container }, onRectChanged);

  watch([activeKey, size, options.arrow, () => items.value.size], onRectChanged, {
    flush: 'post',
  });

  const move = (direction: 'left' | 'right') => {
    const maxTranslateX = getMaxTranslateX();
    if (maxTranslateX === 0) return;

    const { clientWidth } = wrapper.value as HTMLElement;
    // 左右滑动均为-1
    const multiplier = -1;
    let delta = 0;
    switch (direction) {
      case 'left':
        delta = Math.max(0, Math.abs(translateX.value) - clientWidth);
        break;
      case 'right':
        delta = Math.min(maxTranslateX, Math.abs(Math.abs(translateX.value) + clientWidth));
        break;
    }

    translateX.value = multiplier * delta;
  };

  return {
    indicatorStyle,
    scrollable,
    firstViewport,
    lastViewport,
    items,
    keys,
    move,
    createTab,
  };
}

export type UseIndicatorResult = ReturnType<typeof useResponsive> & {
  indicatorStyle: Ref<CSSProperties>;
};
