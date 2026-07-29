import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const tooltipMsgOptions = ref({
      content: "options message Tooltip"
    });
    return {
      tooltipMsgOptions
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _directive_tooltip = resolveDirective("tooltip");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "block" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.tooltipMsgOptions), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`options message Tooltip`);
      } else {
        return [
          createTextVNode("options message Tooltip")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-tooltip/options.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const options = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  options as default
};
