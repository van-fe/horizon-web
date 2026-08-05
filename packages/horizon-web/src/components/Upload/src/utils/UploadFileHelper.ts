import type { UploadProps } from '../composables/useProps';
import type { CSSProperties, ToRefs } from 'vue';
import { toRaw, unref, watch } from 'vue';
import type { MaybeElementRef } from '@vueuse/core';
import { unrefElement } from '@vueuse/core';
import type { Arrayable } from '@aurora/utils';
import { getVideoFirstFrame, isFileList, getVideoDuration, isNumber } from '@aurora/utils';
import UploadHelper from './UploadHelper';
import {
  discardUploadObjectUrls,
  isFileSame,
  releaseUploadObjectUrls,
  rememberUploadObjectUrl,
  retainUploadObjectUrls,
  transformSingleRawFileTypeToUploadFileType,
} from './helper';
import type { HUploadFileType, HUploadRawFileType } from './fileDefines';
import { HUploadFileStatusEnum, HUploadFileTypeEnum } from './fileDefines';

export default class UploadFileHelper extends UploadHelper {
  private containerEl: HTMLElement | undefined;
  private inputEl: HTMLInputElement | undefined;
  private readonly inputChangeHandler = this.onInputElChange.bind(this);

  public get fileList() {
    return this._fileList;
  }

  constructor(props?: ToRefs<Partial<UploadProps>>) {
    super(props);
    if (props) {
      this.setModifyListener();
    }

    const modelValue = props?.modelValue?.value;

    if (modelValue) {
      void this.addFiles(modelValue, false);
    }

    watch(
      () => props?.modelValue?.value,
      async value => {
        if (!value) {
          this.removeAllFiles();
        } else {
          this.replaceFiles(this.transformRawFileTypeToUploadFileType(value));
        }
      },
    );

    watch(
      this._fileList,
      val => {
        Array.from(val).forEach(file => {
          if (file.type === HUploadFileTypeEnum.Video && !file.duration) {
            getVideoDuration(file.blobUrl || file.url, duration => {
              file.duration = duration;
            });

            if (!file.posterUrl) {
              getVideoFirstFrame(file.blobUrl || file.url, ({ blobUrl }) => {
                if (!this._fileList.value.has(file)) {
                  URL.revokeObjectURL(blobUrl);
                  return;
                }
                file.posterUrl = blobUrl;
                rememberUploadObjectUrl(file, blobUrl);
              });
            }
          }
        });
      },
      {
        immediate: true,
      },
    );
  }

  public removeInput(containerEl = this.containerEl) {
    if (containerEl && this.inputEl) {
      this.inputEl.removeEventListener('change', this.inputChangeHandler);
      containerEl.removeChild(this.inputEl);
      this.inputEl = undefined;
      return true;
    }

    return false;
  }

  public removeInputElement() {
    if (this.inputEl) {
      this.inputEl.removeEventListener('change', this.inputChangeHandler);
      this.inputEl.parentElement?.removeChild(this.inputEl);
      this.inputEl = undefined;
    }

    const restElement = document.querySelector(`input[id="${this.uuid}"]`);

    if (restElement) {
      restElement.parentElement?.removeChild(restElement);
    }
  }

  public createInputElement() {
    if (!this.containerEl) this.containerEl = document.body;

    this.removeInputElement();

    const style: CSSProperties = {
      opacity: 0,
      position: 'fixed',
      top: '100%',
      left: '100%',
    };

    if (this.containerEl === document.body) {
      style.width = '1px';
      style.height = '1px';
    } else {
      if (!['absolute', 'relative'].includes(this.containerEl.style.position)) {
        this.containerEl.style.setProperty('position', 'relative');
      }

      style.width = '100%';
      style.height = '100%';
    }

    this.inputEl = document.createElement('input');

    this.inputEl.id = this.id ?? this.uuid;
    this.inputEl.type = 'file';
    // The generated input is only a programmatic file-dialog proxy. Keeping it
    // out of the tab order prevents an invisible keyboard focus stop.
    this.inputEl.tabIndex = -1;
    this.inputEl.accept = this.accept.value!;
    this.inputEl.multiple = this.multiple.value;

    for (const [key, value] of Object.entries(style)) {
      this.inputEl.style.setProperty(key, value);
    }

    this.inputEl.addEventListener('change', this.inputChangeHandler);

    return true;
  }

  public createInputArea(target: string | MaybeElementRef = document.body) {
    if (typeof target === 'string') {
      this.containerEl = document.querySelector(target) as HTMLElement | undefined;
    } else {
      this.containerEl = unrefElement(target) as HTMLElement | undefined;
    }

    if (!this.containerEl) {
      console.error(`Your trigger element (${target}) cannot be found.`);
      return false;
    }

    if (this.createInputElement()) {
      this.containerEl.append(this.inputEl!);
      return true;
    }

    return false;
  }

  public clickInput() {
    if (!this.containerEl) {
      if (!this.createInputArea()) {
        return false;
      }
    }

    if (!this.inputEl) {
      if (!this.createInputElement()) {
        return false;
      }
    }

    this.inputEl!.click();
    return true;
  }

  public transformRawFileTypeToUploadFileType(
    target: Arrayable<HUploadRawFileType> | FileList | undefined,
  ) {
    const files: HUploadFileType[] = [];

    if (target === undefined) {
      return files;
    } else if (Array.isArray(target) || isFileList(target)) {
      for (const file of target) {
        files.push(transformSingleRawFileTypeToUploadFileType(file));
      }
    } else {
      files.push(transformSingleRawFileTypeToUploadFileType(target));
    }

    return files;
  }

  public isValidFile(file: HUploadFileType) {
    const acceptList = this.accept.value?.split(',') ?? [];

    if (acceptList) {
      return acceptList.some(accept => {
        if (accept.startsWith('.')) {
          return file.name.toLowerCase().endsWith(accept.toLowerCase());
        } else {
          const fileType = file.raw?.type;
          return fileType === accept.toLowerCase() || fileType?.startsWith(accept.replace('*', ''));
        }
      });
    } else return true;
  }

  public async addFiles(fileList: Arrayable<HUploadRawFileType> | FileList, fromUser = true) {
    let files = this.transformRawFileTypeToUploadFileType(fileList);

    if (fromUser) {
      if (isNumber(this.fileSizeLimit)) {
        const notValidFiles = files.filter(
          file => !((file.size || 0) < this.fileSizeLimit! * 1024 * 1024),
        );

        if (notValidFiles.length) {
          this.eventEmitter.emit('fileSizeExceed', notValidFiles);
          notValidFiles.forEach(discardUploadObjectUrls);

          files = files.filter(file => !notValidFiles.includes(file));
        }
      }

      if (this.accept.value && this.acceptStrict.value) {
        const notValidFiles = files.filter(file => !this.isValidFile(file));

        if (notValidFiles.length) {
          this.eventEmitter.emit('acceptError', notValidFiles);
          notValidFiles.forEach(discardUploadObjectUrls);

          files = files.filter(file => !notValidFiles.includes(file));
        }
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!(await this.beforeUploadFile(file))) {
          discardUploadObjectUrls(file);
          files.splice(i, 1);
          i--;
        }
      }
    }

    if (this.multiple.value) {
      if (this._fileList.value.size + files.length > this.limit) {
        this.eventEmitter.emit('exceed', files, Array.from(this._fileList.value.values()));

        if (!this.autoSliceExceedFiles.value) {
          files.forEach(discardUploadObjectUrls);
          return;
        }

        const acceptedAmount = Math.max(0, this.limit - this._fileList.value.size);
        files.slice(acceptedAmount).forEach(discardUploadObjectUrls);
        files = files.slice(0, acceptedAmount);
      }

      files.forEach(file => {
        if (!this._fileList.value.has(file)) {
          this._fileList.value.add(file);
          retainUploadObjectUrls(file, this);
        }
      });
    } else {
      if (files.length) {
        if (files.length > 1) {
          this.eventEmitter.emit('exceed', files, Array.from(this._fileList.value.values()));

          if (!this.autoSliceExceedFiles.value) {
            files.forEach(discardUploadObjectUrls);
            return;
          }
        }

        files.slice(1).forEach(discardUploadObjectUrls);
        files = files.slice(0, 1);
        this.replaceFiles(files);
      }
    }

    files.forEach(file => {
      if (fromUser) {
        this.eventEmitter.emit('change', file);
        this.eventEmitter.emit('add', file);
      }
    });

    if (this.autoUpload) {
      await this.uploadFiles();
    }
  }

  public async removeFile(files: HUploadRawFileType[], check = true) {
    let didRemove = false;
    const doRemove = (file: HUploadFileType) => {
      this.releaseUploadFile(file);
      this.setStatus(file, HUploadFileStatusEnum.Pause);
      unref(this._fileList).delete(file);
      releaseUploadObjectUrls(file, this);
      this.eventEmitter.emit('remove', file);
      didRemove = true;
    };

    const transformedFiles = files
      .map(file => {
        return Array.from(unref(this._fileList)).find(curr => isFileSame(file, curr)) || undefined;
      })
      .filter(curr => !!curr);

    const handler = this.beforeRemove;

    if (handler && check) {
      for (const file of transformedFiles) {
        try {
          const callback = await handler(file);
          if (callback) {
            doRemove(file);
          }
        } catch {
          // do nothing
        }
      }
    } else {
      transformedFiles.forEach(file => void doRemove(file));
    }
    if (didRemove) this.continueReadyUploads();
  }

  public async abortFiles(
    files: HUploadFileType[] = Array.from(this.fileList.value.values()),
    check = true,
  ) {
    const handler = this.beforeAbort;

    if (handler && check) {
      for (const file of files) {
        try {
          const callback = await handler(file);
          if (callback) {
            this.pauseUpload(file);
          }
        } catch {
          // do nothing
        }
      }
    } else {
      files.forEach(file => this.pauseUpload(file));
    }
  }

  public removeAllFiles() {
    Array.from(this._fileList.value).forEach(file => {
      if (
        [
          HUploadFileStatusEnum.New,
          HUploadFileStatusEnum.Pause,
          HUploadFileStatusEnum.Fail,
          HUploadFileStatusEnum.Success,
        ].includes(file.status)
      ) {
        this.releaseUploadFile(file);
      }
      releaseUploadObjectUrls(file, this);
    });
    this._fileList.value.clear();
    this.eventEmitter.emit('update:modelValue', []);
  }

  public dispose() {
    this.releaseAllUploadFiles();
    Array.from(this._fileList.value).forEach(file => releaseUploadObjectUrls(file, this));
    this._fileList.value.clear();
    this.removeInputElement();
  }

  public detachForBackgroundUpload() {
    Array.from(this._fileList.value).forEach(file => releaseUploadObjectUrls(file, this));
    this.removeInputElement();
  }

  /*** private ***/

  private replaceFiles(files: HUploadFileType[]) {
    const nextFiles = new Set(files);
    const currentFiles = Array.from(this._fileList.value);
    const currentRawFiles = new Set(currentFiles.map(file => toRaw(file)));
    const nextRawFiles = new Set(files.map(file => toRaw(file)));

    currentFiles.forEach(file => {
      if (nextRawFiles.has(toRaw(file))) return;
      this.releaseUploadFile(file);
      releaseUploadObjectUrls(file, this);
    });
    nextFiles.forEach(file => {
      if (!currentRawFiles.has(toRaw(file))) retainUploadObjectUrls(file, this);
    });
    this._fileList.value = nextFiles;
  }

  private setModifyListener() {
    watch([this.accept, this.multiple], () => {
      this.createInputElement();
    });
  }

  private onInputElChange() {
    if (this.inputEl && this.inputEl.files) {
      this.addFiles(this.inputEl.files).then(() => {
        this.inputEl && (this.inputEl.value = '');
      });
    }
  }
}
