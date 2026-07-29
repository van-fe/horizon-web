import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "check-on-leaf",
  __ssrInlineRender: true,
  setup(__props) {
    const showRadio = ref(false);
    const expandOnClickLeaf = ref(true);
    const baseTreeData = ref([]);
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_switch = resolveComponent("h-switch");
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "显示单选框" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: showRadio.value,
                    "onUpdate:modelValue": ($event) => showRadio.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: showRadio.value,
                      "onUpdate:modelValue": ($event) => showRadio.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "点击叶子节点勾选" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: expandOnClickLeaf.value,
                    "onUpdate:modelValue": ($event) => expandOnClickLeaf.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: expandOnClickLeaf.value,
                      "onUpdate:modelValue": ($event) => expandOnClickLeaf.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "显示单选框" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: showRadio.value,
                    "onUpdate:modelValue": ($event) => showRadio.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "点击叶子节点勾选" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: expandOnClickLeaf.value,
                    "onUpdate:modelValue": ($event) => expandOnClickLeaf.value = $event,
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
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "check-on-click-leaf": expandOnClickLeaf.value,
                    "show-radio": showRadio.value,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": baseTreeData.value,
                      "check-on-click-leaf": expandOnClickLeaf.value,
                      "show-radio": showRadio.value,
                      "to-body": false
                    }, null, 8, ["tree-data", "check-on-click-leaf", "show-radio"])
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
                    "check-on-click-leaf": expandOnClickLeaf.value,
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": baseTreeData.value,
                      "check-on-click-leaf": expandOnClickLeaf.value,
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["tree-data", "check-on-click-leaf"])
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
                    "check-on-click-leaf": expandOnClickLeaf.value,
                    "show-radio": showRadio.value,
                    "to-body": false
                  }, null, 8, ["tree-data", "check-on-click-leaf", "show-radio"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "check-on-click-leaf": expandOnClickLeaf.value,
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["tree-data", "check-on-click-leaf"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/TreeSelect/check-on-leaf.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
