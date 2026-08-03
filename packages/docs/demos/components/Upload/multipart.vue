<template>
  <h-space direction="vertical" size="large">
    <h-alert
      :closable="false"
      show-icon
      type="info"
      description="点击生成示例文件；上传过程中可使用文件右侧的暂停和继续按钮，绿色分片不会重新上传。"
    />

    <h-space style="flex-wrap: wrap">
      <h-button type="primary" @click="startDemo">生成 5.5 MB 文件并上传</h-button>
      <h-button plain @click="restartDemo">重新加入同一文件</h-button>
      <h-button text @click="resetDemo">清空模拟服务端</h-button>
    </h-space>

    <h-upload
      ref="uploadRef"
      action="/mock/multipart"
      :auto-upload="false"
      :controls="['upload', 'delete']"
      controls-always-visible
      :multipart="multipart"
      :multipart-chunk-size="1"
      :multipart-max-amount-uploading-at-same-time="2"
      @uploaded="onUploaded"
    />

    <h-card title="模拟服务端状态">
      <h-space style="flex-wrap: wrap">
        <h-tag
          v-for="index in chunkCount"
          :key="index"
          :type="uploadedChunkIndexes.has(index - 1) ? 'success' : 'info'"
        >
          分片 {{ index }} · {{ uploadedChunkIndexes.has(index - 1) ? '已保存' : '等待中' }}
        </h-tag>
      </h-space>

      <ol class="multipart-demo-logs" aria-live="polite">
        <li v-for="(log, index) in logs" :key="`${index}-${log}`">{{ log }}</li>
      </ol>
    </h-card>
  </h-space>
</template>

<script setup lang="ts">
import type {
  HUploadFileType,
  HUploadMultipartSetting,
  HUploadRawFileType,
} from '@aurora/horizon-web';
import { reactive, ref } from 'vue';

interface UploadDemoExpose {
  upload: (files?: HUploadRawFileType[]) => Promise<void>;
  abort: () => Promise<void>;
  clearFiles: () => void;
}

const chunkCount = 6;
const uploadRef = ref<UploadDemoExpose>();
const uploadedChunkIndexes = reactive(new Set<number>());
const logs = ref<string[]>(['模拟服务端尚未收到分片']);

function appendLog(message: string) {
  logs.value = [message, ...logs.value].slice(0, 8);
}

function createDemoFile() {
  return new File([new Uint8Array(5.5 * 1024 * 1024)], 'resumable-demo.bin', {
    type: 'application/octet-stream',
  });
}

const multipart: HUploadMultipartSetting = {
  initUpload(file) {
    appendLog(`初始化 ${file.name}，服务端已有 ${uploadedChunkIndexes.size} 个分片`);
    return { uploadId: `${file.name}-${file.size}` };
  },
  getUploadedChunkIndexes() {
    return Array.from(uploadedChunkIndexes);
  },
  uploadPart(_file, chunk, { signal, onProgress }) {
    appendLog(`开始上传分片 ${chunk.index + 1}`);

    return new Promise((resolve, reject) => {
      let loaded = 0;
      const step = Math.max(Math.ceil(chunk.size / 20), 1);
      const timer = window.setInterval(() => {
        loaded = Math.min(loaded + step, chunk.size);
        onProgress(loaded);

        if (loaded === chunk.size) {
          window.clearInterval(timer);
          uploadedChunkIndexes.add(chunk.index);
          appendLog(`服务端保存分片 ${chunk.index + 1}`);
          resolve({ etag: `mock-part-${chunk.index}` });
        }
      }, 250);

      signal.addEventListener(
        'abort',
        () => {
          window.clearInterval(timer);
          appendLog(`暂停分片 ${chunk.index + 1}，下次从该分片继续`);
          reject(new DOMException('Upload paused', 'AbortError'));
        },
        { once: true },
      );
    });
  },
  handleMerge(file, chunks) {
    appendLog(`合并完成：${file.name}，共 ${chunks.length} 个分片`);
    return { uploadId: `${file.name}-${file.size}`, merged: true };
  },
};

async function startDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  uploadedChunkIndexes.clear();
  logs.value = ['创建 5.5 MB 示例文件'];
  await uploadRef.value?.upload([createDemoFile()]);
}

async function restartDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  appendLog('重新加入同一文件，读取服务端断点');
  await uploadRef.value?.upload([createDemoFile()]);
}

async function resetDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  uploadedChunkIndexes.clear();
  logs.value = ['模拟服务端记录已清空'];
}

function onUploaded(file: HUploadFileType) {
  appendLog(`${file.name} 上传成功`);
}
</script>

<style scoped>
.multipart-demo-logs {
  min-height: 8em;
  padding-left: 20px;
  margin: 16px 0 0;
}
</style>
