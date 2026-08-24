import { mount } from '@vue/test-utils';
import HButton from '../src/Button';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { App } from 'vue';
import type { ButtonProps } from '../src/composables/useProps';
import type { ButtonExposes } from '../src/composables/useExposes';
import { IconEye } from '@aurora/icon';
import { sleep } from '../../../utils/tools';
import LoadingIcon from '../../../directives/v-loading/src/components/LoadingIcon';
import { buttonActionTestVectors, buttonManifest, resolveButtonAction } from '@aurora/core';
import type { Router } from 'vue-router';
import { useButtonProps } from '../src/composables/useProps';
import { useButtonEmits } from '../src/composables/useEmits';
import { useButtonExposes } from '../src/composables/useExposes';

describe('Button.tsx', () => {
  test('derives its renderer API from the Core manifest', () => {
    const rename: Record<string, string> = {
      variant: 'type',
      asyncAction: 'debounceFn',
      asyncState: 'debounceType',
    };
    expect(Object.keys(useButtonProps)).toEqual([
      ...buttonManifest.contract.props.map(field => rename[field.name] ?? field.name),
      'autofocus',
      'icon',
      'iconSize',
      'nativeType',
      'tag',
      'to',
    ]);
    expect(Object.keys(useButtonEmits)).toEqual([
      'click',
      'debounceFinished',
      'debounceError',
      'focus',
      'blur',
    ]);
    expect(Object.keys(useButtonExposes)).toEqual(['focus']);
  });

  test.each(buttonActionTestVectors)(
    'consumes shared action vector: $name',
    ({ input, expected }) => {
      expect(resolveButtonAction(input)).toBe(expected);
    },
  );

  test('basic', async () => {
    const wrapper = mount(() => <HButton>OK</HButton>);
    const element = wrapper.findComponent(HButton);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('href opens the requested target without emitting a normal click', async () => {
      const open = vi.spyOn(window, 'open').mockReturnValue(null);
      const wrapper = mount(() => (
        <HButton tag="a" href="https://example.test/download" target="_blank">
          Download
        </HButton>
      ));

      await wrapper.get('a').trigger('click');

      expect(open).toHaveBeenCalledWith('https://example.test/download');
      expect(wrapper.findComponent(HButton).emitted('click')).toBeUndefined();
    });

    test('href supports parent and top browsing contexts', async () => {
      const parentOpen = vi.spyOn(window.parent, 'open').mockReturnValue(null);
      const topOpen = vi.spyOn(window.top!, 'open').mockReturnValue(null);
      const wrapper = mount(() => (
        <div>
          <HButton tag="a" href="https://example.test/parent" target="_parent">
            Parent
          </HButton>
          <HButton tag="a" href="https://example.test/top" target="_top">
            Top
          </HButton>
        </div>
      ));

      const links = wrapper.findAll('a');
      await links[0].trigger('click');
      await links[1].trigger('click');
      expect(parentOpen).toHaveBeenCalledWith('https://example.test/parent');
      expect(topOpen).toHaveBeenCalledWith('https://example.test/top');
    });

    test('routes through push and replace exactly once', async () => {
      const router = { push: vi.fn(), replace: vi.fn() };
      const wrapper = mount(
        () => (
          <div>
            <HButton to="/push">Push</HButton>
            <HButton to="/replace" replace>
              Replace
            </HButton>
          </div>
        ),
        {
          global: {
            plugins: [
              {
                install(app: App) {
                  app.config.globalProperties.$router = router as unknown as Router;
                },
              },
            ],
          },
        },
      );

      const buttons = wrapper.findAll('button');
      await buttons[0].trigger('click');
      await buttons[1].trigger('click');
      expect(router.push).toHaveBeenCalledOnce();
      expect(router.push).toHaveBeenCalledWith('/push');
      expect(router.replace).toHaveBeenCalledOnce();
      expect(router.replace).toHaveBeenCalledWith('/replace');
    });

    test('type', async () => {
      const type = ref<ButtonProps['type']>();
      const wrapper = mount(() => <HButton type={type.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--primary')).toBe(true);

      type.value = 'normal';

      await nextTick();

      expect(element.classes('h-button--normal')).toBe(true);
    });

    test('size', async () => {
      const size = ref<ButtonProps['size']>();
      const wrapper = mount(() => <HButton size={size.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--medium')).toBe(true);

      size.value = 'huge';

      await nextTick();

      expect(element.classes('h-button--huge')).toBe(true);
    });

    test('round', async () => {
      const round = ref<ButtonProps['round']>(false);
      const wrapper = mount(() => <HButton round={round.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--round')).toBe(false);

      round.value = true;

      await nextTick();

      expect(element.classes('h-button--round')).toBe(true);
    });

    test('text', async () => {
      const text = ref<ButtonProps['text']>(false);
      const wrapper = mount(() => <HButton text={text.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--text')).toBe(false);

      text.value = true;

      await nextTick();

      expect(element.classes('h-button--text')).toBe(true);
    });

    test('link', async () => {
      const link = ref<ButtonProps['link']>(false);
      const wrapper = mount(() => <HButton link={link.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--link')).toBe(false);

      link.value = true;

      await nextTick();

      expect(element.classes('h-button--link')).toBe(true);
    });

    test('block', async () => {
      const block = ref<ButtonProps['block']>(false);
      const wrapper = mount(() => <HButton block={block.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--block')).toBe(false);

      block.value = true;

      await nextTick();

      expect(element.classes('h-button--block')).toBe(true);
    });

    test('plain', async () => {
      const plain = ref<ButtonProps['plain']>(false);
      const wrapper = mount(() => <HButton plain={plain.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--plain')).toBe(false);

      plain.value = true;

      await nextTick();

      expect(element.classes('h-button--plain')).toBe(true);
    });

    test('plain ghost', async () => {
      const ghost = ref<ButtonProps['ghost']>(false);
      const wrapper = mount(() => (
        <HButton plain ghost={ghost.value}>
          OK
        </HButton>
      ));
      const element = wrapper.findComponent(HButton);

      expect(element.classes('is-ghost')).toBe(false);

      ghost.value = true;

      await nextTick();

      expect(element.classes('is-ghost')).toBe(true);
    });

    test('plain', async () => {
      const wrapper = mount(() => <HButton plain>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--plain')).toBe(true);
    });

    test('loading', async () => {
      const loading = ref<ButtonProps['loading']>(false);
      const wrapper = mount(() => <HButton loading={loading.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('is-loading')).toBe(false);

      loading.value = true;

      await nextTick();

      expect(element.classes('is-loading')).toBe(true);
      const indicator = wrapper.getComponent(LoadingIcon);
      expect(indicator.classes()).toContain('h-loading-icon');
      expect(indicator.classes()).toContain('h-button__loading-icon');
      expect(indicator.get('circle').classes()).toContain('h-loading-icon__path');
    });

    test('disabled', async () => {
      const disabled = ref<ButtonProps['disabled']>(false);
      const wrapper = mount(() => <HButton disabled={disabled.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.attributes('disabled')).toBeUndefined();

      disabled.value = true;

      await nextTick();

      expect(element.attributes('disabled')).not.toBeUndefined();
    });

    test('icon & icon-size', async () => {
      const iconSize = ref<ButtonProps['iconSize']>(12);
      const wrapper = mount(() => <HButton icon={IconEye} iconSize={iconSize.value}></HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.classes('h-button--equally')).toBe(true);
      expect(wrapper.findComponent(IconEye).exists()).toBeTruthy();

      // icon-size can't be displayed
    });

    test('derives default icon sizes for string and component-only buttons', () => {
      const stringIcon = mount(() => <HButton icon="eye" />);
      expect(stringIcon.getComponent({ name: 'AIcon' }).props('size')).toBeTypeOf('number');

      const componentIcon = mount(() => <HButton icon={IconEye} />);
      expect(componentIcon.getComponent(IconEye).props('size')).toBeTypeOf('number');
      expect(componentIcon.findComponent(HButton).classes()).toContain('h-button--equally');
    });

    test('native-type', async () => {
      const nativeType = ref<ButtonProps['nativeType']>();
      const wrapper = mount(() => <HButton nativeType={nativeType.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.attributes('type')).toBe('button');

      nativeType.value = 'submit';

      await nextTick();

      expect(element.attributes('type')).toBe('submit');
    });

    test('tag', async () => {
      const tag = ref<ButtonProps['tag']>();
      const wrapper = mount(() => <HButton tag={tag.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.element.tagName).toBe('BUTTON');

      tag.value = 'div';

      await nextTick();

      expect(element.element.tagName).toBe('DIV');
    });

    test.each([
      {
        name: 'default',
        render: () => <HButton color="#476582">OK</HButton>,
        variables: [
          '--h-button-color-primary',
          '--h-button-background-primary',
          '--h-button-border-color-primary',
          '--h-button-background-primary-hover',
          '--h-button-background-primary-press',
          '--h-button-background-primary-disabled',
          '--h-button-background-primary-activated',
        ],
      },
      {
        name: 'plain',
        render: () => (
          <HButton color="#476582" plain>
            OK
          </HButton>
        ),
        variables: [
          '--h-button-color-primary-plain',
          '--h-button-background-primary-plain',
          '--h-button-border-color-primary-plain',
        ],
      },
      {
        name: 'text',
        render: () => (
          <HButton color="#476582" text>
            OK
          </HButton>
        ),
        variables: ['--h-button-color-primary-text'],
      },
      {
        name: 'link',
        render: () => (
          <HButton color="#476582" link>
            OK
          </HButton>
        ),
        variables: ['--h-button-color-primary-link'],
      },
      {
        name: 'ghost',
        render: () => (
          <HButton color="#476582" plain ghost>
            OK
          </HButton>
        ),
        variables: [
          '--h-button-color-primary-plain-ghost',
          '--h-button-border-color-primary-plain-ghost',
        ],
      },
      {
        name: 'normal',
        render: () => (
          <HButton color="#476582" type="normal">
            OK
          </HButton>
        ),
        variables: [
          '--h-button-color-normal',
          '--h-button-background-normal',
          '--h-button-border-color-normal',
        ],
      },
      {
        name: 'danger',
        render: () => (
          <HButton color="#476582" type="danger">
            OK
          </HButton>
        ),
        variables: [
          '--h-button-color-danger',
          '--h-button-background-danger',
          '--h-button-border-color-danger',
        ],
      },
    ])('color uses current CSS variables for $name buttons', ({ render, variables }) => {
      const wrapper = mount(render);
      const style = wrapper.findComponent(HButton).attributes('style');

      variables.forEach(variable => expect(style).toContain(`${variable}:`));
      expect(style).not.toMatch(/--h-button-[^:;]*--/);
      expect(style).not.toContain('--h-button-bg');
    });

    test.each([
      {
        name: 'plain over link and text',
        render: () => (
          <HButton color="#476582" plain text link>
            OK
          </HButton>
        ),
        included: '--h-button-color-primary-plain',
        excluded: ['--h-button-color-primary-text', '--h-button-color-primary-link'],
      },
      {
        name: 'link over text',
        render: () => (
          <HButton color="#476582" text link>
            OK
          </HButton>
        ),
        included: '--h-button-color-primary-link',
        excluded: ['--h-button-color-primary-text'],
      },
    ])('color follows rendered variant precedence for $name', ({ render, included, excluded }) => {
      const style = mount(render).findComponent(HButton).attributes('style');

      expect(style).toContain(`${included}:`);
      excluded.forEach(variable => expect(style).not.toContain(`${variable}:`));
    });

    test('color supports reactive built-in and literal values and ignores invalid values', async () => {
      const color = ref('not-a-color');
      const wrapper = mount(() => <HButton color={color.value}>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.attributes('style')).toBeUndefined();

      color.value = 'brand';
      await nextTick();
      expect(element.attributes('style')).toMatch(/--h-button-background-primary:\s*#3475f8/i);

      color.value = '#476582';
      await nextTick();
      expect(element.attributes('style')).toMatch(/--h-button-background-primary:\s*#476582/i);
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
        <HButton debounceFn={saveData} debounceType="loading">
          OK
        </HButton>
      ));
      const element = wrapper.findComponent(HButton);

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

    test('does not emit debounceFinished after unmount and recovers from rejection', async () => {
      let resolve!: () => void;
      const pending = new Promise<void>(done => {
        resolve = done;
      });
      const afterUnmount = vi.fn();
      const first = mount(HButton, {
        props: { debounceFn: () => pending, onDebounceFinished: afterUnmount },
        slots: { default: () => 'Save' },
      });
      await first.trigger('click');
      first.unmount();
      resolve();
      await pending;
      await nextTick();
      expect(afterUnmount).not.toHaveBeenCalled();

      const rejectedFinished = vi.fn();
      const rejectedError = vi.fn();
      const rejected = mount(HButton, {
        props: {
          debounceFn: () => Promise.reject(new Error('save failed')),
          onDebounceFinished: rejectedFinished,
          onDebounceError: rejectedError,
        },
        slots: { default: () => 'Retry' },
      });
      await rejected.trigger('click');
      await sleep(0);
      expect(rejectedFinished).not.toHaveBeenCalled();
      expect(rejectedError).toHaveBeenCalledOnce();
      expect(rejectedError.mock.calls[0][0]).toBeInstanceOf(Error);
      expect(rejected.classes()).not.toContain('is-loading');
    });
  });

  test('emits blur with the native FocusEvent from a real focus transition', async () => {
    const onBlur = vi.fn();
    const wrapper = mount(() => <HButton onBlur={onBlur}>Focusable</HButton>, {
      attachTo: document.body,
    });
    const button = wrapper.get('button').element as HTMLButtonElement;
    button.focus();
    button.blur();
    await nextTick();

    expect(onBlur).toHaveBeenCalledOnce();
    expect(onBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    wrapper.unmount();
  });

  test('exposes focus for the rendered interaction element', () => {
    const wrapper = mount(HButton, {
      attachTo: document.body,
      slots: { default: () => 'Focusable' },
    });

    (wrapper.vm as unknown as ButtonExposes).focus();
    expect(document.activeElement).toBe(wrapper.get('button').element);
    wrapper.unmount();
  });

  describe('emit', () => {
    test('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(() => <HButton onClick={onClick}>OK</HButton>);

      await wrapper.findComponent(HButton).trigger('click');

      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe('slots', () => {
    test('default', async () => {
      const wrapper = mount(() => <HButton>OK</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.text()).toEqual('OK');
    });

    test('icon', async () => {
      const wrapper = mount(() => <HButton>{{ icon: () => <IconEye /> }}</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.findComponent(IconEye)).toBeTruthy();
    });

    test('suffix', async () => {
      const wrapper = mount(() => <HButton>{{ suffix: () => 'SUFFIX' }}</HButton>);
      const element = wrapper.findComponent(HButton);

      expect(element.find('.h-button__suffix').text()).toEqual('SUFFIX');
    });
  });
});
