import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/directives/v-safe-html.md","filePath":"en/demos/directives/v-safe-html.md"}');
const _sfc_main = { name: "en/demos/directives/v-safe-html.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="basic-example" tabindex="-1">Basic Example <a class="header-anchor" href="#basic-example" aria-label="Permalink to &quot;Basic Example&quot;">​</a></h2><p>Just use <code>v-safe-html</code> instead of <code>v-html</code>, the default security rules can meet most needs.<br> In the following example, the <code>img</code> inserted through <code>v-safe-html</code> has its <code>src</code> attribute retained, but <code>onerror</code> is automatically filtered out because it may be injected with illegal scripts.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div v-html="html1"></div>\n  <div v-safe-html="html2"></div>\n</template>\n\n<script lang="ts" setup>\nconst html1 = `<span>some text</span>\n  <img src=x onerror="console.info(\'XSS attack with v-html!\')">`;\nconst html2 = `<span>some text</span>\n  <img src=x onerror="console.info(\'XSS attack with v-safe-html!\')">`;\n<\/script>\n',
    path: "demos/directives/v-safe-html/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="custom-configuration" tabindex="-1">Custom Configuration <a class="header-anchor" href="#custom-configuration" aria-label="Permalink to &quot;Custom Configuration&quot;">​</a></h2><p>You can also completely customize security rules to allow or block specified tags or attributes. For detailed introduction, please refer to <a href="https://github.com/cure53/DOMPurify#can-i-configure-dompurify" target="_blank" rel="noreferrer">DOMPurify</a>.<br> In the following example, only <code>span</code> and <code>p</code> tags and <code>style</code> attributes are allowed, and all other content will be filtered out.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div
    v-safe-html="{
      html,
      options: {
        ALLOWED_TAGS: ['span', 'p'],
        ALLOWED_ATTR: ['style'],
      },
    }"
  ></div>
</template>

<script lang="ts" setup>
const html = \`<div id="my-div"><span class="my-span" style="color: red;">some text</span></div>\`;
<\/script>
`,
    path: "demos/directives/v-safe-html/demo2.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/directives/v-safe-html.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vSafeHtml = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vSafeHtml as default
};
