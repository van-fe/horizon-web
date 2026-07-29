import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "formatter",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref(1e3);
    const value2 = ref(100);
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
                  _push3(`<div class="demo-title"${_scopeId2}>千分位</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    formatter: (val) => `$ ${val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
                    parser: (val) => val.replace(/\$\s?|(,*)/g, "")
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "千分位"),
                    createVNode(_component_h_input_number, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      formatter: (val) => `$ ${val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
                      parser: (val) => val.replace(/\$\s?|(,*)/g, "")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "formatter", "parser"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>带百分号</div>`);
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    min: 0,
                    max: 100,
                    formatter: (value) => `${value}%`,
                    parser: (value) => value.replace(/%/g, "")
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "带百分号"),
                    createVNode(_component_h_input_number, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      min: 0,
                      max: 100,
                      formatter: (value) => `${value}%`,
                      parser: (value) => value.replace(/%/g, "")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "formatter", "parser"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "千分位"),
                  createVNode(_component_h_input_number, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    formatter: (val) => `$ ${val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
                    parser: (val) => val.replace(/\$\s?|(,*)/g, "")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "formatter", "parser"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "带百分号"),
                  createVNode(_component_h_input_number, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    min: 0,
                    max: 100,
                    formatter: (value) => `${value}%`,
                    parser: (value) => value.replace(/%/g, "")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "formatter", "parser"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/InputNumber/formatter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
