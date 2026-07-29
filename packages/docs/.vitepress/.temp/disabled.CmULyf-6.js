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
                clickable: false,
                disabled: true,
                closable: true
              }, {
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
                disabled: true,
                type: "success",
                closable: true
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
                disabled: true,
                type: "info",
                closable: true
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
                disabled: true,
                type: "warning",
                closable: true
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
                disabled: true,
                type: "error",
                closable: true
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
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Default")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  type: "success",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Success")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  type: "info",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Info")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  type: "warning",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Warning")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  type: "error",
                  closable: true
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
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                disabled: true,
                round: true,
                closable: true
              }, {
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
                disabled: true,
                round: true,
                type: "success",
                closable: true
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
                disabled: true,
                round: true,
                type: "info",
                closable: true
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
                disabled: true,
                round: true,
                type: "warning",
                closable: true
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
                disabled: true,
                round: true,
                type: "error",
                closable: true
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
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  round: true,
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Default")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  round: true,
                  type: "success",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Success")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  round: true,
                  type: "info",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Info")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  round: true,
                  type: "warning",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Warning")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  round: true,
                  type: "error",
                  closable: true
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
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                disabled: true,
                plain: true,
                closable: true
              }, {
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
                disabled: true,
                plain: true,
                type: "success",
                closable: true
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
                disabled: true,
                plain: true,
                type: "info",
                closable: true
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
                disabled: true,
                plain: true,
                type: "warning",
                closable: true
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
                disabled: true,
                plain: true,
                type: "error",
                closable: true
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
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  plain: true,
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Default")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  plain: true,
                  type: "success",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Success")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  plain: true,
                  type: "info",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Info")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  plain: true,
                  type: "warning",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Warning")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  plain: true,
                  type: "error",
                  closable: true
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
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                closable: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`普`);
                  } else {
                    return [
                      createTextVNode("普")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                type: "success",
                closable: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`成`);
                  } else {
                    return [
                      createTextVNode("成")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                type: "info",
                closable: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`进`);
                  } else {
                    return [
                      createTextVNode("进")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                type: "warning",
                closable: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`警`);
                  } else {
                    return [
                      createTextVNode("警")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                type: "error",
                closable: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`错`);
                  } else {
                    return [
                      createTextVNode("错")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  equally: true,
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("普")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  equally: true,
                  type: "success",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("成")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  equally: true,
                  type: "info",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("进")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  equally: true,
                  type: "warning",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("警")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  disabled: true,
                  equally: true,
                  type: "error",
                  closable: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("错")
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
                clickable: false,
                disabled: true,
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Default")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                type: "success",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Success")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                type: "info",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Info")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                type: "warning",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Warning")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                type: "error",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Error")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                round: true,
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Default")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                round: true,
                type: "success",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Success")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                round: true,
                type: "info",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Info")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                round: true,
                type: "warning",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Warning")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                round: true,
                type: "error",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Error")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                plain: true,
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Default")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                plain: true,
                type: "success",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Success")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                plain: true,
                type: "info",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Info")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                plain: true,
                type: "warning",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Warning")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                plain: true,
                type: "error",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Error")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("普")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                type: "success",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("成")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                type: "info",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("进")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                type: "warning",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("警")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                disabled: true,
                equally: true,
                type: "error",
                closable: true
              }, {
                default: withCtx(() => [
                  createTextVNode("错")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/disabled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const disabled = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  disabled as default
};
