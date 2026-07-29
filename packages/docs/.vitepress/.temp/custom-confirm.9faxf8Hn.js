import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-confirm",
  __ssrInlineRender: true,
  setup(__props) {
    const cascaderRef = ref(null);
    const currentVal1 = ref([]);
    const currentVal2 = ref([]);
    const currentVal3 = ref([]);
    const options = ref([]);
    fetch(
      new URL("/cascader-options.json", import.meta.url).href
    ).then((res) => {
      res.json().then((value) => {
        options.value = value;
      });
    });
    const confirmCancelHandle = () => {
      var _a;
      (_a = cascaderRef.value) == null ? void 0 : _a.exposeConfirm.cancelHandle();
    };
    const confirmEnterHandle = () => {
      var _a;
      (_a = cascaderRef.value) == null ? void 0 : _a.exposeConfirm.confirmHandle();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_cascader = resolveComponent("h-cascader");
      const _component_h_tooltip = resolveComponent("h-tooltip");
      const _component_a_icon = resolveComponent("a-icon");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-30a963a9>`);
      _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-30a963a9${_scopeId2}> 自定义按钮文案 </div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    options: options.value,
                    "need-confirm": true,
                    "confirm-btn-text": "确定",
                    "cancel-btn-text": "取消",
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 自定义按钮文案 "),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal1.value,
                      "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                      options: options.value,
                      "need-confirm": true,
                      "confirm-btn-text": "确定",
                      "cancel-btn-text": "取消",
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-30a963a9${_scopeId2}> 自定义 confirm render `);
                  _push3(ssrRenderComponent(_component_h_tooltip, { content: "使用自定义 render 时请确保 confirm 参数不是 false 或者 undefined" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_icon, { name: "help" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_icon, { name: "help" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    options: options.value,
                    "need-confirm": true,
                    multiple: "",
                    "to-body": false
                  }, {
                    confirmRender: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="confirm-buttons" data-v-30a963a9${_scopeId3}><span data-v-30a963a9${_scopeId3}>取消</span><span data-v-30a963a9${_scopeId3}>确认</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "confirm-buttons" }, [
                            createVNode("span", {
                              onClick: slotProps.cancelHandle
                            }, "取消", 8, ["onClick"]),
                            createVNode("span", {
                              onClick: slotProps.confirmHandle
                            }, "确认", 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 自定义 confirm render "),
                      createVNode(_component_h_tooltip, { content: "使用自定义 render 时请确保 confirm 参数不是 false 或者 undefined" }, {
                        default: withCtx(() => [
                          createVNode(_component_a_icon, { name: "help" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal2.value,
                      "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                      options: options.value,
                      "need-confirm": true,
                      multiple: "",
                      "to-body": false
                    }, {
                      confirmRender: withCtx((slotProps) => [
                        createVNode("div", { class: "confirm-buttons" }, [
                          createVNode("span", {
                            onClick: slotProps.cancelHandle
                          }, "取消", 8, ["onClick"]),
                          createVNode("span", {
                            onClick: slotProps.confirmHandle
                          }, "确认", 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-30a963a9${_scopeId2}> 通过 template ref 去获取组件暴露出来的事件 </div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    ref_key: "cascaderRef",
                    ref: cascaderRef,
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    options: options.value,
                    "need-confirm": true,
                    multiple: "",
                    "to-body": false
                  }, {
                    confirmRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="confirm-buttons" data-v-30a963a9${_scopeId3}><span data-v-30a963a9${_scopeId3}>取消</span><span data-v-30a963a9${_scopeId3}>确认</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "confirm-buttons" }, [
                            createVNode("span", { onClick: confirmCancelHandle }, "取消"),
                            createVNode("span", { onClick: confirmEnterHandle }, "确认")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 通过 template ref 去获取组件暴露出来的事件 "),
                    createVNode(_component_h_cascader, {
                      ref_key: "cascaderRef",
                      ref: cascaderRef,
                      modelValue: currentVal3.value,
                      "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                      options: options.value,
                      "need-confirm": true,
                      multiple: "",
                      "to-body": false
                    }, {
                      confirmRender: withCtx(() => [
                        createVNode("div", { class: "confirm-buttons" }, [
                          createVNode("span", { onClick: confirmCancelHandle }, "取消"),
                          createVNode("span", { onClick: confirmEnterHandle }, "确认")
                        ])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 自定义按钮文案 "),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    options: options.value,
                    "need-confirm": true,
                    "confirm-btn-text": "确定",
                    "cancel-btn-text": "取消",
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 自定义 confirm render "),
                    createVNode(_component_h_tooltip, { content: "使用自定义 render 时请确保 confirm 参数不是 false 或者 undefined" }, {
                      default: withCtx(() => [
                        createVNode(_component_a_icon, { name: "help" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    options: options.value,
                    "need-confirm": true,
                    multiple: "",
                    "to-body": false
                  }, {
                    confirmRender: withCtx((slotProps) => [
                      createVNode("div", { class: "confirm-buttons" }, [
                        createVNode("span", {
                          onClick: slotProps.cancelHandle
                        }, "取消", 8, ["onClick"]),
                        createVNode("span", {
                          onClick: slotProps.confirmHandle
                        }, "确认", 8, ["onClick"])
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 通过 template ref 去获取组件暴露出来的事件 "),
                  createVNode(_component_h_cascader, {
                    ref_key: "cascaderRef",
                    ref: cascaderRef,
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    options: options.value,
                    "need-confirm": true,
                    multiple: "",
                    "to-body": false
                  }, {
                    confirmRender: withCtx(() => [
                      createVNode("div", { class: "confirm-buttons" }, [
                        createVNode("span", { onClick: confirmCancelHandle }, "取消"),
                        createVNode("span", { onClick: confirmEnterHandle }, "确认")
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/custom-confirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customConfirm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-30a963a9"]]);
export {
  customConfirm as default
};
