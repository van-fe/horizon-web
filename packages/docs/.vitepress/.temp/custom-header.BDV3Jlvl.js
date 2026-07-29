import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const searchWord = ref("");
    return {
      searchWord
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_calendar = resolveComponent("h-calendar");
  const _component_h_input = resolveComponent("h-input");
  _push(ssrRenderComponent(_component_h_calendar, _attrs, {
    header: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_input, {
          modelValue: _ctx.searchWord,
          "onUpdate:modelValue": ($event) => _ctx.searchWord = $event,
          placeholder: "搜索",
          size: "large",
          "suffix-icon": "search"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_input, {
            modelValue: _ctx.searchWord,
            "onUpdate:modelValue": ($event) => _ctx.searchWord = $event,
            placeholder: "搜索",
            size: "large",
            "suffix-icon": "search"
          }, null, 8, ["modelValue", "onUpdate:modelValue"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Calendar/custom-header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  customHeader as default
};
