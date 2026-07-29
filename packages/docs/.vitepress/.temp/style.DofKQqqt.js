import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "style",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref(20);
    const style = ref("normal");
    const disabled = ref(false);
    const clearable = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_input_number = resolveComponent("h-input-number");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "style" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: style.value,
                    "onUpdate:modelValue": ($event) => style.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "normal" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "emphasize" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "no-border" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "normal" }),
                          createVNode(_component_h_radio, { label: "emphasize" }),
                          createVNode(_component_h_radio, { label: "no-border" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: style.value,
                      "onUpdate:modelValue": ($event) => style.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "normal" }),
                        createVNode(_component_h_radio, { label: "emphasize" }),
                        createVNode(_component_h_radio, { label: "no-border" })
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "clearable" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: clearable.value,
                    "onUpdate:modelValue": ($event) => clearable.value = $event
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
                      modelValue: clearable.value,
                      "onUpdate:modelValue": ($event) => clearable.value = $event
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
              createVNode(_component_h_form_item, { label: "style" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: style.value,
                    "onUpdate:modelValue": ($event) => style.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "normal" }),
                      createVNode(_component_h_radio, { label: "emphasize" }),
                      createVNode(_component_h_radio, { label: "no-border" })
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
              createVNode(_component_h_form_item, { label: "clearable" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: clearable.value,
                    "onUpdate:modelValue": ($event) => clearable.value = $event
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
      _push(ssrRenderComponent(_component_h_row, { gutter: 12 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>large</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "input-style": style.value,
                    disabled: disabled.value,
                    clearable: clearable.value,
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "large"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "input-style": style.value,
                      disabled: disabled.value,
                      clearable: clearable.value,
                      size: "large"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style", "disabled", "clearable"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>medium (default)</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "input-style": style.value,
                    disabled: disabled.value,
                    clearable: clearable.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "medium (default)"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "input-style": style.value,
                      disabled: disabled.value,
                      clearable: clearable.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style", "disabled", "clearable"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>small</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "input-style": style.value,
                    disabled: disabled.value,
                    clearable: clearable.value,
                    size: "small"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "small"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "input-style": style.value,
                      disabled: disabled.value,
                      clearable: clearable.value,
                      size: "small"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style", "disabled", "clearable"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "large"),
                  createVNode(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "input-style": style.value,
                    disabled: disabled.value,
                    clearable: clearable.value,
                    size: "large"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style", "disabled", "clearable"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "medium (default)"),
                  createVNode(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "input-style": style.value,
                    disabled: disabled.value,
                    clearable: clearable.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style", "disabled", "clearable"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "small"),
                  createVNode(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "input-style": style.value,
                    disabled: disabled.value,
                    clearable: clearable.value,
                    size: "small"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style", "disabled", "clearable"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/InputNumber/style.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
