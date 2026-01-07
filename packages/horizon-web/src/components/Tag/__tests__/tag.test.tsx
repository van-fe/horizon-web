import { mount } from '@vue/test-utils';
import HTag from '../src/Tag';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { TagProps } from '../src/composables/useProps';
import HAvatar from '../../Avatar';
import { IconEye } from '@aurora/icon';
import { sleep } from '../../../utils/tools';

describe('Tag.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HTag />);
    const element = wrapper.findComponent(HTag);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('modelValue', async () => {
      const modelValue = ref(false);
      const wrapper = mount(() => <HTag v-model={modelValue.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('is-clickable')).eq(true);

      await element.trigger('click');

      expect(element.classes('is-active')).eq(true);
    });

    test('type', async () => {
      const type = ref<TagProps['type']>('success');
      const wrapper = mount(() => <HTag type={type.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('n-tag--success')).eq(true);

      type.value = 'error';

      await nextTick();

      expect(element.classes('n-tag--error')).eq(true);
    });

    test('size', async () => {
      const size = ref<TagProps['size']>('medium');
      const wrapper = mount(() => <HTag size={size.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('n-tag--medium')).eq(true);

      size.value = 'large';

      await nextTick();

      expect(element.classes('n-tag--large')).eq(true);
    });

    test('bold', async () => {
      const bold = ref<TagProps['bold']>(false);
      const wrapper = mount(() => <HTag bold={bold.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('n-tag--bold')).eq(false);

      bold.value = true;

      await nextTick();

      expect(element.classes('n-tag--bold')).eq(true);
    });

    test('clickable', async () => {
      const clickable = ref<TagProps['clickable']>(false);
      const wrapper = mount(() => <HTag clickable={clickable.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('is-clickable')).eq(false);

      clickable.value = true;

      await nextTick();

      expect(element.classes('is-clickable')).eq(true);
    });

    test('closable', async () => {
      const closable = ref<TagProps['closable']>(false);
      const wrapper = mount(() => <HTag closable={closable.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('is-closable')).eq(false);

      closable.value = true;

      await nextTick();

      expect(element.classes('is-closable')).eq(true);
      expect(wrapper.find('.h-tag__close').exists()).eq(true);
    });

    test('disabled', async () => {
      const disabled = ref<TagProps['disabled']>(false);
      const wrapper = mount(() => <HTag disabled={disabled.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('is-disabled')).eq(false);

      disabled.value = true;

      await nextTick();

      expect(element.classes('is-disabled')).eq(true);
    });

    test('plain', async () => {
      const plain = ref<TagProps['plain']>(false);
      const wrapper = mount(() => <HTag plain={plain.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('is-plain')).eq(false);

      plain.value = true;

      await nextTick();

      expect(element.classes('is-plain')).eq(true);
    });

    test('round', async () => {
      const round = ref<TagProps['round']>(false);
      const wrapper = mount(() => <HTag round={round.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('n-tag--round')).eq(false);

      round.value = true;

      await nextTick();

      expect(element.classes('n-tag--round')).eq(true);
    });

    test('avatar', async () => {
      const size = ref<TagProps['size']>('medium');
      const wrapper = mount(() => <HTag size={size.value} avatar="1" />);
      const element = wrapper.find('.h-tag');
      const avatar = element.findComponent(HAvatar);

      expect(avatar.find('img').exists()).eq(true);
      expect(avatar.attributes('style')).contain('width: 16px');

      size.value = 'large';
      await nextTick();
      expect(avatar.attributes('style')).contain('width: 24px');

      size.value = 'small';
      await nextTick();
      expect(avatar.attributes('style')).contain('width: 14px');
    });

    test('icon', async () => {
      const size = ref<TagProps['size']>('medium');
      const wrapper = mount(() => <HTag size={size.value} icon={IconEye} />);
      const element = wrapper.find('.h-tag');
      const icon = element.findComponent(IconEye);

      expect(icon.exists()).eq(true);
    });

    test('equally', async () => {
      const equally = ref<TagProps['equally']>(false);
      const wrapper = mount(() => <HTag equally={equally.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('n-tag--equally')).eq(false);

      equally.value = true;

      await nextTick();

      expect(element.classes('n-tag--equally')).eq(true);
    });

    test('delay-show-close', async () => {
      const wrapper = mount(() => (
        <HTag equally={true} closable={true} clickable={true}>
          普
        </HTag>
      ));
      const element = wrapper.find('.h-tag');

      await element.trigger('mouseenter');
      await sleep(1000);
      await nextTick();

      expect(element.find('.h-tag__close').exists()).eq(true);

      await element.trigger('mouseleave');
      await element.trigger('mouseenter');
      await element.trigger('click');
      await sleep(1000);
      await nextTick();

      expect(element.find('.h-tag__close').exists()).eq(false);
    });

    test('loading', async () => {
      const loading = ref<TagProps['loading']>(true);
      const wrapper = mount(() => <HTag loading={loading.value}>普</HTag>);
      const element = wrapper.find('.h-tag');

      expect(element.find('.h-tag__loading').exists()).eq(true);

      loading.value = false;

      await nextTick();

      expect(element.find('.h-tag__loading').exists()).eq(false);
    });

    test('disable-transitions', async () => {
      const disableTransitions = ref<TagProps['disableTransitions']>(false);
      const wrapper = mount(() => <HTag disableTransitions={disableTransitions.value} />);
      const element = wrapper.find('.h-tag');

      expect(element.classes('is-disable-transitions')).eq(false);

      disableTransitions.value = true;

      await nextTick();

      expect(element.classes('is-disable-transitions')).eq(true);
    });
  });

  describe('emits', () => {
    test('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(() => <HTag clickable={true} onClick={onClick} />);
      const element = wrapper.find('.h-tag');

      await element.trigger('click');

      expect(onClick).toHaveBeenCalledOnce();
    });

    test('close', async () => {
      const onClose = vi.fn();
      const wrapper = mount(() => <HTag closable={true} onClose={onClose} />);
      const element = wrapper.find('.h-tag');
      const closeIcon = element.find('.h-tag__close');

      await closeIcon.trigger('click');

      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  describe('slots', () => {
    test('icon', () => {
      const wrapper = mount(() => <HTag>{{ icon: () => <IconEye /> }}</HTag>);

      expect(wrapper.findComponent(IconEye).exists()).eq(true);
    });
    test('avatar', () => {
      const wrapper = mount(() => <HTag>{{ avatar: () => <HAvatar /> }}</HTag>);

      expect(wrapper.findComponent(HAvatar).exists()).eq(true);
    });
  });
});
