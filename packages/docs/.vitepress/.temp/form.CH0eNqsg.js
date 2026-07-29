import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  setup(__props) {
    const values = ref({
      name: "",
      category: void 0
    });
    const instance = ref();
    const options = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"];
    const onSubmit = async () => {
      var _a;
      await ((_a = instance.value) == null ? void 0 : _a.validate());
      $message.success("提交成功");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_segmented = resolveComponent("h-segmented");
      const _component_h_segmented_item = resolveComponent("h-segmented-item");
      const _component_h_space = resolveComponent("h-space");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_form, mergeProps({
        ref_key: "instance",
        ref: instance,
        model: values.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Name",
              prop: "name",
              style: { "width": "300px" },
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: values.value.name,
                    "onUpdate:modelValue": ($event) => values.value.name = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: values.value.name,
                      "onUpdate:modelValue": ($event) => values.value.name = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "Category",
              prop: "category",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_segmented, {
                    "active-key": values.value.category,
                    "onUpdate:activeKey": ($event) => values.value.category = $event,
                    form: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(options, (v) => {
                          _push4(ssrRenderComponent(_component_h_segmented_item, {
                            key: v,
                            label: v
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(options, (v) => {
                            return createVNode(_component_h_segmented_item, {
                              key: v,
                              label: v
                            }, null, 8, ["label"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_segmented, {
                      "active-key": values.value.category,
                      "onUpdate:activeKey": ($event) => values.value.category = $event,
                      form: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(options, (v) => {
                          return createVNode(_component_h_segmented_item, {
                            key: v,
                            label: v
                          }, null, 8, ["label"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["active-key", "onUpdate:activeKey"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, { onClick: onSubmit }, {
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
                  _push3(ssrRenderComponent(_component_h_button, {
                    type: "danger",
                    onClick: ($event) => {
                      var _a;
                      return (_a = instance.value) == null ? void 0 : _a.validate();
                    }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Validate`);
                      } else {
                        return [
                          createTextVNode("Validate")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, { onClick: onSubmit }, {
                      default: withCtx(() => [
                        createTextVNode("Submit")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      type: "danger",
                      onClick: ($event) => {
                        var _a;
                        return (_a = instance.value) == null ? void 0 : _a.validate();
                      }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Validate")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, {
                label: "Name",
                prop: "name",
                style: { "width": "300px" },
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: values.value.name,
                    "onUpdate:modelValue": ($event) => values.value.name = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "Category",
                prop: "category",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_segmented, {
                    "active-key": values.value.category,
                    "onUpdate:activeKey": ($event) => values.value.category = $event,
                    form: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(options, (v) => {
                        return createVNode(_component_h_segmented_item, {
                          key: v,
                          label: v
                        }, null, 8, ["label"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["active-key", "onUpdate:activeKey"])
                ]),
                _: 1
              }),
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode(_component_h_button, { onClick: onSubmit }, {
                    default: withCtx(() => [
                      createTextVNode("Submit")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    type: "danger",
                    onClick: ($event) => {
                      var _a;
                      return (_a = instance.value) == null ? void 0 : _a.validate();
                    }
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Validate")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Segmented/form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
