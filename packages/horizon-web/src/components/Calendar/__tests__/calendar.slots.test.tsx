import { mount } from '@vue/test-utils';
import NCalendar from '..';
import { describe, expect, test } from 'vitest';

describe('Calendar slots.tsx', () => {
  test('header', () => {
    const wrapper = mount(() => (
      <NCalendar>{{ header: () => <div>Here is header slot</div> }}</NCalendar>
    ));

    expect(wrapper.find('.n-calendar__header--suffix').text()).eq('Here is header slot');
  });

  test('switchDate', () => {
    const wrapper = mount(() => (
      <NCalendar>{{ switchDate: () => <div>Here is switchDate slot</div> }}</NCalendar>
    ));

    expect(wrapper.find('.n-calendar__header').text()).eq('Here is switchDate slot');
  });

  test('dateCell', async () => {
    const wrapper = mount(() => (
      <NCalendar>{{ dateCell: () => <div>Here is dateCell slot</div> }}</NCalendar>
    ));
    const dates = wrapper.findAll('.n-calendar-month__day');

    expect(dates[0].text()).eq('Here is dateCell slot');
  });

  test('dateCellTitle', async () => {
    const wrapper = mount(() => (
      <NCalendar>{{ dateCellTitle: () => <div>Here is dateCellTitle slot</div> }}</NCalendar>
    ));

    expect(wrapper.find('.n-calendar-month__day').text()).eq('Here is dateCellTitle slot');
  });

  test('dateCellAppend', async () => {
    const wrapper = mount(() => (
      <NCalendar>{{ dateCellAppend: () => <div>Here is dateCellAppend slot</div> }}</NCalendar>
    ));

    expect(wrapper.find('.n-calendar-month__day--cell-append').text()).eq(
      'Here is dateCellAppend slot',
    );
  });

  test('monthHeader', async () => {
    const wrapper = mount(() => (
      <NCalendar mode="year">
        {{ monthHeader: () => <div>Here is monthHeader slot</div> }}
      </NCalendar>
    ));

    expect(wrapper.find('.n-calendar-year__month--header-suffix').text()).eq(
      'Here is monthHeader slot',
    );
  });

  test('weekDayHeader', async () => {
    const wrapper = mount(() => (
      <NCalendar mode="week">
        {{ weekDayHeader: () => <div>Here is weekDayHeader slot</div> }}
      </NCalendar>
    ));

    expect(wrapper.find('.n-calendar-week__header--date').text()).eq('Here is weekDayHeader slot');
  });

  test('dayHeader', async () => {
    const wrapper = mount(() => (
      <NCalendar mode="day" modeSwitchableList={['day']}>
        {{ dayHeader: () => <div>Here is dayHeader slot</div> }}
      </NCalendar>
    ));

    expect(wrapper.find('.n-calendar-day__header--date').text()).eq('Here is dayHeader slot');
  });

  test('timezone: week', async () => {
    const wrapper = mount(() => (
      <NCalendar mode="week">{{ timezone: () => <div>Here is timezone slot</div> }}</NCalendar>
    ));

    expect(wrapper.find('.n-calendar-week__header--time-zone').text()).eq('Here is timezone slot');
  });

  test('timezone: day', async () => {
    const wrapper = mount(() => (
      <NCalendar mode="day" modeSwitchableList={['day']}>
        {{ timezone: () => <div>Here is timezone slot</div> }}
      </NCalendar>
    ));

    expect(wrapper.find('.n-calendar-day__header--time-zone').text()).eq('Here is timezone slot');
  });
});
