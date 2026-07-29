import { defineComponent, ref, onMounted, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as __default__ } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reserve-keyword",
  __ssrInlineRender: true,
  setup(__props) {
    const values1 = ref([]);
    const values2 = ref([]);
    const values3 = ref([]);
    const values4 = ref([]);
    const baseTreeData = ref([]);
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tree_select = resolveComponent("h-tree-select");
      const _component_h_tooltip = resolveComponent("h-tooltip");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> 保留关键字（默认） </div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    "tree-data": baseTreeData.value,
                    filterable: true,
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 保留关键字（默认） "),
                    createVNode(_component_h_tree_select, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      "tree-data": baseTreeData.value,
                      filterable: true,
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> 不保留关键字 </div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    "tree-data": baseTreeData.value,
                    filterable: true,
                    multiple: true,
                    "reserve-keyword": false,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 不保留关键字 "),
                    createVNode(_component_h_tree_select, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      "tree-data": baseTreeData.value,
                      filterable: true,
                      multiple: true,
                      "reserve-keyword": false,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> 仅在反选时保留，正选不保留 `);
                  _push3(ssrRenderComponent(_component_h_tooltip, null, {
                    content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 考虑了过滤时反选的操作便捷性 `);
                      } else {
                        return [
                          createTextVNode(" 考虑了过滤时反选的操作便捷性 ")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(__default__), { name: "help" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(__default__), { name: "help" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    "tree-data": baseTreeData.value,
                    filterable: true,
                    multiple: true,
                    "reserve-keyword": "reserve-deselect",
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 仅在反选时保留，正选不保留 "),
                      createVNode(_component_h_tooltip, null, {
                        content: withCtx(() => [
                          createTextVNode(" 考虑了过滤时反选的操作便捷性 ")
                        ]),
                        default: withCtx(() => [
                          createVNode(unref(__default__), { name: "help" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_h_tree_select, {
                      modelValue: values3.value,
                      "onUpdate:modelValue": ($event) => values3.value = $event,
                      "tree-data": baseTreeData.value,
                      filterable: true,
                      multiple: true,
                      "reserve-keyword": "reserve-deselect",
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> 不保留关键字，但过滤内容特殊处理 `);
                  _push3(ssrRenderComponent(_component_h_tooltip, { content: "用户手动清空输入文字或失焦输入框后，才会改变过滤内容" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(__default__), { name: "help" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(__default__), { name: "help" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    modelValue: values4.value,
                    "onUpdate:modelValue": ($event) => values4.value = $event,
                    "tree-data": baseTreeData.value,
                    filterable: true,
                    multiple: true,
                    "reserve-keyword": "reserve-special",
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 不保留关键字，但过滤内容特殊处理 "),
                      createVNode(_component_h_tooltip, { content: "用户手动清空输入文字或失焦输入框后，才会改变过滤内容" }, {
                        default: withCtx(() => [
                          createVNode(unref(__default__), { name: "help" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_h_tree_select, {
                      modelValue: values4.value,
                      "onUpdate:modelValue": ($event) => values4.value = $event,
                      "tree-data": baseTreeData.value,
                      filterable: true,
                      multiple: true,
                      "reserve-keyword": "reserve-special",
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 保留关键字（默认） "),
                  createVNode(_component_h_tree_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    "tree-data": baseTreeData.value,
                    filterable: true,
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 不保留关键字 "),
                  createVNode(_component_h_tree_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    "tree-data": baseTreeData.value,
                    filterable: true,
                    multiple: true,
                    "reserve-keyword": false,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 仅在反选时保留，正选不保留 "),
                    createVNode(_component_h_tooltip, null, {
                      content: withCtx(() => [
                        createTextVNode(" 考虑了过滤时反选的操作便捷性 ")
                      ]),
                      default: withCtx(() => [
                        createVNode(unref(__default__), { name: "help" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_h_tree_select, {
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    "tree-data": baseTreeData.value,
                    filterable: true,
                    multiple: true,
                    "reserve-keyword": "reserve-deselect",
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 不保留关键字，但过滤内容特殊处理 "),
                    createVNode(_component_h_tooltip, { content: "用户手动清空输入文字或失焦输入框后，才会改变过滤内容" }, {
                      default: withCtx(() => [
                        createVNode(unref(__default__), { name: "help" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_h_tree_select, {
                    modelValue: values4.value,
                    "onUpdate:modelValue": ($event) => values4.value = $event,
                    "tree-data": baseTreeData.value,
                    filterable: true,
                    multiple: true,
                    "reserve-keyword": "reserve-special",
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/TreeSelect/reserve-keyword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
