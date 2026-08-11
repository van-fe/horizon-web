import type { FloatButtonGroupExpansionReason } from '@aurora/core';
import { FloatButtonGroupController } from '@aurora/core';
import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace, useZIndex } from '@aurora/utils';
import { computed, defineComponent, onBeforeUnmount, provide, ref, watch } from 'vue';
import HPopover from '~/components/Popover/src/Popover';
import type { PopoverExposes } from '~/components/Popover/src/composables/useExposes';
import type { FloatButtonGroupEmits } from './composables/useEmits';
import { useFloatButtonGroupEmits } from './composables/useEmits';
import type { FloatButtonGroupExposes } from './composables/useExposes';
import { useFloatButtonGroupExposes } from './composables/useExposes';
import type { FloatButtonGroupProps } from './composables/useProps';
import { useFloatButtonGroupProps } from './composables/useProps';
import type { FloatButtonGroupSlots } from './composables/useSlots';
import { useFloatButtonGroupSlots } from './composables/useSlots';
import { getBadgeDefaultOption } from './utils/badgeOptions';
import { HFloatButtonGroupProps, HFloatButtonPassiveVisibleProps } from './utils/InjectedKeys';
import HFloatButton from './FloatButton';

export default defineComponent({
  name: `${useNamespace()}FloatButtonGroup`,
  desc: '组织一组相关悬浮按钮',
  descLocales: { en: 'Groups related floating buttons.' },
  props: useFloatButtonGroupProps,
  emits: useFloatButtonGroupEmits,
  slots: useFloatButtonGroupSlots,
  exposes: useFloatButtonGroupExposes,
  setup(
    props: FloatButtonGroupProps,
    {
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<
      FloatButtonGroupEmits,
      FloatButtonGroupSlots,
      FloatButtonGroupExposes
    >,
  ) {
    const classHelper = new ComponentClassBlock('float-button-group');
    const popoverDomRef = ref<HorizonWebComponentInstance<typeof HPopover, PopoverExposes> | null>(
      null,
    );
    const zIndexHandler = useZIndex();
    const zIndex = ref(zIndexHandler.current);
    const stateVersion = ref(0);
    const isDragging = ref(false);
    let dragEndTimer: ReturnType<typeof setTimeout> | undefined;
    const shapeProp = computed(() => props.shape);
    const typeProp = computed(() => props.type);
    const useCollapseProp = computed(() => props.useCollapse);
    const expandIconProp = computed(() => props.expandIcon);
    const foldIconProp = computed(() => props.foldIcon);
    const triggerProp = computed(() => props.trigger);
    const badgeProp = computed(() => props.badge);
    const draggableProp = computed(() => props.draggable);
    const adsorbBottomProp = computed(() => props.adsorbBottom);
    const expandTooltipProp = computed(() => props.expandTooltip);
    const foldTooltipProp = computed(() => props.foldTooltip);

    const controller = new FloatButtonGroupController({
      visible: props.visible,
      expanded: props.expanded,
      defaultExpanded: props.defaultExpanded,
      useCollapse: props.useCollapse,
      onVisibleChange: visible => {
        stateVersion.value += 1;
        emit('update:visible', visible);
      },
      onExpandedChange: (expanded, details) => {
        stateVersion.value += 1;
        emit('update:expanded', expanded, details);
        if (expanded) emit('expand');
        else emit('fold');
      },
    });
    const state = computed(() => {
      void stateVersion.value;
      return controller.snapshot;
    });
    const isExpanded = computed(() => state.value.expanded);
    const isVisible = computed(() => state.value.visible);
    const badgeOptions = computed(() =>
      badgeProp.value
        ? getBadgeDefaultOption(badgeProp.value, shapeProp.value ?? 'circle', true, false)
        : undefined,
    );

    provide(HFloatButtonGroupProps, {
      shape: shapeProp,
      type: typeProp,
      useCollapse: useCollapseProp,
      visible: isVisible,
    });
    provide(HFloatButtonPassiveVisibleProps, isExpanded);

    watch(
      () => [props.visible, props.expanded, props.useCollapse] as const,
      ([visible, expanded, useCollapse]) => {
        controller.setOptions({ visible, expanded, useCollapse });
        stateVersion.value += 1;
      },
      { immediate: true },
    );

    const refresh = () => {
      stateVersion.value += 1;
    };
    const requestExpand = (reason: FloatButtonGroupExpansionReason) => {
      controller.expand(reason);
      refresh();
    };
    const requestFold = (reason: FloatButtonGroupExpansionReason) => {
      controller.fold(reason);
      refresh();
    };
    const handleShow = () => {
      zIndex.value = zIndexHandler.next();
      requestExpand(triggerProp.value);
    };
    const handleHide = () => requestFold(triggerProp.value);
    const handleClick = () => {
      if (triggerProp.value !== 'click') return;
      emit('click');
      controller.toggle('click');
      refresh();
    };
    const handleDragStart = () => {
      controller.fold('imperative');
      refresh();
      popoverDomRef.value?.switchVisible(false);
    };
    const handleDragEnd = () => {
      if (dragEndTimer) clearTimeout(dragEndTimer);
      dragEndTimer = setTimeout(() => {
        isDragging.value = false;
      }, 300);
    };

    expose({
      show: () => {
        controller.show();
        refresh();
      },
      hide: () => {
        controller.hide();
        refresh();
      },
      expand: () => requestExpand('imperative'),
      fold: () => requestFold('imperative'),
      toggle: () => {
        controller.toggle('imperative');
        refresh();
      },
    });
    onBeforeUnmount(() => {
      if (dragEndTimer) clearTimeout(dragEndTimer);
    });

    return () => (
      <div class={classHelper.block}>
        {useCollapseProp.value ? (
          <HPopover
            ref={popoverDomRef}
            trigger={triggerProp.value === 'click' ? 'manual' : triggerProp.value}
            visible={isExpanded.value}
            transitionName="collapse"
            arrow={false}
            distance={0}
            placement="top"
            disabled={isDragging.value}
            resizeObserve
            destroyOnHide={false}
            onShow={handleShow}
            onHide={handleHide}
          >
            {{
              reference: () => {
                const tooltip = isExpanded.value ? foldTooltipProp.value : expandTooltipProp.value;
                return (
                  <HFloatButton
                    class={cls(
                      classHelper.e('collapse-button'),
                      classHelper.is('expanded', isExpanded.value),
                    )}
                    icon={isExpanded.value ? foldIconProp.value : expandIconProp.value}
                    badge={badgeOptions.value}
                    draggable={draggableProp.value}
                    adsorbBottom={adsorbBottomProp.value}
                    collapseButton
                    ariaLabel={typeof tooltip === 'string' ? tooltip : undefined}
                    tooltip={isDragging.value ? undefined : tooltip}
                    style={{ zIndex: zIndex.value }}
                    onClick={handleClick}
                    onDragStart={handleDragStart}
                    onDragging={() => (isDragging.value = true)}
                    onDragEnd={handleDragEnd}
                  />
                );
              },
              popper: () => (
                <div
                  v-show={isExpanded.value}
                  class={cls(
                    classHelper.e('container'),
                    classHelper.em('container', shapeProp.value ?? 'circle'),
                  )}
                >
                  {slots.default?.()}
                </div>
              ),
            }}
          </HPopover>
        ) : (
          slots.default?.()
        )}
      </div>
    );
  },
});
