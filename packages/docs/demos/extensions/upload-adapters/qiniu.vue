<template>
  <h-space direction="vertical" size="large">
    <h-alert
      :closable="false"
      show-icon
      type="info"
      description="执行七牛 Kodo Multipart v2 适配流程。示例只用内存 transport 代替真实网络请求。"
    />

    <h-space style="flex-wrap: wrap">
      <h-button type="primary" @click="startDemo">生成 3.25 MB 文件并上传</h-button>
      <h-button plain @click="restartDemo">重新加入同一文件</h-button>
      <h-button text @click="resetDemo">重置离线云端</h-button>
    </h-space>

    <h-upload
      ref="uploadRef"
      action="/offline-qiniu-sandbox"
      :auto-upload="false"
      :controls="['upload', 'delete']"
      controls-always-visible
      v-bind="uploadPreset"
      @uploaded="onUploaded"
    />

    <h-card title="七牛 Kodo · 离线云端状态">
      <h-space style="flex-wrap: wrap">
        <h-tag
          v-for="partNumber in chunkCount"
          :key="partNumber"
          :type="uploadedParts.has(partNumber) ? 'success' : 'info'"
        >
          Part {{ partNumber }} ·
          {{ uploadedParts.has(partNumber) ? '云端已有 ETag' : '等待中' }}
        </h-tag>
      </h-space>

      <ol class="upload-adapter-demo-logs" aria-live="polite">
        <li v-for="(log, index) in logs" :key="`${index}-${log}`">{{ log }}</li>
      </ol>
    </h-card>
  </h-space>
</template>

<script setup lang="ts">
import type { HUploadFileType, HUploadRawFileType } from '@aurora/horizon-web';
import {
  createMemoryCheckpointStore,
  type QiniuHttpRequest,
  type QiniuHttpResponse,
  type QiniuHttpTransport,
  type QiniuMultipartSession,
} from '@aurora/upload-adapters';
import { createQiniuUploadPreset } from '@aurora/upload-adapters/qiniu';
import { onBeforeUnmount, reactive, ref } from 'vue';

interface UploadDemoExpose {
  upload: (files?: HUploadRawFileType[]) => Promise<void>;
  abort: () => Promise<void>;
  clearFiles: () => void;
}

interface StoredPart {
  etag: string;
  size: number;
}

const MB = 1024 * 1024;
const FILE_SIZE = 3.25 * MB;
const chunkCount = Math.ceil(FILE_SIZE / MB);
const objectKey = 'demo/qiniu-demo.bin';
const uploadRef = ref<UploadDemoExpose>();
const logs = ref<string[]>(['生成示例文件后，可以观察 Multipart v2 的请求顺序']);
const uploadedParts = reactive(new Map<number, StoredPart>());
let generation = 0;
let uploadId = 0;

function appendLog(message: string) {
  logs.value = [message, ...logs.value].slice(0, 10);
}

function createDemoFile() {
  return new File([new Uint8Array(FILE_SIZE)], 'qiniu-demo.bin', {
    type: 'application/octet-stream',
    lastModified: 1_700_000_000_000,
  });
}

function createDemoToken() {
  const policy = btoa(JSON.stringify({ scope: `demo-bucket:${objectKey}` }))
    .replace(/\//g, '_')
    .replace(/\+/g, '-');
  return `demo-ak:demo-signature:${policy}`;
}

function abortError() {
  return new DOMException('Upload paused', 'AbortError');
}

function uploadPart(request: QiniuHttpRequest, partNumber: number, part: Blob) {
  if (request.signal?.aborted) return Promise.reject(abortError());

  const activeGeneration = generation;
  appendLog(`PUT Part ${partNumber}，开始上报字节进度`);

  return new Promise<{ etag: string; md5: string }>((resolve, reject) => {
    let loaded = 0;
    const step = Math.max(Math.ceil(part.size / 16), 1);
    const timer = window.setInterval(() => {
      loaded = Math.min(loaded + step, part.size);
      request.onProgress?.(loaded);
      if (loaded !== part.size) return;

      window.clearInterval(timer);
      request.signal?.removeEventListener('abort', onAbort);
      const etag = `qiniu-etag-${partNumber}`;
      if (activeGeneration === generation) {
        uploadedParts.set(partNumber, { etag, size: part.size });
        appendLog(`Part ${partNumber} 返回 ETag`);
      }
      resolve({ etag, md5: `mock-md5-${partNumber}` });
    }, 120);

    const onAbort = () => {
      window.clearInterval(timer);
      appendLog(`Part ${partNumber} 的当前模拟请求已中止，云端分片保留`);
      reject(abortError());
    };
    request.signal?.addEventListener('abort', onAbort, { once: true });
  });
}

async function transport<T = unknown>(request: QiniuHttpRequest): Promise<QiniuHttpResponse<T>> {
  const url = new URL(request.url);
  const partMatch = url.pathname.match(/\/uploads\/[^/]+\/(\d+)$/);
  let data: unknown;

  if (request.method === 'POST' && url.pathname.endsWith('/uploads')) {
    data = {
      uploadId: `qiniu-demo-${++uploadId}`,
      expireAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    };
    appendLog('初始化 UploadId');
  } else if (request.method === 'GET') {
    data = {
      uploadId: `qiniu-demo-${uploadId}`,
      expireAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      partNumberMarker: 0,
      parts: [...uploadedParts].map(([partNumber, part]) => ({
        partNumber,
        etag: part.etag,
        size: part.size,
      })),
    };
    appendLog(`ListParts 恢复 ${uploadedParts.size} 个分片`);
  } else if (request.method === 'PUT' && partMatch && request.body instanceof Blob) {
    data = await uploadPart(request, Number(partMatch[1]), request.body);
  } else if (request.method === 'POST') {
    data = { key: objectKey, hash: 'qiniu-demo-hash' };
    appendLog('CompleteMultipartUpload 合并成功');
  } else {
    data = {};
  }

  return { status: 200, data: data as T };
}

const uploadPreset = createQiniuUploadPreset({
  multipartChunkSize: 1,
  key: objectKey,
  uploadHost: 'https://upload.example.test',
  tokenProvider: () => createDemoToken(),
  transport: transport as QiniuHttpTransport,
  checkpointStore: createMemoryCheckpointStore<QiniuMultipartSession>(),
  maxAmountUploadingAtSameTime: 2,
});

async function startDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  generation += 1;
  uploadedParts.clear();
  logs.value = ['创建 3.25 MB 示例文件'];
  await uploadRef.value?.upload([createDemoFile()]);
}

async function restartDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  appendLog('重新加入同一文件，使用 checkpoint + ListParts 恢复');
  await uploadRef.value?.upload([createDemoFile()]);
}

async function resetDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  generation += 1;
  uploadedParts.clear();
  logs.value = ['离线云端记录已清空'];
}

function onUploaded(file: HUploadFileType) {
  appendLog(`${file.name} 上传成功`);
}

onBeforeUnmount(() => {
  generation += 1;
  void uploadRef.value?.abort();
});
</script>

<style scoped>
.upload-adapter-demo-logs {
  min-height: 9em;
  padding-left: 20px;
  margin: 16px 0 0;
}
</style>
