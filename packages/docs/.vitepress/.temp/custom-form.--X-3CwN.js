import { defineComponent, ref, inject, watch, h, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { $ as $message, u as isString, v as isUndefined, w as HFormItemTriggerInjectedKey, x as HFormItemErrorInjectedKey } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const CustomInput = defineComponent({
  name: "CustomInput",
  props: {
    modelValue: {
      type: String
    }
  },
  emits: {
    "update:modelValue": (val) => isString(val) || isUndefined(val),
    blur: () => true
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue);
    const formItemTrigger = inject(HFormItemTriggerInjectedKey);
    const formItemError = inject(HFormItemErrorInjectedKey);
    watch(value, (val) => {
      emit("update:modelValue", val);
      formItemTrigger == null ? void 0 : formItemTrigger("change");
    });
    return () => h("input", {
      class: { "custom-input": true, "is-error": !!(formItemError == null ? void 0 : formItemError.value) },
      value: value.value,
      onInput(evt) {
        value.value = evt.target.value;
      },
      onBlur() {
        emit("blur");
        formItemTrigger == null ? void 0 : formItemTrigger("blur");
      }
    });
  }
});
const _sfc_main = defineComponent({
  components: {
    CustomInput
  },
  setup() {
    const formRef = ref(null);
    const formData = ref({
      username: "",
      email: "",
      notes: ""
    });
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
        validator(_, value) {
          if (!value.endsWith("@gmail.com")) {
            return new Error("Only support gmail!");
          }
          return true;
        }
      }
    ]);
    const submit = () => {
      var _a;
      if (formRef.value) {
        (_a = formRef.value) == null ? void 0 : _a.validate().then(() => {
          $message.success("Submit");
        }).catch((errors) => {
          console.info("errors:", errors);
        });
      }
    };
    return {
      formData,
      emailRules,
      formRef,
      submit
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_custom_input = resolveComponent("custom-input");
  const _component_h_input = resolveComponent("h-input");
  const _component_h_button = resolveComponent("h-button");
  _push(ssrRenderComponent(_component_h_form, mergeProps({
    ref: "formRef",
    model: _ctx.formData,
    "validate-trigger": "blur"
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
          ],
          "validate-trigger": "change"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_custom_input, {
                modelValue: _ctx.formData.username,
                "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_custom_input, {
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
              _push3(ssrRenderComponent(_component_custom_input, {
                modelValue: _ctx.formData.email,
                "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_custom_input, {
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
            ],
            "validate-trigger": "change"
          }, {
            default: withCtx(() => [
              createVNode(_component_custom_input, {
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
              createVNode(_component_custom_input, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/custom-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  customForm as default
};
