import type { HorizonWebComponentInstance } from '@aurora/utils';
import {
  cls,
  ComponentClassBlock,
  isBoolean,
  isVNodeEmpty,
  useNamespace,
  safelyGetEventTarget,
  sizeUnitTransform,
} from '@aurora/utils';
import type { CSSProperties } from 'vue';
import {
  Fragment,
  computed,
  defineComponent,
  inject,
  isVNode,
  nextTick,
  ref,
  toRef,
  watch,
  watchEffect,
} from 'vue';
import useLocaleLang from '~/utils/useLocaleLang';
import { renderIcon } from '~/utils/useIcon';
import {
  HPickerEmitsInjectKey,
  HPickerInputStatusInjectKey,
  HPickerPopContentDomRefInjectKey,
  HPickerPopperVisibleInjectKey,
  HPickerPropsInjectKey,
  HPickerSlotsInjectKey,
  HPickerStatusInjectKey,
} from '../utils/InjectKeys';
import useSize from '~/utils/useSize';
import { IconCloseFilled } from '@aurora/icon';
import { unrefElement, useResizeObserver } from '@vueuse/core';
import PickerFitContentInput from './PickerFitContentInput';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import useOverflow from '~/utils/useOverflow';
import type { PickerFitContentInputExposes } from '../composables/useExposes';
import { usePickerInputExposes } from '../composables/useExposes';
import PickerPureInput from './PickerPureInput';

export default defineComponent({
  name: `${useNamespace()}PickerInput`,
  emits: {
    /**
     * 切换 popper 显隐通知
     * @param visible 是否显示
     */
    switchPopperVisible: (visible: boolean) => isBoolean(visible),
    /**
     * 点击事件
     * @param evt 点击事件
     */
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
    /**
     * 聚焦事件
     * @param evt 失焦事件对象
     */
    focus: (evt: FocusEvent) => evt instanceof Event,
    /**
     * 失焦事件
     * @param evt 失焦事件对象
     */
    blur: (evt: FocusEvent) => evt instanceof Event,
  },
  exposes: usePickerInputExposes,
  setup(props, { emit, expose }) {
    const classHelper = new ComponentClassBlock('picker');

    const inputWrapperDomRef = ref<HTMLElement | null>(null);
    const inputDomRef = ref<HorizonWebComponentInstance<
      typeof PickerPureInput,
      PickerFitContentInputExposes
    > | null>(null);
    const fitContentInputDomRef = ref<HorizonWebComponentInstance<
      typeof PickerFitContentInput,
      PickerFitContentInputExposes
    > | null>(null);
    const inputPrependDomRef = ref<HTMLDivElement | null>(null);

    const parentProps = inject(HPickerPropsInjectKey)!;
    const parentEmit = inject(HPickerEmitsInjectKey)!;
    const parentSlots = inject(HPickerSlotsInjectKey)!;
    const popperVisible = inject(HPickerPopperVisibleInjectKey)!;
    const pickerStatus = inject(HPickerStatusInjectKey)!;
    const inputStatus = inject(HPickerInputStatusInjectKey)!;
    const popContentDomRef = inject(HPickerPopContentDomRefInjectKey)!;

    const currentInputDomRef = computed(() =>
      parentProps.useFitContentInput ? fitContentInputDomRef.value : inputDomRef.value,
    );

    const size = useSize(toRef(parentProps, 'size'), 'medium');

    const inputStyle = ref<CSSProperties>({ userSelect: 'none' });

    const isMouseOver = ref(false);
    const isFocused = ref(false);
    const isShowTooltip = ref(false);

    const showClearIcon = computed(
      () =>
        !parentProps.disabled &&
        parentProps.clearable &&
        !!parentProps.modelValue &&
        (isMouseOver.value || isFocused.value),
    );

    const isRotateAppendIcon = computed(
      () => popperVisible.value && !showClearIcon.value && !parentProps.loading,
    );

    const placeholder = computed(() => {
      if (
        parentProps.modelValueRegardAsPlaceholder &&
        parentProps.modelValue &&
        parentProps.modelValue.length > 0 &&
        (popperVisible.value || isInputFocus.value)
      ) {
        return parentProps.modelValue;
      } else {
        return parentProps.placeholder ?? (useLocaleLang('select.placeholder').value as string);
      }
    });

    function onMouseEnter() {
      isMouseOver.value = true;
      isInputValueIsOverflow();
    }

    function onMouseLeave() {
      isMouseOver.value = false;
      isShowTooltip.value = false;
    }

    function isInputValueIsOverflow() {
      if (currentInputDomRef.value && !isInputFocus.value) {
        if (parentProps.useFitContentInput) {
          isShowTooltip.value =
            !!inputValue.value.trim() &&
            useOverflow(fitContentInputDomRef.value!.input as HTMLInputElement);
        } else {
          isShowTooltip.value = !!inputValue.value && useOverflow(inputDomRef.value?.input);
        }
      }
    }

    /******* focus/blur ********/

    const inputValue = ref('');
    const tooltipShowContent = ref('');
    const isInputFocus = ref(false);
    function onInputFocus(evt: FocusEvent) {
      isInputFocus.value = true;
      emit('focus', evt);
    }

    function onInputBlur(evt: FocusEvent) {
      isInputFocus.value = false;

      if (
        evt.relatedTarget &&
        !inputWrapperDomRef.value?.contains(evt.relatedTarget as Node) &&
        !unrefElement(popContentDomRef.value)?.contains(evt.relatedTarget as Node)
      ) {
        emit('switchPopperVisible', false);
      }
      emit('blur', evt);
    }

    let tooltipShowContentDelayTimer: NodeJS.Timeout | null = null;

    function clearTooltipShowContentDelayTimer() {
      if (tooltipShowContentDelayTimer) {
        clearTimeout(tooltipShowContentDelayTimer);
        tooltipShowContentDelayTimer = null;
      }
    }

    watch(
      inputValue,
      val => {
        clearTooltipShowContentDelayTimer();
        if (!val) {
          isShowTooltip.value = false;
          tooltipShowContentDelayTimer = setTimeout(() => {
            tooltipShowContent.value = val;
          }, 400);
        } else {
          tooltipShowContent.value = val;
        }
      },
      {
        immediate: true,
      },
    );

    watch(isInputFocus, val => {
      if (val) {
        isShowTooltip.value = false;
      }
    });

    watchEffect(() => {
      if (isInputFocus.value || popperVisible.value) {
        if (
          parentProps.modelValueRegardAsPlaceholder &&
          parentProps.modelValue &&
          parentProps.modelValue.length > 0
        ) {
          inputValue.value = '';
          return;
        }
      }

      inputValue.value = parentProps.modelValue || '';
    });

    function onClear(evt: MouseEvent) {
      evt.stopPropagation();
      parentEmit('clear', evt);
      nextTick(() => {
        isInputValueIsOverflow();
      });
    }

    function onInput(evt: Event) {
      const target = safelyGetEventTarget(evt) as HTMLInputElement;
      inputValue.value = target.value;
      onUpdateModelValue(inputValue.value);
      parentEmit('input', evt);
    }

    function onUpdateModelValue(value: string | number) {
      parentEmit('update:modelValue', value.toString());
    }

    function onClick(evt: MouseEvent) {
      onInputFocus(evt);
      emit('click', evt);
    }

    function getPickerInnerContent() {
      const content = parentSlots.pickerInner?.(
        parentProps.modelValue,
        inputStatus.value,
        pickerStatus.value,
        onInputFocus,
        onInputBlur,
      );

      return Array.isArray(content) && isVNodeEmpty(content) ? undefined : content;
    }

    useResizeObserver(inputPrependDomRef, ([entry]) => {
      inputStyle.value.width =
        (inputWrapperDomRef.value?.clientWidth || 0) - entry.contentRect.width + 'px';
    });

    expose({
      input: inputDomRef.value || fitContentInputDomRef.value,
      focus() {
        if (parentProps.inputable) {
          !isInputFocus.value && currentInputDomRef.value?.focus();
        } else {
          inputWrapperDomRef.value?.focus();
        }
      },
      blur() {
        if (parentProps.inputable) {
          isInputFocus.value && currentInputDomRef.value?.blur();
        } else {
          inputWrapperDomRef.value?.blur();
        }
      },
      forceBlur() {
        isInputFocus.value = false;
        currentInputDomRef.value?.forceBlur();
      },
    });

    return () => {
      const pickerInnerContent = getPickerInnerContent();

      return (
        <div
          ref={inputWrapperDomRef}
          class={cls(
            classHelper.e('input'),
            classHelper.em('input', size.value),
            classHelper.em('input', parentProps.inputStyle),
            classHelper.is('active', popperVisible.value),
            classHelper.is('inputable', parentProps.inputable),
            classHelper.is('disabled', parentProps.disabled),
            classHelper.is('focusing', isInputFocus.value),
            classHelper.is('readonly', !parentProps.inputable || parentProps.readonly),
            classHelper.is(parentProps.inputStatus),
          )}
          tabindex={parentProps.tabIndex}
          style={{
            width: sizeUnitTransform(parentProps.pickerWidth),
            minWidth: sizeUnitTransform(parentProps.pickerMinWidth),
            maxWidth: sizeUnitTransform(parentProps.pickerMaxWidth),
          }}
          onMouseenter={onMouseEnter}
          onMouseleave={onMouseLeave}
          onFocus={evt => ((parentProps.tabIndex ?? -1) >= 0 ? onInputFocus(evt) : undefined)}
          onBlur={evt => ((parentProps.tabIndex ?? -1) >= 0 ? onInputBlur(evt) : undefined)}
          onKeydown={evt => parentEmit('keydown', evt)}
          onClick={onClick}
        >
          {parentSlots.picker?.(
            parentProps.modelValue,
            inputStatus.value,
            pickerStatus.value,
            onInputFocus,
            onInputBlur,
          ) ?? (
            <Fragment>
              {parentProps.pickerPrefixIcon && (
                <div class={classHelper.em('input', 'prepend-icon')}>
                  {renderIcon(parentProps.pickerPrefixIcon)}
                </div>
              )}
              {parentSlots.pickerContainer?.(
                parentProps.modelValue,
                inputStatus.value,
                pickerStatus.value,
                onInputFocus,
                onInputBlur,
              ) ?? (
                <div class={cls(classHelper.em('input', 'container'))}>
                  {parentSlots.pickerPrefix?.(
                    parentProps.modelValue,
                    inputStatus.value,
                    pickerStatus.value,
                  )}
                  {pickerInnerContent}
                  {(!pickerInnerContent || parentProps.hideInput) && (
                    <HTooltip
                      trigger="manual"
                      visible={isShowTooltip.value}
                      content={tooltipShowContent.value}
                    >
                      {parentProps.useFitContentInput ? (
                        <PickerFitContentInput
                          data-focus-visible-proxy=""
                          v-show={!parentProps.hideInput}
                          v-model={inputValue.value}
                          ref={fitContentInputDomRef}
                          class={cls(
                            classHelper.em('input', 'inner'),
                            classHelper.is('main'),
                            classHelper.is(
                              'readonly',
                              !parentProps.inputable || parentProps.readonly,
                            ),
                          )}
                          disabled={parentProps.disabled}
                          readonly={!parentProps.inputable || parentProps.readonly}
                          placeholder={placeholder.value}
                          style={inputStyle.value}
                          tabindex="0"
                          autocomplete="off"
                          unselectable="on"
                          minWidth={parentProps.fitContentInputMinWidth}
                          onInput={onInput}
                          onFocus={onInputFocus}
                          onBlur={onInputBlur}
                          onCompositionStart={(evt: CompositionEvent) =>
                            parentEmit('compositionStart', evt)
                          }
                          onCompositionUpdate={(evt: CompositionEvent) =>
                            parentEmit('compositionUpdate', evt)
                          }
                          onCompositionEnd={(evt: CompositionEvent) =>
                            parentEmit('compositionEnd', evt)
                          }
                        />
                      ) : (
                        <PickerPureInput
                          data-focus-visible-proxy=""
                          v-show={!parentProps.hideInput}
                          ref={inputDomRef}
                          modelValue={inputValue.value}
                          class={cls(
                            classHelper.em('input', 'inner'),
                            classHelper.is('main'),
                            classHelper.is(
                              'readonly',
                              !parentProps.inputable || parentProps.readonly,
                            ),
                          )}
                          disabled={parentProps.disabled}
                          readonly={!parentProps.inputable || parentProps.readonly}
                          placeholder={placeholder.value}
                          style={inputStyle.value}
                          tabindex="0"
                          autocomplete="off"
                          unselectable="on"
                          onInput={onInput}
                          onFocus={onInputFocus}
                          onBlur={onInputBlur}
                          onCompositionStart={(evt: CompositionEvent) =>
                            parentEmit('compositionStart', evt)
                          }
                          onCompositionUpdate={(evt: CompositionEvent) =>
                            parentEmit('compositionUpdate', evt)
                          }
                          onCompositionEnd={(evt: CompositionEvent) =>
                            parentEmit('compositionEnd', evt)
                          }
                        />
                      )}
                    </HTooltip>
                  )}
                  {parentSlots.pickerSuffix?.(
                    parentProps.modelValue,
                    inputStatus.value,
                    pickerStatus.value,
                  )}
                </div>
              )}

              {showClearIcon.value && (
                <div
                  class={cls(classHelper.em('input', 'icon'), classHelper.is('clear'))}
                  onClick={onClear}
                >
                  <IconCloseFilled size={16} class={classHelper.em('input', 'close')} />
                </div>
              )}

              {(!!parentProps.dropdownIcon || parentProps.preserveSuffixIconSpace) && (
                <div class={cls(classHelper.em('input', 'append-icon'))}>
                  {parentProps.loading ? (
                    <div class={cls(classHelper.em('input', 'icon'), classHelper.is('loading'))}>
                      {renderIcon(parentProps.loadingIcon, undefined, {
                        class: classHelper.is('loading'),
                        size: 12,
                      })}
                    </div>
                  ) : parentProps.inputIsSearching && popperVisible.value ? (
                    <div class={cls(classHelper.em('input', 'icon'), classHelper.is('search'))}>
                      {renderIcon(parentProps.searchIcon, undefined, {
                        class: cls(classHelper.em('input', 'search')),
                        size: 16,
                      })}
                    </div>
                  ) : (
                    <div class={cls(classHelper.em('input', 'icon'), classHelper.is('dropdown'))}>
                      {renderIcon(parentProps.dropdownIcon, parentSlots.pickerIcon, {
                        class: cls(
                          classHelper.em('input', 'dropdown'),
                          classHelper.is(
                            'rotated',
                            parentProps.dropdownIconCanTurned && isRotateAppendIcon.value,
                          ),
                        ),
                        size: isVNode(parentProps.dropdownIcon)
                          ? (parentProps.dropdownIcon?.props?.size ?? 12)
                          : 12,
                      })}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          )}
        </div>
      );
    };
  },
});
