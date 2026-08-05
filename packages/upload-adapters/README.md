# @aurora/upload-adapters

独立、可摇树优化的分片断点续传适配器。它不依赖 `@aurora/horizon-web` 的运行时代码，只通过结构化类型把云存储协议转换成 Upload 的 `multipart` 配置。

当前内置：

- 七牛 Kodo Multipart Upload v2（浏览器 XHR，支持分片级真实取消和字节进度）
- 阿里云 OSS Browser.js 低层 Multipart API（复用业务提供的 `ali-oss` client）
- 腾讯云 COS JavaScript SDK 低层 Multipart API（复用业务提供的 `cos-js-sdk-v5` client）
- 自定义 provider 协议、Horizon bridge、内存与 localStorage checkpoint store

## 安装

```shell
bun add @aurora/upload-adapters
```

阿里云预设还需要业务项目自行安装官方 SDK：

```shell
bun add ali-oss
bun add -d @types/ali-oss
```

## 七牛 Kodo

```vue
<template>
  <!-- multipart 和 multipartChunkSize 会一起注入，避免分片边界配置不一致。 -->
  <h-upload v-bind="qiniuUpload" :controls="['upload', 'delete']" />
</template>

<script setup lang="ts">
import { createQiniuUploadPreset } from '@aurora/upload-adapters/qiniu';

const qiniuUpload = createQiniuUploadPreset({
  multipartChunkSize: 4,
  key: ({ rawFile }) => `uploads/${rawFile.name}`,
  async tokenProvider({ key }) {
    const response = await fetch('/api/uploads/qiniu-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
    return response.json() as Promise<{
      token: string;
      bucket: string;
      uploadHost?: string;
    }>;
  },
});
</script>
```

`uploadHost` 可由 token endpoint 返回，也可直接配置；省略时适配器会通过 token 中的 AK 和 Bucket 查询上传域名。每个 REST 请求都会带短期 Upload Token；401 时会合并并发刷新并重试一次。

## 阿里云 OSS

```vue
<template>
  <h-upload v-bind="aliyunUpload" :controls="['upload', 'delete']" />
</template>

<script setup lang="ts">
import OSS from 'ali-oss';
import { createAliyunOssUploadPreset } from '@aurora/upload-adapters/aliyun-oss';

const client = new OSS({
  region: 'oss-cn-hangzhou',
  bucket: 'example-bucket',
  authorizationV4: true,
  async refreshSTSToken() {
    const response = await fetch('/api/uploads/oss-sts');
    return response.json();
  },
  refreshSTSTokenInterval: 300_000,
});

const aliyunUpload = createAliyunOssUploadPreset({
  client,
  multipartChunkSize: 5,
  objectKey: ({ rawFile }) => `uploads/${rawFile.name}`,
});
</script>
```

阿里云预设调用 `initMultipartUpload`、`listParts`、`uploadPart` 和 `completeMultipartUpload`，不会把 `ali-oss` 打进本包。官方低层 `uploadPart` 没有请求级 `AbortSignal` 和连续字节进度，因此暂停是逻辑取消，进度按整片完成更新；相同 PartNumber 重传会安全覆盖。

## 腾讯云 COS

```vue
<template>
  <h-upload v-bind="tencentUpload" :controls="['upload', 'delete']" />
</template>

<script setup lang="ts">
import COS from 'cos-js-sdk-v5';
import { createTencentCosUploadPreset } from '@aurora/upload-adapters/tencent-cos';

const client = new COS({
  getAuthorization(_options, callback) {
    fetch('/api/uploads/cos-sts')
      .then(response => response.json())
      .then(data => {
        const { credentials } = data;
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          SecurityToken: credentials.sessionToken,
          StartTime: data.startTime,
          ExpiredTime: data.expiredTime,
          ScopeLimit: true,
        });
      });
  },
});

const tencentUpload = createTencentCosUploadPreset({
  client,
  bucket: 'example-1250000000',
  region: 'ap-guangzhou',
  multipartChunkSize: 5,
  objectKey: ({ rawFile }) => `uploads/${rawFile.name}`,
});
</script>
```

业务项目需自行安装官方 SDK：

```shell
bun add cos-js-sdk-v5
```

腾讯云预设会把 `multipartInit`、`multipartListPart`、`multipartUpload`、 `multipartComplete` 和可选的 `multipartAbort` callback API 转换成 Promise，不会把 `cos-js-sdk-v5` 打进本包。恢复时会自动翻页查询已上传 Part；若旧 UploadId 已不存在，会创建新会话并更新 checkpoint。`multipartUpload.onProgress` 会提供分片内的真实字节进度；低层接口没有请求级 `AbortSignal`，因此暂停是逻辑取消，取消后的回调和进度会被忽略。显式调用 adapter 的 `abort` 才会删除云端未完成会话。

## Bucket CORS 前置条件

浏览器直传前，Bucket 必须允许业务站点的 Origin 以及 multipart 使用的 `GET`、`PUT`、`POST`
请求。阿里云 OSS 还需暴露 `ETag` 与 `x-oss-request-id`，腾讯云 COS 需暴露 `ETag` 与
`Content-Length`，否则 SDK 无法读取完成分片所需的 ETag。具体配置见
[七牛 CORS](https://developer.qiniu.com/kodo/8608/dev-cross-domain-resource-sharing)、
[阿里云 Browser.js 分片上传](https://help.aliyun.com/zh/oss/developer-reference/multipart-upload-11)
和[腾讯云 JavaScript SDK 快速入门](https://cloud.tencent.com/document/product/436/11459)。

## Checkpoint 与安全边界

三个预设默认把不含凭证的 session 存入 localStorage。缓存键包含 provider、对象 key、分片大小和文件指纹；页面刷新后重新选择同一文件时，会以云端 `listParts` 结果为准恢复 ETag。默认指纹会异步计算文件元数据与首、中、尾各 64 KiB 的 SHA-256，避免同名同大小文件的常见误恢复；要求完整内容证明时，应传入业务对象版本或全文件 hash 作为 `fingerprint`。

- 浏览器中禁止保存七牛 AK/SK、阿里云永久 AccessKey、腾讯云永久 SecretId/SecretKey。
- 七牛只接收业务后端签发的短期 Upload Token。
- 阿里云只使用 STS，并由 `ali-oss` 的 `refreshSTSToken` 刷新。
- 腾讯云只使用后端下发的临时密钥，并由 `cos-js-sdk-v5` 的 `getAuthorization` 刷新。
- 暂停不会调用云端 Abort/Delete；后者会永久删除已上传 Part，不能再续传。
- 对象 key 必须稳定。严格完整性场景可通过 `fingerprint` 增加业务 ID 或服务端内容 hash。
- 建议为未完成的 multipart task 配置 Bucket 生命周期清理规则。

## 自定义 provider

```ts
import {
  toHorizonMultipartSetting,
  type MultipartProviderAdapter,
} from '@aurora/upload-adapters/core';

const adapter: MultipartProviderAdapter<MySession, MyPart> = {
  id: 'my-storage',
  init: context => createOrRestoreSession(context),
  listParts: context => listRemoteParts(context),
  uploadPart: context => uploadRemotePart(context),
  complete: context => completeRemoteUpload(context),
};

const multipart = toHorizonMultipartSetting(adapter);
```

核心协议不导入 Vue 或 Horizon 类型，可以被其他上传 UI 复用；Horizon bridge 只是一个单独的薄层。
