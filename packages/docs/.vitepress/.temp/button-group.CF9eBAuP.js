import { defineComponent, resolveComponent, withCtx, unref, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { e as __default__, b as __default__$1, f as __default__$2, g as __default__$3, h as __default__$4, a as __default__$5 } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "button-group",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_button_group = resolveComponent("h-button-group");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_dropdown = resolveComponent("h-dropdown");
      const _component_h_dropdown_menu = resolveComponent("h-dropdown-menu");
      const _component_h_dropdown_item = resolveComponent("h-dropdown-item");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button_group, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, { icon: unref(__default__) }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Previous Page`);
                      } else {
                        return [
                          createTextVNode("Previous Page")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, null, {
                    suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="h-button__icon" data-v-ab9306a1${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(__default__$1), { size: 16 }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "h-button__icon" }, [
                            createVNode(unref(__default__$1), { size: 16 })
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Next Page `);
                      } else {
                        return [
                          createTextVNode(" Next Page ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, { icon: unref(__default__) }, {
                      default: withCtx(() => [
                        createTextVNode("Previous Page")
                      ]),
                      _: 1
                    }, 8, ["icon"]),
                    createVNode(_component_h_button, null, {
                      suffix: withCtx(() => [
                        createVNode("div", { class: "h-button__icon" }, [
                          createVNode(unref(__default__$1), { size: 16 })
                        ])
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Next Page ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button_group, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    plain: true,
                    icon: unref(__default__$2)
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, {
                    plain: true,
                    icon: unref(__default__$3)
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, {
                    plain: true,
                    icon: unref(__default__$4)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, {
                      plain: true,
                      icon: unref(__default__$2)
                    }, null, 8, ["icon"]),
                    createVNode(_component_h_button, {
                      plain: true,
                      icon: unref(__default__$3)
                    }, null, 8, ["icon"]),
                    createVNode(_component_h_button, {
                      plain: true,
                      icon: unref(__default__$4)
                    }, null, 8, ["icon"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button_group, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Confirm`);
                      } else {
                        return [
                          createTextVNode("Confirm")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_dropdown, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, { icon: unref(__default__$5) }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_dropdown_menu, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Agree`);
                                  } else {
                                    return [
                                      createTextVNode("Agree")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Disagree`);
                                  } else {
                                    return [
                                      createTextVNode("Disagree")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Cancel`);
                                  } else {
                                    return [
                                      createTextVNode("Cancel")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Agree")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Disagree")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Cancel")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, { icon: unref(__default__$5) }, null, 8, ["icon"]),
                          createVNode(_component_h_dropdown_menu, null, {
                            default: withCtx(() => [
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("Agree")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("Disagree")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("Cancel")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("Confirm")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_dropdown, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_button, { icon: unref(__default__$5) }, null, 8, ["icon"]),
                        createVNode(_component_h_dropdown_menu, null, {
                          default: withCtx(() => [
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("Agree")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("Disagree")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("Cancel")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button_group, { type: "primary" }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, { icon: unref(__default__) }, {
                    default: withCtx(() => [
                      createTextVNode("Previous Page")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  createVNode(_component_h_button, null, {
                    suffix: withCtx(() => [
                      createVNode("div", { class: "h-button__icon" }, [
                        createVNode(unref(__default__$1), { size: 16 })
                      ])
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Next Page ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_button_group, null, {
                default: withCtx(() => [
                  createVNode(_component_h_button, {
                    plain: true,
                    icon: unref(__default__$2)
                  }, null, 8, ["icon"]),
                  createVNode(_component_h_button, {
                    plain: true,
                    icon: unref(__default__$3)
                  }, null, 8, ["icon"]),
                  createVNode(_component_h_button, {
                    plain: true,
                    icon: unref(__default__$4)
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }),
              createVNode(_component_h_button_group, { type: "primary" }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("Confirm")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_dropdown, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_button, { icon: unref(__default__$5) }, null, 8, ["icon"]),
                      createVNode(_component_h_dropdown_menu, null, {
                        default: withCtx(() => [
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Agree")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Disagree")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          })
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Button/button-group.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const buttonGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ab9306a1"]]);
export {
  buttonGroup as default
};
