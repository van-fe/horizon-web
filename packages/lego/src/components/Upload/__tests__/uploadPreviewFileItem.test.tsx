import { mount } from '@vue/test-utils';
import UploadPreviewFileItem from '../src/UploadPreviewFileItem';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

describe('UploadPreviewFileItem.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <UploadPreviewFileItem />);
    const element = wrapper.findComponent(UploadPreviewFileItem);

    expect(element.exists()).toBe(true);
  });

  describe('props', function () {
    test('file.size', async () => {
      const fileObj = ref({
        helpName: 'abc',
        name: 'abc',
        size: 1000,
        progress: 60,
        type: 'application/vnd.ms-excel',
      });

      const wrapper = mount(() => <UploadPreviewFileItem file={fileObj.value} />);

      expect(wrapper.find('.n-upload-file-preview__file-size').text()).eq('1000B');

      fileObj.value.size = 100000;

      await nextTick();

      expect(wrapper.find('.n-upload-file-preview__file-size').text()).eq('97.66KB');
    });
  });
});
