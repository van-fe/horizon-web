import { afterEach, describe, expect, test, vi } from 'vitest';
import { reactive, toRaw, toRefs } from 'vue';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../src/composables/useProps';
import type {
  HUploadChunk,
  HUploadPartRequestOptions,
} from '../src/composables/useMultipartUpload';
import UploadFileHelper from '../src/utils/UploadFileHelper';
import {
  HUploadFileStatusEnum,
  HUploadFileTypeEnum,
  type HUploadFileType,
} from '../src/utils/fileDefines';

class DirectUploadXHR {
  static instances: DirectUploadXHR[] = [];
  readonly upload = new EventTarget();
  readyState = 0;
  status = 0;
  response = '';
  responseText = '';
  withCredentials = false;
  onreadystatechange: null | (() => void) = null;
  onerror: null | (() => void) = null;
  open = vi.fn();
  setRequestHeader = vi.fn();
  send = vi.fn();
  abort = vi.fn();
  constructor() {
    DirectUploadXHR.instances.push(this);
  }
  progress(loaded: number, total: number) {
    const event = new Event('progress');
    Object.defineProperties(event, { loaded: { value: loaded }, total: { value: total } });
    this.upload.dispatchEvent(event);
  }
  respond(status: number, response: string, responseText = response) {
    this.status = status;
    this.response = response;
    this.responseText = responseText;
    this.readyState = XMLHttpRequest.DONE;
    this.onreadystatechange?.();
  }
}

function createHelper(props: Partial<UploadProps> = {}) {
  const values: Record<string, unknown> = {
    multiple: false,
    autoUpload: false,
    ...props,
  };
  return new UploadFileHelper(toRefs(reactive(values)) as unknown as ToRefs<Partial<UploadProps>>);
}

describe('UploadFileHelper resource lifecycle', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('releases a removed multipart helper so the same file can initialize again', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:owned-file');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const initUpload = vi.fn(() => ({ uploadId: 'upload-id' }));
    const helper = createHelper({
      autoUpload: true,
      multipartChunkSize: 1,
      multipart: {
        initUpload,
        uploadPart: () => new Promise(() => undefined),
        handleMerge: () => undefined,
      },
    });

    await helper.addFiles(new File(['part'], 'part.bin'));
    await vi.waitFor(() => expect(initUpload).toHaveBeenCalledOnce());
    const file = [...helper.fileList.value][0];

    await helper.removeFile([file], false);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:owned-file');

    file.status = HUploadFileStatusEnum.New;
    await helper.addFiles(file);
    await vi.waitFor(() => expect(initUpload).toHaveBeenCalledTimes(2));
    helper.dispose();
  });

  test('revokes object URLs created for files rejected before insertion', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:rejected-file');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const helper = createHelper({ beforeUpload: () => false });

    await helper.addFiles(new File(['rejected'], 'rejected.bin'));

    expect(helper.fileList.value.size).toBe(0);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:rejected-file');
    helper.dispose();
  });

  test('keeps a shared preview URL until its final Upload owner removes the file', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:shared-file');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const primary = createHelper();
    const background = createHelper({ multiple: true });

    await primary.addFiles(new File(['shared'], 'shared.bin'));
    const file = [...primary.fileList.value][0];
    await background.addFiles(file, false);

    await primary.removeFile([file], false);
    expect(revokeObjectURL).not.toHaveBeenCalled();

    await background.removeFile([file], false);
    expect(revokeObjectURL).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:shared-file');
    primary.dispose();
    background.dispose();
  });

  test('preserves ownership when model replacement mixes Vue proxies and raw files', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:proxy-file');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const helper = createHelper();

    await helper.addFiles(new File(['proxy'], 'proxy.bin'));
    const reactiveFile = [...helper.fileList.value][0];
    await helper.addFiles(toRaw(reactiveFile), false);

    expect(revokeObjectURL).not.toHaveBeenCalled();
    expect([...helper.fileList.value][0].blobUrl).toBe('blob:proxy-file');

    helper.dispose();
    expect(revokeObjectURL).toHaveBeenCalledOnce();
  });

  test('keeps an active upload running when only the visible file list is cleared', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:background-file');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const onAbort = vi.fn();
    const onPartStarted = vi.fn();
    const helper = createHelper({
      autoUpload: true,
      multipartChunkSize: 1,
      multipart: {
        initUpload: () => ({ uploadId: 'upload-id' }),
        uploadPart: (_file, _chunk, { signal }) =>
          new Promise((_resolve, reject) => {
            onPartStarted();
            signal.addEventListener(
              'abort',
              () => {
                onAbort();
                reject(new DOMException('Aborted', 'AbortError'));
              },
              { once: true },
            );
          }),
        handleMerge: () => undefined,
      },
    });

    await helper.addFiles(new File(['active'], 'active.bin'));
    await vi.waitFor(() => expect(onPartStarted).toHaveBeenCalledOnce());
    helper.removeAllFiles();

    expect(helper.fileList.value.size).toBe(0);
    expect(onAbort).not.toHaveBeenCalled();

    helper.dispose();
    expect(onAbort).toHaveBeenCalledOnce();
  });

  test('uploads directly with headers/data, progress and nested response URL discovery', async () => {
    DirectUploadXHR.instances = [];
    vi.stubGlobal('XMLHttpRequest', DirectUploadXHR);
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:direct');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const helper = createHelper({
      action: '/upload',
      method: 'PUT',
      name: 'asset',
      header: { Authorization: 'token', Version: 2 },
      data: { folder: 'reports' },
      withCredentials: true,
      autoUpload: true,
    });
    const uploading = vi.fn();
    const uploaded = vi.fn();
    helper.eventEmitter.on('uploading', uploading);
    helper.eventEmitter.on('uploaded', uploaded);

    await helper.addFiles(new File(['direct'], 'direct.txt', { type: 'text/plain' }));
    const xhr = DirectUploadXHR.instances[0];
    const file = [...helper.fileList.value][0];
    expect(xhr.open).toHaveBeenCalledWith('PUT', '/upload', true);
    expect(xhr.withCredentials).toBe(true);
    expect(xhr.setRequestHeader).toHaveBeenCalledWith('Authorization', 'token');
    expect(xhr.setRequestHeader).toHaveBeenCalledWith('Version', '2');
    const form = xhr.send.mock.calls[0][0] as FormData;
    expect(form.get('asset')).toBe(file.raw);
    expect(form.get('folder')).toBe('reports');

    xhr.progress(1, 4);
    expect(uploading).toHaveBeenCalledWith(file, 25, undefined);
    xhr.respond(200, JSON.stringify({ result: { location: 'https://files.test/direct.txt' } }));
    await vi.waitFor(() => expect(uploaded).toHaveBeenCalled());
    expect(file).toMatchObject({
      status: HUploadFileStatusEnum.Success,
      percentage: 100,
      url: 'https://files.test/direct.txt',
    });
    helper.dispose();
  });

  test('reports direct upload failures, pause/continue and handles XHR network errors', async () => {
    DirectUploadXHR.instances = [];
    vi.stubGlobal('XMLHttpRequest', DirectUploadXHR);
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:retry');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const helper = createHelper({ action: '/upload', autoUpload: true });
    const failed = vi.fn();
    const continued = vi.fn();
    const retried = vi.fn();
    helper.eventEmitter.on('fail', failed);
    helper.eventEmitter.on('continue', continued);
    helper.eventEmitter.on('retry', retried);

    await helper.addFiles(new File(['retry'], 'retry.txt'));
    const file = [...helper.fileList.value][0];
    DirectUploadXHR.instances[0].respond(500, '{"code":500}', 'server failed');
    await vi.waitFor(() => expect(failed).toHaveBeenCalled());
    expect(file.status).toBe(HUploadFileStatusEnum.Fail);

    helper.continueUpload(file);
    expect(continued).toHaveBeenCalledWith(file);
    expect(retried).toHaveBeenCalledWith(file);
    const retryXhr = DirectUploadXHR.instances.at(-1)!;
    helper.pauseUpload(file);
    expect(retryXhr.abort).toHaveBeenCalledOnce();
    retryXhr.responseText = 'offline';
    retryXhr.response = '{}';
    retryXhr.onerror?.();
    await vi.waitFor(() => expect(failed).toHaveBeenCalledTimes(2));
    helper.dispose();
  });

  test('covers custom input areas, invalid targets, replacement and input removal', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const helper = createHelper({ accept: '.png', multiple: true });
    expect(helper.createInputArea('#missing-upload-target')).toBe(false);
    expect(error).toHaveBeenCalled();

    const target = document.createElement('section');
    document.body.append(target);
    expect(helper.createInputArea(target)).toBe(true);
    const input = target.querySelector<HTMLInputElement>('input[type="file"]')!;
    expect(target.style.position).toBe('relative');
    expect(input.style.width).toBe('100%');
    expect(input.accept).toBe('.png');
    expect(input.multiple).toBe(true);
    expect(helper.removeInput(target)).toBe(true);
    expect(helper.removeInput(target)).toBe(false);
    expect(helper.clickInput()).toBe(true);
    helper.dispose();
    target.remove();
  });

  test('validates extension, exact MIME, wildcard MIME and all transform target forms', () => {
    const helper = createHelper({ accept: '.PNG,image/jpeg,video/*' });
    const png = new File(['png'], 'PHOTO.PNG', { type: 'image/png' });
    const jpeg = new File(['jpg'], 'photo.jpg', { type: 'image/jpeg' });
    const video = new File(['mp4'], 'movie.bin', { type: 'video/mp4' });
    const text = new File(['txt'], 'notes.txt', { type: 'text/plain' });
    expect(helper.isValidFile(helper.transformRawFileTypeToUploadFileType(png)[0])).toBe(true);
    expect(helper.isValidFile(helper.transformRawFileTypeToUploadFileType(jpeg)[0])).toBe(true);
    expect(helper.isValidFile(helper.transformRawFileTypeToUploadFileType(video)[0])).toBe(true);
    expect(helper.isValidFile(helper.transformRawFileTypeToUploadFileType(text)[0])).toBe(false);
    expect(helper.transformRawFileTypeToUploadFileType(undefined)).toEqual([]);
    expect(helper.transformRawFileTypeToUploadFileType([png, jpeg])).toHaveLength(2);
    const transfer = new DataTransfer();
    transfer.items.add(video);
    expect(helper.transformRawFileTypeToUploadFileType(transfer.files)).toHaveLength(1);
    helper.dispose();
  });

  test('honors beforeRemove and beforeAbort resolutions and rejected hooks', async () => {
    const beforeRemove = vi
      .fn()
      .mockResolvedValueOnce(false)
      .mockRejectedValueOnce(new Error('keep'))
      .mockResolvedValueOnce(true);
    const beforeAbort = vi
      .fn()
      .mockResolvedValueOnce(false)
      .mockRejectedValueOnce(new Error('keep'))
      .mockResolvedValueOnce(true);
    const helper = createHelper({ multiple: true, beforeRemove, beforeAbort });
    const files = [new File(['a'], 'a.txt'), new File(['b'], 'b.txt'), new File(['c'], 'c.txt')];
    await helper.addFiles(files);
    const uploaded = [...helper.fileList.value];
    await helper.removeFile(uploaded);
    expect(helper.fileList.value.size).toBe(2);

    await helper.abortFiles(uploaded);
    expect(uploaded[2].status).toBe(HUploadFileStatusEnum.Pause);
    helper.dispose();
  });

  test('handles default options, non-slicing limits and unconditional aborts', async () => {
    vi.spyOn(URL, 'createObjectURL').mockImplementation(file => `blob:${(file as File).name}`);
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const defaults = new UploadFileHelper();
    const unrestricted = defaults.transformRawFileTypeToUploadFileType(
      new File(['x'], 'anything.bin'),
    )[0];
    expect(defaults.isValidFile(unrestricted)).toBe(true);
    expect(defaults.createInputArea()).toBe(true);
    expect(defaults.clickInput()).toBe(true);
    defaults.dispose();

    const multiple = createHelper({ multiple: true, limit: 1, autoSliceExceedFiles: false });
    const multipleExceed = vi.fn();
    multiple.eventEmitter.on('exceed', multipleExceed);
    await multiple.addFiles([new File(['a'], 'a.txt'), new File(['b'], 'b.txt')]);
    expect(multipleExceed).toHaveBeenCalledOnce();
    expect(multiple.fileList.value.size).toBe(0);
    multiple.dispose();

    const single = createHelper({ multiple: false, autoSliceExceedFiles: false });
    const singleExceed = vi.fn();
    single.eventEmitter.on('exceed', singleExceed);
    await single.addFiles([new File(['a'], 'a.txt'), new File(['b'], 'b.txt')]);
    expect(singleExceed).toHaveBeenCalledOnce();
    expect(single.fileList.value.size).toBe(0);

    await single.addFiles(new File(['only'], 'only.txt'));
    const file = [...single.fileList.value][0];
    single.setStatus(file, HUploadFileStatusEnum.Pending);
    expect(file.percentage).toBe(0);
    await single.abortFiles(undefined, false);
    expect(file.status).toBe(HUploadFileStatusEnum.Pause);
    single.detachForBackgroundUpload();
    single.dispose();
  });

  test('recreates the native input when accept or multiple changes', async () => {
    const values = reactive<Partial<UploadProps>>({
      accept: '.png',
      multiple: false,
      autoUpload: false,
    });
    const helper = new UploadFileHelper(toRefs(values) as unknown as ToRefs<Partial<UploadProps>>);
    expect(helper.createInputArea()).toBe(true);
    const first = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    values.accept = '.jpg';
    values.multiple = true;
    await Promise.resolve();
    const current = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    expect(current).not.toBe(first);
    expect(current.accept).toBe('.jpg');
    expect(current.multiple).toBe(true);
    helper.dispose();
  });

  test('covers no-raw direct uploads and queued XHR replacement/cleanup branches', async () => {
    DirectUploadXHR.instances = [];
    vi.stubGlobal('XMLHttpRequest', DirectUploadXHR);
    const helper = createHelper({
      action: '/upload',
      autoUpload: false,
      maxUploadsAmountAtSameTime: 1,
      multiple: true,
    });
    const withoutRaw = {
      name: 'remote.txt',
      percentage: 0,
      status: HUploadFileStatusEnum.New,
      type: HUploadFileTypeEnum.Unknown,
      size: 1,
      uuid: 'remote',
      url: '',
    } as HUploadFileType;
    await helper.addFiles(withoutRaw, false);
    await helper.uploadFiles();
    expect(withoutRaw.status).toBe(HUploadFileStatusEnum.Pending);

    helper.removeAllFiles();
    await helper.addFiles([new File(['a'], 'queued-a.txt'), new File(['b'], 'queued-b.txt')]);
    await helper.uploadFiles();
    const first = DirectUploadXHR.instances[0];
    const firstFile = [...helper.fileList.value][0];
    first.onreadystatechange?.();
    first.progress(1, 2);
    first.progress(2, 2);
    first.respond(200, '');
    await vi.waitFor(() => expect(DirectUploadXHR.instances).toHaveLength(2));
    expect(firstFile.status).toBe(HUploadFileStatusEnum.Success);
    helper.dispose();
    expect(DirectUploadXHR.instances[1].abort).toHaveBeenCalled();
  });

  test('pauses and resumes an existing multipart upload helper', async () => {
    const uploadPart = vi.fn(
      (_file: HUploadFileType, _chunk: HUploadChunk, { signal }: HUploadPartRequestOptions) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        }),
    );
    const helper = createHelper({
      autoUpload: true,
      multipartChunkSize: 1,
      multipart: {
        initUpload: () => ({ uploadId: 'resume-id' }),
        uploadPart,
        handleMerge: () => undefined,
      },
    });
    await helper.addFiles(new File(['parts'], 'parts.bin'));
    await vi.waitFor(() => expect(uploadPart).toHaveBeenCalled());
    const file = [...helper.fileList.value][0];
    helper.pauseUpload(file);
    expect(file.status).toBe(HUploadFileStatusEnum.Pause);
    helper.continueUpload(file);
    await vi.waitFor(() => expect(file.status).toBe(HUploadFileStatusEnum.Retrying));
    helper.pauseUpload(file);
    helper.dispose();
  });

  test('covers duplicate additions, missing removals, size fallbacks and orphan input cleanup', async () => {
    const helper = createHelper({
      multiple: true,
      fileSizeLimit: 1,
      accept: '',
      autoUpload: false,
    });
    const remote = {
      name: 'remote.txt',
      url: 'https://files.test/remote.txt',
    };
    await helper.addFiles(remote);
    const inserted = [...helper.fileList.value][0];
    expect(inserted.size).toBeUndefined();
    expect(helper.isValidFile(inserted)).toBe(true);
    await helper.addFiles(inserted, false);
    expect(helper.fileList.value.size).toBe(1);

    await helper.removeFile([
      {
        ...inserted,
        uuid: 'missing',
        name: 'missing.txt',
      },
    ]);
    expect(helper.fileList.value.size).toBe(1);

    expect(helper.createInputArea()).toBe(true);
    const input = document.body.querySelector<HTMLInputElement>('input[type="file"]')!;
    const orphan = input.cloneNode() as HTMLInputElement;
    orphan.id = input.id;
    document.body.append(orphan);
    helper.removeInputElement();
    expect(document.body.querySelector(`input[id="${input.id}"]`)).toBeNull();
    helper.dispose();
  });

  test('returns false for every native-input creation failure and ignores an empty file selection', () => {
    const createAreaFailure = createHelper();
    vi.spyOn(createAreaFailure, 'createInputElement').mockReturnValue(false);
    expect(createAreaFailure.createInputArea(document.body)).toBe(false);
    createAreaFailure.dispose();

    const missingArea = createHelper();
    vi.spyOn(missingArea, 'createInputArea').mockReturnValue(false);
    expect(missingArea.clickInput()).toBe(false);
    missingArea.dispose();

    const target = document.createElement('section');
    document.body.append(target);
    const missingInput = createHelper();
    expect(missingInput.createInputArea(target)).toBe(true);
    const input = target.querySelector<HTMLInputElement>('input[type="file"]')!;
    Object.defineProperty(input, 'files', { configurable: true, value: null });
    input.dispatchEvent(new Event('change'));
    expect(missingInput.removeInput(target)).toBe(true);
    vi.spyOn(missingInput, 'createInputElement').mockReturnValue(false);
    expect(missingInput.clickInput()).toBe(false);
    missingInput.dispose();
    target.remove();
  });

  test('reacts to model replacements, clearing and accept changes before an input exists', async () => {
    const first = {
      name: 'first.txt',
      url: 'https://files.test/first.txt',
    };
    const second = {
      name: 'second.txt',
      url: 'https://files.test/second.txt',
    };
    const values = reactive<Partial<UploadProps>>({
      modelValue: [first],
      accept: '.txt',
      multiple: false,
      autoUpload: false,
    });
    const helper = new UploadFileHelper(toRefs(values) as unknown as ToRefs<Partial<UploadProps>>);
    await vi.waitFor(() => expect(helper.fileList.value.size).toBe(1));

    values.modelValue = [second];
    await vi.waitFor(() =>
      expect([...helper.fileList.value][0].name).toBe('second.txt'),
    );
    values.modelValue = undefined;
    await vi.waitFor(() => expect(helper.fileList.value.size).toBe(0));

    values.accept = '.pdf';
    await vi.waitFor(() =>
      expect(document.body.querySelector<HTMLInputElement>('input[type="file"]')?.accept).toBe(
        '.pdf',
      ),
    );
    helper.dispose();
  });

  test('creates an unattached default input and clears active files without releasing them twice', async () => {
    const helper = createHelper({ multiple: true });
    expect(helper.createInputElement()).toBe(true);
    await helper.addFiles(new File(['active'], 'active.txt'), false);
    const file = [...helper.fileList.value][0];
    helper.setStatus(file, HUploadFileStatusEnum.Uploading, {
      progress: 10,
      response: undefined,
    });
    helper.removeAllFiles();
    expect(helper.fileList.value.size).toBe(0);
    helper.dispose();
  });

  test('updates a video duration from its blob URL', () => {
    const createElement = vi.spyOn(document, 'createElement');
    const helper = createHelper();
    const file = {
      name: 'clip.mp4',
      percentage: 0,
      status: HUploadFileStatusEnum.Success,
      type: HUploadFileTypeEnum.Video,
      size: 1,
      uuid: 'duration-video',
      url: '',
      blobUrl: 'blob:duration-video',
    } as HUploadFileType;
    helper.getVideoDuration(file);
    const video = createElement.mock.results
      .map(result => result.value)
      .find(element => element instanceof HTMLVideoElement) as HTMLVideoElement;
    Object.defineProperty(video, 'duration', { configurable: true, value: 12.5 });
    video.dispatchEvent(new Event('loadeddata'));
    expect(file.duration).toBe(12.5);
    helper.dispose();
  });

  test('reuses an existing multipart helper when uploadFile is called again', async () => {
    const uploadPart = vi.fn(
      (_file: HUploadFileType, _chunk: HUploadChunk, { signal }: HUploadPartRequestOptions) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        }),
    );
    const helper = createHelper({
      autoUpload: true,
      multipartChunkSize: 1,
      multipart: { uploadPart, handleMerge: () => undefined },
    });
    const retried = vi.fn();
    helper.eventEmitter.on('retry', retried);
    await helper.addFiles(new File(['parts'], 'existing-parts.bin'));
    await vi.waitFor(() => expect(uploadPart).toHaveBeenCalled());
    const file = [...helper.fileList.value][0];
    helper.pauseUpload(file);
    await helper.uploadFile(file);
    await vi.waitFor(() => expect(retried).toHaveBeenCalledWith(file));
    helper.pauseUpload(file);
    helper.dispose();
  });
});
