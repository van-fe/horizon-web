import { defineComponent, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "closable",
  __ssrInlineRender: true,
  setup(__props) {
    const open1 = () => {
      $message({
        showClose: true,
        message: "这是一条提示消息"
      });
    };
    const open2 = () => {
      $message({
        showClose: true,
        message: "Congrats, this is a success message.",
        type: "success"
      });
    };
    const open3 = () => {
      $message({
        showClose: true,
        message: "Warning, this is a warning message.",
        type: "warning"
      });
    };
    const open4 = () => {
      $message({
        showClose: true,
        message: "Oops, this is a error message.",
        type: "error"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_button, {
        type: "normal",
        plain: "",
        onClick: open2
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`成功`);
          } else {
            return [
              createTextVNode("成功")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        type: "normal",
        plain: "",
        onClick: open3
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`警告`);
          } else {
            return [
              createTextVNode("警告")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        type: "normal",
        plain: "",
        onClick: open1
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`消息`);
          } else {
            return [
              createTextVNode("消息")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        type: "normal",
        plain: "",
        onClick: open4
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`错误`);
          } else {
            return [
              createTextVNode("错误")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/Message/closable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const closable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-076d0a79"]]);
export {
  closable as default
};
