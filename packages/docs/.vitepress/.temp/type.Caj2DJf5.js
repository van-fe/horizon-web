import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_tag = resolveComponent("h-tag");
  _push(ssrRenderComponent(_component_h_row, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tag, { clickable: false }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Default`);
                  } else {
                    return [
                      createTextVNode("Default")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                type: "success"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Success`);
                  } else {
                    return [
                      createTextVNode("Success")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                type: "info"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Info`);
                  } else {
                    return [
                      createTextVNode("Info")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                type: "warning"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Warning`);
                  } else {
                    return [
                      createTextVNode("Warning")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                type: "error"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Error`);
                  } else {
                    return [
                      createTextVNode("Error")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_tag, { clickable: false }, {
                  default: withCtx(() => [
                    createTextVNode("Default")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  type: "success"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Success")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  type: "info"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Info")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  type: "warning"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Warning")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  type: "error"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Error")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode(_component_h_tag, { clickable: false }, {
                default: withCtx(() => [
                  createTextVNode("Default")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                type: "success"
              }, {
                default: withCtx(() => [
                  createTextVNode("Success")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                type: "info"
              }, {
                default: withCtx(() => [
                  createTextVNode("Info")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                type: "warning"
              }, {
                default: withCtx(() => [
                  createTextVNode("Warning")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                type: "error"
              }, {
                default: withCtx(() => [
                  createTextVNode("Error")
                ]),
                _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/type.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const type = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  type as default
};
