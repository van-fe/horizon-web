import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { shallowRef, nextTick, defineComponent, inject, ref } from 'vue';
import HApplication from '../src/Application';
import { usePopupContainerGetter, resetPopupContainerGetter } from '@aurora/utils';
import { HForm, HInput } from '../../index';
import {
  GlobalSizeInjectedKey,
  HApplicationShowTimeZoneInjectedKey,
} from '../src/utils/injectedKeys';
import { localeInjectKey } from '~/provides/localable';
import { LocaleSupportLang, VueLocaleService } from '@aurora/locale-vue';
import { dictionaries } from '~/locales';
import { setNamespace, useNamespace } from '@aurora/utils';

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

  test('renders its default slot and provides reactive timezone configuration', async () => {
    const showTimeZone = shallowRef<boolean | ['date-picker' | 'timeline']>(false);
    const Probe = defineComponent({
      setup() {
        const value = inject(HApplicationShowTimeZoneInjectedKey)!;
        return () => <output>{JSON.stringify(value.value)}</output>;
      },
    });
    const wrapper = mount(() => (
      <HApplication showTimeZone={showTimeZone.value}>
        <Probe />
      </HApplication>
    ));

    expect(wrapper.get('output').text()).toBe('false');
    showTimeZone.value = ['date-picker'];
    await nextTick();
    expect(wrapper.get('output').text()).toBe('["date-picker"]');
  });

  test('locale updates the provided locale service reactively', async () => {
    const locale = shallowRef(LocaleSupportLang.En);
    const localeService = new VueLocaleService({
      current: LocaleSupportLang.En,
      lang: { dictionaries },
    });
    mount(() => <HApplication locale={locale.value} />, {
      global: { provide: { [localeInjectKey as symbol]: ref(localeService) } },
    });

    expect(localeService.current).toBe(LocaleSupportLang.En);
    locale.value = LocaleSupportLang.ZhCN;
    await nextTick();
    expect(localeService.current).toBe(LocaleSupportLang.ZhCN);
  });

  test('namespace updates the public namespace registry reactively', async () => {
    const originalNamespace = useNamespace();
    const namespace = shallowRef('HorizonAudit');
    try {
      mount(() => <HApplication namespace={namespace.value} />);
      expect(useNamespace()).toBe('HorizonAudit');

      namespace.value = 'HorizonNext';
      await nextTick();
      expect(useNamespace()).toBe('HorizonNext');
    } finally {
      setNamespace(originalNamespace);
    }
  });
});
