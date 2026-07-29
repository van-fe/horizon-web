import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_divider = resolveComponent("h-divider");
  _push(`<!--[--><p>↓ solid(default)</p>`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_divider, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_divider)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_divider, { direction: "vertical" }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_divider, { direction: "vertical" })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_divider)
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_divider, { direction: "vertical" })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p>↓ dashed</p>`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_divider, { "line-style": "dashed" }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_divider, { "line-style": "dashed" })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_divider, {
                "line-style": "dashed",
                direction: "vertical"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_divider, {
                  "line-style": "dashed",
                  direction: "vertical"
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
              createVNode(_component_h_divider, { "line-style": "dashed" })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_divider, {
                "line-style": "dashed",
                direction: "vertical"
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p>↓ dotted</p>`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_divider, { "line-style": "dotted" }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_divider, { "line-style": "dotted" })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_divider, {
                "line-style": "dotted",
                direction: "vertical"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_divider, {
                  "line-style": "dotted",
                  direction: "vertical"
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
              createVNode(_component_h_divider, { "line-style": "dotted" })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_divider, {
                "line-style": "dotted",
                direction: "vertical"
              })
            ]),
            _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Divider/line-style.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lineStyle = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  lineStyle as default
};
