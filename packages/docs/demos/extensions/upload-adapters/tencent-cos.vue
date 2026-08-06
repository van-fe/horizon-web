<template>
  <h-space direction="vertical" size="large">
    <h-alert
      :closable="false"
      show-icon
      type="info"
      description="执行腾讯云 COS 的 cos-js-sdk-v5 callback API。示例只用内存 client 代替真实 SDK client。"
    />

    <h-space style="flex-wrap: wrap">
      <h-button type="primary" @click="startDemo">生成 3.25 MB 文件并上传</h-button>
      <h-button plain @click="restartDemo">重新加入同一文件</h-button>
      <h-button text @click="resetDemo">重置离线云端</h-button>
    </h-space>

    <h-upload
      ref="uploadRef"
      action="/offline-tencent-cos-sandbox"
      :auto-upload="false"
      :controls="['upload', 'delete']"
      controls-always-visible
      v-bind="uploadPreset"
      @uploaded="onUploaded"
    />

    <h-card title="腾讯云 COS · 离线云端状态">
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
  type TencentCosClientLike,
  type TencentCosMultipartSession,
} from '@aurora/upload-adapters';
import { createTencentCosUploadPreset } from '@aurora/upload-adapters/tencent-cos';
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
const objectKey = 'demo/tencent-cos-demo.bin';
const uploadRef = ref<UploadDemoExpose>();
const logs = ref<string[]>(['生成示例文件后，可以观察 COS callback API 的调用顺序']);
const uploadedParts = reactive(new Map<number, StoredPart>());
let generation = 0;
let uploadId = 0;

function appendLog(message: string) {
  logs.value = [message, ...logs.value].slice(0, 10);
}

function createDemoFile() {
  return new File([new Uint8Array(FILE_SIZE)], 'tencent-cos-demo.bin', {
    type: 'application/octet-stream',
    lastModified: 1_700_000_000_000,
  });
}

const client: TencentCosClientLike = {
  multipartInit(_request, callback) {
    appendLog('multipartInit 初始化 UploadId');
    callback(null, { UploadId: `tencent-demo-${++uploadId}` });
  },
  multipartListPart(_request, callback) {
    appendLog(`multipartListPart 恢复 ${uploadedParts.size} 个分片及 ETag`);
    callback(null, {
      Part: [...uploadedParts].map(([partNumber, part]) => ({
        PartNumber: partNumber,
        ETag: part.etag,
        Size: part.size,
      })),
      IsTruncated: false,
    });
  },
  multipartUpload(request, callback) {
    const activeGeneration = generation;
    const partNumber = request.PartNumber;
    const size = request.ContentLength ?? request.Body.size;
    const step = Math.max(Math.ceil(size / 8), 1);
    let loaded = 0;
    appendLog(`multipartUpload(${partNumber}) 开始上报 onProgress`);

    const timer = window.setInterval(() => {
      loaded = Math.min(loaded + step, size);
      request.onProgress?.({
        loaded,
        total: size,
        speed: step / 0.12,
        percent: loaded / size,
      });
      if (loaded !== size) return;

      window.clearInterval(timer);
      const etag = `tencent-etag-${partNumber}`;
      if (activeGeneration === generation) {
        uploadedParts.set(partNumber, { etag, size });
        appendLog(`Part ${partNumber} 完成，获得 ETag`);
      }
      callback(null, { ETag: etag });
    }, 120);
  },
  multipartComplete(request, callback) {
    appendLog(`multipartComplete 按顺序提交 ${request.Parts.length} 个 ETag`);
    callback(null, { Location: 'https://example.test/tencent-cos-demo.bin' });
  },
};

const uploadPreset = createTencentCosUploadPreset({
  client,
  bucket: 'demo-bucket-1250000000',
  region: 'ap-guangzhou',
  objectKey,
  multipartChunkSize: 1,
  checkpointStore: createMemoryCheckpointStore<TencentCosMultipartSession>(),
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
  appendLog('等待已发出的 SDK Part 完成后再查询云端');
  await new Promise(resolve => window.setTimeout(resolve, 1100));
  appendLog('重新加入同一文件，使用 checkpoint + multipartListPart 恢复');
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
