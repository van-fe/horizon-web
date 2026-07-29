import { defineComponent, ref, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const valueRef = ref([30, 60]);
    return {
      valueRef
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_slider = resolveComponent("h-slider");
  _push(`<div${ssrRenderAttrs(_attrs)}><p>当前范围: ${ssrInterpolate(_ctx.valueRef)}</p>`);
  _push(ssrRenderComponent(_component_h_slider, {
    modelValue: _ctx.valueRef,
    "onUpdate:modelValue": ($event) => _ctx.valueRef = $event,
    range: true
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Slider/range.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const range = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  range as default
};
