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
    expect(element.classes()).toContain('n-anchor');
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
      expect(anchor.classes()).toContain('n-anchor--medium');

      size.value = 'small';
      await nextTick();
      expect(anchor.classes()).toContain('n-anchor--small');
    });

    test('showLine', async () => {
      const showLine = ref(true);

      const wrapper = mount(() => (
        <HAnchor scrollContainer={document.body} showLine={showLine.value}>
          <HAnchorLink href="#sectionOne1" title="sectionOne1" />
        </HAnchor>
      ));
      const anchor = wrapper.findComponent(HAnchor);

      const lineElem = anchor.find('.n-anchor__line');
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

      const links = anchor.findAll('.n-anchor__link-title-txt');
      const lastLink = links[links.length - 1];

      await lastLink.trigger('click');
      const lastLinkParentClassList = Array.from(lastLink.element.parentElement?.classList || []);
      expect(lastLinkParentClassList.includes('is-active')).toBe(true);
      expect(clickHandle).toHaveBeenCalled();
      expect(changeHandle).toHaveBeenCalled();
    });
  });
});
