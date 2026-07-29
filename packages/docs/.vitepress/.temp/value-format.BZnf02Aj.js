import { defineComponent, ref, resolveComponent, withCtx, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "value-format",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const value2 = ref();
    const value3 = ref(1734559200);
    const value4 = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_date_picker = resolveComponent("h-date-picker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> Default: ${ssrInterpolate(value.value)}</div>`);
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "date",
                    format: "YYYY-MM-DD"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " Default: " + toDisplayString(value.value), 1),
                    createVNode(_component_h_date_picker, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      type: "date",
                      format: "YYYY-MM-DD"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> Datetime Format: ${ssrInterpolate(value2.value)}</div>`);
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    type: "date",
                    format: "YYYY-MM-DD",
                    "value-format": "YYYY-MM-DD HH:mm"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " Datetime Format: " + toDisplayString(value2.value), 1),
                    createVNode(_component_h_date_picker, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      type: "date",
                      format: "YYYY-MM-DD",
                      "value-format": "YYYY-MM-DD HH:mm"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " Default: " + toDisplayString(value.value), 1),
                  createVNode(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "date",
                    format: "YYYY-MM-DD"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " Datetime Format: " + toDisplayString(value2.value), 1),
                  createVNode(_component_h_date_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    type: "date",
                    format: "YYYY-MM-DD",
                    "value-format": "YYYY-MM-DD HH:mm"
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
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> Timestamp: ${ssrInterpolate(value3.value)}</div>`);
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event,
                    type: "datetime",
                    format: "YYYY-MM-DD HH:mm:ss",
                    "value-format": "X"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " Timestamp: " + toDisplayString(value3.value), 1),
                    createVNode(_component_h_date_picker, {
                      modelValue: value3.value,
                      "onUpdate:modelValue": ($event) => value3.value = $event,
                      type: "datetime",
                      format: "YYYY-MM-DD HH:mm:ss",
                      "value-format": "X"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> Timestamp(ms): ${ssrInterpolate(value4.value)}</div>`);
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value4.value,
                    "onUpdate:modelValue": ($event) => value4.value = $event,
                    type: "date-range",
                    format: "YYYY/MM/DD wo",
                    "value-format": "x"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " Timestamp(ms): " + toDisplayString(value4.value), 1),
                    createVNode(_component_h_date_picker, {
                      modelValue: value4.value,
                      "onUpdate:modelValue": ($event) => value4.value = $event,
                      type: "date-range",
                      format: "YYYY/MM/DD wo",
                      "value-format": "x"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " Timestamp: " + toDisplayString(value3.value), 1),
                  createVNode(_component_h_date_picker, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event,
                    type: "datetime",
                    format: "YYYY-MM-DD HH:mm:ss",
                    "value-format": "X"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " Timestamp(ms): " + toDisplayString(value4.value), 1),
                  createVNode(_component_h_date_picker, {
                    modelValue: value4.value,
                    "onUpdate:modelValue": ($event) => value4.value = $event,
                    type: "date-range",
                    format: "YYYY/MM/DD wo",
                    "value-format": "x"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/DatePicker/value-format.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
