import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { p as currDayjs } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "show-now",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const value2 = ref();
    const value3 = ref();
    const values = ref();
    const values2 = ref();
    const values3 = ref();
    const datePickerRef = ref();
    const datePickerRef2 = ref();
    function setSingleDate() {
      var _a;
      value3.value = currDayjs().add(1, "day");
      (_a = datePickerRef.value) == null ? void 0 : _a.confirmHandle();
    }
    function setRangeDate() {
      var _a;
      values3.value = [currDayjs(), currDayjs().add(5, "minutes")];
      (_a = datePickerRef2.value) == null ? void 0 : _a.confirmHandle();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_date_picker = resolveComponent("h-date-picker");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, { align: "middle" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Date: `);
                } else {
                  return [
                    createTextVNode(" Date: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "show-now": "",
                    "default-time": "00:00"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "show-now": "",
                      "default-time": "00:00"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    type: "dateRange",
                    "show-now": "",
                    "default-time": "00:00"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: values.value,
                      "onUpdate:modelValue": ($event) => values.value = $event,
                      type: "dateRange",
                      "show-now": "",
                      "default-time": "00:00"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode(" Date: ")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "show-now": "",
                    "default-time": "00:00"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    type: "dateRange",
                    "show-now": "",
                    "default-time": "00:00"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, { align: "middle" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Datetime: `);
                } else {
                  return [
                    createTextVNode(" Datetime: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    type: "dateSeconds",
                    "show-now": "",
                    "default-time": "00:00",
                    "need-confirm": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      type: "dateSeconds",
                      "show-now": "",
                      "default-time": "00:00",
                      "need-confirm": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    type: "dateSecondsRange",
                    "show-now": "",
                    "need-confirm": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      type: "dateSecondsRange",
                      "show-now": "",
                      "need-confirm": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode(" Datetime: ")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    type: "dateSeconds",
                    "show-now": "",
                    "default-time": "00:00",
                    "need-confirm": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    type: "dateSecondsRange",
                    "show-now": "",
                    "need-confirm": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, { align: "middle" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Custom: `);
                } else {
                  return [
                    createTextVNode(" Custom: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    ref_key: "datePickerRef",
                    ref: datePickerRef,
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event
                  }, {
                    showNow: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, {
                          size: "small",
                          plain: "",
                          onClick: setSingleDate
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tomorrow`);
                            } else {
                              return [
                                createTextVNode("Tomorrow")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, {
                            size: "small",
                            plain: "",
                            onClick: setSingleDate
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Tomorrow")
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
                    createVNode(_component_h_date_picker, {
                      ref_key: "datePickerRef",
                      ref: datePickerRef,
                      modelValue: value3.value,
                      "onUpdate:modelValue": ($event) => value3.value = $event
                    }, {
                      showNow: withCtx(() => [
                        createVNode(_component_h_button, {
                          size: "small",
                          plain: "",
                          onClick: setSingleDate
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Tomorrow")
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
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    ref_key: "datePickerRef2",
                    ref: datePickerRef2,
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    type: "datetimeRange"
                  }, {
                    showNow: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, {
                          size: "small",
                          plain: "",
                          onClick: setRangeDate
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Five minute later`);
                            } else {
                              return [
                                createTextVNode("Five minute later")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, {
                            size: "small",
                            plain: "",
                            onClick: setRangeDate
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Five minute later")
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
                    createVNode(_component_h_date_picker, {
                      ref_key: "datePickerRef2",
                      ref: datePickerRef2,
                      modelValue: values3.value,
                      "onUpdate:modelValue": ($event) => values3.value = $event,
                      type: "datetimeRange"
                    }, {
                      showNow: withCtx(() => [
                        createVNode(_component_h_button, {
                          size: "small",
                          plain: "",
                          onClick: setRangeDate
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Five minute later")
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
              createVNode(_component_h_col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode(" Custom: ")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    ref_key: "datePickerRef",
                    ref: datePickerRef,
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event
                  }, {
                    showNow: withCtx(() => [
                      createVNode(_component_h_button, {
                        size: "small",
                        plain: "",
                        onClick: setSingleDate
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Tomorrow")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    ref_key: "datePickerRef2",
                    ref: datePickerRef2,
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    type: "datetimeRange"
                  }, {
                    showNow: withCtx(() => [
                      createVNode(_component_h_button, {
                        size: "small",
                        plain: "",
                        onClick: setRangeDate
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Five minute later")
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/DatePicker/show-now.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
