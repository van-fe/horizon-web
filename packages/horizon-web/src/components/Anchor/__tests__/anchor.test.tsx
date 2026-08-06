import { mount } from '@vue/test-utils';
import HAnchor from '../src/Anchor';
import HAnchorLink from '../src/AnchorLink';
import { describe, expect, test, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { compile } from 'sass';
import { resolve } from 'node:path';

describe('Anchor.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HAnchor scrollContainer={document.body} />);
    const element = wrapper.findComponent(HAnchor);

    expect(element.exists()).toBe(true);
    expect(element.classes()).toContain('h-anchor');
  });

  test('keeps its presentation above contextual link styles', () => {
    const css = compile(resolve(__dirname, '../src/style/index.scss')).css;

    // Two component classes outrank contextual element rules such as `.vp-doc a`.
    expect(css).toContain('.h-anchor__link-title-txt.h-anchor__link-title-txt {');
    expect(css).toContain('font-weight: inherit;');
    expect(css).toContain('text-underline-offset: auto;');
    expect(css).toContain(
      '.h-anchor__link-title-txt.h-anchor__link-title-txt:hover, .h-anchor__link-title-txt.h-anchor__link-title-txt:active {',
    );
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
  });
});
