import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_steps = resolveComponent("h-steps");
  const _component_h_step = resolveComponent("h-step");
  _push(ssrRenderComponent(_component_h_row, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_steps, {
                direction: "vertical",
                "model-value": 1
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Succeeded",
                      description: "This is a description."
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Processing",
                      description: "This is a description."
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Future step",
                      description: "This is a description."
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_step, {
                        title: "Succeeded",
                        description: "This is a description."
                      }),
                      createVNode(_component_h_step, {
                        title: "Processing",
                        description: "This is a description."
                      }),
                      createVNode(_component_h_step, {
                        title: "Future step",
                        description: "This is a description."
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_steps, {
                  direction: "vertical",
                  "model-value": 1
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_step, {
                      title: "Succeeded",
                      description: "This is a description."
                    }),
                    createVNode(_component_h_step, {
                      title: "Processing",
                      description: "This is a description."
                    }),
                    createVNode(_component_h_step, {
                      title: "Future step",
                      description: "This is a description."
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_steps, {
                direction: "vertical",
                size: "small",
                "model-value": 1
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Succeeded",
                      description: "Here is a paragraph."
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Processing",
                      description: "Here is a paragraph."
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Future step",
                      description: "Here is a paragraph."
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_step, {
                        title: "Succeeded",
                        description: "Here is a paragraph."
                      }),
                      createVNode(_component_h_step, {
                        title: "Processing",
                        description: "Here is a paragraph."
                      }),
                      createVNode(_component_h_step, {
                        title: "Future step",
                        description: "Here is a paragraph."
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_steps, {
                  direction: "vertical",
                  size: "small",
                  "model-value": 1
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_step, {
                      title: "Succeeded",
                      description: "Here is a paragraph."
                    }),
                    createVNode(_component_h_step, {
                      title: "Processing",
                      description: "Here is a paragraph."
                    }),
                    createVNode(_component_h_step, {
                      title: "Future step",
                      description: "Here is a paragraph."
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_steps, {
                "progress-dot": true,
                "model-value": 1,
                direction: "vertical",
                status: "error"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Succeeded",
                      description: "Here is a paragraph. Here is a paragraph."
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Succeeded",
                      description: "Here is a paragraph. Here is a paragraph."
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Processing",
                      description: "Here is a paragraph. Here is a paragraph."
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Future step",
                      description: "Here is a paragraph."
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_step, {
                      title: "Future step",
                      description: "Here is a paragraph. Here is a paragraph."
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_step, {
                        title: "Succeeded",
                        description: "Here is a paragraph. Here is a paragraph."
                      }),
                      createVNode(_component_h_step, {
                        title: "Succeeded",
                        description: "Here is a paragraph. Here is a paragraph."
                      }),
                      createVNode(_component_h_step, {
                        title: "Processing",
                        description: "Here is a paragraph. Here is a paragraph."
                      }),
                      createVNode(_component_h_step, {
                        title: "Future step",
                        description: "Here is a paragraph."
                      }),
                      createVNode(_component_h_step, {
                        title: "Future step",
                        description: "Here is a paragraph. Here is a paragraph."
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_steps, {
                  "progress-dot": true,
                  "model-value": 1,
                  direction: "vertical",
                  status: "error"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_step, {
                      title: "Succeeded",
                      description: "Here is a paragraph. Here is a paragraph."
                    }),
                    createVNode(_component_h_step, {
                      title: "Succeeded",
                      description: "Here is a paragraph. Here is a paragraph."
                    }),
                    createVNode(_component_h_step, {
                      title: "Processing",
                      description: "Here is a paragraph. Here is a paragraph."
                    }),
                    createVNode(_component_h_step, {
                      title: "Future step",
                      description: "Here is a paragraph."
                    }),
                    createVNode(_component_h_step, {
                      title: "Future step",
                      description: "Here is a paragraph. Here is a paragraph."
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
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode(_component_h_steps, {
                direction: "vertical",
                "model-value": 1
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_step, {
                    title: "Succeeded",
                    description: "This is a description."
                  }),
                  createVNode(_component_h_step, {
                    title: "Processing",
                    description: "This is a description."
                  }),
                  createVNode(_component_h_step, {
                    title: "Future step",
                    description: "This is a description."
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode(_component_h_steps, {
                direction: "vertical",
                size: "small",
                "model-value": 1
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_step, {
                    title: "Succeeded",
                    description: "Here is a paragraph."
                  }),
                  createVNode(_component_h_step, {
                    title: "Processing",
                    description: "Here is a paragraph."
                  }),
                  createVNode(_component_h_step, {
                    title: "Future step",
                    description: "Here is a paragraph."
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode(_component_h_steps, {
                "progress-dot": true,
                "model-value": 1,
                direction: "vertical",
                status: "error"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_step, {
                    title: "Succeeded",
                    description: "Here is a paragraph. Here is a paragraph."
                  }),
                  createVNode(_component_h_step, {
                    title: "Succeeded",
                    description: "Here is a paragraph. Here is a paragraph."
                  }),
                  createVNode(_component_h_step, {
                    title: "Processing",
                    description: "Here is a paragraph. Here is a paragraph."
                  }),
                  createVNode(_component_h_step, {
                    title: "Future step",
                    description: "Here is a paragraph."
                  }),
                  createVNode(_component_h_step, {
                    title: "Future step",
                    description: "Here is a paragraph. Here is a paragraph."
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
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Steps/vertical.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vertical = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  vertical as default
};
