import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "description",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref();
    const value2 = ref();
    const selectOptions = [
      { value: 1, label: "上海", description: "Shanghai" },
      { value: 2, label: "北京", description: "Beijing" },
      { value: 3, label: "合肥", description: "Hefei" },
      { value: 4, label: "深圳", description: "Shenzhen" },
      { value: 5, label: "杭州", description: "Hangzhou" },
      { value: 6, label: "天津", description: "Tianjin" },
      { value: 7, label: "西安", description: `Xi'an` },
      { value: 8, label: "南京", description: "Nanjing" },
      { value: 9, label: "哈尔滨", description: "Harbin" },
      { value: 10, label: "香港", description: "HongKong" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>描述文字在右侧</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    clearable: true,
                    placeholder: "请选择",
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value,
                            description: item.description
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              label: item.label,
                              value: item.value,
                              description: item.description
                            }, null, 8, ["label", "value", "description"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "描述文字在右侧"),
                    createVNode(_component_h_select, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      clearable: true,
                      placeholder: "请选择",
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value,
                            description: item.description
                          }, null, 8, ["label", "value", "description"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>描述文字在下方</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    clearable: true,
                    placeholder: "请选择",
                    "to-body": false,
                    "description-position": "bottom"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value,
                            description: item.description
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              label: item.label,
                              value: item.value,
                              description: item.description
                            }, null, 8, ["label", "value", "description"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "描述文字在下方"),
                    createVNode(_component_h_select, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      clearable: true,
                      placeholder: "请选择",
                      "to-body": false,
                      "description-position": "bottom"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value,
                            description: item.description
                          }, null, 8, ["label", "value", "description"]);
                        }), 64))
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
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "描述文字在右侧"),
                  createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    clearable: true,
                    placeholder: "请选择",
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          label: item.label,
                          value: item.value,
                          description: item.description
                        }, null, 8, ["label", "value", "description"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "描述文字在下方"),
                  createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    clearable: true,
                    placeholder: "请选择",
                    "to-body": false,
                    "description-position": "bottom"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          label: item.label,
                          value: item.value,
                          description: item.description
                        }, null, 8, ["label", "value", "description"]);
                      }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/description.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
