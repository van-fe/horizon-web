import { defineComponent } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, cls, isNil, useNamespace } from '@aurora/utils';
import { IconAdd, IconArrowDown, IconArrowUp, IconCloseFilled, IconReduce } from '@aurora/icon';
import { useInputNumberProps } from './composables/useProps';
import type { InputNumberEmits } from './composables/useEmits';
import { useInputNumberEmits } from './composables/useEmits';
import type { InputNumberSlots } from './composables/useSlots';
import { useInputNumberSlots } from './composables/useSlots';
import type { InputNumberExposes } from './composables/useExposes';
import { useInputNumberExposes } from './composables/useExposes';
import { useInputNumber } from './hooks/useInputNumber';
import { useInputNumberLayout } from './hooks/useInputNumberLayout';
import { renderIcon } from '~/utils/useIcon';
import useLocaleLang from '~/utils/useLocaleLang';

export default defineComponent({
  name: `${useNamespace()}InputNumber`,
  desc: '提供一个数字输入框，可以设置最小值、最大值和步长等，返回一个数字',
  props: useInputNumberProps,
  emits: useInputNumberEmits,
  slots: useInputNumberSlots,
  exposes: useInputNumberExposes,
  setup(
    props,
    {
      attrs,
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<InputNumberEmits, InputNumberSlots, InputNumberExposes>,
  ) {
    const classHelper = new ComponentClassBlock('input-number');
    const controller = useInputNumber(props, emit);
    const layout = useInputNumberLayout(props, slots);
    const defaultPlaceholder = useLocaleLang('inputNumber.placeholder');

    const {
      blur,
      decreaseValue,
      enableIncrease,
      enableReduce,
      focus,
      formError,
      formattedValue,
      handleBlur,
      handleClear,
      handleClickStep,
      handleFocus,
      handleInput,
      handleKeydown,
      handleLongPress,
      handleWheel,
      increaseValue,
      inputDomRef,
      isDisabled,
      isFocused,
      localValue,
    } = controller;
    const {
      hasPrefix,
      hasSuffix,
      handleMouseEnter,
      handleMouseLeave,
      iconSize,
      isMouseOver,
      prefixWrapperExist,
      sizeRef,
      suffixWrapperExist,
    } = layout;

    expose({
      inputNumber: inputDomRef,
      increase: increaseValue,
      decrease: decreaseValue,
      localValue: localValue.value,
      enableIncrease: enableIncrease.value,
      clear: handleClear,
      focus,
      blur,
    });

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.m(sizeRef.value),
          classHelper.m(props.inputStyle),
          classHelper.is('disabled', isDisabled.value),
          classHelper.is('no-controls', !props.controls || props.readonly),
          classHelper.is('right-controls', props.controlsPosition === 'right'),
          classHelper.is('between-controls', props.controlsPosition === 'between'),
          classHelper.is('clearable', props.clearable),
          classHelper.is('error', !!formError?.value || props.status === 'error'),
          classHelper.is('inner-active', isMouseOver.value || isFocused.value),
          classHelper.has('prefix', hasPrefix.value),
          classHelper.has('suffix', hasSuffix.value),
        )}
      >
        <div class={classHelper.e('group')}>
          {slots.prepend && (
            <div class={classHelper.em('group', 'prepend')}>{slots.prepend()}</div>
          )}
          <div
            class={cls(
              classHelper.em('group', 'inner'),
              classHelper.has('prepend', !!slots.prepend),
              classHelper.has('append', !!slots.append),
            )}
            onMouseenter={() => handleMouseEnter(isDisabled.value)}
            onMouseleave={handleMouseLeave}
          >
            {prefixWrapperExist.value && (
              <div class={cls(classHelper.em('prefix', 'wrapper'))}>
                {props.controlsPosition === 'between' && (
                  <div
                    class={cls(
                      classHelper.e('step-wrapper'),
                      classHelper.is('left', props.controlsPosition === 'between'),
                    )}
                  >
                    <span
                      class={cls(
                        classHelper.e('step-item'),
                        classHelper.e('step-minus'),
                        classHelper.is('disabled', !enableReduce.value),
                      )}
                      data-trigger-type="down"
                      onClick={handleClickStep}
                      onMousedown={evt => handleLongPress(evt, 'down')}
                    >
                      <IconReduce size={12} />
                    </span>
                  </div>
                )}
                {hasPrefix.value && (
                  <div class={cls(classHelper.e('prefix'))} onClick={focus}>
                    {renderIcon(props.prefixIcon, slots.prefix, { size: iconSize.value })}
                  </div>
                )}
              </div>
            )}

            <input
              value={formattedValue.value}
              ref={inputDomRef}
              class={classHelper.e('inner')}
              name={props.name}
              {...attrs}
              data-focus-visible-proxy
              placeholder={props.placeholder ?? defaultPlaceholder.value as string}
              disabled={isDisabled.value}
              readonly={props.readonly}
              min={props.min}
              max={props.max}
              title=""
              step={props.step}
              onInput={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onWheel={handleWheel}
              onKeydown={handleKeydown}
              onKeypress={evt => emit('keypress', evt)}
              onKeyup={evt => emit('keyup', evt)}
            />

            {props.clearable && !isNil(localValue.value) && (
              <div class={classHelper.e('clear')} onClick={handleClear}>
                <IconCloseFilled size={16} />
              </div>
            )}

            {suffixWrapperExist.value && (
              <div class={cls(classHelper.em('suffix', 'wrapper'))}>
                {hasSuffix.value && (
                  <div class={cls(classHelper.e('suffix'))} onClick={focus}>
                    {renderIcon(props.suffixIcon, slots.suffix, { size: iconSize.value })}
                  </div>
                )}
                <div class={cls(classHelper.e('step-wrapper'), classHelper.is('right'))}>
                  <span
                    class={[
                      classHelper.e('step-up'),
                      classHelper.e('step-item'),
                      classHelper.is('disabled', !enableIncrease.value),
                    ]}
                    data-trigger-type="up"
                    onClick={handleClickStep}
                    onMousedown={evt => handleLongPress(evt, 'up')}
                  >
                    {props.controlsPosition === 'between' ? (
                      <IconAdd size={12} />
                    ) : (
                      <IconArrowUp size={9} />
                    )}
                  </span>
                  {props.controlsPosition === 'right' && (
                    <span
                      class={[
                        classHelper.e('step-down'),
                        classHelper.e('step-item'),
                        classHelper.is('disabled', !enableReduce.value),
                      ]}
                      data-trigger-type="down"
                      onClick={handleClickStep}
                      onMousedown={evt => handleLongPress(evt, 'down')}
                    >
                      <IconArrowDown size={9} />
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          {slots.append && (
            <div class={classHelper.em('group', 'append')}>{slots.append()}</div>
          )}
        </div>
      </div>
    );
  },
});
