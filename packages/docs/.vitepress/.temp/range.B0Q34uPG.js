import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "range",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref();
    const value2 = ref(0);
    const value3 = ref();
    function onChange(val) {
      console.info("change: ", val);
    }
    function onUpdate(val) {
      console.info("update: ", val);
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
                  _push3(`<div class="demo-title"${_scopeId2}>步长默认</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    min: 5,
                    max: 10,
                    onChange
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "步长默认"),
                    createVNode(_component_h_input_number, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      min: 5,
                      max: 10,
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
                  _push3(`<div class="demo-title"${_scopeId2}>步长为0.5</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    min: 5,
                    max: 10,
                    step: 0.5,
                    precision: 1
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "步长为0.5"),
                    createVNode(_component_h_input_number, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      min: 5,
                      max: 10,
                      step: 0.5,
                      precision: 1
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>数值必须是步长的倍数，步长为3</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": [($event) => value3.value = $event, onUpdate],
                    min: 0,
                    max: 10,
                    step: 3,
                    "step-strictly": true,
                    onChange
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "数值必须是步长的倍数，步长为3"),
                    createVNode(_component_h_input_number, {
                      modelValue: value3.value,
                      "onUpdate:modelValue": [($event) => value3.value = $event, onUpdate],
                      min: 0,
                      max: 10,
                      step: 3,
                      "step-strictly": true,
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
                  createVNode("div", { class: "demo-title" }, "步长默认"),
                  createVNode(_component_h_input_number, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    min: 5,
                    max: 10,
                    onChange
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "步长为0.5"),
                  createVNode(_component_h_input_number, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    min: 5,
                    max: 10,
                    step: 0.5,
                    precision: 1
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "数值必须是步长的倍数，步长为3"),
                  createVNode(_component_h_input_number, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": [($event) => value3.value = $event, onUpdate],
                    min: 0,
                    max: 10,
                    step: 3,
                    "step-strictly": true,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/InputNumber/range.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
