import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "position",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const placement = ref("right");
    const onOk = () => {
      console.info("ok button clicked!");
      $message({ type: "success", message: "ok button clicked" });
    };
    const onCancel = () => {
      console.info("cancel button clicked!");
      $message({ type: "warning", message: "cancel button clicked!" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_drawer = resolveComponent("h-drawer");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_radio_group, {
        modelValue: placement.value,
        "onUpdate:modelValue": ($event) => placement.value = $event,
        style: { "margin-bottom": "20px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_radio, { label: "right" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`右 - right（默认）`);
                } else {
                  return [
                    createTextVNode("右 - right（默认）")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "bottom" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`下 - bottom`);
                } else {
                  return [
                    createTextVNode("下 - bottom")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "left" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`左 - left`);
                } else {
                  return [
                    createTextVNode("左 - left")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "top" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`上 - top`);
                } else {
                  return [
                    createTextVNode("上 - top")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_radio, { label: "right" }, {
                default: withCtx(() => [
                  createTextVNode("右 - right（默认）")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "bottom" }, {
                default: withCtx(() => [
                  createTextVNode("下 - bottom")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "left" }, {
                default: withCtx(() => [
                  createTextVNode("左 - left")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "top" }, {
                default: withCtx(() => [
                  createTextVNode("上 - top")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => visible.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer (${ssrInterpolate(placement.value)})`);
          } else {
            return [
              createTextVNode("Open Drawer (" + toDisplayString(placement.value) + ")", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: "Title",
        placement: placement.value,
        onOk,
        onCancel
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
          } else {
            return [
              createVNode("div", null, " You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Drawer/position.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
