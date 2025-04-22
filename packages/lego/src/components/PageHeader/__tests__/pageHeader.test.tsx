import { mount } from '@vue/test-utils';
import NPageHeader from '../src/PageHeader';
import { describe, expect, test, vi } from 'vitest';
import { IconArrowLeft, NIcon } from '@nio-fe/icon';
import { nextTick, ref } from 'vue';
import NButton from '../../Button';

describe('PageHeader.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NPageHeader />);
    const element = wrapper.findComponent(NPageHeader);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('icon svg', async () => {
      const wrapper = mount(() => <NPageHeader icon={IconArrowLeft} />);

      expect(wrapper.findComponent(IconArrowLeft).exists()).toBeTruthy();
    });

    test('icon name', async () => {
      const wrapper = mount(() => <NPageHeader icon="arrow_left" />);

      expect(wrapper.findComponent(NIcon).exists()).toBeTruthy();
    });

    test('title', async () => {
      const wrapper = mount(() => <NPageHeader title="TITLE" />);

      expect(wrapper.text()).toBe('TITLE');
    });

    test('content', async () => {
      const wrapper = mount(() => <NPageHeader title="TITLE" />);

      expect(wrapper.text()).toBe('TITLE');
    });

    test('use-divider', async () => {
      const useDivider = ref(false);
      const wrapper = mount(() => <NPageHeader useDivider={useDivider.value} />);

      expect(wrapper.classes('has-divider')).toBeFalsy();

      useDivider.value = true;

      await nextTick();

      expect(wrapper.classes('has-divider')).toBeTruthy();
    });
  });

  describe('emits', () => {
    test('back', async () => {
      const onBack = vi.fn();
      const wrapper = mount(() => <NPageHeader onBack={onBack} />);
      const backBtn = wrapper.findComponent(NButton);

      await backBtn.trigger('click');

      expect(onBack).toHaveBeenCalledOnce();
    });
  });

  describe('slots', () => {
    test('default', () => {
      const wrapper = mount(() => (
        <NPageHeader>
          {{
            default: () => `DEFAULT`,
          }}
        </NPageHeader>
      ));

      expect(wrapper.find('.n-page-header__default').exists()).toBeTruthy();
    });

    test('icon', () => {
      const wrapper = mount(() => (
        <NPageHeader>
          {{
            icon: () => `ICON`,
          }}
        </NPageHeader>
      ));

      expect(wrapper.find('.n-button__icon').text()).toBe('ICON');
    });

    test('title', () => {
      const wrapper = mount(() => (
        <NPageHeader>
          {{
            title: () => `TITLE`,
          }}
        </NPageHeader>
      ));

      expect(wrapper.find('.n-page-header__header--title').text()).toBe('TITLE');
    });

    test('tags', () => {
      const wrapper = mount(() => (
        <NPageHeader>
          {{
            tags: () => `TAGS`,
          }}
        </NPageHeader>
      ));

      expect(wrapper.find('.n-page-header__header--tags').text()).toBe('TAGS');
    });

    test('content', () => {
      const wrapper = mount(() => (
        <NPageHeader>
          {{
            content: () => `CONTENT`,
          }}
        </NPageHeader>
      ));

      expect(wrapper.find('.n-page-header__inner--content').text()).toBe('CONTENT');
    });

    test('extra', () => {
      const wrapper = mount(() => (
        <NPageHeader>
          {{
            extra: () => `EXTRA`,
          }}
        </NPageHeader>
      ));

      expect(wrapper.find('.n-page-header__extra').text()).toBe('EXTRA');
    });

    test('breadcrumb', () => {
      const wrapper = mount(() => (
        <NPageHeader>
          {{
            breadcrumb: () => `BREADCRUMB`,
          }}
        </NPageHeader>
      ));

      expect(wrapper.find('.n-page-header__breadcrumb').text()).toBe('BREADCRUMB');
    });
  });
});
