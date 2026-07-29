import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const valueRef = ref(50);
    return { valueRef };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_slider = resolveComponent("h-slider");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_slider, {
                modelValue: _ctx.valueRef,
                "onUpdate:modelValue": ($event) => _ctx.valueRef = $event,
                "input-enable": true,
                step: 5
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_slider, {
                  modelValue: _ctx.valueRef,
                  "onUpdate:modelValue": ($event) => _ctx.valueRef = $event,
                  "input-enable": true,
                  step: 5
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_slider, {
                modelValue: _ctx.valueRef,
                "onUpdate:modelValue": ($event) => _ctx.valueRef = $event,
                "input-enable": true,
                step: 5
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_slider, {
                modelValue: _ctx.valueRef,
                "onUpdate:modelValue": ($event) => _ctx.valueRef = $event,
                "input-enable": true,
                disabled: ""
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_slider, {
                  modelValue: _ctx.valueRef,
                  "onUpdate:modelValue": ($event) => _ctx.valueRef = $event,
                  "input-enable": true,
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_slider, {
                modelValue: _ctx.valueRef,
                "onUpdate:modelValue": ($event) => _ctx.valueRef = $event,
                "input-enable": true,
                disabled: ""
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Slider/with-input.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const withInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  withInput as default
};
