import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Upload.md","filePath":"en/demos/components/Upload.md"}');
const _sfc_main = { name: "en/demos/components/Upload.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_code_block = resolveComponent("code-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Upload</h1><p class="description">After selecting different files, the previous files will be replaced</p><h2 id="single-file-upload" tabindex="-1">Single File Upload <a class="header-anchor" href="#single-file-upload" aria-label="Permalink to &quot;Single File Upload&quot;">​</a></h2><p>After selecting different files, the previous files will be replaced</p>`);
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
  _push(`<h2 id="multiple-file-upload" tabindex="-1">Multiple File Upload <a class="header-anchor" href="#multiple-file-upload" aria-label="Permalink to &quot;Multiple File Upload&quot;">​</a></h2><p>Set <code>multiple = true</code> to select and upload multiple files</p><p>Use <code>limit</code> to limit the number of files selected</p>`);
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
  _push(`<h2 id="intercept-files" tabindex="-1">Intercept Files <a class="header-anchor" href="#intercept-files" aria-label="Permalink to &quot;Intercept Files&quot;">​</a></h2><p>Set <code>accept</code> to control the file types selected</p><p>Strict file type control is enabled by default, which will intercept all files not allowed by <code>accept</code>, and throw an <code>accept-error</code> event</p><p>If you want to control manually, you can set <code>accept-strict = false</code> and intercept with a custom <code>before-upload</code></p>`);
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
  _push(`<h2 id="file-size-check" tabindex="-1">File Size Check <a class="header-anchor" href="#file-size-check" aria-label="Permalink to &quot;File Size Check&quot;">​</a></h2><p>Set <code>file-size-limit</code> to automatically check the file size</p><p>If exceeded, it will be automatically filtered and throw a <code>file-size-exceed</code> event</p>`);
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
  _push(`<h2 id="avatar-upload" tabindex="-1">Avatar Upload <a class="header-anchor" href="#avatar-upload" aria-label="Permalink to &quot;Avatar Upload&quot;">​</a></h2><p>Set <code>type = &#39;gallery&#39;</code> and configure some data to achieve functions similar to avatar upload</p>`);
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
  _push(`<h2 id="photo-wall" tabindex="-1">Photo Wall <a class="header-anchor" href="#photo-wall" aria-label="Permalink to &quot;Photo Wall&quot;">​</a></h2><p>Set <code>type = &#39;gallery&#39;</code> to enable photo wall upload mode</p><p>In photo wall mode, the image list is forced to be displayed, and cannot be controlled whether to display the list through <code>show-file-list</code></p>`);
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
  _push(`<h2 id="drag-upload" tabindex="-1">Drag Upload <a class="header-anchor" href="#drag-upload" aria-label="Permalink to &quot;Drag Upload&quot;">​</a></h2><p>Set <code>type = &#39;drop&#39;</code> to enable drag upload function</p><p>Will display <code>tips</code> according to the settings of <code>props.accept</code>, <code>props.fileSizeLimit</code>, <code>props.multiple</code>+<code>props.limit</code></p><p>If the automatically generated <code>tips</code> cannot meet your needs, you can customize the content through the <code>tips</code> slot</p><p>Files placed by dragging will also be judged whether they can be put into the upload list according to <code>props.accept</code></p>`);
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
  _push(`<h2 id="disabled-state" tabindex="-1">Disabled State <a class="header-anchor" href="#disabled-state" aria-label="Permalink to &quot;Disabled State&quot;">​</a></h2><p>You can configure <code>disabled = true</code> to disable upload</p>`);
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
  _push(`<h2 id="background-upload" tabindex="-1">Background Upload <a class="header-anchor" href="#background-upload" aria-label="Permalink to &quot;Background Upload&quot;">​</a></h2><p>You can enable background upload by setting <code>use-background = true</code></p><p>There is only one instance of background upload globally, which can continue uploading after the user destroys a page component</p><p>After enabling, copies of selected files will also be sent to background upload. But if <code>use-background = false</code> is set, copies will not be sent</p><p>You can also configure <code>background-standalone = true</code> to indicate that this instance is independent and does not share an upload list with other existing instances</p>`);
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
  _push(`<h2 id="type-definition" tabindex="-1">Type Definition <a class="header-anchor" href="#type-definition" aria-label="Permalink to &quot;Type Definition&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_code_block, { src: "./demos/type-defined.ts" }, null, _parent));
  _push(`<h2 id="upload-api" class="no-underline h2"><a href="#upload-api" class="!no-underline">Upload Api</a></h2><h3 id="upload-props" class="no-underline h3"><a href="#upload-props" class="!no-underline">Upload Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">id</td><td>Configuration for id.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">action</td><td>Configuration for action.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header</td><td>Configuration for header.</td><td><code>Record&lt;string, any&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">method</td><td>Configuration for method.</td><td><code>&#39;POST&#39; | &#39;GET&#39; | string</code></td><td class="text-center">No</td><td>&#39;POST&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple</td><td>Configuration for multiple.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">limit</td><td>Configuration for limit.</td><td><code>number</code></td><td class="text-center">No</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">data</td><td>Configuration for data.</td><td><code>Record&lt;string, any&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>Configuration for name.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;file&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">with-credentials</td><td>Configuration for with credentials.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">crossorigin</td><td>Configuration for crossorigin.</td><td><code>&#39;&#39; | &#39;anonymous&#39; | &#39;use-credentials&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>Arrayable&lt;HUploadRawFileType&gt; | null</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Configuration for type.</td><td><code>&#39;button&#39; | &#39;drop&#39; | &#39;gallery&#39; | &#39;gallery-mixed&#39;</code></td><td class="text-center">No</td><td>&#39;button&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">button-text</td><td>Configuration for button text.</td><td><code>string</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">button-props</td><td>Configuration for button props.</td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">accept</td><td>Configuration for accept.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">accept-strict</td><td>Configuration for accept strict.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-build-in-accept-check</td><td>Configuration for use build in accept check.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file-item-size</td><td>Configuration for file item size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">gallery-shape</td><td>Configuration for gallery shape.</td><td><code>&#39;square&#39; | &#39;rectangle&#39;</code></td><td class="text-center">No</td><td>&#39;rectangle&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-upload</td><td>Configuration for auto upload.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file-size-limit</td><td>Configuration for file size limit.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-file-list</td><td>Configuration for show file list.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-file-thumbnail</td><td>Configuration for show file thumbnail.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">controls</td><td>Configuration for controls.</td><td><code>| (&#39;upload&#39; | &#39;delete&#39; | &#39;view&#39;)[]<br>      | ((file: UnwrapRef&lt;HUploadFileType&gt;) =&gt; (&#39;upload&#39; | &#39;delete&#39; | &#39;view&#39;)[])</code></td><td class="text-center">No</td><td>() =&gt; [&#39;upload&#39;, &#39;view&#39;, &#39;delete&#39;] as const</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">controls-always-visible</td><td>Configuration for controls always visible.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-background</td><td>Configuration for use background.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background-standalone</td><td>Configuration for background standalone.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background-teleport-to</td><td>Configuration for background teleport to.</td><td><code>string | HTMLElement</code></td><td class="text-center">No</td><td>&#39;body&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background-style</td><td>Configuration for background style.</td><td><code>StyleValue</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background-class</td><td>Configuration for background class.</td><td><code>string | object | null</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-upload</td><td>Configuration for before upload.</td><td><code>(file: HUploadFileType) =&gt; Promisable&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-remove</td><td>Configuration for before remove.</td><td><code>(file: HUploadFileType) =&gt; Promisable&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-abort</td><td>Configuration for before abort.</td><td><code>(file: HUploadFileType) =&gt; Promisable&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-preview</td><td>Configuration for before preview.</td><td><code>(file: HUploadFileType) =&gt; Promisable&lt;boolean | void&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-viewer-preview</td><td>Configuration for before viewer preview.</td><td><code>(file: HUploadFileType) =&gt; boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">handle-success</td><td>Configuration for handle success.</td><td><code>(responseData: any, file: HUploadFileType) =&gt; Promisable&lt;string&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-uploads-amount-at-same-time</td><td>Configuration for max uploads amount at same time.</td><td><code>number</code></td><td class="text-center">No</td><td>5</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-slice-exceed-files</td><td>Configuration for auto slice exceed files.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">no-uploader</td><td>Configuration for no uploader.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">http-request</td><td>Configuration for http request.</td><td><code>(file: HUploadFileType, instanceMethods: HUploadHttpRequestInstanceMethods) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-file-size</td><td>Configuration for show file size.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-clipboard</td><td>Configuration for use clipboard.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-paste</td><td>Configuration for before paste.</td><td><code>(files: File[]) =&gt; Promisable&lt;File[]&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-media-with-normal-mode-in-gallery-mixed</td><td>Configuration for show media with normal mode in gallery mixed.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="upload-emits" class="no-underline h3"><a href="#upload-emits" class="!no-underline">Upload Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:use-background</td><td rowspan="1">Emitted when update:use background changes.</td><td rowspan="1">( value: <code>boolean | &#39;popover&#39;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>boolean | &#39;popover&#39;</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">preview</td><td rowspan="1">Emitted when preview changes.</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="2">Emitted when change changes.</td><td rowspan="2">( file: <code>HUploadFileType</code>, response: <code>Data</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">response</td><td><code>Data</code></td><td>The response value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">add</td><td rowspan="1">Emitted when add changes.</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">upload</td><td rowspan="1">Emitted when upload changes.</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">remove</td><td rowspan="1">Emitted when remove changes.</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">uploading</td><td rowspan="3">Emitted when uploading changes.</td><td rowspan="3">( file: <code>HUploadFileType</code>, process: <code>number</code>, response: <code>Data | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">process</td><td><code>number</code></td><td>The process value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">response</td><td><code>Data | undefined</code></td><td>The response value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">uploaded</td><td rowspan="2">Emitted when uploaded changes.</td><td rowspan="2">( file: <code>HUploadFileType</code>, response: <code>Data</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">response</td><td><code>Data</code></td><td>The response value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">pause</td><td rowspan="1">Emitted when pause changes.</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">continue</td><td rowspan="1">Emitted when continue changes.</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">retry</td><td rowspan="1">Emitted when retry changes.</td><td rowspan="1">( file: <code>HUploadFileType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">fail</td><td rowspan="3">Emitted when fail changes.</td><td rowspan="3">( file: <code>HUploadFileType</code>, reason: <code>string</code>, response: <code>Data | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">file</td><td><code>HUploadFileType</code></td><td>The file value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reason</td><td><code>string</code></td><td>The reason value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">response</td><td><code>Data | undefined</code></td><td>The response value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">exceed</td><td rowspan="2">Emitted when exceed changes.</td><td rowspan="2">( pickedFiles: <code>HUploadFileType[]</code>, existedFiles: <code>HUploadFileType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pickedFiles</td><td><code>HUploadFileType[]</code></td><td>The picked files value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">existedFiles</td><td><code>HUploadFileType[]</code></td><td>The existed files value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">file-size-exceed</td><td rowspan="1">Emitted when file size exceed changes.</td><td rowspan="1">( files: <code>HUploadFileType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">files</td><td><code>HUploadFileType[]</code></td><td>The files value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">accept-error</td><td rowspan="1">Emitted when accept error changes.</td><td rowspan="1">( files: <code>HUploadFileType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">files</td><td><code>HUploadFileType[]</code></td><td>The files value.</td></tr></tbody></table><h3 id="upload-exposes" class="no-underline h3"><a href="#upload-exposes" class="!no-underline">Upload Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">upload</td><td rowspan="2">Controls upload.</td><td rowspan="2">( files: <code>HUploadFileType[]</code> ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">files</td><td><code>HUploadFileType[]</code></td><td>The files value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">abort</td><td rowspan="2">Controls abort.</td><td rowspan="2">( files: <code>HUploadFileType[]</code> ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">files</td><td><code>HUploadFileType[]</code></td><td>The files value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearFiles</td><td rowspan="2">Controls clear files.</td><td rowspan="2">( status: <code>HUploadFileStatusEnum[]</code> ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td><code>HUploadFileStatusEnum[]</code></td><td>The status value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">handleSelect</td><td rowspan="1">Controls handle select.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">handleRemove</td><td rowspan="2">Controls handle remove.</td><td rowspan="2">( rawFiles: <code>HUploadRawFileType[]</code> ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawFiles</td><td><code>HUploadRawFileType[]</code></td><td>The raw files value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroyBackgroundUploader</td><td rowspan="1">Controls destroy background uploader.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Upload.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Upload = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Upload as default
};
