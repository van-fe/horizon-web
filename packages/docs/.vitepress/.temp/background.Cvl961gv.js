import { defineComponent, ref, watch, onBeforeUnmount, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "background",
  __ssrInlineRender: true,
  setup(__props) {
    const useBackground = ref(true);
    const backgroundVisible = ref(true);
    const showFileList = ref(true);
    watch(backgroundVisible, (visible) => {
      window.dispatchEvent(new CustomEvent("switchBackgroundUploadVisible", {
        detail: {
          visible
        }
      }));
    });
    function onBackgroundUploadVisibleChanged(evt) {
      console.info(`id: ${evt.detail.id} 的后台上传状态改变为 ${evt.detail.visible}`);
      backgroundVisible.value = evt.detail.visible;
    }
    function onBackgroundUploadDestroy(evt) {
      console.info(`id: ${evt.detail} 的后台已销毁`);
    }
    window.addEventListener("backgroundUploadVisibleChanged", onBackgroundUploadVisibleChanged);
    window.addEventListener("backgroundUploadDestroy", onBackgroundUploadDestroy);
    onBeforeUnmount(() => {
      window.removeEventListener("backgroundUploadVisibleChanged", onBackgroundUploadVisibleChanged);
      window.removeEventListener("backgroundUploadDestroy", onBackgroundUploadDestroy);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_upload = resolveComponent("h-upload");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-vertical-align": "middle",
        "label-position": "left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否将文件传输到后台上传" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: useBackground.value,
                    "onUpdate:modelValue": ($event) => useBackground.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: useBackground.value,
                      "onUpdate:modelValue": ($event) => useBackground.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "后台上传是否显示" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: backgroundVisible.value,
                    "onUpdate:modelValue": ($event) => backgroundVisible.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: backgroundVisible.value,
                      "onUpdate:modelValue": ($event) => backgroundVisible.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否显示文件列表" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: showFileList.value,
                    "onUpdate:modelValue": ($event) => showFileList.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: showFileList.value,
                      "onUpdate:modelValue": ($event) => showFileList.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "是否将文件传输到后台上传" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: useBackground.value,
                    "onUpdate:modelValue": ($event) => useBackground.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "后台上传是否显示" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: backgroundVisible.value,
                    "onUpdate:modelValue": ($event) => backgroundVisible.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "是否显示文件列表" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: showFileList.value,
                    "onUpdate:modelValue": ($event) => showFileList.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_upload, {
                    id: "background-uploader",
                    "use-background": useBackground.value,
                    "onUpdate:useBackground": ($event) => useBackground.value = $event,
                    action: "https://horizon-web-inspector.demoint.com/upload-mock",
                    "button-text": "单选手动上传",
                    "show-file-list": showFileList.value,
                    "auto-upload": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_upload, {
                      id: "background-uploader",
                      "use-background": useBackground.value,
                      "onUpdate:useBackground": ($event) => useBackground.value = $event,
                      action: "https://horizon-web-inspector.demoint.com/upload-mock",
                      "button-text": "单选手动上传",
                      "show-file-list": showFileList.value,
                      "auto-upload": false
                    }, null, 8, ["use-background", "onUpdate:useBackground", "show-file-list"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_upload, {
                    "use-background": useBackground.value,
                    "onUpdate:useBackground": ($event) => useBackground.value = $event,
                    action: "https://horizon-web-inspector.demoint.com/upload-mock",
                    "button-text": "多选自动上传",
                    multiple: true,
                    "show-file-list": showFileList.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_upload, {
                      "use-background": useBackground.value,
                      "onUpdate:useBackground": ($event) => useBackground.value = $event,
                      action: "https://horizon-web-inspector.demoint.com/upload-mock",
                      "button-text": "多选自动上传",
                      multiple: true,
                      "show-file-list": showFileList.value
                    }, null, 8, ["use-background", "onUpdate:useBackground", "show-file-list"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_upload, {
                    id: "background-uploader",
                    "use-background": useBackground.value,
                    "onUpdate:useBackground": ($event) => useBackground.value = $event,
                    action: "https://horizon-web-inspector.demoint.com/upload-mock",
                    "button-text": "单选手动上传",
                    "show-file-list": showFileList.value,
                    "auto-upload": false
                  }, null, 8, ["use-background", "onUpdate:useBackground", "show-file-list"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_upload, {
                    "use-background": useBackground.value,
                    "onUpdate:useBackground": ($event) => useBackground.value = $event,
                    action: "https://horizon-web-inspector.demoint.com/upload-mock",
                    "button-text": "多选自动上传",
                    multiple: true,
                    "show-file-list": showFileList.value
                  }, null, 8, ["use-background", "onUpdate:useBackground", "show-file-list"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Upload/background.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
