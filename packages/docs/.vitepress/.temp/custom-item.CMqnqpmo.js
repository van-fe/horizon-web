import { defineComponent, resolveComponent, withCtx, createTextVNode, unref, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { a as __default__ } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-item",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_breadcrumb = resolveComponent("h-breadcrumb");
      const _component_h_breadcrumb_item = resolveComponent("h-breadcrumb-item");
      const _component_h_dropdown = resolveComponent("h-dropdown");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_dropdown_menu = resolveComponent("h-dropdown-menu");
      const _component_h_dropdown_item = resolveComponent("h-dropdown-item");
      _push(ssrRenderComponent(_component_h_breadcrumb, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_breadcrumb_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Home`);
                } else {
                  return [
                    createTextVNode("Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_breadcrumb_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_dropdown, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, {
                          text: true,
                          type: "normal"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page1 `);
                              _push5(ssrRenderComponent(unref(__default__), {
                                size: "12",
                                class: "ml-2"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode("Sub Page1 "),
                                createVNode(unref(__default__), {
                                  size: "12",
                                  class: "ml-2"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_dropdown_menu, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Sub Page1-1`);
                                  } else {
                                    return [
                                      createTextVNode("Sub Page1-1")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Sub Page1-2`);
                                  } else {
                                    return [
                                      createTextVNode("Sub Page1-2")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Sub Page1-3`);
                                  } else {
                                    return [
                                      createTextVNode("Sub Page1-3")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Sub Page1-4`);
                                  } else {
                                    return [
                                      createTextVNode("Sub Page1-4")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Sub Page1-1")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Sub Page1-2")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Sub Page1-3")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Sub Page1-4")
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
                          createVNode(_component_h_button, {
                            text: true,
                            type: "normal"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page1 "),
                              createVNode(unref(__default__), {
                                size: "12",
                                class: "ml-2"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_menu, null, {
                            default: withCtx(() => [
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("Sub Page1-1")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("Sub Page1-2")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("Sub Page1-3")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, null, {
                                default: withCtx(() => [
                                  createTextVNode("Sub Page1-4")
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
                      default: withCtx(() => [
                        createVNode(_component_h_button, {
                          text: true,
                          type: "normal"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page1 "),
                            createVNode(unref(__default__), {
                              size: "12",
                              class: "ml-2"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_dropdown_menu, null, {
                          default: withCtx(() => [
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("Sub Page1-1")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("Sub Page1-2")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("Sub Page1-3")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, null, {
                              default: withCtx(() => [
                                createTextVNode("Sub Page1-4")
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
            _push2(ssrRenderComponent(_component_h_breadcrumb_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Sub Page2`);
                } else {
                  return [
                    createTextVNode("Sub Page2")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_breadcrumb_item, null, {
                default: withCtx(() => [
                  createTextVNode("Home")
                ]),
                _: 1
              }),
              createVNode(_component_h_breadcrumb_item, null, {
                default: withCtx(() => [
                  createVNode(_component_h_dropdown, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_button, {
                        text: true,
                        type: "normal"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Sub Page1 "),
                          createVNode(unref(__default__), {
                            size: "12",
                            class: "ml-2"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_dropdown_menu, null, {
                        default: withCtx(() => [
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page1-1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page1-2")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page1-3")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_dropdown_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page1-4")
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
              }),
              createVNode(_component_h_breadcrumb_item, null, {
                default: withCtx(() => [
                  createTextVNode("Sub Page2")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Breadcrumb/custom-item.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-168171e7"]]);
export {
  customItem as default
};
