import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_tooltip = resolveComponent("h-tooltip");
  const _component_h_button = resolveComponent("h-button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tooltip, { placement: "top" }, {
                content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`只能看到这里的内容，但不能移入复制`);
                  } else {
                    return [
                      createTextVNode("只能看到这里的内容，但不能移入复制")
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`不允许移入复制`);
                        } else {
                          return [
                            createTextVNode("不允许移入复制")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("不允许移入复制")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tooltip, {
                placement: "top",
                enterable: true
              }, {
                content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`可以复制这里的内容`);
                  } else {
                    return [
                      createTextVNode("可以复制这里的内容")
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`允许移入复制`);
                        } else {
                          return [
                            createTextVNode("允许移入复制")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("允许移入复制")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_tooltip, { placement: "top" }, {
                  content: withCtx(() => [
                    createTextVNode("只能看到这里的内容，但不能移入复制")
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("不允许移入复制")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tooltip, {
                  placement: "top",
                  enterable: true
                }, {
                  content: withCtx(() => [
                    createTextVNode("可以复制这里的内容")
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("允许移入复制")
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode(_component_h_tooltip, { placement: "top" }, {
                content: withCtx(() => [
                  createTextVNode("只能看到这里的内容，但不能移入复制")
                ]),
                default: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("不允许移入复制")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_tooltip, {
                placement: "top",
                enterable: true
              }, {
                content: withCtx(() => [
                  createTextVNode("可以复制这里的内容")
                ]),
                default: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("允许移入复制")
                    ]),
                    _: 1
                  })
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
              _push3(ssrRenderComponent(_component_h_tooltip, {
                placement: "top",
                enterable: true,
                "click-to-copy": true
              }, {
                content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`点击后这串文字将会出现在剪切板里`);
                  } else {
                    return [
                      createTextVNode("点击后这串文字将会出现在剪切板里")
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`允许移入点击后复制`);
                        } else {
                          return [
                            createTextVNode("允许移入点击后复制")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("允许移入点击后复制")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tooltip, {
                placement: "top",
                enterable: true,
                "click-to-copy": true,
                "copy-target": "reference"
              }, {
                content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`点击后复制的不是我，而是 reference 的文字`);
                  } else {
                    return [
                      createTextVNode("点击后复制的不是我，而是 reference 的文字")
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`允许移入点击后复制 <code${_scopeId4}>reference</code> 的文字`);
                        } else {
                          return [
                            createTextVNode("允许移入点击后复制 "),
                            createVNode("code", null, "reference"),
                            createTextVNode(" 的文字")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("允许移入点击后复制 "),
                          createVNode("code", null, "reference"),
                          createTextVNode(" 的文字")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_tooltip, {
                  placement: "top",
                  enterable: true,
                  "click-to-copy": true
                }, {
                  content: withCtx(() => [
                    createTextVNode("点击后这串文字将会出现在剪切板里")
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("允许移入点击后复制")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tooltip, {
                  placement: "top",
                  enterable: true,
                  "click-to-copy": true,
                  "copy-target": "reference"
                }, {
                  content: withCtx(() => [
                    createTextVNode("点击后复制的不是我，而是 reference 的文字")
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("允许移入点击后复制 "),
                        createVNode("code", null, "reference"),
                        createTextVNode(" 的文字")
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode(_component_h_tooltip, {
                placement: "top",
                enterable: true,
                "click-to-copy": true
              }, {
                content: withCtx(() => [
                  createTextVNode("点击后这串文字将会出现在剪切板里")
                ]),
                default: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("允许移入点击后复制")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_tooltip, {
                placement: "top",
                enterable: true,
                "click-to-copy": true,
                "copy-target": "reference"
              }, {
                content: withCtx(() => [
                  createTextVNode("点击后复制的不是我，而是 reference 的文字")
                ]),
                default: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("允许移入点击后复制 "),
                      createVNode("code", null, "reference"),
                      createTextVNode(" 的文字")
                    ]),
                    _: 1
                  })
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
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tooltip/enterable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const enterable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  enterable as default
};
