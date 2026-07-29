import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { C as $confirm, $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "draggable",
  __ssrInlineRender: true,
  setup(__props) {
    const draggable = ref(true);
    const dragOnHandler = ref(true);
    const dragToLeaf = ref(true);
    const useBeforeDrop = ref(false);
    const baseTreeData1 = ref([]);
    const baseTreeData2 = ref([]);
    function beforeDrop(from, to, prev) {
      return new Promise((resolve) => {
        $confirm(`是否确定将 ${from.label} 移动到 ${(to == null ? void 0 : to.label) ?? "根节点"} 下，且${(prev == null ? void 0 : prev.label) ? `在 ${prev.label} 之后` : "放在其第一位"}`, "提示").then((close) => {
          resolve(true);
          close();
        }).catch(() => {
          $message.error("取消了操作");
          resolve(false);
        });
      });
    }
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData1.value = res;
        baseTreeData2.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tree = resolveComponent("h-tree");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "开启拖拽" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: draggable.value,
                    "onUpdate:modelValue": ($event) => draggable.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: draggable.value,
                      "onUpdate:modelValue": ($event) => draggable.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "仅能操作拖拽图标进行拖拽" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: dragOnHandler.value,
                    "onUpdate:modelValue": ($event) => dragOnHandler.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: dragOnHandler.value,
                      "onUpdate:modelValue": ($event) => dragOnHandler.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "可以拖拽到叶子节点下" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: dragToLeaf.value,
                    "onUpdate:modelValue": ($event) => dragToLeaf.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: dragToLeaf.value,
                      "onUpdate:modelValue": ($event) => dragToLeaf.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "拦截确认拖拽" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: useBeforeDrop.value,
                    "onUpdate:modelValue": ($event) => useBeforeDrop.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: useBeforeDrop.value,
                      "onUpdate:modelValue": ($event) => useBeforeDrop.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "开启拖拽" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: draggable.value,
                    "onUpdate:modelValue": ($event) => draggable.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "仅能操作拖拽图标进行拖拽" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: dragOnHandler.value,
                    "onUpdate:modelValue": ($event) => dragOnHandler.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "可以拖拽到叶子节点下" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: dragToLeaf.value,
                    "onUpdate:modelValue": ($event) => dragToLeaf.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "拦截确认拖拽" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: useBeforeDrop.value,
                    "onUpdate:modelValue": ($event) => useBeforeDrop.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, { class: "flex" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div><div class="tree-box"${_scopeId2}>`);
                  if (baseTreeData1.value.length) {
                    _push3(ssrRenderComponent(_component_h_tree, {
                      "tree-data": baseTreeData1.value,
                      draggable: draggable.value,
                      "drag-on-handler": dragOnHandler.value,
                      "drag-to-leaf": dragToLeaf.value,
                      "before-drop": useBeforeDrop.value ? beforeDrop : void 0
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode("div", { class: "tree-box" }, [
                      baseTreeData1.value.length ? (openBlock(), createBlock(_component_h_tree, {
                        key: 0,
                        "tree-data": baseTreeData1.value,
                        draggable: draggable.value,
                        "drag-on-handler": dragOnHandler.value,
                        "drag-to-leaf": dragToLeaf.value,
                        "before-drop": useBeforeDrop.value ? beforeDrop : void 0
                      }, null, 8, ["tree-data", "draggable", "drag-on-handler", "drag-to-leaf", "before-drop"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div><div class="tree-box"${_scopeId2}>`);
                  if (baseTreeData2.value.length) {
                    _push3(ssrRenderComponent(_component_h_tree, {
                      "tree-data": baseTreeData2.value,
                      draggable: draggable.value,
                      "drag-on-handler": dragOnHandler.value,
                      "drag-to-leaf": dragToLeaf.value,
                      "before-drop": useBeforeDrop.value ? beforeDrop : void 0,
                      multiple: true
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode("div", { class: "tree-box" }, [
                      baseTreeData2.value.length ? (openBlock(), createBlock(_component_h_tree, {
                        key: 0,
                        "tree-data": baseTreeData2.value,
                        draggable: draggable.value,
                        "drag-on-handler": dragOnHandler.value,
                        "drag-to-leaf": dragToLeaf.value,
                        "before-drop": useBeforeDrop.value ? beforeDrop : void 0,
                        multiple: true
                      }, null, 8, ["tree-data", "draggable", "drag-on-handler", "drag-to-leaf", "before-drop"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选"),
                  createVNode("div", { class: "tree-box" }, [
                    baseTreeData1.value.length ? (openBlock(), createBlock(_component_h_tree, {
                      key: 0,
                      "tree-data": baseTreeData1.value,
                      draggable: draggable.value,
                      "drag-on-handler": dragOnHandler.value,
                      "drag-to-leaf": dragToLeaf.value,
                      "before-drop": useBeforeDrop.value ? beforeDrop : void 0
                    }, null, 8, ["tree-data", "draggable", "drag-on-handler", "drag-to-leaf", "before-drop"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode("div", { class: "tree-box" }, [
                    baseTreeData2.value.length ? (openBlock(), createBlock(_component_h_tree, {
                      key: 0,
                      "tree-data": baseTreeData2.value,
                      draggable: draggable.value,
                      "drag-on-handler": dragOnHandler.value,
                      "drag-to-leaf": dragToLeaf.value,
                      "before-drop": useBeforeDrop.value ? beforeDrop : void 0,
                      multiple: true
                    }, null, 8, ["tree-data", "draggable", "drag-on-handler", "drag-to-leaf", "before-drop"])) : createCommentVNode("", true)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tree/draggable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
