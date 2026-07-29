import { defineComponent, reactive, ref, resolveComponent, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo2",
  __ssrInlineRender: true,
  setup(__props) {
    const list = reactive(
      Array(20).fill("").map((item, index) => {
        return {
          title: "This is Title" + item,
          subtitle: "subtitle",
          describe: `${index}: Aenean semper, dolor ac ultrices consequat, enim risus finibus lectus, sit amet egestas enim erat sed nunc. Duis consectetur commodo sapien, a tempus purus aliquam ut. Morbi id libero vel urna finibus auctor. Donec non lectus quis eros egestas hendrerit ac a nibh. Pellentesque sed tristique massa.`
        };
      })
    );
    const size = ref("medium");
    const titleBold = ref(true);
    const isZebra = ref(false);
    const isBorder = ref(true);
    const isSplit = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_list = resolveComponent("h-list");
      const _component_h_list_item = resolveComponent("h-list-item");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, { "label-position": "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "size" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Medium`);
                            } else {
                              return [
                                createTextVNode("Medium")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "small" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Small`);
                            } else {
                              return [
                                createTextVNode("Small")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Medium")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: "small" }, {
                            default: withCtx(() => [
                              createTextVNode("Small")
                            ]),
                            _: 1
                          })
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
                        createVNode(_component_h_radio, { label: "medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Medium")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: "small" }, {
                          default: withCtx(() => [
                            createTextVNode("Small")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "title bold" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: titleBold.value,
                    "onUpdate:modelValue": ($event) => titleBold.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: true }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`True`);
                            } else {
                              return [
                                createTextVNode("True")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: false }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`False`);
                            } else {
                              return [
                                createTextVNode("False")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: true }, {
                            default: withCtx(() => [
                              createTextVNode("True")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: false }, {
                            default: withCtx(() => [
                              createTextVNode("False")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: titleBold.value,
                      "onUpdate:modelValue": ($event) => titleBold.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: true }, {
                          default: withCtx(() => [
                            createTextVNode("True")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: false }, {
                          default: withCtx(() => [
                            createTextVNode("False")
                          ]),
                          _: 1
                        })
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
              createVNode(_component_h_form_item, { label: "size" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "medium" }, {
                        default: withCtx(() => [
                          createTextVNode("Medium")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "small" }, {
                        default: withCtx(() => [
                          createTextVNode("Small")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "title bold" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: titleBold.value,
                    "onUpdate:modelValue": ($event) => titleBold.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: true }, {
                        default: withCtx(() => [
                          createTextVNode("True")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: false }, {
                        default: withCtx(() => [
                          createTextVNode("False")
                        ]),
                        _: 1
                      })
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
      _push(ssrRenderComponent(_component_h_list, {
        "max-height": 300,
        zebra: isZebra.value,
        "is-border": isBorder.value,
        split: isSplit.value,
        size: size.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(list, (item, index) => {
              _push2(ssrRenderComponent(_component_h_list_item, {
                key: index,
                "title-bold": titleBold.value,
                title: item.title,
                subtitle: item.subtitle,
                describe: item.describe
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(list, (item, index) => {
                return openBlock(), createBlock(_component_h_list_item, {
                  key: index,
                  "title-bold": titleBold.value,
                  title: item.title,
                  subtitle: item.subtitle,
                  describe: item.describe
                }, null, 8, ["title-bold", "title", "subtitle", "describe"]);
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/List/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9e3a4b8b"]]);
export {
  demo2 as default
};
