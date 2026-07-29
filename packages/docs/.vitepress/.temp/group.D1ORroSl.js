import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "group",
  __ssrInlineRender: true,
  setup(__props) {
    const modelValue = ref("Shanghai");
    const radioGroupOptions = ref([
      {
        label: "Shanghai"
      },
      {
        label: "Beijing"
      },
      {
        label: "Guangzhou"
      },
      {
        label: "Shenzhen"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio_button = resolveComponent("h-radio-button");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>medium(default)</div>`);
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: modelValue.value,
                    "onUpdate:modelValue": ($event) => modelValue.value = $event,
                    size: "medium"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(radioGroupOptions.value, (item, index) => {
                          _push4(ssrRenderComponent(_component_h_radio_button, {
                            key: index,
                            value: item.label
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(radioGroupOptions.value, (item, index) => {
                            return openBlock(), createBlock(_component_h_radio_button, {
                              key: index,
                              value: item.label
                            }, null, 8, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "medium(default)"),
                    createVNode(_component_h_radio_group, {
                      modelValue: modelValue.value,
                      "onUpdate:modelValue": ($event) => modelValue.value = $event,
                      size: "medium"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(radioGroupOptions.value, (item, index) => {
                          return openBlock(), createBlock(_component_h_radio_button, {
                            key: index,
                            value: item.label
                          }, null, 8, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>large</div>`);
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: modelValue.value,
                    "onUpdate:modelValue": ($event) => modelValue.value = $event,
                    size: "large",
                    disabled: true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(radioGroupOptions.value, (item, index) => {
                          _push4(ssrRenderComponent(_component_h_radio_button, {
                            key: index,
                            value: item.label
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(radioGroupOptions.value, (item, index) => {
                            return openBlock(), createBlock(_component_h_radio_button, {
                              key: index,
                              value: item.label
                            }, null, 8, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "large"),
                    createVNode(_component_h_radio_group, {
                      modelValue: modelValue.value,
                      "onUpdate:modelValue": ($event) => modelValue.value = $event,
                      size: "large",
                      disabled: true
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(radioGroupOptions.value, (item, index) => {
                          return openBlock(), createBlock(_component_h_radio_button, {
                            key: index,
                            value: item.label
                          }, null, 8, ["value"]);
                        }), 128))
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
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "medium(default)"),
                  createVNode(_component_h_radio_group, {
                    modelValue: modelValue.value,
                    "onUpdate:modelValue": ($event) => modelValue.value = $event,
                    size: "medium"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(radioGroupOptions.value, (item, index) => {
                        return openBlock(), createBlock(_component_h_radio_button, {
                          key: index,
                          value: item.label
                        }, null, 8, ["value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "large"),
                  createVNode(_component_h_radio_group, {
                    modelValue: modelValue.value,
                    "onUpdate:modelValue": ($event) => modelValue.value = $event,
                    size: "large",
                    disabled: true
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(radioGroupOptions.value, (item, index) => {
                        return openBlock(), createBlock(_component_h_radio_button, {
                          key: index,
                          value: item.label
                        }, null, 8, ["value"]);
                      }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Radio/group.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
