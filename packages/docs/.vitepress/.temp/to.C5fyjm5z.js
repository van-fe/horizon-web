import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "to",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const innerEl = ref();
    const to2 = ref();
    const openDrawer = (el) => {
      if (el) to2.value = el;
      else to2.value = document.body;
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
      const _component_h_button = resolveComponent("h-button");
      const _component_h_drawer = resolveComponent("h-drawer");
      _push(`<!--[--><div class="customize" data-v-75ec5153>`);
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => openDrawer(innerEl.value)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer on Inner`);
          } else {
            return [
              createTextVNode("Open Drawer on Inner")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        class: "ml-2",
        onClick: ($event) => openDrawer()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer on Body`);
          } else {
            return [
              createTextVNode("Open Drawer on Body")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_h_drawer, {
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        v2: "",
        to: to2.value,
        size: "small",
        title: "Title",
        position: "right",
        onOk,
        onCancel
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-75ec5153${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Drawer/to.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const to = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-75ec5153"]]);
export {
  to as default
};
