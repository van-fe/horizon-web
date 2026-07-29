import { defineComponent, ref, computed, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "size",
  __ssrInlineRender: true,
  setup(__props) {
    const sizeRef = ref("medium");
    const sizeNumberRef = ref(240);
    const emptySizeRef = computed(() => {
      if (sizeRef.value === "number") {
        return sizeNumberRef.value;
      }
      return sizeRef.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_empty = resolveComponent("h-empty");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_input_number = resolveComponent("h-input-number");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_empty, {
        size: emptySizeRef.value,
        description: "No task for now, take a coffee break"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_radio_group, {
        modelValue: sizeRef.value,
        "onUpdate:modelValue": ($event) => sizeRef.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_radio, { label: "small" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "medium" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "large" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "number" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: sizeNumberRef.value,
                    "onUpdate:modelValue": ($event) => sizeNumberRef.value = $event,
                    step: 10
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, {
                      modelValue: sizeNumberRef.value,
                      "onUpdate:modelValue": ($event) => sizeNumberRef.value = $event,
                      step: 10
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_radio, { label: "small" }),
              createVNode(_component_h_radio, { label: "medium" }),
              createVNode(_component_h_radio, { label: "large" }),
              createVNode(_component_h_radio, { label: "number" }, {
                default: withCtx(() => [
                  createVNode(_component_h_input_number, {
                    modelValue: sizeNumberRef.value,
                    "onUpdate:modelValue": ($event) => sizeNumberRef.value = $event,
                    step: 10
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Empty/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
