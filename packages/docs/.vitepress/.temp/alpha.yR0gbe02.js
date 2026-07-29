import { defineComponent, ref, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "alpha",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref("#0BA1D6");
    const alpha2 = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_color_picker = resolveComponent("h-color-picker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: alpha2.value,
        "onUpdate:modelValue": ($event) => alpha2.value = $event,
        label: "透明度调节",
        "label-position": "right"
      }, null, _parent));
      _push(`<p data-v-2d3ceb0d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        alpha: alpha2.value,
        "need-confirm": false,
        clearable: false
      }, null, _parent));
      _push(`</p><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/ColorPicker/alpha.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const alpha = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d3ceb0d"]]);
export {
  alpha as default
};
