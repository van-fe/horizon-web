import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "prepend-append",
  __ssrInlineRender: true,
  setup(__props) {
    const ageType = ref(null);
    const weightUnit = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_input_number = resolveComponent("h-input-number");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_h_row, { gutter: 12 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, { min: 0 }, {
                    prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Age: `);
                      } else {
                        return [
                          createTextVNode(" Age: ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, { min: 0 }, {
                      prepend: withCtx(() => [
                        createTextVNode(" Age: ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    "controls-position": "between",
                    min: 0
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Points `);
                      } else {
                        return [
                          createTextVNode(" Points ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, {
                      "controls-position": "between",
                      min: 0
                    }, {
                      append: withCtx(() => [
                        createTextVNode(" Points ")
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
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_h_input_number, { min: 0 }, {
                    prepend: withCtx(() => [
                      createTextVNode(" Age: ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_h_input_number, {
                    "controls-position": "between",
                    min: 0
                  }, {
                    append: withCtx(() => [
                      createTextVNode(" Points ")
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
      _push(ssrRenderComponent(_component_h_row, { gutter: 12 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    min: 0,
                    clearable: true,
                    placeholder: "The Age..."
                  }, {
                    prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_select, {
                          modelValue: ageType.value,
                          "onUpdate:modelValue": ($event) => ageType.value = $event,
                          placeholder: "Solar or Lunar",
                          clearable: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_option, {
                                label: "Solar Age",
                                value: "1"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_option, {
                                label: "Lunar Age",
                                value: "2"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_option, {
                                  label: "Solar Age",
                                  value: "1"
                                }),
                                createVNode(_component_h_option, {
                                  label: "Lunar Age",
                                  value: "2"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_select, {
                            modelValue: ageType.value,
                            "onUpdate:modelValue": ($event) => ageType.value = $event,
                            placeholder: "Solar or Lunar",
                            clearable: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_option, {
                                label: "Solar Age",
                                value: "1"
                              }),
                              createVNode(_component_h_option, {
                                label: "Lunar Age",
                                value: "2"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, {
                      min: 0,
                      clearable: true,
                      placeholder: "The Age..."
                    }, {
                      prepend: withCtx(() => [
                        createVNode(_component_h_select, {
                          modelValue: ageType.value,
                          "onUpdate:modelValue": ($event) => ageType.value = $event,
                          placeholder: "Solar or Lunar",
                          clearable: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_option, {
                              label: "Solar Age",
                              value: "1"
                            }),
                            createVNode(_component_h_option, {
                              label: "Lunar Age",
                              value: "2"
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_input_number, {
                    min: 0,
                    clearable: true,
                    placeholder: "The Age..."
                  }, {
                    prepend: withCtx(() => [
                      createVNode(_component_h_select, {
                        modelValue: ageType.value,
                        "onUpdate:modelValue": ($event) => ageType.value = $event,
                        placeholder: "Solar or Lunar",
                        clearable: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_option, {
                            label: "Solar Age",
                            value: "1"
                          }),
                          createVNode(_component_h_option, {
                            label: "Lunar Age",
                            value: "2"
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
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, { gutter: 12 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    min: 0,
                    clearable: true,
                    placeholder: "The Weight..."
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_select, {
                          modelValue: weightUnit.value,
                          "onUpdate:modelValue": ($event) => weightUnit.value = $event,
                          placeholder: "Kg or g",
                          clearable: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_option, {
                                label: "Kg",
                                value: "1"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_option, {
                                label: "g",
                                value: "2"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_option, {
                                  label: "Kg",
                                  value: "1"
                                }),
                                createVNode(_component_h_option, {
                                  label: "g",
                                  value: "2"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_select, {
                            modelValue: weightUnit.value,
                            "onUpdate:modelValue": ($event) => weightUnit.value = $event,
                            placeholder: "Kg or g",
                            clearable: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_option, {
                                label: "Kg",
                                value: "1"
                              }),
                              createVNode(_component_h_option, {
                                label: "g",
                                value: "2"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, {
                      min: 0,
                      clearable: true,
                      placeholder: "The Weight..."
                    }, {
                      append: withCtx(() => [
                        createVNode(_component_h_select, {
                          modelValue: weightUnit.value,
                          "onUpdate:modelValue": ($event) => weightUnit.value = $event,
                          placeholder: "Kg or g",
                          clearable: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_option, {
                              label: "Kg",
                              value: "1"
                            }),
                            createVNode(_component_h_option, {
                              label: "g",
                              value: "2"
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_input_number, {
                    min: 0,
                    clearable: true,
                    placeholder: "The Weight..."
                  }, {
                    append: withCtx(() => [
                      createVNode(_component_h_select, {
                        modelValue: weightUnit.value,
                        "onUpdate:modelValue": ($event) => weightUnit.value = $event,
                        placeholder: "Kg or g",
                        clearable: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_option, {
                            label: "Kg",
                            value: "1"
                          }),
                          createVNode(_component_h_option, {
                            label: "g",
                            value: "2"
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
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/InputNumber/prepend-append.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
