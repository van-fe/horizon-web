import { computed, defineComponent, inject, onBeforeUnmount, ref, toRefs, watch } from 'vue';
import { ComponentClassBlock, cls, useNamespace, cssVariable } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useFloatButtonProps } from './composables/useProps';
import { useFloatButtonEmits } from './composables/useEmits';
import { useFloatButtonSlots } from './composables/useSlots';
import { useFloatButtonExposes } from './composables/useExposes';
import type { FloatButtonProps } from './composables/useProps';
import type { FloatButtonEmits } from './composables/useEmits';
import type { FloatButtonSlots } from './composables/useSlots';
import type { FloatButtonExposes } from './composables/useExposes';
import HTransition from '~/components/Transition/src/Transition';
import { HFloatButtonGroupProps, HFloatButtonPassiveVisibleProps } from './utils/InjectedKeys';
import { nanoid } from 'nanoid';
import { mountedStack, mountedStackInfo } from './utils/mountedStack';
import { renderIcon } from '~/utils/useIcon';
import HBadge from '~/components/Badge/src/Badge';
import { getBadgeDefaultOption } from './utils/badgeOptions';
import type { Position } from '@vueuse/core';
import useDrag from './utils/useDrag';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';

export default defineComponent({
  name: `${useNamespace()}FloatButton`,
  desc: '悬浮按钮大多会独立出现在界面之上，提升整体的导航，拓展页面的功能，使应用的操作更加便捷',
  version: '2.7.0',
  components: {
    HTransition,
    HBadge,
  },
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

    const {
      shape: shapeProp,
      type: typeProp,
      icon: iconProp,
      description: descriptionProp,
      tooltip: tooltipProp,
      badge: badgeProp,
      visible: visibleProp,
      draggable: draggableProp,
      adsorbBottom: adsorbBottomProp,
      collapseButton: collapseButtonProp,
    } = toRefs(props);

    const targetDomRef = ref<HTMLElement | null>(null);
    const hasDragged = ref(false);

    const groupProps = inject(HFloatButtonGroupProps, undefined);
    const passiveVisible = inject(HFloatButtonPassiveVisibleProps, undefined);

    const stackIndex = computed(() => mountedStack.value.indexOf(uuid));
    const stackInfoIndex = computed(() => {
      const arr = Array(mountedStackInfo.value.length + 1).fill(0);
      for (let i = 1; i <= mountedStackInfo.value.length; i++) {
        arr[i] = arr[i - 1] + (mountedStackInfo.value[i - 1]?.hasIconDesc ? 1 : 0);
      }
      return arr;
    });
    const isInStack = computed(() => stackIndex.value >= 0);

    const hasIcon = computed(() => !!(iconProp?.value || slots.icon));
    const hasDescription = computed(() => !!(slots.description || descriptionProp?.value));

    const visibleComputed = computed(() => groupProps?.visible ?? visibleProp.value);
    const canPushToStack = computed(
      () => !groupProps || (!!groupProps && (!groupProps.useCollapse || collapseButtonProp?.value)),
    );
    const isVisible = computed(() =>
      canPushToStack.value
        ? visibleComputed.value
        : passiveVisible?.value ?? (!groupProps?.useCollapse || collapseButtonProp?.value),
    );

    const tooltipOptions = computed<Partial<TooltipProps>>(() => {
      return typeof tooltipProp?.value === 'string'
        ? { content: tooltipProp.value }
        : tooltipProp?.value ?? {};
    });

    const currentPosition = ref<Position>();

    const { style, isDragging, updatePosition } = useDrag(targetDomRef, {
      disabled: draggableProp,
      initialValue: currentPosition.value ?? undefined,
      onStart() {
        if (draggableProp.value) {
          hasDragged.value = true;
          emit('dragStart');
          removeFromStack();
        } else return false;
      },
      onMove() {
        emit('dragging');
      },
      onEnd(position) {
        emit('dragEnd');
        requestAnimationFrame(() => {
          let x = position.x;
          let y = position.y;

          if (window.innerWidth - x < window.innerHeight - y || !adsorbBottomProp.value) {
            x = window.innerWidth - 24 - 40;
          } else {
            y = window.innerHeight - 24 - 40;
          }

          currentPosition.value = {
            x,
            y,
          };

          updatePosition(currentPosition.value);
        });
      },
    });

    const badgeProps = computed(() => {
      if (!badgeProp?.value) return { hidden: true };

      return getBadgeDefaultOption(
        badgeProp.value,
        shapeProp.value,
        hasIcon.value,
        hasDescription.value,
      );
    });

    watch(
      visibleComputed,
      val => {
        if (val) {
          pushToStack();

          requestAnimationFrame(() => {
            const rect = targetDomRef.value?.getBoundingClientRect();

            if (rect) {
              currentPosition.value = {
                x: rect.x,
                y: rect.y,
              };
            }
          });
        } else {
          removeFromStack();
          hasDragged.value = false;
        }
      },
      {
        immediate: true,
      },
    );

    function pushToStack() {
      removeFromStack();
      if (canPushToStack.value) {
        mountedStack.value.push(uuid);
        mountedStackInfo.value.push({ uuid, hasIconDesc: hasIcon.value && hasDescription.value });
      }
    }

    function removeFromStack() {
      if (isInStack.value) {
        setTimeout(() => {
          mountedStack.value = mountedStack.value.filter(curr => curr !== uuid);
          mountedStackInfo.value = mountedStackInfo.value.filter(curr => curr.uuid !== uuid);
        }, 300);
      }
    }

    expose({});

    onBeforeUnmount(() => {
      removeFromStack();
    });

    return () => (
      <HTransition appear>
        <div
          ref={targetDomRef}
          v-show={isVisible.value}
          class={cls(
            classHelper.block,
            classHelper.m(groupProps?.shape ?? shapeProp.value),
            classHelper.m(groupProps?.type ?? typeProp.value),
            classHelper.is('draggable', hasDragged.value),
            classHelper.is('dragging', isDragging.value),
            classHelper.is('static', !canPushToStack.value),
          )}
          style={[
            draggableProp.value && hasDragged.value
              ? isDragging.value
                ? style.value
                : currentPosition.value
                  ? { left: currentPosition.value.x + 'px', top: currentPosition.value.y + 'px' }
                  : ''
              : {
                  bottom: isInStack.value
                    ? `calc(${cssVariable('float-button-spacing-bottom')} + ((${cssVariable(
                        'float-button-spacing-gap',
                      )} + ${cssVariable('float-button-size')}) * ${stackIndex.value}) + (${cssVariable('float-button-size--large')} - ${cssVariable('float-button-size')}) * ${stackInfoIndex.value[stackIndex.value]})`
                    : undefined,
                },
          ]}
          {...attrs}
          onClick={evt => emit('click', evt)}
        >
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
                  <div class={cls(classHelper.e('icon'))}>
                    {renderIcon(iconProp?.value, slots.icon, {
                      size: 20,
                    })}
                  </div>
                )}
                {hasDescription.value && (
                  <div class={cls(classHelper.e('description'))}>
                    {slots.description?.() ?? descriptionProp?.value}
                  </div>
                )}
              </div>
            </HTooltip>
          </HBadge>
        </div>
      </HTransition>
    );
  },
});
