import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { a6 as $notify } from "./app.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: "自动关闭",
        content: "这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。"
      });
    };
    const open2 = () => {
      $notify({
        title: "不自动关闭",
        content: "这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。",
        duration: 0
      });
    };
    return {
      open1,
      open2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-wrapper" }, _attrs))} data-v-26b5ea5d>`);
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open1
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`自动关闭`);
      } else {
        return [
          createTextVNode("自动关闭")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open2
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`不自动关闭`);
      } else {
        return [
          createTextVNode("不自动关闭")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/Notification/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basic = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-26b5ea5d"]]);
export {
  basic as default
};
