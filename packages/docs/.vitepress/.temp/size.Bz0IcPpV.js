import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "size",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const size = ref("medium");
    const onOpen = () => {
      visible.value = true;
    };
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
        modelValue: size.value,
        "onUpdate:modelValue": ($event) => size.value = $event,
        style: { "margin-bottom": "20px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_radio, { label: "small" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`小 - small`);
                } else {
                  return [
                    createTextVNode("小 - small")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "medium" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`中(默认) - medium`);
                } else {
                  return [
                    createTextVNode("中(默认) - medium")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "large" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`大 - large`);
                } else {
                  return [
                    createTextVNode("大 - large")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "500px" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`固定像素 - 500px`);
                } else {
                  return [
                    createTextVNode("固定像素 - 500px")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "75%" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`固定尺寸 - 75%`);
                } else {
                  return [
                    createTextVNode("固定尺寸 - 75%")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_radio, { label: "small" }, {
                default: withCtx(() => [
                  createTextVNode("小 - small")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "medium" }, {
                default: withCtx(() => [
                  createTextVNode("中(默认) - medium")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "large" }, {
                default: withCtx(() => [
                  createTextVNode("大 - large")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "500px" }, {
                default: withCtx(() => [
                  createTextVNode("固定像素 - 500px")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "75%" }, {
                default: withCtx(() => [
                  createTextVNode("固定尺寸 - 75%")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => onOpen()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer (${ssrInterpolate(size.value)})`);
          } else {
            return [
              createTextVNode("Open Drawer (" + toDisplayString(size.value) + ")", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        title: "Title",
        size: size.value,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Drawer/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
