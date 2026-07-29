import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "examples",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref("#178CA6");
    const value2 = ref("linear-gradient(90deg, #45D0E2FF 0%, #FE0000FF 60.60606060606061%, #000000FF 100%)");
    const value3 = ref("#178CA6");
    const value4 = ref("#178CA6");
    const value5 = ref("#178CA6");
    const value6 = ref("#178CA6");
    const value7 = ref("#178CA6");
    const value8 = ref("#178CA6");
    const value9 = ref("#178CA6");
    const value10 = ref("#178CA6");
    const swatches = [
      "#178CA6",
      "#0BA1D6",
      "#26BD4B",
      "#FDA71C",
      "#E83030",
      "#178CA6",
      "#0BA1D6",
      "#26BD4B",
      "#FDA71C",
      "#E83030"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_color_picker = resolveComponent("h-color-picker");
      _push(ssrRenderComponent(_component_h_form, mergeProps({
        "label-position": "left",
        "label-width": "160px",
        "label-vertical-align": "middle",
        class: "grid-form"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "带渐变设置" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "trigger-type": "square",
                    "enable-gradient": true,
                    editable: true,
                    alpha: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      "trigger-type": "square",
                      "enable-gradient": true,
                      editable: true,
                      alpha: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "只有一种渐变" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "trigger-type": "square",
                    "enable-gradient": true,
                    "gradient-list": ["linear"],
                    editable: true,
                    alpha: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      "trigger-type": "square",
                      "enable-gradient": true,
                      "gradient-list": ["linear"],
                      editable: true,
                      alpha: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "带系统预设颜色" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    "show-swatch": "",
                    swatches,
                    "need-confirm": false,
                    clearable: false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value3.value,
                      "onUpdate:modelValue": ($event) => value3.value = $event,
                      "trigger-type": "square",
                      editable: "",
                      alpha: "",
                      "show-swatch": "",
                      swatches,
                      "need-confirm": false,
                      clearable: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "带取消/确认按钮" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value4.value,
                    "onUpdate:modelValue": ($event) => value4.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    clearable: false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value4.value,
                      "onUpdate:modelValue": ($event) => value4.value = $event,
                      "trigger-type": "square",
                      editable: "",
                      alpha: "",
                      clearable: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "带最近使用颜色" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value5.value,
                    "onUpdate:modelValue": ($event) => value5.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    "recently-colors": "",
                    "need-confirm": false,
                    clearable: false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value5.value,
                      "onUpdate:modelValue": ($event) => value5.value = $event,
                      "trigger-type": "square",
                      editable: "",
                      alpha: "",
                      "recently-colors": "",
                      "need-confirm": false,
                      clearable: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "带清空按钮" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value6.value,
                    "onUpdate:modelValue": ($event) => value6.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    "need-confirm": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value6.value,
                      "onUpdate:modelValue": ($event) => value6.value = $event,
                      "trigger-type": "square",
                      editable: "",
                      alpha: "",
                      "need-confirm": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "带自定义预设颜色" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value7.value,
                    "onUpdate:modelValue": ($event) => value7.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    "need-confirm": false,
                    clearable: false,
                    "custom-colors": true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value7.value,
                      "onUpdate:modelValue": ($event) => value7.value = $event,
                      "trigger-type": "square",
                      editable: "",
                      alpha: "",
                      "need-confirm": false,
                      clearable: false,
                      "custom-colors": true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "带取消/确认+清空按钮" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value8.value,
                    "onUpdate:modelValue": ($event) => value8.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value8.value,
                      "onUpdate:modelValue": ($event) => value8.value = $event,
                      "trigger-type": "square",
                      editable: "",
                      alpha: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "带网页取色" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value9.value,
                    "onUpdate:modelValue": ($event) => value9.value = $event,
                    "trigger-type": "square",
                    "enable-eye-dropper": true,
                    editable: "",
                    alpha: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value9.value,
                      "onUpdate:modelValue": ($event) => value9.value = $event,
                      "trigger-type": "square",
                      "enable-eye-dropper": true,
                      editable: "",
                      alpha: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "联合使用" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: value10.value,
                    "onUpdate:modelValue": ($event) => value10.value = $event,
                    "trigger-type": "square",
                    "enable-gradient": true,
                    editable: true,
                    alpha: true,
                    "show-swatch": true,
                    swatches,
                    "recently-colors": true,
                    "custom-colors": true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: value10.value,
                      "onUpdate:modelValue": ($event) => value10.value = $event,
                      "trigger-type": "square",
                      "enable-gradient": true,
                      editable: true,
                      alpha: true,
                      "show-swatch": true,
                      swatches,
                      "recently-colors": true,
                      "custom-colors": true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "带渐变设置" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "trigger-type": "square",
                    "enable-gradient": true,
                    editable: true,
                    alpha: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "只有一种渐变" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "trigger-type": "square",
                    "enable-gradient": true,
                    "gradient-list": ["linear"],
                    editable: true,
                    alpha: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "带系统预设颜色" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    "show-swatch": "",
                    swatches,
                    "need-confirm": false,
                    clearable: false
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "带取消/确认按钮" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value4.value,
                    "onUpdate:modelValue": ($event) => value4.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    clearable: false
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "带最近使用颜色" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value5.value,
                    "onUpdate:modelValue": ($event) => value5.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    "recently-colors": "",
                    "need-confirm": false,
                    clearable: false
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "带清空按钮" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value6.value,
                    "onUpdate:modelValue": ($event) => value6.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    "need-confirm": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "带自定义预设颜色" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value7.value,
                    "onUpdate:modelValue": ($event) => value7.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: "",
                    "need-confirm": false,
                    clearable: false,
                    "custom-colors": true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "带取消/确认+清空按钮" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value8.value,
                    "onUpdate:modelValue": ($event) => value8.value = $event,
                    "trigger-type": "square",
                    editable: "",
                    alpha: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "带网页取色" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value9.value,
                    "onUpdate:modelValue": ($event) => value9.value = $event,
                    "trigger-type": "square",
                    "enable-eye-dropper": true,
                    editable: "",
                    alpha: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "联合使用" }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: value10.value,
                    "onUpdate:modelValue": ($event) => value10.value = $event,
                    "trigger-type": "square",
                    "enable-gradient": true,
                    editable: true,
                    alpha: true,
                    "show-swatch": true,
                    swatches,
                    "recently-colors": true,
                    "custom-colors": true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/ColorPicker/examples.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const examples = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3852af8e"]]);
export {
  examples as default
};
