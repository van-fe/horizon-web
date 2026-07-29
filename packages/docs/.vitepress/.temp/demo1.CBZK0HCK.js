import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_alert = resolveComponent("h-alert");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_alert, {
    closable: true,
    "show-icon": "",
    description: "用于传达加载、帮助、指南信息，文案可配有文字链接用于传达加载、帮助、指南信息，文案可配有文字链接用于传达加载、帮助、指南信息，文案可配有文字链接用于传达加载、帮助、指南信息，文案可配有文字链接",
    type: "info"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_alert, {
    closable: true,
    "show-icon": "",
    description: "展示成功、正向反馈的信息",
    type: "success"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_alert, {
    closable: false,
    "show-icon": "",
    description: "展示反馈提醒、警示的信息，比较常用",
    type: "warning"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_alert, {
    closable: false,
    "show-icon": "",
    description: "展示反馈失败、操作错误的信息，比较常用",
    type: "error"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_alert, {
    closable: false,
    "show-icon": "",
    description: "超长提示".repeat(20),
    type: "error"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Alert/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b4fb49ab"]]);
export {
  demo1 as default
};
