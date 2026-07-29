import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "filterable",
  __ssrInlineRender: true,
  setup(__props) {
    const currentVal1 = ref([]);
    const currentVal2 = ref([["component", "basic", "color"]]);
    const currentVal3 = ref([]);
    const currentVal4 = ref([]);
    const checkStrictly = ref(true);
    const panelFilterInputValue2 = ref("");
    const changeHandle = (value, option) => {
      console.info(value, option);
    };
    const options = ref([]);
    function onFocus() {
      console.info("focus");
    }
    function onBlur() {
      console.info("blur");
    }
    onMounted(async () => {
      options.value = await fetch(new URL("/cascader-tree-data.json", import.meta.url).href).then((r) => r.json());
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_cascader = resolveComponent("h-cascader");
      const _component_h_tooltip = resolveComponent("h-tooltip");
      const _component_a_icon = resolveComponent("a-icon");
      const _component_h_input = resolveComponent("h-input");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        inline: true,
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "可选任意节点" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: checkStrictly.value,
                    "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
                    status: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: checkStrictly.value,
                      "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
                      status: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "可选任意节点" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: checkStrictly.value,
                    "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
                    status: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-095a9d88${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    filterable: true,
                    "check-strictly": checkStrictly.value,
                    options: options.value,
                    "to-body": false,
                    clearable: true,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal1.value,
                      "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                      filterable: true,
                      "check-strictly": checkStrictly.value,
                      options: options.value,
                      "to-body": false,
                      clearable: true,
                      onChange: changeHandle,
                      onFocus,
                      onBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "check-strictly", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-095a9d88${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    filterable: true,
                    options: options.value,
                    "check-strictly": checkStrictly.value,
                    multiple: "",
                    clearable: "",
                    "to-body": false,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal2.value,
                      "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                      filterable: true,
                      options: options.value,
                      "check-strictly": checkStrictly.value,
                      multiple: "",
                      clearable: "",
                      "to-body": false,
                      onChange: changeHandle,
                      onFocus,
                      onBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "check-strictly"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-095a9d88${_scopeId2}> 单选-下拉列表带筛选功能 `);
                  _push3(ssrRenderComponent(_component_h_tooltip, { content: "内置 input" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_icon, { name: "question" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_icon, { name: "question" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    "check-strictly": checkStrictly.value,
                    "panel-filter-option": true,
                    "use-build-in-panel-filter": true,
                    options: options.value,
                    "to-body": false,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, {
                    optionEmptyRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="empty-city" data-v-095a9d88${_scopeId3}>没有找到对应的城市信息</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 单选-下拉列表带筛选功能 "),
                      createVNode(_component_h_tooltip, { content: "内置 input" }, {
                        default: withCtx(() => [
                          createVNode(_component_a_icon, { name: "question" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal3.value,
                      "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                      "check-strictly": checkStrictly.value,
                      "panel-filter-option": true,
                      "use-build-in-panel-filter": true,
                      options: options.value,
                      "to-body": false,
                      onChange: changeHandle,
                      onFocus,
                      onBlur
                    }, {
                      optionEmptyRender: withCtx(() => [
                        createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "check-strictly", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-095a9d88${_scopeId2}>多选-下拉列表带筛选功能</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal4.value,
                    "onUpdate:modelValue": ($event) => currentVal4.value = $event,
                    multiple: true,
                    "check-strictly": checkStrictly.value,
                    "panel-filter-option": true,
                    "panel-filter-input-value": panelFilterInputValue2.value,
                    options: options.value,
                    "to-body": false,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, {
                    panelHeaderRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="panel-filter-box" data-v-095a9d88${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_h_input, {
                          modelValue: panelFilterInputValue2.value,
                          "onUpdate:modelValue": ($event) => panelFilterInputValue2.value = $event,
                          "prefix-icon": "search",
                          placeholder: "请搜索"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "panel-filter-box" }, [
                            createVNode(_component_h_input, {
                              modelValue: panelFilterInputValue2.value,
                              "onUpdate:modelValue": ($event) => panelFilterInputValue2.value = $event,
                              "prefix-icon": "search",
                              placeholder: "请搜索"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    optionEmptyRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="empty-city" data-v-095a9d88${_scopeId3}>没有找到对应的城市信息</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选-下拉列表带筛选功能"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal4.value,
                      "onUpdate:modelValue": ($event) => currentVal4.value = $event,
                      multiple: true,
                      "check-strictly": checkStrictly.value,
                      "panel-filter-option": true,
                      "panel-filter-input-value": panelFilterInputValue2.value,
                      options: options.value,
                      "to-body": false,
                      onChange: changeHandle,
                      onFocus,
                      onBlur
                    }, {
                      panelHeaderRender: withCtx(() => [
                        createVNode("div", { class: "panel-filter-box" }, [
                          createVNode(_component_h_input, {
                            modelValue: panelFilterInputValue2.value,
                            "onUpdate:modelValue": ($event) => panelFilterInputValue2.value = $event,
                            "prefix-icon": "search",
                            placeholder: "请搜索"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      optionEmptyRender: withCtx(() => [
                        createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "check-strictly", "panel-filter-input-value", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    filterable: true,
                    "check-strictly": checkStrictly.value,
                    options: options.value,
                    "to-body": false,
                    clearable: true,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "check-strictly", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    filterable: true,
                    options: options.value,
                    "check-strictly": checkStrictly.value,
                    multiple: "",
                    clearable: "",
                    "to-body": false,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "check-strictly"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 单选-下拉列表带筛选功能 "),
                    createVNode(_component_h_tooltip, { content: "内置 input" }, {
                      default: withCtx(() => [
                        createVNode(_component_a_icon, { name: "question" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    "check-strictly": checkStrictly.value,
                    "panel-filter-option": true,
                    "use-build-in-panel-filter": true,
                    options: options.value,
                    "to-body": false,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, {
                    optionEmptyRender: withCtx(() => [
                      createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "check-strictly", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选-下拉列表带筛选功能"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal4.value,
                    "onUpdate:modelValue": ($event) => currentVal4.value = $event,
                    multiple: true,
                    "check-strictly": checkStrictly.value,
                    "panel-filter-option": true,
                    "panel-filter-input-value": panelFilterInputValue2.value,
                    options: options.value,
                    "to-body": false,
                    onChange: changeHandle,
                    onFocus,
                    onBlur
                  }, {
                    panelHeaderRender: withCtx(() => [
                      createVNode("div", { class: "panel-filter-box" }, [
                        createVNode(_component_h_input, {
                          modelValue: panelFilterInputValue2.value,
                          "onUpdate:modelValue": ($event) => panelFilterInputValue2.value = $event,
                          "prefix-icon": "search",
                          placeholder: "请搜索"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    optionEmptyRender: withCtx(() => [
                      createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "check-strictly", "panel-filter-input-value", "options"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/filterable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const filterable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-095a9d88"]]);
export {
  filterable as default
};
