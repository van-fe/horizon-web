import type { CSSProperties } from 'vue';
import { computed, defineComponent } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, getUnitString, useNamespace } from '@aurora/utils';
import Avatar from '~/components/Avatar/src/Avatar';
import type { ChatBubbleProps } from './composables/useProps';
import { useChatBubbleProps } from './composables/useProps';
import type { ChatBubbleSlots } from './composables/useSlots';
import { useChatBubbleSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}ChatBubble`,
  desc: '用于展示聊天消息的对话气泡',
  descLocales: { en: 'Displays a message bubble in a conversation.' },
  props: useChatBubbleProps,
  slots: useChatBubbleSlots,
  setup(props: ChatBubbleProps, { slots }: HorizonWebSetupContext<{}, ChatBubbleSlots>) {
    const classHelper = new ComponentClassBlock('chat-bubble');
    const contentStyle = computed<CSSProperties>(() => ({
      maxWidth: getUnitString(props.maxWidth),
    }));
    const hasHeader = computed(() =>
      Boolean(slots.name || slots.datetime || props.name || props.datetime),
    );
    const hasFooter = computed(() => Boolean(slots.status || slots.footer || props.status));

    return () => (
      <article
        class={[classHelper.block, classHelper.m(props.placement), classHelper.m(props.variant)]}
        aria-label={props.ariaLabel || undefined}
      >
        {(slots.avatar || props.avatar) && (
          <div class={classHelper.e('avatar')}>
            {slots.avatar?.() ?? <Avatar src={props.avatar} size="small" />}
          </div>
        )}
        <div class={classHelper.e('main')} style={contentStyle.value}>
          {hasHeader.value && (
            <div class={classHelper.e('header')}>
              <span class={classHelper.e('name')}>{slots.name?.() ?? props.name}</span>
              <time class={classHelper.e('datetime')} datetime={props.datetime || undefined}>
                {slots.datetime?.() ?? props.datetime}
              </time>
            </div>
          )}
          <div class={classHelper.e('content')}>{slots.default?.() ?? props.content}</div>
          {hasFooter.value && (
            <div class={classHelper.e('footer')}>
              {slots.status?.() ??
                (props.status && <span class={classHelper.e('status')}>{props.status}</span>)}
              {slots.footer?.()}
            </div>
          )}
        </div>
      </article>
    );
  },
});
