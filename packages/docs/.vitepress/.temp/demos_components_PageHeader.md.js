import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/PageHeader.md","filePath":"zh/demos/components/PageHeader.md"}');
const _sfc_main = { name: "demos/components/PageHeader.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>PageHeader</h1><p class="description">页头位于页面内容上方，主要作用是申明页面主题、页内信息导航、页面级内容操作</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-page-header title="页面标题">\n    <template #tags>\n      <h-tag size="small" class="ml-2" :clickable="false">标签</h-tag>\n    </template>\n    <template #content>\n      <div>ID: 0012138</div>\n      <h-divider direction="vertical" />\n      <div>所有者: Unknown</div>\n      <h-divider direction="vertical" />\n      <div>所属空间: DD</div>\n    </template>\n    <template #extra>\n      <h-button size="large" :plain="true">副按钮</h-button>\n      <h-button size="large">主按钮</h-button>\n    </template>\n  </h-page-header>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n</style>\n',
    path: "demos/components/PageHeader/basic.vue"
  }, null, _parent));
  _push(`<h2 id="搭配面包屑使用" tabindex="-1">搭配面包屑使用 <a class="header-anchor" href="#搭配面包屑使用" aria-label="Permalink to &quot;搭配面包屑使用&quot;">​</a></h2><p>使用 <code>breadcrumb</code> 插槽，放置面包屑</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-page-header :icon="null" title="页面标题">
    <template #breadcrumb>
      <h-breadcrumb :separator="IconArrowRight">
        <h-breadcrumb-item>首页</h-breadcrumb-item>
        <h-breadcrumb-item>子页面1</h-breadcrumb-item>
        <h-breadcrumb-item>子页面2</h-breadcrumb-item>
        <h-breadcrumb-item>子页面3</h-breadcrumb-item>
        <h-breadcrumb-item>当前页面</h-breadcrumb-item>
      </h-breadcrumb>
    </template>
    <template #extra>
      <h-button :plain="true">副按钮</h-button>
      <h-button>主按钮</h-button>
    </template>
  </h-page-header>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@aurora/icon';
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/PageHeader/breadcrumb.vue"
  }, null, _parent));
  _push(`<h2 id="可交互内容" tabindex="-1">可交互内容 <a class="header-anchor" href="#可交互内容" aria-label="Permalink to &quot;可交互内容&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-page-header>
    <template #title>
      This is an extremely long header that may exceed the maximum width limit
    </template>
    <template #tags>
      <h-tag size="small" class="ml-2" :clickable="false">标签</h-tag>
    </template>
    <template #content>
      ID: 0012138
      <copy-btn text="0012138" />
      <h-divider direction="vertical" />
      所有者:
      <h-tag avatar="/demo-assets/avatar-indigo.svg" :round="true" class="ml-2">Unknown</h-tag>
      <h-divider direction="vertical" />
      所属空间:
      <h-link :link="true" size="small" type="neutral" class="ml-2">
        <IconEdit />
        DD
      </h-link>
    </template>
    <template #extra>
      <h-button :plain="true">副按钮</h-button>
      <h-button>主按钮</h-button>
    </template>
  </h-page-header>
</template>

<script setup lang="ts">
import { IconEdit } from '@aurora/icon';
<\/script>

<style scoped>
.h-link :deep(.h-link__inner){
  display: flex;
  align-items: center;
}
</style>
`,
    path: "demos/components/PageHeader/interactive.vue"
  }, null, _parent));
  _push(`<h2 id="pageheader-api" class="no-underline h2"><a href="#pageheader-api" class="!no-underline">PageHeader Api</a></h2><h3 id="pageheader-props" class="no-underline h3"><a href="#pageheader-props" class="!no-underline">PageHeader Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>返回按钮图标<br>设置为 <code>null</code> 即不需要返回按钮</td><td><code>iconNullablePropType</code></td><td class="text-center">否</td><td>IconBack</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>标题</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td>内容</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-divider</td><td>是否使用分割线</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled-header-tooltip</td><td>禁用header的Tooltip</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="pageheader-emits" class="no-underline h3"><a href="#pageheader-emits" class="!no-underline">PageHeader Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">back</td><td rowspan="1">点击返回按钮时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/PageHeader.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PageHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  PageHeader as default
};
