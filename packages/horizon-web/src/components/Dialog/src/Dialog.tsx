import { IconClose, AIcon } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  ComponentClassBlock,
  getUnitString,
  isNumber,
  isString,
  slotVNodes,
  useLockScroll,
  useNamespace,
  useZIndex,
  usePopupContainerGetter,
} from '@aurora/utils';
import { onKeyStroke } from '@vueuse/core';
import type { VNode } from 'vue';
import {
  computed,
  defineComponent,
  mergeProps,
  onBeforeUnmount,
  ref,
  Teleport,
  toRefs,
  watch,
  Transition,
  provide,
  useId,
} from 'vue';
import HTransition from '~/components/Transition/src/Transition';
import useLocaleLang from '~/utils/useLocaleLang';
import useSize from '~/utils/useSize';
import { HButton } from '../../Button';
import { useDraggable } from './composables/useDraggable';
import type { DialogEmits } from './composables/useEmits';
import { useDialogEmits } from './composables/useEmits';
import type { DialogExposes } from './composables/useExposes';
import { useDialogExposes } from './composables/useExposes';
import { useDialogProps } from './composables/useProps';
import type { DialogSlots } from './composables/useSlots';
import { useDialogSlots } from './composables/useSlots';
import { HScrollbarUpdateDelayInjectKey } from '~/components/Scrollbar/src/utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}Dialog`,
  desc: '对话框是一种模态窗口，干扰性比较强。通常用来展示用户当前需要的或用户必须关注的信息或操作，其他情况不建议使用弹出框，可考虑 Message 等其他非模态窗口',
  components: {
    HButton,
    AIcon,
    IconClose,
    HTransition,
  },
  inheritAttrs: false,
  props: useDialogProps,
  emits: useDialogEmits,
  slots: useDialogSlots,
  exposes: useDialogExposes,
  setup(
    props,
    { slots, emit, attrs }: HorizonWebSetupContext<DialogEmits, DialogSlots, DialogExposes>,
  ) {
    // const locale = inject(localeInjectKey, defaultLocale);

    const {
      title: titleRef,
      iconName: iconNameRef,
      iconColor: iconColorRef,
      closeButton: closeButtonRef,
      mask: maskRef,
      maskClose: maskCloseRef,
      escClose: escCloseRef,
      size,
    } = toRefs(props);
    const popupContainerGetter = usePopupContainerGetter();
    const classHelper = new ComponentClassBlock('dialog');
    const titleId = useId();
    let previouslyFocused: HTMLElement | null = null;
    const visible = computed(() => props.visible);
    const closedDestroy = computed(() => props.destroyOnClose);

    const okText = computed(() => props.okText);
    const cancelText = computed(() => props.cancelText);
    const defaultOkText = useLocaleLang('global.ok');
    const defaultCancelText = useLocaleLang('global.cancel');
    const okButton = computed(() => !!props.okButtonProps);
    const cancelButton = computed(() => !!props.cancelButtonProps);
    const okButtonProps = computed(() =>
      typeof props.okButtonProps === 'object' ? props.okButtonProps : {},
    );
    const cancelButtonProps = computed(() =>
      typeof props.cancelButtonProps === 'object' ? props.cancelButtonProps : {},
    );
    const top = computed(() => props.top);
    const to = computed(() => {
      if (props.to || typeof props.to !== 'undefined') return props.to;

      if (popupContainerGetter.value) return popupContainerGetter.value();

      return undefined;
    });

    const closeDirectly = () => {
      emit('update:visible', false);
    };

    const close = () => {
      if (props.beforeClose) {
        return props.beforeClose(closeDirectly);
      }
      closeDirectly();
    };

    const maskClick = () => {
      if (maskCloseRef.value) {
        emit('maskClick');
        close();
      }
    };

    const sizeRef = useSize(size, 'medium', {
      md: 'medium',
      sm: 'small',
      lg: 'large',
      xl: 'huge',
    });

    const zIndexHandler = useZIndex(props.zIndex);
    const zIndex = ref(props.zIndex ?? zIndexHandler.current);

    onKeyStroke('Escape', () => {
      if (escCloseRef.value && visible.value) {
        close();
      }
    });

    function setLockScroll(open = true) {
      if (props.lockScroll) {
        if (open) {
          useLockScroll();
        } else {
          useLockScroll(false);
        }
      }
    }

    watch(
      visible,
      (newVal, oldVal) => {
        if (newVal) {
          previouslyFocused = document.activeElement as HTMLElement | null;
          emit('open');
          zIndex.value = props.zIndex ?? zIndexHandler.next();
          setLockScroll();
          // setTimeout(() => {
          //   emit('opened');
          // }, 300);
        } else if (oldVal !== undefined) {
          setLockScroll(false);
          emit('close');
          // setTimeout(() => {
          //   emit('closed');
          // }, 300);
        }
      },
      {
        immediate: true,
      },
    );

    onBeforeUnmount(() => {
      if (visible.value) {
        setLockScroll(false);
      }
    });

    const handleCloseIconClick = (evt: MouseEvent) => {
      emit('closeIconClick');
      close();
      evt.stopPropagation();
    };

    const { hasMoved, movableElement, dragging, draggleHandle, dialogStyle, notifyDialogClosed } =
      useDraggable(toRefs(props));

    const trapFocus = (evt: KeyboardEvent) => {
      if (evt.key !== 'Tab' || !movableElement.value) return;
      const focusable = Array.from(
        movableElement.value.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) {
        evt.preventDefault();
        movableElement.value.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (evt.shiftKey && document.activeElement === first) {
        evt.preventDefault();
        last.focus();
      } else if (!evt.shiftKey && document.activeElement === last) {
        evt.preventDefault();
        first.focus();
      }
    };

    const onOpened = () => {
      movableElement.value?.focus();
      emit('opened');
    };
    const onClosed = () => {
      previouslyFocused?.focus();
      previouslyFocused = null;
      notifyDialogClosed();
      emit('closed');
    };

    provide(HScrollbarUpdateDelayInjectKey, 400);

    return () => {
      const titleSlots = slotVNodes(slots.title);
      const contentSlots = slotVNodes(slots.default);
      const footerSlots = slotVNodes(slots.footer);
      let titleValue: string | undefined | VNode[] = titleRef.value;
      if (titleSlots.length) {
        titleValue = titleSlots;
      }
      const renderBody = () => {
        return (
          <div class={classHelper.e('inner')}>
            {iconNameRef.value && (
              <div class={classHelper.e('icon-box')}>
                <AIcon
                  class={classHelper.e('icon')}
                  name={iconNameRef.value}
                  size={24}
                  color={iconColorRef.value}
                />
              </div>
            )}
            <div
              class={[
                classHelper.e('main'),
                iconNameRef.value && classHelper.em('main', 'icon-offset'),
              ]}
            >
              {titleValue && (
                <div
                  id={titleId}
                  ref={draggleHandle}
                  class={[
                    classHelper.e('header'),
                    classHelper.em('header', 'draggable', props.draggable),
                    classHelper.em('header', 'moving', dragging.value),
                    props.classNames?.header,
                  ]}
                  // style={{
                  //   marginBottom: iconNameRef.value ? '8px' : getUnitString(props.headerMargin),
                  // }}
                >
                  {slots.title?.() ?? (
                    <div class={classHelper.e('default-title')}>
                      <div class={classHelper.em('default-title', 'text')}>
                        {titleRef.value}
                      </div>
                      {closeButtonRef.value && (
                        <HButton
                          class={classHelper.e('header-close')}
                          icon={IconClose}
                          text={true}
                          type="normal"
                          size="small"
                          iconSize={16}
                          aria-label="Close dialog"
                          onClick={handleCloseIconClick}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
              <div class={[classHelper.e('body'), props.classNames?.body]}>{contentSlots}</div>
              {(okButton.value || cancelButton.value || footerSlots.length > 0) && (
                <div class={[classHelper.e('footer'), props.classNames?.footer]}>
                  {slots.footer?.() ??
                    ((okButton.value || cancelButton.value) && (
                      <div class={classHelper.e('default-footer')}>
                        {cancelButton.value && (
                          <HButton
                            {...cancelButtonProps.value}
                            onDebounceFinished={() => emit('cancelDebounceFinished')}
                            type="normal"
                            plain
                            onClick={() => {
                              emit('cancel');
                              close();
                            }}
                          >
                            {cancelText.value || defaultCancelText.value}
                          </HButton>
                        )}
                        {okButton.value && (
                          <HButton
                            style="margin-left: 16px;"
                            {...okButtonProps.value}
                            onDebounceFinished={() => emit('confirmDebounceFinished')}
                            onClick={() => {
                              emit('ok');
                            }}
                          >
                            {okText.value || defaultOkText.value}
                          </HButton>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        );
      };

      const dialogBody = (
        <div
          v-show={visible.value}
          ref={movableElement}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleValue ? titleId : undefined}
          tabindex={-1}
          onKeydown={trapFocus}
          class={[
            classHelper.e('container'),
            isString(sizeRef.value) && classHelper.m(sizeRef.value),
            // classHelper.m(props.verticalPosition),
            classHelper.m('center'),
            props.classNames?.wrapper,
          ]}
          {...mergeProps(
            {
              style: {
                zIndex: zIndex.value + 1,
                // top: props.verticalPosition === 'top' ? getUnitString(props.top) : undefined,
                top: top.value ? getUnitString(props.top) : undefined,
                width: isNumber(sizeRef.value) ? getUnitString(sizeRef.value) : undefined,
                transform: top.value ? `translateY(0)` : undefined,
              },
            },
            { style: dialogStyle.value },
          )}
        >
          {renderBody()}
        </div>
      );

      const renderMain = () => (
        <div
          // v-show={visible.value}
          class={classHelper.block}
          style={{ zIndex: zIndex.value }}
          {...attrs}
        >
          <HTransition appear name="fade-in">
            {maskRef.value && visible.value && (
              <div
                class={[`${classHelper.e('mask')}`, props.classNames?.mask]}
                style={{
                  zIndex: zIndex.value,
                }}
                onClick={maskClick}
              ></div>
            )}
          </HTransition>
          <Transition
            name={top.value || hasMoved.value ? classHelper.e('normal') : classHelper.e('move')}
            appear
            persisted={!closedDestroy.value}
            onAfterEnter={onOpened}
            onAfterLeave={onClosed}
          >
            {closedDestroy.value ? visible.value && dialogBody : dialogBody}
          </Transition>
        </div>
      );

      return (
        <Teleport to={to.value} disabled={!to.value}>
          {renderMain()}
        </Teleport>
      );
    };
  },
});
