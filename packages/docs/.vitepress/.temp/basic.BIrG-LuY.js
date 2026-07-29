import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    const sizeValue = ref("medium");
    const inputStyle = ref("normal");
    const options = ref([]);
    function onSearch(val) {
      options.value = [];
      if (val) {
        new Array(10).fill(0).forEach((_, index) => {
          const value = val.repeat(index + 1);
          options.value.push({
            label: value,
            value
          });
        });
      }
    }
    function onSelect(val) {
      console.info("select: ", val);
    }
    function onUpdate(val) {
      console.info("update: ", val);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_auto_complete = resolveComponent("h-auto-complete");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        inline: true,
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "尺寸" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: sizeValue.value,
                    "onUpdate:modelValue": ($event) => sizeValue.value = $event,
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "large",
                          label: "large"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "medium",
                          label: "medium"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "small",
                          label: "small"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            value: "large",
                            label: "large"
                          }),
                          createVNode(_component_h_option, {
                            value: "medium",
                            label: "medium"
                          }),
                          createVNode(_component_h_option, {
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
                    createVNode(_component_h_select, {
                      modelValue: sizeValue.value,
                      "onUpdate:modelValue": ($event) => sizeValue.value = $event,
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          value: "large",
                          label: "large"
                        }),
                        createVNode(_component_h_option, {
                          value: "medium",
                          label: "medium"
                        }),
                        createVNode(_component_h_option, {
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "样式" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: inputStyle.value,
                    "onUpdate:modelValue": ($event) => inputStyle.value = $event,
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "normal",
                          label: "normal"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "emphasize",
                          label: "emphasize"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "no-border",
                          label: "no-border"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            value: "normal",
                            label: "normal"
                          }),
                          createVNode(_component_h_option, {
                            value: "emphasize",
                            label: "emphasize"
                          }),
                          createVNode(_component_h_option, {
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
                    createVNode(_component_h_select, {
                      modelValue: inputStyle.value,
                      "onUpdate:modelValue": ($event) => inputStyle.value = $event,
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          value: "normal",
                          label: "normal"
                        }),
                        createVNode(_component_h_option, {
                          value: "emphasize",
                          label: "emphasize"
                        }),
                        createVNode(_component_h_option, {
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
          } else {
            return [
              createVNode(_component_h_form_item, { label: "尺寸" }, {
                default: withCtx(() => [
                  createVNode(_component_h_select, {
                    modelValue: sizeValue.value,
                    "onUpdate:modelValue": ($event) => sizeValue.value = $event,
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        value: "large",
                        label: "large"
                      }),
                      createVNode(_component_h_option, {
                        value: "medium",
                        label: "medium"
                      }),
                      createVNode(_component_h_option, {
                        value: "small",
                        label: "small"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "样式" }, {
                default: withCtx(() => [
                  createVNode(_component_h_select, {
                    modelValue: inputStyle.value,
                    "onUpdate:modelValue": ($event) => inputStyle.value = $event,
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        value: "normal",
                        label: "normal"
                      }),
                      createVNode(_component_h_option, {
                        value: "emphasize",
                        label: "emphasize"
                      }),
                      createVNode(_component_h_option, {
                        value: "no-border",
                        label: "no-border"
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
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_auto_complete, {
                    options: options.value,
                    size: sizeValue.value,
                    "input-style": inputStyle.value,
                    onSearch,
                    onSelect,
                    "onUpdate:modelValue": onUpdate
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_auto_complete, {
                      options: options.value,
                      size: sizeValue.value,
                      "input-style": inputStyle.value,
                      onSearch,
                      onSelect,
                      "onUpdate:modelValue": onUpdate
                    }, null, 8, ["options", "size", "input-style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_auto_complete, {
                    options: options.value,
                    size: sizeValue.value,
                    "input-style": inputStyle.value,
                    onSearch,
                    onSelect,
                    "onUpdate:modelValue": onUpdate
                  }, null, 8, ["options", "size", "input-style"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/AutoComplete/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
