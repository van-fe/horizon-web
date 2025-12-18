import { mount } from '@vue/test-utils';
import NDialog from '../src/Dialog';
import { describe, expect, test } from 'vitest';
import { ref, nextTick } from 'vue';
import { sleep } from '../../../utils/tools';

describe('Dialog.tsx 2nd', () => {
  describe('props', () => {
    test('lockScroll: while opened with two dialog should run right', async () => {
      const visible1 = ref(false);
      const visible2 = ref(false);

      function onPrimaryClick() {
        visible2.value = true;
      }

      function onPrimaryClick2() {
        visible1.value = false;
        visible2.value = false;
      }

      mount(
        () => (
          <div>
            <NDialog
              modelValue={visible1.value}
              class="dialog-1"
              primaryText="Confirm"
              secondaryText="Cancel"
              // onPrimaryClick={onPrimaryClick}
              onPrimary-click={onPrimaryClick}
              onUpdate:modelValue={val => (visible1.value = val)}
            />
            <NDialog
              modelValue={visible2.value}
              class="dialog-2"
              primaryText="Confirm"
              secondaryText="Cancel"
              onPrimaryClick={onPrimaryClick2}
              onUpdate:modelValue={val => (visible2.value = val)}
            />
          </div>
        ),
        {
          attachTo: document.body,
        },
      );

      await nextTick();

      visible1.value = true;

      await nextTick();
      await sleep(200);

      const dialog1 = document.body.querySelector('.dialog-1')!;
      const dialog1Buttons = dialog1.querySelectorAll(
        '.n-button--primary',
      ) as NodeListOf<HTMLButtonElement>;
      const dialog1ConfirmButton = Array.from(dialog1Buttons.values()).find(
        curr => curr.innerText !== 'Cancel',
      );

      expect(document.body.dataset.popupParentHidden).not.toBeUndefined();

      await dialog1ConfirmButton?.click();

      const dialog2 = document.body.querySelector('.dialog-2')!;
      const dialog2Buttons = dialog2.querySelectorAll(
        '.n-button--primary',
      ) as NodeListOf<HTMLButtonElement>;
      const dialog2ConfirmButton = Array.from(dialog2Buttons.values()).find(
        curr => curr.innerText !== 'Cancel',
      );

      expect(document.body.dataset.popupParentHidden).not.toBeUndefined();

      await dialog2ConfirmButton?.click();

      await sleep(200);

      expect(document.body.dataset.popupParentHidden).toBeUndefined();
    });
  });
});
