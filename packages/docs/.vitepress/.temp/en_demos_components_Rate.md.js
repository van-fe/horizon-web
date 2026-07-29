import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Rate.md","filePath":"en/demos/components/Rate.md"}');
const _sfc_main = { name: "en/demos/components/Rate.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Rate</h1><p class="description">Use <code>v-model</code> to bind the current rating value.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Use <code>v-model</code> to bind the current rating value.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    <h-rate v-model="currentScore" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentScore: ref(3),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/basic.vue"
  }, null, _parent));
  _push(`<h2 id="allow-half-star" tabindex="-1">Allow Half Star <a class="header-anchor" href="#allow-half-star" aria-label="Permalink to &quot;Allow Half Star&quot;">​</a></h2><p>Use <code>half</code> to set whether to allow half star.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    <h-rate v-model="currentScore" :half="true" />
    <h-rate v-model="currentScore" :half="true" size="32">A</h-rate>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentScore: ref(3.5),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/allowHalf.vue"
  }, null, _parent));
  _push(`<h2 id="custom-icon" tabindex="-1">Custom Icon <a class="header-anchor" href="#custom-icon" aria-label="Permalink to &quot;Custom Icon&quot;">​</a></h2><p>Customize the rating icon through the <code>icon</code> attribute.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    <h-rate v-model="currentScore" icon="car" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentScore: ref(3),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/customIcon.vue"
  }, null, _parent));
  _push(`<h2 id="custom-icon-using-slot" tabindex="-1">Custom Icon - Using Slot <a class="header-anchor" href="#custom-icon-using-slot" aria-label="Permalink to &quot;Custom Icon - Using Slot&quot;">​</a></h2><p>Use the default slot to customize your own rating icon (only supports tags that can be styled with font-size and color)</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    <h-rate v-model="currentScore" size="large">A</h-rate>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      currentScore: ref(3),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/useSlot.vue"
  }, null, _parent));
  _push(`<h2 id="custom-count" tabindex="-1">Custom Count <a class="header-anchor" href="#custom-count" aria-label="Permalink to &quot;Custom Count&quot;">​</a></h2><p>You can set the number of rating icons through the <code>count</code> attribute.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    <h-rate v-model="currentScore" :count="10" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentScore: ref(3),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/customCount.vue"
  }, null, _parent));
  _push(`<h2 id="custom-style" tabindex="-1">Custom Style <a class="header-anchor" href="#custom-style" aria-label="Permalink to &quot;Custom Style&quot;">​</a></h2><p>Customize icon size through the <code>size</code> attribute. The parameter can accept strings <code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code> or numbers.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    <h-rate v-model="currentScore" size="small" />
    <h-rate v-model="currentScore" size="medium" />
    <h-rate v-model="currentScore" size="large" />
    <h-rate v-model="currentScore" size="32" />
    <h-rate v-model="currentScore" size="36" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentScore: ref(3),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/customStyle_size.vue"
  }, null, _parent));
  _push(`<p>You can set the fill color, empty state color, and disabled color of the icon through the <code>color</code> <code>voidColor</code> <code>disabledColor</code> attributes respectively.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    <h-rate v-model="currentScore" color="pink" void-color="blue" />
    <h-rate v-model="currentScore" disabled disabled-color="green" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentScore: ref(3),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/customStyle_color.vue"
  }, null, _parent));
  _push(`<p>You can set the left and right spacing of icons through the <code>gutter</code> attribute.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    <h-rate v-model="currentScore" :gutter="10" />
    <h-rate v-model="currentScore" :gutter="30" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentScore: ref(3),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/customStyle_gutter.vue"
  }, null, _parent));
  _push(`<h2 id="tooltip-text" tabindex="-1">Tooltip Text <a class="header-anchor" href="#tooltip-text" aria-label="Permalink to &quot;Tooltip Text&quot;">​</a></h2><p>Set whether to display tooltip text through the <code>showTooltip</code> attribute, and you can customize the tooltip text through the <code>tooltip</code> attribute (the number of items in the passed array should be the same as the count value, otherwise the default tooltip text will be displayed).</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    <h-rate v-model="currentScore" show-tooltip />
    <h-rate v-model="currentScore" show-tooltip :tooltip="tooltipText" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      tooltipText: reactive(['oops', 'disappointed', 'normal', 'good', 'great']),
      currentScore: ref(3),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/tooltip.vue"
  }, null, _parent));
  _push(`<h2 id="readonly-disabled" tabindex="-1">Readonly &amp; Disabled <a class="header-anchor" href="#readonly-disabled" aria-label="Permalink to &quot;Readonly &amp; Disabled&quot;">​</a></h2><p>Set readonly state and disabled state through <code>readonly</code> <code>disabled</code> attributes respectively.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="">
    只读
    <h-rate v-model="currentScore" readonly />
    禁用
    <h-rate v-model="currentScore" disabled />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      currentScore: ref(3),
    };
  },
});
<\/script>
`,
    path: "demos/components/Rate/unable.vue"
  }, null, _parent));
  _push(`<h2>Rate Api</h2><h3>Rate Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>绑定值</td><td><code>number</code></td><td class="text-center">No</td><td>3</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">count</td><td>icon数量</td><td><code>number</code></td><td class="text-center">No</td><td>5</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">half</td><td>允许半星</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tooltip</td><td>是否显示提示文字</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip</td><td>提示文字文本</td><td><code>array</code></td><td class="text-center">No</td><td>[]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>是否只读</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>图标大小</td><td><code>&#39;large&#39; | &#39;medium&#39; | &#39;small&#39; | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>自定义图标种类</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;star_filled&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>自定义图标active颜色</td><td><code>string</code></td><td class="text-center">No</td><td><code>rgb(\${cssVariable(&#39;rate-color--content&#39;)})</code></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">void-color</td><td>图标空时的颜色</td><td><code>string</code></td><td class="text-center">No</td><td>cssVariable(&#39;border-default&#39;)</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled-color</td><td>图标禁用时的颜色</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;#9B9DA9&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">gutter</td><td>icon间距</td><td><code>number</code></td><td class="text-center">No</td><td>5</td></tr></tbody></table><h3>Rate Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">当变化时触发</td><td rowspan="1">( value: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>number</code></td><td>变化后的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Rate.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Rate = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Rate as default
};
