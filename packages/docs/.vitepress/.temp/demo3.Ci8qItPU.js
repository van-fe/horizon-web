import { resolveDirective, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderStyle, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _directive_watermark = resolveDirective("watermark");
  _push(`<div${ssrRenderAttrs(mergeProps(_attrs, ssrGetDirectiveProps(_ctx, _directive_watermark, {
    image: "/demo-assets/watermark.svg",
    content: "watermark watermark"
  })))}><div style="${ssrRenderStyle({ "height": "300px" })}"></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-watermark/demo3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo3 as default
};
