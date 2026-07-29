import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      currentRef: ref(false)
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_switch = resolveComponent("h-switch");
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "width": "600px" } }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_switch, {
    modelValue: _ctx.currentRef,
    "onUpdate:modelValue": ($event) => _ctx.currentRef = $event,
    label: "This is a Label Text  and their names. This is a Label Text  and their names. This is a Label Text  and their names.",
    "label-position": "top",
    style: { "margin-bottom": "20px" }
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_switch, {
    modelValue: _ctx.currentRef,
    "onUpdate:modelValue": ($event) => _ctx.currentRef = $event,
    label: "This is a Label Text  and their names. This is a Label Text  and their names. This is a Label Text  and their names.",
    "label-position": "left",
    style: { "margin-bottom": "20px" }
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_switch, {
    modelValue: _ctx.currentRef,
    "onUpdate:modelValue": ($event) => _ctx.currentRef = $event,
    label: "This is a Label Text  and their names. This is a Label Text  and their names. This is a Label Text  and their names.",
    "label-position": "right"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Switch/labelPosition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const labelPosition = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  labelPosition as default
};
