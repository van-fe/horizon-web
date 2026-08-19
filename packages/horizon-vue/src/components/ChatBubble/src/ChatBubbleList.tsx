import { defineComponent, ref } from 'vue';
import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import VirtualScroller from '~/components/VirtualScroller/src/VirtualScroller';
import VirtualScrollerItem from '~/components/VirtualScroller/src/VirtualScrollerItem';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';
import ChatBubble from './ChatBubble';
import type { ChatBubbleListProps } from './composables/useProps';
import { useChatBubbleListProps } from './composables/useProps';
import type { ChatBubbleListEmits } from './composables/useEmits';
import { useChatBubbleListEmits } from './composables/useEmits';
import type { ChatBubbleListExposes } from './composables/useExposes';
import { useChatBubbleListExposes } from './composables/useExposes';
import type { ChatBubbleListSlotScope, ChatBubbleListSlots } from './composables/useSlots';
import { useChatBubbleListSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}ChatBubbleList`,
  desc: '使用虚拟滚动展示大量聊天消息',
  descLocales: { en: 'Displays large message collections with virtual scrolling.' },
  props: useChatBubbleListProps,
  emits: useChatBubbleListEmits,
  slots: useChatBubbleListSlots,
  exposes: useChatBubbleListExposes,
  setup(
    props: ChatBubbleListProps,
    {
      emit,
      expose,
      slots,
    }: HorizonWebSetupContext<ChatBubbleListEmits, ChatBubbleListSlots, ChatBubbleListExposes>,
  ) {
    const classHelper = new ComponentClassBlock('chat-bubble-list');
    const scrollerRef =
      ref<HorizonWebComponentInstance<typeof VirtualScroller, VirtualScrollerExposes>>();

    const scrollToItem = (index: number) => scrollerRef.value?.scrollToItem(index);
    const scrollToBottom = () => scrollerRef.value?.scrollToBottom();

    expose({ scrollToItem, scrollToBottom });

    const renderItem = ({ item, index, active }: ChatBubbleListSlotScope) => (
      <VirtualScrollerItem
        class={classHelper.e('item')}
        item={item}
        index={index}
        active={active}
        sizeDependencies={[item.content, item.name, item.datetime, item.status, item.maxWidth]}
      >
        {slots.default?.({ item, index, active }) ?? (
          <ChatBubble
            content={item.content}
            placement={item.placement}
            variant={item.variant}
            avatar={item.avatar}
            name={item.name}
            datetime={item.datetime}
            status={item.status}
            maxWidth={item.maxWidth}
            ariaLabel={item.ariaLabel}
          />
        )}
      </VirtualScrollerItem>
    );

    return () => (
      <VirtualScroller
        ref={scrollerRef}
        class={classHelper.block}
        items={props.items}
        keyField={props.keyField}
        minItemSize={props.minItemSize}
        scrollerHeight={props.height}
        scrollerMaxHeight={props.maxHeight}
        buffer={props.buffer}
        emitUpdate
        onUpdate={(startIndex, endIndex, visibleStartIndex, visibleEndIndex) =>
          emit('update', startIndex, endIndex, visibleStartIndex, visibleEndIndex)
        }
        onScrollStart={() => emit('reachStart')}
        onScrollEnd={() => emit('reachEnd')}
        v-slots={{
          default: renderItem,
          before: () => slots.before?.(),
          after: () => slots.after?.(),
          empty: () => slots.empty?.(),
        }}
      />
    );
  },
});
