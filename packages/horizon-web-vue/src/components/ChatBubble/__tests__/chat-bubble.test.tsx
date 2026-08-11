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

  test('all metadata slots override their prop fallbacks', () => {
    const wrapper = mount(ChatBubble, {
      props: {
        avatar: '/fallback.png',
        name: 'Fallback name',
        datetime: 'Fallback time',
        status: 'Fallback status',
      },
      slots: {
        avatar: () => <span class="avatar-slot">Avatar</span>,
        name: () => <span class="name-slot">Name</span>,
        datetime: () => <span class="datetime-slot">Time</span>,
        status: () => <span class="status-slot">Status</span>,
      },
    });

    expect(wrapper.get('.avatar-slot').text()).toBe('Avatar');
    expect(wrapper.get('.name-slot').text()).toBe('Name');
    expect(wrapper.get('.datetime-slot').text()).toBe('Time');
    expect(wrapper.get('.status-slot').text()).toBe('Status');
    expect(wrapper.findComponent(Avatar).exists()).toBe(false);
    expect(wrapper.text()).not.toContain('Fallback name');
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

  test('maxHeight constrains the real virtual-scroller viewport', () => {
    const wrapper = mount(ChatBubbleList, {
      props: { items: items.slice(0, 2), height: 400, maxHeight: 180 },
    });

    const viewport = wrapper.get('.h-scrollbar__wrap');
    expect(viewport.attributes('style')).toContain('height: 400px');
    expect(viewport.attributes('style')).toContain('max-height: 180px');
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

  test('forwards complete item slot scope and before/after slots', async () => {
    const scopes: ChatBubbleListSlotScope[] = [];
    const wrapper = mount(ChatBubbleList, {
      props: { items: items.slice(0, 2), keyField: 'id', minItemSize: 32, buffer: 1 },
      slots: {
        before: () => <div class="before-slot">Before</div>,
        after: () => <div class="after-slot">After</div>,
        default: (scope: ChatBubbleListSlotScope) => {
          scopes.push(scope);
          return <div class="scope-slot">{`${scope.index}:${scope.active}`}</div>;
        },
      },
    });

    await updateViewport(wrapper);
    expect(wrapper.get('.before-slot').text()).toBe('Before');
    expect(wrapper.get('.after-slot').text()).toBe('After');
    expect(scopes[0].item).toMatchObject({ id: 0, content: 'Message 0' });
    expect(scopes[0].index).toBe(0);
    expect(typeof scopes[0].active).toBe('boolean');
    expect(wrapper.emitted('update')?.[0]).toEqual([
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
    ]);
  });

  test('wires virtual scroller boundary events to public list emits', () => {
    const wrapper = mount(ChatBubbleList, { props: { items: items.slice(0, 2) } });
    const scroller = wrapper.findComponent(VirtualScroller);

    scroller.vm.$emit('scrollStart');
    scroller.vm.$emit('scrollEnd');

    expect(wrapper.emitted('reachStart')).toHaveLength(1);
    expect(wrapper.emitted('reachEnd')).toHaveLength(1);
  });
});
