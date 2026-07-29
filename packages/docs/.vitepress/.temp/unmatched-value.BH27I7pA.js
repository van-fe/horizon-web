import { defineComponent, ref, onMounted, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "unmatched-value",
  __ssrInlineRender: true,
  setup(__props) {
    const currentVal1 = ref(["guide", "navigation", "side"]);
    const currentVal2 = ref([["guide", "navigation", "side"]]);
    const currentVal3 = ref(["guide", "navigation", "side"]);
    const currentVal4 = ref([["guide", "navigation", "side"]]);
    const baseData = ref([]);
    onMounted(async () => {
      baseData.value = await fetch(new URL("/cascader-tree-data.json", import.meta.url).href).then((r) => r.json());
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_cascader = resolveComponent("h-cascader");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    clearable: true,
                    "to-body": false,
                    options: baseData.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal1.value,
                      "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                      clearable: true,
                      "to-body": false,
                      options: baseData.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    clearable: true,
                    options: baseData.value,
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal2.value,
                      "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                      clearable: true,
                      options: baseData.value,
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选-仅展示叶子节点</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    clearable: true,
                    options: baseData.value,
                    "show-checked-strategy": "leaf",
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选-仅展示叶子节点"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal3.value,
                      "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                      clearable: true,
                      options: baseData.value,
                      "show-checked-strategy": "leaf",
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选-仅展示叶子节点</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal4.value,
                    "onUpdate:modelValue": ($event) => currentVal4.value = $event,
                    clearable: true,
                    options: baseData.value,
                    "show-checked-strategy": "leaf",
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选-仅展示叶子节点"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal4.value,
                      "onUpdate:modelValue": ($event) => currentVal4.value = $event,
                      clearable: true,
                      options: baseData.value,
                      "show-checked-strategy": "leaf",
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
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
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    clearable: true,
                    "to-body": false,
                    options: baseData.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    clearable: true,
                    options: baseData.value,
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选-仅展示叶子节点"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    clearable: true,
                    options: baseData.value,
                    "show-checked-strategy": "leaf",
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选-仅展示叶子节点"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal4.value,
                    "onUpdate:modelValue": ($event) => currentVal4.value = $event,
                    clearable: true,
                    options: baseData.value,
                    "show-checked-strategy": "leaf",
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/unmatched-value.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
