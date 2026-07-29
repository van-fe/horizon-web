import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_steps = resolveComponent("h-steps");
  const _component_h_step = resolveComponent("h-step");
  _push(ssrRenderComponent(_component_h_steps, mergeProps({
    current: 1,
    size: "small",
    status: "error"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_step, { title: "Succeeded" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, { title: "Processing" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, { title: "Future step" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_step, { title: "Succeeded" }),
          createVNode(_component_h_step, { title: "Processing" }),
          createVNode(_component_h_step, { title: "Future step" })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Steps/small-size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const smallSize = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  smallSize as default
};
