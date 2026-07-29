import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "group",
  __ssrInlineRender: true,
  setup(__props) {
    const checkboxGroupOptions = ref([
      {
        label: "Shanghai",
        checked: true
      },
      {
        label: "Beijing",
        checked: false
      },
      {
        label: "Guangzhou",
        checked: false
      },
      {
        label: "Shenzheng",
        checked: false
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_checkbox_group = resolveComponent("h-checkbox-group");
      const _component_h_checkbox_button = resolveComponent("h-checkbox-button");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>medium(default)</div>`);
                  _push3(ssrRenderComponent(_component_h_checkbox_group, { disabled: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(checkboxGroupOptions.value, (item, index) => {
                          _push4(ssrRenderComponent(_component_h_checkbox_button, {
                            key: index,
                            modelValue: item.checked,
                            "onUpdate:modelValue": ($event) => item.checked = $event,
                            label: item.label
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(checkboxGroupOptions.value, (item, index) => {
                            return openBlock(), createBlock(_component_h_checkbox_button, {
                              key: index,
                              modelValue: item.checked,
                              "onUpdate:modelValue": ($event) => item.checked = $event,
                              label: item.label
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "medium(default)"),
                    createVNode(_component_h_checkbox_group, { disabled: "" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(checkboxGroupOptions.value, (item, index) => {
                          return openBlock(), createBlock(_component_h_checkbox_button, {
                            key: index,
                            modelValue: item.checked,
                            "onUpdate:modelValue": ($event) => item.checked = $event,
                            label: item.label
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>large</div>`);
                  _push3(ssrRenderComponent(_component_h_checkbox_group, { size: "large" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(checkboxGroupOptions.value, (item, index) => {
                          _push4(ssrRenderComponent(_component_h_checkbox_button, {
                            key: index,
                            modelValue: item.checked,
                            "onUpdate:modelValue": ($event) => item.checked = $event,
                            label: item.label
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(checkboxGroupOptions.value, (item, index) => {
                            return openBlock(), createBlock(_component_h_checkbox_button, {
                              key: index,
                              modelValue: item.checked,
                              "onUpdate:modelValue": ($event) => item.checked = $event,
                              label: item.label
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "large"),
                    createVNode(_component_h_checkbox_group, { size: "large" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(checkboxGroupOptions.value, (item, index) => {
                          return openBlock(), createBlock(_component_h_checkbox_button, {
                            key: index,
                            modelValue: item.checked,
                            "onUpdate:modelValue": ($event) => item.checked = $event,
                            label: item.label
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                        }), 128))
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
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "medium(default)"),
                  createVNode(_component_h_checkbox_group, { disabled: "" }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(checkboxGroupOptions.value, (item, index) => {
                        return openBlock(), createBlock(_component_h_checkbox_button, {
                          key: index,
                          modelValue: item.checked,
                          "onUpdate:modelValue": ($event) => item.checked = $event,
                          label: item.label
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "large"),
                  createVNode(_component_h_checkbox_group, { size: "large" }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(checkboxGroupOptions.value, (item, index) => {
                        return openBlock(), createBlock(_component_h_checkbox_button, {
                          key: index,
                          modelValue: item.checked,
                          "onUpdate:modelValue": ($event) => item.checked = $event,
                          label: item.label
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                      }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Checkbox/group.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
