import { mount, shallowMount } from '@vue/test-utils';
import { HList, HListItem } from '..';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

const templateData = Array(20)
  .fill(0)
  .map((_, index) => ({
    title: `Title-${index}`,
    subtitle: `Subtitle-${index}`,
    describe: `Describe-${index}`,
  }));

describe('List.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HList />);
    const element = wrapper.findComponent(HList);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('zebra', async () => {
      const zebra = ref(false);
      const wrapper = mount(() => (
        <HList data={templateData} zebra={zebra.value}>
          {{
            item: ({ item }: { item: (typeof templateData)[number] }) => (
              <HListItem title={item.title} subtitle={item.subtitle} describe={item.describe} />
            ),
          }}
        </HList>
      ));

      const listElm = wrapper.find('.n-list');

      expect(listElm.classes('is-zebra')).toBeFalsy();

      zebra.value = true;

      await nextTick();

      expect(listElm.classes('is-zebra')).toBeTruthy();
    });

    test('border', async () => {
      const border = ref(false);
      const wrapper = mount(() => (
        <HList data={templateData} isBorder={border.value}>
          {{
            item: ({ item }: { item: (typeof templateData)[number] }) => (
              <HListItem title={item.title} subtitle={item.subtitle} describe={item.describe} />
            ),
          }}
        </HList>
      ));

      const listElm = wrapper.find('.n-list');

      expect(listElm.classes('is-border')).toBeFalsy();

      border.value = true;

      await nextTick();

      expect(listElm.classes('is-border')).toBeTruthy();
    });

    test('split', async () => {
      const split = ref(false);
      const wrapper = mount(() => (
        <HList data={templateData} split={split.value}>
          {{
            item: ({ item }: { item: (typeof templateData)[number] }) => (
              <HListItem title={item.title} subtitle={item.subtitle} describe={item.describe} />
            ),
          }}
        </HList>
      ));

      const listElm = wrapper.find('.n-list');

      expect(listElm.classes('is-split')).toBeFalsy();

      split.value = true;

      await nextTick();

      expect(listElm.classes('is-split')).toBeTruthy();
    });
  });

  describe('slots', () => {
    test('default', () => {
      const wrapper = mount(() => (
        <HList data={templateData}>
          {{
            default: () => <div>DEFAULT</div>,
          }}
        </HList>
      ));

      expect(wrapper.text()).contain('DEFAULT');
    });

    test('header', () => {
      const wrapper = mount(() => (
        <HList data={templateData}>
          {{
            header: () => <div>HEADER</div>,
          }}
        </HList>
      ));

      expect(wrapper.find('.n-list__header').text()).contain('HEADER');
    });

    test('footer', () => {
      const wrapper = mount(() => (
        <HList data={templateData}>
          {{
            footer: () => <div>FOOTER</div>,
          }}
        </HList>
      ));

      expect(wrapper.find('.n-list__footer').text()).contain('FOOTER');
    });
  });
});
