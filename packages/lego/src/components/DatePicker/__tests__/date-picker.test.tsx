import { mount, shallowMount } from '@vue/test-utils';
import NDatePicker from '../';
import NButton from '../../Button';
import { describe, expect, test, vi } from 'vitest';
import type { Ref } from 'vue';
import { ref } from 'vue';
import dayjs from '../src/composables/dayjs';
import panelTrigger from '../src/calendar-components/panel-trigger';
import { localeInjectKey } from '~/provides';
import VueLocaleService from '@nio-fe/locale-vue';
import { dictionaries } from '~/locales';
import type { DatePickerExposes } from '../src/composables/useExposes';
import NInput from '../../Input';
import { sleep } from '~/utils/tools';
import { LocaleSupportLangV2 } from '@nio-fe/locale';

describe('DatePicker.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <NDatePicker modelValue={modelValue.value} />);
    const element = wrapper.findComponent(NDatePicker);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('daterange with error status', () => {
      const wrapper = mount(() => <NDatePicker type="daterange" inputStatus="error" />);

      expect(wrapper.findComponent(panelTrigger).classes()).toContain('is-error');
    });

    test('default with error status', () => {
      const wrapper = mount(() => <NDatePicker inputStatus="error" />);

      expect(wrapper.find('.n-input').classes()).toContain('n-input__error--normal');
    });

    test('default placeholder text', () => {
      const wrapper = mount(() => <NDatePicker />);
      const input = wrapper.find('.n-input__inner');

      expect(input.attributes('placeholder')).eq('Please select');
    });

    test('input date', async () => {
      const value = ref([]);
      const localeService = new VueLocaleService({
        current: LocaleSupportLangV2.ZhCN,
        lang: {
          dictionaries,
        },
      });
      const wrapper = mount(
        () => (
          <NDatePicker
            v-model={value.value}
            type="datetimerange"
            toBody={false}
            valueFormat="YYYY/MM/DD HH:mm"
          />
        ),
        {
          attachTo: document.body,
          global: {
            provide: {
              [localeInjectKey as symbol]: ref(localeService),
            },
          },
        },
      );

      const input = wrapper.find('.n-date-picker-trigger');
      await input.trigger('click');

      const dateInput = wrapper.findAll('input');

      await dateInput[0].setValue('2023/03/08 9:00');
      await dateInput[0].trigger('blur');
      await dateInput[1].setValue('2023/04/08 12:00');
      await dateInput[1].trigger('blur');

      await sleep();
      expect(value.value[0]).toBe('2023/03/08 09:00');
      expect(value.value[1]).toBe('2023/04/08 12:00');
    });

    test('remove clearable', () => {
      const wrapper = mount(() => <NDatePicker clearable={false} />);
      const input = wrapper.find('.n-input__suffix');
      expect(input.exists()).toBe(false);
    });

    test.skip('type week', async () => {
      const modelValue = ref(new Date());
      const localeService = new VueLocaleService({
        current: LocaleSupportLangV2.ZhCN,
        lang: {
          dictionaries,
        },
      });
      const wrapper = mount(
        () => (
          <NDatePicker v-model={modelValue.value} type="week" toBody={false} format="[Week] ww" />
        ),
        {
          attachTo: document.body,
          global: {
            provide: {
              [localeInjectKey as symbol]: ref(localeService),
            },
          },
        },
      );
      const trigger = wrapper.find('.n-date-picker-trigger input');
      await trigger.trigger('focus');

      const weekStart = dayjs().startOf('week');

      expect(wrapper.find('.n-date-picker-panel-table__render-box--begin').text()).eq(
        weekStart.format('D'),
      );
      expect(wrapper.find('.n-date-picker-panel-table__render-box--end').text()).eq(
        weekStart.endOf('week').format('D'),
      );

      const dates = wrapper.findAll('.n-date-picker-panel-table__render-box--current');
      const firstDate = dates[7];

      await firstDate.trigger('click');

      expect(modelValue.value).toStrictEqual(
        dayjs().startOf('month').add(1, 'w').startOf('w').toDate(),
      );

      await trigger.trigger('focus');
      const renderBox = wrapper.findAll('.n-date-picker-panel-table__render-box');

      // renderBox.forEach((box, index) => {
      //   // eslint-disable-next-line no-console
      //   console.log({
      //     html: box.html(),
      //     index,
      //   });
      // });

      expect(renderBox[7].classes()).toContain('n-date-picker-panel-table__render-box--begin');
      expect(renderBox[13].classes()).toContain('n-date-picker-panel-table__render-box--end');
    });

    test('specifies the default time when type is daterange', async () => {
      const modelValue = ref();
      const defaultTime = ref(['09:10:20', '23:59:59']);
      const localeService = new VueLocaleService({
        current: LocaleSupportLangV2.ZhCN,
        lang: {
          dictionaries,
        },
      });
      const wrapper = mount(
        () => (
          <NDatePicker
            v-model={modelValue.value}
            type="daterange"
            defaultTime={defaultTime.value}
            toBody={false}
          />
        ),
        {
          attachTo: document.body,
          global: {
            provide: {
              [localeInjectKey as symbol]: ref(localeService),
            },
          },
        },
      );
      const trigger = wrapper.find('.n-date-picker-trigger input');

      await trigger.trigger('focus');

      const dates = wrapper.findAll('.n-date-picker-panel-table__render-box--current');
      const firstDate = dates[0];
      const lastDate = dates.at(-1);

      await firstDate.trigger('click');
      await lastDate!.trigger('click');

      expect(dayjs(modelValue.value[0]).hour()).toBe(9);
      expect(dayjs(modelValue.value[0]).minute()).toBe(10);
      expect(dayjs(modelValue.value[0]).second()).toBe(20);

      expect(dayjs(modelValue.value[1]).hour()).toBe(23);
      expect(dayjs(modelValue.value[1]).minute()).toBe(59);
      expect(dayjs(modelValue.value[1]).second()).toBe(59);
    });

    test('embed the component in the page with show-embed equal to true', async () => {
      const wrapper = mount(() => <NDatePicker type="date" showEmbed={true} />);
      const popper = wrapper.find('.n-popover__popper');
      const body = wrapper.find('.n-date-picker__body');

      expect(popper.exists()).toBe(false);
      expect(body.exists()).toBe(true);
    });

    test('showYearButton', async () => {
      const wrapper = mount(() => <NDatePicker type="date" toBody={false} />, {
        attachTo: document.body,
      });
      const trigger = wrapper.find('.n-date-picker-trigger input');

      await trigger.trigger('focus');
      const iconToggleLeft = wrapper.find('.n-icon_toggle_left');

      expect(iconToggleLeft.exists()).toBe(true);
      const dates = wrapper.findAll('.n-date-picker-panel-table__render-box--current');
      const firstDate = dates[0];
      // close
      await firstDate.trigger('click');

      // open again
      const wrapper1 = mount(
        () => <NDatePicker type="date" showYearButton={false} toBody={false} />,
        {
          attachTo: document.body,
        },
      );
      const trigger1 = wrapper1.find('.n-date-picker-trigger');

      await trigger1.trigger('click');
      const iconToggleLeft1 = wrapper1.find('.n-icon_toggle_left');

      expect(iconToggleLeft1.exists()).toBe(false);
    });

    test('disabledSwitchButton', async () => {
      const modelValue = ref('2022/05/22');
      function disabledDate(date: Date) {
        return date.getTime() < new Date('2022/05/21').getTime();
      }
      const wrapper = mount(
        () => (
          <NDatePicker
            type="date"
            v-model={modelValue.value}
            disabledDate={disabledDate}
            disabledSwitchButton={true}
            toBody={false}
          />
        ),
        {
          attachTo: document.body,
        },
      );
      const trigger = wrapper.find('.n-date-picker-trigger input');

      await trigger.trigger('focus');
      const iconToggleLeft = wrapper.find('.n-icon_toggle_left');
      const iconArrowLeft = wrapper.find('.n-icon_arrow_left');

      expect(iconToggleLeft.classes()).toContain('disabled');
      expect(iconArrowLeft.classes()).toContain('disabled');
    });

    test('type yearrange', async () => {
      const modelValue = ref([new Date(2023, 0, 1), new Date(2025, 0, 1)]);
      const localeService = new VueLocaleService({
        current: LocaleSupportLangV2.ZhCN,
        lang: {
          dictionaries,
        },
      });
      const wrapper = mount(
        () => <NDatePicker v-model={modelValue.value} type="yearrange" toBody={false} />,
        {
          attachTo: document.body,
          global: {
            provide: {
              [localeInjectKey as symbol]: ref(localeService),
            },
          },
        },
      );
      const trigger = wrapper.find('.n-date-picker-trigger input');

      await trigger.trigger('focus');

      const dates = wrapper.findAll('.n-date-picker-year-month__render-box--current');
      const firstDateClasses = dates[3].classes();
      const lastDateClasses = dates[5].classes();

      // 回显
      expect(firstDateClasses.includes('n-date-picker-year-month__render-box--begin')).toBe(true);
      expect(lastDateClasses.includes('n-date-picker-year-month__render-box--end')).toBe(true);

      const firstDate = dates[0];
      const lastDate = dates[9];

      // 选中
      await firstDate.trigger('click');
      await lastDate!.trigger('click');

      expect(dayjs(modelValue.value[0]).year()).toBe(2020);
      expect(dayjs(modelValue.value[1]).year()).toBe(2029);
    });
  });

  describe('event', () => {
    test('clear', async () => {
      const datePickerRef = ref<(typeof NDatePicker & DatePickerExposes) | null>(null);
      const modelValue = ref(new Date());
      const onFocus = vi.fn();

      const wrapper = mount(() => (
        <NDatePicker ref={datePickerRef} v-model={modelValue.value} onFocus={onFocus} />
      ));

      const datePickerTrigger = wrapper.find('.n-date-picker-trigger-content');

      await datePickerTrigger.trigger('mouseenter');

      const clearIcon = wrapper.find('.n-date-picker-trigger-content__icon');

      expect(clearIcon.exists()).toBe(true);

      await clearIcon.trigger('click');

      expect(modelValue.value).eq(null);
      // happy-dom bug
      // expect(onFocus).toHaveBeenCalled();
    });

    test('popperChange', async () => {
      const visible = ref(false);
      const popperChange = (value: boolean) => {
        visible.value = value;
      };
      const value = ref();
      const wrapper = mount(
        () => (
          <NDatePicker
            v-model={value.value}
            type="date"
            toBody={false}
            onPopperChange={popperChange}
          />
        ),
        {
          attachTo: document.body,
        },
      );

      const trigger = wrapper.find('.n-date-picker-trigger input');
      await trigger.trigger('focus');

      expect(visible.value).eq(true);

      const dates = wrapper.find('.n-date-picker-panel-table__render-box--current');
      await dates.trigger('click');

      expect(visible.value).eq(false);
    });
  });

  describe('special', () => {
    test('while choose dates in date-range mode close unexpected', async () => {
      const value = ref([]);
      const wrapper = mount(
        () => (
          <NDatePicker ref="NDatePickerRef" v-model={value.value} type="daterange" toBody={false}>
            {{
              footer: (disabled: Ref<boolean>) => (
                <div>
                  <NButton text={true} size="small">
                    Five minutes later
                  </NButton>
                  <NButton plain={true} size="small">
                    Cancel
                  </NButton>
                  <NButton type="primary" size="small" disabled={disabled.value}>
                    Confirm
                  </NButton>
                </div>
              ),
            }}
          </NDatePicker>
        ),
        {
          attachTo: document.body,
        },
      );

      const trigger = wrapper.find('.n-date-picker-trigger input');

      await trigger.trigger('focus');

      const dates = wrapper.findAll('.n-date-picker-panel-table__render-box--current');
      const firstDate = dates[0];
      const lastDate = dates.at(-1);

      await firstDate.trigger('click');
      await lastDate!.trigger('click');

      expect(wrapper.find('.n-date-picker-panel-body').exists()).eq(true);
    });

    test('while choose Jan 31th date, the second panel should display correct', async () => {
      const localeService = new VueLocaleService({
        current: LocaleSupportLangV2.En,
        lang: {
          dictionaries,
        },
      });

      const value = ref(['2023-01-30', '2023-01-31']);
      const wrapper = mount(
        () => (
          <NDatePicker
            v-model={value.value}
            type="daterange"
            toBody={false}
            valueFormat="YYYY-MM-DD"
          />
        ),
        {
          attachTo: document.body,
          global: {
            provide: {
              [localeInjectKey as symbol]: ref(localeService),
            },
          },
        },
      );

      const trigger = wrapper.find('.n-date-picker-trigger input');
      await trigger.trigger('focus');

      const panelHeaders = wrapper.findAll('.n-date-picker-panel-header__center');
      const firstPanel = panelHeaders[0].text();
      const secondPanel = panelHeaders[1].text();

      expect(firstPanel).eq('Jan 2023');
      expect(secondPanel).eq('Feb 2023');
    });
    test('while type is month and valueFormat is "YYYY-MM", the trigger should display correct', async () => {
      const value = ref('2023-03');
      const wrapper = mount(
        () => (
          <NDatePicker v-model={value.value} type="month" toBody={false} valueFormat="YYYY-MM" />
        ),
        {
          attachTo: document.body,
        },
      );

      const trigger = wrapper.find('.n-date-picker-trigger input');
      await trigger.trigger('focus');

      const renderBox = wrapper.findAll('.n-date-picker-year-month__render-box');

      expect(renderBox[2].classes()).toContain('n-date-picker-year-month__render-box--selected');
    });
  });

  describe('Datetimerange', () => {
    test('select daterange and default time and input format', async () => {
      const value = ref([new Date(2023, 2, 8, 9, 30), new Date(2023, 2, 9, 9, 30)]);
      const localeService = new VueLocaleService({
        current: LocaleSupportLangV2.ZhCN,
        lang: {
          dictionaries,
        },
      });
      const wrapper = mount(
        () => (
          <NDatePicker
            v-model={value.value}
            type="datetimerange"
            default-time={[new Date(2023, 1, 1, 1, 1, 1), new Date(2023, 1, 1, 1, 1, 1)]}
            format="YYYY/MM/DD HH:mm"
            toBody={false}
          />
        ),
        {
          global: {
            provide: {
              [localeInjectKey as symbol]: ref(localeService),
            },
          },
        },
      );
      const trigger = wrapper.find('.n-date-picker-trigger input');
      await trigger.trigger('focus');

      const pickers = wrapper.findAll('.n-date-picker-panel-body');
      // 选中1号
      const leftCell = pickers[0].findAll('.n-date-picker-panel-table__render-box--current')[0];
      const rightCell = pickers[1].findAll('.n-date-picker-panel-table__render-box--current')[0];

      await leftCell.trigger('click');
      await rightCell.trigger('click');

      const rangeHeader = wrapper.find('.n-date-picker-content');
      const NInputEditor = rangeHeader.findAllComponents(NInput);

      expect(NInputEditor[0].componentVM.modelValue).toBe('2023/03/01');
      expect(NInputEditor[1].componentVM.modelValue).toBe('01:01');
      expect(NInputEditor[2].componentVM.modelValue).toBe('2023/04/01');
      expect(NInputEditor[3].componentVM.modelValue).toBe('01:01');

      const confirmButton = wrapper.findAll('.n-date-picker-footer .n-button')[2];
      await confirmButton.trigger('click');

      expect(dayjs(value.value[0]).isSame(dayjs([2023, 2, 1, 1, 1, 1]), 'seconds')).toBe(true);
      expect(dayjs(value.value[1]).isSame(dayjs([2023, 3, 1, 1, 1, 1]), 'seconds')).toBe(true);
    });
    test('select daterange and select time and input format', async () => {
      const value = ref([new Date(2023, 2, 8, 9, 30), new Date(2023, 2, 9, 9, 30)]);
      const localeService = new VueLocaleService({
        current: LocaleSupportLangV2.ZhCN,
        lang: {
          dictionaries,
        },
      });
      const wrapper = mount(
        () => (
          <NDatePicker
            v-model={value.value}
            type="datetimerange"
            format="YYYY/MM/DD HH:mm"
            toBody={false}
          />
        ),
        {
          attachTo: document.body,
          global: {
            provide: {
              [localeInjectKey as symbol]: ref(localeService),
            },
          },
        },
      );
      const trigger = wrapper.find('.n-date-picker-trigger input');
      await trigger.trigger('focus');

      // 选日期
      const pickers = wrapper.findAll('.n-date-picker-panel-body');
      // 选中1号
      const leftCell = pickers[0].findAll('.n-date-picker-panel-table__render-box--current')[0];
      const rightCell = pickers[1].findAll('.n-date-picker-panel-table__render-box--current')[0];

      await leftCell.trigger('click');
      await rightCell.trigger('click');

      // 选时间
      const timeTrigger = wrapper.findAll('.n-time-picker-trigger input');
      await timeTrigger[0].trigger('focus');

      const firstSelectTimeItem = document.querySelector('.n-time-select__item') as HTMLElement;
      await firstSelectTimeItem.click();

      await timeTrigger[1].trigger('focus');

      const endSelectTimeItem = document.querySelector('.n-time-select__item') as HTMLElement;
      await endSelectTimeItem.click();

      const rangeHeader = wrapper.find('.n-date-picker-content');
      const NInputEditor = rangeHeader.findAllComponents(NInput);

      expect(NInputEditor[0].componentVM.modelValue).toBe('2023/03/01');
      expect(NInputEditor[1].componentVM.modelValue).toBe('00:00');
      expect(NInputEditor[2].componentVM.modelValue).toBe('2023/04/01');
      expect(NInputEditor[3].componentVM.modelValue).toBe('00:00');

      const confirmButton = wrapper.findAll('.n-date-picker-footer .n-button')[2];
      await confirmButton.trigger('click');

      expect(dayjs(value.value[0]).isSame(dayjs([2023, 2, 1, 0, 0, 0]), 'seconds')).toBe(true);
      expect(dayjs(value.value[1]).isSame(dayjs([2023, 3, 1, 0, 0, 0]), 'seconds')).toBe(true);
    });
    test('date-range unlink-panels mode', async () => {
      const value = ref();
      const localeService = new VueLocaleService({
        current: LocaleSupportLangV2.ZhCN,
        lang: {
          dictionaries,
        },
      });
      const wrapper = mount(
        () => (
          <NDatePicker v-model={value.value} type="daterange" unlink-panels={true} toBody={false} />
        ),
        {
          attachTo: document.body,
          global: {
            provide: {
              [localeInjectKey as symbol]: ref(localeService),
            },
          },
        },
      );
      const trigger = wrapper.find('.n-date-picker-trigger input');
      await trigger.trigger('focus');

      // 获取显示日期
      const pickers = wrapper.findAll('.n-date-picker-panel');
      // header content
      const leftCell = pickers[0].findAll('.n-date-picker-panel-header__center')[0];
      const rightCell = pickers[1].findAll('.n-date-picker-panel-header__center')[0];

      const rightIcon = pickers[1].findAll('.n-date-picker-panel-header__icon');

      const leftCellText = leftCell.text();
      const rightCellText = rightCell.text();

      await rightIcon[3].trigger('click');

      const leftCellText1 = leftCell.text();
      const rightCellText1 = rightCell.text();

      // 期待左侧不变，右侧变化
      expect(leftCellText === leftCellText1).toBe(true);
      expect(rightCellText === rightCellText1).toBe(false);
    });
  });
});
