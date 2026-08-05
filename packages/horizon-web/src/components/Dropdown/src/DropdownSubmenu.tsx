import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace, isUndefined } from '@aurora/utils';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import type { DropdownSubmenuProps } from './composables/useProps';
import { useDropdownSubmenuProps } from './composables/useProps';
import { useDropdownSubmenuEmits } from './composables/useEmits';
import type { DropdownSubmenuSlots } from './composables/useSlots';
import { useDropdownSubmenuSlots } from './composables/useSlots';
import type { DropdownSubmenuEmits } from './composables/useEmits';
import HPopover from '~/components/Popover/src/Popover';
import HPopContent from '~/components/Popover/src/PopContent';
import { IconArrowRight } from '@aurora/icon';
import { renderIcon } from '~/utils/useIcon';
import {
  HDropdownActivatedChildInjectKey,
  HDropdownAppendChildInjectKey,
  HDropdownPropsInjectKey,
  HDropdownRemoveChildInjectKey,
  HDropdownTreeLevelInjectKey,
} from './utils/InjectedKeys';
import { nanoid } from 'nanoid';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import type { PopoverExposes } from '~/components/Popover/src/composables/useExposes';
import useDropdownTree from './composables/useDropdownTree';

export default defineComponent({
  name: `${useNamespace()}DropdownSubmenu`,
  desc: "包含下级菜单的下拉菜单项",
  descLocales: { en: "A dropdown item that contains a nested menu." },
  components: {
    HPopover,
    HPopContent,
    HTooltip,
  },
  props: useDropdownSubmenuProps,
  emits: useDropdownSubmenuEmits,
  slots: useDropdownSubmenuSlots,
  setup(
    props: DropdownSubmenuProps,
    { slots, emit }: HorizonWebSetupContext<DropdownSubmenuEmits, DropdownSubmenuSlots>,
  ) {
    const uuid = nanoid();
    const classHelper = new ComponentClassBlock('dropdown-submenu');

    const popoverDomRef = ref<HorizonWebComponentInstance<typeof HPopover, PopoverExposes> | null>(null);
    const dropdownItemDomRef = ref<HTMLElement | null>(null);

    const popoverVisible = ref(false);

    const parentProps = inject(HDropdownPropsInjectKey, undefined);
    const treeLevel = inject(HDropdownTreeLevelInjectKey, 0);
    const appendChild = inject(HDropdownAppendChildInjectKey, undefined);
    const removeChild = inject(HDropdownRemoveChildInjectKey, undefined);
    const parentActivatedChildUuid = inject(HDropdownActivatedChildInjectKey, undefined);

    const activeChildUuid = ref<string>();

    watch(
      () => parentActivatedChildUuid?.value,
      val => {
        if (!isUndefined(val) && val !== uuid) {
          popoverDomRef.value?.switchVisible(false);
          activeChildUuid.value = '';
        }
      },
    );

    const {
      dropdownTree,
      appendChild: selfAppendChild,
      removeChild: selfRemoveChild,
      renderContent,
    } = useDropdownTree();

    const trigger = computed(() => {
      switch (props.trigger) {
        case 'click':
          return 'click-remain';
        default:
          return props.trigger;
      }
    });

    function onClick(evt: MouseEvent | KeyboardEvent) {
      evt.preventDefault();
      if (props.disabled) return;

      emit('click', evt);

      if (!isUndefined(parentActivatedChildUuid)) {
        parentActivatedChildUuid.value = uuid;
      }
    }

    provide(HDropdownTreeLevelInjectKey, treeLevel + 1);
    provide(HDropdownAppendChildInjectKey, selfAppendChild);
    provide(HDropdownRemoveChildInjectKey, selfRemoveChild);
    provide(HDropdownActivatedChildInjectKey, activeChildUuid);

    function handleKeyUp(evt: KeyboardEvent) {
      onClick(evt);

      if (popoverVisible.value) {
        popoverDomRef.value?.switchVisible(false);
      } else {
        popoverDomRef.value?.switchVisible(true);
      }
    }

    onMounted(() => {
      appendChild?.({
        uuid,
        children: dropdownTree,
        props,
        slots,
        emits: emit,
        type: 'submenu',
      });
    });

    onBeforeUnmount(() => {
      removeChild?.(uuid);
    });

    return () => (
      <div
        ref={dropdownItemDomRef}
        class={cls(
          classHelper.block,
          classHelper.is('active', props.active),
          classHelper.is('selected', props.selected),
          classHelper.is('disabled', props.disabled),
          classHelper.is('focusable', !props.disabled),
        )}
      >
        <HPopover
          ref={popoverDomRef}
          trigger={trigger.value}
          placement={parentProps?.submenuLeft ? 'left-start' : 'right-start'}
          destroyOnHide={false}
          distance={2}
          disabled={props.disabled}
          transitionName="dropdown"
          transitionSpeed="slow"
          arrow={false}
          toBody={false}
          resizeObserve={true}
          strategy="absolute"
          {...(props.popoverOptions || {})}
          onShow={() => (popoverVisible.value = true)}
          onHide={() => (popoverVisible.value = false)}
        >
          {{
            reference: () => (
              <div class={cls(classHelper.e('item'))} onClick={onClick}>
                <div
                  class={classHelper.em('item', 'inner')}
                  tabindex={props.disabled ? -1 : 0}
                  onKeyup={(e: KeyboardEvent) => {
                    if (e.key === 'Enter' && e.target === e.currentTarget) {
                      handleKeyUp(e);
                    }
                  }}
                >
                  <div class={classHelper.em('item', 'content')}>
                    {(props.icon || slots.icon) && (
                      <div class={cls(classHelper.em('item', 'icon'))}>
                        {renderIcon(props.icon, slots.icon, {
                          size: 16,
                        })}
                      </div>
                    )}
                    <HTooltip overflow={true}>
                      {{
                        content: () => slots.title?.() ?? props.title,
                        default: () => (
                          <div class={cls(classHelper.em('item', 'title'))}>
                            {slots.title?.() ?? props.title}
                          </div>
                        ),
                      }}
                    </HTooltip>
                  </div>
                  <div class={cls(classHelper.em('item', 'arrow'))}>
                    <IconArrowRight size={12} />
                  </div>
                </div>
              </div>
            ),
            popper: () => (
              <HPopContent class={cls(classHelper.e('inner'))}>
                {renderContent(slots.default?.())}
              </HPopContent>
            ),
          }}
        </HPopover>
      </div>
    );
  },
});
