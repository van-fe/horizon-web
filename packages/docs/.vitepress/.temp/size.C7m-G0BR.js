import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "size",
  __ssrInlineRender: true,
  setup(__props) {
    const size = ref("medium");
    const customized = ref(false);
    const onChecked = (checked) => {
      if (checked) size.value = 50;
      else size.value = "medium";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_slider = resolveComponent("h-slider");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_space, mergeProps({
        direction: "vertical",
        size: "large"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_space, {
              block: "",
              size: "medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_space, {
                    align: "start",
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Size `);
                        _push4(ssrRenderComponent(_component_h_radio, {
                          modelValue: size.value,
                          "onUpdate:modelValue": ($event) => size.value = $event,
                          disabled: customized.value,
                          label: "small"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`small`);
                            } else {
                              return [
                                createTextVNode("small")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          modelValue: size.value,
                          "onUpdate:modelValue": ($event) => size.value = $event,
                          disabled: customized.value,
                          label: "medium"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`medium`);
                            } else {
                              return [
                                createTextVNode("medium")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          modelValue: size.value,
                          "onUpdate:modelValue": ($event) => size.value = $event,
                          disabled: customized.value,
                          label: "large"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`large`);
                            } else {
                              return [
                                createTextVNode("large")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Size "),
                          createVNode(_component_h_radio, {
                            modelValue: size.value,
                            "onUpdate:modelValue": ($event) => size.value = $event,
                            disabled: customized.value,
                            label: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("small")
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                          createVNode(_component_h_radio, {
                            modelValue: size.value,
                            "onUpdate:modelValue": ($event) => size.value = $event,
                            disabled: customized.value,
                            label: "medium"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("medium")
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                          createVNode(_component_h_radio, {
                            modelValue: size.value,
                            "onUpdate:modelValue": ($event) => size.value = $event,
                            disabled: customized.value,
                            label: "large"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("large")
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_space, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Other Setting: `);
                        _push4(ssrRenderComponent(_component_h_checkbox, {
                          modelValue: customized.value,
                          "onUpdate:modelValue": ($event) => customized.value = $event,
                          onChange: onChecked
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Customize`);
                            } else {
                              return [
                                createTextVNode("Customize")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` ${ssrInterpolate(customized.value ? `size: ${size.value}px` : "")}`);
                      } else {
                        return [
                          createTextVNode(" Other Setting: "),
                          createVNode(_component_h_checkbox, {
                            modelValue: customized.value,
                            "onUpdate:modelValue": ($event) => customized.value = $event,
                            onChange: onChecked
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Customize")
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createTextVNode(" " + toDisplayString(customized.value ? `size: ${size.value}px` : ""), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_space, {
                      align: "start",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Size "),
                        createVNode(_component_h_radio, {
                          modelValue: size.value,
                          "onUpdate:modelValue": ($event) => size.value = $event,
                          disabled: customized.value,
                          label: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("small")
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                        createVNode(_component_h_radio, {
                          modelValue: size.value,
                          "onUpdate:modelValue": ($event) => size.value = $event,
                          disabled: customized.value,
                          label: "medium"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("medium")
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                        createVNode(_component_h_radio, {
                          modelValue: size.value,
                          "onUpdate:modelValue": ($event) => size.value = $event,
                          disabled: customized.value,
                          label: "large"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("large")
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_space, null, {
                      default: withCtx(() => [
                        createTextVNode(" Other Setting: "),
                        createVNode(_component_h_checkbox, {
                          modelValue: customized.value,
                          "onUpdate:modelValue": ($event) => customized.value = $event,
                          onChange: onChecked
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Customize")
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createTextVNode(" " + toDisplayString(customized.value ? `size: ${size.value}px` : ""), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (customized.value) {
              _push2(ssrRenderComponent(_component_h_slider, {
                modelValue: size.value,
                "onUpdate:modelValue": ($event) => size.value = $event,
                min: 8,
                max: 100,
                step: 1
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_h_space, { size: size.value }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Created`);
                      } else {
                        return [
                          createTextVNode("Created")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, { type: "normal" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Refresh`);
                      } else {
                        return [
                          createTextVNode("Refresh")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, {
                    type: "normal",
                    icon: "full_screen"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("Created")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, { type: "normal" }, {
                      default: withCtx(() => [
                        createTextVNode("Refresh")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      type: "normal",
                      icon: "full_screen"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_space, {
                block: "",
                size: "medium"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, {
                    align: "start",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Size "),
                      createVNode(_component_h_radio, {
                        modelValue: size.value,
                        "onUpdate:modelValue": ($event) => size.value = $event,
                        disabled: customized.value,
                        label: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("small")
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                      createVNode(_component_h_radio, {
                        modelValue: size.value,
                        "onUpdate:modelValue": ($event) => size.value = $event,
                        disabled: customized.value,
                        label: "medium"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("medium")
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                      createVNode(_component_h_radio, {
                        modelValue: size.value,
                        "onUpdate:modelValue": ($event) => size.value = $event,
                        disabled: customized.value,
                        label: "large"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("large")
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_space, null, {
                    default: withCtx(() => [
                      createTextVNode(" Other Setting: "),
                      createVNode(_component_h_checkbox, {
                        modelValue: customized.value,
                        "onUpdate:modelValue": ($event) => customized.value = $event,
                        onChange: onChecked
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Customize")
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createTextVNode(" " + toDisplayString(customized.value ? `size: ${size.value}px` : ""), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              customized.value ? (openBlock(), createBlock(_component_h_slider, {
                key: 0,
                modelValue: size.value,
                "onUpdate:modelValue": ($event) => size.value = $event,
                min: 8,
                max: 100,
                step: 1
              }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
              createVNode(_component_h_space, { size: size.value }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("Created")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, { type: "normal" }, {
                    default: withCtx(() => [
                      createTextVNode("Refresh")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    type: "normal",
                    icon: "full_screen"
                  })
                ]),
                _: 1
              }, 8, ["size"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Space/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
