<template>
  <h-space direction="vertical" size="large">
    <h-alert
      :closable="false"
      show-icon
      type="info"
      description="执行阿里云 OSS 的 ali-oss 低层 multipart API。示例只用内存 client 代替真实 SDK client。"
    />

    <h-space style="flex-wrap: wrap">
      <h-button type="primary" @click="startDemo">生成 3.25 MB 文件并上传</h-button>
      <h-button plain @click="restartDemo">重新加入同一文件</h-button>
      <h-button text @click="resetDemo">重置离线云端</h-button>
    </h-space>

    <h-upload
      ref="uploadRef"
      action="/offline-aliyun-oss-sandbox"
      :auto-upload="false"
      :controls="['upload', 'delete']"
      controls-always-visible
      v-bind="uploadPreset"
      @uploaded="onUploaded"
    />

    <h-card title="阿里云 OSS · 离线云端状态">
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
  type AliyunOssClientLike,
  type AliyunOssMultipartSession,
} from '@aurora/upload-adapters';
import { createAliyunOssUploadPreset } from '@aurora/upload-adapters/aliyun-oss';
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
const objectKey = 'demo/aliyun-oss-demo.bin';
const uploadRef = ref<UploadDemoExpose>();
const logs = ref<string[]>(['生成示例文件后，可以观察 ali-oss 的 multipart 调用顺序']);
const uploadedParts = reactive(new Map<number, StoredPart>());
let generation = 0;
let uploadId = 0;

function appendLog(message: string) {
  logs.value = [message, ...logs.value].slice(0, 10);
}

function createDemoFile() {
  return new File([new Uint8Array(FILE_SIZE)], 'aliyun-oss-demo.bin', {
    type: 'application/octet-stream',
    lastModified: 1_700_000_000_000,
  });
}

const client: AliyunOssClientLike = {
  async initMultipartUpload() {
    appendLog('initMultipartUpload 初始化 UploadId');
    return { uploadId: `aliyun-demo-${++uploadId}` };
  },
  async listParts() {
    appendLog(`listParts 恢复 ${uploadedParts.size} 个分片及 ETag`);
    return {
      parts: [...uploadedParts].map(([partNumber, part]) => ({
        PartNumber: partNumber,
        ETag: part.etag,
        Size: part.size,
      })),
      isTruncated: false,
    };
  },
  async uploadPart(_name, _uploadId, partNumber, _file, start, end) {
    const activeGeneration = generation;
    const size = end - start;
    appendLog(`uploadPart(${partNumber}) 已交给 ali-oss，等待整片完成`);
    await new Promise(resolve => window.setTimeout(resolve, 900));
    const etag = `aliyun-etag-${partNumber}`;
    if (activeGeneration === generation) {
      uploadedParts.set(partNumber, { etag, size });
      appendLog(`Part ${partNumber} 完成，获得 ETag`);
    }
    return { etag };
  },
  async completeMultipartUpload(_name, _uploadId, parts) {
    appendLog(`completeMultipartUpload 按顺序提交 ${parts.length} 个 ETag`);
    return { name: objectKey, etag: 'aliyun-complete-etag' };
  },
};

const uploadPreset = createAliyunOssUploadPreset({
  client,
  objectKey,
  multipartChunkSize: 1,
  checkpointStore: createMemoryCheckpointStore<AliyunOssMultipartSession>(),
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
  appendLog('重新加入同一文件，使用 checkpoint + listParts 恢复');
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
