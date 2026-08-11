import type { PropType } from 'vue';
import { defineComponent, Fragment, nextTick, toRefs } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  useAffixPosition,
  type AffixPosition,
  type AffixTarget,
} from '../src/composables/useAffixPosition';

const AffixPositionHarness = defineComponent({
  props: {
    offset: { type: Number, default: 0 },
    position: { type: String as PropType<AffixPosition>, default: 'top' },
    target: { type: [String, Object] as PropType<AffixTarget> },
    zIndex: Number,
  },
  setup(props, { expose }) {
    const { target, position, offset, zIndex } = toRefs(props);
    const state = useAffixPosition({ target, position, offset, zIndex });
    expose({ updatePosition: state.updatePosition });

    return () => (
      <Fragment>
        {state.isAffixed.value && (
          <div ref={state.placeholderRef} data-placeholder style={state.placeholderStyle.value} />
        )}
        <div ref={state.contentRef} data-content style={state.contentStyle.value}>
          content
        </div>
      </Fragment>
    );
  },
});

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

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('useAffixPosition', () => {
  test('normalizes the window bottom boundary and preserves the measured box', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      createRect({ top: 900, bottom: 940, left: 16, width: 260, height: 40 }),
    );
    const wrapper = mount(AffixPositionHarness, {
      props: { position: 'bottom', zIndex: 11 },
    });
    await nextTick();

    const style = (wrapper.find('[data-content]').element as HTMLElement).style;
    expect(style.top).toBe(`${window.innerHeight - 40}px`);
    expect(style.left).toBe('16px');
    expect(style.width).toBe('260px');
    expect(style.zIndex).toBe('11');
    expect((wrapper.find('[data-placeholder]').element as HTMLElement).style.width).toBe('260px');
  });

  test('reacts to controlled position and offset props', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      createRect({ top: -10, bottom: 30, height: 40 }),
    );
    const wrapper = mount(AffixPositionHarness, { props: { offset: 0, position: 'top' } });
    await nextTick();
    expect((wrapper.find('[data-content]').element as HTMLElement).style.top).toBe('0px');

    await wrapper.setProps({ offset: 20 });
    expect((wrapper.find('[data-content]').element as HTMLElement).style.top).toBe('20px');

    await wrapper.setProps({ position: 'bottom' });
    expect((wrapper.find('[data-content]').element as HTMLElement).style.position).toBe('');
    expect(wrapper.find('[data-placeholder]').exists()).toBe(false);
  });

  test('rebinds and recalculates immediately when the target prop changes', async () => {
    const firstTarget = document.createElement('div');
    const secondTarget = document.createElement('div');
    for (const target of [firstTarget, secondTarget]) {
      Object.defineProperty(target, 'clientTop', { configurable: true, value: 0 });
      Object.defineProperty(target, 'clientHeight', { configurable: true, value: 200 });
      document.body.append(target);
    }
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this === firstTarget) return createRect({ top: 100, bottom: 300, height: 200 });
      if (this === secondTarget) return createRect({ top: 180, bottom: 380, height: 200 });
      return createRect({ top: 50, bottom: 90 });
    });
    const wrapper = mount(AffixPositionHarness, { props: { target: firstTarget } });
    await nextTick();
    expect((wrapper.find('[data-content]').element as HTMLElement).style.top).toBe('100px');

    await wrapper.setProps({ target: secondTarget });
    expect((wrapper.find('[data-content]').element as HTMLElement).style.top).toBe('180px');
  });

  test('remeasures the natural width after a responsive layout change', async () => {
    let naturalWidth = 200;
    const animationFrames: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      animationFrames.push(callback);
      return animationFrames.length;
    });
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const fixedWidth = Number.parseFloat(this.style.width);
      const width =
        this.style.position === 'fixed' || this.hasAttribute('data-placeholder')
          ? fixedWidth || naturalWidth
          : naturalWidth;
      return createRect({ top: -10, bottom: 30, width });
    });
    const wrapper = mount(AffixPositionHarness);
    await nextTick();
    expect((wrapper.find('[data-content]').element as HTMLElement).style.width).toBe('200px');

    naturalWidth = 320;
    window.dispatchEvent(new Event('resize'));
    expect(animationFrames).not.toHaveLength(0);
    animationFrames.shift()?.(0);
    await nextTick();
    animationFrames.shift()?.(16);
    await nextTick();

    expect((wrapper.find('[data-content]').element as HTMLElement).style.width).toBe('320px');
    expect((wrapper.find('[data-placeholder]').element as HTMLElement).style.width).toBe('320px');
  });

  test('rebinds to a target selected after mount when manually updated', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.id === 'async-target'
        ? createRect({ top: 100, bottom: 300, height: 200 })
        : createRect({ top: -5, bottom: 35 });
    });
    const wrapper = mount(AffixPositionHarness, { props: { target: '#async-target' } });
    await nextTick();
    expect((wrapper.find('[data-content]').element as HTMLElement).style.top).toBe('0px');

    const target = document.createElement('div');
    target.id = 'async-target';
    Object.defineProperty(target, 'clientTop', { configurable: true, value: 0 });
    Object.defineProperty(target, 'clientHeight', { configurable: true, value: 200 });
    document.body.append(target);
    (wrapper.vm as unknown as { updatePosition: () => void }).updatePosition();
    await wrapper.vm.$nextTick();

    expect((wrapper.find('[data-content]').element as HTMLElement).style.top).toBe('100px');
  });
});
