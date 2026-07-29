import { defineComponent, ref, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
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
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_switch, {
    modelValue: _ctx.currentRef,
    "onUpdate:modelValue": ($event) => _ctx.currentRef = $event,
    status: "",
    label: "Some text"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_switch, {
    modelValue: _ctx.currentRef,
    "onUpdate:modelValue": ($event) => _ctx.currentRef = $event,
    size: "small",
    status: "",
    label: "Some text",
    class: "ml-4"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Switch/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  size as default
};
