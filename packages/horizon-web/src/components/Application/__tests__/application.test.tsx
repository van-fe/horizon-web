import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { shallowRef, nextTick } from 'vue';
import HApplication from '../src/Application';
import { usePopupContainerGetter, resetPopupContainerGetter } from '@aurora/utils';
import { HForm, HInput } from '../../index';
import { GlobalSizeInjectedKey } from '../src/utils/injectedKeys';

describe('Application.tsx', () => {
  test('uses a stable global size injection key across module instances', () => {
    expect(Symbol.keyFor(GlobalSizeInjectedKey)).toBe('[horizon-web-global] size');
  });

  test('basic', async () => {
    const wrapper = mount(() => <HApplication size="small" />);
    const element = wrapper.findComponent(HApplication);

    expect(element.exists()).toBe(true);
  });

  test('nested application overrides the global size reactively', async () => {
    const size = shallowRef<'small' | 'medium' | 'large'>('medium');
    const wrapper = mount(() => (
      <HApplication>
        <HApplication size={size.value}>
          <HForm>
            <HInput />
          </HForm>
        </HApplication>
      </HApplication>
    ));

    size.value = 'small';
    await nextTick();

    expect(wrapper.findComponent(HForm).classes('h-form--small')).toBe(true);
    expect(wrapper.findComponent(HInput).classes('h-input--small')).toBe(true);
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
