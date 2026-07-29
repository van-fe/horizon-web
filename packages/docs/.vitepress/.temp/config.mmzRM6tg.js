import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, unref, createBlock, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "config",
  __ssrInlineRender: true,
  setup(__props) {
    const opened = ref(false);
    const customize = { maxCount: 3, duration: 5e3 };
    const onToggle = () => {
      if (opened.value) {
        $message.config(customize);
      } else {
        $message.config({ duration: 3e3, maxCount: Number.MAX_SAFE_INTEGER });
      }
    };
    const open = () => {
      $message.success(`This is a succeed message, current code: ${Math.random().toString(16).slice(2)}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_space, mergeProps({ direction: "vertical" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_checkbox, {
              modelValue: opened.value,
              "onUpdate:modelValue": ($event) => opened.value = $event,
              onChange: onToggle
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`启用全局配置(会影响所有message demo)`);
                } else {
                  return [
                    createTextVNode("启用全局配置(会影响所有message demo)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (opened.value) {
              _push2(ssrRenderComponent(_component_h_space, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}>延迟时间: ${ssrInterpolate(customize.duration)}</div><div${_scopeId2}>最大数量: ${ssrInterpolate(customize.maxCount)}</div>`);
                  } else {
                    return [
                      createVNode("div", null, "延迟时间: " + toDisplayString(customize.duration), 1),
                      createVNode("div", null, "最大数量: " + toDisplayString(customize.maxCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_h_space, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}>延迟时间: 3000</div><div${_scopeId2}>最大数量: Number.MAX_SAFE_INTEGER </div>`);
                  } else {
                    return [
                      createVNode("div", null, "延迟时间: 3000"),
                      createVNode("div", null, "最大数量: Number.MAX_SAFE_INTEGER ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    type: "normal",
                    plain: "",
                    onClick: open
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`new message`);
                      } else {
                        return [
                          createTextVNode("new message")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, {
                    type: "normal",
                    plain: "",
                    onClick: unref($message).closeAll
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Close All`);
                      } else {
                        return [
                          createTextVNode("Close All")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, {
                      type: "normal",
                      plain: "",
                      onClick: open
                    }, {
                      default: withCtx(() => [
                        createTextVNode("new message")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      type: "normal",
                      plain: "",
                      onClick: unref($message).closeAll
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Close All")
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
              createVNode(_component_h_checkbox, {
                modelValue: opened.value,
                "onUpdate:modelValue": ($event) => opened.value = $event,
                onChange: onToggle
              }, {
                default: withCtx(() => [
                  createTextVNode("启用全局配置(会影响所有message demo)")
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              opened.value ? (openBlock(), createBlock(_component_h_space, { key: 0 }, {
                default: withCtx(() => [
                  createVNode("div", null, "延迟时间: " + toDisplayString(customize.duration), 1),
                  createVNode("div", null, "最大数量: " + toDisplayString(customize.maxCount), 1)
                ]),
                _: 1
              })) : (openBlock(), createBlock(_component_h_space, { key: 1 }, {
                default: withCtx(() => [
                  createVNode("div", null, "延迟时间: 3000"),
                  createVNode("div", null, "最大数量: Number.MAX_SAFE_INTEGER ")
                ]),
                _: 1
              })),
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode(_component_h_button, {
                    type: "normal",
                    plain: "",
                    onClick: open
                  }, {
                    default: withCtx(() => [
                      createTextVNode("new message")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    type: "normal",
                    plain: "",
                    onClick: unref($message).closeAll
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Close All")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/Message/config.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
