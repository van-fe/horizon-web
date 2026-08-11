import { mount } from '@vue/test-utils';
import { HGuide, HGuideItem } from '..';
import GuideMask from '../src/components/GuideMask';
import { HGuidePropsInjectKey } from '../src/utils/injectedKeys';
import type { HGuideCollectedItems } from '../src/utils/injectedKeys';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, reactive, ref } from 'vue';
import { useGuideEmits, useGuideItemEmits } from '../src/composables/useEmits';

interface GuidePublicApi {
  next: () => void;
  prev: () => void;
  close: () => void;
  hide: () => void;
  show: (startFromFirst?: boolean) => void;
}

interface GuideItemPublicApi {
  close: () => void;
}

describe('Guide.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HGuide modelValue={modelValue.value} />);
    const element = wrapper.findComponent(HGuide);

    expect(element.exists()).toBe(true);
  });

  test('renders the initial mask cutout at the focused target', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      x: 30,
      y: 40,
      width: 80,
      height: 50,
      top: 40,
      right: 110,
      bottom: 90,
      left: 30,
      toJSON: () => ({}),
    });

    const currentItem: HGuideCollectedItems = {
      uuid: 'initial-item',
      props: {
        target,
        maskTriggerPadding: 6,
        draggable: false,
      },
      getIndex: () => 0,
      setIndex: () => undefined,
    };
    const parentMaskProps = reactive<{ maskTriggerPadding?: number }>({
      maskTriggerPadding: 7,
    });
    const wrapper = mount(GuideMask, {
      props: { currentItem },
      global: {
        provide: {
          [HGuidePropsInjectKey as symbol]: parentMaskProps,
        },
      },
    });

    const path = wrapper.find('path').attributes('d');
    expect(path).toContain('M24 38Q24 34 28 34H112');
    expect(path).toContain('V38Z');

    wrapper.unmount();
    target.remove();
  });

  test('mask reacts to target changes and inherits or defaults its padding', async () => {
    const firstTarget = document.createElement('div');
    const secondTarget = document.createElement('div');
    document.body.append(firstTarget, secondTarget);
    vi.spyOn(firstTarget, 'getBoundingClientRect').mockReturnValue({
      x: 10,
      y: 20,
      width: 30,
      height: 40,
      top: 20,
      right: 40,
      bottom: 60,
      left: 10,
      toJSON: () => ({}),
    });
    vi.spyOn(secondTarget, 'getBoundingClientRect').mockReturnValue({
      x: 100,
      y: 120,
      width: 40,
      height: 30,
      top: 120,
      right: 140,
      bottom: 150,
      left: 100,
      toJSON: () => ({}),
    });
    const parentMaskProps = reactive<{ maskTriggerPadding?: number }>({
      maskTriggerPadding: 7,
    });
    const createItem = (target: HTMLElement): HGuideCollectedItems => ({
      uuid: 'changing-mask',
      props: { target, draggable: false },
      getIndex: () => 0,
      setIndex: () => undefined,
    });
    const wrapper = mount(GuideMask, {
      props: { currentItem: createItem(firstTarget) },
      global: {
        provide: {
          [HGuidePropsInjectKey as symbol]: parentMaskProps,
        },
      },
    });
    expect(wrapper.get('path').attributes('d')).toContain('M3 17Q3 13 7 13H43');

    await wrapper.setProps({ currentItem: createItem(secondTarget) });
    await nextTick();
    expect(wrapper.get('path').attributes('d')).toContain('M93 117Q93 113 97 113H143');

    parentMaskProps.maskTriggerPadding = undefined;
    await nextTick();
    expect(wrapper.get('path').attributes('d')).toContain('M100 124Q100 120 104 120H136');
    wrapper.unmount();
    firstTarget.remove();
    secondTarget.remove();
  });

  test('starts at the first step when made visible from the default index', async () => {
    const wrapper = mount(HGuide, {
      props: { visible: false, modelValue: -1, mask: false },
      slots: { default: () => <HGuideItem title="First" content="Welcome" /> },
    });

    await wrapper.setProps({ visible: true });
    await nextTick();

    expect(wrapper.emitted('update:modelValue')).toContainEqual([0]);
    expect(wrapper.get('.h-guide').attributes('style') ?? '').not.toContain('display: none');
    expect(wrapper.get('.h-guide-item').text()).toContain('Welcome');
  });

  test('navigates through exposed methods and finishes on the final step', async () => {
    const wrapper = mount(HGuide, {
      props: { visible: true, modelValue: 0, mask: false },
      slots: {
        default: () => [
          <HGuideItem title="One" content="First" />,
          <HGuideItem title="Two" content="Second" />,
        ],
      },
    });
    await nextTick();

    (wrapper.vm as unknown as { next: () => void }).next();
    await nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([1]);

    (wrapper.vm as unknown as { next: () => void }).next();
    await nextTick();
    expect(wrapper.emitted('finish')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')).toContainEqual([-1]);
    expect(wrapper.get('.h-guide').attributes('style')).toContain('display: none');
  });

  test('falls back to a centered card when the target does not exist', async () => {
    const wrapper = mount(HGuide, {
      props: {
        visible: true,
        modelValue: 0,
        mask: false,
        itemList: [{ target: '#missing-guide-target', title: 'Missing', content: 'Fallback' }],
      },
    });
    await nextTick();
    await nextTick();

    const style = wrapper.get('.h-guide-item').attributes('style');
    expect(style).toContain('top: 50%');
    expect(style).toContain('left: 50%');
    expect(wrapper.find('.h-guide-item__arrow').exists()).toBe(false);
  });

  test('close control emits item and guide close events', async () => {
    const itemClose = vi.fn();
    const wrapper = mount(HGuide, {
      props: { visible: true, modelValue: 0, mask: false },
      slots: {
        default: () => <HGuideItem title="Closable" content="Body" onClose={itemClose} />,
      },
    });
    await nextTick();

    await wrapper.get('.h-guide-item__header--close button').trigger('click');
    expect(itemClose).toHaveBeenCalledOnce();
    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.get('.h-guide').attributes('style')).toContain('display: none');
  });

  test('item slots override prop fallbacks and parent props configure the active step', async () => {
    const wrapper = mount(HGuide, {
      props: {
        visible: true,
        modelValue: 0,
        mask: false,
        type: 'primary',
        useControls: true,
        closable: false,
        finishText: 'Done now',
      },
      slots: {
        default: () => (
          <HGuideItem title="Fallback" image="fallback.png" content="Fallback content">
            {{
              title: () => <h2 data-test="guide-title">Custom title</h2>,
              image: () => <div data-test="guide-image">Custom image</div>,
              content: () => <p data-test="guide-content">Custom content</p>,
            }}
          </HGuideItem>
        ),
      },
    });
    await nextTick();

    expect(wrapper.get('.h-guide-item').classes()).toContain('h-guide-item--primary');
    expect(wrapper.get('[data-test="guide-title"]').text()).toBe('Custom title');
    expect(wrapper.get('[data-test="guide-image"]').text()).toBe('Custom image');
    expect(wrapper.get('[data-test="guide-content"]').text()).toBe('Custom content');
    expect(wrapper.find('.h-guide-item__header--close').exists()).toBe(false);
    expect(wrapper.get('.h-guide-item__footer--control-confirm').text()).toBe('Done now');

    await wrapper.get('.h-guide-item__footer--control-confirm').trigger('click');
    expect(wrapper.emitted('finish')).toHaveLength(1);
    expect(wrapper.emitted('update:visible')).toContainEqual([false]);
  });

  test('all exposed navigation methods preserve index, visibility and close contracts', async () => {
    const wrapper = mount(HGuide, {
      props: { visible: true, modelValue: 1, mask: false },
      slots: {
        default: () => [
          <HGuideItem title="First" content="One" />,
          <HGuideItem title="Second" content="Two" />,
        ],
      },
    });
    await nextTick();
    const guide = wrapper.vm as unknown as GuidePublicApi;

    guide.prev();
    await nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([0]);

    guide.hide();
    await nextTick();
    expect(wrapper.emitted('update:visible')).toContainEqual([false]);
    guide.show();
    await nextTick();
    expect(wrapper.emitted('update:visible')).toContainEqual([true]);

    guide.next();
    guide.show(true);
    await nextTick();
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([0]);

    guide.close();
    await nextTick();
    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.get('.h-guide').attributes('style')).toContain('display: none');
  });

  test('GuideItem exposes close and emits its own finish event on the final control', async () => {
    const onClose = vi.fn();
    const onFinish = vi.fn();
    const wrapper = mount(HGuide, {
      props: { visible: true, modelValue: 0, mask: false },
      slots: {
        default: () => (
          <HGuideItem title="Only" content="Body" onClose={onClose} onFinish={onFinish} />
        ),
      },
    });
    await nextTick();

    await wrapper.get('.h-guide-item__footer--control-confirm').trigger('click');
    expect(onFinish).toHaveBeenCalledOnce();
    expect(wrapper.emitted('finish')).toHaveLength(1);

    await wrapper.setProps({ visible: true, modelValue: 0 });
    await nextTick();
    const item = wrapper.findComponent(HGuideItem).getCurrentComponent().exposed as
      | GuideItemPublicApi
      | undefined;
    item?.close();
    await nextTick();
    expect(onClose).toHaveBeenCalledOnce();
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  test('per-item mask settings override the parent in both directions', async () => {
    const disabledMask = mount(HGuide, {
      props: { visible: true, modelValue: 0, mask: true },
      slots: { default: () => <HGuideItem mask={false} content="No mask" /> },
    });
    await nextTick();
    expect(disabledMask.find('.h-guide__mask').exists()).toBe(false);

    const sessionZIndex = Number(sessionStorage.getItem('horizon-web-z-index') ?? 2000);
    const requestedZIndex = sessionZIndex + 100;

    const enabledMask = mount(HGuide, {
      props: {
        visible: true,
        modelValue: 0,
        mask: false,
        maskClass: 'parent-mask',
        maskStyle: { opacity: '0.25' },
        zIndex: requestedZIndex,
      },
      slots: {
        default: () => (
          <HGuideItem
            mask
            maskClass="item-mask"
            maskStyle={{ opacity: '0.5' }}
            content="Mask"
          />
        ),
      },
    });
    await nextTick();
    expect(Number((enabledMask.get('.h-guide').element as HTMLElement).style.zIndex)).toBe(
      requestedZIndex,
    );
    expect(enabledMask.get('.h-guide__mask').classes()).toContain('item-mask');
    expect(enabledMask.get('.h-guide__mask path').attributes('style')).toContain('opacity: 0.5');
  });

  test('target positioning, scrolling and parent popper props use real browser geometry', async () => {
    const target = document.createElement('button');
    target.id = 'guide-real-target';
    Object.assign(target.style, {
      position: 'fixed',
      left: '320px',
      top: '240px',
      width: '120px',
      height: '40px',
    });
    document.body.appendChild(target);
    const scrollIntoView = vi.fn();
    Object.defineProperty(target, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });

    const wrapper = mount(HGuide, {
      attachTo: document.body,
      props: {
        visible: true,
        modelValue: 0,
        mask: false,
        placement: 'bottom',
        arrow: false,
        distance: 20,
        skidding: 10,
        flip: false,
        scrollIntoView: { block: 'end', behavior: 'auto' },
      },
      slots: {
        default: () => <HGuideItem target="#guide-real-target" title="Positioned" content="Body" />,
      },
    });
    await new Promise(resolve => window.setTimeout(resolve, 50));

    const card = wrapper.get('.h-guide-item');
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'end', behavior: 'auto' });
    expect(card.attributes('data-popper-placement')).toBe('bottom');
    expect(wrapper.find('.h-guide-item__arrow').exists()).toBe(false);
    expect(card.element.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      target.getBoundingClientRect().bottom + 19,
    );

    wrapper.unmount();
    target.remove();
  });

  test('item and default scroll options run while the next control advances the active step', async () => {
    const firstTarget = document.createElement('div');
    const secondTarget = document.createElement('div');
    document.body.append(firstTarget, secondTarget);
    const firstScroll = vi.fn();
    const secondScroll = vi.fn();
    Object.defineProperty(firstTarget, 'scrollIntoView', { configurable: true, value: firstScroll });
    Object.defineProperty(secondTarget, 'scrollIntoView', {
      configurable: true,
      value: secondScroll,
    });
    const wrapper = mount(HGuide, {
      props: { visible: true, modelValue: 0, mask: false, scrollIntoView: true },
      slots: {
        default: () => [
          <HGuideItem
            target={firstTarget}
            title="First"
            content="One"
            scrollIntoView={{ behavior: 'auto', block: 'start' }}
          />,
          <HGuideItem target={secondTarget} title="Second" content="Two" />,
        ],
      },
    });
    await new Promise(resolve => window.setTimeout(resolve, 20));
    expect(firstScroll).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });

    await wrapper.get('.h-guide-item__footer--control-confirm').trigger('click');
    await new Promise(resolve => window.setTimeout(resolve, 20));
    expect(wrapper.emitted('update:modelValue')).toContainEqual([1]);
    expect(secondScroll).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    wrapper.unmount();
    firstTarget.remove();
    secondTarget.remove();
  });

  test('item zero offsets and disabled scrolling survive mask positioning', async () => {
    const target = document.createElement('button');
    Object.assign(target.style, {
      position: 'fixed',
      left: '500px',
      top: '300px',
      width: '100px',
      height: '32px',
    });
    document.body.appendChild(target);
    const scrollIntoView = vi.fn();
    Object.defineProperty(target, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });
    const wrapper = mount(HGuide, {
      attachTo: document.body,
      props: { visible: false, modelValue: 0, mask: true },
      slots: {
        default: () => (
          <HGuideItem
            target={target}
            title="Zero offsets"
            content="Body"
            placement="bottom"
            arrow={false}
            flip={false}
            distance={0}
            skidding={0}
            mask
            maskTriggerPadding={0}
            scrollIntoView={false}
          />
        ),
      },
    });

    await wrapper.setProps({ visible: true });
    await new Promise(resolve => window.setTimeout(resolve, 50));
    const card = wrapper.get('.h-guide-item');
    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(wrapper.find('.h-guide__mask').exists()).toBe(true);
    expect(card.attributes('data-popper-placement')).toBe('bottom');
    expect(card.element.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      target.getBoundingClientRect().bottom + 3,
    );
    expect(card.element.getBoundingClientRect().top).toBeLessThanOrEqual(
      target.getBoundingClientRect().bottom + 5,
    );
    wrapper.unmount();
    target.remove();
  });

  test('item props override parent controls, styling, media, scrolling and ordering', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const scrollIntoView = vi.fn();
    Object.defineProperty(target, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });
    const wrapper = mount(HGuide, {
      props: {
        visible: true,
        modelValue: 2,
        mask: false,
        type: 'default',
        useControls: true,
        closable: true,
        scrollIntoView: true,
      },
      slots: {
        default: () => [
          <HGuideItem
            index={2}
            target={target}
            type="primary"
            title="Image item"
            image={<span data-test="image-vnode">VNode image</span>}
            content="Text content"
            useControls={false}
            closable={false}
            scrollIntoView={false}
          />,
          <HGuideItem title="Automatic" image="guide.png" content="Automatic item" />,
          <HGuideItem index={0} title="First index" content="First" />,
        ],
      },
    });
    await nextTick();
    await nextTick();

    const items = wrapper.findAll('.h-guide-item');
    expect(items.map(item => item.attributes('data-index'))).toEqual(['2', '1', '0']);
    expect(items[0].classes()).toContain('h-guide-item--primary');
    expect(items[0].find('[data-test="image-vnode"]').text()).toBe('VNode image');
    expect(items[1].get('img').attributes()).toMatchObject({ src: 'guide.png', alt: "guide item's image" });
    expect(items[0].find('.h-guide-item__footer--controls').exists()).toBe(false);
    expect(items[0].find('.h-guide-item__header--close').exists()).toBe(false);
    expect(scrollIntoView).not.toHaveBeenCalled();

    wrapper.unmount();
    target.remove();
  });

  test('draggable cards handle pointer cursor, constrained movement and cleanup', async () => {
    const wrapper = mount(HGuide, {
      attachTo: document.body,
      props: { visible: true, modelValue: 0, mask: false, draggable: true },
      slots: { default: () => <HGuideItem title="Drag me" content="Body" /> },
    });
    await nextTick();
    const header = wrapper.get('.h-guide-item__header');
    const card = wrapper.get('.h-guide-item');

    await header.trigger('mouseenter');
    expect(document.body.style.cursor).toBe('move');
    header.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 20, clientY: 20 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 80, clientY: 70 }));
    expect(card.attributes('style')).toMatch(/translate\(-?\d+(?:\.\d+)?px, -?\d+(?:\.\d+)?px\)/);
    document.dispatchEvent(new MouseEvent('mouseup'));
    expect(document.body.style.cursor).toBe('default');
    await header.trigger('mouseleave');

    header.element.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 80, clientY: 70 }),
    );
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 90, clientY: 85 }));
    document.dispatchEvent(new MouseEvent('mouseup'));

    (card.element as HTMLElement).style.transform = '';
    header.element.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 10, clientY: 10 }),
    );
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 15, clientY: 15 }));
    document.dispatchEvent(new MouseEvent('mouseup'));

    await wrapper.setProps({ draggable: false });
    await nextTick();
    await header.trigger('mouseenter');
    expect(document.body.style.cursor).toBe('default');
    wrapper.unmount();
  });

  test('emit validators reject invalid model and visible payloads', () => {
    expect(useGuideEmits['update:modelValue'](1)).toBe(true);
    expect(useGuideEmits['update:modelValue']('1' as never)).toBe(false);
    expect(useGuideEmits['update:visible'](false)).toBe(true);
    expect(useGuideEmits['update:visible'](0 as never)).toBe(false);
    expect(useGuideEmits.close()).toBe(true);
    expect(useGuideEmits.finish()).toBe(true);
    expect(useGuideItemEmits.close()).toBe(true);
    expect(useGuideItemEmits.finish()).toBe(true);
  });
});
