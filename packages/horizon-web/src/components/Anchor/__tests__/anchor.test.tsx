import { mount } from '@vue/test-utils';
import HAnchor from '../src/Anchor';
import HAnchorLink from '../src/AnchorLink';
import { describe, expect, test, vi } from 'vitest';
import { ref, nextTick } from 'vue';

describe('Anchor.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HAnchor scrollContainer={document.body} />);
    const element = wrapper.findComponent(HAnchor);

    expect(element.exists()).toBe(true);
    expect(element.classes()).toContain('h-anchor');
  });

  describe('props', () => {
    test('size', async () => {
      const size = ref<'small' | 'medium'>('medium');

      const wrapper = mount(() => (
        <HAnchor scrollContainer={document.body} size={size.value}>
          <HAnchorLink href="#sectionOne1" title="sectionOne1" />
        </HAnchor>
      ));
      const anchor = wrapper.findComponent(HAnchor);
      expect(anchor.classes()).toContain('h-anchor--medium');

      size.value = 'small';
      await nextTick();
      expect(anchor.classes()).toContain('h-anchor--small');
    });

    test('showLine', async () => {
      const showLine = ref(true);

      const wrapper = mount(() => (
        <HAnchor scrollContainer={document.body} showLine={showLine.value}>
          <HAnchorLink href="#sectionOne1" title="sectionOne1" />
        </HAnchor>
      ));
      const anchor = wrapper.findComponent(HAnchor);

      const lineElem = anchor.find('.h-anchor__line');
      expect(lineElem.exists()).toBe(true);

      showLine.value = false;
      await nextTick();
      expect(new RegExp('display: none;').test(lineElem.attributes('style') || '')).toBe(true);
    });
  });

  describe('events', () => {
    test('click & change', async () => {
      const clickHandle = vi.fn();
      const changeHandle = vi.fn();

      const wrapper = mount(() => (
        <HAnchor scrollContainer={document.body} onClick={clickHandle} onChange={changeHandle}>
          <HAnchorLink href="#sectionOne1" title="sectionOne1" />
          <HAnchorLink href="#sectionOne2" title="sectionOne2" />
        </HAnchor>
      ));
      const anchor = wrapper.findComponent(HAnchor);

      const links = anchor.findAll('.h-anchor__link-title-txt');
      const lastLink = links[links.length - 1];

      await lastLink.trigger('click');
      const lastLinkParentClassList = Array.from(lastLink.element.parentElement?.classList || []);
      expect(lastLinkParentClassList.includes('is-active')).toBe(true);
      expect(clickHandle).toHaveBeenCalled();
      expect(changeHandle).toHaveBeenCalled();
    });

    test('prevents the native hash change when changeHash is false', async () => {
      const wrapper = mount(() => (
        <HAnchor scrollContainer={document.body} changeHash={false}>
          <HAnchorLink href="#prevented" title="Prevented" />
        </HAnchor>
      ));
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });

      expect(wrapper.get('a').element.dispatchEvent(event)).toBe(false);
      expect(event.defaultPrevented).toBe(true);
    });
  });

  test('inherits the parent link target and renders nested links', () => {
    const wrapper = mount(() => (
      <HAnchor scrollContainer={document.body} linkTarget="_blank" showTitleSuffix>
        <HAnchorLink href="#parent" title="Parent">
          <HAnchorLink href="#child" title="Child" />
        </HAnchorLink>
      </HAnchor>
    ));

    expect(wrapper.findAll('a')).toHaveLength(2);
    expect(wrapper.findAll('a').every(link => link.attributes('target') === '_blank')).toBe(true);
  });

  test('toggles the navigation wrap and emits the controlled collapse value', async () => {
    const wrapper = mount(HAnchor, {
      props: { scrollContainer: document.body, useCollapse: true, collapse: true },
      slots: { default: () => <HAnchorLink href="#one" title="One" /> },
    });
    const wrap = wrapper.get('.h-anchor__wrap');

    expect(wrap.attributes('style')).toContain('display: none');
    await wrapper.get('.h-anchor__collapse-btn').trigger('click');
    expect(wrapper.emitted('update:collapse')).toEqual([[false]]);
    expect(wrap.attributes('style') ?? '').not.toContain('display: none');
  });

  test('removes its scroll listener when unmounted', async () => {
    const container = document.createElement('div');
    const removeEventListener = vi.spyOn(container, 'removeEventListener');
    const wrapper = mount(() => <HAnchor scrollContainer={container} />);

    await nextTick();
    await nextTick();
    wrapper.unmount();

    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
