import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "expand-and-check",
  __ssrInlineRender: true,
  setup(__props) {
    const expandOnClickNode = ref(true);
    const checkOnClickNode = ref(false);
    const checkStrictly = ref(false);
    const showRadio = ref(false);
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
      const _component_h_tree = resolveComponent("h-tree");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "点击整行折叠" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: expandOnClickNode.value,
                    "onUpdate:modelValue": ($event) => expandOnClickNode.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: expandOnClickNode.value,
                      "onUpdate:modelValue": ($event) => expandOnClickNode.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "点击整行选中" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: checkOnClickNode.value,
                    "onUpdate:modelValue": ($event) => checkOnClickNode.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: checkOnClickNode.value,
                      "onUpdate:modelValue": ($event) => checkOnClickNode.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否忽略父子级关系" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: checkStrictly.value,
                    "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
                    status: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: checkStrictly.value,
                      "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
                      status: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否显示 Radio" }, {
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
          } else {
            return [
              createVNode(_component_h_form_item, { label: "点击整行折叠" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: expandOnClickNode.value,
                    "onUpdate:modelValue": ($event) => expandOnClickNode.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "点击整行选中" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: checkOnClickNode.value,
                    "onUpdate:modelValue": ($event) => checkOnClickNode.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "是否忽略父子级关系" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: checkStrictly.value,
                    "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
                    status: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "是否显示 Radio" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: showRadio.value,
                    "onUpdate:modelValue": ($event) => showRadio.value = $event,
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
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_tree, {
                    "tree-data": baseTreeData.value,
                    "expand-on-click-node": expandOnClickNode.value,
                    "check-on-click-node": checkOnClickNode.value,
                    "check-strictly": checkStrictly.value,
                    "show-radio": showRadio.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_tree, {
                      "tree-data": baseTreeData.value,
                      "expand-on-click-node": expandOnClickNode.value,
                      "check-on-click-node": checkOnClickNode.value,
                      "check-strictly": checkStrictly.value,
                      "show-radio": showRadio.value
                    }, null, 8, ["tree-data", "expand-on-click-node", "check-on-click-node", "check-strictly", "show-radio"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_tree, {
                    "tree-data": baseTreeData.value,
                    "expand-on-click-node": expandOnClickNode.value,
                    "check-on-click-node": checkOnClickNode.value,
                    "check-strictly": checkStrictly.value,
                    multiple: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_tree, {
                      "tree-data": baseTreeData.value,
                      "expand-on-click-node": expandOnClickNode.value,
                      "check-on-click-node": checkOnClickNode.value,
                      "check-strictly": checkStrictly.value,
                      multiple: true
                    }, null, 8, ["tree-data", "expand-on-click-node", "check-on-click-node", "check-strictly"])
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
                  createVNode(_component_h_tree, {
                    "tree-data": baseTreeData.value,
                    "expand-on-click-node": expandOnClickNode.value,
                    "check-on-click-node": checkOnClickNode.value,
                    "check-strictly": checkStrictly.value,
                    "show-radio": showRadio.value
                  }, null, 8, ["tree-data", "expand-on-click-node", "check-on-click-node", "check-strictly", "show-radio"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_tree, {
                    "tree-data": baseTreeData.value,
                    "expand-on-click-node": expandOnClickNode.value,
                    "check-on-click-node": checkOnClickNode.value,
                    "check-strictly": checkStrictly.value,
                    multiple: true
                  }, null, 8, ["tree-data", "expand-on-click-node", "check-on-click-node", "check-strictly"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tree/expand-and-check.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
