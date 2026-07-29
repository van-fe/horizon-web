import { mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "gray-9 bg-lake-blue-1 text-lg p-3" }, _attrs))}><span class="rose-red-6 font-bold">Horizon Web UI</span> is a new <span class="success">UI library</span> with components, directives, CSS utilities and so on, which <span class="white bg-warning px-1">support both</span> Vue3 and Vue2. </div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/colors/demos/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo1 as default
};
