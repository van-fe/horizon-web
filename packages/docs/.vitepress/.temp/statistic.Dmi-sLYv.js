import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "statistic",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const values = ref([]);
    const size = ref("medium");
    const inputStyle = ref("normal");
    const baseTreeData = ref([]);
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tree_select = resolveComponent("h-tree-select");
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "inputStyle" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: inputStyle.value,
                    "onUpdate:modelValue": ($event) => inputStyle.value = $event
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
                      modelValue: inputStyle.value,
                      "onUpdate:modelValue": ($event) => inputStyle.value = $event
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
              createVNode(_component_h_form_item, { label: "inputStyle" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: inputStyle.value,
                    "onUpdate:modelValue": ($event) => inputStyle.value = $event
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
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>默认国际化配置</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "tree-data": baseTreeData.value,
                    size: size.value,
                    "input-style": inputStyle.value,
                    "use-statistic": true,
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "默认国际化配置"),
                    createVNode(_component_h_tree_select, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "tree-data": baseTreeData.value,
                      size: size.value,
                      "input-style": inputStyle.value,
                      "use-statistic": true,
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data", "size", "input-style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>自定义为“组件”</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    "tree-data": baseTreeData.value,
                    size: size.value,
                    "input-style": inputStyle.value,
                    "use-statistic": true,
                    "statistic-text": "组件",
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "自定义为“组件”"),
                    createVNode(_component_h_tree_select, {
                      modelValue: values.value,
                      "onUpdate:modelValue": ($event) => values.value = $event,
                      "tree-data": baseTreeData.value,
                      size: size.value,
                      "input-style": inputStyle.value,
                      "use-statistic": true,
                      "statistic-text": "组件",
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data", "size", "input-style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "默认国际化配置"),
                  createVNode(_component_h_tree_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "tree-data": baseTreeData.value,
                    size: size.value,
                    "input-style": inputStyle.value,
                    "use-statistic": true,
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data", "size", "input-style"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "自定义为“组件”"),
                  createVNode(_component_h_tree_select, {
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    "tree-data": baseTreeData.value,
                    size: size.value,
                    "input-style": inputStyle.value,
                    "use-statistic": true,
                    "statistic-text": "组件",
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data", "size", "input-style"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/TreeSelect/statistic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
