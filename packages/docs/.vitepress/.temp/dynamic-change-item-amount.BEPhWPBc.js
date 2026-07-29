import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, withDirectives, vShow, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dynamic-change-item-amount",
  __ssrInlineRender: true,
  setup(__props) {
    const formRef = ref(null);
    const formData = ref({
      domain: "",
      users: [{
        value: ""
      }]
    });
    const rules = ref({
      domain: {
        required: true,
        message: "Domain is required!"
      }
    });
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
    function addUser() {
      formData.value.users.push({
        value: ""
      });
    }
    function del(index) {
      formData.value.users.splice(index, 1);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_space = resolveComponent("h-space");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_form, mergeProps({
        ref_key: "formRef",
        ref: formRef,
        model: formData.value,
        rules: rules.value,
        "validate-trigger": "blur",
        style: { "padding": "20px" },
        onSubmit: submit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "操作域",
              prop: "domain"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: formData.value.domain,
                    "onUpdate:modelValue": ($event) => formData.value.domain = $event,
                    placeholder: "Please input domain"
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`.com`);
                      } else {
                        return [
                          createTextVNode(".com")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: formData.value.domain,
                      "onUpdate:modelValue": ($event) => formData.value.domain = $event,
                      placeholder: "Please input domain"
                    }, {
                      append: withCtx(() => [
                        createTextVNode(".com")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(formData.value.users, (_2, index) => {
              _push2(ssrRenderComponent(_component_h_form_item, {
                label: `用户 ${index + 1}`,
                prop: `users[${index}].value`,
                rules: {
                  required: true,
                  message: "用户必填"
                },
                "validate-trigger": "change"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_h_row, { gutter: 0 }, {
                      default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_h_col, { span: 18 }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_h_input, {
                                  modelValue: formData.value.users[index].value,
                                  "onUpdate:modelValue": ($event) => formData.value.users[index].value = $event
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_h_input, {
                                    modelValue: formData.value.users[index].value,
                                    "onUpdate:modelValue": ($event) => formData.value.users[index].value = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_h_col, {
                            span: 6,
                            class: "text-right"
                          }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_h_space, null, {
                                  default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_h_button, {
                                        style: index === formData.value.users.length - 1 ? null : { display: "none" },
                                        icon: "add",
                                        onClick: addUser
                                      }, {
                                        default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`增加`);
                                          } else {
                                            return [
                                              createTextVNode("增加")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_h_button, {
                                        icon: "rubbish",
                                        type: "danger",
                                        onClick: ($event) => del(index)
                                      }, {
                                        default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`删除`);
                                          } else {
                                            return [
                                              createTextVNode("删除")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        withDirectives(createVNode(_component_h_button, {
                                          icon: "add",
                                          onClick: addUser
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("增加")
                                          ]),
                                          _: 1
                                        }, 512), [
                                          [vShow, index === formData.value.users.length - 1]
                                        ]),
                                        createVNode(_component_h_button, {
                                          icon: "rubbish",
                                          type: "danger",
                                          onClick: ($event) => del(index)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("删除")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_h_space, null, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode(_component_h_button, {
                                        icon: "add",
                                        onClick: addUser
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("增加")
                                        ]),
                                        _: 1
                                      }, 512), [
                                        [vShow, index === formData.value.users.length - 1]
                                      ]),
                                      createVNode(_component_h_button, {
                                        icon: "rubbish",
                                        type: "danger",
                                        onClick: ($event) => del(index)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("删除")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_h_col, { span: 18 }, {
                              default: withCtx(() => [
                                createVNode(_component_h_input, {
                                  modelValue: formData.value.users[index].value,
                                  "onUpdate:modelValue": ($event) => formData.value.users[index].value = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_h_col, {
                              span: 6,
                              class: "text-right"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_space, null, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(_component_h_button, {
                                      icon: "add",
                                      onClick: addUser
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("增加")
                                      ]),
                                      _: 1
                                    }, 512), [
                                      [vShow, index === formData.value.users.length - 1]
                                    ]),
                                    createVNode(_component_h_button, {
                                      icon: "rubbish",
                                      type: "danger",
                                      onClick: ($event) => del(index)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("删除")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_h_row, { gutter: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_h_col, { span: 18 }, {
                            default: withCtx(() => [
                              createVNode(_component_h_input, {
                                modelValue: formData.value.users[index].value,
                                "onUpdate:modelValue": ($event) => formData.value.users[index].value = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_h_col, {
                            span: 6,
                            class: "text-right"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_space, null, {
                                default: withCtx(() => [
                                  withDirectives(createVNode(_component_h_button, {
                                    icon: "add",
                                    onClick: addUser
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("增加")
                                    ]),
                                    _: 1
                                  }, 512), [
                                    [vShow, index === formData.value.users.length - 1]
                                  ]),
                                  createVNode(_component_h_button, {
                                    icon: "rubbish",
                                    type: "danger",
                                    onClick: ($event) => del(index)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("删除")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    icon: "check",
                    "native-type": "submit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`提交`);
                      } else {
                        return [
                          createTextVNode("提交")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, {
                      icon: "check",
                      "native-type": "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("提交")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_h_form_item, {
                label: "操作域",
                prop: "domain"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: formData.value.domain,
                    "onUpdate:modelValue": ($event) => formData.value.domain = $event,
                    placeholder: "Please input domain"
                  }, {
                    append: withCtx(() => [
                      createTextVNode(".com")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              (openBlock(true), createBlock(Fragment, null, renderList(formData.value.users, (_2, index) => {
                return openBlock(), createBlock(_component_h_form_item, {
                  label: `用户 ${index + 1}`,
                  prop: `users[${index}].value`,
                  rules: {
                    required: true,
                    message: "用户必填"
                  },
                  "validate-trigger": "change"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_row, { gutter: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_h_col, { span: 18 }, {
                          default: withCtx(() => [
                            createVNode(_component_h_input, {
                              modelValue: formData.value.users[index].value,
                              "onUpdate:modelValue": ($event) => formData.value.users[index].value = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_h_col, {
                          span: 6,
                          class: "text-right"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_space, null, {
                              default: withCtx(() => [
                                withDirectives(createVNode(_component_h_button, {
                                  icon: "add",
                                  onClick: addUser
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("增加")
                                  ]),
                                  _: 1
                                }, 512), [
                                  [vShow, index === formData.value.users.length - 1]
                                ]),
                                createVNode(_component_h_button, {
                                  icon: "rubbish",
                                  type: "danger",
                                  onClick: ($event) => del(index)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("删除")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["label", "prop"]);
              }), 256)),
              createVNode("div", null, [
                createVNode(_component_h_space, null, {
                  default: withCtx(() => [
                    createVNode(_component_h_button, {
                      icon: "check",
                      "native-type": "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("提交")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/dynamic-change-item-amount.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
