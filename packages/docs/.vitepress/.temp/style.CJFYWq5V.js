import { resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_button = resolveComponent("h-button");
  const _directive_tooltip = resolveDirective("tooltip");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "block" }, _attrs))} data-v-a20ee9e2>`);
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Small", void 0, { small: true }), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Small`);
      } else {
        return [
          createTextVNode("Small")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Light", void 0, { light: true }), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Light`);
      } else {
        return [
          createTextVNode("Light")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Small + Light", void 0, {
    small: true,
    light: true
  }), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Small + Light`);
      } else {
        return [
          createTextVNode("Small + Light")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-tooltip/style.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const style = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a20ee9e2"]]);
export {
  style as default
};
