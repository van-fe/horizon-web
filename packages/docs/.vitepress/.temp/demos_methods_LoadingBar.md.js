import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/methods/LoadingBar.md","filePath":"zh/demos/methods/LoadingBar.md"}');
const _sfc_main = { name: "demos/methods/LoadingBar.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>LoadingBar 只会在全局创建一个，因此在任何位置调用的方法都会控制这同一个组件，LoadingBar上拥有多个个方法，start()，finish()，error()，update()，destroy()。</p><p>调用start方法时，LoadingBar会模拟加载进度开始延伸至屏幕百分之八十的宽度；调用finish方法，代表加载成功，LoadingBar会延伸至全部屏幕宽度，并消失；调用error方法，代表加载失败，LoadingBar会变error色并延伸至全部屏幕宽度，并消失;update方法调用后可以精确加载到指定的进度;destroy方法调用后可以销毁loadingBar的实例。</p>`);
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
  _push(`<h2 id="loadingbar配置高度" tabindex="-1">LoadingBar配置高度 <a class="header-anchor" href="#loadingbar配置高度" aria-label="Permalink to &quot;LoadingBar配置高度&quot;">​</a></h2><p>可以通过 config({ height:xx })方法来配置自定义高度</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/methods/LoadingBar.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LoadingBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  LoadingBar as default
};
