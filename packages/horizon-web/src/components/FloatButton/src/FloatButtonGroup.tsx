import { computed, defineComponent, provide, ref, toRefs } from 'vue';
import { ComponentClassBlock, cls, useNamespace, useZIndex } from '@aurora/utils';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import type { FloatButtonGroupProps } from './composables/useProps';
import { useFloatButtonGroupProps } from './composables/useProps';
import type { FloatButtonGroupEmits } from './composables/useEmits';
import { useFloatButtonGroupEmits } from './composables/useEmits';
import type { FloatButtonGroupSlots } from './composables/useSlots';
import { useFloatButtonGroupSlots } from './composables/useSlots';
import { useFloatButtonExposes } from './composables/useExposes';
import type { FloatButtonExposes } from './composables/useExposes';
import { NFloatButtonGroupProps, NFloatButtonPassiveVisibleProps } from './utils/InjectedKeys';
import NFloatButton from './FloatButton';
import NPopover from '~/components/Popover/src/Popover';
import type { PopoverExposes } from '~/components/Popover/src/composables/useExposes';
import { getBadgeDefaultOption } from '~/components/FloatButton/src/utils/badgeOptions';

export default defineComponent({
  name: `${useNamespace()}FloatButtonGroup`,
  props: useFloatButtonGroupProps,
  emits: useFloatButtonGroupEmits,
  slots: useFloatButtonGroupSlots,
  exposes: useFloatButtonExposes,
  setup(
    props: FloatButtonGroupProps,
    {
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<FloatButtonGroupEmits, FloatButtonGroupSlots, FloatButtonExposes>,
  ) {
    const classHelper = new ComponentClassBlock('float-button-group');

    const popoverDomRef = ref<HorizonWebComponentInstance<typeof NPopover, PopoverExposes> | null>(null);

    const zIndexHandler = useZIndex();
    const zIndex = ref(zIndexHandler.current);

    const {
      shape: shapeProp,
      useCollapse: useCollapseProp,
      expandIcon: expandIconProp,
      foldIcon: foldIconProp,
      trigger: triggerProp,
      badge: badgeProp,
      draggable: draggableProp,
      adsorbBottom: adsorbBottomProp,
      expandTooltip: expandTooltipProp,
      foldTooltip: foldTooltipProp,
    } = toRefs(props);

    const isExpanded = ref(!useCollapseProp.value);
    const isDragging = ref(false);

    const badgeOptions = computed(() =>
      badgeProp?.value
        ? getBadgeDefaultOption(badgeProp.value, shapeProp?.value ?? 'circle', true, false)
        : undefined,
    );

    provide(NFloatButtonGroupProps, props);
    provide(NFloatButtonPassiveVisibleProps, isExpanded);

    function handleShow() {
      zIndex.value = zIndexHandler.next();
      isExpanded.value = true;
      emit('expand');
    }

    function handleHide() {
      isExpanded.value = false;
      emit('fold');
    }

    function handleClick() {
      if (triggerProp.value === 'click') {
        emit('click');
        popoverDomRef.value?.switchVisible(!isExpanded.value);
      }
    }

    function handleDragStart() {
      popoverDomRef.value?.switchVisible(false);
    }

    function handleDragEnd() {
      setTimeout(() => {
        isDragging.value = false;
      }, 300);
    }

    expose({});

    return () => (
      <div class={cls(classHelper.block)}>
        {useCollapseProp.value ? (
          <NPopover
            ref={popoverDomRef}
            trigger={triggerProp.value === 'click' ? 'manual' : triggerProp.value}
            transitionName="collapse"
            arrow={false}
            distance={0}
            placement="top"
            disabled={isDragging.value}
            resizeObserve={true}
            destroyOnHide={false}
            onShow={handleShow}
            onHide={handleHide}
          >
            {{
              reference: () => (
                <NFloatButton
                  class={cls(
                    classHelper.e('collapse-button'),
                    classHelper.is('expanded', isExpanded.value),
                  )}
                  icon={isExpanded.value ? foldIconProp?.value : expandIconProp?.value}
                  badge={badgeOptions.value}
                  draggable={draggableProp.value}
                  adsorbBottom={adsorbBottomProp.value}
                  collapseButton
                  tooltip={
                    isDragging.value
                      ? undefined
                      : isExpanded.value
                        ? foldTooltipProp?.value
                        : expandTooltipProp?.value
                  }
                  style={{ zIndex: zIndex.value }}
                  onClick={handleClick}
                  onDragStart={handleDragStart}
                  onDragging={() => (isDragging.value = true)}
                  onDragEnd={handleDragEnd}
                />
              ),
              popper: () => (
                <div
                  v-show={isExpanded.value}
                  class={cls(
                    classHelper.e('container'),
                    classHelper.em('container', shapeProp?.value ?? 'circle'),
                  )}
                >
                  {slots.default?.()}
                </div>
              ),
            }}
          </NPopover>
        ) : (
          slots.default?.()
        )}
      </div>
    );
  },
});
