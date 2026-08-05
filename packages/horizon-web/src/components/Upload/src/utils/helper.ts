import { arrayableToArray, getRemoteUrlFileHeader, isObject } from '@aurora/utils';
import type { Arrayable } from '@aurora/utils';
import type { HUploadFileType, HUploadRawFileType, HUploadUserFile } from './fileDefines';
import { HUploadFileStatusEnum, fileTypeMapping, HUploadFileTypeEnum } from './fileDefines';
import { nanoid } from 'nanoid';
import { warn } from '~/utils/useLog';
import { toRaw } from 'vue';

interface OwnedObjectUrlRecord {
  urls: Set<string>;
  owners: WeakSet<object>;
  ownerCount: number;
}

const ownedObjectUrls = new WeakMap<HUploadFileType, OwnedObjectUrlRecord>();

function getOwnedObjectUrlRecord(file: HUploadFileType) {
  file = toRaw(file);
  const current = ownedObjectUrls.get(file);
  if (current) return current;

  const record: OwnedObjectUrlRecord = {
    urls: new Set(),
    owners: new WeakSet(),
    ownerCount: 0,
  };
  ownedObjectUrls.set(file, record);
  return record;
}

function revokeOwnedObjectUrlRecord(file: HUploadFileType, record: OwnedObjectUrlRecord) {
  file = toRaw(file);
  if (typeof URL.revokeObjectURL === 'function') {
    record.urls.forEach(url => URL.revokeObjectURL(url));
  }
  if (file.blobUrl && record.urls.has(file.blobUrl)) file.blobUrl = undefined;
  if (file.posterUrl && record.urls.has(file.posterUrl)) file.posterUrl = undefined;
  ownedObjectUrls.delete(file);
}

export function rememberUploadObjectUrl(file: HUploadFileType, url: string) {
  getOwnedObjectUrlRecord(file).urls.add(url);
}

export function retainUploadObjectUrls(file: HUploadFileType, owner: object) {
  const record = getOwnedObjectUrlRecord(file);
  if (record.owners.has(owner)) return;
  record.owners.add(owner);
  record.ownerCount += 1;
}

export function releaseUploadObjectUrls(file: HUploadFileType, owner: object) {
  file = toRaw(file);
  const record = ownedObjectUrls.get(file);
  if (!record?.owners.has(owner)) return;
  record.owners.delete(owner);
  record.ownerCount -= 1;
  if (record.ownerCount === 0) revokeOwnedObjectUrlRecord(file, record);
}

export function discardUploadObjectUrls(file: HUploadFileType) {
  file = toRaw(file);
  const record = ownedObjectUrls.get(file);
  if (record?.ownerCount === 0) revokeOwnedObjectUrlRecord(file, record);
}

export function isUploadUserFile(data: unknown): data is HUploadUserFile {
  return isObject(data) && 'name' in data && 'url' in data;
}

export function isUploadFile(data: unknown): data is HUploadFileType {
  return isUploadUserFile(data) && 'uuid' in data;
}

export function getBaseExtName(fullName: string): [string, string] {
  const nameSplits = fullName.split('.');

  if (nameSplits.length > 1) {
    return [nameSplits.slice(0, -1).join('.'), nameSplits.at(-1)!];
  } else if (nameSplits.length === 1) {
    return [fullName, ''];
  } else {
    return ['', ''];
  }
}

export function getFileTypeByExt(ext: string): HUploadFileTypeEnum {
  ext = ext.replace(/^\./, '').toLowerCase();

  const type = Object.keys(fileTypeMapping).find(curr =>
    fileTypeMapping[curr as HUploadFileTypeEnum].includes(ext),
  ) as HUploadFileTypeEnum | undefined;

  return type ?? HUploadFileTypeEnum.Unknown;
}

export function getFileType(fileName: string) {
  const [, ext] = getBaseExtName(fileName);

  return getFileTypeByExt(ext);
}

export function isFileSame(rawFile: HUploadRawFileType, file: HUploadFileType) {
  if (isUploadFile(rawFile)) {
    return rawFile.uuid === file.uuid;
  }

  if (isUploadUserFile(rawFile)) {
    return rawFile.name === file.name && rawFile.url === file.url;
  }

  return rawFile === file.raw;
}

const comparedFields = ['name', 'url'] as const;

export function uploadFileTransformToBasicType(file: HUploadRawFileType): HUploadUserFile {
  if (isUploadFile(file)) {
    return file;
  }

  if (isUploadUserFile(file)) {
    return {
      name: file.name,
      url: file.url,
    };
  }

  return {
    name: file.name,
    url: URL.createObjectURL(file),
  };
}

export function updateFileList(
  newFiles: Arrayable<HUploadRawFileType>,
  oldFiles: Arrayable<HUploadRawFileType> | undefined | null,
) {
  newFiles = arrayableToArray(newFiles);
  oldFiles = oldFiles ? arrayableToArray(oldFiles) : [];

  const res = newFiles.concat();

  const transformedNewFiles = newFiles.map(uploadFileTransformToBasicType);
  const transformedOldFiles = oldFiles.map(uploadFileTransformToBasicType);

  for (let i = 0; i < transformedNewFiles.length && i < transformedOldFiles.length; i++) {
    let isDiff = false;
    if ('uuid' in transformedNewFiles[i] && 'uuid' in transformedOldFiles[i]) {
      res[i] =
        transformedNewFiles[i]['uuid'] === transformedOldFiles[i]['uuid']
          ? oldFiles[i]
          : newFiles[i];
      continue;
    }

    for (const field of comparedFields) {
      if (
        field in transformedNewFiles[i] &&
        field in transformedOldFiles[i] &&
        transformedNewFiles[i][field] !== transformedOldFiles[i][field]
      ) {
        isDiff = true;
      }
    }

    if (!isDiff) {
      res[i] = oldFiles[i];
    } else {
      res[i] = newFiles[i];
    }
  }

  return res;
}

export function suitSizeValue(fileSize: number | undefined | null) {
  if (!fileSize) return '';

  const unit = ['B', 'KB', 'MB', 'TB'];
  fileSize = parseFloat(fileSize.toString());

  let unitIndex = 0;

  while (fileSize > 1024) {
    fileSize /= 1024;
    unitIndex++;
  }

  return fileSize.toFixed(2) + unit[unitIndex];
}

export function durationFormat(time: number | undefined) {
  if (!time) return '';

  const [hours, minutes, seconds] = [
    Math.floor(time / 3600),
    Math.floor((time % 3600) / 60),
    Math.floor(time % 60),
  ];

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } else if (minutes > 0) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `00:${seconds.toString().padStart(2, '0')}`;
  }
}

export async function getAndSetFileSize(file: HUploadUserFile) {
  try {
    file.size = await getRemoteUrlFileHeader(file.url);
  } catch {
    warn('upload', `Cannot get file size from url: ${file.url}`);
  }
}

export function transformSingleRawFileTypeToUploadFileType(target: HUploadRawFileType) {
  if (isUploadFile(target)) {
    return target;
  } else if (isUploadUserFile(target)) {
    const size: number | undefined | null = target.size;

    if (!size) {
      void getAndSetFileSize(target);
    }

    return {
      ...target,
      type: getFileType(target.name),
      uuid: nanoid(),
      size,
      status: target.url ? HUploadFileStatusEnum.Success : HUploadFileStatusEnum.New,
    };
  } else {
    const file: HUploadFileType = {
      name: target.name,
      type: getFileType(target.name),
      uuid: nanoid(),
      size: target.size,
      status: HUploadFileStatusEnum.New,
      percentage: 0,
      url: '',
      blobUrl: URL.createObjectURL(target),
      raw: target,
    };
    rememberUploadObjectUrl(file, file.blobUrl!);
    return file;
  }
}
