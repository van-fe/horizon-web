import { defineComponent, ref, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_float_button = resolveComponent("h-float-button");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        status: true,
        "status-on-text": "显示",
        "status-off-text": "隐藏"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_float_button, {
        visible: visible.value,
        icon: "message"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_float_button, {
        visible: visible.value,
        description: "按钮"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/FloatButton/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
