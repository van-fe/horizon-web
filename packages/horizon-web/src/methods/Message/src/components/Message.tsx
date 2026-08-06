import {
  IconClose,
  IconErrorFilledLight,
  IconInfoFilledLight,
  IconMoreTwo,
  IconSuccessFilledLight,
  IconWarningFilledLight,
} from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, cssVariable, useNamespace, useZIndex } from '@aurora/utils';
import type { CSSProperties } from 'vue';
import { computed, defineComponent, onMounted, ref, Transition, watch } from 'vue';
import LoadingIcon from '~/directives/v-loading/src/components/LoadingIcon';
import type { MessageEmits } from '../composables/useEmits';
import { useMessageEmits } from '../composables/useEmits';
import type { MessageExposes } from '../composables/useExposes';
import { useMessageOptions, type MessageOptions } from '../composables/useProps';

export default defineComponent({
  name: `${useNamespace()}Message`,
  components: {
    IconSuccessFilledLight,
    IconWarningFilledLight,
    IconErrorFilledLight,
    IconInfoFilledLight,
    LoadingIcon,
  },
  inheritAttrs: false,
  props: useMessageOptions,
  emits: useMessageEmits,
  setup(props, { emit, expose }: HorizonWebSetupContext<MessageEmits, any, MessageExposes>) {
    const classHelper = new ComponentClassBlock('message');
    const visible = ref(false);
    const duration = ref(props.duration);
    const offset = ref(props.offset);
    const message = ref(props.message);
    const showType = ref(props.type);

    onMounted(() => {
      startTimer();
      visible.value = true;
    });

    let timer: ReturnType<typeof setTimeout> | null = null;

    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const startTimer = () => {
      clearTimer();
      if (duration.value > 0) {
        timer = setTimeout(() => {
          visible.value = false;
        }, duration.value);
      }
    };

    watch(duration, startTimer);

    const close = () => {
      visible.value = false;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const update = (
      opts: Partial<Pick<MessageOptions, 'message' | 'type' | 'duration' | 'offset'>>,
    ) => {
      if (opts.message) message.value = opts.message;
      if (opts.type) showType.value = opts.type;
      if (opts.duration) duration.value = opts.duration;
      if (opts.offset) offset.value = opts.offset;
    };

    const getOffset = () => offset.value;

    expose({ close, update, getOffset });

    const zIndexHandler = useZIndex(props.zIndex);

    const customStyle = computed<CSSProperties>(() => ({
      top: `${offset.value}px`,
      zIndex: zIndexHandler.current,
    }));

    const icons = {
      success: IconSuccessFilledLight,
      info: IconInfoFilledLight,
      warning: IconWarningFilledLight,
      error: IconErrorFilledLight,
    };

    function onMouseEnter() {
      clearTimer();
    }

    function onMouseLeave() {
      startTimer();
    }

    return () => {
      const CurrentTypeIcon =
        showType.value && showType.value !== 'loading' ? icons[showType.value] : null;

      return (
        <Transition
          name={new ComponentClassBlock('message-fade').block}
          appear
          onEnter={() => emit('open')}
          onAfterEnter={() => emit('opened')}
          onBeforeLeave={() => emit('close')}
          onAfterLeave={() => emit('destroy')}
        >
          {visible.value && (
            <div
              style={customStyle.value}
              class={cls(classHelper.block, classHelper.is(showType.value))}
              onMouseenter={onMouseEnter}
              onMouseleave={onMouseLeave}
            >
              {showType.value === 'loading' ? (
                <LoadingIcon class={classHelper.e('status-icon')} />
              ) : (
                !!CurrentTypeIcon && (
                  <CurrentTypeIcon class={cls(classHelper.e('status-icon'))} size="20" />
                )
              )}
              {props.useHTMLString ? (
                <p v-html={message.value} class={classHelper.e('content')} />
              ) : (
                <p class={[classHelper.e('content'), classHelper.e('plaintext')]}>
                  {message.value}
                  {showType.value == 'loading' && <IconMoreTwo class={classHelper.e('ellipsis')} />}
                </p>
              )}
              {showType.value !== 'loading' && props.showClose && (
                <div class={cls(classHelper.e('close-container'))} onClick={close}>
                  <IconClose
                    class={cls(
                      classHelper.e('close'),
                      classHelper.is(showType.value, !!showType.value),
                    )}
                    size={cssVariable('message-font-size--close-icon')}
                  />
                </div>
              )}
            </div>
          )}
        </Transition>
      );
    };
  },
});
