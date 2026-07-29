import { defineComponent, ref, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const valueRef1 = ref(40);
    const valueRef2 = ref(40);
    return { valueRef1, valueRef2 };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_slider = resolveComponent("h-slider");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_slider, {
    modelValue: _ctx.valueRef1,
    "onUpdate:modelValue": ($event) => _ctx.valueRef1 = $event,
    step: 10
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_slider, {
    modelValue: _ctx.valueRef1,
    "onUpdate:modelValue": ($event) => _ctx.valueRef1 = $event,
    step: 10,
    "show-separator": ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_slider, {
    modelValue: _ctx.valueRef2,
    "onUpdate:modelValue": ($event) => _ctx.valueRef2 = $event,
    max: 40.8,
    min: 36.1,
    step: 0.2
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_slider, {
    modelValue: _ctx.valueRef2,
    "onUpdate:modelValue": ($event) => _ctx.valueRef2 = $event,
    max: 40.8,
    min: 36.1,
    step: 0.2,
    "show-separator": ""
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Slider/step.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const step = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  step as default
};
