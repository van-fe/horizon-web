<script setup lang="ts">
import { ref } from 'vue';
import type { NUploadV2FileType, NUploadV2HttpRequestInstanceMethods } from '@nio-fe/lego';
import type { Data } from '@nio-fe/shared';
import { NUploadV2FileStatusEnum } from '@nio-fe/lego';

const modelValue = ref();

function httpRequest(file: NUploadV2FileType, instanceMethods: NUploadV2HttpRequestInstanceMethods) {
  if (!file.raw) {
    console.error('Cannot find upload file');
    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', evt => {
    const progress = Math.min(evt.loaded / evt.total, 1) * 100;

    instanceMethods.setStatus(file, NUploadV2FileStatusEnum.Uploading, {
      progress,
      response: undefined,
    });
  });

  xhr.open('POST', 'https://lego-inspector.nioint.com/upload-mock', true);
  xhr.withCredentials = false;

  instanceMethods.setStatus(file, NUploadV2FileStatusEnum.Uploading, {
    progress: 0,
    response: undefined,
  });

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        void instanceMethods.onUploadSuccess(file, xhr.response);
      } else if (xhr.status > 0) {
        void instanceMethods.onUploadFail(file, xhr.responseText, xhr.response);
      }

      file.response = xhr.response;
    }
  };

  xhr.onerror = () => {
    void instanceMethods.onUploadFail(file, xhr.responseText, xhr.response);
  };

  instanceMethods.addUploadingQueue(file, xhr);

  const formData = new FormData();

  formData.append('file', file.raw);

  xhr.send(formData);
}

function handleChange(file: NUploadV2FileType, response?: Data) {
  console.log('change:', file, response);
}

function onAddFile(file: NUploadV2FileType) {
  console.log('Add File: ', file);
}

function onUploadFile(file: NUploadV2FileType) {
  console.log('Upload File: ', file);
}

function onRemoveFile(file: NUploadV2FileType) {
  console.log('Remove File: ', file);
}

function onUploadingFile(file: NUploadV2FileType, process: number, response?: Data) {
  console.log('Uploading File: ', file, process, response);
}

function onUploadedFile(file: NUploadV2FileType, response?: Data) {
  console.log('Uploaded File: ', file, response);
}

function onPauseFile(file: NUploadV2FileType) {
  console.log('Pause File: ', file);
}

function onContinueFile(file: NUploadV2FileType) {
  console.log('Continue File: ', file);
}

function onRetryFile(file: NUploadV2FileType) {
  console.log('Retry File: ', file);
}

function onPreview(file: NUploadV2FileType) {
  console.log('Preview File: ', file);
}

function onFailFile(file: NUploadV2FileType, reason: string, response?: Data) {
  console.log('Fail File: ', file, reason, response);
}
</script>

<template>
  <n-upload-v2
    v-model="modelValue"
    :http-request="httpRequest"
    :multiple="true"
    crossorigin="anonymous"
    @change="handleChange"
    @add="onAddFile"
    @upload="onUploadFile"
    @remove="onRemoveFile"
    @uploading="onUploadingFile"
    @uploaded="onUploadedFile"
    @pause="onPauseFile"
    @continue="onContinueFile"
    @retry="onRetryFile"
    @fail="onFailFile"
    @preview="onPreview"
  />
</template>
