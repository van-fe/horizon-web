import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
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
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(checkboxOptions.value, (item) => {
                    _push3(ssrRenderComponent(_component_h_checkbox, {
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
                    (openBlock(true), createBlock(Fragment, null, renderList(checkboxOptions.value, (item) => {
                      return openBlock(), createBlock(_component_h_checkbox, {
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
                  (openBlock(true), createBlock(Fragment, null, renderList(checkboxOptions.value, (item) => {
                    return openBlock(), createBlock(_component_h_checkbox, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Checkbox/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
