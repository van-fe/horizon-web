import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "fit-width",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref(null);
    const values1 = ref([]);
    const selectOptions = [
      { value: 1, label: "一个名字特别长的文字，需要超过 select 本身宽度" },
      { value: 2, label: "北京" },
      { value: 3, label: "合肥" }
    ];
    const changeHandle = () => {
      console.info(value1.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> 单选 </div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    clearable: "",
                    placeholder: "请选择",
                    "fit-input-width": false,
                    "to-body": false,
                    onChange: changeHandle
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              label: item.label,
                              value: item.value
                            }, null, 8, ["label", "value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 单选 "),
                    createVNode(_component_h_select, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      clearable: "",
                      placeholder: "请选择",
                      "fit-input-width": false,
                      "to-body": false,
                      onChange: changeHandle
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value
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
            _push2(ssrRenderComponent(_component_h_col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> 多选 </div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    multiple: "",
                    clearable: "",
                    placeholder: "请选择",
                    "fit-input-width": false,
                    collapse: true,
                    "to-body": false,
                    "collapse-tags-fill-up": "",
                    onChange: changeHandle
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value,
                            "max-lines": 2
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
                              "max-lines": 2
                            }, null, 8, ["label", "value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 多选 "),
                    createVNode(_component_h_select, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      multiple: "",
                      clearable: "",
                      placeholder: "请选择",
                      "fit-input-width": false,
                      collapse: true,
                      "to-body": false,
                      "collapse-tags-fill-up": "",
                      onChange: changeHandle
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value,
                            "max-lines": 2
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
          } else {
            return [
              createVNode(_component_h_col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 单选 "),
                  createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    clearable: "",
                    placeholder: "请选择",
                    "fit-input-width": false,
                    "to-body": false,
                    onChange: changeHandle
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          label: item.label,
                          value: item.value
                        }, null, 8, ["label", "value"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 多选 "),
                  createVNode(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    multiple: "",
                    clearable: "",
                    placeholder: "请选择",
                    "fit-input-width": false,
                    collapse: true,
                    "to-body": false,
                    "collapse-tags-fill-up": "",
                    onChange: changeHandle
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          label: item.label,
                          value: item.value,
                          "max-lines": 2
                        }, null, 8, ["label", "value"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/fit-width.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
