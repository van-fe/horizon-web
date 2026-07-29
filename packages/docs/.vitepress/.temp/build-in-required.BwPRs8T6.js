import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "build-in-required",
  __ssrInlineRender: true,
  setup(__props) {
    const formDomRef = ref();
    const formData = ref({
      username: "",
      email: "",
      notes: ""
    });
    const onSubmit = () => {
      formDomRef.value.validate().then(() => {
        $message.success("Success");
      }).catch((err) => {
        console.info(err);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_form, mergeProps({
        ref_key: "formDomRef",
        ref: formDomRef,
        model: formData.value,
        "scroll-to-error": true,
        onSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Username",
              prop: "username",
              required: true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: formData.value.username,
                    "onUpdate:modelValue": ($event) => formData.value.username = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: formData.value.username,
                      "onUpdate:modelValue": ($event) => formData.value.username = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Email",
              prop: "email",
              required: true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: formData.value.email,
                    "onUpdate:modelValue": ($event) => formData.value.email = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: formData.value.email,
                      "onUpdate:modelValue": ($event) => formData.value.email = $event
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
                    modelValue: formData.value.notes,
                    "onUpdate:modelValue": ($event) => formData.value.notes = $event,
                    type: "textarea"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: formData.value.notes,
                      "onUpdate:modelValue": ($event) => formData.value.notes = $event,
                      type: "textarea"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, { "native-type": "submit" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Submit`);
                      } else {
                        return [
                          createTextVNode("Submit")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, { "native-type": "submit" }, {
                      default: withCtx(() => [
                        createTextVNode("Submit")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, {
                label: "Username",
                prop: "username",
                required: true
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: formData.value.username,
                    "onUpdate:modelValue": ($event) => formData.value.username = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Email",
                prop: "email",
                required: true
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: formData.value.email,
                    "onUpdate:modelValue": ($event) => formData.value.email = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Notes",
                prop: "notes"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: formData.value.notes,
                    "onUpdate:modelValue": ($event) => formData.value.notes = $event,
                    type: "textarea"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_h_button, { "native-type": "submit" }, {
                    default: withCtx(() => [
                      createTextVNode("Submit")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/build-in-required.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
