import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  discardUploadObjectUrls,
  durationFormat,
  getBaseExtName,
  getFileType,
  getFileTypeByExt,
  isFileSame,
  isUploadFile,
  isUploadUserFile,
  releaseUploadObjectUrls,
  rememberUploadObjectUrl,
  retainUploadObjectUrls,
  suitSizeValue,
  transformSingleRawFileTypeToUploadFileType,
  updateFileList,
  uploadFileTransformToBasicType,
} from '../src/utils/helper';
import {
  HUploadFileStatusEnum,
  HUploadFileTypeEnum,
  type HUploadFileType,
} from '../src/utils/fileDefines';

function uploadFile(overrides: Partial<HUploadFileType> = {}): HUploadFileType {
  return {
    name: 'file.txt',
    url: 'https://files.test/file.txt',
    uuid: 'file-id',
    status: HUploadFileStatusEnum.Success,
    type: HUploadFileTypeEnum.Unknown,
    percentage: 100,
    size: 1,
    ...overrides,
  };
}

describe('Upload helper utilities', () => {
  afterEach(() => vi.restoreAllMocks());

  test('parses base names, extensions, file categories, sizes and durations', () => {
    expect(getBaseExtName('archive.part.zip')).toEqual(['archive.part', 'zip']);
    expect(getBaseExtName('README')).toEqual(['README', '']);
    expect(getFileTypeByExt('.PNG')).toBe(HUploadFileTypeEnum.Image);
    expect(getFileType('movie.MP4')).toBe(HUploadFileTypeEnum.Video);
    expect(getFileType('unknown.custom')).toBe(HUploadFileTypeEnum.Unknown);
    expect(suitSizeValue(0)).toBe('');
    expect(suitSizeValue(500)).toBe('500.00B');
    expect(suitSizeValue(2048)).toBe('2.00KB');
    expect(suitSizeValue(2 * 1024 * 1024)).toBe('2.00MB');
    expect(durationFormat(undefined)).toBe('');
    expect(durationFormat(9)).toBe('00:09');
    expect(durationFormat(65)).toBe('01:05');
    expect(durationFormat(3665)).toBe('01:01');
  });

  test('identifies user/upload files and compares every supported raw representation', () => {
    const typed = uploadFile();
    const user = { name: typed.name, url: typed.url };
    const raw = new File(['file'], typed.name);
    typed.raw = raw;
    expect(isUploadUserFile(user)).toBe(true);
    expect(isUploadUserFile({ name: typed.name })).toBe(false);
    expect(isUploadFile(typed)).toBe(true);
    expect(isUploadFile(user)).toBe(false);
    expect(isFileSame(typed, typed)).toBe(true);
    expect(isFileSame(uploadFile({ uuid: 'other' }), typed)).toBe(false);
    expect(isFileSame(user, typed)).toBe(true);
    expect(isFileSame({ name: 'other', url: typed.url }, typed)).toBe(false);
    expect(isFileSame(raw, typed)).toBe(true);
  });

  test('transforms upload, user and native files into stable basic/upload forms', () => {
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:native');
    const typed = uploadFile();
    const user = { name: 'photo.png', url: 'https://files.test/photo.png', size: 12 };
    const raw = new File(['native'], 'native.pdf', { type: 'application/pdf' });
    expect(uploadFileTransformToBasicType(typed)).toBe(typed);
    expect(uploadFileTransformToBasicType(user)).toEqual({ name: user.name, url: user.url });
    expect(uploadFileTransformToBasicType(raw)).toEqual({ name: raw.name, url: 'blob:native' });

    expect(transformSingleRawFileTypeToUploadFileType(typed)).toBe(typed);
    expect(transformSingleRawFileTypeToUploadFileType(user)).toMatchObject({
      name: user.name,
      status: HUploadFileStatusEnum.Success,
      type: HUploadFileTypeEnum.Image,
    });
    expect(transformSingleRawFileTypeToUploadFileType(raw)).toMatchObject({
      raw,
      blobUrl: 'blob:native',
      status: HUploadFileStatusEnum.New,
    });
    expect(createObjectURL).toHaveBeenCalled();
  });

  test('preserves old file identities only for equivalent UUID or public fields', () => {
    const oldTyped = uploadFile({ uuid: 'same' });
    const newTyped = uploadFile({ uuid: 'same', percentage: 50 });
    expect(updateFileList([newTyped], [oldTyped])[0]).toBe(oldTyped);

    const changedTyped = uploadFile({ uuid: 'new' });
    expect(updateFileList([changedTyped], [oldTyped])[0]).toBe(changedTyped);

    const oldUser = { name: 'user.txt', url: 'https://files.test/user.txt' };
    const sameUser = { ...oldUser };
    const changedUser = { ...oldUser, url: 'https://files.test/changed.txt' };
    expect(updateFileList([sameUser], [oldUser])[0]).toBe(oldUser);
    expect(updateFileList([changedUser], [oldUser])[0]).toBe(changedUser);
    expect(updateFileList([sameUser], null)).toEqual([sameUser]);
  });

  test('revokes owned object URLs only after the final owner releases them', () => {
    const revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const file = uploadFile({ blobUrl: 'blob:preview', posterUrl: 'blob:poster' });
    const firstOwner = {};
    const secondOwner = {};
    rememberUploadObjectUrl(file, 'blob:preview');
    rememberUploadObjectUrl(file, 'blob:poster');
    retainUploadObjectUrls(file, firstOwner);
    retainUploadObjectUrls(file, firstOwner);
    retainUploadObjectUrls(file, secondOwner);
    discardUploadObjectUrls(file);
    releaseUploadObjectUrls(file, {});
    releaseUploadObjectUrls(file, firstOwner);
    expect(revoke).not.toHaveBeenCalled();
    releaseUploadObjectUrls(file, secondOwner);
    expect(revoke).toHaveBeenCalledWith('blob:preview');
    expect(revoke).toHaveBeenCalledWith('blob:poster');
    expect(file.blobUrl).toBeUndefined();
    expect(file.posterUrl).toBeUndefined();

    const orphan = uploadFile({ blobUrl: 'blob:orphan' });
    rememberUploadObjectUrl(orphan, 'blob:orphan');
    discardUploadObjectUrls(orphan);
    expect(revoke).toHaveBeenCalledWith('blob:orphan');
  });
});
