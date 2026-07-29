import { defineComponent, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as __default__ } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  components: {
    AIcon: __default__
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_breadcrumb = resolveComponent("h-breadcrumb");
  const _component_a_icon = resolveComponent("a-icon");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_breadcrumb, {
    class: "mb-2",
    texts: [{ text: "Home" }, { text: "Sub Page1" }, { text: "Sub Page2" }],
    separator: "*"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_breadcrumb, { texts: [{ text: "Home" }, { text: "Sub Page1" }, { text: "Sub Page2" }] }, {
    separator: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_a_icon, {
          name: "gift",
          size: "12"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_a_icon, {
            name: "gift",
            size: "12"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Breadcrumb/custom-divider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customDivider = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  customDivider as default
};
