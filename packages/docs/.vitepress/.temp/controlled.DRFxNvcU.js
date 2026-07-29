import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "controlled",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref("Monday");
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      const _component_h_segmented = resolveComponent("h-segmented");
      const _component_h_segmented_item = resolveComponent("h-segmented-item");
      _push(ssrRenderComponent(_component_h_space, mergeProps({ direction: "vertical" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>激活</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: activeKey.value,
                    "onUpdate:modelValue": ($event) => activeKey.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(week, (v) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: v,
                            label: v,
                            value: v
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(week, (v) => {
                            return createVNode(_component_h_option, {
                              key: v,
                              label: v,
                              value: v
                            }, null, 8, ["label", "value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, "激活"),
                    createVNode(_component_h_select, {
                      modelValue: activeKey.value,
                      "onUpdate:modelValue": ($event) => activeKey.value = $event
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(week, (v) => {
                          return createVNode(_component_h_option, {
                            key: v,
                            label: v,
                            value: v
                          }, null, 8, ["label", "value"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_segmented, {
              "active-key": activeKey.value,
              "onUpdate:activeKey": ($event) => activeKey.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(week, (v) => {
                    _push3(ssrRenderComponent(_component_h_segmented_item, {
                      key: v,
                      label: v
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(week, (v) => {
                      return createVNode(_component_h_segmented_item, {
                        key: v,
                        label: v
                      }, null, 8, ["label"]);
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
                  createVNode("div", null, "激活"),
                  createVNode(_component_h_select, {
                    modelValue: activeKey.value,
                    "onUpdate:modelValue": ($event) => activeKey.value = $event
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(week, (v) => {
                        return createVNode(_component_h_option, {
                          key: v,
                          label: v,
                          value: v
                        }, null, 8, ["label", "value"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_segmented, {
                "active-key": activeKey.value,
                "onUpdate:activeKey": ($event) => activeKey.value = $event
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(week, (v) => {
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
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Segmented/controlled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
