import { defineComponent, ref } from 'vue';
import { ComponentClassBlock, cls, useNamespace, isDefined } from '@aurora/shared';
import type { LegoSetupContext } from '@aurora/shared';
import type { DropdownGroupProps } from './composables/useProps';
import { useDropdownGroupProps } from './composables/useProps';
import type { DropdownGroupEmits } from './composables/useEmits';
import { useDropdownGroupEmits } from './composables/useEmits';
import type { DropdownGroupSlots } from './composables/useSlots';
import { useDropdownGroupSlots } from './composables/useSlots';
import NTooltip from '~/components/Tooltip/src/Tooltip';

export default defineComponent({
  name: `${useNamespace()}DropdownGroup`,
  components: {
    NTooltip,
  },
  props: useDropdownGroupProps,
  emits: useDropdownGroupEmits,
  slots: useDropdownGroupSlots,
  setup(
    props: DropdownGroupProps,
    { slots }: LegoSetupContext<DropdownGroupEmits, DropdownGroupSlots>,
  ) {
    const classHelper = new ComponentClassBlock('dropdown-group');

    const titleRef = ref<HTMLElement | null>(null);
    const tooltipVisible = ref(false);

    function onMouseEnter() {
      tooltipVisible.value =
        (titleRef.value?.scrollWidth ?? 0) > (titleRef.value?.clientWidth ?? 0);
    }

    function onMouseLeave() {
      tooltipVisible.value = false;
    }

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.has('title', isDefined(slots.title) || isDefined(props.title)),
        )}
      >
        {(slots.title || props.title) && (
          <NTooltip
            trigger="manual"
            visible={tooltipVisible.value}
            fallbackPlacements={['auto']}
            {...(props.titleTooltipOptions || {})}
          >
            {{
              default: () => (
                <div
                  ref={titleRef}
                  class={cls(classHelper.e('title'))}
                  onMouseenter={onMouseEnter}
                  onMouseleave={onMouseLeave}
                >
                  {slots.title?.() ?? props.title}
                </div>
              ),
              content: () => slots.title?.() ?? props.title,
            }}
          </NTooltip>
        )}
        <div class={cls(classHelper.e('inner'))}>{slots.default?.()}</div>
      </div>
    );
  },
});
