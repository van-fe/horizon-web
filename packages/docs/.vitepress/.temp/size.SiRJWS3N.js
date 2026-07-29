import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "size",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref(0);
    function onInput(value2) {
      console.info("input", value2);
    }
    function onChange(value2) {
      console.info("change", value2);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_input_number = resolveComponent("h-input-number");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 12 }, _attrs), {
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
                    onInput,
                    onChange
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "large"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      size: "large",
                      onInput,
                      onChange
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
                    onInput,
                    onChange
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "medium (default)"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      onInput,
                      onChange
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
                    onInput,
                    onChange
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "small"),
                    createVNode(_component_h_input_number, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      size: "small",
                      onInput,
                      onChange
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
                    onInput,
                    onChange
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
                    onInput,
                    onChange
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
                    onInput,
                    onChange
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/InputNumber/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
