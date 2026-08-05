import type { StyleValue } from 'vue';
import { computed, defineComponent, inject, nextTick, ref, watch } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import HButton from '~/components/Button/src/Button';
import HPopover from '~/components/Popover/src/Popover';
import HPopContent from '~/components/Popover/src/PopContent';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import type { LicensePlateInputEmits } from './composables/useEmits';
import { useLicensePlateInputEmits } from './composables/useEmits';
import type { LicensePlateInputExposes } from './composables/useExposes';
import { useLicensePlateInputExposes } from './composables/useExposes';
import { useLicensePlateInputProps } from './composables/useProps';
import type { LicensePlateInputSlots } from './composables/useSlots';
import { useLicensePlateInputSlots } from './composables/useSlots';
import type { LicensePlatePopoverInstance } from './hooks/useLicensePlateKeyboard';
import { useLicensePlateKeyboard } from './hooks/useLicensePlateKeyboard';
import { getLicensePlateType } from './utils';

export default defineComponent({
  name: `${useNamespace()}LicensePlateInput`,
  desc: '提供弹出或内联车牌键盘面板的中国大陆车牌号输入组件',
  descLocales: {
    en: 'Mainland China license plate input with a popover or inline keyboard panel.',
  },
  inheritAttrs: false,
  props: useLicensePlateInputProps,
  emits: useLicensePlateInputEmits,
  slots: useLicensePlateInputSlots,
  exposes: useLicensePlateInputExposes,
  setup(
    props,
    {
      emit,
      slots,
      attrs,
      expose,
    }: HorizonWebSetupContext<
      LicensePlateInputEmits,
      LicensePlateInputSlots,
      LicensePlateInputExposes
    >,
  ) {
    const classHelper = new ComponentClassBlock('license-plate-input');
    const locale = inject(localeInjectKey, defaultLocale);
    const rootRef = ref<HTMLElement>();
    const inlinePanelRef = ref<HTMLElement>();
    const inputRef = ref<HTMLInputElement>();
    const popoverRef = ref<LicensePlatePopoverInstance>();
    const touched = ref(false);
    const focused = ref(false);

    const labels = computed(
      () =>
        locale.value?.langService.td().horizonWeb.licensePlateInput ?? {
          label: 'License plate',
          provinceLabel: 'Province abbreviation',
          placeholder: 'Enter plate number',
          keyboardLabel: 'License plate keyboard',
          provincePlaceholder: 'Province',
          newEnergy: 'New energy',
          backspace: 'Backspace',
          clear: 'Clear',
          done: 'Done',
        },
    );

    const keyboard = useLicensePlateKeyboard({
      modelValue: () => props.modelValue,
      provinces: () => props.provinces,
      newEnergy: () => props.newEnergy,
      inlinePanel: () => props.inlinePanel,
      disabled: () => props.disabled,
      readonly: () => props.readonly,
      rootRef,
      inlinePanelRef,
      popoverRef,
      onInput(value) {
        const type = getLicensePlateType(value);
        emit('update:modelValue', value);
        emit('input', value, type);
      },
      onChange(value) {
        emit('change', value, getLicensePlateType(value));
      },
      onProvinceChange: province => emit('provinceChange', province),
      onClear: () => emit('clear'),
      onTouched: () => {
        touched.value = true;
      },
    });

    const plateType = computed(() => getLicensePlateType(keyboard.draft.value));
    const valid = computed(
      () => plateType.value === 'standard' || plateType.value === 'new-energy',
    );
    const showError = computed(
      () =>
        props.status === 'error' ||
        (props.validateOnBlur && touched.value && plateType.value !== 'empty' && !valid.value),
    );

    watch(valid, current => emit('validityChange', current, plateType.value));
    watch(
      () => [keyboard.activeIndex.value, keyboard.draft.value] as const,
      ([index]) => nextTick(() => inputRef.value?.setSelectionRange(index, index)),
    );

    function focus() {
      inputRef.value?.focus();
    }

    function blur() {
      inputRef.value?.blur();
      keyboard.close();
    }

    function select() {
      inputRef.value?.select();
      keyboard.open(0);
    }

    function validate() {
      touched.value = true;
      return { valid: valid.value, type: plateType.value, value: keyboard.draft.value };
    }

    function handleFocus(evt: FocusEvent) {
      focused.value = true;
      keyboard.open();
      emit('focus', evt);
    }

    function handleBlur(evt: FocusEvent) {
      window.setTimeout(() => {
        const activeElement = document.activeElement;
        if (
          rootRef.value?.contains(activeElement) ||
          inlinePanelRef.value?.contains(activeElement) ||
          popoverRef.value?.popoverDom?.contains(activeElement)
        ) {
          return;
        }
        focused.value = false;
        keyboard.close();
        touched.value = true;
        emit('blur', evt);
      });
    }

    function activateCell(index: number) {
      if (props.disabled || props.readonly) return;
      focus();
      if (index === 7) keyboard.activateNewEnergy();
      else keyboard.open(index);
    }

    const preserveInputFocusAttrs = {
      onMousedown: (evt: MouseEvent) => evt.preventDefault(),
    };

    function renderReference(bindRootRef = true) {
      return (
        <div
          ref={bindRootRef ? rootRef : undefined}
          class={cls(
            classHelper.block,
            classHelper.m(props.size, !!props.size),
            classHelper.m(props.inputStyle),
            classHelper.is('focused', focused.value),
            classHelper.is('disabled', props.disabled),
            classHelper.is('readonly', props.readonly),
            classHelper.is('error', showError.value),
            attrs.class as string,
          )}
          style={attrs.style as StyleValue}
          onClick={() => activateCell(Math.min(keyboard.draft.value.length, 7))}
        >
          <div class={classHelper.e('cells')} aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => {
              const character = keyboard.draft.value[index];
              const isNewEnergyCell = index === 7;
              const isActive = keyboard.panelVisible.value && keyboard.activeIndex.value === index;
              return (
                <span
                  class={cls(
                    classHelper.e('cell'),
                    classHelper.em('cell', 'active', isActive),
                    classHelper.em('cell', 'new-energy', isNewEnergyCell),
                    classHelper.em(
                      'cell',
                      'new-energy-enabled',
                      isNewEnergyCell && keyboard.expandedForNewEnergy.value,
                    ),
                  )}
                  onClick={(evt: MouseEvent) => {
                    evt.stopPropagation();
                    activateCell(index);
                  }}
                >
                  {character ||
                    (index === 0
                      ? labels.value.provincePlaceholder
                      : isNewEnergyCell
                        ? labels.value.newEnergy
                        : '')}
                </span>
              );
            })}
          </div>
          <input
            ref={inputRef}
            class={classHelper.e('native')}
            value={keyboard.draft.value}
            type="text"
            inputmode="none"
            autocomplete="off"
            disabled={props.disabled}
            readonly={props.readonly}
            aria-label={props.ariaLabel || labels.value.label}
            aria-valuetext={keyboard.draft.value || props.placeholder || labels.value.placeholder}
            aria-invalid={showError.value || undefined}
            aria-describedby={attrs['aria-describedby'] as string | undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeydown={keyboard.handleKeydown}
            onPaste={(evt: ClipboardEvent) => {
              evt.preventDefault();
              keyboard.replaceFromText(evt.clipboardData?.getData('text') ?? '');
            }}
            onInput={(evt: Event) =>
              keyboard.replaceFromText((evt.target as HTMLInputElement).value)
            }
          />
          {slots.suffix?.()}
        </div>
      );
    }

    function renderPanel() {
      return (
        <HPopContent>
          <div
            class={classHelper.e('keyboard')}
            role="group"
            aria-label={
              props.keyboardAriaLabel ||
              (keyboard.activeIndex.value === 0
                ? labels.value.provinceLabel
                : labels.value.keyboardLabel)
            }
          >
            <div
              class={cls(
                classHelper.e('key-grid'),
                classHelper.em('key-grid', 'province', keyboard.activeIndex.value === 0),
              )}
            >
              {keyboard.keyboardKeys.value.map(key => (
                <HButton
                  class={classHelper.e('key')}
                  type="normal"
                  size="small"
                  plain
                  active={
                    keyboard.draft.value[keyboard.activeIndex.value] === key ||
                    (keyboard.activeIndex.value === 0 &&
                      !keyboard.draft.value &&
                      key === props.defaultProvince)
                  }
                  aria-label={key}
                  {...preserveInputFocusAttrs}
                  onClick={() => keyboard.choose(key)}
                >
                  {key}
                </HButton>
              ))}
            </div>
            <div class={classHelper.e('actions')}>
              <HButton
                class={classHelper.e('action')}
                type="normal"
                size="small"
                plain
                disabled={!keyboard.draft.value}
                {...preserveInputFocusAttrs}
                onClick={keyboard.remove}
              >
                {labels.value.backspace}
              </HButton>
              {props.clearable && (
                <HButton
                  class={classHelper.e('action')}
                  type="normal"
                  size="small"
                  text
                  disabled={!keyboard.draft.value}
                  {...preserveInputFocusAttrs}
                  onClick={keyboard.clear}
                >
                  {labels.value.clear}
                </HButton>
              )}
              <HButton
                class={classHelper.e('action')}
                size="small"
                {...preserveInputFocusAttrs}
                onClick={keyboard.close}
              >
                {labels.value.done}
              </HButton>
            </div>
          </div>
        </HPopContent>
      );
    }

    expose({
      input: inputRef,
      focus,
      blur,
      select,
      open: () => {
        focus();
        keyboard.open();
      },
      close: keyboard.close,
      validate,
    });

    return () =>
      props.inlinePanel ? (
        <div ref={rootRef} class={classHelper.e('inline-layout')}>
          {renderReference(false)}
          {keyboard.panelVisible.value && (
            <div ref={inlinePanelRef} class={classHelper.e('inline-panel')}>
              {renderPanel()}
            </div>
          )}
        </div>
      ) : (
        <HPopover
          ref={popoverRef}
          trigger="manual"
          visible={keyboard.panelVisible.value}
          placement={props.placement}
          flip={props.flip}
          toBody={props.toBody}
          arrow={false}
          destroyOnHide={false}
          popperClass={classHelper.e('popper')}
          referenceClass={classHelper.e('popover-reference')}
        >
          {{ reference: renderReference, popper: renderPanel }}
        </HPopover>
      );
  },
});
