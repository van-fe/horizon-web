import {
  computed,
  defineComponent,
  Fragment,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  withKeys,
  withModifiers,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace, cssVariableKey } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useMenuItemProps } from './composables/useProps';
import { useMenuItemEmits } from './composables/useEmits';
import { useMenuItemSlots } from './composables/useSlots';
import type { MenuItemProps, SubMenuProps } from './composables/useProps';
import type { MenuItemEmits } from './composables/useEmits';
import type { MenuItemSlots } from './composables/useSlots';
import type { MenuExposes } from './composables/useExposes';
import {
  HMenuAddExpandMenuInjectKey,
  HMenuAppendChildInjectKey,
  HMenuRemoveChildInjectKey,
  HMenuActivatedMenusInjectKey,
  HMenuSetActivatedMenuInjectKey,
  HMenuTreeLevelInjectKey,
  HMenuParentHasIconAmountInjectKey,
  HMenuIsCollapsedInjectKey,
  HMenuScrollTopTopInjectKey,
  HMenuPropsInjectKey,
  HMenuEmitInjectKey,
} from './util/injectKeys';
import { nanoid } from 'nanoid';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import useIconRender from '~/utils/useIconRender';
import useTooltip from './util/useTooltip';

export default defineComponent({
  name: `${useNamespace()}MenuItem`,
  desc: "菜单中的单个导航项",
  descLocales: { en: "A single navigation item within Menu." },
  props: useMenuItemProps,
  emits: useMenuItemEmits,
  slots: useMenuItemSlots,
  setup(
    props: MenuItemProps,
    { emit, slots }: HorizonWebSetupContext<MenuItemEmits, MenuItemSlots, MenuExposes>,
  ) {
    const classHelper = new ComponentClassBlock('menu');
    const uuid = nanoid();

    const elementRef = ref<HTMLElement | null>(null);
    const textRef = ref<HTMLElement | null>(null);

    const { tooltipVisible, toggleTooltip } = useTooltip();

    const iconRender = computed(() =>
      useIconRender(props.icon, slots.icon, {
        size: 20,
      }),
    );

    const parentProps = inject(HMenuPropsInjectKey)!;
    const parentEmits = inject(HMenuEmitInjectKey)!;
    const treeLevel = inject(HMenuTreeLevelInjectKey, 0);
    const parentHasIconAmount = inject(HMenuParentHasIconAmountInjectKey, ref(0));
    const appendChild = inject(HMenuAppendChildInjectKey);
    const removeChild = inject(HMenuRemoveChildInjectKey);
    const addExpandMenu = inject(HMenuAddExpandMenuInjectKey);
    const activatedMenus = inject(HMenuActivatedMenusInjectKey);
    const setActivatedMenu = inject(HMenuSetActivatedMenuInjectKey);
    const isCollapsed = inject(HMenuIsCollapsedInjectKey);
    const scrollToTop = inject(HMenuScrollTopTopInjectKey);

    function onMouseEnter() {
      if (textRef.value) {
        if (parentProps.collapseForever === true) {
          if (textRef.value?.scrollWidth > textRef.value?.clientWidth) {
            toggleTooltip();
          }
        } else {
          if (isCollapsed?.value) {
            toggleTooltip();
          } else {
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

    onMounted(() => {
      appendChild?.({
        uuid,
        children: null,
        props,
        slots,
        emits: emit,
        type: 'menuItem',
        level: treeLevel,
        scrollTo: () => {
          if (elementRef.value) {
            scrollToTop?.(elementRef.value.offsetTop);
          }
        },
      });
    });

    onBeforeUnmount(() => {
      removeChild?.(uuid);
    });

    async function onClick() {
      if (props.disabled) return;

      try {
        if (
          parentProps.beforeSelect &&
          props.value &&
          !(await parentProps.beforeSelect(props.value, props))
        ) {
          return;
        }
      } catch {
        return;
      }

      addExpandMenu?.(uuid);
      setActivatedMenu?.(uuid);
      emit('click', props);

      void nextTick(() => {
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

    return () => (
      <parentProps.tag
        ref={elementRef}
        class={cls(classHelper.e('item'))}
        style={{
          [cssVariableKey('menu', 'size', 'tree-level')]: treeLevel,
          [cssVariableKey('menu', 'size', 'parent-icon-amount')]: parentHasIconAmount.value,
        }}
        data-tree-level={treeLevel}
      >
        <HTooltip
          trigger="manual"
          distance={8}
          visible={tooltipVisible.value}
          placement="right"
          arrow={treeLevel > 0}
        >
          {{
            default: () => (
              <div
                class={cls(
                  classHelper.e('title'),
                  classHelper.is('disabled', props.disabled),
                  classHelper.is(
                    'active',
                    activatedMenus?.value.some(curr => curr.uuid === uuid) ?? false,
                  ),
                )}
              >
                <div
                  class={cls(classHelper.em('title', 'inner'))}
                  role="menuitem"
                  aria-disabled={props.disabled}
                  tabindex={props.disabled ? -1 : 0}
                  onClick={onClick}
                  onKeyup={withModifiers(withKeys(onClick, ['enter', 'space']), ['self'])}
                  onMouseenter={onMouseEnter}
                  onMouseleave={onMouseleave}
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
                      {slots.default?.()}
                      {slots.title?.() ?? props.name}
                    </div>
                  </div>
                </div>
              </div>
            ),
            content: () => (
              <Fragment>
                {slots.default?.()}
                {slots.title?.() ?? props.name}
              </Fragment>
            ),
          }}
        </HTooltip>
      </parentProps.tag>
    );
  },
});
