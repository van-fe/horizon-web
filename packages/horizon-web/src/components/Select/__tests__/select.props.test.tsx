import type { DOMWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import HSelect from '../src/Select';
import HOption from '../src/Option';
import { describe, expect, test, vi } from 'vitest';
import { Fragment, nextTick, ref, shallowRef } from 'vue';
import HPickerInput from '../../Picker/src/components/PickerInput';
import { IconArrowDown, IconCloseFilled, IconPinned } from '@aurora/icon';
import type { OptionProps, SelectProps } from '../src/composables/useProps';
import HPickerPopper from '../../Picker/src/components/PickerPopper';
import HPopover from '../../Popover';
import { sleep } from '~/utils/tools';
import HTag from '../../Tag';
import SelectHelper from './SelectHelper';

describe('Select.tsx', () => {
  test('disabled', async () => {
    const disabled = ref(true);

    const instance = new SelectHelper({
      disabled,
    });

    expect(instance.element.classes('is-disabled')).toBeTruthy();

    disabled.value = false;

    await nextTick();

    expect(instance.element.classes('is-disabled')).toBeFalsy();
  });

  test('clearable', async () => {
    const clearable = ref(false);
    const modelValue = ref(1);
    const instance = new SelectHelper({
      clearable,
      modelValue,
      'onUpdate:modelValue': val => (modelValue.value = val),
    });

    const input = instance.wrapper.findComponent(HPickerInput);

    await input.trigger('mouseenter');

    expect(instance.wrapper.findComponent(IconCloseFilled).exists()).toBeFalsy();

    clearable.value = true;

    await nextTick();

    const clearBtn = instance.wrapper.find('.h-picker__input--icon.is-clear');

    expect(clearBtn.exists()).toBeTruthy();

    await clearBtn.trigger('click');

    expect(modelValue.value).eq(undefined);

    expect(instance.wrapper.findComponent(HPickerPopper).isVisible()).toBeFalsy();
  });

  test('trigger', async () => {
    const trigger = ref<SelectProps['trigger']>('click');
    const instance = new SelectHelper({
      trigger,
      destroyOnHide: true,
    });

    await instance.mainInput?.trigger('click');

    expect(instance.wrapper.findComponent(HPickerPopper).exists()).toBeTruthy();

    await instance.mainInput?.trigger('click');

    expect(instance.wrapper.findComponent(HPickerPopper).exists()).toBeFalsy();

    await instance.close();

    trigger.value = 'hover';

    await nextTick();

    const popover = instance.wrapper.findComponent(HPopover);

    await popover.trigger('mouseenter');

    await sleep(200);

    expect(instance.wrapper.findComponent(HPickerPopper).exists()).toBeTruthy();

    await popover.trigger('mouseleave');

    await sleep(200);

    expect(instance.wrapper.findComponent(HPickerPopper).exists()).toBeFalsy();
  });

  test('placement', async () => {
    const placement = ref<SelectProps['placement']>('bottom-start');
    const instance = new SelectHelper({
      placement,
    });

    await instance.open();

    const popper = instance.wrapper.find('.h-popover__popper');

    await sleep(220);

    expect(popper.attributes('data-popper-placement')).eq('bottom-start');

    placement.value = 'top-start';

    await instance.close();

    await instance.open();

    expect(popper.attributes('data-popper-placement')).eq('top-start');
  });

  test('input-style', async () => {
    const inputStyle = ref<SelectProps['inputStyle']>('normal');
    const instance = new SelectHelper({
      inputStyle,
    });

    expect(instance.mainInput?.classes('h-picker__input--normal')).toBeTruthy();

    inputStyle.value = 'emphasize';

    await nextTick();

    expect(instance.mainInput?.classes('h-picker__input--emphasize')).toBeTruthy();
  });

  test('size', async () => {
    const size = ref<SelectProps['size']>('medium');
    const wrapper = mount(() => <HSelect size={size.value} />);

    const picker = wrapper.findComponent(HPickerInput);

    expect(picker.classes('h-picker__input--medium')).toBeTruthy();

    size.value = 'large';

    await nextTick();

    expect(picker.classes('h-picker__input--large')).toBeTruthy();
  });

  test('value-format.single', async () => {
    const valueFormatCallback = vi.fn();

    const valueFormat = (props: Partial<OptionProps> & Record<string, unknown>) => {
      valueFormatCallback(props);

      return {
        value: props.value,
        label: props.label,
      };
    };

    const modelValue = ref<{ value: number; label: number }>();

    const wrapper = mount(() => (
      <HSelect v-model={modelValue.value} valueFormat={valueFormat}>
        <HOption value={1} label={1} />
        <HOption value={2} label={2} />
      </HSelect>
    ));

    const picker = wrapper.findComponent(HPickerInput);

    await picker.trigger('click');

    const options = wrapper.findAllComponents(HOption);

    await options[0].trigger('click');

    expect(Object.getOwnPropertyNames(modelValue.value)).toContain('value');
    expect(Object.getOwnPropertyNames(modelValue.value)).toContain('label');
    expect(valueFormatCallback).toHaveBeenCalledOnce();
  });

  test('placeholder', async () => {
    const placeholder = ref<SelectProps['placeholder']>();

    const instance = new SelectHelper({
      placeholder,
    });

    const input = instance.mainInput?.find('input');

    expect(input?.attributes('placeholder')).toBeUndefined();

    placeholder.value = 'placeholder';

    await nextTick();

    expect(input?.attributes('placeholder')).eq('placeholder');
  });

  test('need-confirm', async () => {
    const needConfirm = ref<SelectProps['needConfirm']>(true);
    const modelValue = ref();
    const instance = new SelectHelper({
      needConfirm,
      modelValue,
      'onUpdate:modelValue': val => (modelValue.value = val),
    });

    await instance.open();

    await instance.pickOption();

    expect(modelValue.value).toBeUndefined();

    await instance.confirm();

    expect(modelValue.value).toEqual(0);

    needConfirm.value = false;

    await nextTick();

    expect(instance.wrapper.find('.h-picker__pop-content--confirm-wrapper').exists()).toBeFalsy();

    await instance.pickOption(1);

    expect(modelValue.value).toEqual(1);
  });

  test('confirm-button-text and cancel-button-text', async () => {
    const wrapper = mount(() => (
      <HSelect
        needConfirm={true}
        confirmButtonText="COHFIRM"
        cancelButtonText="CAHCEL"
        toBody={false}
      >
        <HOption value={1} label={1} />
        <HOption value={2} label={2} />
      </HSelect>
    ));

    const select = wrapper.findComponent(HSelect);

    await select.trigger('click');

    expect(wrapper.find('.h-picker__pop-content--confirm-wrapper').exists()).toBeTruthy();

    const buttons = wrapper.findAll('.h-picker__pop-content--confirm-wrapper .h-button');

    expect(buttons[0].text()).eq('CAHCEL');
    expect(buttons[1].text()).eq('COHFIRM');
  });

  test('panel-class panel-style', async () => {
    const wrapper = mount(() => (
      <HSelect
        externalPanelClass="panel-class"
        externalPanelStyle={{ display: 'block' }}
        toBody={false}
      />
    ));

    await wrapper.findComponent(HSelect).trigger('click');

    expect(wrapper.find('.panel-class').exists()).toBeTruthy();
    expect(wrapper.find('.h-popover__popcontent').attributes('style')).eq('display: block;');
  });

  test('empty-text', async () => {
    const wrapper = mount(() => <HSelect emptyText="EMPTY" toBody={false} />);

    await wrapper.findComponent(HSelect).trigger('click');

    expect(wrapper.findComponent(HPickerPopper).text()).toEqual('EMPTY');
  });

  test('popover-options', async () => {
    const wrapper = mount(() => <HSelect popoverOptions={{ zIndex: 9999 }} toBody={false} />);

    await wrapper.findComponent(HSelect).trigger('click');

    expect(wrapper.find('.h-popover__popper').attributes('style')).contain('z-index: 10000');
  });

  test('hover-show-delay', async () => {
    const wrapper = mount(() => (
      <HSelect
        trigger="hover"
        hoverShowDelay={300}
        hoverHideDelay={300}
        destroyOnHide={true}
        toBody={false}
      />
    ));

    const popover = wrapper.findComponent(HPopover);

    await popover.trigger('mouseenter');

    await sleep(200);

    expect(wrapper.findComponent(HPickerPopper).exists()).toBeFalsy();

    await sleep(100);

    expect(wrapper.findComponent(HPickerPopper).exists()).toBeTruthy();

    await popover.trigger('mouseleave');

    await sleep(200);

    expect(wrapper.findComponent(HPickerPopper).exists()).toBeTruthy();

    await sleep(100);

    expect(wrapper.findComponent(HPickerPopper).exists()).toBeFalsy();
  });

  test('filterable in single', async () => {
    const filterable = ref(false);
    const onInput = vi.fn();
    const modelValue = ref();

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          filterable={filterable.value}
          placeholder="Please select"
          toBody={false}
          onInput={onInput}
        >
          <HOption value={1} label={1} />
          <HOption value={2} label={2} />
          <HOption value={3} label={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(HSelect);
    const input = wrapper.find('input');

    await select.trigger('click');

    expect(input.attributes('readonly')).not.toBeUndefined();

    filterable.value = true;

    await nextTick();

    expect(input.attributes('readonly')).toBeUndefined();

    await input.setValue('1');

    await sleep(200);

    expect(onInput).toHaveBeenCalledOnce();
    expect(onInput).toHaveBeenCalledWith('1');

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    await input.setValue('');
    await sleep(200);

    expect(onInput).toHaveBeenCalledTimes(2);
    expect(onInput).toHaveBeenCalledWith('');

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeFalsy();
    expect(options[2].classes('is-hide')).toBeFalsy();

    await options[0].trigger('click');

    expect(modelValue.value).toEqual(1);

    await wrapper.trigger('click');

    expect(input.attributes('placeholder')).toBe('1');
    expect(input.element.value).toBe('');

    await select.trigger('click');
    await select.trigger('click');

    await nextTick();

    expect(input.attributes('placeholder')).toBe('1');
    expect(input.element.value).toBe('');
    expect(modelValue.value).toBe(1);
  });

  test('filterable in multiple', async () => {
    const filterable = ref(false);
    const filterMethod = ref<SelectProps['filterMethod']>();
    const onInput = vi.fn();

    const instance = new SelectHelper({
      filterable,
      filterMethod,
      placeholder: 'Please select',
      multiple: true,
      onInput,
    });

    await instance.mainInput?.trigger('click');

    const input = instance.mainInput?.find('input');

    expect(instance.wrapper.findAll('input.h-picker-fit-content-input__input').length).toBe(1);

    expect(input?.attributes('readonly')).not.toBeUndefined();
    expect(input?.classes('is-hide')).toBeFalsy();

    filterable.value = true;

    await nextTick();

    expect(input?.attributes('readonly')).toBeUndefined();

    await input?.setValue('A');

    await sleep(200);

    expect(onInput).toHaveBeenCalledOnce();
    expect(onInput).toHaveBeenCalledWith('A');

    const options = instance.wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    await options[0].trigger('click');

    await sleep(200);

    expect(instance.modelValue.value).toEqual([0]);

    const tagAppendInput = instance.wrapper.find(
      'input.h-picker-fit-content-input__input:not(.is-main)',
    ) as DOMWrapper<HTMLInputElement>;
    await tagAppendInput.trigger('focus');

    expect(input?.isVisible()).toBeFalsy();
    expect(tagAppendInput.element.value).toBe('A');

    await instance.wrapper.find('#outer').trigger('mousedown');

    expect(instance.wrapper.findComponent(HPickerPopper).isVisible()).toBeFalsy();
    expect(tagAppendInput.element.value).toBe('');

    await instance.element.trigger('click');

    expect(input?.attributes('placeholder')).toBe('Please select');
    expect(input?.element.value).toBe('A');
    expect(input?.isVisible()).toBeFalsy();
    expect(tagAppendInput.element.value).toBe('');
  });

  test('filterMethod', async () => {
    const modelValue = ref();

    function filterMethod(input: string, option: OptionProps & Record<string, unknown>) {
      return option.label?.toString().trim().includes(input.trim()) ?? false;
    }

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          filterable={true}
          filterMethod={filterMethod}
          placeholder="Please select"
          toBody={false}
        >
          <HOption value={1} label="aaa" />
          <HOption value={2} label="bbb" />
          <HOption value={3} label="ccc" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(HSelect);
    const input = wrapper.find('input');

    await select.trigger('click');

    await input.setValue('a');

    await sleep(200);

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    await input.setValue('A');
    await sleep(200);

    expect(options[0].classes('is-hide')).toBeTruthy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();
  });

  test('descriptionFilterable', async () => {
    const descriptionFilterable = ref(true);
    const modelValue = ref();

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          filterable={true}
          descriptionFilterable={descriptionFilterable.value}
          placeholder="Please select"
          toBody={false}
        >
          <HOption value={1} label={1} description="A" />
          <HOption value={2} label={2} description="B" />
          <HOption value={3} label={3} description="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(HSelect);
    const input = wrapper.find('input');

    await select.trigger('click');

    await input.setValue('a');

    await sleep(200);

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    descriptionFilterable.value = false;

    await nextTick();

    expect(options[0].classes('is-hide')).toBeTruthy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();
  });

  test('panel-filter-option & panel-filter-input-value', async () => {
    const panelFilterOption = ref(true);
    const panelFilterInputValue = ref('');
    const modelValue = ref();

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          panelFilterOption={panelFilterOption.value}
          panelFilterInputValue={panelFilterInputValue.value}
          placeholder="Please select"
          multiple={true}
          toBody={false}
        >
          <HOption value={1} label={1} />
          <HOption value={2} label={2} />
          <HOption value={3} label={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(HSelect);

    await select.trigger('click');

    panelFilterInputValue.value = '2';

    await nextTick();

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-hide')).toBeTruthy();
    expect(options[1].classes('is-hide')).toBeFalsy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    panelFilterOption.value = false;

    await nextTick();

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeFalsy();
    expect(options[2].classes('is-hide')).toBeFalsy();
  });

  test('panel-filter-option set function', async () => {
    const panelFilterInputValue = ref('');
    const modelValue = ref();

    function filterMethod(input: string, option: OptionProps & Record<string, unknown>) {
      return option.label?.toString().trim().includes(input.trim()) ?? false;
    }

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          panelFilterOption={filterMethod}
          panelFilterInputValue={panelFilterInputValue.value}
          placeholder="Please select"
          multiple={true}
          toBody={false}
        >
          <HOption value="a" label="aa" />
          <HOption value="b" label="bb" />
          <HOption value="c" label="ccA" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HSelect).trigger('click');

    panelFilterInputValue.value = 'A';

    await nextTick();

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-hide')).toBeTruthy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeFalsy();
  });

  test('allow-create in single', async () => {
    const allowCreate = ref(false);
    const onInput = vi.fn();
    const modelValue = ref();

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          filterable={true}
          allowCreate={allowCreate.value}
          placeholder="Please select"
          toBody={false}
          onInput={onInput}
        >
          <HOption value={1} label={1} />
          <HOption value={2} label={2} />
          <HOption value={3} label={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(HSelect);
    const input = wrapper.find('input');

    await select.trigger('click');

    expect(input.attributes('readonly')).toBeUndefined();

    await input.setValue('1');

    await sleep(200);

    expect(wrapper.find('.h-select__create-option').exists()).toBeFalsy();

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    expect(onInput).toHaveBeenCalledOnce();
    expect(onInput).toHaveBeenCalledWith('1');

    allowCreate.value = true;

    await nextTick();

    expect(wrapper.find('.h-select__create-option').exists()).toBeFalsy();

    await input.setValue('4');

    await sleep(200);

    expect(options[0].classes('is-hide')).toBeTruthy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    expect(onInput).toHaveBeenCalledTimes(2);
    expect(onInput).toHaveBeenCalledWith('4');

    const createOption = wrapper.find('.h-select__create-option');
    expect(createOption.exists()).toBeTruthy();

    await createOption.trigger('click');
    // prevent reopen popper after close when macro tasks run out
    await sleep(1);

    expect(modelValue.value).toEqual('4');
    expect(wrapper.findComponent(HPickerPopper).isVisible()).toBeFalsy();
  });

  test('allow-create in multiple', async () => {
    const allowCreate = ref(false);
    const onInput = vi.fn();
    const modelValue = ref();

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          filterable={true}
          allowCreate={allowCreate.value}
          placeholder="Please select"
          multiple={true}
          toBody={false}
          onInput={onInput}
        >
          <HOption value={1} label={1} />
          <HOption value={2} label={2} />
          <HOption value={3} label={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(HSelect);
    const input = wrapper.find('input.h-picker__input--inner') as DOMWrapper<HTMLInputElement>;

    await select.trigger('click');

    await input.setValue('5');

    await sleep(200);

    expect(onInput).toHaveBeenCalledOnce();
    expect(onInput).toHaveBeenCalledWith('5');
    expect(wrapper.find('.h-select__create-option').exists()).toBeFalsy();

    allowCreate.value = true;

    await nextTick();

    const createOption = wrapper.find('.h-select__create-option');
    expect(createOption.exists()).toBeTruthy();

    await createOption.trigger('click');

    const tagAppendInput = wrapper.find(
      'input.h-picker-fit-content-input__input',
    ) as DOMWrapper<HTMLInputElement>;

    wrapper.findAllComponents(HOption).forEach(curr => expect(curr.classes('is-hide')).toBeFalsy());

    expect(modelValue.value).toEqual(['5']);
    expect(wrapper.findComponent(HPickerPopper).isVisible()).toBeTruthy();
    expect(tagAppendInput.element.value).toEqual('');

    await tagAppendInput.setValue('6');
    await sleep(200);

    const createOption2 = wrapper.find('.h-select__create-option');
    expect(createOption2.exists()).toBeTruthy();

    await createOption2.trigger('click');
    await sleep(1);

    wrapper.findAllComponents(HOption).forEach(curr => expect(curr.classes('is-hide')).toBeFalsy());
    expect(modelValue.value).toEqual(['5', '6']);
    expect(wrapper.findComponent(HPickerPopper).isVisible()).toBeTruthy();
    expect(tagAppendInput.element.value).toEqual('');
  });

  test('before-create', async () => {
    const onInput = vi.fn();
    const modelValue = ref();

    function beforeCreate(inputValue: string) {
      return inputValue === '5';
    }

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          filterable={true}
          allowCreate={true}
          beforeCreate={beforeCreate}
          placeholder="Please select"
          toBody={false}
          onInput={onInput}
        >
          <HOption value={1} label={1} />
          <HOption value={2} label={2} />
          <HOption value={3} label={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(HSelect);
    const input = wrapper.find('input');

    await select.trigger('click');

    await input.setValue('4');
    await sleep(200);

    expect(onInput).toHaveBeenCalledOnce();
    expect(onInput).toHaveBeenCalledWith('4');

    const createOption = wrapper.find('.h-select__create-option');
    expect(createOption.exists()).toBeTruthy();

    await createOption.trigger('click');

    expect(modelValue.value).toBeUndefined();
    expect(wrapper.findComponent(HPickerPopper).isVisible()).toBeTruthy();

    await input.setValue('5');
    await sleep(200);

    expect(onInput).toHaveBeenCalledTimes(2);
    expect(onInput).toHaveBeenCalledWith('5');

    const createOption2 = wrapper.find('.h-select__create-option');
    expect(createOption2.exists()).toBeTruthy();

    await createOption2.trigger('click');

    await nextTick();

    expect(modelValue.value).toEqual('5');
    expect(wrapper.findComponent(HPickerPopper).isVisible()).toBeFalsy();
  });

  test('max-collapse-tags', async () => {
    const modelValue = ref([1, 2, 3]);
    const maxCollapseTags = ref(1);

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          multiple={true}
          collapseTags={true}
          toBody={false}
          maxCollapseTags={maxCollapseTags.value}
        >
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await sleep(200);
    await nextTick();

    const tags = wrapper.findAllComponents(HTag);

    expect(tags[0].text()).toEqual('A');
    expect(tags[1].text()).toEqual('+2');

    maxCollapseTags.value = 2;

    await nextTick();

    const tags2 = wrapper.findAllComponents(HTag);

    expect(tags2[0].text()).toEqual('A');
    expect(tags2[1].text()).toEqual('B');
    expect(tags2[2].text()).toEqual('+1');

    modelValue.value = [1, 2];

    await nextTick();
    await nextTick();

    const tags3 = wrapper.findAllComponents(HTag);

    expect(tags3[0].text()).toEqual('A');
    expect(tags3[1].text()).toEqual('B');
    expect(tags3.length).toEqual(2);

    maxCollapseTags.value = 0;

    await nextTick();

    expect(wrapper.findAllComponents(HTag)[0].text()).toEqual('+2');
  });

  test('show-selected-icon', async () => {
    const modelValue = ref();
    const showSelectedIcon = ref(false);

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          toBody={false}
          showSelectedIcon={showSelectedIcon.value}
        >
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    modelValue.value = 1;

    await nextTick();

    await wrapper.findComponent(HSelect).trigger('click');

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('has-icon')).toBeFalsy();

    showSelectedIcon.value = true;

    await nextTick();

    expect(options[0].classes('has-icon')).toBeTruthy();
  });

  test('selectedIcon', async () => {
    const modelValue = ref(1);
    const selectedIcon = shallowRef();

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          toBody={false}
          showSelectedIcon={true}
          selectedIcon={selectedIcon.value}
        >
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HSelect).trigger('click');

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-active')).toBeTruthy();
    expect(options[0].classes('has-icon')).toBeTruthy();

    selectedIcon.value = IconPinned;

    await nextTick();

    expect(wrapper.findComponent(IconPinned).exists()).toBeTruthy();
  });

  test('use-check-all', async () => {
    const modelValue = ref<number | number[]>(1);
    const useCheckAll = ref(false);

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          toBody={false}
          useCheckAll={useCheckAll.value}
          multiple={true}
        >
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.find('.h-select__check-all').exists()).toBeFalsy();

    useCheckAll.value = true;

    await nextTick();

    const checkAll = wrapper.find('.h-select__check-all');
    expect(checkAll.exists()).toBeTruthy();

    await checkAll.trigger('click');

    expect(Array.isArray(modelValue.value)).toBeTruthy();
    expect(modelValue.value).toEqual([1, 2, 3]);
  });

  test('use-check-all-summary', async () => {
    const modelValue = ref<number | number[]>(1);
    const useCheckAllSummary = ref(false);

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          toBody={false}
          useCheckAll={true}
          useCheckAllSummary={useCheckAllSummary.value}
          multiple={true}
        >
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await nextTick();

    const checkAll = wrapper.find('.h-select__check-all');
    expect(checkAll.exists()).toBeTruthy();

    await checkAll.trigger('click');

    expect(Array.isArray(modelValue.value)).toBeTruthy();
    expect(modelValue.value).toEqual([1, 2, 3]);

    const select = wrapper.findComponent(HSelect);
    expect(select.findAllComponents(HTag).length).toEqual(3);

    useCheckAllSummary.value = true;

    await nextTick();

    expect(select.findAllComponents(HTag).length).toEqual(1);
  });

  test('check-all-summary-text', async () => {
    const modelValue = ref<number | number[]>(2);
    const checkAllSummaryText = ref('ALL');

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          toBody={false}
          useCheckAll={true}
          useCheckAllSummary={true}
          checkAllSummaryText={checkAllSummaryText.value}
          multiple={true}
        >
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await nextTick();

    const checkAll = wrapper.find('.h-select__check-all');
    expect(checkAll.exists()).toBeTruthy();

    await checkAll.trigger('click');

    expect(Array.isArray(modelValue.value)).toBeTruthy();
    expect(modelValue.value).toEqual([2, 1, 3]);

    const select = wrapper.findComponent(HSelect);

    expect(select.findComponent(HTag).text()).toEqual('ALL');
  });

  test('use-statistic', async () => {
    const modelValue = ref<number | number[]>([1, 2]);
    const useStatistic = ref(false);

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          toBody={false}
          useStatistic={useStatistic.value}
          statisticText="Options"
          multiple={true}
        >
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.findComponent(HPickerInput).text()).toEqual('');

    useStatistic.value = true;

    await nextTick();

    const statisticElement = wrapper.find('.h-picker__input--static-text');
    expect(statisticElement.exists()).toBeTruthy();
    expect(statisticElement.text()).toEqual('Options (2)');
  });

  test('selected-visible in single', async () => {
    const modelValue = ref(1);
    const selectedVisible = ref(true);

    const wrapper = mount(
      () => (
        <HSelect v-model={modelValue.value} toBody={false} selectedVisible={selectedVisible.value}>
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HSelect).trigger('click');

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-hide')).toBeFalsy();

    selectedVisible.value = false;

    await nextTick();

    expect(options[0].classes('is-hide')).toBeTruthy();

    modelValue.value = 2;

    await nextTick();

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeTruthy();
  });

  test('selected-visible in multiple', async () => {
    const modelValue = ref<number[] | null>([1]);
    const selectedVisible = ref(true);

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          toBody={false}
          selectedVisible={selectedVisible.value}
          multiple={true}
        >
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HSelect).trigger('click');

    const options = wrapper.findAllComponents(HOption);

    expect(options[0].classes('is-hide')).toBeFalsy();

    selectedVisible.value = false;

    await nextTick();

    expect(options[0].classes('is-hide')).toBeTruthy();

    modelValue.value = [1, 2, 3];

    await nextTick();

    options.forEach(opt => expect(opt.classes('is-hide')).toBeTruthy());

    modelValue.value = null;

    await nextTick();

    options.forEach(opt => expect(opt.classes('is-hide')).toBeFalsy());
  });

  test('dropdown-icon', async () => {
    const dropdownIcon = shallowRef();

    const wrapper = mount(
      () => (
        <HSelect toBody={false} dropdownIcon={dropdownIcon.value} multiple={true}>
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.find('.h-picker__input--icon.is-dropdown > svg').exists()).toBeTruthy();

    dropdownIcon.value = false;

    await nextTick();

    expect(wrapper.find('.h-picker__input--icon.is-dropdown > svg').exists()).toBeFalsy();

    dropdownIcon.value = IconArrowDown;

    await nextTick();

    expect(wrapper.findComponent(IconArrowDown).exists()).toBeTruthy();
  });

  test('external-select-style external-select-class external-panel-style external-panel-class', async () => {
    const wrapper = mount(
      () => (
        <HSelect
          toBody={false}
          externalSelectStyle={{ display: 'flex' }}
          externalSelectClass="external-select-class"
          externalPanelStyle={{ transition: 'all .2s' }}
          externalPanelClass="external-panel-class"
        >
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.findComponent(HSelect).attributes('style')).contain('display: flex;');
    expect(wrapper.findComponent(HSelect).classes('external-select-class')).toBeTruthy();
    expect(wrapper.find('.h-picker__pop-content').attributes('style')).contain(
      'transition: all .2s;',
    );
    expect(
      wrapper.find('.h-picker__pop-content--wrapper').classes('external-panel-class'),
    ).toBeTruthy();
  });

  test('show-search', async () => {
    const showSearch = ref(false);

    // eslint-disable-next-line
    let instance: SelectHelper<any>;

    const onSearch = vi.fn();

    const onFocus = vi.fn();
    const onBlur = vi.fn();

    function doSearch(val: string) {
      onSearch(val);

      instance.modifyOptions(['1', '11', '111']);
    }

    instance = new SelectHelper(
      {
        toBody: false,
        showSearch,
        onSearch: doSearch,
        onFocus,
        onBlur,
      },
      [],
    );

    expect(
      instance.wrapper.findComponent(HPickerInput).find('input').attributes('readonly'),
    ).not.toBeUndefined();

    showSearch.value = true;

    await nextTick();
    await instance.open();

    expect(
      instance.wrapper.findComponent(HPickerInput).find('input').attributes('readonly'),
    ).toBeUndefined();

    await instance.mainInput?.find('input').setValue('1');
    await sleep(200);
    await sleep();

    expect(onSearch).toHaveBeenCalledOnce();
    expect(onFocus).toHaveBeenCalledOnce();
    expect(onBlur).toHaveBeenCalledTimes(0);
    expect(instance.wrapper.findComponent(HPickerPopper).isVisible()).toBeTruthy();

    await instance.wrapper.findComponent(HOption).trigger('click');
    await sleep(1000);

    expect(instance.modelValue.value).toBe('1');
    expect(onSearch).toHaveBeenCalledOnce();
    expect(onFocus).toHaveBeenCalledOnce();
    expect(onBlur).toHaveBeenCalledOnce();
    expect(instance.wrapper.findComponent(HPickerPopper).isVisible()).toBeFalsy();
  });

  test('loading', async () => {
    const loading = ref(false);
    const wrapper = mount(
      () => (
        <HSelect toBody={false} loading={loading.value}>
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HSelect).trigger('click');

    expect(wrapper.find('.h-icon__loading_line').exists()).toBeFalsy();

    loading.value = true;

    await nextTick();

    expect(wrapper.find('.h-icon__loading_line').exists()).toBeTruthy();
  });

  test('option-loading-text', async () => {
    const loading = ref(false);

    const instance = new SelectHelper({
      loading,
      optionLoadingText: 'LOADIHG TEXT',
    });

    await instance.open();

    loading.value = true;

    await nextTick();

    expect(instance.popover.find('.h-loading').text()).toBe('LOADIHG TEXT');
  });

  test('option-max-lines', async () => {
    const wrapper = mount(
      () => (
        <HSelect toBody={false} optionMaxLines={3}>
          <HOption value={1} label="A" />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HSelect).trigger('click');

    wrapper
      .findAll('.h-select-option')
      .forEach(opt =>
        expect(opt.attributes('style')).contains('--h-select-size-option-max-line: 3;'),
      );
  });

  test('input-status', () => {
    const wrapper = mount(() => <HSelect inputStatus="error" />);
    expect(wrapper.findComponent(HPickerInput).classes()).toContain('is-error');
  });

  test('multiple and multiple-limit', async () => {
    const modelValue = ref([]);
    const multipleLimit = ref(1);
    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          multiple={true}
          multipleLimit={multipleLimit.value}
          toBody={false}
        >
          <HOption label="1" value={1} />
          <HOption label="2" value={2} />
          <HOption label="3" value={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const trigger = wrapper.findComponent(HPickerInput);

    await trigger.trigger('click');

    const options = wrapper.findAllComponents(HOption);

    await options[0].trigger('click');
    expect(modelValue.value.length).eq(1);

    await options[1].trigger('click');
    expect(modelValue.value.length).eq(1);

    multipleLimit.value = 3;

    await nextTick();

    await options[1].trigger('click');
    expect(modelValue.value.length).eq(2);

    await options[2].trigger('click');
    expect(modelValue.value.length).eq(3);

    multipleLimit.value = 1;

    await nextTick();

    expect(modelValue.value.length).eq(1);
  });

  test('selected value set to top in multiple', async () => {
    const instance = new SelectHelper({
      multiple: true,
      toBody: false,
      selectedOptionOrderToTop: true,
    });

    const checkOrderNotChanged = (value: number) => {
      const selectedOptionsDom = instance.wrapper.findAll(
        `.h-select-option[data-value="${value}"]`,
      );
      for (const dom of selectedOptionsDom) {
        expect(dom.attributes('style')).contain('order: 1;');
      }
    };

    const checkOrder = () => {
      const selectedOptionsDom = instance.wrapper.findAll('.h-select-option.is-active');
      for (const dom of selectedOptionsDom) {
        expect(dom.attributes('style')).contain('order: 0;');
      }

      const notSelectedOptionsDom = instance.wrapper.findAll('.h-select-option:not(.is-active)');
      for (const dom of notSelectedOptionsDom) {
        expect(dom.attributes('style')).contain('order: 1;');
      }
    };

    const option1 = instance.wrapper.find('.h-select-option[data-value="1"]');

    const option2 = instance.wrapper.find('.h-select-option[data-value="2"]');

    await instance.open();

    await option1.trigger('click');

    checkOrderNotChanged(1);

    await instance.close();
    await instance.open();

    await nextTick();

    checkOrder();

    await instance.close();
    await instance.open();

    await option2.trigger('click');

    checkOrderNotChanged(2);

    await instance.close();
    await instance.open();
    await nextTick();

    checkOrder();
  });

  test('selected value set to top in single', async () => {
    const modelValue = ref<number>();
    const wrapper = mount(
      () => (
        <HSelect v-model={modelValue.value} toBody={false} selectedOptionOrderToTop={true}>
          <HOption label="1" value={1} />
          <HOption label="2" value={2} />
          <HOption label="3" value={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const trigger = wrapper.findComponent(HPickerInput);

    const option1 = wrapper.find('.h-select-option');

    await trigger.trigger('click');

    await option1.trigger('click');

    await wrapper.trigger('click');

    await nextTick();

    const selectedOptionDom = wrapper.find('.h-select-option[data-value="1"]');

    const notSelectOptionDom1 = wrapper.find('.h-select-option[data-value="2"]');

    const notSelectOptionDom2 = wrapper.find('.h-select-option[data-value="3"]');

    expect(selectedOptionDom.attributes('style')).contain('order: 0;');
    expect(notSelectOptionDom1.attributes('style')).contain('order: 1;');
    expect(notSelectOptionDom2.attributes('style')).contain('order: 1;');
  });

  test('initial-value', async () => {
    const modelValue = ref<any>([]);
    const wrapper = mount(
      () => (
        <HSelect v-model={modelValue.value} initialValue={null} clearable={true} toBody={false}>
          <HOption label="1" value={1} />
          <HOption label="2" value={2} />
          <HOption label="3" value={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(modelValue.value).toEqual([]);

    modelValue.value = 1;

    await nextTick();

    await wrapper.findComponent(HPickerInput).trigger('mouseenter');

    const clearBtn = wrapper.find('.h-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toEqual(null);
  });

  test('initial-value with multiple', async () => {
    const modelValue = ref<number[]>([]);

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          multiple={true}
          initialValue={null}
          clearable={true}
          toBody={false}
        >
          <HOption label="1" value={1} />
          <HOption label="2" value={2} />
          <HOption label="3" value={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(modelValue.value).toEqual([]);

    modelValue.value = [1];

    await nextTick();

    await wrapper.findComponent(HPickerInput).trigger('mouseenter');

    const clearBtn = wrapper.find('.h-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toBeNull();
  });

  test('initial-value with multiple and set undefined', async () => {
    const modelValue = ref<number[]>([]);

    const wrapper = mount(
      () => (
        <HSelect
          v-model={modelValue.value}
          multiple={true}
          initialValue={Symbol.for('undefined')}
          clearable={true}
          toBody={false}
        >
          <HOption label="1" value={1} />
          <HOption label="2" value={2} />
          <HOption label="3" value={3} />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(modelValue.value).toEqual([]);

    modelValue.value = [1];

    await nextTick();

    await wrapper.findComponent(HPickerInput).trigger('mouseenter');

    const clearBtn = wrapper.find('.h-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toBeUndefined();
  });

  test('reserve-keyword', async () => {
    const modelValue = ref<number[]>([]);

    const reserveKeyword = ref<SelectProps['reserveKeyword']>(true);

    const wrapper = mount(
      () => (
        <Fragment>
          <HSelect
            v-model={modelValue.value}
            multiple={true}
            reserveKeyword={reserveKeyword.value}
            filterable={true}
            toBody={false}
          >
            <HOption label="1" value={1} />
            <HOption label="2" value={2} />
            <HOption label="3" value={3} />
          </HSelect>
          <div id="outer"></div>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    const input = wrapper.find('input');

    async function reset() {
      modelValue.value = [];

      await wrapper.find('#outer').trigger('mousedown');

      await nextTick();

      expect(input.element.value).toEqual('');
    }

    async function filterAndPick(value = '1') {
      await wrapper.findComponent(HSelect).trigger('click');

      await input.setValue(value);

      await sleep(200);

      await wrapper.findAllComponents(HOption)[0].trigger('click');

      await sleep(200);

      await nextTick();
    }

    await filterAndPick();

    expect(
      (
        wrapper.find(
          '.h-picker-fit-content-input__input:not(.is-main)',
        ) as DOMWrapper<HTMLInputElement>
      ).element.value,
    ).toEqual('1');

    await filterAndPick();

    expect(
      (wrapper.find('.h-picker-fit-content-input__input.is-main') as DOMWrapper<HTMLInputElement>)
        .element.value,
    ).toEqual('1');

    await reset();

    reserveKeyword.value = false;

    await nextTick();

    await filterAndPick();

    expect(
      (
        wrapper.find(
          '.h-picker-fit-content-input__input:not(.is-main)',
        ) as DOMWrapper<HTMLInputElement>
      ).element.value,
    ).toEqual('');

    await filterAndPick();

    await nextTick();

    expect(
      (wrapper.find('.h-picker-fit-content-input__input.is-main') as DOMWrapper<HTMLInputElement>)
        .element.value,
    ).toEqual('');

    reserveKeyword.value = 'reserve-deselect';

    await nextTick();

    await filterAndPick();

    expect(
      (
        wrapper.find(
          '.h-picker-fit-content-input__input:not(.is-main)',
        ) as DOMWrapper<HTMLInputElement>
      ).element.value,
    ).toEqual('');

    await filterAndPick();

    expect(
      (wrapper.find('.h-picker-fit-content-input__input.is-main') as DOMWrapper<HTMLInputElement>)
        .element.value,
    ).toEqual('1');

    // reserve-special unit test put in select.special.test.tsx
  });

  test('value-format with single choice', async () => {
    const modelValue = shallowRef({ value: 1, label: '1' });

    function valueFormat(originValue: OptionProps | Record<string, unknown>) {
      return {
        value: originValue.value,
        label: originValue.label,
      };
    }

    const wrapper = mount(
      () => (
        <>
          <HSelect v-model={modelValue.value} valueFormat={valueFormat} toBody={false}>
            <HOption label="1" value={1} />
            <HOption label="2" value={2} />
            <HOption label="3" value={3} />
          </HSelect>
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    await sleep(0);

    expect(wrapper.findComponent(HPickerInput).text()).toBe('1');
  });

  test('value-format with multiple choice', async () => {
    const modelValue = shallowRef([{ value: 1, label: '1' }]);

    function valueFormat(originValue: OptionProps | Record<string, unknown>) {
      return {
        value: originValue.value,
        label: originValue.label,
      };
    }

    const wrapper = mount(
      () => (
        <>
          <HSelect
            v-model={modelValue.value}
            valueFormat={valueFormat}
            multiple={true}
            toBody={false}
          >
            <HOption label="1" value={1} />
            <HOption label="2" value={2} />
            <HOption label="3" value={3} />
          </HSelect>
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    await sleep(0);

    expect(wrapper.findComponent(HPickerInput).text()).toBe('11');
  });
});
