import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { $ as $message } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const displayType = ref("show");
    const formRef = ref(null);
    const formData = ref({
      username: "",
      email: "",
      gender: null,
      notes: ""
    });
    const emailRules = ref([
      {
        required: true,
        message: "Email is required!"
      },
      {
        type: "email",
        message: "Email format invalid!"
      },
      {
        validator(rule, value) {
          if (!value.endsWith("@gmail.com")) {
            return new Error("Only support gmail!");
          }
          return true;
        }
      }
    ]);
    const visible = ref(false);
    const onPrimary = () => {
      console.info("Primary button clicked!");
      if (formRef.value) {
        formRef.value.validate().then(() => {
          $message.success("Submit");
          visible.value = false;
        }).catch((errors) => {
          console.info("errors:", errors);
        });
      }
    };
    const onSecondary = () => {
      console.info("Secondary button clicked!");
    };
    const currentTab = ref("tab1");
    return {
      formRef,
      formData,
      emailRules,
      visible,
      onPrimary,
      onSecondary,
      currentTab,
      displayType
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio = resolveComponent("h-radio");
  const _component_h_button = resolveComponent("h-button");
  const _component_h_dialog = resolveComponent("h-dialog");
  const _component_h_tabs = resolveComponent("h-tabs");
  const _component_h_tab = resolveComponent("h-tab");
  const _component_h_panels = resolveComponent("h-panels");
  const _component_h_panel = resolveComponent("h-panel");
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_input = resolveComponent("h-input");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  _push(`<!--[--><div class="mb-2">`);
  _push(ssrRenderComponent(_component_h_radio_group, {
    modelValue: _ctx.displayType,
    "onUpdate:modelValue": ($event) => _ctx.displayType = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_radio, { label: "show" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`show`);
            } else {
              return [
                createTextVNode("show")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_radio, { label: "if" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`if`);
            } else {
              return [
                createTextVNode("if")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_radio, { label: "show" }, {
            default: withCtx(() => [
              createTextVNode("show")
            ]),
            _: 1
          }),
          createVNode(_component_h_radio, { label: "if" }, {
            default: withCtx(() => [
              createTextVNode("if")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_h_button, {
    onClick: ($event) => _ctx.visible = true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`点我`);
      } else {
        return [
          createTextVNode("点我")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.visible,
    "onUpdate:modelValue": ($event) => _ctx.visible = $event,
    title: "标题",
    "display-type": _ctx.displayType,
    onPrimaryClick: _ctx.onPrimary,
    onSecondaryClick: _ctx.onSecondary
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_h_tabs, {
          modelValue: _ctx.currentTab,
          "onUpdate:modelValue": ($event) => _ctx.currentTab = $event
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_tab, {
                name: "tab1",
                label: "Tab1"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tab, {
                name: "tab2",
                label: "Tab2"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_tab, {
                  name: "tab1",
                  label: "Tab1"
                }),
                createVNode(_component_h_tab, {
                  name: "tab2",
                  label: "Tab2"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_panels, {
          modelValue: _ctx.currentTab,
          "onUpdate:modelValue": ($event) => _ctx.currentTab = $event
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_panel, { name: "tab1" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_form, {
                      ref: "formRef",
                      model: _ctx.formData
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_form_item, {
                            label: "User name",
                            prop: "username",
                            rules: [
                              {
                                required: true,
                                message: "User name is required!"
                              },
                              {
                                min: 3,
                                max: 100,
                                message: "User name should be 3 to 100."
                              }
                            ]
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_h_input, {
                                  modelValue: _ctx.formData.username,
                                  "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_h_input, {
                                    modelValue: _ctx.formData.username,
                                    "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_form_item, {
                            label: "Email",
                            prop: "email",
                            rules: _ctx.emailRules
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_h_input, {
                                  modelValue: _ctx.formData.email,
                                  "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_h_input, {
                                    modelValue: _ctx.formData.email,
                                    "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_form_item, {
                            label: "Gender",
                            prop: "gender",
                            required: ""
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_h_select, {
                                  modelValue: _ctx.formData.gender,
                                  "onUpdate:modelValue": ($event) => _ctx.formData.gender = $event
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_h_option, {
                                        label: "Male",
                                        value: 1
                                      }, null, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_h_option, {
                                        label: "Female",
                                        value: 2
                                      }, null, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_h_option, {
                                          label: "Male",
                                          value: 1
                                        }),
                                        createVNode(_component_h_option, {
                                          label: "Female",
                                          value: 2
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_h_select, {
                                    modelValue: _ctx.formData.gender,
                                    "onUpdate:modelValue": ($event) => _ctx.formData.gender = $event
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_h_option, {
                                        label: "Male",
                                        value: 1
                                      }),
                                      createVNode(_component_h_option, {
                                        label: "Female",
                                        value: 2
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_form_item, {
                            label: "Notes",
                            prop: "notes"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_h_input, {
                                  modelValue: _ctx.formData.notes,
                                  "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                                  type: "textarea",
                                  rows: 20
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_h_input, {
                                    modelValue: _ctx.formData.notes,
                                    "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                                    type: "textarea",
                                    rows: 20
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_form_item, {
                              label: "User name",
                              prop: "username",
                              rules: [
                                {
                                  required: true,
                                  message: "User name is required!"
                                },
                                {
                                  min: 3,
                                  max: 100,
                                  message: "User name should be 3 to 100."
                                }
                              ]
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_input, {
                                  modelValue: _ctx.formData.username,
                                  "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_form_item, {
                              label: "Email",
                              prop: "email",
                              rules: _ctx.emailRules
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_input, {
                                  modelValue: _ctx.formData.email,
                                  "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }, 8, ["rules"]),
                            createVNode(_component_h_form_item, {
                              label: "Gender",
                              prop: "gender",
                              required: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_select, {
                                  modelValue: _ctx.formData.gender,
                                  "onUpdate:modelValue": ($event) => _ctx.formData.gender = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_option, {
                                      label: "Male",
                                      value: 1
                                    }),
                                    createVNode(_component_h_option, {
                                      label: "Female",
                                      value: 2
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_form_item, {
                              label: "Notes",
                              prop: "notes"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_input, {
                                  modelValue: _ctx.formData.notes,
                                  "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                                  type: "textarea",
                                  rows: 20
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        ref: "formRef",
                        model: _ctx.formData
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_form_item, {
                            label: "User name",
                            prop: "username",
                            rules: [
                              {
                                required: true,
                                message: "User name is required!"
                              },
                              {
                                min: 3,
                                max: 100,
                                message: "User name should be 3 to 100."
                              }
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_input, {
                                modelValue: _ctx.formData.username,
                                "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, {
                            label: "Email",
                            prop: "email",
                            rules: _ctx.emailRules
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_input, {
                                modelValue: _ctx.formData.email,
                                "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["rules"]),
                          createVNode(_component_h_form_item, {
                            label: "Gender",
                            prop: "gender",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_select, {
                                modelValue: _ctx.formData.gender,
                                "onUpdate:modelValue": ($event) => _ctx.formData.gender = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_option, {
                                    label: "Male",
                                    value: 1
                                  }),
                                  createVNode(_component_h_option, {
                                    label: "Female",
                                    value: 2
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, {
                            label: "Notes",
                            prop: "notes"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_input, {
                                modelValue: _ctx.formData.notes,
                                "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                                type: "textarea",
                                rows: 20
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_panel, { name: "tab2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Tab2 Content`);
                  } else {
                    return [
                      createTextVNode("Tab2 Content")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_panel, { name: "tab1" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_form, {
                      ref: "formRef",
                      model: _ctx.formData
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_form_item, {
                          label: "User name",
                          prop: "username",
                          rules: [
                            {
                              required: true,
                              message: "User name is required!"
                            },
                            {
                              min: 3,
                              max: 100,
                              message: "User name should be 3 to 100."
                            }
                          ]
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_input, {
                              modelValue: _ctx.formData.username,
                              "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, {
                          label: "Email",
                          prop: "email",
                          rules: _ctx.emailRules
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_input, {
                              modelValue: _ctx.formData.email,
                              "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }, 8, ["rules"]),
                        createVNode(_component_h_form_item, {
                          label: "Gender",
                          prop: "gender",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_select, {
                              modelValue: _ctx.formData.gender,
                              "onUpdate:modelValue": ($event) => _ctx.formData.gender = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_option, {
                                  label: "Male",
                                  value: 1
                                }),
                                createVNode(_component_h_option, {
                                  label: "Female",
                                  value: 2
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, {
                          label: "Notes",
                          prop: "notes"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_input, {
                              modelValue: _ctx.formData.notes,
                              "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                              type: "textarea",
                              rows: 20
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model"])
                  ]),
                  _: 1
                }),
                createVNode(_component_h_panel, { name: "tab2" }, {
                  default: withCtx(() => [
                    createTextVNode("Tab2 Content")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", null, [
            createVNode(_component_h_tabs, {
              modelValue: _ctx.currentTab,
              "onUpdate:modelValue": ($event) => _ctx.currentTab = $event
            }, {
              default: withCtx(() => [
                createVNode(_component_h_tab, {
                  name: "tab1",
                  label: "Tab1"
                }),
                createVNode(_component_h_tab, {
                  name: "tab2",
                  label: "Tab2"
                })
              ]),
              _: 1
            }, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_h_panels, {
              modelValue: _ctx.currentTab,
              "onUpdate:modelValue": ($event) => _ctx.currentTab = $event
            }, {
              default: withCtx(() => [
                createVNode(_component_h_panel, { name: "tab1" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_form, {
                      ref: "formRef",
                      model: _ctx.formData
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_form_item, {
                          label: "User name",
                          prop: "username",
                          rules: [
                            {
                              required: true,
                              message: "User name is required!"
                            },
                            {
                              min: 3,
                              max: 100,
                              message: "User name should be 3 to 100."
                            }
                          ]
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_input, {
                              modelValue: _ctx.formData.username,
                              "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, {
                          label: "Email",
                          prop: "email",
                          rules: _ctx.emailRules
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_input, {
                              modelValue: _ctx.formData.email,
                              "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }, 8, ["rules"]),
                        createVNode(_component_h_form_item, {
                          label: "Gender",
                          prop: "gender",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_select, {
                              modelValue: _ctx.formData.gender,
                              "onUpdate:modelValue": ($event) => _ctx.formData.gender = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_option, {
                                  label: "Male",
                                  value: 1
                                }),
                                createVNode(_component_h_option, {
                                  label: "Female",
                                  value: 2
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, {
                          label: "Notes",
                          prop: "notes"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_input, {
                              modelValue: _ctx.formData.notes,
                              "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                              type: "textarea",
                              rows: 20
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model"])
                  ]),
                  _: 1
                }),
                createVNode(_component_h_panel, { name: "tab2" }, {
                  default: withCtx(() => [
                    createTextVNode("Tab2 Content")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue", "onUpdate:modelValue"])
          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dialog/demo6.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo6 as default
};
