import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/methods/LoadingBar.md","filePath":"en/demos/methods/LoadingBar.md"}');
const _sfc_main = { name: "en/demos/methods/LoadingBar.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>LoadingBar will only create one globally, so methods called from any location will control this same component. LoadingBar has multiple methods: start(), finish(), error(), update(), destroy().</p><p>When the start method is called, LoadingBar will simulate the loading progress and extend to 80% of the screen width; calling the finish method means the loading is successful, LoadingBar will extend to the full screen width and disappear; calling the error method means the loading failed, LoadingBar will turn error color and extend to the full screen width and disappear; after calling the update method, you can accurately load to the specified progress; after calling the destroy method, you can destroy the loadingBar instance.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button :plain="true" class="btn-common" @click="start">开始</h-button>
  <h-button :plain="true" class="btn-common" @click="finish">结束</h-button>
  <h-button :plain="true" class="btn-common" type="danger" @click="error">错误</h-button>
  <h-button :plain="true" class="btn-common" @click="update">更新指定进度</h-button>
  <h-button :plain="true" class="btn-common" type="danger" @click="destroy">销毁</h-button>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { $loadingBar } from '@aurora/horizon-web';
const start = () => {
  $loadingBar.start();
};
const error = () => {
  $loadingBar.error();
};
const finish = () => {
  $loadingBar.finish();
};
const update = () => {
  $loadingBar.update(60);
};
//销毁实例
const destroy = () => {
  $loadingBar.destroy();
};
onUnmounted(() => {
  destroy();
});
<\/script>

<style scoped>
.btn-common {
  margin-right: 16px;
}
</style>
`,
    path: "demos/methods/LoadingBar/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="loadingbar-configuration-height" tabindex="-1">LoadingBar Configuration Height <a class="header-anchor" href="#loadingbar-configuration-height" aria-label="Permalink to &quot;LoadingBar Configuration Height&quot;">​</a></h2><p>You can configure custom height through the config({ height:xx }) method</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button :plain="true" @click="start">配置高度</h-button>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { $loadingBar } from '@aurora/horizon-web';
$loadingBar.config({
  height: 2,
});
const start = () => {
  $loadingBar.start();
};
onUnmounted(() => {
  $loadingBar.destroy();
});
<\/script>
`,
    path: "demos/methods/LoadingBar/demo2.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/methods/LoadingBar.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LoadingBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  LoadingBar as default
};
