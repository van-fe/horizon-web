import { defineComponent, ref, resolveComponent, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "button",
  __ssrInlineRender: true,
  setup(__props) {
    const checkBoxOptions = ref([
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_checkbox_button = resolveComponent("h-checkbox-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, { align: "middle" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>medium(default)</div>`);
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
                  ssrRenderList(checkBoxOptions.value, (item) => {
                    _push3(ssrRenderComponent(_component_h_checkbox_button, {
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      class: "checkbox",
                      label: item.label
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(checkBoxOptions.value, (item) => {
                      return openBlock(), createBlock(_component_h_checkbox_button, {
                        key: item.key,
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        class: "checkbox",
                        label: item.label
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
                  (openBlock(true), createBlock(Fragment, null, renderList(checkBoxOptions.value, (item) => {
                    return openBlock(), createBlock(_component_h_checkbox_button, {
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      class: "checkbox",
                      label: item.label
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
      _push(ssrRenderComponent(_component_h_row, { align: "middle" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>large</div>`);
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
                  ssrRenderList(checkBoxOptions.value, (item) => {
                    _push3(ssrRenderComponent(_component_h_checkbox_button, {
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      label: item.label,
                      class: "checkbox",
                      size: "large"
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(checkBoxOptions.value, (item) => {
                      return openBlock(), createBlock(_component_h_checkbox_button, {
                        key: item.key,
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        label: item.label,
                        class: "checkbox",
                        size: "large"
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
                  createVNode("div", { class: "demo-title" }, "large")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 18 }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(checkBoxOptions.value, (item) => {
                    return openBlock(), createBlock(_component_h_checkbox_button, {
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      label: item.label,
                      class: "checkbox",
                      size: "large"
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Checkbox/button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
