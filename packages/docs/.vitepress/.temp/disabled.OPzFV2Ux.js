import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "disabled",
  __ssrInlineRender: true,
  setup(__props) {
    const disabled = ref(true);
    const quarter = ["Q1", "Q2", "Q3", "Q4"];
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_segmented = resolveComponent("h-segmented");
      const _component_h_segmented_item = resolveComponent("h-segmented-item");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      _push(ssrRenderComponent(_component_h_space, mergeProps({ direction: "vertical" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_segmented, { "default-active-key": "Q1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(quarter, (v, i) => {
                    _push3(ssrRenderComponent(_component_h_segmented_item, {
                      key: v,
                      disabled: i % 2 === 0,
                      label: v
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(quarter, (v, i) => {
                      return createVNode(_component_h_segmented_item, {
                        key: v,
                        disabled: i % 2 === 0,
                        label: v
                      }, null, 8, ["disabled", "label"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_segmented, { "default-active-key": "Sun" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(week, (v) => {
                          _push4(ssrRenderComponent(_component_h_segmented_item, {
                            key: v,
                            disabled: disabled.value,
                            label: v
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(week, (v) => {
                            return createVNode(_component_h_segmented_item, {
                              key: v,
                              disabled: disabled.value,
                              label: v
                            }, null, 8, ["disabled", "label"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_checkbox, {
                    modelValue: disabled.value,
                    "onUpdate:modelValue": ($event) => disabled.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`全部禁用`);
                      } else {
                        return [
                          createTextVNode("全部禁用")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_segmented, { "default-active-key": "Sun" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(week, (v) => {
                          return createVNode(_component_h_segmented_item, {
                            key: v,
                            disabled: disabled.value,
                            label: v
                          }, null, 8, ["disabled", "label"]);
                        }), 64))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_checkbox, {
                      modelValue: disabled.value,
                      "onUpdate:modelValue": ($event) => disabled.value = $event
                    }, {
                      default: withCtx(() => [
                        createTextVNode("全部禁用")
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
              createVNode(_component_h_segmented, { "default-active-key": "Q1" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(quarter, (v, i) => {
                    return createVNode(_component_h_segmented_item, {
                      key: v,
                      disabled: i % 2 === 0,
                      label: v
                    }, null, 8, ["disabled", "label"]);
                  }), 64))
                ]),
                _: 1
              }),
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode(_component_h_segmented, { "default-active-key": "Sun" }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(week, (v) => {
                        return createVNode(_component_h_segmented_item, {
                          key: v,
                          disabled: disabled.value,
                          label: v
                        }, null, 8, ["disabled", "label"]);
                      }), 64))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_checkbox, {
                    modelValue: disabled.value,
                    "onUpdate:modelValue": ($event) => disabled.value = $event
                  }, {
                    default: withCtx(() => [
                      createTextVNode("全部禁用")
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Segmented/disabled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
