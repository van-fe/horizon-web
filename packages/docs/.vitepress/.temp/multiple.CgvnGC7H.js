import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "multiple",
  __ssrInlineRender: true,
  setup(__props) {
    const currentVal1 = ref([["guide", "navigation", "side nav"], ["guide", "navigation", "top nav"], ["guide", "disciplines", "consistency"], ["guide", "disciplines", "feedback"]]);
    const currentVal2 = ref([["guide", "navigation", "side nav"], ["guide", "navigation", "top nav"], ["guide", "disciplines", "consistency"], ["guide", "disciplines", "feedback"]]);
    const currentVal3 = ref([["guide", "navigation", "side nav"], ["guide", "navigation", "top nav"], ["guide", "disciplines", "consistency"], ["guide", "disciplines", "feedback"]]);
    const currentVal4 = ref([["guide", "navigation", "side nav"], ["guide", "navigation", "top nav"], ["guide", "disciplines", "consistency"], ["guide", "disciplines", "feedback"]]);
    const options = ref([]);
    fetch(
      new URL("/cascader-options.json", import.meta.url).href
    ).then((res) => {
      res.json().then((value) => {
        options.value = value;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_cascader = resolveComponent("h-cascader");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>普通多选</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    options: options.value,
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "普通多选"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal1.value,
                      "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                      options: options.value,
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
                  _push3(`<div class="demo-title"${_scopeId2}>折叠多选</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    options: options.value,
                    multiple: true,
                    "collapse-tags": true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "折叠多选"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal2.value,
                      "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                      options: options.value,
                      multiple: true,
                      "collapse-tags": true,
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
                  _push3(`<div class="demo-title"${_scopeId2}>+N 显示其余已选项</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    options: options.value,
                    multiple: true,
                    "collapse-tags": true,
                    "collapse-tags-tooltip": true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "+N 显示其余已选项"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal3.value,
                      "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                      options: options.value,
                      multiple: true,
                      "collapse-tags": true,
                      "collapse-tags-tooltip": true,
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
                  _push3(`<div class="demo-title"${_scopeId2}>强制显示3个已选项，其余折叠</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal4.value,
                    "onUpdate:modelValue": ($event) => currentVal4.value = $event,
                    options: options.value,
                    multiple: true,
                    "collapse-tags": true,
                    "collapse-tags-tooltip": true,
                    "max-collapse-tags": 3,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "强制显示3个已选项，其余折叠"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal4.value,
                      "onUpdate:modelValue": ($event) => currentVal4.value = $event,
                      options: options.value,
                      multiple: true,
                      "collapse-tags": true,
                      "collapse-tags-tooltip": true,
                      "max-collapse-tags": 3,
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
                  createVNode("div", { class: "demo-title" }, "普通多选"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    options: options.value,
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "折叠多选"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    options: options.value,
                    multiple: true,
                    "collapse-tags": true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "+N 显示其余已选项"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    options: options.value,
                    multiple: true,
                    "collapse-tags": true,
                    "collapse-tags-tooltip": true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "强制显示3个已选项，其余折叠"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal4.value,
                    "onUpdate:modelValue": ($event) => currentVal4.value = $event,
                    options: options.value,
                    multiple: true,
                    "collapse-tags": true,
                    "collapse-tags-tooltip": true,
                    "max-collapse-tags": 3,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/multiple.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
