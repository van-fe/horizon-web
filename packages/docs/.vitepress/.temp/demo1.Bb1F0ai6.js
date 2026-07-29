import { mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}><div class="overflow-visible mr-3" style="${ssrRenderStyle({ "width": "150px", "height": "120px" })}"> This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text. </div><div class="overflow-auto" style="${ssrRenderStyle({ "width": "150px", "height": "120px" })}"> This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text.This is a long, long text. </div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/style-animation/overflow/demos/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo1 as default
};
