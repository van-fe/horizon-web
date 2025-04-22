import { describe, expect, test } from 'vitest';
import DrawerHelper from '~/components/Drawer/__tests__/DrawerHelper';

describe('Drawer.tsx', () => {
  test('basic', async () => {
    const instance = new DrawerHelper();

    await instance.open();

    expect(instance.element.exists()).toBeTruthy();
  });

  test('lock-scroll', async () => {
    const instance = new DrawerHelper();

    await instance.open();

    expect(document.body.dataset.popupParentHidden).not.toBeUndefined();

    await instance.close();

    expect(document.body.dataset.popupParentHidden).toBeUndefined();
  });

  test('lock-scroll set false', async () => {
    const instance = new DrawerHelper({
      lockScroll: false,
    });

    await instance.open();

    expect(document.body.dataset.popupParentHidden).toBeUndefined();

    await instance.close();

    expect(document.body.dataset.popupParentHidden).toBeUndefined();
  });

  test('lock-scroll not set and mask set false', async () => {
    const instance = new DrawerHelper({
      title: 'TITLE',
      mask: false,
    });

    await instance.open();

    expect(document.body.dataset.popupParentHidden).toBeUndefined();

    await instance.close(false);

    expect(document.body.dataset.popupParentHidden).toBeUndefined();
  });
});
