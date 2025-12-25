import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { shallowRef, nextTick } from 'vue';
import HApplication from '../src/Application';
import { usePopupContainerGetter, resetPopupContainerGetter } from '@aurora/utils';

describe('Application.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HApplication size="small" />);
    const element = wrapper.findComponent(HApplication);

    expect(element.exists()).toBe(true);
  });

  test('getPopupContainer', async () => {
    const containerGetter = shallowRef(() => document.body);

    mount(() => <HApplication getPopupContainer={containerGetter.value} />);

    expect(usePopupContainerGetter().value).toBe(containerGetter.value);
    containerGetter.value = () => document.querySelector('.test')!;
    await nextTick();
    expect(usePopupContainerGetter().value).toBe(containerGetter.value);
    resetPopupContainerGetter();
    expect(usePopupContainerGetter().value).toBe(undefined);
  });
});
