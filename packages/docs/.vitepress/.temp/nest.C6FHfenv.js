import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "nest",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const visible2 = ref(false);
    const onOk = () => {
      console.info("ok button clicked!");
      $message({ type: "success", message: "ok button clicked" });
    };
    const onCancel = () => {
      console.info("cancel button clicked!");
      $message({ type: "warning", message: "cancel button clicked!" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_drawer = resolveComponent("h-drawer");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => visible.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer`);
          } else {
            return [
              createTextVNode("Open Drawer")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        title: "Title",
        size: "large",
        onOk,
        onCancel
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
            _push2(ssrRenderComponent(_component_h_button, {
              onClick: ($event) => visible2.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Two-level Drawer`);
                } else {
                  return [
                    createTextVNode("Two-level Drawer")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { style: { "margin-bottom": "20px" } }, " You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. "),
              createVNode(_component_h_button, {
                onClick: ($event) => visible2.value = true
              }, {
                default: withCtx(() => [
                  createTextVNode("Two-level Drawer")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        version: "v2",
        visible: visible2.value,
        "onUpdate:visible": ($event) => visible2.value = $event,
        title: "Two-level Drawer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` This is two-level drawer `);
          } else {
            return [
              createTextVNode(" This is two-level drawer ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Drawer/nest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
