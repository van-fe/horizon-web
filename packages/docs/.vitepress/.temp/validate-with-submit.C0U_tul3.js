import { defineComponent, ref, computed, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { $ as $message } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const formRef = ref(null);
    const formData = ref({
      username: "",
      email: "",
      notes: ""
    });
    const validateInfo = ref({
      username: false,
      email: false,
      notes: true
    });
    const canSubmit = computed(() => !Object.values(validateInfo.value).some((curr) => !curr));
    const emailRules = ref([
      {
        required: true,
        message: "Email is required!"
      },
      {
        type: "email",
        message: "Email format invalid!"
      },
      {
        validator(rule, value) {
          if (!value.endsWith("@gmail.com")) {
            return new Error("Only support gmail!");
          }
          return true;
        }
      }
    ]);
    const submit = () => {
      if (formRef.value) {
        formRef.value.validate().then(() => {
          $message.success("Submit");
        }).catch((errors) => {
          console.info("errors:", errors);
        });
      }
    };
    const onValidateChange = (prop, isValidated, message) => {
      console.info(`[${prop}] field is ${isValidated}${isValidated ? "" : `: ${message}`}`);
      validateInfo.value[prop] = isValidated;
    };
    return {
      formData,
      emailRules,
      formRef,
      submit,
      canSubmit,
      onValidateChange,
      validateInfo
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
    model: _ctx.formData,
    "validate-trigger": "change",
    onValidate: _ctx.onValidateChange
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, {
          label: "User name",
          prop: "username",
          rules: [
            {
              required: true,
              message: "User name is required!"
            },
            {
              min: 3,
              max: 100,
              message: "User name should be 3 to 100."
            }
          ]
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
          rules: _ctx.emailRules
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
          prop: "notes"
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
        _push2(ssrRenderComponent(_component_h_button, {
          disabled: !_ctx.canSubmit,
          onClick: _ctx.submit
        }, {
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
            label: "User name",
            prop: "username",
            rules: [
              {
                required: true,
                message: "User name is required!"
              },
              {
                min: 3,
                max: 100,
                message: "User name should be 3 to 100."
              }
            ]
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.username,
                "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, {
            label: "Email",
            prop: "email",
            rules: _ctx.emailRules
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.email,
                "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }, 8, ["rules"]),
          createVNode(_component_h_form_item, {
            label: "Notes",
            prop: "notes"
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.notes,
                "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                type: "textarea"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode("div", null, [
            createVNode(_component_h_button, {
              disabled: !_ctx.canSubmit,
              onClick: _ctx.submit
            }, {
              default: withCtx(() => [
                createTextVNode("Submit")
              ]),
              _: 1
            }, 8, ["disabled", "onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/validate-with-submit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const validateWithSubmit = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  validateWithSubmit as default
};
