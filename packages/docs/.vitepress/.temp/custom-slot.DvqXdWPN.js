import { defineComponent, resolveComponent, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { I as __default__, z as $alert } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-slot",
  __ssrInlineRender: true,
  setup(__props) {
    function submit() {
      $alert("点击了确定", "提示");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_result = resolveComponent("h-result");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_result, _attrs, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(__default__), {
              size: "56",
              color: ["var(--h-text-default)"]
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(__default__), {
                size: "56",
                color: ["var(--h-text-default)"]
              })
            ];
          }
        }),
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 尊贵的示例车主 `);
          } else {
            return [
              createTextVNode(" 尊贵的示例车主 ")
            ];
          }
        }),
        subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 本次换电已结束，感谢您的使用 `);
          } else {
            return [
              createTextVNode(" 本次换电已结束，感谢您的使用 ")
            ];
          }
        }),
        extra: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, { onClick: submit }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确定`);
                } else {
                  return [
                    createTextVNode("确定")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, { onClick: submit }, {
                default: withCtx(() => [
                  createTextVNode("确定")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Result/custom-slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
