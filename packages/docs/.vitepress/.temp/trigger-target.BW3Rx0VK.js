import { defineComponent, resolveComponent, withCtx, createTextVNode, unref, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { a as __default__ } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "trigger-target",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_dropdown = resolveComponent("h-dropdown");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_dropdown_menu = resolveComponent("h-dropdown-menu");
      const _component_h_dropdown_item = resolveComponent("h-dropdown-item");
      const _component_h_button_group = resolveComponent("h-button-group");
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
                          suffix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="n-button__icon" data-v-a238238a${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(__default__), null, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "n-button__icon" }, [
                                  createVNode(unref(__default__))
                                ])
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`使用 #suffix 插槽放置箭头 `);
                            } else {
                              return [
                                createTextVNode("使用 #suffix 插槽放置箭头 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, null, {
                            suffix: withCtx(() => [
                              createVNode("div", { class: "n-button__icon" }, [
                                createVNode(unref(__default__))
                              ])
                            ]),
                            default: withCtx(() => [
                              createTextVNode("使用 #suffix 插槽放置箭头 ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button_group, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`使用 button-group 分割触发按钮`);
                            } else {
                              return [
                                createTextVNode("使用 button-group 分割触发按钮")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_dropdown, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_button, { icon: unref(__default__) }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_menu, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_dropdown_item, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`北京`);
                                        } else {
                                          return [
                                            createTextVNode("北京")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_dropdown_item, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`上海`);
                                        } else {
                                          return [
                                            createTextVNode("上海")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_dropdown_item, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`深圳`);
                                        } else {
                                          return [
                                            createTextVNode("深圳")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_dropdown_item, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`杭州`);
                                        } else {
                                          return [
                                            createTextVNode("杭州")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_dropdown_item, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`重庆`);
                                        } else {
                                          return [
                                            createTextVNode("重庆")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_button, { icon: unref(__default__) }, null, 8, ["icon"]),
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
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, null, {
                            default: withCtx(() => [
                              createTextVNode("使用 button-group 分割触发按钮")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown, null, {
                            default: withCtx(() => [
                              createVNode(_component_h_button, { icon: unref(__default__) }, null, 8, ["icon"]),
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
                            _: 1
                          })
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
                          suffix: withCtx(() => [
                            createVNode("div", { class: "n-button__icon" }, [
                              createVNode(unref(__default__))
                            ])
                          ]),
                          default: withCtx(() => [
                            createTextVNode("使用 #suffix 插槽放置箭头 ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button_group, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_button, null, {
                          default: withCtx(() => [
                            createTextVNode("使用 button-group 分割触发按钮")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_dropdown, null, {
                          default: withCtx(() => [
                            createVNode(_component_h_button, { icon: unref(__default__) }, null, 8, ["icon"]),
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
                        suffix: withCtx(() => [
                          createVNode("div", { class: "n-button__icon" }, [
                            createVNode(unref(__default__))
                          ])
                        ]),
                        default: withCtx(() => [
                          createTextVNode("使用 #suffix 插槽放置箭头 ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button_group, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("使用 button-group 分割触发按钮")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_dropdown, null, {
                        default: withCtx(() => [
                          createVNode(_component_h_button, { icon: unref(__default__) }, null, 8, ["icon"]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dropdown/trigger-target.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const triggerTarget = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a238238a"]]);
export {
  triggerTarget as default
};
