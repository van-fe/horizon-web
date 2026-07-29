import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "multiple",
  __ssrInlineRender: true,
  setup(__props) {
    const fileList = ref([]);
    function handleChange(file, response) {
      console.info("change:", file, response);
    }
    function onAddFile(file) {
      console.info("Add File: ", file);
    }
    function onUploadFile(file) {
      console.info("Upload File: ", file);
    }
    function onRemoveFile(file) {
      console.info("Remove File: ", file);
    }
    function onUploadingFile(file, process, response) {
      console.info("Uploading File: ", file, process, response);
    }
    function onUploadedFile(file, response) {
      console.info("Uploaded File: ", file, response);
    }
    function onPauseFile(file) {
      console.info("Pause File: ", file);
    }
    function onContinueFile(file) {
      console.info("Continue File: ", file);
    }
    function onRetryFile(file) {
      console.info("Retry File: ", file);
    }
    function onFailFile(file, reason, response) {
      console.info("Fail File: ", file, reason, response);
    }
    function onExceed(pickedFiles, existedFiles) {
      console.info("Exceed Files: ", pickedFiles, existedFiles);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_upload = resolveComponent("h-upload");
      _push(ssrRenderComponent(_component_h_space, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_upload, {
              modelValue: fileList.value,
              "onUpdate:modelValue": ($event) => fileList.value = $event,
              action: "https://horizon-web-inspector.demoint.com/upload-mock",
              multiple: true,
              limit: 3,
              onChange: handleChange,
              onAdd: onAddFile,
              onUpload: onUploadFile,
              onRemove: onRemoveFile,
              onUploading: onUploadingFile,
              onUploaded: onUploadedFile,
              onPause: onPauseFile,
              onContinue: onContinueFile,
              onRetry: onRetryFile,
              onFail: onFailFile,
              onExceed
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_upload, {
                modelValue: fileList.value,
                "onUpdate:modelValue": ($event) => fileList.value = $event,
                action: "https://horizon-web-inspector.demoint.com/upload-mock",
                multiple: true,
                limit: 3,
                onChange: handleChange,
                onAdd: onAddFile,
                onUpload: onUploadFile,
                onRemove: onRemoveFile,
                onUploading: onUploadingFile,
                onUploaded: onUploadedFile,
                onPause: onPauseFile,
                onContinue: onContinueFile,
                onRetry: onRetryFile,
                onFail: onFailFile,
                onExceed
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Upload/multiple.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
