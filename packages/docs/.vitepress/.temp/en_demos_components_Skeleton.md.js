import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Skeleton.md","filePath":"en/demos/components/Skeleton.md"}');
const _sfc_main = { name: "en/demos/components/Skeleton.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Skeleton</h1><p class="description">In essence, Skeleton and loading are no different. They are both used to give users feedback that they are in a waiting loading stage. However, from an experience perspective, skeleton screens are more guiding than loading and can better help users focus.</p><h2 id="usage-instructions" tabindex="-1">Usage Instructions <a class="header-anchor" href="#usage-instructions" aria-label="Permalink to &quot;Usage Instructions&quot;">​</a></h2><p>In essence, Skeleton and loading are no different. They are both used to give users feedback that they are in a waiting loading stage. However, from an experience perspective, skeleton screens are more guiding than loading and can better help users focus. So which loading processes are more suitable for using skeleton screens?</p><ol><li>When there are many repetitive contents on the page</li><li>Large paragraphs of text</li><li>Lists and tables</li></ol><h2 id="usage-situations" tabindex="-1">Usage Situations <a class="header-anchor" href="#usage-situations" aria-label="Permalink to &quot;Usage Situations&quot;">​</a></h2><p>The use of skeleton screens is still a minority overall. In addition to technical reasons, when the style of the skeleton screen differs too much from the actual content, there will be serious expectation gaps, and the effect will be counterproductive. So when you want to use skeleton screens, you need to first consider whether the content itself is suitable for using skeleton screens.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Skeleton provides default skeleton screen and two slots loadingTemplate and default. When no slots are used, the default skeleton screen style will be displayed. Toggle the animated state to whether to display the skeleton screen animation</p>`);
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
  _push(`<h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><p>Users can display the skeleton screen style when <code>loading</code> in the slot <code>loadingTemplate</code>, and display the default style in the <code>default</code> slot</p>`);
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
  _push(`<h2 id="atomic-skeleton-screen" tabindex="-1">Atomic Skeleton Screen <a class="header-anchor" href="#atomic-skeleton-screen" aria-label="Permalink to &quot;Atomic Skeleton Screen&quot;">​</a></h2><p>The following atomic skeleton screens are provided. Users can configure their own business skeleton screens through these atomic skeleton screens based on the default display style</p>`);
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
  _push(`<h2 id="skeleton-api" class="no-underline h2"><a href="#skeleton-api" class="!no-underline">Skeleton Api</a></h2><h3 id="skeleton-props" class="no-underline h3"><a href="#skeleton-props" class="!no-underline">Skeleton Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>Configuration for loading.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">animated</td><td>Configuration for animated.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr></tbody></table><h2 id="skeletonitem-api" class="no-underline h2"><a href="#skeletonitem-api" class="!no-underline">SkeletonItem Api</a></h2><h3 id="skeletonitem-props" class="no-underline h3"><a href="#skeletonitem-props" class="!no-underline">SkeletonItem Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">shape</td><td>Configuration for shape.</td><td><code>&#39;avatar&#39; | &#39;text&#39; | &#39;operate&#39; | &#39;image&#39; | &#39;picture&#39;</code></td><td class="text-center">Yes</td><td>&#39;text&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Skeleton.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Skeleton as default
};
