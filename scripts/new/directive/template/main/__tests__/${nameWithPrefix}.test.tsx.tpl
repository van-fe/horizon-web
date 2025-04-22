import { mount } from '@vue/test-utils';
import ${namespaceName} from '../src/${capitalName}';
import { describe, expect, test, vi } from 'vitest';

describe('${nameWithPrefix}.tsx', () => {
  test('basic', async () => {
    const onClick = vi.fn();

    const wrapper = mount(
      () => (
        <div class="wrapper" style="width: 300px; height: 300px;">
          <div ${nameWithPrefix}={() => onClick()} style="width: 100px; height: 100px;">
            Modal
          </div>
        </div>
      ),
      {
        attachTo: document.body,
        global: {
          directives: {
            [${namespaceName}.name]: ${namespaceName},
          },
        },
      },
    );

    const element = wrapper.find('.wrapper');

    await element.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();
  });
});
