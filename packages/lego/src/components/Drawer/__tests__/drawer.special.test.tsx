import { describe, expect, test } from 'vitest';
import DrawerHelper from './DrawerHelper';
import { nextTick, ref } from 'vue';
import { NDrawer } from '~/components/Drawer';
import { sleep } from '~/utils/tools';

describe('Drawer.tsx special', () => {
  test('destroy drawer to hide rather than modify visible, check the body lock will be released', async () => {
    const instance = new DrawerHelper(undefined, undefined, false);

    await instance.open();

    expect(document.body.dataset.popupParentHidden).not.toBeUndefined();

    instance.visible.value = false;

    await nextTick();

    expect(document.body.dataset.popupParentHidden).toBeUndefined();
  });

  test('multiple drawer to check lock-scroll is correct', async () => {
    const visible = ref(false);

    const instance = new DrawerHelper(undefined, undefined, true, () => (
      <NDrawer v-model:visible={visible.value}></NDrawer>
    ));

    await instance.open();

    expect(document.body.dataset.popupParentHidden).not.toBeUndefined();

    visible.value = true;

    await sleep(300);

    expect(document.body.dataset.popupParentHidden).not.toBeUndefined();

    visible.value = false;

    await sleep(300);

    expect(document.body.dataset.popupParentHidden).not.toBeUndefined();

    await instance.close();

    expect(document.body.dataset.popupParentHidden).toBeUndefined();
  });
});
