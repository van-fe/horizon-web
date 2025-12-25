import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import HHover from '../src/Hover';
import { nextTick } from 'vue';
import { sleep } from '~/utils/tools';

describe('Hover.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HHover>Something...</HHover>);
    const element = wrapper.findComponent(HHover);
    expect(element.exists()).toBe(true);
  });

  test('button should turn visible when hovering the container and turn invisible when leaving the container', async () => {
    const wrapper = mount(HHover, {
      slots: {
        default: ({ hover }) => (
          <div class="container">{hover && <div class="del-button">Button</div>}</div>
        ),
      },
    });
    await nextTick();
    const containerElement = wrapper.find('.container');
    expect(wrapper.find('.del-button').exists()).toBe(false);
    await containerElement.trigger('mouseenter');
    await sleep(0);
    expect(wrapper.find('.del-button').exists()).toBe(true);
    await containerElement.trigger('mouseleave');
    await sleep(0);
    expect(wrapper.find('.del-button').exists()).toBe(false);
  });

  test('when props.disabled is true, button should be invisible when hovering the container', async () => {
    const wrapper = mount(HHover, {
      propsData: {
        disabled: true,
      },
      slots: {
        default: ({ hover }) => (
          <div class="container">{hover && <div class="del-button">Button</div>}</div>
        ),
      },
    });
    await nextTick();
    const containerElement = wrapper.find('.container');
    expect(wrapper.find('.del-button').exists()).toBe(false);
    await containerElement.trigger('mouseenter');
    expect(wrapper.find('.del-button').exists()).toBe(false);
  });

  test('when props.openHoverTimer is 50, button should turn visible after 50ms delay when hovering the container', async () => {
    const wrapper = mount(HHover, {
      propsData: {
        hoverShowDelay: 50,
      },
      slots: {
        default: ({ hover }) => (
          <div class="container">{hover && <div class="del-button">Button</div>}</div>
        ),
      },
    });
    await nextTick();
    const containerElement = wrapper.find('.container');
    expect(wrapper.find('.del-button').exists()).toBe(false);
    await containerElement.trigger('mouseenter');
    await sleep(50);
    expect(wrapper.find('.del-button').exists()).toBe(true);
  });

  test('when props.hoverHideDelay is 50, button should turn invisible after 50ms delay when leaving the container', async () => {
    const wrapper = mount(HHover, {
      propsData: {
        hoverHideDelay: 50,
      },
      slots: {
        default: ({ hover }) => (
          <div class="container">{hover && <div class="del-button">Button</div>}</div>
        ),
      },
    });
    await nextTick();
    const containerElement = wrapper.find('.container');
    expect(wrapper.find('.del-button').exists()).toBe(false);
    await containerElement.trigger('mouseenter');
    await sleep(0);
    expect(wrapper.find('.del-button').exists()).toBe(true);
    await containerElement.trigger('mouseleave');
    await sleep(0);
    expect(wrapper.find('.del-button').exists()).toBe(true);
    await sleep(50);
    expect(wrapper.find('.del-button').exists()).toBe(false);
  });
});
