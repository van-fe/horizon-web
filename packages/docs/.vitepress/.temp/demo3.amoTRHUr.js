import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_watermark = resolveComponent("h-watermark");
  _push(ssrRenderComponent(_component_h_watermark, mergeProps({
    image: "https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg",
    content: "watermark watermark"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div style="${ssrRenderStyle({ "height": "300px" })}"${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", { style: { "height": "300px" } })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Watermark/demo3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo3 as default
};
