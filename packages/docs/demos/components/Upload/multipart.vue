<template>
  <div class="docs-demo upload-multipart-demo">
    <div class="docs-demo__actions">
      <h-button type="primary" size="small" @click="startDemo">Start fresh upload</h-button>
      <h-button size="small" @click="restartDemo">Re-add the same file</h-button>
      <h-button size="small" @click="resetDemo">Reset mock server</h-button>
    </div>

    <h-upload
      id="upload-demo-multipart"
      ref="uploadRef"
      :auto-upload="false"
      :controls="['upload', 'delete']"
      controls-always-visible
      :multipart="multipart"
      :multipart-chunk-size="1"
      :multipart-max-amount-uploading-at-same-time="2"
      @uploaded="onUploaded"
    />

    <h-space wrap>
      <h-tag
        v-for="index in chunkCount"
        :key="index"
        :type="uploadedChunkIndexes.has(index - 1) ? 'success' : 'info'"
        is-pure
      >
        Part {{ index }} · {{ uploadedChunkIndexes.has(index - 1) ? 'saved' : 'waiting' }}
      </h-tag>
    </h-space>

    <ol class="upload-multipart-demo__logs" aria-live="polite">
      <li v-for="(log, index) in logs" :key="`${index}-${log}`">{{ log }}</li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type {
  HUploadFileType,
  HUploadMultipartSetting,
  HUploadRawFileType,
} from '@aurora/horizon-web';
import { onBeforeUnmount, reactive, ref } from 'vue';

interface UploadDemoExpose {
  upload: (files?: HUploadRawFileType[]) => Promise<void>;
  abort: () => Promise<void>;
  clearFiles: () => void;
}

const chunkCount = 6;
const uploadRef = ref<UploadDemoExpose>();
const uploadedChunkIndexes = reactive(new Set<number>());
const activeTimers = new Set<number>();
const logs = ref<string[]>(['The local mock server has not received any chunks.']);
let disposed = false;

function appendLog(message: string) {
  if (disposed) return;
  logs.value = [message, ...logs.value].slice(0, 8);
}

function createDemoFile() {
  return new File([new Uint8Array(5.5 * 1024 * 1024)], 'release-evidence.bin', {
    type: 'application/octet-stream',
  });
}

function clearTimer(timer: number) {
  window.clearInterval(timer);
  activeTimers.delete(timer);
}

const multipart: HUploadMultipartSetting = {
  initUpload(file) {
    appendLog(`Initialized ${file.name}; ${uploadedChunkIndexes.size} parts already exist.`);
    return { uploadId: `${file.name}-${file.size}` };
  },
  getUploadedChunkIndexes() {
    return Array.from(uploadedChunkIndexes);
  },
  uploadPart(_file, chunk, { signal, onProgress }) {
    if (disposed) return Promise.reject(new DOMException('Demo unmounted', 'AbortError'));
    appendLog(`Uploading part ${chunk.index + 1}.`);

    return new Promise((resolve, reject) => {
      let loaded = 0;
      const step = Math.max(Math.ceil(chunk.size / 10), 1);
      const timer = window.setInterval(() => {
        loaded = Math.min(loaded + step, chunk.size);
        onProgress(loaded);

        if (loaded === chunk.size) {
          clearTimer(timer);
          uploadedChunkIndexes.add(chunk.index);
          appendLog(`Saved part ${chunk.index + 1}.`);
          resolve({ etag: `local-part-${chunk.index}` });
        }
      }, 120);
      activeTimers.add(timer);

      signal.addEventListener(
        'abort',
        () => {
          clearTimer(timer);
          appendLog(`Paused part ${chunk.index + 1}; it will restart on resume.`);
          reject(new DOMException('Upload paused', 'AbortError'));
        },
        { once: true },
      );
    });
  },
  handleMerge(file, chunks) {
    appendLog(`Merged ${file.name} from ${chunks.length} parts.`);
    return { uploadId: `${file.name}-${file.size}`, merged: true };
  },
};

async function startDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  uploadedChunkIndexes.clear();
  logs.value = ['Created a fresh 5.5 MB sample file.'];
  await uploadRef.value?.upload([createDemoFile()]);
}

async function restartDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  appendLog('Re-added the same file and requested its saved part indexes.');
  await uploadRef.value?.upload([createDemoFile()]);
}

async function resetDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  uploadedChunkIndexes.clear();
  logs.value = ['Local mock server state cleared.'];
}

function onUploaded(file: HUploadFileType) {
  appendLog(`${file.name} uploaded successfully.`);
}

onBeforeUnmount(() => {
  disposed = true;
  void uploadRef.value?.abort();
  for (const timer of [...activeTimers]) clearTimer(timer);
});
</script>

<style scoped>
.upload-multipart-demo__logs {
  margin: 0;
  padding-left: var(--h-spacing-5);
  color: var(--h-text-secondary);
}

.upload-multipart-demo__logs li + li {
  margin-top: var(--h-spacing-1);
}
</style>
