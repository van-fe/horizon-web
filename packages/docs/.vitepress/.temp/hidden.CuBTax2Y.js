import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const isHidden = ref(false);
    return {
      isHidden
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_switch = resolveComponent("h-switch");
  const _component_h_badge = resolveComponent("h-badge");
  _push(`<!--[--><div class="mb-4">`);
  _push(ssrRenderComponent(_component_h_switch, {
    modelValue: _ctx.isHidden,
    "onUpdate:modelValue": ($event) => _ctx.isHidden = $event,
    label: "hidden",
    "label-position": "right"
  }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_h_badge, {
    hidden: _ctx.isHidden,
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
    hidden: _ctx.isHidden,
    type: "num",
    content: 0,
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
    hidden: _ctx.isHidden,
    type: "num",
    content: 99,
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
    hidden: _ctx.isHidden,
    type: "icon",
    content: "owner_os",
    "icon-size": 12,
    "icon-color": "#24A7B2",
    align: "inner",
    bottom: "",
    class: "mr-5"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div style="${ssrRenderStyle({ "background": "gray", "border-radius": "50%", "width": "50px", "height": "50px" })}"${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", { style: { "background": "gray", "border-radius": "50%", "width": "50px", "height": "50px" } })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Badge/hidden.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const hidden = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  hidden as default
};
