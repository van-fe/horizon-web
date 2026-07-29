import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "trigger",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_popover = resolveComponent("h-popover");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_pop_content = resolveComponent("h-pop-content");
      _push(ssrRenderComponent(_component_h_space, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_popover, { trigger: "hover" }, {
              reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`hover`);
                      } else {
                        return [
                          createTextVNode("hover")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("hover")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_pop_content, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>show hello</div>`);
                      } else {
                        return [
                          createVNode("div", null, "show hello")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_pop_content, null, {
                      default: withCtx(() => [
                        createVNode("div", null, "show hello")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_popover, { trigger: "click" }, {
              reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`click`);
                      } else {
                        return [
                          createTextVNode("click")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("click")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_pop_content, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>show hello</div>`);
                      } else {
                        return [
                          createVNode("div", null, "show hello")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_pop_content, null, {
                      default: withCtx(() => [
                        createVNode("div", null, "show hello")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_popover, { trigger: "click-remain" }, {
              reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`click-remain`);
                      } else {
                        return [
                          createTextVNode("click-remain")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("click-remain")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_pop_content, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>Hello World</div>`);
                      } else {
                        return [
                          createVNode("div", null, "Hello World")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_pop_content, null, {
                      default: withCtx(() => [
                        createVNode("div", null, "Hello World")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_popover, { trigger: "click-hide" }, {
              reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`click-hide`);
                      } else {
                        return [
                          createTextVNode("click-hide")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("click-hide")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_pop_content, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>Hello World</div>`);
                      } else {
                        return [
                          createVNode("div", null, "Hello World")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_pop_content, null, {
                      default: withCtx(() => [
                        createVNode("div", null, "Hello World")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_popover, { trigger: "focus" }, {
              reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`focus`);
                      } else {
                        return [
                          createTextVNode("focus")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("focus")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_pop_content, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>Hello World</div>`);
                      } else {
                        return [
                          createVNode("div", null, "Hello World")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_pop_content, null, {
                      default: withCtx(() => [
                        createVNode("div", null, "Hello World")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_popover, {
              trigger: "manual",
              visible: visible.value
            }, {
              reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    onClick: ($event) => visible.value = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`open`);
                      } else {
                        return [
                          createTextVNode("open")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, {
                      onClick: ($event) => visible.value = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("open")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_pop_content, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_space, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` click the btn to close! `);
                              _push5(ssrRenderComponent(_component_h_button, {
                                type: "danger",
                                onClick: ($event) => visible.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`close`);
                                  } else {
                                    return [
                                      createTextVNode("close")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" click the btn to close! "),
                                createVNode(_component_h_button, {
                                  type: "danger",
                                  onClick: ($event) => visible.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("close")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_space, null, {
                            default: withCtx(() => [
                              createTextVNode(" click the btn to close! "),
                              createVNode(_component_h_button, {
                                type: "danger",
                                onClick: ($event) => visible.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("close")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
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
                    createVNode(_component_h_pop_content, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_space, null, {
                          default: withCtx(() => [
                            createTextVNode(" click the btn to close! "),
                            createVNode(_component_h_button, {
                              type: "danger",
                              onClick: ($event) => visible.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("close")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
              createVNode(_component_h_popover, { trigger: "hover" }, {
                reference: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("hover")
                    ]),
                    _: 1
                  })
                ]),
                popper: withCtx(() => [
                  createVNode(_component_h_pop_content, null, {
                    default: withCtx(() => [
                      createVNode("div", null, "show hello")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_popover, { trigger: "click" }, {
                reference: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("click")
                    ]),
                    _: 1
                  })
                ]),
                popper: withCtx(() => [
                  createVNode(_component_h_pop_content, null, {
                    default: withCtx(() => [
                      createVNode("div", null, "show hello")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_popover, { trigger: "click-remain" }, {
                reference: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("click-remain")
                    ]),
                    _: 1
                  })
                ]),
                popper: withCtx(() => [
                  createVNode(_component_h_pop_content, null, {
                    default: withCtx(() => [
                      createVNode("div", null, "Hello World")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_popover, { trigger: "click-hide" }, {
                reference: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("click-hide")
                    ]),
                    _: 1
                  })
                ]),
                popper: withCtx(() => [
                  createVNode(_component_h_pop_content, null, {
                    default: withCtx(() => [
                      createVNode("div", null, "Hello World")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_popover, { trigger: "focus" }, {
                reference: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("focus")
                    ]),
                    _: 1
                  })
                ]),
                popper: withCtx(() => [
                  createVNode(_component_h_pop_content, null, {
                    default: withCtx(() => [
                      createVNode("div", null, "Hello World")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_popover, {
                trigger: "manual",
                visible: visible.value
              }, {
                reference: withCtx(() => [
                  createVNode(_component_h_button, {
                    onClick: ($event) => visible.value = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("open")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                popper: withCtx(() => [
                  createVNode(_component_h_pop_content, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_space, null, {
                        default: withCtx(() => [
                          createTextVNode(" click the btn to close! "),
                          createVNode(_component_h_button, {
                            type: "danger",
                            onClick: ($event) => visible.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("close")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["visible"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Popover/trigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
