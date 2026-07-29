import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Overflow","description":"","frontmatter":{},"headers":[],"relativePath":"style-animation/overflow/doc.md","filePath":"zh/style-animation/overflow/doc.md"}');
const _sfc_main = { name: "style-animation/overflow/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="overflow" tabindex="-1">Overflow <a class="header-anchor" href="#overflow" aria-label="Permalink to &quot;Overflow&quot;">​</a></h1><p>样式工具类，用来设置元素的 CSS <code>overflow</code> 属性。</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>overflow-hidden</td><td>overflow: hidden;</td></tr><tr><td>overflow-x-hidden</td><td>overflow-x: hidden;</td></tr><tr><td>overflow-y-hidden</td><td>overflow-y: hidden;</td></tr><tr><td>overflow-auto</td><td>overflow: auto;</td></tr><tr><td>overflow-x-auto</td><td>overflow-x: auto;</td></tr><tr><td>overflow-y-auto</td><td>overflow-y: auto;</td></tr><tr><td>overflow-visible</td><td>overflow: visible;</td></tr><tr><td>overflow-x-visible</td><td>overflow-x: visible;</td></tr><tr><td>overflow-y-visible</td><td>overflow-y: visible;</td></tr><tr><td>overflow-scroll</td><td>overflow: scroll;</td></tr><tr><td>overflow-x-scroll</td><td>overflow-x: scroll;</td></tr><tr><td>overflow-y-scroll</td><td>overflow-y: scroll;</td></tr></tbody></table><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="flex">\n    <div class="overflow-visible mr-3" style="width: 150px; height: 120px;">\n      This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.\n    </div>\n    <div class="overflow-auto" style="width: 150px; height: 120px;">\n      This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.\n    </div>\n  </div>\n  \n</template>',
    path: "zh/style-animation/overflow/demos/demo1.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/overflow/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
