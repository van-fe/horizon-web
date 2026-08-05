<template>
  <h-space direction="vertical" size="large">
    <h-alert :closable="false" show-icon type="info" :description="modeDescription" />

    <h-form>
      <h-form-item label="云存储预设">
        <h-radio-group v-model="provider">
          <h-radio value="qiniu">七牛 Kodo</h-radio>
          <h-radio value="aliyun-oss">阿里云 OSS</h-radio>
          <h-radio value="tencent-cos">腾讯云 COS</h-radio>
        </h-radio-group>
      </h-form-item>
    </h-form>

    <h-space style="flex-wrap: wrap">
      <h-button type="primary" @click="startDemo">生成 3.25 MB 文件并上传</h-button>
      <h-button plain @click="restartDemo">重新加入同一文件</h-button>
      <h-button text @click="resetDemo">重置离线云端</h-button>
    </h-space>

    <h-upload
      ref="uploadRef"
      action="/offline-cloud-sandbox"
      :auto-upload="false"
      :controls="['upload', 'delete']"
      controls-always-visible
      v-bind="activePreset"
      @uploaded="onUploaded"
    />

    <h-card :title="`${providerName} · 离线云端状态`">
      <h-space style="flex-wrap: wrap">
        <h-tag
          v-for="partNumber in chunkCount"
          :key="partNumber"
          :type="activeParts.has(partNumber) ? 'success' : 'info'"
        >
          Part {{ partNumber }} · {{ activeParts.has(partNumber) ? '云端已有 ETag' : '等待中' }}
        </h-tag>
      </h-space>

      <ol class="cloud-provider-demo-logs" aria-live="polite">
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
  type QiniuHttpRequest,
  type QiniuHttpResponse,
  type QiniuHttpTransport,
  type QiniuMultipartSession,
  type TencentCosClientLike,
  type TencentCosMultipartSession,
} from '@aurora/upload-adapters';
import { createAliyunOssUploadPreset } from '@aurora/upload-adapters/aliyun-oss';
import { createQiniuUploadPreset } from '@aurora/upload-adapters/qiniu';
import { createTencentCosUploadPreset } from '@aurora/upload-adapters/tencent-cos';
import { computed, reactive, ref, watch } from 'vue';

type CloudProvider = 'qiniu' | 'aliyun-oss' | 'tencent-cos';

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
const objectKey = 'demo/cloud-provider-demo.bin';
const provider = ref<CloudProvider>('qiniu');
const uploadRef = ref<UploadDemoExpose>();
const logs = ref<string[]>(['请选择 provider 并生成示例文件']);
const qiniuParts = reactive(new Map<number, StoredPart>());
const aliyunParts = reactive(new Map<number, StoredPart>());
const tencentParts = reactive(new Map<number, StoredPart>());
const generations = reactive<Record<CloudProvider, number>>({
  qiniu: 0,
  'aliyun-oss': 0,
  'tencent-cos': 0,
});
let qiniuUploadId = 0;
let aliyunUploadId = 0;
let tencentUploadId = 0;

const providerNames: Record<CloudProvider, string> = {
  qiniu: '七牛 Kodo',
  'aliyun-oss': '阿里云 OSS',
  'tencent-cos': '腾讯云 COS',
};
const providerParts: Record<CloudProvider, Map<number, StoredPart>> = {
  qiniu: qiniuParts,
  'aliyun-oss': aliyunParts,
  'tencent-cos': tencentParts,
};
const modeDescriptions: Record<CloudProvider, string> = {
  qiniu:
    '七牛模式执行真实 Multipart v2 适配流程；沙箱会取消当前模拟请求，生产默认 transport 会中止当前 XHR。',
  'aliyun-oss':
    '阿里云模式执行真实 ali-oss 低层 API 适配流程；官方 uploadPart 没有 AbortSignal，暂停为逻辑取消，进度按整片完成更新。',
  'tencent-cos':
    '腾讯云模式执行真实 cos-js-sdk-v5 callback API；onProgress 连续上报字节进度，暂停为逻辑取消，已完成 Part 会由 multipartListPart 恢复。',
};

const providerName = computed(() => providerNames[provider.value]);
const activeParts = computed(() => providerParts[provider.value]);
const modeDescription = computed(() => modeDescriptions[provider.value]);

function appendLog(message: string, source = provider.value) {
  logs.value = [`[${providerNames[source]}] ${message}`, ...logs.value].slice(0, 10);
}

function createDemoFile() {
  return new File([new Uint8Array(FILE_SIZE)], 'cloud-provider-demo.bin', {
    type: 'application/octet-stream',
    lastModified: 1_700_000_000_000,
  });
}

function createQiniuToken() {
  const policy = btoa(JSON.stringify({ scope: `demo-bucket:${objectKey}` }))
    .replace(/\//g, '_')
    .replace(/\+/g, '-');
  return `demo-ak:demo-signature:${policy}`;
}

function abortError() {
  return new DOMException('Upload paused', 'AbortError');
}

function simulateQiniuPart(request: QiniuHttpRequest, partNumber: number, part: Blob) {
  if (request.signal?.aborted) return Promise.reject(abortError());

  const generation = generations.qiniu;
  appendLog(`PUT Part ${partNumber}，开始上报字节进度`, 'qiniu');

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
      if (generation === generations.qiniu) {
        qiniuParts.set(partNumber, { etag, size: part.size });
      }
      appendLog(`Part ${partNumber} 返回 ETag`, 'qiniu');
      resolve({ etag, md5: `mock-md5-${partNumber}` });
    }, 120);

    const onAbort = () => {
      window.clearInterval(timer);
      appendLog(`Part ${partNumber} 的当前模拟请求已中止，云端分片保留`, 'qiniu');
      reject(abortError());
    };
    request.signal?.addEventListener('abort', onAbort, { once: true });
  });
}

async function qiniuTransport<T = unknown>(
  request: QiniuHttpRequest,
): Promise<QiniuHttpResponse<T>> {
  const url = new URL(request.url);
  const partMatch = url.pathname.match(/\/uploads\/[^/]+\/(\d+)$/);
  let data: unknown;

  if (request.method === 'POST' && url.pathname.endsWith('/uploads')) {
    data = {
      uploadId: `qiniu-demo-${++qiniuUploadId}`,
      expireAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    };
    appendLog('初始化 UploadId', 'qiniu');
  } else if (request.method === 'GET') {
    data = {
      uploadId: `qiniu-demo-${qiniuUploadId}`,
      expireAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      partNumberMarker: 0,
      parts: [...qiniuParts].map(([partNumber, part]) => ({
        partNumber,
        etag: part.etag,
        size: part.size,
      })),
    };
    appendLog(`ListParts 恢复 ${qiniuParts.size} 个分片`, 'qiniu');
  } else if (request.method === 'PUT' && partMatch && request.body instanceof Blob) {
    data = await simulateQiniuPart(request, Number(partMatch[1]), request.body);
  } else if (request.method === 'POST') {
    data = { key: objectKey, hash: 'qiniu-demo-hash' };
    appendLog('CompleteMultipartUpload 合并成功', 'qiniu');
  } else {
    data = {};
  }

  return { status: 200, data: data as T };
}

const qiniuPreset = createQiniuUploadPreset({
  multipartChunkSize: 1,
  key: objectKey,
  uploadHost: 'https://upload.example.test',
  tokenProvider: () => createQiniuToken(),
  transport: qiniuTransport as QiniuHttpTransport,
  checkpointStore: createMemoryCheckpointStore<QiniuMultipartSession>(),
  maxAmountUploadingAtSameTime: 2,
});

const aliyunClient: AliyunOssClientLike = {
  async initMultipartUpload() {
    appendLog('initMultipartUpload 初始化 UploadId', 'aliyun-oss');
    return { uploadId: `aliyun-demo-${++aliyunUploadId}` };
  },
  async listParts() {
    appendLog(`listParts 恢复 ${aliyunParts.size} 个分片及 ETag`, 'aliyun-oss');
    return {
      parts: [...aliyunParts].map(([partNumber, part]) => ({
        PartNumber: partNumber,
        ETag: part.etag,
        Size: part.size,
      })),
      isTruncated: false,
    };
  },
  async uploadPart(_name, _uploadId, partNumber, _file, start, end) {
    const generation = generations['aliyun-oss'];
    const size = end - start;
    appendLog(`uploadPart(${partNumber}) 已交给 ali-oss，等待整片完成`, 'aliyun-oss');
    await new Promise(resolve => window.setTimeout(resolve, 900));
    const etag = `aliyun-etag-${partNumber}`;
    if (generation === generations['aliyun-oss']) {
      aliyunParts.set(partNumber, { etag, size });
    }
    appendLog(`Part ${partNumber} 完成，获得 ETag`, 'aliyun-oss');
    return { etag };
  },
  async completeMultipartUpload(_name, _uploadId, parts) {
    appendLog(`completeMultipartUpload 按顺序提交 ${parts.length} 个 ETag`, 'aliyun-oss');
    return { name: objectKey, etag: 'aliyun-complete-etag' };
  },
};

const aliyunPreset = createAliyunOssUploadPreset({
  client: aliyunClient,
  objectKey,
  multipartChunkSize: 1,
  checkpointStore: createMemoryCheckpointStore<AliyunOssMultipartSession>(),
  maxAmountUploadingAtSameTime: 2,
});

const tencentClient: TencentCosClientLike = {
  multipartInit(_request, callback) {
    appendLog('multipartInit 初始化 UploadId', 'tencent-cos');
    callback(null, { UploadId: `tencent-demo-${++tencentUploadId}` });
  },
  multipartListPart(_request, callback) {
    appendLog(`multipartListPart 恢复 ${tencentParts.size} 个分片及 ETag`, 'tencent-cos');
    callback(null, {
      Part: [...tencentParts].map(([partNumber, part]) => ({
        PartNumber: partNumber,
        ETag: part.etag,
        Size: part.size,
      })),
      IsTruncated: false,
    });
  },
  multipartUpload(request, callback) {
    const generation = generations['tencent-cos'];
    const partNumber = request.PartNumber;
    const size = request.ContentLength ?? request.Body.size;
    const step = Math.max(Math.ceil(size / 8), 1);
    let loaded = 0;
    appendLog(`multipartUpload(${partNumber}) 开始上报 onProgress`, 'tencent-cos');

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
      if (generation === generations['tencent-cos']) {
        tencentParts.set(partNumber, { etag, size });
      }
      appendLog(`Part ${partNumber} 完成，获得 ETag`, 'tencent-cos');
      callback(null, { ETag: etag });
    }, 120);
  },
  multipartComplete(request, callback) {
    appendLog(`multipartComplete 按顺序提交 ${request.Parts.length} 个 ETag`, 'tencent-cos');
    callback(null, { Location: 'https://example.test/cloud-provider-demo.bin' });
  },
};

const tencentPreset = createTencentCosUploadPreset({
  client: tencentClient,
  bucket: 'demo-bucket-1250000000',
  region: 'ap-guangzhou',
  objectKey,
  multipartChunkSize: 1,
  checkpointStore: createMemoryCheckpointStore<TencentCosMultipartSession>(),
  maxAmountUploadingAtSameTime: 2,
});

const providerPresets = {
  qiniu: qiniuPreset,
  'aliyun-oss': aliyunPreset,
  'tencent-cos': tencentPreset,
};
const activePreset = computed(() => providerPresets[provider.value]);

async function startDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  generations[provider.value] += 1;
  activeParts.value.clear();
  logs.value = [`[${providerName.value}] 创建 3.25 MB 示例文件`];
  await uploadRef.value?.upload([createDemoFile()]);
}

async function restartDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  appendLog('重新加入同一文件，使用 checkpoint + ListParts 恢复');
  if (provider.value !== 'qiniu') {
    appendLog('等待已发出的 SDK Part 完成后再查询云端');
    await new Promise(resolve => window.setTimeout(resolve, 1100));
  }
  await uploadRef.value?.upload([createDemoFile()]);
}

async function resetDemo() {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  generations[provider.value] += 1;
  activeParts.value.clear();
  logs.value = [`[${providerName.value}] 离线云端记录已清空`];
}

function onUploaded(file: HUploadFileType) {
  appendLog(`${file.name} 上传成功`);
}

watch(provider, async () => {
  await uploadRef.value?.abort();
  uploadRef.value?.clearFiles();
  logs.value = [`已切换到 ${providerName.value}`];
});
</script>

<style scoped>
.cloud-provider-demo-logs {
  min-height: 9em;
  padding-left: 20px;
  margin: 16px 0 0;
}
</style>
