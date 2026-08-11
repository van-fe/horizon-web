import type { CSSProperties } from 'vue';
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { IconCheck, IconClose } from '@aurora/icon';
import {
  getStepDisplayNumber,
  getStepLayout,
  getStepNextStatus,
  getStepStatus,
  isStepClickable,
} from '@aurora/core';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { nanoid } from 'nanoid';
import type { StepEmits } from './composables/useEmits';
import { useStepEmits } from './composables/useEmits';
import { useStepProps } from './composables/useProps';
import type { StepSlots } from './composables/useSlots';
import { useStepSlots } from './composables/useSlots';
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
  desc: '步骤条中的单个步骤',
  descLocales: { en: 'A single step within Steps.' },
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

    const position = computed(() =>
      Math.max(
        0,
        items.value.findIndex(item => item.uuid === uuid),
      ),
    );
    const isClickable = computed(() =>
      isStepClickable(props.clickable, parentProps.clickable, props.disabled),
    );
    const currentStatus = computed(() =>
      getStepStatus(index.value, activeIndex.value, parentProps.status, props.disabled),
    );
    const nextStatus = computed(() =>
      getStepNextStatus(index.value, activeIndex.value, parentProps.status),
    );
    const stepStyle = computed<CSSProperties>(
      () =>
        getStepLayout(
          position.value,
          items.value.length,
          parentProps.direction,
          parentProps.labelPlacement,
          parentProps.labelAlign,
          parentProps.progressDot,
        ) as CSSProperties,
    );

    function activate(evt: MouseEvent | KeyboardEvent): void {
      if (!isClickable.value) return;
      emit('click', evt, index.value);
      void onClickStep(index.value);
    }

    function onKeyDown(evt: KeyboardEvent): void {
      if (evt.key !== 'Enter' && evt.key !== ' ') return;
      evt.preventDefault();
      activate(evt);
    }

    onMounted(() => {
      stepsCollect(
        props,
        uuid,
        value => (index.value = value),
        () => index.value,
      );
    });
    onBeforeUnmount(() => stepsRemove(props, uuid));

    function renderIcon() {
      if (slots.icon) return slots.icon();
      if (parentProps.progressDot) return undefined;
      if (currentStatus.value === 'finish')
        return <IconCheck size={sizeRef.value === 'medium' ? 16 : 12} />;
      if (currentStatus.value === 'error')
        return <IconClose size={sizeRef.value === 'medium' ? 16 : 12} />;
      return (
        <div class={classHelper.em('icon', 'number')}>{getStepDisplayNumber(index.value)}</div>
      );
    }

    return () => {
      const subtitle = slots.subtitle?.() ?? props.subtitle;
      const description = slots.description?.() ?? props.description;
      return (
        <div
          class={cls(
            classHelper.block,
            classHelper.is(currentStatus.value),
            classHelper.is('dot', parentProps.progressDot),
            classHelper.is(`next-${nextStatus.value}`, position.value < items.value.length - 1),
            classHelper.is('clickable', isClickable.value),
          )}
          style={stepStyle.value}
          data-index={index.value}
          role={isClickable.value ? 'button' : undefined}
          tabindex={isClickable.value ? 0 : undefined}
          aria-current={activeIndex.value === index.value ? 'step' : undefined}
          aria-disabled={props.disabled || undefined}
          onClick={activate}
          onKeydown={onKeyDown}
        >
          <div class={classHelper.e('wrapper')}>
            <div class={classHelper.e('tail')}></div>
            <div class={classHelper.e('icon')}>{renderIcon()}</div>
            <div class={classHelper.e('content')}>
              <div class={classHelper.em('content', 'title')}>{slots.title?.() ?? props.title}</div>
              {subtitle && <div class={classHelper.em('content', 'subtitle')}>{subtitle}</div>}
              {description && (
                <div class={classHelper.em('content', 'description')}>{description}</div>
              )}
            </div>
          </div>
        </div>
      );
    };
  },
});
