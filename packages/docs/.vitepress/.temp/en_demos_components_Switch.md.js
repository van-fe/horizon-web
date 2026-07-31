import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Switch.md","filePath":"en/demos/components/Switch.md"}');
const _sfc_main = { name: "en/demos/components/Switch.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Switch</h1><p class="description">You can control the label position by configuring <code>label-position</code></p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch v-model="currentRef" label="Some text" status />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref(false),
    };
  },
});
<\/script>
`,
    path: "demos/components/Switch/basic.vue"
  }, null, _parent));
  _push(`<h2 id="label-position" tabindex="-1">Label Position <a class="header-anchor" href="#label-position" aria-label="Permalink to &quot;Label Position&quot;">​</a></h2><p>You can control the label position by configuring <code>label-position</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div style="width: 600px">
    <h-switch
      v-model="currentRef"
      label="This is a Label Text  and their names. This is a Label Text  and their names. This is a Label Text  and their names."
      label-position="top"
      style="margin-bottom: 20px"
    />
    <h-switch
      v-model="currentRef"
      label="This is a Label Text  and their names. This is a Label Text  and their names. This is a Label Text  and their names."
      label-position="left"
      style="margin-bottom: 20px"
    />
    <h-switch
      v-model="currentRef"
      label="This is a Label Text  and their names. This is a Label Text  and their names. This is a Label Text  and their names."
      label-position="right"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref(false),
    };
  },
});
<\/script>
`,
    path: "demos/components/Switch/labelPosition.vue"
  }, null, _parent));
  _push(`<h2 id="size" tabindex="-1">Size <a class="header-anchor" href="#size" aria-label="Permalink to &quot;Size&quot;">​</a></h2><p>Provides two sizes: <code>medium/small</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch v-model="currentRef" status label="Some text" />
  <h-switch v-model="currentRef" size="small" status label="Some text" class="ml-4" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref(false),
    };
  },
});
<\/script>
`,
    path: "demos/components/Switch/size.vue"
  }, null, _parent));
  _push(`<h2 id="disabled-and-readonly" tabindex="-1">Disabled and Readonly <a class="header-anchor" href="#disabled-and-readonly" aria-label="Permalink to &quot;Disabled and Readonly&quot;">​</a></h2><p>Use <code>disabled</code> and <code>readonly</code> to control whether it is disabled and readonly</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-switch label="disabled" :model-value="true" disabled />\n    <h-switch label="disabled" :model-value="false" disabled class="ml-4" />\n  </div>\n\n  <div>\n    <h-switch label="readonly" readonly />\n    <h-switch class="ml-4" label="readonly" readonly :model-value="true" />\n  </div>\n</template>\n<script setup lang="ts">\n<\/script>\n',
    path: "demos/components/Switch/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="intercept-modification" tabindex="-1">Intercept Modification <a class="header-anchor" href="#intercept-modification" aria-label="Permalink to &quot;Intercept Modification&quot;">​</a></h2><p>Configure <code>before-change</code> to intercept whether to allow value change</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import { $confirm } from '@aurora/horizon-web';

const modelValue = ref(false);

const onBeforeChange = (newValue: boolean) => {
  return new Promise((resolve, reject) => {
    $confirm(\`是否确定改为 \${newValue}?\`, '提示').then((close) => {
      resolve(void 0);
      close();
    }).catch(() => {
      reject();
    });
  });
};
<\/script>

<template>
  <h-switch v-model="modelValue" :before-change="onBeforeChange" />
</template>

<style scoped>

</style>
`,
    path: "demos/components/Switch/beforeChange.vue"
  }, null, _parent));
  _push(`<h2 id="switch-api" class="no-underline h2"><a href="#switch-api" class="!no-underline">Switch Api</a></h2><h3 id="switch-props" class="no-underline h3"><a href="#switch-props" class="!no-underline">Switch Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>boolean</code></td><td class="text-center">Yes</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td>Configuration for status.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status-on-text</td><td>Configuration for status on text.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status-off-text</td><td>Configuration for status off text.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>Configuration for label.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-position</td><td>Configuration for label position.</td><td><code>&#39;top&#39; | &#39;left&#39; | &#39;right&#39;</code></td><td class="text-center">No</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>Configuration for readonly.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-change</td><td>Configuration for before change.</td><td><code>boolean | ((newValue: boolean) =&gt; Awaitable&lt;boolean | undefined&gt;)</code></td><td class="text-center">No</td><td>undefined</td></tr></tbody></table><h3 id="switch-emits" class="no-underline h3"><a href="#switch-emits" class="!no-underline">Switch Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">Emitted when change changes.</td><td rowspan="1">( value: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>boolean</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Emitted when blur changes.</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>The evt value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Switch.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Switch as default
};
