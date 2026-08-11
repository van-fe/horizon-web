import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { reactive } from 'vue';
import { dictionaries } from '../../../locales';
import HQRCode from '../src/QRCode';
import { useQRCode } from '../src/hooks/useQRCode';
import QRCode from 'qrcode';
import type { QRCodeProps } from '../src/composables/useProps';

describe('QRCode', () => {
  test('regenerates svg in the hook', async () => {
    const state = useQRCode(
      reactive({ value: 'hello', size: 120, margin: 1, level: 'M', color: '#000', background: '#fff' }) as any,
      vi.fn(),
    );
    await state.render();
    expect(state.svg.value).toContain('<svg');
  });

  test('ignores stale success and failure results from overlapping renders', async () => {
    const pending: Array<{
      resolve: (value: string) => void;
      reject: (reason: Error) => void;
    }> = [];
    const toString = vi.spyOn(QRCode, 'toString').mockImplementation(
      () =>
        new Promise<string>((resolve, reject) => {
          pending.push({ resolve, reject });
        }),
    );
    const emit = vi.fn();
    const props = reactive({
      value: 'race',
      size: 120,
      margin: 1,
      level: 'M',
      color: '#000',
      background: '#fff',
    }) as QRCodeProps;
    const state = useQRCode(props, emit);
    const newer = state.render();
    pending[0].reject(new Error('stale failure'));
    pending[1].resolve('<svg id="newer" />');
    await newer;
    await Promise.resolve();
    expect(state.svg.value).toBe('<svg id="newer" />');
    expect(state.error.value).toBeUndefined();
    expect(emit).not.toHaveBeenCalled();

    const staleSuccess = state.render();
    const latestSuccess = state.render();
    pending[2].resolve('<svg id="stale" />');
    pending[3].resolve('<svg id="latest" />');
    await staleSuccess;
    await latestSuccess;
    expect(state.svg.value).toBe('<svg id="latest" />');
    expect(state.loading.value).toBe(false);
    toString.mockRestore();
  });

  test('renders a scannable svg and expired state', async () => {
    const wrapper = mount(HQRCode, { props: { value: 'https://example.com', expired: true } });
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.text()).toContain('QR code expired');
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('refresh')).toHaveLength(1);
    expect(wrapper.emitted('refresh')?.[0]?.[0]).toBeInstanceOf(MouseEvent);
  });

  test('applies rendering props and overlays an icon at the requested size', async () => {
    const wrapper = mount(HQRCode, {
      props: {
        value: 'contract',
        size: 128,
        level: 'H',
        color: '#123456',
        background: '#fedcba',
        margin: 3,
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        iconSize: 24,
      },
    });

    await vi.waitFor(() => expect(wrapper.find('svg').exists()).toBe(true));
    expect((wrapper.element as HTMLElement).style.width).toBe('128px');
    expect((wrapper.element as HTMLElement).style.height).toBe('128px');
    const icon = wrapper.get('img').element as HTMLImageElement;
    expect(icon.style.width).toBe('24px');
    expect(icon.style.height).toBe('24px');
    expect(wrapper.get('.h-qrcode__canvas').html()).toContain('#123456');
    expect(wrapper.get('.h-qrcode__canvas').html()).toContain('#fedcba');
  });

  test('uses expiredText or the expired slot and hides the center icon', async () => {
    const text = mount(HQRCode, {
      props: { value: 'expired', expired: true, expiredText: 'Renew code', icon: 'logo.png' },
    });
    const slotted = mount(HQRCode, {
      props: { value: 'expired', expired: true },
      slots: { expired: '<div data-expired-slot>Custom expired action</div>' },
    });

    expect(text.text()).toContain('Renew code');
    expect(text.find('img').exists()).toBe(false);
    expect(slotted.get('[data-expired-slot]').text()).toBe('Custom expired action');
    expect(slotted.find('button').exists()).toBe(false);
  });

  test('emits generation errors from the real render pipeline', async () => {
    const wrapper = mount(HQRCode, { props: { value: 'x'.repeat(10_000) } });

    await vi.waitFor(() => expect(wrapper.emitted('error')).toHaveLength(1));
    expect(wrapper.emitted('error')?.[0]?.[0]).toBeInstanceOf(Error);
  });

  test('provides new component labels in every supported locale', () => {
    Object.values(dictionaries).forEach(dictionary => {
      expect(dictionary.horizonWeb.qrCode.expired).toBeTruthy();
      expect(dictionary.horizonWeb.commandPalette.placeholder).toBeTruthy();
      expect(dictionary.horizonWeb.imageCropper.crop).toBeTruthy();
    });
  });
});
