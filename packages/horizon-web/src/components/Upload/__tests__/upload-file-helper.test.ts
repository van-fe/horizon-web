import { afterEach, describe, expect, test, vi } from 'vitest';
import { reactive, toRaw, toRefs } from 'vue';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../src/composables/useProps';
import UploadFileHelper from '../src/utils/UploadFileHelper';
import { HUploadFileStatusEnum } from '../src/utils/fileDefines';

function createHelper(props: Partial<UploadProps> = {}) {
  const values: Record<string, unknown> = {
    multiple: false,
    autoUpload: false,
    ...props,
  };
  return new UploadFileHelper(
    toRefs(reactive(values)) as unknown as ToRefs<Partial<UploadProps>>,
  );
}

describe('UploadFileHelper resource lifecycle', () => {
  afterEach(() => {
    vi.restoreAllMocks();
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
});
