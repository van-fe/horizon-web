import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const val = ref("");
    return {
      val
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_space = resolveComponent("h-space");
  const _component_h_input = resolveComponent("h-input");
  _push(ssrRenderComponent(_component_h_space, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_input, {
          modelValue: _ctx.val,
          "onUpdate:modelValue": ($event) => _ctx.val = $event,
          status: "error"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_input, {
          modelValue: _ctx.val,
          "onUpdate:modelValue": ($event) => _ctx.val = $event,
          "input-style": "emphasize",
          status: "error"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_input, {
          modelValue: _ctx.val,
          "onUpdate:modelValue": ($event) => _ctx.val = $event,
          "input-style": "no-border",
          status: "error"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_input, {
            modelValue: _ctx.val,
            "onUpdate:modelValue": ($event) => _ctx.val = $event,
            status: "error"
          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
          createVNode(_component_h_input, {
            modelValue: _ctx.val,
            "onUpdate:modelValue": ($event) => _ctx.val = $event,
            "input-style": "emphasize",
            status: "error"
          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
          createVNode(_component_h_input, {
            modelValue: _ctx.val,
            "onUpdate:modelValue": ($event) => _ctx.val = $event,
            "input-style": "no-border",
            status: "error"
          }, null, 8, ["modelValue", "onUpdate:modelValue"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/status.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const status = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  status as default
};
