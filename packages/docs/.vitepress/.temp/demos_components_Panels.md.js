import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Panels.md","filePath":"zh/demos/components/Panels.md"}');
const _sfc_main = { name: "demos/components/Panels.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Panels</h1><p class="description">Panels 组件用来显示可切换的更多内容，可以单独使用，也常常结合 <code>radio</code>, <code>tabs</code> 等组件一起使用</p><h2 id="与-radio-结合使用" tabindex="-1">与 radio 结合使用 <a class="header-anchor" href="#与-radio-结合使用" aria-label="Permalink to &quot;与 radio 结合使用&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space block direction="vertical">
    <h-radio-group v-model="currentRef">
      <h-radio label="panel1">Option1</h-radio>
      <h-radio label="panel2">Option2</h-radio>
      <h-radio label="panel3">Option3</h-radio>
    </h-radio-group>
    <h-panels v-model="currentRef" animated>
      <h-panel name="panel1">Panel1 Content</h-panel>
      <h-panel name="panel2">Panel2 Content</h-panel>
      <h-panel name="panel3">Panel3 Content</h-panel>
    </h-panels>
  </h-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref('panel1'),
    };
  },
});
<\/script>
`,
    path: "demos/components/Panels/basic.vue"
  }, null, _parent));
  _push(`<h2 id="与-tabs-结合使用" tabindex="-1">与 tabs 结合使用 <a class="header-anchor" href="#与-tabs-结合使用" aria-label="Permalink to &quot;与 tabs 结合使用&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space block direction="vertical" size="small">
    <h-tabs v-model="currentRef">
      <h-tab name="panel1" label="Option1" />
      <h-tab name="panel2" label="Option2" />
      <h-tab name="panel3" label="Option3" />
    </h-tabs>
    <h-panels v-model="currentRef" animated>
      <h-panel name="panel1">Panel1 Content</h-panel>
      <h-panel name="panel2">Panel2 Content</h-panel>
      <h-panel name="panel3">Panel3 Content</h-panel>
    </h-panels>
  </h-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref('panel1'),
    };
  },
});
<\/script>
`,
    path: "demos/components/Panels/tab.vue"
  }, null, _parent));
  _push(`<h2 id="垂直方向" tabindex="-1">垂直方向 <a class="header-anchor" href="#垂直方向" aria-label="Permalink to &quot;垂直方向&quot;">​</a></h2><p>默认情况下，面板具有水平的动画效果，且会自动监听切换方向是从左到右，还是从右到左，显示最恰当的动画。你也可以通过设置 <code>vertical</code> 启用垂直方向的动画。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space block direction="vertical" size="small">
    <h-radio-group v-model="currentRef">
      <h-radio label="panel1">Option1</h-radio>
      <h-radio label="panel2">Option2</h-radio>
      <h-radio label="panel3">Option3</h-radio>
    </h-radio-group>
    <h-panels v-model="currentRef" vertical animated>
      <h-panel name="panel1">Panel1 Content</h-panel>
      <h-panel name="panel2">Panel2 Content</h-panel>
      <h-panel name="panel3">Panel3 Content</h-panel>
    </h-panels>
  </h-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref('panel1'),
    };
  },
});
<\/script>
`,
    path: "demos/components/Panels/vertical.vue"
  }, null, _parent));
  _push(`<h2 id="附加样式" tabindex="-1">附加样式 <a class="header-anchor" href="#附加样式" aria-label="Permalink to &quot;附加样式&quot;">​</a></h2><p>为提高灵活度，面板尽可能不自带无关样式，你可以通过 <a href="./../../style-animation/center/doc">Styles &amp; Animation</a> 中的工具类或 <code>style</code> 来附加想要的样式。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space block direction="vertical" size="small">
    <h-tabs v-model="currentRef">
      <h-tab name="panel1" label="Option1" />
      <h-tab name="panel2" label="Option2" />
      <h-tab name="panel3" label="Option3" />
    </h-tabs>
    <h-panels v-model="currentRef" animated>
      <h-panel name="panel1">Panel1 Content</h-panel>
      <h-panel name="panel2">Panel2 Content</h-panel>
      <h-panel name="panel3">Panel3 Content</h-panel>
    </h-panels>
  </h-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref('panel1'),
    };
  },
});
<\/script>
`,
    path: "demos/components/Panels/style.vue"
  }, null, _parent));
  _push(`<h2>Panels Api</h2><h3>Panels Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">model-value</td><td>绑定值</td><td><code>string | number</code></td><td class="text-center">是</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">animated</td><td>是否开启动画效果</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">vertical</td><td>动画是否垂直方向</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h2>Panel Api</h2><h3>Panel Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>面板的名称，必须是唯一的</td><td><code>string | number</code></td><td class="text-center">是</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>面板是否禁用（不显示）</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Panels.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Panels = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Panels as default
};
