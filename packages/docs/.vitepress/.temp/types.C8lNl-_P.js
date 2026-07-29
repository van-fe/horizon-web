import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_result = resolveComponent("h-result");
  _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_result, {
                title: "这是一条成功消息",
                subtitle: "这是一段相关的描述文案,这是一段相关的描述文案,这是一段相关的描述文案",
                type: "success"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_result, {
                  title: "这是一条成功消息",
                  subtitle: "这是一段相关的描述文案,这是一段相关的描述文案,这是一段相关的描述文案",
                  type: "success"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_result, {
                title: "这是一条提示信息",
                subtitle: "这是一段相关的描述文案,这是一段相关的描述文案",
                type: "info"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_result, {
                  title: "这是一条提示信息",
                  subtitle: "这是一段相关的描述文案,这是一段相关的描述文案",
                  type: "info"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_result, {
                title: "这是一条警示信息",
                subtitle: "这是一段相关的描述文案,这是一段相关的描述文案",
                type: "warning"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_result, {
                  title: "这是一条警示信息",
                  subtitle: "这是一段相关的描述文案,这是一段相关的描述文案",
                  type: "warning"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_result, {
                title: "这是一条错误信息",
                subtitle: "这是一段相关的描述文案,这是一段相关的描述文案",
                type: "error"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_result, {
                  title: "这是一条错误信息",
                  subtitle: "这是一段相关的描述文案,这是一段相关的描述文案",
                  type: "error"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_result, {
                title: "这是一条成功消息",
                subtitle: "这是一段相关的描述文案,这是一段相关的描述文案,这是一段相关的描述文案",
                type: "success"
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_result, {
                title: "这是一条提示信息",
                subtitle: "这是一段相关的描述文案,这是一段相关的描述文案",
                type: "info"
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_result, {
                title: "这是一条警示信息",
                subtitle: "这是一段相关的描述文案,这是一段相关的描述文案",
                type: "warning"
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_result, {
                title: "这是一条错误信息",
                subtitle: "这是一段相关的描述文案,这是一段相关的描述文案",
                type: "error"
              })
            ]),
            _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Result/types.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const types = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  types as default
};
