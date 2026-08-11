import type { FloatButtonPosition } from '@aurora/core';
import { resolveFloatButtonAdsorbedPosition, resolveFloatButtonStackPosition } from '@aurora/core';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, cssVariable, useNamespace } from '@aurora/utils';
import { nanoid } from 'nanoid';
import { computed, defineComponent, h, inject, onBeforeUnmount, ref, watch } from 'vue';
import HBadge from '~/components/Badge/src/Badge';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import HTransition from '~/components/Transition/src/Transition';
import { renderIcon } from '~/utils/useIcon';
import type { FloatButtonEmits } from './composables/useEmits';
import { useFloatButtonEmits } from './composables/useEmits';
import type { FloatButtonExposes } from './composables/useExposes';
import { useFloatButtonExposes } from './composables/useExposes';
import type { FloatButtonProps } from './composables/useProps';
import { useFloatButtonProps } from './composables/useProps';
import type { FloatButtonSlots } from './composables/useSlots';
import { useFloatButtonSlots } from './composables/useSlots';
import { getBadgeDefaultOption } from './utils/badgeOptions';
import { HFloatButtonGroupProps, HFloatButtonPassiveVisibleProps } from './utils/InjectedKeys';
import { mountedStack } from './utils/mountedStack';
import useDrag from './utils/useDrag';

export default defineComponent({
  name: `${useNamespace()}FloatButton`,
  desc: '悬浮按钮大多会独立出现在界面之上，提升整体的导航，拓展页面的功能，使应用的操作更加便捷',
  descLocales: { en: 'Use `type` to switch between normal and primary floating actions.' },
  version: '2.7.0',
  inheritAttrs: false,
  props: useFloatButtonProps,
  emits: useFloatButtonEmits,
  slots: useFloatButtonSlots,
  exposes: useFloatButtonExposes,
  setup(
    props: FloatButtonProps,
    {
      emit,
      slots,
      expose,
      attrs,
    }: HorizonWebSetupContext<FloatButtonEmits, FloatButtonSlots, FloatButtonExposes>,
  ) {
    const uuid = nanoid();
    const classHelper = new ComponentClassBlock('float-button');
    const shapeProp = computed(() => props.shape);
    const typeProp = computed(() => props.type);
    const iconProp = computed(() => props.icon);
    const descriptionProp = computed(() => props.description);
    const tooltipProp = computed(() => props.tooltip);
    const badgeProp = computed(() => props.badge);
    const visibleProp = computed(() => props.visible);
    const draggableProp = computed(() => props.draggable);
    const adsorbBottomProp = computed(() => props.adsorbBottom);
    const collapseButtonProp = computed(() => props.collapseButton);
    const targetDomRef = ref<HTMLElement | null>(null);
    const hasDragged = ref(false);
    const currentPosition = ref<FloatButtonPosition>();
    const groupProps = inject(HFloatButtonGroupProps, undefined);
    const passiveVisible = inject(HFloatButtonPassiveVisibleProps, undefined);

    const hasIcon = computed(() => !!(iconProp.value || slots.icon));
    const hasDescription = computed(() => !!(slots.description || descriptionProp.value));
    const visibleComputed = computed(() => groupProps?.visible.value ?? visibleProp.value);
    const canPushToStack = computed(
      () => !groupProps || !groupProps.useCollapse.value || !!collapseButtonProp.value,
    );
    const isVisible = computed(
      () => visibleComputed.value && (canPushToStack.value || (passiveVisible?.value ?? false)),
    );
    const stackPosition = computed(() => resolveFloatButtonStackPosition(mountedStack.value, uuid));
    const tooltipOptions = computed<Partial<TooltipProps>>(() =>
      typeof tooltipProp.value === 'string'
        ? { content: tooltipProp.value }
        : (tooltipProp.value ?? {}),
    );

    const { style, isDragging, updatePosition } = useDrag(targetDomRef, {
      disabled: computed(() => !draggableProp.value),
      onStart() {
        hasDragged.value = true;
        removeFromStack();
        emit('dragStart');
      },
      onMove() {
        emit('dragging');
      },
      onEnd(position) {
        emit('dragEnd');
        requestAnimationFrame(() => {
          const element = targetDomRef.value;
          if (!element) return;
          const ownerWindow = element.ownerDocument.defaultView;
          const rect = element.getBoundingClientRect();
          const adsorbed = resolveFloatButtonAdsorbedPosition(
            position,
            {
              width: ownerWindow?.innerWidth ?? 0,
              height: ownerWindow?.innerHeight ?? 0,
            },
            { width: rect.width || 40, height: rect.height || 40 },
            24,
            adsorbBottomProp.value,
          );
          currentPosition.value = adsorbed;
          updatePosition(adsorbed);
        });
      },
    });

    const badgeProps = computed(() => {
      if (!badgeProp.value) return { hidden: true };
      return getBadgeDefaultOption(
        badgeProp.value,
        groupProps?.shape.value ?? shapeProp.value,
        hasIcon.value,
        hasDescription.value,
      );
    });

    function pushToStack() {
      const item = { id: uuid, hasIconAndDescription: hasIcon.value && hasDescription.value };
      const index = mountedStack.value.findIndex(current => current.id === uuid);
      if (index < 0) mountedStack.value.push(item);
      else mountedStack.value[index] = item;
    }

    function removeFromStack() {
      mountedStack.value = mountedStack.value.filter(current => current.id !== uuid);
    }

    watch(
      [visibleComputed, canPushToStack, hasIcon, hasDescription, hasDragged],
      ([visible, stackable, , , dragged]) => {
        if (visible && stackable && !dragged) pushToStack();
        else removeFromStack();
        if (!visible) {
          hasDragged.value = false;
          currentPosition.value = undefined;
        }
      },
      { immediate: true },
    );

    expose({
      show: () => emit('update:visible', true),
      hide: () => emit('update:visible', false),
      focus: () => targetDomRef.value?.focus(),
    });
    onBeforeUnmount(removeFromStack);

    return () => {
      const href = props.href;
      const { class: attrClass, disabled, ...restAttrs } = attrs;
      const action = h(
        href ? 'a' : 'button',
        {
          ...restAttrs,
          ref: targetDomRef,
          href,
          target: href ? props.target : undefined,
          type: href ? undefined : 'button',
          disabled: href ? undefined : disabled,
          'aria-disabled': href && disabled ? 'true' : undefined,
          'aria-label': props.ariaLabel,
          class: cls(
            classHelper.block,
            classHelper.m(groupProps?.shape.value ?? shapeProp.value),
            classHelper.m(groupProps?.type.value ?? typeProp.value),
            classHelper.is('draggable', hasDragged.value),
            classHelper.is('dragging', isDragging.value),
            classHelper.is('static', !canPushToStack.value),
            attrClass as never,
          ),
          style: [
            { display: isVisible.value ? undefined : 'none' },
            draggableProp.value && hasDragged.value
              ? isDragging.value
                ? style.value
                : currentPosition.value
                  ? { left: `${currentPosition.value.x}px`, top: `${currentPosition.value.y}px` }
                  : ''
              : {
                  bottom: stackPosition.value.inStack
                    ? `calc(${cssVariable('float-button', 'spacing', 'bottom')} + ((${cssVariable(
                        'float-button-spacing-gap',
                      )} + ${cssVariable('float-button', 'size')}) * ${stackPosition.value.index}) + (${cssVariable('float-button', 'size', 'large')} - ${cssVariable('float-button', 'size')}) * ${stackPosition.value.precedingLargeCount})`
                    : undefined,
                },
            attrs.style,
          ],
          onClick: (event: MouseEvent) => emit('click', event),
        },
        <HBadge {...badgeProps.value}>
          <HTooltip
            placement="left"
            popperReferenceHidden={false}
            size="small"
            {...tooltipOptions.value}
            disabled={Object.keys(tooltipOptions.value).length === 0}
          >
            <div
              class={cls(
                classHelper.e('inner'),
                classHelper.e('inner_all', hasIcon.value && hasDescription.value),
              )}
            >
              {hasIcon.value && (
                <div class={classHelper.e('icon')}>
                  {renderIcon(iconProp.value, slots.icon, { size: 20 })}
                </div>
              )}
              {hasDescription.value && (
                <div class={classHelper.e('description')}>
                  {slots.description?.() ?? descriptionProp.value}
                </div>
              )}
            </div>
          </HTooltip>
        </HBadge>,
      );
      return <HTransition appear>{action}</HTransition>;
    };
  },
});
