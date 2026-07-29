import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { $ as $message } from "./app.js";
import { ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    return {
      optionsRef: ref({
        title: "确定要删除吗？",
        okText: "确定",
        okButtonProps: {
          type: "primary",
          kind: "negative"
        },
        cancelText: "取消",
        cancelButtonProps: {
          type: "text",
          kind: "neutral"
        }
      }),
      del: () => {
        $message("Action!");
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _directive_popconfirm = resolveDirective("popconfirm");
  _push(ssrRenderComponent(_component_h_button, mergeProps({ onClick: _ctx.del }, _attrs, ssrGetDirectiveProps(_ctx, _directive_popconfirm, _ctx.optionsRef)), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Delete`);
      } else {
        return [
          createTextVNode("Delete")
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-popconfirm/demo3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo3 as default
};
