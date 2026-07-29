import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Result.md","filePath":"en/demos/components/Result.md"}');
const _sfc_main = { name: "en/demos/components/Result.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Result</h1><p class="description">Default is <code>success</code> state</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Default is <code>success</code> state</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { $alert } from '@aurora/horizon-web';

function onPrimaryClick() {
  $alert('点击了主按钮', '提示');
}
function onSecondaryClick() {
  $alert('点击了次按钮', '提示');
}
<\/script>

<template>
  <h-result
    title="这是一条成功信息"
    subtitle="这是一段相关的描述文案"
    @primaryClick="onPrimaryClick"
    @secondaryClick="onSecondaryClick"
  />
</template>
`,
    path: "demos/components/Result/basic.vue"
  }, null, _parent));
  _push(`<h2 id="different-states" tabindex="-1">Different States <a class="header-anchor" href="#different-states" aria-label="Permalink to &quot;Different States&quot;">​</a></h2><p>Supports <code>success</code> <code>info</code> <code>warning</code> <code>error</code> states</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row :gutter="10">\n    <h-col :span="12">\n      <h-result title="这是一条成功消息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案,这是一段相关的描述文案" type="success" />\n    </h-col>\n    <h-col :span="12">\n      <h-result title="这是一条提示信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="info" />\n    </h-col>\n    <h-col :span="12">\n      <h-result title="这是一条警示信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="warning" />\n    </h-col>\n    <h-col :span="12">\n      <h-result title="这是一条错误信息" subtitle="这是一段相关的描述文案,这是一段相关的描述文案" type="error" />\n    </h-col>\n  </h-row>\n</template>\n',
    path: "demos/components/Result/types.vue"
  }, null, _parent));
  _push(`<h2 id="service-status" tabindex="-1">Service Status <a class="header-anchor" href="#service-status" aria-label="Permalink to &quot;Service Status&quot;">​</a></h2><p>Supports 403 404 500 service status</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row :gutter="10">\n    <h-col :span="24">\n      <h-result title="403" subtitle="对不起，您无权限访问此页面。" type="403" />\n    </h-col>\n    <h-divider />\n    <h-col :span="24">\n      <h-result title="404" subtitle="对不起，您访问的页面不存在。" type="404" />\n    </h-col>\n    <h-divider />\n    <h-col :span="24">\n      <h-result title="500" subtitle="对不起，服务器出了点问题" type="500" />\n    </h-col>\n  </h-row>\n</template>\n<script setup lang="ts">\n<\/script>\n',
    path: "demos/components/Result/status.vue"
  }, null, _parent));
  _push(`<h2 id="custom-icon" tabindex="-1">Custom icon <a class="header-anchor" href="#custom-icon" aria-label="Permalink to &quot;Custom icon&quot;">​</a></h2><p>You can use the <code>slots.icon</code> slot to customize the <code>icon</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { IconLoading } from '@aurora/icon';
<\/script>

<template>
  <h-result title="这是一条自定义Icon的消息" subtitle="这是一段相关的描述文案" :secondary-button="false">
    <template #icon>
      <IconLoading size="56" spin="cw" />
    </template>
  </h-result>
</template>
`,
    path: "demos/components/Result/custom-icon.vue"
  }, null, _parent));
  _push(`<h2 id="customization-of-other-content" tabindex="-1">Customization of Other Content <a class="header-anchor" href="#customization-of-other-content" aria-label="Permalink to &quot;Customization of Other Content&quot;">​</a></h2><p>Not only <code>icon</code> can be customized, <code>title</code> <code>subtitle</code> <code>extra</code> can all be customized</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { IconLogo } from '@aurora/icon';
import { $alert } from '@aurora/horizon-web';

function submit() {
  $alert('点击了确定', '提示');
}
<\/script>

<template>
  <h-result>
    <template #icon>
      <IconLogo size="56" :color="['var(--h-text-default)']" />
    </template>
    <template #title>
      尊贵的示例车主
    </template>
    <template #subtitle>
      本次换电已结束，感谢您的使用
    </template>
    <template #extra>
      <h-button @click="submit">确定</h-button>
    </template>
  </h-result>
</template>
`,
    path: "demos/components/Result/custom-slot.vue"
  }, null, _parent));
  _push(`<h2>Result Api</h2><h3>Result Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>主标题<br>显示时最多一行，超出显示 <code>...</code></td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">subtitle</td><td>副标题<br>显示时最多两行，超出显示 <code>...</code></td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Type</td><td><code>&#39;info&#39; | &#39;success&#39; | &#39;warning&#39; | &#39;error&#39; | 403 | 404 | 500 | &#39;403&#39; | &#39;404&#39; | &#39;500&#39;</code></td><td class="text-center">No</td><td>&#39;success&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">primary-button</td><td>是否显示主按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">primary-button-text</td><td>主按钮文字</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">primary-button-props</td><td>主要按钮 <code>props</code></td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">secondary-button</td><td>是否显示次要按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">secondary-button-text</td><td>次要按钮文字</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">secondary-button-props</td><td>次要按钮 <code>props</code></td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>Result Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">primary-click</td><td rowspan="1">主要按钮点击时触发</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">secondary-click</td><td rowspan="1">次要按钮点击时触发</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Result.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Result = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Result as default
};
