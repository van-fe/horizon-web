import { defineComponent, ref, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const val = ref("");
    const hint = ref("");
    const handleInput = (value) => {
      console.info("[handleInput]", value);
    };
    const handleChange = (value) => {
      console.info("[handleChange]", value);
    };
    const handleClear = () => {
      console.info("[handleClear]");
      hint.value = "Cleared";
    };
    const handleKeyUpEnter = (event2) => {
      console.info("[pressEnter]", event2);
      hint.value = "Pressed Enter";
    };
    return {
      val,
      hint,
      handleInput,
      handleChange,
      handleClear,
      handleKeyUpEnter
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_input = resolveComponent("h-input");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_input, {
    ref: "input",
    modelValue: _ctx.val,
    "onUpdate:modelValue": ($event) => _ctx.val = $event,
    clearable: "",
    onInput: _ctx.handleInput,
    onChange: _ctx.handleChange,
    onClear: _ctx.handleClear,
    onKeyup: _ctx.handleKeyUpEnter
  }, null, _parent));
  _push(`<div>${ssrInterpolate(_ctx.hint)}</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/event.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const event = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  event as default
};
