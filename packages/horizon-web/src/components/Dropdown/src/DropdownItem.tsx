import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace, isUndefined } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { DropdownItemProps } from './composables/useProps';
import { useDropdownItemProps } from './composables/useProps';
import { useDropdownItemEmits } from './composables/useEmits';
import { useDropdownItemSlots } from './composables/useSlots';
import type { DropdownItemEmits } from './composables/useEmits';
import type { DropdownItemSlots } from './composables/useSlots';
import {
  HDropdownActivatedChildInjectKey,
  HDropdownAppendChildInjectKey,
  HDropdownCommandFnInjectKey,
  HDropdownRemoveChildInjectKey,
} from './utils/InjectedKeys';
import { renderIcon } from '~/utils/useIcon';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import { nanoid } from 'nanoid';

export default defineComponent({
  name: `${useNamespace()}DropdownItem`,
  components: {
    HTooltip,
  },
  props: useDropdownItemProps,
  emits: useDropdownItemEmits,
  slots: useDropdownItemSlots,
  setup(
    props: DropdownItemProps,
    { emit, slots }: HorizonWebSetupContext<DropdownItemEmits, DropdownItemSlots>,
  ) {
    const uuid = nanoid();

    const dropdownItemDomRef = ref<HTMLElement | null>(null);
    const classHelper = new ComponentClassBlock('dropdown-item');

    const command = inject(HDropdownCommandFnInjectKey, undefined);
    const appendChild = inject(HDropdownAppendChildInjectKey, undefined);
    const removeChild = inject(HDropdownRemoveChildInjectKey, undefined);
    const parentActivatedChildUuid = inject(HDropdownActivatedChildInjectKey, undefined);

    function onClick(evt: MouseEvent | KeyboardEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      if (props.disabled) return;

      emit('click', evt);
      command?.(props.command);

      if (!isUndefined(parentActivatedChildUuid)) {
        parentActivatedChildUuid.value = uuid;
      }

      if (props.forbidEvtStop) return;
      evt.stopImmediatePropagation();
    }

    onMounted(() => {
      appendChild?.({
        uuid,
        children: null,
        props,
        slots,
        emits: emit,
        type: 'item',
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
          classHelper.is('disabled', props.disabled),
          classHelper.is('divided', props.divided),
          classHelper.is('focusable', !props.disabled),
        )}
        onClick={onClick}
        role="none"
      >
        <div
          class={classHelper.e('inner')}
          role="menuitem"
          aria-disabled={props.disabled}
          tabindex={props.disabled ? -1 : 0}
          onKeyup={(e: KeyboardEvent) => {
            if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
              e.preventDefault();
              onClick(e);
            }
          }}
        >
          {(props.icon || slots.icon) && (
            <div class={classHelper.e('icon')}>
              {renderIcon(props.icon, slots.icon, {
                size: 16,
              })}
            </div>
          )}

          <HTooltip size="small" overflow={true} {...(props.tooltipOptions || {})}>
            {{
              content: () => slots.default?.(),
              default: () => <div class={classHelper.e('content')}>{slots.default?.()}</div>,
            }}
          </HTooltip>
        </div>
      </div>
    );
  },
});
