import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dynamic-load",
  __ssrInlineRender: true,
  setup(__props) {
    const dynamicTreeData = ref([
      {
        value: "guide",
        label: "Guide",
        children: [
          {
            value: "disciplines",
            label: "Disciplines",
            isLeaf: false,
            children: []
          },
          {
            value: "navigation",
            label: "Navigation",
            isLeaf: false,
            children: []
          }
        ]
      }
    ]);
    const dynLoad = (data) => {
      console.info(data, data.node);
      return new Promise((resolve, reject) => {
        if (!data.node) return reject();
        setTimeout(
          () => resolve(
            data.node.value === "disciplines" ? [
              {
                value: "consistency",
                label: "Consistency"
              },
              {
                value: "feedback",
                label: "Feedback"
              },
              {
                value: "efficiency",
                label: "Efficiency"
              },
              {
                value: "controllability",
                label: "Controllability"
              }
            ] : [
              {
                value: "side nav",
                label: "Side Navigation"
              },
              {
                value: "top nav",
                label: "Top Navigation"
              }
            ]
          ),
          2e3
        );
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tree = resolveComponent("h-tree");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(dynamicTreeData.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(dynamicTreeData.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-81d0283a${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_tree, {
                    "tree-data": dynamicTreeData.value,
                    "onUpdate:treeData": ($event) => dynamicTreeData.value = $event,
                    "dynamic-load-data": dynLoad
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_tree, {
                      "tree-data": dynamicTreeData.value,
                      "onUpdate:treeData": ($event) => dynamicTreeData.value = $event,
                      "dynamic-load-data": dynLoad
                    }, null, 8, ["tree-data", "onUpdate:treeData"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-81d0283a${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_tree, {
                    "tree-data": dynamicTreeData.value,
                    "onUpdate:treeData": ($event) => dynamicTreeData.value = $event,
                    "dynamic-load-data": dynLoad,
                    multiple: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_tree, {
                      "tree-data": dynamicTreeData.value,
                      "onUpdate:treeData": ($event) => dynamicTreeData.value = $event,
                      "dynamic-load-data": dynLoad,
                      multiple: true
                    }, null, 8, ["tree-data", "onUpdate:treeData"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(dynamicTreeData.value), 1)
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选"),
                  createVNode(_component_h_tree, {
                    "tree-data": dynamicTreeData.value,
                    "onUpdate:treeData": ($event) => dynamicTreeData.value = $event,
                    "dynamic-load-data": dynLoad
                  }, null, 8, ["tree-data", "onUpdate:treeData"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_tree, {
                    "tree-data": dynamicTreeData.value,
                    "onUpdate:treeData": ($event) => dynamicTreeData.value = $event,
                    "dynamic-load-data": dynLoad,
                    multiple: true
                  }, null, 8, ["tree-data", "onUpdate:treeData"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tree/dynamic-load.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dynamicLoad = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-81d0283a"]]);
export {
  dynamicLoad as default
};
