import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import type { Router } from 'vue-router';
import type { Plugin } from 'vue';
import HLink from '../src/Link';
import { useLinkEmits } from '../src/composables/useEmits';

describe('Link public API contracts', () => {
  test('href, target, underline mode and every content slot render on a native link', async () => {
    const onClick = vi.fn();
    const wrapper = mount(HLink, {
      props: {
        href: '/guide',
        target: '_blank',
        underline: 'always',
        onClick,
      },
      slots: {
        prefix: () => <span data-test="link-prefix">Before</span>,
        default: () => <span data-test="link-content">Guide</span>,
        suffix: () => <span data-test="link-suffix">After</span>,
      },
    });
    const link = wrapper.get('a');

    expect(link.attributes()).toMatchObject({ href: '/guide', target: '_blank' });
    expect(link.classes()).toEqual(expect.arrayContaining(['has-underline', 'is-underline-always']));
    expect(wrapper.get('[data-test="link-prefix"]').text()).toBe('Before');
    expect(wrapper.get('[data-test="link-content"]').text()).toBe('Guide');
    expect(wrapper.get('[data-test="link-suffix"]').text()).toBe('After');
    await link.trigger('click');
    expect(onClick).toHaveBeenCalledOnce();
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  test('router to and replace call the matching navigation contract', async () => {
    const router = {
      resolve: vi.fn(() => ({ href: '/resolved' })),
      push: vi.fn(),
      replace: vi.fn(),
    };
    const routerPlugin: Plugin = {
      install(app) {
        app.config.globalProperties.$router = router as unknown as Router;
      },
    };
    const wrapper = mount(HLink, {
      props: { to: { name: 'guide' } },
      slots: { default: () => 'Router link' },
      global: { plugins: [routerPlugin] },
    });
    const link = wrapper.get('a');

    expect(link.attributes('href')).toBe('/resolved');
    await link.trigger('click');
    expect(router.push).toHaveBeenCalledWith({ name: 'guide' });
    expect(router.replace).not.toHaveBeenCalled();

    await wrapper.setProps({ replace: true });
    await link.trigger('click');
    expect(router.replace).toHaveBeenCalledWith({ name: 'guide' });
  });

  test('anchor position, offset and both scrollTarget forms drive smooth scrolling', async () => {
    const scrollTarget = document.createElement('div');
    scrollTarget.id = 'link-scroll-target';
    document.body.appendChild(scrollTarget);
    Object.defineProperty(scrollTarget, 'scrollTop', {
      configurable: true,
      value: 20,
      writable: true,
    });
    const scroll = vi.fn();
    Object.defineProperty(scrollTarget, 'scroll', { configurable: true, value: scroll });
    vi.spyOn(scrollTarget, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 5,
      width: 200,
      height: 200,
      top: 5,
      right: 200,
      bottom: 205,
      left: 0,
      toJSON: () => ({}),
    });
    const wrapper = mount(HLink, {
      attachTo: document.body,
      props: {
        anchor: 'api-link-anchor',
        anchorPosition: 'left',
        anchorOffset: 10,
        scrollTarget: '#link-scroll-target',
        target: '_self',
      },
      slots: { default: () => 'Anchor' },
    });
    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 100,
      height: 20,
      top: 0,
      right: 100,
      bottom: 20,
      left: 0,
      toJSON: () => ({}),
    });

    expect(wrapper.classes()).toContain('is-anchor-left');
    expect(wrapper.get('.h-link__anchor').attributes()).toMatchObject({
      href: '#api-link-anchor',
      target: '_self',
    });
    await wrapper.get('.h-link__anchor').trigger('click');
    await Promise.resolve();
    expect(scroll).toHaveBeenLastCalledWith({ top: 5, behavior: 'smooth' });
    expect(window.location.hash).toBe('#api-link-anchor');

    await wrapper.setProps({ scrollTarget });
    await wrapper.get('.h-link__anchor').trigger('click');
    await Promise.resolve();
    expect(scroll).toHaveBeenCalledTimes(2);
    window.history.replaceState(null, '', window.location.pathname);
    wrapper.unmount();
    scrollTarget.remove();
  });

  test('to without a router preserves href and warns instead of navigating', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const wrapper = mount(HLink, {
      props: { to: '/missing-router', href: '/fallback' },
      slots: { default: () => 'Fallback' },
    });

    expect(wrapper.get('a').attributes('href')).toBe('/fallback');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('vue-router'));
    warn.mockRestore();
  });

  test('click emit validator only accepts native mouse events', () => {
    expect(useLinkEmits.click(new MouseEvent('click'))).toBe(true);
    expect(useLinkEmits.click(new Event('click') as MouseEvent)).toBe(false);
    expect(useLinkEmits.click({} as MouseEvent)).toBe(false);
  });
});
