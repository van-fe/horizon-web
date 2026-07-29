import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "textarea",
  __ssrInlineRender: true,
  setup(__props) {
    const val1 = ref("");
    const val2 = ref("");
    const val3 = ref("");
    const val4 = ref("");
    const val5 = ref("");
    const val6 = ref("");
    const val7 = ref("");
    const val8 = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_input = resolveComponent("h-input");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h6 data-v-a445a89f${_scopeId2}>普通</h6>`);
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: val1.value,
                    "onUpdate:modelValue": ($event) => val1.value = $event,
                    type: "textarea",
                    rows: 3,
                    resize: "none"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h6", null, "普通"),
                    createVNode(_component_h_input, {
                      modelValue: val1.value,
                      "onUpdate:modelValue": ($event) => val1.value = $event,
                      type: "textarea",
                      rows: 3,
                      resize: "none"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h6 data-v-a445a89f${_scopeId2}>可拖拽</h6>`);
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: val2.value,
                    "onUpdate:modelValue": ($event) => val2.value = $event,
                    type: "textarea",
                    rows: 3
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h6", null, "可拖拽"),
                    createVNode(_component_h_input, {
                      modelValue: val2.value,
                      "onUpdate:modelValue": ($event) => val2.value = $event,
                      type: "textarea",
                      rows: 3
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h6 data-v-a445a89f${_scopeId2}>自适应高度</h6>`);
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: val3.value,
                    "onUpdate:modelValue": ($event) => val3.value = $event,
                    "auto-size": true,
                    type: "textarea"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h6", null, "自适应高度"),
                    createVNode(_component_h_input, {
                      modelValue: val3.value,
                      "onUpdate:modelValue": ($event) => val3.value = $event,
                      "auto-size": true,
                      type: "textarea"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h6 data-v-a445a89f${_scopeId2}>最大最小高度</h6>`);
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: val4.value,
                    "onUpdate:modelValue": ($event) => val4.value = $event,
                    "auto-size": { minRows: 4, maxRows: 8 },
                    type: "textarea"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h6", null, "最大最小高度"),
                    createVNode(_component_h_input, {
                      modelValue: val4.value,
                      "onUpdate:modelValue": ($event) => val4.value = $event,
                      "auto-size": { minRows: 4, maxRows: 8 },
                      type: "textarea"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h6 data-v-a445a89f${_scopeId2}>最小高度</h6>`);
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: val7.value,
                    "onUpdate:modelValue": ($event) => val7.value = $event,
                    "auto-size": { minRows: 2, maxRows: null },
                    type: "textarea"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h6", null, "最小高度"),
                    createVNode(_component_h_input, {
                      modelValue: val7.value,
                      "onUpdate:modelValue": ($event) => val7.value = $event,
                      "auto-size": { minRows: 2, maxRows: null },
                      type: "textarea"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h6 data-v-a445a89f${_scopeId2}>最大高度</h6>`);
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: val8.value,
                    "onUpdate:modelValue": ($event) => val8.value = $event,
                    "auto-size": { maxRows: 6 },
                    type: "textarea"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h6", null, "最大高度"),
                    createVNode(_component_h_input, {
                      modelValue: val8.value,
                      "onUpdate:modelValue": ($event) => val8.value = $event,
                      "auto-size": { maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h6 data-v-a445a89f${_scopeId2}>input-style为noborder</h6>`);
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: val5.value,
                    "onUpdate:modelValue": ($event) => val5.value = $event,
                    resize: "none",
                    type: "textarea",
                    "input-style": "no-border"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h6", null, "input-style为noborder"),
                    createVNode(_component_h_input, {
                      modelValue: val5.value,
                      "onUpdate:modelValue": ($event) => val5.value = $event,
                      resize: "none",
                      type: "textarea",
                      "input-style": "no-border"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h6 data-v-a445a89f${_scopeId2}>input-style为emphasize</h6>`);
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: val6.value,
                    "onUpdate:modelValue": ($event) => val6.value = $event,
                    resize: "none",
                    type: "textarea",
                    "input-style": "emphasize"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h6", null, "input-style为emphasize"),
                    createVNode(_component_h_input, {
                      modelValue: val6.value,
                      "onUpdate:modelValue": ($event) => val6.value = $event,
                      resize: "none",
                      type: "textarea",
                      "input-style": "emphasize"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("h6", null, "普通"),
                  createVNode(_component_h_input, {
                    modelValue: val1.value,
                    "onUpdate:modelValue": ($event) => val1.value = $event,
                    type: "textarea",
                    rows: 3,
                    resize: "none"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("h6", null, "可拖拽"),
                  createVNode(_component_h_input, {
                    modelValue: val2.value,
                    "onUpdate:modelValue": ($event) => val2.value = $event,
                    type: "textarea",
                    rows: 3
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("h6", null, "自适应高度"),
                  createVNode(_component_h_input, {
                    modelValue: val3.value,
                    "onUpdate:modelValue": ($event) => val3.value = $event,
                    "auto-size": true,
                    type: "textarea"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("h6", null, "最大最小高度"),
                  createVNode(_component_h_input, {
                    modelValue: val4.value,
                    "onUpdate:modelValue": ($event) => val4.value = $event,
                    "auto-size": { minRows: 4, maxRows: 8 },
                    type: "textarea"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("h6", null, "最小高度"),
                  createVNode(_component_h_input, {
                    modelValue: val7.value,
                    "onUpdate:modelValue": ($event) => val7.value = $event,
                    "auto-size": { minRows: 2, maxRows: null },
                    type: "textarea"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("h6", null, "最大高度"),
                  createVNode(_component_h_input, {
                    modelValue: val8.value,
                    "onUpdate:modelValue": ($event) => val8.value = $event,
                    "auto-size": { maxRows: 6 },
                    type: "textarea"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("h6", null, "input-style为noborder"),
                  createVNode(_component_h_input, {
                    modelValue: val5.value,
                    "onUpdate:modelValue": ($event) => val5.value = $event,
                    resize: "none",
                    type: "textarea",
                    "input-style": "no-border"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("h6", null, "input-style为emphasize"),
                  createVNode(_component_h_input, {
                    modelValue: val6.value,
                    "onUpdate:modelValue": ($event) => val6.value = $event,
                    resize: "none",
                    type: "textarea",
                    "input-style": "emphasize"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/textarea.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const textarea = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a445a89f"]]);
export {
  textarea as default
};
