import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createVNode, withDirectives, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as __default__ } from "./app.js";
import { ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  components: {
    AIcon: __default__
  },
  setup() {
    return {
      currentRef: ref("tab1")
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_tabs = resolveComponent("h-tabs");
  const _component_h_tab = resolveComponent("h-tab");
  const _component_a_icon = resolveComponent("a-icon");
  const _directive_tooltip = resolveDirective("tooltip");
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
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span class="px-2 font-bold"${_scopeId2}>Custom Tab</span>`);
              _push3(ssrRenderComponent(_component_a_icon, mergeProps({
                name: "help",
                class: "ml-1"
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "something helpful message")), null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("span", { class: "px-2 font-bold" }, "Custom Tab"),
                withDirectives(createVNode(_component_a_icon, {
                  name: "help",
                  class: "ml-1"
                }, null, 512), [
                  [_directive_tooltip, "something helpful message"]
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_tab, {
          label: "Section 2",
          name: "tab2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_tab, {
          label: "Section 3",
          name: "tab3"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_tab, {
            label: "Tab1",
            name: "tab1"
          }, {
            default: withCtx(() => [
              createVNode("span", { class: "px-2 font-bold" }, "Custom Tab"),
              withDirectives(createVNode(_component_a_icon, {
                name: "help",
                class: "ml-1"
              }, null, 512), [
                [_directive_tooltip, "something helpful message"]
              ])
            ]),
            _: 1
          }),
          createVNode(_component_h_tab, {
            label: "Section 2",
            name: "tab2"
          }),
          createVNode(_component_h_tab, {
            label: "Section 3",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const slot = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  slot as default
};
