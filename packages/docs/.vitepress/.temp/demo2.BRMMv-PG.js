import { defineComponent, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const onPrimary = (close) => {
      close();
    };
    const callback = () => {
      alert("设置回调的alert！");
    };
    const onDefault = () => {
    };
    return {
      callback,
      onDefault,
      onPrimary
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_alert = resolveComponent("h-alert");
  _push(`<!--[--><p data-v-cfde9d5b>带关闭操作:为用户提供关闭操作</p>`);
  _push(ssrRenderComponent(_component_h_alert, {
    description: "这是一条提示消息",
    type: "info",
    closable: "",
    "show-icon": ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_alert, {
    closable: true,
    "show-icon": "",
    title: "标题",
    description: "描述文字不换行，按钮布局方式在容器的右侧",
    type: "info"
  }, null, _parent));
  _push(`<p data-v-cfde9d5b>带一个操作按钮:为了解决提示框内的问题需要进行操作/跳转时</p>`);
  _push(ssrRenderComponent(_component_h_alert, {
    closable: "",
    "show-icon": "",
    description: "这是一条提示消息",
    type: "info",
    "primary-button-text": "确定"
  }, null, _parent));
  _push(`<p data-v-cfde9d5b>带两个操作按钮:为了解决提示框内的问题需要进行操作/跳转时</p>`);
  _push(ssrRenderComponent(_component_h_alert, {
    closable: "",
    "show-icon": "",
    description: "这是一条提示消息",
    type: "info",
    "primary-button-text": "确定",
    "default-button-text": "取消",
    onClose: _ctx.callback
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Alert/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cfde9d5b"]]);
export {
  demo2 as default
};
