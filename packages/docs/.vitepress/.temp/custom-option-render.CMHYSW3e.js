import { defineComponent, ref, h, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const currentVal1 = ref([]);
    const optionsWithRender = [
      {
        value: "disciplines",
        label: (option) => h(
          "div",
          {
            style: "color: #00BEBE;width: 300px;"
          },
          ["你可以看到我的 value =", option.value]
        ),
        stringLabel: "Disciplines",
        children: [
          {
            stringLabel: "Consistency",
            value: "consistency",
            label: (option) => h("div", {}, [
              h(
                "span",
                {
                  style: "width: 300px;"
                },
                ["➕", option.value]
              )
            ])
          },
          {
            value: "feedback",
            label: "Feedback"
          },
          {
            value: "efficiency",
            label: "Efficiency"
          },
          {
            value: "controllability",
            label: "Controllability"
          }
        ]
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation"
          },
          {
            value: "top nav",
            label: "Top Navigation"
          }
        ]
      }
    ];
    return {
      currentVal1,
      optionsWithRender
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
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
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                options: _ctx.optionsWithRender,
                "to-body": false
              }, {
                itemRender: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div style="${ssrRenderStyle({ "width": "200px" })}"${_scopeId3}> 👼🏻 ${ssrInterpolate(slotProps.label)}</div>`);
                  } else {
                    return [
                      createVNode("div", { style: { "width": "200px" } }, " 👼🏻 " + toDisplayString(slotProps.label), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_cascader, {
                  modelValue: _ctx.currentVal1,
                  "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                  options: _ctx.optionsWithRender,
                  "to-body": false
                }, {
                  itemRender: withCtx((slotProps) => [
                    createVNode("div", { style: { "width": "200px" } }, " 👼🏻 " + toDisplayString(slotProps.label), 1)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "options"])
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
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                options: _ctx.optionsWithRender,
                "to-body": false
              }, {
                itemRender: withCtx((slotProps) => [
                  createVNode("div", { style: { "width": "200px" } }, " 👼🏻 " + toDisplayString(slotProps.label), 1)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "options"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/custom-option-render.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customOptionRender = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  customOptionRender as default
};
