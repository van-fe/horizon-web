import type { DrawerOpenReason } from '@aurora/core';
import { DrawerController, resolveDrawerLockScroll } from '@aurora/core';
import type { DialogInteractionLayer } from '@aurora/horizon-core';
import { createDialogInteractionLayer } from '@aurora/horizon-core';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace, useZIndex } from '@aurora/utils';
import type { CSSProperties } from 'vue';
import {
  computed,
  defineComponent,
  Fragment,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  Teleport,
  toRef,
  Transition,
  useId,
  watch,
} from 'vue';
import HButton from '~/components/Button/src/Button';
import { HScrollbarUpdateDelayInjectKey } from '~/components/Scrollbar/src/utils/injectKeys';
import HTransition from '~/components/Transition/src/Transition';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import type { DrawerEmits } from './composables/useEmits';
import { useDrawerEmits } from './composables/useEmits';
import type { DrawerExposes } from './composables/useExposes';
import { useDrawerExposes } from './composables/useExposes';
import { useDrawerProps } from './composables/useProps';
import { useResponsiveSize } from './composables/useResponsiveSize';
import type { DrawerSlots } from './composables/useSlots';
import { useDrawerSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Drawer`,
  desc: '触发命令后，从屏幕一侧滑出的抽屉式的面板。',
  descLocales: {
    en: 'Drawer supports sliding out from any side of the screen. The default position is from the right, and the default size is `medium`.',
  },
  inheritAttrs: false,
  props: useDrawerProps,
  emits: useDrawerEmits,
  slots: useDrawerSlots,
  exposes: useDrawerExposes,
  setup(
    props,
    { slots, emit, attrs, expose }: HorizonWebSetupContext<DrawerEmits, DrawerSlots, DrawerExposes>,
  ) {
    const classHelper = new ComponentClassBlock('drawer');
    const titleId = useId();
    const drawerRef = ref<HTMLElement>();
    const locale = inject(localeInjectKey, defaultLocale);
    const zIndexHandler = useZIndex();
    const zIndex = ref(zIndexHandler.next());
    const closePending = ref(false);

    const visible = computed(() => props.visible);
    const placement = computed(() => props.placement);
    const transitionName = computed(() => `${classHelper.block}-slide-${placement.value}`);
    const renderInBody = computed(() => props.to === document.body || props.to === 'body');
    const toBody = computed(() => !!props.to);
    const okButtonText = computed(
      () => props.okButtonText ?? locale.value?.langService.td().horizonWeb.global.ok,
    );
    const cancelButtonText = computed(
      () => props.cancelButtonText ?? locale.value?.langService.td().horizonWeb.global.cancel,
    );
    const okButtonProps = computed(() =>
      typeof props.okButton !== 'boolean' ? props.okButton : {},
    );
    const cancelButtonProps = computed(() =>
      typeof props.cancelButton !== 'boolean' ? props.cancelButton : {},
    );
    const hasVisibleLabel = computed(
      () => props.header && !!(props.title || slots.title || slots.header),
    );

    const controller = new DrawerController({
      open: props.visible,
      beforeClose: props.beforeClose,
      onOpenChange: open => emit('update:visible', open),
      onClosePendingChange: pending => {
        closePending.value = pending;
      },
    });

    const syncController = () => {
      controller.setOptions({ open: props.visible, beforeClose: props.beforeClose });
    };
    const requestOpen = () => {
      syncController();
      return controller.requestOpen('imperative');
    };
    const requestClose = (reason: DrawerOpenReason = 'imperative') => {
      syncController();
      return controller.requestClose(reason);
    };

    const { sizeStyle, handleEl } = useResponsiveSize(
      visible,
      toRef(props, 'size'),
      placement,
      drawerRef,
      toRef(props, 'sizeDraggable'),
    );
    const inlineStyle = computed<CSSProperties>(() =>
      renderInBody.value ? {} : { position: 'absolute' },
    );
    const containerStyle = computed<CSSProperties>(() => ({
      zIndex: zIndex.value + 1,
      ...sizeStyle.value,
      ...inlineStyle.value,
    }));

    let interactionLayer: DialogInteractionLayer | null = null;
    const deactivateInteractionLayer = () => {
      interactionLayer?.deactivate();
      interactionLayer = null;
    };
    const activateInteractionLayer = (initialFocus?: HTMLElement | null) => {
      if (interactionLayer || !visible.value || !drawerRef.value) return;
      const drawer = drawerRef.value;
      interactionLayer = createDialogInteractionLayer(drawer, {
        dismissOnEscape: true,
        dismissOnOutsidePointer: false,
        initialFocus: initialFocus ?? drawer,
        lockScroll: resolveDrawerLockScroll(props.lockScroll, props.mask),
        onDismiss: reason => {
          if (reason === 'escape' && props.escClosable) requestClose('escape');
        },
      });
      interactionLayer.activate();
      drawer.ownerDocument.defaultView?.requestAnimationFrame(() => {
        if (visible.value && interactionLayer) drawer.focus();
      });
    };

    watch(
      () => [props.visible, props.beforeClose] as const,
      ([open, beforeClose]) => controller.setOptions({ open, beforeClose }),
      { immediate: true },
    );
    watch(
      visible,
      (open, previousOpen) => {
        if (open) {
          emit('open');
          zIndex.value = zIndexHandler.next();
          activateInteractionLayer();
        } else if (previousOpen !== undefined && previousOpen !== open) {
          deactivateInteractionLayer();
          emit('close');
        }
      },
      { immediate: true, flush: 'post' },
    );
    watch(
      () => [props.lockScroll, props.mask] as const,
      ([lockScroll, mask], [previousLockScroll, previousMask]) => {
        if (
          !visible.value ||
          resolveDrawerLockScroll(lockScroll, mask) ===
            resolveDrawerLockScroll(previousLockScroll, previousMask)
        ) {
          return;
        }
        const drawer = drawerRef.value;
        const focused = drawer?.contains(drawer.ownerDocument.activeElement)
          ? (drawer.ownerDocument.activeElement as HTMLElement)
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

    const onMaskClick = () => {
      emit('maskClick');
      if (props.maskClosable) requestClose('mask');
    };
    const onDefaultCancel = () => {
      emit('cancel');
      requestClose('cancel');
    };
    const onDefaultOk = () => emit('ok');
    const handleCloseIconClick = () => {
      emit('iconClick');
      requestClose('close-button');
    };
    const onAfterLeave = () => emit('closed');
    const onAfterEnter = () => {
      drawerRef.value?.focus();
      emit('opened');
    };

    provide(HScrollbarUpdateDelayInjectKey, 400);

    return () => {
      const closeButton = (
        <HButton
          class={classHelper.e('closable')}
          size="small"
          type="normal"
          text
          icon="close"
          icon-size={16}
          aria-label="Close drawer"
          onClick={handleCloseIconClick}
        />
      );

      const drawerBody = (
        <div
          v-show={visible.value}
          ref={drawerRef}
          role="dialog"
          aria-modal={props.mask || undefined}
          aria-labelledby={hasVisibleLabel.value ? titleId : undefined}
          aria-label={
            hasVisibleLabel.value ? undefined : props.ariaLabel || props.title || 'Drawer'
          }
          aria-busy={closePending.value || undefined}
          tabindex={-1}
          class={[classHelper.e('container'), classHelper.m(placement.value)]}
          style={containerStyle.value}
        >
          <div class={classHelper.e('main')}>
            {props.header && (
              <div
                id={titleId}
                class={[classHelper.e('header'), classHelper.em('header', 'customize')]}
              >
                {slots.header?.() ?? (
                  <Fragment>
                    <div class={classHelper.e('default-title')}>
                      {slots.title?.() ?? props.title}
                    </div>
                    {props.closable && closeButton}
                  </Fragment>
                )}
              </div>
            )}

            <div class={classHelper.e('body')}>{slots.default?.()}</div>

            {props.footer && (
              <div class={classHelper.e('footer')}>
                {slots.footer?.() ?? (
                  <div class={classHelper.e('default-footer')}>
                    {props.cancelButton && (
                      <HButton
                        type="normal"
                        plain
                        size="medium"
                        onClick={onDefaultCancel}
                        {...cancelButtonProps.value}
                      >
                        {cancelButtonText.value}
                      </HButton>
                    )}
                    {props.okButton && (
                      <HButton
                        type="primary"
                        size="medium"
                        onClick={onDefaultOk}
                        {...okButtonProps.value}
                        loading={props.loading}
                      >
                        {okButtonText.value}
                      </HButton>
                    )}
                  </div>
                )}
              </div>
            )}

            {props.sizeDraggable && (
              <div
                ref={handleEl}
                class={[classHelper.e('draggable'), classHelper.em('draggable', placement.value)]}
              />
            )}
          </div>
        </div>
      );

      return (
        <Teleport to={props.to} disabled={!toBody.value}>
          <div
            class={classHelper.block}
            style={{ ...inlineStyle.value, zIndex: zIndex.value }}
            {...attrs}
          >
            {props.mask && (
              <HTransition name="fade-in" appear>
                {visible.value && (
                  <div
                    class={classHelper.e('mask')}
                    style={
                      renderInBody.value
                        ? { zIndex: zIndex.value }
                        : { zIndex: 'inherit', position: 'absolute' }
                    }
                    onClick={onMaskClick}
                  />
                )}
              </HTransition>
            )}

            <Transition
              name={transitionName.value}
              appear
              persisted={!props.destroyOnClose}
              onAfterEnter={onAfterEnter}
              onAfterLeave={onAfterLeave}
            >
              {props.destroyOnClose ? visible.value && drawerBody : drawerBody}
            </Transition>
          </div>
        </Teleport>
      );
    };
  },
});
