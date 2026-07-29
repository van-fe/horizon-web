import { defineComponent, ref, resolveComponent, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createTextVNode, h, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tips-helper",
  __ssrInlineRender: true,
  setup(__props) {
    const helperTheme = ref("light");
    const formRef = ref(null);
    const formData = ref({
      inputStyle: "normal",
      username: "",
      age: null,
      province: null,
      date: [],
      switch: true,
      remark: ""
    });
    const submit = () => {
      var _a;
      console.info("formData:", formData.value);
      (_a = formRef.value) == null ? void 0 : _a.validate().then(() => {
        $message.success("Submit");
      }).catch((err) => {
        $message.error(err[0]);
      });
    };
    const rules = {
      username: {
        required: true,
        message: "Please enter your username"
      },
      age: [
        {
          required: true,
          message: "Please enter your age"
        },
        {
          min: 0,
          max: 120,
          type: "number",
          message: "Age is between 0 - 120"
        }
      ],
      province: {
        required: true,
        message: "Please pick your location"
      },
      date: {
        required: true,
        message: "Please pick your wish time which you will be free"
      }
    };
    const dateHelper = {
      title: "Tips",
      content: () => h("div", "Please pick your wish time which you will be free")
    };
    function onInput() {
      console.info("input:", formData.value.age);
    }
    function onChange() {
      console.info("change:", formData.value.age);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_input_number = resolveComponent("h-input-number");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      const _component_h_date_picker = resolveComponent("h-date-picker");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "helper主题" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: helperTheme.value,
                    "onUpdate:modelValue": ($event) => helperTheme.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "light" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "dark" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "light" }),
                          createVNode(_component_h_radio, { label: "dark" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: helperTheme.value,
                      "onUpdate:modelValue": ($event) => helperTheme.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "light" }),
                        createVNode(_component_h_radio, { label: "dark" })
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
              createVNode(_component_h_form_item, { label: "helper主题" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: helperTheme.value,
                    "onUpdate:modelValue": ($event) => helperTheme.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "light" }),
                      createVNode(_component_h_radio, { label: "dark" })
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
      _push(ssrRenderComponent(_component_h_form, {
        ref_key: "formRef",
        ref: formRef,
        model: formData.value,
        rules,
        "helper-theme": helperTheme.value,
        onSubmit: submit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "input style",
              prop: "inputStyle"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: formData.value.inputStyle,
                    "onUpdate:modelValue": ($event) => formData.value.inputStyle = $event,
                    size: "medium"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(["normal", "emphasize", "no-border"], (item) => {
                          _push4(ssrRenderComponent(_component_h_radio, {
                            key: item,
                            label: item
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(["normal", "emphasize", "no-border"], (item) => {
                            return createVNode(_component_h_radio, {
                              key: item,
                              label: item
                            }, null, 8, ["label"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: formData.value.inputStyle,
                      "onUpdate:modelValue": ($event) => formData.value.inputStyle = $event,
                      size: "medium"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(["normal", "emphasize", "no-border"], (item) => {
                          return createVNode(_component_h_radio, {
                            key: item,
                            label: item
                          }, null, 8, ["label"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Username",
              prop: "username",
              "validate-trigger": ["change"]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: formData.value.username,
                    "onUpdate:modelValue": ($event) => formData.value.username = $event,
                    "input-style": formData.value.inputStyle,
                    placeholder: "Please enter your username",
                    clearable: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: formData.value.username,
                      "onUpdate:modelValue": ($event) => formData.value.username = $event,
                      "input-style": formData.value.inputStyle,
                      placeholder: "Please enter your username",
                      clearable: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Age",
              prop: "age",
              "helper-placement": "after-label",
              "validate-trigger": ["change"]
            }, {
              helper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Age is between 0 to 120`);
                } else {
                  return [
                    createTextVNode("Age is between 0 to 120")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: formData.value.age,
                    "onUpdate:modelValue": ($event) => formData.value.age = $event,
                    placeholder: "Please enter your age",
                    "input-style": formData.value.inputStyle,
                    min: 0,
                    max: 120,
                    clearable: true,
                    onInput,
                    onChange
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, {
                      modelValue: formData.value.age,
                      "onUpdate:modelValue": ($event) => formData.value.age = $event,
                      placeholder: "Please enter your age",
                      "input-style": formData.value.inputStyle,
                      min: 0,
                      max: 120,
                      clearable: true,
                      onInput,
                      onChange
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Province",
              prop: "province"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: formData.value.province,
                    "onUpdate:modelValue": ($event) => formData.value.province = $event,
                    "input-style": formData.value.inputStyle,
                    placeholder: "Please select"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "Beijing",
                          value: "beijing"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "Shanghai",
                          value: "shanghai"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "Hefei",
                          value: "hefei"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            label: "Beijing",
                            value: "beijing"
                          }),
                          createVNode(_component_h_option, {
                            label: "Shanghai",
                            value: "shanghai"
                          }),
                          createVNode(_component_h_option, {
                            label: "Hefei",
                            value: "hefei"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_select, {
                      modelValue: formData.value.province,
                      "onUpdate:modelValue": ($event) => formData.value.province = $event,
                      "input-style": formData.value.inputStyle,
                      placeholder: "Please select"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "Beijing",
                          value: "beijing"
                        }),
                        createVNode(_component_h_option, {
                          label: "Shanghai",
                          value: "shanghai"
                        }),
                        createVNode(_component_h_option, {
                          label: "Hefei",
                          value: "hefei"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Date",
              prop: "date",
              helper: dateHelper
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: formData.value.date,
                    "onUpdate:modelValue": ($event) => formData.value.date = $event,
                    type: "daterange",
                    format: "yyyy-MM-dd",
                    "value-format": "yyyy-MM-dd",
                    "start-placeholder": "Start date",
                    "end-placeholder": "End date",
                    "input-style": formData.value.inputStyle
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: formData.value.date,
                      "onUpdate:modelValue": ($event) => formData.value.date = $event,
                      type: "daterange",
                      format: "yyyy-MM-dd",
                      "value-format": "yyyy-MM-dd",
                      "start-placeholder": "Start date",
                      "end-placeholder": "End date",
                      "input-style": formData.value.inputStyle
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Switch",
              prop: "switch"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: formData.value.switch,
                    "onUpdate:modelValue": ($event) => formData.value.switch = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: formData.value.switch,
                      "onUpdate:modelValue": ($event) => formData.value.switch = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Remark",
              tip: "Hint or Error Message",
              prop: "remark"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: formData.value.remark,
                    "onUpdate:modelValue": ($event) => formData.value.remark = $event,
                    placeholder: "Type something",
                    "input-style": formData.value.inputStyle,
                    "show-limit": true,
                    maxlength: 100,
                    type: "textarea"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: formData.value.remark,
                      "onUpdate:modelValue": ($event) => formData.value.remark = $event,
                      placeholder: "Type something",
                      "input-style": formData.value.inputStyle,
                      "show-limit": true,
                      maxlength: 100,
                      type: "textarea"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, { "native-type": "submit" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Submit`);
                      } else {
                        return [
                          createTextVNode("Submit")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, { "native-type": "submit" }, {
                      default: withCtx(() => [
                        createTextVNode("Submit")
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
              createVNode(_component_h_form_item, {
                label: "input style",
                prop: "inputStyle"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: formData.value.inputStyle,
                    "onUpdate:modelValue": ($event) => formData.value.inputStyle = $event,
                    size: "medium"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(["normal", "emphasize", "no-border"], (item) => {
                        return createVNode(_component_h_radio, {
                          key: item,
                          label: item
                        }, null, 8, ["label"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Username",
                prop: "username",
                "validate-trigger": ["change"]
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: formData.value.username,
                    "onUpdate:modelValue": ($event) => formData.value.username = $event,
                    "input-style": formData.value.inputStyle,
                    placeholder: "Please enter your username",
                    clearable: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Age",
                prop: "age",
                "helper-placement": "after-label",
                "validate-trigger": ["change"]
              }, {
                helper: withCtx(() => [
                  createTextVNode("Age is between 0 to 120")
                ]),
                default: withCtx(() => [
                  createVNode(_component_h_input_number, {
                    modelValue: formData.value.age,
                    "onUpdate:modelValue": ($event) => formData.value.age = $event,
                    placeholder: "Please enter your age",
                    "input-style": formData.value.inputStyle,
                    min: 0,
                    max: 120,
                    clearable: true,
                    onInput,
                    onChange
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Province",
                prop: "province"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_select, {
                    modelValue: formData.value.province,
                    "onUpdate:modelValue": ($event) => formData.value.province = $event,
                    "input-style": formData.value.inputStyle,
                    placeholder: "Please select"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "Beijing",
                        value: "beijing"
                      }),
                      createVNode(_component_h_option, {
                        label: "Shanghai",
                        value: "shanghai"
                      }),
                      createVNode(_component_h_option, {
                        label: "Hefei",
                        value: "hefei"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Date",
                prop: "date",
                helper: dateHelper
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: formData.value.date,
                    "onUpdate:modelValue": ($event) => formData.value.date = $event,
                    type: "daterange",
                    format: "yyyy-MM-dd",
                    "value-format": "yyyy-MM-dd",
                    "start-placeholder": "Start date",
                    "end-placeholder": "End date",
                    "input-style": formData.value.inputStyle
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Switch",
                prop: "switch"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: formData.value.switch,
                    "onUpdate:modelValue": ($event) => formData.value.switch = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Remark",
                tip: "Hint or Error Message",
                prop: "remark"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: formData.value.remark,
                    "onUpdate:modelValue": ($event) => formData.value.remark = $event,
                    placeholder: "Type something",
                    "input-style": formData.value.inputStyle,
                    "show-limit": true,
                    maxlength: 100,
                    type: "textarea"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_h_button, { "native-type": "submit" }, {
                    default: withCtx(() => [
                      createTextVNode("Submit")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/tips-helper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
