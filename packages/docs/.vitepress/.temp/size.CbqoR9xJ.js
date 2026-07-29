import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "size",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref("#E83030");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_color_picker = resolveComponent("h-color-picker");
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "color-picker-demo__size" }, _attrs))} data-v-c175601d><li data-v-c175601d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        size: "small",
        alpha: ""
      }, null, _parent));
      _push(`</li><li data-v-c175601d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        "square-text": "",
        size: "small",
        alpha: ""
      }, null, _parent));
      _push(`</li><li data-v-c175601d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        "square-text": "",
        size: "small",
        alpha: ""
      }, {
        squareText: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 自定义文本 `);
          } else {
            return [
              createTextVNode(" 自定义文本 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c175601d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        size: "medium",
        alpha: ""
      }, null, _parent));
      _push(`</li><li data-v-c175601d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        "square-text": "",
        size: "medium",
        alpha: ""
      }, null, _parent));
      _push(`</li><li data-v-c175601d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        "square-text": "",
        size: "medium",
        alpha: ""
      }, {
        squareText: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 自定义文本 `);
          } else {
            return [
              createTextVNode(" 自定义文本 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c175601d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        size: "large",
        alpha: ""
      }, null, _parent));
      _push(`</li><li data-v-c175601d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        "square-text": "",
        size: "large",
        alpha: ""
      }, null, _parent));
      _push(`</li><li data-v-c175601d>`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        "square-text": "",
        size: "large",
        alpha: ""
      }, {
        squareText: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 自定义文本 `);
          } else {
            return [
              createTextVNode(" 自定义文本 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/ColorPicker/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c175601d"]]);
export {
  size as default
};
