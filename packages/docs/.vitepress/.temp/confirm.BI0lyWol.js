import { defineComponent, ref, resolveComponent, resolveDirective, withCtx, createTextVNode, withDirectives, createBlock, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "confirm",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const loading = ref(false);
    const onOk = () => {
      console.info("ok button clicked!");
      $message({ type: "success", message: "ok button clicked" });
    };
    const onCancel = () => {
      console.info("cancel button clicked!");
      $message({ type: "warning", message: "cancel button clicked!" });
      visible.value = false;
    };
    const onClose = () => {
      visible.value = false;
    };
    const wait = (n) => new Promise((r) => setTimeout(r, n));
    const onBeforeClose = async () => {
      const seed = Math.floor(Math.random() * 100) % 2 === 0;
      loading.value = true;
      $message.info({ message: `Drawer will ${seed ? "close" : "not close"}`, type: "info" });
      await wait(3e3);
      loading.value = false;
      return seed;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_drawer = resolveComponent("h-drawer");
      const _directive_loading = resolveDirective("loading");
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
        v2: "",
        title: "Title",
        position: "right",
        "before-close": onBeforeClose,
        onOk,
        onCancel,
        onClose
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_loading, { isShow: loading.value, loadingType: "dots" }))}${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", null, [
                createTextVNode(" You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. ")
              ])), [
                [_directive_loading, { isShow: loading.value, loadingType: "dots" }]
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Drawer/confirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
