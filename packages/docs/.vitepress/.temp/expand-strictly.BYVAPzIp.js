import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "expand-strictly",
  __ssrInlineRender: true,
  setup(__props) {
    const currentVal1 = ref([]);
    const currentVal2 = ref([]);
    const baseData = ref([]);
    const expandStrictly = ref(true);
    const changeHandle = (value) => {
      console.info(value);
    };
    onMounted(async () => {
      baseData.value = await fetch(new URL("/cascader-tree-data.json", import.meta.url).href).then((r) => r.json());
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_cascader = resolveComponent("h-cascader");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        inline: true,
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "勾选父级是否不展开子集" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: expandStrictly.value,
                    "onUpdate:modelValue": ($event) => expandStrictly.value = $event,
                    status: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: expandStrictly.value,
                      "onUpdate:modelValue": ($event) => expandStrictly.value = $event,
                      status: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "勾选父级是否不展开子集" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: expandStrictly.value,
                    "onUpdate:modelValue": ($event) => expandStrictly.value = $event,
                    status: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    "check-strictly": true,
                    "expand-strictly": expandStrictly.value,
                    clearable: true,
                    "to-body": false,
                    "show-radio": true,
                    options: baseData.value,
                    onInput: changeHandle,
                    onChange: changeHandle
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal1.value,
                      "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                      "check-strictly": true,
                      "expand-strictly": expandStrictly.value,
                      clearable: true,
                      "to-body": false,
                      "show-radio": true,
                      options: baseData.value,
                      onInput: changeHandle,
                      onChange: changeHandle
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "expand-strictly", "options"])
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
                    "check-strictly": true,
                    "expand-strictly": expandStrictly.value,
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
                      "check-strictly": true,
                      "expand-strictly": expandStrictly.value,
                      clearable: true,
                      options: baseData.value,
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "expand-strictly", "options"])
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
                    "check-strictly": true,
                    "expand-strictly": expandStrictly.value,
                    clearable: true,
                    "to-body": false,
                    "show-radio": true,
                    options: baseData.value,
                    onInput: changeHandle,
                    onChange: changeHandle
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "expand-strictly", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    "check-strictly": true,
                    "expand-strictly": expandStrictly.value,
                    clearable: true,
                    options: baseData.value,
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "expand-strictly", "options"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/expand-strictly.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
