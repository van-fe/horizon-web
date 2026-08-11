import { mount } from '@vue/test-utils';
import { computed, defineComponent, nextTick, ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import dayjs from '~/utils/useDayJs';
import { useTimePickerEmits } from '../src/composables/useEmits';
import { useTimePickerProps } from '../src/composables/useProps';
import useData from '../src/hooks/useData';
import useEvent from '../src/hooks/useEvent';
import { tryToAnalysisTime } from '../src/utils/utils';
import TimeColumnPanel from '../src/components/TimeColumnPanel';
import TimePanel from '../src/components/TimePanel';
import { HTimePickerEmitsInjectKey } from '../src/utils/injectKeys';

const TimeDataHarness = defineComponent({
  props: useTimePickerProps,
  emits: useTimePickerEmits,
  setup(props, context) {
    const visible = ref(false);
    const modifyPanelVisible = vi.fn((value: boolean) => {
      visible.value = value;
    });
    const dom = {
      pickerDomRef: ref({ blur: vi.fn(), focus: vi.fn() }),
      startInputDomRef: ref({ blur: vi.fn(), focus: vi.fn(), resetInputString: vi.fn() }),
      endInputDomRef: ref({ blur: vi.fn(), focus: vi.fn(), resetInputString: vi.fn() }),
      startTimePanelDomRef: ref({
        clickTimeCell: vi.fn(),
        updateCurrentTimeFromModelValue: vi.fn(),
      }),
      endTimePanelDomRef: ref({
        clickTimeCell: vi.fn(),
        updateCurrentTimeFromModelValue: vi.fn(),
      }),
    };
    const data = useData(toRefs(props) as never, context as never, dom as never, {
      visible,
      modifyPanelVisible,
    });
    context.expose({ ...data, visible, modifyPanelVisible, dom });
    return () => <div data-test="time-data-harness" />;
  },
});

const TimeEventHarness = defineComponent({
  props: useTimePickerProps,
  emits: useTimePickerEmits,
  setup(props, context) {
    const doConfirm = vi.fn();
    const dom = {
      pickerDomRef: ref({ focus: vi.fn() }),
      startInputDomRef: ref({ focus: vi.fn() }),
      endInputDomRef: ref({ focus: vi.fn() }),
      startTimePanelDomRef: ref({ clickTimeCell: vi.fn() }),
      endTimePanelDomRef: ref({ clickTimeCell: vi.fn() }),
    };
    const events = useEvent(toRefs(props) as never, context as never, dom as never, {
      dayjsFormat: computed(() => (props.type === 'seconds' ? 'HH:mm:ss' : 'HH:mm')),
      startTime: ref(),
      endTime: ref(),
      doConfirm,
    });
    context.expose({ ...events, doConfirm, dom });
    return () => <div data-test="time-event-harness" />;
  },
});

type DataHarnessExposes = {
  startTime: Ref<ReturnType<typeof dayjs> | undefined>;
  endTime: Ref<ReturnType<typeof dayjs> | undefined>;
  previewTime: Ref<ReturnType<typeof dayjs> | undefined>;
  showValue: Ref<string | undefined | Array<string | undefined>>;
  visible: Ref<boolean>;
  canConfirmBtnClick: Ref<boolean>;
  onUpdateTime: (
    start: ReturnType<typeof dayjs> | undefined,
    end: ReturnType<typeof dayjs> | undefined,
    triggerType: 'click' | 'input' | 'confirmable-input',
  ) => void;
  doConfirm: (triggerType?: 'click' | 'input' | 'confirmable-input') => void;
  doCancel: () => void;
  doClear: () => void;
  doBlur: () => void;
  onClickNow: () => void;
  modifyPanelVisible: ReturnType<typeof vi.fn>;
  dom: {
    pickerDomRef: Ref<{ blur: ReturnType<typeof vi.fn> }>;
    startInputDomRef: Ref<{
      blur: ReturnType<typeof vi.fn>;
      resetInputString: ReturnType<typeof vi.fn>;
    }>;
    endInputDomRef: Ref<{
      blur: ReturnType<typeof vi.fn>;
      resetInputString: ReturnType<typeof vi.fn>;
    }>;
    startTimePanelDomRef: Ref<{
      clickTimeCell: ReturnType<typeof vi.fn>;
      updateCurrentTimeFromModelValue: ReturnType<typeof vi.fn>;
    }>;
    endTimePanelDomRef: Ref<{
      clickTimeCell: ReturnType<typeof vi.fn>;
      updateCurrentTimeFromModelValue: ReturnType<typeof vi.fn>;
    }>;
  };
};

type EventHarnessExposes = {
  onKeydown: (event: KeyboardEvent) => void;
  onInput: (event: Event, type?: 'start' | 'end') => void;
  onClick: (event: MouseEvent) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  doConfirm: ReturnType<typeof vi.fn>;
  dom: {
    pickerDomRef: Ref<{ focus: ReturnType<typeof vi.fn> }>;
    startInputDomRef: Ref<{ focus: ReturnType<typeof vi.fn> }>;
    startTimePanelDomRef: Ref<{ clickTimeCell: ReturnType<typeof vi.fn> }>;
    endTimePanelDomRef: Ref<{ clickTimeCell: ReturnType<typeof vi.fn> }>;
  };
};

describe('TimePicker hook coverage in Chromium', () => {
  test('renders and selects whole-time options with formatting, bounds and disabled states', async () => {
    const parentEmit = vi.fn();
    const formatCellText = vi.fn((type: string, label: string) => `${type}:${label}`);
    const disabledTime = vi.fn((value: ReturnType<typeof dayjs>) => value.minute() === 30);
    const model = dayjs('2026-01-01 08:00');
    const wrapper = mount(TimePanel, {
      props: {
        modelValue: model,
        dateType: 'time',
        panelVisible: false,
        timeStep: 0,
        startAt: '08:00',
        endAt: '09:00',
        formatCellText,
        disabledTime,
        disabledBefore: dayjs().hour(8).minute(10).second(0),
        disabledAfter: dayjs().hour(8).minute(50).second(0),
        tooltipShowAfter: 0,
        tooltipHideAfter: 0,
      },
      global: { provide: { [HTimePickerEmitsInjectKey as symbol]: parentEmit } },
    });
    const column = wrapper.getComponent(TimeColumnPanel);
    const options = column.props('options') as Array<{
      label: string;
      value: ReturnType<typeof dayjs>;
      disabled?: boolean;
    }>;
    expect(options.length).toBeGreaterThan(1);
    expect(options[0].label).toBe('time:08:00');
    expect(formatCellText).toHaveBeenCalled();
    expect(disabledTime).toHaveBeenCalled();
    expect(options.some(option => option.disabled)).toBe(true);
    const exposed = wrapper.getCurrentComponent().exposed as {
      clickTimeCell: (value: ReturnType<typeof dayjs>, trigger?: 'click' | 'hover') => void;
      updateCurrentTimeFromModelValue: () => void;
    };
    exposed.clickTimeCell(options.find(option => !option.disabled)!.value);
    await nextTick();
    expect(parentEmit).toHaveBeenCalledWith(
      'pick',
      expect.objectContaining({ $d: expect.any(Date) }),
      'time',
    );
    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    exposed.clickTimeCell(dayjs('2026-01-01 23:59'));
    exposed.updateCurrentTimeFromModelValue();
    await wrapper.setProps({ panelVisible: true, modelValue: dayjs('2026-01-01 09:00') });
  });

  test('composes minute and second columns for every trigger order and preview path', async () => {
    const parentEmit = vi.fn();
    const minutes = mount(TimePanel, {
      props: {
        dateType: 'minutes',
        panelVisible: true,
        modelValue: undefined,
        hourStep: 0,
        minuteStep: 0,
        startAt: '00:00',
        endAt: '23:59',
        tooltipShowAfter: 0,
        tooltipHideAfter: 0,
      },
      global: { provide: { [HTimePickerEmitsInjectKey as symbol]: parentEmit } },
    });
    const minuteColumns = minutes.findAllComponents(TimeColumnPanel);
    const hour = dayjs('2026-01-01 10:00');
    const minute = dayjs('2026-01-01 10:25');
    minuteColumns[1].vm.$emit('update:modelValue', minute, 'input');
    expect(minutes.emitted('update:modelValue')).toBeUndefined();
    minuteColumns[0].vm.$emit('update:modelValue', hour, 'click');
    minuteColumns[1].vm.$emit('update:modelValue', minute, 'confirmable-input');
    expect(parentEmit).toHaveBeenCalledWith('pick', hour, 'hour');
    expect(minutes.emitted('update:modelValue')?.at(-1)?.[1]).toBe('confirmable-input');
    minuteColumns[0].vm.$emit('update:previewTime', hour);
    minuteColumns[1].vm.$emit('update:previewTime', minute);
    expect(minutes.emitted('update:previewTime')).toEqual([[hour], [minute]]);

    const exposed = minutes.getCurrentComponent().exposed as {
      clickTimeCell: (
        value: ReturnType<typeof dayjs>,
        trigger?: 'click' | 'hover' | 'confirmable-input',
      ) => void;
    };
    exposed.clickTimeCell(dayjs('2026-01-01 11:35'), 'confirmable-input');
    await nextTick();
    await nextTick();
    expect(minutes.emitted('update:modelValue')?.length).toBeGreaterThan(0);

    const seconds = mount(TimePanel, {
      props: {
        dateType: 'seconds',
        panelVisible: true,
        confirmRestTimeColumnWhenClickPrev: false,
        secondStep: 30,
        tooltipShowAfter: 0,
        tooltipHideAfter: 0,
      },
      global: { provide: { [HTimePickerEmitsInjectKey as symbol]: parentEmit } },
    });
    const secondColumns = seconds.findAllComponents(TimeColumnPanel);
    secondColumns[0].vm.$emit('update:modelValue', hour, 'input');
    secondColumns[1].vm.$emit('update:modelValue', minute, 'input');
    expect(seconds.emitted('update:modelValue')).toBeUndefined();
    const second = dayjs('2026-01-01 10:25:30');
    secondColumns[2].vm.$emit('update:modelValue', second, 'click');
    expect(seconds.emitted('update:modelValue')?.at(-1)?.[1]).toBe('click');
    const secondsExposed = seconds.getCurrentComponent().exposed as {
      clickTimeCell: (
        value: ReturnType<typeof dayjs>,
        trigger?: 'click' | 'hover' | 'confirmable-input',
      ) => void;
    };
    secondsExposed.clickTimeCell(dayjs('2026-01-01 11:35:30'), 'hover');
    await nextTick();
    await nextTick();
    expect(seconds.emitted('update:modelValue')?.length).toBeGreaterThan(0);
  });

  test('TimeColumnPanel covers disabled clicks, missing targets, previews and scrolling choices', async () => {
    vi.useFakeTimers();
    const scrollIntoView = vi
      .spyOn(Element.prototype, 'scrollIntoView')
      .mockImplementation(() => undefined);
    const first = dayjs('2026-01-01 08:00');
    const second = dayjs('2026-01-01 09:00');
    const wrapper = mount(TimeColumnPanel, {
      props: {
        modelValue: undefined,
        options: [
          { label: 'Disabled', value: first, disabled: true },
          { label: 'Enabled', value: second, disabled: false },
        ],
        unit: 'hour',
        panelVisible: false,
        panelType: 'hour',
        showTimeTooltip: value => ({ show: true, content: value.format('HH:mm') }),
        tooltipShowAfter: 0,
        tooltipHideAfter: 0,
      },
      attachTo: document.body,
    });
    const exposed = wrapper.getCurrentComponent().exposed as {
      clickTimeCell: (
        value: ReturnType<typeof dayjs>,
        trigger?: 'click' | 'input' | 'confirmable-input',
      ) => boolean;
    };
    expect(exposed.clickTimeCell(first)).toBe(false);
    expect(exposed.clickTimeCell(dayjs('2026-01-01 10:00'))).toBe(false);
    expect(exposed.clickTimeCell(second, 'input')).toBe(true);
    await wrapper.findAll('.h-time-picker__time-cell')[0].trigger('mouseenter');
    expect(wrapper.emitted('update:previewTime')).toBeUndefined();
    await wrapper.findAll('.h-time-picker__time-cell')[1].trigger('mouseenter');
    await wrapper.get('.h-time-picker__time-column-panel').trigger('mouseleave');
    expect(wrapper.emitted('update:previewTime')).toEqual([[second], [undefined]]);
    await wrapper.setProps({ panelVisible: true, modelValue: second });
    await vi.advanceTimersByTimeAsync(200);
    expect(scrollIntoView).toHaveBeenCalled();
    scrollIntoView.mockRestore();
    vi.useRealTimers();
  });

  test('analyzes nil, empty, numeric, string and Date time inputs', () => {
    expect(tryToAnalysisTime(undefined, 'HH:mm', null)).toBeUndefined();
    expect(tryToAnalysisTime(null, 'HH:mm', undefined)).toBeNull();
    expect(tryToAnalysisTime('', 'HH:mm', null)).toBeNull();
    expect(tryToAnalysisTime('08:15', 'HH:mm', null)?.format('HH:mm')).toBe('08:15');
    expect(tryToAnalysisTime(0, 'HH:mm', null)).toBeNull();
    expect(tryToAnalysisTime(new Date(2026, 0, 1, 9, 20), 'HH:mm', null)?.hour()).toBe(9);
  });

  test('sorts range updates, emits formatted confirmations and avoids duplicate changes', async () => {
    const wrapper = mount(TimeDataHarness, {
      props: {
        isRange: true,
        type: 'seconds',
        valueFormat: 'HH:mm:ss',
        modelValue: ['08:00:00', '09:00:00'],
      },
    });
    const api = wrapper.getCurrentComponent().exposed as unknown as DataHarnessExposes;
    const late = dayjs('2026-01-01 18:30:20');
    const early = dayjs('2026-01-01 07:10:05');
    api.onUpdateTime(late, early, 'input');
    expect(api.startTime.value?.format('HH:mm:ss')).toBe('07:10:05');
    expect(api.endTime.value?.format('HH:mm:ss')).toBe('18:30:20');
    api.doConfirm('input');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([
      ['07:10:05', '18:30:20'],
      'input',
    ]);
    expect(wrapper.emitted('change')?.at(-1)).toEqual([['07:10:05', '18:30:20']]);

    const updateCount = wrapper.emitted('update:modelValue')?.length;
    await wrapper.setProps({ modelValue: ['07:10:05', '18:30:20'] });
    api.doConfirm('input');
    expect(wrapper.emitted('update:modelValue')).toHaveLength(updateCount ?? 0);
  });

  test('covers one-sided range updates, click confirmation, clear, cancel and DOM refresh', async () => {
    vi.useFakeTimers();
    const wrapper = mount(TimeDataHarness, {
      props: { isRange: true, needConfirm: false, initialValue: null },
    });
    const api = wrapper.getCurrentComponent().exposed as unknown as DataHarnessExposes;
    const start = dayjs('2026-01-01 08:10');
    const end = dayjs('2026-01-01 09:20');

    api.onUpdateTime(start, undefined, 'click');
    expect(api.startTime.value?.hour()).toBe(8);
    expect(wrapper.emitted('confirm')).toBeUndefined();
    api.onUpdateTime(undefined, end, 'confirmable-input');
    expect(api.endTime.value?.hour()).toBe(9);
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[1]).toBe('confirmable-input');
    api.doConfirm();
    expect(wrapper.emitted('confirm')).toHaveLength(1);
    expect(api.modifyPanelVisible).toHaveBeenCalledWith(false);
    expect(api.dom.pickerDomRef.value?.blur).toHaveBeenCalled();
    expect(api.dom.startInputDomRef.value?.blur).toHaveBeenCalled();
    expect(api.dom.endInputDomRef.value?.blur).toHaveBeenCalled();

    api.doCancel();
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    api.doClear();
    expect(wrapper.emitted('clear')).toHaveLength(1);
    await vi.runAllTimersAsync();
    expect(
      api.dom.startTimePanelDomRef.value?.updateCurrentTimeFromModelValue,
    ).toHaveBeenCalled();
    expect(api.dom.endTimePanelDomRef.value?.updateCurrentTimeFromModelValue).toHaveBeenCalled();
    vi.useRealTimers();
  });

  test.each([
    ['time', 30, 'minutes'],
    ['minutes', 7, 'minutes'],
    ['seconds', 9, 'seconds'],
  ] as const)('selects now for %s mode using the configured step', async (type, step, unit) => {
    const props =
      type === 'time'
        ? { type, timeStep: step }
        : type === 'minutes'
          ? { type, minuteStep: step }
          : { type, secondStep: step };
    const wrapper = mount(TimeDataHarness, { props: props as never });
    const api = wrapper.getCurrentComponent().exposed as unknown as DataHarnessExposes;
    api.onClickNow();
    const startCall = api.dom.startTimePanelDomRef.value?.clickTimeCell.mock.calls[0];
    const endCall = api.dom.endTimePanelDomRef.value?.clickTimeCell.mock.calls[0];
    expect(startCall?.[0]).toBeTruthy();
    expect(endCall?.[0].diff(startCall?.[0], unit)).toBe(step);
    await nextTick();
  });

  test('refreshes previews and input/panel DOM when visibility changes', async () => {
    vi.useFakeTimers();
    const preview = dayjs('2026-01-01 10:20');
    const wrapper = mount(TimeDataHarness, {
      props: {
        modelValue: '08:00',
        previewTime: preview,
        hoverToDisplayValue: true,
      },
    });
    const api = wrapper.getCurrentComponent().exposed as unknown as DataHarnessExposes;
    expect(api.previewTime.value?.format('HH:mm')).toBe(preview.format('HH:mm'));
    expect(wrapper.emitted('update:previewTime')?.at(-1)).toEqual([preview]);
    api.visible.value = true;
    await nextTick();
    await vi.runAllTimersAsync();
    expect(api.dom.startInputDomRef.value?.resetInputString).toHaveBeenCalled();
    expect(
      api.dom.startTimePanelDomRef.value?.updateCurrentTimeFromModelValue,
    ).toHaveBeenCalled();
    await wrapper.setProps({ hoverToDisplayValue: false });
    vi.useRealTimers();
  });

  test('renders empty, partial and previewed ranges without leaking undefined text', async () => {
    const formatTriggerText = vi.fn((_value, text: string) => `formatted:${text}`);
    const wrapper = mount(TimeDataHarness, {
      props: {
        isRange: true,
        singleTrigger: true,
        modelValue: [undefined, undefined],
        hoverToDisplayValue: true,
      },
    });
    const api = wrapper.getCurrentComponent().exposed as unknown as DataHarnessExposes;
    expect(api.showValue.value).toBeUndefined();

    await wrapper.setProps({ modelValue: ['08:10', undefined] });
    expect(api.showValue.value).toBe('08:10 - ');
    api.previewTime.value = dayjs('2026-01-01 09:20');
    await nextTick();
    expect(api.showValue.value).toBe('08:10 - 09:20');

    await wrapper.setProps({ modelValue: [undefined, '10:30'] });
    expect(api.showValue.value).toBe('09:20 - 10:30');
    await wrapper.setProps({ modelValue: ['08:10', '10:30'] });
    expect(api.showValue.value).toBe('08:10 - 10:30');

    await wrapper.setProps({
      isRange: false,
      singleTrigger: false,
      modelValue: '11:40',
      formatTriggerText,
    });
    expect(api.showValue.value).toBe('formatted:09:20');
    expect(formatTriggerText).toHaveBeenCalled();
  });

  test('uses an empty initial value and covers raw single-value parsing', async () => {
    const wrapper = mount(TimeDataHarness, {
      props: {
        modelValue: '',
        initialValue: null,
        needConfirm: true,
      },
    });
    const api = wrapper.getCurrentComponent().exposed as unknown as DataHarnessExposes;
    expect(api.startTime.value).toBeUndefined();
    expect(api.canConfirmBtnClick.value).toBe(false);

    await wrapper.setProps({ modelValue: new Date(2026, 0, 1, 7, 35) });
    expect(api.startTime.value?.format('HH:mm')).toBe('07:35');
    const scalarDayjs = dayjs('2026-01-01 07:50');
    await wrapper.setProps({ modelValue: scalarDayjs });
    expect(api.startTime.value?.format('HH:mm')).toBe('07:50');
    await wrapper.setProps({
      isRange: true,
      modelValue: [dayjs('2026-01-01 08:00'), dayjs('2026-01-01 09:00')],
    });
    expect(api.startTime.value?.format('HH:mm')).toBe('08:00');
    expect(api.endTime.value?.format('HH:mm')).toBe('09:00');
    api.onUpdateTime(undefined, dayjs('2026-01-01 08:55'), 'input');
    expect(api.endTime.value?.format('HH:mm')).toBe('08:55');
    api.doBlur();
    expect(api.dom.pickerDomRef.value?.blur).toHaveBeenCalled();
  });

  test('covers TimePanel empty columns, preview forwarding and failed chained selection', async () => {
    const parentEmit = vi.fn();
    const wrapper = mount(TimePanel, {
      props: {
        dateType: 'seconds',
        panelVisible: false,
        startAt: '10:00:00',
        endAt: '09:00:00',
        disabledTime: () => true,
        confirmRestTimeColumnWhenClickPrev: false,
        tooltipShowAfter: 0,
        tooltipHideAfter: 0,
      },
      global: { provide: { [HTimePickerEmitsInjectKey as symbol]: parentEmit } },
    });
    const columns = wrapper.findAllComponents(TimeColumnPanel);
    expect(columns).toHaveLength(3);
    columns[0].vm.$emit('update:modelValue', undefined, 'click');
    columns[0].vm.$emit('update:previewTime', dayjs('2026-01-01 05:10'));
    columns[1].vm.$emit('update:previewTime', undefined);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('update:previewTime')).toHaveLength(2);

    const exposed = wrapper.getCurrentComponent().exposed as {
      clickTimeCell: (value: ReturnType<typeof dayjs>, trigger?: 'click') => void;
    };
    exposed.clickTimeCell(dayjs('2026-01-01 20:20:20'));
    await nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.setProps({ dateType: 'minutes' });
    exposed.clickTimeCell(dayjs('2026-01-01 20:20'));
    await nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  test('TimeColumnPanel leaves an all-disabled list stationary and renders tooltip fallbacks', async () => {
    vi.useFakeTimers();
    const scrollIntoView = vi
      .spyOn(Element.prototype, 'scrollIntoView')
      .mockImplementation(() => undefined);
    const value = dayjs('2026-01-01 08:00');
    const wrapper = mount(TimeColumnPanel, {
      props: {
        modelValue: undefined,
        options: [{ label: 'Only disabled', value, disabled: true }],
        panelVisible: false,
        panelType: 'hour',
        unit: 'hour',
        showTimeTooltip: () => ({ show: false }),
        tooltipShowAfter: 0,
        tooltipHideAfter: 0,
      },
      attachTo: document.body,
    });
    await wrapper.setProps({ panelVisible: true });
    await vi.advanceTimersByTimeAsync(250);
    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(wrapper.get('.h-time-picker__time-cell').classes()).toContain('is-disabled');
    scrollIntoView.mockRestore();
    vi.useRealTimers();
  });

  test('parses every single-trigger range validity combination from native input events', () => {
    const wrapper = mount(TimeEventHarness, {
      props: { isRange: true, singleTrigger: true },
    });
    const api = wrapper.getCurrentComponent().exposed as unknown as EventHarnessExposes;
    const fire = (value: string) => {
      const input = document.createElement('input');
      input.value = value;
      const event = new Event('input', { bubbles: true });
      Object.defineProperty(event, 'target', { configurable: true, value: input });
      api.onInput(event);
    };

    fire('08:00-09:00');
    fire('08:00-invalid');
    fire('invalid-09:00');
    fire('invalid-invalid');
    expect(api.dom.startTimePanelDomRef.value?.clickTimeCell).toHaveBeenCalledTimes(2);
    expect(api.dom.endTimePanelDomRef.value?.clickTimeCell).toHaveBeenCalledTimes(2);
    expect(wrapper.emitted('input')).toHaveLength(4);
  });

  test('parses independent start/end inputs and handles keyboard, click, focus and blur', () => {
    const wrapper = mount(TimeEventHarness, {
      props: { isRange: true, singleTrigger: false, confirmType: 'blur' },
    });
    const api = wrapper.getCurrentComponent().exposed as unknown as EventHarnessExposes;
    const inputEvent = (value: string) => {
      const input = document.createElement('input');
      input.value = value;
      const event = new Event('input', { bubbles: true });
      Object.defineProperty(event, 'target', { configurable: true, value: input });
      return event;
    };
    api.onInput(inputEvent('08:10'));
    api.onInput(inputEvent('09:20'), 'end');
    api.onInput(inputEvent('invalid'));
    expect(api.dom.startTimePanelDomRef.value?.clickTimeCell).toHaveBeenCalledOnce();
    expect(api.dom.endTimePanelDomRef.value?.clickTimeCell).toHaveBeenCalledOnce();

    const enter = new KeyboardEvent('keydown', { code: 'Enter', bubbles: true });
    const stop = vi.spyOn(enter, 'stopPropagation');
    api.onKeydown(enter);
    api.onKeydown(new KeyboardEvent('keydown', { code: 'Escape' }));
    expect(stop).toHaveBeenCalled();
    expect(api.doConfirm).toHaveBeenCalledWith();

    const div = document.createElement('div');
    const click = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(click, 'target', { configurable: true, value: div });
    api.onClick(click);
    const input = document.createElement('input');
    const inputClick = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(inputClick, 'target', { configurable: true, value: input });
    api.onClick(inputClick);
    expect(api.dom.startInputDomRef.value?.focus).toHaveBeenCalledOnce();
    expect(api.dom.pickerDomRef.value?.focus).toHaveBeenCalledOnce();
    api.handleFocus();
    api.handleBlur();
    expect(wrapper.emitted('focus')).toHaveLength(1);
    expect(wrapper.emitted('blur')).toHaveLength(1);
    expect(api.doConfirm).toHaveBeenLastCalledWith('click');
  });
});
