import { mount } from '@vue/test-utils';
import HCalendar from '..';
import { describe, expect, test } from 'vitest';

describe('Calendar slots.tsx', () => {
  test('header', () => {
    const wrapper = mount(() => (
      <HCalendar>{{ header: () => <div>Here is header slot</div> }}</HCalendar>
    ));

    expect(wrapper.find('.h-calendar__header--suffix').text()).eq('Here is header slot');
  });

  test('switchDate', () => {
    const wrapper = mount(() => (
      <HCalendar>{{ switchDate: () => <div>Here is switchDate slot</div> }}</HCalendar>
    ));

    expect(wrapper.find('.h-calendar__header').text()).eq('Here is switchDate slot');
  });

  test('dateCell', async () => {
    const wrapper = mount(() => (
      <HCalendar>{{ dateCell: () => <div>Here is dateCell slot</div> }}</HCalendar>
    ));
    const dates = wrapper.findAll('.h-calendar-month__day');

    expect(dates[0].text()).eq('Here is dateCell slot');
  });

  test('dateCellTitle', async () => {
    const wrapper = mount(() => (
      <HCalendar>{{ dateCellTitle: () => <div>Here is dateCellTitle slot</div> }}</HCalendar>
    ));

    expect(wrapper.find('.h-calendar-month__day').text()).eq('Here is dateCellTitle slot');
  });

  test('dateCellAppend', async () => {
    const wrapper = mount(() => (
      <HCalendar>{{ dateCellAppend: () => <div>Here is dateCellAppend slot</div> }}</HCalendar>
    ));

    expect(wrapper.find('.h-calendar-month__day--cell-append').text()).eq(
      'Here is dateCellAppend slot',
    );
  });

  test('monthHeader', async () => {
    const wrapper = mount(() => (
      <HCalendar mode="year">
        {{ monthHeader: () => <div>Here is monthHeader slot</div> }}
      </HCalendar>
    ));

    expect(wrapper.find('.h-calendar-year__month--header-suffix').text()).eq(
      'Here is monthHeader slot',
    );
  });

  test('weekDayHeader', async () => {
    const wrapper = mount(() => (
      <HCalendar mode="week">
        {{ weekDayHeader: () => <div>Here is weekDayHeader slot</div> }}
      </HCalendar>
    ));

    expect(wrapper.find('.h-calendar-week__header--date').text()).eq('Here is weekDayHeader slot');
  });

  test('dayHeader', async () => {
    const wrapper = mount(() => (
      <HCalendar mode="day" modeSwitchableList={['day']}>
        {{ dayHeader: () => <div>Here is dayHeader slot</div> }}
      </HCalendar>
    ));

    expect(wrapper.find('.h-calendar-day__header--date').text()).eq('Here is dayHeader slot');
  });

  test('timezone: week', async () => {
    const wrapper = mount(() => (
      <HCalendar mode="week">{{ timezone: () => <div>Here is timezone slot</div> }}</HCalendar>
    ));

    expect(wrapper.find('.h-calendar-week__header--time-zone').text()).eq('Here is timezone slot');
  });

  test('timezone: day', async () => {
    const wrapper = mount(() => (
      <HCalendar mode="day" modeSwitchableList={['day']}>
        {{ timezone: () => <div>Here is timezone slot</div> }}
      </HCalendar>
    ));

    expect(wrapper.find('.h-calendar-day__header--time-zone').text()).eq('Here is timezone slot');
  });
});
