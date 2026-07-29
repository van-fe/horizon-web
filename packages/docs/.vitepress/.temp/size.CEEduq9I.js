import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const selectSize = ref("medium");
    const selectStyle = ref("normal");
    const selectDisabled = ref("useable");
    const value1 = ref(null);
    const value2 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const remoteSelect1 = ref(null);
    const remoteSelect2 = ref(null);
    const selectOptions = [
      { value: 1, label: "上海" },
      { value: 2, label: "北京" },
      { value: 3, label: "合肥" }
    ];
    const changeHandle = () => {
      console.info(value1.value);
    };
    const onUpdateModelValue = (val) => {
      console.info("update-modelValue", val);
      value1.value = val;
    };
    const onUpdateMultipleModelValue = (val) => {
      console.info("update-multiple-modelValue", val);
      values1.value = val;
    };
    return {
      selectSize,
      changeHandle,
      selectStyle,
      selectDisabled,
      selectOptions,
      remoteSelect1,
      remoteSelect2,
      value1,
      value2,
      values1,
      values2,
      onUpdateModelValue,
      onUpdateMultipleModelValue
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
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
    "label-vertical-align": "middle",
    "label-justify-align": "right"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, { label: "size" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.selectSize,
                "onUpdate:modelValue": ($event) => _ctx.selectSize = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(["small", "medium", "large"], (label, index) => {
                      _push4(ssrRenderComponent(_component_h_radio, {
                        key: index,
                        label,
                        size: "small"
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(["small", "medium", "large"], (label, index) => {
                        return createVNode(_component_h_radio, {
                          key: index,
                          label,
                          size: "small"
                        }, null, 8, ["label"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_radio_group, {
                  modelValue: _ctx.selectSize,
                  "onUpdate:modelValue": ($event) => _ctx.selectSize = $event
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(["small", "medium", "large"], (label, index) => {
                      return createVNode(_component_h_radio, {
                        key: index,
                        label,
                        size: "small"
                      }, null, 8, ["label"]);
                    }), 64))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, { label: "style" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.selectStyle,
                "onUpdate:modelValue": ($event) => _ctx.selectStyle = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(["normal", "noborder", "emphasize"], (label, index) => {
                      _push4(ssrRenderComponent(_component_h_radio, {
                        key: index,
                        label,
                        size: "small"
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(["normal", "noborder", "emphasize"], (label, index) => {
                        return createVNode(_component_h_radio, {
                          key: index,
                          label,
                          size: "small"
                        }, null, 8, ["label"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_radio_group, {
                  modelValue: _ctx.selectStyle,
                  "onUpdate:modelValue": ($event) => _ctx.selectStyle = $event
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(["normal", "noborder", "emphasize"], (label, index) => {
                      return createVNode(_component_h_radio, {
                        key: index,
                        label,
                        size: "small"
                      }, null, 8, ["label"]);
                    }), 64))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, { label: "disabled" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.selectDisabled,
                "onUpdate:modelValue": ($event) => _ctx.selectDisabled = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(["disabled", "useable"], (label, index) => {
                      _push4(ssrRenderComponent(_component_h_radio, {
                        key: index,
                        label,
                        size: "small"
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(["disabled", "useable"], (label, index) => {
                        return createVNode(_component_h_radio, {
                          key: index,
                          label,
                          size: "small"
                        }, null, 8, ["label"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_radio_group, {
                  modelValue: _ctx.selectDisabled,
                  "onUpdate:modelValue": ($event) => _ctx.selectDisabled = $event
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(["disabled", "useable"], (label, index) => {
                      return createVNode(_component_h_radio, {
                        key: index,
                        label,
                        size: "small"
                      }, null, 8, ["label"]);
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
          createVNode(_component_h_form_item, { label: "size" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.selectSize,
                "onUpdate:modelValue": ($event) => _ctx.selectSize = $event
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(["small", "medium", "large"], (label, index) => {
                    return createVNode(_component_h_radio, {
                      key: index,
                      label,
                      size: "small"
                    }, null, 8, ["label"]);
                  }), 64))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, { label: "style" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.selectStyle,
                "onUpdate:modelValue": ($event) => _ctx.selectStyle = $event
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(["normal", "noborder", "emphasize"], (label, index) => {
                    return createVNode(_component_h_radio, {
                      key: index,
                      label,
                      size: "small"
                    }, null, 8, ["label"]);
                  }), 64))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, { label: "disabled" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.selectDisabled,
                "onUpdate:modelValue": ($event) => _ctx.selectDisabled = $event
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(["disabled", "useable"], (label, index) => {
                    return createVNode(_component_h_radio, {
                      key: index,
                      label,
                      size: "small"
                    }, null, 8, ["label"]);
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
  _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}> 单选 </div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                "model-value": _ctx.value1,
                class: "curGroup",
                size: _ctx.selectSize,
                "select-style": _ctx.selectStyle,
                clearable: "",
                placeholder: "请选择",
                disabled: _ctx.selectDisabled === "disabled",
                "to-body": false,
                onChange: _ctx.changeHandle,
                "onUpdate:modelValue": _ctx.onUpdateModelValue
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(_ctx.selectOptions, (item) => {
                      _push4(ssrRenderComponent(_component_h_option, {
                        key: item.value,
                        label: item.label,
                        value: item.value,
                        disabled: item.value === 2
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.selectOptions, (item) => {
                        return openBlock(), createBlock(_component_h_option, {
                          key: item.value,
                          label: item.label,
                          value: item.value,
                          disabled: item.value === 2
                        }, null, 8, ["label", "value", "disabled"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, " 单选 "),
                createVNode(_component_h_select, {
                  "model-value": _ctx.value1,
                  class: "curGroup",
                  size: _ctx.selectSize,
                  "select-style": _ctx.selectStyle,
                  clearable: "",
                  placeholder: "请选择",
                  disabled: _ctx.selectDisabled === "disabled",
                  "to-body": false,
                  onChange: _ctx.changeHandle,
                  "onUpdate:modelValue": _ctx.onUpdateModelValue
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.selectOptions, (item) => {
                      return openBlock(), createBlock(_component_h_option, {
                        key: item.value,
                        label: item.label,
                        value: item.value,
                        disabled: item.value === 2
                      }, null, 8, ["label", "value", "disabled"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["model-value", "size", "select-style", "disabled", "onChange", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}> 多选 </div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                "model-value": _ctx.values1,
                class: "curGroup",
                multiple: "",
                size: _ctx.selectSize,
                "select-style": _ctx.selectStyle,
                clearable: "",
                placeholder: "请选择",
                disabled: _ctx.selectDisabled === "disabled",
                collapse: true,
                "multiple-limit": 2,
                "to-body": false,
                onChange: _ctx.changeHandle,
                "onUpdate:modelValue": _ctx.onUpdateMultipleModelValue
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(_ctx.selectOptions, (item) => {
                      _push4(ssrRenderComponent(_component_h_option, {
                        key: item.value,
                        label: item.label,
                        value: item.value
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.selectOptions, (item) => {
                        return openBlock(), createBlock(_component_h_option, {
                          key: item.value,
                          label: item.label,
                          value: item.value
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, " 多选 "),
                createVNode(_component_h_select, {
                  "model-value": _ctx.values1,
                  class: "curGroup",
                  multiple: "",
                  size: _ctx.selectSize,
                  "select-style": _ctx.selectStyle,
                  clearable: "",
                  placeholder: "请选择",
                  disabled: _ctx.selectDisabled === "disabled",
                  collapse: true,
                  "multiple-limit": 2,
                  "to-body": false,
                  onChange: _ctx.changeHandle,
                  "onUpdate:modelValue": _ctx.onUpdateMultipleModelValue
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.selectOptions, (item) => {
                      return openBlock(), createBlock(_component_h_option, {
                        key: item.value,
                        label: item.label,
                        value: item.value
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["model-value", "size", "select-style", "disabled", "onChange", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, " 单选 "),
              createVNode(_component_h_select, {
                "model-value": _ctx.value1,
                class: "curGroup",
                size: _ctx.selectSize,
                "select-style": _ctx.selectStyle,
                clearable: "",
                placeholder: "请选择",
                disabled: _ctx.selectDisabled === "disabled",
                "to-body": false,
                onChange: _ctx.changeHandle,
                "onUpdate:modelValue": _ctx.onUpdateModelValue
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.selectOptions, (item) => {
                    return openBlock(), createBlock(_component_h_option, {
                      key: item.value,
                      label: item.label,
                      value: item.value,
                      disabled: item.value === 2
                    }, null, 8, ["label", "value", "disabled"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["model-value", "size", "select-style", "disabled", "onChange", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, " 多选 "),
              createVNode(_component_h_select, {
                "model-value": _ctx.values1,
                class: "curGroup",
                multiple: "",
                size: _ctx.selectSize,
                "select-style": _ctx.selectStyle,
                clearable: "",
                placeholder: "请选择",
                disabled: _ctx.selectDisabled === "disabled",
                collapse: true,
                "multiple-limit": 2,
                "to-body": false,
                onChange: _ctx.changeHandle,
                "onUpdate:modelValue": _ctx.onUpdateMultipleModelValue
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.selectOptions, (item) => {
                    return openBlock(), createBlock(_component_h_option, {
                      key: item.value,
                      label: item.label,
                      value: item.value
                    }, null, 8, ["label", "value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["model-value", "size", "select-style", "disabled", "onChange", "onUpdate:modelValue"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  size as default
};
