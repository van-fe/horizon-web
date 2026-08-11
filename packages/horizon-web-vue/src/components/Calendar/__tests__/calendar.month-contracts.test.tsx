import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import HCalendar from '../src/Calendar';
import type { HCalendarPinFlag } from '../src/utils/types';
import HTooltip from '~/components/Tooltip/src/Tooltip';

describe('Calendar month contracts', () => {
  test('renders clipped/clickable/temp styled flags and time labels across weeks', async () => {
    const onPinFlagClick = vi.fn();
    const pinFlags: HCalendarPinFlag[] = [
      {
        title: 'Across boundaries',
        startAt: '2026-01-20 10:00',
        endAt: '2026-03-10 12:00',
        clickable: true,
        tooltip: true,
        type: 'warning',
        color: 'rgb(255, 0, 0)',
        background: 'rgb(0, 0, 255)',
      },
      {
        title: 'Same day',
        startAt: '2026-02-05 01:00',
        endAt: '2026-02-05 02:00',
        tooltip: 'same-day-details',
      },
      {
        startAt: '2026-02-12',
        endAt: '2026-02-13',
        temp: true,
      },
    ];
    const wrapper = mount(HCalendar, {
      props: {
        modelValue: '2026-02-01',
        mode: 'month',
        pinFlags,
        pinFlagsShowTime: true,
        onPinFlagClick,
      },
    });
    const flags = wrapper.findAll('.h-calendar-month__flag:not(.h-calendar-month__flag--wrapper):not(.h-calendar-month__flag--placeholder)');
    expect(flags.length).toBeGreaterThan(3);
    expect(wrapper.text()).toContain('01/20 10:00～03/10 12:00');
    expect(wrapper.text()).toContain('01:00～02:00');
    expect(wrapper.find('.is-temp').exists()).toBe(true);
    expect(wrapper.find('.is-started').exists()).toBe(true);
    expect(wrapper.find('.is-ended').exists()).toBe(true);
    for (const tooltip of wrapper.findAllComponents(HTooltip)) {
      const slots = tooltip.vm.$slots as unknown as Record<
        string,
        ((...args: unknown[]) => unknown) | undefined
      >;
      slots.content?.();
    }
    await wrapper.find('.is-clickable').trigger('click');
    expect(onPinFlagClick).toHaveBeenCalledWith(expect.objectContaining({ title: 'Across boundaries' }));
    const nonClickable = flags.find(flag => !flag.classes().includes('is-clickable'))!;
    await nonClickable.trigger('click');
    expect(onPinFlagClick).toHaveBeenCalledOnce();
  });

  test('drag creation follows disabled dates in both directions and reserves modified flags', async () => {
    const pinFlags = ref<HCalendarPinFlag[]>([]);
    const finish = vi.fn(async (flag: HCalendarPinFlag) => ({ ...flag, title: 'Reserved' }));
    const wrapper = mount(HCalendar, {
      props: {
        modelValue: '2026-02-01',
        pinFlags: pinFlags.value,
        enableCreatePinFlags: true,
        pickable: true,
        disableDate: date => date.date() === 15,
        creatingPinFlagCallback: () => ({ title: 'Creating', type: 'success' }),
        creatFinishFlagCallback: finish,
        'onUpdate:pinFlags': value => (pinFlags.value = value),
      },
    });
    const cells = wrapper.findAll('.h-calendar-month__day');
    const start = cells[9];
    await cells[8].trigger('mousemove');
    await start.trigger('mousedown');
    await wrapper.findAll('.h-calendar-month__day')[9].trigger('mousemove');
    await wrapper.findAll('.h-calendar-month__day')[19].trigger('mousemove');
    await wrapper.find('.h-calendar-month').trigger('mouseup');
    await nextTick();
    await nextTick();
    expect(finish).toHaveBeenCalled();
    expect(pinFlags.value.at(-1)?.title).toBe('Reserved');

    const reverseStart = cells[24];
    await reverseStart.trigger('mousedown');
    await wrapper.findAll('.h-calendar-month__day')[4].trigger('mousemove');
    await wrapper.find('.h-calendar-month').trigger('mouseleave');
    await nextTick();
    await nextTick();
    expect(pinFlags.value.length).toBeGreaterThanOrEqual(2);
  });

  test('drag creation may cross disabled dates and supports false reservation/disabled start', async () => {
    const pinFlags = ref<HCalendarPinFlag[]>([]);
    const finish = vi
      .fn<(flag: HCalendarPinFlag) => Promise<boolean>>()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    const wrapper = mount(HCalendar, {
      props: {
        modelValue: '2026-02-01',
        pinFlags: pinFlags.value,
        enableCreatePinFlags: true,
        createFlagCanThoughDisableDateOrHour: true,
        disableDate: date => date.date() === 15,
        creatFinishFlagCallback: finish,
        'onUpdate:pinFlags': value => (pinFlags.value = value),
      },
    });
    const disabled = wrapper.find('.h-calendar-month__day.is-disabled');
    await disabled.trigger('mousedown');
    expect(finish).not.toHaveBeenCalled();

    const cells = wrapper.findAll('.h-calendar-month__day:not(.is-disabled)');
    await cells[5].trigger('mousedown');
    await wrapper.findAll('.h-calendar-month__day:not(.is-disabled)')[25].trigger('mousemove');
    await wrapper.find('.h-calendar-month').trigger('mouseup');
    await nextTick();
    await nextTick();
    expect(pinFlags.value).toHaveLength(0);

    await cells[8].trigger('mousedown');
    await wrapper.findAll('.h-calendar-month__day:not(.is-disabled)')[28].trigger('mousemove');
    await wrapper.find('.h-calendar-month').trigger('mouseup');
    await nextTick();
    await nextTick();
    expect(pinFlags.value).toHaveLength(1);

    await wrapper.find('.h-calendar-month').trigger('mouseup');
  });

  test('initial only-current mode clips filler dates and flag ranges', () => {
    const wrapper = mount(HCalendar, {
      props: {
        modelValue: '2026-02-01',
        dateType: 'only-current',
        pinFlags: [
          {
            title: 'Clipped',
            startAt: '2026-01-20',
            endAt: '2026-03-10',
          },
        ],
      },
    });
    expect(wrapper.findAll('.h-calendar-month__day').length).toBeLessThanOrEqual(35);
    expect(wrapper.find('.h-calendar-month__flag').exists()).toBe(true);
  });

  test('empty switchable list falls back to month mode', () => {
    const wrapper = mount(HCalendar, {
      props: { mode: 'year', modeSwitchableList: [] },
    });
    expect(wrapper.find('.h-calendar-month').exists()).toBe(true);
  });
});
