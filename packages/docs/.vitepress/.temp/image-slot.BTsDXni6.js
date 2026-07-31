import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/demo-assets/empty-state.svg";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_empty = resolveComponent("h-empty");
  _push(ssrRenderComponent(_component_h_empty, mergeProps({ size: 120 }, _attrs), {
    image: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="my-img"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="img"${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", { class: "my-img" }, [
            createVNode("img", {
              src: _imports_0,
              alt: "img"
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Empty/image-slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const imageSlot = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  imageSlot as default
};
