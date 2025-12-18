import { defineComponent, Transition, ref, onBeforeUnmount, toRef, computed } from 'vue';
import { useAlertProps, typeMap } from './composables/useProps';
import type { LegoSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { NIcon } from '@aurora/icon';
import NLink from '../../Link';
import type { AlertEmits } from './composables/useEmits';
import { useAlertEmits } from './composables/useEmits';
import type { AlertSlots } from './composables/useSlots';
import { useAlertSlots } from './composables/useSlots';
import type { AlertExposes } from './composables/useExposes';
import { useAlertExposes } from './composables/useExposes';
import type { MaybeElement } from '@vueuse/core';
import { useIntersectionObserver, useResizeObserver } from '@vueuse/core';
import throttle from 'lodash/throttle';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}Alert`,
  desc: '用于页面中展示重要的提示信息',
  props: useAlertProps,
  emits: useAlertEmits,
  slots: useAlertSlots,
  exposes: useAlertExposes,
  setup(props, { emit, slots }: LegoSetupContext<AlertEmits, AlertSlots, AlertExposes>) {
    const textRef = ref<MaybeElement>(null);
    const classHelper = new ComponentClassBlock('alert');
    const visible = ref(true);
    const lineCount = ref(0);
    const showBtn = computed(() => !!props.primaryButtonText || !!props.defaultButtonText);
    const showCloseIcon = computed(() => !showBtn.value && props.closable);

    // global size
    const size = toRef(props, 'size');
    const sizeRef = useSize(size, 'medium');

    const close = (evt: MouseEvent) => {
      visible.value = false;
      emit('close', evt);
    };
    const _close = () => {
      visible.value = false;
    };

    const countLines = (ele: Element) => {
      const styles = window.getComputedStyle(ele, null);
      const lh = parseInt(styles.lineHeight, 10);
      const h = parseInt(styles.height, 10);
      return Math.round(h / lh);
    };

    function countLine() {
      throttle(() => {
        lineCount.value = countLines(textRef.value as Element);
      }, 200)();
    }

    const { stop: intersectionObserveStop } = useIntersectionObserver(
      textRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          countLine();
        }
      },
    );

    const { stop: resizeStop } = useResizeObserver(textRef, ([entry]) => {
      if (entry) {
        countLine();
      }
    });

    onBeforeUnmount(() => {
      intersectionObserveStop();
      resizeStop();
    });

    return () => (
      <Transition name="n-alert-fade">
        <div
          v-show={visible.value}
          class={cls(
            classHelper.block,
            classHelper.is('round', props.rounded),
            classHelper.m(props.type),
            classHelper.m(sizeRef.value),
          )}
        >
          {props.type && props.showIcon && (
            <div class={classHelper.e('icon-box')}>
              <NIcon
                size={24}
                name={typeMap[props.type]?.icon}
                color={typeMap[props.type]?.color}
              />
            </div>
          )}
          <div class={classHelper.e('content')}>
            <div
              class={cls(classHelper.e('container'), classHelper.em('container', sizeRef.value))}
            >
              {props.title && <span class={classHelper.e('title')}>{props.title}</span>}
              {slots.default?.() ? (
                <p ref={textRef} class={classHelper.e('description')}>
                  {slots.default?.()}
                </p>
              ) : (
                <p ref={textRef} class={classHelper.e('description')}>
                  {props.description}
                </p>
              )}
            </div>
          </div>
          {(props.primaryButtonText || props.defaultButtonText) && (
            <div
              class={cls(
                classHelper.e('action'),
                classHelper.em('action', sizeRef.value),
                classHelper.is('bottom', lineCount.value > 1),
              )}
            >
              {props.primaryButtonText && (
                <NLink onClick={() => props.onPrimary?.(_close)} underline={false}>
                  {props.primaryButtonText}
                </NLink>
              )}
              {props.defaultButtonText && (
                <NLink onClick={() => props.onDefault?.(_close)} underline={false}>
                  {props.defaultButtonText}
                </NLink>
              )}
            </div>
          )}
          {showCloseIcon.value && (
            <div
              class={cls(
                classHelper.e('close-btn'),
                classHelper.is('flex-start', !!props.title && !!props.description),
              )}
              onClick={close}
            >
              <NIcon size={12} name="close" />
            </div>
          )}
        </div>
      </Transition>
    );
  },
});
