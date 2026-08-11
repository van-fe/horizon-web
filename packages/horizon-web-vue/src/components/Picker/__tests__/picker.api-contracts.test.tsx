import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { defineComponent, h, nextTick, reactive, ref } from 'vue';
import HPicker from '../src/Picker';
import { usePickerEmits, usePickerPureInputEmits } from '../src/composables/useEmits';
import { isModelValue, usePickerProps } from '../src/composables/useProps';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import type { PickerExposes } from '../src/composables/useExposes';
import PickerPopper from '../src/components/PickerPopper';
import PickerInput from '../src/components/PickerInput';
import {
  HPickerDomRefInjectKey,
  HPickerEmitsInjectKey,
  HPickerPopContentDomRefInjectKey,
  HPickerPopperVisibleInjectKey,
  HPickerPropsInjectKey,
  HPickerSlotsInjectKey,
  HPickerStatusInjectKey,
} from '../src/utils/InjectKeys';

describe('Picker public API contracts', () => {
  test('clearIcon renders custom content and drives the controlled clear contract', async () => {
    const ClearIcon = defineComponent({
      name: 'ContractClearIcon',
      setup: () => () => <span data-test="picker-clear-icon">Clear selection</span>,
    });
    const modelValue = ref('selected');
    const onClear = vi.fn((event: MouseEvent) => {
      expect(event).toBeInstanceOf(MouseEvent);
      modelValue.value = '';
    });
    const wrapper = mount(() => (
      <HPicker
        modelValue={modelValue.value}
        inputable
        clearable
        clearIcon={ClearIcon}
        toBody={false}
        onClear={onClear}
      />
    ));

    await wrapper.get('.h-picker__input').trigger('mouseenter');
    const clearIcon = wrapper.get('[data-test="picker-clear-icon"]');
    expect(clearIcon.text()).toBe('Clear selection');
    expect(clearIcon.classes()).toContain('h-picker__input--close');

    await wrapper.get('.h-picker__input--icon.is-clear').trigger('click');
    await nextTick();
    expect(onClear).toHaveBeenCalledOnce();
    expect(modelValue.value).toBe('');
    expect(wrapper.find('[data-test="picker-clear-icon"]').exists()).toBe(false);
  });

  test('loadingIcon and valueFormat render string and VNode public formats', async () => {
    const wrapper = mount(HPicker, {
      props: {
        modelValue: 'alpha',
        loading: true,
        loadingIcon: <span data-test="picker-loading-icon">Loading icon</span>,
        valueFormat: value => `Formatted ${value}`,
        toBody: false,
      },
    });

    expect(wrapper.get('input').element.value).toBe('Formatted alpha');
    expect(wrapper.get('[data-test="picker-loading-icon"]').text()).toBe('Loading icon');

    await wrapper.setProps({
      valueFormat: value => <strong data-test="picker-formatted-vnode">VNode {value}</strong>,
    });
    expect(wrapper.get('[data-test="picker-formatted-vnode"]').text()).toBe('VNode alpha');
  });

  test('forwards popup positioning and field sizing props to observable children', () => {
    const wrapper = mount(() => (
      <HPicker
        modelValue="2026"
        placement="right-end"
        distance={12}
        skidding={5}
        arrow
        toBody={false}
        destroyOnHide={false}
        fitInputWidth={false}
        hoverShowDelay={20}
        hoverHideDelay={30}
        inputStyle="emphasize"
        inputStatus="error"
        pickerWidth="14rem"
        pickerMinWidth={120}
        pickerMaxWidth="20rem"
        popoverOptions={{ flip: false, strategy: 'absolute' }}
      />
    ));

    expect(wrapper.classes()).toContain('h-picker--emphasize');
    const input = wrapper.get('.h-picker__input');
    expect(input.classes()).toContain('is-error');
    expect(input.attributes('style')).toContain('width: 14rem');
    expect(input.attributes('style')).toContain('min-width: 120px');
    expect(input.attributes('style')).toContain('max-width: 20rem');
    expect(wrapper.findComponent({ name: 'HPopover' }).props()).toMatchObject({
      placement: 'right-end',
      distance: 12,
      skidding: 5,
      arrow: true,
      toBody: false,
      destroyOnHide: false,
      sameWidth: true,
      setMinWidth: true,
      hoverShowDelay: 20,
      hoverHideDelay: 30,
      flip: false,
      strategy: 'absolute',
    });
  });

  test('outer slots receive model and status and replace the complete default surfaces', () => {
    const pickerOuter = vi.fn((modelValue: unknown, inputStatus: unknown, pickerStatus: unknown) => (
      <button data-test="picker-outer">{`${modelValue}:${inputStatus}:${pickerStatus}`}</button>
    ));
    const panelOuter = vi.fn((modelValue: unknown, pickerStatus: unknown) => (
      <div data-test="panel-outer">{`${modelValue}:${pickerStatus}`}</div>
    ));
    const wrapper = mount(() => (
      <HPicker modelValue="alpha" toBody={false}>
        {{ pickerOuter, panelOuter }}
      </HPicker>
    ));

    expect(wrapper.get('[data-test="picker-outer"]').text()).toBe('alpha:normal:panel-hide');
    expect(pickerOuter).toHaveBeenCalled();
    expect(wrapper.find('.h-picker__input').exists()).toBe(false);
    expect(panelOuter).toHaveBeenCalledWith('alpha', 'panel-hide');
  });

  test('renders picker inner/prefix/suffix/icon slots with scoped state and emits input events', async () => {
    const onUpdate = vi.fn();
    const onInput = vi.fn();
    const onInputFocus = vi.fn();
    const onInputBlur = vi.fn();
    const onKeydown = vi.fn();
    const onCompositionStart = vi.fn();
    const onCompositionUpdate = vi.fn();
    const onCompositionEnd = vi.fn();
    const prefix = vi.fn(() => <span data-test="picker-prefix">Prefix</span>);
    const suffix = vi.fn(() => <span data-test="picker-suffix">Suffix</span>);
    const icon = vi.fn(() => <span data-test="picker-icon">Icon</span>);
    const wrapper = mount(() => (
      <HPicker
        modelValue="before"
        inputable
        clearable
        toBody={false}
        onUpdate:modelValue={onUpdate}
        onInput={onInput}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
        onKeydown={onKeydown}
        onCompositionStart={onCompositionStart}
        onCompositionUpdate={onCompositionUpdate}
        onCompositionEnd={onCompositionEnd}
      >
        {{
          pickerPrefix: prefix,
          pickerSuffix: suffix,
          pickerIcon: icon,
        }}
      </HPicker>
    ));
    const input = wrapper.get('input');

    expect(wrapper.get('[data-test="picker-prefix"]').text()).toBe('Prefix');
    expect(wrapper.get('[data-test="picker-suffix"]').text()).toBe('Suffix');
    expect(wrapper.get('[data-test="picker-icon"]').text()).toBe('Icon');
    expect(prefix).toHaveBeenCalledWith('before', 'normal', 'panel-hide');
    expect(suffix).toHaveBeenCalledWith('before', 'normal', 'panel-hide');
    expect(icon).toHaveBeenCalled();

    await input.trigger('focus');
    await input.setValue('after');
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('compositionstart');
    await input.trigger('compositionupdate');
    await input.trigger('compositionend');
    await input.trigger('blur');

    expect(onUpdate).toHaveBeenCalledWith('after');
    expect(onInput.mock.calls[0][0]).toBeInstanceOf(Event);
    expect(onInputFocus.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    expect(onInputBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    expect(onKeydown.mock.calls[0][0]).toBeInstanceOf(KeyboardEvent);
    expect(onCompositionStart.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionUpdate.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionEnd.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
  });

  test('renders panel slots, loading/empty states and confirm callback payloads', async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const onClear = vi.fn();
    let confirmScope!: {
      cancelHandle: () => void;
      enterHandle: () => void;
      confirmHandle: () => void;
    };
    const wrapper = mount(HPicker, {
      props: {
        modelValue: 'chosen',
        showPopoverContentOnly: true,
        panelStatus: 'loading',
        needConfirm: true,
        onConfirm,
        onCancel,
        onClear,
      },
      slots: {
        default: (modelValue: unknown, status: unknown) => (
          <div data-test="panel-default">{`${modelValue}:${status}`}</div>
        ),
        panelPrefix: () => <div data-test="panel-prefix">Prefix</div>,
        panelSuffix: () => <div data-test="panel-suffix">Suffix</div>,
        panelLoading: (modelValue: unknown, status: unknown) => (
          <div data-test="panel-loading">{`${modelValue}:${status}`}</div>
        ),
        panelLeftSide: () => <aside data-test="panel-left">Left</aside>,
        panelRightSide: () => <aside data-test="panel-right">Right</aside>,
        panelConfirm: (scope?: typeof confirmScope) => {
          if (!scope) return null;
          confirmScope = scope;
          return <div data-test="panel-confirm">Confirm area</div>;
        },
      },
    });

    expect(wrapper.get('[data-test="panel-default"]').text()).toBe('chosen:panel-hide');
    expect(wrapper.get('[data-test="panel-prefix"]').text()).toBe('Prefix');
    expect(wrapper.get('[data-test="panel-suffix"]').text()).toBe('Suffix');
    expect(wrapper.get('[data-test="panel-loading"]').text()).toBe('chosen:panel-hide');
    expect(wrapper.get('[data-test="panel-left"]').text()).toBe('Left');
    expect(wrapper.get('[data-test="panel-right"]').text()).toBe('Right');
    expect(wrapper.get('[data-test="panel-confirm"]').text()).toBe('Confirm area');

    confirmScope.enterHandle();
    confirmScope.confirmHandle();
    confirmScope.cancelHandle();
    await nextTick();
    expect(onConfirm).toHaveBeenCalledTimes(2);
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onClear).not.toHaveBeenCalled();

    await wrapper.setProps({ panelStatus: 'empty', needConfirm: false, confirmNeedClear: true });
    expect(wrapper.find('[data-test="panel-loading"]').exists()).toBe(false);
  });

  test('renders built-in panel input, empty, sizing and confirmation contracts', async () => {
    const onUpdate = vi.fn();
    const onInput = vi.fn();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const onClear = vi.fn();
    const wrapper = mount(HPicker, {
      props: {
        modelValue: '',
        showPopoverContentOnly: true,
        panelStatus: 'normal',
        panelClass: 'contract-panel',
        panelStyle: { color: 'rgb(2, 3, 4)' },
        panelWidth: 320,
        panelMinWidth: '16rem',
        panelMaxWidth: 480,
        usePanelInput: true,
        panelInputPlaceholder: 'Search choices',
        needConfirm: true,
        confirmNeedClear: true,
        confirmNeedCancel: true,
        confirmNeedConfirm: true,
        confirmButtonText: 'Apply',
        cancelButtonText: 'Dismiss',
        clearBtnText: 'Reset all',
        confirmAreaSize: 'small',
        confirmAreaPadding: 6,
        'onUpdate:modelValue': onUpdate,
        onInput,
        onConfirm,
        onCancel,
        onClear,
      },
      slots: { default: () => <div data-test="panel-body">Options</div> },
    });

    const popContent = wrapper.get('.h-picker__pop-content');
    expect(wrapper.get('.h-picker__pop-content--wrapper').classes()).toContain('contract-panel');
    expect(popContent.attributes('style')).toContain('width: 320px');
    expect(popContent.attributes('style')).toContain('min-width: 16rem');
    expect(popContent.attributes('style')).toContain('max-width: 480px');
    expect(popContent.attributes('style')).toContain('color: rgb(2, 3, 4)');
    const search = wrapper.get('.h-picker__panel-input input');
    expect(search.attributes('placeholder')).toBe('Search choices');
    await search.setValue('alpha');
    expect(onUpdate).toHaveBeenCalledWith('alpha');
    expect(onInput.mock.calls[0][0]).toBeInstanceOf(Event);

    const confirmArea = wrapper.get('.h-picker__pop-content--confirm-wrapper');
    expect(confirmArea.classes()).toContain('is-small');
    expect(confirmArea.attributes('style')).toContain('padding: 6px');
    const buttons = wrapper.findAll('button');
    const clear = buttons.find(button => button.text() === 'Reset all')!;
    const cancel = buttons.find(button => button.text() === 'Dismiss')!;
    const confirm = buttons.find(button => button.text() === 'Apply')!;
    await clear.trigger('click');
    await cancel.trigger('click');
    await confirm.trigger('click');
    expect(onClear.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    expect(onCancel.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    expect(onConfirm.mock.calls[0][0]).toBeInstanceOf(MouseEvent);

    await wrapper.setProps({
      panelStatus: 'empty',
      emptyText: 'Nothing available',
      hideContentInnerWhenEmpty: true,
      usePanelInput: false,
    });
    expect(wrapper.get('.h-picker__pop-content--empty').text()).toBe('Nothing available');
    expect(wrapper.get('.h-picker__pop-content--inner').attributes('style')).toContain(
      'display: none',
    );
  });

  test('supports picker, container, inner and panel replacement slots with callback scopes', async () => {
    const picker = vi.fn(
      (
        model: unknown,
        inputStatus: unknown,
        status: unknown,
        focus: (event: FocusEvent) => void,
        blur: (event: FocusEvent) => void,
      ) => (
        <button
          data-test="custom-picker"
          onFocus={focus}
          onBlur={blur}
        >{`${model}:${inputStatus}:${status}`}</button>
      ),
    );
    const onInputFocus = vi.fn();
    const onInputBlur = vi.fn();
    const pickerWrapper = mount(() => (
      <HPicker
        modelValue="custom"
        toBody={false}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
      >
        {{ picker }}
      </HPicker>
    ));
    const customPicker = pickerWrapper.get('[data-test="custom-picker"]');
    expect(customPicker.text()).toBe('custom:normal:panel-hide');
    await customPicker.trigger('focus');
    await customPicker.trigger('blur');
    expect(onInputFocus.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    expect(onInputBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);

    const container = vi.fn(() => <div data-test="picker-container">Container</div>);
    const containerWrapper = mount(() => (
      <HPicker modelValue="container">{{ pickerContainer: container }}</HPicker>
    ));
    expect(containerWrapper.get('[data-test="picker-container"]').text()).toBe('Container');
    expect(container).toHaveBeenCalledWith(
      'container',
      'normal',
      'panel-hide',
      expect.any(Function),
      expect.any(Function),
    );

    const inner = vi.fn(() => <div data-test="picker-inner">Inner</div>);
    const innerWrapper = mount(() => (
      <HPicker modelValue="inner">{{ pickerInner: inner }}</HPicker>
    ));
    expect(innerWrapper.get('[data-test="picker-inner"]').text()).toBe('Inner');
    expect(inner).toHaveBeenCalledWith(
      'inner',
      'normal',
      'panel-hide',
      expect.any(Function),
      expect.any(Function),
    );

    const panel = vi.fn(() => <div data-test="custom-panel">Panel replacement</div>);
    const panelWrapper = mount(HPicker, {
      props: { modelValue: 'panel', showPopoverContentOnly: true },
      slots: { panel },
    });
    expect(panelWrapper.get('[data-test="custom-panel"]').text()).toBe('Panel replacement');
    expect(panel).toHaveBeenCalledWith('panel', 'panel-hide');
  });

  test('covers disabled, readonly, hidden input, loading and suffix icon states', async () => {
    const wrapper = mount(HPicker, {
      props: {
        modelValue: 'chosen',
        disabled: true,
        readonly: true,
        inputable: true,
        inputStatus: 'warning',
        size: 'small',
        hideInput: true,
        loading: true,
        loadingText: 'Loading options',
        preserveSuffixIconSpace: true,
      },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['is-disabled', 'is-readonly']));
    expect(wrapper.get('.h-picker__input').classes()).toEqual(
      expect.arrayContaining(['h-picker__input--small', 'is-warning', 'is-disabled']),
    );
    expect(wrapper.get('input').attributes('style')).toContain('display: none');
    expect(wrapper.get('.h-picker__input--icon').classes()).toContain('is-loading');

    await wrapper.setProps({ disabled: false, readonly: false, loading: false, hideInput: false });
    await wrapper.get('.h-picker').trigger('click');
    expect(wrapper.get('.h-picker__input').classes()).toContain('is-active');
  });

  test('exposes focus and popup controls while emitting one complete focus lifecycle', async () => {
    const pickerRef = ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes> | null>(null);
    const onShow = vi.fn();
    const onHide = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onInputFocus = vi.fn();
    const onInputBlur = vi.fn();
    const wrapper = mount(
      () => (
        <HPicker
          ref={pickerRef}
          modelValue="value"
          inputable
          toBody={false}
          onShow={onShow}
          onHide={onHide}
          onFocus={onFocus}
          onBlur={onBlur}
          onInputFocus={onInputFocus}
          onInputBlur={onInputBlur}
        >
          {{ default: () => <div data-test="exposed-panel">Panel</div> }}
        </HPicker>
      ),
      { attachTo: document.body },
    );
    const input = wrapper.get('input');

    pickerRef.value?.focus();
    await nextTick();
    expect(document.activeElement).toBe(input.element);
    expect(onInputFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onShow).toHaveBeenCalledTimes(1);
    expect(pickerRef.value?.wrapperDom()).toBe(wrapper.element);
    expect(pickerRef.value?.popoverDom()).toBeTruthy();

    pickerRef.value?.hidePopover();
    await nextTick();
    expect(onHide).toHaveBeenCalledTimes(1);
    pickerRef.value?.showPopover();
    await nextTick();
    expect(onShow).toHaveBeenCalledTimes(2);

    pickerRef.value?.blur();
    await nextTick();
    expect(onInputBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);

    pickerRef.value?.handleInputFocus(new FocusEvent('focus'));
    pickerRef.value?.handleInputBlur(new FocusEvent('blur'));
    await nextTick();
    expect(onInputFocus).toHaveBeenCalledTimes(2);
    expect(onInputBlur).toHaveBeenCalledTimes(2);
    pickerRef.value?.forceBlur();
  });

  test('never trigger and popperCanBeDisplayed block opening until both allow interaction', async () => {
    const onClick = vi.fn();
    const onShow = vi.fn();
    const wrapper = mount(HPicker, {
      props: {
        trigger: 'never',
        popperCanBeDisplayed: false,
        onClick,
        onShow,
      },
    });

    await wrapper.get('.h-picker').trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onShow).not.toHaveBeenCalled();

    await wrapper.setProps({ trigger: 'click', popperCanBeDisplayed: true });
    await wrapper.get('.h-picker').trigger('mouseenter');
    await wrapper.get('.h-picker').trigger('mouseleave');
    await wrapper.get('.h-picker').trigger('click');
    expect(onShow).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  test('clear, prefix, search and rotating dropdown icons follow real hover/open state', async () => {
    const onClear = vi.fn();
    const wrapper = mount(HPicker, {
      props: {
        modelValue: 'selected',
        inputable: true,
        clearable: true,
        pickerPrefixIcon: 'search',
        dropdownIcon: 'arrow_down',
        dropdownIconCanTurned: true,
        inputIsSearching: true,
        toBody: false,
        onClear,
      },
      slots: { default: () => <div>Options</div> },
    });

    expect(wrapper.find('.h-picker__input--prepend-icon').exists()).toBe(true);
    await wrapper.get('.h-picker__input').trigger('mouseenter');
    const clear = wrapper.get('.h-picker__input--icon.is-clear');
    await clear.trigger('click');
    expect(onClear.mock.calls[0][0]).toBeInstanceOf(MouseEvent);

    await wrapper.get('.h-picker').trigger('click');
    await nextTick();
    expect(wrapper.find('.h-picker__input--icon.is-search').exists()).toBe(true);

    await wrapper.setProps({ inputIsSearching: false });
    await wrapper.get('.h-picker__input').trigger('mouseleave');
    expect(wrapper.find('.h-picker__input--dropdown.is-rotated').exists()).toBe(true);
  });

  test('modelValueRegardAsPlaceholder and hideContentInnerWhenEmpty expose their visual contract', async () => {
    const wrapper = mount(HPicker, {
      props: {
        modelValue: 'Existing selection',
        inputable: true,
        modelValueRegardAsPlaceholder: true,
        toBody: false,
        panelStatus: 'empty',
        hideContentInnerWhenEmpty: false,
      },
      slots: {
        default: () => <div data-test="empty-inner">Kept inner content</div>,
        panelEmpty: (model: unknown, status: unknown) => (
          <div data-test="custom-empty">{`${model}:${status}`}</div>
        ),
      },
    });
    const input = wrapper.get('input');

    await input.trigger('focus');
    expect((input.element as HTMLInputElement).value).toBe('');
    expect(input.attributes('placeholder')).toBe('Existing selection');
    expect(wrapper.get('[data-test="empty-inner"]').text()).toBe('Kept inner content');
    expect(wrapper.get('[data-test="custom-empty"]').text()).toContain('Existing selection');

    await input.trigger('blur');
    await wrapper.setProps({ popperCanBeDisplayed: false });
    await nextTick();
    expect((input.element as HTMLInputElement).value).toBe('Existing selection');
  });

  test('panelConfirmLeft overrides clear fallback and disabled confirmation props reach buttons', async () => {
    const wrapper = mount(HPicker, {
      props: {
        showPopoverContentOnly: true,
        needConfirm: true,
        confirmDisabled: true,
        cancelDisabled: true,
        confirmButtonProps: { type: 'danger' },
        cancelButtonProps: { size: 'medium' },
        confirmNeedClear: true,
      },
      slots: {
        panelConfirmLeft: () => <span data-test="confirm-left">Selection summary</span>,
      },
    });

    expect(wrapper.get('[data-test="confirm-left"]').text()).toBe('Selection summary');
    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons.every(button => button.attributes('disabled') !== undefined)).toBe(true);
    expect(buttons.some(button => button.classes().includes('h-button--danger'))).toBe(true);
  });

  test('hover trigger opens after display permission becomes available under the pointer', async () => {
    const onShow = vi.fn();
    const onHide = vi.fn();
    const wrapper = mount(HPicker, {
      props: {
        trigger: 'hover',
        popperCanBeDisplayed: false,
        hoverShowDelay: 0,
        hoverHideDelay: 0,
        toBody: false,
        onShow,
        onHide,
      },
      slots: { default: () => <div data-test="hover-panel">Panel</div> },
    });

    await wrapper.trigger('mouseenter');
    await wrapper.setProps({ popperCanBeDisplayed: true });
    await nextTick();
    await new Promise(resolve => window.setTimeout(resolve));
    expect(onShow).toHaveBeenCalledTimes(1);

    await wrapper.get('.h-popover__reference').trigger('mouseleave');
    await new Promise(resolve => window.setTimeout(resolve));
    expect(onHide).toHaveBeenCalled();
  });

  test('fitInputWidth modes map to distinct Popover width constraints', async () => {
    const wrapper = mount(HPicker, { props: { fitInputWidth: true } });
    const popover = wrapper.findComponent({ name: 'HPopover' });
    expect(popover.props()).toMatchObject({ sameWidth: true, setMinWidth: false });

    await wrapper.setProps({ fitInputWidth: false });
    expect(popover.props()).toMatchObject({ sameWidth: true, setMinWidth: true });

    await wrapper.setProps({ fitInputWidth: 'fit-content' });
    expect(popover.props()).toMatchObject({ sameWidth: false, setMinWidth: false });
  });

  test('non-inputable tabindex focus and readonly/disabled click guards stay observable', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onClick = vi.fn();
    const onShow = vi.fn();
    const wrapper = mount(HPicker, {
      attachTo: document.body,
      props: {
        inputable: false,
        tabIndex: 2,
        readonly: true,
        onFocus,
        onBlur,
        onClick,
        onShow,
      },
    });
    const field = wrapper.get('.h-picker__input');
    expect(field.attributes('tabindex')).toBe('2');

    await field.trigger('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
    await field.trigger('blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
    expect(onShow).not.toHaveBeenCalled();

    await wrapper.setProps({ readonly: false, disabled: true });
    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
    await wrapper.setProps({ disabled: false });
    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onShow).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  test('PickerPopper panel input handles input, focus, keyboard, blur and outside pointer paths', async () => {
    const parentEmit = vi.fn();
    const onSwitch = vi.fn();
    const popperVisible = ref(true);
    const pickerStatus = ref<'panel-visible'>('panel-visible');
    const pickerDom = document.createElement('div');
    const pickerDomRef = ref<HTMLDivElement | null>(pickerDom);
    const popContentDomRef = ref<HTMLElement | null>(null);
    const parentProps = reactive({
      modelValue: '',
      panelStatus: 'normal',
      loading: false,
      loadingText: 'Loading',
      panelClass: '',
      panelStyle: undefined,
      panelWidth: undefined,
      panelMinWidth: undefined,
      panelMaxWidth: undefined,
      usePanelInput: true,
      panelInputPlaceholder: 'Search',
      panelInputPrefixIcon: undefined,
      needConfirm: false,
      confirmNeedClear: false,
      confirmNeedCancel: true,
      confirmNeedConfirm: true,
      hideContentInnerWhenEmpty: true,
      emptyText: 'Empty',
    });
    const wrapper = mount(PickerPopper, {
      attachTo: document.body,
      props: { onSwitchPopperVisible: onSwitch },
      global: {
        provide: {
          [HPickerPropsInjectKey as symbol]: parentProps,
          [HPickerEmitsInjectKey as symbol]: parentEmit,
          [HPickerSlotsInjectKey as symbol]: {},
          [HPickerPopperVisibleInjectKey as symbol]: popperVisible,
          [HPickerStatusInjectKey as symbol]: pickerStatus,
          [HPickerDomRefInjectKey as symbol]: pickerDomRef,
          [HPickerPopContentDomRefInjectKey as symbol]: popContentDomRef,
        },
      },
    });
    const input = wrapper.get('input');

    await input.trigger('focus');
    await input.setValue('query');
    expect(parentEmit).toHaveBeenCalledWith('update:modelValue', 'query');
    expect(parentEmit.mock.calls.some(call => call[0] === 'input' && call[1] instanceof Event)).toBe(
      true,
    );

    const backspace = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true });
    const stop = vi.spyOn(backspace, 'stopPropagation');
    wrapper.get('.h-picker__panel-input').element.dispatchEvent(backspace);
    expect(stop).toHaveBeenCalled();
    await wrapper.get('.h-picker__panel-input').trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: 'ArrowDown' });
    expect(parentEmit.mock.calls.some(call => call[0] === 'keydown')).toBe(true);

    const outside = document.createElement('button');
    document.body.append(outside);
    await input.trigger('blur', { relatedTarget: outside });
    expect(onSwitch).toHaveBeenCalledWith(false);
    onSwitch.mockClear();

    await input.trigger('blur', { relatedTarget: null });
    await input.trigger('blur', { relatedTarget: wrapper.element });
    expect(onSwitch).not.toHaveBeenCalled();

    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(onSwitch).not.toHaveBeenCalled();
    pickerDom.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(onSwitch).not.toHaveBeenCalled();
    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(onSwitch).toHaveBeenCalledWith(false);

    parentProps.needConfirm = true;
    parentProps.confirmNeedClear = false;
    await nextTick();
    expect(wrapper.find('.h-picker__pop-content--confirm-wrapper i').exists()).toBe(true);
    parentProps.confirmNeedClear = true;
    await nextTick();
    await wrapper.get('.h-button--link').trigger('click');
    expect(parentEmit.mock.calls.some(call => call[0] === 'clear')).toBe(true);

    popperVisible.value = false;
    await nextTick();
    expect(parentEmit).toHaveBeenCalledWith('update:modelValue', '');
    wrapper.unmount();
    outside.remove();
  });

  test.each([
    ['pure input', false],
    ['fit-content input', true],
  ])('%s reports real browser text overflow through Tooltip', async (_label, useFitContentInput) => {
    const wrapper = mount(HPicker, {
      props: {
        modelValue: 'A deliberately long selected value',
        inputable: true,
        useFitContentInput,
        fitContentInputMinWidth: 24,
      },
    });
    const input = wrapper.get('input').element as HTMLInputElement;
    Object.defineProperties(input, {
      scrollWidth: { configurable: true, value: 320 },
      scrollHeight: { configurable: true, value: 24 },
    });
    vi.spyOn(input, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 40,
      height: 24,
      top: 0,
      right: 40,
      bottom: 24,
      left: 0,
      toJSON: () => ({}),
    });

    await wrapper.get('.h-picker__input').trigger('mouseenter');
    const tooltip = wrapper.findComponent({ name: 'HTooltip' });
    expect(tooltip.props('visible')).toBe(true);
    expect(tooltip.props('content')).toBe('A deliberately long selected value');
    await wrapper.get('.h-picker__input').trigger('mouseleave');
    expect(tooltip.props('visible')).toBe(false);
  });

  test('PickerInput internal event validators accept only their browser contracts', () => {
    const emits = PickerInput.emits as {
      switchPopperVisible: (visible: boolean) => boolean;
      click: (event: MouseEvent) => boolean;
      focus: (event: FocusEvent) => boolean;
      blur: (event: FocusEvent) => boolean;
    };
    const mouse = new MouseEvent('click');
    const focus = new FocusEvent('focus');
    const event = new Event('event');

    expect(emits.switchPopperVisible(true)).toBe(true);
    expect(emits.switchPopperVisible('true' as never)).toBe(false);
    expect(emits.click(mouse)).toBe(true);
    expect(emits.click(event as MouseEvent)).toBe(false);
    expect(emits.focus(focus)).toBe(true);
    expect(emits.focus({} as FocusEvent)).toBe(false);
    expect(emits.blur(focus)).toBe(true);
    expect(emits.blur({} as FocusEvent)).toBe(false);

    const popperEmits = PickerPopper.emits as {
      switchPopperVisible: (visible: boolean) => boolean;
      blur: (event: FocusEvent) => boolean;
    };
    expect(popperEmits.switchPopperVisible(false)).toBe(true);
    expect(popperEmits.switchPopperVisible('false' as never)).toBe(false);
    expect(popperEmits.blur(focus)).toBe(true);
    expect(popperEmits.blur(new Event('blur') as FocusEvent)).toBe(false);
  });

  test('fit-content PickerInput executes v-model, click and composition forwarding paths', async () => {
    const onUpdate = vi.fn();
    const onClick = vi.fn();
    const onCompositionStart = vi.fn();
    const onCompositionUpdate = vi.fn();
    const onCompositionEnd = vi.fn();
    const wrapper = mount(HPicker, {
      props: {
        modelValue: 'before',
        inputable: true,
        useFitContentInput: true,
        'onUpdate:modelValue': onUpdate,
        onClick,
        onCompositionStart,
        onCompositionUpdate,
        onCompositionEnd,
      },
    });
    const input = wrapper.get('input');

    await input.trigger('click');
    await input.setValue('after');
    await input.trigger('compositionstart');
    await input.trigger('compositionupdate');
    await input.trigger('compositionend');
    expect(onClick).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledWith('after');
    expect(onCompositionStart.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionUpdate.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionEnd.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);

    await input.setValue('');
    await new Promise(resolve => window.setTimeout(resolve, 410));
  });

  test('prefix ResizeObserver adjusts the native input width using real element geometry', async () => {
    let resizeCallback!: ResizeObserverCallback;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: ResizeObserverCallback) {
          resizeCallback = callback;
        }
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );
    const wrapper = mount(HPicker, {
      props: { pickerPrefixIcon: 'search', inputable: true },
    });
    const field = wrapper.get('.h-picker__input').element as HTMLElement;
    Object.defineProperty(field, 'clientWidth', { configurable: true, value: 240 });

    resizeCallback(
      [{ contentRect: { width: 32 } } as ResizeObserverEntry],
      {} as ResizeObserver,
    );
    await nextTick();
    expect(wrapper.get('input').attributes('style')).toContain('width: 208px');
    Object.defineProperty(field, 'clientWidth', { configurable: true, value: 0 });
    resizeCallback(
      [{ contentRect: { width: 0 } } as ResizeObserverEntry],
      {} as ResizeObserver,
    );
    await nextTick();
    expect(wrapper.get('input').attributes('style')).toContain('width: 0px');
    vi.unstubAllGlobals();
  });

  test('non-inputable exposes, repeated clicks, VNode suffix icons and display toggles cover branches', async () => {
    const pickerRef = ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes> | null>(null);
    const popperCanBeDisplayed = ref(true);
    const onShow = vi.fn();
    const onHide = vi.fn();
    const wrapper = mount(
      () => (
        <HPicker
          ref={pickerRef}
          inputable={false}
          tabIndex={0}
          dropdownIcon={h('svg', { 'data-test': 'vnode-dropdown', width: 18 })}
          dropdownIconCanTurned
          popperCanBeDisplayed={popperCanBeDisplayed.value}
          toBody={false}
          onShow={onShow}
          onHide={onHide}
        >
          {{
            pickerInner: () => [],
            default: () => <div data-test="toggle-panel">Panel</div>,
          }}
        </HPicker>
      ),
      { attachTo: document.body },
    );
    const field = wrapper.get('.h-picker__input');

    pickerRef.value?.focus();
    await nextTick();
    expect(document.activeElement).toBe(field.element);
    pickerRef.value?.blur();
    expect(document.activeElement).not.toBe(field.element);
    expect(wrapper.get('[data-test="vnode-dropdown"]').attributes('width')).toBe('18');

    await wrapper.get('.h-picker').trigger('click');
    expect(onShow).toHaveBeenCalledTimes(1);
    wrapper.get('.h-picker').element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await nextTick();
    await wrapper.get('.h-picker').trigger('click');
    expect(onHide).toHaveBeenCalledTimes(1);

    await wrapper.get('.h-picker').trigger('click');
    popperCanBeDisplayed.value = false;
    popperCanBeDisplayed.value = true;
    await nextTick();
    expect(onShow.mock.calls.length).toBeGreaterThanOrEqual(2);

    popperCanBeDisplayed.value = false;
    await nextTick();
    await wrapper.get('.h-picker').trigger('click');
    popperCanBeDisplayed.value = true;
    await nextTick();

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await nextTick();
    expect(onHide.mock.calls.length).toBeGreaterThanOrEqual(2);
    wrapper.unmount();
  });

  test('inputable repeated click, blocked focus and hover permission false paths remain inert', async () => {
    const blockedRef = ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes> | null>(null);
    const blockedInputFocus = vi.fn();
    const blocked = mount(() => (
      <HPicker
        ref={blockedRef}
        disabled
        inputable
        trigger="never"
        onInputFocus={blockedInputFocus}
      />
    ));
    blockedRef.value?.handleInputFocus(new FocusEvent('focus'));
    await nextTick();
    expect(blockedInputFocus).not.toHaveBeenCalled();
    blocked.unmount();

    const onShow = vi.fn();
    const inputable = mount(HPicker, {
      props: { inputable: true, toBody: false, onShow },
      slots: { default: () => <div>Panel</div> },
    });
    await inputable.get('.h-picker').trigger('click');
    await inputable.get('.h-picker').trigger('click');
    expect(onShow).toHaveBeenCalledTimes(1);
    inputable.unmount();

    const canDisplay = ref(false);
    const onHoverShow = vi.fn();
    const hover = mount(() => (
      <HPicker
        trigger="hover"
        popperCanBeDisplayed={canDisplay.value}
        toBody={false}
        onShow={onHoverShow}
      />
    ));
    await hover.trigger('mouseenter');
    await hover.trigger('mouseleave');
    canDisplay.value = true;
    await nextTick();
    expect(onHoverShow).not.toHaveBeenCalled();
    hover.unmount();

    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const untabbable = mount(HPicker, {
      props: {
        dropdownIcon: false,
        preserveSuffixIconSpace: true,
        onFocus,
        onBlur,
      },
    });
    expect(untabbable.find('.h-picker__input--append-icon').exists()).toBe(true);
    const untabbableField = untabbable.get('.h-picker__input');
    await untabbableField.trigger('focus');
    await untabbableField.trigger('blur');
    expect(onFocus).not.toHaveBeenCalled();
    expect(onBlur).not.toHaveBeenCalled();
    untabbable.unmount();
  });

  test('emits validator contracts accept browser payloads and reject wrong payloads', () => {
    const mouse = new MouseEvent('click');
    const focus = new FocusEvent('focus');
    const key = new KeyboardEvent('keydown');
    const composition = new CompositionEvent('compositionstart');
    const event = new Event('input');

    expect(usePickerEmits['update:modelValue']('value')).toBe(true);
    expect(usePickerEmits['update:modelValue'](1 as never)).toBe(false);
    expect(usePickerEmits.show()).toBe(true);
    expect(usePickerEmits.hide()).toBe(true);
    expect(usePickerEmits.focus()).toBe(true);
    expect(usePickerEmits.blur()).toBe(true);
    expect(usePickerEmits.input(event)).toBe(true);
    expect(usePickerEmits.input({} as Event)).toBe(false);
    expect(usePickerEmits.click(mouse)).toBe(true);
    expect(usePickerEmits.click(event as MouseEvent)).toBe(false);
    expect(usePickerEmits.confirm()).toBe(true);
    expect(usePickerEmits.confirm(mouse)).toBe(true);
    expect(usePickerEmits.confirm(event as MouseEvent)).toBe(false);
    expect(usePickerEmits.cancel()).toBe(true);
    expect(usePickerEmits.cancel(mouse)).toBe(true);
    expect(usePickerEmits.cancel(event as MouseEvent)).toBe(false);
    expect(usePickerEmits.clear(mouse)).toBe(true);
    expect(usePickerEmits.clear(event as MouseEvent)).toBe(false);
    expect(usePickerEmits.inputFocus(focus)).toBe(true);
    expect(usePickerEmits.inputFocus({} as FocusEvent)).toBe(false);
    expect(usePickerEmits.inputBlur(focus)).toBe(true);
    expect(usePickerEmits.inputBlur({} as FocusEvent)).toBe(false);
    expect(usePickerEmits.keydown(key)).toBe(true);
    expect(usePickerEmits.keydown(event as KeyboardEvent)).toBe(false);
    expect(usePickerEmits.compositionStart(composition)).toBe(true);
    expect(usePickerEmits.compositionUpdate(composition)).toBe(true);
    expect(usePickerEmits.compositionEnd(composition)).toBe(true);
    expect(usePickerEmits.compositionStart(event as CompositionEvent)).toBe(false);

    expect(usePickerPureInputEmits['update:modelValue']('value')).toBe(true);
    expect(usePickerPureInputEmits['update:modelValue'](1)).toBe(true);
    expect(usePickerPureInputEmits['update:modelValue']({} as never)).toBe(false);
    expect(usePickerPureInputEmits.input(event)).toBe(true);
    expect(usePickerPureInputEmits.focus(focus)).toBe(true);
    expect(usePickerPureInputEmits.blur(focus)).toBe(true);
    expect(usePickerPureInputEmits.keydown(key)).toBe(true);
    expect(usePickerPureInputEmits.compositionStart(composition)).toBe(true);
    expect(usePickerPureInputEmits.compositionUpdate(composition)).toBe(true);
    expect(usePickerPureInputEmits.compositionEnd(composition)).toBe(true);
    expect(usePickerPureInputEmits.focus(event as FocusEvent)).toBe(false);
    expect(usePickerPureInputEmits.blur(event as FocusEvent)).toBe(false);
    expect(usePickerPureInputEmits.keydown(event as KeyboardEvent)).toBe(false);
    expect(usePickerPureInputEmits.compositionEnd(event as CompositionEvent)).toBe(false);

    expect(isModelValue('value')).toBe(true);
    expect(isModelValue(null)).toBe(true);
    expect(isModelValue(undefined)).toBe(true);
    expect(isModelValue({ id: 1 })).toBe(true);
    expect(usePickerProps.searchIcon.default()).toBeTruthy();
  });
});
