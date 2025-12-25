import {
  computed,
  defineComponent,
  Fragment,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
  withKeys,
  withModifiers,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace, cssVariableKey } from '@aurora/utils';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import type { MenuItemProps, SubMenuProps } from './composables/useProps';
import { useSubMenuProps } from './composables/useProps';
import type { SubMenuEmits, MenuItemEmits } from './composables/useEmits';
import { useSubMenuEmits } from './composables/useEmits';
import type { SubMenuSlots } from './composables/useSlots';
import { useSubMenuSlots } from './composables/useSlots';
import type { MenuExposes } from './composables/useExposes';
import {
  NMenuExpandedMenuInjectKey,
  NMenuAddExpandMenuInjectKey,
  NMenuAppendChildInjectKey,
  NMenuRemoveExpandMenuInjectKey,
  NMenuRemoveChildInjectKey,
  NMenuActivatedMenusInjectKey,
  NMenuTreeLevelInjectKey,
  NMenuParentHasIconAmountInjectKey,
  NMenuIsCollapsedInjectKey,
  NMenuPropsInjectKey,
  NMenuSetActivatedMenuInjectKey,
  NMenuActiveTopMenuUuidInjectKey,
  NMenuEmitInjectKey,
  NMenuSwitchFullViewMenuVisibleInjectKey,
} from './util/injectKeys';
import type { NMenuTreeData } from './util/types';
import { nanoid } from 'nanoid';
import useIconRender from '~/utils/useIconRender';
import NTransition from '~/components/Transition/src/Transition';
import { IconArrowDown, IconArrowRight } from '@aurora/icon';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import NDropdown from '~/components/Dropdown/src/Dropdown';
import NDropdownGroup from '~/components/Dropdown/src/DropdownGroup';
import NDropdownItem from '~/components/Dropdown/src/DropdownItem';
import NDropdownMenu from '~/components/Dropdown/src/DropdownMenu';
import NDropdownSubmenu from '~/components/Dropdown/src/DropdownSubmenu';
import type { DropdownExposes } from '~/components/Dropdown/src/composables/useExposes';
import useTooltip from './util/useTooltip';

export default defineComponent({
  name: `${useNamespace()}SubMenu`,
  props: useSubMenuProps,
  emits: useSubMenuEmits,
  slots: useSubMenuSlots,
  setup(
    props: SubMenuProps,
    { emit, slots }: HorizonWebSetupContext<SubMenuEmits, SubMenuSlots, MenuExposes>,
  ) {
    const classHelper = new ComponentClassBlock('menu');
    const uuid = nanoid();

    const elementRef = ref<HTMLElement | null>(null);
    const titleInnerDomRef = ref<HTMLElement | null>(null);
    const textRef = ref<HTMLElement | null>(null);
    const dropdownDomRef = ref<HorizonWebComponentInstance<typeof NDropdown, DropdownExposes> | null>(
      null,
    );

    const { tooltipVisible, toggleTooltip } = useTooltip();
    const dropdownVisible = ref(false);

    const iconRender = computed(() =>
      useIconRender(props.icon, slots.icon, {
        size: 20,
      }),
    );

    const shouldChildrenCollapsed = computed(
      () =>
        isCollapsed?.value ||
        passiveTreeLevel >= parentProps.useDropdownLevel ||
        (parentProps.mode === 'horizontal' && parentProps.submenuExpandType === 'single'),
    );

    const parentProps = inject(NMenuPropsInjectKey)!;
    const parentEmits = inject(NMenuEmitInjectKey)!;
    const passiveTreeLevel = inject(NMenuTreeLevelInjectKey, 0);
    const parentHasIconAmount = inject(NMenuParentHasIconAmountInjectKey, ref(0));
    const appendChild = inject(NMenuAppendChildInjectKey);
    const removeChild = inject(NMenuRemoveChildInjectKey);
    const expandedMenu = inject(NMenuExpandedMenuInjectKey);
    const addExpandMenu = inject(NMenuAddExpandMenuInjectKey);
    const removeExpandMenu = inject(NMenuRemoveExpandMenuInjectKey);
    const setActivatedMenu = inject(NMenuSetActivatedMenuInjectKey);
    const activatedMenus = inject(NMenuActivatedMenusInjectKey);
    const isCollapsed = inject(NMenuIsCollapsedInjectKey);
    const activeTopMenuUuid = inject(NMenuActiveTopMenuUuidInjectKey);
    const switchFullViewMenuVisible = inject(NMenuSwitchFullViewMenuVisibleInjectKey);

    const menuTree = ref(new Map<string, NMenuTreeData<'subMenu' | 'menuItem'>>());
    function selfAppendChild(item: NMenuTreeData<'subMenu' | 'menuItem'>) {
      menuTree.value.set(item.uuid, item);
    }

    function selfRemoveChild(uuid: string) {
      menuTree.value.delete(uuid);
    }

    watch(menuTree, () => {
      updateTreeData();
    });

    function onMouseEnter() {
      if (textRef.value) {
        if (parentProps.submenuExpandType === 'full') {
          activeTopMenuUuid && !props.disabled && (activeTopMenuUuid.value = uuid);
          if (textRef.value?.scrollWidth > textRef.value?.clientWidth) {
            toggleTooltip();
          }
          return;
        }

        if (parentProps.mode === 'horizontal') {
          if (textRef.value?.scrollWidth > textRef.value?.clientWidth) {
            toggleTooltip();
          }
          dropdownVisible.value = true;
          return;
        }
        if (parentProps.collapseForever === true) {
          if (textRef.value?.scrollWidth > textRef.value?.clientWidth) {
            toggleTooltip();
          }
        } else {
          if (isCollapsed?.value) {
            dropdownVisible.value = true;
            toggleTooltip(props.disabled);
          } else {
            dropdownVisible.value = false;
            if (textRef.value?.scrollWidth > textRef.value?.clientWidth) {
              toggleTooltip();
            }
          }
        }
      }
    }

    function onMouseleave() {
      toggleTooltip(false);
    }

    function updateTreeData() {
      appendChild?.({
        uuid,
        children: menuTree.value as Map<string, NMenuTreeData>,
        props,
        slots,
        emits: emit,
        type: 'subMenu',
        level: passiveTreeLevel,
        scrollTo: () => {
          elementRef.value?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        },
      });
    }

    provide(NMenuAppendChildInjectKey, selfAppendChild);
    provide(NMenuRemoveChildInjectKey, selfRemoveChild);
    provide(NMenuTreeLevelInjectKey, passiveTreeLevel + 1);
    provide(
      NMenuParentHasIconAmountInjectKey,
      computed(() => parentHasIconAmount.value + (iconRender.value ? 1 : 0)),
    );

    onMounted(() => {
      updateTreeData();
    });

    onBeforeUnmount(() => {
      removeChild?.(uuid);
    });

    async function onClick() {
      if (props.disabled) return;

      if (props.selectable) {
        try {
          if (
            parentProps.beforeSelect &&
            props.value &&
            !(await parentProps.beforeSelect(props.value, props))
          ) {
            return;
          }
        } catch (e) {
          return;
        }

        setActivatedMenu?.(uuid);

        void nextTick(() => {
          parentEmits(
            'select',
            props.value ?? '',
            (activatedMenus?.value.map(curr => curr.props).reverse() ?? []) as (
              | MenuItemProps
              | SubMenuProps
            )[],
            props,
          );

          parentEmits(
            'selected',
            props.value ?? '',
            (activatedMenus?.value.map(curr => curr.props).reverse() ?? []) as (
              | MenuItemProps
              | SubMenuProps
            )[],
            props,
          );
        });
      }

      if (parentProps.mode === 'horizontal') {
        dropdownVisible.value = true;
      } else {
        if (passiveTreeLevel < parentProps.useDropdownLevel) {
          if (expandedMenu?.value.has(uuid)) {
            removeExpandMenu?.(uuid);
          } else {
            addExpandMenu?.(uuid);
          }
        }
      }

      emit('click', props);
    }

    async function onClickSubMenu(target: NMenuTreeData<'subMenu'>) {
      if (target.props.disabled) return;

      if (target.props.selectable) {
        try {
          if (
            parentProps.beforeSelect &&
            props.value &&
            !(await parentProps.beforeSelect(props.value, props))
          ) {
            return;
          }
        } catch (e) {
          return;
        }

        setActivatedMenu?.(target.uuid);
        (target.emits as HorizonWebSetupContext<SubMenuEmits>['emit'])(
          'click',
          target.props as SubMenuProps,
        );

        void nextTick(() => {
          parentEmits(
            'select',
            target.props.value ?? '',
            (activatedMenus?.value.map(curr => curr.props).reverse() ?? []) as (
              | MenuItemProps
              | SubMenuProps
            )[],
            target.props as SubMenuProps,
          );

          parentEmits(
            'selected',
            target.props.value ?? '',
            (activatedMenus?.value.map(curr => curr.props).reverse() ?? []) as (
              | MenuItemProps
              | SubMenuProps
            )[],
            target.props as SubMenuProps,
          );
        });
      }

      if (parentProps.mode !== 'horizontal') {
        if (expandedMenu?.value.has(target.uuid)) {
          removeExpandMenu?.(target.uuid);
        } else {
          if (passiveTreeLevel < parentProps.useDropdownLevel) {
            addExpandMenu?.(target.uuid);
          }
        }
      }
    }

    async function onClickMenuItem(target: NMenuTreeData) {
      if (target.props.disabled) return;

      try {
        if (
          parentProps.beforeSelect &&
          target.props.value &&
          !(await parentProps.beforeSelect(target.props.value, target.props))
        ) {
          return;
        }
      } catch (e) {
        return;
      }

      if (passiveTreeLevel < parentProps.useDropdownLevel) {
        addExpandMenu?.(target.uuid);
      }

      setActivatedMenu?.(target.uuid);
      (target.emits as HorizonWebSetupContext<MenuItemEmits>['emit'])(
        'click',
        target.props as MenuItemProps,
      );
      (target.emits as HorizonWebSetupContext<MenuItemEmits>['emit'])(
        'menuItemActive',
        target.props as MenuItemProps,
      );

      void nextTick(() => {
        parentEmits(
          'select',
          target.props.value ?? '',
          (activatedMenus?.value.map(curr => curr.props).reverse() ?? []) as (
            | MenuItemProps
            | SubMenuProps
          )[],
          target.props as MenuItemProps,
        );

        parentEmits(
          'selected',
          target.props.value ?? '',
          (activatedMenus?.value.map(curr => curr.props).reverse() ?? []) as (
            | MenuItemProps
            | SubMenuProps
          )[],
          target.props as MenuItemProps,
        );
      });
    }

    function onKeyup() {
      if (parentProps.mode === 'vertical' || parentProps.submenuExpandType === 'single') {
        if (shouldChildrenCollapsed.value) {
          if (dropdownVisible.value) {
            dropdownDomRef.value?.handleClose();
          } else {
            dropdownDomRef.value?.handleOpen();
          }

          if (props.selectable) {
            void onClick();
          }
        } else {
          void onClick();
        }
      } else {
        activeTopMenuUuid && (activeTopMenuUuid.value = uuid);
        switchFullViewMenuVisible?.();
      }
    }

    function onClickDropdownIcon(evt: MouseEvent) {
      if (props.selectable) {
        evt.stopPropagation();
      }
    }

    function handleBlur(evt: FocusEvent) {
      if (
        shouldChildrenCollapsed.value &&
        dropdownVisible.value &&
        !elementRef.value?.contains(evt.relatedTarget as HTMLElement)
      ) {
        dropdownDomRef.value?.handleClose();
      }
    }

    return () => (
      <div
        ref={elementRef}
        class={cls(classHelper.e('sub'))}
        style={{
          [cssVariableKey('menu--tree-level')]: passiveTreeLevel,
          [cssVariableKey('menu--parent-icon-amount')]: parentHasIconAmount.value,
        }}
        data-tree-level={passiveTreeLevel}
      >
        <NTooltip
          trigger="manual"
          visible={tooltipVisible.value}
          placement="right"
          distance={parentProps.mode === 'vertical' ? 8 : 4}
          size={parentProps.mode === 'vertical' ? 'medium' : 'small'}
          arrow={passiveTreeLevel > 0}
        >
          {{
            default: () => (
              <NDropdown
                ref={dropdownDomRef}
                trigger={shouldChildrenCollapsed.value ? parentProps.menuTrigger : 'manual'}
                v-model:visible={dropdownVisible.value}
                popperClass={classHelper.e('popper')}
                disabled={
                  parentProps.submenuExpandType === 'full' ||
                  parentProps.collapseForever ||
                  props.disabled
                }
                distance={8}
                toBody={false}
                popoverOptions={{ flip: false }}
                theme={parentProps.theme}
                placement={
                  parentProps.mode === 'vertical'
                    ? 'right-start'
                    : passiveTreeLevel > 1
                      ? 'right-start'
                      : 'bottom-start'
                }
              >
                {{
                  default: () => (
                    <div
                      class={cls(
                        classHelper.e('title'),
                        classHelper.is('disabled', props.disabled),
                        classHelper.is(
                          'active',
                          activatedMenus?.value.some(curr => curr.uuid === uuid),
                        ),
                        classHelper.is('selected', activatedMenus?.value?.[0]?.uuid === uuid),
                      )}
                    >
                      <div
                        ref={titleInnerDomRef}
                        class={cls(classHelper.em('title', 'inner'))}
                        tabindex={props.disabled ? -1 : 0}
                        onClick={onClick}
                        onKeyup={withModifiers(withKeys(onKeyup, ['enter']), ['self'])}
                        onMouseenter={onMouseEnter}
                        onMouseleave={onMouseleave}
                        onBlur={handleBlur}
                      >
                        <div class={cls(classHelper.em('title', 'content'))}>
                          <div
                            v-show={iconRender.value || isCollapsed?.value}
                            class={cls(classHelper.em('title', 'icon'))}
                          >
                            {iconRender.value}
                          </div>
                          <div
                            v-show={!isCollapsed?.value}
                            ref={textRef}
                            class={cls(classHelper.em('title', 'text'))}
                          >
                            {slots.title?.() ?? props.name}
                          </div>
                        </div>

                        <div
                          class={cls(classHelper.em('title', 'arrow'))}
                          tabindex={props.selectable ? 0 : -1}
                          onClick={onClickDropdownIcon}
                        >
                          {passiveTreeLevel >= parentProps.useDropdownLevel ? (
                            <IconArrowRight size={12} />
                          ) : (
                            <IconArrowDown
                              size={12}
                              rotate={
                                expandedMenu?.value.has(uuid) ||
                                (parentProps.mode === 'horizontal' && dropdownVisible.value) ||
                                (parentProps.mode === 'horizontal' &&
                                  parentProps.submenuExpandType === 'full' &&
                                  activeTopMenuUuid?.value === uuid)
                                  ? 180
                                  : 0
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                  dropdown: () => (
                    <NDropdownMenu>
                      <NDropdownGroup
                        titleTooltipOptions={{
                          arrow: false,
                          distance: 4,
                          size: 'small',
                          placement: parentProps.mode === 'horizontal' ? 'right' : 'top',
                        }}
                      >
                        {{
                          title:
                            parentProps.mode === 'vertical'
                              ? () => slots.title?.() ?? props.name
                              : undefined,
                          default: () => {
                            function renderFunc(
                              item: NMenuTreeData<'subMenu' | 'menuItem'>,
                              level: number,
                            ) {
                              if (item.children?.size) {
                                return (
                                  <NDropdownSubmenu
                                    disabled={item.props.disabled}
                                    icon={item.props.icon}
                                    active={
                                      activatedMenus?.value.some(curr => curr.uuid === item.uuid) ??
                                      false
                                    }
                                    selected={activatedMenus?.value?.[0]?.uuid === item.uuid}
                                    popoverOptions={
                                      parentProps.mode === 'vertical'
                                        ? {}
                                        : { mainAxisCheck: false }
                                    }
                                    onClick={() => onClickSubMenu(item as NMenuTreeData<'subMenu'>)}
                                  >
                                    {{
                                      title: () => item.slots.title?.() ?? item.props.name,
                                      icon: item.slots.icon,
                                      default: () => (
                                        <Fragment>
                                          {Array.from(item.children?.values() ?? []).map(curr =>
                                            renderFunc(curr, level + 1),
                                          )}
                                        </Fragment>
                                      ),
                                    }}
                                  </NDropdownSubmenu>
                                );
                              } else {
                                return (
                                  <NDropdownItem
                                    active={
                                      activatedMenus?.value.some(curr => curr.uuid === item.uuid) ??
                                      false
                                    }
                                    icon={level > 0 ? undefined : item.props.icon}
                                    disabled={item.props.disabled}
                                    tooltipOptions={{ arrow: false, distance: 4 }}
                                    onClick={() => onClickMenuItem(item as NMenuTreeData)}
                                  >
                                    {{
                                      default: () => (
                                        <>
                                          {item.slots.default?.()}
                                          {item.slots.title?.() ??
                                            item.slots.name?.() ??
                                            item.props.name}
                                        </>
                                      ),
                                      icon: item.slots.icon,
                                    }}
                                  </NDropdownItem>
                                );
                              }
                            }
                            return Array.from(menuTree.value.values()).map(curr =>
                              renderFunc(curr, passiveTreeLevel),
                            );
                          },
                        }}
                      </NDropdownGroup>
                    </NDropdownMenu>
                  ),
                }}
              </NDropdown>
            ),
            content: () => slots.title?.() ?? props.name,
          }}
        </NTooltip>
        {slots.default && (
          <NTransition name="collapse">
            <div v-show={expandedMenu?.value.has(uuid)} class={cls(classHelper.e('inner'))}>
              {slots.default()}
            </div>
          </NTransition>
        )}
      </div>
    );
  },
});
