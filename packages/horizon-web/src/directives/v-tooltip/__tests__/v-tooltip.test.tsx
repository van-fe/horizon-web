import { mount } from '@vue/test-utils';
import HVTooltip from '../index';
import { describe, expect, test } from 'vitest';

describe('v-loading.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(
      () => <div v-tooltip="'tooltip'" class="target" style="width: 300px; height: 300px;" />,
      {
        attachTo: document.body,
        global: {
          directives: {
            [HVTooltip.name]: HVTooltip,
          },
        },
      },
    );

    const target = wrapper.find('.target');

    await target.trigger('mouseenter');

    expect(document.body.querySelector('.h-tooltip')).not.toBeUndefined();
  });
});
