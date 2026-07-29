import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "label-append",
  __ssrInlineRender: true,
  setup(__props) {
    const formData = ref({
      username: "",
      email: "",
      notes: ""
    });
    const tags = ref([]);
    function addTag() {
      tags.value.push((tags.value.length + 1).toString());
    }
    const submit = () => {
      console.info("formData:", formData.value);
      $message.success("Submit");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_tag_group = resolveComponent("h-tag-group");
      const _component_h_tag = resolveComponent("h-tag");
      _push(ssrRenderComponent(_component_h_form, mergeProps({
        "label-position": "top",
        onSubmit: submit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "User name" }, {
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "Tags" }, {
              labelAppend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    link: "",
                    icon: "add",
                    size: "small",
                    onClick: addTag
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`增加`);
                      } else {
                        return [
                          createTextVNode("增加")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, {
                      link: "",
                      icon: "add",
                      size: "small",
                      onClick: addTag
                    }, {
                      default: withCtx(() => [
                        createTextVNode("增加")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag_group, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(tags.value, (item) => {
                          _push4(ssrRenderComponent(_component_h_tag, { key: item }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Tag ${ssrInterpolate(item)}`);
                              } else {
                                return [
                                  createTextVNode("Tag " + toDisplayString(item), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (item) => {
                            return openBlock(), createBlock(_component_h_tag, { key: item }, {
                              default: withCtx(() => [
                                createTextVNode("Tag " + toDisplayString(item), 1)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tag_group, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (item) => {
                          return openBlock(), createBlock(_component_h_tag, { key: item }, {
                            default: withCtx(() => [
                              createTextVNode("Tag " + toDisplayString(item), 1)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    })
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
              createVNode(_component_h_form_item, { label: "User name" }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: formData.value.username,
                    "onUpdate:modelValue": ($event) => formData.value.username = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "Tags" }, {
                labelAppend: withCtx(() => [
                  createVNode(_component_h_button, {
                    link: "",
                    icon: "add",
                    size: "small",
                    onClick: addTag
                  }, {
                    default: withCtx(() => [
                      createTextVNode("增加")
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createVNode(_component_h_tag_group, null, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (item) => {
                        return openBlock(), createBlock(_component_h_tag, { key: item }, {
                          default: withCtx(() => [
                            createTextVNode("Tag " + toDisplayString(item), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/label-append.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
