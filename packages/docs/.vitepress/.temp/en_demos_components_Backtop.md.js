import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Backtop.md","filePath":"en/demos/components/Backtop.md"}');
const _sfc_main = { name: "en/demos/components/Backtop.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Backtop</h1><p class="description">Scroll the page to see the back-to-top button in the bottom right corner</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Scroll the page to see the back-to-top button in the bottom right corner</p>`);
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
  _push(`<h2 id="custom-display-content" tabindex="-1">Custom Display Content <a class="header-anchor" href="#custom-display-content" aria-label="Permalink to &quot;Custom Display Content&quot;">​</a></h2><p>The top button size is fixed at 40*40px, and the content can be customized</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    自定义内容\n    <h-backtop :right="24" :bottom="170" :visibility-height="200">up</h-backtop>\n  </div>\n</template>',
    path: "demos/components/Backtop/custom.vue"
  }, null, _parent));
  _push(`<h2 id="custom-scroll-trigger-element" tabindex="-1">Custom Scroll Trigger Element <a class="header-anchor" href="#custom-scroll-trigger-element" aria-label="Permalink to &quot;Custom Scroll Trigger Element&quot;">​</a></h2><p>Set the element whose scroll event needs to be listened to</p>`);
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
  _push(`<h2>Backtop Api</h2><h3>Backtop Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visibility-height</td><td>滚动高度达到此参数值才出现</td><td><code>number</code></td><td class="text-center">No</td><td>400</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">bottom</td><td>控制其显示位置, 距离页面底部距离</td><td><code>number</code></td><td class="text-center">No</td><td>120</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">right</td><td>控制其显示位置, 距离页面右边距</td><td><code>number</code></td><td class="text-center">No</td><td>24</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>监听其滚动事件的元素</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>Backtop Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击按钮触发的事件</td><td rowspan="1">( event: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">event</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Backtop.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Backtop = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Backtop as default
};
