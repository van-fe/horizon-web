import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp, shallowRef, nextTick, defineComponent, inject, ref } from 'vue';
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
import type { HApplicationContext } from '../src/applicationContext';
import { HApplicationContextInjectedKey } from '../src/applicationContext';
import HorizonWebProvides from '~/provides';

describe('Application.tsx', () => {
  test('uses a stable global size injection key across module instances', () => {
    expect(Symbol.keyFor(GlobalSizeInjectedKey)).toBe('[horizon-web-global] size');
    expect(Symbol.keyFor(HApplicationContextInjectedKey)).toBe(
      '[horizon-web-application] context',
    );
  });

  test('creates a distinct default application context for every Vue App', () => {
    let firstContext: HApplicationContext | undefined;
    let secondContext: HApplicationContext | undefined;
    const createProbe = (capture: (context: HApplicationContext) => void) =>
      defineComponent({
        setup() {
          capture(inject(HApplicationContextInjectedKey)!);
          return () => null;
        },
      });
    const firstRoot = document.createElement('div');
    const secondRoot = document.createElement('div');
    const firstApp = createApp(createProbe(context => (firstContext = context)));
    const secondApp = createApp(createProbe(context => (secondContext = context)));

    firstApp.use(HorizonWebProvides, { locale: { current: LocaleSupportLang.ZhCN } });
    secondApp.use(HorizonWebProvides);
    firstApp.mount(firstRoot);
    secondApp.mount(secondRoot);

    expect(firstContext).toBeDefined();
    expect(secondContext).toBeDefined();
    expect(firstContext).not.toBe(secondContext);
    expect(firstContext!.locale.value).toBe(LocaleSupportLang.ZhCN);
    expect(secondContext!.locale.value).toBe(LocaleSupportLang.En);
    expect(firstContext!.size.value).toBe('medium');
    expect(secondContext!.size.value).toBe('medium');

    firstApp.unmount();
    secondApp.unmount();
  });

  test('keeps HApplication contexts reactive and isolated across Vue Apps', async () => {
    const firstSize = shallowRef<'small' | 'medium' | 'large'>('small');
    const secondSize = shallowRef<'small' | 'medium' | 'large'>('large');
    let firstContext: HApplicationContext | undefined;
    let secondContext: HApplicationContext | undefined;
    const createProbe = (capture: (context: HApplicationContext) => void) =>
      defineComponent({
        setup() {
          capture(inject(HApplicationContextInjectedKey)!);
          return () => null;
        },
      });
    const FirstProbe = createProbe(context => (firstContext = context));
    const SecondProbe = createProbe(context => (secondContext = context));
    const firstWrapper = mount(() => (
      <HApplication size={firstSize.value} showTimeZone>
        <FirstProbe />
      </HApplication>
    ));
    const secondWrapper = mount(() => (
      <HApplication size={secondSize.value} showTimeZone={false}>
        <SecondProbe />
      </HApplication>
    ));

    expect(firstContext).not.toBe(secondContext);
    expect(firstContext!.size.value).toBe('small');
    expect(firstContext!.showTimeZone.value).toBe(true);
    expect(secondContext!.size.value).toBe('large');
    expect(secondContext!.showTimeZone.value).toBe(false);

    firstSize.value = 'medium';
    await nextTick();

    expect(firstContext!.size.value).toBe('medium');
    expect(secondContext!.size.value).toBe('large');

    firstWrapper.unmount();
    secondWrapper.unmount();
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
