import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const values2 = ref([]);
    const values3 = ref([]);
    const changeHandle = (value, option) => {
      console.group("change");
      console.info(value);
      console.info(option);
      console.groupEnd();
    };
    return {
      valueFormat(originValue) {
        return {
          value: originValue.value,
          label: originValue.label
        };
      },
      filterOption(input, props) {
        const label = props.label;
        return label.includes(input.toUpperCase());
      },
      blur() {
        console.info("blur");
      },
      focus() {
        console.info("focus");
      },
      clear() {
        console.info("clear");
      },
      deselect(value) {
        console.info("deselect", value);
      },
      dropdownVisibleChange(visible) {
        console.info("dropdownVisibleChange", visible);
      },
      changeHandle,
      values2,
      values3
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>事件监听</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.values2,
                "onUpdate:modelValue": ($event) => _ctx.values2 = $event,
                multiple: "",
                "allow-create": "",
                "to-body": false,
                onBlur: _ctx.blur,
                onFocus: _ctx.focus,
                onChange: _ctx.changeHandle,
                onClear: _ctx.clear,
                onDeselect: _ctx.deselect,
                onDropdownVisibleChange: _ctx.dropdownVisibleChange
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "中国",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "日本"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "中国",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "美国"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "日本"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "事件监听"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.values2,
                  "onUpdate:modelValue": ($event) => _ctx.values2 = $event,
                  multiple: "",
                  "allow-create": "",
                  "to-body": false,
                  onBlur: _ctx.blur,
                  onFocus: _ctx.focus,
                  onChange: _ctx.changeHandle,
                  onClear: _ctx.clear,
                  onDeselect: _ctx.deselect,
                  onDropdownVisibleChange: _ctx.dropdownVisibleChange
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "中国",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "日本"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "onBlur", "onFocus", "onChange", "onClear", "onDeselect", "onDropdownVisibleChange"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>事件监听 -- 确认选项</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.values3,
                "onUpdate:modelValue": ($event) => _ctx.values3 = $event,
                multiple: "",
                "allow-create": "",
                "need-dropdown-confirm": "",
                "to-body": false,
                onBlur: _ctx.blur,
                onFocus: _ctx.focus,
                onChange: _ctx.changeHandle,
                onClear: _ctx.clear,
                onDeselect: _ctx.deselect,
                onDropdownVisibleChange: _ctx.dropdownVisibleChange
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "中国",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "日本"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "中国",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "美国"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "日本"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "事件监听 -- 确认选项"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.values3,
                  "onUpdate:modelValue": ($event) => _ctx.values3 = $event,
                  multiple: "",
                  "allow-create": "",
                  "need-dropdown-confirm": "",
                  "to-body": false,
                  onBlur: _ctx.blur,
                  onFocus: _ctx.focus,
                  onChange: _ctx.changeHandle,
                  onClear: _ctx.clear,
                  onDeselect: _ctx.deselect,
                  onDropdownVisibleChange: _ctx.dropdownVisibleChange
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "中国",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "日本"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "onBlur", "onFocus", "onChange", "onClear", "onDeselect", "onDropdownVisibleChange"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "事件监听"),
              createVNode(_component_h_select, {
                modelValue: _ctx.values2,
                "onUpdate:modelValue": ($event) => _ctx.values2 = $event,
                multiple: "",
                "allow-create": "",
                "to-body": false,
                onBlur: _ctx.blur,
                onFocus: _ctx.focus,
                onChange: _ctx.changeHandle,
                onClear: _ctx.clear,
                onDeselect: _ctx.deselect,
                onDropdownVisibleChange: _ctx.dropdownVisibleChange
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "中国",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "美国"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "日本"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "onBlur", "onFocus", "onChange", "onClear", "onDeselect", "onDropdownVisibleChange"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "事件监听 -- 确认选项"),
              createVNode(_component_h_select, {
                modelValue: _ctx.values3,
                "onUpdate:modelValue": ($event) => _ctx.values3 = $event,
                multiple: "",
                "allow-create": "",
                "need-dropdown-confirm": "",
                "to-body": false,
                onBlur: _ctx.blur,
                onFocus: _ctx.focus,
                onChange: _ctx.changeHandle,
                onClear: _ctx.clear,
                onDeselect: _ctx.deselect,
                onDropdownVisibleChange: _ctx.dropdownVisibleChange
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "中国",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "美国"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "日本"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "onBlur", "onFocus", "onChange", "onClear", "onDeselect", "onDropdownVisibleChange"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/events.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const events = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  events as default
};
