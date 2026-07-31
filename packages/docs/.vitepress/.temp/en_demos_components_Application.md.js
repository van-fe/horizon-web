import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Application.md","filePath":"en/demos/components/Application.md"}');
const _sfc_main = { name: "en/demos/components/Application.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Application</h1><p class="description">Configure multiple languages through Application, allowing your application to switch languages at any time.</p><h2 id="i18n-configuration" tabindex="-1">i18n Configuration <a class="header-anchor" href="#i18n-configuration" aria-label="Permalink to &quot;i18n Configuration&quot;">​</a></h2><p>Configure multiple languages through Application, allowing your application to switch languages at any time.</p>`);
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
  _push(`<h2 id="size-configuration" tabindex="-1">size Configuration <a class="header-anchor" href="#size-configuration" aria-label="Permalink to &quot;size Configuration&quot;">​</a></h2><p>Through the <code>size</code> props, you can control the size of all components</p><p>However, not all components support <code>small</code> | <code>large</code>, please pay attention to the component documentation when using</p>`);
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
  _push(`<h2 id="application-api" class="no-underline h2"><a href="#application-api" class="!no-underline">Application Api</a></h2><h3 id="application-props" class="no-underline h3"><a href="#application-props" class="!no-underline">Application Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">locale</td><td>Configuration for locale.</td><td><code>LocaleSupportLang | LocaleSupportLang</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;large&#39; | &#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td>&#39;medium&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">namespace</td><td>Configuration for namespace.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">get-popup-container</td><td>Configuration for get popup container.</td><td><code>(triggerNode?: HTMLElement) =&gt; HTMLElement</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-time-zone</td><td>Configuration for show time zone.</td><td><code>boolean | [&#39;date-picker&#39; | &#39;timeline&#39;]</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Application.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Application = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Application as default
};
