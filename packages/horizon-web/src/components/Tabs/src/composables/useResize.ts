import { onMounted, shallowRef, onBeforeUnmount, type ToRefs } from 'vue';
import { type HTabType } from './useProps';

export interface IndicatorOptions {
  container: HTMLElement | undefined;
  root: HTMLElement | undefined;
  type: HTabType;
}

export function useResize(opts: ToRefs<IndicatorOptions>, resize: () => void) {
  const { root, container, type } = opts;
  const rootObserver = shallowRef<ResizeObserver>();
  const createRootObserver = () => {
    if (!root.value) return;

    const ob = new ResizeObserver(resize);
    ob.observe(root.value, { box: 'border-box' });
    rootObserver.value = ob;
  };
  onMounted(createRootObserver);

  const containerObserver = shallowRef<ResizeObserver>();
  const createContainerObserver = () => {
    if (!['segment', 'line'].includes(type.value)) return;
    const ob = new ResizeObserver(resize);
    ob.observe(container.value!, { box: 'border-box' });
    containerObserver.value = ob;
  };
  onMounted(createContainerObserver);

  onBeforeUnmount(() => {
    containerObserver.value?.disconnect();
    rootObserver.value?.disconnect();
  });
}
