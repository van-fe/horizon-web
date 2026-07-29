import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "disabled",
  __ssrInlineRender: true,
  setup(__props) {
    const modelValue1 = ref(true);
    const modelValue2 = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_checkbox = resolveComponent("h-checkbox");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid" }, _attrs))} data-v-47838885><div data-v-47838885>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        "model-value": false,
        disabled: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`禁用`);
          } else {
            return [
              createTextVNode("禁用")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-47838885>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        "model-value": false,
        indeterminate: "",
        disabled: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`半选禁用`);
          } else {
            return [
              createTextVNode("半选禁用")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-47838885>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: modelValue1.value,
        "onUpdate:modelValue": ($event) => modelValue1.value = $event,
        disabled: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`已选禁用`);
          } else {
            return [
              createTextVNode("已选禁用")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-47838885>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: modelValue2.value,
        "onUpdate:modelValue": ($event) => modelValue2.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`非禁用`);
          } else {
            return [
              createTextVNode("非禁用")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-47838885>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        "model-value": false,
        disabled: true,
        border: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`禁用`);
          } else {
            return [
              createTextVNode("禁用")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-47838885>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        "model-value": false,
        indeterminate: "",
        disabled: true,
        border: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`半选禁用`);
          } else {
            return [
              createTextVNode("半选禁用")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-47838885>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: modelValue1.value,
        "onUpdate:modelValue": ($event) => modelValue1.value = $event,
        disabled: true,
        border: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`已选禁用`);
          } else {
            return [
              createTextVNode("已选禁用")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-47838885>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: modelValue2.value,
        "onUpdate:modelValue": ($event) => modelValue2.value = $event,
        border: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`非禁用`);
          } else {
            return [
              createTextVNode("非禁用")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Checkbox/disabled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const disabled = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-47838885"]]);
export {
  disabled as default
};
