import { defineComponent, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "trigger",
  __ssrInlineRender: true,
  setup(__props) {
    function onCommand(val) {
      $message.info(val);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_dropdown = resolveComponent("h-dropdown");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_dropdown_menu = resolveComponent("h-dropdown-menu");
      const _component_h_dropdown_item = resolveComponent("h-dropdown-item");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_dropdown, null, {
                    dropdown: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_dropdown_menu, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`北京`);
                                  } else {
                                    return [
                                      createTextVNode("北京")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`上海`);
                                  } else {
                                    return [
                                      createTextVNode("上海")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`深圳`);
                                  } else {
                                    return [
                                      createTextVNode("深圳")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`杭州`);
                                  } else {
                                    return [
                                      createTextVNode("杭州")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`重庆`);
                                  } else {
                                    return [
                                      createTextVNode("重庆")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("北京")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("上海")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("深圳")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("杭州")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("重庆")
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
                          createVNode(_component_h_dropdown_menu, null, {
                            default: withCtx(() => [
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("北京")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("上海")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("深圳")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("杭州")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("重庆")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Hover(default)`);
                            } else {
                              return [
                                createTextVNode("Hover(default)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, null, {
                            default: withCtx(() => [
                              createTextVNode("Hover(default)")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_dropdown, { trigger: "click" }, {
                    dropdown: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_dropdown_menu, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`北京`);
                                  } else {
                                    return [
                                      createTextVNode("北京")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`上海`);
                                  } else {
                                    return [
                                      createTextVNode("上海")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`深圳`);
                                  } else {
                                    return [
                                      createTextVNode("深圳")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`杭州`);
                                  } else {
                                    return [
                                      createTextVNode("杭州")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`重庆`);
                                  } else {
                                    return [
                                      createTextVNode("重庆")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("北京")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("上海")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("深圳")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("杭州")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("重庆")
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
                          createVNode(_component_h_dropdown_menu, null, {
                            default: withCtx(() => [
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("北京")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("上海")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("深圳")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("杭州")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("重庆")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Click`);
                            } else {
                              return [
                                createTextVNode("Click")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, null, {
                            default: withCtx(() => [
                              createTextVNode("Click")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_dropdown, {
                    trigger: "context-menu",
                    onCommand
                  }, {
                    dropdown: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_dropdown_menu, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_dropdown_item, { command: "1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`北京`);
                                  } else {
                                    return [
                                      createTextVNode("北京")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, { command: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`上海`);
                                  } else {
                                    return [
                                      createTextVNode("上海")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, { command: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`深圳`);
                                  } else {
                                    return [
                                      createTextVNode("深圳")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, { command: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`杭州`);
                                  } else {
                                    return [
                                      createTextVNode("杭州")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, { command: "5" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`重庆`);
                                  } else {
                                    return [
                                      createTextVNode("重庆")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_dropdown_item, { command: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("北京")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, { command: "2" }, {
                                  default: withCtx(() => [
                                    createTextVNode("上海")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, { command: "3" }, {
                                  default: withCtx(() => [
                                    createTextVNode("深圳")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, { command: "4" }, {
                                  default: withCtx(() => [
                                    createTextVNode("杭州")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, { command: "5" }, {
                                  default: withCtx(() => [
                                    createTextVNode("重庆")
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
                          createVNode(_component_h_dropdown_menu, null, {
                            default: withCtx(() => [
                              createVNode(_component_h_dropdown_item, { command: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode("北京")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, { command: "2" }, {
                                default: withCtx(() => [
                                  createTextVNode("上海")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, { command: "3" }, {
                                default: withCtx(() => [
                                  createTextVNode("深圳")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, { command: "4" }, {
                                default: withCtx(() => [
                                  createTextVNode("杭州")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, { command: "5" }, {
                                default: withCtx(() => [
                                  createTextVNode("重庆")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="context-menu-area" data-v-102e5caf${_scopeId3}> context-menu </div>`);
                      } else {
                        return [
                          createVNode("div", { class: "context-menu-area" }, " context-menu ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_dropdown, null, {
                      dropdown: withCtx(() => [
                        createVNode(_component_h_dropdown_menu, null, {
                          default: withCtx(() => [
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("北京")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("上海")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("深圳")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("杭州")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("重庆")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_h_button, null, {
                          default: withCtx(() => [
                            createTextVNode("Hover(default)")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_dropdown, { trigger: "click" }, {
                      dropdown: withCtx(() => [
                        createVNode(_component_h_dropdown_menu, null, {
                          default: withCtx(() => [
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("北京")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("上海")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("深圳")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("杭州")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("重庆")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_h_button, null, {
                          default: withCtx(() => [
                            createTextVNode("Click")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_dropdown, {
                      trigger: "context-menu",
                      onCommand
                    }, {
                      dropdown: withCtx(() => [
                        createVNode(_component_h_dropdown_menu, null, {
                          default: withCtx(() => [
                            createVNode(_component_h_dropdown_item, { command: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("北京")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, { command: "2" }, {
                              default: withCtx(() => [
                                createTextVNode("上海")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, { command: "3" }, {
                              default: withCtx(() => [
                                createTextVNode("深圳")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, { command: "4" }, {
                              default: withCtx(() => [
                                createTextVNode("杭州")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, { command: "5" }, {
                              default: withCtx(() => [
                                createTextVNode("重庆")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "context-menu-area" }, " context-menu ")
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
                  createVNode(_component_h_dropdown, null, {
                    dropdown: withCtx(() => [
                      createVNode(_component_h_dropdown_menu, null, {
                        default: withCtx(() => [
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("北京")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("上海")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("深圳")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("杭州")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("重庆")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("Hover(default)")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_dropdown, { trigger: "click" }, {
                    dropdown: withCtx(() => [
                      createVNode(_component_h_dropdown_menu, null, {
                        default: withCtx(() => [
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("北京")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("上海")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("深圳")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("杭州")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("重庆")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("Click")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_dropdown, {
                    trigger: "context-menu",
                    onCommand
                  }, {
                    dropdown: withCtx(() => [
                      createVNode(_component_h_dropdown_menu, null, {
                        default: withCtx(() => [
                          createVNode(_component_h_dropdown_item, { command: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("北京")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, { command: "2" }, {
                            default: withCtx(() => [
                              createTextVNode("上海")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, { command: "3" }, {
                            default: withCtx(() => [
                              createTextVNode("深圳")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, { command: "4" }, {
                            default: withCtx(() => [
                              createTextVNode("杭州")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, { command: "5" }, {
                            default: withCtx(() => [
                              createTextVNode("重庆")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "context-menu-area" }, " context-menu ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dropdown/trigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const trigger = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-102e5caf"]]);
export {
  trigger as default
};
