import { mount } from '@vue/test-utils';
import { HGuide, HGuideItem } from '..';
import GuideMask from '../src/components/GuideMask';
import { HGuidePropsInjectKey } from '../src/utils/injectedKeys';
import type { HGuideCollectedItems } from '../src/utils/injectedKeys';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';

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
    const wrapper = mount(GuideMask, {
      props: { currentItem },
      global: {
        provide: {
          [HGuidePropsInjectKey as symbol]: {},
        },
      },
    });

    expect(wrapper.find('path').attributes('d')).toContain('M24 38Q24 34 28 34H112');

    wrapper.unmount();
    target.remove();
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
});
