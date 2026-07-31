import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Skeleton.md","filePath":"zh/demos/components/Skeleton.md"}');
const _sfc_main = { name: "demos/components/Skeleton.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Skeleton</h1><p class="description"></p><h2 id="使用说明" tabindex="-1">使用说明 <a class="header-anchor" href="#使用说明" aria-label="Permalink to &quot;使用说明&quot;">​</a></h2><p>从功能本质上,Skeleton和loading没有什么区别，都是为了给用户反馈现在正在处于等待加载的阶段，但是从体验感上，骨架屏会比loading更加具有引导性，能更好的帮助用户聚焦。 那么哪些加载的过程更合适使用骨架屏呢？ 1.当页面内呈现重复性内容较多时 2.大段文本 3.列表和表格</p><h2 id="使用情况" tabindex="-1">使用情况 <a class="header-anchor" href="#使用情况" aria-label="Permalink to &quot;使用情况&quot;">​</a></h2><p>使用骨架屏的情况从整体来看还是少数，除了技术原因，还有就是当骨架屏的样式与实际内容差异过大时，就会出现严重的期待落差，效果适得其反，所以当想要使用骨架屏的时候，需要先考虑内容本身是否适合使用骨架屏。</p><h2 id="基础使用" tabindex="-1">基础使用 <a class="header-anchor" href="#基础使用" aria-label="Permalink to &quot;基础使用&quot;">​</a></h2><p>Skeleton提供默认骨架屏，以及两个插槽loadingTemplate与default,当不使用任何插槽就会显示默认的骨架屏样式，通过切换animated状态来是否显示骨架屏动画</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <section class="main">
    <h-switch v-model="isAnimating" label="是否动画" status class="skeleton-switch" />
    <h-skeleton :loading="isLoading" :animated="isAnimating"></h-skeleton>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const isLoading = ref(true);
const isAnimating = ref(false);
const timer1 = setInterval(function () {
  isLoading.value = !isLoading.value;
}, 3000);
onMounted(() => {
  clearInterval(timer1);
});
<\/script>

<style scoped>
.skeleton-switch {
  margin-bottom: 16px;
}
</style>
`,
    path: "demos/components/Skeleton/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="插槽" tabindex="-1">插槽 <a class="header-anchor" href="#插槽" aria-label="Permalink to &quot;插槽&quot;">​</a></h2><p>用户可以在插槽 <code>loadingTemplate</code> 来显示 <code>loading</code> 时的骨架屏样式，在 <code>default</code> 插槽中显示默认样式</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <section class="main">
    <h-skeleton :loading="isLoading">
      <template #loadingTemplate>
        <h-skeleton-item shape="text" style="width: 30%"></h-skeleton-item>
        <h-skeleton-item shape="text" style="width: 20%"></h-skeleton-item>
        <h-skeleton-item shape="text" style="width: 60%"></h-skeleton-item>
      </template>
      <template #default>
        <div>骨架屏测试</div>
        <div>骨架屏</div>
        <div>骨架屏测试骨架屏测试骨架屏测试</div>
      </template>
    </h-skeleton>
  </section>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
const isLoading = ref(true);
const timer2 = setInterval(function () {
  isLoading.value = !isLoading.value;
}, 3000);
onUnmounted(() => {
  clearInterval(timer2);
});
<\/script>
`,
    path: "demos/components/Skeleton/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="原子骨架屏" tabindex="-1">原子骨架屏 <a class="header-anchor" href="#原子骨架屏" aria-label="Permalink to &quot;原子骨架屏&quot;">​</a></h2><p>提供了如下若干种原子骨架屏，使用者可以根据默认显示的样式，来通过这些原子骨架屏来配置自己的业务骨架屏</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <section class="main">
    <h-skeleton :loading="isLoading">
      <template #loadingTemplate>
        <h-skeleton-item shape="avatar"></h-skeleton-item>
        <h-skeleton-item shape="text"></h-skeleton-item>
        <h-skeleton-item shape="operate"></h-skeleton-item>
        <h-skeleton-item shape="button"></h-skeleton-item>
        <h-skeleton-item shape="image"></h-skeleton-item>
        <h-skeleton-item shape="picture"></h-skeleton-item>
      </template>
      <template #default>
        <h-avatar src="/demo-assets/avatar-coral.svg" />
        <div>
          骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试
        </div>
        <h-button size="medium" type="primary">operate</h-button>
        <div>
          <img
            class="container"
            style="width: 200px; height: 200px"
            src="/demo-assets/scene-aurora.svg"
          />
        </div>
        <div class="container">
          <img
            class="container"
            src="/demo-assets/scene-aurora.svg"
          />
        </div>
      </template>
    </h-skeleton>
  </section>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
const isLoading = ref(true);
const timer3 = setInterval(function () {
  isLoading.value = !isLoading.value;
}, 3000);
onUnmounted(() => {
  clearInterval(timer3);
});
<\/script>

<style scoped>
.container {
  height: 400px;
  width: 400px;
}
</style>
`,
    path: "demos/components/Skeleton/demo3.vue"
  }, null, _parent));
  _push(`<h2 id="skeleton-api" class="no-underline h2"><a href="#skeleton-api" class="!no-underline">Skeleton Api</a></h2><h3 id="skeleton-props" class="no-underline h3"><a href="#skeleton-props" class="!no-underline">Skeleton Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>骨架屏是否显示</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">animated</td><td>骨架屏是否以动画形式显示</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr></tbody></table><h2 id="skeletonitem-api" class="no-underline h2"><a href="#skeletonitem-api" class="!no-underline">SkeletonItem Api</a></h2><h3 id="skeletonitem-props" class="no-underline h3"><a href="#skeletonitem-props" class="!no-underline">SkeletonItem Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">shape</td><td>原子骨架屏形状</td><td><code>&#39;avatar&#39; | &#39;text&#39; | &#39;operate&#39; | &#39;image&#39; | &#39;picture&#39;</code></td><td class="text-center">是</td><td>&#39;text&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Skeleton.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Skeleton as default
};
