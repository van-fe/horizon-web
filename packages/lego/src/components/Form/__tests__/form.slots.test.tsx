import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NForm, NFormItem } from '~/components/Form';
import { nextTick, ref } from 'vue';
import type { FormProps } from '../src/composables/useProps';

describe('Form.tsx slots', () => {
  test('label-append', async () => {
    const labelPosition = ref<FormProps['labelPosition']>('top');

    const wrapper = mount(
      () => (
        <NForm labelPosition={labelPosition.value}>
          <NFormItem>
            {{
              default: () => <div>default slot</div>,
              label: () => 'Tag',
              labelAppend: () => 'LABEL APPEND',
            }}
          </NFormItem>
        </NForm>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.find('.n-form-item__label-append').exists()).toBeTruthy();

    labelPosition.value = 'left';

    await nextTick();

    expect(wrapper.find('.n-form-item__label-append').exists()).toBeFalsy();
  });
});
