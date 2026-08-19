import { expect, test, describe, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { HCalendarPinFlag } from '../src/utils/types';
import { mount } from '@vue/test-utils';
import HCalendar from '../index';
import '../src/style/index.scss';

describe('calendar.pin-flags', function () {
  test('creatingPinFlagCallback', async () => {
    const pinFlags = ref<HCalendarPinFlag[]>([]);

    function onCreatingPinFlagCallback(): {
      title: string;
      type: HCalendarPinFlag['type'];
    } {
      return {
        title: 'test',
        type: 'pill',
      };
    }

    function onCreatFinishFlagCallback(): Promise<boolean> {
      return new Promise(resolve => {
        resolve(true);
      });
    }

    const wrapper = mount(() => (
      <HCalendar
        v-model:pinFlags={pinFlags.value}
        pickable={true}
        enableCreatePinFlags={true}
        creatingPinFlagCallback={onCreatingPinFlagCallback}
        creatFinishFlagCallback={onCreatFinishFlagCallback}
      />
    ));

    const dayCell = wrapper.find('.h-calendar-month__day');

    await dayCell.trigger('mousedown');
    await dayCell.trigger('mouseup');

    expect(pinFlags.value.at(-1)).toEqual(
      expect.objectContaining({
        title: 'test',
        type: 'pill',
      }),
    );
  });

  test('delete one of pinFlags', async () => {
    const pinFlags = ref<HCalendarPinFlag[]>([
      {
        title: 'HIO Auto Show',
        startAt: '2022-10-14',
        endAt: '2022-10-20 23:59:59',
        tooltip: `Don't miss the HIO auto show`,
        clickable: true,
      },
      {
        title: 'Car owners face to face',
        startAt: '2022-10-17',
        endAt: '2022-10-19 23:59:59',
        tooltip: 'Owners face to face, face to heart collision',
        type: 'warning',
      },
    ]);

    const onUpdatePinFlags = vi.fn();

    mount(() => (
      <HCalendar
        modelValue="2022-11-30"
        v-model:pinFlags={pinFlags.value}
        onUpdate:pinFlags={onUpdatePinFlags}
      />
    ));

    pinFlags.value.splice(0, 1);

    await nextTick();

    expect(onUpdatePinFlags).toHaveBeenCalledWith(pinFlags.value);
  });

  test('pinFlags: start/end date class is set correctly', async () => {
    const pinFlags = ref<HCalendarPinFlag[]>([
      {
        title: 'HIO Auto Show',
        startAt: '2022-10-14',
        endAt: '2022-10-19',
        tooltip: `Don't miss the HIO auto show`,
        clickable: true,
      },
      {
        title: 'Car owners face to face',
        startAt: '2022-10-17 12:00:00',
        endAt: '2022-10-20 23:59:59',
        tooltip: 'Owners face to face, face to heart collision',
        type: 'warning',
      },
      {
        title: 'National Day',
        startAt: '2022-10-1',
        endAt: '2022-10-8',
        type: 'success',
      },
      {
        title: 'Special Memorial Day',
        startAt: '2022-10-4',
        type: 'success',
      },
      {
        title: 'Team building',
        startAt: '2022-10-21',
        type: 'success',
      },
    ]);

    const wrapper = mount(() => (
      <HCalendar modelValue="2022-10-01" v-model:pinFlags={pinFlags.value} mode="year" />
    ));

    const octoberCell = wrapper.findAll('.h-calendar-year__month')[9];

    const flagStarts = octoberCell.findAll('.has-flag.is-flag-start');
    const flagEnds = octoberCell.findAll('.has-flag.is-flag-end');

    expect(flagStarts).length(3);
    expect(flagEnds).length(3);

    expect(flagStarts[0].element.textContent).eq('1');
    expect(flagStarts[1].element.textContent).eq('14');
    expect(flagStarts[2].element.textContent).eq('21');

    expect(flagEnds[0].element.textContent).eq('7');
    expect(flagEnds[1].element.textContent).eq('20');
    expect(flagEnds[2].element.textContent).eq('21');
  });

  test(`pinFlags: before reserve temp flags won't emit update:pinFlags`, async () => {
    const pinFlags = ref<HCalendarPinFlag[]>([
      {
        title: 'HIO Auto Show',
        startAt: '2022-10-14',
        endAt: '2022-10-20 23:59:59',
        tooltip: `Don't miss the HIO auto show`,
        clickable: true,
      },
      {
        title: 'Car owners face to face',
        startAt: '2022-10-17',
        endAt: '2022-10-19 23:59:59',
        tooltip: 'Owners face to face, face to heart collision',
        type: 'warning',
      },
    ]);

    function creatFinishFlagCallback(): Promise<boolean> {
      return new Promise(async resolve => {
        expect(pinFlags.value).length(2);
        resolve(true);
        await nextTick();
        expect(pinFlags.value).length(3);

        expect(true).toBe(false);
      });
    }

    const wrapper = mount(() => (
      <HCalendar
        modelValue="2022-11-30"
        v-model:pinFlags={pinFlags.value}
        creatFinishFlagCallback={creatFinishFlagCallback}
      />
    ));

    const dayCell = wrapper.find('.h-calendar-month__day');

    await dayCell.trigger('mousedown');
    await dayCell.trigger('mouseup');
  });

  test(`create flag in week mode`, async () => {
    const pinFlags = ref<HCalendarPinFlag[]>([]);

    function creatFinishFlagCallback(): Promise<boolean> {
      return Promise.resolve(true);
    }

    const wrapper = mount(() => (
      <HCalendar
        v-model:pinFlags={pinFlags.value}
        mode="week"
        creatFinishFlagCallback={creatFinishFlagCallback}
      />
    ));

    const dayColumn = wrapper.find('.h-calendar-week__body--date-grid-column');

    await dayColumn.trigger('mousedown');
    await dayColumn.trigger('mouseup');

    await nextTick();
  });
});
