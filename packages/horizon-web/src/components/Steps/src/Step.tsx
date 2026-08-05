import type { CSSProperties } from 'vue';
import { defineComponent, inject, ref, onBeforeUnmount, computed, onMounted } from 'vue';
import { useStepProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import { IconCheck, IconClose } from '@aurora/icon';
import type { StepEmits } from './composables/useEmits';
import { useStepEmits } from './composables/useEmits';
import type { StepSlots } from './composables/useSlots';
import { useStepSlots } from './composables/useSlots';
import { nanoid } from 'nanoid';
import {
  HStepsActiveIndexInjectKey,
  HStepsCollectInjectKey,
  HStepsItemsInjectKey,
  HStepsOnClickStepInjectKey,
  HStepsPropsInjectKey,
  HStepsRemoveInjectKey,
  HStepsSizeInjectKey,
} from './utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}Step`,
  desc: "步骤条中的单个步骤",
  descLocales: { en: "A single step within Steps." },
  props: useStepProps,
  emits: useStepEmits,
  slots: useStepSlots,
  setup(props, { slots, emit }: HorizonWebSetupContext<StepEmits, StepSlots>) {
    const uuid = nanoid();
    const classHelper = new ComponentClassBlock('step');
    const index = ref(-1);

    const parentProps = inject(HStepsPropsInjectKey)!;
    const stepsCollect = inject(HStepsCollectInjectKey)!;
    const stepsRemove = inject(HStepsRemoveInjectKey)!;
    const activeIndex = inject(HStepsActiveIndexInjectKey)!;
    const items = inject(HStepsItemsInjectKey)!;
    const onClickStep = inject(HStepsOnClickStepInjectKey)!;
    const sizeRef = inject(HStepsSizeInjectKey)!;

    const isClickable = computed(
      () => !props.disabled && (props.clickable ?? parentProps.clickable),
    );

    const currentStatus = computed(() => {
      if (props.disabled) {
        return 'disabled';
      } else if (activeIndex.value > index.value) {
        return 'finish';
      } else if (activeIndex.value === index.value) {
        return parentProps.status;
      } else {
        return 'wait';
      }
    });

    const nextStatus = computed(() => {
      if (activeIndex.value > index.value + 1) {
        return 'finish';
      } else if (activeIndex.value === index.value + 1) {
        return parentProps.status;
      } else {
        return 'wait';
      }
    });

    const stepStyle = computed(() => {
      const style: CSSProperties = {};

      if (
        parentProps.labelAlign === 'center' &&
        (parentProps.labelPlacement === 'vertical' || parentProps.progressDot)
      ) {
        style.flex = `1 1 ${(1 / items.value.length) * 100}%`;
      } else {
        if (index.value < items.value.length - 1 + parentProps.initial) {
          style.flex = `1 1 ${(1 / (items.value.length - 1)) * 100}%`;
        } else {
          style.flex = 'auto 0 0';

          if (parentProps.direction === 'vertical') {
            style.maxHeight = `${(1 / items.value.length) * 100}%`;
          } else {
            style.maxWidth = `${(1 / items.value.length) * 100}%`;
          }
        }
      }

      return style;
    });

    function onClick(evt: MouseEvent) {
      if (isClickable.value) {
        emit('click', evt, index.value);

        onClickStep(index.value);
      }
    }

    function onKeyDown(evt: KeyboardEvent) {
      if ((evt.key === 'Enter' || evt.key === ' ') && isClickable.value) {
        evt.preventDefault();
        emit('click', evt, index.value);

        onClickStep(index.value);
      }
    }

    onMounted(() => {
      stepsCollect(
        props,
        uuid,
        i => {
          index.value = i;
        },
        () => index.value,
      );
    });

    onBeforeUnmount(() => {
      stepsRemove(props, uuid);
    });

    const renderIcon = () => {
      if (slots.icon) {
        return slots.icon();
      }

      if (parentProps.progressDot) {
        return undefined;
      }

      switch (currentStatus.value) {
        case 'finish':
          return <IconCheck size={sizeRef.value === 'medium' ? 16 : 12} />;
        case 'error':
          return <IconClose size={sizeRef.value === 'medium' ? 16 : 12} />;
        default:
          return (
            <div class={classHelper.em('icon', 'number')}>
              {index.value + 1 + parentProps.initial}
            </div>
          );
      }
    };

    return () => {
      return (
        <div
          class={cls(
            classHelper.block,
            classHelper.is(currentStatus.value),
            classHelper.is('dot', parentProps.progressDot),
            classHelper.is(`next-${nextStatus.value}`, index.value < items.value.length - 1),
            classHelper.is('clickable', isClickable.value),
          )}
          style={stepStyle.value}
          data-index={index.value}
          role={isClickable.value ? 'button' : undefined}
          tabindex={isClickable.value ? 0 : undefined}
          aria-current={activeIndex.value === index.value ? 'step' : undefined}
          aria-disabled={props.disabled || undefined}
          onClick={onClick}
          onKeydown={onKeyDown}
        >
          <div class={classHelper.e('wrapper')}>
            <div class={classHelper.e('tail')}></div>
            <div class={classHelper.e('icon')}>{renderIcon()}</div>
            <div class={classHelper.e('content')}>
              <div class={classHelper.em('content', 'title')}>{slots.title?.() ?? props.title}</div>
              {(slots.subtitle?.() || props.subtitle) && (
                <div class={classHelper.em('content', 'subtitle')}>
                  {slots.subtitle?.() || props.subtitle}
                </div>
              )}
              {(slots.description?.() || props.description) && (
                <div class={classHelper.em('content', 'description')}>
                  {slots.description?.() || props.description}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };
  },
});
