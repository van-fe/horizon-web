import { mount } from '@vue/test-utils';
import ${namespaceName} from '../src/${capitalName}';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('${capitalName}.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => (
      <${namespaceName} modelValue={modelValue.value} />
    ));
    const element = wrapper.findComponent(${namespaceName});

    expect(element.exists()).toBe(true);
  });
});
