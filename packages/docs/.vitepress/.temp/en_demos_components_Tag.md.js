import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Tag.md","filePath":"en/demos/components/Tag.md"}');
const _sfc_main = { name: "en/demos/components/Tag.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Tag</h1><p class="description">Set <code>clickable = true</code> to allow tag clicking</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Set <code>clickable = true</code> to allow tag clicking</p><p>Set <code>bold = true</code> to enable tag emphasis state</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row :gutter="10">\n    <h-col :span="8">\n      <div class="demo-title">默认状态</div>\n      <h-tag :clickable="false" size="small">Small</h-tag>\n      <h-tag :clickable="false">Medium</h-tag>\n      <h-tag :clickable="false" size="large">Large</h-tag>\n    </h-col>\n    <h-col :span="8">\n      <div class="demo-title">强调状态</div>\n      <h-tag :clickable="false" :bold="true" size="small">Small</h-tag>\n      <h-tag :clickable="false" :bold="true">Medium</h-tag>\n      <h-tag :clickable="false" :bold="true" size="large">Large</h-tag>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts"><\/script>\n\n<style scoped></style>\n',
    path: "demos/components/Tag/basic.vue"
  }, null, _parent));
  _push(`<h2 id="different-types" tabindex="-1">Different Types <a class="header-anchor" href="#different-types" aria-label="Permalink to &quot;Different Types&quot;">​</a></h2><p>Change the state by setting <code>type</code>, thereby changing the color</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col>\n      <h-tag :clickable="false">Default</h-tag>\n      <h-tag :clickable="false" type="success">Success</h-tag>\n      <h-tag :clickable="false" type="info">Info</h-tag>\n      <h-tag :clickable="false" type="warning">Warning</h-tag>\n      <h-tag :clickable="false" type="error">Error</h-tag>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n</style>\n',
    path: "demos/components/Tag/type.vue"
  }, null, _parent));
  _push(`<h2 id="linear-tag" tabindex="-1">Linear Tag <a class="header-anchor" href="#linear-tag" aria-label="Permalink to &quot;Linear Tag&quot;">​</a></h2><p>Set <code>plain = true</code> to enable linear style</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-tag :clickable="false" :plain="true">Default</h-tag>\n  <h-tag :clickable="false" :plain="true" type="success">Success</h-tag>\n  <h-tag :clickable="false" :plain="true" type="info">Info</h-tag>\n  <h-tag :clickable="false" :plain="true" type="warning">Warning</h-tag>\n  <h-tag :clickable="false" :plain="true" type="error">Error</h-tag>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n</style>\n',
    path: "demos/components/Tag/plain.vue"
  }, null, _parent));
  _push(`<h2 id="activatable-tag" tabindex="-1">Activatable Tag <a class="header-anchor" href="#activatable-tag" aria-label="Permalink to &quot;Activatable Tag&quot;">​</a></h2><p>Pass a <code>boolean</code> value to <code>modelValue</code> to activate the function of whether to activate after clicking.</p><p>After passing <code>boolean</code>, there is no need to set <code>clickable</code> additionally. The tag is automatically in a clickable state.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-tag v-model="active1">Default</h-tag>
      <h-tag v-model="active2" type="success">Success</h-tag>
      <h-tag v-model="active3" type="info">Info</h-tag>
      <h-tag v-model="active4" type="warning">Warning</h-tag>
      <h-tag v-model="active5" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag v-model="active1" :round="true" @click="onClick">Default</h-tag>
      <h-tag v-model="active2" :round="true" type="success">Success</h-tag>
      <h-tag v-model="active3" :round="true" type="info">Info</h-tag>
      <h-tag v-model="active4" :round="true" type="warning">Warning</h-tag>
      <h-tag v-model="active5" :round="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag v-model="active1" :plain="true">Default</h-tag>
      <h-tag v-model="active2" :plain="true" type="success">Success</h-tag>
      <h-tag v-model="active3" :plain="true" type="info">Info</h-tag>
      <h-tag v-model="active4" :plain="true" type="warning">Warning</h-tag>
      <h-tag v-model="active5" :plain="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag v-model="active1" :plain="true" equally @click="onClick">普</h-tag>
      <h-tag v-model="active2" :plain="true" equally type="success">成</h-tag>
      <h-tag v-model="active3" :plain="true" equally type="info">进</h-tag>
      <h-tag v-model="active4" :plain="true" equally type="warning">警</h-tag>
      <h-tag v-model="active5" :plain="true" equally type="error">错</h-tag>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

function onClick() {
  console.info('click');
}

const active1 = ref(false);
const active2 = ref(false);
const active3 = ref(false);
const active4 = ref(false);
const active5 = ref(false);
<\/script>

<style scoped></style>
`,
    path: "demos/components/Tag/active.vue"
  }, null, _parent));
  _push(`<h2 id="icon" tabindex="-1">Icon <a class="header-anchor" href="#icon" aria-label="Permalink to &quot;Icon&quot;">​</a></h2><p>You can pass in <code>icon</code> through <code>props.icon</code> or <code>slots.icon</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-tag :clickable="false" :icon="IconEye" :plain="true">View</h-tag>
  <h-tag :clickable="false" :icon="IconComplete" :plain="true" type="success">Success</h-tag>
  <h-tag :clickable="false" :icon="IconHelp" :plain="true" type="info">Info</h-tag>
  <h-tag :clickable="false" :icon="IconRemind" :plain="true" type="warning">Warning</h-tag>
  <h-tag :clickable="false" :plain="true" type="error">
    <template #icon>
      <IconCloseCircle :size="12" />
    </template>
    Error
  </h-tag>
</template>

<script setup lang="ts">
import {IconEye, IconComplete, IconHelp, IconRemind, IconCloseCircle} from '@aurora/icon';
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Tag/icon.vue"
  }, null, _parent));
  _push(`<h2 id="avatar" tabindex="-1">Avatar <a class="header-anchor" href="#avatar" aria-label="Permalink to &quot;Avatar&quot;">​</a></h2><p>You can pass in an avatar link through <code>props.avatar</code></p><p>Or directly use <code>slots.avatar</code> to pass in a custom avatar component</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-tag avatar="/demo-assets/avatar-indigo.svg" :plain="true" :round="true" :clickable="false" size="small">Elizabeth</h-tag>\n  <h-tag avatar="/demo-assets/avatar-indigo.svg" :plain="true" :round="true" :clickable="false" size="medium">Jupiter</h-tag>\n  <h-tag :plain="true" :round="true" :clickable="false" size="large">\n    <template #avatar>\n      <h-avatar src="/demo-assets/avatar-indigo.svg" :size="24" />\n    </template>\n    William\n  </h-tag>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n</style>\n',
    path: "demos/components/Tag/avatar.vue"
  }, null, _parent));
  _push(`<h2 id="capsule-and-square-tags" tabindex="-1">Capsule and Square Tags <a class="header-anchor" href="#capsule-and-square-tags" aria-label="Permalink to &quot;Capsule and Square Tags&quot;">​</a></h2><p>Set <code>round = true</code> to set the tag to capsule shape</p><p>Set <code>equally = true</code> to set the tag to a square tag with equal length and width</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row :gutter="10">\n    <h-col :span="12">\n      <div class="demo-title">胶囊形</div>\n      <h-tag :clickable="false" :round="true">Default</h-tag>\n      <h-tag :clickable="false" :round="true" type="success">Success</h-tag>\n      <h-tag :clickable="false" :round="true" type="info">Info</h-tag>\n      <h-tag :clickable="false" :round="true" type="warning">Warning</h-tag>\n      <h-tag :clickable="false" :round="true" type="error">Error</h-tag>\n    </h-col>\n    <h-col :span="12">\n      <div class="demo-title">正方形</div>\n      <h-tag :clickable="false" :equally="true">普</h-tag>\n      <h-tag :clickable="false" :equally="true" type="success">成</h-tag>\n      <h-tag :clickable="false" :equally="true" type="info">进</h-tag>\n      <h-tag :clickable="false" :equally="true" type="warning">警</h-tag>\n      <h-tag :clickable="false" :equally="true" type="error">错</h-tag>\n    </h-col>\n  </h-row>\n  <h-row :gutter="10">\n    <h-col :span="12">\n      <h-tag :clickable="false" :plain="true" :round="true">Default</h-tag>\n      <h-tag :clickable="false" :plain="true" :round="true" type="success">Success</h-tag>\n      <h-tag :clickable="false" :plain="true" :round="true" type="info">Info</h-tag>\n      <h-tag :clickable="false" :plain="true" :round="true" type="warning">Warning</h-tag>\n      <h-tag :clickable="false" :plain="true" :round="true" type="error">Error</h-tag>\n    </h-col>\n    <h-col :span="12">\n      <h-tag :clickable="false" :plain="true" :equally="true">普</h-tag>\n      <h-tag :clickable="false" :plain="true" :equally="true" type="success">成</h-tag>\n      <h-tag :clickable="false" :plain="true" :equally="true" type="info">进</h-tag>\n      <h-tag :clickable="false" :plain="true" :equally="true" type="warning">警</h-tag>\n      <h-tag :clickable="false" :plain="true" :equally="true" type="error">错</h-tag>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n</style>\n',
    path: "demos/components/Tag/shape.vue"
  }, null, _parent));
  _push(`<h2 id="closable-tag" tabindex="-1">Closable Tag <a class="header-anchor" href="#closable-tag" aria-label="Permalink to &quot;Closable Tag&quot;">​</a></h2><p>Set <code>closable = true</code> to set the tag to closable state</p><p>If both <code>clickable</code> and <code>equally</code> are set, the close button will be displayed after hovering <code>props.showCloseDelay (default 1 second)</code>. If the button is clicked before this, the close button will not be triggered to display again <strong>before the mouse moves away</strong></p><p>If <code>clickable</code> is not set but <code>equally</code> is set, the close button will be displayed immediately without delay</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-tag :clickable="false" :closable="true">Default</h-tag>
      <h-tag :clickable="false" :closable="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :closable="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :closable="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :closable="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :closable="true" :round="true" @click="onClick" @close="onClose">Default</h-tag>
      <h-tag :clickable="false" :closable="true" :round="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :closable="true" :round="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :closable="true" :round="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :closable="true" :round="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :closable="true" :plain="true">Default</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" @click="onClick" @close="onClose">普</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="success">成</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="info">进</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="warning">警</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="error">错</h-tag>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
function onClick() {
  console.info('click');
}

function onClose() {
  console.info('close');
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Tag/closable.vue"
  }, null, _parent));
  _push(`<h2 id="loading" tabindex="-1">Loading <a class="header-anchor" href="#loading" aria-label="Permalink to &quot;Loading&quot;">​</a></h2><p>Set <code>loading = true</code> to display the loading <code>icon</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-form label-position="left" label-vertical-align="middle">
        <h-form-item label="Loading">
          <h-radio-group v-model="isLoading">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :loading="isLoading">Default</h-tag>
      <h-tag :clickable="false" :loading="isLoading" type="success">Success</h-tag>
      <h-tag :clickable="false" :loading="isLoading" type="info">Info</h-tag>
      <h-tag :clickable="false" :loading="isLoading" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :loading="isLoading" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :loading="isLoading" :round="true" @click="onClick" @close="onClose">Default</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :round="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :round="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :round="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :round="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :loading="isLoading" :plain="true">Default</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" @click="onClick" @close="onClose">普</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="success">成</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="info">进</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="warning">警</h-tag>
      <h-tag :clickable="false" :loading="isLoading" :plain="true" :equally="true" type="error">错</h-tag>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const isLoading = ref(true);

function onClick() {
  console.info('click');
}

function onClose() {
  console.info('close');
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Tag/loading.vue"
  }, null, _parent));
  _push(`<h2 id="disabled" tabindex="-1">Disabled <a class="header-anchor" href="#disabled" aria-label="Permalink to &quot;Disabled&quot;">​</a></h2><p>Set <code>disabled = true</code> to disable the tag. At this time, even if <code>closable</code> is set, the close button will not be displayed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="24">\n      <h-tag :clickable="false" :disabled="true" :closable="true">Default</h-tag>\n      <h-tag :clickable="false" :disabled="true" type="success" :closable="true">Success</h-tag>\n      <h-tag :clickable="false" :disabled="true" type="info" :closable="true">Info</h-tag>\n      <h-tag :clickable="false" :disabled="true" type="warning" :closable="true">Warning</h-tag>\n      <h-tag :clickable="false" :disabled="true" type="error" :closable="true">Error</h-tag>\n    </h-col>\n    <h-col :span="24">\n      <h-tag :clickable="false" :disabled="true" :round="true" :closable="true">Default</h-tag>\n      <h-tag :clickable="false" :disabled="true" :round="true" type="success" :closable="true">Success</h-tag>\n      <h-tag :clickable="false" :disabled="true" :round="true" type="info" :closable="true">Info</h-tag>\n      <h-tag :clickable="false" :disabled="true" :round="true" type="warning" :closable="true">Warning</h-tag>\n      <h-tag :clickable="false" :disabled="true" :round="true" type="error" :closable="true">Error</h-tag>\n    </h-col>\n    <h-col :span="24">\n      <h-tag :clickable="false" :disabled="true" :plain="true" :closable="true">Default</h-tag>\n      <h-tag :clickable="false" :disabled="true" :plain="true" type="success" :closable="true">Success</h-tag>\n      <h-tag :clickable="false" :disabled="true" :plain="true" type="info" :closable="true">Info</h-tag>\n      <h-tag :clickable="false" :disabled="true" :plain="true" type="warning" :closable="true">Warning</h-tag>\n      <h-tag :clickable="false" :disabled="true" :plain="true" type="error" :closable="true">Error</h-tag>\n    </h-col>\n    <h-col :span="24">\n      <h-tag :clickable="false" :disabled="true" :equally="true" :closable="true">普</h-tag>\n      <h-tag :clickable="false" :disabled="true" :equally="true" type="success" :closable="true">成</h-tag>\n      <h-tag :clickable="false" :disabled="true" :equally="true" type="info" :closable="true">进</h-tag>\n      <h-tag :clickable="false" :disabled="true" :equally="true" type="warning" :closable="true">警</h-tag>\n      <h-tag :clickable="false" :disabled="true" :equally="true" type="error" :closable="true">错</h-tag>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n</style>\n',
    path: "demos/components/Tag/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="colorful-tags" tabindex="-1">Colorful Tags <a class="header-anchor" href="#colorful-tags" aria-label="Permalink to &quot;Colorful Tags&quot;">​</a></h2><p>Some colors are built-in and can be used directly</p><p>Of course, you can also set only one <code>color</code> to customize the color, and then automatically generate colors for various states</p><p>If you are not satisfied with the generated background color, you can specify <code>background</code>, but this will not automatically generate colors</p><p>When customizing colors, please pass in the darkest color in the color system to prevent invisibility problems in states such as <code>disabled</code></p><p><strong>To ensure compatibility, starting from 2.0.2, colors will not be automatically generated by default. To automatically generate colors, you need to enable <code>auto-color = true</code></strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="24">\n      <h-tag color="brand" :auto-color="true">Brand</h-tag>\n      <h-tag color="indigo" :auto-color="true">Indigo</h-tag>\n      <h-tag color="purple" :auto-color="true">Purple</h-tag>\n      <h-tag color="magenta" :auto-color="true">Magenta</h-tag>\n      <h-tag color="orange" :auto-color="true">Orange</h-tag>\n    </h-col>\n    <h-col :span="24">\n      <h-tag :disabled="true" color="brand" :auto-color="true">Brand</h-tag>\n      <h-tag :disabled="true" color="indigo" :auto-color="true">Indigo</h-tag>\n      <h-tag :disabled="true" color="purple" :auto-color="true">Purple</h-tag>\n      <h-tag :disabled="true" color="magenta" :auto-color="true">Magenta</h-tag>\n      <h-tag :disabled="true" color="orange" :auto-color="true">Orange</h-tag>\n    </h-col>\n    <h-col :span="24">\n      <h-tag :plain="true" color="brand" :auto-color="true">Brand</h-tag>\n      <h-tag :plain="true" color="indigo" :auto-color="true">Indigo</h-tag>\n      <h-tag :plain="true" color="purple" :auto-color="true">Purple</h-tag>\n      <h-tag :plain="true" color="magenta" :auto-color="true">Magenta</h-tag>\n      <h-tag :plain="true" color="orange" :auto-color="true">Orange</h-tag>\n    </h-col>\n    <h-col :span="24">\n      <h-tag :plain="true" :disabled="true" color="brand" :auto-color="true">Brand</h-tag>\n      <h-tag :plain="true" :disabled="true" color="indigo" :auto-color="true">Indigo</h-tag>\n      <h-tag :plain="true" :disabled="true" color="purple" :auto-color="true">Purple</h-tag>\n      <h-tag :plain="true" :disabled="true" color="magenta" :auto-color="true">Magenta</h-tag>\n      <h-tag :plain="true" :disabled="true" color="orange" :auto-color="true">Orange</h-tag>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts"><\/script>\n\n<style scoped></style>\n',
    path: "demos/components/Tag/colorful.vue"
  }, null, _parent));
  _push(`<h2 id="create-and-modify-tags" tabindex="-1">Create and Modify Tags <a class="header-anchor" href="#create-and-modify-tags" aria-label="Permalink to &quot;Create and Modify Tags&quot;">​</a></h2><p>Quickly create a tag that allows input creation through <code>h-tag-group</code>&#39;s <code>props.useCreate</code></p><p>With <code>max-tags</code>, you can not display the create tag after the number of tags reaches a certain value</p><p>Set <code>editable = true</code> for <code>h-tag</code> or <code>h-tag-group</code> to allow tag editing</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-tag-group\n    :use-create="true"\n    :editable="true"\n    :before-create="onBeforeCreate"\n    :before-edit="onBeforeEdit"\n    :before-close="onBeforeClose"\n    :max-tags="5"\n    @created="onCreated"\n    @edited="onEdited"\n    @closed="onClosed"\n  >\n    <h-tag v-for="(item, index) of tagList" :id="index" :key="index" :closable="true" :clickable="false">{{ item }}</h-tag>\n  </h-tag-group>\n</template>\n\n<script setup lang="ts">\nimport { ref } from \'vue\';\nimport { $confirm, $message } from \'@aurora/horizon-web\';\n\nfunction sleep(ms: number) {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve(void 0);\n    }, ms);\n  });\n}\n\nconst tagList = ref([\'北京\', \'上海\']);\n\nasync function onBeforeCreate(tag: string) {\n  const close = await $confirm(`是否确定创建 ${tag} ？`, \'提示\');\n  close();\n  await sleep(2000);\n  tagList.value.push(tag);\n}\n\nasync function onBeforeEdit(newVal: string, oldVal: string, id: number) {\n  const close = await $confirm(`是否确定修改 ${oldVal} 为 ${newVal} ？`, \'提示\');\n  close();\n  await sleep(2000);\n  tagList.value[id] = newVal;\n}\n\nasync function onBeforeClose(id: number) {\n  await sleep(2000);\n  tagList.value.splice(id, 1);\n}\n\nfunction onCreated(tag: string) {\n  $message(`创建了${tag}标签`);\n}\n\nfunction onEdited(newVal: string, oldVal: string, id: number) {\n  $message(`由 ${oldVal} 修改为 ${newVal}，下标: ${id}`);\n}\n\nfunction onClosed(id: number) {\n  $message(`删除了下标为 ${id} 的标签`);\n}\n<\/script>\n',
    path: "demos/components/Tag/create-update.vue"
  }, null, _parent));
  _push(`<h2 id="tag-collapse" tabindex="-1">Tag Collapse <a class="header-anchor" href="#tag-collapse" aria-label="Permalink to &quot;Tag Collapse&quot;">​</a></h2><p>Set <code>collapse = true</code> to collapse tags that are about to wrap</p><p>Set <code>expand = true</code> to click the collapsed number <code>tag</code> to collapse or expand</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="24">
      <h-form label-width="150px" label-position="left" label-vertical-align="middle" helper-placement="after-label">
        <h-form-item label="Toggle" helper="展开/收起">
          <h-button size="small" @click="toggle">Toggle</h-button>
        </h-form-item>
        <h-form-item label="size">
          <h-radio-group v-model="size">
            <h-radio label="small" />
            <h-radio label="medium" />
            <h-radio label="large" />
          </h-radio-group>
        </h-form-item>
        <h-form-item label="tooltip render type">
          <template #helperTitle>
            折叠 \`tooltip\` 展示的内容
          </template>
          <template #helperContent>
            <li>innerText: 展示每个元素的文字内容</li>
            <li>full: 完整渲染元素</li>
          </template>
          <h-radio-group v-model="renderType">
            <h-radio label="innerText"></h-radio>
            <h-radio label="full"></h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="editable">
          <h-radio-group v-model="editable">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="closable">
          <h-radio-group v-model="closable">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="fill up" helper="是否尽量占满容器。启用 minDisplayed 无效">
          <h-radio-group v-model="fillUp">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="width" style="max-width: 500px">
          <h-slider v-model="width" :min="100" :max="600" :step="25" :input-enable="true" />
        </h-form-item>
        <h-form-item label="amount" style="max-width: 500px">
          <h-slider v-model="renderedAmount" :min="5" :max="50" :input-enable="true" />
        </h-form-item>
        <h-form-item label="use min displayed" style="max-width: 500px" helper="是否启用至少显示Tag数量的属性。启用后，超过 minDisplayed 的数量的元素都会被折叠">
          <h-radio-group v-model="minDisplayedEnable">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item v-show="minDisplayedEnable" label="min displayed" style="max-width: 500px" helper="至少显示的tag数量">
          <h-slider v-model="minDisplayed" :min="1" :max="renderedAmount" :input-enable="true" />
        </h-form-item>
      </h-form>
    </h-col>
    <h-col>
      <h-tag-group
        ref="tagGroup"
        :collapse="true"
        :expand="true"
        :editable="editable"
        :fill-up="fillUp"
        :size="size"
        :tooltip-render-type="renderType"
        :min-displayed="minDisplayedEnable ? minDisplayed : undefined"
        :before-edit="onBeforeEdit"
        :before-close="onBeforeClose"
        :style="{width: width + 'px'}"
      >
        <h-tag v-for="(item, index) of renderedItems" :id="index" :key="index" :clickable="false" :closable="closable">{{ item }}</h-tag>
      </h-tag-group>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { DefinedComponent } from '@aurora/utils';
import { $message } from '@aurora/horizon-web';

const tagGroup = ref<InstanceType<DefinedComponent> | null>(null);

const renderedAmount = ref(20);
const minDisplayed = ref(1);
const width = ref(600);
const editable = ref(false);
const closable = ref(false);
const fillUp = ref(false);
const minDisplayedEnable = ref(false);
const renderType = ref('innerText');
const size = ref('medium');
const renderedItems = ref<Array<string | number>>([]);

watchEffect(() => {
  renderedItems.value = Array.from(Array(renderedAmount.value).keys()).map(val => \`Tag \${val + 1}\`);
});

watch(() => renderedItems.value.length, val => {
  renderedAmount.value = val;
});

function toggle() {
  tagGroup.value?.toggle();
}

function onBeforeEdit(newVal: string, oldVal: string, id: number) {
  renderedItems.value[id] = newVal;
}

function onBeforeClose(id: number) {
  if (renderedItems.value.length <= 5) {
    $message.warning("Cannot reduce the item's length less than 5");
    return;
  }
  renderedItems.value.splice(id, 1);
}
<\/script>

<style scoped></style>
`,
    path: "demos/components/Tag/collapse.vue"
  }, null, _parent));
  _push(`<h2 id="taggroup-api" class="no-underline h2"><a href="#taggroup-api" class="!no-underline">TagGroup Api</a></h2><h3 id="taggroup-props" class="no-underline h3"><a href="#taggroup-props" class="!no-underline">TagGroup Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">editable</td><td>Configuration for editable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ellipsis`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "collapse" }, null, _parent));
  _push(`</td><td>Configuration for ellipsis.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse</td><td>Configuration for collapse.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tag-props</td><td>Configuration for collapse tag props.</td><td><code>Partial&lt;TagProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand</td><td>Configuration for expand.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-use-tooltip</td><td>Configuration for collapse use tooltip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-render-type</td><td>Configuration for tooltip render type.</td><td><code>&#39;innerText&#39; | &#39;full&#39;</code></td><td class="text-center">No</td><td>&#39;innerText&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">separator</td><td>Configuration for separator.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;、&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">symbol`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "separator" }, null, _parent));
  _push(`</td><td>Configuration for symbol.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-create</td><td>Configuration for use create.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">create-tag-props</td><td>Configuration for create tag props.</td><td><code>Partial&lt;TagProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-create</td><td>Configuration for before create.</td><td><code>(content: string) =&gt; Awaitable&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-edit</td><td>Configuration for before edit.</td><td><code>(<br>        content: string,<br>        oldValue: string,<br>        id: number | string | symbol | undefined,<br>      ) =&gt; Awaitable&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-close</td><td>Configuration for before close.</td><td><code>(id: number | string | symbol | undefined) =&gt; Awaitable&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">create-text</td><td>Configuration for create text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-tags</td><td>Configuration for max tags.</td><td><code>number</code></td><td class="text-center">No</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disable-transitions</td><td>Configuration for disable transitions.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fill-up</td><td>Configuration for fill up.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min-displayed</td><td>Configuration for min displayed.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-inner-class</td><td>Configuration for popper inner class.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>Configuration for tooltip show after.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>Configuration for tooltip hide after.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="taggroup-emits" class="no-underline h3"><a href="#taggroup-emits" class="!no-underline">TagGroup Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">created</td><td rowspan="1">Emitted when created changes.</td><td rowspan="1">( content: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td><code>string</code></td><td>The content value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">edited</td><td rowspan="3">Emitted when edited changes.</td><td rowspan="3">( newValue: <code>string</code>, oldValue: <code>string</code>, id: <code>string | number | symbol | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">newValue</td><td><code>string</code></td><td>The new value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">oldValue</td><td><code>string</code></td><td>The old value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">id</td><td><code>string | number | symbol | undefined</code></td><td>The id value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">closed</td><td rowspan="1">Emitted when closed changes.</td><td rowspan="1">( id: <code>string | number | symbol | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">id</td><td><code>string | number | symbol | undefined</code></td><td>The id value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">toggled</td><td rowspan="1">Emitted when toggled changes.</td><td rowspan="1">( isExpanded: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">isExpanded</td><td><code>boolean</code></td><td>The is expanded value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">exceeded</td><td rowspan="1">Emitted when exceeded changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="taggroup-exposes" class="no-underline h3"><a href="#taggroup-exposes" class="!no-underline">TagGroup Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">toggle</td><td rowspan="1">Controls toggle.</td><td rowspan="1">( expand: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand</td><td><code>boolean</code></td><td>The expand value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">doCollapseCalculate</td><td rowspan="1">Controls do collapse calculate.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2 id="tag-api" class="no-underline h2"><a href="#tag-api" class="!no-underline">Tag Api</a></h2><h3 id="tag-props" class="no-underline h3"><a href="#tag-props" class="!no-underline">Tag Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">id</td><td>Configuration for id.</td><td><code>string | number | symbol</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Configuration for type.</td><td><code>&#39;success&#39; | &#39;info&#39; | &#39;warning&#39; | &#39;error&#39; | &#39;&#39; | &#39;hollow&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">bold</td><td>Configuration for bold.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clickable</td><td>Configuration for clickable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>Configuration for closable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">plain</td><td>Configuration for plain.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">round</td><td>Configuration for round.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">major`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "round" }, null, _parent));
  _push(`</td><td>Configuration for major.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">avatar</td><td>Configuration for avatar.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>Configuration for icon.</td><td><code>Component | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">equally</td><td>Configuration for equally.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-close-delay</td><td>Configuration for show close delay.</td><td><code>number</code></td><td class="text-center">No</td><td>1000</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>Configuration for color.</td><td><code>string | &#39;brand&#39; | &#39;lime&#39; | &#39;indigo&#39; | &#39;purple&#39; | &#39;magenta&#39; | &#39;orange&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background</td><td>Configuration for background.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-color</td><td>Configuration for auto color.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>Configuration for loading.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip</td><td>Configuration for tooltip.</td><td><code>string | Partial&lt;TooltipProps&gt; | boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>Configuration for tooltip show after.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>Configuration for tooltip hide after.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disable-transitions</td><td>Configuration for disable transitions.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-pure</td><td>Configuration for is pure.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="tag-emits" class="no-underline h3"><a href="#tag-emits" class="!no-underline">Tag Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click-tag`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "click" }, null, _parent));
  _push(`</td><td rowspan="1">Emitted when click tag changes.</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">Emitted when click changes.</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close-tag`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "close" }, null, _parent));
  _push(`</td><td rowspan="1">Emitted when close tag changes.</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">Emitted when close changes.</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td></td></tr></tbody></table><h3 id="tag-exposes" class="no-underline h3"><a href="#tag-exposes" class="!no-underline">Tag Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">edit</td><td rowspan="1">Controls edit.</td><td rowspan="1">( content: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td><code>string</code></td><td>The content value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Tag.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Tag = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Tag as default
};
