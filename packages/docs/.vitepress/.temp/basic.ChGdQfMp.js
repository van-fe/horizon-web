import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, createTextVNode, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { H as HCascader } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    const cascaderDomRef1 = ref();
    const cascaderDomRef2 = ref();
    const currentVal1 = ref(["guide", "navigation", "side nav"]);
    const currentVal2 = ref([]);
    const baseData = ref([]);
    const sizeValue = ref("medium");
    const inputStyle = ref("normal");
    const disabled = ref(false);
    const checkStrictly = ref(false);
    const changeHandle = (value, option) => {
      console.info("change: ", value, option);
    };
    const inputHandle = (value) => {
      console.info("input: ", value);
    };
    const updateHandle = (value) => {
      console.info("update: ", value);
    };
    function onFocus() {
      console.info("focus");
    }
    function onBlur() {
      console.info("blur");
    }
    onMounted(async () => {
      baseData.value = await fetch(new URL("/cascader-options.json", import.meta.url).href).then((r) => r.json());
      currentVal2.value.push(["guide", "navigation", "side nav"]);
      console.info(cascaderDomRef1.value, cascaderDomRef2.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-width": "fit-content"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "size" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: sizeValue.value,
                    "onUpdate:modelValue": ($event) => sizeValue.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, {
                          value: "large",
                          label: "large"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          value: "medium",
                          label: "medium"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          value: "small",
                          label: "small"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, {
                            value: "large",
                            label: "large"
                          }),
                          createVNode(_component_h_radio, {
                            value: "medium",
                            label: "medium"
                          }),
                          createVNode(_component_h_radio, {
                            value: "small",
                            label: "small"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: sizeValue.value,
                      "onUpdate:modelValue": ($event) => sizeValue.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, {
                          value: "large",
                          label: "large"
                        }),
                        createVNode(_component_h_radio, {
                          value: "medium",
                          label: "medium"
                        }),
                        createVNode(_component_h_radio, {
                          value: "small",
                          label: "small"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "input style" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: inputStyle.value,
                    "onUpdate:modelValue": ($event) => inputStyle.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, {
                          value: "normal",
                          label: "normal"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          value: "emphasize",
                          label: "emphasize"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          value: "no-border",
                          label: "no-border"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, {
                            value: "normal",
                            label: "normal"
                          }),
                          createVNode(_component_h_radio, {
                            value: "emphasize",
                            label: "emphasize"
                          }),
                          createVNode(_component_h_radio, {
                            value: "no-border",
                            label: "no-border"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: inputStyle.value,
                      "onUpdate:modelValue": ($event) => inputStyle.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, {
                          value: "normal",
                          label: "normal"
                        }),
                        createVNode(_component_h_radio, {
                          value: "emphasize",
                          label: "emphasize"
                        }),
                        createVNode(_component_h_radio, {
                          value: "no-border",
                          label: "no-border"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "check-strictly" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: checkStrictly.value,
                    "onUpdate:modelValue": ($event) => checkStrictly.value = $event
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
                      modelValue: checkStrictly.value,
                      "onUpdate:modelValue": ($event) => checkStrictly.value = $event
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
              createVNode(_component_h_form_item, { label: "size" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: sizeValue.value,
                    "onUpdate:modelValue": ($event) => sizeValue.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, {
                        value: "large",
                        label: "large"
                      }),
                      createVNode(_component_h_radio, {
                        value: "medium",
                        label: "medium"
                      }),
                      createVNode(_component_h_radio, {
                        value: "small",
                        label: "small"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "input style" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: inputStyle.value,
                    "onUpdate:modelValue": ($event) => inputStyle.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, {
                        value: "normal",
                        label: "normal"
                      }),
                      createVNode(_component_h_radio, {
                        value: "emphasize",
                        label: "emphasize"
                      }),
                      createVNode(_component_h_radio, {
                        value: "no-border",
                        label: "no-border"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
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
              }),
              createVNode(_component_h_form_item, { label: "check-strictly" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: checkStrictly.value,
                    "onUpdate:modelValue": ($event) => checkStrictly.value = $event
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
      _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(unref(HCascader), {
                    ref_key: "cascaderDomRef1",
                    ref: cascaderDomRef1,
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": [($event) => currentVal1.value = $event, updateHandle],
                    clearable: true,
                    size: sizeValue.value,
                    "to-body": false,
                    "input-style": inputStyle.value,
                    "check-strictly": checkStrictly.value,
                    options: baseData.value,
                    disabled: disabled.value,
                    onInput: inputHandle,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(unref(HCascader), {
                      ref_key: "cascaderDomRef1",
                      ref: cascaderDomRef1,
                      modelValue: currentVal1.value,
                      "onUpdate:modelValue": [($event) => currentVal1.value = $event, updateHandle],
                      clearable: true,
                      size: sizeValue.value,
                      "to-body": false,
                      "input-style": inputStyle.value,
                      "check-strictly": checkStrictly.value,
                      options: baseData.value,
                      disabled: disabled.value,
                      onInput: inputHandle,
                      onChange: changeHandle,
                      onFocus,
                      onBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "size", "input-style", "check-strictly", "options", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(unref(HCascader), {
                    ref_key: "cascaderDomRef2",
                    ref: cascaderDomRef2,
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": [($event) => currentVal2.value = $event, updateHandle],
                    clearable: true,
                    size: sizeValue.value,
                    "input-style": inputStyle.value,
                    "check-strictly": checkStrictly.value,
                    options: baseData.value,
                    multiple: true,
                    "to-body": false,
                    disabled: disabled.value,
                    onInput: inputHandle,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(unref(HCascader), {
                      ref_key: "cascaderDomRef2",
                      ref: cascaderDomRef2,
                      modelValue: currentVal2.value,
                      "onUpdate:modelValue": [($event) => currentVal2.value = $event, updateHandle],
                      clearable: true,
                      size: sizeValue.value,
                      "input-style": inputStyle.value,
                      "check-strictly": checkStrictly.value,
                      options: baseData.value,
                      multiple: true,
                      "to-body": false,
                      disabled: disabled.value,
                      onInput: inputHandle,
                      onChange: changeHandle,
                      onFocus,
                      onBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "size", "input-style", "check-strictly", "options", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选"),
                  createVNode(unref(HCascader), {
                    ref_key: "cascaderDomRef1",
                    ref: cascaderDomRef1,
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": [($event) => currentVal1.value = $event, updateHandle],
                    clearable: true,
                    size: sizeValue.value,
                    "to-body": false,
                    "input-style": inputStyle.value,
                    "check-strictly": checkStrictly.value,
                    options: baseData.value,
                    disabled: disabled.value,
                    onInput: inputHandle,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "size", "input-style", "check-strictly", "options", "disabled"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(unref(HCascader), {
                    ref_key: "cascaderDomRef2",
                    ref: cascaderDomRef2,
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": [($event) => currentVal2.value = $event, updateHandle],
                    clearable: true,
                    size: sizeValue.value,
                    "input-style": inputStyle.value,
                    "check-strictly": checkStrictly.value,
                    options: baseData.value,
                    multiple: true,
                    "to-body": false,
                    disabled: disabled.value,
                    onInput: inputHandle,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "size", "input-style", "check-strictly", "options", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
