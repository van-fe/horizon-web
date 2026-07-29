import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      currentRef: ref("tab1")
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_tabs = resolveComponent("h-tabs");
  const _component_h_tab = resolveComponent("h-tab");
  _push(ssrRenderComponent(_component_h_tabs, mergeProps({
    modelValue: _ctx.currentRef,
    "onUpdate:modelValue": ($event) => _ctx.currentRef = $event,
    type: "card"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_tab, {
          label: "Tab1",
          name: "tab1"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_tab, {
          label: "Tab2",
          name: "tab2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_tab, {
          label: "Tab3",
          name: "tab3"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_tab, {
            label: "Tab1",
            name: "tab1"
          }),
          createVNode(_component_h_tab, {
            label: "Tab2",
            name: "tab2"
          }),
          createVNode(_component_h_tab, {
            label: "Tab3",
            name: "tab3"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const card = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  card as default
};
