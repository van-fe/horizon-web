import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "step",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const rangeValue = ref();
    const value2 = ref();
    const rangeValue2 = ref();
    const value3 = ref();
    const rangeValue3 = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_time_picker = resolveComponent("h-time-picker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, { align: "middle" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 2 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Time:`);
                } else {
                  return [
                    createTextVNode("Time:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_time_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "time",
                    "time-step": 60
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_time_picker, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      type: "time",
                      "time-step": 60
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_time_picker, {
                    modelValue: rangeValue.value,
                    "onUpdate:modelValue": ($event) => rangeValue.value = $event,
                    type: "time",
                    "time-step": 60,
                    "is-range": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_time_picker, {
                      modelValue: rangeValue.value,
                      "onUpdate:modelValue": ($event) => rangeValue.value = $event,
                      type: "time",
                      "time-step": 60,
                      "is-range": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 2 }, {
                default: withCtx(() => [
                  createTextVNode("Time:")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_time_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "time",
                    "time-step": 60
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_time_picker, {
                    modelValue: rangeValue.value,
                    "onUpdate:modelValue": ($event) => rangeValue.value = $event,
                    type: "time",
                    "time-step": 60,
                    "is-range": ""
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
            _push2(ssrRenderComponent(_component_h_col, { span: 2 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Minute:`);
                } else {
                  return [
                    createTextVNode("Minute:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_time_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    type: "minutes",
                    "hour-step": 3,
                    "minute-step": 5
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_time_picker, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      type: "minutes",
                      "hour-step": 3,
                      "minute-step": 5
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_time_picker, {
                    modelValue: rangeValue2.value,
                    "onUpdate:modelValue": ($event) => rangeValue2.value = $event,
                    type: "minutes",
                    "hour-step": 3,
                    "minute-step": 5,
                    "is-range": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_time_picker, {
                      modelValue: rangeValue2.value,
                      "onUpdate:modelValue": ($event) => rangeValue2.value = $event,
                      type: "minutes",
                      "hour-step": 3,
                      "minute-step": 5,
                      "is-range": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 2 }, {
                default: withCtx(() => [
                  createTextVNode("Minute:")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_time_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    type: "minutes",
                    "hour-step": 3,
                    "minute-step": 5
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_time_picker, {
                    modelValue: rangeValue2.value,
                    "onUpdate:modelValue": ($event) => rangeValue2.value = $event,
                    type: "minutes",
                    "hour-step": 3,
                    "minute-step": 5,
                    "is-range": ""
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
            _push2(ssrRenderComponent(_component_h_col, { span: 2 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Second:`);
                } else {
                  return [
                    createTextVNode("Second:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_time_picker, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event,
                    type: "seconds",
                    "hour-step": 3,
                    "minute-step": 5,
                    "second-step": 10
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_time_picker, {
                      modelValue: value3.value,
                      "onUpdate:modelValue": ($event) => value3.value = $event,
                      type: "seconds",
                      "hour-step": 3,
                      "minute-step": 5,
                      "second-step": 10
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_time_picker, {
                    modelValue: rangeValue3.value,
                    "onUpdate:modelValue": ($event) => rangeValue3.value = $event,
                    type: "seconds",
                    "hour-step": 3,
                    "minute-step": 5,
                    "second-step": 10,
                    "is-range": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_time_picker, {
                      modelValue: rangeValue3.value,
                      "onUpdate:modelValue": ($event) => rangeValue3.value = $event,
                      type: "seconds",
                      "hour-step": 3,
                      "minute-step": 5,
                      "second-step": 10,
                      "is-range": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 2 }, {
                default: withCtx(() => [
                  createTextVNode("Second:")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_time_picker, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event,
                    type: "seconds",
                    "hour-step": 3,
                    "minute-step": 5,
                    "second-step": 10
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_time_picker, {
                    modelValue: rangeValue3.value,
                    "onUpdate:modelValue": ($event) => rangeValue3.value = $event,
                    type: "seconds",
                    "hour-step": 3,
                    "minute-step": 5,
                    "second-step": 10,
                    "is-range": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/TimePicker/step.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
