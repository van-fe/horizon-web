# Upload Adapters

Cloud integrations live in the standalone `@aurora/upload-adapters` package, so
`@aurora/horizon-web` has no runtime dependency on a vendor SDK. Each preset returns both
`multipart` and `multipartChunkSize` and can be passed with `v-bind`, preventing Upload and the
provider from using different part boundaries. See
[Resumable Multipart Upload](/en/demos/components/Upload#resumable-multipart-upload) for Upload's
own slicing, Worker behavior, and custom-backend protocol.

## Interactive demo

The offline sandbox below executes the real low-level multipart adapter for Qiniu Multipart v2,
Aliyun OSS, or Tencent Cloud COS; only its network transport or SDK client is replaced with an
in-memory implementation. Select a provider, start an upload, pause or re-add the same file, and
watch ListParts restore Parts and ETags. Qiniu reports byte progress; the sandbox cancels its
current simulated request, while the production default transport aborts the active XHR. Tencent
Cloud also reports byte progress but uses logical cancellation at the low-level SDK; Aliyun uses
logical cancellation and reports progress when each part finishes.

:::demo extensions/upload-adapters/cloud-providers.vue :::

## Installation

```shell
bun add @aurora/upload-adapters
```

## Provider presets

Expand the integration example for the provider you need:

<details>
<summary>Qiniu Kodo: Multipart v2 and a short-lived Upload Token</summary>

The Qiniu preset wraps the public Multipart v2 REST API. The browser only requests a short-lived
Upload Token from the application backend:

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
<summary>Aliyun OSS: ali-oss and STS</summary>

The Aliyun preset reuses an official `ali-oss` client created by the application and does not
bundle the SDK:

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
<summary>Tencent Cloud COS: cos-js-sdk-v5 and temporary credentials</summary>

The Tencent Cloud preset likewise reuses an official `cos-js-sdk-v5` client created by the
application. Temporary credentials are issued by the application backend:

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

## Using the presets with Upload

The return value from any preset can be bound directly to Upload:

```vue
<h-upload v-bind="uploadProps" :controls="['upload', 'delete']" />
```

## CORS and security

Before uploading directly from a browser, configure the bucket CORS policy to allow the
application Origin and the `GET`, `PUT`, and `POST` methods used by multipart upload. Aliyun OSS
must also expose `ETag` and `x-oss-request-id`; Tencent Cloud COS must expose `ETag` and
`Content-Length`, otherwise the browser cannot read the ETag needed to complete each Part. See the
[Qiniu CORS guide](https://developer.qiniu.com/kodo/8608/dev-cross-domain-resource-sharing),
[Aliyun Browser.js multipart guide](https://help.aliyun.com/zh/oss/developer-reference/multipart-upload-11),
and [Tencent Cloud JavaScript SDK guide](https://cloud.tencent.com/document/product/436/11459).

All three presets store credential-free UploadId, object key, and part-size checkpoints in
localStorage by default, then treat the provider's ListParts response as authoritative when the
file is selected again. Never store Qiniu AK/SK, permanent Aliyun AccessKeys, or permanent Tencent
Cloud SecretId/SecretKey values in a browser: use a short-lived Qiniu Upload Token or refreshable
temporary credentials for Aliyun and Tencent Cloud. Pause never calls the cloud Abort/Delete API
because that operation permanently removes uploaded Parts. See the package README for every option
and the custom-provider protocol.
