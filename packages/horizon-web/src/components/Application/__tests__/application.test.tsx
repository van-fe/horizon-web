import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { shallowRef, nextTick } from 'vue';
import NApplication from '../src/Application';
import { usePopupContainerGetter, resetPopupContainerGetter } from '@aurora/utils';

describe('Application.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NApplication size="small" />);
    const element = wrapper.findComponent(NApplication);

    expect(element.exists()).toBe(true);
  });

  test('getPopupContainer', async () => {
    const containerGetter = shallowRef(() => document.body);

    mount(() => <NApplication getPopupContainer={containerGetter.value} />);

    expect(usePopupContainerGetter().value).toBe(containerGetter.value);
    containerGetter.value = () => document.querySelector('.test')!;
    await nextTick();
    expect(usePopupContainerGetter().value).toBe(containerGetter.value);
    resetPopupContainerGetter();
    expect(usePopupContainerGetter().value).toBe(undefined);
  });
});
