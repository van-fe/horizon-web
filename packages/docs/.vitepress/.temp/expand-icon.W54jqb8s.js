import { defineComponent, ref, h, onMounted, resolveComponent, withCtx, unref, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { b as __default__, Z as __default__$1, a0 as __default__$2 } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "expand-icon",
  __ssrInlineRender: true,
  setup(__props) {
    const baseTreeData = ref([]);
    const customIcon = h(__default__, {
      size: 12
    });
    const customIconFold = h(__default__$1, {
      size: 12
    });
    const customIconExpand = h(__default__$2, {
      size: 12
    });
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tree_select = resolveComponent("h-tree-select");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "fold-icon": unref(customIcon),
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": baseTreeData.value,
                      "fold-icon": unref(customIcon),
                      "to-body": false
                    }, null, 8, ["tree-data", "fold-icon"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "fold-icon": unref(customIcon),
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": baseTreeData.value,
                      "fold-icon": unref(customIcon),
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["tree-data", "fold-icon"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选-加减符号</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "expand-icon": unref(customIconExpand),
                    "fold-icon": unref(customIconFold),
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选-加减符号"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": baseTreeData.value,
                      "expand-icon": unref(customIconExpand),
                      "fold-icon": unref(customIconFold),
                      "to-body": false
                    }, null, 8, ["tree-data", "expand-icon", "fold-icon"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选-加减符号</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "expand-icon": unref(customIconExpand),
                    "fold-icon": unref(customIconFold),
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选-加减符号"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": baseTreeData.value,
                      "expand-icon": unref(customIconExpand),
                      "fold-icon": unref(customIconFold),
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["tree-data", "expand-icon", "fold-icon"])
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
                  createVNode(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "fold-icon": unref(customIcon),
                    "to-body": false
                  }, null, 8, ["tree-data", "fold-icon"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "fold-icon": unref(customIcon),
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["tree-data", "fold-icon"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选-加减符号"),
                  createVNode(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "expand-icon": unref(customIconExpand),
                    "fold-icon": unref(customIconFold),
                    "to-body": false
                  }, null, 8, ["tree-data", "expand-icon", "fold-icon"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选-加减符号"),
                  createVNode(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "expand-icon": unref(customIconExpand),
                    "fold-icon": unref(customIconFold),
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["tree-data", "expand-icon", "fold-icon"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/TreeSelect/expand-icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
