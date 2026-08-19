import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import HTransition from '../src/Transition';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref, Transition, TransitionGroup } from 'vue';

describe('Transition.tsx', () => {
  test('basic', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const wrapper = mount(() => (
      <HTransition>
        <div>BOX</div>
      </HTransition>
    ));
    const element = wrapper.findComponent(HTransition);

    expect(element.exists()).toBe(true);
    expect(warn.mock.calls.flat().join(' ')).not.toContain(
      'invoked outside of the render function',
    );
    warn.mockRestore();
  });

  test('renders an empty native transition when the default slot is absent', () => {
    const wrapper = mount(HTransition);
    expect(wrapper.findComponent(Transition).exists()).toBe(true);
    expect(wrapper.text()).toBe('');
  });

  test.each([
    ['extra-fast', 180],
    ['fast', 200],
    ['normal', 300],
    ['slow', 400],
  ] as const)('maps %s speed to duration', (speed, duration) => {
    const wrapper = mount(() => (
      <HTransition speed={speed}>
        <div>Box</div>
      </HTransition>
    ));

    const transition = wrapper.findComponent(Transition) as unknown as VueWrapper<any>;
    expect(transition.props('duration')).toBe(duration);
    expect(transition.props('name')).toBe(`h-fade-in-${speed}`);
  });

  test('uses specialized tooltip timing and omits transition mode for groups', () => {
    const tooltip = mount(() => (
      <HTransition name="tooltip" mode="out-in">
        <div>Tip</div>
      </HTransition>
    ));
    const group = mount(() => (
      <HTransition group mode="out-in">
        <div key="one">One</div>
      </HTransition>
    ));

    const tooltipTransition = tooltip.findComponent(Transition) as unknown as VueWrapper<any>;
    const groupTransition = group.findComponent(TransitionGroup) as unknown as VueWrapper<any>;
    expect(tooltipTransition.props('name')).toBe('h-tooltip');
    expect(tooltipTransition.props('duration')).toBe(400);
    expect(tooltipTransition.props('mode')).toBe('out-in');
    expect(groupTransition.exists()).toBe(true);
    expect(groupTransition.attributes('mode')).toBeUndefined();
  });

  test('forwards appear and persisted to the native transition contract', () => {
    const wrapper = mount(() => (
      <HTransition appear persisted>
        <div>Persistent box</div>
      </HTransition>
    ));
    const transition = wrapper.findComponent(Transition) as unknown as VueWrapper<any>;
    expect(transition.props('appear')).toBe(true);
    expect(transition.props('persisted')).toBe(true);
  });

  test('forwards explicit css mode and arbitrary native transition attributes', () => {
    const wrapper = mount(() => (
      <HTransition css data-contract="transition-attrs">
        <div>CSS box</div>
      </HTransition>
    ));
    const transition = wrapper.findComponent(Transition) as unknown as VueWrapper<any>;
    expect(transition.props('css')).toBe(true);
    expect(transition.attributes('data-contract')).toBe('transition-attrs');
  });

  test('forwards transition lifecycle events with the affected element', () => {
    const wrapper = mount(HTransition, {
      props: { css: false },
      slots: { default: () => <div>Box</div> },
    });
    const transition = wrapper.findComponent(Transition) as unknown as VueWrapper<any>;
    const listeners = transition.vm.$.vnode.props as Record<string, (el: HTMLElement) => void>;
    const element = document.createElement('div');

    listeners.onBeforeEnter(element);
    listeners.onEnter(element);
    listeners.onAfterEnter(element);
    listeners.onBeforeLeave(element);
    listeners.onLeave(element);
    listeners.onAfterLeave(element);

    for (const event of [
      'beforeEnter',
      'enter',
      'afterEnter',
      'beforeLeave',
      'leave',
      'afterLeave',
    ]) {
      expect(wrapper.emitted(event)?.[0]).toEqual([element]);
    }
  });

  test.each([
    ['collapse', 'scrollHeight', 'maxHeight', 'paddingTop', 'paddingBottom'],
    ['collapse-horizontal', 'scrollWidth', 'maxWidth', 'paddingLeft', 'paddingRight'],
  ] as const)(
    'preserves styles across the %s lifecycle with real browser geometry',
    (name, scrollProperty, maxProperty, paddingStart, paddingEnd) => {
      const wrapper = mount(HTransition, {
        props: { name, css: false },
        slots: { default: () => <div>Collapsible</div> },
      });
      const transition = wrapper.findComponent(Transition) as unknown as VueWrapper<any>;
      const listeners = transition.vm.$.vnode.props as Record<
        string,
        (el: HTMLElement) => void
      >;
      const element = document.createElement('div');
      Object.defineProperty(element, scrollProperty, { configurable: true, value: 48 });
      element.style[paddingStart] = '6px';
      element.style[paddingEnd] = '8px';
      element.style.overflow = 'auto';

      listeners.onBeforeEnter(element);
      expect(element.style[maxProperty]).toBe('0px');
      expect(element.style[paddingStart]).toBe('0px');
      listeners.onEnter(element);
      expect(element.style[maxProperty]).toBe('48px');
      expect(element.style[paddingStart]).toBe('6px');
      expect(element.style.overflow).toBe('hidden');
      listeners.onAfterEnter(element);
      expect(element.style[maxProperty]).toBe('');
      expect(element.style.overflow).toBe('auto');

      listeners.onBeforeLeave(element);
      expect(element.style[maxProperty]).toBe('48px');
      listeners.onLeave(element);
      expect(element.style[maxProperty]).toBe('0px');
      listeners.onAfterLeave(element);
      expect(element.style[maxProperty]).toBe('');
      expect(element.style[paddingStart]).toBe('6px');
      expect(element.style[paddingEnd]).toBe('8px');
      expect(element.style.overflow).toBe('auto');
    },
  );

  test.each([
    ['collapse', 'scrollHeight', 'maxHeight'],
    ['collapse-horizontal', 'scrollWidth', 'maxWidth'],
  ] as const)('handles zero-sized %s content', (name, scrollProperty, maxProperty) => {
    const wrapper = mount(HTransition, {
      props: { name, css: false },
      slots: { default: () => <div>Empty collapse</div> },
    });
    const transition = wrapper.findComponent(Transition) as unknown as VueWrapper<any>;
    const listeners = transition.vm.$.vnode.props as Record<
      string,
      (el: HTMLElement) => void
    >;
    const element = document.createElement('div');
    Object.defineProperty(element, scrollProperty, { configurable: true, value: 0 });

    listeners.onBeforeEnter(element);
    listeners.onEnter(element);
    expect(element.style[maxProperty]).toBe('0px');
    listeners.onBeforeLeave(element);
    listeners.onLeave(element);
    expect(element.style[maxProperty]).toBe('0px');
  });

  test('updates dropdown timing after enter and leave lifecycle events', async () => {
    const shown = ref(true);
    const wrapper = mount(() => (
      <HTransition name="dropdown" css={false}>
        {shown.value && <div key="dropdown">Dropdown</div>}
      </HTransition>
    ));
    const transition = wrapper.findComponent(Transition) as unknown as VueWrapper<any>;
    const listeners = transition.vm.$.vnode.props as Record<
      string,
      (el: HTMLElement) => void
    >;
    const element = document.createElement('div');

    expect(transition.props('name')).toBe('h-dropdown');
    expect(transition.props('duration')).toBe(400);
    listeners.onEnter(element);
    await nextTick();
    expect(transition.props('duration')).toBe(200);
    listeners.onAfterLeave(element);
    await nextTick();
    expect(transition.props('duration')).toBe(400);
  });
});
