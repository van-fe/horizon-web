# Upload Adapters

云存储接入放在独立的 `@aurora/upload-adapters` 包中，`@aurora/horizon-web` 不依赖任何厂商
SDK。预设会同时返回 `multipart` 和 `multipartChunkSize`，可以直接通过 `v-bind` 使用，避免
Upload 与云端使用不同的分片边界。Upload 自身的切片、Worker 与自定义服务端协议见
[分片断点续传](/demos/components/Upload#分片断点续传)。

## 交互演示

三个离线沙箱分别展示各厂商的低层 multipart 适配代码，只把网络层或 SDK client 替换成内存实现。
每个示例都可以暂停、继续或“重新加入同一文件”，并观察厂商 ListParts API 恢复的 Part 与 ETag。

### 七牛 Kodo

七牛示例执行 Multipart v2 REST API，连续上报字节进度。暂停会取消当前模拟请求；生产默认
transport 会中止当前 XHR。

:::demo extensions/upload-adapters/qiniu.vue :::

### 阿里云 OSS

阿里云示例执行 `ali-oss` 低层 API。官方 `uploadPart` 没有 `AbortSignal`，因此暂停为逻辑取消，
进度在整片完成时更新。

:::demo extensions/upload-adapters/aliyun-oss.vue :::

### 腾讯云 COS

腾讯云示例执行 `cos-js-sdk-v5` callback API，通过 `onProgress` 连续上报字节进度。低层 SDK
只能逻辑取消，已完成 Part 会由 `multipartListPart` 恢复。

:::demo extensions/upload-adapters/tencent-cos.vue :::

## 安装

```shell
bun add @aurora/upload-adapters
```

## 厂商预设

按需展开对应厂商的接入示例：

<details>
<summary>七牛 Kodo：Multipart v2 与短期 Upload Token</summary>

七牛预设直接封装公开的 Multipart v2 REST API，浏览器只从业务后端获取短期 Upload Token：

```ts
import { createQiniuUploadPreset } from '@aurora/upload-adapters/qiniu';

const uploadProps = createQiniuUploadPreset({
  multipartChunkSize: 4,
  key: ({ rawFile }) => `uploads/${rawFile.name}`,
  async tokenProvider({ key }) {
    const response = await fetch('/api/uploads/qiniu-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
    return response.json(); // { token, bucket, uploadHost? }
  },
});
```

</details>

<details>
<summary>阿里云 OSS：ali-oss 与 STS</summary>

阿里云预设复用业务创建的官方 `ali-oss` client，不会把 SDK 打入适配器包：

```shell
bun add ali-oss
bun add -d @types/ali-oss
```

```ts
import OSS from 'ali-oss';
import { createAliyunOssUploadPreset } from '@aurora/upload-adapters/aliyun-oss';

const client = new OSS({
  region: 'oss-cn-hangzhou',
  bucket: 'example-bucket',
  authorizationV4: true,
  refreshSTSToken: () => fetch('/api/uploads/oss-sts').then(response => response.json()),
});

const uploadProps = createAliyunOssUploadPreset({
  client,
  multipartChunkSize: 5,
  objectKey: ({ rawFile }) => `uploads/${rawFile.name}`,
});
```

</details>

<details>
<summary>腾讯云 COS：cos-js-sdk-v5 与临时密钥</summary>

腾讯云预设同样复用业务创建的官方 `cos-js-sdk-v5` client，临时密钥由业务后端签发：

```shell
bun add cos-js-sdk-v5
```

```ts
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

const uploadProps = createTencentCosUploadPreset({
  client,
  bucket: 'example-bucket-1250000000',
  region: 'ap-guangzhou',
  multipartChunkSize: 5,
  objectKey: ({ rawFile }) => `uploads/${rawFile.name}`,
});
```

</details>

## 与 Upload 配合

三种 preset 的返回值都可以直接绑定到 Upload：

```vue
<h-upload v-bind="uploadProps" :controls="['upload', 'delete']" />
```

## CORS 与安全

真实浏览器直传前，Bucket CORS 必须允许业务 Origin 及 multipart 使用的 `GET`、`PUT`、`POST`
请求。阿里云 OSS 还需暴露 `ETag` 与 `x-oss-request-id`，腾讯云 COS 需暴露 `ETag` 与
`Content-Length`，否则浏览器无法读取完成分片所需的 ETag。参见
[七牛 CORS](https://developer.qiniu.com/kodo/8608/dev-cross-domain-resource-sharing)、
[阿里云 Browser.js 分片上传](https://help.aliyun.com/zh/oss/developer-reference/multipart-upload-11)
和[腾讯云 JavaScript SDK 快速入门](https://cloud.tencent.com/document/product/436/11459)。

三个预设默认使用 localStorage 保存不含凭证的 UploadId、对象键、分片大小等 checkpoint，重选文件
后以云端 ListParts 返回值为准恢复 ETag。不要在浏览器保存七牛 AK/SK、阿里云永久 AccessKey 或
腾讯云永久 SecretId/SecretKey；七牛应使用短期 Upload Token，阿里云和腾讯云应使用可刷新的临时
凭证。暂停也不会调用云端 Abort/Delete，因为该操作会永久清除已上传分片。完整配置和自定义
provider 协议见包内 README。
