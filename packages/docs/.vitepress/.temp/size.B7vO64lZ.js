import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {
  data() {
    return {
      loading: false
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_link = resolveComponent("h-link");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_link, { size: "small" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Small`);
                  } else {
                    return [
                      createTextVNode("Small")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_link, { size: "medium" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Medium`);
                  } else {
                    return [
                      createTextVNode("Medium")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_link, { size: "large" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Large`);
                  } else {
                    return [
                      createTextVNode("Large")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_link, { size: "small" }, {
                  default: withCtx(() => [
                    createTextVNode("Small")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_link, { size: "medium" }, {
                  default: withCtx(() => [
                    createTextVNode("Medium")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_link, { size: "large" }, {
                  default: withCtx(() => [
                    createTextVNode("Large")
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
              createVNode(_component_h_link, { size: "small" }, {
                default: withCtx(() => [
                  createTextVNode("Small")
                ]),
                _: 1
              }),
              createVNode(_component_h_link, { size: "medium" }, {
                default: withCtx(() => [
                  createTextVNode("Medium")
                ]),
                _: 1
              }),
              createVNode(_component_h_link, { size: "large" }, {
                default: withCtx(() => [
                  createTextVNode("Large")
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
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_link, {
                size: "small",
                loading: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Small`);
                  } else {
                    return [
                      createTextVNode("Small")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_link, {
                size: "medium",
                loading: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Medium`);
                  } else {
                    return [
                      createTextVNode("Medium")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_link, {
                size: "large",
                loading: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Large`);
                  } else {
                    return [
                      createTextVNode("Large")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_link, {
                  size: "small",
                  loading: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Small")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_link, {
                  size: "medium",
                  loading: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Medium")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_link, {
                  size: "large",
                  loading: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Large")
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
              createVNode(_component_h_link, {
                size: "small",
                loading: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Small")
                ]),
                _: 1
              }),
              createVNode(_component_h_link, {
                size: "medium",
                loading: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Medium")
                ]),
                _: 1
              }),
              createVNode(_component_h_link, {
                size: "large",
                loading: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Large")
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
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Link/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  size as default
};
