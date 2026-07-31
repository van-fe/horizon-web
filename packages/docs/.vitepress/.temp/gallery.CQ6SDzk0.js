import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "gallery",
  __ssrInlineRender: true,
  setup(__props) {
    const size = ref("medium");
    const galleryShape = ref("rectangle");
    const modelValue = ref(
      [
        {
          name: "background.jpg",
          url: "/demo-assets/scene-coast.svg"
        },
        {
          name: "preview.mp4",
          url: "/aurora-background.mp4"
        }
      ]
    );
    function onUploading(file, process, response) {
      console.info(file, process, response);
    }
    function handleSuccess(res, file) {
      return file.url || file.blobUrl;
    }
    function change() {
      modelValue.value = [{
        name: "preview.mp4",
        url: "/aurora-background.mp4"
      }];
    }
    function onUpdateModelValue(modelValue2) {
      console.info("update: ", modelValue2);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_button = resolveComponent("h-button");
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
                        _push4(ssrRenderComponent(_component_h_radio, { label: "huge" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "small" }),
                          createVNode(_component_h_radio, { label: "medium" }),
                          createVNode(_component_h_radio, { label: "large" }),
                          createVNode(_component_h_radio, { label: "huge" })
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
                        createVNode(_component_h_radio, { label: "large" }),
                        createVNode(_component_h_radio, { label: "huge" })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "形状" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: galleryShape.value,
                    "onUpdate:modelValue": ($event) => galleryShape.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "square" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "rectangle" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "square" }),
                          createVNode(_component_h_radio, { label: "rectangle" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: galleryShape.value,
                      "onUpdate:modelValue": ($event) => galleryShape.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "square" }),
                        createVNode(_component_h_radio, { label: "rectangle" })
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
                      createVNode(_component_h_radio, { label: "large" }),
                      createVNode(_component_h_radio, { label: "huge" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "形状" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: galleryShape.value,
                    "onUpdate:modelValue": ($event) => galleryShape.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "square" }),
                      createVNode(_component_h_radio, { label: "rectangle" })
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
      _push(ssrRenderComponent(_component_h_button, {
        class: "mb-2",
        onClick: change
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`修改原始 modelValue`);
          } else {
            return [
              createTextVNode("修改原始 modelValue")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_upload, {
        modelValue: modelValue.value,
        "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdateModelValue],
        action: "https://horizon-web-inspector.demoint.com/upload-mock",
        type: "gallery",
        multiple: true,
        size: size.value,
        "gallery-shape": galleryShape.value,
        accept: "image/*, video/*",
        "handle-success": handleSuccess,
        "auto-upload": false,
        onUploading
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Upload/gallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
