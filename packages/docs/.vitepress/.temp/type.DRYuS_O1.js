import { defineComponent, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { $ as $message } from "./app.js";
import { ssrRenderList, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const types = ["none", "info", "success", "warning", "error"];
    return {
      types,
      del: () => {
        $message("Action!");
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _directive_popconfirm = resolveDirective("popconfirm");
  _push(`<!--[-->`);
  ssrRenderList(_ctx.types, (typeName) => {
    _push(ssrRenderComponent(_component_h_button, mergeProps({
      key: typeName,
      class: "mr-2",
      onClick: _ctx.del
    }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { type: typeName })), {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(typeName)}`);
        } else {
          return [
            createTextVNode(toDisplayString(typeName), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-popconfirm/type.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const type = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  type as default
};
