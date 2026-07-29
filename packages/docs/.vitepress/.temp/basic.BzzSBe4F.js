import { defineComponent, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { z as $alert } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    function onPrimaryClick() {
      $alert("点击了主按钮", "提示");
    }
    function onSecondaryClick() {
      $alert("点击了次按钮", "提示");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_result = resolveComponent("h-result");
      _push(ssrRenderComponent(_component_h_result, mergeProps({
        title: "这是一条成功信息",
        subtitle: "这是一段相关的描述文案",
        onPrimaryClick,
        onSecondaryClick
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Result/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
