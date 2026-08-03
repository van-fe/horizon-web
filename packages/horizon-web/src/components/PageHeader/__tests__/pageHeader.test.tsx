import { mount } from '@vue/test-utils';
import HPageHeader from '../src/PageHeader';
import { describe, expect, test, vi } from 'vitest';
import { IconArrowLeft, AIcon } from '@aurora/icon';
import { nextTick, ref } from 'vue';
import HButton from '../../Button';

describe('PageHeader.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HPageHeader />);
    const element = wrapper.findComponent(HPageHeader);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('icon svg', async () => {
      const wrapper = mount(() => <HPageHeader icon={IconArrowLeft} />);

      expect(wrapper.findComponent(IconArrowLeft).exists()).toBeTruthy();
    });

    test('icon name', async () => {
      const wrapper = mount(() => <HPageHeader icon="arrow_left" />);

      expect(wrapper.findComponent(AIcon).exists()).toBeTruthy();
    });

    test('title', async () => {
      const wrapper = mount(() => <HPageHeader title="TITLE" />);

      expect(wrapper.text()).toBe('TITLE');
    });

    test('content', async () => {
      const wrapper = mount(() => <HPageHeader title="TITLE" />);

      expect(wrapper.text()).toBe('TITLE');
    });

    test('use-divider', async () => {
      const useDivider = ref(false);
      const wrapper = mount(() => <HPageHeader useDivider={useDivider.value} />);

      expect(wrapper.classes('has-divider')).toBeFalsy();

      useDivider.value = true;

      await nextTick();

      expect(wrapper.classes('has-divider')).toBeTruthy();
    });
  });

  describe('emits', () => {
    test('back', async () => {
      const onBack = vi.fn();
      const wrapper = mount(() => <HPageHeader onBack={onBack} />);
      const backBtn = wrapper.findComponent(HButton);

      await backBtn.trigger('click');

      expect(onBack).toHaveBeenCalledOnce();
    });
  });

  describe('slots', () => {
    test('default', () => {
      const wrapper = mount(() => (
        <HPageHeader>
          {{
            default: () => `DEFAULT`,
          }}
        </HPageHeader>
      ));

      expect(wrapper.find('.h-page-header__default').exists()).toBeTruthy();
    });

    test('icon', () => {
      const wrapper = mount(() => (
        <HPageHeader>
          {{
            icon: () => `ICON`,
          }}
        </HPageHeader>
      ));

      expect(wrapper.find('.h-button__icon').text()).toBe('ICON');
    });

    test('title', () => {
      const wrapper = mount(() => (
        <HPageHeader>
          {{
            title: () => `TITLE`,
          }}
        </HPageHeader>
      ));

      expect(wrapper.find('.h-page-header__header--title').text()).toBe('TITLE');
    });

    test('tags', () => {
      const wrapper = mount(() => (
        <HPageHeader>
          {{
            tags: () => `TAGS`,
          }}
        </HPageHeader>
      ));

      expect(wrapper.find('.h-page-header__header--tags').text()).toBe('TAGS');
    });

    test('content', () => {
      const wrapper = mount(() => (
        <HPageHeader>
          {{
            content: () => `COHTEHT`,
          }}
        </HPageHeader>
      ));

      expect(wrapper.find('.h-page-header__inner--content').text()).toBe('COHTEHT');
    });

    test('extra', () => {
      const wrapper = mount(() => (
        <HPageHeader>
          {{
            extra: () => `EXTRA`,
          }}
        </HPageHeader>
      ));

      expect(wrapper.find('.h-page-header__extra').text()).toBe('EXTRA');
    });

    test('breadcrumb', () => {
      const wrapper = mount(() => (
        <HPageHeader>
          {{
            breadcrumb: () => `BREADCRUMB`,
          }}
        </HPageHeader>
      ));

      expect(wrapper.find('.h-page-header__breadcrumb').text()).toBe('BREADCRUMB');
    });
  });
});
