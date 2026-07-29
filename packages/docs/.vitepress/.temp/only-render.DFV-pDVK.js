import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { $ as $message } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const formData = ref({
      username: "",
      email: "",
      notes: ""
    });
    const errorInfo = ref({});
    const submit = () => {
      errorInfo.value = {};
      if (!formData.value.username) {
        errorInfo.value.username = "Please enter Username";
      }
      if (!formData.value.email) {
        errorInfo.value.email = "Please enter Email";
      } else if (!/^[\w.-_]+@gmail.com/.test(formData.value.email)) {
        errorInfo.value.email = "Only support Gmail!";
      }
      if (!formData.value.notes) {
        errorInfo.value.notes = "Please enter Notes";
      }
      if (Object.keys(errorInfo.value).length === 0) {
        $message.success("Submit!");
      } else {
        $message.error("Please check error message");
      }
    };
    return {
      formData,
      errorInfo,
      submit
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_input = resolveComponent("h-input");
  const _component_h_button = resolveComponent("h-button");
  _push(ssrRenderComponent(_component_h_form, mergeProps({
    ref: "formRef",
    "validate-trigger": "blur",
    "only-render": true
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, {
          label: "Username",
          prop: "username",
          required: true,
          error: _ctx.errorInfo["username"]
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formData.username,
                "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formData.username,
                  "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, {
          label: "Email",
          prop: "email",
          required: true,
          error: _ctx.errorInfo["email"]
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formData.email,
                "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formData.email,
                  "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, {
          label: "Notes",
          prop: "notes",
          required: true,
          error: _ctx.errorInfo["notes"]
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formData.notes,
                "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                type: "textarea"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formData.notes,
                  "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                  type: "textarea"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_h_button, { onClick: _ctx.submit }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Submit`);
            } else {
              return [
                createTextVNode("Submit")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(_component_h_form_item, {
            label: "Username",
            prop: "username",
            required: true,
            error: _ctx.errorInfo["username"]
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.username,
                "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }, 8, ["error"]),
          createVNode(_component_h_form_item, {
            label: "Email",
            prop: "email",
            required: true,
            error: _ctx.errorInfo["email"]
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.email,
                "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }, 8, ["error"]),
          createVNode(_component_h_form_item, {
            label: "Notes",
            prop: "notes",
            required: true,
            error: _ctx.errorInfo["notes"]
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.notes,
                "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                type: "textarea"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }, 8, ["error"]),
          createVNode("div", null, [
            createVNode(_component_h_button, { onClick: _ctx.submit }, {
              default: withCtx(() => [
                createTextVNode("Submit")
              ]),
              _: 1
            }, 8, ["onClick"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/only-render.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const onlyRender = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  onlyRender as default
};
