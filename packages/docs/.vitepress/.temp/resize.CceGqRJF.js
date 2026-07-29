import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { f as __default__, g as __default__$1, h as __default__$2, $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "resize",
  __ssrInlineRender: true,
  setup(__props) {
    const size = ref(150);
    function onCommand(type) {
      switch (type) {
        case "view":
          $message.success("查看");
          break;
        case "edit":
          $message.info("编辑");
          break;
        case "del":
          $message.error("删除");
          break;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_hover = resolveComponent("h-hover");
      const _component_h_mask = resolveComponent("h-mask");
      const _component_h_controls = resolveComponent("h-controls");
      const _component_h_control = resolveComponent("h-control");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle",
        "label-width": "120px"
      }, {
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
                        _push4(ssrRenderComponent(_component_h_radio, { label: 60 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`60px`);
                            } else {
                              return [
                                createTextVNode("60px")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: 100 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`100px`);
                            } else {
                              return [
                                createTextVNode("100px")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: 150 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`150px`);
                            } else {
                              return [
                                createTextVNode("150px")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: 60 }, {
                            default: withCtx(() => [
                              createTextVNode("60px")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: 100 }, {
                            default: withCtx(() => [
                              createTextVNode("100px")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: 150 }, {
                            default: withCtx(() => [
                              createTextVNode("150px")
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
                        createVNode(_component_h_radio, { label: 60 }, {
                          default: withCtx(() => [
                            createTextVNode("60px")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: 100 }, {
                          default: withCtx(() => [
                            createTextVNode("100px")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: 150 }, {
                          default: withCtx(() => [
                            createTextVNode("150px")
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
                      createVNode(_component_h_radio, { label: 60 }, {
                        default: withCtx(() => [
                          createTextVNode("60px")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: 100 }, {
                        default: withCtx(() => [
                          createTextVNode("100px")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: 150 }, {
                        default: withCtx(() => [
                          createTextVNode("150px")
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
      _push(ssrRenderComponent(_component_h_hover, null, {
        default: withCtx(({ hover }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="square" style="${ssrRenderStyle({ width: size.value + "px", height: size.value + "px" })}" data-v-db68bd1d${_scopeId}> Mouse move here `);
            _push2(ssrRenderComponent(_component_h_mask, {
              absolute: true,
              value: hover,
              "content-full-size": true
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_controls, {
                    theme: "light",
                    onCommand
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_control, {
                          icon: unref(__default__),
                          text: "查看",
                          label: "view"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_control, {
                          icon: unref(__default__$1),
                          text: "编辑",
                          label: "edit"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_control, {
                          icon: unref(__default__$2),
                          text: "删除",
                          label: "del"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_control, {
                            icon: unref(__default__),
                            text: "查看",
                            label: "view"
                          }, null, 8, ["icon"]),
                          createVNode(_component_h_control, {
                            icon: unref(__default__$1),
                            text: "编辑",
                            label: "edit"
                          }, null, 8, ["icon"]),
                          createVNode(_component_h_control, {
                            icon: unref(__default__$2),
                            text: "删除",
                            label: "del"
                          }, null, 8, ["icon"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_controls, {
                      theme: "light",
                      onCommand
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_control, {
                          icon: unref(__default__),
                          text: "查看",
                          label: "view"
                        }, null, 8, ["icon"]),
                        createVNode(_component_h_control, {
                          icon: unref(__default__$1),
                          text: "编辑",
                          label: "edit"
                        }, null, 8, ["icon"]),
                        createVNode(_component_h_control, {
                          icon: unref(__default__$2),
                          text: "删除",
                          label: "del"
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "square",
                style: { width: size.value + "px", height: size.value + "px" }
              }, [
                createTextVNode(" Mouse move here "),
                createVNode(_component_h_mask, {
                  absolute: true,
                  value: hover,
                  "content-full-size": true
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_controls, {
                      theme: "light",
                      onCommand
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_control, {
                          icon: unref(__default__),
                          text: "查看",
                          label: "view"
                        }, null, 8, ["icon"]),
                        createVNode(_component_h_control, {
                          icon: unref(__default__$1),
                          text: "编辑",
                          label: "edit"
                        }, null, 8, ["icon"]),
                        createVNode(_component_h_control, {
                          icon: unref(__default__$2),
                          text: "删除",
                          label: "del"
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["value"])
              ], 4)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Controls/resize.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resize = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-db68bd1d"]]);
export {
  resize as default
};
