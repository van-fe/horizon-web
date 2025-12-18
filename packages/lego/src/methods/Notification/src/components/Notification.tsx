import { NIcon } from '@nio-fe/icon';
import type { LegoSetupContext } from '@nio-fe/shared';
import { ComponentClassBlock, cls, useNamespace, usePopupContainerGetter } from '@nio-fe/shared';
import { useTimeoutFn } from '@vueuse/core';
import type { CSSProperties } from 'vue';
import { Teleport, Transition, computed, defineComponent, onMounted, ref, toRefs } from 'vue';
import NButton from '~/components/Button/src/Button';
import useLocaleLang from '~/utils/useLocaleLang';
import { useSensor } from '~/utils/useSensor';
import useSize from '~/utils/useSize';
import type { NotificationEmits } from '../composables/useEmits';
import { useNotificationEmits } from '../composables/useEmits';
import type { NotificationExposes } from '../composables/useExposes';
import { useNotificationExposes } from '../composables/useExposes';
import type { NotificationProps } from '../composables/useProps';
import { useNotificationProps } from '../composables/useProps';

export default defineComponent({
  name: `${useNamespace()}Notification`,
  desc: '全局展示通知提醒，悬浮出现在页面角落，将信息及时有效的传达给用户。更偏向系统本身的通知，大多数与用户操作无关',
  components: {
    NIcon,
    NButton,
  },
  props: useNotificationProps,
  emits: useNotificationEmits,
  exposes: useNotificationExposes,
  setup(props, { emit, expose }: LegoSetupContext<NotificationEmits, {}, NotificationExposes>) {
    const classHelper = new ComponentClassBlock('notification');
    const {
      placement,
      width: propsWidth,
      offset,
      zIndex,
      showConfirmButton,
      showCancelButton,
      type,
      content,
      duration: propsDuration,
      size,
      id,
      customClass,
      title,
      showClose,
      useHTML,
      align,
      cancelButtonProps,
      cancelButtonText,
      confirmButtonProps,
      confirmButtonText,
    } = toRefs<NotificationProps>(props);
    const visibleRef = ref(false);
    let stopTimer: (() => void) | undefined = undefined;
    const popupContainerGetter = usePopupContainerGetter();

    onMounted(() => {
      initTimer();
      open();
      useSensor('$notify', props, 'method');
    });

    const horizontalCls = computed(() => {
      return placement.value.endsWith('right') ? 'right' : 'left';
    });

    const wrapStyle = computed<CSSProperties>(() => {
      const attr = placement.value.startsWith('top') ? 'top' : 'bottom';
      let widthParams = {};

      if (typeof propsWidth.value === 'string' && propsWidth.value.indexOf('px') > -1) {
        widthParams = {
          width: `${propsWidth.value} !important`,
        };
      }
      const width = parseFloat(propsWidth.value as string);
      if (!isNaN(width)) {
        widthParams = {
          width: `${width}px !important`,
        };
      }
      return {
        [attr]: `${offset.value}px`,
        zIndex: zIndex.value,
        ...widthParams,
      };
    });

    const transitionName = computed(() => {
      const direction = horizontalCls.value === 'right' ? 'left' : 'right';
      return `n-transition--slide-${direction}`;
    });

    const showFooter = computed(() => {
      return showConfirmButton.value || showCancelButton.value;
    });

    const typeIcon = computed(() => {
      const iconClsMap = {
        info: 'info_filled',
        success: 'success_filled',
        warning: 'warning_filled',
        error: 'warning_filled',
      };
      return iconClsMap[type.value as keyof typeof iconClsMap];
    });

    const notifyContent = computed(() => {
      return typeof content.value === 'function' ? content.value() : content.value;
    });

    function initTimer() {
      const duration = propsDuration.value > 0 ? propsDuration.value : 0;
      if (duration <= 0) return;

      stopTimer = useTimeoutFn(() => {
        if (visibleRef.value) close();
      }, duration).stop;
    }

    function clearTimer() {
      stopTimer?.();
    }

    function open() {
      visibleRef.value = true;
    }

    function close() {
      stopTimer?.();
      if (!visibleRef.value) {
        return;
      }
      emit('action', 'close');
      visibleRef.value = false;
    }

    function cancel() {
      emit('action', 'cancel');
      visibleRef.value = false;
    }

    function confirm() {
      emit('action', 'confirm');
      visibleRef.value = false;
    }

    // global size
    const sizeRef = useSize(size, 'medium', {
      large: 'medium',
    });

    expose({
      clearTimer,
      close,
    });

    const to = popupContainerGetter.value?.() || 'body';
    return () => (
      <Teleport to={to}>
        <Transition name={transitionName.value} onBeforeLeave={close}>
          <div
            ref="notification"
            v-show={visibleRef.value}
            id={id.value}
            class={cls([
              classHelper.block,
              customClass.value,
              classHelper.m(sizeRef.value),
              horizontalCls.value,
            ])}
            style={wrapStyle.value}
          >
            <div class={cls(classHelper.e('body'))}>
              {typeIcon.value ? (
                <NIcon
                  class={cls([classHelper.e('icon'), classHelper.m(type.value)])}
                  name={typeIcon.value}
                />
              ) : (
                ''
              )}
              <div class={cls(classHelper.e('group'))}>
                <div class={cls(classHelper.e('header'))}>
                  <h2 class={cls(classHelper.e('title'))} v-text={title.value}></h2>
                  {showClose.value ? (
                    <span class={cls(classHelper.e('close'))} onClick={close}>
                      <NIcon name="close" size={12} />
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <p class={cls(classHelper.e('content'))}>
                  {useHTML.value ? (
                    <span v-html={notifyContent.value}></span>
                  ) : (
                    <span>{notifyContent.value}</span>
                  )}
                </p>
              </div>
            </div>
            <div
              v-show={showFooter.value}
              class={cls([classHelper.e('footer'), classHelper.m(align.value)])}
            >
              <NButton
                v-show={showCancelButton.value}
                class={cls(classHelper.e('cancel'))}
                forceNewestSize={true}
                {...cancelButtonProps.value}
                onClick={cancel}
              >
                {cancelButtonText.value || useLocaleLang('global.cancel').value}
              </NButton>
              <NButton
                v-show={showConfirmButton.value}
                class={cls(classHelper.e('confirm'))}
                forceNewestSize={true}
                {...confirmButtonProps.value}
                onClick={confirm}
              >
                {confirmButtonText.value || useLocaleLang('global.ok').value}
              </NButton>
            </div>
          </div>
        </Transition>
      </Teleport>
    );
  },
});
