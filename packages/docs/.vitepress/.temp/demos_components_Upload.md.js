import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Upload.md","filePath":"zh/demos/components/Upload.md"}');
const _sfc_main = { name: "demos/components/Upload.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_code_block = resolveComponent("code-block");
  const _component_h_link = resolveComponent("h-link");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Upload</h1><p class="description">通过点击或拖拽，将信息（文件、图片、视频等）上传到远程服务器上的过程</p><h2 id="单文件上传" tabindex="-1">单文件上传 <a class="header-anchor" href="#单文件上传" aria-label="Permalink to &quot;单文件上传&quot;">​</a></h2><p>选择不同文件后会替换掉之前的文件</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small"></h-radio>
        <h-radio label="medium"></h-radio>
        <h-radio label="large"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="文件元素尺寸">
      <h-radio-group v-model="fileItemSize">
        <h-radio label="small"></h-radio>
        <h-radio label="medium"></h-radio>
        <h-radio label="large"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="展示上传按钮">
      <h-radio-group v-model="showUploader">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-space>
    <h-upload
      v-model="modelValue"
      :action="actionURL"
      method="POST"
      :size="size"
      :file-item-size="fileItemSize"
      :no-uploader="!showUploader"
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
    />
  </h-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { HUploadRawFileType, UploadProps, HUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';

const actionURL = new URL('/upload-mock.json', import.meta.url).href;

const size = ref<Exclude<UploadProps['size'], undefined>>('medium');
const fileItemSize = ref<Exclude<UploadProps['fileItemSize'], undefined>>('medium');
const showUploader = ref(true);

const modelValue = ref<HUploadRawFileType>({
  name: 'background.jpg',
  url: '/demo-assets/scene-coast.svg',
});

function handleChange(file: HUploadFileType, response: Data) {
  console.info('change:', file, response);
}

function onAddFile(file: HUploadFileType) {
  console.info('Add File: ', file);
}

function onUploadFile(file: HUploadFileType) {
  console.info('Upload File: ', file);
}

function onRemoveFile(file: HUploadFileType) {
  console.info('Remove File: ', file);
}

function onUploadingFile(file: HUploadFileType, process: number, response: Data) {
  console.info('Uploading File: ', file, process, response);
}

function onUploadedFile(file: HUploadFileType, response: Data) {
  console.info('Uploaded File: ', file, response);
}

function onPauseFile(file: HUploadFileType) {
  console.info('Pause File: ', file);
}

function onContinueFile(file: HUploadFileType) {
  console.info('Continue File: ', file);
}

function onRetryFile(file: HUploadFileType) {
  console.info('Retry File: ', file);
}

function onFailFile(file: HUploadFileType, reason: string, response: Data) {
  console.info('Fail File: ', file, reason, response);
}
<\/script>
`,
    path: "demos/components/Upload/basic.vue"
  }, null, _parent));
  _push(`<h2 id="多文件上传" tabindex="-1">多文件上传 <a class="header-anchor" href="#多文件上传" aria-label="Permalink to &quot;多文件上传&quot;">​</a></h2><p>设置 <code>multiple = true</code>，可以选择、上传多个文件</p><p>配合 <code>limit</code> 限制选择的文件数量</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space>
    <h-upload
      v-model="fileList"
      action="https://horizon-web-inspector.demoint.com/upload-mock"
      :multiple="true"
      :limit="3"
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
      @exceed="onExceed"
    />
  </h-space>
</template>

<script lang="ts" setup>
import type { HUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';
import { ref } from 'vue';

const fileList = ref([]);

function handleChange(file: HUploadFileType, response: Data) {
  console.info('change:', file, response);
}

function onAddFile(file: HUploadFileType) {
  console.info('Add File: ', file);
}

function onUploadFile(file: HUploadFileType) {
  console.info('Upload File: ', file);
}

function onRemoveFile(file: HUploadFileType) {
  console.info('Remove File: ', file);
}

function onUploadingFile(file: HUploadFileType, process: number, response: Data) {
  console.info('Uploading File: ', file, process, response);
}

function onUploadedFile(file: HUploadFileType, response: Data) {
  console.info('Uploaded File: ', file, response);
}

function onPauseFile(file: HUploadFileType) {
  console.info('Pause File: ', file);
}

function onContinueFile(file: HUploadFileType) {
  console.info('Continue File: ', file);
}

function onRetryFile(file: HUploadFileType) {
  console.info('Retry File: ', file);
}

function onFailFile(file: HUploadFileType, reason: string, response: Data) {
  console.info('Fail File: ', file, reason, response);
}

function onExceed(pickedFiles: HUploadFileType[], existedFiles: HUploadFileType[]) {
  console.info('Exceed Files: ', pickedFiles, existedFiles);
}
<\/script>
`,
    path: "demos/components/Upload/multiple.vue"
  }, null, _parent));
  _push(`<h2 id="拦截文件" tabindex="-1">拦截文件 <a class="header-anchor" href="#拦截文件" aria-label="Permalink to &quot;拦截文件&quot;">​</a></h2><p>设置 <code>accept</code> 可以控制选择的文件类型</p><p>默认开启严格控制文件类型，会对所有非 <code>accept</code> 允许的文件进行拦截，且对外抛出 <code>accept-error</code> 事件</p><p>如果希望手动控制，则可以设置 <code>accept-strict = false</code>，由自定义的 <code>before-upload</code> 拦截</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="是否严格拦截上传文件">
      <h-switch v-model="acceptStrict" :status="true" />
    </h-form-item>
    <h-form-item label="多选">
      <h-switch v-model="multiple" :status="true" />
    </h-form-item>
  </h-form>
  <h-space>
    <h-upload
      v-model="modelValue"
      action="https://horizon-web-inspector.demoint.com/upload-mock"
      method="POST"
      accept=".png"
      :multiple="multiple"
      :accept-strict="acceptStrict"
      :before-upload="onBeforeUpload"
      @accept-error="onAcceptError"
    />
  </h-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message, HUploadFileType, HUploadRawFileType, UploadProps , HUploadFileTypeEnum } from '@aurora/horizon-web';

const acceptStrict = ref<UploadProps['acceptStrict']>(false);
const multiple = ref(false);

const modelValue = ref<HUploadRawFileType>();

function onBeforeUpload(file: HUploadFileType) {
  console.info('before-upload:', file);
  if (!(file.type === HUploadFileTypeEnum.Image && file.raw?.type === 'image/png')) {
    $message.error('手动拦截：您选择的不是 PNG 文件');
    return false;
  } else return true;
}

function onAcceptError(files: HUploadFileType[]) {
  console.info(files);

  $message.error(\`自动拦截：您选择的 \${files.map(file => file.name).join('、')} 不是 PNG 文件\`);
}
<\/script>
`,
    path: "demos/components/Upload/before-upload.vue"
  }, null, _parent));
  _push(`<h2 id="文件大小检查" tabindex="-1">文件大小检查 <a class="header-anchor" href="#文件大小检查" aria-label="Permalink to &quot;文件大小检查&quot;">​</a></h2><p>设置 <code>file-size-limit</code>，即可自动对文件的大小进行检查</p><p>如果超出，会自动过滤，并且抛出 <code>file-size-exceed</code> 事件</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="是否直接拦截超过 2MB 的文件">
      <h-switch v-model="enableFileSizeLimit" :status="true" />
    </h-form-item>
    <h-form-item label="多选">
      <h-switch v-model="multiple" :status="true" />
    </h-form-item>
  </h-form>
  <h-space>
    <h-upload
      v-model="modelValue"
      action="https://horizon-web-inspector.demoint.com/upload-mock"
      method="POST"
      :multiple="multiple"
      :file-size-limit="enableFileSizeLimit ? 2 : undefined"
      :before-upload="onBeforeUpload"
      @file-size-exceed="onFileSizeExceed"
    />
  </h-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message, HUploadFileType, HUploadRawFileType } from '@aurora/horizon-web';

const enableFileSizeLimit = ref(false);
const multiple = ref(false);

const modelValue = ref<HUploadRawFileType>();

function onBeforeUpload(file: HUploadFileType) {
  console.info('before-upload:', file);
  if ((file.size || 0) > 1024 * 1024 * 2) {
    $message.error('手动拦截：您选择的文件超过 2MB 大小');
    return false;
  } else return true;
}

function onFileSizeExceed(files: HUploadFileType[]) {
  console.info(files);

  $message.error(\`自动拦截： \${files.map(file => file.name).join('、')} 超过 2MB 大小\`);
}
<\/script>
`,
    path: "demos/components/Upload/file-size-exceed.vue"
  }, null, _parent));
  _push(`<h2 id="头像上传" tabindex="-1">头像上传 <a class="header-anchor" href="#头像上传" aria-label="Permalink to &quot;头像上传&quot;">​</a></h2><p>设置 <code>type = &#39;gallery&#39;</code>，并配置一些数据，可以实现类似于头像上传的功能</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-upload
    v-model="modelValue"
    :action="actionURL"
    type="gallery"
    size="huge"
    gallery-shape="square"
    accept="image/*"
    :handle-success="handleSuccess"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { HUploadUserFile } from '@aurora/horizon-web';
import type { HUploadFile } from '@aurora/horizon-web';

const actionURL = new URL('/upload-mock.json', import.meta.url).href;

const modelValue = ref<HUploadUserFile>({
  name: 'background.jpg',
  url: '/demo-assets/scene-coast.svg',
});

function handleSuccess(res: any, file: HUploadFile) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return file.blobUrl;
}
<\/script>`,
    path: "demos/components/Upload/avatar.vue"
  }, null, _parent));
  _push(`<h2 id="照片墙" tabindex="-1">照片墙 <a class="header-anchor" href="#照片墙" aria-label="Permalink to &quot;照片墙&quot;">​</a></h2><p>设置 <code>type = &#39;gallery&#39;</code>，可以开启照片墙上传模式</p><p>照片墙模式下，强制展示图片列表，无法通过 <code>show-file-list</code> 控制是否展示列表</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
        <h-radio label="huge" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="形状">
      <h-radio-group v-model="galleryShape">
        <h-radio label="square" />
        <h-radio label="rectangle" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-button class="mb-2" @click="change">修改原始 modelValue</h-button>
  <h-upload
    v-model="modelValue"
    action="https://horizon-web-inspector.demoint.com/upload-mock"
    type="gallery"
    :multiple="true"
    :size="size"
    :gallery-shape="galleryShape"
    accept="image/*, video/*"
    :handle-success="handleSuccess"
    :auto-upload="false"
    @uploading="onUploading"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { HUploadUserFile, UploadProps, HUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';

const size = ref<UploadProps['size']>('medium');
const galleryShape = ref<UploadProps['galleryShape']>('rectangle');

const modelValue = ref<HUploadUserFile[]>(
  [
    {
      name: 'background.jpg',
      url: '/demo-assets/scene-coast.svg',
    },
    {
      name: 'preview.mp4',
      url: '/aurora-background.mp4',
    },
  ],
);

function onUploading(file: HUploadFileType, process: number, response: Data | undefined) {
  console.info(file, process, response);
}

function handleSuccess(res: any, file: HUploadFileType) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return file.url || file.blobUrl;
}

function change() {
  modelValue.value = [{
    name: 'preview.mp4',
    url: '/aurora-background.mp4',
  }];
}

function onUpdateModelValue(modelValue: HUploadFileType[]) {
  console.info('update: ', modelValue);
}
<\/script>
`,
    path: "demos/components/Upload/gallery.vue"
  }, null, _parent));
  _push(`<h2 id="拖拽上传" tabindex="-1">拖拽上传 <a class="header-anchor" href="#拖拽上传" aria-label="Permalink to &quot;拖拽上传&quot;">​</a></h2><p>设置 <code>type = &#39;drop&#39;</code>，可以开启拖拽上传功能</p><p>会根据 <code>props.accept</code>、<code>props.fileSizeLimit</code>、<code>props.multiple</code>+<code>props.limit</code> 的设置展示 <code>tips</code></p><p>如果自动生成的 <code>tips</code> 无法满足你的需求，可以通过插槽 <code>tips</code> 来自定义内容</p><p>拖拽放置的文件也会根据 <code>props.accept</code> 判断是否可以放入上传列表中</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-upload
    action="https://horizon-web-inspector.demoint.com/upload-mock"
    type="drop"
    :multiple="true"
    :limit="5"
    :accept="accept"
    :handle-success="handleSuccess"
    @accept-error="onAcceptError"
  />
  <h-button class="mt-5" @click="change">修改 accept 为 .png,.jpg</h-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message, HUploadFileType } from '@aurora/horizon-web';
const accept = ref('.png');

function change() {
  accept.value = '.png,.jpg';
}

function onAcceptError(files: HUploadFileType[]) {
  console.info(files);

  $message.error(\`自动拦截：您选择的 \${files.map(file => file.name).join('、')} 不是 \${accept.value} 文件\`);
}

function handleSuccess(res: any, file: HUploadFileType) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return file.blobUrl;
}
<\/script>
`,
    path: "demos/components/Upload/drop.vue"
  }, null, _parent));
  _push(`<h2 id="禁用状态" tabindex="-1">禁用状态 <a class="header-anchor" href="#禁用状态" aria-label="Permalink to &quot;禁用状态&quot;">​</a></h2><p>可以配置 <code>disabled = true</code>，禁用上传</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-upload action="https://horizon-web-inspector.demoint.com/upload-mock" :disabled="true" />
  <h-upload
    action="https://horizon-web-inspector.demoint.com/upload-mock"
    type="gallery"
    :disabled="true"
  />
  <h-upload action="https://horizon-web-inspector.demoint.com/upload-mock" type="drop" :disabled="true" accept="image/*" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
  },
});
<\/script>

<style scoped>
.h-upload + .h-upload {
  margin-top: 10px;
}
</style>
`,
    path: "demos/components/Upload/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="后台上传" tabindex="-1">后台上传 <a class="header-anchor" href="#后台上传" aria-label="Permalink to &quot;后台上传&quot;">​</a></h2><p>可以通过设置 <code>use-background = true</code> 来开启后台上传</p><p>后台上传全局只有一个实例，可以在用户将某一页面组件销毁后继续上传</p><p>启用后会将选择的文件的副本也发送到后台上传中。但如果设置 <code>use-background = false</code>，则不会发送副本过去</p><p>也可以通过配置 <code>background-standalone = true</code>，表示此实例独立，不和其他已存在的实例共用一个上传列表</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-vertical-align="middle" label-position="left">
    <h-form-item label="是否将文件传输到后台上传">
      <h-switch v-model="useBackground" />
    </h-form-item>
    <h-form-item label="后台上传是否显示">
      <h-switch v-model="backgroundVisible" />
    </h-form-item>
    <h-form-item label="是否显示文件列表">
      <h-switch v-model="showFileList" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="24">
      <h-upload
        id="background-uploader"
        v-model:use-background="useBackground"
        action="https://horizon-web-inspector.demoint.com/upload-mock"
        button-text="单选手动上传"
        :show-file-list="showFileList"
        :auto-upload="false"
      />
    </h-col>
    <h-col :span="24">
      <h-upload
        v-model:use-background="useBackground"
        action="https://horizon-web-inspector.demoint.com/upload-mock"
        button-text="多选自动上传"
        :multiple="true"
        :show-file-list="showFileList"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

const useBackground = ref(true);
const backgroundVisible = ref(true);
const showFileList = ref(true);

watch(backgroundVisible, visible => {
  window.dispatchEvent(new CustomEvent('switchBackgroundUploadVisible', {
    detail: {
      visible,
    },
  }));
});

function onBackgroundUploadVisibleChanged(evt: WindowEventMap['backgroundUploadVisibleChanged']) {
  console.info(\`id: \${evt.detail.id} 的后台上传状态改变为 \${evt.detail.visible}\`);
  backgroundVisible.value = evt.detail.visible;
}

function onBackgroundUploadDestroy(evt: WindowEventMap['backgroundUploadDestroy']) {
  console.info(\`id: \${evt.detail} 的后台已销毁\`);
}

window.addEventListener('backgroundUploadVisibleChanged', onBackgroundUploadVisibleChanged);
window.addEventListener('backgroundUploadDestroy', onBackgroundUploadDestroy);

onBeforeUnmount(() => {
  window.removeEventListener('backgroundUploadVisibleChanged', onBackgroundUploadVisibleChanged);
  window.removeEventListener('backgroundUploadDestroy', onBackgroundUploadDestroy);
});
<\/script>
`,
    path: "demos/components/Upload/background.vue"
  }, null, _parent));
  _push(`<h2 id="类型定义" tabindex="-1">类型定义 <a class="header-anchor" href="#类型定义" aria-label="Permalink to &quot;类型定义&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_code_block, { src: "./demos/type-defined.ts" }, null, _parent));
  _push(`<h2 id="upload-api" class="no-underline h2"><a href="#upload-api" class="!no-underline">Upload Api</a></h2><h3 id="upload-props" class="no-underline h3"><a href="#upload-props" class="!no-underline">Upload Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">id</td><td>唯一标识符<br>会标注在 <code>input</code> 上<br>在后台上传时，也可以标注其具体归属</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">action</td><td>请求 URL</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header</td><td>上传请求头部</td><td><code>Record&lt;string, any&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">method</td><td>请求方式</td><td><code>&#39;POST&#39; | &#39;GET&#39; | string</code></td><td class="text-center">否</td><td>&#39;POST&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple</td><td>是否允许多选</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">limit</td><td>上传限制个数</td><td><code>number</code></td><td class="text-center">否</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">data</td><td>上传时额外参数</td><td><code>Record&lt;string, any&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>上传文件字段名</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;file&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">with-credentials</td><td>是否发送 <code>cookie</code> 凭证信息</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">crossorigin</td><td>原生属性 `);
  _push(ssrRenderComponent(_component_h_link, { href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`crossorigin`);
      } else {
        return [
          createTextVNode("crossorigin")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td><code>&#39;&#39; | &#39;anonymous&#39; | &#39;use-credentials&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>文件信息</td><td><code>Arrayable&lt;HUploadRawFileType&gt; | null</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>上传类型</td><td><code>&#39;button&#39; | &#39;drop&#39; | &#39;gallery&#39; | &#39;gallery-mixed&#39;</code></td><td class="text-center">否</td><td>&#39;button&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">button-text</td><td>在 <code>type = &#39;button&#39;</code> 时按钮显示的文字</td><td><code>string</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">button-props</td><td>在 <code>type = &#39;button&#39;</code> 时透传给 <code>button</code> 组件</td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">accept</td><td>接收上传的 `);
  _push(ssrRenderComponent(_component_h_link, { href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`文件类型`);
      } else {
        return [
          createTextVNode("文件类型")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">accept-strict</td><td>上传严格模式<br><code>false</code>: 与原生一致，如果用户不接受 <code>accept</code> 限制，则需要使用 <code>beforeUpload</code> 拦截<br><code>true</code>: 严格处理用户选择的文件，非 <code>accept</code> 允许的文件不会显示在上传列表里</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-build-in-accept-check</td><td>使用内部的文件类型检查<br>如果 <code>accept</code> 是后缀名格式，支持各种类型检查<br>但如果 <code>accept</code> 使用的是文件类型，支持的类型需要查看组件相关 DEMO 说明</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file-item-size</td><td>文件元素尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">gallery-shape</td><td>图片列表展示形式</td><td><code>&#39;square&#39; | &#39;rectangle&#39;</code></td><td class="text-center">否</td><td>&#39;rectangle&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-upload</td><td>是否选择文件后自动上传</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file-size-limit</td><td>文件大小限制，单位 <code>MB</code><br>如果超出则会抛出 <code>file-size-exceed</code> 事件并直接过滤掉</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-file-list</td><td>是否显示文件列表</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-file-thumbnail</td><td>是否显示文件的缩略图<br>仅对 <code>type = &#39;button&#39; | &#39;drop&#39;</code> 有效</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">controls</td><td>文件元素的操作<br>如果传入的是方法，注意不能是异步方法<br><code>upload</code>: 上传功能，包括开始上传和终止上传<br><code>view</code>: 是否允许查看文件<br><code>delete</code>: 是否允许显示删除按钮</td><td><code>| (&#39;upload&#39; | &#39;delete&#39; | &#39;view&#39;)[]<br>      | ((file: UnwrapRef&lt;HUploadFileType&gt;) =&gt; (&#39;upload&#39; | &#39;delete&#39; | &#39;view&#39;)[])</code></td><td class="text-center">否</td><td>() =&gt; [&#39;upload&#39;, &#39;view&#39;, &#39;delete&#39;] as const</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">controls-always-visible</td><td>控制器是否始终显示</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-background</td><td>是否让当前上传框使用后台上传<br>开启后在当前页面销毁后也不会停止上传</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background-standalone</td><td>是否让后台上传使用单独的实例</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background-teleport-to</td><td>指定 <code>uploadBackground</code> 组件传送的位置<br>不支持动态修改<br>如需修改还需要切换 <code>useBackground</code> 值来做到重载<br>另外如果已经有 <code>uploadBackground</code> 实例存在，则此处设置的值无效<br>类型请参考 `);
  _push(ssrRenderComponent(_component_h_link, { href: "https://cn.vuejs.org/api/built-in-components.html#teleport" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Teleport.to`);
      } else {
        return [
          createTextVNode("Teleport.to")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td><code>string | HTMLElement</code></td><td class="text-center">否</td><td>&#39;body&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background-style</td><td>后台上传的附加样式</td><td><code>StyleValue</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background-class</td><td>后台上传的附加类名</td><td><code>string | object | null</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用上传</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-upload</td><td>上传/选择前的钩子，可以用来判断文件是否允许上传<br>但只会拦截用户手动选择的文件，对于由 api 传入的文件不做拦截<br>如果返回 <code>false</code> 或 <code>Promise.reject</code>，则停止上传</td><td><code>(file: HUploadFileType) =&gt; Promisable&lt;boolean&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-remove</td><td>点击删除前的钩子，可以用来判断文件是否允许删除<br>如果返回 <code>false</code> 或 <code>Promise.reject</code>，则不允许删除</td><td><code>(file: HUploadFileType) =&gt; Promisable&lt;boolean&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-abort</td><td>点击暂停上传前的钩子，可以用来判断文件是否允许暂停上传<br>如果返回 <code>false</code> 或 <code>Promise.reject</code>，则不允许暂停上传</td><td><code>(file: HUploadFileType) =&gt; Promisable&lt;boolean&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-preview</td><td>在点击预览按钮执行预览前的钩子，如果回调为 <code>false</code>，则不允许进行预览</td><td><code>(file: HUploadFileType) =&gt; Promisable&lt;boolean | void&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-viewer-preview</td><td>传入 <code>Viewer</code> 组件的文件列表过滤函数，不可传入异步函数<br>此钩子会在文件列表发生改动时调用，用于过滤哪些文件可以被传入 <code>Viewer</code> 中查看，但此时会先过滤出图片和视频资源文件后再调用</td><td><code>(file: HUploadFileType) =&gt; boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">handle-success</td><td>在 <code>http</code> 返回 <code>200</code> 时的处理回调，需要返回的是文件实际上传后的地址<br>如果没有传入此方法，则会递归去寻找以 <code>http(s)://</code> 开始的第一个链接作为上传后的地址</td><td><code>(responseData: any, file: HUploadFileType) =&gt; Promisable&lt;string&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-uploads-amount-at-same-time</td><td>最大同时上传数量</td><td><code>number</code></td><td class="text-center">否</td><td>5</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-slice-exceed-files</td><td>自动裁剪掉超出 <code>limit</code> 的文件<br>对于单选时，如果超出 1 个文件，也可以通过这个属性拦截自动截取<br><code>true</code>: 裁剪掉超出 <code>limit</code> 的文件，然后塞入文件队列，并抛出 <code>exceed</code> 事件<br><code>false</code>: 只抛出 <code>exceed</code> 事件，不进行裁剪，也不塞入文件队列</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">no-uploader</td><td>是否隐藏上传功能<br>设置为 <code>true</code> 时，将隐藏所有的上传按钮和区块</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">http-request</td><td>覆盖默认的上传函数<br>需参考 `);
  _push(ssrRenderComponent(_component_h_link, { href: "https://git.nevint.com/horizon-web/horizon-web/-/blob/master/packages/horizon-web/src/components/Upload/src/utils/UploadHelper.ts" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`uploadFileDirectly`);
      } else {
        return [
          createTextVNode("uploadFileDirectly")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` 的行为</td><td><code>(file: HUploadFileType, instanceMethods: HUploadHttpRequestInstanceMethods) =&gt; void</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-file-size</td><td>是否显示文件大小</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-clipboard</td><td>是否监听剪切板粘贴事件<br>只有在用户粘贴且剪切板中是文件时才会触发</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-paste</td><td>粘贴文件前的钩子<br>如果需要对用户粘贴的事件进行拦截，请使用此钩子判断</td><td><code>(files: File[]) =&gt; Promisable&lt;File[]&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-media-with-normal-mode-in-gallery-mixed</td><td>是否在 <code>gallery-mixed</code> 模式下媒体文件显示为普通文件样式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="upload-emits" class="no-underline h3"><a href="#upload-emits" class="!no-underline">Upload Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:use-background</td><td rowspan="1">在 <code>useBackground</code> 变化时通知</td><td rowspan="1">( value: <code>boolean | &#39;popover&#39;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>boolean | &#39;popover&#39;</code></td><td>变化后的值，</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">preview</td><td rowspan="1">文件预览的通知</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>即将开始预览的文件，由 <code>props.beforePreview</code> 过滤后的文件列表</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="2">在文件添加、上传成功、失败时会通知</td><td rowspan="2">( file: <code>HUploadFileType</code>, response: <code>Data</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>改变的文件</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">response</td><td><code>Data</code></td><td>服务器返回信息</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">add</td><td rowspan="1">文件刚添加的通知</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>刚刚添加到上传队列的文件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">upload</td><td rowspan="1">开始文件上传的通知</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>即将上传的文件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">remove</td><td rowspan="1">文件删除的通知</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>删除的文件</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">uploading</td><td rowspan="3">上传中的通知</td><td rowspan="3">( file: <code>HUploadFileType</code>, process: <code>number</code>, response: <code>Data | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>正在上传的文件</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">process</td><td><code>number</code></td><td>上传进度</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">response</td><td><code>Data | undefined</code></td><td>服务器返回信息</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">uploaded</td><td rowspan="2">上传成功的通知</td><td rowspan="2">( file: <code>HUploadFileType</code>, response: <code>Data</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>已上传的文件</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">response</td><td><code>Data</code></td><td>服务器返回信息</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">pause</td><td rowspan="1">上传暂停的通知</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>暂停上传的文件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">continue</td><td rowspan="1">上传继续时的通知</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>继续上传的文件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">retry</td><td rowspan="1">重试时的通知</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>重试上传的文件</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">fail</td><td rowspan="3">上传失败的通知</td><td rowspan="3">( file: <code>HUploadFileType</code>, reason: <code>string</code>, response: <code>Data | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>失败的文件</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reason</td><td><code>string</code></td><td>失败原因</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">response</td><td><code>Data | undefined</code></td><td>服务器返回信息</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">exceed</td><td rowspan="2">选择超出 <code>limit</code> 时触发，或 <code>multiple = false</code> 时粘贴或拖拽多个文件时触发</td><td rowspan="2">( pickedFiles: <code>HUploadFileType[]</code>, existedFiles: <code>HUploadFileType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pickedFiles</td><td><code>HUploadFileType[]</code></td><td>当前选择的文件列表</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">existedFiles</td><td><code>HUploadFileType[]</code></td><td>已存在的文件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">file-size-exceed</td><td rowspan="1">文件大小超出 <code>fileSizeLimit</code> 时</td><td rowspan="1">( files: <code>HUploadFileType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">files</td><td><code>HUploadFileType[]</code></td><td>超出大小的文件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">accept-error</td><td rowspan="1"><code>accept</code> 验证失败</td><td rowspan="1">( files: <code>HUploadFileType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">files</td><td><code>HUploadFileType[]</code></td><td>验证失败的文件</td></tr></tbody></table><h3 id="upload-exposes" class="no-underline h3"><a href="#upload-exposes" class="!no-underline">Upload Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">upload</td><td rowspan="2">手动添加上传文件，并开始上传<br>添加的数据仍会受 <code>limit</code> 的限制</td><td rowspan="2">( files: <code>HUploadFileType[]</code> ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">files</td><td><code>HUploadFileType[]</code></td><td>手动上传的文件列表，如果不传即立刻开始上传</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">abort</td><td rowspan="2">手动取消上传</td><td rowspan="2">( files: <code>HUploadFileType[]</code> ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">files</td><td><code>HUploadFileType[]</code></td><td>手动取消上传的文件列表，如果不传即全部取消</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearFiles</td><td rowspan="2">清空选定状态的文件</td><td rowspan="2">( status: <code>HUploadFileStatusEnum[]</code> ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td><code>HUploadFileStatusEnum[]</code></td><td>待清空文件的状态，如果没有指定状态，则全部清空</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">handleSelect</td><td rowspan="1">手动选择文件，调用后直接打开文件选择器</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">handleRemove</td><td rowspan="2">手动删除文件</td><td rowspan="2">( rawFiles: <code>HUploadRawFileType[]</code> ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawFiles</td><td><code>HUploadRawFileType[]</code></td><td>待删除的文件，如果为空则全部删除</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroyBackgroundUploader</td><td rowspan="1">销毁和当前上传组件绑定的后台上传组件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Upload.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Upload = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Upload as default
};
