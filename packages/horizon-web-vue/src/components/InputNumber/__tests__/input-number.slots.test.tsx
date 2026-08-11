import { mount } from '@vue/test-utils';
import HInputNumber from '../src/InputNumber';
import { describe, expect, test } from 'vitest';

describe('InputNumber.tsx', () => {
  test('prefix & suffix', () => {
    const wrapper = mount(() => (
      <HInputNumber>
        {{ prefix: () => <span>PREFIX</span>, suffix: () => <span>SUFFIX</span> }}
      </HInputNumber>
    ));

    expect(wrapper.find('.h-input-number__prefix').text()).eq('PREFIX');
    expect(wrapper.find('.h-input-number__suffix').text()).eq('SUFFIX');
  });

  test('prepend & append', () => {
    const wrapper = mount(() => (
      <HInputNumber>
        {{ prepend: () => <span>PREPEHD</span>, append: () => <span>APPEHD</span> }}
      </HInputNumber>
    ));

    expect(wrapper.find('.h-input-number__group--prepend').text()).eq('PREPEHD');
    expect(wrapper.find('.h-input-number__group--append').text()).eq('APPEHD');
  });
});
