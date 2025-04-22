import type { LegoSetupContext } from '@nio-fe/shared';
import {
  ComponentClassBlock,
  cssVariable,
  useLockScroll,
  useNamespace,
  useZIndex,
} from '@nio-fe/shared';
import { onKeyStroke, useWindowSize, useElementSize } from '@vueuse/core';
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
} from 'vue';
import { NButton } from '~/components/Button';
import { NTransition } from '~/components/Transition';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import type { DrawerEmits } from './composables/useEmits';
import { useDrawerEmits } from './composables/useEmits';
import { useDrawerProps } from './composables/useProps';
import { useResponsiveSize } from './composables/useResponsiveSize';
import type { DrawerSlots } from './composables/useSlots';
import { useDrawerSlots } from './composables/useSlots';
import { NScrollbarUpdateDelayInjectKey } from '~/components/Scrollbar/src/utils/injectKeys';

const instances = shallowRef<ComponentInternalInstance[]>([]);

export default defineComponent({
  name: `${useNamespace()}Drawer`,
  desc: '触发命令后，从屏幕一侧滑出的抽屉式的面板。',
  inheritAttrs: false,
  props: useDrawerProps,
  emits: useDrawerEmits,
  slots: useDrawerSlots,
  setup(props, { slots, emit, attrs, expose }: LegoSetupContext<DrawerEmits, DrawerSlots>) {
    const classHelper = new ComponentClassBlock('drawer');

    const instance = getCurrentInstance();
    const locale = inject(localeInjectKey, defaultLocale);

    const zIndexHandler = useZIndex();

    const zIndex = ref(zIndexHandler.next());
    // const rendered = ref(props.visible || props.modelValue);
    const containerEl = ref<HTMLElement>();

    const visible = computed(() => props.visible || props.modelValue);
    const closable = computed(() => props.closable && props.closeButton);
    const maskClosable = computed(() => props.maskClosable && props.maskClose);
    const escClosable = computed(() => props.escClosable && props.escClose);
    const placement = computed(() => {
      if (props.position !== 'right') return props.position;
      return props.placement;
    });
    const transitionName = computed(() => `${classHelper.block}-slide-${placement.value}`);
    const renderInBody = computed(() => {
      if (props.v2) return props.to === document.body || props.to === 'body';
      return !props.toBody;
    });
    const toBody = computed(() => {
      if (props.v2) return !!props.to || props.toBody;
      return props.toBody;
    });
    const cancelButton = computed(() => props.cancelButton && props.secondaryButton);
    const okButton = computed(() => props.okButton && props.primaryButton);
    const okButtonText = computed(
      () =>
        props.okButtonText ?? props.primaryText ?? locale.value?.langService.td().lego.global.ok,
    );
    const cancelButtonText = computed(
      () =>
        props.cancelButtonText ??
        props.secondaryText ??
        locale.value?.langService.td().lego.global.cancel,
    );

    const showHeader = computed(() => {
      if (props.v2) return props.header;

      let title: any = props.title;
      if (slots.title?.()?.length) title = slots.title?.();
      return props.header && !!title;
    });

    const showFooter = computed(() => {
      if (props.v2) return props.footer;

      const hasBtn = !!(props.primaryButton || props.secondaryButton);
      const hasFooter = !!slots.footer?.()?.length;

      return (hasBtn || hasFooter) && props.footer;
    });

    const { sizeStyle, handleEl } = useResponsiveSize(visible, toRef(props, 'size'), placement);
    const { width: ww, height: wh } = useWindowSize();
    const elSize = useElementSize(containerEl);

    const offset = computed<number>(() => {
      const i = instances.value.indexOf(instance!);
      const next = instances.value[i + 1];
      if (['top', 'bottom'].includes(placement.value)) {
        const ns = next?.exposed?.getSize()?.height.value ?? 0;
        const accOffset = (next?.exposed?.getOffset() ?? 0) + ns;
        const maxOffset = wh.value - elSize.height.value - 20;
        return Math.min(maxOffset, accOffset);
      } else {
        const ns = next?.exposed?.getSize()?.width.value ?? 0;
        const accOffset = (next?.exposed?.getOffset() ?? 0) + ns;
        const maxOffset = ww.value - elSize.width.value - 20;
        return Math.min(maxOffset, accOffset);
      }
    });

    expose({
      getOffset: () => {
        if (instances.value.length <= 1) return 0;
        return offset.value;
      },
      getSize: () => elSize,
    });

    const computedPush = computed<CSSProperties>(() => {
      const lastInstance = instances.value.slice(-1)[0];
      const noPush = instances.value.length < 2 || instance === lastInstance;
      if (!props.push || noPush || !visible.value) return {};

      if (props.push === true) {
        switch (placement.value) {
          case 'top':
          case 'bottom':
          case 'left':
          case 'right':
            return { [placement.value]: `${offset.value}px` };
          default:
            return {};
        }
      }

      // TODO: 未来实现
      // if ('distance' in props.push) {
      //   return { right: `${props.push.distance * (instances.value.length - 1)}px` };
      // }
      return {};
    });

    const inlineStyle = computed<CSSProperties>(() => {
      return renderInBody.value ? {} : { position: 'absolute' };
    });

    const containerStyle = computed<CSSProperties>(() => {
      return {
        zIndex: zIndex.value + 1,
        ...computedPush.value,
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
      emit('update:modelValue', false); // TODO: 下个版本移除
      emit('update:visible', false);
      // emit('close');
      // setTimeout(() => emit('closed'), 300);
    };

    const onClose = async () => {
      if (props.v2) {
        if (props.beforeClose) {
          const ret = await Promise.resolve(props.beforeClose()).catch(() => false);
          if (ret === false) return;
        }
        return close();
      }
      return props.beforeClose ? props.beforeClose(close) : close();
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
        // NOTE: 在嵌套n-drawer写法时候，onKeyStroke 触发事件的时机异常
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
      if (attrs['onSecondary-click']) {
        // @ts-ignore
        emit('secondary-click');
      } else {
        emit('secondaryClick');
      }
      emit('cancel');
      await onClose();
    };

    const onDefaultOk = () => {
      if (attrs['onPrimary-click']) {
        // @ts-ignore
        emit('primary-click');
      } else {
        emit('primaryClick');
      }

      emit('ok');
    };

    const handleCloseIconClick = () => {
      emit('iconClick');

      if (!closable.value) return;
      return onClose();
    };

    const onAfterLeave = () => {
      // rendered.value = false;
      emit('closed');
    };

    const onAfterEnter = () => {
      emit('opened');
    };

    provide(NScrollbarUpdateDelayInjectKey, 400);

    onBeforeUnmount(() => {
      if (shouldLockScroll.value) {
        useLockScroll(false);
      }
    });

    return () => {
      const closeButton = (
        <NButton
          class={classHelper.e('closable')}
          size="small"
          type="normal"
          text
          icon="close"
          icon-size={16}
          onClick={handleCloseIconClick}
        />
      );

      const drawerBody = (
        <div
          v-show={visible.value}
          class={[
            classHelper.e('container'),
            classHelper.m(placement.value),
            classHelper.m('push', instances.value.slice(-1)[0] !== instance),
          ]}
          style={containerStyle.value}
          ref={containerEl}
        >
          <div class={classHelper.e('main')}>
            {showHeader.value && (
              <div class={[classHelper.e('header'), classHelper.em('header', 'customize')]}>
                {slots.header?.() ??
                  (props.v2 ? (
                    <Fragment>
                      <div class={classHelper.e('default-title')}>
                        {slots.title?.() ?? props.title}
                      </div>
                      {closable.value && closeButton}
                    </Fragment>
                  ) : (
                    slots.title?.() ?? (
                      <div class={`${classHelper.e('default-title')}`}>
                        {props.title}
                        {closable.value && closeButton}
                      </div>
                    )
                  ))}
              </div>
            )}

            <div class={classHelper.e('body')}>{slots.default?.()}</div>

            {showFooter.value && (
              <div class={classHelper.e('footer')}>
                {slots.footer?.() ?? (
                  <div class={classHelper.e('default-footer')}>
                    {cancelButton.value && (
                      <NButton
                        type="normal"
                        plain
                        size="medium"
                        onClick={onDefaultCancel}
                        {...cancelButtonProps.value}
                      >
                        {cancelButtonText.value}
                      </NButton>
                    )}
                    {okButton.value && (
                      <NButton
                        type="primary"
                        size="medium"
                        onClick={onDefaultOk}
                        style={{ marginLeft: cssVariable('spacing-5') }}
                        {...okButtonProps.value}
                      >
                        {okButtonText.value}
                      </NButton>
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
              <NTransition name="fade-in" appear>
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
              </NTransition>
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
