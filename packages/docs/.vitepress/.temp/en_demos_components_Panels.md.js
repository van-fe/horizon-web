import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Panels.md","filePath":"en/demos/components/Panels.md"}');
const _sfc_main = { name: "en/demos/components/Panels.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Panels</h1><p class="description">By default, panels have horizontal animation effects and automatically detect whether the switching direction is from left to right or from right to left, displaying the most appropriate animation. You can also enable vertical animation by setting <code>vertical</code>.</p><h2 id="use-with-radio" tabindex="-1">Use with radio <a class="header-anchor" href="#use-with-radio" aria-label="Permalink to &quot;Use with radio&quot;">​</a></h2>`);
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
  _push(`<h2 id="use-with-tabs" tabindex="-1">Use with tabs <a class="header-anchor" href="#use-with-tabs" aria-label="Permalink to &quot;Use with tabs&quot;">​</a></h2>`);
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
  _push(`<h2 id="vertical-direction" tabindex="-1">Vertical Direction <a class="header-anchor" href="#vertical-direction" aria-label="Permalink to &quot;Vertical Direction&quot;">​</a></h2><p>By default, panels have horizontal animation effects and automatically detect whether the switching direction is from left to right or from right to left, displaying the most appropriate animation. You can also enable vertical animation by setting <code>vertical</code>.</p>`);
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
  _push(`<h2 id="additional-styles" tabindex="-1">Additional Styles <a class="header-anchor" href="#additional-styles" aria-label="Permalink to &quot;Additional Styles&quot;">​</a></h2><p>To improve flexibility, panels try not to have irrelevant styles. You can add the styles you want through the utility classes in <a href="./../../style-animation/center/doc">Styles &amp; Animation</a> or <code>style</code>.</p>`);
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
  _push(`<h2 id="panels-api" class="no-underline h2"><a href="#panels-api" class="!no-underline">Panels Api</a></h2><h3 id="panels-props" class="no-underline h3"><a href="#panels-props" class="!no-underline">Panels Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">model-value</td><td>Configuration for model value.</td><td><code>string | number</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">animated</td><td>Configuration for animated.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">vertical</td><td>Configuration for vertical.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h2 id="panel-api" class="no-underline h2"><a href="#panel-api" class="!no-underline">Panel Api</a></h2><h3 id="panel-props" class="no-underline h3"><a href="#panel-props" class="!no-underline">Panel Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>Configuration for name.</td><td><code>string | number</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Panels.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Panels = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Panels as default
};
