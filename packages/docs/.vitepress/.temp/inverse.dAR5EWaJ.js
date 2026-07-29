import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "inverse",
  __ssrInlineRender: true,
  setup(__props) {
    const checkboxOptions = ref([
      {
        key: 1,
        label: "checkbox1",
        checked: true
      },
      {
        key: 2,
        label: "checkbox2",
        checked: false
      },
      {
        key: 3,
        label: "checkbox3",
        checked: false
      },
      {
        key: 4,
        label: "checkbox4",
        checked: true
      },
      {
        key: 5,
        label: "checkbox5",
        checked: true
      },
      {
        key: 6,
        label: "checkbox6",
        checked: false
      }
    ]);
    const myRefs = ref([]);
    const selectCheckbox = (val) => {
      console.info("selectCheckbox ==> ", val);
    };
    const inverse2 = () => {
      myRefs.value.forEach((item) => {
        item.toggle();
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, { onClick: inverse2 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`toggle`);
                      } else {
                        return [
                          createTextVNode("toggle")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, { onClick: inverse2 }, {
                      default: withCtx(() => [
                        createTextVNode("toggle")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(checkboxOptions.value, (item, index) => {
                    _push3(ssrRenderComponent(_component_h_checkbox, {
                      ref_for: true,
                      ref: (el) => myRefs.value[index] = el,
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      label: item.label,
                      class: "checkbox",
                      onChange: selectCheckbox
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(checkboxOptions.value, (item, index) => {
                      return openBlock(), createBlock(_component_h_checkbox, {
                        ref_for: true,
                        ref: (el) => myRefs.value[index] = el,
                        key: item.key,
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        label: item.label,
                        class: "checkbox",
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
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, { onClick: inverse2 }, {
                    default: withCtx(() => [
                      createTextVNode("toggle")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(checkboxOptions.value, (item, index) => {
                    return openBlock(), createBlock(_component_h_checkbox, {
                      ref_for: true,
                      ref: (el) => myRefs.value[index] = el,
                      key: item.key,
                      modelValue: item.checked,
                      "onUpdate:modelValue": ($event) => item.checked = $event,
                      label: item.label,
                      class: "checkbox",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Checkbox/inverse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const inverse = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bb9ceb1a"]]);
export {
  inverse as default
};
