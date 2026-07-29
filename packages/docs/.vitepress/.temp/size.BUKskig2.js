import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const size2 = ref("medium");
    const value1 = ref([]);
    const value2 = ref("");
    return {
      size: size2,
      value1,
      value2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio = resolveComponent("h-radio");
  const _component_h_application = resolveComponent("h-application");
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_avatar = resolveComponent("h-avatar");
  const _component_h_button = resolveComponent("h-button");
  const _component_h_checkbox = resolveComponent("h-checkbox");
  const _component_h_checkbox_button = resolveComponent("h-checkbox-button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.size,
                "onUpdate:modelValue": ($event) => _ctx.size = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: "small" }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: "medium" }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: "large" }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio, { label: "small" }),
                      createVNode(_component_h_radio, { label: "medium" }),
                      createVNode(_component_h_radio, { label: "large" })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_radio_group, {
                  modelValue: _ctx.size,
                  "onUpdate:modelValue": ($event) => _ctx.size = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: "small" }),
                    createVNode(_component_h_radio, { label: "medium" }),
                    createVNode(_component_h_radio, { label: "large" })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.size,
                "onUpdate:modelValue": ($event) => _ctx.size = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: "small" }),
                  createVNode(_component_h_radio, { label: "medium" }),
                  createVNode(_component_h_radio, { label: "large" })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
              _push3(ssrRenderComponent(_component_h_application, { size: _ctx.size }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_form, {
                      "label-position": "left",
                      "label-justify-align": "right",
                      "label-vertical-align": "middle"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_form_item, { label: "avatar" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_h_avatar, {
                                  icon: "friend",
                                  type: "work"
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_h_avatar, {
                                    icon: "friend",
                                    type: "work"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_form_item, { label: "button" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_h_button, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Confirm`);
                                    } else {
                                      return [
                                        createTextVNode("Confirm")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_h_button, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Confirm")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_form_item, { label: "checkbox" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_h_checkbox, {
                                  modelValue: _ctx.value2,
                                  "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                                  class: "mr-5"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Confirm`);
                                    } else {
                                      return [
                                        createTextVNode("Confirm")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_h_checkbox_button, {
                                  modelValue: _ctx.value2,
                                  "onUpdate:modelValue": ($event) => _ctx.value2 = $event
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Confirm`);
                                    } else {
                                      return [
                                        createTextVNode("Confirm")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_h_checkbox, {
                                    modelValue: _ctx.value2,
                                    "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                                    class: "mr-5"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Confirm")
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(_component_h_checkbox_button, {
                                    modelValue: _ctx.value2,
                                    "onUpdate:modelValue": ($event) => _ctx.value2 = $event
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Confirm")
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_form_item, { label: "avatar" }, {
                              default: withCtx(() => [
                                createVNode(_component_h_avatar, {
                                  icon: "friend",
                                  type: "work"
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_form_item, { label: "button" }, {
                              default: withCtx(() => [
                                createVNode(_component_h_button, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Confirm")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_form_item, { label: "checkbox" }, {
                              default: withCtx(() => [
                                createVNode(_component_h_checkbox, {
                                  modelValue: _ctx.value2,
                                  "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                                  class: "mr-5"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Confirm")
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_h_checkbox_button, {
                                  modelValue: _ctx.value2,
                                  "onUpdate:modelValue": ($event) => _ctx.value2 = $event
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Confirm")
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode(_component_h_form, {
                        "label-position": "left",
                        "label-justify-align": "right",
                        "label-vertical-align": "middle"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_form_item, { label: "avatar" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_avatar, {
                                icon: "friend",
                                type: "work"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, { label: "button" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_button, null, {
                                default: withCtx(() => [
                                  createTextVNode("Confirm")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, { label: "checkbox" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_checkbox, {
                                modelValue: _ctx.value2,
                                "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                                class: "mr-5"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Confirm")
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_h_checkbox_button, {
                                modelValue: _ctx.value2,
                                "onUpdate:modelValue": ($event) => _ctx.value2 = $event
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Confirm")
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
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
                createVNode(_component_h_application, { size: _ctx.size }, {
                  default: withCtx(() => [
                    createVNode(_component_h_form, {
                      "label-position": "left",
                      "label-justify-align": "right",
                      "label-vertical-align": "middle"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_form_item, { label: "avatar" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_avatar, {
                              icon: "friend",
                              type: "work"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, { label: "button" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_button, null, {
                              default: withCtx(() => [
                                createTextVNode("Confirm")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, { label: "checkbox" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_checkbox, {
                              modelValue: _ctx.value2,
                              "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                              class: "mr-5"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Confirm")
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_h_checkbox_button, {
                              modelValue: _ctx.value2,
                              "onUpdate:modelValue": ($event) => _ctx.value2 = $event
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Confirm")
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["size"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode(_component_h_application, { size: _ctx.size }, {
                default: withCtx(() => [
                  createVNode(_component_h_form, {
                    "label-position": "left",
                    "label-justify-align": "right",
                    "label-vertical-align": "middle"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_form_item, { label: "avatar" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_avatar, {
                            icon: "friend",
                            type: "work"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, { label: "button" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_button, null, {
                            default: withCtx(() => [
                              createTextVNode("Confirm")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, { label: "checkbox" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_checkbox, {
                            modelValue: _ctx.value2,
                            "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                            class: "mr-5"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Confirm")
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_h_checkbox_button, {
                            modelValue: _ctx.value2,
                            "onUpdate:modelValue": ($event) => _ctx.value2 = $event
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Confirm")
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["size"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Application/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  size as default
};
