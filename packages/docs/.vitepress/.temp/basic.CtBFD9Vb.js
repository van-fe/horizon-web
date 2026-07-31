import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    const actionURL = new URL("/upload-mock.json", import.meta.url).href;
    const size = ref("medium");
    const fileItemSize = ref("medium");
    const showUploader = ref(true);
    const modelValue = ref({
      name: "background.jpg",
      url: "/demo-assets/scene-coast.svg"
    });
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_space = resolveComponent("h-space");
      const _component_h_upload = resolveComponent("h-upload");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "尺寸" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "small" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "medium" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "large" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "small" }),
                          createVNode(_component_h_radio, { label: "medium" }),
                          createVNode(_component_h_radio, { label: "large" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: size.value,
                      "onUpdate:modelValue": ($event) => size.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "small" }),
                        createVNode(_component_h_radio, { label: "medium" }),
                        createVNode(_component_h_radio, { label: "large" })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "文件元素尺寸" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: fileItemSize.value,
                    "onUpdate:modelValue": ($event) => fileItemSize.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "small" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "medium" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "large" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "small" }),
                          createVNode(_component_h_radio, { label: "medium" }),
                          createVNode(_component_h_radio, { label: "large" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: fileItemSize.value,
                      "onUpdate:modelValue": ($event) => fileItemSize.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "small" }),
                        createVNode(_component_h_radio, { label: "medium" }),
                        createVNode(_component_h_radio, { label: "large" })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "展示上传按钮" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: showUploader.value,
                    "onUpdate:modelValue": ($event) => showUploader.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: true }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`True`);
                            } else {
                              return [
                                createTextVNode("True")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: false }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`False`);
                            } else {
                              return [
                                createTextVNode("False")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: true }, {
                            default: withCtx(() => [
                              createTextVNode("True")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: false }, {
                            default: withCtx(() => [
                              createTextVNode("False")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: showUploader.value,
                      "onUpdate:modelValue": ($event) => showUploader.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: true }, {
                          default: withCtx(() => [
                            createTextVNode("True")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: false }, {
                          default: withCtx(() => [
                            createTextVNode("False")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "尺寸" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "small" }),
                      createVNode(_component_h_radio, { label: "medium" }),
                      createVNode(_component_h_radio, { label: "large" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "文件元素尺寸" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: fileItemSize.value,
                    "onUpdate:modelValue": ($event) => fileItemSize.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "small" }),
                      createVNode(_component_h_radio, { label: "medium" }),
                      createVNode(_component_h_radio, { label: "large" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "展示上传按钮" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: showUploader.value,
                    "onUpdate:modelValue": ($event) => showUploader.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: true }, {
                        default: withCtx(() => [
                          createTextVNode("True")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: false }, {
                        default: withCtx(() => [
                          createTextVNode("False")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_upload, {
              modelValue: modelValue.value,
              "onUpdate:modelValue": ($event) => modelValue.value = $event,
              action: unref(actionURL),
              method: "POST",
              size: size.value,
              "file-item-size": fileItemSize.value,
              "no-uploader": !showUploader.value,
              onChange: handleChange,
              onAdd: onAddFile,
              onUpload: onUploadFile,
              onRemove: onRemoveFile,
              onUploading: onUploadingFile,
              onUploaded: onUploadedFile,
              onPause: onPauseFile,
              onContinue: onContinueFile,
              onRetry: onRetryFile,
              onFail: onFailFile
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_upload, {
                modelValue: modelValue.value,
                "onUpdate:modelValue": ($event) => modelValue.value = $event,
                action: unref(actionURL),
                method: "POST",
                size: size.value,
                "file-item-size": fileItemSize.value,
                "no-uploader": !showUploader.value,
                onChange: handleChange,
                onAdd: onAddFile,
                onUpload: onUploadFile,
                onRemove: onRemoveFile,
                onUploading: onUploadingFile,
                onUploaded: onUploadedFile,
                onPause: onPauseFile,
                onContinue: onContinueFile,
                onRetry: onRetryFile,
                onFail: onFailFile
              }, null, 8, ["modelValue", "onUpdate:modelValue", "action", "size", "file-item-size", "no-uploader"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Upload/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
