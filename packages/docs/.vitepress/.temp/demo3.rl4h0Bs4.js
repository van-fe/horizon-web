import { defineComponent, resolveComponent, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo3",
  __ssrInlineRender: true,
  setup(__props) {
    const contentLong = "这是一条提示消息".repeat(20);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_alert = resolveComponent("h-alert");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_alert, {
        title: "标题",
        type: "info",
        description: "这是一条提示消息",
        "show-icon": "",
        "primary-button-text": "按钮",
        "default-button-text": "按钮"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_alert, {
        title: "标题",
        type: "info",
        description: unref(contentLong),
        "show-icon": "",
        "primary-button-text": "primary",
        "default-button-text": "default"
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Alert/demo3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-285e3ab3"]]);
export {
  demo3 as default
};
