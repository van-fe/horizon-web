import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "border",
  __ssrInlineRender: true,
  setup(__props) {
    const checkboxOptions = ref([
      {
        key: 1,
        label: "checked",
        checked: true
      },
      {
        key: 2,
        label: "unchecked",
        checked: false
      }
    ]);
    const selectCheckbox = (val) => {
      console.info("selectCheckbox ==> ", val);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ align: "middle" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-43065dca${_scopeId2}>medium(default)</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "medium(default)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(checkboxOptions.value, (item) => {
                    _push3(ssrRenderComponent(_component_h_checkbox, {
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      label: item.label,
                      border: true,
                      class: "checkbox",
                      onChange: selectCheckbox
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(checkboxOptions.value, (item) => {
                      return openBlock(), createBlock(_component_h_checkbox, {
                        key: item.key,
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        label: item.label,
                        border: true,
                        class: "checkbox",
                        onChange: selectCheckbox
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-43065dca${_scopeId2}>large</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "large")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(checkboxOptions.value, (item) => {
                    _push3(ssrRenderComponent(_component_h_checkbox, {
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      label: item.label,
                      border: true,
                      class: "checkbox",
                      size: "large",
                      onChange: selectCheckbox
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(checkboxOptions.value, (item) => {
                      return openBlock(), createBlock(_component_h_checkbox, {
                        key: item.key,
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        label: item.label,
                        border: true,
                        class: "checkbox",
                        size: "large",
                        onChange: selectCheckbox
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "medium(default)")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 18 }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(checkboxOptions.value, (item) => {
                    return openBlock(), createBlock(_component_h_checkbox, {
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      label: item.label,
                      border: true,
                      class: "checkbox",
                      onChange: selectCheckbox
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "large")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 18 }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(checkboxOptions.value, (item) => {
                    return openBlock(), createBlock(_component_h_checkbox, {
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      label: item.label,
                      border: true,
                      class: "checkbox",
                      size: "large",
                      onChange: selectCheckbox
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]);
                  }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Checkbox/border.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const border = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43065dca"]]);
export {
  border as default
};
