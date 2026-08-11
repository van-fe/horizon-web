import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import type { ToRefs } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import dayjs from '~/utils/useDayJs';
import type { Dayjs } from 'dayjs';
import type { DatePickerProps } from '../src/composables/useProps';
import type { HDatePickerBaseSupportType, HDatePickerDomRefs } from '../src/utils/types';
import useData from '../src/hooks/useData';

function mountData(
  propOverrides: Record<string, unknown> = {},
  initialType: HDatePickerBaseSupportType = 'date',
) {
  const blurPicker = vi.fn();
  const blurStart = vi.fn();
  const blurEnd = vi.fn();
  const resetStart = vi.fn();
  const resetEnd = vi.fn();
  const modifyPanelVisible = vi.fn();
  const Harness = defineComponent({
    emits: [
      'update:modelValue',
      'update:previewDate',
      'change',
      'confirm',
      'cancel',
      'clear',
    ],
    setup(_, context) {
      const propState = reactive({
        modelValue: undefined,
        initialValue: undefined,
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        firstDayOfWeek: 1,
        disabled: false,
        singleTrigger: false,
        hoverToDisplayValue: false,
        formatTriggerText: undefined,
        defaultTime: undefined,
        needConfirm: true,
        ...propOverrides,
      });
      const propRefs = toRefs(propState) as unknown as ToRefs<DatePickerProps>;
      const pickerType = ref<HDatePickerBaseSupportType>(initialType);
      const startDate = ref<Dayjs | undefined | null>();
      const endDate = ref<Dayjs | undefined | null>();
      const previewDate = ref<Dayjs>();
      const startTime = ref<Dayjs | undefined | null>();
      const endTime = ref<Dayjs | undefined | null>();
      const previewStartTime = ref<Dayjs>();
      const previewEndTime = ref<Dayjs>();
      const visible = ref(false);
      const domRefs = {
        pickerDomRef: ref({ blur: blurPicker }),
        startInputDomRef: ref({ blur: blurStart, resetInputString: resetStart }),
        endInputDomRef: ref({ blur: blurEnd, resetInputString: resetEnd }),
        startDatePanelsDomRef: ref(),
        endDatePanelsDomRef: ref(),
      } as unknown as HDatePickerDomRefs;
      const data = useData(propRefs, context as never, domRefs, {
        pickerType: computed(() => pickerType.value),
        startDate,
        endDate,
        previewDate,
        startTime,
        endTime,
        previewStartTime,
        previewEndTime,
        valueFormat: computed(() => String(propState.valueFormat ?? 'YYYY-MM-DD HH:mm:ss')),
        format: computed(() => 'YYYY-MM-DD HH:mm:ss'),
        visible,
        modifyPanelVisible,
      });
      context.expose({
        propState,
        pickerType,
        startDate,
        endDate,
        previewDate,
        startTime,
        endTime,
        previewStartTime,
        previewEndTime,
        visible,
        ...data,
      });
      return () => null;
    },
  });
  const wrapper = mount(Harness);
  return {
    wrapper,
    vm: wrapper.vm as unknown as {
      propState: Record<string, unknown>;
      pickerType: HDatePickerBaseSupportType;
      startDate: Dayjs | undefined | null;
      endDate: Dayjs | undefined | null;
      previewDate: Dayjs | undefined;
      startTime: Dayjs | undefined | null;
      endTime: Dayjs | undefined | null;
      previewStartTime: Dayjs | undefined;
      previewEndTime: Dayjs | undefined;
      visible: boolean;
      showValue: string | [string | undefined, string | undefined] | undefined;
      isRange: boolean;
      isContainTime: boolean;
      isDisabled: boolean;
      canConfirmBtnClick: boolean;
      onUpdateDate: (
        start: Dayjs | undefined | null,
        end: Dayjs | undefined | null,
        trigger: 'click' | 'input',
      ) => void;
      onUpdatePreviewDate: (date?: Dayjs) => void;
      onUpdateTime: (
        start: Dayjs | undefined | null,
        end: Dayjs | undefined | null,
        trigger: 'click' | 'input' | 'confirmable-input',
      ) => void;
      onUpdatePreviewTime: (time: Dayjs | undefined, type: 'start' | 'end') => void;
      doConfirm: (fromUser?: boolean) => void;
      doCancel: () => void;
      doClear: () => void;
      doBlur: () => void;
      onClickNow: () => void;
    },
    modifyPanelVisible,
    blurPicker,
    blurStart,
    blurEnd,
    resetStart,
    resetEnd,
  };
}

describe('DatePicker data contract', () => {
  test('transforms empty, scalar, array, week and time model values', async () => {
    const empty = mountData({ initialValue: null, modelValue: '2026-01-02 03:04:05' });
    expect(empty.vm.startDate?.format('YYYY-MM-DD')).toBe('2026-01-02');
    empty.vm.propState.modelValue = '';
    await nextTick();
    expect(empty.vm.startDate).toBeUndefined();
    empty.vm.propState.modelValue = null;
    await nextTick();
    expect(empty.vm.startDate).toBeUndefined();
    empty.vm.propState.modelValue = undefined;
    empty.vm.propState.initialValue = undefined;
    await nextTick();
    expect(empty.vm.startDate).toBeUndefined();

    const range = mountData(
      { modelValue: ['2026-04-03 01:02:03', '2026-04-05 04:05:06'] },
      'datetime-range',
    );
    expect(range.vm.startTime?.format('HH:mm:ss')).toBe('01:02:03');
    expect(range.vm.endTime?.format('HH:mm:ss')).toBe('04:05:06');
    expect(range.vm.canConfirmBtnClick).toBe(true);

    const week = mountData({ modelValue: '2026-08-05 00:00:00' }, 'week');
    expect(week.vm.startDate?.day()).toBe(1);
    expect(week.vm.endDate?.diff(week.vm.startDate!, 'day')).toBe(6);
    week.vm.propState.firstDayOfWeek = 0;
    await nextTick();
    expect(week.vm.startDate?.day()).toBe(0);
    week.vm.propState.modelValue = '';
    await nextTick();
    expect(week.vm.startDate).toBeUndefined();
    week.vm.propState.modelValue = [undefined, undefined];
    await nextTick();
    expect(week.vm.startDate).toBeUndefined();
  });

  test('computes disabled and confirmation readiness for every range/time shape', async () => {
    const data = mountData({}, 'date');
    expect(data.vm.isDisabled).toBe(false);
    expect(data.vm.canConfirmBtnClick).toBe(false);
    data.vm.startDate = dayjs('2026-01-01');
    await nextTick();
    expect(data.vm.canConfirmBtnClick).toBe(true);
    data.vm.propState.disabled = true;
    expect(data.vm.isDisabled).toBe(true);

    data.vm.pickerType = 'datetime';
    await nextTick();
    expect(data.vm.isContainTime).toBe(true);
    expect(data.vm.canConfirmBtnClick).toBeUndefined();
    data.vm.startTime = dayjs('2026-01-01 01:02:03');
    await nextTick();
    expect(data.vm.canConfirmBtnClick).toBe(true);

    data.vm.pickerType = 'date-range';
    data.vm.endDate = dayjs('2026-02-01');
    await nextTick();
    expect(data.vm.isRange).toBe(true);
    expect(data.vm.canConfirmBtnClick).toBe(true);

    data.vm.pickerType = 'datetime-range';
    await nextTick();
    expect(data.vm.canConfirmBtnClick).toBeUndefined();
    data.vm.endTime = dayjs('2026-02-01 02:03:04');
    await nextTick();
    expect(data.vm.canConfirmBtnClick).toBe(true);
  });

  test('formats single/range/single-trigger and custom trigger values including previews', async () => {
    const single = mountData({ modelValue: '2026-02-03 04:05:06' }, 'datetime');
    expect(single.vm.showValue).toBe('2026-02-03 04:05:06');
    single.vm.propState.formatTriggerText = (_date: Dayjs, text: string) => `custom:${text}`;
    single.vm.propState.modelValue = '2026-02-04 04:05:06';
    await nextTick();
    expect(single.vm.showValue).toContain('custom:');

    const range = mountData(
      { modelValue: ['2026-02-03 00:00:00', '2026-03-04 00:00:00'] },
      'date-range',
    );
    expect(Array.isArray(range.vm.showValue)).toBe(true);
    range.vm.propState.singleTrigger = true;
    range.vm.propState.modelValue = ['2026-02-04 00:00:00', '2026-03-05 00:00:00'];
    await nextTick();
    expect(range.vm.showValue).toBe('2026-02-04 00:00:00 - 2026-03-05 00:00:00');

    range.vm.propState.hoverToDisplayValue = true;
    await nextTick();
    range.vm.previewDate = dayjs('2026-01-01');
    await nextTick();
    expect(String(range.vm.showValue)).toContain('2026-01-01');
    range.vm.propState.hoverToDisplayValue = false;
    await nextTick();

    const timed = mountData(
      {
        modelValue: ['2026-02-03 01:02:03', '2026-03-04 04:05:06'],
        hoverToDisplayValue: true,
      },
      'datetime-range',
    );
    timed.vm.previewStartTime = dayjs('2026-02-03 09:10:11');
    timed.vm.previewEndTime = dayjs('2026-03-04 12:13:14');
    timed.vm.previewDate = dayjs('2026-01-15');
    await nextTick();
    expect(timed.wrapper.emitted('update:previewDate')).toBeTruthy();
    timed.vm.startDate = undefined;
    timed.vm.endDate = undefined;
    timed.vm.previewDate = dayjs('2026-01-16');
    await nextTick();

    const partialTimed = mountData(
      { modelValue: ['2026-04-01 01:02:03', undefined], hoverToDisplayValue: true },
      'datetime-range',
    );
    partialTimed.vm.previewDate = dayjs('2026-04-20');
    partialTimed.vm.previewStartTime = dayjs('2026-04-01 07:08:09');
    partialTimed.vm.previewEndTime = dayjs('2026-04-20 10:11:12');
    await nextTick();
    expect(partialTimed.wrapper.emitted('update:previewDate')).toBeTruthy();

    const singlePreview = mountData(
      { modelValue: '2026-04-01 01:02:03', hoverToDisplayValue: true },
      'datetime',
    );
    singlePreview.vm.previewDate = dayjs('2026-04-22');
    singlePreview.vm.previewStartTime = dayjs('2026-04-22 12:13:14');
    await nextTick();
    expect(String(singlePreview.vm.showValue)).toContain('2026-04-22 12:13:14');

    const partialDate = mountData(
      { modelValue: ['2026-05-01', undefined], hoverToDisplayValue: true },
      'date-range',
    );
    partialDate.vm.previewDate = dayjs('2026-05-20');
    await nextTick();
    expect(String(partialDate.vm.showValue)).toContain('2026-05-20');

    const emptySingleTrigger = mountData({ singleTrigger: true }, 'date-range');
    expect(emptySingleTrigger.vm.showValue).toBeUndefined();
    const partialSingleTrigger = mountData(
      { modelValue: ['2026-05-01', undefined], singleTrigger: true },
      'date-range',
    );
    expect(String(partialSingleTrigger.vm.showValue)).toContain('2026-05-01');

    const emptyCustom = mountData({ formatTriggerText: (_date: Dayjs, text: string) => text });
    expect(emptyCustom.vm.showValue).toBe('');

    const invalidCustom = mountData(
      {
        modelValue: ['2026-06-01', '2026-06-02'],
        formatTriggerText: () => 'not-an-array',
      },
      'date-range',
    );
    expect(Array.isArray(invalidCustom.vm.showValue)).toBe(true);
  });

  test('confirms/cancels/clears complete and incomplete single/range selections', async () => {
    const single = mountData({ valueFormat: 'YYYY-MM-DD', needConfirm: false }, 'date');
    single.vm.onUpdateDate(dayjs('2026-04-01'), undefined, 'click');
    expect(single.wrapper.emitted('update:modelValue')?.[0]).toEqual(['2026-04-01']);
    single.vm.doConfirm(true);
    expect(single.wrapper.emitted('confirm')).toHaveLength(1);
    single.vm.doCancel();
    expect(single.wrapper.emitted('cancel')).toHaveLength(1);
    single.vm.doClear();
    expect(single.wrapper.emitted('clear')).toHaveLength(1);
    expect(single.blurPicker).toHaveBeenCalled();
    expect(single.blurStart).toHaveBeenCalled();
    expect(single.blurEnd).toHaveBeenCalled();
    expect(single.modifyPanelVisible).toHaveBeenCalledWith(false);

    const dateRange = mountData({ valueFormat: 'YYYY-MM-DD', needConfirm: false }, 'date-range');
    dateRange.vm.onUpdateDate(dayjs('2026-05-10'), dayjs('2026-05-01'), 'click');
    expect(dateRange.wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([
      '2026-05-01',
      '2026-05-10',
    ]);
    dateRange.vm.onUpdateDate(dayjs('2026-06-01'), undefined, 'click');

    const timed = mountData(
      { valueFormat: 'YYYY-MM-DD HH:mm:ss', needConfirm: false },
      'datetime-range',
    );
    timed.vm.onUpdateDate(dayjs('2026-07-02'), dayjs('2026-07-01'), 'input');
    timed.vm.onUpdateTime(dayjs('2026-07-02 03:04:05'), dayjs('2026-07-01 01:02:03'), 'click');
    timed.vm.doConfirm();
    expect(timed.wrapper.emitted('update:modelValue')).toBeTruthy();

    const incomplete = mountData({ initialValue: null, needConfirm: false }, 'datetime-range');
    incomplete.vm.onUpdateDate(dayjs('2026-08-01'), undefined, 'click');
    incomplete.vm.doConfirm();
    expect(incomplete.modifyPanelVisible).toHaveBeenCalledWith(false);

    const singleTimed = mountData({ valueFormat: undefined, needConfirm: false }, 'datetime');
    singleTimed.vm.onUpdateDate(dayjs('2026-10-01'), undefined, 'input');
    singleTimed.vm.onUpdateTime(dayjs('2026-10-01 01:02:03'), undefined, 'click');
    const emittedDayjs = singleTimed.wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Dayjs;
    expect(emittedDayjs.format).toBeTypeOf('function');
    const incompleteSingleTimed = mountData({ needConfirm: false }, 'datetime');
    incompleteSingleTimed.vm.onUpdateTime(dayjs('2026-10-01 01:02:03'), undefined, 'click');
    const incompleteSingleDate = mountData({ needConfirm: false }, 'date');
    incompleteSingleDate.vm.onUpdateDate(undefined, undefined, 'click');

    const completeAscending = mountData({ valueFormat: 'YYYY-MM-DD' }, 'date-range');
    completeAscending.vm.onUpdateDate(dayjs('2026-11-01'), dayjs('2026-11-02'), 'input');
    completeAscending.vm.doConfirm();
    expect(completeAscending.wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([
      '2026-11-01',
      '2026-11-02',
    ]);
  });

  test('applies scalar/range default times and routes preview/now/visibility resets', async () => {
    const scalar = mountData({ defaultTime: '08:09:10' }, 'datetime');
    scalar.vm.onUpdateDate(dayjs('2026-09-01'), undefined, 'input');
    expect(scalar.vm.startTime?.format('HH:mm:ss')).toBe('08:09:10');

    const range = mountData(
      { defaultTime: ['01:02:03', dayjs('2026-01-01 04:05:06')] },
      'datetime-range',
    );
    range.vm.onUpdateDate(dayjs('2026-09-01'), dayjs('2026-09-02'), 'input');
    expect(range.vm.startTime?.format('HH:mm:ss')).toBe('01:02:03');
    expect(range.vm.endTime?.format('HH:mm:ss')).toBe('04:05:06');

    const inverseRange = mountData(
      { defaultTime: [dayjs('2026-01-01 05:06:07'), '08:09:10'] },
      'datetime-range',
    );
    inverseRange.vm.onUpdateDate(dayjs('2026-09-03'), dayjs('2026-09-04'), 'input');
    expect(inverseRange.vm.startTime?.format('HH:mm:ss')).toBe('05:06:07');
    expect(inverseRange.vm.endTime?.format('HH:mm:ss')).toBe('08:09:10');
    const dayjsDefault = mountData({ defaultTime: dayjs('2026-01-01 11:12:13') }, 'datetime');
    dayjsDefault.vm.onUpdateDate(dayjs('2026-09-05'), undefined, 'input');
    expect(dayjsDefault.vm.startTime?.format('HH:mm:ss')).toBe('11:12:13');
    range.vm.onUpdatePreviewDate(dayjs('2026-10-01'));
    range.vm.onUpdatePreviewTime(dayjs('2026-10-01 01:01:01'), 'start');
    range.vm.onUpdatePreviewTime(dayjs('2026-10-01 02:02:02'), 'end');
    expect(range.vm.previewStartTime?.hour()).toBe(1);
    expect(range.vm.previewEndTime?.hour()).toBe(2);

    range.vm.visible = true;
    await nextTick();
    range.vm.visible = false;
    await nextTick();
    await nextTick();
    expect(range.vm.previewDate).toBeUndefined();
    expect(range.resetStart).toHaveBeenCalled();
    expect(range.resetEnd).toHaveBeenCalled();

    const now = mountData({}, 'datetime');
    now.vm.onClickNow();
    expect(now.vm.startDate).toBeTruthy();
    expect(now.vm.startTime).toBeTruthy();
    const nowWithDefault = mountData({ defaultTime: '12:00:00' }, 'datetime');
    nowWithDefault.vm.onClickNow();
    expect(nowWithDefault.vm.startTime?.format('HH:mm:ss')).toBe('12:00:00');
  });
});
