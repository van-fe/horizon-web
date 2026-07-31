import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"API 及示例","description":"Horizon Web 组件、指令和方法的 API 与在线示例。","frontmatter":{"title":"API 及示例","description":"Horizon Web 组件、指令和方法的 API 与在线示例。"},"headers":[],"relativePath":"demos/index.md","filePath":"zh/demos/index.md"}');
const _sfc_main = { name: "demos/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="api-及示例" tabindex="-1">API 及示例 <a class="header-anchor" href="#api-及示例" aria-label="Permalink to &quot;API 及示例&quot;">​</a></h1><p>这里汇总 Horizon Web 的组件、指令和方法文档。请从左侧导航选择要查看的条目。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
