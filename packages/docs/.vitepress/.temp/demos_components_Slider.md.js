import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Slider.md","filePath":"zh/demos/components/Slider.md"}');
const _sfc_main = { name: "demos/components/Slider.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Slider</h1><p class="description">通过拖动滑块在一个固定区间内进行选择</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2>`);
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
  _push(`<h2 id="设置大小" tabindex="-1">设置大小 <a class="header-anchor" href="#设置大小" aria-label="Permalink to &quot;设置大小&quot;">​</a></h2><p>可以设置 <code>small</code> <code>medium</code> <code>large</code></p>`);
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
  _push(`<h2 id="禁用状态" tabindex="-1">禁用状态 <a class="header-anchor" href="#禁用状态" aria-label="Permalink to &quot;禁用状态&quot;">​</a></h2><p>通过设置 <code>disabled</code> 来禁用</p>`);
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
  _push(`<h2 id="不同类型" tabindex="-1">不同类型 <a class="header-anchor" href="#不同类型" aria-label="Permalink to &quot;不同类型&quot;">​</a></h2><p>可以设置 <code>type</code> 字段来控制不同类型</p>`);
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
  _push(`<h2 id="自定义颜色" tabindex="-1">自定义颜色 <a class="header-anchor" href="#自定义颜色" aria-label="Permalink to &quot;自定义颜色&quot;">​</a></h2><p>如果不同类型的颜色无法满足需求，可以通过设置 <code>color</code> 来控制进度条颜色</p>`);
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
  _push(`<h2 id="指定选择范围" tabindex="-1">指定选择范围 <a class="header-anchor" href="#指定选择范围" aria-label="Permalink to &quot;指定选择范围&quot;">​</a></h2><p>可以使用 <code>range</code> 来配置范围选择</p>`);
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
  _push(`<h2 id="指定步长" tabindex="-1">指定步长 <a class="header-anchor" href="#指定步长" aria-label="Permalink to &quot;指定步长&quot;">​</a></h2><p>可以设置 <code>step</code> 指定步长</p>`);
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
  _push(`<h2 id="自定义提示" tabindex="-1">自定义提示 <a class="header-anchor" href="#自定义提示" aria-label="Permalink to &quot;自定义提示&quot;">​</a></h2><p>可以配置 <code>tooltip-formatter</code> 来控制显示的文字</p><p>也可以配置 <code>tooltip-enable = false</code> 来控制不显示 <code>tooltip</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-slider v-model="valueRef" :tooltip-formatter="tooltipFormatter" />\n  <h-slider v-model="valueRef" :tooltip-formatter="tooltipFormatter" :tooltip-enable="false" />\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\n\nexport default defineComponent({\n  setup() {\n    const valueRef = ref(50);\n\n    return {\n      valueRef,\n      tooltipFormatter(val: number) {\n        return `${val} 个`;\n      },\n    };\n  },\n});\n<\/script>\n',
    path: "demos/components/Slider/custom-tooltip.vue"
  }, null, _parent));
  _push(`<h2 id="配合输入框" tabindex="-1">配合输入框 <a class="header-anchor" href="#配合输入框" aria-label="Permalink to &quot;配合输入框&quot;">​</a></h2><p>可以设置 <code>input-enable</code> 开启输入框</p><p>但需要注意的是，如果开启了 <code>range</code>，则不会启用输入框</p>`);
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
  _push(`<h2 id="slider-api" class="no-underline h2"><a href="#slider-api" class="!no-underline">Slider Api</a></h2><h3 id="slider-props" class="no-underline h3"><a href="#slider-props" class="!no-underline">Slider Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>绑定值</td><td><code>number | [number, number]</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max</td><td>最大值</td><td><code>number</code></td><td class="text-center">否</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min</td><td>最小值</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">step</td><td>步长</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-separator</td><td>是否显示分割符，在设定了大于 <code>1</code> 的 <code>step</code> 时有效</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>进度条类型</td><td><code>&#39;primary&#39; | &#39;info&#39; | &#39;success&#39; | &#39;warning&#39; | &#39;danger&#39;</code></td><td class="text-center">否</td><td>&#39;primary&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>进度条颜色</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">range</td><td>是否启用范围选择模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">track-clickable</td><td>轨道是否可以点击</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-enable</td><td>是否显示 <code>input</code> 输入框</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-props</td><td>传给 input-number 的 <code>props</code></td><td><code>Partial&lt;InputNumberProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">keyboard-enable</td><td>是否允许键盘控制游标</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-enable</td><td>是否启用 <code>tooltip</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-placement</td><td><code>tooltip</code> 的位置</td><td><code>&#39;top-start&#39; | &#39;top-end&#39; | &#39;bottom-start&#39; | &#39;bottom-end&#39; | &#39;top&#39; | &#39;bottom&#39; | &#39;right&#39; | &#39;left&#39;</code></td><td class="text-center">否</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-formatter</td><td>自定义提示<br>传入的是当前滑块的数字，返回一个处理后的字符串即可</td><td><code>(value: number) =&gt; string</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="slider-emits" class="no-underline h3"><a href="#slider-emits" class="!no-underline">Slider Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">聚焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>聚焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Slider.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Slider as default
};
