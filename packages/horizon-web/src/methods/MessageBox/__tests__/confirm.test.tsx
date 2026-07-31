import { mount } from '@vue/test-utils';
import Confirm from '../src/components/Confirm';
import methodsRegister, { $confirm } from '../../index';
import { describe, expect, test } from 'vitest';
import { createApp, nextTick, ref } from 'vue';
import { sleep } from '../../../utils/tools';
import { localizableProvide } from '~/provides';
import { LocaleSupportLang } from '@aurora/locale-vue';
import HApplication from '~/components/Application';

describe('confirm.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <Confirm title="Alert Title" content="Something need to be alerted." />
    ));

    const element = wrapper.findComponent(Confirm);

    expect(element.exists()).toBe(true);
  });

  test('confirm close', async () => {
    $confirm('content').then(close => {
      close();
    });

    await nextTick();

    const footer = Array.from(document.body.querySelectorAll('.h-dialog__footer')).at(-1)!;
    const buttons = Array.from(footer.querySelectorAll('button'));
    expect(buttons.map(button => button.textContent)).toStrictEqual(['Cancel', 'OK']);
    (buttons[1] as HTMLButtonElement).click();

    await nextTick();

    await sleep(200);

    const dialogContainer = document.body.querySelector('.h-dialog__container')!;

    const style = window.getComputedStyle(dialogContainer);

    expect(style.display).eq('none');
  });

  test('uses the application locale for default button text', async () => {
    const locale = ref(LocaleSupportLang.En);
    const appRoot = document.createElement('div');
    document.body.appendChild(appRoot);
    const app = createApp({
      render: () => <HApplication locale={locale.value} />,
    });

    localizableProvide(app);
    methodsRegister(app);
    app.mount(appRoot);

    const confirmPromise = $confirm({
      content: 'content',
      okButtonProps: {
        debounceType: 'none',
      },
    });

    await nextTick();

    const footer = Array.from(document.body.querySelectorAll('.h-dialog__footer')).at(-1)!;
    const buttons = Array.from(footer.querySelectorAll('button'));
    expect(buttons.map(button => button.textContent)).toStrictEqual(['Cancel', 'OK']);

    locale.value = LocaleSupportLang.ZhCN;
    await nextTick();
    expect(buttons.map(button => button.textContent)).toStrictEqual(['取消', '确定']);

    (buttons[1] as HTMLButtonElement).click();
    const close = await confirmPromise;
    close();
    app.unmount();
    appRoot.remove();
    $confirm._context = undefined;
  });
});
