import { defineComponent, getCurrentInstance, resolveComponent, withCtx, createTextVNode, h, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo1",
  __ssrInlineRender: true,
  setup(__props) {
    const instance = getCurrentInstance();
    console.info(instance);
    const open = () => {
      $message({
        message: "这是一条消息提示"
      });
    };
    const openVn = () => {
      $message({
        message: h("p", null, [
          h("span", null, "Message can be "),
          h("i", { style: "color: teal" }, "VNode")
        ])
      });
    };
    const closeAll = () => {
      $message.closeAll();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_button, { onClick: open }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`打开消息提示`);
          } else {
            return [
              createTextVNode("打开消息提示")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, { onClick: openVn }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`VNode`);
          } else {
            return [
              createTextVNode("VNode")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, { onClick: closeAll }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`关闭所有消息提示`);
          } else {
            return [
              createTextVNode("关闭所有消息提示")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/Message/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e7839bac"]]);
export {
  demo1 as default
};
