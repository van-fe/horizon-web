import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import HHover from '../src/Hover';
import { nextTick } from 'vue';
import { sleep } from '~/utils/tools';

describe('Hover.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HHover>Something...</HHover>);
    const element = wrapper.findComponent(HHover);
    expect(element.exists()).toBe(true);
  });

  test('renders safely without default content', () => {
    const wrapper = mount(HHover);
    expect(wrapper.html()).toBe('');
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

  test('emits each native mouse event once with its browser payload', async () => {
    const onMouseEnter = vi.fn();
    const onMouseMove = vi.fn();
    const onMouseLeave = vi.fn();
    const wrapper = mount(HHover, {
      props: { onMouseEnter, onMouseMove, onMouseLeave },
      slots: {
        default: ({ hover }) => <button data-test="hover-target">{String(hover)}</button>,
      },
    });
    const target = wrapper.get('[data-test="hover-target"]');

    await target.trigger('mouseenter');
    await target.trigger('mousemove');
    await target.trigger('mouseleave');

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseMove).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
    expect(onMouseEnter.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    expect(onMouseMove.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    expect(onMouseLeave.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  test('emits visibility changes and exposes show and hide commands', async () => {
    const onVisibleChange = vi.fn();
    const wrapper = mount(HHover, {
      props: { onVisibleChange },
      slots: {
        default: ({ hover }) => <button data-test="hover-target">{String(hover)}</button>,
      },
    });

    (wrapper.vm as unknown as { show(): void }).show();
    await nextTick();
    expect(wrapper.get('[data-test="hover-target"]').text()).toBe('true');
    (wrapper.vm as unknown as { hide(): void }).hide();
    await nextTick();
    expect(wrapper.get('[data-test="hover-target"]').text()).toBe('false');
    expect(onVisibleChange.mock.calls).toEqual([[true], [false]]);
  });

  test('applies disabled and delay prop updates without recreating the target', async () => {
    const onVisibleChange = vi.fn();
    const wrapper = mount(HHover, {
      props: { disabled: true, hoverShowDelay: 50, onVisibleChange },
      slots: {
        default: ({ hover }) => <button data-test="hover-target">{String(hover)}</button>,
      },
    });
    const target = wrapper.get('[data-test="hover-target"]');
    await target.trigger('mouseenter');
    expect(target.text()).toBe('false');

    await wrapper.setProps({ disabled: false, hoverShowDelay: 0, hoverHideDelay: 0 });
    await target.trigger('mouseenter');
    await nextTick();
    expect(target.text()).toBe('true');
    await target.trigger('mouseleave');
    await nextTick();
    expect(target.text()).toBe('false');
    expect(onVisibleChange.mock.calls).toEqual([[true], [false]]);
  });
});
