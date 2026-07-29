import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "drop",
  __ssrInlineRender: true,
  setup(__props) {
    const accept = ref(".png");
    function change() {
      accept.value = ".png,.jpg";
    }
    function onAcceptError(files) {
      console.info(files);
      $message.error(`自动拦截：您选择的 ${files.map((file) => file.name).join("、")} 不是 ${accept.value} 文件`);
    }
    function handleSuccess(res, file) {
      return file.blobUrl;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_upload = resolveComponent("h-upload");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_upload, {
        action: "https://horizon-web-inspector.demoint.com/upload-mock",
        type: "drop",
        multiple: true,
        limit: 5,
        accept: accept.value,
        "handle-success": handleSuccess,
        onAcceptError
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        class: "mt-5",
        onClick: change
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`修改 accept 为 .png,.jpg`);
          } else {
            return [
              createTextVNode("修改 accept 为 .png,.jpg")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Upload/drop.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
