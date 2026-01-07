import HDialog from '../src/Dialog';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import HButton from '../../Button';

describe('Dialog.tsx special problem', () => {
  test('visible set true while rendering', async () => {
    const modelValue = ref(true);
    const wrapper = mount(
      () => (
        <HDialog
          modelValue={modelValue.value}
          toBody={false}
          secondaryText="Close"
          onUpdate:modelValue={val => (modelValue.value = val)}
        />
      ),
      {
        attachTo: document.body,
      },
    );
    const element = wrapper.findComponent(HDialog);

    expect(element.find('.h-dialog__container').attributes('style')).contains('z-index: 2002');
    expect(document.body.dataset['popupParentHidden']).not.toBeUndefined();

    const cancelButton = element.findAllComponents(HButton)[0];

    await cancelButton.trigger('click');

    await nextTick();

    expect(document.body.dataset['popupParentHidden']).toBeUndefined();
  });
});
