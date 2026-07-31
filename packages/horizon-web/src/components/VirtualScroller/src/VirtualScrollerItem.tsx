import {
  computed,
  defineComponent,
  inject,
  watch,
  h,
  ref,
  nextTick,
  onMounted,
  onBeforeUnmount,
  unref,
} from 'vue';
import type { Ref, WatchStopHandle } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { isDefined, useNamespace } from '@aurora/utils';
import { useVirtualScrollerItemProps } from './composables/useProps';
import { useVirtualScrollerItemEmits } from './composables/useEmits';
import { useVirtualScrollerItemSlots } from './composables/useSlots';
import { useVirtualScrollerItemExposes } from './composables/useExposes';
import type { VirtualScrollerItemEmits } from './composables/useEmits';
import type { VirtualScrollerItemSlots } from './composables/useSlots';
import type { VirtualScrollerItemExposes } from './composables/useExposes';
import type { VirtualScrollerContext } from './utils/types';
import { VirtualScrollerInjectKey } from './utils/injectionKey';
import get from 'lodash/get';
import { normalizeScrollerKey } from './composables/useRecycleScrollerLayout';

export default defineComponent({
  name: `${useNamespace()}VirtualScrollerItem`,
  props: useVirtualScrollerItemProps,
  emits: useVirtualScrollerItemEmits,
  slots: useVirtualScrollerItemSlots,
  exposes: useVirtualScrollerItemExposes,
  setup(
    props,
    {
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<
      VirtualScrollerItemEmits,
      VirtualScrollerItemSlots,
      VirtualScrollerItemExposes
    >,
  ) {
    const parentData = inject<VirtualScrollerContext>(VirtualScrollerInjectKey)!;

    // if (!parentData) {
    //   throw new Error('HVirtualScrollerItem component can only be used with HVirtualScroller');
    // }

    const elRef = ref<HTMLElement>() as Ref<HTMLElement>;
    const $_forceNextVScrollUpdate = ref<any>(null);
    const $_pendingSizeUpdate = ref<any>(null);
    const $_pendingVScrollUpdate = ref<any>(null);
    const $_sizeObserved = ref<boolean>(false);
    const $_watchData = ref<WatchStopHandle | null>(null);

    // computed(s)
    const id = computed((): any => {
      if (parentData.vscrollData.simpleArray) return props.index || 0;
      const res = normalizeScrollerKey(get(props.item, parentData.vscrollData.keyField));
      if (!isDefined(res)) {
        throw new Error(
          `keyField '${parentData?.vscrollData.keyField}' not found in your item. You should set a valid keyField prop on your Scroller`,
        );
      }

      return res;
    });

    const size = computed(() => {
      return parentData.vscrollData.sizes.get(id.value) || 0;
    });

    const finalActive = computed(() => {
      return props.active && parentData.vscrollData.active;
    });

    // watch(s)
    watch(
      () => props.watchData,
      () => updateWatchData(),
    );

    watch(
      () => id.value,
      (value, oldValue) => {
        clearUndefinedSize(oldValue);
        if (elRef.value) {
          elRef.value.$_vs_id = value;
        }

        if (finalActive.value && !size.value) {
          markUndefinedSize(value);
        }
        if (!size.value) {
          onDataUpdate();
        }

        if ($_sizeObserved.value) {
          const oldSize = parentData.vscrollData.sizes.get(oldValue);
          const _size = parentData.vscrollData.sizes.get(value);
          if (oldSize != null && oldSize !== _size) {
            applySize(oldSize);
          }
        }
      },
    );

    watch(
      () => finalActive.value,
      value => {
        if (!size.value) {
          if (value) {
            markUndefinedSize(id.value);
          } else {
            clearUndefinedSize(id.value);
          }
        }

        if (parentData.vscrollResizeObserver) {
          if (value) {
            observeSize();
          } else {
            unobserveSize();
          }
        } else if (value && $_pendingVScrollUpdate.value === id.value) {
          updateSize();
        }
      },
    );

    expose({});

    // hook(s)
    onMounted(() => {
      if (finalActive.value) {
        if (!size.value) {
          markUndefinedSize(id.value);
        }
        updateSize();
        observeSize();
      }
    });

    onBeforeUnmount(() => {
      parentData.$_events.off('vscroll:update', onVscrollUpdate);
      clearUndefinedSize(id.value);
      unobserveSize();
    });

    function markUndefinedSize(_id: any) {
      if (parentData.$_undefinedMap.value.get(_id)) return;

      parentData.$_undefinedMap.value.set(_id, true);
      parentData.$_undefinedSizes.value++;
    }

    function clearUndefinedSize(_id: any) {
      if (!parentData.$_undefinedMap.value.get(_id)) return;

      parentData.$_undefinedMap.value.delete(_id);
      parentData.$_undefinedSizes.value = Math.max(0, parentData.$_undefinedSizes.value - 1);
    }

    function onDataUpdate() {
      updateSize();
    }

    function updateSize() {
      if (finalActive.value) {
        if ($_pendingSizeUpdate.value !== id.value) {
          $_pendingSizeUpdate.value = id.value;
          $_forceNextVScrollUpdate.value = null;
          $_pendingVScrollUpdate.value = null;
          computeSize(id.value);
        }
      } else {
        $_forceNextVScrollUpdate.value = id.value;
      }
    }

    function computeSize(_id: any) {
      nextTick(() => {
        if (id.value === _id && elRef.value) {
          const width = elRef.value.offsetWidth;
          const height = elRef.value.offsetHeight;
          applyWidthHeight(width, height);
        }
        $_pendingSizeUpdate.value = null;
      });
    }

    function applyWidthHeight(width: number, height: number) {
      const _size = Math.floor(unref(parentData.direction) === 'vertical' ? height : width);
      if (_size && size.value !== _size) {
        applySize(_size);
      }
    }

    function applySize(size: number) {
      clearUndefinedSize(id.value);

      parentData.vscrollData.sizes.set(id.value, size);
      if (props.emitResize) {
        emit('resize', id.value);
      }
    }

    function observeSize() {
      if (!parentData.vscrollResizeObserver) return;
      if ($_sizeObserved.value) return;
      if (!elRef.value) return;

      parentData.vscrollResizeObserver.observe(elRef.value);
      elRef.value.$_vs_id = id.value;
      elRef.value.$_vs_onResize = onResize;
      $_sizeObserved.value = true;
    }

    function unobserveSize() {
      if (!parentData.vscrollResizeObserver) return;
      if (!$_sizeObserved.value) return;
      if (!elRef.value) return;

      parentData.vscrollResizeObserver.unobserve(elRef.value);
      elRef.value.$_vs_onResize = undefined;
      $_sizeObserved.value = false;
    }

    function onResize(_id: any, width: number, height: number) {
      if (id.value === _id) {
        applyWidthHeight(width, height);
      }
    }

    function updateWatchData() {
      if (props.watchData && !parentData.vscrollResizeObserver) {
        $_watchData.value = watch(
          () => props.item,
          () => {
            onDataUpdate();
          },
          { deep: true },
        );
      } else if ($_watchData.value) {
        $_watchData.value();
        $_watchData.value = null;
      }
    }

    function onVscrollUpdate(opt: { force: boolean }) {
      if (finalActive.value && opt.force) {
        $_pendingVScrollUpdate.value = id.value;
      }

      if ($_forceNextVScrollUpdate.value === id.value || opt.force || !size.value) {
        updateSize();
      }
    }

    // created
    updateWatchData();

    if (!parentData.vscrollResizeObserver) {
      for (const k in props.sizeDependencies) {
        watch(
          () => props.sizeDependencies[k],
          () => {
            onDataUpdate();
          },
        );
      }
    }
    parentData.$_events.on('vscroll:update', onVscrollUpdate);

    return () =>
      h(
        props.tag,
        {
          ref: elRef,
        },
        slots.default?.(),
      );
  },
});
