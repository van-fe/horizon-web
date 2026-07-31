import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"API and Examples","description":"API references and live examples for Horizon Web components, directives, and methods.","frontmatter":{"title":"API and Examples","description":"API references and live examples for Horizon Web components, directives, and methods."},"headers":[],"relativePath":"en/demos/index.md","filePath":"en/demos/index.md"}');
const _sfc_main = { name: "en/demos/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="api-and-examples" tabindex="-1">API and Examples <a class="header-anchor" href="#api-and-examples" aria-label="Permalink to &quot;API and Examples&quot;">​</a></h1><p>Browse the API references and live examples for Horizon Web components, directives, and methods from the navigation.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
