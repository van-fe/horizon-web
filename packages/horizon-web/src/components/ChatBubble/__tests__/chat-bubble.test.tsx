import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import Avatar from '../../Avatar/src/Avatar';
import VirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import VirtualScrollerItem from '../../VirtualScroller/src/VirtualScrollerItem';
import ChatBubble from '../src/ChatBubble';
import ChatBubbleList from '../src/ChatBubbleList';
import type { ChatBubbleListSlotScope } from '../src/composables/useSlots';

describe('ChatBubble', () => {
  test('renders message metadata and placement', () => {
    const wrapper = mount(ChatBubble, {
      props: {
        content: 'Hello Horizon',
        placement: 'end',
        variant: 'primary',
        name: 'Aurora',
        datetime: '2026-08-01 10:30',
        status: 'Read',
        ariaLabel: 'Message from Aurora',
      },
    });

    expect(wrapper.classes()).toContain('h-chat-bubble--end');
    expect(wrapper.classes()).toContain('h-chat-bubble--primary');
    expect(wrapper.attributes('aria-label')).toBe('Message from Aurora');
    expect(wrapper.get('.h-chat-bubble__content').text()).toBe('Hello Horizon');
    expect(wrapper.get('.h-chat-bubble__name').text()).toBe('Aurora');
    expect(wrapper.get('time').attributes('datetime')).toBe('2026-08-01 10:30');
    expect(wrapper.get('.h-chat-bubble__status').text()).toBe('Read');
  });

  test('reuses Avatar and supports custom content slots', () => {
    const wrapper = mount(ChatBubble, {
      props: { avatar: '/avatar.png', content: 'fallback' },
      slots: {
        default: () => <strong>Slotted message</strong>,
        footer: () => <button type="button">Reply</button>,
      },
    });

    expect(wrapper.findComponent(Avatar).exists()).toBe(true);
    expect(wrapper.get('.h-chat-bubble__content').text()).toBe('Slotted message');
    expect(wrapper.get('button').text()).toBe('Reply');
  });

  test('applies numeric and string maximum widths', async () => {
    const wrapper = mount(ChatBubble, { props: { maxWidth: 320 } });
    expect(wrapper.get('.h-chat-bubble__main').attributes('style')).toContain('max-width: 320px');

    await wrapper.setProps({ maxWidth: '48rem' });
    expect(wrapper.get('.h-chat-bubble__main').attributes('style')).toContain('max-width: 48rem');
  });
});

describe('ChatBubbleList', () => {
  const items = Array.from({ length: 1000 }, (_, index) => ({
    id: index,
    content: `Message ${index}`,
    placement: index % 2 ? ('end' as const) : ('start' as const),
  }));

  const updateViewport = async (wrapper: ReturnType<typeof mount>, height = 200) => {
    const scrollWrapper = wrapper.find<HTMLElement>('.h-scrollbar__wrap');
    Object.defineProperty(scrollWrapper.element, 'clientHeight', {
      configurable: true,
      value: height,
    });
    await scrollWrapper.trigger('scroll');
    await nextTick();
    await nextTick();
  };

  test('virtualizes large message collections with variable-size items', async () => {
    const wrapper = mount(ChatBubbleList, {
      props: { items, height: 200, minItemSize: 48, buffer: 0 },
    });

    await updateViewport(wrapper);

    expect(wrapper.findComponent(VirtualScroller).exists()).toBe(true);
    expect(wrapper.findComponent(VirtualScrollerItem).exists()).toBe(true);
    expect(wrapper.findAllComponents(ChatBubble).length).toBeGreaterThan(0);
    expect(wrapper.findAllComponents(ChatBubble).length).toBeLessThan(items.length);
  });

  test('forwards scrolling methods through its public exposes', () => {
    const wrapper = mount(ChatBubbleList, { props: { items: items.slice(0, 10) } });
    const scroller = wrapper.findComponent(VirtualScroller);
    const scrollerExposes = scroller.getCurrentComponent().exposed!;
    const scrollToItem = vi.spyOn(scrollerExposes, 'scrollToItem');
    const scrollToBottom = vi.spyOn(scrollerExposes, 'scrollToBottom');
    const listExposes = wrapper.getCurrentComponent().exposed!;

    listExposes.scrollToItem(6);
    listExposes.scrollToBottom();

    expect(scrollToItem).toHaveBeenCalledWith(6);
    expect(scrollToBottom).toHaveBeenCalledOnce();
  });

  test('supports custom item and empty slots', async () => {
    const wrapper = mount(ChatBubbleList, {
      props: { items: items.slice(0, 1) },
      slots: {
        default: ({ item }: ChatBubbleListSlotScope) => (
          <div class="custom-message">{item.content}</div>
        ),
        empty: () => <div class="empty-message">No messages</div>,
      },
    });

    await updateViewport(wrapper);
    expect(wrapper.get('.custom-message').text()).toBe('Message 0');

    await wrapper.setProps({ items: [] });
    await nextTick();
    await nextTick();
    expect(wrapper.get('.empty-message').text()).toBe('No messages');
  });
});
