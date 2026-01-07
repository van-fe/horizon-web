<script setup lang="ts">
import { ref } from 'vue';
import type { NUploadFileType, NUploadHttpRequestInstanceMethods } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';
import { NUploadFileStatusEnum } from '@aurora/horizon-web';

const modelValue = ref();

function httpRequest(file: NUploadFileType, instanceMethods: NUploadHttpRequestInstanceMethods) {
  if (!file.raw) {
    console.error('Cannot find upload file');
    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', evt => {
    const progress = Math.min(evt.loaded / evt.total, 1) * 100;

    instanceMethods.setStatus(file, NUploadFileStatusEnum.Uploading, {
      progress,
      response: undefined,
    });
  });

  xhr.open('POST', 'https://horizon-web-inspector.nioint.com/upload-mock', true);
  xhr.withCredentials = false;

  instanceMethods.setStatus(file, NUploadFileStatusEnum.Uploading, {
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

function handleChange(file: NUploadFileType, response?: Data) {
  console.info('change:', file, response);
}

function onAddFile(file: NUploadFileType) {
  console.info('Add File: ', file);
}

function onUploadFile(file: NUploadFileType) {
  console.info('Upload File: ', file);
}

function onRemoveFile(file: NUploadFileType) {
  console.info('Remove File: ', file);
}

function onUploadingFile(file: NUploadFileType, process: number, response?: Data) {
  console.info('Uploading File: ', file, process, response);
}

function onUploadedFile(file: NUploadFileType, response?: Data) {
  console.info('Uploaded File: ', file, response);
}

function onPauseFile(file: NUploadFileType) {
  console.info('Pause File: ', file);
}

function onContinueFile(file: NUploadFileType) {
  console.info('Continue File: ', file);
}

function onRetryFile(file: NUploadFileType) {
  console.info('Retry File: ', file);
}

function onPreview(file: NUploadFileType) {
  console.info('Preview File: ', file);
}

function onFailFile(file: NUploadFileType, reason: string, response?: Data) {
  console.info('Fail File: ', file, reason, response);
}
</script>

<template>
  <h-upload
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
