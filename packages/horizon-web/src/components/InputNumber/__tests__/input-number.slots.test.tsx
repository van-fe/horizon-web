import { mount } from '@vue/test-utils';
import NInputNumber from '../src/InputNumber';
import { describe, expect, test } from 'vitest';

describe('InputNumber.tsx', () => {
  test('prefix & suffix', () => {
    const wrapper = mount(() => (
      <NInputNumber>
        {{ prefix: () => <span>PREFIX</span>, suffix: () => <span>SUFFIX</span> }}
      </NInputNumber>
    ));

    expect(wrapper.find('.n-input-number__prefix').text()).eq('PREFIX');
    expect(wrapper.find('.n-input-number__suffix').text()).eq('SUFFIX');
  });

  test('prepend & append', () => {
    const wrapper = mount(() => (
      <NInputNumber>
        {{ prepend: () => <span>PREPEND</span>, append: () => <span>APPEND</span> }}
      </NInputNumber>
    ));

    expect(wrapper.find('.n-input-number__group--prepend').text()).eq('PREPEND');
    expect(wrapper.find('.n-input-number__group--append').text()).eq('APPEND');
  });
});
