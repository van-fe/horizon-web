import { mount, shallowMount } from '@vue/test-utils';
import HMask from '../src/Mask';
import { describe, expect, test } from 'vitest';

describe('Mask.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HMask />);
    const element = wrapper.findComponent(HMask);

    expect(element.exists()).toBe(true);
  });

  test('keeps hidden masks non-interactive while preserving slotted content', () => {
    const wrapper = mount(HMask, {
      props: { value: false, zIndex: 12 },
      slots: { default: () => <button>Continue</button> },
    });

    expect(wrapper.attributes('style')).toContain('opacity: 0');
    expect(wrapper.attributes('style')).toContain('pointer-events: none');
    expect(wrapper.attributes('style')).toContain('z-index: 12');
    expect(wrapper.get('button').text()).toBe('Continue');
  });

  test('applies custom scrim styling and emits only from the scrim', async () => {
    const wrapper = mount(HMask, {
      props: {
        color: 'rgb(1, 2, 3)' as any,
        opacity: 0.6,
        absolute: true,
        scrimClass: 'audit-scrim',
        scrimStyle: { border: '1px solid red' },
        contentFullSize: true,
      },
      slots: { default: () => <span>content</span> },
    });
    const scrim = wrapper.get('.h-mask__scrim');

    expect(wrapper.classes()).toContain('is-absolute');
    expect(scrim.classes()).toContain('audit-scrim');
    expect(scrim.attributes('style')).toContain('background-color: rgb(1, 2, 3)');
    expect(scrim.attributes('style')).toContain('opacity: 0.6');
    expect(wrapper.get('.h-mask__content').classes()).toContain('is-full-size');

    await wrapper.get('.h-mask__content').trigger('click');
    expect(wrapper.emitted('clickMask')).toBeUndefined();
    await scrim.trigger('click');
    expect(wrapper.emitted('clickMask')).toHaveLength(1);
  });

  test('fuzzification overrides color and opacity with a blur treatment', () => {
    const wrapper = mount(HMask, {
      props: { isFuzzification: true, color: 'black' as any, opacity: 0.2 },
    });
    const style = wrapper.get('.h-mask__scrim').attributes('style');

    expect(style).toContain('background-color: rgba(255, 255, 255, 0.4)');
    expect(style).toContain('opacity: 1');
    expect(style).toContain('backdrop-filter: blur(8px)');
  });
});
