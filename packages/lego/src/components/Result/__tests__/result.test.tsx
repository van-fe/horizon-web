import { mount } from '@vue/test-utils';
import { NResult } from '../';
import { describe, expect, test, vi } from 'vitest';
import NButton from '../../Button';
import { nextTick, ref } from 'vue';

describe('Result.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NResult />);
    const element = wrapper.findComponent(NResult);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('title', () => {
      const wrapper = mount(() => <NResult title="Here is TITLE" />);

      const title = wrapper.find('.n-result__title');

      expect(title.text()).eq('Here is TITLE');
    });

    test('subtitle', () => {
      const wrapper = mount(() => <NResult subtitle="Here is SUBTITLE" />);

      const subtitle = wrapper.find('.n-result__subtitle');

      expect(subtitle.text()).eq('Here is SUBTITLE');
    });

    test('type', async () => {
      const type = ref<'info' | 'success' | 'error' | 'warning'>('info');
      const wrapper = mount(() => <NResult type={type.value} />);

      expect(wrapper.find('svg').classes('n-icon__info_filled_light')).eq(true);

      type.value = 'success';

      await nextTick();

      expect(wrapper.find('svg').classes('n-icon__success_filled_light')).eq(true);

      type.value = 'warning';

      await nextTick();

      expect(wrapper.find('svg').classes('n-icon__warning_filled_light')).eq(true);

      type.value = 'error';

      await nextTick();

      expect(wrapper.find('svg').classes('n-icon__error_filled_light')).eq(true);
    });

    test('primaryButton/secondaryButton Props transmit', async () => {
      const primaryButtonVisible = ref(true);
      const secondaryButtonVisible = ref(true);
      const wrapper = mount(() => (
        <NResult
          primaryButton={primaryButtonVisible.value}
          primaryButtonText="okay"
          primaryButtonProps={{ size: 'small' }}
          secondaryButton={secondaryButtonVisible.value}
          secondaryButtonText="no"
          secondaryButtonProps={{ type: 'normal' }}
        />
      ));

      expect(wrapper.findAllComponents(NButton).length).eq(2);
      expect(wrapper.findAllComponents(NButton)[0].text()).eq('no');
      expect(wrapper.findAllComponents(NButton)[0].classes('n-button--plain')).eq(true);
      expect(wrapper.findAllComponents(NButton)[1].text()).eq('okay');
      expect(wrapper.findAllComponents(NButton)[1].classes('n-button--small')).eq(true);

      primaryButtonVisible.value = false;

      await nextTick();

      expect(wrapper.findAllComponents(NButton).length).eq(1);

      secondaryButtonVisible.value = false;

      await nextTick();

      expect(wrapper.findAllComponents(NButton).length).eq(0);
    });

    test('size', () => {
      const wrapper = mount(() => <NResult size="small" />);

      const buttons = wrapper.findAllComponents(NButton);

      expect(buttons[0].classes('n-button--small')).eq(true);
      expect(buttons[1].classes('n-button--small')).eq(true);
    });

    test('403 404 500', async () => {
      const status = ref<403 | 404 | 500>(403);
      const wrapper = mount(() => <NResult type={status.value} />);

      expect(wrapper.html()).contains('not-allowed.svg');

      status.value = 404;

      await nextTick();

      expect(wrapper.html()).contains('not-found.svg');

      status.value = 500;

      await nextTick();

      expect(wrapper.html()).contains('server-error.svg');
    });
  });

  describe('event', () => {
    test('primaryClick and secondaryClick', async () => {
      const onPrimaryClick = vi.fn();
      const onSecondaryClick = vi.fn();

      const wrapper = mount(() => (
        <NResult onPrimaryClick={onPrimaryClick} onSecondaryClick={onSecondaryClick} />
      ));

      const buttons = wrapper.findAllComponents(NButton);

      await buttons[0].trigger('click');

      expect(onSecondaryClick).toHaveBeenCalled();

      await buttons[1].trigger('click');

      expect(onPrimaryClick).toHaveBeenCalled();
    });
  });

  describe('slots', () => {
    test('all', () => {
      const wrapper = mount(() => (
        <NResult>
          {{
            icon: () => <div class="slot-icon" />,
            title: () => <div class="slot-title" />,
            subtitle: () => <div class="slot-subtitle" />,
            extra: () => <div class="slot-extra" />,
          }}
        </NResult>
      ));

      const iconSlot = wrapper.find('.slot-icon');
      const iconTitle = wrapper.find('.slot-title');
      const iconSubtitle = wrapper.find('.slot-subtitle');
      const iconExtra = wrapper.find('.slot-extra');

      expect(iconSlot.exists()).eq(true);
      expect(iconTitle.exists()).eq(true);
      expect(iconSubtitle.exists()).eq(true);
      expect(iconExtra.exists()).eq(true);
    });
  });
});
