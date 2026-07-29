import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Switch.md","filePath":"zh/demos/components/Switch.md"}');
const _sfc_main = { name: "demos/components/Switch.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Switch</h1><p class="description">开关选择器组件</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2>`);
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
  _push(`<h2 id="标签位置" tabindex="-1">标签位置 <a class="header-anchor" href="#标签位置" aria-label="Permalink to &quot;标签位置&quot;">​</a></h2><p>可以通过配置 <code>label-position</code> 控制标签的位置</p>`);
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
  _push(`<h2 id="尺寸" tabindex="-1">尺寸 <a class="header-anchor" href="#尺寸" aria-label="Permalink to &quot;尺寸&quot;">​</a></h2><p>提供了 <code>medium/small</code> 两种尺寸</p>`);
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
  _push(`<h2 id="禁用和只读" tabindex="-1">禁用和只读 <a class="header-anchor" href="#禁用和只读" aria-label="Permalink to &quot;禁用和只读&quot;">​</a></h2><p>使用 <code>disabled</code> 和 <code>readonly</code> 控制是否禁用和只读</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-switch label="disabled" :model-value="true" disabled />\n    <h-switch label="disabled" :model-value="false" disabled class="ml-4" />\n  </div>\n\n  <div>\n    <h-switch label="readonly" readonly />\n    <h-switch class="ml-4" label="readonly" readonly :model-value="true" />\n  </div>\n</template>\n<script setup lang="ts">\n<\/script>\n',
    path: "demos/components/Switch/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="拦截修改" tabindex="-1">拦截修改 <a class="header-anchor" href="#拦截修改" aria-label="Permalink to &quot;拦截修改&quot;">​</a></h2><p>配置 <code>before-change</code>，可以拦截是否允许改变值</p>`);
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
  _push(`<h2>Switch Api</h2><h3>Switch Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>绑定值</td><td><code>boolean</code></td><td class="text-center">是</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td>是否显示状态文本</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status-on-text</td><td>switch 打开时的自定义状态文本</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status-off-text</td><td>switch 关闭时的自定义状态文本</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>标签文本</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-position</td><td>标签位置</td><td><code>&#39;top&#39; | &#39;left&#39; | &#39;right&#39;</code></td><td class="text-center">否</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>switch 大小</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>只读</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-change</td><td><code>switch</code> 状态改变前的钩子， 返回 <code>false</code> 或者返回 <code>Promise</code> 且被 <code>reject</code> 则停止切换</td><td><code>boolean | ((newValue: boolean) =&gt; Awaitable&lt;boolean | undefined&gt;)</code></td><td class="text-center">否</td><td>undefined</td></tr></tbody></table><h3>Switch Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">当开关状态变化时触发</td><td rowspan="1">( value: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>boolean</code></td><td>变化后的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Switch.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Switch as default
};
