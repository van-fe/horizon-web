import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Rate.md","filePath":"zh/demos/components/Rate.md"}');
const _sfc_main = { name: "demos/components/Rate.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Rate</h1><p class="description">用于评分操作</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>使用 <code>v-model</code> 绑定当前评分值。</p>`);
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
  _push(`<h2 id="允许半星" tabindex="-1">允许半星 <a class="header-anchor" href="#允许半星" aria-label="Permalink to &quot;允许半星&quot;">​</a></h2><p>使用 <code>half</code> 设置是否允许半星。</p>`);
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
  _push(`<h2 id="自定义图标" tabindex="-1">自定义图标 <a class="header-anchor" href="#自定义图标" aria-label="Permalink to &quot;自定义图标&quot;">​</a></h2><p>通过 <code>icon</code> 属性自定义评分图标。</p>`);
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
  _push(`<h2 id="自定义图标-使用插槽" tabindex="-1">自定义图标-使用插槽 <a class="header-anchor" href="#自定义图标-使用插槽" aria-label="Permalink to &quot;自定义图标-使用插槽&quot;">​</a></h2><p>使用默认插槽，可以定制自己所需的评分图标（仅支持可以用font-size和color更改样式的标签)</p>`);
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
  _push(`<h2 id="自定义数量" tabindex="-1">自定义数量 <a class="header-anchor" href="#自定义数量" aria-label="Permalink to &quot;自定义数量&quot;">​</a></h2><p>通过 <code>count</code> 属性可以设置评分图标数量。</p>`);
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
  _push(`<h2 id="自定义样式" tabindex="-1">自定义样式 <a class="header-anchor" href="#自定义样式" aria-label="Permalink to &quot;自定义样式&quot;">​</a></h2><p>通过 <code>size</code> 属性自定义图标大小，参数可以接受字符串<code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code>或数字。</p>`);
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
  _push(`<p>通过 <code>color</code> <code>voidColor</code> <code>disabledColor</code> 属性可以分别设置图标的填充颜色、空状态时的颜色、禁用时的颜色。</p>`);
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
  _push(`<p>通过 <code>gutter</code> 属性可以设置图标左右的间距。</p>`);
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
  _push(`<h2 id="提示文字" tabindex="-1">提示文字 <a class="header-anchor" href="#提示文字" aria-label="Permalink to &quot;提示文字&quot;">​</a></h2><p>通过 <code>showTooltip</code> 属性设置是否显示提示文字，同时可以通过 <code>tooltip</code> 属性自定义提示文字的文本（传入数组的item数要与count值相同，否则显示默认提示文字)。</p>`);
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
  _push(`<h2 id="只读-禁用" tabindex="-1">只读&amp;禁用 <a class="header-anchor" href="#只读-禁用" aria-label="Permalink to &quot;只读&amp;禁用&quot;">​</a></h2><p>通过 <code>readonly</code> <code>disabled</code> 属性分别设置只读状态和禁用状态。</p>`);
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
  _push(`<h2 id="rate-api" class="no-underline h2"><a href="#rate-api" class="!no-underline">Rate Api</a></h2><h3 id="rate-props" class="no-underline h3"><a href="#rate-props" class="!no-underline">Rate Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>绑定值</td><td><code>number</code></td><td class="text-center">否</td><td>3</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">count</td><td>icon数量</td><td><code>number</code></td><td class="text-center">否</td><td>5</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">half</td><td>允许半星</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tooltip</td><td>是否显示提示文字</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip</td><td>提示文字文本</td><td><code>array</code></td><td class="text-center">否</td><td>[]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>是否只读</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>图标大小</td><td><code>&#39;large&#39; | &#39;medium&#39; | &#39;small&#39; | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>自定义图标种类</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;star_filled&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>自定义图标active颜色</td><td><code>string</code></td><td class="text-center">否</td><td><code>rgb(\${cssVariable(&#39;rate-color--content&#39;)})</code></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">void-color</td><td>图标空时的颜色</td><td><code>string</code></td><td class="text-center">否</td><td>cssVariable(&#39;border-default&#39;)</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled-color</td><td>图标禁用时的颜色</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;#9B9DA9&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">gutter</td><td>icon间距</td><td><code>number</code></td><td class="text-center">否</td><td>5</td></tr></tbody></table><h3 id="rate-emits" class="no-underline h3"><a href="#rate-emits" class="!no-underline">Rate Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">当变化时触发</td><td rowspan="1">( value: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>number</code></td><td>变化后的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Rate.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Rate = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Rate as default
};
