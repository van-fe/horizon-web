import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Box Shadow","description":"","frontmatter":{},"headers":[],"relativePath":"en/style-animation/shadow/doc.md","filePath":"en/style-animation/shadow/doc.md"}');
const _sfc_main = { name: "en/style-animation/shadow/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="box-shadow" tabindex="-1">Box Shadow <a class="header-anchor" href="#box-shadow" aria-label="Permalink to &quot;Box Shadow&quot;">​</a></h1><p>Style utility classes for setting element shadows.</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>shadow-sm</td><td>box-shadow: 0px 1px 2px -2px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.06), 0px 5px 12px 4px rgba(0, 0, 0, 0.04);</td></tr><tr><td>shadow</td><td>box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.1), 0px 6px 16px rgba(0, 0, 0, 0.06), 0px 9px 28px 8px rgba(0, 0, 0, 0.03);</td></tr><tr><td>shadow-lg</td><td>box-shadow: 0px 6px 16px -8px rgba(0, 0, 0, 0.08), 0px 9px 28px rgba(0, 0, 0, 0.05), 0px 12px 48px 16px rgba(0, 0, 0, 0.03);</td></tr></tbody></table><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <section class="flex">\n    <div class="shadow-sm rounded-xl text-center mr-6">shadow-sm</div>\n    <div class="shadow rounded-xl text-center mr-6">shadow</div>\n    <div class="shadow-lg rounded-xl text-center mr-6">shadow-lg</div>\n  </section>\n</template>\n<style scoped>\ndiv {\n  width: 120px;\n  height: 120px;\n  line-height: 120px;\n}\n</style>',
    path: "en/style-animation/shadow/demos/demo1.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/style-animation/shadow/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
