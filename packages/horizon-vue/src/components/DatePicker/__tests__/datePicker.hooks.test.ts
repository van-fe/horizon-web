import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import type { ToRefs } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import dayjs from '~/utils/useDayJs';
import type { Dayjs } from 'dayjs';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { DatePickerProps } from '../src/composables/useProps';
import type { DatePickerEmits } from '../src/composables/useEmits';
import type { DatePickerSlots } from '../src/composables/useSlots';
import type { DatePickerExposes } from '../src/composables/useExposes';
import type { HDatePickerBaseSupportType, HDatePickerDomRefs } from '../src/utils/types';
import usePanel, { getDayjsUnitByType, getTimePanelTypeByType } from '../src/hooks/usePanel';
import useEvent from '../src/hooks/useEvent';

function makePropRefs(overrides: Record<string, unknown> = {}) {
  return toRefs(
    reactive({
      isLinkPanels: true,
      singlePanel: false,
      singleTrigger: false,
      showBeforeAfterDate: false,
      panelShowDate: undefined,
      confirmType: 'enter',
      ...overrides,
    }),
  ) as unknown as ToRefs<DatePickerProps>;
}

describe('DatePicker panel and event hooks', () => {
  test('maps picker types to dayjs and time-panel units', () => {
    expect(getDayjsUnitByType('year')).toBe('year');
    expect(getDayjsUnitByType('year-range')).toBe('year');
    expect(getDayjsUnitByType('month')).toBe('month');
    expect(getDayjsUnitByType('month-range')).toBe('month');
    expect(getDayjsUnitByType('date')).toBe('date');
    expect(getTimePanelTypeByType('datetime')).toBe('time');
    expect(getTimePanelTypeByType('datetime-range')).toBe('time');
    expect(getTimePanelTypeByType('date-minutes')).toBe('minutes');
    expect(getTimePanelTypeByType('date-minutes-range')).toBe('minutes');
    expect(getTimePanelTypeByType('date-seconds')).toBe('seconds');
    expect(getTimePanelTypeByType('date-seconds-range')).toBe('seconds');
  });

  test('links and unlinks year, month and day range panels', async () => {
    const Harness = defineComponent({
      setup(_, { expose }) {
        const propRefs = makePropRefs();
        const pickerType = ref<HDatePickerBaseSupportType>('date-range');
        const visible = ref(false);
        const startDate = ref<Dayjs | undefined | null>(dayjs('2026-02-03'));
        const endDate = ref<Dayjs | undefined | null>(dayjs('2026-04-05'));
        const panel = usePanel(propRefs, {
          isRange: computed(() => pickerType.value.endsWith('range')),
          startDate,
          endDate,
          visible,
          pickerType: computed(() => pickerType.value),
        });
        expose({ propRefs, pickerType, visible, startDate, endDate, ...panel });
        return () => null;
      },
    });
    const wrapper = mount(Harness);
    const vm = wrapper.vm as unknown as {
      propRefs: ToRefs<DatePickerProps>;
      pickerType: HDatePickerBaseSupportType;
      visible: boolean;
      startDate: Dayjs;
      endDate: Dayjs;
      startPickerType: 'year' | 'month' | 'day';
      endPickerType: 'year' | 'month' | 'day';
      startPanelShowDate: Dayjs;
      endPanelShowDate: Dayjs;
      showBeforeAfterDate: boolean;
      switchPanelShowDate: (type: 'start' | 'end', date: Dayjs) => void;
      refreshPanelShowDate: () => void;
    };

    vm.visible = true;
    await nextTick();
    expect(vm.startPickerType).toBe('day');
    expect(vm.endPanelShowDate.format('YYYY-MM-DD')).toBe('2026-03-03');

    vm.switchPanelShowDate('end', dayjs('2027-08-01'));
    expect(vm.startPanelShowDate.format('YYYY-MM-DD')).toBe('2027-07-01');
    vm.switchPanelShowDate('start', dayjs('2028-01-02'));
    expect(vm.endPanelShowDate.format('YYYY-MM-DD')).toBe('2028-02-02');

    vm.pickerType = 'year-range';
    vm.visible = false;
    await nextTick();
    vm.visible = true;
    await nextTick();
    expect(vm.startPickerType).toBe('year');
    expect(vm.showBeforeAfterDate).toBe(true);
    vm.switchPanelShowDate('start', dayjs('2030-01-01'));
    expect(vm.endPanelShowDate.year()).toBe(2040);

    vm.pickerType = 'month-range';
    vm.visible = false;
    await nextTick();
    vm.visible = true;
    await nextTick();
    expect(vm.startPickerType).toBe('month');
    vm.switchPanelShowDate('end', dayjs('2042-01-01'));
    expect(vm.startPanelShowDate.year()).toBe(2041);

    vm.propRefs.isLinkPanels.value = false;
    vm.pickerType = 'date-range';
    vm.switchPanelShowDate('start', dayjs('2050-05-01'));
    expect(vm.endPanelShowDate.isAfter(vm.startPanelShowDate)).toBe(true);
    vm.switchPanelShowDate('end', dayjs('2040-05-01'));
    expect(vm.startPanelShowDate.isBefore(vm.endPanelShowDate)).toBe(true);

    vm.propRefs.singlePanel.value = true;
    vm.startDate = dayjs('2033-03-03');
    vm.endDate = dayjs('2033-04-04');
    vm.refreshPanelShowDate();
    expect(vm.startPanelShowDate.format('YYYY-MM-DD')).toBe('2033-03-03');
  });

  test('accepts scalar and range custom panel dates', async () => {
    const scalar = ref<string | [string, string]>('2026-06-01');
    const Harness = defineComponent({
      setup(_, { expose }) {
        const propRefs = makePropRefs({ panelShowDate: scalar.value });
        const panel = usePanel(propRefs, {
          isRange: computed(() => true),
          startDate: ref(),
          endDate: ref(),
          visible: ref(false),
          pickerType: computed(() => 'date-range'),
        });
        expose({ propRefs, ...panel });
        return () => null;
      },
    });
    const wrapper = mount(Harness);
    const vm = wrapper.vm as unknown as {
      propRefs: ToRefs<DatePickerProps>;
      startPanelShowDate: Dayjs;
      endPanelShowDate: Dayjs;
    };
    expect(vm.startPanelShowDate.format('YYYY-MM-DD')).toBe('2026-06-01');
    vm.propRefs.panelShowDate!.value = ['2027-01-01', '2028-02-02'];
    await nextTick();
    // Linked panels preserve their required one-month gap, so the explicit end panel wins.
    expect(vm.startPanelShowDate.format('YYYY-MM-DD')).toBe('2028-01-02');
    expect(vm.endPanelShowDate.format('YYYY-MM-DD')).toBe('2028-02-02');
  });

  test('refreshes every start/end picker-type combination while hidden', async () => {
    const Harness = defineComponent({
      setup(_, { expose }) {
        const propRefs = makePropRefs({ isLinkPanels: false, singlePanel: false });
        const pickerType = ref<HDatePickerBaseSupportType>('date-range');
        const visible = ref(false);
        const startDate = ref<Dayjs | undefined | null>(dayjs('2026-01-01'));
        const endDate = ref<Dayjs | undefined | null>(dayjs('2026-02-01'));
        const panel = usePanel(propRefs, {
          isRange: computed(() => true),
          startDate,
          endDate,
          visible,
          pickerType: computed(() => pickerType.value),
        });
        expose({ propRefs, pickerType, visible, startDate, endDate, ...panel });
        return () => null;
      },
    });
    const wrapper = mount(Harness);
    const vm = wrapper.vm as unknown as {
      propRefs: ToRefs<DatePickerProps>;
      pickerType: HDatePickerBaseSupportType;
      visible: boolean;
      startDate: Dayjs | undefined;
      endDate: Dayjs | undefined;
      startPickerType: 'year' | 'month' | 'day';
      endPickerType: 'year' | 'month' | 'day';
      startPanelShowDate: Dayjs;
      endPanelShowDate: Dayjs;
      refreshPanelShowDate: () => void;
    };

    vm.startDate = dayjs('2027-03-01');
    vm.endDate = dayjs('2027-04-01');
    await nextTick();
    expect(vm.startPanelShowDate.format('YYYY-MM-DD')).toBe('2027-03-01');

    for (const [start, end] of [
      ['year', 'year'],
      ['month', 'year'],
      ['month', 'month'],
      ['month', 'day'],
      ['day', 'year'],
      ['day', 'month'],
      ['day', 'day'],
    ] as const) {
      vm.startPickerType = start;
      vm.endPickerType = end;
      vm.startPanelShowDate = dayjs('2030-01-01');
      vm.endPanelShowDate = dayjs(end === 'year' ? '2035-01-01' : '2029-01-01');
      await nextTick();
    }

    vm.propRefs.singlePanel.value = true;
    vm.startDate = undefined;
    vm.endDate = undefined;
    vm.refreshPanelShowDate();
    vm.pickerType = 'month-range';
    vm.visible = true;
    await nextTick();
    expect(vm.startPickerType).toBe('month');
    vm.pickerType = 'year-range';
    vm.visible = false;
    await nextTick();
    vm.visible = true;
    await nextTick();
    expect(vm.startPickerType).toBe('year');
  });

  test('handles keyboard, focus, blur and every single/range input route', async () => {
    const emit = vi.fn();
    const doConfirm = vi.fn();
    const doBlur = vi.fn();
    const modifyPanelVisible = vi.fn();
    const startClickDate = vi.fn();
    const startClickTime = vi.fn();
    const endClickDate = vi.fn();
    const endClickTime = vi.fn();
    const focusInput = vi.fn();
    const focusPicker = vi.fn();
    const domRefs = {
      startDatePanelsDomRef: ref({ clickDateCell: startClickDate, clickTimeCell: startClickTime }),
      endDatePanelsDomRef: ref({ clickDateCell: endClickDate, clickTimeCell: endClickTime }),
      startInputDomRef: ref({ focus: focusInput }),
      pickerDomRef: ref({ focus: focusPicker }),
    } as unknown as HDatePickerDomRefs;
    const propRefs = makePropRefs();
    const isRange = ref(false);
    const startDate = ref<Dayjs | undefined | null>();
    const endDate = ref<Dayjs | undefined | null>();
    const startTime = ref<Dayjs | undefined | null>();
    const endTime = ref<Dayjs | undefined | null>();
    const context = { emit } as unknown as HorizonWebSetupContext<
      DatePickerEmits,
      DatePickerSlots,
      DatePickerExposes
    >;
    const events = useEvent(propRefs, context, domRefs, {
      format: computed(() => 'YYYY/MM/DD HH:mm:ss'),
      startDate,
      endDate,
      startTime,
      endTime,
      visible: ref(false),
      doConfirm,
      doBlur,
      modifyPanelVisible,
      isRange: computed(() => isRange.value),
    });
    const input = (value: string) => ({ target: { value } }) as unknown as Event;

    events.onKeydown(new KeyboardEvent('keydown', { code: 'Enter' }));
    events.onKeydown(new KeyboardEvent('keydown', { code: 'Escape' }));
    expect(doConfirm).toHaveBeenCalledOnce();
    expect(modifyPanelVisible).toHaveBeenCalledWith(false);
    expect(doBlur).toHaveBeenCalledOnce();

    events.onInput(input('2026/02/03 04:05:06'));
    expect(startClickDate).toHaveBeenCalled();
    expect(startClickTime).toHaveBeenCalled();

    isRange.value = true;
    propRefs.singleTrigger.value = true;
    events.onInput(input('2026/01/02 03:04:05-2026/02/03 04:05:06'));
    await nextTick();
    expect(startClickDate).toHaveBeenCalledWith(expect.anything(), 'input', 'start');
    expect(endClickDate).toHaveBeenCalledWith(expect.anything(), 'input', 'end');

    events.onInput(input('2026/01/02 03:04:05-invalid'));
    events.onInput(input('invalid-2026/02/03 04:05:06'));
    events.onInput(input('invalid-invalid'));

    propRefs.singleTrigger.value = false;
    startDate.value = dayjs('2026-01-01');
    startTime.value = dayjs('2026-01-01 01:02:03');
    endDate.value = dayjs('2026-03-01');
    endTime.value = dayjs('2026-03-01 04:05:06');
    events.onInput(input('2026/02/01 02:03:04'), 'start');
    events.onInput(input('2026/04/01 05:06:07'), 'end');
    await nextTick();

    propRefs.singlePanel.value = true;
    events.onInput(input('2026/05/01 05:06:07'), 'end');
    await nextTick();
    propRefs.singlePanel.value = false;

    endDate.value = undefined;
    events.onInput(input('2026/05/01 02:03:04'), 'start');
    startDate.value = undefined;
    events.onInput(input('2026/06/01 02:03:04'), 'end');
    events.onInput(input('not-a-date'), 'end');

    propRefs.singleTrigger.value = true;
    events.onInput(input('2026/12/31 03:04:05-2026/01/01 04:05:06'));
    await nextTick();

    events.onClick({ target: { tagName: 'DIV' } } as unknown as MouseEvent);
    events.onClick({ target: { tagName: 'INPUT' } } as unknown as MouseEvent);
    expect(focusInput).toHaveBeenCalledOnce();
    expect(focusPicker).toHaveBeenCalledOnce();
    events.handleFocus();
    events.handleBlur();
    expect(emit).toHaveBeenCalledWith('focus');
    expect(emit).toHaveBeenCalledWith('blur');

    propRefs.confirmType.value = 'blur';
    events.handleBlur();
    expect(doConfirm).toHaveBeenCalledTimes(2);
  });
});
