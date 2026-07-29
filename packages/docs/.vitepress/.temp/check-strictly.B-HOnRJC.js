import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "check-strictly",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const values = ref();
    const checkStrictly = ref(false);
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
        "label-vertical-align": "middle",
        "label-width": "150px"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否忽视父子关系" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: checkStrictly.value,
                    "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
                    status: true,
                    "status-off-text": "否",
                    "status-on-text": "是"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: checkStrictly.value,
                      "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
                      status: true,
                      "status-off-text": "否",
                      "status-on-text": "是"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "是否忽视父子关系" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: checkStrictly.value,
                    "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
                    status: true,
                    "status-off-text": "否",
                    "status-on-text": "是"
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
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "tree-data": baseTreeData.value,
                    "check-strictly": checkStrictly.value,
                    "show-radio": true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_tree_select, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "tree-data": baseTreeData.value,
                      "check-strictly": checkStrictly.value,
                      "show-radio": true,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data", "check-strictly"])
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
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    "tree-data": baseTreeData.value,
                    "check-strictly": checkStrictly.value,
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_tree_select, {
                      modelValue: values.value,
                      "onUpdate:modelValue": ($event) => values.value = $event,
                      "tree-data": baseTreeData.value,
                      "check-strictly": checkStrictly.value,
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data", "check-strictly"])
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
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "tree-data": baseTreeData.value,
                    "check-strictly": checkStrictly.value,
                    "show-radio": true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data", "check-strictly"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_tree_select, {
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    "tree-data": baseTreeData.value,
                    "check-strictly": checkStrictly.value,
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "tree-data", "check-strictly"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/TreeSelect/check-strictly.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
