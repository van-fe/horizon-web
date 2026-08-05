import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  ComponentClassBlock,
  cssVariable,
  useLockScroll,
  useNamespace,
  useZIndex,
} from '@aurora/utils';
import { onKeyStroke } from '@vueuse/core';
import type { CSSProperties, ComponentInternalInstance } from 'vue';
import {
  Teleport,
  Transition,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  ref,
  shallowRef,
  toRef,
  watch,
  Fragment,
  provide,
  useId,
} from 'vue';
import HButton from '~/components/Button/src/Button';
import HTransition from '~/components/Transition/src/Transition';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import type { DrawerEmits } from './composables/useEmits';
import { useDrawerEmits } from './composables/useEmits';
import { useDrawerProps } from './composables/useProps';
import { useResponsiveSize } from './composables/useResponsiveSize';
import type { DrawerSlots } from './composables/useSlots';
import { useDrawerSlots } from './composables/useSlots';
import { HScrollbarUpdateDelayInjectKey } from '~/components/Scrollbar/src/utils/injectKeys';

const instances = shallowRef<ComponentInternalInstance[]>([]);

export default defineComponent({
  name: `${useNamespace()}Drawer`,
  desc: '触发命令后，从屏幕一侧滑出的抽屉式的面板。',
  descLocales: { en: "Drawer supports sliding out from any side of the screen. The default position is from the right, and the default size is `medium`." },
  inheritAttrs: false,
  props: useDrawerProps,
  emits: useDrawerEmits,
  slots: useDrawerSlots,
  setup(props, { slots, emit, attrs }: HorizonWebSetupContext<DrawerEmits, DrawerSlots>) {
    const classHelper = new ComponentClassBlock('drawer');
    const titleId = useId();
    const drawerRef = ref<HTMLElement>();
    let previouslyFocused: HTMLElement | null = null;

    const instance = getCurrentInstance();
    const locale = inject(localeInjectKey, defaultLocale);

    const zIndexHandler = useZIndex();

    const zIndex = ref(zIndexHandler.next());
    const visible = computed(() => props.visible);
    const closable = computed(() => props.closable);
    const maskClosable = computed(() => props.maskClosable);
    const escClosable = computed(() => props.escClosable);
    const placement = computed(() => props.placement);
    const transitionName = computed(() => `${classHelper.block}-slide-${placement.value}`);
    const renderInBody = computed(() => props.to === document.body || props.to === 'body');
    const toBody = computed(() => !!props.to);
    const cancelButton = computed(() => props.cancelButton);
    const okButton = computed(() => props.okButton);
    const okButtonText = computed(
      () => props.okButtonText ?? locale.value?.langService.td().horizonWeb.global.ok,
    );
    const cancelButtonText = computed(
      () => props.cancelButtonText ?? locale.value?.langService.td().horizonWeb.global.cancel,
    );

    const showHeader = computed(() => {
      return props.header;
    });

    const showFooter = computed(() => {
      return props.footer;
    });

    const { sizeStyle, handleEl } = useResponsiveSize(visible, toRef(props, 'size'), placement);
    const inlineStyle = computed<CSSProperties>(() => {
      return renderInBody.value ? {} : { position: 'absolute' };
    });

    const containerStyle = computed<CSSProperties>(() => {
      return {
        zIndex: zIndex.value + 1,
        ...sizeStyle.value,
        ...inlineStyle.value,
      };
    });

    const okButtonProps = computed(() =>
      typeof props.okButton !== 'boolean' ? props.okButton : {},
    );

    const cancelButtonProps = computed(() =>
      typeof props.cancelButton !== 'boolean' ? props.cancelButton : {},
    );

    const shouldLockScroll = computed(() => props.lockScroll ?? props.mask);

    watch(
      visible,
      val => {
        if (val) previouslyFocused = document.activeElement as HTMLElement | null;
        if (shouldLockScroll.value) {
          if (val) {
            useLockScroll(true);
          } else {
            useLockScroll(false);
          }
        }
      },
      { immediate: true },
    );

    const open = () => {
      // rendered.value = true;
      instances.value = instances.value.concat(instance!);
      zIndex.value = zIndexHandler.next();
      // setTimeout(() => emit('opened'), 300);
    };

    const close = () => {
      instances.value = instances.value.filter(inst => inst !== instance);
      emit('update:visible', false);
      // emit('close');
      // setTimeout(() => emit('closed'), 300);
    };

    const onClose = async () => {
      if (props.beforeClose) {
        const ret = await Promise.resolve(props.beforeClose()).catch(() => false);
        if (ret === false) return;
      }
      return close();
    };

    const onMaskClick = () => {
      emit('maskClick');

      if (!maskClosable.value) return;
      onClose();
    };

    const onESCKeydown = async (e: KeyboardEvent) => {
      e.preventDefault();
      if (!escClosable.value || !visible.value) return;

      if (instances.value.slice(-1)[0] === instance) {
        // HOTE: 在嵌套h-drawer写法时候，onKeyStroke 触发事件的时机异常
        setTimeout(() => onClose(), 0);
      }
    };

    onKeyStroke('Escape', onESCKeydown);

    const onVisibleChanged = (oldVal: boolean, val: boolean) => {
      if (visible.value) {
        emit('open');
        open();
      } else {
        if (oldVal !== val) emit('close');
        instances.value = instances.value.filter(inst => inst !== instance);
      }
    };

    watch(visible, onVisibleChanged);

    const onDefaultCancel = async () => {
      emit('cancel');
      await onClose();
    };

    const onDefaultOk = () => {
      emit('ok');
    };

    const handleCloseIconClick = () => {
      emit('iconClick');

      if (!closable.value) return;
      return onClose();
    };

    const onAfterLeave = () => {
      previouslyFocused?.focus();
      previouslyFocused = null;
      // rendered.value = false;
      emit('closed');
    };

    const onAfterEnter = () => {
      drawerRef.value?.focus();
      emit('opened');
    };

    const trapFocus = (evt: KeyboardEvent) => {
      if (evt.key !== 'Tab' || !drawerRef.value) return;
      const focusable = Array.from(
        drawerRef.value.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) {
        evt.preventDefault();
        drawerRef.value.focus();
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

    provide(HScrollbarUpdateDelayInjectKey, 400);

    onBeforeUnmount(() => {
      if (shouldLockScroll.value) {
        useLockScroll(false);
      }
    });

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
          aria-labelledby={showHeader.value ? titleId : undefined}
          tabindex={-1}
          onKeydown={trapFocus}
          class={[classHelper.e('container'), classHelper.m(placement.value)]}
          style={containerStyle.value}
        >
          <div class={classHelper.e('main')}>
            {showHeader.value && (
              <div
                id={titleId}
                class={[classHelper.e('header'), classHelper.em('header', 'customize')]}
              >
                {slots.header?.() ?? (
                  <Fragment>
                    <div class={classHelper.e('default-title')}>
                      {slots.title?.() ?? props.title}
                    </div>
                    {closable.value && closeButton}
                  </Fragment>
                )}
              </div>
            )}

            <div class={classHelper.e('body')}>{slots.default?.()}</div>

            {showFooter.value && (
              <div class={classHelper.e('footer')}>
                {slots.footer?.() ?? (
                  <div class={classHelper.e('default-footer')}>
                    {cancelButton.value && (
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
                    {okButton.value && (
                      <HButton
                        type="primary"
                        size="medium"
                        onClick={onDefaultOk}
                        style={{ marginLeft: cssVariable('spacing-5') }}
                        {...okButtonProps.value}
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
