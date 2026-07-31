import { mount } from '@vue/test-utils';
import HGuide from '../src/Guide';
import GuideMask from '../src/components/GuideMask';
import { HGuidePropsInjectKey } from '../src/utils/injectedKeys';
import type { HGuideCollectedItems } from '../src/utils/injectedKeys';
import { describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';

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
});
