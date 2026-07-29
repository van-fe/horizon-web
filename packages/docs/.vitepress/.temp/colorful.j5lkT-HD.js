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
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tag, {
                color: "brand",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Brand`);
                  } else {
                    return [
                      createTextVNode("Brand")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                color: "indigo",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Indigo`);
                  } else {
                    return [
                      createTextVNode("Indigo")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                color: "purple",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Purple`);
                  } else {
                    return [
                      createTextVNode("Purple")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                color: "magenta",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Magenta`);
                  } else {
                    return [
                      createTextVNode("Magenta")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                color: "orange",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Orange`);
                  } else {
                    return [
                      createTextVNode("Orange")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_tag, {
                  color: "brand",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Brand")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  color: "indigo",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Indigo")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  color: "purple",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Purple")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  color: "magenta",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Magenta")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  color: "orange",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Orange")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tag, {
                disabled: true,
                color: "brand",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Brand`);
                  } else {
                    return [
                      createTextVNode("Brand")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                disabled: true,
                color: "indigo",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Indigo`);
                  } else {
                    return [
                      createTextVNode("Indigo")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                disabled: true,
                color: "purple",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Purple`);
                  } else {
                    return [
                      createTextVNode("Purple")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                disabled: true,
                color: "magenta",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Magenta`);
                  } else {
                    return [
                      createTextVNode("Magenta")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                disabled: true,
                color: "orange",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Orange`);
                  } else {
                    return [
                      createTextVNode("Orange")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_tag, {
                  disabled: true,
                  color: "brand",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Brand")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  disabled: true,
                  color: "indigo",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Indigo")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  disabled: true,
                  color: "purple",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Purple")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  disabled: true,
                  color: "magenta",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Magenta")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  disabled: true,
                  color: "orange",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Orange")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                color: "brand",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Brand`);
                  } else {
                    return [
                      createTextVNode("Brand")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                color: "indigo",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Indigo`);
                  } else {
                    return [
                      createTextVNode("Indigo")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                color: "purple",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Purple`);
                  } else {
                    return [
                      createTextVNode("Purple")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                color: "magenta",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Magenta`);
                  } else {
                    return [
                      createTextVNode("Magenta")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                color: "orange",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Orange`);
                  } else {
                    return [
                      createTextVNode("Orange")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_tag, {
                  plain: true,
                  color: "brand",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Brand")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  plain: true,
                  color: "indigo",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Indigo")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  plain: true,
                  color: "purple",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Purple")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  plain: true,
                  color: "magenta",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Magenta")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  plain: true,
                  color: "orange",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Orange")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "brand",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Brand`);
                  } else {
                    return [
                      createTextVNode("Brand")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "indigo",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Indigo`);
                  } else {
                    return [
                      createTextVNode("Indigo")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "purple",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Purple`);
                  } else {
                    return [
                      createTextVNode("Purple")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "magenta",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Magenta`);
                  } else {
                    return [
                      createTextVNode("Magenta")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "orange",
                "auto-color": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Orange`);
                  } else {
                    return [
                      createTextVNode("Orange")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_tag, {
                  plain: true,
                  disabled: true,
                  color: "brand",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Brand")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  plain: true,
                  disabled: true,
                  color: "indigo",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Indigo")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  plain: true,
                  disabled: true,
                  color: "purple",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Purple")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  plain: true,
                  disabled: true,
                  color: "magenta",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Magenta")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  plain: true,
                  disabled: true,
                  color: "orange",
                  "auto-color": true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Orange")
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
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_tag, {
                color: "brand",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Brand")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                color: "indigo",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Indigo")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                color: "purple",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Purple")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                color: "magenta",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Magenta")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                color: "orange",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Orange")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_tag, {
                disabled: true,
                color: "brand",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Brand")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                disabled: true,
                color: "indigo",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Indigo")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                disabled: true,
                color: "purple",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Purple")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                disabled: true,
                color: "magenta",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Magenta")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                disabled: true,
                color: "orange",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Orange")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_tag, {
                plain: true,
                color: "brand",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Brand")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                plain: true,
                color: "indigo",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Indigo")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                plain: true,
                color: "purple",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Purple")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                plain: true,
                color: "magenta",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Magenta")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                plain: true,
                color: "orange",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Orange")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "brand",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Brand")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "indigo",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Indigo")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "purple",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Purple")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "magenta",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Magenta")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                plain: true,
                disabled: true,
                color: "orange",
                "auto-color": true
              }, {
                default: withCtx(() => [
                  createTextVNode("Orange")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/colorful.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const colorful = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  colorful as default
};
