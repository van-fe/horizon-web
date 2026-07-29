import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "border",
  __ssrInlineRender: true,
  setup(__props) {
    const radio = ref(1);
    const selectRadio = (val) => {
      console.info("selectRadio ==> ", val);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_radio = resolveComponent("h-radio");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-f4d2fad1${_scopeId2}>medium(default)</div>`);
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: radio.value,
                    "onUpdate:modelValue": ($event) => radio.value = $event,
                    value: 1,
                    class: "radio",
                    size: "medium",
                    border: true,
                    onChange: selectRadio
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Option 1 `);
                      } else {
                        return [
                          createTextVNode(" Option 1 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: radio.value,
                    "onUpdate:modelValue": ($event) => radio.value = $event,
                    value: 2,
                    class: "radio",
                    size: "medium",
                    border: true,
                    onChange: selectRadio
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Option 2 `);
                      } else {
                        return [
                          createTextVNode(" Option 2 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "medium(default)"),
                    createVNode(_component_h_radio, {
                      modelValue: radio.value,
                      "onUpdate:modelValue": ($event) => radio.value = $event,
                      value: 1,
                      class: "radio",
                      size: "medium",
                      border: true,
                      onChange: selectRadio
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Option 1 ")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_radio, {
                      modelValue: radio.value,
                      "onUpdate:modelValue": ($event) => radio.value = $event,
                      value: 2,
                      class: "radio",
                      size: "medium",
                      border: true,
                      onChange: selectRadio
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Option 2 ")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 16 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-f4d2fad1${_scopeId2}>large</div>`);
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: radio.value,
                    "onUpdate:modelValue": ($event) => radio.value = $event,
                    value: 1,
                    class: "radio",
                    size: "large",
                    border: true,
                    onChange: selectRadio
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Option 1 `);
                      } else {
                        return [
                          createTextVNode(" Option 1 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: radio.value,
                    "onUpdate:modelValue": ($event) => radio.value = $event,
                    value: 2,
                    class: "radio",
                    size: "large",
                    border: true,
                    onChange: selectRadio
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Option 2 `);
                      } else {
                        return [
                          createTextVNode(" Option 2 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "large"),
                    createVNode(_component_h_radio, {
                      modelValue: radio.value,
                      "onUpdate:modelValue": ($event) => radio.value = $event,
                      value: 1,
                      class: "radio",
                      size: "large",
                      border: true,
                      onChange: selectRadio
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Option 1 ")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_radio, {
                      modelValue: radio.value,
                      "onUpdate:modelValue": ($event) => radio.value = $event,
                      value: 2,
                      class: "radio",
                      size: "large",
                      border: true,
                      onChange: selectRadio
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Option 2 ")
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
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "medium(default)"),
                  createVNode(_component_h_radio, {
                    modelValue: radio.value,
                    "onUpdate:modelValue": ($event) => radio.value = $event,
                    value: 1,
                    class: "radio",
                    size: "medium",
                    border: true,
                    onChange: selectRadio
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Option 1 ")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_radio, {
                    modelValue: radio.value,
                    "onUpdate:modelValue": ($event) => radio.value = $event,
                    value: 2,
                    class: "radio",
                    size: "medium",
                    border: true,
                    onChange: selectRadio
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Option 2 ")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 16 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "large"),
                  createVNode(_component_h_radio, {
                    modelValue: radio.value,
                    "onUpdate:modelValue": ($event) => radio.value = $event,
                    value: 1,
                    class: "radio",
                    size: "large",
                    border: true,
                    onChange: selectRadio
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Option 1 ")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_radio, {
                    modelValue: radio.value,
                    "onUpdate:modelValue": ($event) => radio.value = $event,
                    value: 2,
                    class: "radio",
                    size: "large",
                    border: true,
                    onChange: selectRadio
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Option 2 ")
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Radio/border.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const border = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4d2fad1"]]);
export {
  border as default
};
