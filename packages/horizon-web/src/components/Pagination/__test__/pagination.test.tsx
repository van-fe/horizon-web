import { mount } from '@vue/test-utils';
import HPagination from '../src/Pagination';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import Sizes from '../src/components/Sizes';
import Pager from '../src/components/Pager';
import Jumper from '../src/components/Jumper';
import Total from '../src/components/Total';
import type { PaginationProps } from '../src/composables/useProps';
import SimplestPager from '../src/components/SimplestPager';
import Pagination from '../index';
import HInputNumber from '../../InputNumber';
import { sleep } from '~/utils/tools';
import { localeInjectKey } from '~/provides';
import { usePaginationEmits } from '../src/composables/useEmits';

describe('Pagination.tsx', () => {
  test('validates every public emit payload defensively', () => {
    const singleValueValidators = [
      usePaginationEmits['update:pageSize'],
      usePaginationEmits['update:currentPage'],
      usePaginationEmits.sizeChange,
      usePaginationEmits.clickPrevPage,
      usePaginationEmits.clickCurrentPage,
      usePaginationEmits.clickNextPage,
      usePaginationEmits.jump,
      usePaginationEmits.currentChange,
    ];
    for (const validator of singleValueValidators) {
      expect(validator(1)).toBe(true);
      expect(validator('1' as never)).toBe(false);
    }
    expect(usePaginationEmits.modify(1, 10)).toBe(true);
    expect(usePaginationEmits.modify('1' as never, 10)).toBe(false);
    expect(usePaginationEmits.modify(1, '10' as never)).toBe(false);
  });

  test('basic', async () => {
    const wrapper = mount(() => <HPagination total={10} />);
    const element = wrapper.findComponent(HPagination);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('currentPage', async () => {
      const currentPage = ref(1);
      const onChange = vi.fn();

      const wrapper = mount(() => (
        <HPagination
          total={100}
          v-model:currentPage={currentPage.value}
          onCurrentChange={onChange}
        />
      ));

      const pageItem = wrapper.findAll('.h-pagination__pager--item:not(.is-active)');

      await pageItem[1].trigger('click');

      expect(currentPage.value).eq(2);
      expect(onChange).toHaveBeenCalledWith(2);
    });

    test('total', async () => {
      const total = ref(100);

      const wrapper = mount(() => <HPagination total={total.value} />);

      expect(wrapper.findAll('.h-pagination__pager--item').length).eq(9);

      total.value = 200;

      await nextTick();

      expect(wrapper.findAll('.h-pagination__pager--item').length).eq(9);

      total.value = 10;

      await nextTick();

      expect(wrapper.findAll('.h-pagination__pager--item').length).eq(3);
    });

    test('pageSizes & pageSize', async () => {
      const pageSize = ref(10);
      const pageSizes = ref([10, 20, 30]);
      const onChangeSize = vi.fn();

      const wrapper = mount(
        () => (
          <HPagination
            total={100}
            v-model:pageSize={pageSize.value}
            pageSizes={pageSizes.value}
            pageSizesToBody={false}
            onSizeChange={onChangeSize}
          />
        ),
        {
          attachTo: document.body,
        },
      );

      const sizes = wrapper.findComponent(Sizes);

      await sizes.trigger('click');

      const sizesItems = wrapper.findAll('.h-pagination__sizes-item');

      expect(sizesItems.length).eq(3);

      await sizesItems[1].trigger('click');

      expect(pageSize.value).eq(20);
      expect(onChangeSize).toHaveBeenCalledOnce();

      pageSizes.value.push(40);

      await sleep();

      await sizes.trigger('click');
      await sizes.trigger('click');

      const sizesItems2 = wrapper.findAll('.h-pagination__sizes-item');

      expect(sizesItems2.length).eq(4);

      await sizesItems2[3].trigger('click');

      expect(pageSize.value).eq(40);
      expect(onChangeSize).toHaveBeenCalledTimes(2);
    });

    test('pagerCount', async () => {
      const pagerCount = ref(7);

      const wrapper = mount(() => <HPagination total={100} pagerCount={pagerCount.value} />);

      expect(wrapper.findAll('.h-pagination__pager--item').length).eq(9);

      pagerCount.value = 9;

      await nextTick();

      expect(wrapper.findAll('.h-pagination__pager--item').length).eq(11);
    });

    test('pager advances through collapsed ranges and supports native Enter activation', async () => {
      const currentPage = ref(5);
      const wrapper = mount(() => (
        <HPagination
          total={200}
          pagerCount={5}
          layout="pager"
          v-model:currentPage={currentPage.value}
        />
      ));

      await wrapper.get('[data-num="prev"]').trigger('click');
      expect(currentPage.value).toBe(2);
      await wrapper.get('[data-num="next"]').trigger('keyup', { key: 'Enter' });
      expect(currentPage.value).toBe(5);

      await wrapper.get('.is-prev').trigger('keyup', { key: 'Enter' });
      expect(currentPage.value).toBe(4);
      await wrapper.get('.is-next').trigger('keyup', { key: 'Enter' });
      expect(currentPage.value).toBe(5);

      currentPage.value = 1;
      await nextTick();
      await wrapper.get('.is-prev').trigger('click');
      expect(currentPage.value).toBe(1);
      currentPage.value = 20;
      await nextTick();
      await wrapper.get('.is-next').trigger('click');
      expect(currentPage.value).toBe(20);
    });

    test('layout', async () => {
      const layout = ref('pager, sizes');

      const wrapper = mount(() => <HPagination total={100} layout={layout.value} />);

      expect(wrapper.findComponent(Pager).exists()).toBeTruthy();
      expect(wrapper.findComponent(Sizes).exists()).toBeTruthy();

      layout.value = 'jumper, total';

      await nextTick();

      expect(wrapper.findComponent(Jumper).exists()).toBeTruthy();
      expect(wrapper.findComponent(Total).exists()).toBeTruthy();
    });

    test('type', async () => {
      const type = ref<PaginationProps['type']>('simple');

      const wrapper = mount(() => <HPagination total={100} type={type.value} />);

      expect(wrapper.findComponent(Pager).exists()).toBeTruthy();
      expect(wrapper.findComponent(Total).exists()).toBeTruthy();
      expect(wrapper.findComponent(Sizes).exists()).not.toBeTruthy();
      expect(wrapper.findComponent(Jumper).exists()).not.toBeTruthy();

      type.value = 'simplest';

      await nextTick();

      expect(wrapper.findComponent(SimplestPager).exists()).toBeTruthy();
      expect(wrapper.findComponent(Total).exists()).not.toBeTruthy();
      expect(wrapper.findComponent(Pager).exists()).not.toBeTruthy();
      expect(wrapper.findComponent(Sizes).exists()).not.toBeTruthy();
      expect(wrapper.findComponent(Jumper).exists()).not.toBeTruthy();
    });

    test('simplest input page', async () => {
      const currentPage = ref(1);
      const wrapper = mount(() => (
        <HPagination v-model:currentPage={currentPage.value} total={100} type="simplest" />
      ));

      const inputEl = wrapper.find('input');

      await inputEl.setValue('12');

      expect(currentPage.value).eq(10);
    });

    test('hideOnSinglePage', async () => {
      const hideOnSinglePage = ref(false);

      const wrapper = mount(() => (
        <HPagination total={10} hideOnSinglePage={hideOnSinglePage.value} />
      ));

      expect(wrapper.findComponent(Pagination).exists()).toBeTruthy();

      hideOnSinglePage.value = true;

      await nextTick();

      expect(wrapper.findComponent(Pagination).attributes('style')).toContain('display: none');
    });

    test('align', async () => {
      const align = ref<PaginationProps['align']>('right');

      const wrapper = mount(() => <HPagination total={10} align={align.value} />);

      expect(
        wrapper.findComponent(Pagination).classes(`h-pagination--${align.value}`),
      ).toBeTruthy();

      align.value = 'left';

      await nextTick();

      expect(
        wrapper.findComponent(Pagination).classes(`h-pagination--${align.value}`),
      ).toBeTruthy();

      align.value = 'center';

      await nextTick();

      expect(
        wrapper.findComponent(Pagination).classes(`h-pagination--${align.value}`),
      ).toBeTruthy();
    });

    test('disabled', async () => {
      const currentPage = ref(1);

      const disabled = ref(false);

      const wrapper = mount(() => (
        <HPagination v-model:currentPage={currentPage.value} total={50} disabled={disabled.value} />
      ));

      expect(wrapper.findComponent(HPagination).classes('is-disabled')).toBeFalsy();

      disabled.value = true;

      await nextTick();

      expect(wrapper.findComponent(HPagination).classes('is-disabled')).toBeTruthy();

      await wrapper.findComponent(Pager).find('.is-next').trigger('click');
      await wrapper.findComponent(Pager).get('[data-num="2"]').trigger('click');

      expect(currentPage.value).toBe(1);

      expect(
        wrapper.findComponent(Jumper).findComponent(HInputNumber).classes('is-disabled'),
      ).toBeTruthy();

      expect(
        wrapper.findComponent(Sizes).find('.h-pagination__sizes').classes('is-disabled'),
      ).toBeTruthy();
    });

    test('disabled in simplest', async () => {
      const currentPage = ref(1);

      const disabled = ref(false);

      const wrapper = mount(() => (
        <HPagination
          v-model:currentPage={currentPage.value}
          total={50}
          disabled={disabled.value}
          type="simplest"
        />
      ));

      expect(wrapper.findComponent(HPagination).classes('is-disabled')).toBeFalsy();

      disabled.value = true;

      await nextTick();

      expect(wrapper.findComponent(HPagination).classes('is-disabled')).toBeTruthy();

      expect(
        wrapper.findComponent(SimplestPager).findComponent(HInputNumber).classes('is-disabled'),
      ).toBeTruthy();
    });

    test('simplest pager arrows navigate and stop at both boundaries', async () => {
      const currentPage = ref(3);
      const wrapper = mount(() => (
        <HPagination
          v-model:currentPage={currentPage.value}
          total={50}
          layout="pager"
          type="simplest"
        />
      ));
      const simplest = wrapper.findComponent(SimplestPager);
      const prev = simplest.get('[aria-label="Previous page"]');
      const next = simplest.get('[aria-label="Next page"]');

      await prev.trigger('click');
      expect(currentPage.value).toBe(2);
      await next.trigger('keyup', { key: 'Enter' });
      expect(currentPage.value).toBe(3);
      await simplest.get('input').trigger('keyup', { key: 'Enter' });
      currentPage.value = 1;
      await nextTick();
      await prev.trigger('click');
      expect(currentPage.value).toBe(1);
      currentPage.value = 5;
      await nextTick();
      await next.trigger('click');
      expect(currentPage.value).toBe(5);
    });

    test('snake-case labels and keyboard size selection keep accessible popup state', async () => {
      const pageSize = ref(10);
      const wrapper = mount(() => (
        <HPagination
          total={100}
          layout="sizes, jumper"
          v-model:pageSize={pageSize.value}
          pageSizes={[10, 20]}
          pageSizesToBody={false}
          label={{
            size_text: ' rows',
            size_item_text: ' each',
            jump_prefix_text: 'Jump ',
            jump_suffix_text: ' now',
          }}
        />
      ));
      const sizes = wrapper.get('.h-pagination__sizes');
      expect(sizes.text()).toContain('rows');
      expect(wrapper.get('.h-pagination__jumper').text()).toContain('Jump');
      expect(wrapper.get('.h-pagination__jumper').text()).toContain('now');

      await sizes.trigger('keyup', { key: 'Enter' });
      expect(sizes.attributes('aria-expanded')).toBe('true');
      const sizeItems = wrapper.findAll('.h-pagination__sizes-item');
      expect(sizeItems[1].text()).toContain('each');
      await sizeItems[1].trigger('keydown', { key: 'Escape' });
      expect(pageSize.value).toBe(10);
      await sizeItems[1].trigger('keydown', { key: ' ' });
      expect(pageSize.value).toBe(20);

      const jumpInput = wrapper.get('.h-pagination__jumper input');
      await jumpInput.trigger('blur');
      await jumpInput.setValue('1');
      await jumpInput.trigger('blur');
      expect(wrapper.emitted('jump')).toBeUndefined();
    });

    test('label and showRange customize visible copy and model update payloads', async () => {
      const onUpdatePageSize = vi.fn();
      const onUpdateCurrentPage = vi.fn();
      const wrapper = mount(HPagination, {
        props: {
          total: 35,
          currentPage: 2,
          pageSize: 10,
          pageSizes: [10, 20],
          pageSizesToBody: false,
          layout: 'total, pager, sizes, jumper',
          showRange: true,
          label: {
            sizeText: ' rows',
            sizeItemText: ' each',
            jumpPrefixText: 'Go ',
            jumpSuffixText: ' page',
          },
          'onUpdate:pageSize': onUpdatePageSize,
          'onUpdate:currentPage': onUpdateCurrentPage,
        },
        global: {
          provide: {
            [localeInjectKey as symbol]: ref({
              langService: {
                td: () => ({
                  horizonWeb: {
                    pagination: {
                      rangeTotal: '{range} of {total}',
                      total: 'Total {total}',
                    },
                  },
                }),
              },
            }),
          },
        },
      });

      expect(wrapper.get('.h-pagination__total').text()).toContain('11-20');
      expect(wrapper.get('.h-pagination__sizes').text()).toContain('10 rows');
      expect(wrapper.get('.h-pagination__jumper').text()).toContain('Go');
      expect(wrapper.get('.h-pagination__jumper').text()).toContain('page');

      await wrapper.get('.h-pagination__pager--item[data-num="3"]').trigger('click');
      expect(onUpdateCurrentPage).toHaveBeenCalledWith(3);

      await wrapper.get('.h-pagination__sizes').trigger('click');
      expect(wrapper.findAll('.h-pagination__sizes-item')[1].text()).toBe('20 each');
      await wrapper.findAll('.h-pagination__sizes-item')[1].trigger('click');
      expect(onUpdatePageSize).toHaveBeenCalledWith(20);

      await wrapper.setProps({ showRange: false });
      expect(wrapper.get('.h-pagination__total').text()).not.toContain('11-20');
      expect(wrapper.get('.h-pagination__total').text()).toContain('35');
    });
  });

  describe('emits', () => {
    test('click*Page', async () => {
      const currentPage = ref(5);
      const onClickPrevPage = vi.fn();
      const onClickCurrentPage = vi.fn();
      const onClickNextPage = vi.fn();

      const wrapper = mount(() => (
        <HPagination
          total={100}
          v-model:currentPage={currentPage.value}
          layout="pager"
          onClickPrevPage={onClickPrevPage}
          onClickCurrentPage={onClickCurrentPage}
          onClickNextPage={onClickNextPage}
        />
      ));

      const prevBtn = wrapper.find('.is-prev');
      const nextBtn = wrapper.find('.is-next');

      await prevBtn.trigger('click');

      expect(currentPage.value).eq(4);
      expect(onClickPrevPage).toHaveBeenCalledOnce();

      await nextBtn.trigger('click');

      expect(currentPage.value).eq(5);
      expect(onClickNextPage).toHaveBeenCalledOnce();

      await wrapper.find('.h-pagination__pager--item[data-num="5"]').trigger('click');

      expect(currentPage.value).eq(5);
      expect(onClickCurrentPage).toHaveBeenCalledOnce();
    });

    test('jump', async () => {
      const currentPage = ref(1);
      const onJump = vi.fn();

      const wrapper = mount(() => (
        <HPagination
          total={100}
          v-model:currentPage={currentPage.value}
          layout="jumper"
          onJump={onJump}
        />
      ));

      const inputNumber = wrapper.findComponent(HInputNumber);

      await inputNumber.find('input').setValue('5');

      await inputNumber.find('input').trigger('blur');

      expect(currentPage.value).eq(5);
      expect(onJump).toHaveBeenCalledOnce();
      expect(inputNumber.find('input').element.value).toEqual('');
    });

    test('modify', async () => {
      const currentPage = ref(1);
      const size = ref(10);
      const onModify = vi.fn();

      const wrapper = mount(() => (
        <HPagination
          total={100}
          v-model:currentPage={currentPage.value}
          v-model:pageSize={size.value}
          onModify={onModify}
        />
      ));

      await wrapper.findComponent(Pager).find('.is-next').trigger('click');

      expect(onModify).toHaveBeenCalledOnce();
      expect(onModify).toHaveBeenCalledWith(2, 10);

      const sizes = wrapper.findComponent(Sizes);

      await sizes.trigger('click');

      await sizes
        .findAll('.h-pagination__sizes-item')
        .find(curr => curr.text() === '50')
        ?.trigger('click');

      expect(onModify).toHaveBeenCalledTimes(2);
      expect(onModify).toHaveBeenCalledWith(2, 50);
    });
  });

  describe('slots', () => {
    test('prefix & suffix', () => {
      const wrapper = mount(
        () => (
          <HPagination total={100} layout={['pager', 'sizes']} pageSizes={[1, 3, 5, 10]}>
            {{
              prefix: () => <div class="is-prefix">PREFIX</div>,
              suffix: () => <div class="is-suffix">SUFFIX</div>,
            }}
          </HPagination>
        ),
        {
          attachTo: document.body,
        },
      );

      expect(wrapper.find('.is-prefix').text()).eq('PREFIX');
      expect(wrapper.find('.is-suffix').text()).eq('SUFFIX');
    });

    test('prev & next', () => {
      const currentPage = ref(3);
      const pageSize = ref(3);

      const wrapper = mount(
        () => (
          <HPagination
            v-model:current-page={currentPage.value}
            v-model:page-size={pageSize.value}
            total={200}
            layout={['pager', 'sizes']}
            pageSizes={[1, 3, 5, 10]}
          >
            {{
              prev: () => <div>PREV</div>,
              next: () => <div>HEXT</div>,
            }}
          </HPagination>
        ),
        {
          attachTo: document.body,
        },
      );

      expect(wrapper.find('.is-prev').text()).eq('PREV');
      expect(wrapper.find('.is-next').text()).eq('HEXT');
    });
  });

  describe('special', () => {
    test('picked page num change when page size changed', async () => {
      const currentPage = ref(10);
      const pageSize = ref(10);
      const wrapper = mount(() => (
        <HPagination
          total={100}
          v-model:currentPage={currentPage.value}
          v-model:pageSize={pageSize.value}
        />
      ));

      expect(wrapper.find('.is-active').attributes('data-num')).eq('10');

      pageSize.value = 20;

      await nextTick();

      expect(currentPage.value).eq(5);
      expect(wrapper.find('.is-active').attributes('data-num')).eq('5');
    });

    test('modify currentPage and check active page is correct or not', async () => {
      const currentPage = ref(10);
      const pageSize = ref(10);
      const wrapper = mount(() => (
        <HPagination
          total={100}
          v-model:currentPage={currentPage.value}
          v-model:pageSize={pageSize.value}
        />
      ));

      expect(wrapper.find('.is-active').attributes('data-num')).eq('10');

      currentPage.value = 2;

      await nextTick();

      expect(wrapper.find('.is-active').attributes('data-num')).eq('2');
    });

    test('jumper set decimals', async () => {
      const currentPage = ref(1);

      const wrapper = mount(() => (
        <HPagination total={100} v-model:currentPage={currentPage.value} />
      ));

      const input = wrapper.find('input');

      await input.setValue('2.2');
      await input.trigger('keyup.enter');

      expect(currentPage.value).toEqual(2);
    });

    test('simplest set decimals', async () => {
      const currentPage = ref(1);
      const wrapper = mount(() => (
        <HPagination v-model:currentPage={currentPage.value} total={100} type="simplest" />
      ));

      const input = wrapper.find('input');

      await input.setValue('2.2');
      await input.trigger('keyup.enter');

      expect(currentPage.value).toEqual(2);
    });
  });
});
