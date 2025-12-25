import { mount } from '@vue/test-utils';
import HVInfiniteScroll from '../index';
import { describe, test, vi } from 'vitest';
import { ref } from 'vue';

describe('v-infinite-scroll.tsx', () => {
  test('basic', async () => {
    const param = {
      onReachBottom: vi.fn(),
      onReachTop: vi.fn(),
    };

    const list = ref<Date[]>([new Date(), new Date(), new Date()]);

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

    element.element.scroll({
      top: 1000,
    });

    // element.element.scrollHeight = 150;
    // element.element.clientHeight = 90;

    await element.trigger('scroll');

    // happy-dom cannot simulate scroll event
    // expect(param.onReachBottom).toHaveBeenCalledOnce();
  });
});
