import { mount } from '@vue/test-utils';
import HAnchor from '../src/Anchor';
import HAnchorLink from '../src/AnchorLink';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { h, ref, nextTick } from 'vue';

describe('Anchor.tsx', () => {
  beforeEach(() => {
    history.replaceState(null, '', `${location.pathname}${location.search}`);
  });

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

  test('applies max height and custom root styles while hiding the highlight line', () => {
    const wrapper = mount(() => (
      <HAnchor
        scrollContainer={document.body}
        maxHeight={321}
        style={{ position: 'fixed', right: '8px' }}
        showHighlightLine={false}
      >
        <HAnchorLink href="#styled" title="Styled" />
      </HAnchor>
    ));

    expect(wrapper.get('.h-anchor').attributes('style')).toContain('max-height: 321px');
    expect(wrapper.get('.h-anchor').attributes('style')).toContain('position: fixed');
    expect(wrapper.get('.h-anchor__line--highlight').attributes('style')).toContain(
      'display: none',
    );
  });

  test('renders custom collapse content and the default localized content', () => {
    const custom = mount(() => (
      <HAnchor
        scrollContainer={document.body}
        useCollapse
        collapseText={h('strong', { class: 'custom-collapse' }, 'Navigate')}
      />
    ));
    const localized = mount(() => <HAnchor scrollContainer={document.body} useCollapse />);

    expect(custom.get('.custom-collapse').text()).toBe('Navigate');
    expect(localized.find('.h-anchor__collapse-btn-txt').exists()).toBe(true);
  });

  test('renders headings automatically from string and grouped selector rules', async () => {
    const container = document.createElement('section');
    container.innerHTML = [
      '<h1 id="intro">Introduction</h1>',
      '<h2>Details</h2>',
      '<p><h3 id="deep">Deep section</h3></p>',
    ].join('');
    document.body.append(container);
    const wrapper = mount(HAnchor, {
      props: {
        autoRender: true,
        autoRenderRules: [['h1', '.not-present'], 'h2', 'h3'],
        scrollContainer: container,
      },
      slots: { default: () => <span class="ignored-default">ignored</span> },
    });

    await nextTick();
    await nextTick();
    expect(wrapper.find('.ignored-default').exists()).toBe(false);
    expect(wrapper.findAll('a').map(link => link.text())).toEqual([
      'Introduction',
      'Details',
      'Deep section',
    ]);
    expect(container.querySelector('h2')?.id).toBe('Details');

    container.insertAdjacentHTML('beforeend', '<h1 id="appendix">Appendix</h1>');
    (wrapper.vm as unknown as { refreshAnchorList: () => void }).refreshAnchorList();
    await nextTick();
    expect(wrapper.findAll('a').at(-1)?.attributes('href')).toBe('#appendix');
    container.remove();
  });

  test('updates a selector-based scroll container through the public expose', async () => {
    const first = document.createElement('div');
    first.id = 'anchor-scroll-host';
    document.body.append(first);
    const wrapper = mount(HAnchor, { props: { scrollContainer: '#anchor-scroll-host' } });
    const firstRemove = vi.spyOn(first, 'removeEventListener');

    await nextTick();
    await nextTick();
    first.id = 'old-anchor-scroll-host';
    const second = document.createElement('div');
    second.id = 'anchor-scroll-host';
    document.body.append(second);
    (wrapper.vm as unknown as { updateScrollContainer: () => void }).updateScrollContainer();
    await nextTick();

    expect(firstRemove).toHaveBeenCalledWith('scroll', expect.any(Function));
    wrapper.unmount();
    first.remove();
    second.remove();
  });

  test('uses the current hash on mount and exposes active-link updates', async () => {
    const previousUrl = location.href;
    history.replaceState(null, '', '#encoded%20heading');
    const change = vi.fn();
    const target = document.createElement('div');
    target.id = 'encoded heading';
    document.body.append(target);
    const wrapper = mount(HAnchor, {
      props: { scrollContainer: document.body, onChange: change },
      slots: {
        default: () => <HAnchorLink href="#encoded heading" title="Encoded heading" />,
      },
    });

    await nextTick();
    await nextTick();
    expect(wrapper.get('.h-anchor__link-title').classes()).toContain('is-active');
    expect(change).toHaveBeenCalledWith('#encoded heading', '');

    (wrapper.vm as unknown as {
      updateActiveLink: (link: string, scroll?: boolean) => void;
    }).updateActiveLink('', false);
    await nextTick();
    expect(wrapper.get('.h-anchor__line--highlight').attributes('style')).toContain('height: 0px');
    history.replaceState(null, '', previousUrl);
    target.remove();
  });

  test('emits exact native click payload and permits hash changes when enabled', async () => {
    const click = vi.fn();
    const change = vi.fn();
    const wrapper = mount(() => (
      <HAnchor scrollContainer={document.body} changeHash onClick={click} onChange={change}>
        <HAnchorLink href="#payload" title="Payload" />
      </HAnchor>
    ));
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });

    wrapper.get('a').element.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(click).toHaveBeenCalledWith({ href: '#payload', title: 'Payload' }, event);
    expect(change).toHaveBeenCalledWith('#payload', '');
  });

  test('supports title/default slots, own target, and hidden empty links', () => {
    const wrapper = mount(() => (
      <HAnchor scrollContainer={document.body}>
        <HAnchorLink href="#slot" target="_parent" v-slots={{ title: () => 'Slot title' }}>
          <span class="nested-slot">Nested</span>
        </HAnchorLink>
        <HAnchorLink />
      </HAnchor>
    ));

    expect(wrapper.get('a').text()).toBe('Slot title');
    expect(wrapper.get('a').attributes('target')).toBe('_parent');
    expect(wrapper.get('.nested-slot').text()).toBe('Nested');
    expect(wrapper.findAll('.h-anchor__link-title')[1].classes()).toContain('is-hide');
  });

  test('tracks reactive href changes and removes old scroll targets', async () => {
    const href = ref('#first-reactive');
    const wrapper = mount(() => (
      <HAnchor scrollContainer={document.body}>
        <HAnchorLink href={href.value} title="Reactive" />
      </HAnchor>
    ));
    await nextTick();
    href.value = '#second-reactive';
    await nextTick();

    document.body.dispatchEvent(new Event('scroll'));
    expect(wrapper.get('a').attributes('href')).toBe('#second-reactive');
  });

  test('selects the latest section from real scroll events and ignores missing targets', async () => {
    const container = document.createElement('div');
    const first = document.createElement('section');
    const second = document.createElement('section');
    first.id = 'visible-first';
    second.id = 'visible-second';
    container.append(first, second);
    document.body.append(container);
    container.getBoundingClientRect = () => ({ top: 100, height: 300 }) as DOMRect;
    first.getBoundingClientRect = () => ({ top: 80, height: 30 }) as DOMRect;
    second.getBoundingClientRect = () => ({ top: 90, height: 30 }) as DOMRect;
    const change = vi.fn();
    const wrapper = mount(() => (
      <HAnchor scrollContainer={container} boundsOffset="start" onChange={change}>
        <HAnchorLink href="#visible-first" title="First" />
        <HAnchorLink href="#missing-target" title="Missing" />
        <HAnchorLink href="#visible-second" title="Second" />
      </HAnchor>
    ));
    await nextTick();
    await nextTick();

    container.dispatchEvent(new Event('scroll'));
    await nextTick();
    expect(wrapper.findAll('.h-anchor__link-title')[2].classes()).toContain('is-active');
    expect(change).toHaveBeenCalledWith('#visible-second', '');

    first.getBoundingClientRect = () => ({ top: 150, height: 30 }) as DOMRect;
    second.getBoundingClientRect = () => ({ top: 160, height: 30 }) as DOMRect;
    container.dispatchEvent(new Event('scroll'));
    await nextTick();
    expect(change).toHaveBeenLastCalledWith('', '#visible-second');
    container.remove();
  });

  test('scrolls the configured container with offset and updates the highlight geometry', async () => {
    const container = document.createElement('div');
    const target = document.createElement('section');
    target.id = 'scroll-target';
    container.append(target);
    document.body.append(container);
    container.getBoundingClientRect = () => ({ top: 20, height: 200 }) as DOMRect;
    target.getBoundingClientRect = () => ({ top: 120, height: 40 }) as DOMRect;
    Object.defineProperty(container, 'scrollTop', { value: 10, writable: true });
    const scrollTo = vi.fn();
    container.scrollTo = scrollTo;
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(handler => {
      handler(0);
      return 1;
    });
    const wrapper = mount(() => (
      <HAnchor scrollContainer={container} scrollOffset="center" scrollBehavior="auto">
        <HAnchorLink href="#scroll-target" title="Target" />
      </HAnchor>
    ));
    await nextTick();
    await nextTick();
    const linkTitle = wrapper.get('.h-anchor__link-title').element as HTMLElement;
    Object.defineProperty(linkTitle, 'offsetTop', { value: 7 });
    Object.defineProperty(linkTitle, 'clientHeight', { value: 22 });

    await wrapper.get('a').trigger('click');
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 30, behavior: 'auto' });
    expect(wrapper.get('.h-anchor__line--highlight').attributes('style')).toContain('top: 7px');
    expect(wrapper.get('.h-anchor__line--highlight').attributes('style')).toContain('height: 22px');
    raf.mockRestore();
    container.remove();
  });

  test('uses window by default and ignores invalid or duplicate links', async () => {
    const wrapper = mount(HAnchor, {
      slots: {
        default: () => [
          <HAnchorLink href="not-a-hash" title="Invalid" />,
          <HAnchorLink href="#duplicate" title="First duplicate" />,
          <HAnchorLink href="#duplicate" title="Second duplicate" />,
        ],
      },
    });
    await nextTick();
    await nextTick();

    window.dispatchEvent(new Event('scroll'));
    (wrapper.vm as unknown as {
      updateActiveLink: (link: string, scroll?: boolean) => void;
    }).updateActiveLink('#not-rendered', false);
    await nextTick();
    expect(wrapper.findAll('a')).toHaveLength(3);
    expect(wrapper.find('.is-active').exists()).toBe(false);
  });

  test('auto-renders placeholder hierarchy against the document viewport', async () => {
    const heading = document.createElement('h3');
    heading.id = 'document-deep-heading';
    heading.textContent = 'Document deep heading';
    document.body.append(heading);
    const wrapper = mount(HAnchor, {
      props: { autoRender: true, autoRenderRules: ['h1.never', 'h2.never', '#document-deep-heading'] },
    });

    await nextTick();
    await nextTick();
    const links = wrapper.findAll('a');
    expect(links.at(-1)?.attributes('href')).toBe('#document-deep-heading');
    expect(links.some(link => link.attributes('href') === undefined)).toBe(true);
    heading.remove();
  });

  test('renders string collapse text and reacts to suffix and placement props', async () => {
    const showSuffix = ref(false);
    const placement = ref<'left' | 'right'>('left');
    const wrapper = mount(() => (
      <HAnchor
        scrollContainer={document.body}
        useCollapse
        collapseText="Sections"
        showTitleSuffix={showSuffix.value}
        placement={placement.value}
      >
        <HAnchorLink href="#suffix-parent" title="Parent">
          <HAnchorLink href="#suffix-child" title="Child" />
        </HAnchorLink>
      </HAnchor>
    ));
    expect(wrapper.get('.h-anchor__collapse-btn-txt').text()).toBe('Sections');

    showSuffix.value = true;
    placement.value = 'right';
    await nextTick();
    await nextTick();
    expect(wrapper.get('.h-anchor__link-title-txt').text()).toContain('（1）');
    await wrapper.get('.h-anchor__link-title-txt').trigger('mouseenter');
  });

  test('suppresses scroll observation while an animated click scroll is in progress', async () => {
    vi.useFakeTimers();
    const container = document.createElement('div');
    const target = document.createElement('div');
    target.id = 'animating-target';
    container.append(target);
    document.body.append(container);
    target.getBoundingClientRect = () => ({ top: 0, height: 10 }) as DOMRect;
    container.getBoundingClientRect = () => ({ top: 0, height: 100 }) as DOMRect;
    container.scrollTo = vi.fn();
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(handler => {
      handler(0);
      return 1;
    });
    const change = vi.fn();
    const wrapper = mount(() => (
      <HAnchor scrollContainer={container} onChange={change}>
        <HAnchorLink href="#animating-target" title="Animating" />
      </HAnchor>
    ));
    await nextTick();
    await nextTick();

    await wrapper.get('a').trigger('click');
    container.dispatchEvent(new Event('scroll'));
    expect(change).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(50);
    container.dispatchEvent(new Event('scroll'));
    await nextTick();
    expect(change).toHaveBeenCalledTimes(1);
    raf.mockRestore();
    vi.useRealTimers();
    container.remove();
  });

  test('keeps the nearer preceding heading when reducing three candidates', async () => {
    const container = document.createElement('div');
    container.getBoundingClientRect = () => ({ top: 100, height: 300 }) as DOMRect;
    const positions = [90, 80, 70];
    const sections = positions.map((top, index) => {
      const section = document.createElement('section');
      section.id = `reduce-${index}`;
      section.getBoundingClientRect = () => ({ top, height: 10 }) as DOMRect;
      container.append(section);
      return section;
    });
    document.body.append(container);
    const wrapper = mount(() => (
      <HAnchor scrollContainer={container} boundsOffset={1}>
        {sections.map((_, index) => (
          <HAnchorLink href={`#reduce-${index}`} title={`Reduce ${index}`} />
        ))}
      </HAnchor>
    ));
    await nextTick();
    await nextTick();

    container.dispatchEvent(new Event('scroll'));
    await nextTick();
    expect(wrapper.findAll('.h-anchor__link-title')[0].classes()).toContain('is-active');
    container.remove();
  });
});
