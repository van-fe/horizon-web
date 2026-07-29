import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const value = ref();
    function onDateClick(date, type) {
      console.info(date, type);
    }
    return {
      value,
      onDateClick
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_calendar = resolveComponent("h-calendar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrapper" }, _attrs))} data-v-932a12e0>`);
  _push(ssrRenderComponent(_component_h_calendar, {
    modelValue: _ctx.value,
    "onUpdate:modelValue": ($event) => _ctx.value = $event,
    mode: "year",
    "date-type": "only-current",
    pickable: true,
    onDateClick: _ctx.onDateClick
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Calendar/year.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const year = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-932a12e0"]]);
export {
  year as default
};
