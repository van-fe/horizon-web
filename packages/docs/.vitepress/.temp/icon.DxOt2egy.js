import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "icon",
  __ssrInlineRender: true,
  setup(__props) {
    const options = [
      { label: "All", icon: "layout" },
      { label: "List", icon: "list", badge: 8 }
    ];
    const showText = ref(true);
    const showIcon = ref(true);
    const showBadge = ref(true);
    const resolveProps = (opt) => {
      if (showText.value && showIcon.value) return opt;
      if (showText.value) return { label: opt.label };
      if (showIcon.value) return { icon: opt.icon };
      return {};
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_segmented = resolveComponent("h-segmented");
      const _component_h_segmented_item = resolveComponent("h-segmented-item");
      const _component_h_badge = resolveComponent("h-badge");
      _push(ssrRenderComponent(_component_h_space, mergeProps({ direction: "vertical" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_checkbox, {
                    modelValue: showText.value,
                    "onUpdate:modelValue": ($event) => showText.value = $event,
                    disabled: !showIcon.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`是否显示文字`);
                      } else {
                        return [
                          createTextVNode("是否显示文字")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_checkbox, {
                    modelValue: showIcon.value,
                    "onUpdate:modelValue": ($event) => showIcon.value = $event,
                    disabled: !showText.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`是否显示图标`);
                      } else {
                        return [
                          createTextVNode("是否显示图标")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_checkbox, {
                    modelValue: showBadge.value,
                    "onUpdate:modelValue": ($event) => showBadge.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`是否显示角标`);
                      } else {
                        return [
                          createTextVNode("是否显示角标")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_checkbox, {
                      modelValue: showText.value,
                      "onUpdate:modelValue": ($event) => showText.value = $event,
                      disabled: !showIcon.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("是否显示文字")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                    createVNode(_component_h_checkbox, {
                      modelValue: showIcon.value,
                      "onUpdate:modelValue": ($event) => showIcon.value = $event,
                      disabled: !showText.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("是否显示图标")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                    createVNode(_component_h_checkbox, {
                      modelValue: showBadge.value,
                      "onUpdate:modelValue": ($event) => showBadge.value = $event
                    }, {
                      default: withCtx(() => [
                        createTextVNode("是否显示角标")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_segmented, { "default-active-key": "All" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(options, (opt) => {
                    _push3(ssrRenderComponent(_component_h_segmented_item, mergeProps({
                      key: opt.label
                    }, { ref_for: true }, resolveProps(opt)), {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (opt.badge && showBadge.value) {
                            _push4(ssrRenderComponent(_component_h_badge, {
                              type: "num",
                              "num-max": 99,
                              content: opt.badge
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div${_scopeId4}>${ssrInterpolate(opt.label)}</div>`);
                                } else {
                                  return [
                                    createVNode("div", null, toDisplayString(opt.label), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<div${_scopeId3}>${ssrInterpolate(opt.label)}</div>`);
                          }
                        } else {
                          return [
                            opt.badge && showBadge.value ? (openBlock(), createBlock(_component_h_badge, {
                              key: 0,
                              type: "num",
                              "num-max": 99,
                              content: opt.badge
                            }, {
                              default: withCtx(() => [
                                createVNode("div", null, toDisplayString(opt.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["content"])) : (openBlock(), createBlock("div", { key: 1 }, toDisplayString(opt.label), 1))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(options, (opt) => {
                      return createVNode(_component_h_segmented_item, mergeProps({
                        key: opt.label
                      }, { ref_for: true }, resolveProps(opt)), {
                        default: withCtx(() => [
                          opt.badge && showBadge.value ? (openBlock(), createBlock(_component_h_badge, {
                            key: 0,
                            type: "num",
                            "num-max": 99,
                            content: opt.badge
                          }, {
                            default: withCtx(() => [
                              createVNode("div", null, toDisplayString(opt.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["content"])) : (openBlock(), createBlock("div", { key: 1 }, toDisplayString(opt.label), 1))
                        ]),
                        _: 2
                      }, 1040);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode(_component_h_checkbox, {
                    modelValue: showText.value,
                    "onUpdate:modelValue": ($event) => showText.value = $event,
                    disabled: !showIcon.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("是否显示文字")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                  createVNode(_component_h_checkbox, {
                    modelValue: showIcon.value,
                    "onUpdate:modelValue": ($event) => showIcon.value = $event,
                    disabled: !showText.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("是否显示图标")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                  createVNode(_component_h_checkbox, {
                    modelValue: showBadge.value,
                    "onUpdate:modelValue": ($event) => showBadge.value = $event
                  }, {
                    default: withCtx(() => [
                      createTextVNode("是否显示角标")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_segmented, { "default-active-key": "All" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(options, (opt) => {
                    return createVNode(_component_h_segmented_item, mergeProps({
                      key: opt.label
                    }, { ref_for: true }, resolveProps(opt)), {
                      default: withCtx(() => [
                        opt.badge && showBadge.value ? (openBlock(), createBlock(_component_h_badge, {
                          key: 0,
                          type: "num",
                          "num-max": 99,
                          content: opt.badge
                        }, {
                          default: withCtx(() => [
                            createVNode("div", null, toDisplayString(opt.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["content"])) : (openBlock(), createBlock("div", { key: 1 }, toDisplayString(opt.label), 1))
                      ]),
                      _: 2
                    }, 1040);
                  }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Segmented/icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
