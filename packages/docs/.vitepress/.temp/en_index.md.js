import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Horizon Web","text":"Modern Vue3 Component Library","tagline":"Committed to improving your work efficiency","image":{"src":"/logo.svg","alt":"Horizon Web logo"},"actions":[{"theme":"brand","text":"Why Choose Horizon Web?","link":"/guide/why-choose-horizon-web"},{"theme":"alt","text":"Quick Start","link":"/guide/start"},{"theme":"alt","text":"API & Examples","link":"/demos"}]},"features":[{"title":"Feature A","details":"A complete and easy-to-use Vue 3 component set for common business scenarios."},{"title":"Feature B","details":"Theme customization, dark mode, and localization work out of the box."},{"title":"Feature C","details":"Type-safe, tree-shakable, and backed by comprehensive API documentation."}]},"headers":[],"relativePath":"en/index.md","filePath":"en/index.md"}');
const _sfc_main = { name: "en/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
