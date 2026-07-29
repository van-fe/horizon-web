import { defineComponent, ref, resolveComponent, resolveDirective, withCtx, createTextVNode, createVNode, unref, mergeProps, withDirectives, createBlock, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle } from "vue/server-renderer";
import { B as HMenu, _ as __default__ } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "horizontal",
  __ssrInlineRender: true,
  setup(__props) {
    const menuRef = ref(null);
    const theme = ref("default");
    const activeType = ref("link");
    const submenuExpandType = ref("full");
    const selectedValue = ref("3-1-1");
    const onSelected = (value, values) => {
      selectedValue.value = value;
      console.info("selected", value, values);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_container = resolveComponent("h-container");
      const _component_h_header = resolveComponent("h-header");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_popover = resolveComponent("h-popover");
      const _component_h_avatar = resolveComponent("h-avatar");
      const _component_h_pop_content = resolveComponent("h-pop-content");
      const _component_h_menu_item = resolveComponent("h-menu-item");
      const _component_h_sub_menu = resolveComponent("h-sub-menu");
      const _component_h_main = resolveComponent("h-main");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_form, {
                    "label-position": "left",
                    "label-vertical-align": "middle",
                    "label-justify-align": "right",
                    inline: true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_form_item, { label: "theme:" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_radio_group, {
                                modelValue: theme.value,
                                "onUpdate:modelValue": ($event) => theme.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "default" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`default`);
                                        } else {
                                          return [
                                            createTextVNode("default")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "gray" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`gray`);
                                        } else {
                                          return [
                                            createTextVNode("gray")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "midnight" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`midnight`);
                                        } else {
                                          return [
                                            createTextVNode("midnight")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_radio, { label: "default" }, {
                                        default: withCtx(() => [
                                          createTextVNode("default")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_radio, { label: "gray" }, {
                                        default: withCtx(() => [
                                          createTextVNode("gray")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_radio, { label: "midnight" }, {
                                        default: withCtx(() => [
                                          createTextVNode("midnight")
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
                                createVNode(_component_h_radio_group, {
                                  modelValue: theme.value,
                                  "onUpdate:modelValue": ($event) => theme.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_radio, { label: "default" }, {
                                      default: withCtx(() => [
                                        createTextVNode("default")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_radio, { label: "gray" }, {
                                      default: withCtx(() => [
                                        createTextVNode("gray")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_radio, { label: "midnight" }, {
                                      default: withCtx(() => [
                                        createTextVNode("midnight")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, { label: "activeType:" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_radio_group, {
                                modelValue: activeType.value,
                                "onUpdate:modelValue": ($event) => activeType.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "button" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`button`);
                                        } else {
                                          return [
                                            createTextVNode("button")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "link" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`link`);
                                        } else {
                                          return [
                                            createTextVNode("link")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_radio, { label: "button" }, {
                                        default: withCtx(() => [
                                          createTextVNode("button")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_radio, { label: "link" }, {
                                        default: withCtx(() => [
                                          createTextVNode("link")
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
                                createVNode(_component_h_radio_group, {
                                  modelValue: activeType.value,
                                  "onUpdate:modelValue": ($event) => activeType.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_radio, { label: "button" }, {
                                      default: withCtx(() => [
                                        createTextVNode("button")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_radio, { label: "link" }, {
                                      default: withCtx(() => [
                                        createTextVNode("link")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, { label: "submenuExpandType:" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_radio_group, {
                                modelValue: submenuExpandType.value,
                                "onUpdate:modelValue": ($event) => submenuExpandType.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "single" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`single`);
                                        } else {
                                          return [
                                            createTextVNode("single")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "full" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`full`);
                                        } else {
                                          return [
                                            createTextVNode("full")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_radio, { label: "single" }, {
                                        default: withCtx(() => [
                                          createTextVNode("single")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_radio, { label: "full" }, {
                                        default: withCtx(() => [
                                          createTextVNode("full")
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
                                createVNode(_component_h_radio_group, {
                                  modelValue: submenuExpandType.value,
                                  "onUpdate:modelValue": ($event) => submenuExpandType.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_radio, { label: "single" }, {
                                      default: withCtx(() => [
                                        createTextVNode("single")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_radio, { label: "full" }, {
                                      default: withCtx(() => [
                                        createTextVNode("full")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_form_item, { label: "theme:" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio_group, {
                                modelValue: theme.value,
                                "onUpdate:modelValue": ($event) => theme.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_radio, { label: "default" }, {
                                    default: withCtx(() => [
                                      createTextVNode("default")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_radio, { label: "gray" }, {
                                    default: withCtx(() => [
                                      createTextVNode("gray")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_radio, { label: "midnight" }, {
                                    default: withCtx(() => [
                                      createTextVNode("midnight")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, { label: "activeType:" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio_group, {
                                modelValue: activeType.value,
                                "onUpdate:modelValue": ($event) => activeType.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_radio, { label: "button" }, {
                                    default: withCtx(() => [
                                      createTextVNode("button")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_radio, { label: "link" }, {
                                    default: withCtx(() => [
                                      createTextVNode("link")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, { label: "submenuExpandType:" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio_group, {
                                modelValue: submenuExpandType.value,
                                "onUpdate:modelValue": ($event) => submenuExpandType.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_radio, { label: "single" }, {
                                    default: withCtx(() => [
                                      createTextVNode("single")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_radio, { label: "full" }, {
                                    default: withCtx(() => [
                                      createTextVNode("full")
                                    ]),
                                    _: 1
                                  })
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_form, {
                      "label-position": "left",
                      "label-vertical-align": "middle",
                      "label-justify-align": "right",
                      inline: true
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_form_item, { label: "theme:" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_radio_group, {
                              modelValue: theme.value,
                              "onUpdate:modelValue": ($event) => theme.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_radio, { label: "default" }, {
                                  default: withCtx(() => [
                                    createTextVNode("default")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_radio, { label: "gray" }, {
                                  default: withCtx(() => [
                                    createTextVNode("gray")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_radio, { label: "midnight" }, {
                                  default: withCtx(() => [
                                    createTextVNode("midnight")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, { label: "activeType:" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_radio_group, {
                              modelValue: activeType.value,
                              "onUpdate:modelValue": ($event) => activeType.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_radio, { label: "button" }, {
                                  default: withCtx(() => [
                                    createTextVNode("button")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_radio, { label: "link" }, {
                                  default: withCtx(() => [
                                    createTextVNode("link")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, { label: "submenuExpandType:" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_radio_group, {
                              modelValue: submenuExpandType.value,
                              "onUpdate:modelValue": ($event) => submenuExpandType.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_radio, { label: "single" }, {
                                  default: withCtx(() => [
                                    createTextVNode("single")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_radio, { label: "full" }, {
                                  default: withCtx(() => [
                                    createTextVNode("full")
                                  ]),
                                  _: 1
                                })
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_form, {
                    "label-position": "left",
                    "label-vertical-align": "middle",
                    "label-justify-align": "right",
                    inline: true
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_form_item, { label: "theme:" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_radio_group, {
                            modelValue: theme.value,
                            "onUpdate:modelValue": ($event) => theme.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio, { label: "default" }, {
                                default: withCtx(() => [
                                  createTextVNode("default")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_radio, { label: "gray" }, {
                                default: withCtx(() => [
                                  createTextVNode("gray")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_radio, { label: "midnight" }, {
                                default: withCtx(() => [
                                  createTextVNode("midnight")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, { label: "activeType:" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_radio_group, {
                            modelValue: activeType.value,
                            "onUpdate:modelValue": ($event) => activeType.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio, { label: "button" }, {
                                default: withCtx(() => [
                                  createTextVNode("button")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_radio, { label: "link" }, {
                                default: withCtx(() => [
                                  createTextVNode("link")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, { label: "submenuExpandType:" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_radio_group, {
                            modelValue: submenuExpandType.value,
                            "onUpdate:modelValue": ($event) => submenuExpandType.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio, { label: "single" }, {
                                default: withCtx(() => [
                                  createTextVNode("single")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_radio, { label: "full" }, {
                                default: withCtx(() => [
                                  createTextVNode("full")
                                ]),
                                _: 1
                              })
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
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_container, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_header, {
                          height: "auto",
                          style: { "padding": "0" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(HMenu), {
                                ref_key: "menuRef",
                                ref: menuRef,
                                mode: "horizontal",
                                "selected-value": selectedValue.value,
                                theme: theme.value,
                                "active-type": activeType.value,
                                "submenu-expand-type": submenuExpandType.value,
                                "max-width": "1200px",
                                onSelected
                              }, {
                                prepend: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="logo" data-v-3078d9e6${_scopeId5}><div class="img" data-v-3078d9e6${_scopeId5}><svg width="36" height="26" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-3078d9e6${_scopeId5}><path d="M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z" fill="currentColor" data-v-3078d9e6${_scopeId5}></path></svg></div><div class="text" data-v-3078d9e6${_scopeId5}>Aurora</div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "logo" }, [
                                        createVNode("div", { class: "img" }, [
                                          (openBlock(), createBlock("svg", {
                                            width: "36",
                                            height: "26",
                                            viewBox: "0 0 32 29",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg"
                                          }, [
                                            createVNode("path", {
                                              d: "M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z",
                                              fill: "currentColor"
                                            })
                                          ]))
                                        ]),
                                        createVNode("div", { class: "text" }, "Aurora")
                                      ])
                                    ];
                                  }
                                }),
                                append: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_button, mergeProps({
                                      type: "normal",
                                      text: true
                                    }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "提醒")), {
                                      icon: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(__default__), {
                                            name: "notice",
                                            size: "20",
                                            color: theme.value === "midnight" ? "var(--h-text-inverse)" : "var(--h-text-primary)"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(__default__), {
                                              name: "notice",
                                              size: "20",
                                              color: theme.value === "midnight" ? "var(--h-text-inverse)" : "var(--h-text-primary)"
                                            }, null, 8, ["color"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_popover, {
                                      class: "avatar-popover",
                                      placement: "bottom-end"
                                    }, {
                                      reference: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_h_avatar, {
                                            size: "small",
                                            style: { "align-self": "center" }
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_h_avatar, {
                                              size: "small",
                                              style: { "align-self": "center" }
                                            })
                                          ];
                                        }
                                      }),
                                      popper: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_h_pop_content, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="text-body-2 text-center mb-3" style="${ssrRenderStyle({ "color": "var(--h-text-tertiary)" })}" data-v-3078d9e6${_scopeId7}> Dear Demoer, Welcome </div>`);
                                                _push8(ssrRenderComponent(_component_h_button, {
                                                  type: "normal",
                                                  size: "large",
                                                  text: "",
                                                  block: "",
                                                  class: "mb-2"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`修改密码`);
                                                    } else {
                                                      return [
                                                        createTextVNode("修改密码")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_button, {
                                                  type: "normal",
                                                  size: "large",
                                                  text: "",
                                                  block: ""
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`退出登录`);
                                                    } else {
                                                      return [
                                                        createTextVNode("退出登录")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode("div", {
                                                    class: "text-body-2 text-center mb-3",
                                                    style: { "color": "var(--h-text-tertiary)" }
                                                  }, " Dear Demoer, Welcome "),
                                                  createVNode(_component_h_button, {
                                                    type: "normal",
                                                    size: "large",
                                                    text: "",
                                                    block: "",
                                                    class: "mb-2"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("修改密码")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_button, {
                                                    type: "normal",
                                                    size: "large",
                                                    text: "",
                                                    block: ""
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("退出登录")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_h_pop_content, null, {
                                              default: withCtx(() => [
                                                createVNode("div", {
                                                  class: "text-body-2 text-center mb-3",
                                                  style: { "color": "var(--h-text-tertiary)" }
                                                }, " Dear Demoer, Welcome "),
                                                createVNode(_component_h_button, {
                                                  type: "normal",
                                                  size: "large",
                                                  text: "",
                                                  block: "",
                                                  class: "mb-2"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("修改密码")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_button, {
                                                  type: "normal",
                                                  size: "large",
                                                  text: "",
                                                  block: ""
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("退出登录")
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      withDirectives((openBlock(), createBlock(_component_h_button, {
                                        type: "normal",
                                        text: true
                                      }, {
                                        icon: withCtx(() => [
                                          createVNode(unref(__default__), {
                                            name: "notice",
                                            size: "20",
                                            color: theme.value === "midnight" ? "var(--h-text-inverse)" : "var(--h-text-primary)"
                                          }, null, 8, ["color"])
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_tooltip, "提醒"]
                                      ]),
                                      createVNode(_component_h_popover, {
                                        class: "avatar-popover",
                                        placement: "bottom-end"
                                      }, {
                                        reference: withCtx(() => [
                                          createVNode(_component_h_avatar, {
                                            size: "small",
                                            style: { "align-self": "center" }
                                          })
                                        ]),
                                        popper: withCtx(() => [
                                          createVNode(_component_h_pop_content, null, {
                                            default: withCtx(() => [
                                              createVNode("div", {
                                                class: "text-body-2 text-center mb-3",
                                                style: { "color": "var(--h-text-tertiary)" }
                                              }, " Dear Demoer, Welcome "),
                                              createVNode(_component_h_button, {
                                                type: "normal",
                                                size: "large",
                                                text: "",
                                                block: "",
                                                class: "mb-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("修改密码")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_button, {
                                                type: "normal",
                                                size: "large",
                                                text: "",
                                                block: ""
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("退出登录")
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
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_menu_item, { value: "1" }, {
                                      title: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`一级菜单 1`);
                                        } else {
                                          return [
                                            createTextVNode("一级菜单 1")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_sub_menu, { value: "2" }, {
                                      title: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`一级菜单 2`);
                                        } else {
                                          return [
                                            createTextVNode("一级菜单 2")
                                          ];
                                        }
                                      }),
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_h_sub_menu, { value: "2-1" }, {
                                            title: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`二级菜单 1`);
                                              } else {
                                                return [
                                                  createTextVNode("二级菜单 1")
                                                ];
                                              }
                                            }),
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "2-1-1" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 1`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 1")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "2-1-2" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 2`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 2")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "2-1-3" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 3`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 3")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "2-1-4" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 4`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 4")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_h_menu_item, { value: "2-1-1" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 1")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "2-1-2" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 2")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "2-1-3" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 3")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "2-1-4" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 4")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_h_sub_menu, { value: "2-2" }, {
                                            title: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`二级菜单 2`);
                                              } else {
                                                return [
                                                  createTextVNode("二级菜单 2")
                                                ];
                                              }
                                            }),
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "2-2-1" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 1`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 1")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "2-2-2" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 2`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 2")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "2-2-3" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 3`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 3")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "2-2-4" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_h_menu_item, { value: "2-2-1" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 1")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "2-2-2" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 2")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "2-2-3" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 3")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "2-2-4" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_h_sub_menu, { value: "2-1" }, {
                                              title: withCtx(() => [
                                                createTextVNode("二级菜单 1")
                                              ]),
                                              default: withCtx(() => [
                                                createVNode(_component_h_menu_item, { value: "2-1-1" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 1")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "2-1-2" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 2")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "2-1-3" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 3")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "2-1-4" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 4")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_sub_menu, { value: "2-2" }, {
                                              title: withCtx(() => [
                                                createTextVNode("二级菜单 2")
                                              ]),
                                              default: withCtx(() => [
                                                createVNode(_component_h_menu_item, { value: "2-2-1" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 1")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "2-2-2" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 2")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "2-2-3" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 3")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "2-2-4" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4")
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
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_sub_menu, {
                                      value: "3",
                                      selectable: true
                                    }, {
                                      title: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容`);
                                        } else {
                                          return [
                                            createTextVNode("一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容")
                                          ];
                                        }
                                      }),
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_h_sub_menu, { value: "3-1" }, {
                                            title: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`二级菜单 1`);
                                              } else {
                                                return [
                                                  createTextVNode("二级菜单 1")
                                                ];
                                              }
                                            }),
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_h_menu_item, {
                                                  value: "3-1-1",
                                                  disabled: "",
                                                  icon: "calendar"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 1`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 1")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "3-1-2" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 2`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 2")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "3-1-3" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 3`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 3")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "3-1-4" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 4`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 4")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_h_menu_item, {
                                                    value: "3-1-1",
                                                    disabled: "",
                                                    icon: "calendar"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 1")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "3-1-2" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 2")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "3-1-3" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 3")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "3-1-4" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 4")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_h_sub_menu, { value: "3-2" }, {
                                            title: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`二级菜单 2`);
                                              } else {
                                                return [
                                                  createTextVNode("二级菜单 2")
                                                ];
                                              }
                                            }),
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "3-2-1" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "3-2-2" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 2`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 2")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "3-2-3" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 3`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 3")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "3-2-4" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 4`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 4")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_h_menu_item, { value: "3-2-1" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "3-2-2" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 2")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "3-2-3" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 3")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "3-2-4" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 4")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_h_sub_menu, {
                                            value: "3-3",
                                            selectable: true
                                          }, {
                                            title: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`二级菜单 3`);
                                              } else {
                                                return [
                                                  createTextVNode("二级菜单 3")
                                                ];
                                              }
                                            }),
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_h_menu_item, { value: "3-3-1" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 1`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 1")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_h_sub_menu, { value: "3-3-2" }, {
                                                  title: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`三级菜单 2`);
                                                    } else {
                                                      return [
                                                        createTextVNode("三级菜单 2")
                                                      ];
                                                    }
                                                  }),
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(_component_h_menu_item, { value: "3-3-2-1" }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(`四级菜单 1`);
                                                          } else {
                                                            return [
                                                              createTextVNode("四级菜单 1")
                                                            ];
                                                          }
                                                        }),
                                                        _: 1
                                                      }, _parent9, _scopeId8));
                                                      _push9(ssrRenderComponent(_component_h_menu_item, { value: "3-3-2-2" }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(`四级菜单 2`);
                                                          } else {
                                                            return [
                                                              createTextVNode("四级菜单 2")
                                                            ];
                                                          }
                                                        }),
                                                        _: 1
                                                      }, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(_component_h_menu_item, { value: "3-3-2-1" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("四级菜单 1")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(_component_h_menu_item, { value: "3-3-2-2" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("四级菜单 2")
                                                          ]),
                                                          _: 1
                                                        })
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_h_menu_item, { value: "3-3-1" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("三级菜单 1")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_sub_menu, { value: "3-3-2" }, {
                                                    title: withCtx(() => [
                                                      createTextVNode("三级菜单 2")
                                                    ]),
                                                    default: withCtx(() => [
                                                      createVNode(_component_h_menu_item, { value: "3-3-2-1" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("四级菜单 1")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(_component_h_menu_item, { value: "3-3-2-2" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("四级菜单 2")
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
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_h_sub_menu, { value: "3-1" }, {
                                              title: withCtx(() => [
                                                createTextVNode("二级菜单 1")
                                              ]),
                                              default: withCtx(() => [
                                                createVNode(_component_h_menu_item, {
                                                  value: "3-1-1",
                                                  disabled: "",
                                                  icon: "calendar"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 1")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "3-1-2" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 2")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "3-1-3" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 3")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "3-1-4" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 4")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_sub_menu, { value: "3-2" }, {
                                              title: withCtx(() => [
                                                createTextVNode("二级菜单 2")
                                              ]),
                                              default: withCtx(() => [
                                                createVNode(_component_h_menu_item, { value: "3-2-1" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "3-2-2" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 2")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "3-2-3" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 3")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "3-2-4" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 4")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_sub_menu, {
                                              value: "3-3",
                                              selectable: true
                                            }, {
                                              title: withCtx(() => [
                                                createTextVNode("二级菜单 3")
                                              ]),
                                              default: withCtx(() => [
                                                createVNode(_component_h_menu_item, { value: "3-3-1" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("三级菜单 1")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_sub_menu, { value: "3-3-2" }, {
                                                  title: withCtx(() => [
                                                    createTextVNode("三级菜单 2")
                                                  ]),
                                                  default: withCtx(() => [
                                                    createVNode(_component_h_menu_item, { value: "3-3-2-1" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("四级菜单 1")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_h_menu_item, { value: "3-3-2-2" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("四级菜单 2")
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
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_menu_item, { value: "4" }, {
                                      title: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`一级菜单 4`);
                                        } else {
                                          return [
                                            createTextVNode("一级菜单 4")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_menu_item, { value: "5" }, {
                                      title: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`一级菜单 5`);
                                        } else {
                                          return [
                                            createTextVNode("一级菜单 5")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_menu_item, { value: "6" }, {
                                      title: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`一级菜单 6`);
                                        } else {
                                          return [
                                            createTextVNode("一级菜单 6")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_menu_item, { value: "1" }, {
                                        title: withCtx(() => [
                                          createTextVNode("一级菜单 1")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_sub_menu, { value: "2" }, {
                                        title: withCtx(() => [
                                          createTextVNode("一级菜单 2")
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_h_sub_menu, { value: "2-1" }, {
                                            title: withCtx(() => [
                                              createTextVNode("二级菜单 1")
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_h_menu_item, { value: "2-1-1" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 1")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "2-1-2" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 2")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "2-1-3" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 3")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "2-1-4" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 4")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_sub_menu, { value: "2-2" }, {
                                            title: withCtx(() => [
                                              createTextVNode("二级菜单 2")
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_h_menu_item, { value: "2-2-1" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 1")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "2-2-2" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 2")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "2-2-3" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 3")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "2-2-4" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_sub_menu, {
                                        value: "3",
                                        selectable: true
                                      }, {
                                        title: withCtx(() => [
                                          createTextVNode("一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容")
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_h_sub_menu, { value: "3-1" }, {
                                            title: withCtx(() => [
                                              createTextVNode("二级菜单 1")
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_h_menu_item, {
                                                value: "3-1-1",
                                                disabled: "",
                                                icon: "calendar"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 1")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "3-1-2" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 2")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "3-1-3" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 3")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "3-1-4" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 4")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_sub_menu, { value: "3-2" }, {
                                            title: withCtx(() => [
                                              createTextVNode("二级菜单 2")
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_h_menu_item, { value: "3-2-1" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "3-2-2" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 2")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "3-2-3" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 3")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "3-2-4" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 4")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_sub_menu, {
                                            value: "3-3",
                                            selectable: true
                                          }, {
                                            title: withCtx(() => [
                                              createTextVNode("二级菜单 3")
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_h_menu_item, { value: "3-3-1" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("三级菜单 1")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_sub_menu, { value: "3-3-2" }, {
                                                title: withCtx(() => [
                                                  createTextVNode("三级菜单 2")
                                                ]),
                                                default: withCtx(() => [
                                                  createVNode(_component_h_menu_item, { value: "3-3-2-1" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("四级菜单 1")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_h_menu_item, { value: "3-3-2-2" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("四级菜单 2")
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
                                      createVNode(_component_h_menu_item, { value: "4" }, {
                                        title: withCtx(() => [
                                          createTextVNode("一级菜单 4")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "5" }, {
                                        title: withCtx(() => [
                                          createTextVNode("一级菜单 5")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "6" }, {
                                        title: withCtx(() => [
                                          createTextVNode("一级菜单 6")
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
                                createVNode(unref(HMenu), {
                                  ref_key: "menuRef",
                                  ref: menuRef,
                                  mode: "horizontal",
                                  "selected-value": selectedValue.value,
                                  theme: theme.value,
                                  "active-type": activeType.value,
                                  "submenu-expand-type": submenuExpandType.value,
                                  "max-width": "1200px",
                                  onSelected
                                }, {
                                  prepend: withCtx(() => [
                                    createVNode("div", { class: "logo" }, [
                                      createVNode("div", { class: "img" }, [
                                        (openBlock(), createBlock("svg", {
                                          width: "36",
                                          height: "26",
                                          viewBox: "0 0 32 29",
                                          fill: "none",
                                          xmlns: "http://www.w3.org/2000/svg"
                                        }, [
                                          createVNode("path", {
                                            d: "M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z",
                                            fill: "currentColor"
                                          })
                                        ]))
                                      ]),
                                      createVNode("div", { class: "text" }, "Aurora")
                                    ])
                                  ]),
                                  append: withCtx(() => [
                                    withDirectives((openBlock(), createBlock(_component_h_button, {
                                      type: "normal",
                                      text: true
                                    }, {
                                      icon: withCtx(() => [
                                        createVNode(unref(__default__), {
                                          name: "notice",
                                          size: "20",
                                          color: theme.value === "midnight" ? "var(--h-text-inverse)" : "var(--h-text-primary)"
                                        }, null, 8, ["color"])
                                      ]),
                                      _: 1
                                    })), [
                                      [_directive_tooltip, "提醒"]
                                    ]),
                                    createVNode(_component_h_popover, {
                                      class: "avatar-popover",
                                      placement: "bottom-end"
                                    }, {
                                      reference: withCtx(() => [
                                        createVNode(_component_h_avatar, {
                                          size: "small",
                                          style: { "align-self": "center" }
                                        })
                                      ]),
                                      popper: withCtx(() => [
                                        createVNode(_component_h_pop_content, null, {
                                          default: withCtx(() => [
                                            createVNode("div", {
                                              class: "text-body-2 text-center mb-3",
                                              style: { "color": "var(--h-text-tertiary)" }
                                            }, " Dear Demoer, Welcome "),
                                            createVNode(_component_h_button, {
                                              type: "normal",
                                              size: "large",
                                              text: "",
                                              block: "",
                                              class: "mb-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("修改密码")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_button, {
                                              type: "normal",
                                              size: "large",
                                              text: "",
                                              block: ""
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("退出登录")
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
                                  default: withCtx(() => [
                                    createVNode(_component_h_menu_item, { value: "1" }, {
                                      title: withCtx(() => [
                                        createTextVNode("一级菜单 1")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_sub_menu, { value: "2" }, {
                                      title: withCtx(() => [
                                        createTextVNode("一级菜单 2")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_h_sub_menu, { value: "2-1" }, {
                                          title: withCtx(() => [
                                            createTextVNode("二级菜单 1")
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_h_menu_item, { value: "2-1-1" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 1")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "2-1-2" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 2")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "2-1-3" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 3")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "2-1-4" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 4")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_sub_menu, { value: "2-2" }, {
                                          title: withCtx(() => [
                                            createTextVNode("二级菜单 2")
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_h_menu_item, { value: "2-2-1" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 1")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "2-2-2" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 2")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "2-2-3" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 3")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "2-2-4" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_sub_menu, {
                                      value: "3",
                                      selectable: true
                                    }, {
                                      title: withCtx(() => [
                                        createTextVNode("一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_h_sub_menu, { value: "3-1" }, {
                                          title: withCtx(() => [
                                            createTextVNode("二级菜单 1")
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_h_menu_item, {
                                              value: "3-1-1",
                                              disabled: "",
                                              icon: "calendar"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 1")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "3-1-2" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 2")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "3-1-3" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 3")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "3-1-4" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 4")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_sub_menu, { value: "3-2" }, {
                                          title: withCtx(() => [
                                            createTextVNode("二级菜单 2")
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_h_menu_item, { value: "3-2-1" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "3-2-2" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 2")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "3-2-3" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 3")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "3-2-4" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 4")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_sub_menu, {
                                          value: "3-3",
                                          selectable: true
                                        }, {
                                          title: withCtx(() => [
                                            createTextVNode("二级菜单 3")
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_h_menu_item, { value: "3-3-1" }, {
                                              default: withCtx(() => [
                                                createTextVNode("三级菜单 1")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_sub_menu, { value: "3-3-2" }, {
                                              title: withCtx(() => [
                                                createTextVNode("三级菜单 2")
                                              ]),
                                              default: withCtx(() => [
                                                createVNode(_component_h_menu_item, { value: "3-3-2-1" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("四级菜单 1")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_h_menu_item, { value: "3-3-2-2" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("四级菜单 2")
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
                                    createVNode(_component_h_menu_item, { value: "4" }, {
                                      title: withCtx(() => [
                                        createTextVNode("一级菜单 4")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_menu_item, { value: "5" }, {
                                      title: withCtx(() => [
                                        createTextVNode("一级菜单 5")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_menu_item, { value: "6" }, {
                                      title: withCtx(() => [
                                        createTextVNode("一级菜单 6")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["selected-value", "theme", "active-type", "submenu-expand-type"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_main, { style: { "background": "var(--h-bg-info-weak-hover)", "min-height": "500px" } }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_header, {
                            height: "auto",
                            style: { "padding": "0" }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(HMenu), {
                                ref_key: "menuRef",
                                ref: menuRef,
                                mode: "horizontal",
                                "selected-value": selectedValue.value,
                                theme: theme.value,
                                "active-type": activeType.value,
                                "submenu-expand-type": submenuExpandType.value,
                                "max-width": "1200px",
                                onSelected
                              }, {
                                prepend: withCtx(() => [
                                  createVNode("div", { class: "logo" }, [
                                    createVNode("div", { class: "img" }, [
                                      (openBlock(), createBlock("svg", {
                                        width: "36",
                                        height: "26",
                                        viewBox: "0 0 32 29",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg"
                                      }, [
                                        createVNode("path", {
                                          d: "M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z",
                                          fill: "currentColor"
                                        })
                                      ]))
                                    ]),
                                    createVNode("div", { class: "text" }, "Aurora")
                                  ])
                                ]),
                                append: withCtx(() => [
                                  withDirectives((openBlock(), createBlock(_component_h_button, {
                                    type: "normal",
                                    text: true
                                  }, {
                                    icon: withCtx(() => [
                                      createVNode(unref(__default__), {
                                        name: "notice",
                                        size: "20",
                                        color: theme.value === "midnight" ? "var(--h-text-inverse)" : "var(--h-text-primary)"
                                      }, null, 8, ["color"])
                                    ]),
                                    _: 1
                                  })), [
                                    [_directive_tooltip, "提醒"]
                                  ]),
                                  createVNode(_component_h_popover, {
                                    class: "avatar-popover",
                                    placement: "bottom-end"
                                  }, {
                                    reference: withCtx(() => [
                                      createVNode(_component_h_avatar, {
                                        size: "small",
                                        style: { "align-self": "center" }
                                      })
                                    ]),
                                    popper: withCtx(() => [
                                      createVNode(_component_h_pop_content, null, {
                                        default: withCtx(() => [
                                          createVNode("div", {
                                            class: "text-body-2 text-center mb-3",
                                            style: { "color": "var(--h-text-tertiary)" }
                                          }, " Dear Demoer, Welcome "),
                                          createVNode(_component_h_button, {
                                            type: "normal",
                                            size: "large",
                                            text: "",
                                            block: "",
                                            class: "mb-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("修改密码")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_button, {
                                            type: "normal",
                                            size: "large",
                                            text: "",
                                            block: ""
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("退出登录")
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
                                default: withCtx(() => [
                                  createVNode(_component_h_menu_item, { value: "1" }, {
                                    title: withCtx(() => [
                                      createTextVNode("一级菜单 1")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_sub_menu, { value: "2" }, {
                                    title: withCtx(() => [
                                      createTextVNode("一级菜单 2")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_h_sub_menu, { value: "2-1" }, {
                                        title: withCtx(() => [
                                          createTextVNode("二级菜单 1")
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_h_menu_item, { value: "2-1-1" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 1")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "2-1-2" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 2")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "2-1-3" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 3")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "2-1-4" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 4")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_sub_menu, { value: "2-2" }, {
                                        title: withCtx(() => [
                                          createTextVNode("二级菜单 2")
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_h_menu_item, { value: "2-2-1" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 1")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "2-2-2" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 2")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "2-2-3" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 3")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "2-2-4" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_sub_menu, {
                                    value: "3",
                                    selectable: true
                                  }, {
                                    title: withCtx(() => [
                                      createTextVNode("一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_h_sub_menu, { value: "3-1" }, {
                                        title: withCtx(() => [
                                          createTextVNode("二级菜单 1")
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_h_menu_item, {
                                            value: "3-1-1",
                                            disabled: "",
                                            icon: "calendar"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 1")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "3-1-2" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 2")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "3-1-3" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 3")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "3-1-4" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 4")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_sub_menu, { value: "3-2" }, {
                                        title: withCtx(() => [
                                          createTextVNode("二级菜单 2")
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_h_menu_item, { value: "3-2-1" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "3-2-2" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 2")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "3-2-3" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 3")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "3-2-4" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 4")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_sub_menu, {
                                        value: "3-3",
                                        selectable: true
                                      }, {
                                        title: withCtx(() => [
                                          createTextVNode("二级菜单 3")
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_h_menu_item, { value: "3-3-1" }, {
                                            default: withCtx(() => [
                                              createTextVNode("三级菜单 1")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_sub_menu, { value: "3-3-2" }, {
                                            title: withCtx(() => [
                                              createTextVNode("三级菜单 2")
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_h_menu_item, { value: "3-3-2-1" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("四级菜单 1")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_h_menu_item, { value: "3-3-2-2" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("四级菜单 2")
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
                                  createVNode(_component_h_menu_item, { value: "4" }, {
                                    title: withCtx(() => [
                                      createTextVNode("一级菜单 4")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_menu_item, { value: "5" }, {
                                    title: withCtx(() => [
                                      createTextVNode("一级菜单 5")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_menu_item, { value: "6" }, {
                                    title: withCtx(() => [
                                      createTextVNode("一级菜单 6")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["selected-value", "theme", "active-type", "submenu-expand-type"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_main, { style: { "background": "var(--h-bg-info-weak-hover)", "min-height": "500px" } })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_container, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_header, {
                          height: "auto",
                          style: { "padding": "0" }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(HMenu), {
                              ref_key: "menuRef",
                              ref: menuRef,
                              mode: "horizontal",
                              "selected-value": selectedValue.value,
                              theme: theme.value,
                              "active-type": activeType.value,
                              "submenu-expand-type": submenuExpandType.value,
                              "max-width": "1200px",
                              onSelected
                            }, {
                              prepend: withCtx(() => [
                                createVNode("div", { class: "logo" }, [
                                  createVNode("div", { class: "img" }, [
                                    (openBlock(), createBlock("svg", {
                                      width: "36",
                                      height: "26",
                                      viewBox: "0 0 32 29",
                                      fill: "none",
                                      xmlns: "http://www.w3.org/2000/svg"
                                    }, [
                                      createVNode("path", {
                                        d: "M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z",
                                        fill: "currentColor"
                                      })
                                    ]))
                                  ]),
                                  createVNode("div", { class: "text" }, "Aurora")
                                ])
                              ]),
                              append: withCtx(() => [
                                withDirectives((openBlock(), createBlock(_component_h_button, {
                                  type: "normal",
                                  text: true
                                }, {
                                  icon: withCtx(() => [
                                    createVNode(unref(__default__), {
                                      name: "notice",
                                      size: "20",
                                      color: theme.value === "midnight" ? "var(--h-text-inverse)" : "var(--h-text-primary)"
                                    }, null, 8, ["color"])
                                  ]),
                                  _: 1
                                })), [
                                  [_directive_tooltip, "提醒"]
                                ]),
                                createVNode(_component_h_popover, {
                                  class: "avatar-popover",
                                  placement: "bottom-end"
                                }, {
                                  reference: withCtx(() => [
                                    createVNode(_component_h_avatar, {
                                      size: "small",
                                      style: { "align-self": "center" }
                                    })
                                  ]),
                                  popper: withCtx(() => [
                                    createVNode(_component_h_pop_content, null, {
                                      default: withCtx(() => [
                                        createVNode("div", {
                                          class: "text-body-2 text-center mb-3",
                                          style: { "color": "var(--h-text-tertiary)" }
                                        }, " Dear Demoer, Welcome "),
                                        createVNode(_component_h_button, {
                                          type: "normal",
                                          size: "large",
                                          text: "",
                                          block: "",
                                          class: "mb-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("修改密码")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_button, {
                                          type: "normal",
                                          size: "large",
                                          text: "",
                                          block: ""
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("退出登录")
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
                              default: withCtx(() => [
                                createVNode(_component_h_menu_item, { value: "1" }, {
                                  title: withCtx(() => [
                                    createTextVNode("一级菜单 1")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_sub_menu, { value: "2" }, {
                                  title: withCtx(() => [
                                    createTextVNode("一级菜单 2")
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_component_h_sub_menu, { value: "2-1" }, {
                                      title: withCtx(() => [
                                        createTextVNode("二级菜单 1")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_h_menu_item, { value: "2-1-1" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 1")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "2-1-2" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 2")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "2-1-3" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 3")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "2-1-4" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 4")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_sub_menu, { value: "2-2" }, {
                                      title: withCtx(() => [
                                        createTextVNode("二级菜单 2")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_h_menu_item, { value: "2-2-1" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 1")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "2-2-2" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 2")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "2-2-3" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 3")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "2-2-4" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_sub_menu, {
                                  value: "3",
                                  selectable: true
                                }, {
                                  title: withCtx(() => [
                                    createTextVNode("一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容")
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_component_h_sub_menu, { value: "3-1" }, {
                                      title: withCtx(() => [
                                        createTextVNode("二级菜单 1")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_h_menu_item, {
                                          value: "3-1-1",
                                          disabled: "",
                                          icon: "calendar"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 1")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "3-1-2" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 2")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "3-1-3" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 3")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "3-1-4" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 4")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_sub_menu, { value: "3-2" }, {
                                      title: withCtx(() => [
                                        createTextVNode("二级菜单 2")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_h_menu_item, { value: "3-2-1" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "3-2-2" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 2")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "3-2-3" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 3")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_menu_item, { value: "3-2-4" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 4")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_sub_menu, {
                                      value: "3-3",
                                      selectable: true
                                    }, {
                                      title: withCtx(() => [
                                        createTextVNode("二级菜单 3")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_h_menu_item, { value: "3-3-1" }, {
                                          default: withCtx(() => [
                                            createTextVNode("三级菜单 1")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_h_sub_menu, { value: "3-3-2" }, {
                                          title: withCtx(() => [
                                            createTextVNode("三级菜单 2")
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_h_menu_item, { value: "3-3-2-1" }, {
                                              default: withCtx(() => [
                                                createTextVNode("四级菜单 1")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_h_menu_item, { value: "3-3-2-2" }, {
                                              default: withCtx(() => [
                                                createTextVNode("四级菜单 2")
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
                                createVNode(_component_h_menu_item, { value: "4" }, {
                                  title: withCtx(() => [
                                    createTextVNode("一级菜单 4")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_menu_item, { value: "5" }, {
                                  title: withCtx(() => [
                                    createTextVNode("一级菜单 5")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_menu_item, { value: "6" }, {
                                  title: withCtx(() => [
                                    createTextVNode("一级菜单 6")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["selected-value", "theme", "active-type", "submenu-expand-type"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_main, { style: { "background": "var(--h-bg-info-weak-hover)", "min-height": "500px" } })
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
                  createVNode(_component_h_container, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_header, {
                        height: "auto",
                        style: { "padding": "0" }
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(HMenu), {
                            ref_key: "menuRef",
                            ref: menuRef,
                            mode: "horizontal",
                            "selected-value": selectedValue.value,
                            theme: theme.value,
                            "active-type": activeType.value,
                            "submenu-expand-type": submenuExpandType.value,
                            "max-width": "1200px",
                            onSelected
                          }, {
                            prepend: withCtx(() => [
                              createVNode("div", { class: "logo" }, [
                                createVNode("div", { class: "img" }, [
                                  (openBlock(), createBlock("svg", {
                                    width: "36",
                                    height: "26",
                                    viewBox: "0 0 32 29",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg"
                                  }, [
                                    createVNode("path", {
                                      d: "M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z",
                                      fill: "currentColor"
                                    })
                                  ]))
                                ]),
                                createVNode("div", { class: "text" }, "Aurora")
                              ])
                            ]),
                            append: withCtx(() => [
                              withDirectives((openBlock(), createBlock(_component_h_button, {
                                type: "normal",
                                text: true
                              }, {
                                icon: withCtx(() => [
                                  createVNode(unref(__default__), {
                                    name: "notice",
                                    size: "20",
                                    color: theme.value === "midnight" ? "var(--h-text-inverse)" : "var(--h-text-primary)"
                                  }, null, 8, ["color"])
                                ]),
                                _: 1
                              })), [
                                [_directive_tooltip, "提醒"]
                              ]),
                              createVNode(_component_h_popover, {
                                class: "avatar-popover",
                                placement: "bottom-end"
                              }, {
                                reference: withCtx(() => [
                                  createVNode(_component_h_avatar, {
                                    size: "small",
                                    style: { "align-self": "center" }
                                  })
                                ]),
                                popper: withCtx(() => [
                                  createVNode(_component_h_pop_content, null, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: "text-body-2 text-center mb-3",
                                        style: { "color": "var(--h-text-tertiary)" }
                                      }, " Dear Demoer, Welcome "),
                                      createVNode(_component_h_button, {
                                        type: "normal",
                                        size: "large",
                                        text: "",
                                        block: "",
                                        class: "mb-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("修改密码")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_button, {
                                        type: "normal",
                                        size: "large",
                                        text: "",
                                        block: ""
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("退出登录")
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
                            default: withCtx(() => [
                              createVNode(_component_h_menu_item, { value: "1" }, {
                                title: withCtx(() => [
                                  createTextVNode("一级菜单 1")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_sub_menu, { value: "2" }, {
                                title: withCtx(() => [
                                  createTextVNode("一级菜单 2")
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_h_sub_menu, { value: "2-1" }, {
                                    title: withCtx(() => [
                                      createTextVNode("二级菜单 1")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_h_menu_item, { value: "2-1-1" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 1")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "2-1-2" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 2")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "2-1-3" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 3")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "2-1-4" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 4")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_sub_menu, { value: "2-2" }, {
                                    title: withCtx(() => [
                                      createTextVNode("二级菜单 2")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_h_menu_item, { value: "2-2-1" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 1")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "2-2-2" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 2")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "2-2-3" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 3")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "2-2-4" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_sub_menu, {
                                value: "3",
                                selectable: true
                              }, {
                                title: withCtx(() => [
                                  createTextVNode("一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容")
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_h_sub_menu, { value: "3-1" }, {
                                    title: withCtx(() => [
                                      createTextVNode("二级菜单 1")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_h_menu_item, {
                                        value: "3-1-1",
                                        disabled: "",
                                        icon: "calendar"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 1")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "3-1-2" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 2")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "3-1-3" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 3")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "3-1-4" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 4")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_sub_menu, { value: "3-2" }, {
                                    title: withCtx(() => [
                                      createTextVNode("二级菜单 2")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_h_menu_item, { value: "3-2-1" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "3-2-2" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 2")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "3-2-3" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 3")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_menu_item, { value: "3-2-4" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 4")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_sub_menu, {
                                    value: "3-3",
                                    selectable: true
                                  }, {
                                    title: withCtx(() => [
                                      createTextVNode("二级菜单 3")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_h_menu_item, { value: "3-3-1" }, {
                                        default: withCtx(() => [
                                          createTextVNode("三级菜单 1")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_sub_menu, { value: "3-3-2" }, {
                                        title: withCtx(() => [
                                          createTextVNode("三级菜单 2")
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_h_menu_item, { value: "3-3-2-1" }, {
                                            default: withCtx(() => [
                                              createTextVNode("四级菜单 1")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_h_menu_item, { value: "3-3-2-2" }, {
                                            default: withCtx(() => [
                                              createTextVNode("四级菜单 2")
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
                              createVNode(_component_h_menu_item, { value: "4" }, {
                                title: withCtx(() => [
                                  createTextVNode("一级菜单 4")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_menu_item, { value: "5" }, {
                                title: withCtx(() => [
                                  createTextVNode("一级菜单 5")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_menu_item, { value: "6" }, {
                                title: withCtx(() => [
                                  createTextVNode("一级菜单 6")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["selected-value", "theme", "active-type", "submenu-expand-type"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_main, { style: { "background": "var(--h-bg-info-weak-hover)", "min-height": "500px" } })
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Menu/horizontal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const horizontal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3078d9e6"]]);
export {
  horizontal as default
};
