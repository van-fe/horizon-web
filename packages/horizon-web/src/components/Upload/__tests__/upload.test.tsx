import { mount } from '@vue/test-utils';
import type { HUploadUserFile } from '..';
import { HUpload } from '..';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';

afterEach(() => {
  document.body.querySelectorAll('input[type="file"]').forEach(input => input.remove());
});

describe('Upload.tsx', () => {
  test('basic', async () => {
    const modelValue = ref<HUploadUserFile>();
    const wrapper = mount(() => <HUpload v-model={modelValue.value} action="" />);
    const element = wrapper.findComponent(HUpload);

    expect(element.exists()).toBe(true);
  });

  test('keeps the programmatic file input out of the tab order', async () => {
    const wrapper = mount(() => <HUpload action="" />);

    await nextTick();
    const fileInput = document.body.querySelector<HTMLInputElement>('input[type="file"]');

    expect(fileInput?.tabIndex).toBe(-1);

    wrapper.unmount();
  });

  test('opens the native picker through the public handleSelect method', async () => {
    const wrapper = mount(HUpload, { props: { action: '' } });
    await nextTick();
    const fileInput = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    const click = vi.spyOn(fileInput, 'click');

    (wrapper.vm as any).handleSelect();

    expect(click).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  test('renders controlled files through the uploadedFiles slot and reacts to replacements', async () => {
    const first: HUploadUserFile = { name: 'first.pdf', url: 'https://files.test/first.pdf' };
    const second: HUploadUserFile = { name: 'second.pdf', url: 'https://files.test/second.pdf' };
    const wrapper = mount(HUpload, {
      props: { action: '', autoUpload: false, modelValue: [first] },
      slots: {
        uploadedFiles: (files?: any[]) => (
          <div data-test="uploaded-files">{files?.map(file => file.name).join(',')}</div>
        ),
      },
    });
    await nextTick();

    expect(wrapper.get('[data-test="uploaded-files"]').text()).toBe('first.pdf');

    await wrapper.setProps({ modelValue: [second] });
    await nextTick();
    expect(wrapper.get('[data-test="uploaded-files"]').text()).toBe('second.pdf');

    await wrapper.setProps({ modelValue: null });
    await nextTick();
    expect(wrapper.find('[data-test="uploaded-files"]').exists()).toBe(false);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([[]]);
  });

  test('rejects a user-selected file when beforeUpload resolves to false', async () => {
    const beforeUpload = vi.fn(async () => false);
    const wrapper = mount(HUpload, {
      props: { action: '', autoUpload: false, beforeUpload },
    });
    await nextTick();
    const input = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    const file = new File(['unsafe'], 'unsafe.exe', { type: 'application/octet-stream' });
    Object.defineProperty(input, 'files', { configurable: true, value: [file] });

    input.dispatchEvent(new Event('change'));
    await vi.waitFor(() => expect(beforeUpload).toHaveBeenCalledTimes(1));

    expect(wrapper.emitted('add')).toBeUndefined();
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(wrapper.find('.h-upload__file-item').exists()).toBe(false);
  });

  test('ignores click and drop file selection while disabled', async () => {
    const wrapper = mount(HUpload, {
      props: { action: '', type: 'drop', disabled: true, autoUpload: false },
    });
    await nextTick();
    const input = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    const click = vi.spyOn(input, 'click');
    const dropArea = wrapper.get('.h-upload--drop-area');
    const file = new File(['content'], 'disabled.txt', { type: 'text/plain' });

    await dropArea.trigger('click');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropArea.element.dispatchEvent(
      new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer }),
    );
    await nextTick();

    expect(click).not.toHaveBeenCalled();
    expect(wrapper.emitted('add')).toBeUndefined();
    expect(wrapper.classes()).toContain('is-disabled');
  });

  test('adds transformed clipboard files and removes the listener on unmount', async () => {
    const beforePaste = vi.fn(async (files: File[]) => files.slice(0, 1));
    const removeEventListener = vi.spyOn(document, 'removeEventListener');
    const wrapper = mount(HUpload, {
      props: { action: '', useClipboard: true, autoUpload: false, beforePaste },
    });
    const file = new File(['clipboard'], 'clipboard.png', { type: 'image/png' });
    const event = new Event('paste', { bubbles: true }) as ClipboardEvent;
    Object.defineProperty(event, 'clipboardData', {
      value: {
        items: [
          { kind: 'string', getAsFile: () => null },
          { kind: 'file', getAsFile: () => file },
        ],
      },
    });

    document.dispatchEvent(event);
    await vi.waitFor(() => expect(wrapper.emitted('add')).toHaveLength(1));

    expect(beforePaste).toHaveBeenCalledWith([file]);
    expect((wrapper.emitted('add')?.[0]?.[0] as any).name).toBe('clipboard.png');

    wrapper.unmount();
    expect(removeEventListener).toHaveBeenCalledWith('paste', expect.any(Function));
  });
});
