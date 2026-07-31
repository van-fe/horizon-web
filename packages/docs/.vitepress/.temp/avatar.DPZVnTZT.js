import { defineComponent, ref, resolveComponent, mergeProps, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "avatar",
  __ssrInlineRender: true,
  setup(__props) {
    const actionURL = new URL("/upload-mock.json", import.meta.url).href;
    const modelValue = ref({
      name: "background.jpg",
      url: "/demo-assets/scene-coast.svg"
    });
    function handleSuccess(res, file) {
      return file.blobUrl;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_upload = resolveComponent("h-upload");
      _push(ssrRenderComponent(_component_h_upload, mergeProps({
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event,
        action: unref(actionURL),
        type: "gallery",
        size: "huge",
        "gallery-shape": "square",
        accept: "image/*",
        "handle-success": handleSuccess
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Upload/avatar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
