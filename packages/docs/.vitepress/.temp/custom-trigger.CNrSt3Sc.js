import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-trigger",
  __ssrInlineRender: true,
  setup(__props) {
    const modelValue = ref();
    const modelValue2 = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_color_picker = resolveComponent("h-color-picker");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event
      }, {
        trigger: withCtx((color, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, {
              icon: "edit",
              link: true,
              style: { color: color.resultsValue.value }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, {
                icon: "edit",
                link: true,
                style: { color: color.resultsValue.value }
              }, null, 8, ["style"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: modelValue2.value,
        "onUpdate:modelValue": ($event) => modelValue2.value = $event
      }, {
        trigger: withCtx((color, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Pick Color ${ssrInterpolate(color.resultsValue.value ? `: ${color.resultsValue.value}` : "")}`);
                } else {
                  return [
                    createTextVNode("Pick Color " + toDisplayString(color.resultsValue.value ? `: ${color.resultsValue.value}` : ""), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, { plain: true }, {
                default: withCtx(() => [
                  createTextVNode("Pick Color " + toDisplayString(color.resultsValue.value ? `: ${color.resultsValue.value}` : ""), 1)
                ]),
                _: 2
              }, 1024)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/ColorPicker/custom-trigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
