import type { PropType } from 'vue';
import { withKeys, withModifiers, computed, defineComponent, inject, nextTick } from 'vue';
import type { HMenuTreeData, HMenuTreePickedValuesData } from '../util/types';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, sizeUnitTransform } from '@aurora/utils';
import {
  HMenuActivatedMenusInjectKey,
  HMenuAddExpandMenuInjectKey,
  HMenuEmitInjectKey,
  HMenuPropsInjectKey,
  HMenuSetActivatedMenuInjectKey,
} from '../util/injectKeys';
import type { MenuItemEmits, SubMenuEmits } from '../composables/useEmits';
import type { MenuItemProps, SubMenuProps } from '../composables/useProps';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import useIconRender from '~/utils/useIconRender';

export default defineComponent({
  name: 'FullViewMenu',
  components: {
    HTooltip,
  },
  props: {
    menuTree: {
      type: Object as PropType<Map<string, HMenuTreeData<'subMenu' | 'menuItem'>>>,
      required: true,
    },
    activeTopMenuUuid: {
      type: String,
      required: true,
    },
  },
  emits: {
    mouseEnter: () => true,
    mouseLeave: () => true,
  },
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('menu--full-view');

    const parentProps = inject(HMenuPropsInjectKey, undefined);
    const parentEmits = inject(HMenuEmitInjectKey, undefined);
    const activatedMenus = inject(HMenuActivatedMenusInjectKey);
    const addExpandMenu = inject(HMenuAddExpandMenuInjectKey);
    const setActivatedMenu = inject(HMenuSetActivatedMenuInjectKey);

    const currentChildren = computed(() => {
      const pickMapValues = (
        mapData: Map<string, HMenuTreeData<'menuItem' | 'subMenu'>> | null,
      ): Array<HMenuTreePickedValuesData<'menuItem' | 'subMenu'>> => {
        const res: HMenuTreePickedValuesData<'menuItem' | 'subMenu'>[] = [];

        Array.from(mapData?.values() ?? []).forEach(curr => {
          res.push({
            ...curr,
            children: curr.children ? pickMapValues(curr.children) : [],
          });
        });

        return res;
      };

      const found = props.menuTree.get(props.activeTopMenuUuid);

      return found ? pickMapValues(found.children) : [];
    });

    function onClickMenuItem(target: HMenuTreePickedValuesData) {
      if (target.props.disabled) return;

      addExpandMenu?.(target.uuid);
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
        parentEmits?.(
          'select',
          target.props.value ?? '',
          (activatedMenus?.value.map(curr => curr.props).reverse() ?? []) as (
            | MenuItemProps
            | SubMenuProps
          )[],
          target.props as MenuItemProps,
        );

        parentEmits?.(
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

    function onClickSubMenu(target: HMenuTreePickedValuesData<'subMenu'>) {
      if (target.props.disabled) return;

      addExpandMenu?.(target.uuid);
      if (target.props.selectable) {
        setActivatedMenu?.(target.uuid);
        (target.emits as HorizonWebSetupContext<SubMenuEmits>['emit'])('click', target.props);

        void nextTick(() => {
          parentEmits?.(
            'select',
            target.props.value ?? '',
            (activatedMenus?.value.map(curr => curr.props).reverse() ?? []) as (
              | MenuItemProps
              | SubMenuProps
            )[],
            target.props,
          );

          parentEmits?.(
            'selected',
            target.props.value ?? '',
            (activatedMenus?.value.map(curr => curr.props).reverse() ?? []) as (
              | MenuItemProps
              | SubMenuProps
            )[],
            target.props,
          );
        });
      }
    }

    function isSelectable(group: HMenuTreePickedValuesData<'menuItem' | 'subMenu'>) {
      return group.type === 'subMenu'
        ? (group as HMenuTreePickedValuesData<'subMenu'>).props.selectable &&
            !(group as HMenuTreePickedValuesData<'subMenu'>).props.disabled
        : !group.props.disabled;
    }

    return () => (
      <div
        class={cls(classHelper.block, classHelper.m(parentProps?.theme))}
        onMouseenter={() => emit('mouseEnter')}
        onMouseleave={() => emit('mouseLeave')}
      >
        <div
          class={classHelper.e('container')}
          style={{ maxWidth: sizeUnitTransform(parentProps?.maxWidth) }}
        >
          {currentChildren.value.map(group => (
            <div class={classHelper.e('group')}>
              <div
                class={cls(
                  classHelper.em('group', 'title'),
                  classHelper.has('router', group.type === 'menuItem'),
                  classHelper.is('selectable', isSelectable(group)),
                  classHelper.is('active', activatedMenus?.value[0]?.uuid === group.uuid),
                  classHelper.is('disabled', group.props.disabled),
                )}
                onClick={
                  group.type === 'menuItem'
                    ? () => onClickMenuItem(group as HMenuTreePickedValuesData)
                    : () => onClickSubMenu(group as HMenuTreePickedValuesData<'subMenu'>)
                }
              >
                <div
                  class={classHelper.em('group', 'title-content')}
                  tabindex={isSelectable(group) ? 0 : -1}
                  onKeyup={withModifiers(
                    withKeys(
                      group.type === 'menuItem'
                        ? () => onClickMenuItem(group as HMenuTreePickedValuesData)
                        : () => onClickSubMenu(group as HMenuTreePickedValuesData<'subMenu'>),
                      ['enter'],
                    ),
                    ['self'],
                  )}
                >
                  {group.type === 'menuItem'
                    ? group.slots.default?.() ??
                      group.slots.title?.() ??
                      group.slots.name?.() ??
                      group.props.name
                    : group.slots.title?.() ?? group.slots.name?.() ?? group.props.name}
                </div>
              </div>
              <div class={classHelper.em('group', 'list')}>
                {group.children.map(item => (
                  <div
                    class={cls(
                      classHelper.em('group', 'item'),
                      classHelper.has('router', item.type === 'menuItem'),
                      classHelper.is(
                        'active',
                        activatedMenus?.value.some(curr => curr.uuid === item.uuid) ?? false,
                      ),
                      classHelper.is('disabled', item.props.disabled),
                    )}
                    tabindex={isSelectable(item) ? 0 : -1}
                    onClick={() => onClickMenuItem(item as HMenuTreePickedValuesData)}
                    onKeyup={withModifiers(
                      withKeys(() => onClickMenuItem(item as HMenuTreePickedValuesData), ['enter']),
                      ['self'],
                    )}
                  >
                    {(item.props.icon || item.slots.icon) && (
                      <div class={classHelper.em('group', 'item-icon')}>
                        {useIconRender(item.props.icon, item.slots.icon, {
                          size: 16,
                        })}
                      </div>
                    )}
                    <HTooltip overflow={true} size="small" arrow={false}>
                      {{
                        content: () =>
                          item.type === 'menuItem'
                            ? item.slots.default?.() ??
                              item.slots.title?.() ??
                              item.slots.name?.() ??
                              item.props.name
                            : item.slots.title?.() ?? item.slots.name?.() ?? item.props.name,
                        default: () => (
                          <div class={classHelper.em('group', 'item-content')}>
                            {item.type === 'menuItem'
                              ? item.slots.default?.() ??
                                item.slots.title?.() ??
                                item.slots.name?.() ??
                                item.props.name
                              : item.slots.title?.() ?? item.slots.name?.() ?? item.props.name}
                          </div>
                        ),
                      }}
                    </HTooltip>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
