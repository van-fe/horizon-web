import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Slider.md","filePath":"en/demos/components/Slider.md"}');
const _sfc_main = { name: "en/demos/components/Slider.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Slider</h1><p class="description">You can set <code>small</code> <code>medium</code> <code>large</code></p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-slider v-model="valueRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const valueRef = ref(50);
    return { valueRef };
  },
});
<\/script>
`,
    path: "demos/components/Slider/index.vue"
  }, null, _parent));
  _push(`<h2 id="set-size" tabindex="-1">Set Size <a class="header-anchor" href="#set-size" aria-label="Permalink to &quot;Set Size&quot;">​</a></h2><p>You can set <code>small</code> <code>medium</code> <code>large</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-slider v-model="valueRef" size="small" />
  <h-slider v-model="valueRef" size="medium" />
  <h-slider v-model="valueRef" size="large" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const valueRef = ref(50);
    return { valueRef };
  },
});
<\/script>
`,
    path: "demos/components/Slider/size.vue"
  }, null, _parent));
  _push(`<h2 id="disabled-state" tabindex="-1">Disabled State <a class="header-anchor" href="#disabled-state" aria-label="Permalink to &quot;Disabled State&quot;">​</a></h2><p>Disable by setting <code>disabled</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-slider v-model="valueRef" disabled />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const valueRef = ref(50);
    return { valueRef };
  },
});
<\/script>
`,
    path: "demos/components/Slider/disable.vue"
  }, null, _parent));
  _push(`<h2 id="different-types" tabindex="-1">Different Types <a class="header-anchor" href="#different-types" aria-label="Permalink to &quot;Different Types&quot;">​</a></h2><p>You can set the <code>type</code> field to control different types</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-slider v-model="valueRef" />
  <h-slider v-model="valueRef" type="info" />
  <h-slider v-model="valueRef" type="success" />
  <h-slider v-model="valueRef" type="warning" />
  <h-slider v-model="valueRef" type="error" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const valueRef = ref(50);
    return { valueRef };
  },
});
<\/script>
`,
    path: "demos/components/Slider/types.vue"
  }, null, _parent));
  _push(`<h2 id="custom-color" tabindex="-1">Custom Color <a class="header-anchor" href="#custom-color" aria-label="Permalink to &quot;Custom Color&quot;">​</a></h2><p>If the colors of different types cannot meet the requirements, you can control the progress bar color by setting <code>color</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-slider v-model="valueRef" />
  <h-slider v-model="valueRef" color="red" />
  <h-slider v-model="valueRef" color="purple" />
  <h-slider v-model="valueRef" color="orange" />
  <h-slider v-model="valueRef" color="skyblue" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const valueRef = ref(50);
    return { valueRef };
  },
});
<\/script>
`,
    path: "demos/components/Slider/color.vue"
  }, null, _parent));
  _push(`<h2 id="specify-selection-range" tabindex="-1">Specify Selection Range <a class="header-anchor" href="#specify-selection-range" aria-label="Permalink to &quot;Specify Selection Range&quot;">​</a></h2><p>You can use <code>range</code> to configure range selection</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <p>当前范围: {{ valueRef }}</p>
    <h-slider v-model="valueRef" :range="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const valueRef = ref([30, 60]);
    return {
      valueRef,
    };
  },
});
<\/script>
`,
    path: "demos/components/Slider/range.vue"
  }, null, _parent));
  _push(`<h2 id="specify-step" tabindex="-1">Specify Step <a class="header-anchor" href="#specify-step" aria-label="Permalink to &quot;Specify Step&quot;">​</a></h2><p>You can set <code>step</code> to specify the step</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-slider v-model="valueRef1" :step="10" />
  <h-slider v-model="valueRef1" :step="10" show-separator />
  <h-slider v-model="valueRef2" :max="40.8" :min="36.1" :step="0.2" />
  <h-slider v-model="valueRef2" :max="40.8" :min="36.1" :step="0.2" show-separator />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const valueRef1 = ref(40);
    const valueRef2 = ref(40);

    return { valueRef1, valueRef2 };
  },
});
<\/script>
`,
    path: "demos/components/Slider/step.vue"
  }, null, _parent));
  _push(`<h2 id="custom-tooltip" tabindex="-1">Custom Tooltip <a class="header-anchor" href="#custom-tooltip" aria-label="Permalink to &quot;Custom Tooltip&quot;">​</a></h2><p>You can configure <code>tooltip-formatter</code> to control the displayed text</p><p>You can also configure <code>tooltip-enable = false</code> to control not displaying <code>tooltip</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-slider v-model="valueRef" :tooltip-formatter="tooltipFormatter" />\n  <h-slider v-model="valueRef" :tooltip-formatter="tooltipFormatter" :tooltip-enable="false" />\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\n\nexport default defineComponent({\n  setup() {\n    const valueRef = ref(50);\n\n    return {\n      valueRef,\n      tooltipFormatter(val: number) {\n        return `${val} 个`;\n      },\n    };\n  },\n});\n<\/script>\n',
    path: "demos/components/Slider/custom-tooltip.vue"
  }, null, _parent));
  _push(`<h2 id="with-input-box" tabindex="-1">With Input Box <a class="header-anchor" href="#with-input-box" aria-label="Permalink to &quot;With Input Box&quot;">​</a></h2><p>You can set <code>input-enable</code> to enable the input box</p><p>But note that if <code>range</code> is enabled, the input box will not be enabled</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-slider v-model="valueRef" :input-enable="true" :step="5" />
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="24">
      <h-slider v-model="valueRef" :input-enable="true" disabled />
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const valueRef = ref(50);
    return { valueRef };
  },
});
<\/script>
`,
    path: "demos/components/Slider/with-input.vue"
  }, null, _parent));
  _push(`<h2 id="slider-api" class="no-underline h2"><a href="#slider-api" class="!no-underline">Slider Api</a></h2><h3 id="slider-props" class="no-underline h3"><a href="#slider-props" class="!no-underline">Slider Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>number | [number, number]</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max</td><td>Configuration for max.</td><td><code>number</code></td><td class="text-center">No</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min</td><td>Configuration for min.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">step</td><td>Configuration for step.</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-separator</td><td>Configuration for show separator.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Configuration for type.</td><td><code>&#39;primary&#39; | &#39;info&#39; | &#39;success&#39; | &#39;warning&#39; | &#39;danger&#39;</code></td><td class="text-center">No</td><td>&#39;primary&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>Configuration for color.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">range</td><td>Configuration for range.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">track-clickable</td><td>Configuration for track clickable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-enable</td><td>Configuration for input enable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-props</td><td>Configuration for input props.</td><td><code>Partial&lt;InputNumberProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">keyboard-enable</td><td>Configuration for keyboard enable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-enable</td><td>Configuration for tooltip enable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-placement</td><td>Configuration for tooltip placement.</td><td><code>&#39;top-start&#39; | &#39;top-end&#39; | &#39;bottom-start&#39; | &#39;bottom-end&#39; | &#39;top&#39; | &#39;bottom&#39; | &#39;right&#39; | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-formatter</td><td>Configuration for tooltip formatter.</td><td><code>(value: number) =&gt; string</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="slider-emits" class="no-underline h3"><a href="#slider-emits" class="!no-underline">Slider Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Emitted when focus changes.</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>The evt value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Emitted when blur changes.</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>The evt value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Slider.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Slider as default
};
