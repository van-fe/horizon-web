import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import HTransition from '../src/Transition';
import { describe, expect, test, vi } from 'vitest';
import { Transition, TransitionGroup } from 'vue';

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
});
