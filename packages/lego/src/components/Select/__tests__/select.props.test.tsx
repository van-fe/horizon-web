import type { DOMWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import NSelect from '../src/Select';
import NOption from '../src/Option';
import { describe, expect, test, vi } from 'vitest';
import { Fragment, nextTick, ref, shallowRef } from 'vue';
import NPickerInput from '../../Picker/src/components/NPickerInput';
import { IconArrowDown, IconCloseFilled, IconPinned } from '@nio-fe/icon';
import type { OptionProps, SelectProps } from '../src/composables/useProps';
import NPickerPopper from '../../Picker/src/components/NPickerPopper';
import NPopover from '../../Popover';
import { sleep } from '~/utils/tools';
import NTag from '../../Tag';
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

    const input = instance.wrapper.findComponent(NPickerInput);

    await input.trigger('mouseenter');

    expect(instance.wrapper.findComponent(IconCloseFilled).exists()).toBeFalsy();

    clearable.value = true;

    await nextTick();

    const clearBtn = instance.wrapper.find('.n-picker__input--icon.is-clear');

    expect(clearBtn.exists()).toBeTruthy();

    await clearBtn.trigger('click');

    expect(modelValue.value).eq(undefined);

    expect(instance.wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test('trigger', async () => {
    const trigger = ref<SelectProps['trigger']>('click');
    const instance = new SelectHelper({
      trigger,
      destroyOnHide: true,
    });

    await instance.mainInput?.trigger('click');

    expect(instance.wrapper.findComponent(NPickerPopper).exists()).toBeTruthy();

    await instance.mainInput?.trigger('click');

    expect(instance.wrapper.findComponent(NPickerPopper).exists()).toBeFalsy();

    await instance.close();

    trigger.value = 'hover';

    await nextTick();

    const popover = instance.wrapper.findComponent(NPopover);

    await popover.trigger('mouseenter');

    await sleep(200);

    expect(instance.wrapper.findComponent(NPickerPopper).exists()).toBeTruthy();

    await popover.trigger('mouseleave');

    await sleep(200);

    expect(instance.wrapper.findComponent(NPickerPopper).exists()).toBeFalsy();
  });

  test('placement', async () => {
    const placement = ref<SelectProps['placement']>('bottom-start');
    const instance = new SelectHelper({
      placement,
    });

    await instance.open();

    const popper = instance.wrapper.find('.n-popover__popper');

    await sleep(220);

    expect(popper.attributes('data-popper-placement')).eq('bottom-start');

    placement.value = 'top-start';

    await instance.close();

    await instance.open();

    expect(popper.attributes('data-popper-placement')).eq('top-start');
  });

  test('select-style', async () => {
    const selectStyle = ref<SelectProps['selectStyle']>('normal');
    const instance = new SelectHelper({
      selectStyle,
    });

    expect(instance.mainInput?.classes('n-picker__input--normal')).toBeTruthy();

    selectStyle.value = 'no-border';

    await nextTick();

    expect(instance.mainInput?.classes('n-picker__input--no-border')).toBeTruthy();
  });

  test('input-style', async () => {
    const inputStyle = ref<SelectProps['inputStyle']>('normal');
    const instance = new SelectHelper({
      inputStyle,
    });

    expect(instance.mainInput?.classes('n-picker__input--normal')).toBeTruthy();

    inputStyle.value = 'emphasize';

    await nextTick();

    expect(instance.mainInput?.classes('n-picker__input--emphasize')).toBeTruthy();
  });

  test('size', async () => {
    const size = ref<SelectProps['size']>('medium');
    const wrapper = mount(() => <NSelect size={size.value} />);

    const picker = wrapper.findComponent(NPickerInput);

    expect(picker.classes('n-picker__input--medium')).toBeTruthy();

    size.value = 'large';

    await nextTick();

    expect(picker.classes('n-picker__input--large')).toBeTruthy();
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
      <NSelect v-model={modelValue.value} valueFormat={valueFormat}>
        <NOption value={1} label={1} />
        <NOption value={2} label={2} />
      </NSelect>
    ));

    const picker = wrapper.findComponent(NPickerInput);

    await picker.trigger('click');

    const options = wrapper.findAllComponents(NOption);

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

    expect(instance.wrapper.find('.n-picker__pop-content--confirm-wrapper').exists()).toBeFalsy();

    await instance.pickOption(1);

    expect(modelValue.value).toEqual(1);
  });

  test('confirm-btn-text and cancel-btn-text', async () => {
    const wrapper = mount(() => (
      <NSelect needConfirm={true} confirmBtnText="CONFIRM" cancelBtnText="CANCEL" toBody={false}>
        <NOption value={1} label={1} />
        <NOption value={2} label={2} />
      </NSelect>
    ));

    const select = wrapper.findComponent(NSelect);

    await select.trigger('click');

    expect(wrapper.find('.n-picker__pop-content--confirm-wrapper').exists()).toBeTruthy();

    const buttons = wrapper.findAll('.n-picker__pop-content--confirm-wrapper .n-button');

    expect(buttons[0].text()).eq('CANCEL');
    expect(buttons[1].text()).eq('CONFIRM');
  });

  test('panel-class panel-style', async () => {
    const wrapper = mount(() => (
      <NSelect
        externalPanelClass="panel-class"
        externalPanelStyle={{ display: 'block' }}
        toBody={false}
      />
    ));

    await wrapper.findComponent(NSelect).trigger('click');

    expect(wrapper.find('.panel-class').exists()).toBeTruthy();
    expect(wrapper.find('.n-popover__popcontent').attributes('style')).eq('display: block;');
  });

  test('empty-text', async () => {
    const wrapper = mount(() => <NSelect emptyText="EMPTY" toBody={false} />);

    await wrapper.findComponent(NSelect).trigger('click');

    expect(wrapper.findComponent(NPickerPopper).text()).toEqual('EMPTY');
  });

  test('popover-options', async () => {
    const wrapper = mount(() => <NSelect popoverOptions={{ zIndex: 9999 }} toBody={false} />);

    await wrapper.findComponent(NSelect).trigger('click');

    expect(wrapper.find('.n-popover__popper').attributes('style')).contain('z-index: 10000');
  });

  test('hover-show-delay', async () => {
    const wrapper = mount(() => (
      <NSelect
        trigger="hover"
        hoverShowDelay={300}
        hoverHideDelay={300}
        destroyOnHide={true}
        toBody={false}
      />
    ));

    const popover = wrapper.findComponent(NPopover);

    await popover.trigger('mouseenter');

    await sleep(200);

    expect(wrapper.findComponent(NPickerPopper).exists()).toBeFalsy();

    await sleep(100);

    expect(wrapper.findComponent(NPickerPopper).exists()).toBeTruthy();

    await popover.trigger('mouseleave');

    await sleep(200);

    expect(wrapper.findComponent(NPickerPopper).exists()).toBeTruthy();

    await sleep(100);

    expect(wrapper.findComponent(NPickerPopper).exists()).toBeFalsy();
  });

  test('filterable in single', async () => {
    const filterable = ref(false);
    const onInput = vi.fn();
    const modelValue = ref();

    const wrapper = mount(
      () => (
        <NSelect
          v-model={modelValue.value}
          filterable={filterable.value}
          placeholder="Please select"
          toBody={false}
          onInput={onInput}
        >
          <NOption value={1} label={1} />
          <NOption value={2} label={2} />
          <NOption value={3} label={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NSelect);
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

    const options = wrapper.findAllComponents(NOption);

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

    expect(instance.wrapper.findAll('input.n-picker-fit-content-input__input').length).toBe(1);

    expect(input?.attributes('readonly')).not.toBeUndefined();
    expect(input?.classes('is-hide')).toBeFalsy();

    filterable.value = true;

    await nextTick();

    expect(input?.attributes('readonly')).toBeUndefined();

    await input?.setValue('A');

    await sleep(200);

    expect(onInput).toHaveBeenCalledOnce();
    expect(onInput).toHaveBeenCalledWith('A');

    const options = instance.wrapper.findAllComponents(NOption);

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    await options[0].trigger('click');

    await sleep(200);

    expect(instance.modelValue.value).toEqual([0]);

    const tagAppendInput = instance.wrapper.find(
      'input.n-picker-fit-content-input__input:not(.is-main)',
    ) as DOMWrapper<HTMLInputElement>;
    await tagAppendInput.trigger('focus');

    expect(input?.isVisible()).toBeFalsy();
    expect(tagAppendInput.element.value).toBe('A');

    await instance.wrapper.find('#outer').trigger('mousedown');

    expect(instance.wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
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
        <NSelect
          v-model={modelValue.value}
          filterable={true}
          filterMethod={filterMethod}
          placeholder="Please select"
          toBody={false}
        >
          <NOption value={1} label="aaa" />
          <NOption value={2} label="bbb" />
          <NOption value={3} label="ccc" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NSelect);
    const input = wrapper.find('input');

    await select.trigger('click');

    await input.setValue('a');

    await sleep(200);

    const options = wrapper.findAllComponents(NOption);

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
        <NSelect
          v-model={modelValue.value}
          filterable={true}
          descriptionFilterable={descriptionFilterable.value}
          placeholder="Please select"
          toBody={false}
        >
          <NOption value={1} label={1} description="A" />
          <NOption value={2} label={2} description="B" />
          <NOption value={3} label={3} description="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NSelect);
    const input = wrapper.find('input');

    await select.trigger('click');

    await input.setValue('a');

    await sleep(200);

    const options = wrapper.findAllComponents(NOption);

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
        <NSelect
          v-model={modelValue.value}
          panelFilterOption={panelFilterOption.value}
          panelFilterInputValue={panelFilterInputValue.value}
          placeholder="Please select"
          multiple={true}
          toBody={false}
        >
          <NOption value={1} label={1} />
          <NOption value={2} label={2} />
          <NOption value={3} label={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NSelect);

    await select.trigger('click');

    panelFilterInputValue.value = '2';

    await nextTick();

    const options = wrapper.findAllComponents(NOption);

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
        <NSelect
          v-model={modelValue.value}
          panelFilterOption={filterMethod}
          panelFilterInputValue={panelFilterInputValue.value}
          placeholder="Please select"
          multiple={true}
          toBody={false}
        >
          <NOption value="a" label="aa" />
          <NOption value="b" label="bb" />
          <NOption value="c" label="ccA" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    panelFilterInputValue.value = 'A';

    await nextTick();

    const options = wrapper.findAllComponents(NOption);

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
        <NSelect
          v-model={modelValue.value}
          filterable={true}
          allowCreate={allowCreate.value}
          placeholder="Please select"
          toBody={false}
          onInput={onInput}
        >
          <NOption value={1} label={1} />
          <NOption value={2} label={2} />
          <NOption value={3} label={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NSelect);
    const input = wrapper.find('input');

    await select.trigger('click');

    expect(input.attributes('readonly')).toBeUndefined();

    await input.setValue('1');

    await sleep(200);

    expect(wrapper.find('.n-select__create-option').exists()).toBeFalsy();

    const options = wrapper.findAllComponents(NOption);

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    expect(onInput).toHaveBeenCalledOnce();
    expect(onInput).toHaveBeenCalledWith('1');

    allowCreate.value = true;

    await nextTick();

    expect(wrapper.find('.n-select__create-option').exists()).toBeFalsy();

    await input.setValue('4');

    await sleep(200);

    expect(options[0].classes('is-hide')).toBeTruthy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    expect(onInput).toHaveBeenCalledTimes(2);
    expect(onInput).toHaveBeenCalledWith('4');

    const createOption = wrapper.find('.n-select__create-option');
    expect(createOption.exists()).toBeTruthy();

    await createOption.trigger('click');
    // prevent reopen popper after close when macro tasks run out
    await sleep(1);

    expect(modelValue.value).toEqual('4');
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test('allow-create in multiple', async () => {
    const allowCreate = ref(false);
    const onInput = vi.fn();
    const modelValue = ref();

    const wrapper = mount(
      () => (
        <NSelect
          v-model={modelValue.value}
          filterable={true}
          allowCreate={allowCreate.value}
          placeholder="Please select"
          multiple={true}
          toBody={false}
          onInput={onInput}
        >
          <NOption value={1} label={1} />
          <NOption value={2} label={2} />
          <NOption value={3} label={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NSelect);
    const input = wrapper.find('input.n-picker__input--inner') as DOMWrapper<HTMLInputElement>;

    await select.trigger('click');

    await input.setValue('5');

    await sleep(200);

    expect(onInput).toHaveBeenCalledOnce();
    expect(onInput).toHaveBeenCalledWith('5');
    expect(wrapper.find('.n-select__create-option').exists()).toBeFalsy();

    allowCreate.value = true;

    await nextTick();

    const createOption = wrapper.find('.n-select__create-option');
    expect(createOption.exists()).toBeTruthy();

    await createOption.trigger('click');

    const tagAppendInput = wrapper.find(
      'input.n-picker-fit-content-input__input',
    ) as DOMWrapper<HTMLInputElement>;

    wrapper.findAllComponents(NOption).forEach(curr => expect(curr.classes('is-hide')).toBeFalsy());

    expect(modelValue.value).toEqual(['5']);
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();
    expect(tagAppendInput.element.value).toEqual('');

    await tagAppendInput.setValue('6');
    await sleep(200);

    const createOption2 = wrapper.find('.n-select__create-option');
    expect(createOption2.exists()).toBeTruthy();

    await createOption2.trigger('click');
    await sleep(1);

    wrapper.findAllComponents(NOption).forEach(curr => expect(curr.classes('is-hide')).toBeFalsy());
    expect(modelValue.value).toEqual(['5', '6']);
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();
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
        <NSelect
          v-model={modelValue.value}
          filterable={true}
          allowCreate={true}
          beforeCreate={beforeCreate}
          placeholder="Please select"
          toBody={false}
          onInput={onInput}
        >
          <NOption value={1} label={1} />
          <NOption value={2} label={2} />
          <NOption value={3} label={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NSelect);
    const input = wrapper.find('input');

    await select.trigger('click');

    await input.setValue('4');
    await sleep(200);

    expect(onInput).toHaveBeenCalledOnce();
    expect(onInput).toHaveBeenCalledWith('4');

    const createOption = wrapper.find('.n-select__create-option');
    expect(createOption.exists()).toBeTruthy();

    await createOption.trigger('click');

    expect(modelValue.value).toBeUndefined();
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();

    await input.setValue('5');
    await sleep(200);

    expect(onInput).toHaveBeenCalledTimes(2);
    expect(onInput).toHaveBeenCalledWith('5');

    const createOption2 = wrapper.find('.n-select__create-option');
    expect(createOption2.exists()).toBeTruthy();

    await createOption2.trigger('click');

    await nextTick();

    expect(modelValue.value).toEqual('5');
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test.skip('collapse & collapse-tags collapse-tags-tooltip', () => {
    console.debug("Because the style not inject in vitest, these props can't do test");
  });

  test('max-collapse-tags', async () => {
    const modelValue = ref([1, 2, 3]);
    const maxCollapseTags = ref(1);

    const wrapper = mount(
      () => (
        <NSelect
          v-model={modelValue.value}
          multiple={true}
          collapseTags={true}
          toBody={false}
          maxCollapseTags={maxCollapseTags.value}
        >
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await sleep(200);
    await nextTick();

    const tags = wrapper.findAllComponents(NTag);

    expect(tags[0].text()).toEqual('A');
    expect(tags[1].text()).toEqual('+2');

    maxCollapseTags.value = 2;

    await nextTick();

    const tags2 = wrapper.findAllComponents(NTag);

    expect(tags2[0].text()).toEqual('A');
    expect(tags2[1].text()).toEqual('B');
    expect(tags2[2].text()).toEqual('+1');

    modelValue.value = [1, 2];

    await nextTick();
    await nextTick();

    const tags3 = wrapper.findAllComponents(NTag);

    expect(tags3[0].text()).toEqual('A');
    expect(tags3[1].text()).toEqual('B');
    expect(tags3.length).toEqual(2);

    maxCollapseTags.value = 0;

    await nextTick();

    expect(wrapper.findAllComponents(NTag)[0].text()).toEqual('+2');
  });

  test('show-selected-icon', async () => {
    const modelValue = ref();
    const showSelectedIcon = ref(false);

    const wrapper = mount(
      () => (
        <NSelect
          v-model={modelValue.value}
          toBody={false}
          showSelectedIcon={showSelectedIcon.value}
        >
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    modelValue.value = 1;

    await nextTick();

    await wrapper.findComponent(NSelect).trigger('click');

    const options = wrapper.findAllComponents(NOption);

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
        <NSelect
          v-model={modelValue.value}
          toBody={false}
          showSelectedIcon={true}
          selectedIcon={selectedIcon.value}
        >
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    const options = wrapper.findAllComponents(NOption);

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
        <NSelect
          v-model={modelValue.value}
          toBody={false}
          useCheckAll={useCheckAll.value}
          multiple={true}
        >
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.find('.n-select__check-all').exists()).toBeFalsy();

    useCheckAll.value = true;

    await nextTick();

    const checkAll = wrapper.find('.n-select__check-all');
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
        <NSelect
          v-model={modelValue.value}
          toBody={false}
          useCheckAll={true}
          useCheckAllSummary={useCheckAllSummary.value}
          multiple={true}
        >
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await nextTick();

    const checkAll = wrapper.find('.n-select__check-all');
    expect(checkAll.exists()).toBeTruthy();

    await checkAll.trigger('click');

    expect(Array.isArray(modelValue.value)).toBeTruthy();
    expect(modelValue.value).toEqual([1, 2, 3]);

    const select = wrapper.findComponent(NSelect);
    expect(select.findAllComponents(NTag).length).toEqual(3);

    useCheckAllSummary.value = true;

    await nextTick();

    expect(select.findAllComponents(NTag).length).toEqual(1);
  });

  test('check-all-summary-text', async () => {
    const modelValue = ref<number | number[]>(2);
    const checkAllSummaryText = ref('ALL');

    const wrapper = mount(
      () => (
        <NSelect
          v-model={modelValue.value}
          toBody={false}
          useCheckAll={true}
          useCheckAllSummary={true}
          checkAllSummaryText={checkAllSummaryText.value}
          multiple={true}
        >
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await nextTick();

    const checkAll = wrapper.find('.n-select__check-all');
    expect(checkAll.exists()).toBeTruthy();

    await checkAll.trigger('click');

    expect(Array.isArray(modelValue.value)).toBeTruthy();
    expect(modelValue.value).toEqual([2, 1, 3]);

    const select = wrapper.findComponent(NSelect);

    expect(select.findComponent(NTag).text()).toEqual('ALL');
  });

  test('use-statistic', async () => {
    const modelValue = ref<number | number[]>([1, 2]);
    const useStatistic = ref(false);

    const wrapper = mount(
      () => (
        <NSelect
          v-model={modelValue.value}
          toBody={false}
          useStatistic={useStatistic.value}
          statisticText="Options"
          multiple={true}
        >
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.findComponent(NPickerInput).text()).toEqual('');

    useStatistic.value = true;

    await nextTick();

    const statisticElement = wrapper.find('.n-picker__input--static-text');
    expect(statisticElement.exists()).toBeTruthy();
    expect(statisticElement.text()).toEqual('Options (2)');
  });

  test('selected-visible in single', async () => {
    const modelValue = ref(1);
    const selectedVisible = ref(true);

    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} toBody={false} selectedVisible={selectedVisible.value}>
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    const options = wrapper.findAllComponents(NOption);

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
        <NSelect
          v-model={modelValue.value}
          toBody={false}
          selectedVisible={selectedVisible.value}
          multiple={true}
        >
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    const options = wrapper.findAllComponents(NOption);

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
        <NSelect toBody={false} dropdownIcon={dropdownIcon.value} multiple={true}>
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.find('.n-picker__input--icon.is-dropdown > svg').exists()).toBeTruthy();

    dropdownIcon.value = false;

    await nextTick();

    expect(wrapper.find('.n-picker__input--icon.is-dropdown > svg').exists()).toBeFalsy();

    dropdownIcon.value = IconArrowDown;

    await nextTick();

    expect(wrapper.findComponent(IconArrowDown).exists()).toBeTruthy();
  });

  test('external-select-style external-select-class external-panel-style external-panel-class', async () => {
    const wrapper = mount(
      () => (
        <NSelect
          toBody={false}
          externalSelectStyle={{ display: 'flex' }}
          externalSelectClass="external-select-class"
          externalPanelStyle={{ transition: 'all .2s' }}
          externalPanelClass="external-panel-class"
        >
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.findComponent(NSelect).attributes('style')).contain('display: flex;');
    expect(wrapper.findComponent(NSelect).classes('external-select-class')).toBeTruthy();
    expect(wrapper.find('.n-picker__pop-content').attributes('style')).contain(
      'transition: all .2s;',
    );
    expect(
      wrapper.find('.n-picker__pop-content--wrapper').classes('external-panel-class'),
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
      instance.wrapper.findComponent(NPickerInput).find('input').attributes('readonly'),
    ).not.toBeUndefined();

    showSearch.value = true;

    await nextTick();
    await instance.open();

    expect(
      instance.wrapper.findComponent(NPickerInput).find('input').attributes('readonly'),
    ).toBeUndefined();

    await instance.mainInput?.find('input').setValue('1');
    await sleep(200);
    await sleep();

    expect(onSearch).toHaveBeenCalledOnce();
    expect(onFocus).toHaveBeenCalledOnce();
    expect(onBlur).toHaveBeenCalledTimes(0);
    expect(instance.wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();

    await instance.wrapper.findComponent(NOption).trigger('click');
    await sleep(1000);

    expect(instance.modelValue.value).toBe('1');
    expect(onSearch).toHaveBeenCalledOnce();
    expect(onFocus).toHaveBeenCalledOnce();
    expect(onBlur).toHaveBeenCalledOnce();
    expect(instance.wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test('loading', async () => {
    const loading = ref(false);
    const wrapper = mount(
      () => (
        <NSelect toBody={false} loading={loading.value}>
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    expect(wrapper.find('.n-icon__loading_line').exists()).toBeFalsy();

    loading.value = true;

    await nextTick();

    expect(wrapper.find('.n-icon__loading_line').exists()).toBeTruthy();
  });

  test('option-loading-text', async () => {
    const loading = ref(false);

    const instance = new SelectHelper({
      loading,
      optionLoadingText: 'LOADING TEXT',
    });

    await instance.open();

    loading.value = true;

    await nextTick();

    expect(instance.popover.find('.n-loading').text()).toBe('LOADING TEXT');
  });

  test('option-max-lines', async () => {
    const wrapper = mount(
      () => (
        <NSelect toBody={false} optionMaxLines={3}>
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    wrapper
      .findAll('.n-select-option')
      .forEach(opt => expect(opt.attributes('style')).contains('--n-select-max-line--option: 3;'));
  });

  test('input-status', () => {
    const wrapper = mount(() => <NSelect inputStatus="error" />);
    expect(wrapper.findComponent(NPickerInput).classes()).toContain('is-error');
  });

  test('multiple and multiple-limit', async () => {
    const modelValue = ref([]);
    const multipleLimit = ref(1);
    const wrapper = mount(
      () => (
        <NSelect
          v-model={modelValue.value}
          multiple={true}
          multipleLimit={multipleLimit.value}
          toBody={false}
        >
          <NOption label="1" value={1} />
          <NOption label="2" value={2} />
          <NOption label="3" value={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const trigger = wrapper.findComponent(NPickerInput);

    await trigger.trigger('click');

    const options = wrapper.findAllComponents(NOption);

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
        `.n-select-option[data-value="${value}"]`,
      );
      for (const dom of selectedOptionsDom) {
        expect(dom.attributes('style')).contain('order: 1;');
      }
    };

    const checkOrder = () => {
      const selectedOptionsDom = instance.wrapper.findAll('.n-select-option.is-active');
      for (const dom of selectedOptionsDom) {
        expect(dom.attributes('style')).contain('order: 0;');
      }

      const notSelectedOptionsDom = instance.wrapper.findAll('.n-select-option:not(.is-active)');
      for (const dom of notSelectedOptionsDom) {
        expect(dom.attributes('style')).contain('order: 1;');
      }
    };

    const option1 = instance.wrapper.find('.n-select-option[data-value="1"]');

    const option2 = instance.wrapper.find('.n-select-option[data-value="2"]');

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
        <NSelect v-model={modelValue.value} toBody={false} selectedOptionOrderToTop={true}>
          <NOption label="1" value={1} />
          <NOption label="2" value={2} />
          <NOption label="3" value={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const trigger = wrapper.findComponent(NPickerInput);

    const option1 = wrapper.find('.n-select-option');

    await trigger.trigger('click');

    await option1.trigger('click');

    await wrapper.trigger('click');

    await nextTick();

    const selectedOptionDom = wrapper.find('.n-select-option[data-value="1"]');

    const notSelectOptionDom1 = wrapper.find('.n-select-option[data-value="2"]');

    const notSelectOptionDom2 = wrapper.find('.n-select-option[data-value="3"]');

    expect(selectedOptionDom.attributes('style')).contain('order: 0;');
    expect(notSelectOptionDom1.attributes('style')).contain('order: 1;');
    expect(notSelectOptionDom2.attributes('style')).contain('order: 1;');
  });

  test('initial-value', async () => {
    const modelValue = ref<any>([]);
    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} initialValue={null} clearable={true} toBody={false}>
          <NOption label="1" value={1} />
          <NOption label="2" value={2} />
          <NOption label="3" value={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(modelValue.value).toEqual([]);

    modelValue.value = 1;

    await nextTick();

    await wrapper.findComponent(NPickerInput).trigger('mouseenter');

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toEqual(null);
  });

  test('initial-value with multiple', async () => {
    const modelValue = ref<number[]>([]);

    const wrapper = mount(
      () => (
        <NSelect
          v-model={modelValue.value}
          multiple={true}
          initialValue={null}
          clearable={true}
          toBody={false}
        >
          <NOption label="1" value={1} />
          <NOption label="2" value={2} />
          <NOption label="3" value={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(modelValue.value).toEqual([]);

    modelValue.value = [1];

    await nextTick();

    await wrapper.findComponent(NPickerInput).trigger('mouseenter');

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toBeNull();
  });

  test('initial-value with multiple and set undefined', async () => {
    const modelValue = ref<number[]>([]);

    const wrapper = mount(
      () => (
        <NSelect
          v-model={modelValue.value}
          multiple={true}
          initialValue={Symbol.for('undefined')}
          clearable={true}
          toBody={false}
        >
          <NOption label="1" value={1} />
          <NOption label="2" value={2} />
          <NOption label="3" value={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(modelValue.value).toEqual([]);

    modelValue.value = [1];

    await nextTick();

    await wrapper.findComponent(NPickerInput).trigger('mouseenter');

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toBeUndefined();
  });

  test('reserve-keyword', async () => {
    const modelValue = ref<number[]>([]);

    const reserveKeyword = ref<SelectProps['reserveKeyword']>(true);

    const wrapper = mount(
      () => (
        <Fragment>
          <NSelect
            v-model={modelValue.value}
            multiple={true}
            reserveKeyword={reserveKeyword.value}
            filterable={true}
            toBody={false}
          >
            <NOption label="1" value={1} />
            <NOption label="2" value={2} />
            <NOption label="3" value={3} />
          </NSelect>
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
      await wrapper.findComponent(NSelect).trigger('click');

      await input.setValue(value);

      await sleep(200);

      await wrapper.findAllComponents(NOption)[0].trigger('click');

      await sleep(200);

      await nextTick();
    }

    await filterAndPick();

    expect(
      (
        wrapper.find(
          '.n-picker-fit-content-input__input:not(.is-main)',
        ) as DOMWrapper<HTMLInputElement>
      ).element.value,
    ).toEqual('1');

    await filterAndPick();

    expect(
      (wrapper.find('.n-picker-fit-content-input__input.is-main') as DOMWrapper<HTMLInputElement>)
        .element.value,
    ).toEqual('1');

    await reset();

    reserveKeyword.value = false;

    await nextTick();

    await filterAndPick();

    expect(
      (
        wrapper.find(
          '.n-picker-fit-content-input__input:not(.is-main)',
        ) as DOMWrapper<HTMLInputElement>
      ).element.value,
    ).toEqual('');

    await filterAndPick();

    await nextTick();

    expect(
      (wrapper.find('.n-picker-fit-content-input__input.is-main') as DOMWrapper<HTMLInputElement>)
        .element.value,
    ).toEqual('');

    reserveKeyword.value = 'reserve-deselect';

    await nextTick();

    await filterAndPick();

    expect(
      (
        wrapper.find(
          '.n-picker-fit-content-input__input:not(.is-main)',
        ) as DOMWrapper<HTMLInputElement>
      ).element.value,
    ).toEqual('');

    await filterAndPick();

    expect(
      (wrapper.find('.n-picker-fit-content-input__input.is-main') as DOMWrapper<HTMLInputElement>)
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
          <NSelect v-model={modelValue.value} valueFormat={valueFormat} toBody={false}>
            <NOption label="1" value={1} />
            <NOption label="2" value={2} />
            <NOption label="3" value={3} />
          </NSelect>
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    await sleep(0);

    expect(wrapper.findComponent(NPickerInput).text()).toBe('1');
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
          <NSelect
            v-model={modelValue.value}
            valueFormat={valueFormat}
            multiple={true}
            toBody={false}
          >
            <NOption label="1" value={1} />
            <NOption label="2" value={2} />
            <NOption label="3" value={3} />
          </NSelect>
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    await sleep(0);

    expect(wrapper.findComponent(NPickerInput).text()).toBe('11');
  });
});
