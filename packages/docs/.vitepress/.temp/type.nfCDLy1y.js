import { defineComponent, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "type",
  __ssrInlineRender: true,
  setup(__props) {
    const open1 = () => {
      $message.info("这是一条消息提示");
    };
    const open2 = () => {
      $message.success("操作成功");
    };
    const open3 = () => {
      $message.warning("操作警告");
    };
    const open4 = () => {
      $message.error("操作错误");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_space, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, {
              type: "normal",
              plain: "",
              onClick: open2
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`成功`);
                } else {
                  return [
                    createTextVNode("成功")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, {
              type: "normal",
              plain: "",
              onClick: open3
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`警告`);
                } else {
                  return [
                    createTextVNode("警告")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, {
              type: "normal",
              plain: "",
              onClick: open1
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`消息`);
                } else {
                  return [
                    createTextVNode("消息")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, {
              type: "normal",
              plain: "",
              onClick: open4
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`错误`);
                } else {
                  return [
                    createTextVNode("错误")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, {
                type: "normal",
                plain: "",
                onClick: open2
              }, {
                default: withCtx(() => [
                  createTextVNode("成功")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "normal",
                plain: "",
                onClick: open3
              }, {
                default: withCtx(() => [
                  createTextVNode("警告")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "normal",
                plain: "",
                onClick: open1
              }, {
                default: withCtx(() => [
                  createTextVNode("消息")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "normal",
                plain: "",
                onClick: open4
              }, {
                default: withCtx(() => [
                  createTextVNode("错误")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/Message/type.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
