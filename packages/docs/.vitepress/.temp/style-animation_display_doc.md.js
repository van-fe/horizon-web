import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Display","description":"","frontmatter":{},"headers":[],"relativePath":"style-animation/display/doc.md","filePath":"zh/style-animation/display/doc.md"}');
const _sfc_main = { name: "style-animation/display/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="display" tabindex="-1">Display <a class="header-anchor" href="#display" aria-label="Permalink to &quot;Display&quot;">​</a></h1><p>样式工具类，用来设置元素的 CSS <code>display</code> 属性。</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>hidden</td><td>display: none;</td></tr><tr><td>block</td><td>display: block;</td></tr><tr><td>inline-block</td><td>display: inline-block;</td></tr><tr><td>inline</td><td>display: inline;</td></tr><tr><td>flex</td><td>display: flex;</td></tr><tr><td>inline-flex</td><td>display: inline-flex;</td></tr><tr><td>grid</td><td>display: grid;</td></tr><tr><td>inline-grid</td><td>display: inline-grid;</td></tr></tbody></table><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="hidden">你看不见我</div>\n  <div class="flex">\n    <div class="mr-2">flex-item</div>\n    <div class="mr-2">flex-item</div>\n    <div class="mr-2">flex-item</div>\n  </div>\n  <div class="inline-block mr-3">inline-block</div>\n  <div class="inline-block">inline-block</div>\n</template>',
    path: "zh/style-animation/display/demos/demo1.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/display/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
