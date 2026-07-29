import { defineComponent, resolveComponent, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { q as __default__, r as __default__$1 } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "icon",
  __ssrInlineRender: true,
  setup(__props) {
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
                              _push5(ssrRenderComponent(_component_h_dropdown_item, { icon: "car" }, {
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
                              _push5(ssrRenderComponent(_component_h_dropdown_item, { icon: unref(__default__) }, {
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
                              _push5(ssrRenderComponent(_component_h_dropdown_item, { icon: "applets" }, {
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
                              _push5(ssrRenderComponent(_component_h_dropdown_item, { icon: "gift" }, {
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
                                icon: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(__default__$1), { size: "16" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(__default__$1), { size: "16" })
                                    ];
                                  }
                                }),
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 重庆 `);
                                  } else {
                                    return [
                                      createTextVNode(" 重庆 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_dropdown_item, { icon: "car" }, {
                                  default: withCtx(() => [
                                    createTextVNode("北京")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, { icon: unref(__default__) }, {
                                  default: withCtx(() => [
                                    createTextVNode("上海")
                                  ]),
                                  _: 1
                                }, 8, ["icon"]),
                                createVNode(_component_h_dropdown_item, { icon: "applets" }, {
                                  default: withCtx(() => [
                                    createTextVNode("深圳")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, { icon: "gift" }, {
                                  default: withCtx(() => [
                                    createTextVNode("杭州")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  icon: withCtx(() => [
                                    createVNode(unref(__default__$1), { size: "16" })
                                  ]),
                                  default: withCtx(() => [
                                    createTextVNode(" 重庆 ")
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
                              createVNode(_component_h_dropdown_item, { icon: "car" }, {
                                default: withCtx(() => [
                                  createTextVNode("北京")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, { icon: unref(__default__) }, {
                                default: withCtx(() => [
                                  createTextVNode("上海")
                                ]),
                                _: 1
                              }, 8, ["icon"]),
                              createVNode(_component_h_dropdown_item, { icon: "applets" }, {
                                default: withCtx(() => [
                                  createTextVNode("深圳")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, { icon: "gift" }, {
                                default: withCtx(() => [
                                  createTextVNode("杭州")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                icon: withCtx(() => [
                                  createVNode(unref(__default__$1), { size: "16" })
                                ]),
                                default: withCtx(() => [
                                  createTextVNode(" 重庆 ")
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
                              _push5(`Hover`);
                            } else {
                              return [
                                createTextVNode("Hover")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, null, {
                            default: withCtx(() => [
                              createTextVNode("Hover")
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
                            createVNode(_component_h_dropdown_item, { icon: "car" }, {
                              default: withCtx(() => [
                                createTextVNode("北京")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, { icon: unref(__default__) }, {
                              default: withCtx(() => [
                                createTextVNode("上海")
                              ]),
                              _: 1
                            }, 8, ["icon"]),
                            createVNode(_component_h_dropdown_item, { icon: "applets" }, {
                              default: withCtx(() => [
                                createTextVNode("深圳")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, { icon: "gift" }, {
                              default: withCtx(() => [
                                createTextVNode("杭州")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              icon: withCtx(() => [
                                createVNode(unref(__default__$1), { size: "16" })
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" 重庆 ")
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
                            createTextVNode("Hover")
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
                          createVNode(_component_h_dropdown_item, { icon: "car" }, {
                            default: withCtx(() => [
                              createTextVNode("北京")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, { icon: unref(__default__) }, {
                            default: withCtx(() => [
                              createTextVNode("上海")
                            ]),
                            _: 1
                          }, 8, ["icon"]),
                          createVNode(_component_h_dropdown_item, { icon: "applets" }, {
                            default: withCtx(() => [
                              createTextVNode("深圳")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, { icon: "gift" }, {
                            default: withCtx(() => [
                              createTextVNode("杭州")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            icon: withCtx(() => [
                              createVNode(unref(__default__$1), { size: "16" })
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" 重庆 ")
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
                          createTextVNode("Hover")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dropdown/icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const icon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1ddc45e0"]]);
export {
  icon as default
};
