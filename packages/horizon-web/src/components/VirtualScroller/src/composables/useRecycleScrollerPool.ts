import { markRaw, ref, shallowReactive } from 'vue';
import type { ViewItem } from '../utils/types';

let viewUid = 0;

/**
 * 可复用视图池。
 * 管理视图的创建、停用、按类型复用和 key 映射，不感知滚动容器或布局算法。
 */
export default function useRecycleScrollerPool() {
  const pool = ref<ViewItem[]>([]);
  const views = new Map<any, ViewItem>();
  const unusedViews = new Map<any, ViewItem[]>();

  function addView(index: number, item: any, key: any, type: any): ViewItem {
    const nr = markRaw({
      id: viewUid++,
      index,
      used: true,
      key,
      type,
    });
    const view = shallowReactive<ViewItem>({
      item,
      position: 0,
      offset: 0,
      nr,
    });

    pool.value.push(view);
    return view;
  }

  function removeFromUnusedPool(view: ViewItem) {
    const unusedPool = unusedViews.get(view.nr.type);
    if (!unusedPool) return;

    const index = unusedPool.indexOf(view);
    if (index !== -1) {
      unusedPool.splice(index, 1);
    }
  }

  function unuseView(view: ViewItem) {
    if (!view.nr.used) return;

    let unusedPool = unusedViews.get(view.nr.type);
    if (!unusedPool) {
      unusedPool = [];
      unusedViews.set(view.nr.type, unusedPool);
    }

    view.nr.used = false;
    view.position = -9999;
    unusedPool.push(view);
  }

  function releaseAllViews() {
    for (const view of pool.value) {
      unuseView(view);
    }
  }

  function releaseViewByKey(key: any) {
    const view = views.get(key);
    if (view) {
      unuseView(view);
    }
  }

  function releaseOutsideRange(
    startIndex: number,
    endIndex: number,
    itemIndexByKey?: Map<any, number>,
  ) {
    for (const view of pool.value) {
      if (!view.nr.used) continue;

      if (itemIndexByKey) {
        view.nr.index = itemIndexByKey.get(view.nr.key) as number;
      }

      if (
        view.nr.index === null ||
        typeof view.nr.index === 'undefined' ||
        view.nr.index < startIndex ||
        view.nr.index >= endIndex
      ) {
        unuseView(view);
      }
    }
  }

  function acquireView(index: number, item: any, key: any, type: any) {
    let view = views.get(key);

    if (view && view.nr.type !== type) {
      unuseView(view);
      views.delete(key);
      view = undefined;
    }

    let newlyUsed = false;

    if (!view) {
      const unusedPool = unusedViews.get(type);
      view = unusedPool?.pop() ?? addView(index, item, key, type);

      views.delete(view.nr.key);
      view.nr.key = key;
      view.nr.type = type;
      views.set(key, view);
      newlyUsed = true;
    } else if (!view.nr.used) {
      removeFromUnusedPool(view);
      newlyUsed = true;
    }

    view.nr.used = true;
    view.nr.index = index;
    view.item = item;

    return {
      newlyUsed,
      view,
    };
  }

  function sortViews() {
    pool.value.sort((viewA, viewB) => viewA.nr.index - viewB.nr.index);
  }

  return {
    acquireView,
    pool,
    releaseAllViews,
    releaseOutsideRange,
    releaseViewByKey,
    sortViews,
    unuseView,
  };
}
