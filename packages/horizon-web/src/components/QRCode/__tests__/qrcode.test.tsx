import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { reactive } from 'vue';
import { dictionaries } from '../../../locales';
import HQRCode from '../src/QRCode';
import { useQRCode } from '../src/hooks/useQRCode';

describe('QRCode', () => {
  test('regenerates svg in the hook', async () => {
    const state = useQRCode(
      reactive({ value: 'hello', size: 120, margin: 1, level: 'M', color: '#000', background: '#fff' }) as any,
      vi.fn(),
    );
    await state.render();
    expect(state.svg.value).toContain('<svg');
  });

  test('renders a scannable svg and expired state', async () => {
    const wrapper = mount(HQRCode, { props: { value: 'https://example.com', expired: true } });
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.text()).toContain('QR code expired');
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('refresh')).toHaveLength(1);
  });

  test('provides new component labels in every supported locale', () => {
    Object.values(dictionaries).forEach(dictionary => {
      expect(dictionary.horizonWeb.qrCode.expired).toBeTruthy();
      expect(dictionary.horizonWeb.commandPalette.placeholder).toBeTruthy();
      expect(dictionary.horizonWeb.imageCropper.crop).toBeTruthy();
    });
  });
});
