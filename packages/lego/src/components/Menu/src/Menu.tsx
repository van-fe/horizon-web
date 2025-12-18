import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue';
import {
  ComponentClassBlock,
  cls,
  sizeUnitTransform,
  isDefined,
  useNamespace,
  cssVariable,
} from '@nio-fe/shared';
import type { LegoSetupContext, LegoComponentInstance } from '@nio-fe/shared';
import { useMenuProps } from './composables/useProps';
import { useMenuEmits } from './composables/useEmits';
import { useMenuSlots } from './composables/useSlots';
import { useMenuExposes } from './composables/useExposes';
import type { MenuProps, SubMenuProps } from './composables/useProps';
import type { MenuEmits } from './composables/useEmits';
import type { MenuSlots } from './composables/useSlots';
import type { MenuExposes } from './composables/useExposes';
import type { Router } from 'vue-router';
import {
  NMenuExpandedMenuInjectKey,
  NMenuAddExpandMenuInjectKey,
  NMenuAppendChildInjectKey,
  NMenuEmitInjectKey,
  NMenuPropsInjectKey,
  NMenuRemoveExpandMenuInjectKey,
  NMenuRemoveChildInjectKey,
  NMenuActivatedMenusInjectKey,
  NMenuSetActivatedMenuInjectKey,
  NMenuMenuTreeInjectKey,
  NMenuTreeLevelInjectKey,
  NMenuParentHasIconAmountInjectKey,
  NMenuIsCollapsedInjectKey,
  NMenuScrollTopTopInjectKey,
  NMenuRefInjectKey,
  NMenuActiveTopMenuUuidInjectKey,
  NMenuSwitchFullViewMenuVisibleInjectKey,
} from './util/injectKeys';
import CollapseButton from './components/CollapseButton';
import FullViewMenu from './components/FullViewMenu';
import NTransition from '~/components/Transition/src/Transition';
import type { NMenuTreeData } from './util/types';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import { getMapTreePath, getMapTreePathByValue } from './util/treeHelper';
import useResizer from './util/useResizer';
import { warn } from '~/utils/useLog';
import type { ScrollbarExposes } from '~/components/Scrollbar/src/composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}Menu`,
  desc: '多用于信息层级多、对导航效率有一定要求的后台系统页面',
  components: {
    CollapseButton,
    FullViewMenu,
    NTransition,
    NScrollbar,
  },
  props: useMenuProps,
  emits: useMenuEmits,
  slots: useMenuSlots,
  exposes: useMenuExposes,
  setup(
    props: MenuProps,
    { emit, slots, expose }: LegoSetupContext<MenuEmits, MenuSlots, MenuExposes>,
  ) {
    const instance = getCurrentInstance();

    const classHelper = new ComponentClassBlock('menu');

    const menuRef = ref<HTMLElement | null>(null);
    const scrollbarRef = ref<LegoComponentInstance<typeof NScrollbar, ScrollbarExposes> | null>(
      null,
    );
    const resizerDomRef = ref<HTMLElement | null>(null);

    const activeMenu = ref<string>(props.selectedValue || '');
    const activeMenuUuid = ref('');
    const isCollapseModelValue = ref<boolean>(props.collapse);
    const isDoingCollapse = ref(false);
    let prevExpandedMenu: string[] = [];
    const expandedMenu = ref(new Set<string>());
    const menuTree = ref(new Map<string, NMenuTreeData<'subMenu' | 'menuItem'>>());

    let prevScrollTop: number | null = null;
    let scrollTop = 0;

    const isCollapse = computed(() => props.collapseForever ?? isCollapseModelValue.value);

    const activeType = computed(() =>
      props.mode === 'vertical'
        ? 'button'
        : isDefined(props.activeType)
          ? props.activeType
          : 'link',
    );

    watch(
      () => props.selectedValue,
      value => {
        activeMenu.value = value || '';
        void nextTick(() => {
          scrollToActive();
        });
      },
    );

    watch(
      () => props.collapse,
      value => {
        isCollapseModelValue.value = value;
      },
    );

    watch(isCollapseModelValue, () => {
      isDoingCollapse.value = true;
      setTimeout(() => {
        isDoingCollapse.value = false;
      }, 300);
    });

    watch(isCollapse, value => {
      if (value) {
        prevScrollTop = scrollTop;
        prevExpandedMenu = Array.from(expandedMenu.value.values());
        expandedMenu.value.clear();
      } else {
        if (prevExpandedMenu.length) {
          expandedMenu.value = new Set(prevExpandedMenu);
        }

        setTimeout(() => {
          if (prevScrollTop === null) {
            scrollToActive();
          } else {
            scrollbarRef.value?.scrollTo({ top: prevScrollTop, behavior: 'smooth' });
          }
        }, 500);
      }
      emit('update:collapse', value);
      emit('collapseChanged', value);
    });

    watch(activeMenu, () => {
      updateActiveMenuUuid();
    });

    watch(activeMenuUuid, val => {
      if (val) {
        activeMenu.value = flattenMenus.value.find(item => item.uuid === val)?.props.value || '';
      }
    });

    const height = computed(
      () =>
        props.height ??
        (props.mode === 'vertical' ? '100%' : cssVariable('menu-height--horizontal')),
    );

    const flattenMenus = computed(() => {
      const flatten = (list: Map<string, NMenuTreeData<'subMenu' | 'menuItem'>>) => {
        const res = Array.from(list.values());

        res.forEach(item => {
          if (item.children?.size) {
            res.push(...flatten(item.children));
          }
        });

        return res;
      };
      return flatten(menuTree.value);
    });

    watch(
      menuTree,
      () => {
        updateActiveMenuUuid(true);
      },
      {
        deep: true,
      },
    );

    const activatedMenus = computed(() => getMapTreePath(menuTree.value, activeMenuUuid.value));

    function appendChild(item: NMenuTreeData<'subMenu' | 'menuItem'>) {
      menuTree.value.set(item.uuid, item);
    }

    function removeChild(uuid: string) {
      menuTree.value.delete(uuid);
    }

    const router = instance?.appContext.config.globalProperties.$router as Router | undefined;

    function setActivatedMenu(uuid: string) {
      activeMenuUuid.value = uuid;

      if (props.router) {
        if (!router) {
          warn('menu', `You haven't import and set "vue-router"`);
        } else {
          const target = flattenMenus.value.find(item => item.uuid === uuid);

          if (target) {
            target.props.value && router.push(target.props.value);
          }
        }
      }
    }

    function addExpandMenu(uuid: string, scroll = false) {
      if (isCollapseModelValue.value || props.mode === 'horizontal') {
        return;
      }

      if (props.exclusiveExpand) {
        expandedMenu.value.clear();
      }

      const paths = getMapTreePath(menuTree.value, uuid);

      paths.forEach(leaf => {
        leaf.level < props.useDropdownLevel && expandedMenu.value.add(leaf.uuid);
      });

      if (scroll) {
        setTimeout(() => {
          paths[0]?.scrollTo();
        }, 300);
      }

      emit(
        'open',
        flattenMenus.value.find(curr => curr.uuid === uuid)?.props.value ?? '',
        paths.map(curr => curr.props as SubMenuProps) as SubMenuProps[],
      );
    }

    function removeExpandMenu(uuid: string) {
      expandedMenu.value.delete(uuid);

      emit(
        'close',
        flattenMenus.value.find(curr => curr.uuid === uuid)?.props.value ?? '',
        getMapTreePath(menuTree.value, uuid).map(
          curr => curr.props as SubMenuProps,
        ) as SubMenuProps[],
      );
    }

    function updateActiveMenuUuid(expand = false) {
      const paths = getMapTreePathByValue(menuTree.value, activeMenu.value);
      activeMenuUuid.value = paths[0]?.uuid || '';

      if (activeMenuUuid.value) {
        if (expand) {
          addExpandMenu(activeMenuUuid.value, true);
        }

        if (isCollapseModelValue.value) {
          prevScrollTop = null;
          prevExpandedMenu = getMapTreePath(menuTree.value, activeMenuUuid.value).map(
            curr => curr.uuid,
          );
        }
      }
    }

    function onScroll(position: { scrollLeft: number; scrollTop: number }) {
      scrollTop = position.scrollTop;
    }

    function scrollToActive() {
      const target = activatedMenus.value[0];
      if (target && target.level <= props.useDropdownLevel) {
        target.scrollTo();
      }
    }

    function scrollToTop(top: number) {
      scrollbarRef.value?.scrollTo({ top, behavior: 'smooth' });
    }

    const activeTopMenuUuid = ref('');
    const fullViewMenuVisible = ref(false);
    let fullViewMenuVisibleTimer: ReturnType<typeof setTimeout> | null = null;
    let fullViewMenuHideTimer: ReturnType<typeof setTimeout> | null = null;

    watch(activeTopMenuUuid, val => {
      if (val) {
        onMouseEnterContainer();
      } else {
        onMouseLeaveContainer();
      }
    });

    function clearFullViewMenuVisibleTimer() {
      if (fullViewMenuVisibleTimer !== null) {
        clearTimeout(fullViewMenuVisibleTimer);
        fullViewMenuVisibleTimer = null;
      }
    }

    function clearFullViewMenuHideTimer() {
      if (fullViewMenuHideTimer !== null) {
        clearTimeout(fullViewMenuHideTimer);
        fullViewMenuHideTimer = null;
      }
    }

    function onMouseEnterContainer() {
      clearFullViewMenuVisibleTimer();
      clearFullViewMenuHideTimer();
      fullViewMenuVisibleTimer = setTimeout(() => {
        fullViewMenuVisible.value = true;
      }, 0);
    }

    function onMouseLeaveContainer() {
      clearFullViewMenuVisibleTimer();
      clearFullViewMenuHideTimer();
      fullViewMenuHideTimer = setTimeout(() => {
        fullViewMenuVisible.value = false;
        activeTopMenuUuid.value = '';
      }, 200);
    }

    function expandAll() {
      if (!isCollapseModelValue.value && props.mode !== 'horizontal') {
        flattenMenus.value
          .filter(curr => curr.type === 'subMenu' && curr.level <= props.useDropdownLevel)
          .forEach(curr => expandedMenu.value.add(curr.uuid));
      }
    }

    function initialExpandAll() {
      if (props.isDefaultExpandAll) {
        expandAll();
      }
    }

    /*** resizer ***/
    const { isDragging, width } = useResizer(resizerDomRef, props.width, (collapse: boolean) => {
      if (props.resizeToCollapse) {
        isCollapseModelValue.value = collapse;
      }
    });

    provide(NMenuRefInjectKey, menuRef);
    provide(NMenuPropsInjectKey, props);
    provide(NMenuEmitInjectKey, emit);
    provide(NMenuMenuTreeInjectKey, menuTree);
    provide(NMenuActivatedMenusInjectKey, activatedMenus);
    provide(NMenuSetActivatedMenuInjectKey, setActivatedMenu);
    provide(NMenuAppendChildInjectKey, appendChild);
    provide(NMenuRemoveChildInjectKey, removeChild);
    provide(NMenuExpandedMenuInjectKey, expandedMenu);
    provide(NMenuAddExpandMenuInjectKey, addExpandMenu);
    provide(NMenuRemoveExpandMenuInjectKey, removeExpandMenu);
    provide(NMenuTreeLevelInjectKey, 0);
    provide(
      NMenuParentHasIconAmountInjectKey,
      computed(() => 0),
    );
    provide(NMenuIsCollapsedInjectKey, isCollapse);
    provide(NMenuScrollTopTopInjectKey, scrollToTop);
    provide(NMenuActiveTopMenuUuidInjectKey, activeTopMenuUuid);
    provide(NMenuSwitchFullViewMenuVisibleInjectKey, () => {
      if (fullViewMenuVisible.value) {
        onMouseLeaveContainer();
      } else {
        onMouseEnterContainer();
      }
    });

    onMounted(() => {
      void nextTick(() => {
        updateActiveMenuUuid(true);
        initialExpandAll();
      });
    });

    expose({
      expandAll,
      collapseAll: () => {
        expandedMenu.value.clear();
      },
      expand: (values: string[], replace = true) => {
        if (replace) {
          expandedMenu.value.clear();
        }

        flattenMenus.value
          .filter(
            curr =>
              curr.props.value &&
              values.includes(curr.props.value) &&
              curr.level <= props.useDropdownLevel,
          )
          .forEach(curr => expandedMenu.value.add(curr.uuid));
      },
      collapse: (values: string[]) => {
        flattenMenus.value
          .filter(curr => curr.props.value && values.includes(curr.props.value))
          .forEach(curr => {
            expandedMenu.value.delete(curr.uuid);
          });
      },
      scrollToActive,
      expandMenus: computed(() =>
        Array.from(expandedMenu.value.values()).map(
          uuid => flattenMenus.value.find(curr => curr.uuid === uuid)?.props.value,
        ),
      ),
    });

    return () => (
      <div
        ref={menuRef}
        class={cls(
          classHelper.block,
          classHelper.m(props.theme),
          classHelper.is(props.mode),
          classHelper.is('collapsed', isCollapse.value),
          classHelper.is('collapsed-forever', props.collapseForever ?? false),
          classHelper.is(
            'collapsed-show-title',
            props.collapseForever ?? props.collapseShowTitle ?? false,
          ),
          classHelper.is(`active-type-${activeType.value}`),
          classHelper.is('dragging', isDragging.value),
          classHelper.is('collapsing', isDoingCollapse.value),
          classHelper.is('max-width', width.value === 240),
          classHelper.has('resizer', props.resizable),
        )}
        style={{
          height: sizeUnitTransform(height.value),
          width: props.mode === 'vertical' ? sizeUnitTransform(width.value) : undefined,
        }}
      >
        <div
          class={cls(classHelper.e('container'))}
          style={{
            maxWidth: props.mode === 'horizontal' ? sizeUnitTransform(props.maxWidth) : undefined,
          }}
          onMouseleave={onMouseLeaveContainer}
        >
          {slots.prepend && (
            <div class={cls(classHelper.e('prepend'))}>{slots.prepend(isCollapse)}</div>
          )}
          <div class={cls(classHelper.e('inner'))}>
            <NScrollbar ref={scrollbarRef} size="small" onScroll={onScroll}>
              {slots.default?.()}
            </NScrollbar>
          </div>

          {((props.collapseButton && props.mode === 'vertical') || slots.append) &&
            props.collapseForever !== true && (
              <div class={cls(classHelper.e('append'))}>
                {props.collapseButton && props.mode === 'vertical' && (
                  <div class={cls(classHelper.e('collapse'))}>
                    <CollapseButton v-model={isCollapseModelValue.value} />
                  </div>
                )}
                {slots.append && (
                  <NTransition name="collapse-horizontal">
                    <div v-show={!isCollapse.value} class={cls(classHelper.em('append', 'inner'))}>
                      {slots.append?.(isCollapse)}
                    </div>
                  </NTransition>
                )}
              </div>
            )}
          {props.resizable && (
            <div
              ref={resizerDomRef}
              class={cls(classHelper.e('resizer'), classHelper.is('dragging', isDragging.value))}
            />
          )}
        </div>

        {props.submenuExpandType === 'full' && (
          <NTransition name="collapse">
            <FullViewMenu
              v-show={fullViewMenuVisible.value}
              menuTree={menuTree.value}
              activeTopMenuUuid={activeTopMenuUuid.value}
              onMouseEnter={onMouseEnterContainer}
              onMouseLeave={onMouseLeaveContainer}
            />
          </NTransition>
        )}
      </div>
    );
  },
});
