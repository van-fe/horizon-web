import { describe, expect, test, vi } from 'vitest';
import ColorPickerHelper from './ColorPickerHelper';
import { nextTick } from 'vue';
import type { DOMWrapper } from '@vue/test-utils';
import HPicker from '~/components/Picker/src/Picker';
import { mount } from '@vue/test-utils';
import HColorPicker from '../src/ColorPicker';
import {
  getCustomStoredColors,
  getRecentlyColors,
} from '../src/utils/useStorageColor';
import HInputNumber from '../../InputNumber/src/InputNumber';
import { ref } from 'vue';
import { HFormItemErrorInjectedKey } from '../../Form/src/utils/injectedKeys';
import HOption from '../../Select/src/Option';

describe('ColorPicker.tsx special', () => {
  test('size, editableModes and popoverProps change rendered controls and overlay output', async () => {
    const instance = new ColorPickerHelper({
      size: 'large',
      editable: true,
      editableModes: ['rgb'],
      toBody: false,
      popoverProps: { toBody: false, arrow: false, popperClass: 'color-picker-contract-popover' },
    });
    await instance.open();

    expect(instance.element.classes()).toContain('h-color-picker--large');
    expect(instance.wrapper.find('.color-picker-contract-popover').exists()).toBe(true);
    expect(instance.wrapper.find('.h-popover__arrow').exists()).toBe(false);
    expect(
      instance.wrapper.findAllComponents(HOption).map(option => option.props('value')),
    ).toEqual(['hex', 'rgb']);
  });

  test('toBody teleports the real color panel outside the mounted root', async () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const wrapper = mount(() => <HColorPicker toBody />, { attachTo: host });

    await wrapper.get('.h-color-picker-trigger').trigger('click');
    await vi.waitFor(() => expect(document.body.querySelector('.h-color-picker-panel')).not.toBeNull());
    const panel = document.body.querySelector('.h-color-picker-panel')!;
    expect(wrapper.element.contains(panel)).toBe(false);

    wrapper.unmount();
    host.remove();
  });

  test('modify model-value and the edit form value will be changed correctly', async () => {
    const instance = new ColorPickerHelper({
      editable: true,
      alpha: true,
      needConfirm: false,
      clearable: false,
    });

    const panel = await instance.open();

    instance.modelValue.value = '#000000FF';

    await nextTick();

    expect(
      (panel.find('.h-color-picker-edit-form__input input') as DOMWrapper<HTMLInputElement>).element
        .value,
    ).toBe('000000');

    expect(
      (panel.find('.h-color-picker-edit-form__input--alpha input') as DOMWrapper<HTMLInputElement>)
        .element.value,
    ).toBe('100%');

    instance.modelValue.value = '#ffffff00';

    await nextTick();

    expect(
      (panel.find('.h-color-picker-edit-form__input input') as DOMWrapper<HTMLInputElement>).element
        .value,
    ).toBe('FFFFFF');

    expect(
      (panel.find('.h-color-picker-edit-form__input--alpha input') as DOMWrapper<HTMLInputElement>)
        .element.value,
    ).toBe('0%');
  });

  test('clear resets the value and emits change exactly once', async () => {
    const onChange = vi.fn();
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      onChange,
    });
    instance.modelValue.value = '#336699';
    await nextTick();
    onChange.mockClear();

    instance.element.findComponent(HPicker).vm.$emit('clear', new MouseEvent('click'));
    await nextTick();

    expect(instance.modelValue.value).toBe('');
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenLastCalledWith('');
  });

  test('need-confirm keeps a swatch change pending until confirmation', async () => {
    const onActiveChange = vi.fn();
    const onChange = vi.fn();
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      needConfirm: true,
      showSwatch: true,
      swatches: ['#00FF00'],
      onActiveChange,
      onChange,
    });
    instance.modelValue.value = '#FF0000';
    await nextTick();
    onChange.mockClear();

    const panel = await instance.open();
    await panel.find('.h-color-picker-panel__swatches--item').trigger('click');
    await nextTick();

    expect(onActiveChange).toHaveBeenLastCalledWith('#00FF00');
    expect(instance.modelValue.value).toBe('#FF0000');
    expect(onChange).not.toHaveBeenCalled();

    instance.element.findComponent(HPicker).vm.$emit('confirm');
    await nextTick();

    expect(instance.modelValue.value).toBe('#00FF00');
    expect(onChange).toHaveBeenLastCalledWith('#00FF00');
  });

  test('cancel discards a pending swatch selection', async () => {
    const onChange = vi.fn();
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      needConfirm: true,
      editable: true,
      showSwatch: true,
      swatches: ['#00FF00'],
      onChange,
    });
    instance.modelValue.value = '#FF0000';
    await nextTick();
    onChange.mockClear();

    const panel = await instance.open();
    await panel.find('.h-color-picker-panel__swatches--item').trigger('click');
    instance.element.findComponent(HPicker).vm.$emit('cancel');
    await nextTick();

    expect(instance.modelValue.value).toBe('#FF0000');
    expect(onChange).not.toHaveBeenCalled();
  });

  test('updates immediately from a swatch when confirmation is disabled', async () => {
    const onActiveChange = vi.fn();
    const onChange = vi.fn();
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      needConfirm: false,
      showSwatch: true,
      swatches: [{ name: 'success', value: '#00FF00' }],
      onActiveChange,
      onChange,
    });
    instance.modelValue.value = '#FF0000';
    await nextTick();

    const panel = await instance.open();
    await panel.find('.h-color-picker-panel__swatches--item').trigger('click');
    await nextTick();

    expect(instance.modelValue.value).toBe('#00FF00');
    expect(onActiveChange).toHaveBeenLastCalledWith('#00FF00');
    expect(onChange).toHaveBeenLastCalledWith('#00FF00');
  });

  test('normalizes an alpha color to the configured output format', async () => {
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      alpha: true,
      format: 'rgb',
      needConfirm: false,
    });

    instance.modelValue.value = '#33669980';
    await nextTick();

    expect(instance.element.findComponent(HPicker).props('modelValue')).toBe(
      'rgba(51, 102, 153, 0.5)',
    );
  });

  test('renders trigger and square-text slots with the live color object', async () => {
    const triggerScopes: string[] = [];
    const trigger = mount(HColorPicker, {
      props: { modelValue: '#336699', triggerType: 'square' },
      slots: {
        trigger: (color?: any) => {
          const value = color?.resultsValue.value ?? '';
          triggerScopes.push(value);
          return <button class="custom-trigger">{value}</button>;
        },
      },
    });
    expect(trigger.get('.custom-trigger').text()).toBe('#336699');
    expect(triggerScopes).toContain('#336699');

    const squareScopes: string[] = [];
    const square = mount(HColorPicker, {
      props: { modelValue: '#FF0000', triggerType: 'square', squareText: true },
      slots: {
        squareText: (color?: any) => {
          squareScopes.push(color?.resultsValue.value ?? '');
          return <span class="square-text-slot">Red</span>;
        },
      },
    });
    expect(square.get('.square-text-slot').text()).toBe('Red');
    expect(squareScopes).toContain('#FF0000');

    const fallback = mount(HColorPicker, {
      props: { modelValue: '#00FF00', triggerType: 'square', squareText: true },
    });
    expect(fallback.get('.h-color-picker-trigger__text').text()).toBe('#00FF00');
  });

  test('records changed colors on hide and renders an empty custom-color state', async () => {
    getRecentlyColors().value = [];
    getCustomStoredColors().value = [];
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      recentlyColors: true,
      customColors: true,
      showSwatch: true,
      swatches: ['#00FF00'],
      needConfirm: false,
    });
    instance.modelValue.value = '#FF0000';
    await nextTick();
    const panel = await instance.open();
    expect(panel.find('.h-color-picker-panel__swatches.is-empty').exists()).toBe(true);
    await panel.find('.h-color-picker-panel__swatches--item:not(.is-empty)').trigger('click');
    instance.element.findComponent(HPicker).vm.$emit('hide');
    await nextTick();

    expect(getRecentlyColors().value[0]).toBe('#00FF00');
  });

  test('confirming an empty color and blurring still emit their public notifications', async () => {
    const onBlur = vi.fn();
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      needConfirm: true,
      recentlyColors: true,
      onBlur,
    });
    const panel = await instance.open();
    expect(panel.exists()).toBe(true);
    instance.element.findComponent(HPicker).vm.$emit('confirm');
    instance.element.findComponent(HPicker).vm.$emit('inputBlur', new FocusEvent('blur'));
    await nextTick();

    expect(getRecentlyColors().value).not.toContain('');
    expect(onBlur).toHaveBeenCalledOnce();
  });

  test('switches gradient types, adds a stop and removes the active stop by keyboard', async () => {
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      enableGradient: true,
      gradientList: ['linear', 'radial', 'conic'],
      needConfirm: false,
    });
    instance.modelValue.value = '#FF0000';
    await nextTick();
    const panel = await instance.open();
    const typeItems = panel.findAll('.h-color-picker-panel__color-type__item');
    expect(typeItems).toHaveLength(4);

    await typeItems[1].trigger('click');
    await nextTick();
    expect(instance.modelValue.value).toContain('linear-gradient');
    expect(panel.findAll('.h-color-picker-panel__color-type__gradient--item')).toHaveLength(2);

    const track = panel.get('.h-color-picker-panel__color-type__gradient--track-color');
    vi.spyOn(track.element, 'getBoundingClientRect').mockReturnValue({
      bottom: 20,
      height: 20,
      left: 0,
      right: 200,
      top: 0,
      width: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    await track.trigger('click', { clientX: 100 });
    await nextTick();
    expect(panel.findAll('.h-color-picker-panel__color-type__gradient--item')).toHaveLength(3);
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Backspace' }));
    await nextTick();
    expect(panel.findAll('.h-color-picker-panel__color-type__gradient--item')).toHaveLength(2);

    await typeItems[2].trigger('click');
    expect(instance.modelValue.value).toContain('radial-gradient');
    await typeItems[3].trigger('click');
    expect(instance.modelValue.value).toContain('conic-gradient');
    await typeItems[0].trigger('click');
    expect(instance.modelValue.value).not.toContain('gradient');
  });

  test('renders, selects, adds and removes recent/custom stored colors', async () => {
    getRecentlyColors().value = ['#112233'];
    getCustomStoredColors().value = ['#445566'];
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      recentlyColors: true,
      customColors: true,
      needConfirm: false,
    });
    instance.modelValue.value = '#778899';
    await nextTick();
    const panel = await instance.open();
    const storedItems = panel.findAll('.h-color-picker-panel__swatches--item');
    expect(storedItems.length).toBeGreaterThanOrEqual(2);

    await storedItems[0].trigger('click');
    expect(instance.modelValue.value).toBe('#112233');
    const pointerButtons = panel.findAll('.h-color-picker-panel__block--pointer-icon');
    await pointerButtons[0].trigger('click');
    expect(getCustomStoredColors().value[0]).toBe('#112233');

    const customItem = panel.findAll('.h-color-picker-panel__swatches--item').at(-1)!;
    await customItem.trigger('click');
    await nextTick();
    expect(instance.modelValue.value).toBe('#445566');
    await pointerButtons[1].trigger('click');
    expect(getCustomStoredColors().value).not.toContain('#445566');
  });

  test('uses the native EyeDropper result and reports active color changes', async () => {
    const onActiveChange = vi.fn();
    const open = vi.fn(async () => ({ sRGBHex: '#ABCDEF' }));
    vi.stubGlobal(
      'EyeDropper',
      class {
        open = open;
      },
    );
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      enableEyeDropper: true,
      needConfirm: false,
      onActiveChange,
    });
    instance.modelValue.value = '#000000';
    await nextTick();
    const panel = await instance.open();

    await panel.get('.h-color-picker-panel__preview--picker').trigger('click');
    await vi.waitFor(() => expect(open).toHaveBeenCalledOnce());
    await vi.waitFor(() => expect(instance.modelValue.value).toBe('#ABCDEF'));
    expect(onActiveChange).toHaveBeenLastCalledWith('#ABCDEF');
    vi.unstubAllGlobals();
  });

  test('keeps the value unchanged when EyeDropper is unavailable', async () => {
    vi.stubGlobal('EyeDropper', undefined);
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      enableEyeDropper: true,
      needConfirm: false,
    });
    instance.modelValue.value = '#123456';
    await nextTick();
    const panel = await instance.open();

    await panel.get('.h-color-picker-panel__preview--picker').trigger('click');
    await nextTick();
    expect(instance.modelValue.value).toBe('#123456');
    vi.unstubAllGlobals();
  });

  test('exposes the live picker input instead of the setup-time null ref', async () => {
    const wrapper = mount(HColorPicker, { props: { modelValue: '#123456' } });
    await nextTick();

    expect((wrapper.vm as unknown as { colorPicker: unknown }).colorPicker).toBeInstanceOf(
      HTMLInputElement,
    );
  });

  test('forwards an injected form error to the picker input status', () => {
    const wrapper = mount(HColorPicker, {
      props: { modelValue: '#123456' },
      global: { provide: { [HFormItemErrorInjectedKey as symbol]: ref('Invalid color') } },
    });

    expect(wrapper.findComponent(HPicker).props('inputStatus')).toBe('error');
  });

  test('updates hue, alpha and saturation/value through real pointer dragging', async () => {
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      alpha: true,
      needConfirm: false,
    });
    instance.modelValue.value = '#FF000080';
    await nextTick();
    const panel = await instance.open();
    const rect = {
      bottom: 100,
      height: 100,
      left: 0,
      right: 200,
      top: 0,
      width: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };

    const drag = async (element: Element, clientX: number, clientY: number) => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(rect);
      element.dispatchEvent(
        new PointerEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 10 }),
      );
      window.dispatchEvent(
        new PointerEvent('pointermove', { bubbles: true, clientX, clientY }),
      );
      window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX, clientY }));
      await nextTick();
    };

    const board = panel.get('.h-color-picker-panel__color-board');
    const boardCursor = panel.get('.h-color-picker-panel__color-board--cursor');
    const previewTracks = panel.findAll('.h-color-picker-panel__preview--track > div');
    const previewCursors = panel.findAll('.h-color-picker-panel__preview--track .cursor');
    vi.spyOn(board.element, 'getBoundingClientRect').mockReturnValue(rect);
    Object.defineProperty(boardCursor.element, 'offsetWidth', { configurable: true, value: 12 });
    for (const track of previewTracks) {
      Object.defineProperty(track.element, 'offsetWidth', { configurable: true, value: 200 });
    }
    for (const cursor of previewCursors) {
      Object.defineProperty(cursor.element, 'offsetWidth', { configurable: true, value: 12 });
    }
    instance.modelValue.value = '#00FF00CC';
    await nextTick();

    await drag(panel.get('.h-color-picker-panel__preview--track .color').element, 100, 0);
    expect(instance.modelValue.value).not.toBe('#FF000080');
    await drag(panel.get('.h-color-picker-panel__preview--track .alpha').element, 50, 0);
    expect(instance.modelValue.value).toMatch(/[0-9A-F]{8}$/);
    await drag(panel.get('.h-color-picker-panel__color-board__wrapper').element, 150, 25);
    expect(instance.modelValue.value).toMatch(/^#/);
  });

  test('edits hex and alpha values on input and restores invalid alpha on blur', async () => {
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      editable: true,
      alpha: true,
      updateOnInput: true,
      needConfirm: false,
    });
    instance.modelValue.value = '#33669980';
    await nextTick();
    const panel = await instance.open();
    const hex = panel.get<HTMLInputElement>('.h-color-picker-edit-form__input--hex input');
    const alpha = panel.get<HTMLInputElement>('.h-color-picker-edit-form__input--alpha input');

    await hex.setValue('FF0000');
    await nextTick();
    expect(instance.modelValue.value).toContain('FF0000');
    await alpha.setValue('150');
    await alpha.trigger('keydown', { code: 'KeyA' });
    await alpha.trigger('blur');
    expect(Number.parseInt(alpha.element.value)).toBeLessThanOrEqual(100);
    await alpha.setValue('25');
    await alpha.trigger('keydown', { code: 'Enter' });
    expect(instance.modelValue.value).toMatch(/40$/);
    await hex.setValue('');
    await nextTick();
    expect(instance.modelValue.value).not.toBe('');

    const alphaControl = panel.findAllComponents(HInputNumber).at(-1)!;
    alphaControl.vm.$emit('update:modelValue', 30);
    alphaControl.vm.$emit('keydown', new KeyboardEvent('keydown', { code: 'Enter' }));
    await nextTick();
    expect(instance.modelValue.value).toMatch(/4D$/);
  });

  test('supports every edit mode through controlled values and three-channel input', async () => {
    const editMode = ref<'hex' | 'rgb' | 'hsl' | 'hsv'>('rgb');
    const onUpdateEditMode = vi.fn((value: 'hex' | 'rgb' | 'hsl' | 'hsv') => {
      editMode.value = value;
    });
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      editable: true,
      editMode,
      updateOnInput: false,
      needConfirm: false,
      'onUpdate:editMode': onUpdateEditMode,
    });
    instance.modelValue.value = '#336699';
    await nextTick();
    const panel = await instance.open();

    for (const mode of ['hsl', 'hsv', 'rgb'] as const) {
      editMode.value = mode;
      await nextTick();
      expect(panel.get('.h-color-picker-edit-form__combine-input').classes()).toContain(
        `is-${mode}`,
      );
      const inputs = panel.findAllComponents(HInputNumber).slice(0, 3);
      inputs[0].vm.$emit('update:modelValue', mode === 'rgb' ? 255 : 180);
      inputs[1].vm.$emit('update:modelValue', 50);
      inputs[2].vm.$emit('update:modelValue', 40);
      inputs[2].vm.$emit('blur', new FocusEvent('blur'));
      await nextTick();
      expect(instance.modelValue.value).not.toBe('');
    }
    expect(onUpdateEditMode).toHaveBeenCalled();

    const noAlpha = new ColorPickerHelper({
      triggerType: 'square',
      editable: true,
      editMode: 'rgb',
      alpha: false,
      updateOnInput: false,
      needConfirm: false,
    });
    noAlpha.modelValue.value = '#123456';
    await nextTick();
    const noAlphaPanel = await noAlpha.open();
    const rgbInputs = noAlphaPanel.findAllComponents(HInputNumber).slice(0, 3);
    rgbInputs[0].vm.$emit('update:modelValue', 1);
    rgbInputs[1].vm.$emit('update:modelValue', 2);
    rgbInputs[2].vm.$emit('update:modelValue', 3);
    rgbInputs[2].vm.$emit('blur', new FocusEvent('blur'));
    await nextTick();
    expect(noAlpha.modelValue.value).toBe('#010203');
  });

  test('auto-selects a sole gradient mode and exercises gradient dragging and degree input', async () => {
    const instance = new ColorPickerHelper({
      triggerType: 'square',
      enableGradient: true,
      gradientList: ['linear'],
      needConfirm: false,
    });
    instance.modelValue.value = '#FF0000';
    await nextTick();
    const panel = await instance.open();
    expect(instance.modelValue.value).toContain('linear-gradient');
    expect(panel.get('.h-color-picker-panel__color-type__list--wrapper').isVisible()).toBe(false);

    const track = panel.get('.h-color-picker-panel__color-type__gradient--track');
    vi.spyOn(track.element, 'getBoundingClientRect').mockReturnValue({
      bottom: 20,
      height: 20,
      left: 0,
      right: 200,
      top: 0,
      width: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    const stop = panel.findAll('.h-color-picker-panel__color-type__gradient--item')[0];
    stop.element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 0 }));
    window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 150 }));
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 150 }));
    await nextTick();
    expect(stop.attributes('style')).toContain('left:');
    const stopCount = panel.findAll('.h-color-picker-panel__color-type__gradient--item').length;
    await panel.get('.h-color-picker-panel__color-type__gradient--track-color').trigger('click', {
      clientX: 100,
    });
    expect(panel.findAll('.h-color-picker-panel__color-type__gradient--item')).toHaveLength(
      stopCount,
    );

    const degree = panel.findComponent(HInputNumber);
    degree.vm.$emit('change', 0);
    degree.vm.$emit('change', 135);
    await nextTick();
    expect(instance.modelValue.value).toContain('135deg');

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Backspace' }));
  });
});
