import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-trigger",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const rangeValue = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_date_picker = resolveComponent("h-date-picker");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, { align: "middle" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "datetime",
                    "show-now": ""
                  }, {
                    pickerOuter: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, { plain: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pick datetime: ${ssrInterpolate(value.value)}`);
                            } else {
                              return [
                                createTextVNode("Pick datetime: " + toDisplayString(value.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, { plain: "" }, {
                            default: withCtx(() => [
                              createTextVNode("Pick datetime: " + toDisplayString(value.value), 1)
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
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      type: "datetime",
                      "show-now": ""
                    }, {
                      pickerOuter: withCtx(() => [
                        createVNode(_component_h_button, { plain: "" }, {
                          default: withCtx(() => [
                            createTextVNode("Pick datetime: " + toDisplayString(value.value), 1)
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
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "datetime",
                    "show-now": ""
                  }, {
                    pickerOuter: withCtx(() => [
                      createVNode(_component_h_button, { plain: "" }, {
                        default: withCtx(() => [
                          createTextVNode("Pick datetime: " + toDisplayString(value.value), 1)
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
      _push(ssrRenderComponent(_component_h_row, { align: "middle" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: rangeValue.value,
                    "onUpdate:modelValue": ($event) => rangeValue.value = $event,
                    type: "datetimeRange",
                    "show-now": ""
                  }, {
                    pickerOuter: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, { plain: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pick datetimeRange: ${ssrInterpolate(rangeValue.value)}`);
                            } else {
                              return [
                                createTextVNode("Pick datetimeRange: " + toDisplayString(rangeValue.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, { plain: "" }, {
                            default: withCtx(() => [
                              createTextVNode("Pick datetimeRange: " + toDisplayString(rangeValue.value), 1)
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
                      modelValue: rangeValue.value,
                      "onUpdate:modelValue": ($event) => rangeValue.value = $event,
                      type: "datetimeRange",
                      "show-now": ""
                    }, {
                      pickerOuter: withCtx(() => [
                        createVNode(_component_h_button, { plain: "" }, {
                          default: withCtx(() => [
                            createTextVNode("Pick datetimeRange: " + toDisplayString(rangeValue.value), 1)
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
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: rangeValue.value,
                    "onUpdate:modelValue": ($event) => rangeValue.value = $event,
                    type: "datetimeRange",
                    "show-now": ""
                  }, {
                    pickerOuter: withCtx(() => [
                      createVNode(_component_h_button, { plain: "" }, {
                        default: withCtx(() => [
                          createTextVNode("Pick datetimeRange: " + toDisplayString(rangeValue.value), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/DatePicker/custom-trigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
