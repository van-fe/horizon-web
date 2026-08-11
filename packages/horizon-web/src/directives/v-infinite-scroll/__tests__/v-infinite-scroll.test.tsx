import { mount } from '@vue/test-utils';
import HVInfiniteScroll from '../index';
import { describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';

describe('v-infinite-scroll.tsx', () => {
  test('basic', async () => {
    const param = {
      onReachBottom: vi.fn(),
      onReachTop: vi.fn(),
    };

    const list = ref<Date[]>([
      new Date(2026, 0, 1),
      new Date(2026, 0, 2),
      new Date(2026, 0, 3),
      new Date(2026, 0, 4),
      new Date(2026, 0, 5),
    ]);

    const wrapper = mount(
      () => (
        <div
          v-infinite-scroll={param}
          class="wrapper"
          style="width: 80px; height: 90px; overflow-y: scroll"
        >
          {list.value.map(item => (
            <div style="height: 30px; line-height: 50px;">{item.toDateString()}</div>
          ))}
        </div>
      ),
      {
        attachTo: document.body,
        global: {
          directives: {
            [HVInfiniteScroll.name]: HVInfiniteScroll,
          },
        },
      },
    );

    const element = wrapper.find('.wrapper');

    element.element.scrollTop = element.element.scrollHeight;
    await element.trigger('scroll');

    expect(element.element.scrollHeight).toBeGreaterThan(element.element.clientHeight);
    await vi.waitFor(() => expect(param.onReachBottom).toHaveBeenCalledOnce());
  });
});
