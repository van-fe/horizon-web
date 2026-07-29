import { defineComponent, ref, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const valueRef = ref(50);
    return {
      valueRef,
      tooltipFormatter(val) {
        return `${val} 个`;
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_slider = resolveComponent("h-slider");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_slider, {
    modelValue: _ctx.valueRef,
    "onUpdate:modelValue": ($event) => _ctx.valueRef = $event,
    "tooltip-formatter": _ctx.tooltipFormatter
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_slider, {
    modelValue: _ctx.valueRef,
    "onUpdate:modelValue": ($event) => _ctx.valueRef = $event,
    "tooltip-formatter": _ctx.tooltipFormatter,
    "tooltip-enable": false
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Slider/custom-tooltip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customTooltip = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  customTooltip as default
};
