import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
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
  const _component_h_input = resolveComponent("h-input");
  _push(ssrRenderComponent(_component_h_input, mergeProps({
    modelValue: _ctx.val,
    "onUpdate:modelValue": ($event) => _ctx.val = $event,
    clearable: "",
    type: "password",
    "show-password": ""
  }, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const password = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  password as default
};
