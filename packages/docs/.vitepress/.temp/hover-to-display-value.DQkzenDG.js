import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "hover-to-display-value",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const value2 = ref();
    const values = ref();
    const values2 = ref();
    const hoverToDisplayValue = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_date_picker = resolveComponent("h-date-picker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "hover to display value" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: hoverToDisplayValue.value,
                    "onUpdate:modelValue": ($event) => hoverToDisplayValue.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { value: true }, {
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
                        _push4(ssrRenderComponent(_component_h_radio, { value: false }, {
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
                          createVNode(_component_h_radio, { value: true }, {
                            default: withCtx(() => [
                              createTextVNode("True")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { value: false }, {
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
                      modelValue: hoverToDisplayValue.value,
                      "onUpdate:modelValue": ($event) => hoverToDisplayValue.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { value: true }, {
                          default: withCtx(() => [
                            createTextVNode("True")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { value: false }, {
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
              createVNode(_component_h_form_item, { label: "hover to display value" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: hoverToDisplayValue.value,
                    "onUpdate:modelValue": ($event) => hoverToDisplayValue.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { value: true }, {
                        default: withCtx(() => [
                          createTextVNode("True")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { value: false }, {
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
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "date",
                    "hover-to-display-value": hoverToDisplayValue.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      type: "date",
                      "hover-to-display-value": hoverToDisplayValue.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "hover-to-display-value"])
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
                    "hover-to-display-value": hoverToDisplayValue.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: values.value,
                      "onUpdate:modelValue": ($event) => values.value = $event,
                      type: "dateRange",
                      "hover-to-display-value": hoverToDisplayValue.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "hover-to-display-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "date",
                    "hover-to-display-value": hoverToDisplayValue.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "hover-to-display-value"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    type: "dateRange",
                    "hover-to-display-value": hoverToDisplayValue.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "hover-to-display-value"])
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
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    type: "dateMinutes",
                    "hover-to-display-value": hoverToDisplayValue.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      type: "dateMinutes",
                      "hover-to-display-value": hoverToDisplayValue.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "hover-to-display-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    type: "dateMinutesRange",
                    "hover-to-display-value": hoverToDisplayValue.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      type: "dateMinutesRange",
                      "hover-to-display-value": hoverToDisplayValue.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "hover-to-display-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    type: "dateMinutes",
                    "hover-to-display-value": hoverToDisplayValue.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "hover-to-display-value"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    type: "dateMinutesRange",
                    "hover-to-display-value": hoverToDisplayValue.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "hover-to-display-value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/DatePicker/hover-to-display-value.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
