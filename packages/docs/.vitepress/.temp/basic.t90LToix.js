import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const text = "这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段长很长很长很长很长很长很的内容文案";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    const title = ref("我是标题");
    const radius = ref("small");
    const topDivider = ref(false);
    const bottomDivider = ref(false);
    const border = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_input = resolveComponent("h-input");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_card = resolveComponent("h-card");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[--><ul data-v-2402bd99><li data-v-2402bd99>`);
      _push(ssrRenderComponent(_component_h_input, {
        size: "small",
        modelValue: title.value,
        "onUpdate:modelValue": ($event) => title.value = $event,
        placeholder: "请输入"
      }, null, _parent));
      _push(`</li><li data-v-2402bd99>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: topDivider.value,
        "onUpdate:modelValue": ($event) => topDivider.value = $event,
        label: "上分割线"
      }, null, _parent));
      _push(`</li><li data-v-2402bd99>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: bottomDivider.value,
        "onUpdate:modelValue": ($event) => bottomDivider.value = $event,
        label: "下分割线"
      }, null, _parent));
      _push(`</li><li data-v-2402bd99>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: border.value,
        "onUpdate:modelValue": ($event) => border.value = $event,
        label: "边框"
      }, null, _parent));
      _push(`</li><li class="flex" data-v-2402bd99><span data-v-2402bd99>圆角：</span>`);
      if (border.value) {
        _push(ssrRenderComponent(_component_h_radio_group, {
          modelValue: radius.value,
          "onUpdate:modelValue": ($event) => radius.value = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_h_radio, {
                label: "none",
                modelValue: radius.value,
                "onUpdate:modelValue": ($event) => radius.value = $event
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`none`);
                  } else {
                    return [
                      createTextVNode("none")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_radio, {
                label: "small",
                modelValue: radius.value,
                "onUpdate:modelValue": ($event) => radius.value = $event
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`small`);
                  } else {
                    return [
                      createTextVNode("small")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_radio, {
                label: "medium",
                modelValue: radius.value,
                "onUpdate:modelValue": ($event) => radius.value = $event
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`medium`);
                  } else {
                    return [
                      createTextVNode("medium")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_radio, {
                label: "large",
                modelValue: radius.value,
                "onUpdate:modelValue": ($event) => radius.value = $event
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`large`);
                  } else {
                    return [
                      createTextVNode("large")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_h_radio, {
                  label: "none",
                  modelValue: radius.value,
                  "onUpdate:modelValue": ($event) => radius.value = $event
                }, {
                  default: withCtx(() => [
                    createTextVNode("none")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_h_radio, {
                  label: "small",
                  modelValue: radius.value,
                  "onUpdate:modelValue": ($event) => radius.value = $event
                }, {
                  default: withCtx(() => [
                    createTextVNode("small")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_h_radio, {
                  label: "medium",
                  modelValue: radius.value,
                  "onUpdate:modelValue": ($event) => radius.value = $event
                }, {
                  default: withCtx(() => [
                    createTextVNode("medium")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_h_radio, {
                  label: "large",
                  modelValue: radius.value,
                  "onUpdate:modelValue": ($event) => radius.value = $event
                }, {
                  default: withCtx(() => [
                    createTextVNode("large")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</li></ul>`);
      _push(ssrRenderComponent(_component_h_card, {
        title: title.value,
        "top-divider": topDivider.value,
        "bottom-divider": bottomDivider.value,
        radius: radius.value,
        border: border.value
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="custom-footer" data-v-2402bd99${_scopeId}>`);
            _push2(ssrRenderComponent(_component_h_button, {
              type: "normal",
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Default`);
                } else {
                  return [
                    createTextVNode("Default")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, { size: "small" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Default`);
                } else {
                  return [
                    createTextVNode("Default")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "custom-footer" }, [
                createVNode(_component_h_button, {
                  type: "normal",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Default")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, { size: "small" }, {
                  default: withCtx(() => [
                    createTextVNode("Default")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(text)} `);
          } else {
            return [
              createTextVNode(toDisplayString(text) + " ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Card/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basic = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2402bd99"]]);
export {
  basic as default
};
