import type { UploadV2Props } from '../composables/useProps';
import type { CSSProperties, ToRefs } from 'vue';
import { unref, watch } from 'vue';
import type { MaybeElementRef } from '@vueuse/core';
import { unrefElement } from '@vueuse/core';
import type { Arrayable } from '@nio-fe/shared';
import { getVideoFirstFrame, isFileList, getVideoDuration, isNumber } from '@nio-fe/shared';
import UploadHelper from './UploadHelper';
import { isFileSame, transformSingleRawFileTypeToUploadV2FileType } from './helper';
import type { NUploadV2FileType, NUploadV2RawFileType } from './fileDefines';
import { NUploadV2FileTypeEnum, NUploadV2FileStatusEnum } from './fileDefines';

export default class UploadFileHelper extends UploadHelper {
  private containerEl: HTMLElement | undefined;
  private inputEl: HTMLInputElement | undefined;

  public get fileList() {
    return this._fileList;
  }

  constructor(props?: ToRefs<Partial<UploadV2Props>>) {
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
          this._fileList.value = new Set(this.transformRawFileTypeToUploadV2FileType(value));
        }
      },
    );

    watch(
      this._fileList,
      val => {
        Array.from(val).forEach(file => {
          if (file.type === NUploadV2FileTypeEnum.Video && !file.duration) {
            getVideoDuration(file.blobUrl || file.url, duration => {
              file.duration = duration;
            });

            if (!file.posterUrl) {
              getVideoFirstFrame(file.blobUrl || file.url, ({ blobUrl }) => {
                file.posterUrl = blobUrl;
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
      containerEl.removeChild(this.inputEl);
      this.inputEl = undefined;
      return true;
    }

    return false;
  }

  public removeInputElement() {
    if (this.inputEl) {
      this.inputEl.removeEventListener('change', this.onInputElChange.bind(this));
      this.inputEl.parentElement?.removeChild(this.inputEl);
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
    this.inputEl.accept = this.accept.value!;
    this.inputEl.multiple = this.multiple.value;

    for (const [key, value] of Object.entries(style)) {
      this.inputEl.style.setProperty(key, value);
    }

    this.inputEl.addEventListener('change', this.onInputElChange.bind(this));

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

  public transformRawFileTypeToUploadV2FileType(
    target: Arrayable<NUploadV2RawFileType> | FileList | undefined,
  ) {
    const files: NUploadV2FileType[] = [];

    if (target === undefined) {
      return files;
    } else if (Array.isArray(target) || isFileList(target)) {
      for (const file of target) {
        files.push(transformSingleRawFileTypeToUploadV2FileType(file));
      }
    } else {
      files.push(transformSingleRawFileTypeToUploadV2FileType(target));
    }

    return files;
  }

  public isValidFile(file: NUploadV2FileType) {
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

  public async addFiles(fileList: Arrayable<NUploadV2RawFileType> | FileList, fromUser = true) {
    let files = this.transformRawFileTypeToUploadV2FileType(fileList);

    if (fromUser) {
      if (isNumber(this.fileSizeLimit)) {
        const notValidFiles = files.filter(
          file => !((file.size || 0) < this.fileSizeLimit! * 1024 * 1024),
        );

        if (notValidFiles.length) {
          this.eventEmitter.emit('fileSizeExceed', notValidFiles);

          files = files.filter(file => !notValidFiles.includes(file));
        }
      }

      if (this.accept.value && this.acceptStrict.value) {
        const notValidFiles = files.filter(file => !this.isValidFile(file));

        if (notValidFiles.length) {
          this.eventEmitter.emit('acceptError', notValidFiles);

          files = files.filter(file => !notValidFiles.includes(file));
        }
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!(await this.beforeUploadFile(file))) {
          files.splice(i, 1);
          i--;
        }
      }
    }

    if (this.multiple.value) {
      if (this._fileList.value.size + files.length > this.limit) {
        this.eventEmitter.emit('exceed', files, Array.from(this._fileList.value.values()));

        if (!this.autoSliceExceedFiles.value) {
          return;
        }

        files = files.slice(0, this.limit - this._fileList.value.size);
      }

      files.forEach(file => this._fileList.value.add(file));
    } else {
      if (files.length) {
        if (files.length > 1) {
          this.eventEmitter.emit('exceed', files, Array.from(this._fileList.value.values()));

          if (!this.autoSliceExceedFiles.value) {
            return;
          }
        }

        files = files.slice(0, 1);
        this._fileList.value = new Set(files);
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

  public async removeFile(files: NUploadV2RawFileType[], check = true) {
    const doRemove = (file: NUploadV2FileType) => {
      this.pauseUpload(file);
      this.removeFromUploadingQueue(file);
      unref(this._fileList).delete(file);
      this.eventEmitter.emit('remove', file);
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
        } catch (e) {
          // do nothing
        }
      }
    } else {
      transformedFiles.forEach(file => void doRemove(file));
    }
  }

  public async abortFiles(
    files: NUploadV2FileType[] = Array.from(this.fileList.value.values()),
    check = true,
  ) {
    const handler = this.beforeAbort;

    if (handler && check) {
      for (const file of files) {
        try {
          const callback = await handler(file);
          if (callback) {
            this.setStatus(file, NUploadV2FileStatusEnum.Pause);
          }
        } catch (e) {
          // do nothing
        }
      }
    } else {
      files.forEach(file => this.setStatus(file, NUploadV2FileStatusEnum.Pause));
    }
  }

  public removeAllFiles() {
    this._fileList.value.clear();
    this.eventEmitter.emit('update:modelValue', []);
  }

  /*** private ***/

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
