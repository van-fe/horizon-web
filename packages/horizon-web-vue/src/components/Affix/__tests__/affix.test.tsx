import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import HAffix from '../src/Affix';

function createRect(values: Partial<DOMRect> = {}): DOMRect {
  return {
    x: 0,
    y: 0,
    top: 0,
    right: 100,
    bottom: 40,
    left: 0,
    width: 100,
    height: 40,
    toJSON: () => ({}),
    ...values,
  } as DOMRect;
}

function mockElementRect(rect: DOMRect) {
  return vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(rect);
}

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('Affix.tsx', () => {
  test('renders its content without a placeholder before reaching the boundary', () => {
    mockElementRect(createRect({ top: 20, bottom: 60 }));
    const wrapper = mount(() => <HAffix>toolbar</HAffix>);

    expect(wrapper.find('.h-affix').text()).toBe('toolbar');
    expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(false);
    expect(wrapper.find('.h-affix').attributes('style')).toBeUndefined();
  });

  test('affixes to the viewport top with the requested offset, width, and z-index', async () => {
    mockElementRect(createRect({ top: -20, bottom: 20, left: 18, width: 240 }));
    const wrapper = mount(() => (
      <HAffix offset={12} zIndex={123}>
        toolbar
      </HAffix>
    ));
    await nextTick();

    const style = (wrapper.find('.h-affix').element as HTMLElement).style;
    expect(style.position).toBe('fixed');
    expect(style.top).toBe('12px');
    expect(style.left).toBe('18px');
    expect(style.width).toBe('240px');
    expect(style.zIndex).toBe('123');
    expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(true);
  });

  test('uses the viewport height for the default bottom boundary', async () => {
    mockElementRect(createRect({ top: 900, bottom: 940, left: 12, height: 40 }));
    const wrapper = mount(() => <HAffix position="bottom">actions</HAffix>);
    await nextTick();

    const style = (wrapper.find('.h-affix').element as HTMLElement).style;
    expect(style.position).toBe('fixed');
    expect(style.top).toBe(`${window.innerHeight - 40}px`);
  });

  test('uses the inner edge of a custom target as its boundary', async () => {
    const target = document.createElement('div');
    document.body.append(target);
    Object.defineProperty(target, 'clientTop', { configurable: true, value: 2 });
    Object.defineProperty(target, 'clientHeight', { configurable: true, value: 200 });
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this === target
        ? createRect({ top: 100, bottom: 304, height: 204 })
        : createRect({ top: 80, bottom: 120, left: 24, width: 180 });
    });

    const wrapper = mount(() => (
      <HAffix target={target} offset={8}>
        filters
      </HAffix>
    ));
    await nextTick();

    expect((wrapper.find('.h-affix').element as HTMLElement).style.top).toBe('110px');
  });

  test('does not duplicate fallthrough attributes on the placeholder', async () => {
    mockElementRect(createRect({ top: -1, bottom: 39 }));
    const onClick = vi.fn();
    const wrapper = mount(HAffix, {
      attrs: {
        id: 'review-affix',
        class: 'custom-affix',
        onClick,
        style: { color: 'red' },
        title: 'Toolbar',
      },
      slots: { default: 'toolbar' },
    });
    await nextTick();

    expect(wrapper.findAll('#review-affix')).toHaveLength(1);
    expect(wrapper.findAll('[title="Toolbar"]')).toHaveLength(1);
    expect(wrapper.find('[aria-hidden="true"]').attributes('id')).toBeUndefined();
    expect(wrapper.find('.h-affix').classes()).toContain('custom-affix');
    expect((wrapper.find('.h-affix').element as HTMLElement).style.color).toBe('red');

    await wrapper.find('[aria-hidden="true"]').trigger('click');
    expect(onClick).not.toHaveBeenCalled();
    await wrapper.find('.h-affix').trigger('click');
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('recalculates when offset and zIndex change', async () => {
    mockElementRect(createRect({ top: -1, bottom: 39 }));
    const offset = ref(0);
    const zIndex = ref(1);
    const wrapper = mount(() => (
      <HAffix offset={offset.value} zIndex={zIndex.value}>
        toolbar
      </HAffix>
    ));
    await nextTick();

    offset.value = 24;
    zIndex.value = 9;
    await nextTick();
    await nextTick();

    const style = (wrapper.find('.h-affix').element as HTMLElement).style;
    expect(style.top).toBe('24px');
    expect(style.zIndex).toBe('9');
  });

  test('recalculates when position changes', async () => {
    mockElementRect(createRect({ top: 900, bottom: 940, height: 40 }));
    const position = ref<'top' | 'bottom'>('top');
    const wrapper = mount(() => <HAffix position={position.value}>actions</HAffix>);
    expect((wrapper.find('.h-affix').element as HTMLElement).style.position).toBe('');

    position.value = 'bottom';
    await nextTick();
    await nextTick();

    expect((wrapper.find('.h-affix').element as HTMLElement).style.top).toBe(
      `${window.innerHeight - 40}px`,
    );
  });

  test('falls back to window and can resolve a selector that appears later', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const affix = ref<{ updatePosition: () => void }>();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.id === 'late-affix-target'
        ? createRect({ top: 120, bottom: 320, height: 200 })
        : createRect({ top: -1, bottom: 39 });
    });
    const wrapper = mount(() => (
      <HAffix ref={affix} target="#late-affix-target">
        toolbar
      </HAffix>
    ));
    await nextTick();

    expect(warning).toHaveBeenCalledOnce();
    expect((wrapper.find('.h-affix').element as HTMLElement).style.top).toBe('0px');

    const target = document.createElement('div');
    target.id = 'late-affix-target';
    Object.defineProperty(target, 'clientTop', { configurable: true, value: 0 });
    Object.defineProperty(target, 'clientHeight', { configurable: true, value: 200 });
    document.body.append(target);
    affix.value?.updatePosition();
    await nextTick();

    expect((wrapper.find('.h-affix').element as HTMLElement).style.top).toBe('120px');
  });

  test('updates after an outer scroll container moves the target', async () => {
    const outer = document.createElement('div');
    const target = document.createElement('div');
    outer.append(target);
    document.body.append(outer);
    Object.defineProperty(target, 'clientTop', { configurable: true, value: 0 });
    Object.defineProperty(target, 'clientHeight', { configurable: true, value: 200 });
    let targetTop = 100;
    let scheduledUpdate: FrameRequestCallback | undefined;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      scheduledUpdate = callback;
      return 1;
    });
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this === target
        ? createRect({ top: targetTop, bottom: targetTop + 200, height: 200 })
        : createRect({ top: 50, bottom: 90 });
    });

    const wrapper = mount(() => <HAffix target={target}>toolbar</HAffix>);
    await nextTick();
    expect((wrapper.find('.h-affix').element as HTMLElement).style.top).toBe('100px');

    targetTop = 180;
    outer.dispatchEvent(new Event('scroll'));
    expect(scheduledUpdate).toBeTypeOf('function');
    scheduledUpdate?.(0);
    await nextTick();

    expect((wrapper.find('.h-affix').element as HTMLElement).style.top).toBe('180px');
  });
});
