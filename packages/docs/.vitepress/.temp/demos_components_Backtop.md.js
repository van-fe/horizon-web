import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Backtop.md","filePath":"zh/demos/components/Backtop.md"}');
const _sfc_main = { name: "demos/components/Backtop.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Backtop</h1><p class="description">返回页面顶部按钮</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>滑动页面即可见右下方返回顶部按钮</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    滚动页面可见
    <h-backtop :visibility-height="200" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
function onClick() {
  console.info('----点击事件触发----');
}
<\/script>
`,
    path: "demos/components/Backtop/basic.vue"
  }, null, _parent));
  _push(`<h2 id="自定义显示内容" tabindex="-1">自定义显示内容 <a class="header-anchor" href="#自定义显示内容" aria-label="Permalink to &quot;自定义显示内容&quot;">​</a></h2><p>顶部按钮大小 40*40px 固定，内容可自定义</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    自定义内容\n    <h-backtop :right="24" :bottom="170" :visibility-height="200">up</h-backtop>\n  </div>\n</template>',
    path: "demos/components/Backtop/custom.vue"
  }, null, _parent));
  _push(`<h2 id="自定义滚动触发元素" tabindex="-1">自定义滚动触发元素 <a class="header-anchor" href="#自定义滚动触发元素" aria-label="Permalink to &quot;自定义滚动触发元素&quot;">​</a></h2><p>设置需要监听其滚动事件的元素</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="backtop-demo">
    滚动以下盒子可见
    <div class="scroll-box">
      指定的触发元素
      <div class="inner"></div>
    </div>

    <h-backtop target=".scroll-box" :bottom="300" :visibility-height="10" @click="onClick">
      👆
    </h-backtop>
  </div>
</template>

<script setup lang="ts">
function onClick() {
  console.info('----点击事件触发----');
}
<\/script>

<style scoped>
.backtop-demo .scroll-box {
  width: 300px;
  height: 300px;
  overflow: auto;
  border: 1px solid #14798f;
}

.backtop-demo .inner {
  height: 1000px;
}
</style>
`,
    path: "demos/components/Backtop/target.vue"
  }, null, _parent));
  _push(`<h2 id="backtop-api" class="no-underline h2"><a href="#backtop-api" class="!no-underline">Backtop Api</a></h2><h3 id="backtop-props" class="no-underline h3"><a href="#backtop-props" class="!no-underline">Backtop Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visibility-height</td><td>滚动高度达到此参数值才出现</td><td><code>number</code></td><td class="text-center">否</td><td>400</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">bottom</td><td>控制其显示位置, 距离页面底部距离</td><td><code>number</code></td><td class="text-center">否</td><td>120</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">right</td><td>控制其显示位置, 距离页面右边距</td><td><code>number</code></td><td class="text-center">否</td><td>24</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>监听其滚动事件的元素</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="backtop-emits" class="no-underline h3"><a href="#backtop-emits" class="!no-underline">Backtop Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击按钮触发的事件</td><td rowspan="1">( event: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">event</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Backtop.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Backtop = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Backtop as default
};
