import { defineComponent, shallowRef, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "format-value",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = shallowRef({ "value": 1, "label": "中国" });
    const value2 = shallowRef([{ "value": 1, "label": "中国" }]);
    function valueFormat(originValue) {
      console.info(JSON.stringify(originValue));
      return {
        value: originValue.value,
        label: originValue.label
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "value-format": valueFormat,
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 1,
                          label: "中国"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 2,
                          label: "美国"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 3,
                          label: "日本"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            value: 1,
                            label: "中国"
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "美国"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            label: "日本"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mb-2"${_scopeId2}>你选中的值是 ${ssrInterpolate(value1.value)}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_select, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      "value-format": valueFormat,
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          value: 1,
                          label: "中国"
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "美国"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          label: "日本"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "mb-2" }, "你选中的值是 " + toDisplayString(value1.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "value-format": valueFormat,
                    multiple: "",
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 1,
                          label: "中国"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 2,
                          label: "美国"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 3,
                          label: "日本"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            value: 1,
                            label: "中国"
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "美国"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            label: "日本"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mb-2"${_scopeId2}>你选中的值是 ${ssrInterpolate(value2.value)}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_select, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      "value-format": valueFormat,
                      multiple: "",
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          value: 1,
                          label: "中国"
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "美国"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          label: "日本"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "mb-2" }, "你选中的值是 " + toDisplayString(value2.value), 1)
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
                  createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "value-format": valueFormat,
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        value: 1,
                        label: "中国"
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "美国"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "日本"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "mb-2" }, "你选中的值是 " + toDisplayString(value1.value), 1)
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "value-format": valueFormat,
                    multiple: "",
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        value: 1,
                        label: "中国"
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "美国"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "日本"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "mb-2" }, "你选中的值是 " + toDisplayString(value2.value), 1)
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/format-value.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
