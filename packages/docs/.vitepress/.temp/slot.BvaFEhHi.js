import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_image, {
    src: "/demo-assets/scene-aurora.svg",
    width: "300px",
    height: "300px",
    class: "mr-2"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="absolute p-3" style="${ssrRenderStyle({ "width": "100%", "bottom": "0", "background": "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)" })}"${_scopeId}><div class="white text-body-1"${_scopeId}>Demo ES7</div><span class="white"${_scopeId}>FAR BEYOND</span></div>`);
      } else {
        return [
          createVNode("div", {
            class: "absolute p-3",
            style: { "width": "100%", "bottom": "0", "background": "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)" }
          }, [
            createVNode("div", { class: "white text-body-1" }, "Demo ES7"),
            createVNode("span", { class: "white" }, "FAR BEYOND")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_image, {
    src: "/demo-assets/scene-aurora.svg",
    width: "300px",
    height: "300px"
  }, {
    hover: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="absolute p-3" style="${ssrRenderStyle({ "width": "100%", "bottom": "0", "background": "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)" })}"${_scopeId}><div class="white text-body-1"${_scopeId}>Demo ES7</div><span class="white"${_scopeId}>FAR BEYOND</span></div>`);
      } else {
        return [
          createVNode("div", {
            class: "absolute p-3",
            style: { "width": "100%", "bottom": "0", "background": "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)" }
          }, [
            createVNode("div", { class: "white text-body-1" }, "Demo ES7"),
            createVNode("span", { class: "white" }, "FAR BEYOND")
          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const slot = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  slot as default
};
