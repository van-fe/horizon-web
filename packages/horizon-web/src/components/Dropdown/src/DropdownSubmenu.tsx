import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
  withKeys,
  withModifiers,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace, isUndefined } from '@aurora/shared';
import type { LegoSetupContext, LegoComponentInstance } from '@aurora/shared';
import type { DropdownSubmenuProps } from './composables/useProps';
import { useDropdownSubmenuProps } from './composables/useProps';
import { useDropdownSubmenuEmits } from './composables/useEmits';
import type { DropdownSubmenuSlots } from './composables/useSlots';
import { useDropdownSubmenuSlots } from './composables/useSlots';
import type { DropdownSubmenuEmits } from './composables/useEmits';
import NPopover from '~/components/Popover/src/Popover';
import NPopContent from '~/components/Popover/src/PopContent';
import { IconArrowRight } from '@aurora/icon';
import { renderIcon } from '~/utils/useIcon';
import {
  NDropdownActivatedChildInjectKey,
  NDropdownAppendChildInjectKey,
  NDropdownPropsInjectKey,
  NDropdownRemoveChildInjectKey,
  NDropdownTreeLevelInjectKey,
} from './utils/InjectedKeys';
import type { NDropdownTreeData } from './utils/types';
import { nanoid } from 'nanoid';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import type { PopoverExposes } from '~/components/Popover/src/composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}DropdownSubmenu`,
  components: {
    NPopover,
    NPopContent,
    NScrollbar,
    NTooltip,
  },
  props: useDropdownSubmenuProps,
  emits: useDropdownSubmenuEmits,
  slots: useDropdownSubmenuSlots,
  setup(
    props: DropdownSubmenuProps,
    { slots, emit }: LegoSetupContext<DropdownSubmenuEmits, DropdownSubmenuSlots>,
  ) {
    const uuid = nanoid();
    const classHelper = new ComponentClassBlock('dropdown-submenu');

    const popoverDomRef = ref<LegoComponentInstance<typeof NPopover, PopoverExposes> | null>(null);
    const dropdownItemDomRef = ref<HTMLElement | null>(null);

    const popoverVisible = ref(false);

    const parentProps = inject(NDropdownPropsInjectKey, undefined);
    const treeLevel = inject(NDropdownTreeLevelInjectKey, 0);
    const appendChild = inject(NDropdownAppendChildInjectKey, undefined);
    const removeChild = inject(NDropdownRemoveChildInjectKey, undefined);
    const parentActivatedChildUuid = inject(NDropdownActivatedChildInjectKey, undefined);

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

    const dropdownTree = reactive(new Map<string, NDropdownTreeData>());
    const isDropdownTreeHasThirdLevel = ref(false);

    const trigger = computed(() => {
      switch (props.trigger) {
        case 'click':
          return 'click-remain';
        default:
          return props.trigger;
      }
    });

    watch(
      dropdownTree,
      val => {
        isDropdownTreeHasThirdLevel.value = Array.from(val.values()).some(
          sec => (sec.children?.size || 0) > 0,
        );
      },
      {
        deep: true,
      },
    );

    function selfAppendChild(item: NDropdownTreeData) {
      dropdownTree.set(item.uuid, item);
    }

    function selfRemoveChild(uuid: string) {
      dropdownTree.delete(uuid);
    }

    function onClick(evt: MouseEvent | KeyboardEvent) {
      evt.preventDefault();
      if (props.disabled) return;

      emit('click', evt);

      if (!isUndefined(parentActivatedChildUuid)) {
        parentActivatedChildUuid.value = uuid;
      }
    }

    provide(NDropdownTreeLevelInjectKey, treeLevel + 1);
    provide(NDropdownAppendChildInjectKey, selfAppendChild);
    provide(NDropdownRemoveChildInjectKey, selfRemoveChild);
    provide(NDropdownActivatedChildInjectKey, activeChildUuid);

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
        <NPopover
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
                    <NTooltip overflow={true}>
                      {{
                        content: () => slots.title?.() ?? props.title,
                        default: () => (
                          <div class={cls(classHelper.em('item', 'title'))}>
                            {slots.title?.() ?? props.title}
                          </div>
                        ),
                      }}
                    </NTooltip>
                  </div>
                  <div class={cls(classHelper.em('item', 'arrow'))}>
                    <IconArrowRight size={12} />
                  </div>
                </div>
              </div>
            ),
            popper: () => (
              <NPopContent class={cls(classHelper.e('inner'))}>
                {!isDropdownTreeHasThirdLevel.value ? (
                  <NScrollbar maxHeight={296} size="small">
                    {slots.default?.()}
                  </NScrollbar>
                ) : (
                  slots.default?.()
                )}
              </NPopContent>
            ),
          }}
        </NPopover>
      </div>
    );
  },
});
