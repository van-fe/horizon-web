import { defineComponent, ref, resolveComponent, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "statistic",
  __ssrInlineRender: true,
  setup(__props) {
    const size = ref("medium");
    const selectStyle = ref("normal");
    const value = ref([]);
    const value2 = ref([]);
    const selectOptions = [
      { value: 1, label: "上海" },
      { value: 2, label: "北京" },
      { value: 3, label: "合肥" },
      { value: 4, label: "深圳" },
      { value: 5, label: "杭州" },
      { value: 6, label: "天津" },
      { value: 7, label: "西安" },
      { value: 8, label: "南京" },
      { value: 9, label: "哈尔滨" },
      { value: 10, label: "香港" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "size" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "small" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "medium" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "large" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "small" }),
                          createVNode(_component_h_radio, { label: "medium" }),
                          createVNode(_component_h_radio, { label: "large" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: size.value,
                      "onUpdate:modelValue": ($event) => size.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "small" }),
                        createVNode(_component_h_radio, { label: "medium" }),
                        createVNode(_component_h_radio, { label: "large" })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "selectStyle" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: selectStyle.value,
                    "onUpdate:modelValue": ($event) => selectStyle.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "normal" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "emphasize" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "no-border" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "normal" }),
                          createVNode(_component_h_radio, { label: "emphasize" }),
                          createVNode(_component_h_radio, { label: "no-border" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: selectStyle.value,
                      "onUpdate:modelValue": ($event) => selectStyle.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "normal" }),
                        createVNode(_component_h_radio, { label: "emphasize" }),
                        createVNode(_component_h_radio, { label: "no-border" })
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
              createVNode(_component_h_form_item, { label: "size" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "small" }),
                      createVNode(_component_h_radio, { label: "medium" }),
                      createVNode(_component_h_radio, { label: "large" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "selectStyle" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: selectStyle.value,
                    "onUpdate:modelValue": ($event) => selectStyle.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "normal" }),
                      createVNode(_component_h_radio, { label: "emphasize" }),
                      createVNode(_component_h_radio, { label: "no-border" })
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
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, {
              xs: 12,
              md: 8,
              lg: 6,
              xl: 6,
              xxl: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>默认国际化配置</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    multiple: true,
                    "use-statistic": true,
                    "to-body": false,
                    "select-style": selectStyle.value,
                    clearable: true,
                    size: size.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              value: item.value,
                              label: item.label
                            }, null, 8, ["value", "label"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "默认国际化配置"),
                    createVNode(_component_h_select, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      multiple: true,
                      "use-statistic": true,
                      "to-body": false,
                      "select-style": selectStyle.value,
                      clearable: true,
                      size: size.value
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, 8, ["value", "label"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "select-style", "size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, {
              xs: 12,
              md: 8,
              lg: 6,
              xl: 6,
              xxl: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>自定义为”城市标签“</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    multiple: true,
                    "use-statistic": true,
                    "statistic-text": "城市标签",
                    "to-body": false,
                    "select-style": selectStyle.value,
                    clearable: true,
                    size: size.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              value: item.value,
                              label: item.label
                            }, null, 8, ["value", "label"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "自定义为”城市标签“"),
                    createVNode(_component_h_select, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      multiple: true,
                      "use-statistic": true,
                      "statistic-text": "城市标签",
                      "to-body": false,
                      "select-style": selectStyle.value,
                      clearable: true,
                      size: size.value
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, 8, ["value", "label"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "select-style", "size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, {
                xs: 12,
                md: 8,
                lg: 6,
                xl: 6,
                xxl: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "默认国际化配置"),
                  createVNode(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    multiple: true,
                    "use-statistic": true,
                    "to-body": false,
                    "select-style": selectStyle.value,
                    clearable: true,
                    size: size.value
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          value: item.value,
                          label: item.label
                        }, null, 8, ["value", "label"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "select-style", "size"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, {
                xs: 12,
                md: 8,
                lg: 6,
                xl: 6,
                xxl: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "自定义为”城市标签“"),
                  createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    multiple: true,
                    "use-statistic": true,
                    "statistic-text": "城市标签",
                    "to-body": false,
                    "select-style": selectStyle.value,
                    clearable: true,
                    size: size.value
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          value: item.value,
                          label: item.label
                        }, null, 8, ["value", "label"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "select-style", "size"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/statistic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
