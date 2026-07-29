import { defineComponent, ref, computed, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "indeterminate",
  __ssrInlineRender: true,
  setup(__props) {
    const checkAll = ref(false);
    const checked = ref(["1"]);
    const indeterminate2 = computed(() => checked.value.length > 0 && checked.value.length < 2);
    const selectCheckbox = (val) => {
      console.info("selectCheckbox ==> ", val);
      checkAll.value = val.length === 2;
    };
    function onCheckAllChanged(val) {
      if (val) {
        checked.value = ["1", "2"];
      } else {
        checked.value = [];
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_checkbox_group = resolveComponent("h-checkbox-group");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_checkbox, {
                    modelValue: checkAll.value,
                    "onUpdate:modelValue": ($event) => checkAll.value = $event,
                    indeterminate: indeterminate2.value,
                    onChange: onCheckAllChanged
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Check All`);
                      } else {
                        return [
                          createTextVNode("Check All")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_checkbox, {
                      modelValue: checkAll.value,
                      "onUpdate:modelValue": ($event) => checkAll.value = $event,
                      indeterminate: indeterminate2.value,
                      onChange: onCheckAllChanged
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Check All")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "indeterminate"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_checkbox_group, {
                    modelValue: checked.value,
                    "onUpdate:modelValue": ($event) => checked.value = $event,
                    onChange: selectCheckbox
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_checkbox, {
                          label: "1",
                          class: "checkbox"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` option 1 `);
                            } else {
                              return [
                                createTextVNode(" option 1 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_checkbox, {
                          label: "2",
                          class: "checkbox"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` option 2 `);
                            } else {
                              return [
                                createTextVNode(" option 2 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_checkbox, {
                            label: "1",
                            class: "checkbox"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" option 1 ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_checkbox, {
                            label: "2",
                            class: "checkbox"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" option 2 ")
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
                    createVNode(_component_h_checkbox_group, {
                      modelValue: checked.value,
                      "onUpdate:modelValue": ($event) => checked.value = $event,
                      onChange: selectCheckbox
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_checkbox, {
                          label: "1",
                          class: "checkbox"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" option 1 ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_checkbox, {
                          label: "2",
                          class: "checkbox"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" option 2 ")
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
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_checkbox, {
                    modelValue: checkAll.value,
                    "onUpdate:modelValue": ($event) => checkAll.value = $event,
                    indeterminate: indeterminate2.value,
                    onChange: onCheckAllChanged
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Check All")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "indeterminate"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_checkbox_group, {
                    modelValue: checked.value,
                    "onUpdate:modelValue": ($event) => checked.value = $event,
                    onChange: selectCheckbox
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_checkbox, {
                        label: "1",
                        class: "checkbox"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" option 1 ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_checkbox, {
                        label: "2",
                        class: "checkbox"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" option 2 ")
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Checkbox/indeterminate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const indeterminate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c83fead"]]);
export {
  indeterminate as default
};
