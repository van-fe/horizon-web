import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    const disabled = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_space, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_checkbox, {
              modelValue: disabled.value,
              "onUpdate:modelValue": ($event) => disabled.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`禁用按钮`);
                } else {
                  return [
                    createTextVNode("禁用按钮")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}>Space</div>`);
            _push2(ssrRenderComponent(_component_h_button, { disabled: disabled.value }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Created`);
                } else {
                  return [
                    createTextVNode("Created")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, {
              disabled: disabled.value,
              type: "normal"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Refresh`);
                } else {
                  return [
                    createTextVNode("Refresh")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, {
              disabled: disabled.value,
              type: "normal",
              icon: "full_screen"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_checkbox, {
                modelValue: disabled.value,
                "onUpdate:modelValue": ($event) => disabled.value = $event
              }, {
                default: withCtx(() => [
                  createTextVNode("禁用按钮")
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", null, "Space"),
              createVNode(_component_h_button, { disabled: disabled.value }, {
                default: withCtx(() => [
                  createTextVNode("Created")
                ]),
                _: 1
              }, 8, ["disabled"]),
              createVNode(_component_h_button, {
                disabled: disabled.value,
                type: "normal"
              }, {
                default: withCtx(() => [
                  createTextVNode("Refresh")
                ]),
                _: 1
              }, 8, ["disabled"]),
              createVNode(_component_h_button, {
                disabled: disabled.value,
                type: "normal",
                icon: "full_screen"
              }, null, 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Space/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
