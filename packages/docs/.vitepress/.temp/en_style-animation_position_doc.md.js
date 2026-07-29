import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Position","description":"","frontmatter":{},"headers":[],"relativePath":"en/style-animation/position/doc.md","filePath":"en/style-animation/position/doc.md"}');
const _sfc_main = { name: "en/style-animation/position/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="position" tabindex="-1">Position <a class="header-anchor" href="#position" aria-label="Permalink to &quot;Position&quot;">​</a></h1><p>Style utility classes for setting element CSS <code>position</code> property.</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>static</td><td>position: static;</td></tr><tr><td>relative</td><td>position: relative;</td></tr><tr><td>absolute</td><td>position: absolute;</td></tr><tr><td>fixed</td><td>position: fixed;</td></tr><tr><td>sticky</td><td>position: sticky;</td></tr></tbody></table><p>We also provide the ability to quickly center elements, which needs to be used together with <code>absolute</code> or <code>fixed</code> utility classes.</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>position-x-center</td><td>left: 50%;<br>transform: translateX(-50%);</td></tr><tr><td>position-y-center</td><td>top: 50%;<br>transform: translateY(-50%);</td></tr><tr><td>position-center</td><td>top: 50%;<br>left: 50%;<br>transform: translate(-50%, -50%);</td></tr></tbody></table><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="relative circle bg-primary" style="width: 140px; height: 140px;">\n    <div class="absolute position-center circle bg-white" style="width: 70px; height: 70px;"></div>\n  </div>\n</template>',
    path: "en/style-animation/position/demos/demo1.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/style-animation/position/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
