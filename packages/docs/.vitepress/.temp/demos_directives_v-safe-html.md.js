import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/directives/v-safe-html.md","filePath":"zh/demos/directives/v-safe-html.md"}');
const _sfc_main = { name: "demos/directives/v-safe-html.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="基本示例" tabindex="-1">基本示例 <a class="header-anchor" href="#基本示例" aria-label="Permalink to &quot;基本示例&quot;">​</a></h2><p>直接使用 <code>v-safe-html</code> 替代 <code>v-html</code> 即可，默认的安全规则可以满足绝大多数需求。<br> 如下示例中，通过 <code>v-safe-html</code> 插入的 <code>img</code>，<code>src</code> 属性被保留了，但 <code>onerror</code> 由于可能被注入非法脚本，所以自动过滤掉了。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div v-html="html1"></div>\n  <div v-safe-html="html2"></div>\n</template>\n\n<script lang="ts" setup>\nconst html1 = `<span>some text</span>\n  <img src=x onerror="console.info(\'XSS attack with v-html!\')">`;\nconst html2 = `<span>some text</span>\n  <img src=x onerror="console.info(\'XSS attack with v-safe-html!\')">`;\n<\/script>\n',
    path: "demos/directives/v-safe-html/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="自定义配置" tabindex="-1">自定义配置 <a class="header-anchor" href="#自定义配置" aria-label="Permalink to &quot;自定义配置&quot;">​</a></h2><p>你也可以完全自定义安全规则，放行或阻止指定的标签或属性。详细介绍请参见 <a href="https://github.com/cure53/DOMPurify#can-i-configure-dompurify" target="_blank" rel="noreferrer">DOMPurify</a>。<br> 如下示例中，只允许 <code>span</code> 和 <code>p</code> 标签以及 <code>style</code> 属性，其它内容将全部被过滤掉。</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/directives/v-safe-html.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vSafeHtml = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vSafeHtml as default
};
