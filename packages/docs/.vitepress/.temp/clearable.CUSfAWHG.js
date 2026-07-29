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
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_input = resolveComponent("h-input");
  _push(ssrRenderComponent(_component_h_form, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Label" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.val,
                "onUpdate:modelValue": ($event) => _ctx.val = $event,
                clearable: ""
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.val,
                  "onUpdate:modelValue": ($event) => _ctx.val = $event,
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_form_item, { label: "Label" }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.val,
                "onUpdate:modelValue": ($event) => _ctx.val = $event,
                clearable: ""
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/clearable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const clearable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  clearable as default
};
