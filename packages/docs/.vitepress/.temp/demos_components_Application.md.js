import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Application.md","filePath":"zh/demos/components/Application.md"}');
const _sfc_main = { name: "demos/components/Application.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Application</h1><p class="description">被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到</p><h2 id="i18n-配置" tabindex="-1">i18n 配置 <a class="header-anchor" href="#i18n-配置" aria-label="Permalink to &quot;i18n 配置&quot;">​</a></h2><p>通过 Application 来配置多语言，让你的应用可以随时切换语言。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-application :locale="locale.current">
    <h-form label-position="left">
      <h-form-item label="current language">
        <h-select v-model="locale.current" size="small" style="width: 120px; display: inline-block">
          <h-option v-for="item of LocaleSupportLang" :key="item" :value="item" :label="item" />
        </h-select>
      </h-form-item>
    </h-form>
    <p style="margin-top: 20px;">
      {{ td().horizonWeb.datePicker.now }}
    </p>
    <p>
      {{ td().horizonWeb.datePicker.today }}
    </p>
  </h-application>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { LocaleSupportLang } from '@aurora/locale-vue';
import { localeInjectKey, defaultLocale } from '@aurora/horizon-web';

const locale = inject(localeInjectKey, defaultLocale);
<\/script>
`,
    path: "demos/components/Application/i18n.vue"
  }, null, _parent));
  _push(`<h2 id="size-配置" tabindex="-1">size 配置 <a class="header-anchor" href="#size-配置" aria-label="Permalink to &quot;size 配置&quot;">​</a></h2><p>通过 <code>size</code> props，可以控制所有组件的大小</p><p>但部分组件不是全部都支持 <code>small</code> | <code>large</code>，使用时需要注意组件文档说明</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col>
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-col>
  </h-row>
  <h-row>
    <h-col>
      <h-application :size="size">
        <h-form label-position="left" label-justify-align="right" label-vertical-align="middle">
          <h-form-item label="avatar">
            <h-avatar icon="friend" type="work" />
          </h-form-item>
          <h-form-item label="button">
            <h-button>Confirm</h-button>
          </h-form-item>
          <h-form-item label="checkbox">
            <h-checkbox v-model="value2" class="mr-5">Confirm</h-checkbox>
            <h-checkbox-button v-model="value2">Confirm</h-checkbox-button>
          </h-form-item>
        </h-form>
      </h-application>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const size = ref('medium');
    const value1 = ref([]);
    const value2 = ref('');

    return {
      size,
      value1,
      value2,
    };
  },
});
<\/script>
`,
    path: "demos/components/Application/size.vue"
  }, null, _parent));
  _push(`<h2>Application Api</h2><h3>Application Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">locale</td><td>当前语言</td><td><code>LocaleSupportLang | LocaleSupportLang</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>组件大小</td><td><code>&#39;large&#39; | &#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">否</td><td>&#39;medium&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">namespace</td><td>命名空间</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">get-popup-container</td><td>全局配置所有弹出窗口的挂载节点</td><td><code>(triggerNode?: HTMLElement) =&gt; HTMLElement</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-time-zone</td><td>是否在需要显示时区的地方显示时区<br>启用后，以下组件在不配置 <code>format</code> 时会默认显示时区：<br>1. 日期选择器 (仅 date-picker 有效）<br>2. 时间轴 （仅在 n-timeline 开启了 v2 时有效）</td><td><code>boolean | [&#39;date-picker&#39; | &#39;timeline&#39;]</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Application.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Application = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Application as default
};
