import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "first-day-of-week",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const values = ref();
    const value2 = ref();
    const firstDayOfWeek = ref(0);
    const showBeforeAfterDate = ref(true);
    const fixedSixRows = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_input_number = resolveComponent("h-input-number");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_date_picker = resolveComponent("h-date-picker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "first day of week" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: firstDayOfWeek.value,
                    "onUpdate:modelValue": ($event) => firstDayOfWeek.value = $event,
                    min: 0,
                    max: 6,
                    style: { "width": "200px" }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, {
                      modelValue: firstDayOfWeek.value,
                      "onUpdate:modelValue": ($event) => firstDayOfWeek.value = $event,
                      min: 0,
                      max: 6,
                      style: { "width": "200px" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "show before and after date" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: showBeforeAfterDate.value,
                    "onUpdate:modelValue": ($event) => showBeforeAfterDate.value = $event,
                    status: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: showBeforeAfterDate.value,
                      "onUpdate:modelValue": ($event) => showBeforeAfterDate.value = $event,
                      status: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "fixed six rows" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: fixedSixRows.value,
                    "onUpdate:modelValue": ($event) => fixedSixRows.value = $event,
                    status: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: fixedSixRows.value,
                      "onUpdate:modelValue": ($event) => fixedSixRows.value = $event,
                      status: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "first day of week" }, {
                default: withCtx(() => [
                  createVNode(_component_h_input_number, {
                    modelValue: firstDayOfWeek.value,
                    "onUpdate:modelValue": ($event) => firstDayOfWeek.value = $event,
                    min: 0,
                    max: 6,
                    style: { "width": "200px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "show before and after date" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: showBeforeAfterDate.value,
                    "onUpdate:modelValue": ($event) => showBeforeAfterDate.value = $event,
                    status: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "fixed six rows" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: fixedSixRows.value,
                    "onUpdate:modelValue": ($event) => fixedSixRows.value = $event,
                    status: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    "first-day-of-week": firstDayOfWeek.value,
                    "show-before-after-date": showBeforeAfterDate.value,
                    "fixed-six-rows": fixedSixRows.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      type: "date",
                      "first-day-of-week": firstDayOfWeek.value,
                      "show-before-after-date": showBeforeAfterDate.value,
                      "fixed-six-rows": fixedSixRows.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "first-day-of-week", "show-before-after-date", "fixed-six-rows"])
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
                    type: "date-range",
                    "first-day-of-week": firstDayOfWeek.value,
                    "show-before-after-date": showBeforeAfterDate.value,
                    "fixed-six-rows": fixedSixRows.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: values.value,
                      "onUpdate:modelValue": ($event) => values.value = $event,
                      type: "date-range",
                      "first-day-of-week": firstDayOfWeek.value,
                      "show-before-after-date": showBeforeAfterDate.value,
                      "fixed-six-rows": fixedSixRows.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "first-day-of-week", "show-before-after-date", "fixed-six-rows"])
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
                    type: "week",
                    placeholder: "week picker",
                    format: "[Week:] wo",
                    "first-day-of-week": firstDayOfWeek.value,
                    "show-before-after-date": showBeforeAfterDate.value,
                    "fixed-six-rows": fixedSixRows.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      type: "week",
                      placeholder: "week picker",
                      format: "[Week:] wo",
                      "first-day-of-week": firstDayOfWeek.value,
                      "show-before-after-date": showBeforeAfterDate.value,
                      "fixed-six-rows": fixedSixRows.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "first-day-of-week", "show-before-after-date", "fixed-six-rows"])
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
                    "first-day-of-week": firstDayOfWeek.value,
                    "show-before-after-date": showBeforeAfterDate.value,
                    "fixed-six-rows": fixedSixRows.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "first-day-of-week", "show-before-after-date", "fixed-six-rows"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    type: "date-range",
                    "first-day-of-week": firstDayOfWeek.value,
                    "show-before-after-date": showBeforeAfterDate.value,
                    "fixed-six-rows": fixedSixRows.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "first-day-of-week", "show-before-after-date", "fixed-six-rows"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_date_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    type: "week",
                    placeholder: "week picker",
                    format: "[Week:] wo",
                    "first-day-of-week": firstDayOfWeek.value,
                    "show-before-after-date": showBeforeAfterDate.value,
                    "fixed-six-rows": fixedSixRows.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "first-day-of-week", "show-before-after-date", "fixed-six-rows"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/DatePicker/first-day-of-week.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
