import { mount } from '@vue/test-utils';
import { reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HVirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import VirtualScrollList from '../src/components/VirtualScrollList';
import {
  HSelectModelValueInjectKey,
  HSelectPropsInjectKey,
  HSelectVisibleOptionsInjectKey,
} from '../src/utils/injectKeys';

function mountList(modelValue?: unknown) {
  const parentProps = reactive({
    optionListMaxHeight: 160,
    expandPanelByChildren: false,
    valueFormat: undefined,
  });
  const visibleOptions = ref<any[]>([]);
  const modelValueSet = ref(new Set<any>(typeof modelValue === 'undefined' ? [] : [modelValue]));
  const wrapper = mount(VirtualScrollList, {
    global: {
      provide: {
        [HSelectPropsInjectKey as symbol]: parentProps,
        [HSelectVisibleOptionsInjectKey as symbol]: visibleOptions,
        [HSelectModelValueInjectKey as symbol]: modelValueSet,
      },
    },
  });
  return { wrapper, parentProps, visibleOptions, modelValueSet };
}

describe('Select VirtualScrollList browser branches', () => {
  test('forwards native scroller lifecycle events and presentation props', async () => {
    const state = mountList();
    const scroller = state.wrapper.getComponent(HVirtualScroller);

    expect(scroller.props()).toMatchObject({
      scrollerMaxHeight: 160,
      minItemSize: 40,
      keyField: 'props.value',
      buffer: 160,
      emitUpdate: true,
      size: 'small',
      expandWrapperByChildren: false,
    });
    const mouse = new MouseEvent('mouseenter');
    scroller.vm.$emit('mouseEnter', mouse);
    scroller.vm.$emit('mouseLeave', mouse);
    scroller.vm.$emit('scrollEnd');
    scroller.vm.$emit('scrollBegin');
    scroller.vm.$emit('scrollStop');
    await state.wrapper.vm.$nextTick();

    expect(state.wrapper.emitted('mouseEnter')?.[0]).toEqual([mouse]);
    expect(state.wrapper.emitted('mouseLeave')?.[0]).toEqual([mouse]);
    expect(state.wrapper.emitted('reachBottom')).toHaveLength(1);
  });

  test('scrolls only outside the current viewport and clears the scrolling state', async () => {
    const state = mountList();
    const scroller = state.wrapper.getComponent(HVirtualScroller);
    const scrollToItem = vi.spyOn(scroller.getCurrentComponent().exposed as any, 'scrollToItem');
    scroller.vm.$emit('update', 0, 9, 2, 5);

    (state.wrapper.vm as any).scrollToIndex(3, true);
    await new Promise(resolve => setTimeout(resolve, 5));
    expect(scrollToItem).not.toHaveBeenCalled();

    (state.wrapper.vm as any).scrollToIndex(5, true);
    await new Promise(resolve => setTimeout(resolve, 5));
    expect(scrollToItem).toHaveBeenCalledWith(5);

    (state.wrapper.vm as any).scrollToIndex(1);
    await new Promise(resolve => setTimeout(resolve, 5));
    expect(scrollToItem).toHaveBeenLastCalledWith(1);
  });

  test('scrolls missing and empty active models back to the first option', async () => {
    const empty = mountList();
    const missing = mountList('missing');
    const emptySpy = vi.spyOn(
      empty.wrapper.getComponent(HVirtualScroller).getCurrentComponent().exposed as any,
      'scrollToItem',
    );
    const missingSpy = vi.spyOn(
      missing.wrapper.getComponent(HVirtualScroller).getCurrentComponent().exposed as any,
      'scrollToItem',
    );

    (empty.wrapper.vm as any).scrollToActiveModelValue();
    (missing.wrapper.vm as any).scrollToActiveModelValue();
    await new Promise(resolve => setTimeout(resolve, 5));

    expect(emptySpy).toHaveBeenCalledWith(0);
    expect(missingSpy).toHaveBeenCalledWith(0);
  });
});
