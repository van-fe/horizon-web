import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_result = resolveComponent("h-result");
  const _component_h_divider = resolveComponent("h-divider");
  _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_result, {
                title: "403",
                subtitle: "对不起，您无权限访问此页面。",
                type: "403"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_result, {
                  title: "403",
                  subtitle: "对不起，您无权限访问此页面。",
                  type: "403"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_divider, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_result, {
                title: "404",
                subtitle: "对不起，您访问的页面不存在。",
                type: "404"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_result, {
                  title: "404",
                  subtitle: "对不起，您访问的页面不存在。",
                  type: "404"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_divider, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_result, {
                title: "500",
                subtitle: "对不起，服务器出了点问题",
                type: "500"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_result, {
                  title: "500",
                  subtitle: "对不起，服务器出了点问题",
                  type: "500"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_result, {
                title: "403",
                subtitle: "对不起，您无权限访问此页面。",
                type: "403"
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_divider),
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_result, {
                title: "404",
                subtitle: "对不起，您访问的页面不存在。",
                type: "404"
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_divider),
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_result, {
                title: "500",
                subtitle: "对不起，服务器出了点问题",
                type: "500"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Result/status.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const status = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  status as default
};
