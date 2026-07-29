import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Horizon Web","text":"Modern Vue3 Component Library","tagline":"Committed to improving your work efficiency","actions":[{"theme":"brand","text":"Why Choose Horizon Web?","link":"/guide/why-choose-horizon-web"},{"theme":"alt","text":"Quick Start","link":"/guide/start"},{"theme":"alt","text":"API & Examples","link":"/demos"}]},"features":[{"title":"Feature A","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},{"title":"Feature B","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},{"title":"Feature C","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}]},"headers":[],"relativePath":"en/index.md","filePath":"en/index.md"}');
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
