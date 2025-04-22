import { mount } from '@vue/test-utils';
import NButton from '../src/Button';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { ButtonProps } from '../src/composables/useProps';
import { IconEye, IconLoadingLine } from '@nio-fe/icon';
import { sleep } from '../../../utils/tools';

describe('Button.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NButton>OK</NButton>);
    const element = wrapper.findComponent(NButton);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('type', async () => {
      const type = ref<ButtonProps['type']>();
      const wrapper = mount(() => <NButton type={type.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--primary')).toBe(true);

      type.value = 'normal';

      await nextTick();

      expect(element.classes('n-button--normal')).toBe(true);
    });

    test('size', async () => {
      const size = ref<ButtonProps['size']>();
      const wrapper = mount(() => <NButton size={size.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--medium')).toBe(true);

      size.value = 'huge';

      await nextTick();

      expect(element.classes('n-button--huge')).toBe(true);
    });

    test('round', async () => {
      const round = ref<ButtonProps['round']>(false);
      const wrapper = mount(() => <NButton round={round.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--round')).toBe(false);

      round.value = true;

      await nextTick();

      expect(element.classes('n-button--round')).toBe(true);
    });

    test('text', async () => {
      const text = ref<ButtonProps['text']>(false);
      const wrapper = mount(() => <NButton text={text.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--text')).toBe(false);

      text.value = true;

      await nextTick();

      expect(element.classes('n-button--text')).toBe(true);
    });

    test('link', async () => {
      const link = ref<ButtonProps['link']>(false);
      const wrapper = mount(() => <NButton link={link.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--link')).toBe(false);

      link.value = true;

      await nextTick();

      expect(element.classes('n-button--link')).toBe(true);
    });

    test('block', async () => {
      const block = ref<ButtonProps['block']>(false);
      const wrapper = mount(() => <NButton block={block.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--block')).toBe(false);

      block.value = true;

      await nextTick();

      expect(element.classes('n-button--block')).toBe(true);
    });

    test('plain', async () => {
      const plain = ref<ButtonProps['plain']>(false);
      const wrapper = mount(() => <NButton plain={plain.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--plain')).toBe(false);

      plain.value = true;

      await nextTick();

      expect(element.classes('n-button--plain')).toBe(true);
    });

    test('plain ghost', async () => {
      const ghost = ref<ButtonProps['ghost']>(false);
      const wrapper = mount(() => (
        <NButton plain ghost={ghost.value}>
          OK
        </NButton>
      ));
      const element = wrapper.findComponent(NButton);

      expect(element.classes('is-ghost')).toBe(false);

      ghost.value = true;

      await nextTick();

      expect(element.classes('is-ghost')).toBe(true);
    });

    test('type=secondary', async () => {
      const wrapper = mount(() => <NButton type="secondary">OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--plain')).toBe(true);
    });

    test('loading', async () => {
      const loading = ref<ButtonProps['loading']>(false);
      const wrapper = mount(() => <NButton loading={loading.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('is-loading')).toBe(false);

      loading.value = true;

      await nextTick();

      expect(element.classes('is-loading')).toBe(true);
      expect(wrapper.findComponent(IconLoadingLine).exists()).toBe(true);
    });

    test('disabled', async () => {
      const disabled = ref<ButtonProps['disabled']>(false);
      const wrapper = mount(() => <NButton disabled={disabled.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.attributes('disabled')).toBeUndefined();

      disabled.value = true;

      await nextTick();

      expect(element.attributes('disabled')).not.toBeUndefined();
    });

    test('icon & icon-size', async () => {
      const iconSize = ref<ButtonProps['iconSize']>(12);
      const wrapper = mount(() => <NButton icon={IconEye} iconSize={iconSize.value}></NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.classes('n-button--equally')).toBe(true);
      expect(wrapper.findComponent(IconEye).exists()).toBeTruthy();

      // icon-size can't be displayed
    });

    test('native-type', async () => {
      const nativeType = ref<ButtonProps['nativeType']>();
      const wrapper = mount(() => <NButton nativeType={nativeType.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.attributes('type')).toBe('button');

      nativeType.value = 'submit';

      await nextTick();

      expect(element.attributes('type')).toBe('submit');
    });

    test('tag', async () => {
      const tag = ref<ButtonProps['tag']>();
      const wrapper = mount(() => <NButton tag={tag.value}>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.element.tagName).toBe('BUTTON');

      tag.value = 'div';

      await nextTick();

      expect(element.element.tagName).toBe('DIV');
    });

    test('debounceFn', async () => {
      const onClickCb = vi.fn();

      const saveData = () => {
        onClickCb();
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(void 0);
          }, 2000);
        });
      };

      const wrapper = mount(() => (
        <NButton debounceFn={saveData} debounceType="loading">
          OK
        </NButton>
      ));
      const element = wrapper.findComponent(NButton);

      await element.trigger('click');
      expect(element.classes('is-loading')).toBeTruthy();
      expect(onClickCb).toHaveBeenCalledOnce();

      await element.trigger('click');
      await element.trigger('click');
      await nextTick();
      expect(onClickCb).toHaveBeenCalledOnce();

      await sleep(2000);

      expect(onClickCb).toHaveBeenCalledOnce();
    });
  });

  describe('emit', () => {
    test('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(() => <NButton onClick={onClick}>OK</NButton>);

      await wrapper.findComponent(NButton).trigger('click');

      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe('slots', () => {
    test('default', async () => {
      const wrapper = mount(() => <NButton>OK</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.text()).toEqual('OK');
    });

    test('icon', async () => {
      const wrapper = mount(() => <NButton>{{ icon: () => <IconEye /> }}</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.findComponent(IconEye)).toBeTruthy();
    });

    test('suffix', async () => {
      const wrapper = mount(() => <NButton>{{ suffix: () => 'SUFFIX' }}</NButton>);
      const element = wrapper.findComponent(NButton);

      expect(element.find('.n-button__suffix').text()).toEqual('SUFFIX');
    });
  });
});
