import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "clearable",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_input_number = resolveComponent("h-input-number");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, { gutter: 12 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>large</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    size: "large",
                    clearable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "large"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      size: "large",
                      clearable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>medium (default)</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    clearable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "medium (default)"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      clearable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>small</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    size: "small",
                    clearable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "small"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      size: "small",
                      clearable: ""
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
                  createVNode("div", { class: "demo-title" }, "large"),
                  createVNode(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    size: "large",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "medium (default)"),
                  createVNode(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "small"),
                  createVNode(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    size: "small",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, { gutter: 12 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>默认</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    clearable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "默认"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      clearable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>控制器位于两侧</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "controls-position": "between",
                    clearable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "控制器位于两侧"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "controls-position": "between",
                      clearable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>控制器隐藏</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    controls: false,
                    clearable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "控制器隐藏"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      controls: false,
                      clearable: ""
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
                  createVNode("div", { class: "demo-title" }, "默认"),
                  createVNode(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "控制器位于两侧"),
                  createVNode(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "controls-position": "between",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "控制器隐藏"),
                  createVNode(_component_h_input_number, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    controls: false,
                    clearable: ""
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/InputNumber/clearable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
