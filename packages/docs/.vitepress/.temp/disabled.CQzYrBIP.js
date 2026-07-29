import { defineComponent, ref, onMounted, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "disabled",
  __ssrInlineRender: true,
  setup(__props) {
    const disabled = ref(true);
    const cascaderData = ref([]);
    const formRef = ref(null);
    const formData = ref({
      input: "",
      number: null,
      select: null,
      date: [],
      switch: true,
      checkbox: false,
      radio: false,
      cascader: [],
      treeSelect: [],
      textarea: "",
      upload: void 0
    });
    onMounted(async () => {
      cascaderData.value = await fetch(new URL("/cascader-tree-data.json", import.meta.url).href).then((r) => r.json());
    });
    function onInput() {
      console.info("input:", formData.value.number);
    }
    function onChange() {
      console.info("change:", formData.value.number);
    }
    function onSubmit() {
      var _a;
      (_a = formRef.value) == null ? void 0 : _a.validate();
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
      const _component_h_cascader = resolveComponent("h-cascader");
      const _component_h_tree_select = resolveComponent("h-tree-select");
      const _component_h_date_picker = resolveComponent("h-date-picker");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_upload = resolveComponent("h-upload");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, { "label-position": "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "disabled" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: disabled.value,
                    "onUpdate:modelValue": ($event) => disabled.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: true }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`True`);
                            } else {
                              return [
                                createTextVNode("True")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: false }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`False`);
                            } else {
                              return [
                                createTextVNode("False")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: true }, {
                            default: withCtx(() => [
                              createTextVNode("True")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: false }, {
                            default: withCtx(() => [
                              createTextVNode("False")
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
                    createVNode(_component_h_radio_group, {
                      modelValue: disabled.value,
                      "onUpdate:modelValue": ($event) => disabled.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: true }, {
                          default: withCtx(() => [
                            createTextVNode("True")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: false }, {
                          default: withCtx(() => [
                            createTextVNode("False")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "disabled" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: disabled.value,
                    "onUpdate:modelValue": ($event) => disabled.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: true }, {
                        default: withCtx(() => [
                          createTextVNode("True")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: false }, {
                        default: withCtx(() => [
                          createTextVNode("False")
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
      }, _parent));
      _push(ssrRenderComponent(_component_h_form, {
        ref_key: "formRef",
        ref: formRef,
        model: formData.value,
        disabled: disabled.value,
        "label-vertical-align": "middle",
        onSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Input",
              prop: "input",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: formData.value.input,
                    "onUpdate:modelValue": ($event) => formData.value.input = $event,
                    clearable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: formData.value.input,
                      "onUpdate:modelValue": ($event) => formData.value.input = $event,
                      clearable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Number",
              prop: "number",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: formData.value.number,
                    "onUpdate:modelValue": ($event) => formData.value.number = $event,
                    min: 0,
                    max: 120,
                    clearable: "",
                    onInput,
                    onChange
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, {
                      modelValue: formData.value.number,
                      "onUpdate:modelValue": ($event) => formData.value.number = $event,
                      min: 0,
                      max: 120,
                      clearable: "",
                      onInput,
                      onChange
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Select",
              prop: "select",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: formData.value.select,
                    "onUpdate:modelValue": ($event) => formData.value.select = $event,
                    clearable: "",
                    multiple: true
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
                      modelValue: formData.value.select,
                      "onUpdate:modelValue": ($event) => formData.value.select = $event,
                      clearable: "",
                      multiple: true
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
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Cascader",
              prop: "cascader",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: formData.value.cascader,
                    "onUpdate:modelValue": ($event) => formData.value.cascader = $event,
                    clearable: true,
                    "to-body": false,
                    multiple: true,
                    options: cascaderData.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_cascader, {
                      modelValue: formData.value.cascader,
                      "onUpdate:modelValue": ($event) => formData.value.cascader = $event,
                      clearable: true,
                      "to-body": false,
                      multiple: true,
                      options: cascaderData.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "TreeSelect",
              prop: "treeSelect",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    modelValue: formData.value.treeSelect,
                    "onUpdate:modelValue": ($event) => formData.value.treeSelect = $event,
                    clearable: true,
                    "to-body": false,
                    multiple: true,
                    "tree-data": cascaderData.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tree_select, {
                      modelValue: formData.value.treeSelect,
                      "onUpdate:modelValue": ($event) => formData.value.treeSelect = $event,
                      clearable: true,
                      "to-body": false,
                      multiple: true,
                      "tree-data": cascaderData.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Date",
              prop: "date",
              required: ""
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
                    "end-placeholder": "End date"
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
                      "end-placeholder": "End date"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Switch",
              prop: "switch",
              required: ""
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
              label: "Checkbox",
              prop: "checkbox",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_checkbox, {
                    modelValue: formData.value.checkbox,
                    "onUpdate:modelValue": ($event) => formData.value.checkbox = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_checkbox, {
                      modelValue: formData.value.checkbox,
                      "onUpdate:modelValue": ($event) => formData.value.checkbox = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Radio",
              prop: "radio",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: formData.value.radio,
                    "onUpdate:modelValue": ($event) => formData.value.radio = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio, {
                      modelValue: formData.value.radio,
                      "onUpdate:modelValue": ($event) => formData.value.radio = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Textarea",
              prop: "textarea",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: formData.value.textarea,
                    "onUpdate:modelValue": ($event) => formData.value.textarea = $event,
                    "show-limit": true,
                    maxlength: 100,
                    type: "textarea"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: formData.value.textarea,
                      "onUpdate:modelValue": ($event) => formData.value.textarea = $event,
                      "show-limit": true,
                      maxlength: 100,
                      type: "textarea"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Upload",
              prop: "upload",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_upload, {
                    modelValue: formData.value.upload,
                    "onUpdate:modelValue": ($event) => formData.value.upload = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_upload, {
                      modelValue: formData.value.upload,
                      "onUpdate:modelValue": ($event) => formData.value.upload = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Upload Drop",
              prop: "upload",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_upload, {
                    modelValue: formData.value.upload,
                    "onUpdate:modelValue": ($event) => formData.value.upload = $event,
                    type: "drop",
                    limit: 5,
                    multiple: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_upload, {
                      modelValue: formData.value.upload,
                      "onUpdate:modelValue": ($event) => formData.value.upload = $event,
                      type: "drop",
                      limit: 5,
                      multiple: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Upload Gallery",
              prop: "upload",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_upload, {
                    modelValue: formData.value.upload,
                    "onUpdate:modelValue": ($event) => formData.value.upload = $event,
                    type: "gallery"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_upload, {
                      modelValue: formData.value.upload,
                      "onUpdate:modelValue": ($event) => formData.value.upload = $event,
                      type: "gallery"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, { "native-type": "submit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Submit`);
                } else {
                  return [
                    createTextVNode("Submit")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, {
                label: "Input",
                prop: "input",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: formData.value.input,
                    "onUpdate:modelValue": ($event) => formData.value.input = $event,
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Number",
                prop: "number",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input_number, {
                    modelValue: formData.value.number,
                    "onUpdate:modelValue": ($event) => formData.value.number = $event,
                    min: 0,
                    max: 120,
                    clearable: "",
                    onInput,
                    onChange
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Select",
                prop: "select",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_select, {
                    modelValue: formData.value.select,
                    "onUpdate:modelValue": ($event) => formData.value.select = $event,
                    clearable: "",
                    multiple: true
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
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Cascader",
                prop: "cascader",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_cascader, {
                    modelValue: formData.value.cascader,
                    "onUpdate:modelValue": ($event) => formData.value.cascader = $event,
                    clearable: true,
                    "to-body": false,
                    multiple: true,
                    options: cascaderData.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "TreeSelect",
                prop: "treeSelect",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_tree_select, {
                    modelValue: formData.value.treeSelect,
                    "onUpdate:modelValue": ($event) => formData.value.treeSelect = $event,
                    clearable: true,
                    "to-body": false,
                    multiple: true,
                    "tree-data": cascaderData.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Date",
                prop: "date",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: formData.value.date,
                    "onUpdate:modelValue": ($event) => formData.value.date = $event,
                    type: "daterange",
                    format: "yyyy-MM-dd",
                    "value-format": "yyyy-MM-dd",
                    "start-placeholder": "Start date",
                    "end-placeholder": "End date"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Switch",
                prop: "switch",
                required: ""
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
                label: "Checkbox",
                prop: "checkbox",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_checkbox, {
                    modelValue: formData.value.checkbox,
                    "onUpdate:modelValue": ($event) => formData.value.checkbox = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Radio",
                prop: "radio",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, {
                    modelValue: formData.value.radio,
                    "onUpdate:modelValue": ($event) => formData.value.radio = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Textarea",
                prop: "textarea",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: formData.value.textarea,
                    "onUpdate:modelValue": ($event) => formData.value.textarea = $event,
                    "show-limit": true,
                    maxlength: 100,
                    type: "textarea"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Upload",
                prop: "upload",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_upload, {
                    modelValue: formData.value.upload,
                    "onUpdate:modelValue": ($event) => formData.value.upload = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Upload Drop",
                prop: "upload",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_upload, {
                    modelValue: formData.value.upload,
                    "onUpdate:modelValue": ($event) => formData.value.upload = $event,
                    type: "drop",
                    limit: 5,
                    multiple: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Upload Gallery",
                prop: "upload",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_upload, {
                    modelValue: formData.value.upload,
                    "onUpdate:modelValue": ($event) => formData.value.upload = $event,
                    type: "gallery"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
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
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/disabled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
