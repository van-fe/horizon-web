import { defineComponent, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "closable",
  __ssrInlineRender: true,
  setup(__props) {
    function onClick() {
      console.info("click");
    }
    function onClose() {
      console.info("close");
    }
    return (_ctx, _push, _parent, _attrs) => {
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
                    closable: true,
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
                    closable: true,
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
                    closable: true,
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
                    closable: true,
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
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Default")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      type: "success"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Success")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Info")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      type: "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Warning")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
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
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    round: true,
                    onClick,
                    onClose
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
                    closable: true,
                    round: true,
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
                    closable: true,
                    round: true,
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
                    closable: true,
                    round: true,
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
                    closable: true,
                    round: true,
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
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      round: true,
                      onClick,
                      onClose
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Default")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      round: true,
                      type: "success"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Success")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      round: true,
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Info")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      round: true,
                      type: "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Warning")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      round: true,
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
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true
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
                    closable: true,
                    plain: true,
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
                    closable: true,
                    plain: true,
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
                    closable: true,
                    plain: true,
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
                    closable: true,
                    plain: true,
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
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      plain: true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Default")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      plain: true,
                      type: "success"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Success")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      plain: true,
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Info")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      plain: true,
                      type: "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Warning")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      plain: true,
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
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true,
                    equally: true,
                    onClick,
                    onClose
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
                    closable: true,
                    plain: true,
                    equally: true,
                    type: "success"
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
                    closable: true,
                    plain: true,
                    equally: true,
                    type: "info"
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
                    closable: true,
                    plain: true,
                    equally: true,
                    type: "warning"
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
                    closable: true,
                    plain: true,
                    equally: true,
                    type: "error"
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
                      closable: true,
                      plain: true,
                      equally: true,
                      onClick,
                      onClose
                    }, {
                      default: withCtx(() => [
                        createTextVNode("普")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      plain: true,
                      equally: true,
                      type: "success"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("成")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      plain: true,
                      equally: true,
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("进")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      plain: true,
                      equally: true,
                      type: "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("警")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_tag, {
                      clickable: false,
                      closable: true,
                      plain: true,
                      equally: true,
                      type: "error"
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
                    closable: true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Default")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    type: "success"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Success")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    type: "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Info")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    type: "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Warning")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    type: "error"
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
                    closable: true,
                    round: true,
                    onClick,
                    onClose
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Default")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    round: true,
                    type: "success"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Success")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    round: true,
                    type: "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Info")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    round: true,
                    type: "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Warning")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    round: true,
                    type: "error"
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
                    closable: true,
                    plain: true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Default")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true,
                    type: "success"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Success")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true,
                    type: "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Info")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true,
                    type: "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Warning")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true,
                    type: "error"
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
                    closable: true,
                    plain: true,
                    equally: true,
                    onClick,
                    onClose
                  }, {
                    default: withCtx(() => [
                      createTextVNode("普")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true,
                    equally: true,
                    type: "success"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("成")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true,
                    equally: true,
                    type: "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("进")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true,
                    equally: true,
                    type: "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("警")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_tag, {
                    clickable: false,
                    closable: true,
                    plain: true,
                    equally: true,
                    type: "error"
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/closable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
