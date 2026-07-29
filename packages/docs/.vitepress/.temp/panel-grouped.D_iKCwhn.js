import { defineComponent, ref, resolveComponent, mergeProps, withCtx, h, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "panel-grouped",
  __ssrInlineRender: true,
  setup(__props) {
    const currentVal1 = ref([]);
    const optionsWithGroup = [
      {
        groupLabel: "components"
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side navigation",
            label: "Side Navigation"
          },
          {
            value: "top navigation",
            label: "Top Navigation"
          }
        ]
      },
      {
        groupLabel: () => h(
          "div",
          {
            style: "font-weight: 700;"
          },
          ["directives"]
        )
      },
      {
        value: "tooltip",
        label: "Tooltip",
        children: [
          {
            value: "visible tooltip",
            label: "Visible Tooltip"
          },
          {
            value: "hidden tooltip",
            label: "Hidden Tooltip"
          }
        ]
      }
    ];
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
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    options: optionsWithGroup,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal1.value,
                      "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                      options: optionsWithGroup,
                      "to-body": false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    options: optionsWithGroup,
                    "to-body": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/panel-grouped.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
