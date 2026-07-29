import { defineComponent, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { c as colors } from "./app.js";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    return {
      colors
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_badge = resolveComponent("h-badge");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_badge, {
    color: "#7F1FBF",
    class: "mr-5"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div style="${ssrRenderStyle({ "background": "gray", "width": "50px", "height": "50px" })}"${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", { style: { "background": "gray", "width": "50px", "height": "50px" } })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_badge, {
    bottom: "",
    color: _ctx.colors.info,
    class: "mr-5"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div style="${ssrRenderStyle({ "background": "gray", "width": "50px", "height": "50px" })}"${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", { style: { "background": "gray", "width": "50px", "height": "50px" } })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_badge, {
    type: "num",
    content: 3,
    color: _ctx.colors.orange[4]
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div style="${ssrRenderStyle({ "background": "gray", "width": "50px", "height": "50px" })}"${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", { style: { "background": "gray", "width": "50px", "height": "50px" } })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Badge/color.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const color = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  color as default
};
