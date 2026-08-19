import type { CSSProperties, VNode } from 'vue';
import { computed, defineComponent, nextTick, provide, ref, Teleport, toRef, watch } from 'vue';
import {
  ComponentClassBlock,
  cls,
  useNamespace,
  isDefined,
  useZIndex,
  isUndefined,
  getUnitString,
} from '@aurora/utils';
import {
  DROPDOWN_DEFAULTS,
  normalizeDropdownTrigger,
  resolveDropdownPlacement,
  type DropdownNavigationKey,
} from '@aurora/core';
import {
  focusDropdownItem,
  getEnabledDropdownItems,
  resolveDropdownContextMenuPosition,
} from '@aurora/horizon-core';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import { useDropdownProps } from './composables/useProps';
import { useDropdownEmits } from './composables/useEmits';
import { useDropdownSlots } from './composables/useSlots';
import { useDropdownExposes } from './composables/useExposes';
import type { DropdownProps, DropdownItemProps } from './composables/useProps';
import type { DropdownEmits } from './composables/useEmits';
import type { DropdownSlots } from './composables/useSlots';
import type { DropdownExposes } from './composables/useExposes';
import {
  HDropdownAppendChildInjectKey,
  HDropdownCommandFnInjectKey,
  HDropdownPropsInjectKey,
  HDropdownRemoveChildInjectKey,
  HDropdownSizeInjectKey,
  HDropdownTreeInjectKey,
  HDropdownTreeLevelInjectKey,
} from './utils/InjectedKeys';
import HPopover from '~/components/Popover/src/Popover';
import HPopContent from '~/components/Popover/src/PopContent';
import pickDropdownMenu from './utils/useDropdown';
import HTransition from '~/components/Transition/src/Transition';
import { nanoid } from 'nanoid';
import { useSessionStorage } from '@vueuse/core';
import type { PopoverExposes } from '~/components/Popover/src/composables/useExposes';
import useSize from '~/utils/useSize';
import { HScrollbarUpdateDelayInjectKey } from '~/components/Scrollbar/src/utils/injectKeys';
import useDropdownTree from './composables/useDropdownTree';

export default defineComponent({
  name: `${useNamespace()}Dropdown`,
  desc: '下拉菜单是轻量级的快捷菜单，用于页面内部的内容导航和相关操作。主要用于导航、工具菜单以及部分操作集合，通过下拉菜单将某功能下面的子系统、功能集合等统一放在一起。',
  descLocales: {
    en: 'Provides `#dropdown` slot to place `h-dropdown-menu`, or you can directly place `h-dropdown-menu` in `#default` without using named slots',
  },
  components: {
    HPopover,
  },
  props: useDropdownProps,
  emits: useDropdownEmits,
  slots: useDropdownSlots,
  exposes: useDropdownExposes,
  setup(
    props: DropdownProps,
    { emit, slots, expose }: HorizonWebSetupContext<DropdownEmits, DropdownSlots, DropdownExposes>,
  ) {
    const uuid = nanoid();
    const classHelper = new ComponentClassBlock('dropdown');

    const sizeRef = toRef(props, 'size');
    const size = useSize(sizeRef, 'medium');

    const visible = ref(props.visible);

    const wrapperDomRef = ref<HTMLElement | null>(null);
    const popoverRef = ref<HorizonWebComponentInstance<typeof HPopover, PopoverExposes> | null>(
      null,
    );
    const popContentDomRef = ref<HTMLElement | null>(null);

    const { dropdownTree, appendChild, removeChild, renderContent } = useDropdownTree();
    const zIndex = useZIndex(props.zIndex);

    const currentOpenedDropdown = useSessionStorage<string | undefined>(
      'h-dropdown-current-opened',
      undefined,
    );

    watch(currentOpenedDropdown, val => {
      if (!isUndefined(val) && val !== uuid && props.exclusive) {
        handleClose();
      }
    });

    const placement = computed(() => resolveDropdownPlacement(props.placement, props.align));

    const trigger = computed(() =>
      normalizeDropdownTrigger(props.trigger ?? DROPDOWN_DEFAULTS.trigger),
    );

    watch(
      () => props.visible,
      val => {
        if (val === visible.value) return;

        if (val) {
          handleOpen();
        } else {
          handleClose();
        }
      },
      {
        immediate: true,
      },
    );

    const contextMenuStyle = ref<CSSProperties>({});
    let focusFirstItemOnOpen = false;

    function setContextMenuVisible(value: boolean) {
      if (visible.value === value) return;
      visible.value = value;
      emit('update:visible', value);
      emit('visibleChange', value);
      if (value) currentOpenedDropdown.value = uuid;
    }

    function onContextMenu(evt: MouseEvent) {
      setContextMenuVisible(true);
      evt.preventDefault();

      const position = resolveDropdownContextMenuPosition(evt.clientX, evt.clientY);

      contextMenuStyle.value = {
        position: position.position,
        top: 0,
        left: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: zIndex.next(),
      };
    }

    function command(commandParam: DropdownItemProps['command']) {
      isDefined(commandParam) && emit('command', commandParam);

      if (trigger.value === 'context-menu') {
        setContextMenuVisible(false);
      } else {
        popoverRef.value?.switchVisible();
      }
    }

    function handleOpen() {
      if (trigger.value === 'context-menu') {
        setContextMenuVisible(true);
      } else {
        popoverRef.value?.switchVisible(true);
      }
    }

    function handleClose() {
      nextTick(() => {
        if (trigger.value === 'context-menu') {
          setContextMenuVisible(false);
        } else {
          popoverRef.value?.switchVisible(false);
        }
      });
    }

    function onShow() {
      visible.value = true;
      emit('update:visible', true);
      emit('visibleChange', true);
      currentOpenedDropdown.value = uuid;
      if (focusFirstItemOnOpen) {
        // HPopover makes the popper focusable in its already queued appear task.
        window.setTimeout(focusFirstEnabledMenuItem);
      }
    }

    function onHide() {
      visible.value = false;
      emit('update:visible', false);
      emit('visibleChange', false);
    }

    function getEnabledMenuItems() {
      return getEnabledDropdownItems(popContentDomRef.value!);
    }

    function focusFirstEnabledMenuItem() {
      focusFirstItemOnOpen = false;
      getEnabledMenuItems().at(0)?.focus();
    }

    function handleKeydown(evt: KeyboardEvent) {
      if (evt.key === 'Escape' && visible.value) {
        evt.preventDefault();
        handleClose();
        wrapperDomRef.value?.focus();
        return;
      }

      if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(evt.key)) return;

      if (!visible.value) {
        if (props.disabled) return;
        evt.preventDefault();
        focusFirstItemOnOpen = true;
        handleOpen();
        if (trigger.value === 'context-menu') {
          void nextTick(focusFirstEnabledMenuItem);
        }
        return;
      }

      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(evt.key)) return;

      if (getEnabledMenuItems().length === 0) return;
      evt.preventDefault();
      focusDropdownItem(
        popContentDomRef.value!,
        evt.key as DropdownNavigationKey,
        document.activeElement,
      );
    }

    expose({
      handleOpen,
      handleClose,
    });

    provide(HDropdownTreeLevelInjectKey, 0);
    provide(HDropdownPropsInjectKey, props);
    provide(HDropdownSizeInjectKey, size);
    provide(HDropdownCommandFnInjectKey, command);
    provide(HDropdownTreeInjectKey, dropdownTree);
    provide(HDropdownAppendChildInjectKey, appendChild);
    provide(HDropdownRemoveChildInjectKey, removeChild);
    provide(HScrollbarUpdateDelayInjectKey, 400);

    return () => {
      const slotVNodes: VNode[] = slots?.default?.({ popperVisible: visible.value }) ?? [];

      const reference = slots.dropdown ? slotVNodes : pickDropdownMenu(slotVNodes, 'default');
      const popper =
        slots.dropdown?.() ?? props.menu ?? pickDropdownMenu(slotVNodes, 'dropdownMenu');

      if (trigger.value === 'context-menu') {
        return (
          <div
            ref={wrapperDomRef}
            class={cls(classHelper.block, classHelper.m(props.theme))}
            tabindex={props.disabled ? undefined : 0}
            onKeydown={handleKeydown}
          >
            <span onContextmenu={onContextMenu}>{reference}</span>
            <Teleport to={props.teleportTo} disabled={!props.toBody}>
              <HTransition appear name="dropdown" speed="slow">
                <HPopContent
                  v-click-outside={handleClose}
                  v-show={visible.value}
                  class={cls(classHelper.e('inner'), classHelper.em('inner', props.theme))}
                  style={{
                    ...contextMenuStyle.value,
                    ...(props.popperWidth && {
                      '--h-dropdown-size-container-width': getUnitString(props.popperWidth),
                    }),
                  }}
                >
                  <div ref={popContentDomRef} onKeydown={handleKeydown}>
                    {renderContent(popper)}
                  </div>
                </HPopContent>
              </HTransition>
            </Teleport>
          </div>
        );
      }

      return (
        <div
          ref={wrapperDomRef}
          class={cls(classHelper.block, classHelper.m(props.theme), classHelper.m(size.value))}
          data-placement={placement.value}
          tabindex={props.disabled ? undefined : 0}
          onKeydown={handleKeydown}
        >
          <HPopover
            ref={popoverRef}
            hideEventType={props.hideEventType}
            trigger={trigger.value}
            visible={visible.value}
            arrow={false}
            distance={props.distance}
            placement={placement.value}
            disabled={props.disabled}
            toBody={props.toBody}
            to={props.toBody ? props.teleportTo : undefined}
            popperClass={props.popperClass}
            hoverShowDelay={props.showAfter}
            hoverHideDelay={props.hideAfter}
            zIndex={props.zIndex}
            transitionName="dropdown"
            transitionSpeed="slow"
            stopPropagation={true}
            {...(props.popoverOptions || {})}
            onShow={onShow}
            onHide={onHide}
          >
            {{
              reference: () => reference,
              popper: () => (
                <HPopContent
                  style={
                    props.popperWidth
                      ? { '--h-dropdown-size-container-width': getUnitString(props.popperWidth) }
                      : undefined
                  }
                  class={cls(
                    classHelper.e('inner'),
                    classHelper.em('inner', props.theme),
                    classHelper.em('inner', size.value),
                  )}
                >
                  <div ref={popContentDomRef} onKeydown={handleKeydown}>
                    {renderContent(popper)}
                  </div>
                </HPopContent>
              ),
            }}
          </HPopover>
        </div>
      );
    };
  },
});
