import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "file-size-exceed",
  __ssrInlineRender: true,
  setup(__props) {
    const enableFileSizeLimit = ref(false);
    const multiple = ref(false);
    const modelValue = ref();
    function onBeforeUpload(file) {
      console.info("before-upload:", file);
      if ((file.size || 0) > 1024 * 1024 * 2) {
        $message.error("手动拦截：您选择的文件超过 2MB 大小");
        return false;
      } else return true;
    }
    function onFileSizeExceed(files) {
      console.info(files);
      $message.error(`自动拦截： ${files.map((file) => file.name).join("、")} 超过 2MB 大小`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_space = resolveComponent("h-space");
      const _component_h_upload = resolveComponent("h-upload");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否直接拦截超过 2MB 的文件" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: enableFileSizeLimit.value,
                    "onUpdate:modelValue": ($event) => enableFileSizeLimit.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: enableFileSizeLimit.value,
                      "onUpdate:modelValue": ($event) => enableFileSizeLimit.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "多选" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: multiple.value,
                    "onUpdate:modelValue": ($event) => multiple.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: multiple.value,
                      "onUpdate:modelValue": ($event) => multiple.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "是否直接拦截超过 2MB 的文件" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: enableFileSizeLimit.value,
                    "onUpdate:modelValue": ($event) => enableFileSizeLimit.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "多选" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: multiple.value,
                    "onUpdate:modelValue": ($event) => multiple.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              action: "https://horizon-web-inspector.demoint.com/upload-mock",
              method: "POST",
              multiple: multiple.value,
              "file-size-limit": enableFileSizeLimit.value ? 2 : void 0,
              "before-upload": onBeforeUpload,
              onFileSizeExceed
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_upload, {
                modelValue: modelValue.value,
                "onUpdate:modelValue": ($event) => modelValue.value = $event,
                action: "https://horizon-web-inspector.demoint.com/upload-mock",
                method: "POST",
                multiple: multiple.value,
                "file-size-limit": enableFileSizeLimit.value ? 2 : void 0,
                "before-upload": onBeforeUpload,
                onFileSizeExceed
              }, null, 8, ["modelValue", "onUpdate:modelValue", "multiple", "file-size-limit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Upload/file-size-exceed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
