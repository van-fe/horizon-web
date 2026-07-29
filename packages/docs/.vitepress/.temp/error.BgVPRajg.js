import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_image, {
    src: "https://not-found",
    class: "mr-2",
    width: 70,
    height: 70
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_image, {
    src: "https://not-found",
    class: "mr-2",
    width: 100,
    height: 100
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_image, {
    src: "https://not-found",
    class: "mr-2",
    width: 150,
    height: 150
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_image, {
    src: "https://not-found",
    width: 150,
    height: 150
  }, {
    error: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex justify-center align-center" style="${ssrRenderStyle({ "height": "100%" })}"${_scopeId}>Error</div>`);
      } else {
        return [
          createVNode("div", {
            class: "flex justify-center align-center",
            style: { "height": "100%" }
          }, "Error")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  error as default
};
