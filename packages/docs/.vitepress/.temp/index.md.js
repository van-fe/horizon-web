import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Horizon Web","text":"现代 Vue3 组件库","tagline":"致力于为你的工作提效","image":{"src":"/logo.svg","alt":"Horizon Web logo"},"actions":[{"theme":"brand","text":"为什么选用 Horizon Web ?","link":"/guide/why-choose-horizon-web"},{"theme":"alt","text":"快速开始","link":"/guide/start"},{"theme":"alt","text":"API 及示例","link":"/demos"}]},"features":[{"title":"Feature A","details":"完整、易用的 Vue 3 组件，覆盖常见业务场景。"},{"title":"Feature B","details":"主题、暗黑模式和多语言能力开箱即用。"},{"title":"Feature C","details":"类型安全、可按需引入，并提供完善的 API 文档。"}]},"headers":[],"relativePath":"index.md","filePath":"zh/index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
