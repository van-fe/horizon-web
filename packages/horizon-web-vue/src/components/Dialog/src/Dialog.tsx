import { IconClose, AIcon } from '@aurora/icon';
import type { DialogOpenReason } from '@aurora/core';
import { DialogController } from '@aurora/core';
import type { DialogInteractionLayer } from '@aurora/horizon-web-core';
import { createDialogInteractionLayer } from '@aurora/horizon-web-core';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  ComponentClassBlock,
  getUnitString,
  isString,
  slotVNodes,
  useNamespace,
  useZIndex,
  usePopupContainerGetter,
} from '@aurora/utils';
import type { VNode } from 'vue';
import {
  computed,
  defineComponent,
  mergeProps,
  onBeforeUnmount,
  onMounted,
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
  descLocales: {
    en: 'To meet most scenarios, the dialog will display primary and secondary buttons by default.',
  },
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
    { slots, emit, attrs, expose }: HorizonWebSetupContext<DialogEmits, DialogSlots, DialogExposes>,
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
    const visible = computed(() => props.visible);
    const closedDestroy = computed(() => props.destroyOnClose);
    const closePending = ref(false);
    const controller = new DialogController({
      open: props.visible,
      beforeClose: props.beforeClose,
      onOpenChange: open => emit('update:visible', open),
      onClosePendingChange: pending => {
        closePending.value = pending;
      },
    });

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
      if (typeof props.to !== 'undefined') return props.to;
      return popupContainerGetter.value?.() ?? 'body';
    });

    const syncController = () => {
      controller.setOptions({ open: props.visible, beforeClose: props.beforeClose });
    };

    const requestClose = (reason: DialogOpenReason = 'imperative') => {
      syncController();
      return controller.requestClose(reason);
    };

    const requestOpen = () => {
      syncController();
      return controller.requestOpen('imperative');
    };

    const maskClick = () => {
      if (maskCloseRef.value) {
        emit('maskClick');
        requestClose('mask');
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

    const handleCloseIconClick = (evt: MouseEvent) => {
      emit('closeIconClick');
      requestClose('close-button');
      evt.stopPropagation();
    };

    const { hasMoved, movableElement, dragging, draggleHandle, dialogStyle, notifyDialogClosed } =
      useDraggable(toRefs(props));
    let interactionLayer: DialogInteractionLayer | null = null;

    const deactivateInteractionLayer = () => {
      interactionLayer?.deactivate();
      interactionLayer = null;
    };

    const activateInteractionLayer = (initialFocus?: HTMLElement | null) => {
      if (interactionLayer || !visible.value || !movableElement.value) return;
      const dialog = movableElement.value;
      interactionLayer = createDialogInteractionLayer(dialog, {
        dismissOnEscape: true,
        dismissOnOutsidePointer: false,
        initialFocus: initialFocus ?? dialog,
        lockScroll: props.lockScroll,
        onDismiss: reason => {
          if (reason === 'escape' && escCloseRef.value) requestClose('escape');
        },
      });
      interactionLayer.activate();
      dialog.ownerDocument.defaultView?.requestAnimationFrame(() => {
        if (visible.value && interactionLayer) dialog.focus();
      });
    };

    watch(
      () => [props.visible, props.beforeClose] as const,
      ([open, beforeClose]) => controller.setOptions({ open, beforeClose }),
      { immediate: true },
    );

    watch(
      visible,
      (newVal, oldVal) => {
        if (newVal) {
          emit('open');
          zIndex.value = props.zIndex ?? zIndexHandler.next();
          activateInteractionLayer();
        } else if (oldVal !== undefined) {
          deactivateInteractionLayer();
          emit('close');
        }
      },
      { immediate: true, flush: 'post' },
    );

    watch(
      () => props.lockScroll,
      (lockScroll, previousLockScroll) => {
        if (!visible.value || lockScroll === previousLockScroll) return;
        const focused = movableElement.value?.contains(document.activeElement)
          ? (document.activeElement as HTMLElement)
          : null;
        deactivateInteractionLayer();
        activateInteractionLayer(focused);
      },
    );

    onMounted(() => activateInteractionLayer());

    expose({ open: requestOpen, close: () => requestClose('imperative') });

    onBeforeUnmount(() => {
      controller.cancelCloseRequest();
      deactivateInteractionLayer();
    });

    const onOpened = () => {
      movableElement.value?.focus();
      emit('opened');
    };
    const onClosed = () => {
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
                      <div class={classHelper.em('default-title', 'text')}>{titleRef.value}</div>
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
                              requestClose('cancel');
                            }}
                          >
                            {cancelText.value || defaultCancelText.value}
                          </HButton>
                        )}
                        {okButton.value && (
                          <HButton
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
          aria-label={titleValue ? undefined : props.ariaLabel || 'Dialog'}
          aria-busy={closePending.value || undefined}
          tabindex={-1}
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
