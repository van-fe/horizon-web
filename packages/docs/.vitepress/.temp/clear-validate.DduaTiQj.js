import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
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
      notes: "",
      province: null
    });
    const requireMarkPosition = ref("right");
    const rules = ref({
      username: [
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
      email: [
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
            if (!(value == null ? void 0 : value.endsWith("@gmail.com"))) {
              return new Error("Only support gmail!");
            }
            return true;
          }
        }
      ]
    });
    const submit = () => {
      if (formRef.value) {
        formRef.value.validate().then(() => {
          $message.success("Submit");
        }).catch((errors) => {
          console.info("errors:", errors);
        });
      }
    };
    const clearValidate2 = () => {
      var _a;
      (_a = formRef.value) == null ? void 0 : _a.clearValidate();
    };
    const resetFields = () => {
      var _a;
      (_a = formRef.value) == null ? void 0 : _a.resetFields();
    };
    return {
      formData,
      formRef,
      submit,
      rules,
      clearValidate: clearValidate2,
      resetFields,
      requireMarkPosition
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio_button = resolveComponent("h-radio-button");
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_input = resolveComponent("h-input");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  const _component_h_button = resolveComponent("h-button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="mr-4"${_scopeId2}>必填星号位置</div>`);
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.requireMarkPosition,
                "onUpdate:modelValue": ($event) => _ctx.requireMarkPosition = $event,
                size: "small"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio_button, { label: "left" }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio_button, { label: "right" }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio_button, { label: "left" }),
                      createVNode(_component_h_radio_button, { label: "right" })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "mr-4" }, "必填星号位置"),
                createVNode(_component_h_radio_group, {
                  modelValue: _ctx.requireMarkPosition,
                  "onUpdate:modelValue": ($event) => _ctx.requireMarkPosition = $event,
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio_button, { label: "left" }),
                    createVNode(_component_h_radio_button, { label: "right" })
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
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "mr-4" }, "必填星号位置"),
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.requireMarkPosition,
                "onUpdate:modelValue": ($event) => _ctx.requireMarkPosition = $event,
                size: "small"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_button, { label: "left" }),
                  createVNode(_component_h_radio_button, { label: "right" })
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
  _push(ssrRenderComponent(_component_h_form, {
    ref: "formRef",
    model: _ctx.formData,
    rules: _ctx.rules,
    "require-mark-position": _ctx.requireMarkPosition,
    "scroll-to-error": "",
    onSubmit: ($event) => _ctx.submit()
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, {
          label: "User name",
          prop: "username"
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
          prop: "email"
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
          label: "Province",
          prop: "province"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.formData.province,
                "onUpdate:modelValue": ($event) => _ctx.formData.province = $event,
                placeholder: "Please select"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "Beijing",
                      value: "beijing"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "Shanghai",
                      value: "shanghai"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "Hefei",
                      value: "hefei"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "Beijing",
                        value: "beijing"
                      }),
                      createVNode(_component_h_option, {
                        label: "Shanghai",
                        value: "shanghai"
                      }),
                      createVNode(_component_h_option, {
                        label: "Hefei",
                        value: "hefei"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_select, {
                  modelValue: _ctx.formData.province,
                  "onUpdate:modelValue": ($event) => _ctx.formData.province = $event,
                  placeholder: "Please select"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "Beijing",
                      value: "beijing"
                    }),
                    createVNode(_component_h_option, {
                      label: "Shanghai",
                      value: "shanghai"
                    }),
                    createVNode(_component_h_option, {
                      label: "Hefei",
                      value: "hefei"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
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
        _push2(ssrRenderComponent(_component_h_button, { "native-type": "submit" }, {
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
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          onClick: _ctx.clearValidate
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Clear Validate`);
            } else {
              return [
                createTextVNode("Clear Validate")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          onClick: _ctx.resetFields
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Reset Fields`);
            } else {
              return [
                createTextVNode("Reset Fields")
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
            prop: "username"
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
            prop: "email"
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.email,
                "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, {
            label: "Province",
            prop: "province"
          }, {
            default: withCtx(() => [
              createVNode(_component_h_select, {
                modelValue: _ctx.formData.province,
                "onUpdate:modelValue": ($event) => _ctx.formData.province = $event,
                placeholder: "Please select"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "Beijing",
                    value: "beijing"
                  }),
                  createVNode(_component_h_option, {
                    label: "Shanghai",
                    value: "shanghai"
                  }),
                  createVNode(_component_h_option, {
                    label: "Hefei",
                    value: "hefei"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
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
            createVNode(_component_h_button, { "native-type": "submit" }, {
              default: withCtx(() => [
                createTextVNode("Submit")
              ]),
              _: 1
            }),
            createVNode(_component_h_button, {
              plain: true,
              onClick: _ctx.clearValidate
            }, {
              default: withCtx(() => [
                createTextVNode("Clear Validate")
              ]),
              _: 1
            }, 8, ["onClick"]),
            createVNode(_component_h_button, {
              plain: true,
              onClick: _ctx.resetFields
            }, {
              default: withCtx(() => [
                createTextVNode("Reset Fields")
              ]),
              _: 1
            }, 8, ["onClick"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/clear-validate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const clearValidate = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  clearValidate as default
};
