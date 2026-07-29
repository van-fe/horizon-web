import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { C as $confirm } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "beforeChange",
  __ssrInlineRender: true,
  setup(__props) {
    const modelValue = ref(false);
    const onBeforeChange = (newValue) => {
      return new Promise((resolve, reject) => {
        $confirm(`是否确定改为 ${newValue}?`, "提示").then((close) => {
          resolve(void 0);
          close();
        }).catch(() => {
          reject();
        });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_switch = resolveComponent("h-switch");
      _push(ssrRenderComponent(_component_h_switch, mergeProps({
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event,
        "before-change": onBeforeChange
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Switch/beforeChange.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
