import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

const draggable = vi.hoisted(() => ({ options: undefined as any }));

vi.mock('@vueuse/core', async importOriginal => {
  const actual = await importOriginal<typeof import('@vueuse/core')>();
  return {
    ...actual,
    useDraggable: (_target: unknown, options: unknown) => {
      draggable.options = options;
      return { isDragging: { value: false } };
    },
  };
});

import useResizer from '../src/util/useResizer';
import HMenu from '../src/Menu';

function createResizer(width: number) {
  const parent = document.createElement('div');
  const handle = document.createElement('div');
  parent.append(handle);
  vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 0,
    width,
    height: 300,
    top: 0,
    right: width,
    bottom: 300,
    left: 0,
    toJSON: () => ({}),
  });
  return ref<HTMLElement | null>(handle);
}

describe('Menu useResizer browser geometry', () => {
  test('clamps normal drag width to the supported 160-240 interval', () => {
    const collapse = vi.fn();
    const state = useResizer(createResizer(200), 200, collapse);
    draggable.options.onStart();

    draggable.options.onMove({ x: 180 });
    expect(state.width.value).toBe(180);
    draggable.options.onMove({ x: 260 });
    expect(state.width.value).toBe(240);
    draggable.options.onMove({ x: 120 });
    expect(state.width.value).toBe(160);
    expect(collapse).not.toHaveBeenCalled();
  });

  test('expands from collapsed width and requests collapse below the threshold', () => {
    const collapse = vi.fn();
    const state = useResizer(createResizer(72), '72px', collapse);
    draggable.options.onStart();

    draggable.options.onMove({ x: 130 });
    expect(state.width.value).toBe(160);
    expect(collapse).toHaveBeenCalledWith(false);

    draggable.options.onMove({ x: 80 });
    expect(collapse).toHaveBeenCalledWith(true);
  });

  test.each([
    ['enabled', true, true],
    ['disabled', false, false],
  ] as const)(
    'Menu resize-to-collapse %s forwards or ignores the real drag threshold',
    async (_label, resizeToCollapse, expectedCollapsed) => {
      const wrapper = mount(HMenu, {
        props: { resizable: true, resizeToCollapse, width: 200 },
      });
      const container = wrapper.get('.h-menu__container').element;
      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        x: 0,
        y: 0,
        width: 200,
        height: 300,
        top: 0,
        right: 200,
        bottom: 300,
        left: 0,
        toJSON: () => ({}),
      });

      draggable.options.onStart();
      draggable.options.onMove({ x: 80 });
      await nextTick();
      expect(wrapper.classes().includes('is-collapsed')).toBe(expectedCollapsed);
      wrapper.unmount();
    },
  );
});
