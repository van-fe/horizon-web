import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { HUpload, type HUploadUserFile } from '..';
import type { UploadExposes } from '../src/composables/useExposes';
import { useUploadBackgroundEmits, useUploadEmits } from '../src/composables/useEmits';
import { useUploadProps, type UploadProps } from '../src/composables/useProps';
import UploadBackground from '../src/components/UploadBackground';
import UploadFileItem from '../src/components/UploadFileItem';
import UploadItemControls from '../src/components/UploadItemControls';
import {
  createBackgroundUploadInstance,
  destroyBackgroundUploadInstance,
} from '../src/utils/uploadBackgroundHelper';
import UploadFileHelper from '../src/utils/UploadFileHelper';
import {
  HUploadOpenViewerInjectKey,
  HUploadUploadFileHelperInjectKey,
} from '../src/utils/injectKeys';
import {
  HUploadFileStatusEnum,
  HUploadFileTypeEnum,
  type HUploadFileType,
  type HUploadHttpRequestInstanceMethods,
} from '../src/utils/fileDefines';
import { localeInjectKey } from '~/provides/localable';
import { ZhCN } from '~/locales/zh-CN';

afterEach(() => {
  document.body.querySelectorAll('input[type="file"]').forEach(input => input.remove());
});

function choose(input: HTMLInputElement, files: File[]) {
  Object.defineProperty(input, 'files', { configurable: true, value: files });
  input.dispatchEvent(new Event('change'));
}

const image: HUploadUserFile = {
  name: 'photo.png',
  url: 'https://files.test/photo.png',
  size: 2048,
};

function contractFile(
  name: string,
  status: HUploadFileStatusEnum,
  type: HUploadFileTypeEnum,
  extra: Partial<HUploadFileType> = {},
): HUploadFileType {
  return {
    name,
    percentage: 0,
    status,
    type,
    size: 1024,
    uuid: `${name}-${status}`,
    url: `https://files.test/${name}`,
    ...extra,
  };
}

describe('Upload public API contracts', () => {
  test('applies native input props and reports size, accept, limit, add, change and model payloads', async () => {
    const beforeUpload = vi.fn(async () => true);
    const onFileSizeExceed = vi.fn();
    const onAcceptError = vi.fn();
    const onExceed = vi.fn();
    const onAdd = vi.fn();
    const onChange = vi.fn();
    const onUpdateModelValue = vi.fn();
    const wrapper = mount(HUpload, {
      props: {
        id: 'contract-upload-input',
        action: '/upload-contract',
        header: { Authorization: 'test-token' },
        method: 'PUT',
        multiple: true,
        limit: 1,
        data: { folder: 'contracts' },
        name: 'contract-file',
        withCredentials: true,
        crossorigin: 'anonymous',
        accept: '.txt',
        acceptStrict: true,
        useBuildInAcceptCheck: true,
        autoUpload: false,
        autoSliceExceedFiles: true,
        fileSizeLimit: 0.001,
        beforeUpload,
        onFileSizeExceed,
        onAcceptError,
        onExceed,
        onAdd,
        onChange,
        'onUpdate:modelValue': onUpdateModelValue,
      },
      attachTo: document.body,
      global: {
        provide: {
          [localeInjectKey as symbol]: ref({
            langService: { td: () => ({ horizonWeb: ZhCN.horizonWeb }) },
          }),
        },
      },
    });
    await nextTick();
    const input = document.body.querySelector<HTMLInputElement>('#contract-upload-input')!;

    expect(input.accept).toBe('.txt');
    expect(input.multiple).toBe(true);
    expect(input.tabIndex).toBe(-1);
    expect(wrapper.props()).toMatchObject({
      action: '/upload-contract',
      header: { Authorization: 'test-token' },
      method: 'PUT',
      data: { folder: 'contracts' },
      name: 'contract-file',
      withCredentials: true,
      crossorigin: 'anonymous',
      useBuildInAcceptCheck: true,
    });

    choose(input, [
      new File([new Uint8Array(2048)], 'large.txt', { type: 'text/plain' }),
      new File(['x'], 'wrong.png', { type: 'image/png' }),
      new File(['a'], 'first.txt', { type: 'text/plain' }),
      new File(['b'], 'second.txt', { type: 'text/plain' }),
    ]);
    await vi.waitFor(() => expect(onAdd).toHaveBeenCalledOnce());

    expect(onFileSizeExceed).toHaveBeenCalledWith([expect.objectContaining({ name: 'large.txt' })]);
    expect(onAcceptError).toHaveBeenCalledWith([expect.objectContaining({ name: 'wrong.png' })]);
    expect(onExceed).toHaveBeenCalledWith(
      [
        expect.objectContaining({ name: 'first.txt' }),
        expect.objectContaining({ name: 'second.txt' }),
      ],
      [],
    );
    expect(beforeUpload).toHaveBeenCalledTimes(2);
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ name: 'first.txt' }));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'first.txt' }),
      undefined,
    );
    expect(onUpdateModelValue).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'first.txt' }),
    ]);
    wrapper.unmount();
  });

  test('renders default, icon, text, trigger, tips, uploadedFiles and scoped file slots', async () => {
    const defaults = mount(HUpload, {
      props: { action: '', type: 'button' },
      slots: { default: () => <span data-test="default">Default upload</span> },
    });
    expect(defaults.get('[data-test="default"]').text()).toBe('Default upload');
    defaults.unmount();

    const drop = mount(HUpload, {
      props: {
        action: '',
        type: 'drop',
        accept: '.png',
        fileSizeLimit: 2,
        multiple: true,
        limit: 3,
      },
      slots: {
        icon: () => <span data-test="icon">Icon</span>,
        text: () => <span data-test="text">Drop files</span>,
        tips: () => <span data-test="tips">PNG only</span>,
      },
    });
    expect(drop.get('[data-test="icon"]').text()).toBe('Icon');
    expect(drop.get('[data-test="text"]').text()).toBe('Drop files');
    expect(drop.get('[data-test="tips"]').text()).toBe('PNG only');
    drop.unmount();

    const trigger = mount(HUpload, {
      props: { action: '', type: 'gallery', galleryShape: 'square', size: 'large' },
      slots: { trigger: () => <button data-test="trigger">Choose gallery file</button> },
    });
    expect(trigger.get('[data-test="trigger"]').text()).toBe('Choose gallery file');
    expect(trigger.get('.h-upload--gallery.h-upload--gallery--square').classes()).toEqual(
      expect.arrayContaining(['h-upload--gallery--square', 'h-upload--gallery--large']),
    );
    trigger.unmount();

    const uploadedFiles = vi.fn((files?: HUploadFileType[]) => (
      <div data-test="uploaded">{files?.map(file => file.name).join(',')}</div>
    ));
    const uploaded = mount(HUpload, {
      props: { action: '', modelValue: [image], autoUpload: false },
      slots: { uploadedFiles },
    });
    await vi.waitFor(() => expect(uploaded.get('[data-test="uploaded"]').text()).toBe('photo.png'));
    expect(uploadedFiles.mock.calls[0][0]?.[0]).toEqual(
      expect.objectContaining({ name: 'photo.png' }),
    );
    uploaded.unmount();

    const fileSlot = vi.fn((file?: HUploadFileType) => (
      <article data-test="file">{file?.name}</article>
    ));
    const file = mount(HUpload, {
      props: { action: '', modelValue: [image], autoUpload: false },
      slots: { file: fileSlot },
    });
    await vi.waitFor(() => expect(file.get('[data-test="file"]').text()).toBe('photo.png'));
    expect(fileSlot.mock.calls[0][0]).toEqual(expect.objectContaining({ name: 'photo.png' }));
    file.unmount();
  });

  test('handles native drop-area drag, drop, click, tips and disabled interactions', async () => {
    const onAdd = vi.fn();
    const wrapper = mount(HUpload, {
      props: {
        action: '',
        type: 'drop',
        accept: '.png',
        fileSizeLimit: 2,
        multiple: true,
        limit: 3,
        autoUpload: false,
        onAdd,
      },
      attachTo: document.body,
      global: {
        provide: {
          [localeInjectKey as symbol]: ref({
            langService: { td: () => ({ horizonWeb: ZhCN.horizonWeb }) },
          }),
        },
      },
    });
    await nextTick();
    const input = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    const clickInput = vi.spyOn(input, 'click');
    const area = wrapper.get<HTMLElement>('.h-upload--drop-area');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['image'], 'drop.png', { type: 'image/png' }));
    expect(area.text()).toEqual(expect.stringContaining('.png'));
    expect(area.text()).toEqual(expect.stringContaining('2'));
    expect(area.text()).toEqual(expect.stringContaining('3'));
    await area.trigger('click');
    expect(clickInput).toHaveBeenCalledOnce();

    area.element.dispatchEvent(
      new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer }),
    );
    await nextTick();
    expect(area.classes()).toContain('is-drag-over');
    area.element.dispatchEvent(
      new DragEvent('dragleave', { bubbles: true, cancelable: true, dataTransfer }),
    );
    area.element.dispatchEvent(
      new DragEvent('dragend', { bubbles: true, cancelable: true, dataTransfer }),
    );
    area.element.dispatchEvent(
      new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer }),
    );
    await vi.waitFor(() =>
      expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ name: 'drop.png' })),
    );
    await vi.waitFor(() => expect(area.classes()).not.toContain('is-drag-over'));
    wrapper.unmount();

    const disabledAdd = vi.fn();
    const disabled = mount(HUpload, {
      props: {
        action: '',
        type: 'drop',
        disabled: true,
        autoUpload: false,
        onAdd: disabledAdd,
      },
      attachTo: document.body,
      global: {
        provide: {
          [localeInjectKey as symbol]: ref({
            langService: { td: () => ({ horizonWeb: ZhCN.horizonWeb }) },
          }),
        },
      },
    });
    await nextTick();
    const disabledInput = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    const disabledClick = vi.spyOn(disabledInput, 'click');
    const disabledArea = disabled.get<HTMLElement>('.h-upload--drop-area');
    disabledArea.element.dispatchEvent(
      new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer }),
    );
    disabledArea.element.dispatchEvent(
      new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer }),
    );
    await disabledArea.trigger('click');
    await nextTick();
    expect(disabledArea.classes()).toContain('is-disabled');
    expect(disabledArea.classes()).not.toContain('is-drag-over');
    expect(disabledAdd).not.toHaveBeenCalled();
    expect(disabledClick).not.toHaveBeenCalled();
    disabled.unmount();
  });

  test('opens the native picker from gallery add-file and blocks it while disabled', async () => {
    const wrapper = mount(HUpload, {
      props: { action: '', type: 'gallery', autoUpload: false },
      attachTo: document.body,
    });
    await nextTick();
    const input = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    const clickInput = vi.spyOn(input, 'click');
    await wrapper.get('.h-upload--gallery__add-file').trigger('click');
    expect(clickInput).toHaveBeenCalledOnce();
    await wrapper.setProps({ disabled: true });
    await wrapper.get('.h-upload--gallery__add-file').trigger('click');
    expect(clickInput).toHaveBeenCalledOnce();
    wrapper.unmount();
  });

  test('uses presentation props and preview/remove hooks through real file controls', async () => {
    const beforePreview = vi.fn(async () => true);
    const beforeViewerPreview = vi.fn(() => true);
    const beforeRemove = vi.fn(async () => true);
    const onPreview = vi.fn();
    const onRemove = vi.fn();
    const controls = vi.fn((): ('view' | 'delete')[] => ['view', 'delete']);
    const wrapper = mount(HUpload, {
      props: {
        action: '',
        modelValue: [image],
        autoUpload: false,
        type: 'button',
        buttonText: 'Pick attachment',
        buttonProps: { type: 'primary', plain: true },
        size: 'huge',
        fileItemSize: 'small',
        showFileList: true,
        showFileThumbnail: true,
        showFileSize: false,
        controls,
        controlsAlwaysVisible: true,
        beforePreview,
        beforeViewerPreview,
        beforeRemove,
        noUploader: false,
        showMediaWithNormalModeInGalleryMixed: false,
        onPreview,
        onRemove,
      },
      attachTo: document.body,
    });
    await vi.waitFor(() => expect(wrapper.find('.h-upload--file-item').exists()).toBe(true));

    expect(wrapper.get('.h-upload--file-list').classes()).toContain('h-upload--file-list--small');
    expect(wrapper.get('.h-upload--file-item').classes()).toContain('is-controls-always-visible');
    expect(wrapper.find('.h-upload--file-item__details--size').exists()).toBe(false);
    expect(wrapper.get('.h-upload--button button').classes()).toEqual(
      expect.arrayContaining(['h-button--large', 'h-button--primary', 'h-button--plain']),
    );
    expect(wrapper.get('.h-upload--button').text()).toContain('Pick attachment');
    expect(controls).toHaveBeenCalledWith(expect.objectContaining({ name: 'photo.png' }));
    expect(beforeViewerPreview).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'photo.png' }),
    );

    await wrapper.get('.h-upload--file-item__preview--preview-icon').trigger('click');
    await vi.waitFor(() => expect(onPreview).toHaveBeenCalled());
    expect(beforePreview).toHaveBeenCalledWith(expect.objectContaining({ name: 'photo.png' }));

    const deleteControl = wrapper
      .findAll('[data-command]')
      .find(control => control.attributes('data-command') === 'delete');
    if (deleteControl) {
      await deleteControl.trigger('click');
      await vi.waitFor(() => expect(onRemove).toHaveBeenCalled());
      expect(beforeRemove).toHaveBeenCalled();
    }
    wrapper.unmount();
  });

  test('forwards upload lifecycle status, abort hook, request adapter and exposed operations', async () => {
    const beforeAbort = vi.fn(async () => true);
    const handleSuccess = vi.fn(async () => 'https://files.test/uploaded.txt');
    const onUpload = vi.fn();
    const onUploading = vi.fn();
    const onUploaded = vi.fn();
    const onPause = vi.fn();
    const onFail = vi.fn();
    const onRetry = vi.fn();
    const request = vi.fn((file: HUploadFileType, methods: HUploadHttpRequestInstanceMethods) => {
      methods.addUploadingQueue(file, { abort: vi.fn() });
      methods.setStatus(file, HUploadFileStatusEnum.Uploading, {
        progress: 45.678,
        response: { phase: 'chunk' },
      });
    });
    const wrapper = mount(HUpload, {
      props: {
        action: '/custom',
        autoUpload: false,
        httpRequest: request,
        beforeAbort,
        handleSuccess,
        maxUploadsAmountAtSameTime: 2,
        multipart: false,
        multipartChunkSize: 4,
        multipartMaxAmountUploadingAtSameTime: 3,
        onUpload,
        onUploading,
        onUploaded,
        onPause,
        onFail,
        onRetry,
      },
      attachTo: document.body,
    });
    await nextTick();
    const component = wrapper.vm as unknown as UploadExposes;
    const raw = new File(['upload'], 'upload.txt', { type: 'text/plain' });

    await component.upload([raw]);
    await vi.waitFor(() => expect(onUploading).toHaveBeenCalled());
    const file = request.mock.calls[0][0];
    expect(onUpload).toHaveBeenCalledWith(file);
    expect(onUploading).toHaveBeenCalledWith(file, 45.68, { phase: 'chunk' });

    await component.abort([file]);
    await vi.waitFor(() => expect(onPause).toHaveBeenCalledWith(file));
    expect(beforeAbort).toHaveBeenCalledWith(file);

    const methods = request.mock.calls[0][1];
    methods.onUploadSuccess(file, JSON.stringify({ url: 'https://response.test/file.txt' }));
    await vi.waitFor(() => expect(onUploaded).toHaveBeenCalled());
    expect(handleSuccess).toHaveBeenCalled();
    expect(onUploaded).toHaveBeenCalledWith(file, {
      url: 'https://response.test/file.txt',
    });

    methods.onUploadFail(file, 'network failed', JSON.stringify({ code: 500 }));
    await vi.waitFor(() =>
      expect(onFail).toHaveBeenCalledWith(file, 'network failed', { code: 500 }),
    );
    expect(onRetry).not.toHaveBeenCalled();

    component.clearFiles([HUploadFileStatusEnum.Fail]);
    component.handleRemove();
    component.destroyBackgroundUploader();
    wrapper.unmount();
  });

  test('controls UploadBackground collapse/close and honors standalone teleport styling', async () => {
    const onUpdateCollapsed = vi.fn();
    const onClose = vi.fn();
    const wrapper = mount(UploadBackground, {
      props: {
        id: 'direct-background',
        collapsed: false,
        closable: true,
        'onUpdate:collapsed': onUpdateCollapsed,
        onClose,
      },
      attachTo: document.body,
    });
    expect(wrapper.get('.h-upload--background').classes()).not.toContain('is-collapsed');
    expect(wrapper.findAll('.h-upload--background__header--control')).toHaveLength(2);

    await wrapper.get('.h-upload--background__header--collapse-button').trigger('click');
    expect(wrapper.get('.h-upload--background').classes()).toContain('is-collapsed');
    expect(onUpdateCollapsed).toHaveBeenCalledWith(true);

    await wrapper
      .findAll('.h-upload--background__header--control')
      .at(1)!
      .get('button')
      .trigger('click');
    expect(onClose).toHaveBeenCalledOnce();
    expect(wrapper.get('.h-upload--background').attributes('style')).toContain('display: none');
    wrapper.unmount();

    const target = document.createElement('section');
    target.id = 'background-contract-target';
    document.body.append(target);
    const created = createBackgroundUploadInstance({
      id: 'standalone-background',
      action: '',
      useBackground: true,
      backgroundStandalone: true,
      backgroundTeleportTo: target,
      backgroundStyle: { color: 'rgb(4, 5, 6)' },
      backgroundClass: 'background-contract-class',
    });
    await nextTick();
    const teleported = target.querySelector<HTMLElement>('.h-upload--background')!;
    expect(teleported.classList).toContain('background-contract-class');
    expect(teleported.style.color).toBe('rgb(4, 5, 6)');
    created.instance.switchVisible(false);
    await nextTick();
    expect(teleported.style.display).toBe('none');
    destroyBackgroundUploadInstance('standalone-background', created.index);
    target.remove();
  });

  test('routes background visibility events by id, reuses singleton mode and falls back to body', async () => {
    destroyBackgroundUploadInstance('empty', null);
    const destroyed = vi.fn();
    window.addEventListener('backgroundUploadDestroy', destroyed);
    const first = createBackgroundUploadInstance({
      id: 'shared-background',
      action: '',
      useBackground: true,
      backgroundTeleportTo: '#missing-background-target',
    });
    const reused = createBackgroundUploadInstance({
      id: 'ignored-second-background',
      action: '',
      useBackground: true,
    });
    await nextTick();
    expect(reused.instance).toBe(first.instance);
    const element = document.body.querySelector<HTMLElement>('.h-upload--background')!;

    window.dispatchEvent(
      new CustomEvent('switchBackgroundUploadVisible', {
        detail: { id: 'shared-background', visible: false },
      }),
    );
    await nextTick();
    expect(element.style.display).toBe('none');
    window.dispatchEvent(
      new CustomEvent('switchBackgroundUploadVisible', {
        detail: { id: 'unknown-background', visible: true },
      }),
    );
    await nextTick();
    expect(element.style.display).not.toBe('none');

    destroyBackgroundUploadInstance('shared-background', first.index);
    expect(destroyed).toHaveBeenCalled();
    window.removeEventListener('backgroundUploadDestroy', destroyed);
  });

  test('renders every gallery file state and exposes its state-specific controls', async () => {
    const files = [
      contractFile('success.png', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Image),
      contractFile('movie.mp4', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Video, {
        duration: 65,
      }),
      contractFile('report.pdf', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Unknown),
      contractFile('failed', HUploadFileStatusEnum.Fail, HUploadFileTypeEnum.Unknown),
      contractFile('failed.pdf', HUploadFileStatusEnum.Fail, HUploadFileTypeEnum.Unknown),
      contractFile('uploading.zip', HUploadFileStatusEnum.Uploading, HUploadFileTypeEnum.Unknown, {
        percentage: 38,
      }),
      contractFile('pending.zip', HUploadFileStatusEnum.Pending, HUploadFileTypeEnum.Unknown),
      contractFile('paused.zip', HUploadFileStatusEnum.Pause, HUploadFileTypeEnum.Unknown),
    ];
    const beforePreview = vi.fn(async () => true);
    const onPreview = vi.fn();
    const wrapper = mount(HUpload, {
      props: {
        action: '',
        type: 'gallery',
        multiple: true,
        size: 'large',
        galleryShape: 'rectangle',
        modelValue: files,
        autoUpload: false,
        controls: ['view', 'delete', 'upload'],
        controlsAlwaysVisible: true,
        beforePreview,
        onPreview,
        crossorigin: 'anonymous',
      },
      attachTo: document.body,
    });
    await vi.waitFor(() =>
      expect(
        wrapper.findAll('.h-upload--gallery__item > .h-upload--gallery__item--inner'),
      ).toHaveLength(files.length),
    );

    expect(wrapper.get('.h-upload--gallery__item--success-image img').attributes()).toMatchObject({
      crossorigin: 'anonymous',
      alt: 'success.png',
    });
    expect(wrapper.get('.h-upload--gallery__item--duration').text()).toContain('01:05');
    expect(wrapper.find('.h-upload--gallery__item--success-other-file').exists()).toBe(true);
    expect(wrapper.findAll('.h-upload--gallery__item--error-name').map(item => item.text())).toEqual([
      'failed',
      'failed.pdf',
    ]);
    expect(wrapper.find('.h-upload--gallery__item--uploading-progress').exists()).toBe(true);
    expect(wrapper.find('.h-upload--gallery__item--others').exists()).toBe(true);

    const controls = wrapper.findAllComponents({ name: 'HControls' });
    expect(controls).toHaveLength(files.length);
    expect(controls.flatMap(control => control.props('accessList'))).toEqual(
      expect.arrayContaining(['view', 'delete', 'start', 'retry', 'stop', 'continue']),
    );
    controls[0].vm.$emit('command', 'view', new MouseEvent('click'));
    await vi.waitFor(() => expect(onPreview).toHaveBeenCalled());
    expect(beforePreview).toHaveBeenCalledWith(expect.objectContaining({ name: 'success.png' }));
    controls[3].vm.$emit('command', 'retry', new MouseEvent('click'));
    controls[2].vm.$emit('command', 'delete', new MouseEvent('click'));
    controls[4].vm.$emit('command', 'stop', new MouseEvent('click'));
    controls[4].vm.$emit('command', 'pause', new MouseEvent('click'));
    controls[5].vm.$emit('command', 'start', new MouseEvent('click'));
    controls[6].vm.$emit('command', 'continue', new MouseEvent('click'));
    await nextTick();
    wrapper.unmount();
  });

  test.each([
    ['small', 'medium'],
    ['medium', 'large'],
    ['large', 'huge'],
    ['huge', 'gigantic'],
  ] as const)(
    'maps gallery-mixed %s media and file rows to %s normal sizes',
    async (size, rowSize) => {
      const wrapper = mount(HUpload, {
        props: {
          action: '',
          type: 'gallery-mixed',
          multiple: true,
          size,
          galleryShape: 'square',
          autoUpload: false,
          showMediaWithNormalModeInGalleryMixed: false,
          modelValue: [
            contractFile('photo.png', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Image),
            contractFile('notes.pdf', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Unknown),
          ],
        },
      });
      await vi.waitFor(() => expect(wrapper.find('.h-upload--gallery__item').exists()).toBe(true));
      expect(wrapper.find('.h-upload--file-item').classes()).toContain(
        `h-upload--file-item--${rowSize}`,
      );
      wrapper.unmount();
    },
  );

  test('renders UploadBackground status summaries for uploading, pending, success and failure mixes', async () => {
    const wrapper = mount(UploadBackground, {
      props: { id: 'status-background', collapsed: false, closable: false },
      attachTo: document.body,
      global: {
        provide: {
          [localeInjectKey as symbol]: ref({
            langService: { td: () => ({ horizonWeb: ZhCN.horizonWeb }) },
          }),
        },
      },
    });
    const component = wrapper.vm as unknown as UploadExposes & {
      addFile(file: HUploadFileType): void;
      removeFile(file: HUploadFileType): void;
    };
    const status = () => wrapper.get('.h-upload--background__header--status').text();
    const subInfo = () => wrapper.get('.h-upload--background__body--upload-status').text();
    const initialStatus = status();

    const uploading = contractFile(
      'uploading.bin',
      HUploadFileStatusEnum.Uploading,
      HUploadFileTypeEnum.Unknown,
    );
    component.addFile(uploading);
    await vi.waitFor(() => expect(subInfo()).not.toBe(''));
    expect(status()).not.toBe(initialStatus);
    const uploadingStatus = status();

    component.removeFile(uploading);
    const pending = contractFile(
      'pending.bin',
      HUploadFileStatusEnum.Pending,
      HUploadFileTypeEnum.Unknown,
    );
    component.addFile(pending);
    await vi.waitFor(() => expect(status()).not.toBe(uploadingStatus));
    const pendingStatus = status();

    component.removeFile(pending);
    const success = contractFile(
      'success.bin',
      HUploadFileStatusEnum.Success,
      HUploadFileTypeEnum.Unknown,
    );
    component.addFile(success);
    await vi.waitFor(() => expect(status()).not.toBe(pendingStatus));
    const successStatus = status();

    const failed = contractFile(
      'failed.bin',
      HUploadFileStatusEnum.Fail,
      HUploadFileTypeEnum.Unknown,
    );
    component.addFile(failed);
    await vi.waitFor(() => expect(status()).not.toBe(successStatus));
    const mixedStatus = status();
    component.removeFile(success);
    await vi.waitFor(() => expect(status()).not.toBe(mixedStatus));
    expect(subInfo()).not.toBe('');
    wrapper.unmount();
  });

  test('validates every emit and guarded prop payload', () => {
    const file = {
      name: 'contract.txt',
      percentage: 0,
      status: HUploadFileStatusEnum.New,
      type: 'unknown',
      size: 1,
      uuid: 'contract',
      url: '',
    } as HUploadFileType;
    expect(useUploadEmits['update:modelValue']([file])).toBe(true);
    expect(useUploadEmits['update:useBackground'](true)).toBe(true);
    expect(useUploadEmits['update:useBackground']('popover')).toBe(true);
    expect(useUploadEmits.preview(file)).toBe(true);
    expect(useUploadEmits.change(file)).toBe(true);
    expect(useUploadEmits.add(file)).toBe(true);
    expect(useUploadEmits.upload(file)).toBe(true);
    expect(useUploadEmits.remove(file)).toBe(true);
    expect(useUploadEmits.uploading(file, 20, undefined)).toBe(true);
    expect(useUploadEmits.uploaded(file, {})).toBe(true);
    expect(useUploadEmits.pause(file)).toBe(true);
    expect(useUploadEmits.continue(file)).toBe(true);
    expect(useUploadEmits.retry(file)).toBe(true);
    expect(useUploadEmits.fail(file, 'failed', undefined)).toBe(true);
    expect(useUploadEmits.exceed([file], [])).toBe(true);
    expect(useUploadEmits.fileSizeExceed([file])).toBe(true);
    expect(useUploadEmits.acceptError([file])).toBe(true);
    expect(useUploadEmits.uploading(file, '20' as never, undefined)).toBe(false);
    expect(useUploadEmits['update:modelValue'](file as never)).toBe(false);
    expect(useUploadEmits['update:useBackground']('invalid' as never)).toBe(false);
    expect(useUploadEmits.preview({} as never)).toBe(false);
    expect(useUploadEmits.change({} as never)).toBe(false);
    expect(useUploadEmits.uploading(file, 20, 'response' as never)).toBe(false);
    expect(useUploadEmits.uploaded(file, undefined as never)).toBe(false);
    expect(useUploadEmits.fail(file, 500 as never, undefined)).toBe(false);
    expect(useUploadEmits.exceed(file as never, [])).toBe(false);

    expect(useUploadBackgroundEmits['update:collapsed'](true)).toBe(true);
    expect(useUploadBackgroundEmits['update:collapsed']('true' as never)).toBe(false);
    expect(useUploadBackgroundEmits.close()).toBe(true);
    expect(useUploadBackgroundEmits.destroy()).toBe(true);
    expect(useUploadBackgroundEmits.preview(file)).toBe(true);
    expect(useUploadBackgroundEmits.change(file, undefined)).toBe(true);
    expect(useUploadBackgroundEmits.add(file)).toBe(true);
    expect(useUploadBackgroundEmits.upload(file)).toBe(true);
    expect(useUploadBackgroundEmits.remove(file)).toBe(true);
    expect(useUploadBackgroundEmits.uploading(file, 10, {})).toBe(true);
    expect(useUploadBackgroundEmits.uploaded(file, {})).toBe(true);
    expect(useUploadBackgroundEmits.pause(file)).toBe(true);
    expect(useUploadBackgroundEmits.continue(file)).toBe(true);
    expect(useUploadBackgroundEmits.retry(file)).toBe(true);
    expect(useUploadBackgroundEmits.fail(file, 'failed', undefined)).toBe(true);
    expect(useUploadBackgroundEmits.preview({} as never)).toBe(false);
    expect(useUploadBackgroundEmits.uploading(file, '10' as never, {})).toBe(false);
    expect(useUploadBackgroundEmits.fail(file, 500 as never, undefined)).toBe(false);

    expect(useUploadProps.multipart.validator(false)).toBe(true);
    expect(useUploadProps.multipart.validator({})).toBe(true);
    expect(useUploadProps.multipart.validator(true)).toBe(false);
    expect(useUploadProps.multipartChunkSize.validator(1)).toBe(true);
    expect(useUploadProps.multipartChunkSize.validator(1024)).toBe(true);
    expect(useUploadProps.multipartChunkSize.validator(0)).toBe(false);
    expect(useUploadProps.multipartChunkSize.validator('2' as never)).toBe(false);
  });

  test('handles clipboard files, ignored clipboard entries and disabled paste state', async () => {
    const pasted = new File(['clipboard'], 'clipboard.txt', { type: 'text/plain' });
    const beforePaste = vi.fn(async (files: File[]) => files);
    const onAdd = vi.fn();
    const wrapper = mount(HUpload, {
      props: {
        action: '',
        autoUpload: false,
        useClipboard: false,
        beforePaste,
        onAdd,
      },
      attachTo: document.body,
    });
    await wrapper.setProps({ useClipboard: true });

    document.dispatchEvent(new Event('paste'));
    const emptyPaste = new Event('paste') as ClipboardEvent;
    Object.defineProperty(emptyPaste, 'clipboardData', {
      configurable: true,
      value: { items: [{ kind: 'string', getAsFile: () => null }] },
    });
    document.dispatchEvent(emptyPaste);
    await nextTick();
    expect(onAdd).not.toHaveBeenCalled();

    const paste = new Event('paste') as ClipboardEvent;
    Object.defineProperty(paste, 'clipboardData', {
      configurable: true,
      value: {
        items: [
          { kind: 'string', getAsFile: () => null },
          { kind: 'file', getAsFile: () => null },
          { kind: 'file', getAsFile: () => pasted },
        ],
      },
    });
    document.dispatchEvent(paste);
    await vi.waitFor(() =>
      expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ name: 'clipboard.txt' })),
    );
    expect(beforePaste).toHaveBeenCalledWith([pasted]);

    await wrapper.setProps({ beforePaste: undefined });
    document.dispatchEvent(paste);
    await vi.waitFor(() => expect(onAdd).toHaveBeenCalledTimes(2));

    await wrapper.setProps({ disabled: true });
    document.dispatchEvent(paste);
    await nextTick();
    expect(onAdd).toHaveBeenCalledTimes(2);

    await wrapper.setProps({ useClipboard: false });
    document.dispatchEvent(paste);
    await nextTick();
    expect(onAdd).toHaveBeenCalledTimes(2);
    wrapper.unmount();
  });

  test('renders file-row thumbnail/status/size fallbacks and honors a canceled preview', async () => {
    const beforePreview = vi.fn(async () => false);
    const onPreview = vi.fn();
    const files = [
      contractFile('image', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Image, {
        url: '',
        blobUrl: 'blob:image-preview',
      }),
      contractFile('movie.mp4', HUploadFileStatusEnum.Pause, HUploadFileTypeEnum.Video, {
        url: '',
        posterUrl: 'blob:video-poster',
        percentage: 48,
      }),
      contractFile('failed', HUploadFileStatusEnum.Fail, HUploadFileTypeEnum.Unknown),
    ];
    const wrapper = mount(HUpload, {
      props: {
        action: '',
        autoUpload: false,
        multiple: true,
        modelValue: files,
        fileItemSize: 'small',
        showFileThumbnail: true,
        showFileSize: true,
        controls: ['view'],
        beforePreview,
        onPreview,
      },
      attachTo: document.body,
    });
    await vi.waitFor(() => expect(wrapper.findAll('.h-upload--file-item')).toHaveLength(3));

    expect(wrapper.get('img[alt="file thumbnail"]').attributes('src')).toBe('blob:image-preview');
    expect(wrapper.get('video').attributes('src')).toBe('blob:video-poster');
    expect(wrapper.findAll('.h-upload--file-item__details--size')).toHaveLength(3);
    expect(wrapper.find('.h-upload--file-item__details--progress').exists()).toBe(true);
    expect(wrapper.find('.h-upload--file-item__details--file-ext-name').text()).toBe('');
    await wrapper.get('.h-upload--file-item__preview--preview-icon').trigger('click');
    await nextTick();
    expect(beforePreview).toHaveBeenCalled();
    expect(onPreview).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  test.each([
    ['small', 'video-small.mp4', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Video],
    ['medium', 'pending', HUploadFileStatusEnum.Pending, HUploadFileTypeEnum.Unknown],
    ['huge', 'video.mp4', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Video],
  ] as const)('renders %s square gallery edge state for %s', async (size, name, status, type) => {
    const wrapper = mount(HUpload, {
      props: {
        action: '',
        type: 'gallery',
        size,
        galleryShape: 'square',
        autoUpload: false,
        modelValue: [
          contractFile(name, status, type, {
            duration: 65,
            size: 0,
          }),
        ],
      },
    });
    await vi.waitFor(() => expect(wrapper.find('.h-upload--gallery__item').exists()).toBe(true));
    if (type === HUploadFileTypeEnum.Video) {
      const duration = wrapper.get('.h-upload--gallery__item--duration').text();
      if (size === 'small') {
        expect(duration).not.toContain('01:05');
      } else {
        expect(duration).toContain('01:05');
      }
    }
    wrapper.unmount();
  });

  test('drops safely without DataTransfer files and covers background event/body defaults', async () => {
    const onAdd = vi.fn();
    const drop = mount(HUpload, {
      props: { action: '', type: 'drop', autoUpload: false, onAdd },
    });
    await drop.get('.h-upload--drop-area').trigger('drop');
    expect(onAdd).not.toHaveBeenCalled();
    drop.unmount();

    const created = createBackgroundUploadInstance({
      action: '',
      useBackground: true,
    });
    await nextTick();
    expect(document.body.querySelector('.h-upload--background')).not.toBeNull();
    window.dispatchEvent(
      new CustomEvent('switchBackgroundUploadVisible', { detail: { visible: false } }),
    );
    await nextTick();
    destroyBackgroundUploadInstance(undefined, created.index);
  });

  test('maps every file-control status and previews non-media files through the browser fallback', async () => {
    const helper = new UploadFileHelper();
    const openViewer = vi.fn();
    const openWindow = vi.spyOn(window, 'open').mockImplementation(() => null);
    const file = contractFile(
      'archive.bin',
      HUploadFileStatusEnum.Success,
      HUploadFileTypeEnum.Unknown,
      { url: '', blobUrl: 'blob:archive' },
    );
    const wrapper = mount(UploadItemControls, {
      props: {
        file,
        theme: 'dark',
        multipart: false,
        uploadFileHelper: helper,
      },
      global: {
        provide: {
          [HUploadOpenViewerInjectKey as symbol]: openViewer,
        },
      },
    });
    const controls = wrapper.findComponent({ name: 'HControls' });
    expect(controls.props('accessList')).toEqual(['view', 'delete']);

    controls.vm.$emit('command', 'view');
    await vi.waitFor(() => expect(openWindow).toHaveBeenCalledWith('blob:archive'));
    expect(openViewer).not.toHaveBeenCalled();

    const cases = [
      [HUploadFileStatusEnum.Fail, false, 'retry'],
      [HUploadFileStatusEnum.Canceling, false, 'retry'],
      [HUploadFileStatusEnum.Canceled, false, 'retry'],
      [HUploadFileStatusEnum.New, false, 'start'],
      [HUploadFileStatusEnum.Pending, false, 'start'],
      [HUploadFileStatusEnum.Pause, false, 'continue'],
      [HUploadFileStatusEnum.Retrying, false, 'stop'],
      [HUploadFileStatusEnum.Uploading, false, 'stop'],
      [HUploadFileStatusEnum.Retrying, true, 'pause'],
      [HUploadFileStatusEnum.Uploading, true, 'pause'],
    ] as const;
    for (const [status, multipart, expected] of cases) {
      await wrapper.setProps({
        file: contractFile(`${status}.bin`, status, HUploadFileTypeEnum.Unknown),
        multipart: multipart ? { handleMerge: () => undefined } : false,
        controls: ['upload'],
      });
      expect(controls.props('accessList')).toContain(expected);
    }

    await wrapper.setProps({
      file: contractFile('blocked.png', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Image),
      multipart: false,
      controls: ['view'],
      beforePreview: () => false,
    });
    controls.vm.$emit('command', 'view');
    await nextTick();
    expect(openViewer).not.toHaveBeenCalled();
    wrapper.unmount();
    helper.dispose();
  });

  test('covers file-row no-thumbnail and video blob preview branches', async () => {
    const helper = new UploadFileHelper();
    const openViewer = vi.fn();
    const onPreview = vi.fn();
    helper.eventEmitter.on('preview', onPreview);
    const plain = contractFile(
      'plain.txt',
      HUploadFileStatusEnum.New,
      HUploadFileTypeEnum.Unknown,
    );
    const wrapper = mount(UploadFileItem, {
      props: {
        file: plain,
        multipart: false,
        size: 'gigantic',
        showFileThumbnail: false,
      },
      global: {
        provide: {
          [HUploadUploadFileHelperInjectKey as symbol]: helper,
          [HUploadOpenViewerInjectKey as symbol]: openViewer,
        },
      },
    });
    await wrapper.get('.h-upload--file-item__preview--preview-icon').trigger('click');
    expect(onPreview).not.toHaveBeenCalled();

    const video = contractFile(
      'clip.mp4',
      HUploadFileStatusEnum.Pause,
      HUploadFileTypeEnum.Video,
      { url: '', posterUrl: '', blobUrl: 'blob:clip', percentage: 25 },
    );
    await wrapper.setProps({ file: video, showFileThumbnail: true, beforePreview: undefined });
    expect(wrapper.get('video').attributes('src')).toBe('blob:clip');
    await wrapper.get('.h-upload--file-item__preview--preview-icon').trigger('click');
    await vi.waitFor(() => expect(onPreview).toHaveBeenCalledWith(video));
    expect(openViewer).toHaveBeenCalledWith(video);
    wrapper.unmount();
    helper.dispose();
  });

  test('covers no-uploader rendering, empty exposed arguments and background lifecycle toggles', async () => {
    const wrapper = mount(HUpload, {
      props: {
        id: 'branch-background-upload',
        action: '',
        noUploader: true,
        autoUpload: false,
        backgroundStandalone: true,
        modelValue: [image],
      },
      attachTo: document.body,
    });
    await vi.waitFor(() => expect(wrapper.find('.h-upload--file-item').exists()).toBe(true));
    expect(wrapper.find('.h-upload__trigger').exists()).toBe(false);
    const component = wrapper.vm as unknown as UploadExposes;
    component.clearFiles([]);
    component.handleRemove([]);
    component.handleSelect();
    await component.abort();
    expect(wrapper.find('.h-upload--file-item').exists()).toBe(true);
    component.handleRemove([image]);
    await vi.waitFor(() => expect(wrapper.find('.h-upload--file-item').exists()).toBe(false));
    component.clearFiles();
    const raw = new File(['raw'], 'raw.txt');
    await component.upload([raw]);
    component.handleRemove([raw]);

    await wrapper.setProps({ useBackground: true });
    await nextTick();
    await wrapper.setProps({ useBackground: false });
    component.destroyBackgroundUploader();
    await wrapper.setProps({ useBackground: true });
    await nextTick();
    component.destroyBackgroundUploader();
    wrapper.unmount();
  });

  test('forwards every UploadBackground helper event and filters viewer sources', async () => {
    const listeners = {
      preview: vi.fn(),
      add: vi.fn(),
      upload: vi.fn(),
      uploading: vi.fn(),
      uploaded: vi.fn(),
      pause: vi.fn(),
      continue: vi.fn(),
      retry: vi.fn(),
      fail: vi.fn(),
    };
    const beforeViewerPreview = vi.fn((file: HUploadFileType) => file.name !== 'blocked.png');
    const wrapper = mount(UploadBackground, {
      props: {
        id: 'background-events',
        uploadProps: { beforeViewerPreview } as unknown as UploadProps,
        onPreview: listeners.preview,
        onAdd: listeners.add,
        onUpload: listeners.upload,
        onUploading: listeners.uploading,
        onUploaded: listeners.uploaded,
        onPause: listeners.pause,
        onContinue: listeners.continue,
        onRetry: listeners.retry,
        onFail: listeners.fail,
      },
      attachTo: document.body,
      global: {
        provide: {
          [localeInjectKey as symbol]: ref({
            langService: { td: () => ({ horizonWeb: ZhCN.horizonWeb }) },
          }),
        },
      },
    });
    const component = wrapper.vm as unknown as {
      addFile(file: HUploadFileType | HUploadFileType[]): void;
    };
    const allowed = contractFile(
      'allowed.png',
      HUploadFileStatusEnum.Success,
      HUploadFileTypeEnum.Image,
    );
    const blocked = contractFile(
      'blocked.png',
      HUploadFileStatusEnum.Success,
      HUploadFileTypeEnum.Image,
      { size: undefined },
    );
    const video = contractFile(
      'allowed.mp4',
      HUploadFileStatusEnum.Success,
      HUploadFileTypeEnum.Video,
      { url: '', posterUrl: '', blobUrl: 'blob:allowed-video' },
    );
    component.addFile([allowed, blocked, video]);
    await vi.waitFor(() => expect(wrapper.findAllComponents(UploadFileItem)).toHaveLength(3));
    const helper = wrapper
      .findComponent(UploadItemControls)
      .props('uploadFileHelper') as UploadFileHelper;
    helper.eventEmitter.emit('preview', allowed);
    helper.eventEmitter.emit('add', allowed);
    helper.eventEmitter.emit('upload', allowed);
    helper.eventEmitter.emit('uploading', allowed, 50, undefined);
    helper.eventEmitter.emit('uploaded', allowed, { url: allowed.url });
    helper.eventEmitter.emit('pause', allowed);
    helper.eventEmitter.emit('continue', allowed);
    helper.eventEmitter.emit('retry', allowed);
    helper.eventEmitter.emit('fail', allowed, 'failed', undefined);
    await nextTick();

    expect(listeners.preview).toHaveBeenCalledWith(allowed);
    expect(listeners.add).toHaveBeenCalledWith(allowed);
    expect(listeners.upload).toHaveBeenCalledWith(allowed);
    expect(listeners.uploading).toHaveBeenCalledWith(allowed, 50, undefined);
    expect(listeners.uploaded).toHaveBeenCalledWith(allowed, { url: allowed.url });
    expect(listeners.pause).toHaveBeenCalledWith(allowed);
    expect(listeners.continue).toHaveBeenCalledWith(allowed);
    expect(listeners.retry).toHaveBeenCalledWith(allowed);
    expect(listeners.fail).toHaveBeenCalledWith(allowed, 'failed', undefined);
    expect(beforeViewerPreview).toHaveBeenCalledWith(allowed);
    expect(beforeViewerPreview).toHaveBeenCalledWith(blocked);
    const viewer = wrapper.getComponent({ name: 'HViewer' });
    expect(viewer.props('sources')).toHaveLength(2);
    expect(viewer.props('sources')[1]).toMatchObject({
      cover: 'blob:allowed-video',
      videoSources: [{ src: 'blob:allowed-video', type: 'video/mp4' }],
    });
    wrapper
      .findAllComponents({ name: 'HControls' })[0]
      .vm.$emit('command', 'view', new Event('click'));
    await vi.waitFor(() => expect(viewer.props('modelValue')).toBe(true));
    viewer.vm.$emit('update:modelValue', false);
    await nextTick();
    expect(viewer.props('modelValue')).toBe(false);

    await wrapper.setProps({ uploadProps: {} as unknown as UploadProps });
    expect(viewer.props('sources')).toHaveLength(3);
    wrapper.unmount();
  });

  test('keeps the viewer closed when an otherwise previewable file is filtered out', async () => {
    const wrapper = mount(HUpload, {
      props: {
        action: '',
        autoUpload: false,
        modelValue: [image],
        showFileThumbnail: true,
        beforeViewerPreview: () => false,
      },
    });
    await vi.waitFor(() => expect(wrapper.find('img[alt="file thumbnail"]').exists()).toBe(true));
    await wrapper.get('.h-upload--file-item__preview--preview-icon').trigger('click');
    await nextTick();
    expect(wrapper.getComponent({ name: 'HViewer' }).props('modelValue')).toBe(false);
    wrapper.unmount();
  });

  test('opens the native picker from the button trigger', async () => {
    const wrapper = mount(HUpload, {
      props: { action: '', type: 'button', autoUpload: false },
      attachTo: document.body,
    });
    await nextTick();
    const input = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    const clickInput = vi.spyOn(input, 'click');
    await wrapper.get('.h-upload--button button').trigger('click');
    expect(clickInput).toHaveBeenCalledOnce();
    wrapper.unmount();
  });

  test('leaves gallery-mixed row height unset for rectangle layouts', async () => {
    const wrapper = mount(HUpload, {
      props: {
        action: '',
        type: 'gallery-mixed',
        galleryShape: 'rectangle',
        size: 'medium',
        autoUpload: false,
        modelValue: [
          contractFile('row.pdf', HUploadFileStatusEnum.Success, HUploadFileTypeEnum.Unknown),
        ],
      },
    });
    await vi.waitFor(() => expect(wrapper.find('.h-upload--file-item').exists()).toBe(true));
    expect((wrapper.get('.h-upload--file-item').element as HTMLElement).style.height).toBe('');
    wrapper.unmount();
  });
});
